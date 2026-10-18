# REA/Joplin R3 evidence closure

Status: PARTIAL; E2E acceptance NOT MET. REA incremental effectiveness UNKNOWN. No E2E PASS is declared.

The verified ordinary-tool control reconstructed the bounded shared semantic-retrieval routine and passed all 40 frozen deterministic cases. The assisted arms did not qualify: C had no successful REA analysis and supplied an explicit throwing placeholder; B's final write was rejected by MXC and supplied no component/report/evidence. Their 0/40 scores implement the frozen missing/invalid-component rule; they do not measure the intrinsic effectiveness of either analysis tool. A/B, B/C and A/C causal comparisons are INVALID for effectiveness claims. This mission has produced a verified control and reproducible harness/compatibility failures, not a completed effectiveness proof.

## Identity and provenance

Joplin v3.7.21 source: e41516e669efb693b009bedb21f3eb1fcbea4fc9. Official installer: Joplin-Setup-3.7.21.exe, 361008040 bytes, SHA256 4222536c69360a30a566627b35c2e1cd8d38d0c79735ebde4e39edbcddd750cd. GitHub digest matched and Joplin Authenticode signature was Valid. See evidence/artifact-verification.json.

Original app.asar: 233695713 bytes, SHA256 9f793336c679ea3214542587ca42abc77e82184327e3f7677f22d47d8ae23506. Inventory: 6328 entries, 2530 JavaScript files, 99230874 JavaScript bytes, 1693 maps and 838 TypeScript files. Complexity was measured rather than presumed minified. See artifact-inventory/.

Identical blind input for every arm: blind-prep-v2/input/app.asar, 173428939 bytes, SHA256 c9baebd9f6fe445cc267ea15e23bf87a7e8f9bdae3d461d7ae1847a7479d87f3. Sanitization excluded 2602 source/map/documentation entries, rewrote 858 JavaScript files to remove sourcemap comments including embedded eval strings, and had zero parser failures. Original archive was retained. Static structural validation is not proof of full runtime equivalence after sanitization. All three before/after hashes match; input is readonly. See blind-prep-v2/sanitization.json.

REA runtime 6.5.0 is the verified official npm publication associated with commit 3b79af28e80785afce9f5998d8f03289402a1847, rather than preferred later source 742b6f587f3c4ef1b8212e7376d6f3a305b194dc. Both identities are retained and this deviation was declared before investigators. Registry integrity and both ECDSA signatures were verified; saved Sigstore/SLSA material is not a fully validated attestation chain. See evidence/experiment-baseline.json and rea-npm-registry-signatures.json. Dependencies were installed locally with lifecycle scripts disabled; no global configuration changed. Joplin/REA licensing evidence is retained with downloaded material; no redistribution or independent legal-clearance claim is made.

## Frozen behavioral validation

protocol/freeze.json pins the rubric, objective, 40 deterministic cases, original-reference outputs and blind archive before investigator reasoning. Unsupported gpt-5.5 startup was rejected without investigation, retained under arms/A-startup-rejected. Before any successful investigator reasoning the common configuration was amended to account-supported gpt-6.1-sol, medium reasoning, eight action caps and 720-second maximum wall allocation; the freeze records this amendment. An argument-only failed startup is separately retained.

The evaluator executed the pinned original SearchService.search with TypeScript erased and imported dependencies mocked; search logic was not rewritten. Its expected outputs were frozen before arms began. Every submitted component was copied unchanged and catalog-signed before execution under MXC. Evaluation compares exact JSON results/errors AND dependency-call traces, ignoring object-key ordering. No hidden feedback or post-test candidate repair was supplied.

| Arm | Facility assigned | Behavioral result | Actual submitted artifact |
|---|---|---:|---|
| A | ordinary local inspection | 40/40 | executable reconstructed search |
| C | REA static MCP plus ordinary inspection | 0/40 | explicit unimplemented diagnostic |
| B | conventional ASAR/Babel MCP plus ordinary inspection | 0/40 | absent after rejected final write |

Canonical results: evaluation-output/final/behavior-results.json. Evaluation code, candidate hashes, signed catalog and launch configuration are retained in evaluation-code/, evaluation-output/candidate-freeze.json, setup/final-evaluation.* and setup/final-evaluation-gate.ps1. Missing B.mjs is intentional evidence, not silently excluded. No full application/UI, real SQLite extension, indexer integration, real embedding model or model-quality run is claimed.

## Architecture and evidence quality

A's report recovers provider registration, model/dimension/prefixes, CPU/tokenization/pooling, indexer timing and cursor behavior, persistence, model-change rebuilds, scoped search, scoring/aggregation and failure limits, with packaged-entry offsets. C explicitly leaves most architecture unknown and labels unattributed fragments. B has no submitted report; its proposed write remains only in the raw transcript.

The independent architecture reviewer was limited to one final read. That command had a path-construction error and did not read A/C reports; it also used a missing reference path. Consequently A/C independent architecture scores and evidence precision are NOT AVAILABLE. B's absent deliverables receive 0/30 under the rubric. No invented citation denominator or unsupported architecture PASS is supplied. This unfinished adjudication is an acceptance gap, not evidence of low architecture accuracy. The reviewer had independently accepted the signing mechanism earlier; that technical security review is distinct from this incomplete architecture review.

## Actual operations and costs

Arms ran sequentially A,C,B. The CLI recorded:

| Arm | Wall seconds | Recorded tool items | Input tokens | Cached input | Output tokens | Peak CLI bytes |
|---|---:|---:|---:|---:|---:|---:|
| A | 146.497 | 8 | 249996 | 182400 | 8041 | 289804288 |
| C | 105.572 | 7 | 122890 | 98432 | 5075 | 290406400 |
| B | 183.492 | 8 | 200066 | 160640 | 8170 | 293224448 |

Total recorded investigator input 572952 tokens, cached input 441472, output 21286; cached tokens are included in input, not added again. C self-reports eight facility operations while the event monitor records seven tool items; wrappers/nested operations have different boundaries. These are recorded CLI metrics, not billing records. Monetary cost and complete orchestrator/reviewer token cost are UNKNOWN. Root tool/provider accounting is separately saved. Waiting/routing wrappers are excluded from provider-action totals and disclosed; no other mission budget is reused.

Resources were sampled every five seconds for CLI working set/CPU and host free RAM. This is not complete process-family memory/CPU, a causal contention measurement or proof that other machine workloads were absent. Sequential arms avoid mutual arm contention, but single order, setup differences, failed calls and unknown host contention preclude clean speedup claims. Setup and recovery overhead materially exceeded investigator runtime. See each arms/*/measurement/ directory and mcp-*-startup/probe receipts.

## Recovery and authority record

1. Official artifact download and extraction were recovered; release digest, publisher signature and original ASAR identity verified.
2. Existing approved signing identity was used; none created/replaced/exported. Owner approved the catalog method. Complete code catalog, signer/hash checks, readonly ACLs, file locks and process-job lifetime controls were implemented and independently reviewed. Nine catalog-negative fixtures and five isolation fixtures passed; forced and normal lifecycle cleanup passed. ReadRoots also permit module loading: only static parsing of target data was intended and no application/model execution occurred.
3. REA snapshot initially surfaced as malformed ASAR. A signed stage probe proved MXC replaces TEMP with its container temp, which Node's narrow write permission denied. Signed bootstrap resets TEMP/TMP to declared writable cwd. Subsequent requests passed snapshot creation.
4. REA Windows controls required native-addon loading; enabling catalog-covered addons advanced the failure to its native self-test. That self-test cannot open C:\ under the default-deny MXC policy (Win32 5). Direct preflight C6 retains exact failure. Root-drive access was not broadened.
5. Conventional MCP successfully listed the sanitized archive in direct preflight; REA advertised 207 tools but never completed required static application analysis. In the actual blind CLI sessions the configured MCP tools were not exposed; investigation of that registration failure remains incomplete. Successful discovery/startup is not counted as analysis success.
6. B's final text write was rejected by the launcher: pwsh before 7.7 requires readonly root-drive access to start under this MXC policy. The documented compliant recovery candidate is a scoped trusted PowerShell 7.7+ runtime, not weakening isolation. Its proposed component/report text is retained in events.jsonl, but was not replayed or altered after hidden evaluation.
7. Independent architecture adjudication encountered a path error at its one-read cap. No successful review was fabricated.

No R1/R2 mutation, production/SAP operation, publication, merge, signing-identity replacement or user-note access was authorized or performed. Only R3 artifacts were modified.

## Remaining mandatory gates

BLOCKED: REA static-analysis compatibility under the required isolation; actual MCP exposure in blind sessions; valid conventional arm deliverables; independent architecture/citation adjudication. The optional synthetic model corpus is provided separately, with model quality NOT_RUN.

The original 250-action ceiling is the authorization boundary for additional repair/reruns. Routine failures remain engineering-owned. A renewed bounded budget of 40 actions for CURRENT_MISSION_ONLY would cover scoped launcher/MCP diagnosis, permitted compatibility recovery, fresh blinded B/C reruns against the unchanged freeze, and independent adjudication/closure. No request to bypass signing/isolation or reveal hidden oracle material is made. Whether REA can satisfy the current native isolation contract remains uncertain; failure must remain explicit if compliant recovery is unavailable.

Reproduction: inspect the pinned manifests and signature receipts; execute the existing signed final-evaluation-gate.ps1 under AllSigned to reproduce current 40/0/0 results. The gate verifies catalog/signatures/hashes/ACLs before launching the pinned Node runtime under MXC. Replaying current evaluation does not repair or validate the failed treatment arms.
