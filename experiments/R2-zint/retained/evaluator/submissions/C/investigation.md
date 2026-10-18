Delivered /output/solution.cpp and compiled /output/solution successfully with C++17. Native observations are exported to /output/native-evidence.json. This is an independent, bounded reconstruction; it neither invokes nor loads the original binary. Investigation used 28 dispatched actions.

Architecture and evidence

Target: stripped x86-64 ELF, SHA-256 08af4075a1fd8b2fff65967435512582afbb52f2daf4a7971f025a888eff7ad4. Embedded CLI strings identify Zint and GS1_128. Addresses below are Ghidra analysis addresses; objdump observations use ELF addresses, which were 0x100000 lower in the inspected tables.

The recovered pipeline is input preprocessing → GS1 syntax/field validation and reduction → minimum-cost Code 128 selection → codewords → weighted checksum and stop → alternating bar/space expansion → hexadecimal module dump.

1. GS1 reduction: FUN_001a2220 at 0x1a2220, evidence ev_b967d87def087842d85c27385afc89cec88132974d4d28c846545971060575af. Input-mode flags reside at symbol offset 0x1e0; bit 0x10 selects parentheses. The function rejects extended ASCII, NUL, controls and DEL, checks bracket nesting/matching and numeric AI widths of two through four digits, then constructs parallel arrays of AI values, input positions, field starts and lengths. Empty fields fail. Delimiters are removed, while AI digits and field bytes remain. Between fields it inserts internal byte 0x1D unless the preceding AI's first two digits belong to the predefined-length mask 0x21f809ff81f. This separator classification is distinct from an AI merely having a fixed validation length. Escaped parentheses receive temporary low-byte sentinels, restored after parsing.

2. AI dispatch: FUN_001a0280 at 0x1a0280, evidence ev_18267c352d4fa310d9d66af1017370f60f0a7b150ebc596787dc2a160e00a53c. This is a compiled numeric dispatch tree, with reusable numeric, character-set, date, check-digit, country/currency and specialized validators. Directly recovered examples: AI 00 requires 18 bytes; 01–03 require 14; 10/21/22 allow 1–20; 11/12/13/15/16/17 require six; 20 requires two; 30/37 allow 1–8; 90 allows 1–30; 91–99 allow 1–90. Unknown AI and ordinary length failures become library error 6. Semantic failures generally become warning 4 and still encode the supplied data. The CLI warning exit differs from the library result: observed warnings exit 0.

The CSET 82 classification table is referenced at 0x1f2e40; objdump action 16 inspected ELF address 0xf2e40. Date validator 0x19bc40 permits day 00, checks month and month-specific day limits, including leap years (evidence ev_05f8f5c54399315e7b7e4cf090be175a2f36e2417dc8f7135fd1f3b349968f6e). Company-prefix helper 0x19b850 checks four initial numeric prefix characters where applicable (evidence ev_0a09085661c7d36a671c8e73b2e348d97bf2063b9b735b053811c4378eea169d).

3. GS1-128 wrapper: 0x116890, evidence ev_f0ea300189484d034be7147fe027539b1fa581619c9afbb58869b98e9a3c53da. It rejects input longer than 256 bytes, calls reduction, continues for results below 5, and invokes the Code 128 optimizer with candidate states C then B. Codeword count above 102 fails with status 5. Reduced length above 48 produces a warning while preserving modules.

4. Code-set optimizer: 0x115460 and recursive memoized cost function 0x114e40, evidence ev_c12ea220bcdb8f4061902e617af73de4b4d650ee27f67d3de710365754c69d84 and ev_03a717d0b760d86aeb787967fda62a35139fbb91f741cdf7758badd5522da620. Native storage has seven states per input position, short costs and byte decisions, supporting broader Code 128 modes. The GS1 caller restricts candidates to C and B. C consumes digit pairs; either set represents internal separators as FNC1 102. Strict-less-than updates preserve the earlier C candidate on equal cost. Start sequences contain start C 105 or start B 104 followed by FNC1 102; transitions use 99 into C and 100 into B. Start costs/codeword tables were inspected at ELF address 0xbe720 in action 15. The reconstruction implements the restricted B/C optimization directly.

5. Renderer: 0x115830, evidence ev_5f2a9badf4112719c8d859f20029f3f24f990ff72e2f7df4629402a473cb9c9f. It indexes a six-width-per-codeword literal, computes (start + sum(position × subsequent codeword)) modulo 103, appends checksum and stop 106 with widths 2331112, then calls expansion at 0x190be0. The width literal was transcribed into the reconstruction as data. Observed symbol storage uses row count at offset 0x32c, width at 0x330, and packed modules beginning at 0x414 with a 0x90-byte row stride. These layout observations do not imply a complete recovered symbol structure.

Dump formatting

Observed output starts at the first black module without quiet zones. Modules form high-bit-first hexadecimal nibbles, with a final partial nibble padded on the right with zeros. Uppercase digits are grouped into bytes, except a possible final single nibble, followed by newline. This formatting is inferred from exact matching outputs rather than a decompiled dump routine.

Validation performed

Compilation succeeded without diagnostics. Four target/reconstruction comparisons matched stdout and numeric exit exactly:

- [10]DEMO123: exit 0; D3 9E BB 22 5E EB 11 1A 2E C4 76 9C D7 7B B7 45 8C 75 8. Actions 12/21.
- (01)09506000134352(17)280101(10)PUBLIC42(21)12345678 with parentheses enabled: exit 0 and identical 134-character dump. Exercises fixed fields, variable-field separator and repeated B/C transitions. Actions 22/23.
- [10]ABC\\x31\\d050\\o063[17]281332 with escapes enabled: exit 0 and identical 72-character dump. Original warns about month 13 but emits modules. Actions 24/25.
- [17]2801: empty stdout and exit 6. Actions 18/26.

A separate original observation [17]281332 emitted D3 9E BA 73 73 49 B9 8D B3 A6 3A C with warning and exit 0 (action 17).

Implementation scope and limitations

The implementation accepts -d DATA --dump, --gs1parens and --esc, plus basic compatible argument aliases. It implements delimiter parsing, ASCII rejection, field reduction, predefined-length separator placement, B/C optimization, FNC1, checksum, stop, module expansion and dump formatting. Common AI length rules and several numeric AI families were recovered directly; many specialized AI length bounds were approximated from dispatch context and remain unverified. The source's bounds() function is the exact submitted coverage, not a claim of a complete GS1 dictionary.

Semantic warnings are intentionally omitted from stderr because diagnostics are unscored and observed warning exit is 0. Consequently dates, check digits and character-set violations generally retain their input bytes and encode, as observed. This shortcut may miss specialized validators whose structural failures are fatal or whose length failures are warnings. Some specialized variable-field sublength constraints are not implemented.

Unicode escapes above ASCII are rejected; complete Unicode preprocessing, malformed-escape precedence, literal closing-delimiter edge cases, unusual leading-zero AI spellings, empty-input CLI behavior and all length boundaries were not exhaustively recovered. Several escape forms are implemented without individual target validation. Digital Link behavior and options outside the requested interface are unsupported. No hidden corpus was accessed, and no general equivalence or completeness is claimed. Ghidra pseudocode has provider-reported terminal-flow limitations; those are retained in the evidence bundle.