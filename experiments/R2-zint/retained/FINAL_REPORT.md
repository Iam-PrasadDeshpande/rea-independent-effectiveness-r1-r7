# REA native effectiveness R2 — completed experiment

**REA successfully performed real native Ghidra analysis. It did not improve reconstruction accuracy on this frozen workload: all three independent implementations matched 48/48 hidden cases.** REA demonstrated normalized retained evidence and portable export. A general effectiveness or productivity advantage over direct Ghidra is not established by this single matched triple.

```text
MISSION=REA_CODEX_NATIVE_EFFECTIVENESS_R2
EXECUTION_CLASS=T3
ACTIONS_USED=226
ACTIONS_REMAINING=24
TOOLCHAIN_STATUS=VERIFIED_ISOLATED_USER_SCOPED
GHIDRA_STATUS=ACTUAL_NATIVE_HEADLESS_AND_DECOMPILATION_PASS
REA_NATIVE_ANALYSIS=ACTUAL_MCP_TO_GHIDRA_AND_RETAINED_EVIDENCE_PASS
SIGNING_STATUS=APPROVED_AUTHENTICODE_WINDOWS_ORCHESTRATION_VERIFIED
REFERENCE_BUILD=PINNED_ZINT_RELEASE_BUILD_AND_60_OFFLINE_SUITES_PASS
ORACLE_STATUS=48_CASES_FROZEN_TWO_PASSES_IDENTICAL
ARM_A_RESULT=48_OF_48_EXACT;_33_FULL_7_PARTIAL_RECOVERY_FACTS
ARM_B_RESULT=48_OF_48_EXACT;_37_FULL_3_PARTIAL_RECOVERY_FACTS
ARM_C_RESULT=48_OF_48_EXACT;_39_FULL_1_PARTIAL_RECOVERY_FACTS
INCREMENTAL_REA_VALUE=EVIDENCE_RETENTION_EXPORT_DEMONSTRATED;_ACCURACY_GAIN_NOT_OBSERVED
SECURITY_FINDINGS=BOUNDARIES_PRESERVED_WITH_DECLARED_LIMITATIONS
VALIDATION_EVIDENCE=evidence/differential-validation.json;_evaluator/RUBRIC_GRADING.md
BLOCKERS=NONE_REQUIRING_OWNER_ACTION
FINAL_DISPOSITION=E2E_EXPERIMENT_EXECUTED;_BROAD_REA_SUPERIORITY_NOT_ESTABLISHED
NEXT_ACTION=NONE_AUTOMATIC;_CURRENT_MISSION_CLOSED
```

## Observed results

| Measure | A: standard inspection | B: direct Ghidra | C: REA + Ghidra |
|---|---:|---:|---:|
| Exact exit + canonical hex | 48/48 | 48/48 | 48/48 |
| Module matches / exit matches | 48 / 48 | 48 / 48 | 48 / 48 |
| Frozen facts FULL / PARTIAL | 33 / 7 | 37 / 3 | 39 / 1 |
| Architecture facts FULL / PARTIAL | 6 / 2 | 6 / 2 | 7 / 1 |
| Other behavior facts FULL / PARTIAL | 27 / 5 | 31 / 1 | 32 / 0 |
| ABSENT / INCORRECT rubric items | 0 / 0 | 0 / 0 | 0 / 0 |
| Material unsupported conclusions found in bounded review | 0 | 0 | 0 |
| Dispatched actions / reported tool failures | 28 / 0 | 28 / 0 | 28 / 0 |
| Investigation wall seconds | 442.783 | 396.315 | 344.409 |
| Input tokens, including cached input | 2,662,566 | 2,868,578 | 6,511,688 |
| Cached input tokens, subset of input | 2,527,104 | 2,721,152 | 6,221,184 |
| Uncached input tokens | 135,462 | 147,426 | 290,504 |
| Output tokens | 10,212 | 6,481 | 7,090 |
| Independent validation seconds | 12.910 | 13.620 | 13.390 |

All submissions compiled independently. Their native evaluator environment exposed only system runtimes, the submitted binary read-only, and temporary scratch: no original executable, reference source, oracle files, other submission or network. The Windows evaluator held expectations outside those mounts. Actual per-case stdout, stderr, exits and comparisons are retained in `evidence/validation-{A,B,C}-cases.json`.

The 48 cases include 40 successful encodings and eight fatal inputs, covering fixed/variable fields, B/C transitions, separators, parentheses, escapes and malformed/semantic inputs. Five successful cases have warning diagnostics. The frozen corpus contains exit 0 and 6; it does not establish capacity-error boundaries returning 5. Exact diagnostic wording was excluded by the original contract. No cases, expectations, thresholds or denominators were weakened after investigation.

The 40-fact assessment is a coordinator judgement against frozen source facts, not independent human-gold scoring. Partial items and evidence are individually explained in the grading record (retained source reference: `evaluator/RUBRIC_GRADING.md`). The implementations, not report prose alone, were reviewed. All three correctly qualify their inferred specialized AI dictionaries and omitted semantic diagnostics. Passing this corpus does not establish complete GS1 conformance or whole-Zint equivalence.

## What REA added, and what remains unproven

1. **Architecture and behavior:** all arms recovered parsing/reduction, B/C cost selection, FNC1, checksum/stop and module formatting. Native arms recovered more validator detail. C additionally inspected the date and company-prefix helpers. Evaluator-only symbols independently confirmed the reported addresses. All arms left the frontend-to-library dispatch boundary incompletely traced.
2. **Functional reconstruction:** no incremental REA benefit was observed; all three matched every hidden case. The frozen test has a ceiling effect. Broader malformed inputs, rare AIs, warning-length exceptions and capacity boundaries remain unvalidated.
3. **Evidence quality:** A has retrievable inspection and observation logs. B's direct API JSON carries program digest, provider, language, addresses and decompilation. C additionally exports normalized retained records: a 325,750-byte bundle, 12 records, Ghidra 12.1.4 and the exact target digest. All eight Evidence IDs cited by C occur in that export. Its SHA-256 is `a8d19aadeedfc8c3df4e30853b64110157a788c8286801fbc82735d913914639`. This packaging is a demonstrated REA-specific capability; traceability also exists in B.
4. **Unsupported conclusions:** none material were found within the reviewed bounded reports. Unknowns and inferred AI ranges remain visible. This is not an exhaustive claim audit or a security certification.
5. **Efficiency:** C finished sooner in this triple but consumed more total and uncached input tokens than B. Its two additional FULL facts over B depend on escape/order validation using the common CLI runner, which B also had. Those differences cannot be causally assigned to REA. B starts a read-only Ghidra API JVM per query; REA manages its own provider lifecycle. Caches, sequential order, analysis concurrency and adapter lifecycle are confounds; no general speedup is claimed.
6. **Operational overhead:** REA required a pinned source build, native dependency repair, dependency closure packaging, provider configuration and scoped RPC filtering. Ghidra/Java setup was shared by B/C. The signing-preserving Codex data dispatcher was shared by all arms. These costs are separate from investigation wall time.
7. **Reproducibility and scope:** exact pins, scripts, signatures, freezes, cases, results, usage events, logs and source-backed grading are retained. The question is one feature of a real native application, not complete application reconstruction. Vendor identity strings and prior model knowledge cannot be proven absent. There is one matched triple, no randomized order or repeated statistical sample, and no independent human grader.

**Assessment:** REA's retained evidence/export is useful and demonstrated. This POC supplies no evidence of higher functional accuracy and insufficient evidence of a general productivity advantage over Codex with direct Ghidra. Any broader comparison would need a separately authorized experiment with repeated tasks, matched adapter lifecycles and a harder independently frozen corpus. That work was not started.

## Baselines, provenance and native execution

- Zint **2.16.0**, commit `55541e139e62b9209b71cd9b0ba9010cec28b1d9`, official source [zint/zint](https://github.com/zint/zint/tree/55541e139e62b9209b71cd9b0ba9010cec28b1d9). Release GCC 15.2.0 build, static barcode library, frontend on, Qt/PNG/external GS1 Syntax Engine off, vendor tests on. All **60 applicable offline CTest suites passed**. External decoder/engine checks are not claimed. LICENSE/README are retained in evaluator storage.
- Investigator ELF SHA-256: `08af4075a1fd8b2fff65967435512582afbb52f2daf4a7971f025a888eff7ad4`. All three received identical stripped bytes. The unstripped reference stayed evaluator-only.
- REA **6.5.0**, commit `742b6f587f3c4ef1b8212e7376d6f3a305b194dc`, [pinned official source](https://github.com/morluto/rea/tree/742b6f587f3c4ef1b8212e7376d6f3a305b194dc). The clean tracked source was built successfully. Its production runtime closure contains 173 packages; local archive SHA-256 `0cd487c0a3e96d27d5476837bd3a924fd29873f2a80893445008b50be4f7474b`.
- The npm 6.5.0 registry signature was verified against the registry key. The retained published provenance payload names a different commit, so the published runtime was not substituted for the owner's pin. Sigstore verification is not claimed. Registry authenticity does not prove source equivalence.
- Ghidra headless imported, analyzed and saved an actual ELF smoke target; the direct API decompiled a native function. Real REA MCP initialize/open/procedure analysis/retained-view/export calls succeeded. Subsequent isolated preflights and C's genuine REA native calls used the actual Zint target. These are execution proofs, not catalog visibility. The broad doctor reports optional-provider gaps; the scoped Ghidra provider was healthy. Unresolved external/debug-link and isolated-hostname diagnostics remain retained.

| Official distribution | SHA-256 |
|---|---|
| [Ghidra 12.1.4, build 20260921](https://github.com/NationalSecurityAgency/ghidra/releases/download/Ghidra_12.1.4_build/ghidra_12.1.4_PUBLIC_20260921.zip) | `ddac49f903da9d5bac833e5cc79395098b9c33cfd3279be5f31bd00387d2d4db` |
| [Temurin JDK 21.0.11+10 Linux x64](https://github.com/adoptium/temurin21-binaries/releases/download/jdk-21.0.11%2B10/OpenJDK21U-jdk_x64_linux_hotspot_21.0.11_10.tar.gz) | `4b2220e232a97997b436ca6ab15cbf70171ecff52958a46159dfa5a8c44ca4de` |
| [CMake 3.31.8 Linux x64](https://github.com/Kitware/CMake/releases/download/v3.31.8/cmake-3.31.8-linux-x86_64.tar.gz) | `630615d8e98ac33eba7fbe472626dff5c899c85af3c024585ae109166a6909d0` |
| [Ninja 1.13.1 Linux](https://github.com/ninja-build/ninja/releases/download/v1.13.1/ninja-linux.zip) | `0830252db77884957a1a4b87b05a1e2d9b5f658b8367f82999a941884cbe0238` |

Complete archive equality and ext4 copy readback were verified before use; actual version invocations are retained. Runtime location: `/home/RESEARCH_USER/rea-r2-20261017`. No global package installation or permanent PATH change was used.

## Signing, isolation and recovery

All 18 custom PowerShell scripts are Authenticode-valid against approved `CN=AI-SAP Local Code Signing`, thumbprint `A98A2B0353CB7C086BEEC23A36FC4095DFB37844`; execution uses `AllSigned` and self-verification. No key was created, imported, exported or replaced. No custom unsigned Linux interpreter script was generated or executed. Direct Java Ghidra invocation avoids the vendor shell launcher. The read-only Java API helper is a compiled application, not a GhidraScript; its source and JAR hashes are retained. Submitted C++ programs are compiled native artifacts. Authenticode is not claimed to sign Linux files. Vendor REA launch code is pinned upstream code with separately recorded provenance/integrity, not a custom signed Linux launcher.

Recovery completed within scope:

- Truncated/timed-out long downloads were recovered with bounded short ranges, per-range length checks and final whole-file hashes. A parallel curl exit alone was insufficient; verification caught partial ranges. Failed attempts were retained.
- Slow NTFS extraction/runtime work moved to the isolated ext4 workspace. No engineering dependency was replaced and no destructive cleanup was used.
- A missing REA Windows native build helper was repaired from the existing verified vendor artifact; the pinned source build then passed. The smaller production closure replaced an abandoned full-development archive attempt; its partial data remains retained.
- A nullable MCP argument schema failure was corrected to the valid empty argument object; its failed RPC attempt is retained.
- The first Codex attempt had no callable tools: all available models require Code Mode, deliberately disabled for signing compliance. It made no target observations and produced no implementation. A fresh, identical signing-preserving recovery was used for A/B/C: Codex returns JSON action data; signed Windows PowerShell validates and dispatches literal RPC arguments to the actual MCP servers and resumes only that arm's session. No model text is executed as JavaScript or shell code. The original and additive freezes are both retained. See the amendment (retained source reference: `HARNESS_AMENDMENT.md`).
- Resumed Codex usage events contain cumulative session totals. Initial driver sums are retained as raw diagnostic data but excluded from final totals. The final counters above are corroborated by the official [0.160.0 JSONL event processor](https://github.com/openai/codex/blob/rust-v0.160.0/codex-rs/exec/src/event_processor_with_jsonl_output.rs), whose `usage_from_last_total` emits `usage.total`.

Representative separately measured setup components: pinned REA build 60.04 s; REA production archive 126.76 s; old runtime doctor 137.26 s; native ELF smoke analysis 16.85 s; reference build 25.05 s; two-pass oracle capture 31.74 s. Download retries, partial transfers, ext4 copies/extraction and harness preflights retain their own records. These overlapping/cold/warm measurements are **not additive** and are not an invented total setup wall time. Signing overhead, coordinator tokens and monetary cost were not independently measured; dollar cost is UNKNOWN. The invalid Codex attempt consumed 30,827 input tokens (20,096 cached), 513 output and 23.506 s, separately excluded from valid arms.

Tool processes used isolated network namespaces, read-only target/tools and private scratch. Negative probes denied outside reads, traversal, artifact writes, network, shell commands and unsigned script-file creation. The three valid Codex threads were fresh and independent; only their own thread was resumed. No source, oracle or peer findings were supplied. Host load averages were sampled before/after each sequential run: A 0.63/0.25, B 0.23/0.15, C 0.15/0.19 (one-minute averages). This does not prove exclusive resources or exclude transient contention.

R1's closure hash remains `1200DF0705CB930AE6FCA980FC899BE16F0AD6E8DB2F8AABCB839B73DB7068F1`. R1 and other POC workspaces were not modified. No global Codex MCP configuration, private credential extraction, SAP/BTP access, production operation, publication, push, merge or deployment was performed. Signature checks establish identity/integrity, not independent review of every generated line; this was not a host-hardening audit.

## Retained deliverables

- Original and additive experiment freeze manifests, frozen common prompt, public examples, 48 hidden cases, two-pass oracle and the 40-fact source rubric.
- Three reports, independent C++ sources and binaries in `arms/{A,B,C}/output`; independently rebuilt copies under `evaluator/submissions`.
- Real native gate logs/RPC, per-arm CLI/native RPC, Codex turn events, provider evidence export and evaluator symbol crosscheck.
- Differential case results, source-review result, rubric grading, corrected token accounting, setup components, signature audit, action ledger and closure integrity checks under `evidence`.
- Signed setup, controlled CLI, REA proxy, data dispatcher, evaluator and closure scripts. Native scratch/projects remain in the isolated ext4 workspace; no cleanup was performed.

The action ledger retains the inherited mission counter and adds root tool invocations, 84 actual investigator-dispatched actions, and two conservatively charged failed discovery attempts. Deterministic subprocesses inside signed orchestration are execution evidence rather than extra model tool actions. The final evidence manifest records hashes and sizes of the retained review artifacts. No follow-on gate or new experiment is active.
