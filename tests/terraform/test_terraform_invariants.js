import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '../..');

function read(path) {
  return readFileSync(join(root, path), 'utf-8');
}

describe('Terraform invariants', () => {
  const childVars = read('terraform/github/variables.tf');
  const childMain = read('terraform/github/main.tf');
  const rootMain = read('terraform/main.tf');
  const rootVars = read('terraform/github/variables.tf');
  const tfvars = read('terraform/terraform.tfvars');
  const gitignore = read('.gitignore');

  it('child module variables contain branch_protection with all required fields', () => {
    const fields = ['creation', 'update', 'deletion', 'non_fast_forward', 'required_linear_history', 'pull_request'];
    for (const f of fields) {
      expect(childVars.includes(f)).toBe(true);
    }
  });

  it('main.tf references var.branch_protection.rules fields, not hardcoded values', () => {
    expect(childMain.includes('var.branch_protection.rules')).toBe(true);
  });

  it('root module variable schema mirrors child module', () => {
    expect(rootMain.includes('branch_protection')).toBe(true);
  });

  it('tfvars contains branch_protection rules', () => {
    expect(tfvars.includes('branch_protection')).toBe(true);
  });

  it('tfvars rules match expected defaults', () => {
    expect(tfvars.includes('creation                = false')).toBe(true) ||
    expect(tfvars.includes('creation = false')).toBe(true);
    expect(tfvars.includes('update                  = true')).toBe(true) ||
    expect(tfvars.includes('update = true')).toBe(true);
    expect(tfvars.includes('deletion                = true')).toBe(true) ||
    expect(tfvars.includes('deletion = true')).toBe(true);
    expect(tfvars.includes('non_fast_forward        = true')).toBe(true) ||
    expect(tfvars.includes('non_fast_forward = true')).toBe(true);
    expect(tfvars.includes('required_approving_review_count   = 1')).toBe(true) ||
    expect(tfvars.includes('required_approving_review_count = 1')).toBe(true);
  });

  it('gitignore contains terraform state entries', () => {
    expect(gitignore).toContain('.terraform/');
    expect(gitignore).toContain('*.tfstate');
    expect(gitignore).toContain('*.tfstate.*');
  });
});
