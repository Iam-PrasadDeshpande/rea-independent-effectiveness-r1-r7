# Final evidence closure review

18 October 2026 · Publication mission, additive retained-evidence inspection only

## G1 — R1 launcher provenance

Expected identity: original frozen Run-BlindArm.ps1. Observed identity: currently retained Authenticode-valid Run-BlindArm.ps1 under the historical approved signer. Expected SHA-256: `02f620e5b3b2f49a444aefd1ef2ed37405e46823f5125274065bb05779942b87`. Actual SHA-256: `963902a0c17ff1d9716549841dbfcf77b84330ea06d3dfbc05968cdf1cac0527`.

Retained final signing inventory and recovery narration establish the current launcher's identity and document recovery. The eight-case A/C TAP receipts support those recorded results. They do not independently authenticate the exact original-to-final launcher byte/amendment/execution chain. No authentic original matching launcher has been recovered in this bounded review. Expected digests and original artifacts were not rewritten.

Disposition: signed current [exception description](R1-PROVENANCE-EXCEPTION.md), with historical continuity unresolved and owner acceptance pending. Claims remain qualified. A new signature is not retrospective execution proof. G1 prevents FINAL_FREEZE_PASS.

## G2 — R6 original final archive

The original retained final command completed with exit zero and produced an 8,994-entry final manifest plus sidecar. It did not perform an archive-creation operation. Existing source.tar is a source-only archive. The historical final evidence archive remains NOT_LOCATED. [Earlier job/archive reconciliation](../consolidated/historical/AUDIT-R6-ARCHIVE.json)

A new publication supplemental ZIP contains exactly the 8,996 R6 files represented by the later consolidated audit inventory. Every member's decompressed size and SHA-256 were verified. This archive is separately identified, owner-local, and not distributed publicly because it contains raw records and vendor bytes. It does not claim complete native runtime coverage or historical archive identity. [Verification and digest](R6-SUPPLEMENTAL-ARCHIVE-VERIFICATION.json)

Disposition: portable retained-inventory supplement available; original provenance limitation remains explicit. R6 comparative verdict stays INVALID_COMPARISON.

## G3 — current consolidated signature

The mission authorizes an existing approved signing identity and established procedure. The available historical signer is CN=AI-SAP Local Code Signing, thumbprint A98A2B0353CB7C086BEEC23A36FC4095DFB37844. Publication orchestration scripts are Authenticode-signed and checked before execution. Stable publication artifacts are bound by a detached CMS signature over the artifact index, using the established R4 pattern. The R1 exception is separately signed. No new key, key export or execution-policy bypass occurs.

[Current signature verification](CONSOLIDATED-SIGNATURE-VERIFICATION.json) records actual cryptographic and local-chain results. The signature binds the current candidate bytes, including the manifest, report, review and article; it is neither owner publication approval nor external publisher certification. Earlier audit statements that their baseline was unsigned remain correct historical descriptions.

## Preservation and scope

[Current manifest verification](FINAL-MANIFEST-VERIFICATION.json) rechecks all 15,489 original inventoried files. [Historical signature verification](HISTORICAL-SIGNATURE-VERIFICATION.json) rechecks 185 Authenticode files and the R4 detached signature. No original experiment, oracle, reconstruction, hidden test or retained score was run or edited. The new signature and archive are additive publication artifacts.

Final disposition: EVIDENCE_AUDITED_WITH_GAPS; CURRENT_PUBLICATION_CANDIDATE_SIGNED; FINAL_FREEZE_HOLD. Public repository availability was separately authorized by the owner. LinkedIn publication and tagged release remain pending owner decisions.
