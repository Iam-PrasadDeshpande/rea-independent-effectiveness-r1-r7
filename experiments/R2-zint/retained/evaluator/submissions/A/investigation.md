# Independent GS1-128 investigation

Delivered `/output/solution.cpp`, compiled `/output/solution`, and wrote `/output/investigation.md`. The implementation is an independent, bounded reconstruction. It does not read, load, embed, or invoke the original executable at runtime. Completed in 28 dispatched actions.

## Architecture and evidence

The stripped ELF contains Zint identification strings at file offsets `0xaf302`, `0xb006a`, and `0xb4160`. No source or documentation was accessed. No Ghidra/REA capability was exposed in the supplied catalog.

The recovered pipeline is escape preprocessing → GS1 parsing, validation and reduction → Code 128 optimization → codeword emission → checksum and stop → module expansion → hexadecimal dump.

Native evidence is retained in the numbered `/output/cli-NNN.stdout.txt` logs. Code addresses below are objdump virtual addresses; string/table offsets are file offsets.

- GS1 encoder `0x16890` calls reducer `0xa2220` at `0x16a1f`, accepts reducer results through 4 at `0x16a27`, calls optimizer/emitter `0x15460` at `0x16a93`, and calls pattern/checksum builder `0x15830` at `0x16b69` (action 14).
- Input-mode flag `0x10` at symbol offset `0x1e0` selects parentheses instead of square brackets (`0xa22bd`, `0xa2350`). Extended bytes, NUL, controls and DEL are rejected with status 6 at `0xa2305–0xa23f4` (action 5). Related diagnostic strings occupy file offsets `0xbb640–0xbb818`.
- Reducer data structures include temporary reduced bytes and parallel arrays holding AI numbers, positions and field lengths. Validator dispatch is `0xa0280`, called at `0xa32c4` (actions 6 and 11). Complete native structure definitions remain unknown.
- Native length examples include SSCC length 18 (`0xa0390`), six-character date fields (`0xa04c0`), and a variable 1–20 character field (`0xa0568`). Unknown AI, length errors and semantic errors have distinct paths. Length versus semantic diagnostic selection appears at `0xa3258` and `0xa330b`.

Reduction removes AI delimiters while retaining AI digits and field bytes. Between fields, it inserts byte `0x1d` when the preceding AI does not have a predefined length. Native code tests the first two AI digits against mask `0x21f809ff81f` at `0xa2f53–0xa2fbc` (action 6). This decision rule is reproduced. Predefined-length classification is separate from validation of the particular AI.

The GS1 caller supplies optimizer state order `05 02` at `0x16a6a–0x16a93`, interpreted as C then B. Strict-less replacement at `0x15020–0x15027` preserves the earlier candidate on equal cost (actions 14 and 16). The reconstruction uses suffix dynamic programming, considering C before B, with numeric pairs, FNC1 and latches each costing one codeword. Observations support starting in C for the two AI digits even before alphabetic data. Full native seven-state behavior was not recovered.

Native optimizer storage uses short costs with 14-byte position strides and byte decisions with 7-byte strides. Emission produces an integer codeword array. The ordinary pattern table contains six ASCII run widths per codeword and starts at file offset `0xbe880`; action 17 dumps its 636 bytes for codes 0–105.

Builder `0x15830` accumulates position-weighted codeword values (`0x158c4`), reduces modulo 103 (`0x1594a–0x1596e`), and appends stop code 106 (`0x159ac`; action 15). Reconstructed constants are start B/C 104/105, FNC1 102, latches to B/C 100/99, and stop widths `2331112`. Initial GS1 indication and inserted field separators both encode as FNC1. Exact module comparisons substantiate these interpretations.

## Actual target observations

| Action | Input | Observed result |
|---|---|---|
| 7 | `[10]DEMO123` | Exit 0; nonempty hex |
| 8 | `[17]280101` | Exit 0; `D3 9E BA 73 73 4C D9 9B 39 66 3A C` |
| 9 | `[17]2801` | Exit 6; empty stdout; invalid length |
| 10 | `[17]281332[10]abc@#` | Exit 0; modules; CSET-82 warning for `@` |
| 18 | `[99]abc[01]1234567890123A` | Exit 0; modules; non-numeric-field warning |
| 19 | `[10]` | Exit 6; empty field |
| 20 | `[10]123456789012345678901` | Exit 6; overlong field |
| 21 | `(10)PUBLIC42`, parentheses enabled | Exit 0; modules |
| 22 | `[10]A12B3456C[17]280101` | Exit 0; mixed B/C and separator modules |
| 23 | Empty input | Exit 6; no input |

Semantic warnings can produce modules and CLI exit 0. The invalid date in action 10 was not isolated: the later field warning superseded its diagnostic. Its independent behavior was therefore not experimentally established.

Hex output is uppercase, module bits packed most-significant first, with spaces between byte groups and a final single digit when only a nibble is needed. The final nibble is padded on the right. The reconstruction emits one row and a trailing newline, without added quiet-zone modules. The exact comparisons below include formatting.

## Implementation and validation

Implemented requested argument forms, square/parenthesis parsing, common byte/numeric/Unicode-to-ASCII escapes, escaped literal parentheses, ASCII rejection, a bounded AI length catalog, reduction using the native predefined-length mask, B/C optimization, FNC1, checksum, stop and hexadecimal output. Invalid data returns 6; capacity overflow returns 5. Native guards include input length 256 (`0x169a7`) and a codeword comparison against 102 (`0x16b2f`).

Compilation succeeded with exit 0 in action 25. Action 26 compared the reconstruction with target action 22: all 89 stdout characters matched exactly, and both exits were 0. Action 27 compared `[10]DEMO123` with target action 7: all 56 stdout characters matched exactly, and both exits were 0. These are two positive end-to-end comparisons, not exhaustive validation.

## Limitations and unknowns

The AI catalog is incomplete. Most length entries beyond the specifically observed/native examples are inferred rules, not independently verified recovery. Rare/new AIs, structured variable-field ranges, noncanonical AI digit spellings, Digital Link URIs and composite behavior are unsupported or uncertain.

Semantic diagnostics for check digits, dates, numeric-only fields, character subsets, company prefixes, countries, currencies and coupons are not implemented. Observed warning cases retain scored output/status because their bytes are unchanged and CLI exit is 0; equivalence for all validation conditions is unknown.

Escape spelling, Unicode/range handling, error precedence and input-length accounting around escapes are approximate. Remaining optimizer states, rare tie cases and precise capacity accounting were not exhaustively recovered. The reconstruction makes no claim of complete GS1 conformance or hidden-corpus accuracy.