# Verifying the candidate signatures

The publication content is listed in VERIFIED-ARTIFACT-INDEX.json. Its detached CMS signature is VERIFIED-ARTIFACT-INDEX.p7s. R1-PROVENANCE-EXCEPTION.md has its own detached .p7s signature. Both use SHA-256 and the existing local research signer, thumbprint A98A2B0353CB7C086BEEC23A36FC4095DFB37844. Public certificates are embedded in CMS; no private key is distributed. There is no external timestamp.

Use an independently trusted CMS verifier with the exact manifest bytes and detached signature. For example, OpenSSL's CMS verification supports DER input and a detached content file. A cryptographic-only check can verify integrity while bypassing chain trust explicitly; that must not be described as external publisher trust. To assess signer trust, inspect the embedded certificate and apply your own trust policy. This research signer is trusted on the original host, not asserted to be a public CA identity.

After signature verification, hash every index entry's downloaded bytes using SHA-256 and compare both digest and byte count. The index excludes itself, detached signatures and post-commit delivery/status receipts to avoid circular hashes. GitHub delivery readback independently checks the exact remote tree and signed content; its commit SHA binds the complete committed tree. A checksum alone is not a substitute for the CMS signatures.

The candidate signature attests to the current publication bytes. It does not prove experiment behavior, historical R1 execution continuity, owner acceptance of the exception, or authorization to publish a LinkedIn article. Read the closure review and freeze status with the signature result.
