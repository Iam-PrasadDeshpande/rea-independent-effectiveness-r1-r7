/* Independent protocol, AMD adapter, crop logic and resize memory bridge. */
'use strict';
const MAX_PIXELS = 16777216;
const filters = ['triangle', 'catrom', 'mitchell', 'lanczos3'];
let encoderPromise, resizePromise;
function checkDimensions(w,h) {
  if (!Number.isInteger(w) || !Number.isInteger(h) || w < 1 || h < 1 || w > 16383 || h > 16383 || w*h > MAX_PIXELS) throw new Error('Invalid or excessive image dimensions');
}
async function encoder() {
  if (!encoderPromise) encoderPromise = (async () => {
    const simd = WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,10,1,8,0,65,0,253,15,253,98,11]));
    const js = simd ? '/c/webp_enc_simd-2d7d2456.js' : '/c/webp_enc-75623855.js';
    const wasm = simd ? '/c/webp_enc_simd-75acd924.wasm' : '/c/webp_enc-a8223a7d.wasm';
    let factory;
    self.define = function (deps, register) {
      const exports = {};
      register(...deps.map(dep => {
        if (dep === 'module') return {uri:new URL(js, self.location.href).href};
        if (dep === 'exports') return exports;
        if (dep === 'require') return () => {throw new Error('Unexpected codec dependency');};
        throw new Error('Unknown codec dependency');
      }));
      factory = exports.default;
    };
    try { importScripts(js); } finally { delete self.define; }
    if (typeof factory !== 'function') throw new Error('Codec module did not register');
    return factory({noInitialRun:true, locateFile:() => wasm});
  })();
  return encoderPromise;
}
async function resize(image, options) {
  const {width, height, method, fitMethod, premultiply, linearRGB} = options;
  checkDimensions(width,height);
  const filter = filters.indexOf(method);
  if (filter < 0) throw new Error('Unsupported resize filter: ' + method);
  if (fitMethod !== undefined && fitMethod !== 'stretch' && fitMethod !== 'contain') throw new Error('Unsupported fit method');
  let source = image;
  if (fitMethod === 'contain') {
    const aspect = width / height;
    let sx=0, sy=0, sw=image.width, sh=image.height;
    if (aspect > image.width/image.height) { sh=image.width/aspect; sy=(image.height-sh)/2; }
    else { sw=image.height*aspect; sx=(image.width-sw)/2; }
    sx=Math.round(sx); sy=Math.round(sy); sw=Math.round(sw); sh=Math.round(sh);
    checkDimensions(sw,sh);
    const cropped = new Uint8Array(sw*sh*4);
    for (let row=0;row<sh;row++) {
      const start=((row+sy)*image.width+sx)*4;
      cropped.set(image.data.subarray(start,start+sw*4),row*sw*4);
    }
    source={width:sw,height:sh,data:cropped};
  }
  if (!resizePromise) resizePromise = (async () => {
    const response=await fetch('/c/squoosh_resize_bg-3d426466.wasm');
    if (!response.ok) throw new Error('Resize asset failed to load');
    return (await WebAssembly.instantiate(await response.arrayBuffer(),{})).instance.exports;
  })();
  const wasm=await resizePromise;
  const stack=wasm.__wbindgen_add_to_stack_pointer(-16);
  let output=0, length=0;
  try {
    const pointer=wasm.__wbindgen_malloc(source.data.byteLength);
    new Uint8Array(wasm.memory.buffer).set(source.data,pointer);
    // The resize function takes ownership of its input allocation.
    wasm.resize(stack,pointer,source.data.byteLength,source.width,source.height,width,height,filter,premultiply,linearRGB);
    const result=new Int32Array(wasm.memory.buffer);
    output=result[stack/4]; length=result[stack/4+1];
    if (length !== width*height*4) throw new Error('Unexpected resize output size');
    return {width,height,data:new Uint8Array(wasm.memory.buffer,output,length).slice()};
  } finally {
    if (output) wasm.__wbindgen_free(output,length);
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
self.onmessage = async function(event) {
  const message=event.data;
  try {
    let image={width:message.width,height:message.height,data:new Uint8Array(message.rgba)};
    checkDimensions(image.width,image.height);
    if (image.data.length !== image.width*image.height*4) throw new Error('Invalid RGBA payload');
    let output;
    for (const step of message.steps) {
      if (step.method === 'resize') image=await resize(image,step.options || {});
      else if (step.method === 'webpEncode') {
        if (!step.options || Object.values(step.options).some(value => typeof value !== 'number' || !Number.isFinite(value))) throw new Error('WebP settings must be finite numbers');
        const module=await encoder();
        const result=module.encode(image.data,image.width,image.height,step.options);
        if (!result || !result.byteLength) throw new Error('Encoding error.');
        output=new Uint8Array(result).slice();
      } else throw new Error('Unsupported method');
    }
    if (!output) throw new Error('No encoded output');
    self.postMessage({id:message.id,bytes:output.buffer},[output.buffer]);
  } catch (error) {
    self.postMessage({id:message.id,error:{name:error.name || 'Error',message:error.message || String(error)}});
  }
};

// SIG // Begin signature block
// SIG // MIIHLgYJKoZIhvcNAQcCoIIHHzCCBxsCAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // kSTfqnZssT1OVvl8TGojKazMvxg2X2OXQA+dryAg+BOg
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
// SIG // NwIBFTAvBgkqhkiG9w0BCQQxIgQgcm5jzv6fjam+ZKr+
// SIG // axILMfDYYa4ymrouRXamdZMMCogwDQYJKoZIhvcNAQEB
// SIG // BQAEggGAyui9ceXcQ0v3WfYR+JdzcUCux6l1oGnqjk8P
// SIG // 8rdyTFaCkw6deAuB99n+Ju0tWoy0i3/EV7vMTcN0p2VW
// SIG // ShyOuwtiloFETQ92ABIeRvGzuyrbd93YmSGxDCDUt9v/
// SIG // KUtbyIeLcyjV6UAyM/3pbKX59EQ/7V6j2MV+cJSWRS9t
// SIG // 889e87gjjUm0740bKJjRqSw0TJm6nexHznSv/9ITDszs
// SIG // jWaa5qmd/6H2xL1BFqR6qasSBb1DrdD4/1oG8Pd7+orc
// SIG // fY+oDkpNf3sRTuoP1vy4wdVIJ4T5MC6FX6JK5Kbw1G5J
// SIG // KpjQazujZ0NFgmhHd4pHCgib0ktNpI1JoEqJpHNfkwxn
// SIG // jz6qJGKahyUwTRdlMXG35iTOjzbt4iISkoAlrAakFDl5
// SIG // 5dou0gUCcxzCQTre2IOz27zVCas42rH4y4xI0hFQrWt1
// SIG // 94AtT/humPH4pdX8krKh2JY/YBcMZakwMg2F701sRXek
// SIG // 2tSezulwZsOHIwIrph/yNkLIcDBSRF7HhE0S
// SIG // End signature block
