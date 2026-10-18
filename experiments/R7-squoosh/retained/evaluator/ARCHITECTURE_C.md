# C architecture assessment

Assessment: **14 FULL, 11 PARTIAL, 0 INCORRECT, 5 UNKNOWN, 0 NOT_OBSERVABLE** across all 30 obligations. `ARCHITECTURE_C.json` contains each reason and actual evidence reference. Architectural recovery is separate from behavioral counts; there is no aggregate ranking or superiority claim.

Reviewed immutable snapshot: `evaluator/submissions/C`. Independent hashes match its manifest for report (`8f332d9d5fd6589c5e22d383eaf3d94b3bd7bd10f09e3d7c8ba1e4a80ea151d9`), entry (`456be8242d4bd87127a81a0dcd7fca077ba58595078b734f2e367c1b59ce4d11`) and worker (`e2134ee27ac3a7628ce551e24a4ab00ffa8ee82dbf4ccb6abd11f83c6241c858`). No submitted code, frozen criterion, evaluator score or raw output was changed or executed.

## Supported recovery and independence

C independently decoded actual encoded bytes through Blob/Image/canvas, transferred extracted RGBA to its worker, implemented centered crop and the resize allocation/return/free bridge, adapted AMD codec registration, selected SIMD/baseline codec bytes and returned encoded MIME/filename payloads. Its source loads only individual pinned WebP glue/WASM and resize WASM. It does not load, copy or invoke original Compress, initial-app, features-worker or Comlink runtime. Actual retained reconstruction logs (`arms/C/output/tool-023.stdout.txt`) show only `/submission/solution-worker.js` workers and no denied requests. The independent protocol and crop/ABI plumbing are visible in source, rather than inferred solely from image matches.

Recovered production RPC evidence is specific: `report.md:45` identifies APPLY type 2, argument/exception serialization, expose/wrap and the crop helper. Kernel enum order and exact center-crop geometry are correctly explained (`57`). The ten-i32 resize signature, empty imports, returned storage and explicit ownership uncertainty are documented (`58`). WebP full numeric settings/defaults, falsy-result error boundary and codec-reuse limitations are correctly stated and reflected in source. C's default merging is explicit, with supplied fields taking precedence; it is not undisclosed application delegation.

## Actual specialist evidence and limits

REA WASM evidence is real and relevant: `arms/C/output/tool-010.stdout.txt` contains evidence ID `ev_05c633baa3d72e5f79309ad6917281a3fa46b0e11b019b1c92f7b80d025d3603`, provider `REA WABT artifact adapter`, version `wabt@1.0.42`, validation `valid`, selected artifact SHA-256, complete interface entries and an empty imports array. The reported resize SHA-256 `b63e9f90187a9f5cec9a7a9cfc15e68e9330979ac39a29258282c020780cd6ec` independently matches C's permitted artifact. This substantiates F19's artifact-bound interface evidence, not reconstruction of the resampling algorithm or causal necessity of REA.

REA JS also has retained actual output (`arms/C/output/tool-011.stdout.txt`), rather than mere configuration visibility. Its normalized summary is Electron-oriented: browser windows/preloads/context bridges/IPC/native-addon fields are all zero. Its limitations explicitly state that caller-selected analysis leaves 32 inventoried files unselected, static relationships can remain unresolved, and static analysis does not prove execution. The report itself says that this 4,236,812-character evidence was much larger than useful and that direct glue reads/browser execution resolved operational questions (`86`). Those bounded observations support a traceability/usefulness account, not a demonstrated performance, correctness or discovery advantage.

The report cites summary/limitations query outputs as `tool-021.stdout.txt` and `tool-026.stdout.txt`, but these two files were not present at those paths during review. The underlying selected summary/limitations were independently read from the retained `tool-011.stdout.txt` JSON, so their substantive content is corroborated while those exact query-log links remain a traceability defect. No missing query file was fabricated or reconstructed.

## Incomplete recovery and unknowns

F05/F06/F07/F17/F29 are UNKNOWN: production lazy queued worker creation, abort/stale guards, idle termination, cached WebP module promise, persistent settings and debounced publication are not recovered. Own disposable workers and factory readiness are distinct mechanisms. F13 is PARTIAL because resize initialization is understood but cached production readiness is not identified; submitted resize instances are fresh per step.

Other PARTIAL recoveries concern unsupported-format codec fallback routing, full preprocessing order, production UI validation, alpha-premultiply/linear-light semantics, production resized ImageData construction, minified WebP memory/allocator versus Embind initialization, UI option inversions/presets, production File packaging and output URL lifecycle. Correct ABI parameter forwarding and actual image matches do not fill those explanation gaps. Input object-URL cleanup is correctly understood, but is a different lifecycle from replacing the production download URL.

No contradictory production architecture claim was identified under this rubric. The report appropriately qualifies Image versus preferred ImageBitmap edge cases, untested scalar fallback, color/orientation/large-input behavior, repeated/concurrent calls and permitted low-level algorithm reuse (`80-88`).

## Behavioral record and classification audit

The immutable mechanical record remains **29/30**, with all 26 positives exact and three of four negative cases accepted (`evaluator/results/C/comparison.json`, valid execution). `C29_CLASSIFICATION_AUDIT.md` independently establishes that the remaining C29 failure is a lexical classifier false negative: native input `Image.onerror` rejects with `Decoding error`, while the validator only matches `decode|image|InvalidStateError`. The frozen rubric excludes error wording and requires the very decoding rejection demonstrated by that trace/source. This assessment does not modify the raw score or write an adjudicated aggregate.

Specialist-tool execution, architecture category counts, encoded-byte correctness, error-classification defects, evidence traceability and experiment-level limits must remain separately reported. One sequential run on one host cannot establish general tool superiority or causal benefit.
