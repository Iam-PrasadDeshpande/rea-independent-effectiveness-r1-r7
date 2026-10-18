# R6 — Excalidraw independent effectiveness evaluation

Independent replay is complete: all108 submitted-arm cases were evaluated. Final comparative disposition: INVALID_COMPARISON. REA capability is verified, but a clean effectiveness comparison is not qualified because C did not complete its reports, required transport recovery, and its recovery timer had a timezone defect. The observed behavioral results remain valid bounded observations. Scope is R6 only; R5 and R7 were not executed.

## Reference and frozen method

The target is Excalidraw v0.18.1, commit `a2ec2889babf7d2295469c6d90ebe77fae57df84`, built locally in production mode from the pinned source and original dependency lock. It is not a claim about bytes served by excalidraw.com. The artifact manifest identifies 379 files with SHA-256 `8ba97225cb7bc1f99c7cab476a44d732bf2054b6daceb7b27409d9b199138c91`. Source maps were withheld. Original MIT and vendor notices are retained; the license review covers private evaluation, not redistribution clearance.

Two independent final reference replays produced 36 matching normalized observations with no harness errors. The 403-input manifest was frozen at 2026-10-18T04:04:24.3786621Z before any investigator began. It includes the cases, expected observations, instructions, 30-fact architecture rubric and executable controllers. No hidden test is relaxed in response to a submission.

The behavioral scenarios cover drawing primitives, text, movement, deletion, duplication, grouping, undo/redo branches, localStorage reload and malformed storage recovery, dropped-file imports, and real JSON/SVG/PNG downloads. Normalization removes predeclared generated IDs, revisions and timing while preserving the declared semantic projection. SVG checks establish structural validity and drawing nodes. PNG checks establish a decoded, nonempty image; neither proves pixel equivalence or complete export fidelity. Native OS picker dialogs, collaboration, image attachments, complex bindings, font fidelity and complete application behavior remain outside qualification.

## Matched investigation and containment

Three fresh Codex data-only sessions use gpt-6.1-sol with low effort, a 25-action limit and a 1,800-second limit each, in A/B/C order. A receives common browser and packaged-asset inspection; B additionally receives direct CDP and Babel AST queries; C additionally receives actual REA browser/static tools. Common browser tools and asset access remain available to all three. No arm receives the original source, source maps, oracle, peer outputs or evaluator conclusions. Prior model knowledge cannot be excluded.

The signed controller dispatches only structured data actions. Built-in shell, web, plugins, memories and agent tools are disabled in investigator sessions. Separate browser profiles run in bubblewrap filesystem, network and process namespaces. Each has a read-only artifact, private scratch/output directories, loopback access and no external network. Actual isolation probes deny source, evaluator, host and peer paths, reject artifact writes with EROFS and outside network access with ENETUNREACH. Controller tests additionally reject traversal and nested batch escapes. Model-provider communication remains necessary outside the investigative browser namespace.

Custom PowerShell and JavaScript are Authenticode-signed with the existing approved identity and verified before execution. Signatures establish code identity and authorization; they do not establish functional correctness. Vendor provenance and hashes are recorded separately. Submitted JavaScript is signed by the controller; submitted applications use external scripts rather than unsigned inline executable HTML.

## Evidence and interpretation policy

Each arm's submission is sealed before evaluator testing. The evaluator cannot repair its software or expose hidden results to investigators. Architecture findings are graded separately as FULL, PARTIAL, INCORRECT, UNKNOWN or NOT_OBSERVABLE against 30 frozen source-grounded facts. A clone's design is not evidence of the target's architecture. Retained evidence traceability is assessed separately from factual correctness.

REA capability requires a successful real invocation, not tool visibility. The preflight inspected the real application and retained `ev_309f6a61733bc47c01a2c620946bd543a7811a26dd1b6eeb13e2c0660c5e79b9`: 11 captured scripts, 501,560 AST nodes, zero parse failures. REA itself reported unavailable artifact identity; the external artifact manifest supplies that mapping. Captured-script completeness is not whole-application completeness. The direct preflight also exercised CDP and the same installed Babel parser on real target code.

One sequential run per arm cannot establish causal performance improvement, general superiority, cost savings or production readiness. Cache/order effects, prior model knowledge, differences in tool output volume and unmeasured contention remain confounds. Actual investigator time and tokens must be separated from setup/recovery. Cached tokens are a subset of input tokens. Monetary cost, peak memory and unavailable setup token measurements remain UNKNOWN.

## Results and final disposition

| Arm | Frozen cases matched | Reconstruction result | Architecture FULL / PARTIAL / INCORRECT / UNKNOWN / NOT_OBSERVABLE |
|---|---:|---|---|
| A: ordinary browser/assets | 3/36 | FAILED: signed JavaScript contains a syntax error; three empty-scene stability cases match | 1 / 13 / 0 / 16 / 0 |
| B: direct tools available | 30/36 | Working bounded app with six mismatches | 6 / 11 / 0 / 13 / 0 |
| C: REA assisted | 27/36 | Working partial app; missing final reports and tested export UI paths | 0 / 0 / 0 / 30 / 0 |

These are matches within the frozen semantic projection, not complete-application correctness. No reconstruction is fully equivalent. A's three matches do not establish a working drawing application. B differs on cases06 line,08 free draw,09 ASCII text,10 Unicode/multiline text,21 grouping and22 ungrouping. C differs on08,09,10,21,22 and export cases30-33. C's four export cases time out on the required JSON/image export controls; that does not prove that no other untested export path exists. Detailed expected/actual observations are retained unchanged in evidence/arm-A-behavior.json, arm-B-behavior.json and arm-C-behavior.json. Null error fields on a mismatch mean a semantic difference, not a test pass.

Architecture grading is independently recorded in ARCHITECTURE_ASSESSMENT.md and evidence/architecture-assessment.json. B recovered more persistence internals and rendering separation than A. C has no final architecture or investigation report; UNKNOWN records missing evidence rather than architectural incapability. The grader read no behavioral results and used two filesystem tool invocations. Trace locations and selected markers were checked; exhaustive semantic rereading of every cited response was not performed. Zero INCORRECT ratings is limited to the assessed report claims.

### Actual tools, versions and evidence

Runtime versions: WSL Ubuntu26.04 x86-64; Node22.22.1; Yarn1.22.22; Playwright1.58.2; Chromium145.0.7632.6 revision1208; Babel parser8.0.4; Codex CLI0.160.0; model gpt-6.1-sol/low. The browser package used ubuntu24.04-x64 platform override and private extracted runtime libraries. Package/binary hashes are retained in evidence/toolchain-frozen.json. REA6.5.0 uses read-only vendor runtime from the earlier R2 tool installation, source commit742b6f587f3c4ef1b8212e7376d6f3a305b194dc; R2 results were not supplied to investigators or rescored. Published runtime bytes and source checkout are identified separately in evidence/rea-runtime-identity.json; source/package equivalence is not asserted.

A used common browser/assets. B actually used direct CDP; its trace contains no direct AST invocation, although that tool was available. C actually called REA list/inspect operations as well as common browser/assets. Identifiers retained in C traces include ev_86b7048fc445339e5da6a2e800734f4aa631ed7176c263fa40c7ea2601947c51 and ev_b4efe5c85c9c6d237e5083b2476d9f228e26d130a811789c252088fb95aceda2. A raw retained result is not proof that every captured script reached model context. The evaluator's separate successful analyze_web_bundle preflight must not be attributed to the blind C investigator. All arms have retained controller logs; REA's structured evidence identifiers are an additional evidence feature, not exclusive trace retention.

### Time, tokens and resources

| Arm | Dispatched actions | Investigator elapsed, including C recovery | Input tokens | Cached input subset | Output tokens |
|---|---:|---:|---:|---:|---:|
| A | 23 | 730.918s | 2,839,122 | 2,663,552 | 32,977 |
| B | 24 | 852.433s | 2,733,201 | 2,412,032 | 37,758 |
| C | 21 | 1,117.265s | 748,720 | 683,392 | 9,298 |

The original arm result files incorrectly summed cumulative turn.completed usage. Corrected totals come from the last total_token_usage in each actual Codex session, verified against the session records. Cached input is included in input, not added again. Raw records remain retained; evidence/corrected-investigator-metrics.json supersedes their aggregates. C's lower totals belong to an interrupted/incomplete investigation and establish no efficiency advantage. Dollar cost, whole-mission/setup model tokens and peak RSS were not measured and remain UNKNOWN. Before/after load observations and available-memory snapshots are in raw arm result files; they do not establish lack of contention or peak consumption. Model elapsed times exclude the separate behavioral replay and most preparation.

### Recovery overhead and qualification limits

Preparation resolved a Yarn acquisition DNS issue, an esbuild invocation attempted before linking completed, missing private browser runtime libraries, signing-path mistakes caught by the signature gate, toolbar click geometry, native picker feature detection and a comparator function-name collision. All failed attempts and build/install logs are retained. Original dependency versions were not silently upgraded. Native picker delivery remained unqualified; before freezing, the final oracle switched to synthetic File/DataTransfer events through the real target canvas drop handler. The two final reference replays then agreed36/36. The preparatory attempts are not investigator scores. Aggregate setup duration is not reliably comparable across pause/resume, retries and overlapping preparation; per-operation result/log timestamps are the evidence and no single setup-cost figure is invented.

C's first inspect result was4,055,592 characters, exceeding the provider's1,048,576-character input limit. Its full raw evidence remains retained, but that response was undeliverable. Recovery used the same investigator thread with the first three actions still consumed, the original clock origin and unchanged permitted tool catalog. The investigator received delivery-error feedback and requested smaller output. New recovery scripts were separately signed; the403 frozen inputs were not changed. The abandoned first C result/manifest and interrupted first A replay remain preserved. All final behavioral replays used fresh instances after investigators ended, with no submission repair or hidden-test change.

The recovery elapsed-time expression mixed a UTC clock with a locally converted DateTime and emitted a negative duration. This was an orchestration defect. Actual UTC start/end establish1,117.265 seconds, below the stated1,800-second ceiling, but the faulty guard means matched time-limit enforcement was not proved. The raw negative value is retained and corrected metrics explicitly flag it. A later provider/controller exit1 ended C before its reports were written; the exact later cause must be read from retained turn/failure records rather than inferred from the earlier size failure. No further investigator retry or post-submission patch was performed.

The missing C report, asymmetric recovery and timer defect prevent a clean three-arm effectiveness qualification. These limitations do not erase its27 matched behavioral cases or the actual REA capability evidence. They also do not support a causal claim that REA is worse, better or cheaper. This experiment has one sequential run per arm, no balanced repetitions and no basis for generalization.

### Integrity, security and closure

Final readback found0 drift across403 frozen inputs and unchanged hashes for all10 sealed submission files. All15 audited custom scripts/submission JS files had Valid Authenticode signatures from the pinned approved signer. Signature validity is independent of A's syntax failure. Original license notices and the1,318-package license inventory remain retained; three UNKNOWN package metadata entries are first-party workspaces/examples. This is private evaluation provenance, not redistribution clearance.

Actual namespace and controller probes establish the documented filesystem/network boundaries for the tested instances. No credential extraction, global Codex/MCP change, publication, deployment, release, R5/R7 execution or modification/rescoring of R1-R4 evidence was authorized or performed. No frozen output was patched to improve a score. Final evidence integrity and runtime cleanup readback are in evidence/final-closure.json and evidence/final-evidence-manifest.json. The report/publication briefing received a manual evidence/authority/voice review; this is not an independent automated certification.

### Final execution record

MISSION=REA_CODEX_R6_EXCALIDRAW_ONLY
EXECUTION_AUTHORITY=Current-task T3,250-action owner authorization; no next gate
R5_STATUS=EXCLUDED_BY_OWNER
R6_STATUS=108_OF_108_BEHAVIORAL_CASES_EVALUATED;REPORTS_CLOSED
R6_REFERENCE=PINNED_LOCAL_PRODUCTION_BUILD;PAIRED_REFERENCE36_OF36_STABLE
R6_ARM_A=3_OF36;NONWORKING_SYNTAX_ERROR
R6_ARM_B=30_OF36;BOUNDED_WORKING_WITH_GAPS
R6_ARM_C=27_OF36;PARTIAL_WORKING;REPORTS_MISSING;TRANSPORT_RECOVERY
R6_FUNCTIONAL_EQUIVALENCE=NOT_ESTABLISHED_FOR_ANY_ARM
R6_REA_INCREMENTAL_VALUE=REAL_BROWSER_EVIDENCE_CAPABILITY_VERIFIED;FUNCTIONAL_ADVANTAGE_NOT_DEMONSTRATED
R7_STATUS=EXCLUDED_BY_OWNER
EVIDENCE_QUALITY=RETAINED_RAW_AND_FROZEN;C_REPORT_AND_CONTROL_LIMITATIONS_EXPLICIT
SIGNING_STATUS=VALID_FOR_ALL15_AUDITED_FILES
FINAL_DISPOSITION=INVALID_COMPARISON
NEXT_ACTION=STOP;NO_NEXT_GATE_AUTHORIZED

The comparative verdict is closed as invalid; it is not an unresolved runtime blocker awaiting owner troubleshooting. Any repaired protocol/repeated experiment would require a separately authorized gate. No further execution is started. Publication content is prepared only in PUBLICATION_BRIEFING.md.

TOTAL_ACTIONS_USED=250
TOTAL_ACTIONS_REMAINING=0
Accounting:158 root tool invocations,22 preparation-agent invocations,2 architecture-agent invocations,68 dispatched investigator actions. Deterministic commands and periodic readback inside a root orchestration call are not additional model-dispatched actions.
