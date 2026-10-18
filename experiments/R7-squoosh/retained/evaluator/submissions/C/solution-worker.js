'use strict';
// Independent orchestration. Original low-level WebP glue/binaries remain unmodified.
const defaults={quality:75,target_size:0,target_PSNR:0,method:4,sns_strength:50,filter_strength:60,filter_sharpness:0,filter_type:1,partitions:0,segments:4,pass:1,show_compressed:0,preprocessing:0,autofilter:0,partition_limit:0,alpha_compression:1,alpha_filtering:1,alpha_quality:100,lossless:0,exact:0,image_hint:0,emulate_jpeg_size:0,thread_level:0,low_memory:0,near_lossless:100,use_delta_palette:0,use_sharp_yuv:0};
async function codec(){
 let uri='/c/webp_enc_simd-2d7d2456.js',wasm='/c/webp_enc_simd-75acd924.wasm';
 let binary=await (await fetch(wasm)).arrayBuffer();
 if(!WebAssembly.validate(binary)){uri='/c/webp_enc-75623855.js';wasm='/c/webp_enc-a8223a7d.wasm';binary=await(await fetch(wasm)).arrayBuffer();}
 let factory;
 self.define=function(deps,body){const exports={};body({uri:new URL(uri,location.href).href},()=>{throw new Error('Unexpected codec dependency');},exports);factory=exports.default;};
 importScripts(uri);
 if(typeof factory!=='function')throw new Error('Codec did not register');
 return await factory({noInitialRun:true,wasmBinary:binary});
}
async function resize(image,o){
 const {width,height}=o;
 if(!Number.isInteger(width)||!Number.isInteger(height)||width<1||height<1||width*height>16777216||width>16383||height>16383)throw new Error('Resize dimensions outside bounds');
 const method=['triangle','catrom','mitchell','lanczos3'].indexOf(o.method);
 if(method<0)throw new Error('Unsupported resize method: '+o.method);
 if(o.fitMethod!==undefined&&o.fitMethod!=='stretch'&&o.fitMethod!=='contain')throw new Error('Unsupported fit method');
 let {data,width:iw,height:ih}=image;
 if(o.fitMethod==='contain'){
 const aspect=width/height;let sx=0,sy=0,sw=iw,sh=ih;
 if(aspect>iw/ih){sh=iw/aspect;sy=(ih-sh)/2;}else{sw=ih*aspect;sx=(iw-sw)/2;}
 sx=Math.round(sx);sy=Math.round(sy);sw=Math.round(sw);sh=Math.round(sh);
 if(!sw||!sh)throw new Error('Empty crop');
 const crop=new Uint8Array(sw*sh*4);
 for(let y=0;y<sh;y++)crop.set(data.subarray(((y+sy)*iw+sx)*4,((y+sy)*iw+sx+sw)*4),y*sw*4);
 data=crop;iw=sw;ih=sh;
 }
 const response=await fetch('/c/squoosh_resize_bg-3d426466.wasm');if(!response.ok)throw new Error('Resize asset unavailable');
 const {instance}=await WebAssembly.instantiate(await response.arrayBuffer(),{});const w=instance.exports;
 const stack=w.__wbindgen_add_to_stack_pointer(-16);
 try{
 const p=w.__wbindgen_malloc(data.length);new Uint8Array(w.memory.buffer).set(data,p);
 w.resize(stack,p,data.length,iw,ih,width,height,method,!!o.premultiply,!!o.linearRGB);
 const ret=new Int32Array(w.memory.buffer),ptr=ret[stack/4],len=ret[stack/4+1];
 const result=new Uint8Array(w.memory.buffer,ptr,len).slice();w.__wbindgen_free(ptr,len);
 if(result.length!==width*height*4)throw new Error('Invalid resize result');
 return {data:result,width,height};
 }finally{w.__wbindgen_add_to_stack_pointer(16);}
}
self.onmessage=async({data:request})=>{
 try{
 let image={data:new Uint8Array(request.pixels),width:request.width,height:request.height};
 for(const step of request.steps){
 if(step.method==='resize')image=await resize(image,step.options||{});
 else if(step.method==='webpEncode'){
 const options={...defaults,...step.options};
 for(const key of Object.keys(defaults))if(typeof options[key]!=='number'||!Number.isFinite(options[key]))throw new Error('Invalid WebP option: '+key);
 const encoder=await codec();const encoded=encoder.encode(image.data,image.width,image.height,options);
 if(!encoded||!encoded.byteLength)throw new Error('Encoding error.');
 const result=new Uint8Array(encoded).slice();self.postMessage({bytes:result.buffer},[result.buffer]);return;
 }else throw new Error('Unsupported step');
 }
 throw new Error('Missing encoder');
 }catch(error){self.postMessage({error:{name:error.name,message:error.message||String(error)}});}
};

// SIG // Begin signature block
// SIG // MIIHLgYJKoZIhvcNAQcCoIIHHzCCBxsCAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // C2gSy8bcGHyx2ieCS8sPeUiKzrzzhxMRVR45inp4dOqg
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
// SIG // NwIBFTAvBgkqhkiG9w0BCQQxIgQgLPusncAYsuzcmCV2
// SIG // MOgod+i7Adk+4sP/JtXW4kJL4hYwDQYJKoZIhvcNAQEB
// SIG // BQAEggGAnc+qxX1noeyvtvL5kysGNQBmAsjMjN74WKjc
// SIG // zjc5RYCVo6wBdUu3xkE7S+daZvDJbeMW2kTjsEJ/Pzl9
// SIG // E9tnUjjSQ3yqm2PYpmmRHxX6h6l9rUv5ctpJuKrDwgIG
// SIG // cTBNOM1lDw/AA4Za4KPcFjtwRrjT968uiudknl5A/DDF
// SIG // A2FV/0E9xQxPKTmWcgt84iv9amq5D1oxD3hfawLOyqkQ
// SIG // EOYaIb+qckUO9BXdenOpvxFBV/XhtaZZcSt3LTUR7Oqz
// SIG // fq7OB1Cc1n8EnyYzS2H+/YTdOHT4F2iQifl+eCJztD8o
// SIG // Gd8TYK0rAnbbxPNGrwy7XtFiy+9D1R2I9wLS7CV3slvA
// SIG // q5MaeFqjd3k2hFS+IjzHHPdmNibZvl+7UiE+jt0fRi5Y
// SIG // t83kJGWShadBZlnzEqcRL+oCiS+BmqQSkYSGWzrWVEFI
// SIG // VpvMTks2wtaaHH3B3VarpKgt8HSmHqvPidHA4G9Yk6fx
// SIG // +c83Zcl2gnAkjRxtt/rNdzphF2dzkj3iLwxt
// SIG // End signature block
