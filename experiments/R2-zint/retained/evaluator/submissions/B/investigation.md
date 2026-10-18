Delivered `/output/solution.cpp` and compiled `/output/solution`. This report is the requested `/output/investigation.md` content. Investigation used 28 dispatched actions, no external sources or original-binary delegation.

Architecture and native evidence

Addresses below are Ghidra virtual addresses, not asserted file offsets. Original SHA-256: `08af4075a1fd8b2fff65967435512582afbb52f2daf4a7971f025a888eff7ad4`.

- `FUN_00116890` orchestrates GS1-128: checks input length, invokes GS1 reduction, selects codewords, checks symbol capacity, and renders modules. Native evidence: `/output/cli-011.stdout.txt`. Raw input beyond 256 bytes returns 5. More than 102 pre-checksum symbol characters returns 5. Reduced data beyond 48 characters can generate library warning 4 while retaining output.
- `FUN_001a2220` parses and validates bracketed AIs, then produces reduced data. Evidence: `/output/cli-005.stdout.txt`. Symbol input flags reside at byte offset `0x1e0`; bit `0x10` selects parentheses. Temporary parallel arrays hold AI numbers, data offsets and field lengths. Malformed, nested, nonnumeric, too-short or too-long AI delimiters are errors. AI lengths are 2–4 digits.
- The parser rejects NUL, controls, DEL and extended ASCII with status 6. Character checks appear around `001a22da`–`001a23f9`. Parenthesis literals escaped with backslash are temporarily represented by low-byte sentinels and restored after parsing.
- `FUN_001a0280` dispatches AI validation to numeric, character-set, check-digit, date, currency and other helpers. Evidence: `/output/cli-007.stdout.txt`. Validation detail codes distinguish unknown AI, invalid length and semantic issues. The caller maps unknown AI and ordinary invalid lengths to fatal 6; semantic failures generally become library warning 4 and encoding continues. Some specialized length failures can also be warnings.
- Reduction removes AI delimiters, preserves AI digits and field content, and inserts byte `0x1d` between fields when required. The decision uses the first two AI digits and mask `0x21f809ff81f`, visible near `001a2f82`. This predefined-length prefix classification is distinct from the validator's fixed/variable length rules. No trailing separator is added.
- `FUN_00114e40` performs memoized minimum-cost code-set selection. Its native tables have seven states; cost cells are shorts, indexed by input position and state, with separate byte choices. GS1 caller permits states 5 then 2, corresponding to C then B. Strictly smaller costs replace choices, so candidate order resolves ties. Evidence: `/output/cli-013.stdout.txt`; start/transition tables at `001be720` onward were inspected in `/output/cli-019.stdout.txt`.
- `FUN_00115460` emits start/latch/data codewords and FNC1=102; C consumes numeric pairs. GS1 starts include FNC1. Evidence: `/output/cli-012.stdout.txt`.
- `FUN_00115830` computes `(start + sum(position × codeword)) mod 103`, appends its width pattern and stop `2331112`. Six-run patterns for codewords 0–105 are stored at `001be880`. Evidence: `/output/cli-014.stdout.txt`. The reconstruction independently expands these recovered patterns into alternating black/white modules.

Recovered validation scope

Direct native evidence establishes these common rules: AI 00 has 18 data characters; 01–03 have 14; 10/21/22 allow 1–20; 11/12/13/15/16/17 require 6; 20 requires 2; 30/37 allow 1–8; 90 allows 1–30; 91–99 allow 1–90. Several 235–427, measurement and price families were also recovered from dispatcher branches and implemented.

The source includes additional bounded approximations for specialized shipping, healthcare and asset AIs. Those entries are not a claim of complete recovery. Unlisted AIs return 6. Semantic checks such as valid dates and check digits are omitted because the observed CLI still outputs the barcode and exits 0 for these warnings; exact diagnostics are outside scoring.

Observation cases and validation

Four target/reconstruction pairs matched exact stdout and exit 0:

| Input | Target evidence | Reconstruction evidence |
|---|---|---|
| `[10]DEMO123` | `cli-016.stdout.txt` | `cli-025.stdout.txt` |
| `[10]ABC[17]280101[21]123456` | `cli-020.stdout.txt` | `cli-026.stdout.txt` |
| `(10)PUBLIC42`, parentheses enabled | `cli-027.stdout.txt` | `cli-028.stdout.txt` |
| `[17]281332` | `cli-017.stdout.txt` | `cli-029.stdout.txt` |

The mixed-field case exercises a variable-field FNC1, fixed-field concatenation and B/C switching. The invalid-date case produces target warning 261 for month 13 but still exits 0. `[10]ABC DEF` likewise emits a CSET 82 warning and modules with exit 0 (`cli-021` logs). `[17]123` produces no stdout and exits 6 (`cli-018` logs); this reconstruction's length check implements that branch, although it was not separately executed.

Hex formatting is uppercase, left-to-right module bits, most-significant bit first within each hexadecimal digit, with zero padding to a nibble. Bytes are separated by spaces; an odd final nibble is printed alone. No quiet-zone padding is included. This interpretation is supported by all four exact comparisons, rather than a separately recovered dump formatter.

Implementation and limitations

The C++17 executable accepts `-d DATA --dump [--gs1parens] [--esc]`. It uses independent parsing, length rules, B/C dynamic programming, checksum calculation and module expansion. Compilation succeeded (`cli-024` logs); executable SHA-256 is `4E8C70B3DE0FC017AB3FAEC3B7794A47E4A7941A63FD3DE624FC28B984A85FA8`.

Coverage is incomplete. Specialized AI helper functions, their warning-length exceptions, exhaustive malformed-bracket behavior, all escape forms and their error statuses, Unicode normalization, empty-input handling, and capacity boundaries were not fully recovered or tested. Escape support is a bounded implementation and has no target comparison. Some specialized AI length entries are approximations and may differ from the original. The reconstruction suppresses warning diagnostics, preserves warning-case exit 0, and does not implement every internal library warning status. Digital Link-like handling seen in the generic parser was not reconstructed or established for this invocation.

The four successful comparisons substantiate the common encoding pipeline; they do not establish exhaustive equivalence.