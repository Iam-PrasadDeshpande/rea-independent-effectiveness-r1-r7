You are one blind investigator in a controlled reverse-engineering experiment.

The input is a packaged Electron note-taking application with semantic search. Inspect only the supplied app.asar and its packaged resources. Original source repositories, TypeScript sources, source maps, evaluator files, peer work and internet source lookup are unavailable and forbidden. Never attempt to bypass the sandbox or read another workspace. Do not run the application, model inference, generated scripts, or extracted application code. Built-in inspection commands and your provided read-only analysis tools are allowed. Files you author are for later signed evaluation; do not execute them.

Recover the actual semantic-search architecture: entry points, settings/eligibility, embedding provider, background indexing, persistence, retrieval, result aggregation, errors/fallbacks and invalidation. Distinguish observed facts, inference and unknowns. Cite packaged entry names and precise character offsets or line locations. Do not assume minification or invent runtime proof.

Produce in your writable working directory:

1. report.md: architecture explanation, component/call map, execution flow, evidence/confidence distinctions, unknowns, and concise operational/tool notes.
2. component.mjs: export `async function search(options, deps)` reconstructing the packaged application's shared semantic-retrieval routine. `options` has the application's query/relevance/scope shape. Adapter `deps` supplies `provider` (embedding provider or null), async `vectorsByNoteId(id)`, `similaritySearch(vector, options)`, `folderPreviews(id, options)` and `tagNoteIds(id)`. Provider supports `embed(texts)` and optionally `embedQuery(texts)`. Return the original routine's result array and preserve its errors and dependency arguments. These adapter names are interface plumbing, not a behavioral specification; derive behavior and constants from the artifact.
3. evidence.json: inspected entries/locations, important claims, unknowns and tools successfully used. No invented timing/token counts.

You have at most 8 tool actions and 12 minutes. Include failed calls in your count. Keep individual tool output bounded (normally 8,000 characters). Reserve enough actions to write all three deliverables. End once they are complete. You must successfully use your assigned inspection facility; never substitute an evaluator result or peer answer.

