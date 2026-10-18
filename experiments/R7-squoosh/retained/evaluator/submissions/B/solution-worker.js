/* Independent worker protocol and resize memory bridge; original WebP glue is loaded unchanged. */
'use strict';
async function loadCodec() {
  async function load(js, wasm) {
    let factory;
    self.define = function(deps, body) { const exports = {}; body({uri: new URL(js, self.location.origin).href}, function() { throw new Error('Unexpected codec dependency'); }, exports); factory = exports.default; };
    try { importScripts(js); } finally { delete self.define; }
    if (typeof factory !== 'function') throw new Error('Missing WebP factory');
    const response = await fetch(wasm);
    if (!response.ok) throw new Error('WebP WASM unavailable');
    return factory({wasmBinary: await response.arrayBuffer(), noInitialRun: true});
  }
  const simd = WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,10,1,8,0,65,0,253,15,253,98,11]));
  return simd ? load('/c/webp_enc_simd-2d7d2456.js', '/c/webp_enc_simd-75acd924.wasm') : load('/c/webp_enc-75623855.js', '/c/webp_enc-a8223a7d.wasm');
}
async function resize(image, options) {
  const width = options.width, height = options.height;
  if (!Number.isInteger(width) || !Number.isInteger(height) || width < 1 || height < 1 || width * height > 16777216) throw new Error('Invalid or excessive resize dimensions');
  const kernel = ['triangle', 'catrom', 'mitchell', 'lanczos3'].indexOf(options.method);
  if (kernel < 0) throw new Error('Unsupported resize method: ' + options.method);
  let source = image.data, sw = image.width, sh = image.height;
  if (options.fitMethod === 'contain') {
    const aspect = width / height;
    let cropWidth, cropHeight, sx, sy;
    if (aspect > sw / sh) { cropWidth = sw; cropHeight = sw / aspect; sx = 0; sy = (sh - cropHeight) / 2; }
    else { cropHeight = sh; cropWidth = sh * aspect; sx = (sw - cropWidth) / 2; sy = 0; }
    sx = Math.round(sx); sy = Math.round(sy); cropWidth = Math.round(cropWidth); cropHeight = Math.round(cropHeight);
    const cropped = new Uint8Array(cropWidth * cropHeight * 4);
    for (let y = 0; y < cropHeight; y++) cropped.set(source.subarray(((y + sy) * sw + sx) * 4, ((y + sy) * sw + sx + cropWidth) * 4), y * cropWidth * 4);
    source = cropped; sw = cropWidth; sh = cropHeight;
  }
  const response = await fetch('/c/squoosh_resize_bg-3d426466.wasm');
  if (!response.ok) throw new Error('Resize WASM unavailable');
  const {instance} = await WebAssembly.instantiate(await response.arrayBuffer(), {});
  const wasm = instance.exports;
  const stack = wasm.__wbindgen_add_to_stack_pointer(-16);
  try {
    const pointer = wasm.__wbindgen_malloc(source.length);
    new Uint8Array(wasm.memory.buffer).set(source, pointer);
    wasm.resize(stack, pointer, source.length, sw, sh, width, height, kernel, !!options.premultiply, !!options.linearRGB);
    const returned = new Int32Array(wasm.memory.buffer);
    const address = returned[stack / 4], length = returned[stack / 4 + 1];
    if (length !== width * height * 4) throw new Error('Unexpected resize result length');
    const data = new Uint8ClampedArray(wasm.memory.buffer, address, length).slice();
    wasm.__wbindgen_free(address, length);
    return {data, width, height};
  } finally { wasm.__wbindgen_add_to_stack_pointer(16); }
}
self.onmessage = async function(event) {
  try {
    let image = {data: event.data.data, width: event.data.width, height: event.data.height};
    const steps = event.data.steps;
    for (let i = 0; i < steps.length - 1; i++) image = await resize(image, steps[i].options || {});
    const options = steps[steps.length - 1].options;
    if (!options || Object.values(options).some(value => typeof value !== 'number' || !Number.isFinite(value))) throw new Error('WebP settings must be finite numbers');
    const codec = await loadCodec();
    const output = codec.encode(image.data, image.width, image.height, options);
    if (!output || !output.length) throw new Error('Encoding error.');
    const bytes = new Uint8Array(output).slice();
    self.postMessage({bytes}, [bytes.buffer]);
  } catch (error) { self.postMessage({error: String(error && error.message || error)}); }
};

// SIG // Begin signature block
// SIG // MIIHLgYJKoZIhvcNAQcCoIIHHzCCBxsCAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // 0VZFc8UCiMqABVWBDg7SMfU0xwtvieDQTpaMz38cNGCg
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
// SIG // NwIBFTAvBgkqhkiG9w0BCQQxIgQgPQYnw7/GIIgT1Gc/
// SIG // vY+0gTaTxQu+QBPgU7vdVYVYPQswDQYJKoZIhvcNAQEB
// SIG // BQAEggGANxyyTrCXAi5Ad5rMHCW66Zb77EZIK/oQiTfz
// SIG // E72mM1W1QBbJ29NMnepVc824xECAeCfzmEzCNi0Euuen
// SIG // Yg5Mh+6k8Lzv0S/BI2Fce+BSRMNHwMFWABAT1LcI8Hd/
// SIG // Mpfz0mDXBdLrL+f2xD8LSuNW9qMWXWk41cM/kFuiwnEG
// SIG // J60VeCud09mbVc/UfSSggW7cO8QTAWm0Qe1M0iRHaCqv
// SIG // 7EbmgJokPuhIPjlLVlSqigHSeFMdRqugO1XjbKbcIjE2
// SIG // ltuAQewgd07Txj0AQnp0OPO3X3CtVXWbLF5QDfeV9Pqu
// SIG // YejOcArt8Wcdjf6whVdAB1eaIz62hFcSOPhK5R1Me7zl
// SIG // xaMaSwbXJpZSUliYhJ8WofMn3K7dwCllZUVmsF9kGEnU
// SIG // d6RBshdVV37NkT0zZSc67wWM6eYoRJqdjAebxKO6UX70
// SIG // hDPRg6OzaMEbWuvmnq8+VP2Vb1F0kG02FKfAC3CfRro6
// SIG // WSF/OU4FpAkiEYbxUgFckS9FilNnPanZQ6w9
// SIG // End signature block
