// scripts/fetchStories.ts
import fetch from 'node-fetch';
import * as fs from 'fs';
import * as path from 'path';
import * as cheerio from 'cheerio';

const STORIES_DIR = path.resolve('c:/Users/dell/Echoes Of Identity/src/content/stories');
const ARCHIVE_BASE = 'https://echoesofidentity.org/archive';

// Helper to turn URL into slug (last path segment)
function urlToSlug(url: string): string {
  const parts = new URL(url).pathname.split('/');
  return parts.filter(p => p).pop()!.replace(/\.html?$/i, '');
}

// Fetch all story URLs across pagination
async function getAllStoryUrls(): Promise<string[]> {
  const urls: string[] = [];
  let page = 1;
  while (true) {
    const res = await fetch(`${ARCHIVE_BASE}?page=${page}`);
    if (!res.ok) break;
    const html = await res.text();
    const $ = cheerio.load(html);
    const links = $('a[href*="/archive/"]')
      .map((_, el) => $(el).attr('href'))
      .get()
      .filter(Boolean) as string[];
    const fullLinks = links.map(l => new URL(l, ARCHIVE_BASE).toString());
    if (fullLinks.length === 0) break;
    urls.push(...fullLinks);
    page++;
  }
  // Remove duplicates while preserving order
  return Array.from(new Set(urls));
}

// Process a single story URL – create .md and .ts files if they don't exist
async function processStory(url: string) {
  const slug = urlToSlug(url);
  const mdPath = path.join(STORIES_DIR, `${slug}.md`);
  const tsPath = path.join(STORIES_DIR, `${slug}.ts`);

  // Skip if already exists (preserve existing 20)
  if (fs.existsSync(mdPath) && fs.existsSync(tsPath)) return;

  const res = await fetch(url);
  const html = await res.text();
  const $ = cheerio.load(html);
  const title = $('h1').first().text().trim() || slug.replace(/-/g, ' ');
  const contentHtml = $('.story-content').html() || $('article').html() || '';
  const markdown = `---\ntitle: "${title}"\nslug: "${slug}"\n---\n\n${contentHtml}`;

  fs.writeFileSync(mdPath, markdown, 'utf-8');

  const exportName = slug.replace(/-/g, '_');
  const tsContent = `import type { Story } from './types';\nimport content from './${slug}.md';\n\nexport const ${exportName}: Story = {\n  title: "${title}",\n  slug: "${slug}",\n  content,\n  published: true,\n  featured: false,\n  collection: 'archive',\n  themes: [],\n};\n`;
  fs.writeFileSync(tsPath, tsContent, 'utf-8');
}

(async () => {
  const allUrls = await getAllStoryUrls();
  console.log('Found', allUrls.length, 'story URLs');
  for (const u of allUrls) {
    await processStory(u);
    console.log('Processed', u);
  }
  // After generating files, run the index builder
  require('./updateStoryIndex');
})();
