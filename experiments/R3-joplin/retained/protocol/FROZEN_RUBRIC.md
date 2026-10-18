# R3 pre-investigator rubric

Freeze this file, deterministic inputs, original-reference outputs and the neutral objective by SHA-256 before any investigator begins. The hidden reference is evaluator-only. Do not modify criteria or expected outputs after reading investigator work.

## Architecture recovery

Score each fact 0 (absent/wrong), 1 (partly correct or weakly supported), or 2 (correct with packaged-entry/offset evidence). Report individual fact scores and material incorrect claims; the sum is a bounded 30-point architecture-recovery score, not generalized effectiveness or cognitive fidelity.

1. Built-in desktop search and shared semantic search service entry relationships.
2. AI enabled, embeddings enabled, feature flag, installed provider and sqlite-vec eligibility.
3. UI exclusion of explicit search filters/basic modes and item-ID queries.
4. Desktop startup injects local provider when ONNX runtime is available; chat-provider selection is separate.
5. Local multilingual-e5-small, 384 dimensions, document/query prefixes and local model provisioning.
6. ONNX CPU inference, bounded batching, tokenization, pooling and normalization.
7. Background initial scan versus maintenance timing, batch cap and overlap guard.
8. Change-feed cursor, duplicate collapse, initial backfill and note eligibility.
9. SQLite metadata/vector persistence and per-note chunk replacement.
10. Model-ID change clears/rebuilds index and resets indexing state.
11. Text query embedding versus indexed-vector reuse for note-ID queries.
12. Folder/tag/note/all scopes, empty-scope behavior and scoped retrieval limitations.
13. L2-to-cosine conversion, relevance presets and score thresholds.
14. Best score per note/chunk, descending sort/truncation and desktop note-level aggregation.
15. Explicit missing-provider errors, tool error conversion and indexer failure/retry limitations.

## Evidence and unknowns

For each report, list verifiable claims with correct packaged entry and character/line location, unsupported or incorrect claims, and explicit unknowns. Evidence precision denominator is all checkable artifact citations actually made; a citation is correct only when its location supports the associated claim. Report counts with adjudication, not invented confidence percentages. Unknown coverage lists recognized material gaps; empty unknown lists are not automatically better.

## Behavioral reconstruction

Run every supplied reconstruction unchanged through the same adapter against all 40 frozen synthetic scenarios. Compare returned results/errors and dependency-call traces to the original pinned SearchService.search. Record per-case pass/fail and score as passed/40. Missing, invalid or unexecutable components fail the affected cases rather than silently reducing the denominator. Do not provide hidden cases or post-result repair to investigators.

The component boundary tests deterministic retrieval/query/scope/scoring/aggregation behavior. It does not test the full UI, native SQLite extension, indexing service or real-model quality. Architecture analysis covers those other areas separately.

## Performance and interpretation

Use identical model/reasoning configuration, sanitized target bytes, objective, 8 investigator tool actions and 12-minute maximum wall-clock allocation per arm. Stop after deliverables are complete. Count failed tool calls. Record actual CLI usage input/output/cached tokens, runtime identity, wall time, tool initialization/recovery, observed resource samples, and unsampled/unavailable metrics. Setup and aborted attempts remain evidence. No monetary cost estimate unless actual account billing/rate evidence is available.

Run arms sequentially in A, C, B order to avoid a simple ascending-tool order; this single order is not counterbalancing. No clean speedup claim if contention or setup differences confound timing. Each arm must invoke its assigned inspection facility successfully. Tool visibility or initialization alone is insufficient.

Compare A/B (conventional-tool value), B/C (incremental REA value), and A/C (overall assistance). Prefer the disaggregated architecture, behavior, evidence, unknown and overhead results. One matched target cannot establish generalized REA effectiveness.

