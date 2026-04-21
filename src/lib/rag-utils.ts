import knowledgeBase from './knowledge-base.json';

export function getRelevantContext(query: string): string {
  const normalizedQuery = query.toLowerCase();
  const matchedSnippets: string[] = [];

  // Expand query with synonyms
  let expandedQuery = normalizedQuery;
  Object.entries(knowledgeBase.synonyms).forEach(([key, synonyms]) => {
    if (synonyms.some(s => normalizedQuery.includes(s)) || normalizedQuery.includes(key)) {
      expandedQuery += ` ${key} ${synonyms.join(' ')}`;
    }
  });

  const queryWords = expandedQuery.split(/\s+/).filter(w => w.length > 2);

  knowledgeBase.knowledge.forEach((item) => {
    let score = 0;

    // Check keywords for exact or partial matches
    item.keywords.forEach(keyword => {
      if (normalizedQuery.includes(keyword.toLowerCase())) {
        score += 5;
      }
    });

    // Check content for query words
    queryWords.forEach(word => {
      if (item.content.toLowerCase().includes(word)) {
        score += 1;
      }
      if (item.category.toLowerCase().includes(word)) {
        score += 2;
      }
    });

    if (score > 0) {
      matchedSnippets.push(item.content);
    }
  });

  if (matchedSnippets.length === 0) {
    return "";
  }

  // Deduplicate and join
  return Array.from(new Set(matchedSnippets)).join('\n\n');
}
