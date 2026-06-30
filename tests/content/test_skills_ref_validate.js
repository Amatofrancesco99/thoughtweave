import { describe, it, expect } from 'vitest';
import { execSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '../..');

const SKILL_DIRS = [
  'skills/changes',
  'skills/init-agents-file',
  'skills/sdd',
];

describe('skills-ref validation', () => {
  for (const dir of SKILL_DIRS) {
    it(`validates ${dir}`, () => {
      const fullPath = join(root, dir);
      expect(existsSync(fullPath)).toBe(true);
      try {
        const output = execSync(`npx skills-ref validate "${fullPath}"`, {
          encoding: 'utf-8',
          timeout: 15000,
        });
        expect(output).toContain('Valid skill');
      } catch (e) {
        expect(e.stdout || e.message).toContain('Valid skill');
      }
    });
  }
});

describe('design-tdd.md frontmatter', () => {
  const filePath = join(root, 'skills/sdd/design-tdd.md');
  const content = readFileSync(filePath, 'utf-8');

  it('has valid frontmatter with name field', () => {
    expect(content).toMatch(/^---\nname: .+\ndescription: .+\n---/);
  });

  it('has name matching subskill identity', () => {
    const match = content.match(/^---\nname: (.+)/);
    expect(match).not.toBeNull();
    expect(match[1].trim()).toBe('design-tdd');
  });

  it('has non-empty description', () => {
    const match = content.match(/^---\nname: .+\ndescription: (.+)/);
    expect(match).not.toBeNull();
    expect(match[1].trim().length).toBeGreaterThan(0);
  });
});
