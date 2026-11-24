// scripts/restoreDeletedStories.ts
// Restores all .ts story modules that were deleted from src/content/stories

import { execSync } from 'child_process';
import * as path from 'path';
import * as fs from 'fs';

const storiesDir = path.resolve('c:/Users/dell/Echoes Of Identity/src/content/stories');

// Step 1: Get list of deleted .ts files
function getDeletedTsFiles(): string[] {
  const cmd = `git log --diff-filter=D --name-only --pretty=format:%H -- "${storiesDir}/*.ts"`;
  const output = execSync(cmd, { encoding: 'utf-8' });
  // Output format: commitHash\nfilePath1\nfilePath2\n... for each deletion block
  const lines = output.split('\n').filter(l => l.trim().length > 0);
  const deleted: string[] = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // If line looks like a SHA (40 hex chars), skip; next lines are file paths until next SHA
    if (/^[0-9a-f]{40}$/.test(line)) continue;
    if (line.endsWith('.ts')) {
      deleted.push(line.trim());
    }
  }
  return Array.from(new Set(deleted)); // unique
}

function restoreFile(filePath: string, deletionCommit: string) {
  // Restore the version from the parent of the deletion commit
  const parentCommit = `${deletionCommit}^`;
  const relPath = path.relative(process.cwd(), filePath);
  const cmd = `git checkout ${parentCommit} -- "${relPath}"`;
  execSync(cmd, { stdio: 'inherit' });
  console.log(`Restored ${filePath} from ${parentCommit}`);
}

function main() {
  const deletedFiles = getDeletedTsFiles();
  if (deletedFiles.length === 0) {
    console.log('No deleted .ts story files found.');
    return;
  }
  console.log('Deleted story .ts files to restore:', deletedFiles);
  for (const file of deletedFiles) {
    // Find the commit where this file was deleted
    const cmd = `git log -1 --diff-filter=D --pretty=format:%H -- "${file}"`;
    const commitHash = execSync(cmd, { encoding: 'utf-8' }).trim();
    if (commitHash) {
      restoreFile(file, commitHash);
    } else {
      console.warn(`Could not find deletion commit for ${file}`);
    }
  }
}

main();
