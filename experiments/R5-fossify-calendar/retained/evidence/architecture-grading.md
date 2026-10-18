# Independent architecture disposition

All three arms recovered the main weekly recurrence and detached-exception architecture from the APK. The retained evidence does **not** demonstrate an architecture-discovery advantage for REA over direct JADX in this single run. B provides stronger direct evidence of UI reminder sorting; C adds a static receiver entry-point observation but stops before the handler readback chain. A recovers the central structure from DEX inspection.

Disposition: **BOUNDED_APK_DERIVED_ARCHITECTURE_WITH_GAPS**. This is an assessment of architecture recovery, independent of hidden behavioral results. It does not establish complete Android feature equivalence.

The evaluator read final investigation.md, Solution.java, result.json, action catalogs and bounded supporting query artifacts for all arms, against the frozen 14-item source rubric. No hidden behavioral results were read, no feedback was sent to investigators, and no frozen files were changed. Obfuscated v90, xq0 and r50 are APK evidence names; source-grounded ownership is EventActivity, EventsHelper, Room/EventsDao and Context reminder integration. A criterion marked partial contains a material unestablished subpart; support is not a claim of full Android runtime correctness.

| Item | Criterion | A | B | C |
|---|---|---|---|---|
| 1 | Ownership: editor/helper/Room DAO | partial | supported | partial |
| 2 | Recurrence representation | supported | supported | supported |
| 3 | Local daily stepping and duration | supported | supported | supported |
| 4 | Monday multiweek anchor | supported | supported | supported |
| 5 | Count/until and exception count consumption | supported | supported | partial |
| 6 | Inclusive overlap boundaries | supported | supported | supported |
| 7 | Detached nonrepeating child for edit-one | supported | supported | supported |
| 8 | Original exclusion date versus moved child | supported | supported | supported |
| 9 | Delete-one and recursive series children | supported | supported | supported |
| 10 | Targeted persistence and converter/errors | partial | partial | partial |
| 11 | Complete reminder request pipeline | partial | partial | partial |
| 12 | Pending-intent event identity and receiver readback | partial | missing | partial |
| 13 | Local/CalDAV/notification authority boundaries | partial | partial | partial |
| 14 | Unsupported claims and equivalence limits | supported | supported | supported |

## Evidence by item

1. A report names Event, v90, xq0 and Room (q4,5,7,23), but not editor dispatch. B q24 EventActivity.o0 plus q7,8,11 connects editor, helper and database. C report/q3,6,16-18 identifies model/helper/database but omits editor ownership.

2. A q4,7,14-16,20; B q4,5,8,10; C q3,8,26 establish interval, weekday mask, signed limit and exception fields. All reports distinguish these fields.

3. A q16-17 and expand; B q4 and expand; C q4-5 and expand use local daily stepping and elapsed duration. All qualify Java-time/Joda substitution.

4. A q16-17 and TemporalAdjusters.previousOrSame(MONDAY); B q9 and monday calculation; C q9-10 and expand recover Monday anchor.

5. A q8,14-16,26-27 and used++ before exclusion; B q8,11,14 and seen++ before exclusion. C q8 explains count/until and implementation increments first, but report admits final exception-filter predicate was not separately inspected.

6. A q14-16,26 and expand; B q8,11 and expand; C q8 and expand recover start<=to/end>=from and inclusive until.

7. A q17 br0; B q17 default branch; C q23 br0.a show parent exception, parentId and cleared child recurrence. Each reconstruction separates replacement from base series.

8. A q17,21 and main editOne; B q17 and main editOne; C q23 and solve editOne persist exception from original occurrenceTS before using changed child start/end.

9. A q17,24,26-27; B q16,18; C q24,27 v90.h recover date exception and recursive parent_id deletion. All deleteSeries clear replacements.

10. A q23 binding/converter evidence lacks malformed converter/error path analysis. B q11 reads converted columns and admits converter not fully inspected. C q16-18,23-24 shows reads/targeted exception persistence but not malformed conversion or error handling. Gson roundTrip is not Room process persistence.

11. All recover strict-future, one-plan and one-year horizon, but ALL Java plans emit at*1000 without scheduleEventIn +1000ms. A q18-19,27 reverses storage slots but misses editor ascending normalization. B q26-27 verifies editor sort and q12,20 reversal. C q15 recovers reversal but reports ordering construction as inference; plan uses descending TreeSet.

12. A q17-18 includes pending intent/alarm calls but report omits event-ID identity and receiver database readback. B report/query set does not establish receiver readback or event-ID pending identity. C q12 inspects onReceive asynchronous/wake-lock delegate, but report does not recover handler readback, suppression and subsequent rescheduling.

13. All delimit unsupported CalDAV/runtime notification behavior. A q24,26; B q16-18,24; C q24,27 contain optional provider interactions, but none completes local versus provider plus notification-permission gate analysis.

14. All final reports explicitly distinguish static APK investigation and synthetic Java execution from APK runtime/notification delivery and Room persistence. No source reproducibility claim is made; source was withheld. C q1 report explicitly says its tool did not verify signature.

All qN references resolve to R5/arms/<arm>/output/query-N.json, cross-indexed by evidence/actions.jsonl. The final narrative and implementation are output/investigation.md and output/Solution.java; immutable hashes are recorded in architecture-grading.json.

## Material unsupported or incomplete conclusions

All three Java implementations omit the final +1000ms scheduling adjustment: A plan emits n*1000, B alarm emits at*1000, and C plan emits at*1000. This discrepancy is independently visible against source scheduleEventIn; it is not derived from hidden-test feedback. B correctly inspected editor ascending reminder sorting. A explicitly preserves incoming order after correctly observing storage reversal; it missed the upstream editor normalization. C inferred descending order rather than inspecting complete editor construction, and uses TreeSet deduplication.

A and C use an original-timestamp child map for repeated edits/deletes; their reports correctly label these semantics as inferred. All three intersect simultaneous count/until constraints despite the reference's single signed repeatLimit, and qualify that adapter choice. None reproduces Room itself, Android process persistence, permissions, receiver/alarm behavior, notification delivery or the complete original application. No investigator claims source/APK build reproducibility; source was withheld. C explicitly records that its package tool did not verify the publisher signature.

## Costs and recovery

A: 27 queries, 570.4357272 seconds. B: 28 queries, 424.0660705 seconds. C: 27 queries, 652.6447607 seconds. These are concurrent shared-host observed elapsed times, not controlled speed measurements. Provider usage fields are retained in JSON and require controller-side accounting before interpreting them as unique token costs.

C's controller interruption and same-thread recovery are orchestration overhead. The identical already-approved query response was reused without source/oracle feedback, under the original total caps. The interruption does not by itself demonstrate a REA capability failure. Source provenance/signatures/emulator evidence and hidden correctness are separately owned by the mission controller.
