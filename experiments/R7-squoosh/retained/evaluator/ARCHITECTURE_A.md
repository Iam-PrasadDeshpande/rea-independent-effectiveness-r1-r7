# A architecture assessment

Assessment: **16 FULL, 9 PARTIAL, 0 INCORRECT, 5 UNKNOWN, 0 NOT_OBSERVABLE**, across all 30 frozen obligations. `ARCHITECTURE_A.json` records every rating, reason and actual evidence reference. These categories evaluate demonstrated architectural recovery; they do not require reconstruction of excluded production lifecycle behavior and are not a composite score or superiority claim.

Reviewed immutable snapshot: `evaluator/submissions/A`. Independent hashes matched its manifest for report (`e00463fe593ba834119554024d03685127cad220748490f070b0d49c43d8aab6`), entry (`5ab4dcdf9e9f8011bdcf8527923fd671acf659ea111ab3a074f89cb645b642e4`) and worker (`be9d882dccf25916f9cda741de6648cd14dcc81d299ac78bc76f44852f6ce6cb`). This assessment uses A's own report, submitted source, allowed artifact and retained A evidence. No running C state was inspected. No submitted code or frozen material was changed or executed.

## Supported recovery and implementation independence

A recovered browser encoded-input decoding to RGBA, the exact resize enum order, centered crop geometry, the wasm-bindgen byte-memory ABI and full WebP option forwarding. Its report identifies Comlink-style wrap/expose, method-path invocation and error serialization (`report.md:12-14,44`); the permitted util artifact confirms that specific account. WebP cached initialization and the SIMD/baseline branch are explicitly identified (`45-50`). Both lazy module promises are visible in submitted worker code, as are independent resize memory handling and AMD/locateFile adaptation.

The entry script reads actual encoded bytes and uses createImageBitmap/canvas; it creates only its submitted worker. The worker imports only individual baseline/SIMD WebP glue and their matching WASM plus resize WASM. It independently implements crop, ABI adaptation, request/error messages and returned file payload. No original initial-app, Compress, features-worker, util RPC or full application runtime is copied, imported or called by the inspected submitted code. Retained reconstruction logs (`arms/A/output/tool-019.stdout.txt`, `tool-025.stdout.txt`) show only `/submission/solution-worker.js` workers, with no denied requests. This supports the bounded independence claim; original codec algorithms are deliberately reused.

A used standard inspection and browser tools rather than WABT/AST/REA. The retained byte dump (`arms/A/output/tool-023.stdout.txt:1-24`) actually contains WASM magic/version and the selected resize memory/function/allocator exports. A does not turn that evidence into a full native algorithm claim and explicitly qualifies inferred input-allocation ownership (`report.md:64`). Actual public probe errors and independent reconstruction errors are retained for negative quality and corrupt image (`tool-019.stdout.txt`).

The separate evaluator record is **30/30**, comprising 26 positive exact matches and four rejection cases, with `validExecution:true` and no fatal error (`evaluator/results/A/comparison.json`). That result is not used to infer architecture knowledge. The report's local labels B0–B6 are its own browser-evidence identifiers, not references to another arm's report or results.

## Incomplete recovery and unknowns

- F05/F06/F07 remain UNKNOWN: production queued/lazy worker creation, active abort/stale-result guards, and the 10-second idle termination boundary are not recovered. A's own per-call worker termination/watchdog and correctly identified lazy codec initialization are different mechanisms.
- F28/F29 remain UNKNOWN: production output object-URL lifecycle, persistent settings and debounced/queued result publication are omitted. The report expressly excludes full UI persistence/caching/abort scheduling.
- F03/F10/F11/F12/F15 are PARTIAL: resize ordering and dimension/flag ABI are correct, but complete preprocessing ordering, production UI validation, premultiplied alpha/linear-light semantics and production resize ImageData construction are not fully explained.
- F19/F20 are PARTIAL: actual binary/export evidence is present, while exact selected-artifact SHA-256 and minified WebP memory/malloc/free versus Embind initialization mapping are absent. Output-image hashes and evaluator submission hashes do not fill those provenance/ABI gaps.
- F23/F26 are PARTIAL: the full numeric codec interface and return payload are implemented, but production UI preset/inversion mappings and output File/Blob construction are not specifically recovered. These are architecture omissions rather than failures of the requested return-bytes interface.

No contradictory production architectural claim was identified under the rubric. The report clearly distinguishes independent size/timeout bounds from recovered production rules, identifies decoder/color/concurrency/large-input limits, and preserves non-SIMD and advanced-option UNKNOWNs (`report.md:95-107`). Successful fixture bytes do not erase those limits.

## Evaluation limits

Root states that evaluator-only rejection-stage and pre-call input witnesses, clean flat output, and exit/schema guards were applied equally to A and B after canary verification. This review inspected A's recorded comparison rather than independently rerunning the canary or isolation probes. It does not certify all experiment-level provenance, blindness, enforcement or qualification conditions. No access to another arm's report was provided to A by this scoring operation, and no other arm's conclusions were used as evidence of A's recovery.

The preserved low-level reuse means behavioral matching concerns integration with pinned codecs, not independent implementation of compression or resampling mathematics. One sequential run on one host cannot establish causal benefit or general superiority for any tool configuration.
