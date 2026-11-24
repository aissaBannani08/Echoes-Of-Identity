// scripts/prepareStories.ts
// Generates .ts story modules from markdown files, preserving existing modules.

import * as fs from 'fs';
import * as path from 'path';

interface FrontMatter {
  title?: string;
  contributor?: string;
  anonymous?: boolean | string;
  date?: string;
  slug?: string;
  collection?: string;
  tags?: string[];
  category?: string;
  language?: string;
  [key: string]: any;
}

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-]/g, '')
    .replace(/\-+/g, '-')
    .replace(/^\-+|\-+$/g, '');
}

function parseFrontMatter(content: string): { data: FrontMatter; body: string } {
  const match = content.match(/^---\n([\s\S]*?)\n---\n/);
  const data: FrontMatter = {};
  if (match) {
    const yaml = match[1];
    yaml.split('\n').forEach(line => {
      const [key, ...rest] = line.split(':');
      if (!key) return;
      const value = rest.join(':').trim();
      if (value.startsWith('[') && value.endsWith(']')) {
        data[key.trim()] = value.slice(1, -1).split(',').map(v => v.replace(/"/g, '').trim());
      } else {
        data[key.trim()] = value.replace(/^"|"$/g, '');
      }
    });
  }
  const body = content.replace(/^---[\s\S]*?---\n/, '').trim();
  return { data, body };
}

const storiesDir = path.resolve('c:/Users/dell/Echoes Of Identity/src/content/stories');
const markdownFiles = fs.readdirSync(storiesDir).filter(f => f.endsWith('.md'));

let generatedCount = 0;
let skippedExisting = 0;
let excluded = 0;

markdownFiles.forEach(mdFile => {
  const mdPath = path.join(storiesDir, mdFile);
  const raw = fs.readFileSync(mdPath, 'utf-8');
  const { data, body } = parseFrontMatter(raw);

  // Basic validation per user rules
  if (!data.title || !body || body.length < 20) {
    excluded++;
    return;
  }

  // Ensure contributor or anonymous flag
  let contributor = data.contributor;
  let anonymous = false;
  if (!contributor) {
    // Mark as anonymous if no contributor provided
    anonymous = true;
    contributor = 'Anonymous';
  } else if (data.anonymous === true || data.anonymous === 'true') {
    anonymous = true;
  }

  const slug = data.slug ? String(data.slug) : slugify(String(data.title));
  if (!slug) {
    excluded++;
    return;
  }

  const tsFileName = `${slug}.ts`;
  const tsPath = path.join(storiesDir, tsFileName);

  // Do not overwrite existing .ts modules (the original 14)
  if (fs.existsSync(tsPath)) {
    skippedExisting++;
    return;
  }

  const storyObj: any = {
    slug,
    name: contributor,
    title: data.title,
    excerpt: body.split(/(?<=\.|\?|\!)\s+/)[0], // first sentence as excerpt
    content: body.replace(/`/g, '\\\`'),
    collection: data.collection || 'General',
    themes: data.tags || [],
    coverImage: null,
    coverImageAlt: null,
    featured: data.featured === true || data.featured === 'true' || false,
    published: true,
    publishedAt: data.date || undefined,
    readingTimeMinutes: undefined,
    consentStatus: 'approved',
    contributorSlug: undefined,
    location: data.location || undefined,
    period: data.period || undefined,
    category: data.category || undefined,
    language: data.language || undefined,
  };

  const tsContent = `import type { Story } from './types';\n\nexport const ${slug.replace(/-/g, '_')}: Story = ${JSON.stringify(storyObj, null, 2)};\n`;
  fs.writeFileSync(tsPath, tsContent, 'utf-8');
  console.log('Generated', tsPath);
  generatedCount++;
});

console.log('Story generation summary:', { generatedCount, skippedExisting, excluded });
