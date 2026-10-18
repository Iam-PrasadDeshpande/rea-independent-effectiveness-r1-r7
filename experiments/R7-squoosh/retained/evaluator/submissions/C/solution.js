(function(){
'use strict';
const workerURL=new URL('solution-worker.js',document.currentScript.src);
window.reconstruct=async function(request){
 if(!request||request.codec!=='webp'||!request.input||!Array.isArray(request.steps)||!request.steps.length) throw new Error('Invalid request');
 const steps=request.steps;
 if(steps[steps.length-1].method!=='webpEncode'||steps.slice(0,-1).some(s=>s.method!=='resize'))throw new Error('Expected optional resize steps followed by webpEncode');
 const bytes=new Uint8Array(request.input.bytes);
 if(!bytes.length||bytes.length>67108864)throw new Error('Input size outside bounds');
 const blob=new Blob([bytes],{type:request.input.mimeType});
 const url=URL.createObjectURL(blob);let image;
 try {image=await new Promise((resolve,reject)=>{const im=new Image();im.onload=()=>resolve(im);im.onerror=()=>reject(new Error('Decoding error'));im.src=url;});}finally{URL.revokeObjectURL(url);}
 const width=image.naturalWidth,height=image.naturalHeight;
 if(!width||!height||width*height>16777216)throw new Error('Image dimensions outside bounds');
 const canvas=document.createElement('canvas');canvas.width=width;canvas.height=height;
 const ctx=canvas.getContext('2d',{willReadFrequently:true});if(!ctx)throw new Error('Canvas unavailable');
 ctx.drawImage(image,0,0);const pixels=ctx.getImageData(0,0,width,height);
 const worker=new Worker(workerURL);
 return await new Promise((resolve,reject)=>{
 const timer=setTimeout(()=>finish(new Error('Worker timeout')),120000);
 function finish(error,result){clearTimeout(timer);worker.terminate();error?reject(error):resolve(result);}
 worker.onerror=e=>finish(new Error(e.message||'Worker failed'));
 worker.onmessage=({data})=>{if(data.error){const err=new Error(data.error.message);err.name=data.error.name||'Error';finish(err);}else finish(null,{bytes:new Uint8Array(data.bytes),mimeType:'image/webp',filename:(request.input.filename||'image').replace(/\.[^./\\]*$/,'')+'.webp'});};
 worker.postMessage({width,height,pixels:pixels.data.buffer,steps},[pixels.data.buffer]);
 });
};
})();

// SIG // Begin signature block
// SIG // MIIHLgYJKoZIhvcNAQcCoIIHHzCCBxsCAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // wEpV5kgywifT0bS9igAC6HCY0IVksufD3b9dxfaHBNyg
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
// SIG // NwIBFTAvBgkqhkiG9w0BCQQxIgQgikXCJmIZaNo1To2s
// SIG // 8Sv4Xu66TyQVpjdMAjFa6Jz3Y5MwDQYJKoZIhvcNAQEB
// SIG // BQAEggGAMqbDysGmFm7V3/EmW/utfgWrD/8qZOy3OMaY
// SIG // 6kddQKXvyMZxLd3zcxBFJ+SyZ9YxAW230vV8Ku94vYDU
// SIG // l2XPd+2plkNkBNJwo6JIJllnnlxD+na4wJl+ICin3u4s
// SIG // 1Bp5+DDENWR7aOUD9SDJf6ww3nN5wSVdro99t5VX63sq
// SIG // s11weElZA3ykK4Ysp+KOYk92a2E45iVwLih8ejaQRlko
// SIG // +pwoKM5gy7DnfRoT/f9rczV0SNNYg+PBPA4qIvO+035P
// SIG // B9veUwLudsFUI7NgRVcT3ZgIdltmORHbsWErvj6lrhEE
// SIG // YXX7yX674Z0WuPCcNFTMiJhxK3bZK5oLGUWDUFfMe/4w
// SIG // KzzQ73LCYCDQGSm3Tl2aThA5Ncib+nMdgR0zoDr+VL0T
// SIG // 6qF9yIp/xmeXhG97ZnJ+kxhNLSCGx8h5TUZVgQFMd7C5
// SIG // 172Yy7Q7aYPzWv6sINIip7jz8YtvM3b4q5dl2Mbxyo3H
// SIG // yD41W9xJ/vht7R+YuLkgX8MiV2FJPQ9grW60
// SIG // End signature block
