# REA + Codex SAP GenAI Mail Insights POC R1

**Disposition: bounded POC completed. This single matched pair did not demonstrate a recovery advantage from REA. Both reconstructed handlers passed the same eight differential scenarios. No SAP/BTP or production execution was performed.**

| Observed result | Codex baseline | Codex + REA, valid treatment |
|---|---:|---:|
| Fully recovered frozen rubric items | 30 | 29 |
| Partially recovered items | 0 | 1 |
| Missed / incorrect rubric items | 0 / 0 | 0 / 0 |
| Differential handler scenarios passed | 8 of 8 | 8 of 8 |
| Coordinator wall time | 189.303 s | 190.753 s |
| Reported input tokens, cumulative | 190,805 | 260,453 |
| Reported cached input tokens | 157,312 | 197,248 |
| Input minus cached input | 33,493 | 63,205 |
| Reported output tokens | 7,910 | 7,334 |
| Reported reasoning output tokens | 584 | 238 |
| Shell command executions | 5 | 6 |
| Successful REA MCP calls | 0 | 2 |

The partial item was E5: the REA report discussed concurrency and missing cancellation but did not explicitly recover that a rejected Promise.all leaves already-started sibling work running. The baseline stated that consequence. This is a small completeness distinction, not an executed application defect. Both reports recovered all seven components, ten call relationships and eight workflow facts; baseline recovered all five error facts, while REA recovered four fully and one partially.

The valid REA arm used 69,648 more cumulative input tokens and 29,712 more input-minus-cached tokens. Its wall time was 1.451 seconds longer. These are observations from one pair, not stable performance estimates. Cached input is a subset of input; reasoning output is reported separately as returned by Codex and must not be blindly added to output. No dollar cost, process-family CPU total or peak memory was measured.

## Final status fields

```text
MISSION=REA_CODEX_SAP_GENAI_MAIL_INSIGHTS_POC_R1
SAP_REFERENCE_COMMIT=5ec5febdea5354004534bc3e5140dd62df7488be
REA_REFERENCE_COMMIT=742b6f587f3c4ef1b8212e7376d6f3a305b194dc
WORKSPACE=evidence://R1/
SAP_BUILD_STATUS=PASS_PREPARED_SOURCE_JS_UI_BUILD; MTAR_NOT_ATTEMPTED; NO_SAP_DEPLOYMENT
REA_CAPABILITIES=STATIC_JS_GRAPH_AND_RETAINED_FACT_INSPECTION_OBSERVED_VIA_MCP; VERSION_6.5.0
OFFLINE_TESTABILITY=19_REFERENCE_CHECKS_PASS; EXTERNAL_AI_AND_PERSISTENCE_FAKED
BLIND_ISOLATION=VERIFIED_FOR_DECLARED_ARTIFACT_SOURCE_ORACLE_PEER_AUTH_HOME_AND_NETWORK_BOUNDARIES
BASELINE_RESULT=30_RECOVERED_OF_30; 8_OF_8_DIFFERENTIAL_SCENARIOS_PASS
REA_RESULT=29_RECOVERED_1_PARTIAL_OF_30; 8_OF_8_DIFFERENTIAL_SCENARIOS_PASS
BEHAVIORAL_VALIDATION=PASS_BOUNDED_HANDLER_DIFFERENTIAL; NO_LIVE_SAP_HANA_OR_LLM_QUALITY_CLAIM
EVIDENCE_QUALITY=STRONG_FOR_PINNED_SOURCE_BUILD_AND_BOUNDED_FIXTURES; EXPLORATORY_FOR_COMPARATIVE_EFFECTIVENESS
MEASURED_EFFECTIVENESS=NO_RECOVERY_ADVANTAGE_OBSERVED_IN_ONE_MATCHED_PAIR; SIMILAR_TIME; HIGHER_REA_INPUT_TOKENS
SIGNING_STATUS=VALID_AUTHENTICODE_FOR_CUSTOM_EXECUTABLES; EXISTING_APPROVED_CERTIFICATE; NO_KEY_CREATION_OR_EXPORT
BLOCKERS=NONE_FOR_THIS_BOUNDED_POC; LIVE_SAP_HANA_AND_PRODUCTION_VALIDATION_OUT_OF_SCOPE
NEXT_ACTION=RETAIN_REA_AS_OPTIONAL_ANALYSIS_TOOL; CONSIDER_A_SEPARATELY_AUTHORIZED_HARDER_BLIND_CORPUS_BEFORE_DEFAULT_ADOPTION
```

## Source, build and architecture

The real SAP repository was shallow-cloned and pinned before implementation. Source inspection covered CAP services, AI Core preparation, prompts, structured/fixing parsers, embeddings, HANA similarity SQL, schemas, persistence and build/deployment scripts. The source inventory contains 200 tracked files. Both reference repositories have no tracked source diff at closure.

REFERENCE_FINDINGS.md (retained source reference: `REFERENCE_FINDINGS.md`) contains the original architecture map and file/line evidence. In outline: UI5/approuter/XSUAA → CAP OData service → addMails → four parallel AI/embedding branches → merge by mail ID → translation → INSERT → SELECT/translation expansion → action descriptions. Startup separately contains potentially mutating AI Core preparation and was never run.

The prepared original application completed its own `npm run build`: CDS/HANA artifact generation, UI5 packaging and TypeScript JavaScript output. The final build used the final prepared dependency environment and exited zero. This is not an untouched-install result:

- Standard dependency installation failed an optional-peer conflict. A separately logged --legacy-peer-deps install succeeded; no source dependency declarations were upgraded.
- The original repository has no committed lockfile. Resolved root/UI locks and the actual installed lock are retained as evidence.
- Documented ts-node was installed locally at 10.9.2, without saving a source manifest change or installing globally.
- Disabled lifecycle scripts omitted the @cap-js/cds-types link. Its narrow setup script was reviewed and explicitly run. A later no-save install removed that link, so it was restored before the successful final build.
- Current zod-to-json-schema resolution was incompatible with pinned Zod 3.24.2. The local environment pins zod-to-json-schema 3.24.1. This changes dependency resolution, not the sample's business implementation, and is material to reproducibility.
- The sample's existing UI copy step acquired shx 0.4.0 through npx. That unpinned step is a reproducibility limitation.

MTAR packaging, HDI deployment, application startup, bindings and remote SAP provisioning were not attempted. The emitted JS remains ordinary production-build output with its original behavior and hazards; a synthetic replica was not substituted.

## Reference oracle and behavioral proof

The signed reference oracle loads the actual compiled class and actual Zod/LangChain parsing. It substitutes deterministic AI responses and persistence/provisioning boundaries. The 19 passing checks cover schema transforms/limits, language paths, ID merge, body embedding serialization, empty RAG context handling, unused additional-information interpolation, exhausted malformed-output repair, translation/AI/embedding failures, persistence/readback failures, empty batches and two sandbox assertions.

Material source findings include:

1. New-mail RAG queries a persisted focus UUID before insertion. A genuinely new UUID has no persisted focus row. This is source-derived; the empty SQL adapter does not prove real HANA retrieval behavior.
2. additionalInformation is passed to invoke but absent from the response template's placeholders. A rendered-prompt fixture confirms its synthetic value is absent.
3. Category/score descriptions are stronger than actual validators: string categories remain open and numeric fields are rounded without the described bounds.
4. Native init may create AI Core resource groups, configurations and deployments. It is not a harmless offline startup.

The independently frozen reconstruction oracle compares each submitted module with the original compiled handler under identical injected dependencies. Both pass B1-B8: normal order/return value, insertion target/selected IDs, action descriptions/fallback, absent actions, generation failure, insert failure, readback failure and empty batch. Submitted code was extracted as data, digitally signed, verified, then executed only in a network-denied test sandbox.

The fixtures do not prove CAP HTTP routing or authorization, real projection enforcement, HANA vector persistence/similarity, transaction rollback, translation-composition compatibility, actual email delivery, model answer quality or production readiness. The projection exclusion in the reference test is implemented by the fake SELECT adapter. Direct handler tests bypass CAP lifecycle and middleware. No real customer data was used.

## Isolation, signing and REA authority

Two fresh Codex exec sessions used byte-identical seven-file packages: five emitted JavaScript modules, a minimal ESM descriptor and a synthetic canary. Source maps, original TypeScript/CDS, SAP documentation, source URL, original Git repository and hidden oracle were withheld. No prior conversation, user/project instructions or memories were inherited. Both requested gpt-6.1-sol with low reasoning through Codex 0.160.0.

Each Linux permission profile successfully read its artifact and wrote its output, while probes denied the original source, oracle, peer output, authentication home and artifact writes. DNS-based external access failed; direct-IP curl failed with Operation not permitted. Both artifact trees still match their frozen hashes. These are declared-boundary checks, not a universal security certification.

REA was served through a signed persistent Node launcher and bubblewrap, with read-only REA/runtime and artifact mounts, private temporary scratch, a cleared environment and no network. Only four static tools were exposed. After a real approval denial, the owner explicitly approved a mission-only permission setting for those tools. The required-server gate and a successful-invocation readiness gate remained enabled. Global MCP configuration was not edited.

The valid treatment actually completed analyze_javascript_application and inspect_analysis_view. Its evidence reports 6 relevant files, 5 parsed JS files, 42,411 text bytes, 3,230 AST nodes, zero parse failures, partial graph coverage and 946 semantic unknowns. These are analyzer measurements, not architecture-recovery accuracy. The independent nonblind MCP smoke test is separate from the investigator result.

Custom executable files and submitted modules were signed with the existing AI-SAP local signing certificate and verified as Valid before trusted execution. No signing key was created, replaced or exported. The matching REA 6.5.0 Windows native artifact was restored from its published package and checked against its manifest digest; that hash is integrity evidence, not a digital signature or proof of an exact source-build provenance chain.

## Failed attempts and recovery

The following are retained and excluded from the valid paired comparison:

- Initial assigned REA run: no REA tools were exposed; it completed as an invalid treatment in 158.792 seconds. Its returned input/output token counts were 139,423 / 6,652. The report, events and signed but unexecuted submission are archived under oracle/invalid-rea-attempt1.
- Required-server probes failed MCP initialization. A signed persistent launcher recovered startup; the precise original process-lifecycle cause was not independently proven.
- A visibility probe found the tools but invocation was denied by approval_policy=never. A retry begun after visibility alone was stopped at that approval failure, exit 15, after 106.819 seconds. It is archived under oracle/invalid-rea-attempt2. Visibility was insufficient; the final runner requires a successful actual call.
- The owner then explicitly approved the four scoped static tools. A fresh readiness probe completed an actual analyzer invocation, followed by the valid fresh treatment session.
- In both valid investigations, broad output was truncated and focused numbered reads recovered the relevant sections. The final treatment's two MCP calls and all recorded shell commands succeeded.

Valid-run wall times exclude acquisition, build preparation, login, failed attempts, readiness probes and human recovery. Those excluded costs are material adoption overhead, not zero. No monetary cost or complete process-family CPU/memory accounting was collected.

## Evidence quality and architectural recommendation

Independent source/oracle review checked all 30 predeclared rubric items with report/source locators. No material unsupported runtime guarantees were found in either valid report. The REA report's parent/summary/view evidence IDs and artifact digest match its actual MCP events. Architecture scoring and differential correctness remain separate evidence lanes.

This sample's readable, lightly transformed JS and small package create a ceiling effect: the baseline already recovered every scored item. REA added structured graph provenance and retained inspection, but this pair did not show a recovery or latency advantage and consumed more input tokens. A hosted model alias, model stochasticity, sequential order, cache state, different tool schemas and the single pair limit causal/general conclusions. No significance, universal percentage gain or enterprise production benefit is claimed.

**Architectural disposition: keep REA available as an optional specialist tool; this pilot does not justify making it the default for reconstructing this sample.** A separately authorized future evaluation could use a larger, bundled/minified corpus with enough genuine call-relationship ambiguity to discriminate tools, repeated paired runs and complete cost/recovery measurements. That follow-on gate was not started.

## Deliverable and evidence index

| Deliverable | Location |
|---|---|
| Original architecture and source/capability review | REFERENCE_FINDINGS.md |
| Source inventory / build inventory | evidence/sap-source-inventory.json; evidence/sap-build-inventory.json |
| Final original build result/logs | evidence/BuildFull.result.json; BuildFull.stdout.log; BuildFull.stderr.log |
| Actual prepared dependencies | evidence/sap-runtime-dependencies.json; sap-resolved-package-lock.json; sap-ui-resolved-package-lock.json; sap-installed-package-lock.json |
| Compiled JS investigator packages | baseline/artifact; rea-arm/artifact |
| Frozen protocol and oracle | EXPERIMENT_PROTOCOL.md; oracle/predeclared-rubric.md; oracle/reconstruction-tests.js; evidence/experiment-freeze-manifest.json |
| Reference test evidence | oracle/fixture-tests.js; evidence/fixture-tests.tap; fixture-tests.exit.txt |
| Baseline investigation and review | baseline/output/investigation.md; oracle/baseline-evaluation.md |
| Valid REA investigation and review | rea-arm/output/investigation.md; oracle/rea-evaluation.md |
| Differential evidence | evidence/baseline-reconstruction.tap; rea-arm-reconstruction.tap; corresponding result.json files |
| Run measurements and treatment calls | evidence/paired-run-metrics.json; baseline-investigation.stdout.log; rea-arm-investigation.stdout.log |
| Isolation / artifact integrity | evidence/*-isolation-*.result.json; paired-artifact-postcheck.json; investigator-artifact-manifest.json |
| Signing | evidence/signature-manifest.json; signed custom scripts and oracle/submissions |
| Invalid attempts | oracle/invalid-rea-attempt1; oracle/invalid-rea-attempt2 |

Reproduction requires the recorded toolchains and prepared dependency sequence, plus the preserved locks. Launchers use this POC's absolute paths; relocating them requires path edits and re-signing. Retain the oracle outside investigator-readable roots. Do not run startup/deploy/HDI/provisioning commands as part of reproduction.
