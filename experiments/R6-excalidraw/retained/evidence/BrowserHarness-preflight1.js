'use strict';
// This complete custom executable is Authenticode-signed and verified by the
// Windows launcher against the approved signer before every Linux invocation.
const fs=require('fs'),path=require('path'),http=require('http'),crypto=require('crypto'),rl=require('readline'),cp=require('child_process');
const {chromium}=require('/tools/browser/node_modules/playwright');
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const root=process.env.R6_APP_ROOT||'/artifact';
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.woff2':'font/woff2','.png':'image/png','.wasm':'application/wasm'};
const server=http.createServer((req,res)=>{let p;try{p=decodeURIComponent(new URL(req.url,'http://127.0.0.1').pathname)}catch{res.writeHead(400).end();return}
 const filename=path.resolve(root,'.'+(p==='/'?'/index.html':p));if(!filename.startsWith(root+'/')||filename.endsWith('.map')){res.writeHead(403).end();return}
 fs.readFile(filename,(err,b)=>{if(err){res.writeHead(404).end();return}res.setHeader('Content-Type',mime[path.extname(filename)]||'application/octet-stream');res.end(b)})});
let browser,context,page,cdp,rea,reaSeq=0,reaPending=new Map(),seq=0,blocked=[],errors=[],downloads=[];
function record(name,value){fs.mkdirSync('/output/evidence',{recursive:true});const p='/output/evidence/'+name;fs.writeFileSync(p,typeof value==='string'?value:JSON.stringify(value,null,2));return {path:p,sha256:hash(fs.readFileSync(p))}}
async function createContext(){context=await browser.newContext({viewport:{width:1280,height:900},deviceScaleFactor:1,locale:'en-US',acceptDownloads:true,serviceWorkers:'block'});
 await context.route('**/*',async route=>{const u=new URL(route.request().url());if(u.hostname==='127.0.0.1'&&u.port==='3000')return route.continue();blocked.push({url:u.origin,path:u.pathname});return route.abort('blockedbyclient')});
 page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));page.on('download',async d=>{try{const f='/output/download-'+Date.now()+'-'+downloads.length+path.extname(d.suggestedFilename());await d.saveAs(f);downloads.push({filename:d.suggestedFilename(),path:f,bytes:fs.statSync(f).size,sha256:hash(fs.readFileSync(f))})}catch(e){errors.push(e.message)}});
 cdp=await context.newCDPSession(page);await page.goto('http://127.0.0.1:3000/',{waitUntil:'domcontentloaded'});await page.waitForTimeout(1500)
}
async function startRea(){if(rea)return;rea=cp.spawn('/usr/bin/node',['/rea/scripts/rea.mjs','--mcp'],{env:{...process.env,REA_STATE_DIR:'/scratch/rea',REA_CACHE_DIR:'/scratch/rea-cache'},stdio:['pipe','pipe','pipe']});
 rea.stderr.on('data',b=>fs.appendFileSync('/output/rea.stderr.txt',b));rl.createInterface({input:rea.stdout}).on('line',line=>{try{const r=JSON.parse(line);const item=reaPending.get(r.id);if(item){reaPending.delete(r.id);item.resolve(r)}}catch{}});
 await reaRpc('initialize',{protocolVersion:'2024-11-05',capabilities:{},clientInfo:{name:'r6-signed-controller',version:'1'}});
 rea.stdin.write(JSON.stringify({jsonrpc:'2.0',method:'notifications/initialized'})+'\n')
}
function reaRpc(method,params){return new Promise((resolve,reject)=>{const id=++reaSeq;const timer=setTimeout(()=>{reaPending.delete(id);reject(Error('REA RPC timeout'))},120000);reaPending.set(id,{resolve:r=>{clearTimeout(timer);record('rea-rpc-'+id+'.json',{method,params,response:r});resolve(r)}});rea.stdin.write(JSON.stringify({jsonrpc:'2.0',id,method,params})+'\n')})}
async function state(){await page.waitForTimeout(500);return page.evaluate(()=>({url:location.href,title:document.title,storage:Object.fromEntries(Object.entries(localStorage)),buttons:[...document.querySelectorAll('button')].map(x=>({text:x.innerText,title:x.title,label:x.getAttribute('aria-label'),'data-testid':x.getAttribute('data-testid'),disabled:x.disabled})),tools:[...document.querySelectorAll('[data-testid]')].map(x=>({tag:x.tagName,testid:x.getAttribute('data-testid'),label:x.getAttribute('aria-label'),title:x.title})),text:document.body.innerText.slice(0,14000)}))}
async function command(a){
 switch(a.op){
 case 'batch':{if(!Array.isArray(a.actions)||a.actions.length>20)throw Error('Batch max20');const results=[];for(const item of a.actions)results.push(await command(item));return results;} 
 case 'state':return state();
 case 'dom':return {html:(await page.content()).slice(a.offset||0,(a.offset||0)+Math.min(a.limit||18000,30000))};
 case 'click':{let target=page.locator(a.selector).first();if(await target.evaluate(e=>e.tagName==='INPUT'&&e.closest('label')!==null))target=target.locator('xpath=ancestor::label[1]');await target.click(a.options||{});break;}
 case 'fill':await page.locator(a.selector).first().fill(a.text);break;
 case 'press':await page.keyboard.press(a.key);break;
 case 'type':await page.keyboard.insertText(a.text);break;
 case 'drag':await page.mouse.move(a.from[0],a.from[1]);await page.mouse.down();for(const pt of a.points||[a.to])await page.mouse.move(pt[0],pt[1],{steps:a.steps||10});await page.mouse.up();break;
 case 'point':await page.mouse.click(a.x,a.y,{clickCount:a.count||1});break;
 case 'wait':await page.waitForTimeout(Math.min(a.ms||500,3000));break;
 case 'reload':await page.reload({waitUntil:'domcontentloaded'});await page.waitForTimeout(1500);break;
 case 'reset':await context.close();blocked=[];errors=[];downloads=[];await createContext();break;
 case 'seed':await page.evaluate(v=>{localStorage.clear();for(const [k,x]of Object.entries(v))localStorage.setItem(k,typeof x==='string'?x:JSON.stringify(x))},a.storage);await page.reload({waitUntil:'domcontentloaded'});await page.waitForTimeout(1500);break;
 case 'upload':{const f='/output/upload-'+seq+'.excalidraw';fs.writeFileSync(f,a.text);if(a.selector)await page.locator(a.selector).setInputFiles(f);else{const chooser=page.waitForEvent('filechooser');await page.keyboard.press('Control+o');await(await chooser).setFiles(f)}break}
 case 'screenshot':await page.screenshot({path:'/output/screenshot-'+seq+'.png'});return {path:'/output/screenshot-'+seq+'.png'};
 case 'downloads':return downloads.map(d=>({...d,text:/\.(svg|excalidraw|json)$/.test(d.filename)?fs.readFileSync(d.path,'utf8'):undefined}));
 case 'cdp':if(process.env.R6_ARM!=='B'&&process.env.R6_ARM!=='E')throw Error('Direct CDP is Arm B only');return cdp.send(a.method,a.params||{});
 case 'ast':{if(process.env.R6_ARM!=='B')throw Error('AST is Arm B only');const acorn=require('/tools/browser/node_modules/acorn');const name=path.resolve('/artifact',a.path);if(!name.startsWith('/artifact/')||!name.endsWith('.js'))throw Error('Artifact JavaScript only');const text=fs.readFileSync(name,'utf8');const tree=acorn.parse(text,{ecmaVersion:'latest',sourceType:'module'});const hits=[];let nodes=0;function visit(n,parent){if(!n||typeof n!=='object')return;if(n.type){nodes++;const s=text.slice(n.start,n.end);if((n.type==='FunctionDeclaration'||n.type==='VariableDeclarator'||n.type==='CallExpression')&&s.includes(a.query||'localStorage')&&s.length<20000)hits.push({type:n.type,start:n.start,end:n.end,text:s.slice(0,4000)})}for(const[k,v]of Object.entries(n)){if(k==='parent')continue;if(Array.isArray(v))v.forEach(x=>visit(x,n));else if(v&&typeof v==='object')visit(v,n)}}visit(tree);return{nodes,hits:hits.slice(0,15),total:hits.length}}
 case 'rea':{if(process.env.R6_ARM!=='C'&&process.env.R6_ARM!=='E')throw Error('REA is Arm C only');const allowed=['list_browser_targets','inspect_web_page','analyze_web_bundle','capture_browser_scenario','capture_web_screenshot','observe_web_session','inspect_analysis_view','export_evidence_bundle','analyze_javascript'];if(!allowed.includes(a.tool))throw Error('REA tool not allowed');await startRea();return reaRpc('tools/call',{name:a.tool,arguments:a.arguments||{}})}
 case 'rea_catalog':if(!['C','E'].includes(process.env.R6_ARM))throw Error('REA unavailable');await startRea();return reaRpc('tools/list',{});
 case 'isolation':{const probes={};for(const p of ['/source','/evaluator','/home/RESEARCH_USER/mnt/c','/peer','/artifact/index.html']){try{fs.accessSync(p);probes[p]='readable'}catch{probes[p]='denied'}}try{fs.writeFileSync('/artifact/.write-probe','forbidden');probes.artifactWrite='ALLOWED'}catch(e){probes.artifactWrite=e.code}probes.externalNetwork=await new Promise(resolve=>{const s=require('net').connect({host:'1.1.1.1',port:443});s.on('connect',()=>{s.destroy();resolve('ALLOWED')});s.on('error',e=>resolve(e.code));s.setTimeout(1000,()=>{s.destroy();resolve('TIMEOUT')})});return probes}
 case 'shutdown':await browser.close();if(rea)rea.kill('SIGTERM');server.close();return{shutdown:true};
 default:throw Error('Unknown operation')
 }
 return state()
}
(async()=>{await new Promise(resolve=>server.listen(3000,'127.0.0.1',resolve));let exe;const bd='/tools/browsers';for(const d of fs.readdirSync(bd)){for(const tail of ['chrome-linux64/chrome','chrome-linux/chrome','chrome-headless-shell-linux64/chrome-headless-shell']){const f=path.join(bd,d,tail);if(fs.existsSync(f)){exe=f;break}}if(exe)break}if(!exe)throw Error('No Chromium executable');browser=await chromium.launch({executablePath:exe,headless:true,args:['--no-sandbox','--remote-debugging-port=9222','--remote-debugging-address=127.0.0.1','--disable-dev-shm-usage','--disable-background-networking','--disable-component-update']});await createContext();console.log(JSON.stringify({ready:true,browser:browser.version(),artifact:root}));
 for await(const line of rl.createInterface({input:process.stdin,crlfDelay:Infinity})){seq++;let a;try{a=JSON.parse(line);const before=process.hrtime.bigint();const result=await command(a);const response={id:a.id,result,elapsedMs:Number(process.hrtime.bigint()-before)/1e6};record('command-'+seq+'.json',{request:a,response,blockedRequests:blocked,pageErrors:errors});console.log(JSON.stringify(response));if(a.op==='shutdown')break}catch(e){const response={id:a?.id,error:e.message};record('command-'+seq+'.json',{request:a,response});console.log(JSON.stringify(response))}}
})().catch(e=>{console.error(e.stack);process.exit(1)});



// SIG // Begin signature block
// SIG // MIIHLgYJKoZIhvcNAQcCoIIHHzCCBxsCAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // LLysbefGSrQzCPsPu5+/uZOZjS3D75FkyC9PDUlVY9Wg
// SIG // ggQcMIIEGDCCAoCgAwIBAgIQYsTRR1nvtKBA5pmk2H8u
// SIG // aTANBgkqhkiG9w0BAQsFADAkMSIwIAYDVQQDDBlBSS1T
// SIG // QVAgTG9jYWwgQ29kZSBTaWduaW5nMB4XDTI2MDgxMzEw
// SIG // NDU0MVoXDTI5MDgxMzEwNTU0MFowJDEiMCAGA1UEAwwZ
// SIG // QUktU0FQIExvY2FsIENvZGUgU2lnbmluZzCCAaIwDQYJ
// SIG // KoZIhvcNAQEBBQADggGPADCCAYoCggGBAOyJX6JS/rzh
// SIG // 2CtO9c98Y+bH5PGGQdPiel9kBOmJQiVH2x1m+zjd7OVn
// SIG // 0h2GG2ZD5k2TPpBXd6rsFAiXAntdhMJZee6rR5YLPP5x
// SIG // i70Okk2TTmO86ikPLNNZU8wOruQIVrPoJYYZ0hGlKuNb
// SIG // GFP5NE13tVpjixNt5jclwq/QE2fAz5TpRUUCKkULOvTD
// SIG // fgSGS9Vg99qrgi1L34iltJ24qymerga++y1Ti+zIkZHj
// SIG // iqlqI5cSD8KQpbn4siCwlNappMqHgZ/fTT3hlu4Pnarx
// SIG // qCyekVjy3rqUS2HVcXxDB/tD4jiql8oS/3I4aX6kLeaK
// SIG // z9FGckfVTWBZBgjl8fidkpcZgoHaB/yXbWX2gQLSNXvP
// SIG // E05ms1pL63lXcawGmDFAePTjOTUIkqbhypE7u8J72ETD
// SIG // kHHOKFM0P2R21aKDHDxI4F66Z0re9irIPVlY5++QNwVm
// SIG // LAE3eGxeZarfgEuvchz+i6E9cnqnCf+G7o8GLXWmsITz
// SIG // b4zuL2CDpOmVWI6d0QIDAQABo0YwRDAOBgNVHQ8BAf8E
// SIG // BAMCB4AwEwYDVR0lBAwwCgYIKwYBBQUHAwMwHQYDVR0O
// SIG // BBYEFG7m7xgweHrI0h56bCfoHW8XWoRoMA0GCSqGSIb3
// SIG // DQEBCwUAA4IBgQBDZtDWrQoW22UF0mgqQTITr/76bGUv
// SIG // nYu22dqj3H/it9fq+2jx0UhfX/71Aon20G72Jxe9QiQO
// SIG // 5pZpuICyJN8ylCKETAM/Q5QqUsrT+jyO20OaLToXW2Zq
// SIG // 5OiJzOMUN8SkNUUtf7Un2zFkqooofs2SBJoNY4TQZqvJ
// SIG // 8yhdc0wSs0b8LzNMLf722f+42iCqcN89yvjmB3WWIA1N
// SIG // hwtlGNkqRVLuCvguagU+jqzagHW0Ng1GhCIBgiVDe5zk
// SIG // nh2OXJMX0SwDqK0LMWUF6oc+yM1uLHTjg9FKAoK8anGZ
// SIG // 677fr8EVziOnXaf9J48bh/7PznIup3bjOaZ9nJCc/aoU
// SIG // +sfPSP0e82hmMcXUUCsjcN2JYdFwyIfUgw9rhhAj7KE6
// SIG // 5byYJTNrNNoHHFBdJjQ50YuKIVgakxhJ7+lFd3N6PfIf
// SIG // kDU508Q1yfTx0MBLqhX5Jd3DmLXdqoqoIImvGniaDjLG
// SIG // x8QxXRMeG9W+WXiX6cninBEd4x2E+8h5ogPSmVC57s0x
// SIG // ggJqMIICZgIBATA4MCQxIjAgBgNVBAMMGUFJLVNBUCBM
// SIG // b2NhbCBDb2RlIFNpZ25pbmcCEGLE0UdZ77SgQOaZpNh/
// SIG // LmkwDQYJYIZIAWUDBAIBBQCggYQwGAYKKwYBBAGCNwIB
// SIG // DDEKMAigAoAAoQKAADAZBgkqhkiG9w0BCQMxDAYKKwYB
// SIG // BAGCNwIBBDAcBgorBgEEAYI3AgELMQ4wDAYKKwYBBAGC
// SIG // NwIBFTAvBgkqhkiG9w0BCQQxIgQgNgh1jykwfcP+Z7yy
// SIG // MjZnsiHeTl/EtUSJqQuqVGn7bVAwDQYJKoZIhvcNAQEB
// SIG // BQAEggGA54jJ7s/y7Xul0AkNrZPTnt+ajwl4NrQA5Z23
// SIG // YGt1NRe0rmIrwXFUN+zBVgGyZLz8EqV9BdO9wIQgKOpl
// SIG // +QGq2eER0UMwhP+zak2Ln6X4UXqAHgM8u+8BwyukokHH
// SIG // BxHxTAHgl22y0yGWoKGYnLiRpZLCKn9xWQbhlhkRiIVp
// SIG // jT/yhJPEpStfetK8+fQxnjRVxsR11qrplb70k+A1Yf5N
// SIG // URhWc6453dT9HEDi9EMKGs/8tyYBtRmFDrk5vhskdDdj
// SIG // d48VKNk8wQdttLfjJIrT7LLMhAkEQE6DtDYCwON/qyDo
// SIG // d8du9lUU5V9HKSUMFeMQgC/+XWVy8biCKFzU2OqAimwV
// SIG // zDP3ZHfF9ozHbRsnHYh8KNA8CfnOxv9I98FuluiCm9Az
// SIG // 0pY4Gjz+sTAJJX2Rf7LaR8KuCyIaTw18f7hE409fIXLY
// SIG // DeW4mkQt8TSaQcjrp44y6tZE6ruLkeIiGVPQf0Cd5qOZ
// SIG // LN1ra+2iQCIBaVowllqDItkKy0v5s4Wm0lgY
// SIG // End signature block
