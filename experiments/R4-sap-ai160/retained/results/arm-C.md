ARM C recovered a React UI → Express agent service → LangGraph/model/tool loop → local OData mock service. The implementation can write PO notes; its UI “Email sent” message does not establish email delivery. Findings below are static observations, with inferences and unknowns identified explicitly.

1. Architecture and entry points

- `ui.js:24552-24590` contains the React application and analysis request. It calls relative `/api/agent/trigger-agent`, carrying a newly generated UUID in `x-thread-id`.
- `server.cjs:314-319,385-400` creates Express, enables default CORS and body parsing, mounts `/api/agent`, and listens on `process.env.PORT || 3001`.
- The server embeds its own agent implementation (`server.cjs:31-310`); it does not import the supplied `agent.cjs`. The standalone agent exports `startPurchaseOrderAgent` and the model-mediated note helper (`agent.cjs:30-36,307-314`).
- Tool HTTP traffic targets the hard-coded local service `http://localhost:3000/sap/opu/odata/sap/API_PURCHASEORDER_PROCESS_SRV/` (`agent.cjs:47`).
- `mock-api.cjs:2330-2355` exports an Express mock application mounted at that OData path. No listener is present in those application initialization lines. How the mock and UI are hosted or proxied is UNKNOWN.

2. Tool registration and routing

Four tools are both bound to the model and supplied to `ToolNode` (`agent.cjs:215-229`; equivalent server code at `server.cjs:210-224`):

| Tool | Observed contract and behavior |
|---|---|
| `get_purchase_order_items` | Optional plant, delivery city and country filters; GETs `A_PurchaseOrderItem` with `$filter` and `$expand=to_ScheduleLine,to_PurchaseOrderItemNote` (`agent.cjs:101-153`). |
| `calculate_overdue` | Requires a nonempty string; extracts unsigned decimal milliseconds from an SAP timestamp substring and returns source timestamp minus current clock (`agent.cjs:195-210`). |
| `format_response_purchase_orders` | Declares an object containing `data`, with typed PO fields, numeric delivery/overdue values, optional `ExistingNote`, and `DraftEmail`. Its callback is empty (`agent.cjs:163-190`). It does not itself serialize the final answer. |
| `create_note` | Requires nonempty PO, item and text, plus exactly two language characters; POSTs mapped JSON to `A_PurchaseOrderItemNote` (`agent.cjs:52-94`). |

The model is configured as `anthropic--claude-4.5-haiku`, with `maxRetries: 0` (`agent.cjs:222-228`).

3. Graph control flow

Observed topology is START → `agent`; `agent` routes to `tools` whenever the last message has nonempty `tool_calls`, otherwise END; `tools` returns to `agent` (`agent.cjs:230-240`).

`callModel` forwards messages to the bound model and returns its response as a message update (`agent.cjs:234-236`). Consequently, tool choice, ordering and completion are model-driven. The graph does not encode a mandatory retrieval → calculation → formatting sequence or a separate approval node.

4. Retrieval-to-response sequence

The intended sequence is expressed in the system prompt:

- Retrieve candidate PO items with available filters, then refine them using returned content.
- Call `calculate_overdue` for each item; negative means overdue.
- Discard non-overdue items, analyze existing notes, and draft escalation text.
- Call the formatting tool and return only JSON shaped as `{"data":[...]}` (`agent.cjs:258-279`).

These are instructions to the model, not deterministic postprocessing. The agent returns the last message’s content (`agent.cjs:300-305`). The HTTP endpoint parses that content using `JSON.parse(...).data` and returns it as `purchaseOrders`, without validating the final object against the formatting schema (`server.cjs:332-340`).

The mock retrieves its in-memory dataset, then applies expansion, filtering, sorting and selection middleware before wrapping the result as OData `{d:{results:...}}` (`mock-api.cjs:2188-2190,2253-2268,263-269,331-338`). Equality filtering compares strings strictly (`mock-api.cjs:197-198`). Its filter splitting uses literal `"and"` rather than a full expression parser (`mock-api.cjs:291-298`).

The UI’s processing steps advance through randomized timers; they are not backend progress events (`ui.js:24560-24564,24591-24604`).

5. Escalation-note path

- The UI opens `DraftEmail` in an editor (`ui.js:24623-24626`).
- “Send” POSTs PO number, item and edited text to `/api/agent/create-po-item-notes`, reusing the analysis thread ID (`ui.js:24636-24652`).
- The endpoint checks only presence/truthiness of those three body fields and invokes `createNote2` (`server.cjs:346-364`).
- `createNote2` creates a natural-language request and invokes the same graph; it does not directly execute the write tool and supplies no language field itself (`server.cjs:302-309`).
- If the model calls `create_note`, that tool performs the OData POST (`agent.cjs:67-89`).
- The mock finds the PO item, defaults text-object type/language where absent, and appends the note with `.push(newNote)` (`mock-api.cjs:2212-2235`). No duplicate check is present in this function.
- The UI marks the operation successful when HTTP succeeds and `data.success` is true with `data.result !== undefined`; it then displays “Email sent at” (`ui.js:24653-24664,24847-24851`).

There is no email transport in this inspected path. A model response is not independently verified as a note write: the endpoint reports success after graph completion, and the UI performs no OData readback.

6. State and checkpoints

- The graph uses module-level `MemorySaver` and `MessagesAnnotation` (`agent.cjs:238-240`).
- HTTP requests select a checkpoint thread using the caller-supplied `x-thread-id` (`server.cjs:326-330,348-352`).
- Each UI search creates a fresh UUID; note submission reuses the current one (`ui.js:24576-24588,24640-24645`).
- UI sent markers and edited content live in React `Set`/`Map` state (`ui.js:24570-24571,24656-24658`). Existing or locally marked notes make the editor read-only and hide Send (`ui.js:24800-24840`).
- Mock notes mutate the module’s in-memory dataset (`mock-api.cjs:2212-2235`).

Inference: these explicit storage choices provide process/component-lifetime state, with no durable storage adapter visible. Exact dependency checkpoint merging, concurrency handling, retention and restart behavior remain UNKNOWN.

7. Errors, retries and cancellation

- Fetch helpers reject non-OK responses and wrap fetch/status failures (`agent.cjs:77-92,142-156`). They return `response.json()` without awaiting it inside the `try`; inference: a later JSON parsing rejection can bypass those local catch blocks.
- Model client retries are explicitly disabled (`agent.cjs:228`). No explicit fetch retry, timeout, abort signal or compensation is present in these helpers.
- The analysis endpoint’s catch assumes `error.cause.response.status/data` exist (`server.cjs:341-343`). A locally thrown missing-header error or JSON parse error need not have that shape, so the catch can itself fail. Runtime handling depends on external Express behavior.
- Note endpoint failures return HTTP 500 with an error message; missing body fields return 400 (`server.cjs:354-358,370-375`).
- UI search errors become visible state; note submission failures are only logged to the console (`ui.js:24606-24611,24669-24675`).
- UI Cancel closes the editor; it does not cancel an in-flight fetch or graph execution (`ui.js:24628-24631,24824-24828`). No cancellation propagation is visible in the inspected request paths.
- External `ToolNode` error behavior, model-provider failure handling, graph recursion defaults and dependency retries remain UNKNOWN.

8. Read/write authority

The same model and graph receive both retrieval and note-writing tools on analysis and note requests (`agent.cjs:215-240,304,313`). The prompt asks the model to check whether the user requested a note (`agent.cjs:295-297`); this is not a deterministic authorization check.

No authentication or ownership check is visible in the server middleware/routes (`server.cjs:314-385`). A thread header is a checkpoint selector, not proven identity. UI read-only controls do not enforce backend authorization or deduplication.

Tool fetches use JSON headers without an explicit authorization or CSRF token (`agent.cjs:78-85,143-149`). The mock emits a fake CSRF token and cookie (`mock-api.cjs:2336-2343`). Actual production authentication, authorization and SAP connectivity are UNKNOWN. No target application or business endpoint was executed.

REA evidence and limitations

One successful `rea` invocation analyzed `agent.cjs` as inert JavaScript:

- Analysis parent evidence: `ev_1ddc8158ee962d2d59cc2810aa7a7202b67ce36fa5c7cf3f77ad41c7a2d5f140`.
- It reported one parsed JavaScript file, zero parse failures, partial application/semantic coverage, four unselected application files, four application unknowns and 425 semantic unknowns.
- Its `create_note` feature trace returned `no-match`, with zero matched seeds. REA explicitly says this is not evidence of feature absence.
- I therefore used REA to establish analysis scope and uncertainty, and direct line reads for the concrete tool/graph conclusions. REA did not prove runtime execution or end-to-end behavior.

Timestamp helper reconstruction

This preserves the observed unanchored, unsigned-digit match, `parseInt` conversion, subtraction and error boundary (`agent.cjs:196-203`). It adds no input coercion, range validation or timezone support. Non-string inputs retain native `.match` failures. The original tool callback is asynchronous; this requested standalone helper exposes the calculation directly.

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

Complete gateway transcript

Every request used this exact command prefix, followed by the arguments listed below:

`& 'evidence://R4/\tools\Inspect-R4Blind.ps1' -Arm C`

| # | Request arguments | Gateway-reported elapsed ms |
|---|---|---:|
| 1 | `-Operation inventory` | 19.931271 |
| 2 | `-Operation rea -File agent.cjs` | 19503.671745 |
| 3 | `-Operation read -File agent.cjs -Offset 1 -Limit 300` | 3.377461 |
| 4 | `-Operation read -File agent.cjs -Offset 298 -Limit 30` | 4.356039 |
| 5 | `-Operation read -File server.cjs -Offset 1 -Limit 300` | 3.654274 |
| 6 | `-Operation read -File server.cjs -Offset 301 -Limit 110` | 3.526003 |
| 7 | `-Operation search -File ui.js -Pattern trigger-agent` | 682.761606 |
| 8 | `-Operation read -File ui.js -Offset 24475 -Limit 300` | 52.473700 |
| 9 | `-Operation search -File mock-api.cjs -Pattern A_PurchaseOrderItemNote` | 10.120514 |
| 10 | `-Operation read -File mock-api.cjs -Offset 2060 -Limit 300` | 9.226147 |
| 11 | `-Operation read -File mock-api.cjs -Offset 1 -Limit 300` | 4.149619 |
| 12 | `-Operation read -File mock-api.cjs -Offset 291 -Limit 75` | 103.591186 |
| 13 | `-Operation read -File ui.js -Offset 24775 -Limit 155` | 92.645856 |

Gateway invocations: **13**. Three session waits collected the pending REA result; these were orchestration, not additional gateway requests. REA’s measured analysis latency was approximately **19.504 seconds**. Full investigation wall time was not independently measured: **UNKNOWN**. Model token usage and monetary cost: **UNKNOWN**. No files were written.