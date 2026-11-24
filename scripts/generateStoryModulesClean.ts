// scripts/generateStoryModulesClean.ts
// Generate TypeScript Story modules from Markdown files in src/content/stories
import * as fs from 'fs';
import * as path from 'path';

const markdownDir = path.resolve('c:/Users/dell/Echoes Of Identity/src/content/stories');
const outputDir = markdownDir; // write .ts files to same folder

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-]/g, '')
    .replace(/\-+/g, '-')
    .replace(/^\-+|\-+$/g, '');
}

function firstSentences(content: string, count: number = 2): string {
  const sentences = content.split(/(?<=\.|!|\?)\s+/);
  return sentences.slice(0, count).join(' ');
}

// Very lightweight front‑matter parser (YAML between --- delimiters)
function parseFrontMatter(raw: string) {
  const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n/);
  const data: any = {};
  if (fmMatch) {
    const yaml = fmMatch[1];
    yaml.split('\n').forEach(line => {
      const [key, ...rest] = line.split(':');
      if (!key) return;
      const value = rest.join(':').trim();
      if (value.startsWith('[') && value.endsWith(']')) {
        data[key.trim()] = value.slice(1, -1).split(',').map(v => v.replace(/\"/g, '').trim());
      } else {
        data[key.trim()] = value.replace(/^\"|\"$/g, '');
      }
    });
  }
  const content = raw.replace(/^---\n[\s\S]*?\n---\n/, '').trim();
  return { data, content };
}

const mdFiles = fs.readdirSync(markdownDir).filter(f => f.endsWith('.md'));
for (const file of mdFiles) {
  const filePath = path.join(markdownDir, file);
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = parseFrontMatter(raw);
  const title = data.title || slugify(file.replace('.md', ''));
  const slug = slugify(title);
  const storyObj = {
    slug,
    name: data.contributor || (data.anonymous ? 'Anonymous' : 'Contributor not specified'),
    title,
    excerpt: firstSentences(content),
    content: content.replace(/`/g, '\\\\`'),
    collection: data.collection || 'Djerba',
    themes: data.tags || [],
    coverImage: null,
    coverImageAlt: null,
    featured: data.featured === 'true' || false,
    published: true,
    publishedAt: data.date || undefined,
    readingTimeMinutes: undefined,
    consentStatus: 'approved',
    contributorSlug: undefined,
    location: data.location || undefined,
    period: data.period || undefined,
  };

  const tsContent = `import type { Story } from './types';\n\nexport const ${slug.replace(/-/g, '_')}: Story = ${JSON.stringify(storyObj, null, 2)};\n`;
  const tsFile = path.join(outputDir, `${slug}.ts`);
  fs.writeFileSync(tsFile, tsContent, 'utf-8');
  console.log('Generated', tsFile);
}

console.log('Story modules generation complete.');
