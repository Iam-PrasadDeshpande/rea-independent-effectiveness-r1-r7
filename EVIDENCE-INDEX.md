# Evidence index and storage policy

The [consolidated manifest](consolidated/REA-R1-R7-EVIDENCE-MANIFEST.json) accounts for every entry in the retained audit baseline, including artifacts not redistributed. Source locators use evidence://POC/relative-path; the owner-only original manifest supplies their exact absolute local paths. SHA-256 and size describe the original bytes. A repository derivative has a separate path and digest; never use its hash as the original identity.

| Study | Results and individual inventory |
|---|---|
| R1 | [Results](experiments/R1-sap-genai-mail/RESULTS.json) · [Inventory](experiments/R1-sap-genai-mail/EVIDENCE-INDEX.json) |
| R2 | [Results](experiments/R2-zint/RESULTS.json) · [Inventory](experiments/R2-zint/EVIDENCE-INDEX.json) |
| R3 | [Results](experiments/R3-joplin/RESULTS.json) · [Inventory](experiments/R3-joplin/EVIDENCE-INDEX.json) |
| R4 | [Results](experiments/R4-sap-ai160/RESULTS.json) · [Inventory](experiments/R4-sap-ai160/EVIDENCE-INDEX.json) |
| R5 | [Results](experiments/R5-fossify-calendar/RESULTS.json) · [Inventory](experiments/R5-fossify-calendar/EVIDENCE-INDEX.json) |
| R6 | [Results](experiments/R6-excalidraw/RESULTS.json) · [Inventory](experiments/R6-excalidraw/EVIDENCE-INDEX.json) |
| R7 | [Results](experiments/R7-squoosh/RESULTS.json) · [Inventory](experiments/R7-squoosh/EVIDENCE-INDEX.json) |

Owner-authored research records and submissions are included after review. Vendor payloads, third-party binaries, raw transcripts and logs requiring further clearance remain at verified local locations. Logical pointers establish accounting, not public access. No LFS, release asset or public evidence-store availability is implied. FULL_REPOSITORY_COVERAGE is not claimed.

The [current manifest readback](release/FINAL-MANIFEST-VERIFICATION.json) verifies the prior byte baseline. The [historical signature readback](release/HISTORICAL-SIGNATURE-VERIFICATION.json) verifies 185 selected Authenticode files and R4's detached signature. Those checks are distinct from new candidate signing and from experimental correctness.
