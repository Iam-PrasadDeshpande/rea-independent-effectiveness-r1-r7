# Evaluator-only GS1-128 recovery rubric

Freeze before investigator dispatch. Source: Zint commit `55541e139e62b9209b71cd9b0ba9010cec28b1d9`. References below are source-file line anchors at that pin, not investigator inputs. Source-specific names need not be recovered: accurate roles, relationships, evidence and behavior are sufficient.

For each item record FULL (correct material content and evidence), PARTIAL (some correct content with an essential omission/qualification), ABSENT (including explicit unknown) or INCORRECT (material contradiction). Explicit unknowns are not unsupported conclusions. Score traceability separately: none, retrievable tool/address evidence, or artifact/provider-linked evidence. A retained Evidence ID earns no automatic accuracy credit. Count material unsupported/incorrect claims separately, including claims outside the rubric; do not infer a business outcome from canonical patterns.

| ID | Expected bounded fact | Source |
|---|---|---|
| A1 | The CLI accepts data and dispatches encoding through the barcode library; barcode 16 selects GS1-128. | frontend/main.c:2287; backend/library.c:944 |
| A2 | Optional escape normalization occurs before symbology encoding/GS1 verification. | backend/library.c:712,1027,1160 |
| A3 | GS1 parsing/validation/reduction is a separate step before Code 128 codeword construction. | backend/code128.c:542 |
| A4 | Code-set cost/mode selection precedes emitting codeword values. | backend/code128.c:153,227 |
| A5 | Codeword values are transformed through a pattern table into rendered modules. | backend/code128.c:48,300 |
| A6 | Checksum/stop construction is distinct from GS1 semantic validation. | backend/code128.c:300; backend/gs1.c:1992 |
| A7 | Fatal validation errors stop encoding; warnings can survive while modules are produced. | backend/code128.c:542; backend/gs1.c:2007 |
| A8 | The dump path serializes rendered rows to hex, rather than returning source text or an image codec. | backend/library.c:1329 |
| F1 | AIs have field-specific data lengths, not one universal fixed field width. | backend/gs1.c:1961,1992; backend/gs1_lint.h |
| F2 | GTIN/SSCC-style numeric fields have length and check-digit semantics. | backend/gs1.c:219; backend/gs1_lint.h; hidden fixed/error cases |
| F3 | Date AIs have semantic validation beyond merely accepting six bytes. | backend/gs1.c:1992; backend/gs1_lint.h; E06/E07 |
| F4 | Fields in the predefined-length AI groups do not require a separator before the following AI. | backend/gs1.c:2027 |
| V1 | Variable AIs have bounded lengths; batch/serial examples differ from fixed GTIN/date fields. | backend/gs1_lint.h; V01-V11/E08 |
| V2 | A following AI after a non-predefined-length field causes a separator in the reduced stream. | backend/gs1.c:2024 |
| V3 | A final variable field does not get an unconditional trailing separator. | backend/gs1.c:2021-2047 |
| V4 | Variable-field character/numeric constraints remain AI-specific; not every printable string is valid for every AI. | backend/gs1.c:1992; backend/gs1_lint.h |
| N1 | Square-bracket AI notation is the default parser form. | backend/gs1.c:1786,1825 |
| N2 | The parenthesis option changes AI delimiters and selects GS1 input handling. | frontend/main.c:1743; backend/gs1.c:1786 |
| N3 | AI delimiter syntax is removed; AI digits and field data remain encoded. | backend/gs1.c:2021-2047 |
| N4 | The escape flag converts supported escapes before GS1 rules; it does not make raw control bytes generally legal GS1 data. | backend/library.c:712,1160; backend/gs1.c:1809-1819 |
| C1 | This GS1-128 path admits Code Sets B/C and FNC1, excluding ordinary A/control/extended-character paths. | backend/code128.c:549-552 |
| C2 | Code Set C packs two numeric digits into one codeword. | backend/code128.c:281 |
| C3 | Selection uses a cost/mode algorithm minimizing codeword count, with declared priorities/tie behavior; a universal digit-run threshold alone is incomplete. | backend/code128.c:153-240,343 |
| C4 | Odd digits and mixed alphabetic/numeric runs can require B/C transitions, with emitted latch/start codewords. | backend/code128.c:249-292 |
| U1 | GS1 start sequences include initial FNC1 after the start codeword. | backend/code128.c:256; start_idx=1 at 552; code128.h |
| U2 | FNC1 is emitted as codeword 102. | backend/code128.c:279 |
| U3 | Internal separator representation is GS byte 0x1D, interpreted as FNC1 in this path. | backend/gs1.c:2025; backend/code128.c:246,280,547 |
| U4 | Separator handling participates in set selection/emission rather than encoding AI delimiters as literal bracket glyphs. | backend/code128.c:153-292; backend/gs1.c:2021 |
| K1 | The checksum starts with the start value and adds position-weighted subsequent codewords. | backend/code128.c:306-313 |
| K2 | Checksum reduction is modulo 103. | backend/code128.c:314 |
| K3 | FNC1 and latch codewords are included in the weighted codeword stream, not omitted as formatting. | backend/code128.c:249-314 |
| K4 | Checksum precedes stop; stop is codeword 106 with 2331112 width pattern. | backend/code128.c:315-323 |
| E1 | Missing/malformed/nested AI delimiters and empty data fields are rejected. | backend/gs1.c:1825,1918-1944,1977 |
| E2 | Unknown AIs and incompatible lengths can be fatal; semantic lint failures can instead produce noncompliance warnings for compatibility. | backend/gs1.c:1992-2011 |
| E3 | NUL/control/DEL and extended bytes have explicit GS1 restrictions; escape decoding does not bypass them. | backend/gs1.c:1809-1819 |
| E4 | Input/codeword size limits and the GS1 reduced-length warning are separate constraints, not arbitrary truncation. | backend/code128.c:529,568,612 |
| O1 | Codeword patterns expand alternating bar/space run widths into modules. | backend/code128.c:48,300-334; backend/common.c |
| O2 | Start/data/checksum ordinary glyphs and the longer stop determine width; a typical width is 11 times ordinary codeword count plus the 13-module stop. | backend/code128.c:300-334 |
| O3 | Dump output packs module bits MSB-first into hexadecimal and pads the final partial nibble with zero bits. | backend/library.c:1346-1365 |
| O4 | The CLI dump groups hex digits with spaces/newlines; canonical comparison removes only whitespace and normalizes hex case. | backend/library.c:1346-1367; frozen oracle |

All 40 items are fixed before seeing investigator outputs. Full/partial/absent/incorrect totals are reported as counts, without invented fidelity percentages. Case outcomes and rubric recovery remain separate evidence lanes. Source-anchor ranges in prose identify the relevant implementation; exact comments and full source are retained in evaluator storage.
