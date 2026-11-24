// scripts/extractStories.ts
import * as fs from 'fs';
import * as path from 'path';

interface StoryMeta {
  title: string;
  contributor?: string | null;
  type?: string | null;
  category?: string[] | null;
  tags?: string[] | null;
  date?: string | null;
  location?: string | null;
  language?: string | null;
  featured?: boolean;
}

// Helper to slugify title
function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-]/g, '')
    .replace(/\-+/g, '-')
    .replace(/^\-+|\-+$/g, '');
}

// Load all markdown files from source pack
const sourceDir = path.resolve('c:/Users/dell/Downloads/Echoes_of_Identity_AntiGravity_Source_Pack (5)');
const outputDir = path.resolve('c:/Users/dell/Echoes Of Identity/src/content/stories');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function processFile(filePath: string) {
  const content = fs.readFileSync(filePath, 'utf-8');
  // Split on headings that start with "## Story"
  const parts = content.split(/\n(?=##\s+Story\s+\d+)/);
  for (const part of parts) {
    const titleMatch = part.match(/##\s+Story\s+\d+\.\s+([^\n]+)/);
    if (!titleMatch) continue;
    const title = titleMatch[1].trim();
    const slug = slugify(title);
    // Extract optional metadata from the part (e.g., Themes: ...)
    const meta: StoryMeta = { title };
    const themesMatch = part.match(/Themes?:\s*(.+)/i);
    if (themesMatch) {
      meta.tags = themesMatch[1].split('·').map(t => t.trim());
    }
    // Reading time will be calculated later
    // Build front matter
    const frontMatter = `---\n${Object.entries(meta)
      .map(([k, v]) => {
        if (v === undefined || v === null) return '';
        if (Array.isArray(v)) return `${k}: [${v.map(i => `"${i}"`).join(', ')}]`;
        return `${k}: "${v}"`;
      })
      .filter(Boolean)
      .join('\n')}
---\n`;
    const body = part.replace(/^##.*$/m, '').trim();
    const fileContent = `${frontMatter}\n${body}\n`;
    const outPath = path.join(outputDir, `${slug}.md`);
    fs.writeFileSync(outPath, fileContent, 'utf-8');
    console.log(`Written ${outPath}`);
  }
}

// Process each .txt markdown file in the source directory
const files = fs.readdirSync(sourceDir);
for (const file of files) {
  if (file.toLowerCase().endsWith('.txt')) {
    const fullPath = path.join(sourceDir, file);
    processFile(fullPath);
  }
}

console.log('Extraction complete.');
