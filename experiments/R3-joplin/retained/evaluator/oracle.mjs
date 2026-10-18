import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
import { stripTypeScriptTypes } from 'node:module';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const sourcePath = path.join(root, 'joplin/packages/lib/services/ai/SearchService.ts');
const original = fs.readFileSync(sourcePath, 'utf8');
// Adapter-only changes: strip imports/exports, erase TS syntax, expose the class.
// No executable search logic is rewritten.
const adapted = original.replace(/^import .*;\r?\n/gm, '').replace(/^export type .*;\r?\n/gm, '').replace('export default class SearchService', 'class SearchService');
const executable = stripTypeScriptTypes(adapted, { mode: 'strip' }) + '\nglobalThis.ReferenceSearchService = SearchService;';

export async function referenceScenario(scenario) {
  const env = scenario.environment ?? {};
  const trace = [];
  let lookup = 0;
  const invoke = (name, args, value) => {
    trace.push({ name, args });
    if (env.throwAt === name) throw new Error(`synthetic:${name}`);
    return structuredClone(value);
  };
  const provider = {
    modelId: 'synthetic-model', dimension: 2,
    embed: async texts => invoke('embed', [texts], env.queryVectors ?? [[1, 0]]),
  };
  if (env.hasQueryEmbedder !== false) provider.embedQuery = async texts => invoke('embedQuery', [texts], env.queryVectors ?? [[1, 0]]);
  const context = {
    Logger: { create: () => ({ info() {}, warn() {}, error() {} }) },
    AiService: { instance: () => ({ getActiveEmbeddingProvider: () => env.providerAvailable === false ? null : provider }) },
    NoteEmbedding: {
      vectorsByNoteId: async id => invoke('vectorsByNoteId', [id], env.storedVectors ?? []),
      similaritySearch: async (vector, options) => invoke('similaritySearch', [vector, options], (env.hitsPerVector ?? [])[lookup++] ?? []),
    },
    Note: { previews: async (id, options) => invoke('folder', [id, options], (env.folderIds ?? []).map(id => ({ id }))) },
    Tag: { noteIds: async id => invoke('tag', [id], env.tagIds ?? []) },
    splitByMarkdownFormattingApproximate: () => { throw new Error('Outside frozen reconstruction boundary'); },
  };
  vm.createContext(context, { codeGeneration: { strings: false, wasm: false } });
  new vm.Script(executable, { filename: 'pinned-SearchService.ts' }).runInContext(context, { timeout: 2000 });
  try {
    const results = await new context.ReferenceSearchService().search(structuredClone(scenario.request));
    return JSON.parse(JSON.stringify({ results, trace }));
  } catch (error) {
    return JSON.parse(JSON.stringify({ error: error.message, trace }));
  }
}

if (process.argv[2] === 'freeze') {
  const scenarios = JSON.parse(fs.readFileSync(path.join(root, 'deterministic-cases.json'), 'utf8'));
  const outputs = [];
  for (const scenario of scenarios) outputs.push({ id: scenario.id, expected: await referenceScenario(scenario) });
  const destination = path.resolve(process.argv[3]);
  fs.writeFileSync(destination, JSON.stringify({ sourceCommit: 'e41516e669efb693b009bedb21f3eb1fcbea4fc9', boundary: 'SearchService.search', outputs }, null, 2));
  console.log(JSON.stringify({ status: 'REFERENCE_EXECUTED', count: outputs.length, destination }));
}
