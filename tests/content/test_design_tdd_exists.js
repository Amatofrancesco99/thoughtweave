import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '../..');

describe('Design TDD subskill existence', () => {
  it('design-tdd.md exists at skills/sdd/design-tdd.md', () => {
    expect(existsSync(join(root, 'skills/sdd/design-tdd.md'))).toBe(true);
  });

  it('SDD skill references design-tdd.md', () => {
    const sddContent = readFileSync(join(root, 'skills/sdd/SKILL.md'), 'utf-8');
    expect(sddContent.includes('design-tdd.md')).toBe(true);
  });
});
