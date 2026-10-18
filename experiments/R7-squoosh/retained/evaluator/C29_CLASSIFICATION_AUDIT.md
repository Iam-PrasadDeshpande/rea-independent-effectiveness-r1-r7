# C29 classification audit — raw result preserved

Conclusion: **the recorded C29 failure is a harness classification false negative, not an observed implementation fault.** The actual trace and immutable source establish input-image decoding rejection, satisfying the same unchanged semantic predicate in the frozen rubric. This document does not change any recorded score, validator, input, expected result or submission.

Raw `evaluator/results/C/comparison.json` remains **29/30**, with 26/26 positive exact matches and 3/4 mechanically accepted negatives. For C29 it records `rejected:true`, `reconstructRejected:true`, `notTimeoutOrCrash:true`, and only `decodeRejection:false`.

## Evidence chain

1. Frozen `evaluator/RUBRIC.md:7-9` requires corrupt image input to reject during decoding; it expressly excludes error wording and stack location from comparison. `evaluator/scenarios.json`, case `C29_corrupt_input`, supplies a PNG fixture with `corrupt:true` and a final WebP encode step. No criterion requires a particular error string.
2. Immutable `evaluator/submissions/C/solution.js:8-12` wraps supplied encoded bytes in a MIME-labelled Blob, creates its object URL, and awaits native Image loading. Line 12 attaches `im.onerror=()=>reject(new Error('Decoding error'))`; `im.src=url` starts that loading. Its `finally` revokes the object URL. There is no fallback success result.
3. Subsequent canvas extraction occurs at lines 13-17 and worker creation at line 18. The failing native load prevents execution from reaching them. The rejection is therefore attributable to input decoding, not output verification, output decoding, codec encoding, timeout or worker crash.
4. `evaluator/results/C/actual.json`, C29, retains `__R7_RECONSTRUCTION_REJECTION__ Error: Decoding error` with `at im.onerror (.../submission/solution.js:12:119)`. The reconstruction-stage witness and source callback independently support the required rejection boundary. The earlier self-selected corrupt-input probe has the same callback/error (`arms/C/output/tool-023.stdout.txt`); that corroborates but does not replace the hidden case evidence.
5. `scripts/Validate-R7-v4.ps1:28` tests the raw error against `decode|image|InvalidStateError`. `Decoding` contains neither the literal substring `decode` nor `image`, and its stack uses `im.onerror`. Thus the lexical test returns false even though the semantic decoding rejection is proved. A callback named `image.onerror` would potentially match solely through stack spelling, underscoring that this is a wording classifier rather than the frozen behavioral requirement.

The report/entry/worker hashes independently matched the snapshot manifest. In particular the audited entry SHA-256 is `456be8242d4bd87127a81a0dcd7fca077ba58595078b734f2e367c1b59ce4d11`.

## Disposition boundary

The same frozen predicate — corrupt input causes decoding rejection, error wording excluded — is satisfied by the retained C29 execution. This is semantic adjudication of existing evidence, not a relaxed requirement, new passing test, rerun, implementation repair, or changed error-string expectation. Any aggregate adjudicated result must be reported explicitly beside the immutable raw 29/30 and this explanation; it must not silently overwrite the mechanical result. Root retains responsibility for final experiment disposition. No new aggregate score is written by this audit.
