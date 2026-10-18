# REA across seven applications: final evidence qualification

Private Enterprise AI Architecture report · 18 October 2026 · Asia/Calcutta  
Mission: `REA_R1_R7_FINAL_INDEPENDENT_QUALIFICATION_R1`  
Verifier: Codex, deterministic reinspection of retained evidence in this chat. This is an assistant-led audit, not independent human certification or a new blind investigation.

## 1. Executive summary

**FACT:** Seven real application case studies exercise REA's JavaScript, native, Android, browser and WebAssembly analysis facilities. The retained records demonstrate useful structured evidence, artifact identity, analysis views and uncertainty reporting. They do not demonstrate a REA-specific functional reconstruction advantage over the applicable Codex controls. This audit compared historical outputs, checked original manifests and signatures, and created a separate evidence baseline. It executed no original application, reconstruction, oracle, build or experiment. [E1–E7; V1–V6]

**INFERENCE:** REA is useful as an optional analysis and evidence coordination layer. Its strongest demonstrated contribution in this portfolio is making observations inspectable and retainable. The portfolio does not justify making it a mandatory dependency for unfamiliar-software work, promising complete application reconstruction, or claiming reliable speed or cost savings. Lack of demonstrated advantage here is not proof of universal ineffectiveness.

**RECOMMENDATION:** Adopt it selectively where the retained evidence and coverage information justify its setup and operational cost. Continue to validate reconstructed behavior independently. A recognizable diagram, successful tool invocation or signed script is insufficient evidence of behavioral equivalence.

| Case | Retained functional outcome | Preserved closure |
|---|---|---|
| R1 SAP GenAI Mail Insights | A 8/8; C 8/8 handler scenarios; no B arm | Bounded POC completed, original wording retained |
| R2 Zint GS1-128 | A/B/C each 48/48 exact exit/module comparisons | `QUALIFIED_BOUNDED_POC` |
| R3 Joplin semantic search | A/B/C each 40/40 deterministic search scenarios | `EXPERIMENT_COMPLETE_WITH_LIMITATIONS` |
| R4 SAP AI160 purchase-order agent | A/B/C each 12/12 timestamp-helper cases | `QUALIFIED_BOUNDED_POC` |
| R5 Fossify Calendar | A/B/C each 32/44; all miss twelve reminder-bearing scenarios | `BOUNDED_EXPERIMENT_COMPLETE` |
| R6 Excalidraw | A 3/36; B 30/36; C 27/36; comparison invalid | `INVALID_COMPARISON_AS_REPORTED` |
| R7 Squoosh | A/B 30/30; C raw 29/30; all 26 positive workflows exact | `PASS_WITH_GAPS` |

These denominators concern different feature boundaries. They must not be pooled into an overall accuracy percentage. R7's C29 semantic correction remains beside, rather than replacing, its raw score. R6's observations are retained without converting an invalid comparison into a performance ranking. [V2]

**Freeze gate:** All 12,236 authoritative closure-manifest entries match their retained bytes. The additional 4,203 original/additive freeze entries contain one mismatch: R1's signed `Run-BlindArm.ps1` differs from its original freeze hash. The historical report documents launcher recovery, but exact before/after continuity is not independently established. The new baseline records current bytes and this mismatch; it does not repair the old freeze. It is unsigned and dependent on the retained original paths, rather than a self-contained archive, write-protected storage or a cryptographically signed final freeze. Final freeze qualification is **HOLD**, while the audit and private documentation are complete with explicit gaps. No new signing or archival operation was performed. [V1, V3]

## 2. Research motivation

The practical question is whether an agent can understand unfamiliar delivered software accurately enough to recover actual behavior and explain the evidence behind its conclusions. The seven applications span SAP AI email processing, barcode generation, desktop semantic search, a SAP purchase-order agent, Android calendar reminders, web drawing and undo/redo, and browser image compression. This gives useful variation in artifact type and engineering task. It is a deliberately selected portfolio, not a random sample of enterprise software or a statistically representative benchmark. [E1–E7]

Three questions must remain separate: whether a tool can successfully inspect an artifact; whether an agent explains its architecture correctly; and whether submitted code reproduces the selected behavior. A fourth concerns operational cost. Evidence for one does not establish the others.

## 3. REA architecture and actual capabilities

**FACT:** The evaluated REA version is 6.5.0. Several cases use source pin `742b6f587f3c4ef1b8212e7376d6f3a305b194dc`; R3 explicitly uses the published build associated with `3b79af28e80785afce9f5998d8f03289402a1847`, and R5 identifies a pinned published package rather than asserting a rebuilt-source equivalence. Package version labels alone do not establish identical source or runtime bytes. [E2, E3, E5; V1, V3]

The retained execution records show an agent-facing tool interface dispatching analysis to specialized facilities, then exposing structured records, analysis views, artifact identities and coverage/limitation fields. Native analysis uses Ghidra; Android inspection uses a JADX bridge; browser observations use browser/CDP infrastructure; WebAssembly inspection uses WABT; JavaScript facilities inspect ASTs and selected code relationships. REA's coordination and evidence envelopes must be distinguished from the underlying engines' decoding, decompilation, parsing and runtime observation. [E2–E7; V5]

| Case | Actual facility exercised | Coverage boundary |
|---|---|---|
| R1 | JavaScript analysis and retained-view inspection | Five parsed JS files; partial graph and explicit unknowns |
| R2 | Native opening, Ghidra observations, retained inspection/export | Pinned stripped ELF; selected procedures and validators |
| R3 | Successful JS analysis of a 490-byte clipboard module | Core bundle analysis timed out; successful peripheral call does not qualify core coverage |
| R4 | JS analysis and selected feature trace | One file; 425 reported semantic unknowns; selected trace had zero seed matches |
| R5 | APK/package and method inspection through JADX | Static DEX/resources; provider does not validate Android runtime or publisher signature |
| R6 | Browser list/inspect; evaluator bundle-analysis preflight | Blind C and evaluator calls are distinct; huge response not fully delivered to model |
| R7 | WASM identity/interface inspection and JS analysis | Useful resize ABI; large partly irrelevant JS summary; partial scope |

These are demonstrated scoped capabilities. No claim is made that every REA provider, workflow or current product release was evaluated.

## 4. Experiment methodology

**FACT:** A means ordinary Codex inspection; B adds direct conventional tooling; C adds REA. R1 is an earlier matched A/C pair and has no conventional B arm. The available common tools, model effort, control interfaces, reconstruction sizes and recovery histories differ across experiments. Within-case claims use the recorded protocol, not an invented uniform seven-case design. [E1–E7]

Investigators received common frozen artifacts/objectives within their case, with source, oracle and peer findings withheld through the recorded tool/mount boundaries. Fresh conversations and controlled dispatchers were used. Isolation evidence supports specified denial probes; it does not prove isolation from pretrained knowledge, the model provider, or every possible host attack. R4's surrounding model host is specifically not an adversarial OS sandbox. [E1–E7; V1]

Reference outputs and scoring contracts were frozen before valid investigations, with retained additive transport/evaluator amendments and failed attempts. R3 preserves original A and selects valid B-recovery6/C-recovery2. R4 discloses a B pilot followed by an amended class-use requirement. R5 has a matched restart and C same-session recovery. R6 and R7 have significant transport/signing/controller histories. These are method limitations, not pristine preregistration. No valid low score is silently replaced here.

This audit recomputed comparisons from stored data for R2–R7 without executing the historical software. R1's eight-case results are verified as retained TAP receipts, not independently recreated event traces. Architecture ratings remain historical model/coordinator judgments unless explicitly identified as direct source checks. Signatures and manifest hashes were freshly checked. [V1–V4]

## 5. Seven real-world application case studies

### R1 — SAP GenAI Mail Insights

**FACT:** The authoritative source pin is `5ec5febdea5354004534bc3e5140dd62df7488be`. The prepared source/UI build used documented dependency-resolution interventions; it is not an untouched-install result. Nineteen reference fixture checks and eight differential handler cases concern injected AI and persistence dependencies. A and C both have eight passing handler receipts. Their reported architecture rubric is A 30 fully recovered facts; C 29 full and one partial out of thirty. [E1; V2]

The C omission concerns a rejected `Promise.all` leaving already-started sibling work running. Both arms recovered the principal service and data relationships. REA's successful analysis/view calls supplied structured graph provenance, but this pair supplied no recovery advantage. HANA similarity, actual model quality, CAP HTTP authorization, MTAR deployment and real SAP/BTP operation remain unqualified. The original disposition is “bounded POC completed,” not a retrospectively invented stronger label.

**Independent audit gap:** `Run-BlindArm.ps1` has current SHA-256 `963902a0c17ff1d9716549841dbfcf77b84330ea06d3dfbc05968cdf1cac0527`; its original freeze expects `02f620e5b3b2f49a444aefd1ef2ed37405e46823f5125274065bb05779942b87`. The current script is validly signed and matches the final signing inventory. Launcher recovery is documented, but a verified exact amendment chain from the original frozen script is incomplete. Original closure remains preserved; independent launcher-freeze qualification is HOLD. This does not by itself contradict the two retained eight-case TAP receipts. [V3, V4]

### R2 — Zint GS1-128

**FACT:** Zint 2.16.0 source pin is `55541e139e62b9209b71cd9b0ba9010cec28b1d9`; target ELF SHA-256 is `08af4075a1fd8b2fff65967435512582afbb52f2daf4a7971f025a888eff7ad4`. All three retained reconstructions match numeric exits and canonical barcode-module hex on 48 cases. The report retains sixty applicable passing reference build suites. Frozen-fact grading is 33/37/39 FULL and 7/3/1 PARTIAL for A/B/C, from a forty-fact rubric. [E2; V2]

REA adds a 325,750-byte, twelve-record export; its eight report-cited evidence IDs occur in the retained export. Direct Ghidra records also contain traceable artifact/provider/address evidence. This is evidence packaging value, not exclusive access to proof or an accuracy gain. Specialized AI rules, capacity boundaries and complete GS1 conformance remain outside demonstrated equivalence. Published npm provenance names a different commit from the pinned source; registry authenticity must not be represented as source equivalence. `QUALIFIED_BOUNDED_POC` remains unchanged. [E2; V5]

### R3 — Joplin semantic search

**FACT:** Joplin v3.7.21 source pin is `e41516e669efb693b009bedb21f3eb1fcbea4fc9`. The sanitized blind ASAR SHA-256 is `c9baebd9f6fe445cc267ea15e23bf87a7e8f9bdae3d461d7ae1847a7479d87f3`. Each selected valid arm matches forty deterministic `SearchService.search` cases with supplied dependencies. Reported architecture points are A 27/30, B 11/30, C 25/30 over fifteen two-point facts. These points are not human-gold fidelity or application accuracy. [E3; V2]

Primary REA core analysis timed out at 120 seconds. Its successful selected clipboard analysis parsed one 490-byte module, with 2,848 inventoried files unselected. The successful peripheral invocation cannot establish full semantic-search core analysis. C's successful retrieval reconstruction primarily cites ordinary bundle inspection; its advantage over B's architecture points cannot be attributed to REA. The historical citation audit also identifies A's incorrect claim that `clearAll` drops the vector table; the code deletes rows. Real-model retrieval quality, UI/native SQLite integration and whole-application reconstruction remain untested. `EXPERIMENT_COMPLETE_WITH_LIMITATIONS` is retained. [E3; V5]

### R4 — SAP AI160 purchase-order agent

**FACT:** Source pin is `222db8ceaed6f4694eda0c1207bfea8777d11994`, with retained exercise-completion patches and a separate UI Boolean compatibility repair. Thirty-eight reference mock/graph cases and five fixture UI checks are distinct from each reconstruction's twelve timestamp-helper cases. All A/B/C helpers match twelve cases. Source-fact grading is 14/16, 14/16, 15/16. C's extra explicit `MessagesAnnotation` fact came from ordinary code inspection. [E4; V2]

The real loop and mock API make useful reference evidence, but the submitted replacement is a helper, not a reconstructed full purchase-order agent. The selected REA trace returned zero seed matches; that does not establish absence of the feature. The sample has prompt-based ordering/filtering, process-local state and separate UI/backend write/approval gaps. Note creation does not prove email delivery, and fixture UI observations do not prove live SAP behavior. `QUALIFIED_BOUNDED_POC` remains bounded to its original acceptance. [E4]

### R5 — Fossify Calendar

**FACT:** Release 1.12.0/code 23 is associated with source `1a85738b3ec989334eb284724caafec6c5a50214` and APK SHA-256 `d43b2df05d5702bea760a7ab03402977ba72e446e5932038efbdab248a5de987`. A/B/C each match 32/44 complete scenarios, or 31/43 when the separately labeled robustness probe is removed. All occurrence projections match 44/44. Every arm fails the twelve reminder-bearing scenarios. [E5; V2]

All three omit the reference's final +1000 ms scheduling adjustment; A additionally mishandles the unsorted-reminder case. A diagnostic comparison showing what adding one second would reconcile is not a repaired submission or a new pass score. The original APK's synthetic emulator flow corroborates editing, series preservation, relaunch persistence and alarm scheduling; actual notification arrival was not observed. Reconstructed Room persistence, receiver lifecycle, permissions and a reconstructed Android app remain unqualified. Source/APK version association is not a reproducible source-build proof. `BOUNDED_EXPERIMENT_COMPLETE` is preserved. [E5; V2]

### R6 — Excalidraw

**FACT:** Local production build v0.18.1 uses source `a2ec2889babf7d2295469c6d90ebe77fae57df84`. Two reference runs agree on thirty-six normalized scenarios. Recomparison of the 108 retained arm observations reproduces A 3/36, B 30/36 and C 27/36. A contains a syntax error; its three empty-scene matches do not establish a working drawing app. C submitted partial software but no final architecture/investigation reports. [E6; V2]

C's first inspect response was 4,055,592 characters against a 1,048,576-character delivery limit. Recovery retained the same conversation and consumed budget. A later exit ended C without its reports. The recovery timer mixed UTC and local DateTime values; corrected timestamps support 1,117.265 seconds, but matched enforcement of the time ceiling is not proven. The missing reports, asymmetric recovery and timer defect preserve `INVALID_COMPARISON_AS_REPORTED`; the historical file uses the shorter `INVALID_COMPARISON` label. No ranking is qualified. [E6]

**Archive reconciliation:** The historical final command `exec-9a042b40-98e7-48f6-a372-960df1a0069b` completed with exit zero and reported 8,994 manifest entries. Its operation creates `evidence/final-evidence-manifest.json` and its SHA-256 sidecar. It does not create a final ZIP/TAR package. The current audit verifies every listed hash. A retained `downloads/source.tar` is a source archive, not a final experiment archive; its structure/payload were read without extraction. No final evidence archive was located in the inspected R6 Windows/native roots. Therefore the job-completion question is resolved, while a self-contained final archive remains absent from verified evidence. No archive was invented or created to mask that gap. [V1, V6]

### R7 — Squoosh

**FACT:** Source `e8d35e0fb66eb16eff6fe8fc773eabcbb7128de3`, package 2.0.0, supplied a local production build and pinned codecs. Each arm implemented a browser integration that decodes an image, optionally resizes, invokes the permitted original WebP/resize binaries and exports bytes/MIME/filename. All 26 positive workflows match exactly. A/B raw scores are 30/30. C raw score is 29/30. [E7; V2]

For C29, immutable `solution.js:12` rejects from native `Image.onerror` with “Decoding error,” before canvas extraction or worker construction. The recorded hidden execution points to that callback. The frozen rubric excludes error wording; the validator's `decode|image|InvalidStateError` pattern misses “Decoding.” This audit confirms the original semantic requirement is satisfied. Raw 29/30, correction evidence and semantic interpretation remain distinct; no corrected aggregate replaces the original score. [E7; V2, V4]

REA's resize-WASM ABI evidence is useful, identity-bound and directly checkable. B obtains interface details through direct WABT, while A reads the JavaScript bridge. Architecture FULL/PARTIAL/UNKNOWN ratings are A 16/9/5, B 16/13/1, C 14/11/5. C's large JS summary is partly irrelevant and two report query-file references are missing. This is a successful same-codec integration comparison, not reconstruction of the compression algorithm, full editor, lifecycle or all codecs. Signing recoveries and the earlier `find -exec` enforcement gap remain disclosed. `PASS_WITH_GAPS` is retained. [E7]

## 6. Independent evidence qualification

The machine-readable evidence manifest provides actual paths, byte counts, hashes, original labels, audit dispositions and gap records. Its inventory includes every item from the seven authoritative closure manifests, separately verified freeze entries, and supplemental report/evidence files. Historical manifests vary in coverage: R1's four-entry closure seal is not a complete artifact inventory, R3 explicitly inventories selected evidence, and installation caches/global/native runtimes are not all copied into this closure. Supplemental inventory extends coverage without claiming a full forensic disk image. [V1, V3]

| Evidence lane | Current status | Meaning |
|---|---|---|
| Closure manifest entries | VERIFIED, with counts and discrepancies in V1 | Original expected hashes compared with retained bytes |
| Original/additive freeze entries | 4,202 VERIFIED; one R1 launcher mismatch | Exact frozen-to-current launcher continuity INCOMPLETE; no historical repair |
| R2–R7 stored behavior comparisons | VERIFIED | Recomputed from actual/expected records; no new execution |
| R1 eight-case comparisons | VERIFIED as TAP receipts | Underlying differential execution is historical, not newly replayed |
| Architecture grades/citation totals | REPORTED_NOT_INDEPENDENTLY_VERIFIED in full | Prior grading/rationale read; no claim of full fresh regrading |
| Historical tool capability | VERIFIED for inspected invocation records | Selected real successful calls, not configuration visibility |
| Controller/catalog signatures | VERIFIED for inspected files | Signature and approved signer identity checked on this host |
| npm attestation and APK trust chains | REPORTED_NOT_INDEPENDENTLY_VERIFIED in full | Retained provenance receipts do not become a new external trust audit |
| Complete economic benefit | UNKNOWN | No verified billing or whole-workstation cost accounting |
| Final signed archive | INCOMPLETE | No new signature/archive operation within current scope |
| R1 B arm | NOT_APPLICABLE | Experiment had no such arm |

No current report is evidence of new application execution. Independent here means independently inspecting retained evidence against the report, not independence from all earlier assistant work or an independent laboratory.

## 7. Functional reconstruction findings

**FACT:** R1–R4 demonstrate bounded handler, encoding, search or helper agreement. R5 shows a concrete shared failure despite correct recurrence projections. R6 has no fully equivalent drawing reconstruction. R7 demonstrates precise integration using supplied codecs and a grading false negative. These observations support feature-specific claims only. [V2]

**INFERENCE:** Successful tests can conceal a narrow reconstruction boundary or a ceiling effect. R4's small helper and R7's shared binaries are especially important when interpreting high scores. R5 demonstrates why implementation details and failure paths belong in evaluation: a one-second scheduling adjustment changes the exact behavior even when the visible recurrence logic looks convincing.

## 8. Architecture discovery findings

**FACT:** Historical scoring systems are incompatible: R1 thirty facts; R2 forty FULL/PARTIAL facts; R3 fifteen facts scored up to thirty points; R4 sixteen explicit facts; R5 fourteen qualitative criteria; R6/R7 thirty categorical obligations. No common architecture percentage is computed. [E1–E7]

REA-supported reports contain useful detail, but isolated numerical differences do not establish causation. R2's additional fully recovered details also used shared CLI probes. R3's useful search reconstruction is not evidence of successful core REA analysis. R4's additional fact came from direct reading. R6's C UNKNOWN ratings reflect missing reports, not proof of architectural incapability. R7's C report is less complete on the frozen categories than B's. [E2–E7]

## 9. REA versus conventional tools

The required thirteen dimensions are compared below. Each cell is an evidence-bounded assessment; unqualified ranking and cross-case percentage aggregation are intentionally absent.

| Dimension | R1 | R2 | R3 | R4 | R5 | R6 | R7 |
|---|---|---|---|---|---|---|---|
| 1 Actual REA capability | JS graph/views | Ghidra/evidence export | Peripheral JS only; core timeout | JS/trace; no seed match | APK/JADX package/method | Browser inspect; separate preflight | WASM/JS analysis |
| 2 Architecture discovery | A30; C29 full/1 partial | A33/B37/C39 full of40 | A27/B11/C25 points of30 | A14/B14/C15 facts of16 | Core recurrence; reminder gaps | C reports absent | A16/B16/C14 FULL of30 |
| 3 Behavioral understanding | Handler failures/order | Encoding/selected validators | Search/error/dependency flow | Prompt versus enforcement | Correct recurrence; missed final alarm step | Partial drawing/history/export | Decode/resize/encode integration |
| 4 Reconstruction | Handler | Native encoder feature | Deterministic search component | Timestamp helper | Java recurrence/reminder adapter | Browser drawing replicas | Same-codec browser integrations |
| 5 Verified correctness | TAP8 each | Recomputed48 each | Recomputed40 each | Recomputed12 each | Recomputed32/44 each | Recomputed3/30/27 of36 | Exact26 positives; raw30/30/29 |
| 6 Provenance | Graph IDs; prepared dependencies | Digest/provider/export; npm pin gap | ASAR IDs; published-build deviation | Pins/manifests; patches retained | Signed release association; rebuild unproved | External artifact mapping; identity gaps in tool | WASM hashes/ABI; two bad report refs |
| 7 Coverage/uncertainty | Mocks; no SAP/HANA | Rare rules/capacity incomplete | Core coverage incomplete | No full-agent replacement | No reconstructed Android lifecycle | Invalid comparison | Shared binaries; full UI excluded |
| 8 False/unsupported conclusions | No broad advantage | Full GS1 claim unsupported | A clearAll claim incorrect | No-match is not absence |32 passes are not reminder success |3 A matches not working app |C29 raw failure not implementation fault |
| 9 Runtime reliability | MCP startup/approval recovery | Downloads/helper/dispatcher recovery | Many invalid attempts; timeout | Build/runtime/cold-start repairs | Stdin restart; C deadline recovery | Oversize payload; timer/transport defect | Signing stalls; irrelevant large summary |
|10 Time/tokens/setup | C more input; similar time | C faster observed; more input | C slower/more input | C slower than B | C slower/more input than B | Incomplete C cost not comparable | B pause/recovery; C more total input |
|11 Signing/security | Authenticode; denied boundaries | Signed controllers; native provenance separate | Signed catalogs/MXC; partial audit | Signed manifest; host not sandbox | Controller/APK signatures distinct | Signed broken code remains broken | Historical enforcement gap; signatures valid |
|12 Validity | One A/C pair | One sequential triple | Selected recoveries; one target | Pilot amendment; tiny helper | Concurrent host/recovery confounds |INVALID_COMPARISON |One ordered triple; classifier gap |
|13 REA increment | Structured graph provenance | Normalized export | Peripheral retained observations | Coverage/unknown reporting | Artifact-bound typed inspection | Browser evidence with delivery limit |Identity-bound WASM ABI packaging |

Sources for columns: E1–E7 respectively; fresh behavioral comparison V2, integrity V1/V3, signatures V4, selected invocation review V5. Numerical architecture results remain reported coordinator/model judgments.

## 10. Evidence provenance and uncertainty

**FACT:** SHA-256 detects differences against a reference digest; it does not authenticate an author. Authenticode and detached signatures provide separate identity/integrity evidence. A trusted local signer is not an external software publisher or an independent reviewer. Source commit identity, package integrity and reproducible source-to-binary equivalence are also separate claims. [V1, V3, V4]

R2's package/source provenance mismatch, R3's declared published-build revision, R5's unproven source/APK reproducibility, R6's external artifact mapping and R7's missing query references are retained rather than normalized away. Repeated provider evidence envelopes may improve discoverability while increasing context volume. Neither evidence count nor AST-node count is an accuracy measure. [E2–E7]

## 11. Operational costs and failures

The following are historical final investigator counters, checked against retained accounting and selected event streams as recorded in V5. They are not billed charges. Input includes cached input; cached input must not be added again. Resumed cumulative counters must not be summed across turns. Exact whole-mission setup/reviewer costs remain UNKNOWN. [E1–E7; V5]

| Case | A/B/C observed seconds | A/B/C input tokens, including cache | Principal comparability limit |
|---|---|---|---|
| R1 |189.303 / N/A /190.753|190805 / N/A /260453|One pair; acquisition/failures excluded |
| R2 |442.783 /396.315 /344.409|2662566 /2868578 /6511688|Provider lifecycle/cache/order differ |
| R3 |146.497 /147.468 /272.765|249996 /271586 /480277|Selected recoveries; overlapping preparation/review |
| R4 |111.769 /109.977 /145.330|796730 /736188 /982462|Readable helper; cold/warm gateway and pilot costs |
| R5 |570.44 /424.07 /652.64|2806791 /1205108 /2747100|Concurrent shared host; C recovery |
| R6 |730.918 /852.433 /1117.265|2839122 /2733201 /748720|C incomplete; timer defect; invalid comparison |
| R7 |401.29 /638.58 /397.88|1052552 /1065851 /1397722|B pause/signing recoveries; one ordered triple |

R4 total input is arithmetic from its cached and uncached columns, not an additional meter. R6's low C total cannot be sold as efficiency because required reporting did not finish. R5 has no fully passing reconstruction, making cost per fully successful reconstruction undefined for that case. No cross-case token total is used as a benchmark score.

## 12. Security and supply-chain considerations

**FACT:** Fresh inspection verifies the historical controller/catalog signatures listed in V4 against approved signer thumbprint `A98A2B0353CB7C086BEEC23A36FC4095DFB37844`; R4's detached manifest signature and trusted chain also verify. R3's matched final evaluator catalog content is checked separately. Historical unsigned/negative fixtures must not be mistaken for active signed execution paths. This audit does not execute them. [V4]

The trust chain includes vendor acquisition, package/source association, analysis engines, local controllers, sandbox mounts, model-provider transport, output delivery, evaluator correctness and retained evidence. A failure in delivery or grading can distort a tool comparison without a reconstruction defect. R6 and R7 provide direct examples. Signatures do not prevent syntax errors, incomplete analyses or a wrong test classifier. R1 additionally demonstrates that a currently valid signature does not establish continuity with an older freeze hash. [E6, E7; V3, V4]

**RECOMMENDATION:** Use narrowly exposed tools, explicit external write authority, independent output checks and retained limitations. Keep publisher signatures, local orchestration signatures and source reproducibility separate. No enterprise security certification, complete license clearance or production deployment approval follows from this portfolio. No client data, credentials or private signing keys belong in public content.

## 13. Limitations and untested claims

There is one retained valid run per arm per selected task, with no statistical replication or balanced order. Tasks, effort settings and isolation interfaces differ. Some applications expose readable code or permit shared binary engines. Scope ranges from a helper to an application slice. Models can retain prior software knowledge. Setup/recovery/host contention is only partially measured. Architecture rubrics are model/coordinator judgments, not independent human-gold measurements. The present auditor is not an independent organization. [E1–E7]

Whole-application equivalence, broad REA superiority, universal ineffectiveness, reproducible speedup, dollar savings, actual SAP/HANA/model quality, reconstructed Android E2E operation, full drawing/editor equivalence and compression-algorithm reconstruction are unsupported. The present inventory is a path-based evidence baseline; it is not immutable media or a portable signed archive. Missing external trust and final-signature evidence remains visible.

## 14. Enterprise AI Architect verdict

**Q1 — Can REA help beyond ordinary source inspection?** **FACT:** Yes, in the bounded sense of exposing native/Android/WASM/browser observations and structured retained evidence that plain source reading alone does not provide. **INFERENCE:** Incremental usefulness depends on the artifact and whether ordinary inspection or direct tools already expose the needed facts. R3's core timeout prevents a broad successful-core-analysis claim.

**Q2 — Can agents reconstruct actual behavior and failure paths?** **FACT:** They do so for several selected boundaries; they miss significant details in others. R5's alarm adjustment, R6's drawing/export failures and R7's classifier incident show why implementation, expected errors and harness correctness require separate proof. Full application reconstruction is not established.

**Q3 — What measurable value is specifically attributable to REA?** **FACT:** Structured, artifact-bound retained records, view inspection, normalized export and selected ABI/coverage information are demonstrated. Numerical per-run differences are recorded. **INFERENCE:** A causal correctness, architecture-completeness, speed or economic gain is not established against Codex/direct tools. Underlying-engine capability must not be entirely credited to REA.

**Q4 — Where does it help enterprise engineering?** **INFERENCE:** It is a useful candidate for evidence-heavy unfamiliar-artifact triage, reviewable interface discovery and preserving analysis context. Its operational maturity is mixed in this portfolio: actual successful provider calls coexist with coverage limits, startup/compatibility work, output-volume failures and recovery overhead. **RECOMMENDATION:** Select it for a concrete evidence need; retain conventional tooling and independent behavior validation. Do not infer generalized adoption economics or authorize enterprise writes from analysis capability.

## 15. Reproducibility and evidence index

All following references are private local evidence. The JSON manifest maps inventory paths and hashes. Reproduction would require original toolchains, exact inputs and separately authorized execution; this audit does not request or initiate it.

| ID | Authoritative evidence |
|---|---|
| E1 | R1 report (retained source reference: `<evidence://R1//FINAL_REPORT.md>`), its full Deliverable and evidence index; `oracle/predeclared-rubric.md`, `evidence/*-reconstruction.tap`, `evidence/paired-run-metrics.json` |
| E2 | R2 report (retained source reference: `<evidence://R2//FINAL_REPORT.md>`); `evaluator/RUBRIC_GRADING.md`, `evaluator/oracle/expected-results.json`, `evidence/validation-*-cases.json`, `evidence/experiment-accounting.json` |
| E3 | R3 report (retained source reference: `<evidence://R3//reports/FINAL_REPORT.md>`); `reports/ARCHITECTURE_FINAL_ADJUDICATION.md`, `evaluation-output/expected.json`, `evaluation-output/{final,matched-final}/behavior-results.json`, `evidence/C2_ACTUAL_REA_INVOCATION.json`, `evidence/FINAL_TOKEN_LATENCY.json` |
| E4 | R4 report (retained source reference: `<evidence://R4//FINAL_REPORT.md>`); `REFERENCE_FINDINGS.md`, `evidence/component-oracle.json`, `evidence/reconstruction-results.json`, `evidence/oracle-results.json`, `evidence/browser-results.json`, `evidence/arm-*-runtime-audit.json` |
| E5 | R5 report (retained source reference: `<evidence://R5//FINAL_REPORT.md>`); `evidence/behavioral-validation.json`, `evidence/reminder-diagnosis.json`, `evidence/architecture-grading.md`, `evidence/emulator-runtime-report.md`, `evidence/arm-comparison.json` |
| E6 | R6 report (retained source reference: `<evidence://R6//FINAL_REPORT.md>`); `frozen/expected.json`, `evaluator/arm-*-evaluation.json`, `evidence/closure-audit.json`, `evidence/corrected-investigator-metrics.json`, `evidence/final-evidence-manifest.json` |
| E7 | R7 report (retained source reference: `<evidence://R7//FINAL_REPORT.md>`); `evaluator/RUBRIC.md`, `evaluator/C29_CLASSIFICATION_AUDIT.md`, `evaluator/results/*/{actual,comparison}.json`, `evaluator/submissions/C/solution.js`, `scripts/Validate-R7-v4.ps1`, `evidence/final-metrics.json` |
| V1 | `AUDIT-INTEGRITY.json`, `AUDIT-INTEGRITY-SUMMARY.json`: fresh closure-manifest readback |
| V2 | `AUDIT-BEHAVIOR.json`: fresh retained-output comparison, with per-case results |
| V3 | `AUDIT-FROZEN-INPUTS.json`, consolidated `REA-R1-R7-EVIDENCE-MANIFEST.json`: exact inventory/freeze coverage |
| V4 | `AUDIT-SIGNATURES.json`, `AUDIT-R3-CATALOG.json`, `AUDIT-R7-OUTPUT-BYTES.json`: signature/catalog checks and stored output-byte digests |
| V5 | `AUDIT-PROVENANCE-AND-METRICS.json`: source pins, selected raw tool/usage records, cost/evidence limitations |
| V6 | `AUDIT-R6-ARCHIVE.json`: final-job identity, source-only archive inspection and absent final-package boundary |

Within this table, unqualified paths beside an E reference are relative to that experiment's authoritative root; V paths are relative to this report's directory. This convention makes every substantive result traceable without pretending the private content is already publication-cleared.

## 16. Final recommendations

**RECOMMENDATION:** Preserve all seven dispositions and the original evidence. Use the consolidated manifest and independent-review document as the current qualification index; retain historical reports as historical outcomes. Review the private LinkedIn article/post against the public-claims checklist before manual publication.

Use REA when a specific need for normalized evidence, interface discovery or coverage information warrants it. Keep direct engines available and validate reconstructed behavior against independently held expectations. Avoid a universal “accuracy” number or a performance ranking from R6. Report C29 as an observed rejection with a preserved raw grading gap.

The current authorized mission ends with these private deliverables. A cryptographically signed, portable final archive remains a separate unfulfilled gate; this report does not declare `FINAL_FREEZE_PASS`, request new experiments, or start another implementation/release phase.
