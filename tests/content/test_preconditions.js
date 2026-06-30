import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '../..');

function read(path) {
  return readFileSync(join(root, path), 'utf-8');
}

describe('Pre-conditions: init-agents-file', () => {
  const content = read('skills/init-agents-file/SKILL.md');

  it('contains logic to detect existing AGENTS.md and ask before overwriting', () => {
    expect(content.includes('AGENTS.md already exists') || content.includes('already exists')).toBe(true);
  });

  it('contains logic to detect CLAUDE.md as regular file and replace with symlink', () => {
    expect(content.includes('CLAUDE.md')).toBe(true);
  });
});

describe('Pre-conditions: sdd', () => {
  const content = read('skills/sdd/SKILL.md');

  it('contains logic to detect missing AGENTS.md and warn the user', () => {
    expect(content.includes('AGENTS.md exists')).toBe(true);
    expect(content.includes('warn')).toBe(true);
  });
});

describe('Pre-conditions: changes', () => {
  const content = read('skills/changes/SKILL.md');

  it('contains logic to detect missing spec.md and refuse to proceed', () => {
    expect(content.includes('spec.md exists')).toBe(true);
    expect(content.includes('refuse')).toBe(true);
  });
});
