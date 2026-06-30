import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '../..');

function read(path) {
  return readFileSync(join(root, path), 'utf-8');
}

describe('Githooks exist', () => {
  it('pre-commit exists', () => {
    expect(existsSync(join(root, '.githooks/pre-commit'))).toBe(true);
  });

  it('pre-push exists', () => {
    expect(existsSync(join(root, '.githooks/pre-push'))).toBe(true);
  });
});

describe('pre-commit content', () => {
  const content = read('.githooks/pre-commit');

  it('contains spec/changes sibling validation', () => {
    expect(content.includes('changes.md')).toBe(true);
  });

  it('contains spec.md section validation', () => {
    expect(content.includes('spec.md')).toBe(true);
  });

  it('contains changes.md section validation', () => {
    expect(content.includes('changes.md')).toBe(true);
  });

  it('contains terraform fmt check', () => {
    expect(content.includes('terraform fmt')).toBe(true);
  });

  it('contains AGENTS.md deletion warning', () => {
    expect(content.includes('AGENTS.md')).toBe(true);
  });

  it('contains design-tdd.md existence check', () => {
    expect(content.includes('design-tdd.md')).toBe(true);
  });

  it('contains em-dash replacement script', () => {
    expect(content.includes('replace-em-dashes')).toBe(true);
  });

  it('contains skills-ref validate for staged skills', () => {
    expect(content.includes('skills-ref validate')).toBe(true);
  });
});

describe('pre-push content', () => {
  const content = read('.githooks/pre-push');

  it('contains skills directory immutability check', () => {
    expect(content.includes('skills/')).toBe(true);
  });

  it('contains changes.md without spec.md blocking', () => {
    expect(content.includes('changes.md')).toBe(true);
  });

  it('contains section validation for spec.md and changes.md', () => {
    expect(content.includes('spec.md')).toBe(true);
    expect(content.includes('changes.md')).toBe(true);
  });
});
