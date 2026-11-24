// scripts/generateCandidateReport.ts
// Scan all markdown story files, evaluate against validation rules, detect duplicates, and output candidateReport.json

import * as fs from 'fs';
import * as path from 'path';

interface ReportItem {
  file: string; // absolute path
  title: string | null;
  slug: string | null;
  status: 'publish' | 'exclude';
  reason: string;
  duplicateOf?: string; // slug of the story it duplicates, if any
}

// Helper to slugify a title
function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-]/g, '')
    .replace(/\-+/g, '-')
    .replace(/^\-+|\-+$/g, '');
}

// Simple front‑matter extractor (YAML between --- markers)
function parseFrontMatter(content: string): { data: any; body: string } {
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---\n/);
  const data: any = {};
  if (fmMatch) {
    const yaml = fmMatch[1];
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

// Recursively collect .md files under stories directory
function collectMarkdownFiles(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectMarkdownFiles(full));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(full);
    }
  }
  return files;
}

const storiesDir = path.resolve('c:/Users/dell/Echoes Of Identity/src/content/stories');
const markdownFiles = collectMarkdownFiles(storiesDir);

const report: ReportItem[] = [];
const slugMap: Map<string, ReportItem> = new Map();

for (const file of markdownFiles) {
  const raw = fs.readFileSync(file, 'utf-8');
  const { data, body } = parseFrontMatter(raw);
  const title = data.title || null;
  const contributor = data.contributor || null;
  const anonymous = data.anonymous === 'true' || data.anonymous === true;
  const date = data.date || null;
  const slug = data.slug ? String(data.slug) : title ? slugify(String(title)) : null;
  const category = data.category || null;
  const language = data.language || null;

  // Basic validation per user rules
  let status: 'publish' | 'exclude' = 'exclude';
  let reason = '';

  if (!title) {
    reason = 'Missing title';
  } else if (!body || body.length < 20) {
    reason = 'Content too short or empty';
  } else if (!contributor && !anonymous) {
    // No contributor – treat as anonymous per user rules
    anonymous = true;
    contributor = 'Anonymous';
    status = 'publish';
    reason = 'Missing contributor – set as anonymous';
  } else if (!slug) {
    reason = 'Unable to generate slug';
  } else {
    // Passed required checks
    status = 'publish';
    reason = 'Meets all required fields';
  }

  const item: ReportItem = { file, title, slug, status, reason };

  // Duplicate detection based on slug
  if (slug) {
    if (slugMap.has(slug)) {
      // Existing entry – decide which to keep based on completeness
      const existing = slugMap.get(slug)!;
      const existingComplete = existing.status === 'publish';
      const currentComplete = status === 'publish';
      // Prefer the more complete (publish) version; if both publish, keep the first encountered
      if (currentComplete && !existingComplete) {
        // Replace existing with current and mark existing as duplicate
        existing.status = 'exclude';
        existing.reason = 'Duplicate slug, replaced by more complete version';
        existing.duplicateOf = slug;
        slugMap.set(slug, item);
        item.duplicateOf = undefined;
      } else {
        // Mark current as duplicate
        item.status = 'exclude';
        item.reason = 'Duplicate slug';
        item.duplicateOf = slug;
      }
    } else {
      slugMap.set(slug, item);
    }
  }

  report.push(item);
}

// Write report
const reportPath = path.resolve('c:/Users/dell/Echoes Of Identity/scripts/candidateReport.json');
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf-8');
console.log('Candidate report generated at', reportPath);
