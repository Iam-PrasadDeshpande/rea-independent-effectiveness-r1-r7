# REA/Joplin R3 — bounded recovery disposition

PARTIAL / E2E acceptance NOT MET. REA incremental value UNKNOWN. No valid three-arm effectiveness comparison exists.

## Results

| Arm | Behavioral evidence | Experimental validity | Architecture |
|---|---|---|---:|
| A original | 40/40; existing receipt reused | Preserved valid ordinary-inspection control | 22/30 |
| B recovery1 | 40/40; unchanged submission newly executed | INVALID_ASSIGNED_FACILITY: its conventional MCP invocation was denied | 16/30 |
| C | No valid REA-assisted reconstruction | BLOCKED_PREFLIGHT; no fresh investigator was launched without successful analysis | 0/30 submitted work |

A's successful work was not repeated. Its component hash and all original evidence were preserved. B's submitted component was independently catalog-signed and executed against the original40 frozen expected outputs, comparing results/errors plus dependency-call traces. All40 passed. There was no hidden-test feedback, post-oracle candidate repair, changed expectation or reduced denominator. B's behavioral parity does not convert its failed assigned-tool arm into a valid conventional-tool experiment. C's earlier placeholder failures are historical failures, not successful REA reconstruction.

The independent reviewer completed all15 frozen fact grades with conservative evidence-strength scoring, with no unadjudicated items: A22, B16, C0. Fact-level data: architecture-adjudication.json. Full report-level citation precision is NOT_COMPLETE; six selected claim/location checks were supported out of six checked, which must not be presented as exhaustive precision. C0 means no qualified submitted architecture. A/B differences are descriptive and cannot establish REA-specific incremental effectiveness.

## Recovery performed

1. Downloaded Microsoft PowerShell7.7.0-preview.5 into R3/tools only. GitHub asset SHA256 matched; Microsoft Authenticode signature Valid. Under the unchanged default-deny MXC policy it successfully wrote and read a synthetic output file. Global PowerShell/configuration were unchanged. B's fresh session used this explicit shell and produced all three deliverables.
2. Diagnosed optional MCP startup race: official OpenAI documentation specifies a1000ms default optional grace period. Invocation-local recovery config sets the assigned server required=true and mcp_optional_startup_grace_ms=0. No global Codex configuration changed. See https://developers.openai.com/codex/mcp/ .
3. The fresh B session now saw its assigned MCP tool, but its call was rejected: 'MCP tool call requires approval, but approval policy is never'. B recorded this rather than bypassing it. Its fallback standard inspection produced the tested component. Conventional tools have no readOnlyHint annotation; the three REA analysis tools declare readOnlyHint=false. Approval-policy/metadata reconciliation remains unfinished; no annotation was falsified and no required approval gate was bypassed.
4. Qualified a bounded directory-only R: alias as an additional namespace. MXC continued to deny the synthetic sentinel through native and extended paths. REA's unmodified native self-test succeeded, including NTFS/private-DACL/job-ownership checks. The independent security reviewer conditionally accepted qualification only with identical physical-directory access, identity/retarget guards, signatures, containment and cleanup. This did not establish full REA compatibility or the original upstream P0 coverage of SUBST.
5. Full REA analysis through that namespace advanced to the child worker, which failed with EPERM while lstat/realpath resolved C:\. Native controls were retained. Exact failure: evidence/mcp-C-qualified-result.json and arms/C-recovery1/measurement/result.json.
6. Added a separate read-only S: code namespace, pinned signatures/catalogs, physical file-ID and mapping checks, retarget rejection and owned process jobs. The code-alias retarget fixture failed closed as required. The subsequent full qualification timed out after300.159 seconds before MCP initialization completed; it produced no successful application-analysis receipt. Root cause of this timeout remains unresolved. See mcp-C-qualified-v2-probe.json and signed qualification gates. Do not describe it as successful REA analysis.
7. Forced timeout termination left R:/S: mappings present; the coordinator identified their exact R3 targets, removed only those mappings and verified both absent. This exposes a hard-kill cleanup gap in the wrapper. Cleanup is verified now; automatic wrapper cleanup under forced termination is not proven. The affected C namespace stage remains unqualified.
8. Preserved every original arm, failed startup, source/artifact identity and test expectation. Changed files are confined to R3. No R1/R2/R4, production, SAP/BTP, global configuration, publication, deployment or signing-identity change occurred.

## Timing, tokens and overhead

| Session | Wall seconds | Recorded tool items | Input tokens | Cached input | Output tokens | Peak CLI bytes |
|---|---:|---:|---:|---:|---:|---:|
| A original |146.497|8|249996|182400|8041|289804288|
| B original invalid |183.492|8|200066|160640|8170|293224448|
| C original invalid |105.572|7|122890|98432|5075|290406400|
| B recovery1 |401.196|8|281213|209536|6797|280944640|

Cached tokens are included in input counts. Invalid attempts and B recovery are separate costs. A/B recovery have equal behavioral pass counts, but B took longer and still failed its assigned facility; this does not measure conventional-tool value. No C treatment latency/token comparison or REA speedup is valid. Monetary billing, complete orchestrator/reviewer token cost, full process-family memory/CPU and causal host contention remain UNKNOWN. Host/CLI resource samples are retained; sequential arms do not prove absence of other workloads.

Recovery overhead additionally includes the scoped runtime download, signatures/catalogs, namespace fixtures, failed worker startup,300-second startup timeout, cleanup and independent review. It is not folded into a successful REA-arm measurement. Source/release and npm provenance are in FINAL_REPORT_AT_250.md and existing artifact/registry receipts. The official installer, original ASAR and sanitized common input retain their pinned identities.

## Reproduction and evidence

Current B results: evaluation-output/recovery1/behavior-results.json. Reproduce with the existing signed setup/recovery-evaluation-gate.ps1 under AllSigned. It verifies catalog/signatures/hashes/ACLs, then launches the pinned Node interpreter under MXC; only the new B submission is evaluated. A's original receipt is reused. No real application, model inference, live database or indexer integration was executed.

Authoritative closure: evidence/CURRENT_CLOSURE.json. Integrity/signing readback: evidence/RECOVERY_SIGNING_AND_INTEGRITY.json. Frozen protocol remains protocol/freeze.json. Original250-action closure/report were preserved as CLOSURE_AT_250.json and FINAL_REPORT_AT_250.md. The optional synthetic model corpus remains NOT_RUN.

## Remaining acceptance gates

B: reconcile its invocation-local MCP approval policy without bypassing any required human gate, then repeat the invalid arm with the frozen equal allocation.
C: independently prove full application analysis and robust forced-termination cleanup; then launch a fresh isolated C session and evaluate its unchanged submission.
A/B architecture rubric scoring is complete; exhaustive citation precision remains limited. C architecture/effectiveness cannot be inferred from startup failures. The remaining cumulative action allowance is recorded precisely in CURRENT_CLOSURE.json; it cannot cover two additional eight-action arms plus their qualification/evaluation/closure. Additional work requires renewed current-mission action authorization, not owner debugging. Engineering ownership remains with Codex.
