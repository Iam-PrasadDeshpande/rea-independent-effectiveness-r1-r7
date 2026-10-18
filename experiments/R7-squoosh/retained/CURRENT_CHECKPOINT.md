# R7 terminal checkpoint — 18 October 2026

STATUS=EXECUTION_COMPLETE
FINAL_DISPOSITION=PASS_WITH_GAPS
NEXT_ACTION=STOP_OWNER_REVIEW_ONLY
AUTOMATIC_NEXT_GATE=false

Authoritative root: evidence://R7/. Source: Squoosh commit e8d35e0fb66eb16eff6fe8fc773eabcbb7128de3, package 2.0.0, unchanged-lockfile local production build. Parent repository remains unborn master; completion is a hashed evidence package, not a Git commit or release.

Read FINAL_REPORT.md, FINAL_STATE.json, REA_R7_COMPARATIVE_REVIEW.md and PUBLICATION_BRIEFING.md. The briefing is private content only; nothing has been published/deployed. R5/R6 were excluded and R1-R6 were not modified by this mission.

## Verified outcome

- Three independent working same-codec integrations submitted/executed. All 26 positive workflows exactly match input identity, dimensions, bytes/pixels, MIME and filename.
- A/B mechanical scores:30/30. C:raw29/30, unchanged. evaluator/C29_CLASSIFICATION_AUDIT.md proves C's fourth expected rejection occurred in input decoding; the grading regex misses Decoding. No implementation or frozen expectation was changed to improve a score.
- Architecture FULL/PARTIAL/UNKNOWN:A16/9/5;B16/13/1;C14/11/5. All zero INCORRECT/NOT_OBSERVABLE. Model-assisted categories remain separate from behavioral results, not human-gold fidelity percentages.
- Actual REA WASM/JS analysis succeeded and retained evidence. Useful identity-bound resize ABI evidence; no demonstrated functional or overall architecture-completeness gain. Large/partly irrelevant JS summaries and missing query-log references limit traceability conclusions.
- Matched model/effort; order B,A,C;45 actions/1200 active seconds per arm. Dispatches A27/B25/C27; active seconds A401.29/B638.58/C397.88. B retained its original thread and consumed budgets across pause/repairs. Pause excluded, active signing stalls included. Single-host/order/cache/recovery differences prevent causal speed/cost claims.
- Use final cumulative session usage in evidence/final-metrics.json. Original driver sum fields overcount cumulative per-turn values; raw records preserved and correction independently checked against native B token records. Monetary/full-process-family costs UNKNOWN.

## Evidence and controls

Original freezes:frozen/experiment-freeze.json and frozen/run-freeze.json. Final evaluator-only adapter hashes:evidence/evaluator-final-freeze.json. Independent source/architecture assessments, immutable submissions, actual outputs and comparisons:evaluator/.

Executed adapters:fresh A/C scripts/Run-R7Data-v3.ps1;B original Run-R7DataInvestigator.ps1 then Resume-R7B.ps1 then Resume-R7B-v2.ps1, same thread. Final evaluator:Validate-R7-v4.ps1 with Invoke-R7Evaluator-v3.ps1 and browser-evaluator-v3.js. Original variants/failures are historical evidence, not instructions to rerun them.

Executed custom adapters and final submission scripts passed approved Authenticode verification. Two signing stalls were repaired with a separate signed subprocess. Earlier find-exec enforcement gap was unused by B, blocked before A/C. Isolation and read-only/no-outside-network denial evidence retained. Read evaluator/VALIDATION_REVIEW.md, final report and evidence/OUTPUT_REVIEW.md for findings/dispositions.

Final signatures, measurements, budget and integrity:evidence/final-signatures.json, final-metrics.json, final-action-accounting.json, final-evidence-manifest.json, its SHA256 sidecar, and final-evidence-readback.json. Original owner-pause snapshot checkpoints/20261018-owner-pause remains unchanged, including historical unsigned partial code, which never executed.

All owned investigators/controllers/targets completed. No automation, background continuation, additional experiment, publication or release is active. This objective's authorization ends at completion; no follow-on lane/gate, global config or protected action is inferred. Credentials/signing access/authenticated sessions never transfer through this document.
