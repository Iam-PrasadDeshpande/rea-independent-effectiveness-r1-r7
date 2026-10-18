# Independent target architecture assessment

The evaluator graded 30 frozen facts for each sealed arm, separately from behavioral replay. The grader used two filesystem tool invocations and did not read behavioral outcomes. It inspected the source-grounded rubric, the available target architecture reports and bounded action-log markers. Complete ratings and rationales are in `evidence/architecture-assessment.json`.

| Arm | FULL | PARTIAL | INCORRECT | UNKNOWN | NOT_OBSERVABLE |
|---|---:|---:|---:|---:|---:|
| A — ordinary inspection | 1 | 13 | 0 | 16 | 0 |
| B — direct tools available | 6 | 11 | 0 | 13 | 0 |
| C — REA assisted | 0 | 0 | 0 | 30 | 0 |

B recovered more internal persistence structure and rendering separation. Both A and B recovered useful external state, import and export relationships, while leaving important internal relationships unresolved. C supplied no architecture or investigation report, so its 30 facts are UNKNOWN. That is missing evidence, not a measured zero in tool capability or architectural understanding.

Only claims about the original target were credited. A clone's snapshot history, textarea editing or persistence timer did not earn target credit. No weighted percentage was calculated. No NOT_OBSERVABLE exclusions were assigned merely because an arm omitted a fact. Zero INCORRECT ratings concerns the assessed claims under this rubric; it is not an exhaustive absence-of-error finding.

Traceability is separate: R denotes compatible retained browser action references and selected markers; S denotes asset action references and bounded static markers; N denotes no sufficient target claim. The grader did not independently re-execute every claim or exhaustively reread every raw response. The factual ratings should be interpreted within that verification limit.
