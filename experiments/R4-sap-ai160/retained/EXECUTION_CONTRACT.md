# R4 execution contract

Mission: REA_CODEX_SAP_AGENTIC_PO_R4. Project: REA_INDEPENDENT_EFFECTIVENESS.

Fresh human authorization: current-task T3, 250 actions, internal subagents allowed,
full regression disabled, external agent dispatch disabled, no next gate. The
subsequent human instruction requests end-to-end ownership and autonomous routine
issue resolution. No authority is inherited from R1, R2 or R3.

SAP pin: 222db8ceaed6f4694eda0c1207bfea8777d11994.
REA pin: 742b6f587f3c4ef1b8212e7376d6f3a305b194dc; package version 6.5.0.

Only SAP Exercises 1 and 2 are the completion baseline. Optional Exercise 3 is
excluded: its AI Core masking/filtering cannot be proved by offline fixtures.
Exercise changes uncomment documented solutions in
po-agent.ts, get-purchase-order-item.ts and create-note.ts. Under the fresh
end-to-end recovery directive, a separate evaluator compatibility correction
wraps the UI isReadOnly expression in Boolean(...). It preserves the existing
truthiness-based UI decision and fixes TS2322 without adding business behavior.
The original failing typecheck is retained. The formatting tool's
empty implementation is preserved; its schema is model-facing, not a formatter.

Executable controls: use the existing trusted AI-SAP Local Code Signing
certificate, thumbprint A98A2B0353CB7C086BEEC23A36FC4095DFB37844, for this R4
execution. No signing key is created or exported. Custom PowerShell launchers
must have a Valid Authenticode signature from that certificate. Other custom
executable files must be covered by SHA256 entries in a manifest whose digest is
embedded in the signed launcher. Verify the launcher before invocation and all
manifest-covered bytes before each task. No unsigned custom script execution.

This is an integrity mechanism, not an operating-system sandbox. Independently
prove filesystem and network isolation before qualifying blind investigators.
Separate process isolation from model-tool authority. Internal agents in this
host inherit shared tools and filesystem access; a prompt restriction alone
does not prove containment. No external Codex/Claude dispatch is authorized.

Evaluator-only fixtures may replace model responses, freeze time and bind a
mock API to loopback in a disposable execution environment. Do not contact
SAP/BTP/AI Core or use ambient credentials. All investigator business operations
remain read-only. No deployment, publication, global config change or cleanup.

Stop before blind benchmarking if the documented reference cannot be assembled
faithfully. Preserve observed failures as reference behavior; do not silently
repair business logic to improve scores.
