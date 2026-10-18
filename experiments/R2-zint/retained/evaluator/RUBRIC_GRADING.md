# R2 recovery assessment against the frozen 40 facts

Assessment after all three blind sessions closed. F = FULL, P = PARTIAL. No item was scored ABSENT or INCORRECT. These are qualitative source-backed judgements by the coordinator, not independent human-gold scores. They can be regraded from the retained reports, programs, tool logs, frozen rubric and reference source. No weights or fidelity percentages are assigned.

| ID | A | B | C |
|---|---|---|---|
| A1 | P | P | P |
| A2 | P | P | F |
| A3 | F | F | F |
| A4 | F | F | F |
| A5 | F | F | F |
| A6 | F | F | F |
| A7 | F | F | F |
| A8 | F | F | F |
| F1 | F | F | F |
| F2 | P | F | F |
| F3 | P | F | F |
| F4 | F | F | F |
| V1 | F | F | F |
| V2 | F | F | F |
| V3 | F | F | F |
| V4 | F | F | F |
| N1 | F | F | F |
| N2 | F | F | F |
| N3 | F | F | F |
| N4 | P | P | F |
| C1 | F | F | F |
| C2 | F | F | F |
| C3 | F | F | F |
| C4 | F | F | F |
| U1 | F | F | F |
| U2 | F | F | F |
| U3 | F | F | F |
| U4 | F | F | F |
| K1 | F | F | F |
| K2 | F | F | F |
| K3 | F | F | F |
| K4 | F | F | F |
| E1 | F | F | F |
| E2 | P | F | F |
| E3 | F | F | F |
| E4 | P | F | F |
| O1 | F | F | F |
| O2 | F | F | F |
| O3 | F | F | F |
| O4 | F | F | F |

Totals: A 33 FULL / 7 PARTIAL; B 37 FULL / 3 PARTIAL; C 39 FULL / 1 PARTIAL. Architecture subset A1–A8: A 6 FULL / 2 PARTIAL, B 6 / 2, C 7 / 1. Remaining behavior facts: A 27 / 5, B 31 / 1, C 32 / 0.

Partial-item reasons and distinguishing evidence:

- A1, all arms: encoding/reduction/rendering roles and relationships are recovered, but the CLI-to-library barcode dispatch boundary is not independently traced. Barcode 16 was supplied in the task; repeating it is insufficient evidence of recovering this boundary.
- A2 and N4, A/B: implementations place bounded escape handling before parsing and the reports correctly recover control-byte rejection. Their escape forms/order remain explicitly unvalidated and no native CLI escape routine is recovered. C actions 24/25 compare escaped hex/decimal/octal input against the target and reconstruction; its reducer evidence establishes the control restrictions. This supports the bounded facts without claiming every escape form.
- F2, A: SSCC length is recovered, while check-digit semantics are listed among unimplemented/uncertain checks without a decisive observed case or recovered validator. B's AI dispatcher evidence explicitly distinguishes check-digit validation; C additionally retains its validator evidence. No credit is inferred merely from a matching valid GTIN.
- F3, A: six-byte date length is recovered; its invalid-date observation is confounded by another later warning, a limitation A correctly identifies. B's isolated invalid-month case and C's date-validator pseudocode plus isolated observation establish semantics beyond length.
- E2, A: field-length failure and warning continuation are evidenced, but the unknown-AI/semantic mapping is less completely established than B/C's recovered dispatch branches. A declares its catalog assumptions.
- E4, A: input and codeword guards are recovered; the separate reduced-length warning is omitted. B/C explicitly recover all three constraints.

FULL judgements combine the reports and actual submitted algorithms with source facts, not report word matching. The implementations recover pair packing, C-before-B cost tie behavior, FNC1-inclusive weighted modulo-103 checksum, alternating widths, 13-module stop, and nibble padding. The evaluator-only symbol crosscheck confirms native addresses for cost, emitter, renderer, GS1 wrapper and reducer. C's additional date/company-prefix addresses resolve to `gs1_yymmd0` and `gs1_gcppos1`; these do not create extra rubric items.

Traceability: A has retrievable disassembly/data/observation logs and a frozen artifact identity. B's direct API JSON additionally carries the program digest, Ghidra provider and language. C exports a 325,750-byte bundle containing the target digest, Ghidra 12.1.4, 12 records and all eight Evidence IDs cited in its report. REA's incremental result is automatic normalized evidence retention/export and somewhat broader recovered detail in this run; direct Ghidra also supplies traceable evidence.

No material unsupported or contradictory conclusion was found in the reviewed bounded reports. All three explicitly qualify inferred specialized AI ranges, omitted semantic diagnostics and unrecovered edges. This is not an exhaustive claim audit or proof of complete GS1 conformance. Static code review confirms pure independent parsing/encoding with no original-executable delegation, subprocess launch, external loader or hidden-case table. Specialized AI rules and malformed-input edge behavior remain incomplete despite the 48-case tie.
