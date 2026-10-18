# REA Android Calendar R5: final results

REA successfully inspected the real Android APK, but **did not improve hidden-test correctness or demonstrate an architecture-discovery advantage over direct JADX in this run**. All three independent reconstructions tied at **32/44 exact scenarios**, or **31/43 user-level scenarios** after separating one robustness probe.

Each reconstruction matched every occurrence projection, including weekly recurrence, single-occurrence changes, remaining-series preservation, deletion, serialization round-trip and the tested date boundaries. **All three failed all 12 scenarios with scheduled reminders**: each omitted the reference's final +1000 ms alarm adjustment. Arm A additionally selected the wrong offset for the unsorted-reminder case. None is functionally equivalent to the complete target feature.

This closes the bounded effectiveness experiment with gaps. **It does not establish reconstructed Android E2E completion.** No frozen submission was repaired after hidden evaluation.

## Results

| Measure | A: standard APK/DEX inspection | B: direct JADX | C: REA/JADX |
|---|---:|---:|---:|
| Exact complete scenarios | 32/44 | 32/44 | 32/44 |
| Exact user-level scenarios | 31/43 | 31/43 | 31/43 |
| Occurrence projection | 44/44 | 44/44 | 44/44 |
| Reminder-bearing scenarios | 0/12 | 0/12 | 0/12 |
| Approved investigator queries | 27 | 28 | 27 |
| Observed elapsed seconds | 570.44 | 424.07 | 652.64 |
| Reported cumulative input tokens | 2,806,791 | 1,205,108 | 2,747,100 |
| Cached input tokens | 2,614,784 | 1,135,104 | 2,543,744 |
| Uncached input tokens | 192,007 | 70,004 | 203,356 |
| Output tokens | 8,541 | 8,787 | 5,914 |

All three used gpt-6.1-sol, confirmed from retained session metadata. Time is concurrent shared-host elapsed time, including controller recovery for C, not a controlled speed benchmark. These are final cumulative session token counters. The driver's summed per-turn counters double-count cumulative values; those invalid sums are retained only for audit. Aborted-turn billing, evaluator/setup tokens, dollar costs and total infrastructure cost are not established by this table. No implementation fully passed the feature, so cost per fully successful reconstruction is undefined; B had the lowest observed investigator token demand.

Behavioral summary (retained source reference: `evidence/behavioral-summary.json`), 132 retained comparisons (retained source reference: `evidence/behavioral-validation.json`), reminder diagnosis (retained source reference: `evidence/reminder-diagnosis.json`), final comparison and accounting (retained source reference: `evidence/arm-comparison.json`).

## Original behavior and architecture

EventActivity owns editing; EventsHelper coordinates mutations and occurrence queries; Event owns recurrence state and stepping; Room/EventsDao persist parent rows, detached children and exceptions. Weekly expansion steps local calendar days, uses a weekday mask and Monday-anchored multiweek selection, and preserves duration. Count-limited expansion consumes eligible dates before exceptions are excluded. Queries use inclusive overlap boundaries.

Editing one occurrence records an exception for its original local date and inserts a separate nonrepeating child. The remaining parent series survives; moving the child does not move the original exception day. Deleting one occurrence records an exception; deleting a parent series also deletes children. Reminders use stored-event identity, strict-future selection and one next request per row, followed by a one-second adjustment before AlarmManager scheduling. The receiver's database readback and suppression paths matter separately from producing a planned timestamp.

The source-backed architecture and frozen 14-item rubric (retained source reference: `evaluator/reference-architecture.md`) include persistence, error handling and source locations. The independent final architecture assessment (retained source reference: `evidence/architecture-grading.md`) found central architecture recovery in all arms, with material gaps in complete reminder/receiver/error handling. B established editor reminder sorting more directly; C observed the receiver entry point without completing the handler readback chain. There is no supported composite superiority score.

## APK/source provenance and toolchain

- Official reference: [Fossify Calendar release 1.12.0](https://github.com/FossifyOrg/Calendar/releases/tag/1.12.0), asset calendar-23-foss-release.apk.
- Source tag and clean checkout HEAD: **1a85738b3ec989334eb284724caafec6c5a50214**.
- APK SHA-256: **d43b2df05d5702bea760a7ab03402977ba72e446e5932038efbdab248a5de987**; matched the official release-asset digest.
- Package: **org.fossify.calendar**, version1.12.0/code23, minSDK26, targetSDK36.
- APKv2 signature verification succeeded. Embedded certificate SHA-256: **affdb124d3f4720c2f98dbca9eacba0514fba4306e20a2786c861c3c0d6ff292**, DN C=IN,O=Fossify,CN=Naveen Singh. Release-origin association is verified; the publisher key was not authenticated through an independent trust channel.
- Source and APK are release-associated and version-consistent. A reproducible byte-for-byte source build is **NOT_PROVEN**; the release workflow delegates to a mutable shared workflow.
- REA: official npm **rea-agents6.5.0**, registry integrity verified. Its distributed build is pinned by tarball hash; equivalence to an independently rebuilt source checkout is not asserted. Local dependency installation stalled and dependencies were copied read-only from the existing vendor cache into R5.
- Both B and C used identical headless JADX **0.7.1**, underlying JADX **1.5.6**, JAR SHA-256 **6e5eacf500b64292bfb73c49797c1958f6ee44646e43e868039ae7feb573ff75**, JDK21.0.11+10, one worker/full resources/1536MiB heap/two active processors. REA used Node24.18.0.

REA treatment qualification required actual success: package inspection recovered4870 classes and2020 resources; Event.getRepeatInterval method inspection succeeded against the exact APK. Artifact-bound evidence IDs, provider identity and real engine responses are retained in package evidence (retained source reference: `evidence/toolchain-rea-package.json`) and method evidence (retained source reference: `evidence/toolchain-rea-method.json`). Documentation or tool visibility did not qualify the treatment.

## Independent behavioral oracle

Before final investigation, the evaluator froze44 scenario inputs, expected outputs and the source-backed rubric. The oracle executes compiled actual Event recurrence code and exact EventsHelper expansion/edit-one/delete-one methods with real Joda-time. Local DAO, clock and Gson round-trip are adapters. Reminder request calculations are source-ported; they do not execute Android notifications. The source-neutral public contract discloses I/O structure without reference source, internal recurrence encodings or expected cases.

There are43 user-level scenarios and one separately labeled empty-weekday robustness case. Coverage includes count/until, multiple weekdays and intervals, first/middle/last exceptions, moved edits, repeated exceptions, persistence round-trip, deletion, inclusive windows, DST, leap day, year change, half-hour timezone and reminder boundaries. The32 complete passes include the robustness case and cases without planned reminders; they must not be described as32 successful reminder tests.

Independent post-evaluation diagnosis verified that adding1000ms to emitted requests would reconcile B/C's12 failed reminder cases. A additionally has the unsorted-reminder selection defect. This is a diagnostic comparison, **not** a repaired submission or a new pass result.

## Actual Android reference validation

The signed APK ran in a fresh isolated Android37 Google APIs x86_64 AVD with no accounts, synthetic data only and device networking disabled. It used a dedicated adb server5045 and explicit emulator-5580; no real device or existing personal AVD was addressed.

The reference created R5_SYNTH_WEEKLY on18October2026, changed only that occurrence to R5_SYNTH_WEEKLY_ONE, and preserved the original25October occurrence with Weekly recurrence and10-minute reminder. Both titles survived force-stop/relaunch. Real Android alarm dumps showed NotificationReceiver requests for both dates at07:50:01, corroborating scheduling integration and the one-second adjustment. Actual notification arrival was **not observed**.

Runtime report (retained source reference: `evidence/emulator-runtime-report.md`), edited occurrence (retained source reference: `evidence/emulator-edited-one.png`), preserved series (retained source reference: `evidence/emulator-day25-series-preserved.png`). The dedicated emulator and adb server were stopped after evidence capture. This validates the original app's bounded runtime flow, not Android execution of the reconstructed Java features.

## Isolation, signing, recovery and cost limits

Investigator sessions were fresh and independent, with memory, project documentation, user config, network and built-in tools disabled. A signed literal-action dispatcher exposed only approved per-arm APK operations and arm-local logs. Final source execution used an offline bubblewrap mount/network namespace with no evaluator source, oracle or peer mounts. Provider/model host processes themselves were not inside that mount namespace; this is application-level investigator tool isolation plus OS-isolated reconstruction execution. Final event-stream checks are in the closure evidence.

An initial Unicode stdin transport failure caused a matched fresh restart of all3 arms. Pilots are retained under pilot/ and charged as recovery overhead. C later hit the controller's180-second turn deadline; its SAME blind session resumed without hidden feedback, using the identical already supplied response, within the original28-query/1800-second total limits. This recovery is a time/accounting confound, not proof that REA inspection failed. Failed attempts are not omitted.

All current custom executable PS controllers are Authenticode-signed with existing approved signer A98A2B0353CB7C086BEEC23A36FC4095DFB37844 and executed AllSigned. Final readback is signing-closure.json (retained source reference: `evidence/signing-closure.json`). No keys were created or exported, no execution-policy bypass used, and APK signatures are kept distinct from controller signatures. No writes targeted R1–R4, production services, real calendars or global configuration. No reconstructed APK was published or distributed. Attribution (retained source reference: `ATTRIBUTION.md`) preserves reference GPL and vendor obligations.

The owner raised the action ceiling from250 to300 explicitly. The final authoritative count and definition are in action-ledger.json (retained source reference: `evidence/action-ledger.json`). It includes evaluator/root tool invocations and investigator-dispatched queries, including pilots. Remaining actions are not permission for another gate.

## Disposition and claim limits

**Hypothesis:** REA's layer improves Codex's APK architecture discovery and functional reconstruction over standard inspection and direct JADX. **Decision boundary:** artifact-qualified treatment, independent source-free sessions, frozen source-based oracle and source-backed architecture assessment.

**Result:** zero additional exact cases versus direct JADX; no demonstrated architecture advantage. REA's observed addition is structured artifact-bound provenance and typed inspection, with more observed input-token demand than direct JADX in this run. One matched triple cannot establish broad REA ineffectiveness or superiority. Output envelopes, available catalog operations,60-second REA idle eviction, concurrent host load, inference variation and recovery limit causal timing/token claims.

Reconstruction Room persistence, unrelated-series preservation, full error paths, all-day events, CalDAV, alarm cancellation/receiver lifecycle, permission handling and notification delivery remain unqualified. The original UI persistence observation does not upgrade the reconstruction's Gson round-trip to Room proof. E2E reconstruction is **NOT_ACHIEVED**. No post-test fixes or subsequent gate were started.

## LinkedIn-safe factual summary

I compared three independent Codex investigations of the same signed Fossify Calendar APK: standard APK inspection, direct JADX, and REA with the same JADX engine. Across44 frozen source-derived scenarios, all three tied at32 exact passes. Each matched the tested recurrence/exception outputs, but all missed the final one-second reminder scheduling adjustment. REA produced useful artifact-bound inspection evidence; this run did not demonstrate better functional correctness or architecture recovery than direct JADX. The original flow was also checked in a synthetic Android emulator. Notification delivery and a reconstructed Android app were not qualified. One experiment is not a general effectiveness verdict.

Machine-readable requested fields: FINAL_STATE.json (retained source reference: `FINAL_STATE.json`). Closure hashes, including reports, submissions and retained comparisons: closure-integrity.json (retained source reference: `evidence/closure-integrity.json`).
