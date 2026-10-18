# R7-only comparative review

The evaluation found no demonstrated REA improvement in bounded reconstruction correctness or overall architectural recovery. All three arms produced exact matching WebP outputs and decoded pixels for 26 frozen positive workflows using the same pinned codec binaries. A/B mechanically scored 30/30; C mechanically scored 29/30 with an independently documented lexical false negative for its correctly observed decoding rejection. The raw result remains unchanged.

| Measure | Standard A | Direct tools B | REA-assisted C |
|---|---|---|---|
| Positive output equivalence | 26/26 exact | 26/26 exact | 26/26 exact |
| Expected rejection behavior | Four observed/accepted | Four observed/accepted | Four observed; three mechanically accepted, one audited classifier defect |
| Architecture FULL/PARTIAL/UNKNOWN | 16/9/5 | 16/13/1 | 14/11/5 |
| Working independent integration | Yes | Yes | Yes |
| Specialist evidence actually used | Ordinary asset reads/probes | WABT resize ABI and Acorn AST | REA typed WASM identity/ABI/WAT; selected JS analysis |
| Main evidence limit | Missing lifecycle explanations/artifact identity in report | Partial explanations; pause/signing repairs complicate trace/time | Large, partly irrelevant JS summaries; two missing query-log references |
| Observed active seconds | 401.29 | 638.58, including recovery stalls | 397.88 |
| Cumulative session input tokens | 1,052,552 | 1,065,851 | 1,397,722 |

The conventional specialist tools did not improve positive functional outcomes over A. REA supplied useful identity-bound ABI evidence, but C did not recover more of the rubric and used more input tokens in this run. These observations do not prove REA makes agents slower, less capable or more costly in general. C's short observed wall time and B's longer interrupted run do not establish a causal speed benefit. The selected standard-tool allowlist also omitted a hashing executable, limiting attribution of REA's identity-reporting convenience.

The source/implementation/oracle/isolation chain, adjudication, exact metrics and limitations are in `FINAL_REPORT.md`. Category counts are judgments over explicit obligations, not a numeric fidelity percentage. Monetary cost and whole-process-family resource consumption remain unmeasured. Evidence packaging and functional reconstruction were evaluated separately.

This substitutes an explicitly R7-only review for the original requested cross-application consolidation: R5/R6 were excluded by the owner, and existing R1-R4 were not reopened, modified or rescored. No cross-application capability or generalization claim is made. Final disposition is **PASS_WITH_GAPS**. No publication or follow-on gate was started.
