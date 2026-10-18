# Reproducibility and retained-evidence verification

This publication mission introduces no new experiment. Use the source revision, original protocol, frozen test/rubric records, reconstruction source, stored comparisons and limitations under each experiment's retained research directory. Original filenames are retained below that directory. Each EVIDENCE-INDEX.json records the original digest, size, logical source locator, storage/availability decision and any derivative digest.

To audit published payloads, verify the SHA-256 values in release/VERIFIED-ARTIFACT-INDEX.json and its detached CMS signature. The signature includes the public signing certificate, never a private key. The verifier must explicitly decide whether to trust that signer. The repository also supplies public verification instructions; it does not ask readers to trust an unknown executable.

To reproduce an experiment would require the pinned upstream source and toolchain, the original scope and permissions, and the retained owner-only inputs indicated in the inventories. Obtain third-party software through the attributed upstream projects and check the recorded identities and notices. This repository is not a full portable runtime or a guarantee that hosted software still matches historical builds.

Some investigator source is present only as non-executed evidence. Redacted derivatives can no longer be presumed to retain an original Authenticode signature. Exact originals and their verified signatures remain separately identified. No publication script is needed to read the results, and experiment execution would require a separately authorized research task.
