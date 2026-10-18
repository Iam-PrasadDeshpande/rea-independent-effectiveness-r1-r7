// Reconstructed from app.asar/main-html.bundle.js, zero-based UTF-16
// character windows 9101000..9105458. Static reconstruction; not executed.
export async function search(options, deps) {
  const provider = deps.provider;
  if (!provider) {
    throw new Error('No embedding provider is active. Enable AI features in Settings \u2192 AI.');
  }
  const relevance = options.relevance ?? 'normal';
  const preset = {
    strict: { k: 5, minScore: 0.86 },
    normal: { k: 10, minScore: 0.83 },
    loose: { k: 20, minScore: 0.74 },
  }[relevance];

  let vectors;
  if ('text' in options.query) {
    vectors = options.query.text.trim()
      ? await (provider.embedQuery?.bind(provider) ?? provider.embed.bind(provider))([options.query.text])
      : [];
  } else {
    vectors = await deps.vectorsByNoteId(options.query.noteId);
    // The packaged service logs an informational message when this is empty.
    // Its private logger is outside the supplied adapter interface.
  }
  if (!vectors.length) return [];

  let noteIds;
  const scope = options.scope;
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

  const matches = new Map();
  for (const vector of vectors) {
    const rows = await deps.similaritySearch(vector, { k: preset.k, noteIds: noteIds ?? undefined });
    for (const row of rows) {
      const rawScore = 1 - row.distance * row.distance / 2;
      const score = rawScore < 0 ? 0 : rawScore > 1 ? 1 : rawScore;
      if (score < preset.minScore) continue;
      const key = `${row.noteId}:${row.chunkIndex}`;
      const previous = matches.get(key);
      if (!previous || score > previous.score) {
        matches.set(key, {
          noteId: row.noteId,
          chunkIndex: row.chunkIndex,
          chunkText: row.chunkText,
          score,
        });
      }
    }
  }
  return Array.from(matches.values()).sort((a, b) => b.score - a.score).slice(0, preset.k);
}
