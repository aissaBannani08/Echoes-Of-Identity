// scripts/restoreDeletedMarkdown.ts
// Restores any .md story files that were deleted from src/content/stories.

import { execSync } from 'child_process';
import * as path from 'path';
import * as fs from 'fs';

const storiesDir = path.resolve('c:/Users/dell/Echoes Of Identity/src/content/stories');

function getDeletedMarkdownFiles(): {file:string, commit:string}[] {
  // Get list of deletions with commit hashes
  const cmd = `git log --diff-filter=D --name-only --pretty=format:%H -- "${storiesDir}/*.md"`;
  const output = execSync(cmd, { encoding: 'utf-8' });
  const lines = output.split('\n').filter(l=>l.trim().length>0);
  const results: {file:string, commit:string}[] = [];
  let currentCommit: string | null = null;
  for (const line of lines) {
    if (/^[0-9a-f]{40}$/.test(line)) {
      currentCommit = line;
    } else if (line.endsWith('.md') && currentCommit) {
      results.push({file: line.trim(), commit: currentCommit});
    }
  }
  return results;
}

function restoreFile(filePath: string, deletionCommit: string) {
  // Restore the version from the parent of the deletion commit
  const parent = `${deletionCommit}^`;
  const relPath = path.relative(process.cwd(), filePath);
  console.log(`Restoring ${filePath} from ${parent}`);
  execSync(`git checkout ${parent} -- "${relPath}"`, { stdio: 'inherit' });
}

function main() {
  const deletions = getDeletedMarkdownFiles();
  if (deletions.length === 0) {
    console.log('No deleted markdown story files found.');
    return;
  }
  console.log('Deleted markdown files to restore:', deletions.map(d=>d.file));
  for (const {file, commit} of deletions) {
    if (!fs.existsSync(file)) {
      restoreFile(file, commit);
    } else {
      console.log(`File already exists, skipping: ${file}`);
    }
  }
}

main();
