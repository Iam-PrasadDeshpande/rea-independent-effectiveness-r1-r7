/* Independent bounded browser-to-worker integration. Codec assets remain unmodified. */
(function () {
  'use strict';
  const workerURL = new URL('solution-worker.js', document.currentScript.src).href;
  const MAX_PIXELS = 16777216;
  window.reconstruct = async function (request) {
    if (!request || request.codec !== 'webp' || !request.input || !Array.isArray(request.steps)) throw new Error('Invalid WebP request');
    const steps = request.steps;
    if (!steps.length || steps[steps.length - 1].method !== 'webpEncode' || steps.slice(0, -1).some(s => s.method !== 'resize')) throw new Error('Expected optional resize steps followed by webpEncode');
    const input = request.input;
    const bytes = new Uint8Array(input.bytes);
    if (!bytes.length || bytes.length > 67108864) throw new Error('Input byte limit exceeded or empty input');
    let bitmap;
    try { bitmap = await createImageBitmap(new Blob([bytes], {type: input.mimeType})); }
    catch (_) { throw new Error("Couldn't decode image"); }
    let image;
    try {
      if (!bitmap.width || !bitmap.height || bitmap.width * bitmap.height > MAX_PIXELS) throw new Error('Decoded image exceeds pixel limit');
      const canvas = document.createElement('canvas');
      canvas.width = bitmap.width; canvas.height = bitmap.height;
      const ctx = canvas.getContext('2d', {willReadFrequently:true});
      ctx.drawImage(bitmap, 0, 0);
      image = ctx.getImageData(0, 0, canvas.width, canvas.height);
      canvas.width = canvas.height = 0;
    } finally { bitmap.close(); }
    const encoded = await new Promise((resolve, reject) => {
      const worker = new Worker(workerURL);
      const timer = setTimeout(() => finish(new Error('Worker processing timed out')), 60000);
      let settled = false;
      function finish(error, result) {
        if (settled) return; settled = true; clearTimeout(timer); worker.terminate();
        error ? reject(error) : resolve(result);
      }
      worker.onmessage = event => {
        const msg = event.data;
        if (msg.id !== 1) return;
        if (msg.error) { const err = new Error(msg.error.message); err.name = msg.error.name; finish(err); }
        else finish(null, msg.bytes);
      };
      worker.onerror = event => finish(new Error(event.message || 'Worker failed'));
      worker.onmessageerror = () => finish(new Error('Worker message could not be decoded'));
      try { worker.postMessage({id:1, width:image.width, height:image.height, rgba:image.data.buffer, steps}, [image.data.buffer]); }
      catch (error) { finish(error); }
    });
    const filename = String(input.filename || 'image').replace(/\.[^./\\]*$/, '') + '.webp';
    return {bytes:new Uint8Array(encoded), mimeType:'image/webp', filename};
  };
})();

// SIG // Begin signature block
// SIG // MIIHLgYJKoZIhvcNAQcCoIIHHzCCBxsCAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // 5e/Fk4lKEQMXBPq5+GLL4EBUdXOR9IHPU4AUUviJFMKg
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
// SIG // NwIBFTAvBgkqhkiG9w0BCQQxIgQgDt3QyIDfHAv7DTRv
// SIG // NGBQ2fRmMBGJwWJ4xqR9wAvrTRwwDQYJKoZIhvcNAQEB
// SIG // BQAEggGAh6+HHTOrvbEVvJ+P+RF8qZKxtSjfIv/0Zu+2
// SIG // 5rqHq2Gb6dz8W/E5FoOjWKLphYzKc/2fSzbCQ2O33fpL
// SIG // 11ZcXJ3Cg+33YQT2o6Ca/LE14Rp9m7rSJ5AKOw8SP2CP
// SIG // ROu1YKU9c1bBCdYZ88hQwdYXUGQo4AJQUUXojuoBPsHw
// SIG // gxTyE3IchffUAqA0FsQcT+Rgj0hjzXklHU54Bwf+CncS
// SIG // tWsybyaR+X2y6wKkAzsXHKO4bwKY7xvRapfCvzndKwJn
// SIG // 4pyxTAGEhEgQ5LMj1WJfiYXeKA5bbzuCkLrnw08OYTK3
// SIG // LdM6fSCVRkxmUCZlbEh2y2G9rG0cHMfXsITAvoEksEUX
// SIG // YGgUgNu2yHnDd/5swg/Wt4VFxfgFxSySYmHKNMIrpHns
// SIG // Ig54B1N5U1T/MTPRf62Jiuv97crLZLCcruGvebq7jq2z
// SIG // I94bPXNTLm8QtQM16cJ2I6vNAcPPR5C/UUO+aHOMkuPz
// SIG // /kp7E8cwkTaNLsKUqTcrZzmJAWRr42J7FFqJ
// SIG // End signature block
