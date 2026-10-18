import test from 'node:test';
import assert from 'node:assert/strict';
import Service from 'file:///app/gen/srv/srv/mail-insights-service.js';
import { ACTIONS } from 'file:///app/gen/srv/srv/constants.js';
import { reconstructAddMails } from 'file:///reconstruction/submitted.js';

const fixtures=[
 {name:'B1 success and orchestration order'},
 {name:'B2 insertion target and selected IDs',multiple:true},
 {name:'B3 action description mapping and fallback',actions:true},
 {name:'B4 absent suggestedActions',absentActions:true},
 {name:'B5 generation failure',failure:'generate'},
 {name:'B6 insertion failure',failure:'insert'},
 {name:'B7 readback failure',failure:'select'},
 {name:'B8 empty batch',empty:true}
];
function makeFixture(options){
 const rows=options.empty?[]:[{ID:'synthetic-id-1',subject:'Synthetic flight question',...(options.absentActions?{}:{suggestedActions:options.actions?[{type:'Hotel',value:'Hotel Availability'},{type:'General',value:'Unknown synthetic action'}]:[]})}];
 if(options.multiple)rows.push({ID:'synthetic-id-2',subject:'Synthetic second question',suggestedActions:[]});
 const calls=[];const logs=[];const errors=[];
 const req={data:{mails:rows.map(({ID,subject})=>({ID,subject})),rag:true},error(message){errors.push(message);return {fixtureRequestError:message};}};
 const deps={
  actionDescriptions:ACTIONS,
  async generateInsights(mails,rag){calls.push(['generate',mails,rag]);if(options.failure==='generate')throw new Error('synthetic generation failure');return structuredClone(rows);},
  async insert(target,values){calls.push(['insert',target,structuredClone(values)]);if(options.failure==='insert')throw new Error('synthetic insertion failure');},
  async select(ids){calls.push(['select',ids]);if(options.failure==='select')throw new Error('synthetic readback failure');return structuredClone(rows);},
  logError(message){logs.push(message);}
 };
 return {req,deps,calls,logs,errors};
}
async function runReference(fixture){
 const service=new Service('ReconstructionOracle');
 Object.defineProperty(service,'entities',{value:{Mails:'fixture.Mails'}});
 service.generateInsights=fixture.deps.generateInsights;
 Object.defineProperty(globalThis,'INSERT',{configurable:true,value:{into(target){return {entries:rows=>fixture.deps.insert(target,rows)};}}});
 Object.defineProperty(globalThis,'SELECT',{configurable:true,value:{from(){return {where:filter=>fixture.deps.select(filter.ID.in)};}}});
 const originalLog=console.error;console.error=fixture.deps.logError;
 try{return await service.onAddMails(fixture.req);}finally{console.error=originalLog;}
}
for(const options of fixtures){
 test(options.name,async()=>{
  const reference=makeFixture(options);const reconstructed=makeFixture(options);
  const expected=await runReference(reference);
  const actual=await reconstructAddMails(reconstructed.req,reconstructed.deps);
  assert.deepEqual(actual,expected,'return value must match the original compiled handler');
  assert.deepEqual(reconstructed.calls,reference.calls,'dependency call arguments/order must match');
  assert.deepEqual(reconstructed.errors,reference.errors,'req.error must match');
  assert.deepEqual(reconstructed.logs,reference.logs,'error logging must match');
 });
}

// SIG // Begin signature block
// SIG // MIIHLgYJKoZIhvcNAQcCoIIHHzCCBxsCAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // 0RLUk3KY8955cyhSzrhY8fNGX+1MmNjyaJ5ES+BD0yGg
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
// SIG // NwIBFTAvBgkqhkiG9w0BCQQxIgQg3uBrwQztxmXk9Y0R
// SIG // zZhjcLPi8n4OsrgKL/iNBqoPw3MwDQYJKoZIhvcNAQEB
// SIG // BQAEggGA56sloI7N+l6CMc9VxAJ/FDE2JPb1wb/gAAZH
// SIG // X0FM8YvLsWmO47VAby1QIWxOGq12/dTOGr4zpAAy2BUw
// SIG // htZP2vf6sv//v0RSvObLtg4ocREY3gJerGr0i7h3qkgt
// SIG // aX81pndylKOan5A/cyAYwu7Kum0OWYhAxBLMMow6fYGu
// SIG // 0z4djEGC+DVr6pVDdiLCgt7iOzlAlQtmFeMapl/c9vv9
// SIG // 75NarssWZrxjScUt/zra01x2WaHRaeGMAKQLKehb/JZT
// SIG // phqj/cq9/99GUxlUjpbkb40586oeio/SKrN4gwiAiIT4
// SIG // 670eI9/aQp5MgWOaXCRd5BphnLxkr9/84b9fpZ70oERL
// SIG // 45xVqLfuOKC+NKkMFO3J8lG5U6CYmVM/JFvZGCKLDRUV
// SIG // YehwQy4lMDtjW35VzFHi//nimuWWN8lIiusF7ew5JtQp
// SIG // xhAX1NdzLI1HcrNnCqqog1UtvxYY2zKhri+egnYER9jV
// SIG // Y2by+OitxDQfS8FupZeRKW78WQU4uw6Nkz9G
// SIG // End signature block
