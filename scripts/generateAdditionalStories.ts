// scripts/generateAdditionalStories.ts
import mammoth from 'mammoth';
import * as fs from 'fs';
import * as path from 'path';

const DOCX_FILES = [
  'C:/Users/dell/OneDrive/Documents/GitHub/Echoes-Of-Identity/Echoes_of_Identity_Daniel_Albert_Additional_Stories (1).docx',
  'C:/Users/dell/OneDrive/Documents/GitHub/Echoes-Of-Identity/Echoes_of_Identity_Recovered_Story_Collection (1).docx',
];

const STORIES_DIR = path.resolve('c:/Users/dell/Echoes Of Identity/src/content/stories');

async function main() {
  let counter = 1;
  for (const docxPath of DOCX_FILES) {
    const result = await mammoth.convertToHtml({ path: docxPath });
    const html = result.value;
    // Split on <h1> tags (each story starts with an <h1>)
    const sections = html.split(/<h1[^>]*>/i);
    // The first element may be empty text before the first heading
    for (let i = 1; i < sections.length; i++) {
      const raw = sections[i];
      const lines = raw.split('\n');
      // Extract title and body from the HTML section
      const titleEndIdx = raw.indexOf('</h1>');
      const title = raw.slice(0, titleEndIdx).trim();
      const body = raw.slice(titleEndIdx + 5).trim();
      const slug = `additional-story-${counter}`;
      const mdPath = path.join(STORIES_DIR, `${slug}.md`);
      const tsPath = path.join(STORIES_DIR, `${slug}.ts`);
      const mdContent = `---\ntitle: "${title}"\nslug: "${slug}"\n---\n\n${body}\n`;
      fs.writeFileSync(mdPath, mdContent, 'utf-8');
      const exportName = slug.replace(/-/g, '_');
      const tsContent = `import type { Story } from './types';\nimport content from './${slug}.md';\n\nexport const ${exportName}: Story = {\n  title: "${title}",\n  slug: "${slug}",\n  content,\n  published: true,\n  featured: false,\n  collection: 'additional',\n  themes: [],\n};\n`;
      fs.writeFileSync(tsPath, tsContent, 'utf-8');
      console.log('Created story', slug);
      counter++;
    }
  }
}

main().catch(err => console.error(err));
