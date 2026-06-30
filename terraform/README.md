# Terraform - GitHub Branch Protection

This directory contains Infrastructure as Code configuration for managing the `thoughtweave` GitHub repository's branch protection ruleset. It does **not** create the repository - the repository already exists and is managed outside of Terraform.

## Prerequisites

- Terraform >= 1.5
- GitHub Personal Access Token with appropriate permissions

## Quick Start

> [!CAUTION]
> The `terraform apply` command requires the GitHub repository to be **public**. Until the repository is made public, Terraform operations will fail with authorization errors.

```shell
cd terraform
export GITHUB_TOKEN=ghp_xxx
terraform init
terraform apply
```

The `terraform.tfvars` file is loaded automatically.

## Authentication

No token is stored in any `.tf` or `.tfvars` file. The `integrations/github` provider reads the `GITHUB_TOKEN` environment variable automatically when initialized.

### Creating a GitHub Token

1. Go to GitHub Settings > Developer settings > Personal access tokens > Fine-grained tokens.
2. Click "Generate new token".
3. Set repository access to "Only select repositories" and choose the target repository.
4. Under "Permissions", set **Administration** to **Read and write** (required to manage rulesets).
5. **Metadata** is auto-granted as **Read-only** for selected repos.

The token does not need any other permissions.

### Required Repository Role

The user running `terraform apply` must have at least **Write** access to the repository. **Admin** access is required if bypass actors include `RepositoryRole = 5` (repository admins).

> [!TIP]
> If unsure, use a **Repository Admin** token. The terraform operation is read-only for repository data and write-only for the ruleset - it never modifies code or content.

## Variables

### `repository_name`

| Type | Description |
|------|-------------|
| `string` | Name of the existing GitHub repository |

### `branch_protection`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `enforcement` | `string` | `"active"` | Ruleset enforcement status |
| `bypass_actors` | `list(object(...))` | `[]` | Actors allowed to bypass rules |
| `rules.creation` | `bool` | `false` | Allow branch creation |
| `rules.update` | `bool` | `true` | Block direct pushes (require PR) |
| `rules.deletion` | `bool` | `true` | Block branch deletion |
| `rules.non_fast_forward` | `bool` | `true` | Block force pushes |
| `rules.required_linear_history` | `bool` | `false` | Require linear history |
| `rules.pull_request.required_approving_review_count` | `number` | `1` | Required approving reviews |
| `rules.pull_request.dismiss_stale_reviews_on_push` | `bool` | `true` | Dismiss stale reviews on push |
| `rules.pull_request.require_code_owner_review` | `bool` | `false` | Require code owner review |
| `rules.pull_request.require_last_push_approval` | `bool` | `false` | Require last push approval |
| `rules.pull_request.required_review_thread_resolution` | `bool` | `false` | Require review thread resolution |

## Environment-Specific Configs

Use separate `.tfvars` files for different environments:

```shell
terraform apply -var-file="production.tfvars"
```

## State Management

State is kept **local** only. The files created by Terraform (`terraform.tfstate`, `terraform.tfstate.backup`, and `.terraform/`) are ignored by git via the root `.gitignore`. This ensures state files are never pushed to GitHub.

## Ruleset Configuration

| Rule | Value | Effect |
|------|-------|--------|
| `update` | `true` | Blocks direct pushes - every change must go through a PR |
| `deletion` | `true` | Prevents accidental branch deletion |
| `non_fast_forward` | `true` | Blocks force pushes - history remains immutable |
| `creation` | `false` | Allows creation of new branches |
| `pull_request.required_approving_review_count` | `1` | At least one approving review required to merge |
| `pull_request.dismiss_stale_reviews_on_push` | `true` | Reviews dismissed when new commits pushed |
| `bypass_actors` | `[RepositoryRole=5]` | Repository admins can bypass all rules |
