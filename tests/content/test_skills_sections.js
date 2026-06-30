import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '../..');

function read(path) {
  return readFileSync(join(root, path), 'utf-8');
}

function has(content, patterns) {
  return patterns.every(p => content.includes(p));
}

describe('Content: SDD skill', () => {
  const content = read('skills/sdd/SKILL.md');

  it('contains adaptive questioning mode logic', () => {
    expect(has(content, ['light mode', 'deep mode'])).toBe(true);
  });

  it('contains Discovery phase with intent labels', () => {
    expect(has(content, ['[Problem]', '[Technical]', '[Decision]'])).toBe(true);
  });

  it('contains one-question-at-a-time rule', () => {
    expect(content.includes('one at a time')).toBe(true);
  });

  it('contains three ordered questions in sequence', () => {
    expect(has(content, ['Context inheritance', 'Output location', 'Web search'])).toBe(true);
  });

  it('contains context discovery logic', () => {
    expect(has(content, ['AGENTS.md', 'past 5 specifications'])).toBe(true);
  });

  it('contains competency assessment logic', () => {
    expect(has(content, ['Expert', 'Comfortable', 'New'])).toBe(true);
  });

  it('contains instruction to challenge assumptions', () => {
    expect(has(content, ['have you considered', 'what about', 'is there a different way'])).toBe(true);
  });

  it('contains instruction to surface hidden assumptions', () => {
    expect(content.includes('hidden assumptions')).toBe(true);
  });

  it('contains instruction to self-critique output', () => {
    expect(content.includes('self-critique') || content.includes('self-review')).toBe(true);
  });

  it('contains web search integration', () => {
    expect(content.includes('web search')).toBe(true);
  });

  it('references Design TDD subskill', () => {
    expect(has(content, ['Given-When-Then', 'design-tdd.md'])).toBe(true);
  });

  it('contains Mermaid diagram configuration', () => {
    expect(content.includes('"theme"') && content.includes('handDrawn') && content.includes('dagre')).toBe(true);
  });

  it('contains GitHub alert tag usage rules', () => {
    expect(has(content, ['> [!IMPORTANT]', '> [!WARNING]', '> [!CAUTION]', '> [!TIP]', '> [!NOTE]'])).toBe(true);
  });

  it('contains output validation instructions', () => {
    expect(content.toLowerCase().includes('validate')).toBe(true);
  });

  it('has a Workflow section with Mermaid diagram', () => {
    expect(content.includes('```mermaid')).toBe(true);
  });
});

describe('Content: Changes skill', () => {
  const content = read('skills/changes/SKILL.md');

  it('contains instruction to document hidden assumptions', () => {
    expect(content.includes('hidden assumptions')).toBe(true);
  });

  it('contains narrative summary section', () => {
    expect(content.includes('Summary')).toBe(true);
  });

  it('contains ordered questions', () => {
    expect(has(content, ['Context inheritance', 'Output location'])).toBe(true);
  });

  it('contains implementation validation instructions', () => {
    expect(has(content, ['unimplemented', 'untracked'])).toBe(true);
  });

  it('contains traceability instructions', () => {
    expect(content.includes('maps back') || content.includes('anchor')).toBe(true);
  });

  it('contains output validation instructions', () => {
    expect(content.includes('validate')).toBe(true);
  });

  it('contains self-review instructions', () => {
    expect(content.toLowerCase().includes('self-critique') || content.toLowerCase().includes('self-review')).toBe(true);
  });

  it('has a Workflow section with Mermaid diagram', () => {
    expect(content.includes('```mermaid')).toBe(true);
  });
});

describe('Content: Init-agents-file skill', () => {
  const content = read('skills/init-agents-file/SKILL.md');

  it('contains sequential interview approach', () => {
    expect(content.includes('one at a time')).toBe(true);
  });

  it('contains branching logic based on repository state', () => {
    expect(has(content, ['repository is empty', 'repository already exists'])).toBe(true);
  });

  it('contains instructions to inspect existing code', () => {
    expect(content.includes('Inspect')).toBe(true);
  });

  it('contains distinction between auto-inferrable and must-ask context', () => {
    expect(has(content, ['auto-inferred', 'cannot'])).toBe(true);
  });

  it('contains configurable areas as multi-select', () => {
    expect(content.includes('multiple selection')).toBe(true);
  });

  it('contains the mandatory principle about inspecting existing implementations', () => {
    expect(content.includes('inspection of existing implementations')).toBe(true);
  });

  it('contains instructions for CLAUDE.md symlink', () => {
    expect(content.includes('symlink')).toBe(true);
  });

  it('contains output validation instructions', () => {
    expect(content.includes('validate') || content.includes('validation')).toBe(true);
  });

  it('contains required AGENTS.md sections', () => {
    expect(has(content, ['Domain', 'Repository Structure', 'Architectural Directives', 'Engineering Best Practices', 'Workflow Checklist'])).toBe(true);
  });

  it('has a Workflow section with Mermaid diagram', () => {
    expect(content.includes('```mermaid')).toBe(true);
  });
});

describe('Design TDD file', () => {
  const path = 'skills/sdd/design-tdd.md';
  it('exists', () => {
    expect(existsSync(join(root, path))).toBe(true);
  });

  const content = read(path);

  it('contains Given-When-Then structure', () => {
    expect(has(content, ['Given', 'When', 'Then'])).toBe(true);
  });

  it('contains coverage requirements', () => {
    expect(content.toLowerCase().includes('happy path') && content.toLowerCase().includes('error states') && content.toLowerCase().includes('edge cases') && content.toLowerCase().includes('integration')).toBe(true);
  });

  it('contains non-functional validation', () => {
    expect(content.includes('non-functional')).toBe(true);
  });

  it('contains spec feedback loop', () => {
    expect(content.includes('cannot be tested')).toBe(true);
  });

  it('contains blueprint purpose', () => {
    expect(content.includes('blueprint')).toBe(true);
  });

  it('contains asking permission first', () => {
    expect(content.includes('Shall I describe the test cases now')).toBe(true);
  });
});
