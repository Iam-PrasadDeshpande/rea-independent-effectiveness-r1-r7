import fs from 'node:fs';
import {pathToFileURL} from 'node:url';
import path from 'node:path';
const root=path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/,'$1'));
const dir=path.dirname((await import('node:url')).fileURLToPath(import.meta.url));
const cases=JSON.parse(fs.readFileSync(path.join(dir,'cases.json'),'utf8'));
const gold=JSON.parse(fs.readFileSync(path.join(dir,'expected.json'),'utf8')).outputs;
const normalize=v=>JSON.parse(JSON.stringify(v));
const stable=v=>v&&typeof v==='object'?(Array.isArray(v)?v.map(stable):Object.fromEntries(Object.keys(v).sort().map(k=>[k,stable(v[k])]))):v;
const reports=[];
for(const arm of ['B','C']){
 let search,loadError;try{search=(await import(pathToFileURL(path.join(dir,arm+'.mjs')))).search;if(typeof search!=='function')throw Error('Missing search export')}catch(e){loadError=e.message}
 const outcomes=[];
 for(const scenario of cases){
  const env=scenario.environment??{};const trace=[];let lookup=0;
  const invoke=(name,args,value)=>{trace.push({name,args});if(env.throwAt===name)throw Error(`synthetic:${name}`);return structuredClone(value)};
  const provider={modelId:'synthetic-model',dimension:2,embed:async texts=>invoke('embed',[texts],env.queryVectors??[[1,0]])};
  if(env.hasQueryEmbedder!==false)provider.embedQuery=async texts=>invoke('embedQuery',[texts],env.queryVectors??[[1,0]]);
  const deps={provider:env.providerAvailable===false?null:provider,vectorsByNoteId:async id=>invoke('vectorsByNoteId',[id],env.storedVectors??[]),similaritySearch:async(vector,options)=>invoke('similaritySearch',[vector,options],(env.hitsPerVector??[])[lookup++]??[]),folderPreviews:async(id,options)=>invoke('folder',[id,options],(env.folderIds??[]).map(id=>({id}))),tagNoteIds:async id=>invoke('tag',[id],env.tagIds??[])};
  let actual;
  try{if(loadError)throw Error(loadError);actual=normalize({results:await search(structuredClone(scenario.request),deps),trace})}catch(e){actual=normalize({error:e.message,trace})}
  const expected=gold.find(g=>g.id===scenario.id).expected;
  outcomes.push({id:scenario.id,pass:JSON.stringify(stable(actual))===JSON.stringify(stable(expected)),actual,expected});
 }
 reports.push({arm,loadError,passed:outcomes.filter(x=>x.pass).length,total:cases.length,outcomes});
}
fs.writeFileSync(path.join(process.cwd(),'behavior-results.json'),JSON.stringify({boundary:'SearchService.search',comparison:'exact JSON values and dependency traces; key order ignored',reports},null,2));
console.log(JSON.stringify(reports.map(({arm,passed,total,loadError})=>({arm,passed,total,loadError}))));

