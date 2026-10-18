ARM B recovered a React UI, Express agent service, LangGraph tool loop, and mutable in-memory OData mock. This is static inspection evidence; execution, deployment, model compliance, and actual write success remain unverified.

1. **Architecture.** The UI renders React into `root` (`ui.js:24859-24863`). The Express service mounts `/api/agent`, defaults to port 3001, and enables CORS and body parsing (`server.cjs:314-319,385-400`). The agent uses external LangGraph, SAP AI SDK, LangChain messages/tools, and Zod dependencies, confirmed by successful AST inspection. The configured model is `anthropic--claude-4.5-haiku` (`agent.cjs:215-229`). Business-tool HTTP calls target a fixed localhost:3000 OData base (`agent.cjs:47`). The supplied mock mounts that service path (`mock-api.cjs:2343`); its listening process/port configuration is unknown.

2. **Tool registration and routing.** Four tools share both `ToolNode(tools)` and `model.bindTools(tools)`: `get_purchase_order_items`, `calculate_overdue`, `format_response_purchase_orders`, and `create_note` (`agent.cjs:57,114,167,206,215-229`). Zod schemas constrain tool inputs. Retrieval accepts optional plant/city/country; note creation requires nonempty identifiers/text and a two-character language (`agent.cjs:59-64,116-120`). The formatter callback is empty: its schema describes output arguments, but the callback does not construct the final response (`agent.cjs:163-189`).

3. **Graph control flow.** Successful AST inspection directly identified graph construction, model invocation, tool binding, and entrypoint calls. The graph is `START → agent`; the last message having tool calls routes to `tools`, otherwise `END`; `tools → agent` repeats (`agent.cjs:230-240`). This is model-selected orchestration, not a deterministic business pipeline. No explicit business-step ordering or custom iteration limit appears in that graph definition.

4. **Retrieval to response.** UI search generates a UUID thread ID and sends an encoded prompt to `GET /api/agent/trigger-agent` (`ui.js:24573-24590`). The route requires `x-thread-id`, defaults the prompt, invokes the agent, parses final content as JSON, and extracts `.data` (`server.cjs:324-340`). Retrieval constructs combined OData equality filters and expands schedule lines and existing notes, then GETs and returns JSON (`agent.cjs:123-153`). Filter values are interpolated inside OData string literals without observed apostrophe escaping (`agent.cjs:127-137`).

   The system prompt instructs the model to retrieve, refine results, call the timestamp tool per item, discard non-overdue items, draft escalations, and return JSON (`agent.cjs:258-279`). These are instructions, not proven execution guarantees. The server performs JSON parsing but no observed final-result schema validation (`server.cjs:334`). UI processing stages advance through random delays, independently of actual agent milestones (`ui.js:24591-24605`).

5. **Escalation-note path.** UI opens the model-produced draft for editing, then POSTs PO, item, and edited text using the existing thread ID (`ui.js:24623-24626,24636-24652`). The server checks required fields and invokes `createNote2`, which adds a natural-language note request to the same graph (`server.cjs:346-364`; `agent.cjs:307-314`). This request does not supply language; the model must produce the tool’s required language argument.

   `create_note` POSTs mapped fields to `A_PurchaseOrderItemNote` (`agent.cjs:67-89`). The mock finds the item, defaults text-object type/language, and appends the note (`mock-api.cjs:2212-2235`). The UI marks success when the HTTP response reports success and a defined result, then displays “Email sent” (`ui.js:24653-24664,24847-24851`). Observed code demonstrates note creation, not email transport. Model-returned content is not independent write readback.

6. **State and checkpoints.** A module-level `MemorySaver` checkpoints the messages graph (`agent.cjs:238-240`). Both HTTP entrypoints pass the client-provided `thread_id` (`server.cjs:329-330,351-352`). UI starts a new thread for each search and reuses it for notes (`ui.js:24576-24588,24645`). Thread ownership/authentication checks are not present in the inspected route code. Exact checkpoint retention, concurrency behavior, and restart recovery depend on external library/runtime behavior and remain unknown.

   Mock data is returned directly from an in-memory collection; note creation mutates nested arrays (`mock-api.cjs:2188-2194,2231-2235`). No persistence or duplicate check appears in this creation function. UI sent markers and content are React `Set`/`Map` state, not durable deduplication (`ui.js:24570-24571,24656-24658`). Existing or locally sent notes become read-only in the modal (`ui.js:24800-24815,24832-24840`).

7. **Errors, retries, cancellation.** Model construction explicitly sets `maxRetries: 0` (`agent.cjs:222-228`). GET/POST tool fetches reject non-OK statuses and wrap caught errors (`agent.cjs:77-93,142-157`). They return `response.json()` without awaiting it inside the `try`; asynchronous JSON-decoding rejection therefore need not receive that wrapping. URL construction and some input work also precede the `try`.

   The analysis route’s catch dereferences `error.cause.response` without guards, so ordinary missing-header or JSON-parse errors can produce a secondary failure (`server.cjs:326-327,334,341-343`). The note route returns 400 for missing payload fields and 500 for caught failures (`server.cjs:353-375`). UI search displays caught errors; note submission errors only go to the console (`ui.js:24606-24611,24669-24675`). No explicit fetch retry, timeout, abort signal, or server disconnect cancellation is present in inspected request paths. Modal Cancel closes UI state; it is not an observed backend cancellation mechanism (`ui.js:24628-24631,24823-24828`). External-library defaults remain unknown.

8. **Read/write authority.** Retrieval GETs are read operations; note POSTs mutate mock state (`agent.cjs:143-148,78-84`; `mock-api.cjs:2234`). All four tools—including the write tool—are bound during initial analysis (`agent.cjs:215-229`). Consequently, the GET analysis route can reach a write-capable graph; its HTTP method does not enforce read-only behavior. Prompt instructions ask whether the user requested a note but provide no deterministic approval gate (`agent.cjs:295-297`). The UI offers an explicit Send interaction, but backend routes do not enforce that the UI interaction occurred. No authentication middleware is observed in the inspected server setup/routes (`server.cjs:317-385`). Production authorization, actual SAP connectivity, human approval, idempotency, and deployment security are unknown.

The timestamp helper uses an unanchored positive-digit SAP-date match, decimal parsing, and `timestamp - now`; it does not clamp future dates or validate finite/range limits (`agent.cjs:195-209`). Nonmatching strings receive the explicit error; unsupported input types retain the native `.match` failure boundary. Reconstruction, unexecuted:

```javascript
exports.calculateOverdue = function(sapTimestamp, nowMs) {
  const match = sapTimestamp.match(/\/Date\((\d+)\)\//);
  if (!match) {
    throw new Error(`Invalid SAP timestamp format: ${sapTimestamp}`);
  }
  const sourceTimestamp = parseInt(match[1], 10);
  const diff = sourceTimestamp - nowMs;
  return diff;
};
```

Complete gateway transcript: every request used `& 'evidence://R4/\tools\Inspect-R4Blind.ps1'` through `functions.exec → tools.exec_command`, with the following exact arguments. All exited successfully.

| # | Arguments | Gateway elapsed ms | Command wall seconds |
|---|---|---:|---:|
| 1 | `-Arm B -Operation inventory` | 27.713404 | 9.524858 |
| 2 | `-Arm B -Operation ast -File agent.cjs` | 527.769418 | 3.676726 |
| 3 | `-Arm B -Operation read -File agent.cjs -Offset 45 -Limit 300` | 2.835657 | 1.821797 |
| 4 | `-Arm B -Operation ast -File server.cjs` | 398.255060 | 2.103876 |
| 5 | `-Arm B -Operation read -File server.cjs -Offset 313 -Limit 100` | 7.977160 | 2.227652 |
| 6 | `-Arm B -Operation search -File ui.js -Pattern trigger-agent` | 23.566854 | 1.299862 |
| 7 | `-Arm B -Operation read -File ui.js -Offset 24490 -Limit 300` | 25.372988 | 1.564655 |
| 8 | `-Arm B -Operation read -File ui.js -Offset 24800 -Limit 110` | 65.079840 | 1.580006 |
| 9 | `-Arm B -Operation ast -File mock-api.cjs -Pattern app` | 543.019613 | 2.265907 |
| 10 | `-Arm B -Operation read -File mock-api.cjs -Offset 2230 -Limit 180` | 13.569026 | 3.126719 |
| 11 | `-Arm B -Operation read -File mock-api.cjs -Offset 2160 -Limit 78` | 7.618373 | 1.368970 |

Invocation count: **11**. Successful AST operations: **3**. Sum of reported command wall times: **30.561026 seconds**; gateway elapsed times: **1,642.777393 ms**. These exclude reasoning and inter-call time. Full investigation elapsed time: **UNKNOWN**. Total model token use and monetary cost: **UNKNOWN**. No target execution, endpoint access, file writes, browsing, memory loading, or peer-output inspection occurred.