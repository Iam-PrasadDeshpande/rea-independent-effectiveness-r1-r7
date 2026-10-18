# R4 controlled experiment

Freeze the 38-scenario reference oracle before investigators. Keep original
TypeScript, SAP repository/docs, evaluator findings, oracle and peer results
outside every inspection sandbox. Artifact byte hashes are identical for all
arms. The target is readable application-bundled JavaScript with external Node
dependencies and a React dependency bundled into the UI. It is not obfuscated.

Run three fresh internal agents with fork_turns=none and no model overrides.
All receive the same objective, 18 inspection calls, and 15 minutes. Arm A has
standard inventory/read/literal search. Arm B additionally has direct TypeScript
5.9.2 AST inspection. Arm C additionally has real REA MCP static analysis and
feature tracing at the pinned source version. REA qualification requires a
successful real invocation first. No target business code is executed by these
tools. Investigator deliverables are returned as text; evaluator persists and
signs reconstructed components before executing hidden tests.

All actual inspection calls must use Inspect-R4Blind.ps1. It validates signatures
and hashes, then runs a fixed data-only tool inside WSL bubblewrap with input
read-only, isolated PID/user/network namespaces, no Windows filesystem mount,
and temporary scratch storage. Only required tool engines are mounted. Negative
probes must show the input readable, oracle inaccessible, writes denied, and
external network denied. This verifies child-process isolation. The surrounding
agent host still has general tools; adherence must be audited from real call
records and any out-of-protocol call disqualifies its arm. No claim of a
host-enforced adversarial agent sandbox is permitted.

All arms reconstruct the timestamp helper as CommonJS export
calculateOverdue(sapTimestamp, nowMs). Do not reveal its hidden cases. Record
architecture, routing, graph, sequence, notes, state/checkpoints, errors/retries,
write authority, explicit unknowns, citations, exact invocation transcript and
measurements. Model token usage must come from runtime records; otherwise mark
UNKNOWN. Do not substitute character counts for consumed tokens or invent costs.

One task per arm is a descriptive case study, not a statistically powered test.
Report A-B conventional tooling, B-C incremental REA and A-C overall differences
separately. Setup/recovery time belongs to evaluator overhead, not arm solve time.
Run the arms sequentially to avoid inter-arm CPU contention and time overlap.
Do not expose any earlier arm's output to a later arm.
