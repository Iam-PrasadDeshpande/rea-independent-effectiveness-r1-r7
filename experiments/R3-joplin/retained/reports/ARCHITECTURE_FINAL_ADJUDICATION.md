# R3 independent architecture and citation adjudication

Completed for A, validB-recovery6 andvalidC-recovery2. Existing A37report-only audit preserved; supplemental evidence.json audits are separate.

|Arm|Architecture|Report supported/all|Evidence.json supported/all|
|---|---:|---:|---:|
|A|27/30|32/37|44/45|
|B|11/30|19/19|22/22|
|C|25/30|48/49|41/44|

A report:4inexact,1unsupported. A supplemental:1ambiguous. B:all enumerated citations supported,with substantial architecture gaps explicitly unknown. C report:1inexact. C supplemental:2inexact,1ambiguous. Denominators retain every listed failure/ambiguity; no percentages or invented confidence score. Ratios measure citation correctness within declared units,not completeness.

The single incorrect material claim is A line43:clearAll drops the vector table permitting newdimensions. Frozen packaged code only DELETEs metadata/vector rows; vec0 schema remains. C andB correctly leave model-dimension compatibility unknown.

All15frozen facts scored separately. No generalized effectiveness, real-model quality or runtime correctness inference. Behavior evaluation is outside this static adjudication.

## Method and denominator

Frozen rubric SHA256:AF00E6F979A7E86144F6EEEAD54CDD363C9CF089AC55FFC5449922A0CCE976EA. FrozenASAR SHA256:C9BAEBD9F6FE445CC267EA15E23BF87A7E8F9BDAE3D461D7AE1847A7479D87F3. Both independently verified in prior stage. Packaged bytes decide; pinned evaluator source was secondary context. No existing architecture scores inherited.

All report numeric locator occurrences,including repeats; named E aliases expanded; whole-entry/component/identity references checked. A37report checkpoint preserved exactly as instructed. C includes1REAparent evidence citation; B includes whole-artifact,length,symbol absence andcomponent references. Descriptive model/type identifiers are claims,not separate citations.

Count every locator occurrence in inspectedEntries/inspected_locations plus every explicit locator in importantClaims/claims, including repeats. Unlocated claim or descriptive locator counts once as ambiguous when precise linkage is missing. Each generic locator is judged for topical contribution to at least one declared topic; it is not claimed to prove all topics. All listed topics/claims separately receive pooled completeness assessment. Artifact identity record counts once. Operational request/evidence-ID and constraint assertions are separately inventoried, not architecture location citations; no operational precision score inferred.

Generic entry locator sets establish topic relevance only. Pooled claim-completeness records independently assess stated claim support. No claim that every generic pointer supports every associated claim. Ambiguous andinexact records remain denominator failures.

Explicit REA evidence IDs are included as typed operational citations and independently verified. Other execution/boundary assertions lacking source-artifact citation are explicitly inventoried for separate operational review,not silently scored as verified.

Point locations are checked within their enclosing function/declaration; explicit ranges are not expanded. Multi-window paragraphs may distribute subclaims across listed windows; each record identifies the contribution. Whole-component claims are static comparisons,not successful execution claims.

## Arm A

Source report:arms/A/work/report.md

|Fact|Score|Finding|
|---|---:|---|
|1. Built-in desktop and shared semantic entry relationships|2/2|Correct with packaged evidence; see citation audit.|
|2. AI/embedding/feature/provider/sqlite eligibility|2/2|Correct with packaged evidence; see citation audit.|
|3. UI explicit filters/basic modes/item IDs|2/2|Correct with packaged evidence; see citation audit.|
|4. Desktop local provider injection and separate chat provider|2/2|Correct with packaged evidence; see citation audit.|
|5. Local multilingual-e5-small,384,prefixes,provisioning|2/2|Correct with packaged evidence; see citation audit.|
|6. ONNX CPU,batch,tokenizer,pooling,normalization|2/2|Correct with packaged evidence; see citation audit.|
|7. Initial/maintenance cadence,batch cap,overlap|2/2|Correct with packaged evidence; see citation audit.|
|8. Change cursor,dedup,backfill,eligibility|2/2|Correct with packaged evidence; see citation audit.|
|9. SQLite metadata/vector persistence,per-note replacement|2/2|Correct with packaged evidence; see citation audit.|
|10. Model-ID clear/rebuild and state resets|1/2|Correct model-ID clear/state reset; incorrect additional assertion that clearAll drops vector table permits dimension changes.|
|11. Text embedding versus stored note vectors|2/2|Correct with packaged evidence; see citation audit.|
|12. Folder/tag/note/all,empty scope,scoped limitations|1/2|All scopes/empty behavior and4x overfetch correctly recovered; scoped underfill limitation not stated.|
|13. L2-cosine,presets,thresholds|2/2|Correct with packaged evidence; see citation audit.|
|14. Best per note/chunk,descending,truncation,desktop aggregation|2/2|Correct with packaged evidence; see citation audit.|
|15. Missing-provider/tool conversion/index failure retries|1/2|Explicit missing-provider error and initial/incremental retry limitations correct; semantic_search_notes ToolError conversion untraced.|

Report citation audit:

|ID|Report line|Entry / locator|Status|Adjudication|
|---|---:|---|---|---|
|1|11|package.json whole entry|supported|Identity, main and three dependency versions match.|
|2|12|main.js 4219|supported|Enclosing call is wrapper.start().|
|3|12|main-html.js 6437|supported|Guarded ONNX require and catch.|
|4|12|main-html.js 7852|supported|App start followed by GUI Root/upgrade Root.|
|5|13|main-html.bundle.js 13391033|supported|Enclosing startup statement registers LocalEmbeddingProvider conditional on onnxRuntime then applies settings.|
|6|14|main-html.bundle.js 12939773|supported|applyEmbeddingIndexerState availability start/stop.|
|7|14|main-html.bundle.js 12941656|supported|Settings handlers invoke indexer state; separate chat cache invalidation.|
|8|15|main.bundle.js 11720327|supported|Desktop entry calls shared search.|
|9|15|main.bundle.js 11705500-11709500|supported|Shared provider, query vectors, scope, similarity, aggregation.|
|10|16|main.bundle.js 11664504-11670700|supported|Indexer note/chunker/embed/save pipeline; DB checked independently.|
|11|17|main-html.bundle.js 14876702|supported|Note-scoped strict highlighting and bestMatchInResult.|
|12|17|main.bundle.js 11705500-11709500|supported|Best-match line and Markdown subpart cosine scoring.|
|13|21|main-html.bundle.js 8608974|supported|AI enabled default false.|
|14|21|main-html.bundle.js 8613767|supported|Embedding default true, visibility and persisted three indexing settings.|
|15|21|main.bundle.js 9601724|supported|Duplicate AI setting.|
|16|21|main.bundle.js 9606474|supported|Duplicate embedding/index settings.|
|17|21|main.bundle.js 9653112|supported|Enclosing featureFlag declaration default true desktop global advanced.|
|18|23|main.bundle.js 11663073-11663860|supported|Embedding availability four gates and reasons; remote chat gates separate.|
|19|25|main.bundle.js 11721542|supported|Nontext parsed terms/item IDs rejected; availability and feature flag.|
|20|25|main.bundle.js 11721176|supported|Enclosing determineSearchType_ honors eligible semantic else basic/FTS/nonlatin.|
|21|29|main-html.bundle.js 13366245-13373000|inexact|Contains provider dimension/default reference and downloader flow but multilingual-e5-small ID/release URL/cacheDir start precede range at approximately13366020; claim true elsewhere.|
|22|31|main-html.bundle.js 13366500-13373000|supported|Prefixes, batch8,512 tokens,CPU2 threads,quantized model,inputs,outputs,pooling,normalization,local tokenizer,retry.|
|23|37|main.bundle.js 11665700-11668450|supported|Timer cadence,batch100,sqlite gate,overlap guard,maintenance flow,catch/finally.|
|24|39|main.bundle.js 11668435|supported|Enclosing handleModelChange resets cursor/model/initial scan/failure set.|
|25|39|main.bundle.js 11668688-11670019|supported|Initial watermark,backfill failures,change Map,deletes,cursor advances after per-note catches.|
|26|41|main.bundle.js 11664504-11665500|inexact|Contains CJK ratio/script test,reference stripping,chunking but numeric constants defining1750/175 and600/60 lie before range at11664400 vicinity.|
|27|41|main.bundle.js 11669743-11670700|supported|Index eligibility,title double prefix,vector count,sequential indexes,modelID save.|
|28|43|main.bundle.js 11654500-11660700|unsupported|Most persistence claims supported but clearAll DROP/re-dimension assertion contradicted: only DELETEs metadata/vector rows; no DROP.|
|29|47|main.bundle.js 11705500-11709500|supported|All five subsequent numbered retrieval contract claims supported.|
|30|47|main-html.bundle.js 9103837-9105092|inexact|Renderer entry inferred from renderer wording. Range begins at similaritySearch and ends inside query-vector resolver; does not cover provider check,default tuning,complete query/scope contract claimed as independent match.|
|31|55|main.bundle.js 11658692-11660288|supported|4x inner k filter,join,ordering and outer limit.|
|32|57|arms/A/work/component.mjs whole component (no locator)|supported|Static comparison matches dependency calls,binding,thresholds,ties,output/error flow and omitted info logger; no behavior execution claim scored.|
|33|61|main.bundle.js 11720327|supported|Strict,first chunk per note,fields,skip missing,weight5,title/body.|
|34|61|arms/A/work/component.mjs whole component (no locator)|supported|Component excludes desktop note aggregation.|
|35|63|main.bundle.js 11724258|supported|Auto concatenation and deduplicateAndSort call.|
|36|63|main.bundle.js 11725578|supported|Merge maximum weight and union fields/types.|
|37|63|main.bundle.js 11724258|inexact|MATCH catch and item-ID fallback precede this point; catch around11724000; true claim but cited point begins SemanticSearch_ inside auto append.|

Supplemental evidence.json citation audit:

|JSON path|Entry / locator|Status|Adjudication|
|---|---|---|---|
|inspectedEntries[0]|package.json whole entry|supported|Relevant to one or more declared topics; pooled union supports declared generic topics. No one-to-one claim mapping supplied.|
|inspectedEntries[1]|main.js 4219|supported|Relevant to one or more declared topics; pooled union supports declared generic topics. No one-to-one claim mapping supplied.|
|inspectedEntries[2]|main-html.js 6437|supported|Relevant to one or more declared topics; pooled union supports declared generic topics. No one-to-one claim mapping supplied.|
|inspectedEntries[2]|main-html.js 7852|supported|Relevant to one or more declared topics; pooled union supports declared generic topics. No one-to-one claim mapping supplied.|
|inspectedEntries[3]|main.bundle.js [11654500,11660700)|supported|Relevant to one or more declared topics; pooled union supports declared generic topics. No one-to-one claim mapping supplied.|
|inspectedEntries[3]|main.bundle.js [11661000,11670700)|supported|Relevant to one or more declared topics; pooled union supports declared generic topics. No one-to-one claim mapping supplied.|
|inspectedEntries[3]|main.bundle.js [11705500,11709500)|supported|Relevant to one or more declared topics; pooled union supports declared generic topics. No one-to-one claim mapping supplied.|
|inspectedEntries[3]|main.bundle.js 9601724|supported|Relevant to one or more declared topics; pooled union supports declared generic topics. No one-to-one claim mapping supplied.|
|inspectedEntries[3]|main.bundle.js 9606474|supported|Relevant to one or more declared topics; pooled union supports declared generic topics. No one-to-one claim mapping supplied.|
|inspectedEntries[3]|main.bundle.js 9653112|supported|Relevant to one or more declared topics; pooled union supports declared generic topics. No one-to-one claim mapping supplied.|
|inspectedEntries[3]|main.bundle.js 11720327|supported|Relevant to one or more declared topics; pooled union supports declared generic topics. No one-to-one claim mapping supplied.|
|inspectedEntries[3]|main.bundle.js 11721176|supported|Relevant to one or more declared topics; pooled union supports declared generic topics. No one-to-one claim mapping supplied.|
|inspectedEntries[3]|main.bundle.js 11721542|supported|Relevant to one or more declared topics; pooled union supports declared generic topics. No one-to-one claim mapping supplied.|
|inspectedEntries[3]|main.bundle.js 11722274|supported|Relevant to one or more declared topics; pooled union supports declared generic topics. No one-to-one claim mapping supplied.|
|inspectedEntries[3]|main.bundle.js 11724258|supported|Relevant to one or more declared topics; pooled union supports declared generic topics. No one-to-one claim mapping supplied.|
|inspectedEntries[3]|main.bundle.js 11725578|supported|Relevant to one or more declared topics; pooled union supports declared generic topics. No one-to-one claim mapping supplied.|
|inspectedEntries[4]|main-html.bundle.js [13366500,13373000)|supported|Relevant to one or more declared topics; pooled union supports declared generic topics. No one-to-one claim mapping supplied.|
|inspectedEntries[4]|main-html.bundle.js 8608974|supported|Relevant to one or more declared topics; pooled union supports declared generic topics. No one-to-one claim mapping supplied.|
|inspectedEntries[4]|main-html.bundle.js 8613767|supported|Relevant to one or more declared topics; pooled union supports declared generic topics. No one-to-one claim mapping supplied.|
|inspectedEntries[4]|main-html.bundle.js 8660926|supported|Relevant to one or more declared topics; pooled union supports declared generic topics. No one-to-one claim mapping supplied.|
|inspectedEntries[4]|main-html.bundle.js 9002308|supported|Relevant to one or more declared topics; pooled union supports declared generic topics. No one-to-one claim mapping supplied.|
|inspectedEntries[4]|main-html.bundle.js 9003904|supported|Relevant to one or more declared topics; pooled union supports declared generic topics. No one-to-one claim mapping supplied.|
|inspectedEntries[4]|main-html.bundle.js 9103837|supported|Relevant to one or more declared topics; pooled union supports declared generic topics. No one-to-one claim mapping supplied.|
|inspectedEntries[4]|main-html.bundle.js 9104968|supported|Relevant to one or more declared topics; pooled union supports declared generic topics. No one-to-one claim mapping supplied.|
|inspectedEntries[4]|main-html.bundle.js 9119659|supported|Relevant to one or more declared topics; pooled union supports declared generic topics. No one-to-one claim mapping supplied.|
|inspectedEntries[4]|main-html.bundle.js 9120876|supported|Relevant to one or more declared topics; pooled union supports declared generic topics. No one-to-one claim mapping supplied.|
|inspectedEntries[4]|main-html.bundle.js 9748127|supported|Relevant to one or more declared topics; pooled union supports declared generic topics. No one-to-one claim mapping supplied.|
|inspectedEntries[4]|main-html.bundle.js 12939773|supported|Relevant to one or more declared topics; pooled union supports declared generic topics. No one-to-one claim mapping supplied.|
|inspectedEntries[4]|main-html.bundle.js 12941656|supported|Relevant to one or more declared topics; pooled union supports declared generic topics. No one-to-one claim mapping supplied.|
|inspectedEntries[4]|main-html.bundle.js 13366245|supported|Relevant to one or more declared topics; pooled union supports declared generic topics. No one-to-one claim mapping supplied.|
|inspectedEntries[4]|main-html.bundle.js 13391033|supported|Relevant to one or more declared topics; pooled union supports declared generic topics. No one-to-one claim mapping supplied.|
|inspectedEntries[4]|main-html.bundle.js 14876702|supported|Relevant to one or more declared topics; pooled union supports declared generic topics. No one-to-one claim mapping supplied.|
|importantClaims[0]|main.bundle.js 11705500–11709500|supported|Enclosing function or explicit window supports the associated claim.|
|importantClaims[1]|main.bundle.js 11705500|supported|Enclosing function or explicit window supports the associated claim.|
|importantClaims[2]|main.bundle.js 11709044|supported|Enclosing function or explicit window supports the associated claim.|
|importantClaims[3]|main.bundle.js 11709168|supported|Enclosing function or explicit window supports the associated claim.|
|importantClaims[4]|main.bundle.js 11705500–11709500|supported|Enclosing function or explicit window supports the associated claim.|
|importantClaims[5]|main-html.bundle.js 13366245–13373000|supported|Enclosing function or explicit window supports the associated claim.|
|importantClaims[6]|unspecified provider pooling and SearchService conversion windows|ambiguous|Inference is correct, but descriptive pooling/conversion windows do not uniquely enumerate a locator set. Retained as ambiguous rather than selected support.|
|importantClaims[7]|main.bundle.js 11668435|supported|Enclosing function or explicit window supports the associated claim.|
|importantClaims[8]|main.bundle.js 11668688–11669743|supported|Enclosing function or explicit window supports the associated claim.|
|importantClaims[9]|main.bundle.js 11720327|supported|Enclosing function or explicit window supports the associated claim.|
|importantClaims[9]|main.bundle.js 11724258|supported|Enclosing function or explicit window supports the associated claim.|
|importantClaims[9]|main.bundle.js 11725578|supported|Enclosing function or explicit window supports the associated claim.|
|artifact|app.asar/package.json whole artifact/whole package|supported|Archive size,package name,version confirmed.|

Pooled claim completeness:

- importantClaims[0]:**supported**. Shared search requires an active provider before resolving query or scope Specific cited location/enclosing declaration supports claim.
- importantClaims[1]:**supported**. Strict/normal/loose use k 5/10/20 and minimum scores .86/.83/.74 Specific cited location/enclosing declaration supports claim.
- importantClaims[2]:**supported**. Text queries prefer bound embedQuery, preserve original text, and skip whitespace-only text Specific cited location/enclosing declaration supports claim.
- importantClaims[3]:**supported**. Note queries use stored vectors, not note text inference Specific cited location/enclosing declaration supports claim.
- importantClaims[4]:**supported**. Distance conversion is clamped 1-d^2/2; maximum score retained per note/chunk, then descending global top k Specific cited location/enclosing declaration supports claim.
- importantClaims[5]:**supported**. Default local multilingual-e5-small provider produces normalized 384-dimensional vectors with passage/query prefixes Specific cited location/enclosing declaration supports claim.
- importantClaims[6]:**ambiguous**. Normalization explains distance-to-cosine conversion Correct inference; locator phrase vague.
- importantClaims[7]:**supported**. Model changes clear the index and reset scan/checkpoint settings Specific cited location/enclosing declaration supports claim.
- importantClaims[8]:**supported**. Incremental per-note failures log warnings while batch watermark advances Specific cited location/enclosing declaration supports claim.
- importantClaims[9]:**supported**. Search-panel note aggregation differs from shared chunk aggregation; auto mode merges lexical and semantic notes Specific cited location/enclosing declaration supports claim.

Incorrect claims:clearAll drops the vector table permitting new dimensions — False. Packaged main.bundle.js clearAll at11660618 vicinity only DELETEs metadata and vector rows in transactionExecBatch. Existing vec0 schema dimension remains.

Recognized unknowns:Platform sqlite-vec loading; Model availability; Real vector distances/retrieval quality; UI rejected semantic promise handling; Data races; Complete API/plugin/MCP exposure; All cleanup hooks; Folder preview filtering/descendants; Change-log ordering; Migration/schema version; Complete transaction safety; Model checksum/download integrity.

Unrecognized material gaps:Scoped4x overfetch can underfill when matching scope notes fall outside global candidate pool.; Tool semantic_search_notes catches search errors and rethrows ToolError..

Operational assertions:toolActionCount,method,boundaryChecks,failedOperations,outputLimits,toolsSuccessfullyUsed,validation and no-execution/peer/source claims require traces; not authenticated by static ASAR audit.

## Arm B

Source report:arms/B-recovery6/work/report.md

|Fact|Score|Finding|
|---|---:|---|
|1. Built-in desktop and shared semantic entry relationships|1/2|Shared service/dependency entry recovered; desktop/UI caller relationship explicitly unknown.|
|2. AI/embedding/feature/provider/sqlite eligibility|1/2|Four embedding availability checks recovered; UI feature-flag gate missing.|
|3. UI explicit filters/basic modes/item IDs|0/2|UI filter/basic/item-ID exclusions unrecovered.|
|4. Desktop local provider injection and separate chat provider|1/2|Independent embedding/chat slots correct; ONNX startup injection missing.|
|5. Local multilingual-e5-small,384,prefixes,provisioning|0/2|Concrete model,dimensions,prefixes/provisioning unrecovered.|
|6. ONNX CPU,batch,tokenizer,pooling,normalization|0/2|CPU inference/tokenizer/pooling/normalization unrecovered.|
|7. Initial/maintenance cadence,batch cap,overlap|0/2|Semantic maintenance/backfill cadence,batch cap,overlap unrecovered.|
|8. Change cursor,dedup,backfill,eligibility|0/2|Semantic change cursor,dedup,backfill/eligibility unrecovered; FTS exclusions correctly not transferred.|
|9. SQLite metadata/vector persistence,per-note replacement|1/2|SQLite joins/vector persistence recovered partly; metadata writes/per-note replacement unrecovered.|
|10. Model-ID clear/rebuild and state resets|0/2|clearAll primitive recovered but model-ID trigger/rebuild/state reset unrecovered.|
|11. Text embedding versus stored note vectors|2/2|Text versus stored-note-vector behavior correct.|
|12. Folder/tag/note/all,empty scope,scoped limitations|1/2|All scopes/empty behavior and4x overfetch correct; scoped underfill omitted.|
|13. L2-cosine,presets,thresholds|2/2|Conversion,presets andthresholds correct; model normalization explicitly qualified.|
|14. Best per note/chunk,descending,truncation,desktop aggregation|1/2|Shared chunk aggregation correct; desktop note-level aggregation missing.|
|15. Missing-provider/tool conversion/index failure retries|1/2|Missing-provider error and propagation correct; tool conversion/indexer retry limitations missing.|

Report citation audit:

|ID|Report line|Entry / locator|Status|Adjudication|
|---|---:|---|---|---|
|1|9|main-html.bundle.js E1 [9002058,9010058)|supported|Declared anchors occur within named window.|
|2|10|main-html.bundle.js E2 [9093500,9105500)|supported|Declared anchors occur within named window.|
|3|11|main-html.bundle.js E3 [9104718,9116718)|supported|Declared anchors occur within named window.|
|4|15|main-html.bundle.js E2 [9093500,9105500)|supported|Window contains associated described method/flow; unavailable behavior explicitly marked unknown.|
|5|17|main-html.bundle.js E3 [9104718,9116718)|supported|Window contains associated described method/flow; unavailable behavior explicitly marked unknown.|
|6|19|main-html.bundle.js E1 [9002058,9010058)|supported|Call-map edge subset in this window contributes to pooledE1–E3 map.|
|7|19|main-html.bundle.js E2 [9093500,9105500)|supported|Call-map edge subset in this window contributes to pooledE1–E3 map.|
|8|19|main-html.bundle.js E3 [9104718,9116718)|supported|Call-map edge subset in this window contributes to pooledE1–E3 map.|
|9|39|main-html.bundle.js E2 [9093500,9105500)|supported|Window contains associated described method/flow; unavailable behavior explicitly marked unknown.|
|10|53|main-html.bundle.js E1 [9002058,9010058)|supported|Window contains associated described method/flow; unavailable behavior explicitly marked unknown.|
|11|55|main-html.bundle.js E1 [9002058,9010058)|supported|Window contains associated described method/flow; unavailable behavior explicitly marked unknown.|
|12|57|main-html.bundle.js E2 [9093500,9105500)|supported|Window contains associated described method/flow; unavailable behavior explicitly marked unknown.|
|13|59|main-html.bundle.js E1 [9002058,9010058)|supported|Window contains associated described method/flow; unavailable behavior explicitly marked unknown.|
|14|59|main-html.bundle.js E2 [9093500,9105500)|supported|Window contains associated described method/flow; unavailable behavior explicitly marked unknown.|
|15|65|main-html.bundle.js E3 [9104718,9116718)|supported|Window contains associated described method/flow; unavailable behavior explicitly marked unknown.|
|16|39|arms/B-recovery6/work/component.mjs whole component|supported|Static comparison supports shared routine reconstruction and documented logger omission.|
|17|63|main-html.bundle.js literal EmbeddingService lookup|supported|Independent .NET IndexOf returned-1; absence scoped to literal, no absence-of-indexer inference.|
|18|79|app.asar whole archive length|supported|173428939bytes matches frozen target.|
|19|7|main-html.bundle.js whole decoded entry length|supported|19950361UTF-16 characters independently confirmed.|

Supplemental evidence.json citation audit:

|JSON path|Entry / locator|Status|Adjudication|
|---|---|---|---|
|locations.E1|main-html.bundle.js [9002058,9010058)|supported|All declared anchors present; broad window is intentionally not exact function boundaries.|
|locations.E2|main-html.bundle.js [9093500,9105500)|supported|All declared anchors present; broad window is intentionally not exact function boundaries.|
|locations.E3|main-html.bundle.js [9104718,9116718)|supported|All declared anchors present; broad window is intentionally not exact function boundaries.|
|actions[3]|main-html.bundle.js [9002058,9010058)|supported|Repeated read window statically matches declared archive location.|
|actions[4]|main-html.bundle.js [9104718,9116718)|supported|Repeated read window statically matches declared archive location.|
|actions[5]|main-html.bundle.js [9093500,9105500)|supported|Repeated read window statically matches declared archive location.|
|actions[6]|main-html.bundle.js find:EmbeddingService|supported|Literal EmbeddingService absent in decoded bundle; no broader absence inference.|
|claims[0]|main-html.bundle.js E2 [9093500,9105500)|supported|Associated static claim supported; multiwindow references pooled.|
|claims[1]|main-html.bundle.js E2 [9093500,9105500)|supported|Associated static claim supported; multiwindow references pooled.|
|claims[2]|main-html.bundle.js E2 [9093500,9105500)|supported|Associated static claim supported; multiwindow references pooled.|
|claims[2]|main-html.bundle.js E3 [9104718,9116718)|supported|Associated static claim supported; multiwindow references pooled.|
|claims[3]|main-html.bundle.js E2 [9093500,9105500)|supported|Associated static claim supported; multiwindow references pooled.|
|claims[3]|main-html.bundle.js E3 [9104718,9116718)|supported|Associated static claim supported; multiwindow references pooled.|
|claims[4]|main-html.bundle.js E2 [9093500,9105500)|supported|Associated static claim supported; multiwindow references pooled.|
|claims[5]|main-html.bundle.js E2 [9093500,9105500)|supported|Associated static claim supported; multiwindow references pooled.|
|claims[6]|main-html.bundle.js E1 [9002058,9010058)|supported|Associated static claim supported; multiwindow references pooled.|
|claims[7]|main-html.bundle.js E3 [9104718,9116718)|supported|Associated static claim supported; multiwindow references pooled.|
|claims[8]|main-html.bundle.js E1 [9002058,9010058)|supported|Associated static claim supported; multiwindow references pooled.|
|claims[9]|main-html.bundle.js E2 [9093500,9105500)|supported|Window supports qualified inference, not runtime assertion.|
|claims[10]|main-html.bundle.js E1 [9002058,9010058)|supported|Window supports qualified inference, not runtime assertion.|
|claims[10]|main-html.bundle.js E2 [9093500,9105500)|supported|Window supports qualified inference, not runtime assertion.|
|input/archiveBytesObserved|app.asar whole archive length|supported|Frozen target identity/length confirmed.|

Pooled claim completeness:

- claims[0]:**supported**. Provider required before query resolution; ordinary Error on absence Cited named windows collectively support claim.
- claims[1]:**supported**. strict=5/.86, normal=10/.83, loose=20/.74; normal is nullish default Cited named windows collectively support claim.
- claims[2]:**supported**. Text path prefers bound embedQuery, falls back to bound embed; original text supplied as array Cited named windows collectively support claim.
- claims[3]:**supported**. Note query uses indexed vectors, scope supports all/note/folder/tag Cited named windows collectively support claim.
- claims[4]:**supported**. Sequential per-vector search; clamped 1-d^2/2; best score per note/chunk; sort and global k cap Cited named windows collectively support claim.
- claims[5]:**supported**. No catches or FTS fallback in shared routine; dependency errors propagate Cited named windows collectively support claim.
- claims[6]:**supported**. SQLite vector and metadata joins; filtered search uses 4*k candidate MATCH and final k limit Cited named windows collectively support claim.
- claims[7]:**supported**. Availability checks AI enabled, embedding enabled, vector support, provider presence Cited named windows collectively support claim.
- claims[8]:**supported**. clearAll deletes metadata and conditionally vectors; callers unknown Cited named windows collectively support claim.
- claims[9]:**supported**. Distance formula suggests normalized Euclidean-to-cosine conversion Explicitly qualified static inference supported by cited windows.
- claims[10]:**supported**. A producer must populate persistent chunk vectors; its mechanism was not inspected Explicitly qualified static inference supported by cited windows.

Incorrect claims:None identified; unrecovered facts retained as gaps.

Recognized unknowns:Concrete embedding provider/model/dimension and normalization; Background indexing queue, scheduling, initial scan and updates; Semantic note eligibility and exclusion rules; Chunking and producer retries; Index invalidation callers and model-change rebuild; Startup wiring and actual UI/command dispatch; SearchEngine semantic dispatch and outer fallback behavior; Settings defaults; Runtime correctness and performance.

Unrecognized material gaps:Scoped4x overfetch can underfill..

Operational assertions:actions inventory counts5024/98,actionCount,boundaryChecks,successful facility list and prohibitedActivitiesPerformed require retained operational traces. They are not architecture-location citations or established by static content alone.

## Arm C

Source report:arms/C-recovery2/work/report.md

|Fact|Score|Finding|
|---|---:|---|
|1. Built-in desktop and shared semantic entry relationships|2/2|Correct with packaged-entry windows; see exhaustive citation audit.|
|2. AI/embedding/feature/provider/sqlite eligibility|2/2|Correct with packaged-entry windows; see exhaustive citation audit.|
|3. UI explicit filters/basic modes/item IDs|2/2|Correct with packaged-entry windows; see exhaustive citation audit.|
|4. Desktop local provider injection and separate chat provider|0/2|Startup local-provider injection and separation from chat provider selection explicitly unknown.|
|5. Local multilingual-e5-small,384,prefixes,provisioning|2/2|Correct with packaged-entry windows; see exhaustive citation audit.|
|6. ONNX CPU,batch,tokenizer,pooling,normalization|1/2|ONNX CPU,batching,tokenizer and helper invocation recovered; pooling and normalization algorithm explicitly uninspected.|
|7. Initial/maintenance cadence,batch cap,overlap|2/2|Correct with packaged-entry windows; see exhaustive citation audit.|
|8. Change cursor,dedup,backfill,eligibility|2/2|Correct with packaged-entry windows; see exhaustive citation audit.|
|9. SQLite metadata/vector persistence,per-note replacement|2/2|Correct with packaged-entry windows; see exhaustive citation audit.|
|10. Model-ID clear/rebuild and state resets|2/2|Correct with packaged-entry windows; see exhaustive citation audit.|
|11. Text embedding versus stored note vectors|2/2|Correct with packaged-entry windows; see exhaustive citation audit.|
|12. Folder/tag/note/all,empty scope,scoped limitations|1/2|Scopes,empty behavior and4x scoped candidate overfetch recovered; underfill limitation omitted.|
|13. L2-cosine,presets,thresholds|2/2|Correct with packaged-entry windows; see exhaustive citation audit.|
|14. Best per note/chunk,descending,truncation,desktop aggregation|2/2|Correct with packaged-entry windows; see exhaustive citation audit.|
|15. Missing-provider/tool conversion/index failure retries|1/2|Missing-provider error and indexer retry limitations correct; tool error conversion explicitly unknown.|

Report citation audit:

|ID|Report line|Entry / locator|Status|Adjudication|
|---|---:|---|---|---|
|1|15|main-html.bundle.js [9119200,9121000)|supported|Window contributes the stated associated static subclaim; associated listed windows assessed collectively for multi-window paragraphs.|
|2|15|main-html.bundle.js [9121816,9122666)|supported|Window contributes the stated associated static subclaim; associated listed windows assessed collectively for multi-window paragraphs.|
|3|15|main-html.bundle.js [9123518,9124368)|supported|Window contributes the stated associated static subclaim; associated listed windows assessed collectively for multi-window paragraphs.|
|4|15|main.bundle.js [11707753,11708603)|supported|Window contributes the stated associated static subclaim; associated listed windows assessed collectively for multi-window paragraphs.|
|5|15|main.bundle.js [11708884,11709734)|supported|Window contributes the stated associated static subclaim; associated listed windows assessed collectively for multi-window paragraphs.|
|6|15|main.bundle.js [11720173,11721023)|supported|Window contributes the stated associated static subclaim; associated listed windows assessed collectively for multi-window paragraphs.|
|7|16|main-html.bundle.js [9100957,9101857)|supported|Window contributes the stated associated static subclaim; associated listed windows assessed collectively for multi-window paragraphs.|
|8|16|main-html.bundle.js [9101800,9103900)|supported|Window contributes the stated associated static subclaim; associated listed windows assessed collectively for multi-window paragraphs.|
|9|16|main-html.bundle.js [9103677,9104527)|supported|Window contributes the stated associated static subclaim; associated listed windows assessed collectively for multi-window paragraphs.|
|10|16|main-html.bundle.js [9104808,9105658)|supported|Window contributes the stated associated static subclaim; associated listed windows assessed collectively for multi-window paragraphs.|
|11|17|main-html.bundle.js [9146707,9147607)|supported|Window contributes the stated associated static subclaim; associated listed windows assessed collectively for multi-window paragraphs.|
|12|18|main-html.bundle.js [9747200,9753000)|supported|Window contributes the stated associated static subclaim; associated listed windows assessed collectively for multi-window paragraphs.|
|13|19|main-html.bundle.js [8999360,9002000)|supported|Window contributes the stated associated static subclaim; associated listed windows assessed collectively for multi-window paragraphs.|
|14|19|main-html.bundle.js [8997600,9002000)|supported|Window contributes the stated associated static subclaim; associated listed windows assessed collectively for multi-window paragraphs.|
|15|19|main-html.bundle.js [9002148,9002998)|supported|Window contributes the stated associated static subclaim; associated listed windows assessed collectively for multi-window paragraphs.|
|16|19|main-html.bundle.js [9003744,9004594)|supported|Window contributes the stated associated static subclaim; associated listed windows assessed collectively for multi-window paragraphs.|
|17|20|main-html.bundle.js [13368300,13371800)|supported|Window contributes the stated associated static subclaim; associated listed windows assessed collectively for multi-window paragraphs.|
|18|21|gui/NoteEditor/utils/useSearchMarkers.js [2806,3656)|supported|Window contributes the stated associated static subclaim; associated listed windows assessed collectively for multi-window paragraphs.|
|19|21|gui/NoteEditor/utils/useSearchMarkers.js [3610,4096)|supported|Window contributes the stated associated static subclaim; associated listed windows assessed collectively for multi-window paragraphs.|
|20|25|main-html.bundle.js [8608795,8609795)|supported|Window contributes the stated associated static subclaim; associated listed windows assessed collectively for multi-window paragraphs.|
|21|25|main-html.bundle.js [8613591,8614591)|supported|Window contributes the stated associated static subclaim; associated listed windows assessed collectively for multi-window paragraphs.|
|22|25|main-html.bundle.js [8617065,8617965)|supported|Window contributes the stated associated static subclaim; associated listed windows assessed collectively for multi-window paragraphs.|
|23|27|main-html.bundle.js [9107721,9108721)|supported|Window contributes the stated associated static subclaim; associated listed windows assessed collectively for multi-window paragraphs.|
|24|27|main-html.bundle.js [9120880,9121580)|supported|Window contributes the stated associated static subclaim; associated listed windows assessed collectively for multi-window paragraphs.|
|25|29|main-html.bundle.js [9119200,9121000)|supported|Window contributes the stated associated static subclaim; associated listed windows assessed collectively for multi-window paragraphs.|
|26|29|main-html.bundle.js [9123518,9124368)|supported|Window contributes the stated associated static subclaim; associated listed windows assessed collectively for multi-window paragraphs.|
|27|33|main-html.bundle.js [9100957,9101857)|supported|Window contributes the stated associated static subclaim; associated listed windows assessed collectively for multi-window paragraphs.|
|28|35|main-html.bundle.js [13368300,13371800)|supported|Window contributes the stated associated static subclaim; associated listed windows assessed collectively for multi-window paragraphs.|
|29|37|main-html.bundle.js [13366000,13369100)|supported|Window contributes the stated associated static subclaim; associated listed windows assessed collectively for multi-window paragraphs.|
|30|37|main-html.bundle.js [8609775,8610775)|supported|Window contributes the stated associated static subclaim; associated listed windows assessed collectively for multi-window paragraphs.|
|31|41|main-html.bundle.js [9747200,9753000)|supported|Window contributes the stated associated static subclaim; associated listed windows assessed collectively for multi-window paragraphs.|
|32|50|main-html.bundle.js [9747200,9748000)|supported|Window contributes the stated associated static subclaim; associated listed windows assessed collectively for multi-window paragraphs.|
|33|50|main-html.bundle.js [8999745,9000745)|supported|Window contributes the stated associated static subclaim; associated listed windows assessed collectively for multi-window paragraphs.|
|34|56|main-html.bundle.js [8997600,9002000)|supported|Window contributes the stated associated static subclaim; associated listed windows assessed collectively for multi-window paragraphs.|
|35|56|main-html.bundle.js [9002148,9002998)|supported|Window contributes the stated associated static subclaim; associated listed windows assessed collectively for multi-window paragraphs.|
|36|56|main-html.bundle.js [9003744,9004594)|supported|Window contributes the stated associated static subclaim; associated listed windows assessed collectively for multi-window paragraphs.|
|37|58|main-html.bundle.js [9002148,9002998)|supported|Window contributes the stated associated static subclaim; associated listed windows assessed collectively for multi-window paragraphs.|
|38|58|main-html.bundle.js [9003744,9004594)|supported|Window contributes the stated associated static subclaim; associated listed windows assessed collectively for multi-window paragraphs.|
|39|68|main-html.bundle.js [9101000,9101800)|supported|Window contributes the stated associated static subclaim; associated listed windows assessed collectively for multi-window paragraphs.|
|40|68|main-html.bundle.js [9101800,9103900)|supported|Window contributes the stated associated static subclaim; associated listed windows assessed collectively for multi-window paragraphs.|
|41|68|main-html.bundle.js [9103677,9104527)|supported|Window contributes the stated associated static subclaim; associated listed windows assessed collectively for multi-window paragraphs.|
|42|68|main-html.bundle.js [9104808,9105658)|supported|Window contributes the stated associated static subclaim; associated listed windows assessed collectively for multi-window paragraphs.|
|43|72|main-html.bundle.js [9119200,9121000)|supported|Window contributes the stated associated static subclaim; associated listed windows assessed collectively for multi-window paragraphs.|
|44|74|main-html.bundle.js [9101800,9103900)|inexact|Range contains provider-before-query and partial search loop, but not complete search/no-catch boundaries or stored-vector-empty resolver invoked by this paragraph; supporting code exists in other cited windows.|
|45|74|main-html.bundle.js [8997600,9002000)|supported|Window contributes the stated associated static subclaim; associated listed windows assessed collectively for multi-window paragraphs.|
|46|68|arms/C-recovery2/work/component.mjs whole component|supported|Static comparison matches stated retrieval,dependency,error and omitted private-log behavior.|
|47|9|commands/copyToClipboard.js whole entry;490bytes|supported|ASAR entry byte size/content verified; REA execution/coverage claims delegated to operational evidence assessment.|
|48|9|blind-prep-v2/input/app.asar whole artifact byte length/hash|supported|173428939bytes and SHA256 match independent frozen-target verification.|
|49|9|REA analysis evidence ev_8bfe2b0c7e747ef4823eb6cf7ec095d6d1263c66ebf7392007be2bffcfb04ef5|supported|Independently parsed completed item_3 content[0].text from C-recovery2/measurement/events.jsonl: exact parent and summary IDs,frozen target digest,clipboard490bytes,77AST nodes,6findings,0parse failures,partial coverage2848outside selected scope.|

Supplemental evidence.json citation audit:

|JSON path|Entry / locator|Status|Adjudication|
|---|---|---|---|
|inspected_locations[0]|commands/copyToClipboard.js whole selected entry|supported|Window contributes stated topic; pooled union covers topic. Static entry content/490byte size checked; facility success separately operational.|
|inspected_locations[1]|main-html.bundle.js [9100957,9101857)|supported|Window contributes stated topic; pooled union covers topic. Static entry content/490byte size checked; facility success separately operational.|
|inspected_locations[1]|main-html.bundle.js [9101800,9103900)|supported|Window contributes stated topic; pooled union covers topic. Static entry content/490byte size checked; facility success separately operational.|
|inspected_locations[1]|main-html.bundle.js [9103677,9104527)|supported|Window contributes stated topic; pooled union covers topic. Static entry content/490byte size checked; facility success separately operational.|
|inspected_locations[1]|main-html.bundle.js [9104808,9105658)|supported|Window contributes stated topic; pooled union covers topic. Static entry content/490byte size checked; facility success separately operational.|
|inspected_locations[2]|main-html.bundle.js [8997600,9002000)|supported|Window contributes stated topic; pooled union covers topic. Static entry content/490byte size checked; facility success separately operational.|
|inspected_locations[2]|main-html.bundle.js [9002148,9002998)|supported|Window contributes stated topic; pooled union covers topic. Static entry content/490byte size checked; facility success separately operational.|
|inspected_locations[2]|main-html.bundle.js [9003744,9004594)|supported|Window contributes stated topic; pooled union covers topic. Static entry content/490byte size checked; facility success separately operational.|
|inspected_locations[3]|main-html.bundle.js [8608795,8609795)|supported|Window contributes stated topic; pooled union covers topic. Static entry content/490byte size checked; facility success separately operational.|
|inspected_locations[3]|main-html.bundle.js [8609775,8610775)|supported|Window contributes stated topic; pooled union covers topic. Static entry content/490byte size checked; facility success separately operational.|
|inspected_locations[3]|main-html.bundle.js [8613591,8614591)|supported|Window contributes stated topic; pooled union covers topic. Static entry content/490byte size checked; facility success separately operational.|
|inspected_locations[3]|main-html.bundle.js [8617065,8617965)|supported|Window contributes stated topic; pooled union covers topic. Static entry content/490byte size checked; facility success separately operational.|
|inspected_locations[3]|main-html.bundle.js [9107721,9108721)|supported|Window contributes stated topic; pooled union covers topic. Static entry content/490byte size checked; facility success separately operational.|
|inspected_locations[4]|main-html.bundle.js [9119200,9121000)|supported|Window contributes stated topic; pooled union covers topic. Static entry content/490byte size checked; facility success separately operational.|
|inspected_locations[4]|main-html.bundle.js [9120880,9121580)|supported|Window contributes stated topic; pooled union covers topic. Static entry content/490byte size checked; facility success separately operational.|
|inspected_locations[4]|main-html.bundle.js [9121816,9122666)|supported|Window contributes stated topic; pooled union covers topic. Static entry content/490byte size checked; facility success separately operational.|
|inspected_locations[4]|main-html.bundle.js [9123518,9124368)|supported|Window contributes stated topic; pooled union covers topic. Static entry content/490byte size checked; facility success separately operational.|
|inspected_locations[5]|main-html.bundle.js [9146707,9147607)|supported|Window contributes stated topic; pooled union covers topic. Static entry content/490byte size checked; facility success separately operational.|
|inspected_locations[6]|main-html.bundle.js [9747200,9753000)|supported|Window contributes stated topic; pooled union covers topic. Static entry content/490byte size checked; facility success separately operational.|
|inspected_locations[7]|main-html.bundle.js [13366000,13369100)|supported|Window contributes stated topic; pooled union covers topic. Static entry content/490byte size checked; facility success separately operational.|
|inspected_locations[7]|main-html.bundle.js [13368300,13371800)|supported|Window contributes stated topic; pooled union covers topic. Static entry content/490byte size checked; facility success separately operational.|
|inspected_locations[8]|main.bundle.js [11707753,11708603)|supported|Window contributes stated topic; pooled union covers topic. Static entry content/490byte size checked; facility success separately operational.|
|inspected_locations[8]|main.bundle.js [11708884,11709734)|supported|Window contributes stated topic; pooled union covers topic. Static entry content/490byte size checked; facility success separately operational.|
|inspected_locations[8]|main.bundle.js [11720173,11721023)|supported|Window contributes stated topic; pooled union covers topic. Static entry content/490byte size checked; facility success separately operational.|
|inspected_locations[9]|gui/NoteEditor/utils/useSearchMarkers.js [2806,3656)|supported|Window contributes stated topic; pooled union covers topic. Static entry content/490byte size checked; facility success separately operational.|
|inspected_locations[9]|gui/NoteEditor/utils/useSearchMarkers.js [3610,4096)|supported|Window contributes stated topic; pooled union covers topic. Static entry content/490byte size checked; facility success separately operational.|
|claims[0]|main-html.bundle.js 9101000|supported|Point interpreted in enclosing function/declaration contributes claim; pooled generic windows provide remaining details.|
|claims[0]|main-html.bundle.js 9103350|supported|Point interpreted in enclosing function/declaration contributes claim; pooled generic windows provide remaining details.|
|claims[0]|main-html.bundle.js 9103677|supported|Point interpreted in enclosing function/declaration contributes claim; pooled generic windows provide remaining details.|
|claims[0]|main-html.bundle.js 9104808|supported|Point interpreted in enclosing function/declaration contributes claim; pooled generic windows provide remaining details.|
|claims[1]|main-html.bundle.js 9103350|supported|Point interpreted in enclosing function/declaration contributes claim; pooled generic windows provide remaining details.|
|claims[1]|main-html.bundle.js 8999360|supported|Point interpreted in enclosing function/declaration contributes claim; pooled generic windows provide remaining details.|
|claims[2]|main-html.bundle.js 9119505|supported|Point interpreted in enclosing function/declaration contributes claim; pooled generic windows provide remaining details.|
|claims[2]|main-html.bundle.js 9123518|supported|Point interpreted in enclosing function/declaration contributes claim; pooled generic windows provide remaining details.|
|claims[3]|main-html.bundle.js 9747200|inexact|Point9747200 falls in preceding chunker options tail, not indexer constants/loop; broad inspected window contains support.|
|claims[4]|main-html.bundle.js 13368300|inexact|Point13368300 is preceding dynamicEsmImport tail, not LocalEmbeddingProvider declaration; broad inspected window contains support.|
|claims[5]|main-html.bundle.js 8997600|supported|Point interpreted in enclosing function/declaration contributes claim; pooled generic windows provide remaining details.|
|claims[5]|main-html.bundle.js 9002148|supported|Point interpreted in enclosing function/declaration contributes claim; pooled generic windows provide remaining details.|
|claims[5]|main-html.bundle.js 9003744|supported|Point interpreted in enclosing function/declaration contributes claim; pooled generic windows provide remaining details.|
|claims[6]|unspecified none|ambiguous|Plausible bounded inference but no explicit location mapping.|
|artifact|app.asar whole artifact|supported|Path,size and hash match frozen input.|
|requests[2].parent_evidence_id|REA analysis evidence ev_8bfe2b0c7e747ef4823eb6cf7ec095d6d1263c66ebf7392007be2bffcfb04ef5|supported|Exact parent/summary evidence IDs verified by independently parsing retained successful item_3 response; wholeASARdigest andselectedclipboard scope match.|
|requests[2].summary_evidence_id|REA analysis evidence ev_87bdbe96bd5e735964dc05a958f0ca03c6c3a61d1fb545632a5d9dc8077b4179|supported|Exact parent/summary evidence IDs verified by independently parsing retained successful item_3 response; wholeASARdigest andselectedclipboard scope match.|
|requests[2].source_paths[0]|commands/copyToClipboard.js whole selected entry|supported|Duplicate selected artifact reference confirmed in retained successful invocation and frozen ASAR490byte entry.|

Pooled claim completeness:

- claims[0]:**supported**. Default normal; strict 5/.86, normal 10/.83, loose 20/.74; text or note vector query; per-vector sequential search; scope resolution; score 1-d*d/2 clamped; chunk dedup by maximum; sort and slice Pooled named locations plus inspected windows support the static claim.
- claims[1]:**supported**. Missing provider throws ordinary Error before query processing; no catch in shared search; sqlite-vec requirement enforced in model methods Pooled named locations plus inspected windows support the static claim.
- claims[2]:**supported**. SearchEngine strict search deduplicates notes, loads previews, weights score times five; Auto appends semantic results then invokes merge helper Pooled named locations plus inspected windows support the static claim.
- claims[3]:**inexact**. 30-second initial / 3-minute completed scan schedule, batches of 100, note-change journal processing, model-ID clear and scan reset, invalid note removal, title duplication, passage embedding Declared point is before relevant implementation; broader inspected window supports factual substance.
- claims[4]:**inexact**. LocalEmbeddingProvider defaults multilingual-e5-small, 384 dimensions, distinct query/passage prefixes, batch eight, tokenizer max 512, CPU ONNX quantized model Declared point is before relevant implementation; broader inspected window supports factual substance.
- claims[5]:**supported**. SQLite metadata plus vec0 table; scoped search uses fourfold candidate k before final limit; note vectors ordered by chunk index Pooled named locations plus inspected windows support the static claim.
- claims[6]:**ambiguous**. Local semantic index is eventually refreshed from a note-change journal; startup/settings lifecycle wiring remains unverified Unlocated inference.

Incorrect claims:None identified; unrecovered facts retained as gaps.

Recognized unknowns:Actual installed/selected runtime embedding provider and settings; Provider installation and indexer startup/stop wiring; Feature flag default and complete plugin/MCP exposure; Full semantic_search_notes handler and schema; Full lexical-semantic merge policy; Default chunk size/overlap and language-dependent selection; Pooling helper body, database migration version and model-dimension switch handling; Save-wide transactional atomicity and runtime index consistency; Actual runtime execution, relevance quality, performance and model availability.

Unrecognized material gaps:Scoped4x candidate overfetch can underfill..

Operational assertions:requests[2]REA parent/summaryIDs,partial coverage2848outside scope andselected490bytes independently read back from retained successful item_3. Remaining request counts,negative boundary probes and no-source/no-execution constraints require separate operational assessment.


## Operational citation readback and limits

C successful item_3 from arms/C-recovery2/measurement/events.jsonl independently parsed fromcontent[0].text. Parentev_8bfe2b0c7e747ef4823eb6cf7ec095d6d1263c66ebf7392007be2bffcfb04ef5 andsummaryev_87bdbe96bd5e735964dc05a958f0ca03c6c3a61d1fb545632a5d9dc8077b4179 match. FrozenASARdigest matches. Selectedcommands/copyToClipboard.js:490bytes,77ASTnodes,6findings,0parsefailures,2848unselected files. This proves actual assigned facility invocation on the selected command; it does not prove REAcore-feature analysis. AllC core architecture claims came from direct text windows.

B11/30 versus A27/30 andC25/30 reflects recovered fact coverage only. B's precise citations accompany narrower claims. A's onefalse claim is explicit; C's startup,normalization helper andtool handler gaps remain explicit. This single target does not establish generalized tool effectiveness.

Reproduction:readASAR size prefix/header; header size atbyte4,JSON length atbyte12,JSON startsbyte16; traversefiles entry; payload starts8+headerSize; decodeUTF8; use.NETString UTF16character offsets. Re-read enumerated windows andcompare fullcomponents as data. No target/model/customunsigned script executed; no frozenfiles modified; no investigator messaging or dispatches.

Provider actions: 7 prior calls; 11 new provider calls; 18 total. New calls comprise 10 exec_command attempts (9 processes launched, 1 oversized command rejected) and 1 apply_patch. One launched inspection had a recoverable regex error. One additional orchestration serialization failure dispatched no provider call. No agents dispatched or further gates launched.

