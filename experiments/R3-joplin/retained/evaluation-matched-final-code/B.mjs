// Static reconstruction of SearchService.search and its query/scope helpers.
// No target code is imported or executed.
export async function search(options, deps) {
  const provider = deps.provider;
  if (!provider) throw new Error('No embedding provider is active. Enable AI features in Settings → AI.');
  const presets = {
    strict: { k: 5, minScore: 0.86 },
    normal: { k: 10, minScore: 0.83 },
    loose: { k: 20, minScore: 0.74 },
  };
  const preset = presets[options.relevance ?? 'normal'];
  const query = options.query;
  let vectors;
  if ('text' in query) {
    vectors = query.text.trim()
      ? await (provider.embedQuery?.bind(provider) ?? provider.embed.bind(provider))([query.text])
      : [];
  } else {
    vectors = await deps.vectorsByNoteId(query.noteId);
    // The packaged helper logs an informational message when this array is empty.
  }
  if (!vectors.length) return [];
  const scope = options.scope;
  let noteIds;
  if (!scope || scope.type === 'all') {
    noteIds = null;
  } else {
    switch (scope.type) {
      case 'note': noteIds = [scope.noteId]; break;
      case 'folder':
        noteIds = (await deps.folderPreviews(scope.folderId, { fields: ['id'] })).map(row => row.id);
        break;
      case 'tag': noteIds = await deps.tagNoteIds(scope.tagId); break;
    }
  }
  if (noteIds && noteIds.length === 0) return [];
  const results = new Map();
  for (const vector of vectors) {
    const hits = await deps.similaritySearch(vector, { k: preset.k, noteIds: noteIds ?? undefined });
    for (const hit of hits) {
      let score = 1 - hit.distance * hit.distance / 2;
      score = score < 0 ? 0 : score > 1 ? 1 : score;
      if (score < preset.minScore) continue;
      const key = `${hit.noteId}:${hit.chunkIndex}`;
      const previous = results.get(key);
      if (!previous || score > previous.score) {
        results.set(key, { noteId: hit.noteId, chunkIndex: hit.chunkIndex, chunkText: hit.chunkText, score });
      }
    }
  }
  return Array.from(results.values()).sort((a, b) => b.score - a.score).slice(0, preset.k);
}
