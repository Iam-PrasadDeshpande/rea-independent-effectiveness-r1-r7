ARM B recovered a React purchase-order interface, an Express agent server, a LangGraph model/tool loop, and an in-memory OData mock service. These are static code observations; no application execution or business-endpoint access occurred.

**1. Architecture**

- React mounts `App` in StrictMode (`ui.js:24859–24863`). The browser calls relative `/api/agent/...` routes.
- Express mounts the agent router at `/api/agent`, enables default CORS and JSON/form parsing, and listens on `PORT || 3001` (`server.cjs:314–319`, `385–400`).
- The server contains its own bundled agent implementation. It imports LangGraph, its prebuilt ToolNode, SAP AI SDK’s LangChain adapter, and LangChain messages (`server.cjs:31–35`).
- Agent HTTP tools target the fixed local OData base `http://localhost:3000/sap/opu/odata/sap/API_PURCHASEORDER_PROCESS_SRV/` (`server.cjs:42`).
- `mock-api.cjs` exports an Express application mounting that OData path (`mock-api.cjs:30–35`, `2330–2343`). Its launcher/listen configuration is not shown in the inspected application code.

**2. Tool registration and routing**

Four tools enter both `ToolNode(tools)` and `model.bindTools(tools)` (`agent.cjs:215–229`):

| Tool | Observed behavior |
|---|---|
| `get_purchase_order_items` | Optional plant, city and country strings; constructs combined equality filters and expands schedule lines and notes; returns fetched JSON (`agent.cjs:101–158`). |
| `calculate_overdue` | Matches unsigned digits inside `/Date(...)/`; returns timestamp minus current milliseconds (`agent.cjs:195–212`). |
| `format_response_purchase_orders` | Declares a `{data:[...]}` schema including PO identifiers, quantities, dates, overdue value, optional existing note and draft email. Its implementation body is empty (`agent.cjs:163–190`). |
| `create_note` | Requires nonempty identifiers/text and two-character language; POSTs mapped fields to `A_PurchaseOrderItemNote` (`agent.cjs:52–94`). |

The selected model is `anthropic--claude-4.5-haiku`, configured with `maxRetries: 0` (`agent.cjs:222–228`). Actual external dependency behavior and versions remain unknown.

**3. Graph control flow**

Observed graph:

`START → agent → tools → agent`, repeating while the latest model message has tool calls; otherwise `agent → END`.

`callModel` invokes the bound model with messages and returns its response as a message update. The conditional checks only `lastMessage.tool_calls?.length` (`agent.cjs:230–240`). There is no separate deterministic retrieval, overdue-filtering, approval or response-formatting node in this graph.

**4. Retrieval-to-response sequence**

1. Browser submission ignores whitespace-only input, creates a UUID thread ID, and GETs `/api/agent/trigger-agent?prompt=...` with `x-thread-id` (`ui.js:24573–24590`).
2. Server requires a nonempty string thread header, builds `{configurable:{thread_id}}`, supplies a default prompt if absent, then invokes the agent (`server.cjs:324–333`).
3. Agent adds a system message containing today’s UTC date and a human message wrapping the supplied prompt (`agent.cjs:241–247`, `300–304`).
4. **Prompt instructions**, rather than enforced graph transitions, tell the model to retrieve PO items, refine filtering from returned content, calculate overdue values, discard nonnegative items, consider existing notes, draft escalation text, and return only JSON using the formatting tool (`agent.cjs:258–279`).
5. Retrieval builds GET filters for plant/city/country and requests expanded schedule lines and notes (`agent.cjs:123–153`). The mock implements filter middleware, expansion and OData wrapping (`mock-api.cjs:263–269`, `285–302`, `331–338`).
6. Agent returns the last message’s content. Server parses it as JSON and extracts `.data`; it does not validate that result against the formatting schema (`agent.cjs:304–305`; `server.cjs:333–340`).
7. Browser renders returned rows and derives status text from `OverdueTime` (`ui.js:24742–24760`).

**Inference:** Successful tool formatting does not itself guarantee valid final JSON: the formatting callback produces no explicit output, and the server trusts the model’s final content.

Browser progress labels advance through randomized timers, not observed graph events (`ui.js:24560–24564`, `24591–24605`).

**5. Escalation-note path**

- For overdue rows with a note or draft, the UI opens a modal. Existing notes and locally marked “sent” entries become read-only (`ui.js:24760–24769`, `24796–24815`).
- Clicking Send POSTs PO, item and editable draft text with the same thread ID (`ui.js:24636–24652`, `24832–24840`).
- The server checks required body fields, then invokes `createNote2`; this helper sends a textual note-creation request back through the same model graph. It does not directly call the note HTTP helper and does not supply language (`server.cjs:302–309`, `346–364`).
- If the model calls `create_note`, that tool POSTs note JSON to the local OData endpoint (`agent.cjs:67–89`).
- The mock looks up the item, defaults text-object type/language to `F03`/`EN`, and appends the new note to its in-memory array. There is no duplicate check in this function (`mock-api.cjs:2212–2235`). Its creation middleware returns 201 and OData JSON (`mock-api.cjs:279–283`, `337–338`).
- The agent route returns `success:true` after graph completion; the browser treats a defined `result` as success and stores local sent markers (`server.cjs:365–369`; `ui.js:24653–24664`).

**Inference:** Route success and the UI’s “Email sent” text do not prove note persistence or email delivery. The observed path creates notes; no mail transport appears in the inspected application handlers. The UI success wording is at `ui.js:24847–24851`.

**6. State and checkpoints**

- A module-level `MemorySaver` checkpoints a `MessagesAnnotation` graph (`agent.cjs:238–240`).
- Caller-supplied `thread_id` selects graph context; browser searches create fresh IDs, while note submission reuses the selected search thread (`server.cjs:326–330`, `348–352`; `ui.js:24576–24588`, `24645`).
- Note continuation supplies only its new textual request (`agent.cjs:307–314`).
- Browser sent markers/content use React `Set`/`Map` state, with no persistence mechanism in the inspected application component (`ui.js:24553–24572`, `24656–24658`).
- Mock writes mutate its loaded data object (`mock-api.cjs:2188–2189`, `2231–2235`).

**Inference:** Checkpoints and mock notes appear process-local. Restart recovery, cross-instance sharing, retention limits and concurrency guarantees are unproven.

**7. Errors, retries and cancellation**

- Fetch helpers reject non-OK statuses and wrap fetch/status errors with operation-specific messages (`agent.cjs:77–93`, `142–157`). They return `response.json()` without awaiting it inside the `try`; asynchronous JSON-decoding rejection therefore bypasses those local catches.
- Timestamp parsing throws the exact invalid-format error when `.match()` returns no match (`agent.cjs:197–203`).
- The analysis route’s catch dereferences `error.cause.response.status/data` without guards. Header-validation and JSON-parsing errors need not have that shape; this catch can itself fail (`server.cjs:326–327`, `334`, `341–344`).
- Note-route failures return a 500 JSON error; missing body parameters return 400 (`server.cjs:354–358`, `370–375`).
- Browser analysis errors update visible error state; note-submit errors only log to console (`ui.js:24606–24611`, `24669–24675`).
- No explicit application retry loop, fetch timeout, abort signal or graph cancellation wiring appears in these inspected handlers. Modal Cancel closes UI state; it is not an abort operation (`ui.js:24628–24631`, `24819–24828`).
- ToolNode error policy, framework recursion limits and lower-layer retries are **UNKNOWN**, because their external implementation was not inspected.

**8. Read/write authority**

Observed capabilities include PO/note retrieval and note mutation. All four tools, including mutation, are bound to the model during analysis (`agent.cjs:215–229`).

The inspected Express setup/routes show no identity authentication, thread ownership check or server-side approval gate (`server.cjs:314–385`). The nonempty thread header is a context selector, not demonstrated authorization. UI read-only rules do not enforce backend deduplication.

**Inference:** An analysis GET can potentially lead to a write because the model has the write tool. Prompt instructions condition note creation on user intent, but deterministic compliance and human approval are not established.

Production access controls, deployment wiring, credentials, real SAP behavior, durable writes, actual model responses and external email delivery remain **UNKNOWN**.

The reconstructed timestamp helper preserves the observed unanchored match, unsigned-digit restriction, `parseInt` behavior, native failures for incompatible inputs, and lack of additional validation. Only the clock value is substituted (`agent.cjs:196–203`):

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

Every gateway request used this exact command prefix:

`& 'evidence://R4/\tools\Inspect-R4Blind.ps1' -Arm B`

The following table lists every suffix, in order. Each ran through one `functions.exec → tools.exec_command`; all exited 0.

| # | Request suffix | Output-token limit | Command wall seconds | Gateway elapsed ms |
|---:|---|---:|---:|---:|
| 1 | `-Operation inventory` | 3000 | 2.2121 | 118.4395 |
| 2 | `-Operation read -File agent.cjs -Offset 1 -Limit 300` | 11000 | 2.6553 | 4.3931 |
| 3 | `-Operation read -File agent.cjs -Offset 300 -Limit 30` | 2000 | 2.4930 | 3.0092 |
| 4 | `-Operation read -File server.cjs -Offset 1 -Limit 300` | 10500 | 2.4175 | 2.9857 |
| 5 | `-Operation read -File server.cjs -Offset 301 -Limit 120` | 5000 | 2.2218 | 4.4159 |
| 6 | `-Operation search -File ui.js -Pattern trigger-agent` | 4000 | 2.8211 | 98.5767 |
| 7 | `-Operation read -File ui.js -Offset 24420 -Limit 300` | 10500 | 2.1880 | 38.5715 |
| 8 | `-Operation read -File ui.js -Offset 24720 -Limit 190` | 7500 | 2.2002 | 53.2214 |
| 9 | `-Operation search -File mock-api.cjs -Pattern app.` | 5000 | 1.3359 | 16.5685 |
| 10 | `-Operation read -File mock-api.cjs -Offset 2150 -Limit 230` | 7000 | 2.3496 | 24.8913 |
| 11 | `-Operation read -File mock-api.cjs -Offset 1 -Limit 240` | 8500 | 1.3211 | 4.5111 |
| 12 | `-Operation read -File mock-api.cjs -Offset 260 -Limit 130` | 4500 | 1.6574 | 20.2583 |

Invocation count: **12**. Summed reported command wall time: approximately **25.87 seconds**; this excludes reasoning and reporting. Total investigation elapsed time, model token usage and monetary cost: **UNKNOWN**. Output-token limits above are request settings, not measured model consumption.