# REA / Joplin R3 final disposition

The bounded three-arm experiment is complete, with all three valid investigations evaluated and all architecture/citation adjudication finished. No REA-specific effectiveness benefit was demonstrated. This is an experiment closure with limitations, not a full-application PASS.

|Arm|Selected investigation|Behavior|Architecture|Report citations supported/all|Supplemental citations supported/all|
|---|---|---:|---:|---:|---:|
|A|Original ordinary inspection, preserved|40/40|27/30|32/37|44/45|
|B|Fresh recovery6, conventional ASAR/Babel facility|40/40|11/30|19/19|22/22|
|C|Fresh recovery2, REA facility plus ordinary inspection|40/40|25/30|48/49|41/44|

Each architecture score uses all15 frozen facts, maximum30. Every enumerated report and supplemental citation was adjudicated; inexact, unsupported and ambiguous citations remain in denominators. Citation correctness is not breadth or confidence. B's supported citations accompany substantial explicitly unknown architecture. A incorrectly states clearAll drops the vector table; original code only deletes rows. Reports were not corrected after adjudication. Full per-fact and per-citation reasons: independent adjudication (retained source reference: `<evidence://R3//reports/ARCHITECTURE_FINAL_ADJUDICATION.md>`).

## Effectiveness conclusions

- A/B: no observed conventional-tool behavioral gain; B recovered less architecture under this fixed eight-request allocation. This is a descriptive result, not a general statement that conventional tools reduce effectiveness.
- B/C: both passed40/40. C scored14 architecture points higher, but its successful REA analysis covered a peripheral clipboard command. Its retrieval reconstruction cites bundle text inspected through ordinary commands. The architecture difference cannot be attributed to REA.
- A/C: behavior tied; C scored2 architecture points lower and used more recorded time and tokens. No overall accuracy or architecture gain over the ordinary control was observed.
- REA-specific capability: real inert JavaScript analysis, retained parent/summary evidence IDs, complete artifact identity and explicit partial-coverage reporting were verified. Their incremental value for reconstructing the semantic-search feature remains unproven.

C analysed commands/copyToClipboard.js:490bytes,1 parsed JavaScript file,77 AST nodes,6 findings,0 parse failures.2848 inventoried files remained outside selected analysis. Parent ev_8bfe2b0c7e747ef4823eb6cf7ec095d6d1263c66ebf7392007be2bffcfb04ef5 and summary ev_87bdbe96bd5e735964dc05a958f0ca03c6c3a61d1fb545632a5d9dc8077b4179 were independently checked against the actual successful investigator response. This proves real facility use, not analysis of the semantic-search core. Earlier core main.bundle.js analysis timed out at120seconds. See actual C invocation (retained source reference: `<evidence://R3//evidence/C2_ACTUAL_REA_INVOCATION.json>`).

## Behavioral proof and blindness

A's original40/40 receipt was preserved without rerun. New B/C components were copied byte-for-byte into a fresh evaluator package, catalog-signed and executed in a separate MXC process against the original40 frozen scenarios. The harness changed only its arm list to B,C and trailing newlines. Results/errors and dependency-call traces were compared exactly, ignoring object-key ordering. Independent verification recomputed all80 comparisons against frozen gold without trusting pass flags, checked case IDs/no duplicates, candidate hashes,5/5 catalog files, approved signatures and retained sandbox policy.

No expectations, tests, rubric or submitted candidates were changed. No test feedback or peer/evaluator/source/oracle was supplied to investigators. All selected arms used gpt-6.1-sol medium, identical sanitized archive bytes, eight recorded requests and720seconds maximum. Recovery clarified operational tool names/nested-request accounting; C also received only a preflight timeout/small-file operational warning. These interventions and differing coverage are limitations, not behavioral hints. Original order A,C,B and all invalid attempts remain evidence; final retained valid runs are original A, fresh C, fresh B. One target and one retained valid run per arm do not establish generalized or causal superiority.

New80-case results (retained source reference: `<evidence://R3//evaluation-output/matched-final/behavior-results.json>`), unchanged evaluation inputs (retained source reference: `<evidence://R3//evidence/FINAL_EVALUATION_INPUTS.json>`), independent verification (retained source reference: `<evidence://R3//evidence/INDEPENDENT_FINAL_VERIFICATION.json>`).

## Valid-arm time and tokens

|Session|Wall seconds|Recorded requests|Input tokens|Cached input included|Output tokens|
|---|---:|---:|---:|---:|---:|
|A|146.497|8|249996|182400|8041|
|B-recovery6|147.468|8|271586|234240|5346|
|C-recovery2|272.765|8|480277|386048|9583|

C took125.296seconds more than B and126.268seconds more than A. These are observed wall differences, not causal tool-overhead estimates. C overlapped B catalog-generation setup; B overlapped independent architecture review. CLI/host samples and a setup-process sample were retained; the setup process was no longer active at C exit. Full process-family memory/CPU and causal machine contention were not measured. No clean speedup claim is permitted.

Cached input is included in input and must not be added again. Actual monetary billing and complete root/reviewer token consumption are UNKNOWN. Interrupted/failed sessions with missing usage are not zero-cost. Known investigator totals and policy diagnostic usage are retained in token/latency ledger (retained source reference: `<evidence://R3//evidence/FINAL_TOKEN_LATENCY.json>`).

## Failed attempts and recovery overhead

|Session|Wall seconds|Recorded requests|Input tokens|Output tokens|Stop reason|
|---|---:|---:|---:|---:|---|
|A|146.497|8|249996|8041|COMPLETED|
|A-argument-rejected|0.048|0|UNKNOWN|UNKNOWN|COMPLETED|
|A-startup-rejected|2.75|0|UNKNOWN|UNKNOWN|COMPLETED|
|B|183.492|8|200066|8170|COMPLETED|
|B-recovery1|401.196|8|281213|6797|COMPLETED|
|B-recovery2|228.056|9|UNKNOWN|UNKNOWN|TOOL_LIMIT|
|B-recovery3|192.903|8|293969|9100|COMPLETED|
|B-recovery4|37.022|2|UNKNOWN|UNKNOWN|OWNER_REQUESTED_FREEZE|
|B-recovery5|45.288|9|UNKNOWN|UNKNOWN|TOOL_LIMIT|
|B-recovery6|147.468|8|271586|5346|COMPLETED|
|C|105.572|7|122890|5075|COMPLETED|
|C-recovery1|UNKNOWN|0|UNKNOWN|UNKNOWN||
|C-recovery2|272.765|8|480277|9583|COMPLETED|

Invalid attempts were retained and excluded from effectiveness comparisons. B original failed to write; recovery1 fell back after MCP denial and remains invalid despite40/40 behavior; recovery2 exceeded the request limit; recovery3 never invoked the assigned facility; recovery4 was owner-interrupted after a successful facility call; recovery5 exhausted its limit after an adapter path mismatch. C original had no successful REA facility and an explicit throwing placeholder; recovery1 was preflight-blocked. None is counted as successful REA reconstruction. No valid low-scoring submission was repaired or replaced after test feedback.

Recovery resolved:

1. Missing/late MCP exposure with invocation-local required startup and zero optional grace. Explicit assigned tool names prevent empty resource catalogs being misread as absence.
2. Scoped per-tool approval_mode=approve applies the owner's existing static-tool authorization while execution approval remains never. Tool annotations were not falsified; global config was unchanged.
3. Default PowerShell startup under narrow MXC: a separately verified Microsoft7.7 preview runtime is used only within R3. Global PowerShell remains unchanged.
4. REA TEMP rewriting, native root/ancestor checks and worker canonicalization: signed bootstrap plus R output/S read-only code namespaces, unchanged native checks, physical file-ID/mapping guards, immutable catalog code and kernel-owned process jobs. This is an R3-specific qualified compatibility method; upstream source treats SUBST outside its P0 support boundary.
5. Redirected MCP input consumption: namespace utilities receive their own immediately closed stdin.
6. Cleanup: locks before signature verification/load, pinned helper/inner identities, owned mappings removed while foreign mappings are preserved. Forced termination verified all8 captured owned process identities gone; unrelated T and retargeted foreign S were preserved. Synthetic fixture mappings were subsequently removed by their owning harness.
7. Conventional Windows inventory/read mismatch: fresh complete copied runtime canonicalizes inventory and input separators, preserving traversal rejection. Approved full-package signature/catalog validation passed; both leading slash forms read package.json and traversal was rejected. Original runtime/catalog remain preserved. New full-package catalog generation took several minutes; no precise stage duration is claimed. Nested-request accounting was clarified without changing the eight-request limit.

Recovery is engineering-owned and separately disclosed; it is not hidden inside a successful treatment score. It also includes static preflights, catalog/signature/isolation fixtures, rejected model/argument startups, repeated invalid investigations, independent reviews and owner pause/resume. Owner pause duration is not treated as execution latency.

## Provenance, signing and integrity

Joplin v3.7.21 source e41516e669efb693b009bedb21f3eb1fcbea4fc9; official361008040byte installer SHA2564222536c69360a30a566627b35c2e1cd8d38d0c79735ebde4e39edbcddd750cd, published digest matched and publisher signature verified. Original233695713byte ASAR SHA2569f793336c679ea3214542587ca42abc77e82184327e3f7677f22d47d8ae23506. Original inventory6328entries,2530JavaScript files/99230874bytes,1693maps,838TypeScript files; complexity was measured rather than assumed minified.

Frozen blind input173428939bytes SHA256c9baebd9f6fe445cc267ea15e23bf87a7e8f9bdae3d461d7ae1847a7479d87f3. Source/maps/documentation were sanitized before investigators; full runtime equivalence after sanitization was not proved. All arms share exactly these bytes. Original reference SearchService.search logic was executed with TypeScript erased and dependencies mocked before freezing expected outputs.

REA6.5.0 is the verified official npm publication associated with3b79af28e80785afce9f5998d8f03289402a1847, differing from preferred later source742b6f587f3c4ef1b8212e7376d6f3a305b194dc. Deviation was declared before investigation. Registry integrity/two ECDSA signatures were verified; retained attestation material is not a fully validated attestation chain. Licenses/provenance are retained; no independent legal-clearance or redistribution claim is made.

Existing approved signing identity A98A2B0353CB7C086BEEC23A36FC4095DFB37844 was used; none created/replaced/exported. Owner-approved full-code catalog signing, pinned signatures/hashes, readonly ACLs, locks, MXC root denial/no network and process-job lifetime controls remained in place. Active final evaluator signatures/catalog5/5 were independently checked. Intentional invalid negative fixtures are historical tests, not active launchers. Earlier catalog-negative/isolation/lifecycle fixtures remain retained.

Final readback matched installer, original ASAR, all5 frozen inputs, all110 source-manifest files and original A component. No remaining R/S aliases or active investigators. Integrity receipt (retained source reference: `<evidence://R3//evidence/FINAL_PINNED_INPUT_VERIFICATION.json>`) and final manifest (retained source reference: `<evidence://R3//evidence/FINAL_EVIDENCE_MANIFEST.json>`).

## Limits and closure

This proves bounded deterministic SearchService.search reconstruction and static architecture recovery. It does not prove full UI/application reconstruction, native SQLite/indexer integration, real-model inference or semantic model quality. Optional model-quality evaluation is NOT_RUN; no real notes, cloud AI provider provisioning or model download was used. Resource/billing gaps, incomplete core REA coverage, sanitized-runtime equivalence and single-run attribution limits remain explicit.

Cumulative actions:495. The previous403-action owner freeze is preserved; counters were not reset. The owner's current-mission E2E extension removed the numeric ceiling. Provider/dispatch plus recorded investigator-item convention is retained; failed/ninth attempted requests count, routing/waits excluded. Final disposition and accounting (retained source reference: `<evidence://R3//evidence/FINAL_R3_DISPOSITION.json>`) is authoritative. Historical250/290 reports and owner freeze remain evidence, superseded for current results.

Irreducible authorization blockers: NONE. No R1/R2/R4 modification, SAP/BTP/production changes, publication, merge, deployment or global configuration change was performed. Current R3 objective is closed; no background continuation or next experiment is started. Broader core-coverage or model-quality work would be a separately authorized experiment.

Reproduction uses the preserved signed setup/matched-final-evaluation-gate.ps1, which checks the fixed catalog/interpreter/code before executing existing copies against unchanged gold. No rerun is needed for this closure.

