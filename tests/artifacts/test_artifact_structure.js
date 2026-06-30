import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '../..');

const headerChecks = [
  '## Objective',
  '## Repository Structure',
  '## `CONTRIBUTING.md` Structure',
  '## `/init-agents-file`',
  '## `/sdd`',
  '## `/changes`',
  '## Specifications Folder',
  '## Terraform',
  '## Testing & Validation',
  '## Recommended Workflow',
  '## Jira Integration',
  '## README Generation'
];

describe('Artifact structure: spec.md', () => {
  const path = 'specs/0-thoughtweave-def/spec.md';
  it('exists', () => {
    expect(existsSync(join(root, path))).toBe(true);
  });

  const content = readFileSync(join(root, path), 'utf-8');

  it('contains all required sections', () => {
    for (const h of headerChecks) {
      expect(content.includes(h)).toBe(true);
    }
  });
});

describe('Artifact structure: changes.md', () => {
  const path = 'specs/0-thoughtweave-def/changes.md';
  it('exists', () => {
    expect(existsSync(join(root, path))).toBe(true);
  });

  const content = readFileSync(join(root, path), 'utf-8');

  it('contains required sections', () => {
    const sections = ['Why', 'Overview', 'Runtime Impact Summary', 'Changes', 'Tests', 'Workflow Diagram', 'Summary'];
    for (const s of sections) {
      expect(content.includes(`## ${s}`)).toBe(true);
    }
  });
});

describe('Artifact structure: AGENTS.md', () => {
  const path = 'AGENTS.md';
  it('exists', () => {
    expect(existsSync(join(root, path))).toBe(true);
  });

  const content = readFileSync(join(root, path), 'utf-8');
});


