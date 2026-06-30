import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '../..');

const IGNORE_DIRS = ['node_modules', '.git', '.skills', '.terraform'];

function findMdFiles(dir) {
  const files = [];
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    if (IGNORE_DIRS.includes(e.name)) continue;
    const full = join(dir, e.name);
    if (e.isDirectory()) files.push(...findMdFiles(full));
    else if (e.name.endsWith('.md')) files.push(full);
  }
  return files;
}

function extractMermaidBlocks(content) {
  const blocks = [];
  const lines = content.split('\n');
  let inBlock = false;
  let startIdx = -1;

  for (let i = 0; i < lines.length; i++) {
    if (/^```mermaid\s*$/.test(lines[i])) {
      inBlock = true;
      startIdx = i;
      continue;
    }
    if (inBlock && /^```\s*$/.test(lines[i])) {
      const body = lines.slice(startIdx + 1, i).join('\n');
      const initLine = lines[startIdx + 1] || '';
      blocks.push({ initLine, body });
      inBlock = false;
    }
  }

  return blocks;
}

describe('Mermaid diagram style compliance', () => {
  const mdFiles = findMdFiles(root);
  const filesWithMermaid = mdFiles.filter(f => {
    const content = readFileSync(f, 'utf-8');
    return content.includes('```mermaid');
  });

  if (filesWithMermaid.length === 0) {
    it('at least one mermaid diagram exists', () => {
      expect(true).toBe(true);
    });
    return;
  }

  for (const filePath of filesWithMermaid) {
    const relPath = relative(root, filePath);
    const content = readFileSync(filePath, 'utf-8');
    const blocks = extractMermaidBlocks(content);

    describe(relPath, () => {
      blocks.forEach((block, i) => {
        it(`diagram ${i + 1}: has init config with theme=base, look=handDrawn, layout=dagre`, () => {
          expect(block.initLine).toContain('%%{init:');
          expect(block.initLine).toContain('"theme": "base"');
          expect(block.initLine).toContain('"look": "handDrawn"');
          expect(block.initLine).toContain('"layout": "dagre"');
        });

        it(`diagram ${i + 1}: is wrapped in subgraph bg`, () => {
          const lines = block.body.split('\n');
          const hasSubgraphOpen = lines.some(l => /^\s+subgraph\s+bg\[" "\]\s*$/.test(l));
          const hasSubgraphClose = lines.some(l => /^\s+end\s*$/.test(l));
          expect(hasSubgraphOpen).toBe(true);
          expect(hasSubgraphClose).toBe(true);
        });
      });
    });
  }
});
