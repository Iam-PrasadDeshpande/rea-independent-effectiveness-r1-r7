# B architecture assessment

Assessment: **16 FULL, 13 PARTIAL, 0 INCORRECT, 1 UNKNOWN, 0 NOT_OBSERVABLE**, across all 30 frozen factual obligations. Per-obligation reasons and actual evidence references are in `ARCHITECTURE_B.json`. Ratings assess recovered production architecture, not whether excluded production lifecycle behavior was required in the submitted integration. PARTIAL means a correct but incomplete recovery; it is not an implementation failure. No composite score or superiority claim is made.

The immutable snapshot reviewed was `evaluator/submissions/B`. Independently computed SHA-256 matched its manifest for report (`7a056974b7b87f281e6ae84f5f5c3a15e20c809c2f14b32b6dd045abd31414d8`), entry script (`015e23df479d05e61f86e147cd31ec5fbea776d8c08803b51964d27acfe91840`) and worker (`5e5c0daa5972c5d12734918773638f867c083ac326341ac6d41049cc16ab4539`). No new investigator code was run, patched, or supplied. A/C were not inspected.

## Demonstrated recovery

B independently decoded encoded bytes through Blob/Image/canvas, established the resize kernel order and centered crop, recovered the wasm-bindgen allocation/return/free ABI, and built its own worker protocol and AMD adaptation. `solution.js:23-31` launches only `solution-worker.js`; the worker's asset loads (`solution-worker.js:4-14,32`) are the individual WebP baseline/SIMD glue and WASM plus resize WASM. It does not load or call original Compress, initial-app, features-worker, or Comlink runtime. Static code inspection and retained reconstruction worker URLs (`arms/B/output/tool-005.stdout.txt`; `evaluator/results/B/actual.json`) support the no-application-delegation conclusion. The code contains no oracle outputs or fixture-pixel substitution.

Low-level binary/glue reuse is material and permitted: original WebP code performs compression and original resize WASM performs resampling. B explicitly identifies this boundary (`report.md:101`), rather than claiming algorithm recovery. Its WABT resize evidence (`arms/B/output/tool-010.stdout.txt`) records an actual ten-i32 resize function, exported memory, malloc/free and stack adjustment. The Acorn output and WebP strings logs support selected ABI/glue findings; a large AST alone earns no additional architectural credit.

The separate recorded behavioral result is 30/30, with 26 positive exact matches and four negative rejections (`evaluator/results/B/comparison.json`, `validExecution:true`; retained negative errors carry the evaluator rejection witness). That result was not used to infer FULL architectural obligations. In particular, byte equality does not establish production caching, Comlink wire understanding, stale-result handling, output URL lifecycle or UI persistence.

## Missing or incomplete recovery

- F17 is UNKNOWN: the report does not state production WebP module-promise caching. Its selected asset does visibly cache the promise; an asset being read does not establish that the investigator recovered every fact inside it.
- F04/F06/F07/F29 distinguish what B did recover (RPC boundary, queued/lazy worker, abort termination and 10-second idle boundary) from missing details (Comlink orchestration, stale-publication guards, persistent settings and debounce). F07 is FULL; the others remain PARTIAL.
- F10/F11/F12/F13/F15 capture incomplete UI/resize semantics: positive UI validation, alpha premultiplication meaning, linear-light color processing, cached readiness and production ImageData wrapping are not all explained. Correct ABI forwarding is credited without treating it as proof of every parameter's effect.
- F19 lacks the exact selected WASM artifact SHA-256 in B's report. Asset filenames, output-image hashes and evaluator submission hashes serve different provenance roles. F20 does not recover the minified WebP memory/malloc/free export mapping, despite correct resize allocator and WebP Embind evidence.
- F03/F26/F28 cover a partial production path: full preprocessing order, production File construction and output object-URL lifecycle are omitted. Those omissions do not invalidate the narrower submitted return-bytes workflow.

The report explicitly preserves unsupported decoder/SVG/HQX/UI scope and untested animation, orientation/color-management, large-input, repeated-resize, baseline-hardware and advanced-option boundaries (`report.md:89-93`). No contradictory architectural claim was identified under this rubric; unknowns are not silently scored as complete.

## Evidence and run limitations

Controller restarts reused tool numbering. B acknowledges this (`report.md:99`), and some earlier context-only outputs are represented by retained controller arguments and exact artifact character offsets rather than unique standalone log files. Earlier asset contexts were checked against B's permitted artifact copy, and available WABT/browser logs were read. This is weaker traceability than collision-free per-call evidence capture.

The original generic inspection controller could dispatch `find -exec` within its OS sandbox. The retained B controller log records its actual ordinary inspection commands as `ls`, `strings`, and `grep`; no `find -exec` use is evidenced. This enforcement gap must remain disclosed even though exploitation was not observed. Root reports the interface was tightened for later A/C; that is an enforcement difference, not evidence of B receiving or using extra analysis tooling. The original and corrected enforcement versions should remain separately identified in the final experiment report.

Root's evaluator-only stage-witness canary and corrected validator address rejection attribution before B hidden evaluation; the frozen inputs/oracle expectations were not changed. This review read the recorded B comparison, not the canary's full execution evidence, and does not independently certify all containment or experiment-level qualification conditions. One sequential run on a common host cannot establish general tool superiority or causal benefit.
