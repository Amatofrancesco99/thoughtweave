import { describe, it, expect } from 'vitest';
import { existsSync, lstatSync, readlinkSync } from 'node:fs';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '../..');

function path(p) {
  return join(root, p);
}

describe('Repository Structure', () => {
  it('has required root files', () => {
    const required = ['AGENTS.md', 'CLAUDE.md', 'IDEA.md', 'README.md', 'REPO_STRUCTURE.md', 'CONTRIBUTING.md', 'LICENSE', '.gitignore'];
    for (const f of required) {
      expect(existsSync(path(f))).toBe(true);
    }
  });

  it('CLAUDE.md is a symlink pointing to AGENTS.md', () => {
    expect(lstatSync(path('CLAUDE.md')).isSymbolicLink()).toBe(true);
    expect(readlinkSync(path('CLAUDE.md'))).toBe('AGENTS.md');
  });

  it('has required directories', () => {
    const dirs = [
      '.github/workflows', '.githooks',
      'skills/changes', 'skills/init-agents-file/references', 'skills/sdd',
      'specs/0-thoughtweave-def',
      'terraform/github',
      'tests/structural', 'tests/content', 'tests/compliance', 'tests/artifacts', 'tests/githooks', 'tests/terraform'
    ];
    for (const d of dirs) {
      expect(existsSync(path(d))).toBe(true);
    }
  });

  it('has skill files at expected paths', () => {
    const skills = [
      'skills/changes/SKILL.md',
      'skills/init-agents-file/SKILL.md',
      'skills/init-agents-file/references/commenting-philosophy.md',
      'skills/sdd/SKILL.md',
      'skills/sdd/design-tdd.md'
    ];
    for (const s of skills) {
      expect(existsSync(path(s))).toBe(true);
    }
  });

  it('has githooks', () => {
    expect(existsSync(path('.githooks/pre-commit'))).toBe(true);
    expect(existsSync(path('.githooks/pre-push'))).toBe(true);
  });

  it('gitignore has required entries', () => {
    const content = readFileSync(path('.gitignore'), 'utf-8');
    expect(content).toContain('node_modules/');
    expect(content).toContain('.skills/');
    expect(content).toContain('.terraform/');
    expect(content).toContain('*.tfstate');
    expect(content).toContain('*.tfstate.*');
    expect(content).toContain('*.log');
  });

  it('test files exist at expected paths', () => {
    const testFiles = [
      'tests/structural/test_layout.js',
      'tests/content/test_skills_sections.js',
      'tests/content/test_preconditions.js',
      'tests/content/test_design_tdd_exists.js',
      'tests/compliance/test_philosophical_boundaries.js',
      'tests/artifacts/test_artifact_structure.js',
      'tests/githooks/test_githook_content.js',
      'tests/terraform/test_terraform_invariants.js',
      'tests/replace-em-dashes.js',
      'tests/package.json'
    ];
    for (const f of testFiles) {
      expect(existsSync(path(f))).toBe(true);
    }
  });
});
