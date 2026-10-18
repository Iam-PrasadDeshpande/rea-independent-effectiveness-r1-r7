# Frozen evaluation contract before investigator sessions

Hypothesis: REA may improve evidence-backed recovery of the architecture and bounded addMails workflow from ordinary compiled JavaScript. A single matched pair is exploratory and cannot establish general effectiveness or causal certainty.

Both arms receive byte-identical JS artifacts and one identical prompt. Source maps, original TS/CDS, SAP documentation, source URL, reference checkout and oracle are withheld. Same Codex binary, explicitly fixed gpt-6.1-sol with low reasoning (the locally listed default model/settings), no inherited conversation, user config or memories, maximum 20 investigator tool calls. REA availability is the treatment. Actual runtime-selected model/settings must be checked before comparing; unmatched settings invalidate the pair.

Record model/provider and reasoning setting where observable, binary/runtime versions, all tool calls/failures, elapsed wall time and reported token usage. CPU/memory unavailable values remain UNKNOWN. Count failed/aborted sessions as failed/aborted. Do not replace them silently. No success percentages or claims about statistical significance. No repetitions authorized beyond this bounded pilot pair without checking remaining mission budget.

Score each item RECOVERED, PARTIAL, MISSED or INCORRECT with a supporting quote and evidence. Do not retrofit the denominator after reports arrive.

Components (7): C1 CAP ApplicationService; C2 event registration including addMails; C3 AI Core-backed chat client; C4 embedding client; C5 prompt templates and structured/fixing parsers with Zod schemas; C6 CAP persistence/query layer; C7 startup provisioning helper.

Relationships (10): R1 init registers addMails handler; R2 onAddMails -> generateInsights; R3 generateInsights launches four branch methods concurrently; R4 branch outputs merge by mail.ID; R5 merge -> addTranslatedInsights; R6 success -> INSERT ai.db.Mails; R7 INSERT -> SELECT inserted IDs; R8 preparePotentialResponses -> getClosestResponses when rag true; R9 getClosestResponses -> similarity SQL then response SELECT; R10 init -> getAppName/checkOrPrepareDeployments (unawaited latter).

Workflow facts (8): W1 accepts req.data.mails/req.data.rag; W2 assigns missing UUIDs; W3 embedding body only and serialized vector; W4 matching language copies translations, otherwise translates; W5 descriptions attached after readback with empty fallback; W6 new-mail RAG depends on a persisted focus ID before insertion (source-derived risk, not HANA execution proof); W7 additionalInformation passed to invoke but absent from prompt placeholders; W8 public handler returns queried rows rather than raw generation results.

Error facts (5): E1 handler catches and calls req.error with Error: prefix; E2 generation rejection prevents INSERT; E3 INSERT rejection prevents SELECT; E4 SELECT rejection occurs after insertion and no explicit rollback is coded in this handler; E5 Promise.all rejects without explicit cancellation of siblings.

Unsupported conclusions: list individually; especially HTTP/auth guarantees unavailable from JS-only package, proven transaction rollback, actual email sending, genuine historical RAG correctness, live AI quality and production readiness.

Traceability: for each material report claim check source/tool reference exists, locator supports the claim, and inference/unknown classification is accurate. Report raw checked claim counts and unsupported/incorrect counts with definitions.

Reconstruction behavioral oracle: run each submitted reconstructAddMails under identical synthetic dependency fixtures: (B1) success and generate->insert->select order, (B2) exact insertion target and ID list, (B3) known/unknown action descriptions, (B4) absent suggestedActions, (B5) generation rejection, (B6) insertion rejection, (B7) readback rejection, (B8) empty batch. All submitted executable modules must be Authenticode signed and verified before execution; run them only in a network-denied sandbox. These tests evaluate a bounded orchestration reconstruction, not the full SAP runtime or stochastic quality.

Reference scope: actual compiled class with real LangChain/Zod parsing tested under fake AI/provisioning/persistence boundaries. New-mail RAG focus absence remains source-derived; the offline RAG adapter returns [] and does not validate HANA SQL. Projection exclusion is faked by SELECT adapter. Build required local dependency/setup workarounds, all disclosed in final evidence.
