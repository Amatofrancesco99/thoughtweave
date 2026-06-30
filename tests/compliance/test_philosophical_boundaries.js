import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '../..');

function read(path) {
  return readFileSync(join(root, path), 'utf-8');
}

describe('Compliance: SDD', () => {
  const content = read('skills/sdd/SKILL.md');

  it('must contain statement that agent is a thinking partner or critic, not executor', () => {
    expect(content.includes('thinking partner')).toBe(true);
  });

  it('must contain instruction to keep developer cognitively engaged', () => {
    expect(content.includes('cognitively engaged')).toBe(true);
  });

  it('must contain instruction that agreement must be earned', () => {
    expect(content.includes('independently verifying')).toBe(true);
  });

  it('must NOT contain instructions to write implementation code', () => {
    const codePatterns = ['implement the code', 'write the code', 'generate code'];
    for (const p of codePatterns) {
      expect(content.includes(p)).toBe(false);
    }
  });

  it('must NOT contain instructions to accept vague requirements', () => {
    const antiPatterns = ['vague requirements are acceptable', 'proceed with vague requirements', 'accept vague requirements as-is'];
    for (const p of antiPatterns) {
      expect(content.includes(p)).toBe(false);
    }
  });
});

describe('Compliance: Changes', () => {
  const content = read('skills/changes/SKILL.md');

  it('must contain instruction that document is for multiple audiences', () => {
    expect(content.includes('developers') && content.includes('reviewers') && content.includes('managers') && content.includes('stakeholders')).toBe(true);
  });

  it('must contain instruction to flag both unimplemented and untracked behaviour', () => {
    expect(content.includes('unimplemented') && content.includes('untracked')).toBe(true);
  });

  it('must contain instruction to not say everything looks good without verifying', () => {
    expect(content.includes('everything looks good') || content.includes('verifying each requirement')).toBe(true);
  });
});

describe('Compliance: Init-agents-file', () => {
  const content = read('skills/init-agents-file/SKILL.md');

  it('must contain instruction that AGENTS.md is project-specific, not generic', () => {
    expect(content.includes('project-specific') || content.includes('project\'s actual')).toBe(true);
  });

  it('must contain the mandatory principle about inspecting existing implementations', () => {
    expect(content.includes('inspection of existing implementations')).toBe(true);
  });
});

describe('Compliance: All three skills', () => {
  const skills = ['skills/sdd/SKILL.md', 'skills/changes/SKILL.md', 'skills/init-agents-file/SKILL.md'];

  for (const skillPath of skills) {
    const name = skillPath.split('/')[1];
    const content = read(skillPath);

    it(`${name} must contain instruction to surface hidden assumptions`, () => {
      expect(content.includes('hidden assumptions')).toBe(true);
    });

    it(`${name} must contain emphasis that developer stays at the center`, () => {
      expect(content.includes('developer') || content.includes('user')).toBe(true);
    });
  }
});
