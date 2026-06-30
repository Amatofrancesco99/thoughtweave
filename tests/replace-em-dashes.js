#!/usr/bin/env node

import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const IGNORE_DIRS = new Set(['node_modules', '.skills', '.git', '.terraform']);
const files = [];

function walk(dir) {
  let entries;
  try { entries = readdirSync(dir); } catch { return; }
  for (const entry of entries) {
    const full = join(dir, entry);
    let stat;
    try { stat = statSync(full); } catch { continue; }
    if (stat.isDirectory()) {
      if (!IGNORE_DIRS.has(entry)) walk(full);
    } else if (entry.endsWith('.md')) {
      files.push(full);
    }
  }
}

const args = process.argv.slice(2);
if (args.length > 0) {
  for (const arg of args) {
    try {
      const stat = statSync(arg);
      if (stat.isDirectory()) walk(arg);
      else if (arg.endsWith('.md')) files.push(arg);
    } catch { /* skip */ }
  }
} else {
  walk('.');
}

let replacements = 0;

for (const file of files) {
  const content = readFileSync(file, 'utf-8');
  const updated = content.replace(/\u2014/g, '-');
  if (content !== updated) {
    writeFileSync(file, updated, 'utf-8');
    console.log(`Replaced em dashes in: ${file}`);
    replacements++;
  }
}

if (replacements > 0) {
  console.log(`Replaced em dashes in ${replacements} file(s).`);
} else {
  console.log('No em dashes found.');
}
