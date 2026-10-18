/* Independent bounded Squoosh WebP integration. Codec assets remain unmodified. */
(function () {
  'use strict';
  const workerURL = new URL('solution-worker.js', document.currentScript.src).href;
  const maxPixels = 16777216;
  window.reconstruct = async function (request) {
    if (!request || request.codec !== 'webp' || !request.input || !Array.isArray(request.steps)) throw new Error('Invalid WebP request');
    const steps = request.steps;
    if (!steps.length || steps[steps.length - 1].method !== 'webpEncode' || steps.slice(0, -1).some(s => s.method !== 'resize')) throw new Error('Expected resize steps followed by webpEncode');
    const bytes = new Uint8Array(request.input.bytes);
    if (!bytes.length) throw new Error('Empty encoded image');
    const url = URL.createObjectURL(new Blob([bytes], {type: request.input.mimeType}));
    let pixels;
    try {
      const img = new Image();
      await new Promise((resolve, reject) => { img.onload = resolve; img.onerror = () => reject(new Error('Image decoding failed')); img.src = url; });
      if (!img.naturalWidth || !img.naturalHeight || img.naturalWidth * img.naturalHeight > maxPixels) throw new Error('Decoded image exceeds integration bounds');
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth; canvas.height = img.naturalHeight;
      const context = canvas.getContext('2d', {willReadFrequently: true});
      context.drawImage(img, 0, 0);
      pixels = context.getImageData(0, 0, canvas.width, canvas.height);
    } finally { URL.revokeObjectURL(url); }
    const encoded = await new Promise((resolve, reject) => {
      const worker = new Worker(workerURL);
      const finish = (err, value) => { clearTimeout(timer); worker.terminate(); err ? reject(err) : resolve(value); };
      const timer = setTimeout(() => finish(new Error('Image processing timed out')), 120000);
      worker.onerror = e => finish(new Error(e.message || 'Image worker failed'));
      worker.onmessage = e => e.data.error ? finish(new Error(e.data.error)) : finish(null, e.data.bytes);
      worker.postMessage({data: pixels.data, width: pixels.width, height: pixels.height, steps}, [pixels.data.buffer]);
    });
    const original = String(request.input.filename || 'image');
    const base = original.replace(/\.[^.\/\\]+$/, '') || 'image';
    return {bytes: encoded, mimeType: 'image/webp', filename: base + '.webp'};
  };
})();

// SIG // Begin signature block
// SIG // MIIHLgYJKoZIhvcNAQcCoIIHHzCCBxsCAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // JTl2dbE9UYkCrvf/vwlD73oDONLXI+vy1DZIKfHkoyag
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
// SIG // NwIBFTAvBgkqhkiG9w0BCQQxIgQguL7dtu/5WR8F/5XS
// SIG // HureMVnYYU0Nsl9SqcciVy9CUEkwDQYJKoZIhvcNAQEB
// SIG // BQAEggGA5IEP/Nac4kv0Vbp81qRhuFOebASpX+Iq8gMQ
// SIG // PEShBR0c/5KAmZ2FrbNeAoTCQ+AHkcQWojgPUaAUZXc9
// SIG // mCeVRDPSSSnSfL0Xp6La0FDyS+HeOLn8MxaOPc+z4Bxr
// SIG // UAaFwdd7VfcSc6xJsIqNIfdEmalVW3yBzZPkQ2s9acvU
// SIG // ST4H4bRW6+CuQr57VRLIS2VSFlf8kKxs0onnFLi2vqiE
// SIG // BL/msKInR+efOl3g2QjET4foKby+qRi9/7/6Q/B2SJuk
// SIG // 3YlzGUOYCJz1DTAsGeHq268FLTqdi/i4kt5tRfPXH+Lb
// SIG // 9l0OVigG6GgIvqC+vCeOmKjEO6uoviChxZUrpBXNhya8
// SIG // OfhSp6D5Wkay4EgyCI/8OxKRrom6o5wblSxqC3FZu+Zg
// SIG // qtVPERgJkOxHbMWqZw0aTVxTM2elsSusr67ucKzOvYg3
// SIG // nK1rMxeDHWVjyuXeoRiOpRol7HnY7y8mney81a090wBo
// SIG // 7B2agUQqY7mWj+Q9RTE0aNEbK+r4IxpYLpwY
// SIG // End signature block
