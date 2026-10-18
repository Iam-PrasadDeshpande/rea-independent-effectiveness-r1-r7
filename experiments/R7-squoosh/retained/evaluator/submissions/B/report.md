# Bounded independent WebP integration

Delivered `solution.js` and `solution-worker.js`. The classic entry script defines `window.reconstruct(request)`, decodes the supplied encoded bytes, applies the requested resize sequence, encodes with the supplied numeric WebP settings, and returns actual WebP bytes, MIME type and an extension-adjusted filename. Five chosen successful cases matched the production worker's encoded SHA-256 and decoded-pixel SHA-256 exactly. Two chosen failure cases rejected in both implementations. These observations concern public, self-selected fixtures; no hidden evaluation or general equivalence claim is made.

## Architecture

```mermaid
flowchart TD
  subgraph Production observed and inspected
    UI[Compress UI and WebP controls] --> Decode[Browser decode to RGBA]
    UI --> Bridge[Queued worker bridge and abort handling]
    Decode --> Bridge
    Bridge --> FW[features-worker RPC methods]
    FW --> Crop[Optional centered crop]
    Crop --> RW[squoosh_resize WASM]
    RW --> Glue[WebP AMD Emscripten glue]
    Glue --> CW[WebP encoder WASM]
    CW --> Export[Encoded buffer and Download]
  end
  subgraph Independent submitted runtime
    Request[Encoded request bytes] --> Main[solution.js Blob Image canvas decode]
    Main --> Transfer[Transfer RGBA and request steps]
    Transfer --> Worker[solution-worker.js independent messages]
    Worker --> OwnCrop[Independent crop and WASM memory bridge]
    OwnCrop --> PinnedResize[Pinned resize WASM]
    PinnedResize --> Loader[Independent minimal AMD loader]
    Worker --> Loader
    Loader --> PinnedCodec[Pinned original WebP glue and WASM]
    PinnedCodec --> Result[Copy and transfer WebP bytes]
    Result --> Return[Return MIME filename bytes and terminate worker]
  end
```

The production boxes describe inspected assets, not runtime dependencies of the submission. Reconstruction browser runs reported only `/submission/solution-worker.js` workers and no denied requests. Original app and feature-worker bundles are neither copied nor loaded by the submitted code.

## Component inventory and exact evidence

Offsets below are zero-based character offsets reported by `search_text`/`read_file` in the original minified assets.

| Component | Evidence | Recovered responsibility |
|---|---|---|
| `Compress-4cf9ab5f.js` | offset 7681 context; action 5 | WebP metadata, MIME `image/webp`, extension `webp`, complete default numeric options |
| Same bundle | offsets 34172-34942; action 5 | UI transforms: lossless preset becomes quality/method, slight-loss control becomes `100-value`, sharpness becomes `7-value`, discrete-tone hint becomes 3 |
| Same bundle | offset 37786; action 23 | Feature adapter invokes `webpEncode`; exact/preserve-transparent-data control |
| Same bundle | offset 93175 context; action 23 | Worker method list, serialized promise queue, lazy feature-worker creation, abort termination, 10-second idle termination |
| Same bundle | read offset 94160; action 24 | Browser-native `createImageBitmap` path with fallback image loading; unsupported-format codec fallbacks; decode exceptions become `Couldn't decode image` |
| `features-worker-b8ee33b5.js` | offset 96060 context; action 4 | Lazy SIMD capability choice, WebP module factory, `encode(data,width,height,options)`, null result throws `Encoding error.`, output `.buffer` |
| Same worker | offsets 115452-116756; action 2 | Resize WASM instantiation with empty imports, memory-array refresh after growth, malloc and returned-vector bridge |
| Same worker | offset 117892; action 7, and read offset 117950; action 3 | Kernel enum order triangle=0, catrom=1, mitchell=2, lanczos3=3; optional contain crop; premultiply and linearRGB arguments; hqx prepass |
| `util-06ce6ead.js` | offset 3167; action 9 | `getContainOffsets` computes a centered source crop using destination aspect ratio |
| `webp_enc-75623855.js` | characters 0-1700; action 6 | AMD dependencies `module`, `require`, `exports`; module URI controls location; factory returns ready promise; accepts `wasmBinary` |
| `webp_enc_simd-2d7d2456.js` | read offset 18500, end at 19498; action 13 | Factory exported as `exports.default` and resolves via runtime initialization |
| `squoosh_resize_bg-3d426466.wasm` | `wasm-objdump -x`, action 10 | No import section; memory initial 17 pages; exports memory, resize, malloc, free and stack adjustment; resize signature is ten i32 parameters, no direct result |
| `webp_enc-a8223a7d.wasm` | `strings`, action 19; `/output/tool-003.stdout.txt` | Embind names `encode`, `WebPConfig`, `WebPImageHint`, option fields and RIFF/WEBP strings corroborate the glue interface |

Pinned runtime inventory is baseline WebP glue/WASM (`webp_enc-75623855.js`, `webp_enc-a8223a7d.wasm`), SIMD counterparts (`webp_enc_simd-2d7d2456.js`, `webp_enc_simd-75acd924.wasm`) and resize WASM (`squoosh_resize_bg-3d426466.wasm`). The submission chooses SIMD with a small WebAssembly validation probe, otherwise baseline. Baseline execution was not forced in the browser tests.

Other inventoried production assets include initial-app, util, workerHelpers, Compress, service workers, alternate encoders/decoders, rotation, imagequant and hqx. They are outside the submitted runtime dependency set. Inventory came from literal `ls -R /artifact`, action 1.

## Execution and transformations

1. Validate `codec:'webp'` and a sequence ending in exactly one WebP encode; preceding steps must be resize. Read bytes from `request.input`, make a Blob URL, load an Image and draw at its natural dimensions onto a canvas. Read RGBA from that actual decode. No fixture pixels or expected outputs occur in the implementation. Revoke the Blob URL.
2. Create an independent dedicated worker per call. Transfer the RGBA buffer and structured-clone the dimensions/options/steps. This protocol does not use the production RPC library.
3. For each resize, validate positive integer target dimensions and select the recovered kernel index. `contain` means centered source cropping to the target aspect ratio, followed by resize; it does not add letterboxing. Crop coordinates and dimensions use `Math.round`, matching inspected glue. Other fit strings use direct resize, matching the worker branch.
4. Instantiate the resize WASM with `{}` imports. Reserve 16 stack bytes, allocate and copy the source bytes, then call `resize(returnSlot,inputPointer,inputLength,sourceWidth,sourceHeight,targetWidth,targetHeight,kernel,premultiply,linearRGB)`. Re-read memory after the call, obtain the output pointer/length from two i32 slots, copy the RGBA result, free the returned vector and restore the stack. A fresh resize instance per step bounds instance lifetime; the inspected wrapper does not explicitly free the consumed input allocation, and neither does this bridge.
5. Load original individual WebP glue with `importScripts` using a minimal independent AMD `define` adapter. Supply the module URI and original WASM bytes, await the factory, and invoke the inspected encode API. Pass the request's options directly without UI conversions, clamping, replacement presets or quality-only reduction. Copy returned bytes before transferring them.
6. The main thread resolves `{bytes,mimeType:'image/webp',filename}` and terminates the worker. The caller can save those bytes; the integration does not synthesize a download click.

All 27 production default fields found in the Compress metadata are retained as request meanings: quality=75, target_size=0, target_PSNR=0, method=4, sns_strength=50, filter_strength=60, filter_sharpness=0, filter_type=1, partitions=0, segments=4, pass=1, show_compressed=0, preprocessing=0, autofilter=0, partition_limit=0, alpha_compression=1, alpha_filtering=1, alpha_quality=100, lossless=0, exact=0, image_hint=0, emulate_jpeg_size=0, thread_level=0, low_memory=0, near_lossless=100, use_delta_palette=0, use_sharp_yuv=0. These are evidence of the interface, not defaults silently merged by the submission: evaluation supplies full options. Unknown fields are passed through; their behavior belongs to the reused binding.

## Browser evidence

Actions 14 and 17 ran the same first pair through the production worker and independent reconstruction. Action 17 log is `/output/tool-001.stdout.txt`, timestamp 2026-10-18T04:58:20.030Z. Actions 20 and 21 ran the second batch; their retained logs are `/output/tool-004.stdout.txt` and `/output/tool-005.stdout.txt`. All successful rows below had identical input hashes in each pair and identical encoded and decoded hashes.

| Scenario | Transformation/settings | Output | Encoded SHA-256 in both implementations |
|---|---|---|---|
| gradient-resize | PNG 64x48 to 32x24; lanczos3; premultiply+linearRGB; lossy quality 75 | 156 bytes | e777365790249abb577110a1af7a9a5f138b6947dbb5553774ce33efa8b18aab |
| alpha-contain | PNG 63x47 to 31x31; centered crop; catrom; both flags false; lossless/exact, quality 90, method 6 | 1268 bytes | cc17ac8c730bfedf39b45969ce4ff3c3b1ab6c14a5e1514fdae3e9ec3151c4eb |
| jpeg-triangle | JPEG 45x29 to 27x17; triangle; linearRGB; quality 37.5 and varied advanced numeric fields | 142 bytes | 05eea4028135090eb454a87c6fa1de8729aa197e99578271c73dafc87e889beb |
| webp-mitchell | WebP 32x24 to 51x37; mitchell; premultiply; lossy defaults | 284 bytes | 7a0ee18704d3440e003d611e30d24c096f6fa84030519b42e0ee1b5115639eb5 |
| no-resize | PNG solid 19x13; encode only | 74 bytes | aba0a0edc428b96364a34cab52296ea564a110cf7536511397f09e8db8990e6a |

Decoded-pixel SHA-256 values, respectively: `ce5d55d04733eb933547437012241b46ab1b39f7af381e8f1b4be3cc16e12da8`, `18dffc342cc8e74f304c8bf56b4d12bf5fa00190ac9eb9886a9abfe91d994d46`, `a409c3590d1168e41da5adb8ae2d831ceb77b49dcc68e419e4cd0df0958330dd`, `d48e2a064a81d235670f55bdcaf5a4f44c777062920425c249bf3236493749f5`, `7cd3fe38a226346138cdcc8e4ceb0197ea811b14c2a6c4fd04cffe09dbebfd89`.

Production UI inspect, action 12, actually uploaded and exported 64x48 WebP, 302 bytes, SHA-256 `6771586a6dadf4c1d22d2189ed46e2e8bed1a09fcc2e7860064bb24b291a4ecb`. Its observed controls included codec selectors, resize enable, lossless, effort, quality, exact and Download. The tool reported blocked Google Analytics and blocked service-worker registration; the image feature still completed. No external request was initiated by investigator code.

## Failure behavior, bounds and unknowns

Quality 101 returned `Encoding error.` from the production feature worker and the independent encoder. Corrupt PNG bytes failed browser decode in both: production probe reported `InvalidStateError: The source image could not be decoded`; reconstruction rejected `Image decoding failed`. Exact error classes/messages are therefore not identical for decode failure. Those two cases are in actions 20/21 logs.

The submission also rejects empty bytes, invalid method order, unsupported resize kernels, nonpositive/noninteger target sizes, nonfinite/nonnumeric WebP fields, missing assets and unexpected resize lengths. It checks a 16,777,216-pixel bound after decoding and before each resize. The browser decode itself occurs before that bound can be checked. Worker errors propagate as rejected promises; a 120-second processing timer terminates stalled workers. Those additional boundaries were inspected in submitted code but not individually browser-tested. Full numeric WebP range validation is delegated to the original codec, rather than guessed.

The recovered production hqx path uses an additional hqx WASM prepass with scale clamped to 1-4, then catrom. That asset is not among permitted reconstruction runtime assets, so hqx is explicitly rejected. Browser-specific resize variants, alternate formats requiring codec decode fallbacks, SVG normalization, rotation, quantization, UI state/cache/abort parity, two-sided comparison, service workers and other encoders remain outside scope. Native PNG/JPEG/WebP decoding was tested. Animation, EXIF orientation, ICC/color-management edge cases, very large images, repeated resize sequences, zero-area rounded crops, non-SIMD hardware and nondefault target-size/PSNR/thread-level behavior remain untested. The full option object is forwarded, but tests do not independently prove every field's algorithmic effect.

## Tool observations and codec reuse

Only supplied signed dispatch tools were used. No shell/interpreter, source maps, original repository, network lookup, other accounts, peers or agents were used. Acorn AST parsing of baseline WebP glue (action 11) succeeded, confirmed the single top-level AMD `define` call and dependency array, and produced about 2.99 million characters of AST output. Its size made literal search/paged reads more efficient for locating the factory boundary. WABT objdump (action 10) succeeded and substantively established the resize export signatures, memory and absence of imports; its data-section output was much larger than the useful interface evidence. No full WAT or algorithm reconstruction was attempted. `search_text` for contain offsets in workerHelpers returned no matches (action 8); util supplied the actual implementation (action 9). Every write received a Valid signature response, and actual browser reconstruction results, rather than file visibility alone, establish execution.

Controller pauses caused later tool-log numbering to restart. Consequently, original-asset character offsets and dispatched action numbers are used for earlier evidence; retained later browser log paths are identified with timestamps above. No execution-time or token measurement is inferred from those pauses.

Codec reuse means the supplied WebP encoder binary and original individual Emscripten glue perform compression, and the supplied resize binary performs resampling. The independent work is decoding/orchestration, worker protocol, AMD adaptation, crop integration, recovered WASM ABI bridge, export packaging and error handling. It does not constitute reimplementation or complete recovery of WebP entropy coding, filtering mathematics or Rust resampling internals. Exact fixture matches demonstrate this bounded integration, not independent invention of those algorithms.

Software notices are preserved by using the pinned codec/glue assets unchanged; no notices or attribution text were removed or rewritten. The work identifies the production application as Squoosh and retains the WebP/squoosh asset identities. A case-insensitive recursive copyright inventory (action 22, `/output/tool-006.stdout.txt`) found notices in other, unused codec/demo assets, but none in the relevant WebP/resize files. The supplied inventory did not include standalone upstream license documents; exact upstream license texts/versions were not independently established and are not fabricated here. This report is not a replacement license for the reused assets.
