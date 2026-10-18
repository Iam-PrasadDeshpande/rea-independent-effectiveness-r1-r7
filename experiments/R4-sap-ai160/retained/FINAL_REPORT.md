# REA SAP agentic PO R4: completed bounded experiment

The experiment completed with verified reference execution and three valid blinded investigation arms. **REA did not improve behavioral reconstruction in this case.** All arms reconstructed the same timestamp helper and passed 12/12 frozen cases. REA returned useful provenance and explicit uncertainty, but its selected feature trace found no seed matches. That result cannot establish feature absence.

| Arm | Explicit source facts | Helper cases | Gateway calls | Wall seconds | Uncached input tokens | Cached input tokens | Output tokens |
|---|---:|---:|---:|---:|---:|---:|---:|
| A | 14/16 | 12/12 | 12 | 111.769 | 64826 | 731904 | 3929 |
| B | 14/16 | 12/12 | 11 | 109.977 | 40892 | 695296 | 3698 |
| C | 15/16 | 12/12 | 13 | 145.33 | 53310 | 929152 | 4324 |

A is standard inventory/read/search; B additionally used three actual AST operations; C additionally used one actual REA operation comprising two MCP tool calls. All ran gpt-6.1-sol at medium effort with the same artifact bytes, objective, 18-call allowance and 15-minute limit. Counts are provider runtime counters, including repeated cached context; they are not unique source-token counts or charges. Monetary cost is UNKNOWN.

A/B each omitted the specific MessagesAnnotation name; C identified it from a direct artifact read. All omitted an explicit supplier-filter-absence finding. Conservative frozen scoring therefore yields 14/16, 14/16, 15/16. The one-fact difference is not attributable evidence of REA benefit. These are 16 bounded source-fact scores, not application correctness percentages. No unsupported material claim was identified in the bounded review; no second human grader or exhaustive proof is claimed.

A versus B: same fact/helper result, B used one fewer gateway call, 1.792 seconds less wall time, and 23,934 fewer uncached input tokens. This single observation does not demonstrate a reliable speed advantage. B versus C: same helper result, one additional explicitly reported source fact, two more calls, 35.353 seconds more wall time and 12,418 more uncached input tokens. A versus C: same helper result, one additional fact, one more call, 33.561 seconds more wall time, 11,516 fewer uncached input tokens. Token differences include cache effects and report verbosity. No statistical generalization is justified.

## Required mission record

- MISSION=REA_CODEX_SAP_AGENTIC_PO_R4 / REA_INDEPENDENT_EFFECTIVENESS
- EXECUTION_AUTHORITY=Fresh current-task T3, 250 actions, internal agents allowed; no external agents, full regression, next gate, SAP/production mutation, publication or merge.
- ACTIONS_USED=213 conservatively charged (201 observed plus 12 reserved); detailed accounting in evidence/action-budget.json.
- ACTIONS_REMAINING=37 after conservative reserve; unused authority ends with this mission.
- SAP_SOURCE_COMMIT=222db8ceaed6f4694eda0c1207bfea8777d11994
- REFERENCE_COMPLETION=Documented exercises 1-2 applied to three agent files; separate one-line UI Boolean compatibility repair. Exact patches retained.
- BUILD_STATUS=Agent/mock/UI TypeScript checks and production Vite build succeeded; reference execution bundles built. Root npm ci remains incompatible with upstream root lock; component-lock installs supplied the bounded working build. No lockfile/dependency upgrade was introduced.
- REA_COMMIT=742b6f587f3c4ef1b8212e7376d6f3a305b194dc / version 6.5.0
- REA_STATIC_ANALYSIS=Actual pinned MCP connection/catalog/analysis verified on Windows and isolated WSL. Canonical compile/catalog/runtime-bundle commands exited zero. C analysis parsed one JS file without parse failure, reported partial scope and 425 semantic unknowns; create_note trace returned no-match, zero seed matches.
- ORACLE_STATUS=38/38 reference tests passed; 12 helper expectations independently matched reference before arm scoring; freeze readback unchanged.
- ISOLATION_STATUS=Child input mounts read-only; oracle inaccessible; input write and external network negative probes denied. All actual investigator calls audited, zero out-of-protocol calls. Surrounding model host retains general tools and is not an adversarial security sandbox.
- ARM_A_RESULT=14/16 explicit frozen source facts, 12/12 reconstructed helper tests.
- ARM_B_RESULT=14/16 explicit frozen source facts, 12/12 reconstructed helper tests; three successful AST operations.
- ARM_C_RESULT=15/16 explicit frozen source facts, 12/12 reconstructed helper tests; successful actual REA invocation.
- TOOL_ROUTING_ACCURACY=All three recovered the four exact tools and conditional agent/tools loop with citations. Dynamic oracle verified supplied scripted tool sequences; production model choice quality remains untested.
- STATE_RECOVERY=All recovered message accumulation, caller thread checkpoints, UI local state and in-memory mock notes. C explicitly named MessagesAnnotation. No durable cross-process persistence demonstrated.
- WRITE_BOUNDARY_RECOVERY=All distinguished UI Send from absent backend approval, note POST from email delivery, and UI duplicate suppression from append-only mock writes. Disposable mock writes/readback verified; no SAP write.
- BEHAVIORAL_TESTS=38 reference mock/graph cases; 36 arm helper comparisons (12 each); five UI fixture checks. These overlap in subject matter and are not 79 independent whole-agent cases.
- TOKEN_AND_LATENCY=See table, arm-comparison.csv, runtime audits and final-runtime-metrics.json. All primary arms sequential with no temporal overlap; background contention unmeasured. Setup/recovery is separate from arm wall times.
- SIGNING_STATUS=Five authored PowerShell controllers/gateways Valid under the existing identity; JS and reconstructed inputs SHA256-verified by signed manifests before execution. No key created/exported, no execution-policy bypass. Tampered script rejected without execution.
- SECURITY_FINDINGS=Sample has no observed backend approval/auth ownership enforcement, binds write tool on analysis, permits duplicate mock notes, uses prompt-only ordering/filter decisions, has fragile error-cause dereference, no application retry/abort, and UI labels note creation as email success. These are local sample findings, not production SAP security assertions.
- REA_INCREMENTAL_VALUE=No observed helper-behavior gain; explicit provenance/coverage accounting demonstrated. Selected static adapter added operational overhead and did not supply successful feature tracing for the chosen seed.
- LIMITATIONS=One readable sample, one model, one primary run per arm, one small reconstructed helper; no full-agent replacement, no real model/cloud evaluation, no statistical power, no whole-host isolation, no independent second human grader, unknown billed cost, and protocol amendment/pilot disclosed below.
- BLOCKERS=None preventing the bounded local case study. Real SAP/AI Core/production and full regression were outside authorized acceptance; they were not attempted or relabeled as passed.
- FINAL_DISPOSITION=Completed bounded POC with limitations; generalized REA incremental effectiveness is NOT ESTABLISHED.
- NEXT_ACTION=Stop this mission. Any broader repeated/obfuscated/multi-component effectiveness study requires a separately authorized objective.

## Validation and evidence

The evaluator oracle used the real LangGraph loop, deterministic model fixtures, fixed clock and an ephemeral real mock Express API. A fetch guard permits loopback mock traffic only; it is instrumentation, not host airgapping. Tests cover timestamp/error inputs, OData filtering, formatter/schema behavior, note POST/readback, unknown items, duplicates, missing approval, thread reuse/isolation, graph loops and error/final-content behavior. Prompt business sequence and non-overdue exclusion are not graph enforcement. See evidence/oracle-results.json and tools/oracle.cjs.

Chrome UI verification used a fresh R4 profile and deterministic API fixtures. It verified rendering, existing-note read-only state, Cancel producing no note request, exactly one expected Send request, and successful local duplicate suppression. This does not prove a browser-to-real-model-to-SAP path. See evidence/browser-results.json and evidence/ui-verification.png. The remote SAP logo was blocked; no production browser session or credentials were used.

Each final component was independently executed in a disposable WSL namespace, no network, read-only component/cases. All 36 comparisons passed. Invalid cases compare rejection behavior rather than requiring identical error wording. The component is deliberately limited to raw timestamp calculation with injected clock; it does not reproduce the original async wrapper or Zod schema. See evidence/reconstruction-results.json.

Architecture and actual source call-flow are in REFERENCE_FINDINGS.md. Independent investigator reports and exact runtime tool audits are in results/arm-A.md, arm-B.md, arm-C.md and evidence/arm-*-runtime-audit.json. Frozen tests/rubric/objective/protocol/blind manifest remain byte-identical. Final manifests and source/signature readbacks are in evidence/final-*.json.

The investigator package contains readable built JavaScript, bundled React, styles/assets and license notices; Node dependencies remain external. Original TypeScript, docs, evaluator conclusions and hidden cases were not mounted into inspection processes. All arms saw identical bytes. Actual host call records substantiate protocol adherence; they do not prove resistance to a malicious host agent.

## Recoveries and operational overhead

1. Upstream root lock installation failed. Used existing component locks without global changes or upgrading dependency versions. Preserved failure and build receipts.
2. Original UI failed its boolean prop type check. Applied Boolean conversion in a separate one-line patch, rebuilt and verified browser behavior.
3. Node runtime mismatch was removed with an official checksum-verified portable Node 22 distribution. WSL uses its observed Node 22.22.1; Windows evaluator uses 22.23.3. This runtime difference is disclosed.
4. REA initial emit/type setup was incomplete. Installed pinned dependencies and ran the canonical TypeScript 7.0.2/catalog/bundle build successfully. Initial diagnostics retained.
5. Windows REA analysis lacked its documented native companion. Verified the official 6.5.0 package integrity, restored only the ignored native artifacts and verified the loader. No signing identity or source policy changed.
6. Direct WSL MCP entry timed out. Used the documented bundled dispatcher; qualified a successful cold run (~185.65 s), then the arm's warm REA gateway invocation (~19.50 s inside tool; ~20.32 s wrapper). Timing includes startup, two tool calls and teardown. Duplicate raw/structured MCP payloads are adapter overhead.
7. WSL staging optimization suffered metadata IO. Stopped only verified mission-owned copy/hash processes; retained unused partial staging artifacts. Final runs used qualified read-only source mounts, never the partial staging cache. IO contention was observed but its percentage impact is unknown.
8. First browser attempt timed out with missing sanitized AppData paths. Added R4-specific paths, corrected accessible selectors, used a fresh profile and bounded timeouts; all five checks then passed. Stopped only verified mission-owned Chrome/Node processes. Failed logs retained.
9. B pilot used no AST operation. Preserved it as a pilot, amended the class-use requirement, then ran a fresh B without sharing pilot findings. Pilot cost: 116.890 seconds, 793,349 runtime total tokens (727,680 cached input; 61,654 uncached input; 4,015 output), 12 gateway calls. This is a disclosed post-pilot protocol amendment, not pristine preregistration.
10. Final signing-controller single-array iteration failed before reconstruction execution. Repaired iteration, re-signed with the existing identity, refreshed evaluator-only manifest, left blind freeze untouched, and executed all helper tests successfully.

Root evaluator runtime counters (including setup, failed attempts, recovery and this session context) are retained separately in final-runtime-metrics.json. They must not be added to child counts without distinguishing the separate sessions. Exact marginal setup-only token use, host-wide contention, and monetary charges are UNKNOWN. Primary-arm wall intervals and per-tool latencies are independently observable; startup/cache/runtime differences limit causal attribution.

## Enterprise recommendation

Keep standard source inspection and AST tooling as the default for this readable sample. Treat REA as an optional static evidence/provenance layer when its explicit unknowns and coverage accounting justify setup cost. Require real successful tool invocation, inspect trace seed failures, preserve source citations, and independently validate reconstructed behavior. This case does not support making REA a mandatory reverse-engineering dependency or claiming incremental functional accuracy across applications. Retain separate read, approval, write and readback controls for an enterprise SAP implementation; this sample's UI affordances do not provide those controls.

No publication, merge, production configuration, SAP operation, key creation/export, unrelated workspace modification or follow-on gate was performed.
