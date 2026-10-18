ARM A completed a static reconstruction using **12 gateway invocations**. No target execution, endpoint access, file writes, web browsing, source repositories, or peer outputs were used. Findings below are source observations unless explicitly labeled inference.

1. **Architecture.** A React browser interface calls an Express agent server. The server contains its own bundled LangGraph agent implementation and listens on `PORT` or `3001`. Its tools target an OData-shaped service hardcoded to `http://localhost:3000/sap/opu/odata/sap/API_PURCHASEORDER_PROCESS_SRV/`. A separate mock Express application implements that service using bundled mutable data. References: `ui.js:24552–24590`, `server.cjs:26–35`, `server.cjs:42`, `server.cjs:393–400`, `mock-api.cjs:2188–2235`, `mock-api.cjs:2330–2343`. **Unknown:** actual launch topology, frontend proxy/static hosting, installed external dependency versions, and model credentials/reachability.

2. **Tool registration and routing.** Four tools are registered in both `ToolNode` and `model.bindTools`: `get_purchase_order_items`, `calculate_overdue`, `format_response_purchase_orders`, and `create_note`. The configured model is `anthropic--claude-4.5-haiku`, through SAP’s `OrchestrationClient`, with `maxRetries: 0`. References: `agent.cjs:215–229`; equivalent server bundle: `server.cjs:210–224`.
   - Retrieval accepts optional plant, delivery city, and country filters. It builds conjunctive OData equality expressions and expands schedule lines and existing notes: `agent.cjs:101–153`.
   - Calculation accepts a nonempty string through its tool schema: `agent.cjs:195–212`.
   - Formatting declares a typed `data` array containing PO identifiers, quantity, address, delivery timestamp, overdue duration, optional existing note, and draft email. **Its implementation body is empty**; it does not itself serialize or return the supplied data: `agent.cjs:163–190`.
   - Note creation requires nonempty order/item/text and a two-character language: `agent.cjs:52–66`.

3. **Graph control flow.** The graph is `START → agent`; the agent invokes the model with accumulated messages. A last message containing tool calls routes to `tools`, followed by another `agent` invocation. Otherwise it ends. There are no separate deterministic retrieval, overdue-filtering, drafting, approval, or output-validation nodes. References: `agent.cjs:230–240`. **Inference:** the prompt’s business sequence depends on model choices; tool availability and graph routing do not enforce that sequence.

4. **Retrieval-to-response sequence.** The browser generates a new UUID for each search and sends it as `x-thread-id` with a GET request. The server requires that header, uses it as the checkpoint thread identifier, invokes the agent, parses the final message as JSON, and extracts `.data`. References: `ui.js:24573–24590`, `server.cjs:324–340`.
   
   The system prompt directs the model to retrieve broadly where necessary, refine matches itself, call the overdue tool per item, discard non-overdue items, draft escalation emails using existing notes, call the formatting tool, and return only `{"data":[...]}`. An irrelevant request should return an empty array. These are **instructions**, not independently verified outcomes. References: `agent.cjs:241–305`, particularly `258–277`. The browser renders returned data without an observed schema guard and derives its status badge from `OverdueTime < 0`: `ui.js:24718`, `ui.js:24742–24760`.

5. **Escalation-note path.** The browser opens an editable draft email modal; “Send” posts the selected PO identifiers and edited text to `/api/agent/create-po-item-notes`, reusing the search thread identifier. References: `ui.js:24623–24651`, `ui.js:24832–24840`. The endpoint checks only truthiness of those three body fields and invokes the graph with a new natural-language request. It does **not** directly call the note-writing function: `server.cjs:302–309`, `server.cjs:346–364`. That request omits language, although the tool schema requires it: `agent.cjs:63`, `agent.cjs:307–313`. **Inference:** language must come from model selection/context or tool execution will need to handle missing arguments.

   If selected, the tool POSTs JSON containing `PurchaseOrder`, `PurchaseOrderItem`, `PlainLongText`, and `Language` to `A_PurchaseOrderItemNote`: `agent.cjs:67–89`. The mock verifies that the item exists, defaults text-object type/language, and appends a note to its in-memory array. It does not check for duplicate notes: `mock-api.cjs:2212–2235`. Successful mock creation returns an OData envelope and HTTP 201: `mock-api.cjs:263–269`, `279–283`, `337–338`.

   The UI labels this “Email sent,” but the inspected path creates an item note; no mail transport appears in that path. The success UI requires only the endpoint’s `success` and a defined `result`, not a separately verified persisted note: `ui.js:24653–24664`, `ui.js:24847–24852`. The endpoint sets `success: true` after the graph returns without checking for a note identifier: `server.cjs:365–369`.

6. **State and checkpoint behavior.** A module-level `MemorySaver` checkpoints the message graph: `agent.cjs:239–240`. Both server endpoints pass a caller-supplied thread ID: `server.cjs:329–330`, `351–352`. **Inference:** reuse permits conversational continuity between search and note request; process restart loses this in-memory checkpoint state. No durable checkpoint backend, cleanup policy, authenticated ownership check, or concurrency isolation implementation is shown in the inspected application code.

   UI state includes a local `Set` of sent items and `Map` of sent content. Existing or locally sent notes become read-only in the modal: `ui.js:24570–24571`, `24656–24658`, `24760–24769`, `24796–24815`. This is UI behavior, not backend deduplication. Mock data mutation is likewise in memory: `mock-api.cjs:2188–2194`, `2231–2235`.

7. **Errors, retries, and cancellation.**
   - Tool HTTP calls check `response.ok`, log errors, and rethrow prefixed errors. Neither call supplies a timeout, abort signal, or retry loop: `agent.cjs:77–93`, `142–157`.
   - Both use `return response.json()` without `await` inside their `try`. **Inference from JavaScript semantics:** an asynchronous JSON-decoding rejection can bypass that local catch.
   - Model client configuration explicitly disables its configured retries; external library internals were not inspected: `agent.cjs:222–228`.
   - The search endpoint’s catch directly dereferences `error.cause.response.status/data`, although its own missing-header error and JSON parse errors need not have that shape. **Inference:** error handling can itself throw. References: `server.cjs:326–327`, `334`, `341–344`.
   - Note endpoint failures return HTTP 500 with the message; missing required body values return 400. Mock unknown-item creation returns 400; missing single entities return 404: `server.cjs:354–358`, `370–375`; `mock-api.cjs:271–277`, `2285–2302`.
   - Browser search failures become visible error state; note submission failures only log to the console in the inspected handler: `ui.js:24597–24611`, `24669–24675`.
   - Browser progress steps are random timed animations, not graph telemetry: `ui.js:24591–24604`.
   - The modal’s Cancel closes UI state; it does not abort a request. No abort mechanism appears in these handlers: `ui.js:24628–24631`, `24636–24676`, `24819–24840`.
   - Graph recursion limits, ToolNode error conversion, external-client timeout behavior, and recovery semantics remain **UNKNOWN**.

8. **Read/write authority.** The same model receives both read and write tools on every graph invocation: `agent.cjs:215–229`. The search prompt itself permits note creation when requested: `agent.cjs:295–297`. **Inference:** GET `/trigger-agent` is capable of reaching the write tool; it is not structurally read-only.

   The agent server installs permissive default CORS and checks a supplied thread ID, but the inspected routing code shows no authentication, role authorization, ownership verification, approval interrupt, or write-specific policy gate: `server.cjs:317–319`, `324–377`. The UI’s Send click is an interaction step, not proof that all write paths require human approval. Tool fetches contain JSON headers but no authorization or CSRF token: `agent.cjs:78–85`, `143–149`. The mock emits a fake CSRF token and routes note POSTs without validating that token: `mock-api.cjs:2314`, `2336–2343`. These observations do not establish production SAP authority or production security.

The timestamp helper below reproduces the observed calculation body with `nowMs` substituted for the clock. Its regex is unanchored, matches unsigned decimal digits only, and accepts a matching substring within a larger string. It preserves the explicit invalid-format error and native `.match` failures; it adds no coercion, range checks, or schema validation. The original tool callback is async and has a separate Zod input schema (`agent.cjs:195–210`); this requested standalone function reproduces the calculation synchronously.

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

Every gateway request used the command prefix `& 'evidence://R4/\tools\Inspect-R4Blind.ps1' -Arm A`. The table lists all subsequent arguments in order. Latencies are observed gateway `elapsedMs` and `exec_command.wall_time_seconds`, respectively.

| # | Request arguments | Gateway ms | Command seconds |
|---|---|---:|---:|
| 1 | `-Operation inventory` | 24.839 | 3.798 |
| 2 | `-Operation read -File agent.cjs -Offset 1 -Limit 300` | 139.939 | 2.798 |
| 3 | `-Operation read -File agent.cjs -Offset 300 -Limit 30` | 4.235 | 1.345 |
| 4 | `-Operation read -File server.cjs -Offset 1 -Limit 300` | 3.540 | 1.495 |
| 5 | `-Operation read -File server.cjs -Offset 301 -Limit 101` | 2.622 | 1.551 |
| 6 | `-Operation search -File ui.js -Pattern trigger-agent` | 28.123 | 1.272 |
| 7 | `-Operation read -File ui.js -Offset 24380 -Limit 300` | 26.229 | 1.315 |
| 8 | `-Operation read -File ui.js -Offset 24679 -Limit 210` | 88.674 | 1.300 |
| 9 | `-Operation search -File mock-api.cjs -Pattern app.` | 4.038 | 1.242 |
| 10 | `-Operation read -File mock-api.cjs -Offset 2100 -Limit 255` | 3.838 | 1.264 |
| 11 | `-Operation read -File mock-api.cjs -Offset 1 -Limit 260` | 18.432 | 1.429 |
| 12 | `-Operation read -File mock-api.cjs -Offset 259 -Limit 175` | 3.144 | 1.191 |

Invocation count: **12**. Target/runtime latency: **UNKNOWN**. End-to-end investigation wall time: **UNKNOWN**. Model token usage and monetary cost: **UNKNOWN**. Production correctness, deterministic model compliance, actual note creation, and mail delivery were not tested.