// scripts/updateStoryIndex.ts
// This script scans src/content/stories for all .ts story modules (excluding index.ts)
// and rewrites src/content/stories/index.ts to import each module and build ALL_STORIES.

import * as fs from 'fs';
import * as path from 'path';

const storiesDir = path.resolve('c:/Users/dell/Echoes Of Identity/src/content/stories');
const indexPath = path.join(storiesDir, 'index.ts');

// Helper: convert filename (e.g., "my-story.ts") to export name (my_story)
function toExportName(fileName: string): string {
  const base = fileName.replace(/\.ts$/, '');
  return base.replace(/-/g, '_');
}

// Gather all .ts files except index.ts and any that end with .d.ts
const tsFiles = fs.readdirSync(storiesDir)
  .filter(f => f.endsWith('.ts') && f !== 'index.ts' && !f.endsWith('.d.ts'));

// Build import lines
const importLines = tsFiles.map(f => {
  const exportName = toExportName(f);
  const relPath = `./${f.replace(/\.ts$/, '')}`;
  return `import { ${exportName} } from '${relPath}';`;
}).join('\n');

// Build ALL_STORIES array preserving current order for existing imports (the first 14)
// We'll place existing explicit imports first (those already in the file) then the rest.
const existingContent = fs.readFileSync(indexPath, 'utf-8');
// Find the line where the array starts ("const ALL_STORIES")
const arrayStartIdx = existingContent.indexOf('const ALL_STORIES');
let prefix = existingContent.slice(0, arrayStartIdx);
// We'll replace the whole array definition.
const allStoriesArray = `const ALL_STORIES: Story[] = [\n${tsFiles.map(f => `  ${toExportName(f)},`).join('\n')}\n];`;

const suffix = '\n' + existingContent.slice(existingContent.indexOf('export function getPublishedStories'));

const newIndexContent = `${prefix}
${importLines}

${allStoriesArray}
${suffix}`;

fs.writeFileSync(indexPath, newIndexContent, 'utf-8');
console.log('Story index updated with', tsFiles.length, 'modules.');
