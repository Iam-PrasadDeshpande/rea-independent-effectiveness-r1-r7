# Independent valid REA-assisted evaluation - oracle only

Frozen rubric: oracle/predeclared-rubric.md. Report: rea-arm/output/investigation.md. Invalid attempts 1 and 2 are excluded and were not inspected for this score. No submitted reconstruction or target startup was executed by this evaluator. Source/oracle information was not disclosed to investigators.

Verdict: 29 RECOVERED, 1 PARTIAL, 0 MISSED, 0 INCORRECT. The PARTIAL is E5: concurrency and absence of cancellation are reported, but the specific failure consequence that rejecting Promise.all leaves already-started siblings running is not stated. Baseline explicitly states that consequence. E2/E3 receive the same standard as baseline: faithful explicit sequential awaits within the common catch recover the bounded handler failure paths without requiring a prose restatement or claiming fixture proof.

Report L locators refer to rea-arm/output/investigation.md; M/A/S refer to its compiled mail-insights-service.js, utils/ai-core.js and schemas.js evidence. The service artifact SHA-256 is identical between valid arms: CD20667253636F4C673D4349C262C41A1406A1F41835CE47955D66C4378DE63E. Source support below uses the same compiled locators independently checked during baseline review and supplied source review.

| Item | Rating | Report quote/location | Compiled support |
|---|---|---|---|
| C1 | RECOVERED | "`MailInsights extends cds.ApplicationService`" L9 | M13 |
| C2 | RECOVERED | "registers seven handlers" including addMails L9 | M22-28 |
| C3 | RECOVERED | "SAP AI SDK LangChain chat/embedding clients" L10; chat model L13; AI Core provisioning L24 | M2,616-621; A8-21 |
| C4 | RECOVERED | "embedding: `text-embedding-3-small`" L13 | M623-628 |
| C5 | RECOVERED | "`ChatPromptTemplate -> chat model -> OutputFixingParser`" (arrow typography normalized) L54; StructuredOutputParser/Zod L56 | M342-354 |
| C6 | RECOVERED | "CDS query globals operate on service entities" L12 | M130-147,306-311,596-612 |
| C7 | RECOVERED | "Preparation lists resource groups ... attempts creation ... creates ... configurations ... deployments" L24 | A8-27 |
| R1 | RECOVERED | "`init()` ... registers seven handlers" L9 | M19-28 |
| R2 | RECOVERED | "await `generateInsights(mails, rag)`" L28 | M134 |
| R3 | RECOVERED | "Start these four branches" L30-37, all four named | M274-279 |
| R4 | RECOVERED | "Join results by the **first matching mail ID**" L38 | M280-295 |
| R5 | RECOVERED | "After all four branches complete, prepare translations" L39 | M296-297 |
| R6 | RECOVERED | "Await insertion into `'ai.db.Mails'`" L40 | M135-136 |
| R7 | RECOVERED | "Await a fresh selection ... filtered by generated batch IDs" L41 | M137-147 |
| R8 | RECOVERED | "With truthy `rag`, each response task first awaits `getClosestResponses(mail.ID)`" L71 | M400-405 |
| R9 | RECOVERED | focus embedding/cosine search then "Fetch those mails' response bodies" L75-82 | M571-612 |
| R10 | RECOVERED | "resource-group name comes from ... xsappname"; "launches deployment preparation without awaiting it" L24 | M29-30; A33-40 |
| W1 | RECOVERED | "Read `{mails, rag}` from `req.data`" L28 | M133 |
| W2 | RECOVERED | "`mail.ID ??= crypto.randomUUID()`" L29 | M271-273 |
| W3 | RECOVERED | "from `[mail.body]` ... bracketed string" L61 | M454-461 |
| W4 | RECOVERED | "Truthy language matches copy ... Other mails send those fields ... for translation" L62 | M486-515 |
| W5 | RECOVERED | selected-row mutation L42; "`ACTIONS[action.value] || \"\"`" L44 | M159-168 |
| W6 | RECOVERED | "for an ID absent from the database, the focus subquery has no row and the inferred context is empty" L88 | M134-136,274-279,403,603-610 |
| W7 | RECOVERED | "Invocation supplies `additionalInformation` and `sender`, but neither has a placeholder" L99 | M381-411 |
| W8 | RECOVERED | "return the selected array itself" L42 | M137-168 |
| E1 | RECOVERED | "logs `Error: ${error?.message}` and returns `req.error()` with that same message" L46 | M170-173 |
| E2 | RECOVERED | awaited generation L120 before insertion L122 with catch L138-140 | M131-136,170-172 |
| E3 | RECOVERED | awaited insertion L122 before selection L124 with catch L138-140 | M136-147,170-172 |
| E4 | RECOVERED | "No explicit transaction or rollback ... framework ... unknown" L48 and insertion-before-selection L122-126 | M130-173 |
| E5 | PARTIAL | branches "overlap" and use "Promise.all" L37; "no explicit ... cancellation" L110 | M274-279 and per-mail Promise.all: uncancelled sibling work after rejection is not expressly recovered in the report |

## Traceability and claim discipline

Fixed traceability sample: the 30 rubric claims above. Definitions match baseline evaluation: supported means matching report statement or faithful reconstruction, existing locator, supporting code and correct static/inference/unknown scope. Unsupported means the evidence does not establish the statement; incorrect means contradiction. Counts: 30 checked, 29 fully supported/recovered, 1 partly recovered, 0 unsupported material assertions, 0 incorrect. E5 is incomplete recovery, not a false claim. The denominator remains 30.

Four supplementary checks, outside the recovery denominator: wrong translation-schema selection L100 is supported by M538 and S81-99; detached provisioning/enumeration failure L102 is supported by M29-30 and A10-27,48-73; no email implementation L20/110 is supported by M212-220; schema-description versus validator distinction L106 is supported by S17-77. All four are supported, with 0 unsupported and 0 incorrect claims in this supplementary sample.

REA provenance spot checks: both MCP calls analyze_javascript_application and inspect_analysis_view have completed events with server=rea and null error. Returned tool evidence contains all three IDs quoted at report L151-153 and the artifact digest L154. Report L156's six relevant files, five parsed JS files, 42411 bytes, 3230 AST nodes, zero parse failures, 946 semantic unknowns and 8/16 retained-page coverage match returned tool evidence. These are tool-reported counts, not proof of runtime reconstruction. Report clearly preserves partial coverage and unknowns.

No material unsupported product/runtime guarantee found. New-mail RAG and template omission remain static source-derived findings; neither is claimed as HANA/provider execution proof. Report withholds routes/auth, entity/vector metadata, transaction guarantees, actual model behavior and production readiness. No penalty for missing withheld CDS facts.

## Measurements and interpretation

evidence/rea-arm-investigation.result.json records exit 0; start 2026-10-17T17:05:52.5152923Z, end 17:09:03.2564498Z, elapsed 190753.2123 ms. Final turn.completed event reports input_tokens 260453, cached_input_tokens 197248, cache_write_input_tokens 0, output_tokens 7334, reasoning_output_tokens 238. Preserve original telemetry field semantics; no inferred cost, CPU or memory values. Report's 29-second clock interval explicitly is not total task duration.

Relative to baseline coordinator wall time 189302.5842 ms, valid REA arm took 1450.6281 ms longer. This single exploratory pair shows no recovery advantage on the frozen items: baseline 30 recovered; REA 29 recovered plus 1 partial. Do not generalize effectiveness, statistical significance or causality. Both arms used ordinary readable compiled JS with retained meaningful identifiers/comments; this is not evidence for minified/obfuscated artifact recovery.

Coordinator states both valid arms requested gpt-6.1-sol with low reasoning. Runtime-selected model identity remains a coordinator evidence gate before interpreting matched settings as confirmed. Invalid no-REA and interrupted retries remain retained failures/invalid treatment attempts, not silently replaced successes or part of this valid-arm score.

B1-B8 REA reconstruction differential: PENDING coordinator's signed, network-denied execution. Baseline 8/8 is coordinator-reported, not independently rerun here. No submitted reconstruction was executed during this review.
