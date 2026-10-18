# Independent baseline evaluation - oracle only

Frozen contract: oracle/predeclared-rubric.md. Evaluated baseline/output/investigation.md against the supplied compiled artifact; original SAP source was previously inspected by this evaluator. No investigator was given this evaluation or source/oracle content. No submitted reconstruction was executed. REA arm has not been evaluated.

Verdict: 30 RECOVERED, 0 PARTIAL, 0 MISSED, 0 INCORRECT on the frozen 30 items. This is a raw item count for one exploratory arm, not a success percentage, runtime qualification or comparative result. E2/E3 are recovered through the report's explicit awaited reconstruction plus its common catch; no fixture proof is inferred. E4 combines the reported awaited order and explicit rollback limitation.

Locator convention: report L means baseline/output/investigation.md line; S/A/Z mean baseline/artifact/srv/mail-insights-service.js, srv/utils/ai-core.js, srv/schemas.js. Artifact locators are checked static source support, not runtime observations.

| Item | Rating | Report quote and locator | Artifact support |
|---|---|---|---|
| C1 | RECOVERED | "a SAP CAP `cds.ApplicationService`" L14 | S13 |
| C2 | RECOVERED | "registers seven handlers" including "`addMails`" L14 | S22-28 |
| C3 | RECOVERED | "SAP AI SDK Azure chat/embedding clients" L16; "Chat clients request `gpt-4o`" L47 | S2,616-621; A3-21 establishes AI Core provisioning |
| C4 | RECOVERED | "embedding clients request `text-embedding-3-small`" L47 | S623-628 |
| C5 | RECOVERED | "`ChatPromptTemplate -> chat client -> OutputFixingParser`" (arrow typography normalized) L51; "structured parser is built from a Zod schema" L53 | S342-354 |
| C6 | RECOVERED | "Persistence uses service entities `Mails` and `Translations`" L18 | S132-147,307-311,596-612 |
| C7 | RECOVERED | "provisioning creates it ... creates model configurations ... starts deployments" L20 | A8-27 |
| R1 | RECOVERED | "Its `init()` ... registers seven handlers" including addMails L14 | S19-28 |
| R2 | RECOVERED | "Await `generateInsights(mails, rag)`" L27 | S134 |
| R3 | RECOVERED | "General insight extraction, potential-response generation, language detection, and embedding generation ... awaited together using `Promise.all`" L37 | S274-279 |
| R4 | RECOVERED | "Results are matched by ID using `find`" L38 | S280-295 |
| R5 | RECOVERED | "Translation runs after all four branches finish" L39 | S296-297 |
| R6 | RECOVERED | "Await insertion ... into **`ai.db.Mails`**" L28 | S134-136 |
| R7 | RECOVERED | "Await selection ... using the generated IDs" L29 | S136-147 |
| R8 | RECOVERED | "`rag` selects a context-oriented system prompt ... retrieval finishes before ... response-model invocation" L68; "`getClosestResponses(id)`" L72 | S400-405 |
| R9 | RECOVERED | "SQL reads the focus mail's **stored embedding**" L73; "A second query fetches ... response bodies" L74 | S571-587,596-612 |
| R10 | RECOVERED | "derives an AI resource-group identifier, and starts deployment preparation without awaiting it" L14 | S29-30 |
| W1 | RECOVERED | "Read `{ mails, rag }` from `req.data`" L26 | S133 |
| W2 | RECOVERED | "Missing or null IDs are assigned using `crypto.randomUUID()`" L36 | S271-273 |
| W3 | RECOVERED | "Embeddings use only `mail.body` ... stores its bracketed string representation" L47 | S454-460 |
| W4 | RECOVERED | "English-matching mails copy ... other mails invoke a translation chain" L39 | S486-515; Z4 |
| W5 | RECOVERED | "Decorate selected mails' actions" L30; "`deps.actionDescriptions[suggestedAction.value] || \"\"`" L121 | S159-168 |
| W6 | RECOVERED | "For a fresh ID absent from the database, the focus subquery has no row ... insertion occurs only after response generation and translation finish" L77, explicitly Inference | S134-136,274-279,403,603-610 |
| W7 | RECOVERED | "`additionalInformation` and `sender` are supplied to `invoke`, but the template contains neither placeholder" L89 | S381-411 |
| W8 | RECOVERED | "returns database-selected rows rather than the generated batch" L32 | S137-168 |
| E1 | RECOVERED | "returns `req.error()` with the same message" and Error prefix L43; exact reconstruction L128-130 | S170-172 |
| E2 | RECOVERED | "`const mailBatch = await deps.generateInsights(mails, rag);`" L108 before INSERT L110, enclosed common catch L127-130 | S131-136,170-172. Static failure path is faithfully represented, not fixture-asserted in report |
| E3 | RECOVERED | "`await deps.insert(\"ai.db.Mails\", mailBatch);`" L110 before SELECT L112, enclosed common catch L127-130 | S136-147,170-172. Same static-evidence rule |
| E4 | RECOVERED | "There is no explicit transaction or rollback in this handler; CAP's surrounding transaction behavior is unknown" L32 plus awaited INSERT then SELECT L110-114 | S136-147,170-172 |
| E5 | RECOVERED | "A rejected `Promise.all` does not cancel already-started work" L92 | S274-279 and per-mail Promise.all branches; no cancellation operation coded |

## Traceability and unsupported conclusions

Primary traceability sample is the fixed 30 claims above, one per rubric item. Definitions: supported means report contains a matching proposition or faithful executable representation, cited artifact exists, locator supports it, and static/inference/unknown status is appropriate. Unsupported means evidence is absent or does not establish the claim. Incorrect means artifact contradicts the claim. Counts: 30 checked, 30 supported, 0 unsupported, 0 incorrect. Multiple propositions in a rubric row are evaluated as the frozen item, not added denominator units.

Material overclaim check: 0 unsupported runtime/product guarantees identified. The report expressly withholds HTTP/auth, database constraints, transaction rollback, vector dimensions, parser internals, actual model behavior, delivery and production-readiness guarantees (L14,18,32,47,53,94,141). Unavailable CDS/model facts are not penalized. AdditionalInformation omission, new-mail RAG focus risk, schema mismatch and provisioning race are source-derived findings, not fixture-proven live defects. The report correctly labels key inferences and preserves uncertainty about exploitability and runtime behavior.

Supplementary traceability spot checks beyond the fixed denominator: schema mismatch L90 is supported by S532-563 and Z81-99; provisioning enumeration-failure risk L96 is supported by A65-73 combined with A10-16; no email delivery L94 is supported by S200-221; normal-object action lookup L91 is supported by S164 and constants object. These checks do not expand the 30-item recovery denominator. No material incorrect claim found in these checks.

## Measurements and limits

Coordinator runtime evidence/baseline-investigation.result.json reports exit 0, 2026-10-17T16:43:50.1483844Z to 16:46:59.4490983Z, elapsed 189302.5842 ms. This is full arm wall time. Report L143's 109 seconds is expressly an interior clock interval excluding final amendment/response; do not substitute it for full arm wall time.

The final turn.completed event in evidence/baseline-investigation.stdout.log reports input_tokens 190805, cached_input_tokens 157312, cache_write_input_tokens 0, output_tokens 7910, reasoning_output_tokens 584. Preserve provider field semantics and do not invent cost or sum overlapping token fields. The report's statement that token usage was not supplied was made before final turn telemetry; use coordinator telemetry for comparison. CPU and memory remain UNKNOWN.

Model/reasoning runtime identity was not independently established from files read for this evaluation; coordinator must confirm matched settings before paired interpretation. Report states seven orchestration calls/ten nested tools, 17 counting both layers; count actual events consistently across both arms rather than mixing invocation layers.

Behavioral reconstruction B1-B8: PENDING coordinator's signed, network-denied differential oracle. Inspection of report reconstruction is not a substitute for running it. No REA conclusion or comparative advantage is established by this baseline review.
