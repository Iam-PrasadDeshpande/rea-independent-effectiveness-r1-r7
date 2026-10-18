# R3 preflight disposition

MISSION=REA_CODEX_JOPLIN_SEMANTIC_SEARCH_R3
EXECUTION_AUTHORITY=Owner-submitted T3 mission; 250-action ceiling; three investigator sessions authorized conditionally on mission gates. No authority was inherited from R2.
ACTIONS_USED=30 provider actions including final verification; see evidence/action-ledger.json. Orchestration wrappers and individual HTTP requests inside a provider action are excluded by the declared counting convention.
ACTIONS_REMAINING=220; no budget transfers to or from R2.
JOPLIN_COMMIT=e41516e669efb693b009bedb21f3eb1fcbea4fc9
JOPLIN_RELEASE=v3.7.21
REA_COMMIT=742b6f587f3c4ef1b8212e7376d6f3a305b194dc; package metadata reads version 6.5.0.
ARTIFACT_SHA256=Published GitHub release-asset SHA-256 for Joplin-Setup-3.7.21.exe: 4222536c69360a30a566627b35c2e1cd8d38d0c79735ebde4e39edbcddd750cd. This is an expected digest, not verified downloaded bytes. See artifact-attempt.json for terminal download status.
ARTIFACT_COMPLEXITY=UNKNOWN. Published installer size is 361008040 bytes. Installer size is not app.asar complexity. No minification or analysis-coverage claim is made.
REA_ELECTRON_ANALYSIS=SOURCE_CONFIRMED_CAPABILITY_ONLY. Pinned source contains AsarArtifactReader and analyzeJavaScriptApplication, explicitly described as static JavaScript/Electron analysis. No successful MCP invocation on Joplin occurred; packaged-target compatibility remains UNVERIFIED.
ORACLE_STATUS=DRAFT_NOT_FROZEN. Forty upstream scenario descriptions extracted with source lines; no mission behavioral harness executed. Partial evaluator reference and draft rubric preserved separately.
BLIND_ISOLATION=BLOCKED_NOT_BLIND. Evaluator source is readable in the shared workspace, outbound GitHub access works, and no per-arm filesystem/network controls are configured. Windows Sandbox executable was not found on Windows 11 Home. Separate folders and fresh subagent prompts would not enforce the required isolation.
ARM_A_RESULT=NOT_STARTED_STOP_CONDITION
ARM_B_RESULT=NOT_STARTED_STOP_CONDITION
ARM_C_RESULT=NOT_STARTED_STOP_CONDITION
BEHAVIORAL_VALIDATION=NOT_RUN; no reconstructed components or pass-rate denominator.
SEMANTIC_MODEL_VALIDATION=NOT_RUN; no model provisioning, inference, cloud provider, or semantic accuracy result.
REA_INCREMENTAL_VALUE=UNDETERMINED; no matched arms, so A/B, B/C, and A/C comparisons are unavailable.
TOKEN_AND_LATENCY_MEASUREMENTS=Investigator token counts, cached tokens, wall time, and tool overhead unavailable because no arms ran. No numeric values were invented. Preflight host process/memory snapshots exist; cumulative CPU seconds are not sampled utilization and cannot establish R2 contention or clean performance.
SIGNING_STATUS=POWERSHELL_PROBE_PASS. Existing AI-SAP Local Code Signing certificate A98A2B0353CB7C086BEEC23A36FC4095DFB37844 signed a custom probe with SHA-256; signature readback was Valid; execution returned R3_SIGNING_PROBE_OK. No keys created/exported. REA/custom JavaScript signing approval is NOT_ESTABLISHED; the PowerShell signature cannot cover arbitrary Node-loaded scripts. Installer signature remains unverified without a complete artifact.
SECURITY_FINDINGS=Mandatory blind isolation absent; no independently approved signing/verification method established for non-PowerShell executable scripts. No Joplin application, REA code, installer, or model was executed. No user notes, credentials, or actual Joplin profile were accessed. No global MCP/configuration changes, deployments, publication, or destructive operations. R1/R2 files and authorization state were not changed.
LIMITATIONS=Preflight readback only; source/build/binary reproducibility relationship not proven; partial reference coverage; no asset signature, extracted archive, measured minification, analysis coverage, validated oracle, investigator outputs, reconstruction, behavioral score, or model quality result. One target would in any case support only a bounded matched-experiment claim.
BLOCKERS=Incomplete artifact verification; enforced blind filesystem/network isolation unavailable in this session; approved signing/verification method for executable JavaScript not established.
FINAL_DISPOSITION=HOLD_PREFLIGHT; dependent execution stopped under the mission's explicit stop conditions. This is neither evidence that REA improves Codex nor evidence that it fails to improve Codex.
NEXT_ACTION=Resume in an approved isolated Windows environment with enforced per-arm mounts and outbound-source restrictions, an independently approved JavaScript signing/verification method, and a fully downloaded hash/signature-verified installer. Then measure packaged coverage, complete/freeze oracle, and launch three fresh matched investigator sessions. Provisioning or relaxing those boundaries requires an explicit owner decision; no such action was taken here.

## Evidence and files

- MISSION.txt: submitted authority and constraints.
- evidence/joplin-release.json, joplin-tag.json: official release metadata, asset list/digests, exact source tag resolution.
- evidence/rea-commit.json, rea-package-api.json: requested REA pin and Node engine requirements.
- evidence/source-files-manifest.json: 18 source files checked against pinned Git blob IDs, all matched.
- evidence/environment.json, resources-end.json: OS, certificate metadata, policies, tools, and host process/memory snapshots. These contain no private key material or process command lines.
- evidence/signing-probe.json, R3-SigningProbe.ps1: signature verification and successful bounded probe execution.
- evidence/isolation.json: failed isolation prerequisites; no investigators launched.
- evaluator/: source trees and selected source files, forty candidate scenarios, and explicit non-frozen oracle status. This directory is not a blind package.
- reports/REFERENCE_ARCHITECTURE.md: source-derived findings, source/documentation discrepancy, draft rubric, gaps.

All created or changed files belong to R3. The interrupted download attempts and data-fetch recovery are setup overhead, not investigator timing.

## Reference and artifact relationship

The official release tag resolves to the recorded source commit, and GitHub release metadata associates the named installer with that release. This establishes publication association, not a reproducible-build or byte-equivalence proof. The tagged source contains semantic search. The actual Windows installer contents remain unverified; app.asar extraction and packed/unpacked resources were not inspected. No executable extractor was installed or run after the signing/isolation stop conditions.

## License inventory

The pinned Joplin LICENSE declares AGPL-3.0-or-later except where a directory-local license applies. It separately identifies trademark and logo/icon restrictions. The pinned REA LICENSE is MIT and retains its copyright/license-notice condition. These license texts are retained verbatim as reference files. Bundled third-party notices and artifact-specific terms have not been inventoried because the installer was not extracted. No redistribution or publication occurred. This is a license inventory, not a legal clearance for redistribution.

## Runtime prerequisites

REA package metadata requires Node ^22.19.0 or ^24.11.0 or >=26.0.0. Observed Node v24.18.0 satisfies the declared major/minimum range. Dependencies, build and MCP launch were not executed, so runtime readiness is unproven. Source evidence confirms static Electron/JavaScript and ASAR support but does not prove this artifact is supported.

The Joplin local embedding path requires ONNX runtime, tokenizer assets, multilingual-e5-small model files, and native sqlite-vec support. Model acquisition is a distinct provisioning step; none was attempted. Deterministic test providers and model-quality evaluation must remain separate.

## Benchmark review

HYPOTHESIS: REA improves reconstruction relative to conventional tools on identical packaged Joplin bytes.
DECISION_BOUNDARY: A successful comparison requires matching model/configuration, bytes, budget, isolation, frozen scoring, and executed reconstructed components.
BASELINES: A standard inspection; B extraction/conventional static tools; C REA static MCP tools.
WORKLOAD: Candidate SearchService search reconstruction and forty source-derived candidate scenarios, pending artifact compatibility and fixture validation.
CONTROL_VARIABLES: Not frozen; no runs began.
METRICS: Architecture recovery, functional success, evidence precision, unknown coverage, unsupported conclusions, tokens/cache, wall time, setup/recovery cost, resources, reproducibility.
FAILED_RUNS: Zero investigator runs. Two bounded artifact acquisition attempts failed or were interrupted before verification; a slow raw-source acquisition was interrupted and recovered through GitHub contents API.
RESULTS: Preflight HOLD only.
UNCERTAINTY: Incremental tool value and packaged analysis coverage are unknown.
COST_PER_SUCCESSFUL_OUTCOME: Undefined; zero successful investigator outcomes.
EXTERNAL_VALIDITY: No effectiveness result. A future single matched experiment cannot support general effectiveness claims.
SUPPORTED_CLAIMS: Exact source pins; observed reference structure; source-file hash matches; signed PowerShell probe success; unmet isolation and JavaScript execution gates.
UNSUPPORTED_CLAIMS: Complete mission, frozen/executed oracle, verified installer, working REA-on-Joplin, semantic model accuracy, performance improvement, or generalized REA effectiveness.
NEXT_EXPERIMENT: Complete prerequisites and freeze protocol before fresh independent arms.

## Review

Benchmark-review and Output Reviewer were applied in this session. Core, decision/context, runtime/source, and learning/fidelity references were read. Final disposition is HOLD because missing execution evidence cannot support the intended effectiveness claim. No independent reviewer agent or evaluator session was launched.

