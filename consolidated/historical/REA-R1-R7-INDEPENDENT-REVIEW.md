# Independent retained-evidence review: REA R1–R7

18 October 2026 · Private · Current-task T3 owner authorization

## Review conclusion

**AUDIT_AND_DOCUMENTATION=COMPLETE_WITH_GAPS**  
**FINAL_FREEZE=HOLD**

The retained functional results are supported at the explicitly described boundaries. All seven original closure dispositions are preserved. The audit found one original-freeze mismatch in R1, an absent verified final archive for R6, and no new cryptographic signature for the consolidated baseline. These prevent `FINAL_FREEZE_PASS`. They do not justify rewriting historical scores, repairing submissions or converting R6 into a valid comparison.

CLAIM_UNDER_REVIEW: Seven studies support a qualified, traceable account of REA capability and comparative effectiveness. A fully signed, portable final freeze is a separate stronger claim and is not established.

INDEPENDENT_BASELINE: Actual original reports, full closure/freeze JSON inventories, selected native tool/usage records, stored outputs and oracle expectations, Authenticode-signed controllers/catalogs and R4's detached manifest signature. The auditor is Codex in this chat, not a new blind experiment, an independent human grader or external organization.

## Per-case evidence qualification

| POC | Original closure, preserved | Current independent assessment | Evidence and limits |
|---|---|---|---|
| R1 | “bounded POC completed” | Bounded result receipts supported; launcher-freeze continuity HOLD | Four closure hashes match; ten listed signatures valid; A/C eight-case TAP receipts inspected; one original launcher hash differs. No B arm. |
| R2 | QUALIFIED_BOUNDED_POC | Supported within original scope | 774 closure entries match; 18 signed controllers valid;144 recorded comparisons recomputed; package/source provenance limitation remains. |
| R3 | EXPERIMENT_COMPLETE_WITH_LIMITATIONS | Supported with core-coverage limit |54 selected closure entries match; selected A/B/C forty-case results independently compared with gold; actual peripheral call inspected; core analysis timeout remains. |
| R4 | QUALIFIED_BOUNDED_POC | Supported for helper and original fixture boundary |92 closure entries match; five controller signatures and detached manifest signature/chain valid;36 helper records recomputed. No full-agent/SAP reconstruction claim. |
| R5 | BOUNDED_EXPERIMENT_COMPLETE | Supported with unsuccessful reminder reconstruction |844 closure entries match;13 controller signatures valid;132 records recomputed; all arms32/44, all twelve reminder-bearing cases fail. |
| R6 | INVALID_COMPARISON_AS_REPORTED; historical file says INVALID_COMPARISON | Invalid comparison confirmed; retained observations supported |8,994 closure entries match;15 signatures valid;108 observations recomputed; C reporting, delivery and timer defects remain. |
| R7 | PASS_WITH_GAPS | Supported; raw score/correction kept separate |1,474 closure entries match;31 listed signatures valid;26 positive outputs per arm recomputed;234 output/input/RGBA files freshly hashed; C29 source/trace/rubric confirm classifier false negative. |

Source reports and evidence locators E1–E7 are defined in section15 of `REA-R1-R7-CONSOLIDATED-FINAL-REPORT.md`. The consolidated manifest provides absolute source paths and hashes.

## Evidence reconstructed

The seven closure manifests contain **12,236 entries**, all matching their expected SHA-256 values on fresh inspection. These are entries, not necessarily unique files. The original/additive freeze inventories contribute **4,203 checks**, of which **4,202 match** and **one differs**. Different historical inventory scopes are retained: R1's seal has four entries and R3's manifest explicitly inventories selected evidence. The new manifest adds supplemental report, oracle, output and evidence files without representing caches/global runtimes as a complete forensic image.

`AUDIT-BEHAVIOR.json` recomputes R2 exits/stdout, R3 JSON/error/dependency traces, R4 values/error occurrence, R5 recurrence/reminder JSON, R6 frozen normalized observations, and R7 positive identity/output hashes and negative stage witnesses. R1 is a retained TAP-receipt check; the audit does not manufacture raw underlying execution traces. All comparisons concern recorded execution. No experimental code was run.

`AUDIT-SIGNATURES.json` freshly checks **185** selected historical Authenticode signatures. All are Valid and match `CN=AI-SAP Local Code Signing`, thumbprint `A98A2B0353CB7C086BEEC23A36FC4095DFB37844`. The certificate is trusted under this host's local policy; that does not constitute external publisher authentication. R4's detached CMS signature verifies cryptographically and with its certificate chain. R3's five-file matched evaluator package validates against its signed catalog. No private key was accessed, created, imported or exported; no new signing operation was performed.

The raw final cumulative input counters for the seventeen available R1/R2/R3/R5/R6/R7 investigator records agree with their reported final totals. Cumulative counters were selected as terminal totals, not summed across resumed turns. R4 input totals are checked as arithmetic from its retained cached/uncached columns, with runtime audits inspected. These are provider counters, not invoices. Host contention, complete setup/reviewer cost and monetary benefit remain UNKNOWN. See `AUDIT-PROVENANCE-AND-METRICS.json`.

## Findings and required evidence

### F1 — R1 original launcher freeze differs

SEVERITY: Material provenance gap for an unqualified freeze-continuity claim.

FACT: Original `evidence/experiment-freeze-manifest.json` expects `02f620e5b3b2f49a444aefd1ef2ed37405e46823f5125274065bb05779942b87` for `Run-BlindArm.ps1`. Current bytes hash to `963902a0c17ff1d9716549841dbfcf77b84330ea06d3dfbc05968cdf1cac0527`. The current signature validates and final signing inventory agrees. All four R1 closure-seal entries match. Launcher recovery is described in the original final report.

INFERENCE: Recovery may explain the mismatch, but its exact frozen-to-final byte delta has not been independently reconstructed from an authenticated original script and amendment record. A current valid signature cannot fill that gap. This is historical continuity uncertainty, not evidence this mission modified R1.

REQUIRED_EVIDENCE_OR_CHANGE: Existing authenticated original launcher bytes plus a precise retained amendment/signing/execution chain, if recoverable, or retain the exception indefinitely. Do not rewrite the original freeze to match current bytes. No new experiment is required or authorized.

DISPOSITION: Original “bounded POC completed” preserved; independent launcher-freeze claim HOLD. Recorded TAP results remain supported as receipts.

### F2 — R6 archive wording overstated the verified deliverable

SEVERITY: Material packaging/closure distinction; no change to experimental invalidity.

FACT: The latest final message in “Run R6 effectiveness experiment” said the final archive job had been launched but completion was not read back. Its retained final command `exec-9a042b40-98e7-48f6-a372-960df1a0069b` completed with exit0 and generated an8,994-entry hash manifest and sidecar. Inspection of that command establishes no final ZIP/TAR creation. Every current manifest entry matches. The retained source-only `downloads/source.tar` has SHA-256 `ee0e78a194e32071ef11b6f4b9d119312c07de339063cc4fd8ff4b83fece1907`; all1,234 member headers and52,757,233 file-payload bytes were read without extraction. No final evidence package was located in the inspected experiment/native roots.

DISPOSITION: `FINAL_MANIFEST_JOB=COMPLETED_VERIFIED`; `FINAL_EVIDENCE_ARCHIVE=NOT_LOCATED`; source archive structure verified. `INVALID_COMPARISON` remains unchanged. There is no pending experiment worker to resume for this reconciliation.

REQUIRED_EVIDENCE_OR_CHANGE: A separately authorized portable archive and its validation would be needed only for that stronger packaging claim. Current report accurately records the gap and creates no new archive.

### F3 — R7 C29 is a grading false negative

SEVERITY: Material interpretation correction, not an implementation repair.

FACT: The raw comparison is29/30. C29 sets rejection, reconstruction attribution and no-timeout/crash checks true; only decodeRejection is false. Immutable submission line12 rejects from `Image.onerror` with “Decoding error,” before downstream processing. The frozen rubric requires decoding rejection and excludes error wording. The validator pattern `decode|image|InvalidStateError` misses “Decoding.” Actual retained execution points to that callback. All234 inspected positive-workflow input/WebP/decoded-RGBA files match their recorded digests.

DISPOSITION: Raw29/30 retained. Semantic evidence supports the fourth expected rejection. No raw file, aggregate score, frozen expectation, submission or historical report was changed. No “corrected30/30” silently replaces the raw result.

### F4 — Bounded engine/evidence value is not causal reconstruction superiority

SEVERITY: Public-claim restriction.

FACT: R3's successful peripheral call does not establish core analysis; R4's reconstruction is a timestamp helper; R5 has twelve shared reminder failures; R6 lacks valid comparison controls/reports; R7 reuses pinned codecs. Direct tools also produce retrievable evidence. Architecture grades and observed run-time differences use incompatible scopes and confounded runs.

DISPOSITION: Claim demonstrated structured evidence and scoped capability. Do not claim complete application reverse engineering, unique access to engine capability, causal speedup, money savings or a universal pooled accuracy.

### F5 — Consolidated final baseline is unsigned and path-based

SEVERITY: Final freeze gate.

FACT: The new manifest records actual current bytes and preserved historical expected hashes separately. The approved continuation excluded new signing and archive creation. Historical signature verification does not sign the new report/manifest. Original directories are referenced in place; no immutable storage or portable snapshot was created. Public cryptographic identity is available for verifying old signatures, but authority to create a new final signature is not inferred from T3 authorization.

DISPOSITION: `FINAL_FREEZE=HOLD`; `FINAL_FREEZE_PASS=NOT_DECLARED`. Audit/documentation can be reviewed now. Any authorized future signature must bind final stable bytes and explicitly retain F1/F2; it must not retroactively repair old evidence.

## Agreements, disagreements and unproven items

AGREEMENTS: Reported bounded functional counts are reproduced from retained evidence at the stated levels. REA actually exercised scoped facilities and retained useful structured observations. Existing limits, failures and different experimental denominators remain material.

DISAGREEMENTS: The historical R6 phrase “archive job” does not establish a completed final archive. An unqualified all-freezes-unchanged claim would conflict with R1's launcher mismatch. R7's raw C29 miss cannot be treated as a demonstrated reconstruction failure after the retained semantic evidence is examined.

UNPROVEN_ITEMS: Full architecture regrading, independent human gold, repeated statistical effects, full source/package build equivalence, complete external npm/APK trust validation, complete forensic/runtime preservation, live SAP/cloud behavior, reconstructed Android notification delivery, full application equivalence, verified billing and a cryptographically signed final archive.

## Permitted and prohibited claims

PERMITTED_CLAIMS: Seven real application case studies; bounded recorded correctness at each original denominator; actual selected REA capabilities; useful retained artifact-bound evidence; no demonstrated REA-specific functional reconstruction advantage in these runs; R5 one-second failure; R6 invalid comparison; R7 raw29/30 with confirmed classifier false negative;185 inspected historical signatures valid; original closure labels preserved; final freeze held for explicit gaps.

PROHIBITED_CLAIMS: All seven experiments PASS; all original freezes match; a signed final portfolio archive exists; R6 establishes a valid performance ranking; R7 C had an implementation decoding failure; full application or codec reverse engineering;100% general correctness; REA universally wins or is universally ineffective; reliable cost/speed advantage; independent human certification; production SAP/Android equivalence.

## Audit method and preservation

No source POC file was edited. No original program, test, oracle, reconstruction, provider analysis, build or deployment was rerun. No original disposition or score was rewritten. Writes are confined to this separate closure directory. Final readback rehashes its inventory to detect changes during this audit; original freeze expectations are separately retained even when they differ from current bytes. No signing, credential extraction, publication, production mutation, new experiment or background continuation was performed.

The initial audit reader used case-sensitive JSON field names incorrectly for R1/R3. It was corrected and both sets were independently reprocessed; those transient reader errors are not evidence drift. A transient Python diagnostic used the wrong R5 case-key name and was corrected before final audit output. Final provenance records use actual case IDs. These audit implementation corrections did not execute or modify experiment code.

VERDICT: `AUDIT_COMPLETE_WITH_GAPS; FINAL_FREEZE_HOLD`.

NEXT_ACTION: Owner reviews the private report and publication drafts. Preserve the unsigned baseline and listed gaps. No follow-on gate or publication is started automatically.
