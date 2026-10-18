# R7 frozen evaluation contract

Hypothesis: REA may improve evidence traceability or discovery beyond ordinary inspection and matched direct WABT/AST tools. Functional improvement is a separate question. One sequential matched run cannot establish a causal benefit or general superiority.

## Behavioral oracle

Thirty cases in scenarios.json are grounded in actual production-worker behavior, observed twice before investigators. Cases C01-C26 produce real WebP; C27,C28,C30 reject invalid encoder options; C29 rejects corrupt image input. No result is predicted from source alone. The candidates in REFERENCE_REVIEW.md were narrowed to a bounded browser decode -> production resize worker -> WebP worker -> encode/decode/export integration. UI smoke is recorded separately. UI race/recovery, full editor, SVG, all other codecs, service workers, actual algorithm reimplementation and large-input performance are outside the scored reconstruction.

For each positive case require all: working submitted implementation; same generated encoded input SHA256; image/webp MIME; filename equivalent to Squoosh extension replacement (remove final extension, append .webp); output RIFF/WEBP signature; nonempty output; expected decoded dimensions; and exact encoded byte SHA256 and decoded RGBA SHA256. Exact bytes are justified only here: same pinned codec binary, fixed browser, fixed options, and two identical reference observations. No lossy tolerance is silently substituted. Report byte and decoded comparisons independently if divergence occurs. Three invalid encoder cases require a thrown/rejected error rather than successful output; corrupt input requires decoding rejection. Error wording, stack location, localhost port, job duration, evidence IDs and timestamps are not compared. Timeouts/worker crashes do not count as expected rejection. No evaluator-side implementation patches. Frozen cases may not be relaxed after submissions.

Each case is one whole workflow, including multiple transformations where declared. Report 26 positive and four negative outcomes separately. Candidate count is not a claim of exhaustive coverage or full application understanding. A per-case success cannot prove architecture understanding.

## Architecture rubric

Thirty independent factual obligations. Rate each FULL (correct, specific, artifact/tool evidence supports), PARTIAL (correct but incomplete or weakly evidenced), INCORRECT (contradicts reference), UNKNOWN (omitted/explicitly unknown), or NOT_OBSERVABLE (not recoverable from frozen artifact). Count categories separately; do not combine with behavioral correctness. Compare evidence links, false conclusions and explicit unknowns separately. Source-backed reference evidence is REFERENCE_REVIEW.md plus pinned source paths. A diagram alone earns no blanket credit.

| ID | Obligation |
|---|---|
| F01 | Input File/Blob content decoding into RGBA ImageData |
| F02 | Native browser decoding and codec-specific fallback distinction |
| F03 | Preprocessing/processing happens before selected encoding |
| F04 | Feature worker boundary and Comlink request/response orchestration |
| F05 | Worker creation is lazy and work queued |
| F06 | Active abort terminates worker; stale results guarded |
| F07 | Idle worker termination/recreation boundary |
| F08 | Resize enum triangle/catrom/mitchell/lanczos3 order 0..3 |
| F09 | Contain computes centered crop before fixed output dimensions |
| F10 | Resize width/height and UI positive validation |
| F11 | premultiply flag changes alpha resize behavior |
| F12 | linearRGB flag controls resize color processing |
| F13 | Resize WASM initialization is lazy/cached |
| F14 | Resize wasm-bindgen byte-memory allocation/copy/free interface |
| F15 | Resize output returned as ImageData with declared dimensions |
| F16 | WebP SIMD capability branch and baseline fallback |
| F17 | WebP Emscripten module promise is cached |
| F18 | AMD production glue and relative WASM asset binding |
| F19 | WASM import/export evidence with exact selected artifact SHA256 |
| F20 | Exported minified memory/malloc/free and Embind initialization distinction |
| F21 | encode receives RGBA typed array,width,height,full option object |
| F22 | WebP quality/method defaults 75/4 and lossless default 0 |
| F23 | Alpha, lossless/near_lossless, sharp-YUV option mapping |
| F24 | null codec result becomes Encoding error |
| F25 | WASM interfaces are ABI evidence, not recovered complete algorithm |
| F26 | Encoded result ArrayBuffer -> File/Blob with image/webp |
| F27 | Download filename extension replacement |
| F28 | Object URL creation/revocation/download lifecycle |
| F29 | Settings persistence and queued/debounced result handling |
| F30 | Error/UNKNOWN scope: malformed images, unsupported formats and memory/runtime bounds |

## Matched run and cost contract

Predeclared order B,A,C, sequential, one run per arm. Model gpt-6.1-sol, effort low, 1200 seconds and 60 tool-call ceiling each; failed attempts count. Standard arm ordinary asset tools; B adds WABT 1.0.42 and direct Acorn AST; C adds REA 6.5.0 WABT 1.0.42 and REA JS analysis. All get same full production artifact for inspection/probes, no original source, source maps, oracle, peer outputs or external network. Reconstruction runtime mounts only pinned individual codec glue/WASM, preventing delegation to the original feature worker/application.

Measure CLI usage input/cached/output tokens, elapsed seconds, tool outcomes, setup/recovery overhead, and observed load. GNU time CLI CPU/max-RSS excludes Windows MCP/browser subprocesses; report this limit. Dollar cost is UNKNOWN unless actual billing observed. Native tools/browser use offline bwrap namespace, separate scratch/profile, read-only artifacts, no source/oracle/peer mounts. CLI model transport remains a trusted coordinator network channel; investigator target tools have no outside network route. No claim of independent accounts/hosts, protection against a malicious model transport, or absence of model pretraining knowledge.

Disposition: QUALIFIED_BOUNDED_POC only if provenance, actual relevant REA invocation, freeze, isolation, all three independent working submissions and independent comparisons are evidenced with stated limitations. PASS_WITH_GAPS for useful valid partial evidence; NOT_QUALIFIED if required reconstruction/reference cannot be established; INVALID_COMPARISON for violated blindness or unequal unauthorized access. Never infer superiority from counts alone.
