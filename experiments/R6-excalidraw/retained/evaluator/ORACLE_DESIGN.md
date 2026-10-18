# R6 private oracle design

Prepared from the pinned source, before blind-arm execution. Proposed cases below are not executed results. Freeze expected observations after a real-browser reference preflight, before any investigator can inspect target outputs. Keep this document, reference source, fixtures with gold expectations and oracle results inaccessible to arms.

## Independent, observable contract

Use a real built app at a local origin with isolated browser contexts, fixed viewport/DPR, English language, fixed browser version and bundled fonts. Do not instrument source, expose Excalidraw API or read React internals. Inputs are real pointer/keyboard events, file chooser uploads, settings controls and reloads. Observe the rendered UI, origin-local localStorage (`excalidraw`, `excalidraw-state`), downloaded files and normal console errors. localStorage inspection is readback evidence; changes to storage are inputs only in explicitly identified recovery fixtures.

Read only after an observable save barrier: poll until the expected semantic property appears, then require two equal normalized reads at least 350 ms apart. Save timeout is 300 ms and saving pauses for hidden documents; keep page foreground/visible. A timeout is a failed/unavailable observation, never assumed success. Retain before/after JSON, exact input event sequence, downloaded bytes plus hashes, page screenshot and console errors.

For independent fresh contexts, normalize element IDs to first-seen aliases and consistently remap groupIds, frameId, boundElements, containerId, startBinding/endBinding element IDs. Preserve array order (z-order). Compare semantic kind, geometry, colors/styles, text, point arrays, bindings and group structure. Ignore generated seed, version, versionNonce, updated timestamp and source origin. Round floating geometry only to a declared tolerance (suggest 0.5 scene px for pointer-driven geometry, tighter for untouched reimport fields); compare known movement deltas rather than absolute client coordinates after reload/import centering. Do not sort elements by type or remove meaningful graph relationships.

Use a stricter same-context identity contract for move/edit/undo/redo: IDs of surviving elements remain the same; duplicate gets a distinct ID. Deleted elements are absent from browser persistence and local JSON, because clearElements functions filter them. Never infer in-memory tombstones from persistence. Selection-only UI state and history button state may support a case, but do not treat selection as element mutation. Preserve unnormalized raw observations for audit.

SVG: parse as XML; require svg root, positive viewBox and dimensions, drawing nodes, optional background node, embed markers and editable roundtrip. Do not compare full SVG strings or rough random path bytes across independently drawn scenes. PNG: verify signature, decode dimensions and alpha/color samples, require nonempty raster content, and use dimension ratios for scale. Font/rough rendering makes exact image hashes unsuitable for semantic equality. Hashes establish artifact identity only. SVG/PNG reimport assertions apply only with editable scene embedding enabled.

## Proposed deterministic scenarios (48)

Each row is a distinct transition/assertion, not a restatement of one measurement. Prefer independent contexts per case, except explicit multi-step histories. Start with 100% zoom, no grid, no snap, default stroke, no collaboration and no active text editor. Use nonoverlapping simple shapes unless the case calls for grouping/ordering/binding. Geometry points should be chosen in evaluator preflight and frozen. Every numbered case must run, or be reported unsupported/blocked with a reason; do not silently replace difficult cases after seeing arm outcomes.

| ID | Input and prior state | Expected observable transition |
|---|---|---|
| 01 | Fresh origin; load app | Interactive canvas and Rectangle radio exist; normalized scene empty; app remains responsive. |
| 02 | Rectangle tool; drag clear 120x80 region | One rectangle, positive dimensions approximately drag extents; no extra element. |
| 03 | Rectangle reverse-direction drag | One rectangle with positive normalized dimensions and bounding box matching both endpoints. |
| 04 | Diamond tool; drag | One diamond with expected bounds. |
| 05 | Ellipse tool; drag | One ellipse with expected bounds. |
| 06 | Line tool; single drag | One line; two endpoint points, expected total displacement; lastCommittedPoint null in persistence. |
| 07 | Arrow tool; drag away from shapes | One arrow with endpoint displacement; default end arrowhead present; no accidental bindings. |
| 08 | Freedraw; fixed multipoint drag | One freedraw element with at least three distinct points and bounds covering path; count/shape stable under frozen event sequence. |
| 09 | Text tool; click; type plain ASCII; Escape | One text element; text/originalText exact; nonzero dimensions; textarea dismissed. |
| 10 | Text entry with two lines and Unicode | Exact newline and Unicode preserved in persisted text and reexported JSON; correct line count. |
| 11 | Existing text; double-click; replace text; commit | Same element ID, new exact text and updated geometry; no duplicate text element. |
| 12 | Existing unfilled rectangle; selection drag from its edge by fixed delta | Same ID/style/kind/size, x/y change by delta within tolerance. |
| 13 | Existing rectangle; drag corner resize handle | Same ID/type, width/height change in intended directions; no new scene element. |
| 14 | Existing rectangle selected; change Stroke via UI to a frozen palette value | Only target strokeColor changes; geometry and count invariant. |
| 15 | Existing rectangle selected; change Background color to a frozen value | backgroundColor changes; geometry/count invariant. |
| 16 | Existing rectangle selected; choose solid Fill style | fillStyle becomes solid; prior background remains; geometry invariant. |
| 17 | Selected rectangle; choose different Stroke width | strokeWidth becomes chosen source-backed value; geometry invariant. |
| 18 | Selected rectangle; change Opacity slider/input | opacity equals frozen chosen value; count and geometry invariant. |
| 19 | Selected rectangle; Ctrl+D | Two semantic rectangles with distinct IDs; duplicate preserves style/size and has deliberate position offset; original unchanged. |
| 20 | Two shapes; select one; Delete | Only selected element absent from localStorage and local JSON; surviving element same ID/geometry. |
| 21 | Two shapes; canvas Ctrl+A; Delete | Persisted semantic scene empty. |
| 22 | Empty scene; create rectangle; Undo | Scene returns empty and Redo becomes enabled. |
| 23 | Case 22 state; Redo | Same rectangle identity/semantic geometry restored; no extra object. |
| 24 | Existing rectangle; move; Undo | Same ID returns to pre-move geometry. |
| 25 | Existing rectangle; color edit; Undo | Prior color restored; geometry invariant. |
| 26 | Existing shape; Delete; Undo | Same ID/semantics restored after persistence filtering removed it. |
| 27 | Create rectangle then ellipse; two Undo; two Redo | Counts 2 -> 1 -> 0 -> 1 -> 2; order and types restored. |
| 28 | Create A, create B, Undo B, create C, request Redo | B remains absent; C survives; Redo disabled/new element edit invalidates prior redo. |
| 29 | Create A+B; Undo B; click blank canvas; Redo | Selection-only change does not invalidate redo; B restored. |
| 30 | Two shapes selected; Ctrl+G | Both get same nonempty group identifier; count/geometry invariant. |
| 31 | Group from case 30; Ctrl+Shift+G | Shared grouping removed; scene semantics otherwise invariant. |
| 32 | Two overlapping shapes; select lower; Bring to front UI | Persisted element array order changes as intended; IDs/geometry invariant. |
| 33 | Nonempty mixed scene; local Save as JSON | Download parses; type=excalidraw, version exists, elements exact normalized scene, files object; browser-only selection/scroll/zoom absent from exported appState. |
| 34 | Export JSON; replace scene; Open exported JSON | Restored normalized geometry/style/text/group/binding semantics match original despite recentering viewport. |
| 35 | Create two shapes; delete one; save JSON | Deleted element absent; survivor exact; no stale deleted-file entries when relevant. |
| 36 | Open deliberately malformed .excalidraw text into nonempty scene | Visible invalid-file error; scene preserved; dismiss dialog and subsequent draw succeeds. |
| 37 | Open JSON with wrong top-level type into nonempty scene | Rejection/error and original scene preserved. |
| 38 | Valid Excalidraw JSON with empty elements | Clean empty scene accepted; no invalid-file error; app remains drawable. |
| 39 | Create mixed scene; wait save; reload | Persisted element IDs/geometry/style/text restored; no extra shapes. Do not require undo stack persistence. |
| 40 | Seed malformed elements JSON with valid app-state background; load | Empty scene recovered, valid background retained; parse error may log; next draw saves valid JSON. |
| 41 | Seed valid scene elements and malformed app-state JSON; load | Valid elements recovered; default app-state fills in; app remains drawable. |
| 42 | Nonempty simple scene; export SVG without embed | Valid SVG, positive dimensions/viewBox and drawing nodes; no editable scene payload marker. |
| 43 | Same scene; export PNG at 1x | Valid PNG signature; decodes to positive dimensions and nonempty content. |
| 44 | Same scene; PNG export at 2x | Decoded width and height are 2x baseline (allow documented rounding); scene unchanged. |
| 45 | Same rectangle scene; background off versus on PNG | Corner alpha transparent when off and opaque background color when on; shape content remains visible. |
| 46 | Two far-apart shapes; select one; export only selected SVG | Output bounds correspond to selected shape plus frozen export padding, smaller than full scene; other shape absent. |
| 47 | Mixed scene; enable embed; export SVG; Open it | SVG has Excalidraw payload metadata markers and valid XML; import restores semantic scene. |
| 48 | Mixed scene; enable embed; export PNG; Open it | Valid PNG with editable metadata; import restores semantic scene. |

## Source-backed constraints and coverage

Creation/editing cases 02-18 cover pointer dispatch, geometry, textarea and property actions. History cases 22-29 test data transitions plus stack invalidation; button state alone is insufficient. Serialization cases 33-38 distinguish export policy, restore path and error preservation. Persistence cases 39-41 exercise wrapper storage independently from export. Cases 42-48 exercise actual file encoders and decoders rather than treating a clicked button as export success.

At least 30 independently meaningful executed cases are required. If some UI cases prove brittle in evaluator-only preflight, select a fixed final subset with all required domains represented before freeze, state the final denominator and retain the exclusions. Never count multiple identical output comparisons as extra cases or infer correctness from screenshots alone. Architecture correctness, functional agreement, tool invocation capability, traceability, elapsed time and token costs remain separate axes. A functional oracle that passes in all arms is evidence of agreement on the frozen inputs, not proof that REA improves accuracy.
