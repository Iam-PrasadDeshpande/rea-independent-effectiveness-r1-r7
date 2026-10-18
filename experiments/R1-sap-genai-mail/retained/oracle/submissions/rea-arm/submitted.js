export async function reconstructAddMails(req, deps) {
  try {
    const { mails, rag } = req.data;
    const mailBatch = await deps.generateInsights(mails, rag);

    await deps.insert("ai.db.Mails", mailBatch);

    const insertedMails = await deps.select(
      mailBatch.map((mail) => mail.ID)
    );

    insertedMails.forEach((mail) => {
      mail.suggestedActions = mail.suggestedActions?.map(
        (suggestedAction) => ({
          ...suggestedAction,
          descr: deps.actionDescriptions[suggestedAction.value] || ""
        })
      );
    });

    return insertedMails;
  } catch (error) {
    deps.logError(`Error: ${error?.message}`);
    return req.error(`Error: ${error?.message}`);
  }
}

// SIG // Begin signature block
// SIG // MIIHLgYJKoZIhvcNAQcCoIIHHzCCBxsCAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // 7HNaOHE+G0f7cg+RdQBs5H55uOxN97z7iCUd2/JwgA2g
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
// SIG // NwIBFTAvBgkqhkiG9w0BCQQxIgQgjmmUlO0b4cvhUhmV
// SIG // iBpFfujapyIcxL1QTyf3k5WvMQ8wDQYJKoZIhvcNAQEB
// SIG // BQAEggGAW8Inaz1Uo/Kgk5ASeCizPo0v2ox7nBtPxeEf
// SIG // wyTJo3n29bJU8/hDJ+z/vgSB3hhZlkvJbe0kxlQidQoo
// SIG // 6LMICS4icNSCLAAYr4wY0jR0qzn0YPZUyA7O0KTknGtv
// SIG // smJ07NXdgKshJcn3lXk8GZ3p5JXJB0PwSHUMe24T2ogB
// SIG // AR1uvuMGWsRwa5/xYiLqEPaUC4dCI/1cixY0fd+T6bP+
// SIG // QBSb8dyvGz+5HL/KZauTEYCTimtohsNgKZ5b8u91Aba3
// SIG // fTDzvrF6zFpmzY/XfNIbTIVBMxaGO2QoYPXW9VdBaDrQ
// SIG // /hkvWkLwJ38YHxcLCYDnPjPRFDXLUNPxyswQCfAAZX/8
// SIG // qydDI6+jHR1SjXkobE1OMldQGorXdBeAyzt5hn9vbn+E
// SIG // SVQRCz26ZYuf/vsT9McUMqOKWNz7p+pCQN3/7lJxFXcZ
// SIG // Ie755Qzw3wSNpJ1Gauzuqkc9AEvyPctseCNRVb9/BNJh
// SIG // bzA/LQbQ9wPDRej0/G51uYA7eQNPp0Co8YFi
// SIG // End signature block
