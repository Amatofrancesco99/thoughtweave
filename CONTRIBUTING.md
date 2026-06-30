# Contributing to thoughtweave

> [!IMPORTANT]
> This repository follows the same principles it teaches. Before contributing, read [`IDEA.md`](IDEA.md) to understand the philosophy, and [`AGENTS.md`](AGENTS.md) for the agent guidelines.

## How to Contribute

Standard GitHub flow: fork, branch, PR. Every change starts from a feature branch and is submitted as a pull request.

## Branch Strategy

The default branch is protected by a **server-side ruleset** configured via Terraform (see the [Terraform section](specs/0-thoughtweave-def/spec.md#terraform) in the specification). This ruleset cannot be bypassed locally.

- Only repository admins can modify the ruleset - contributors cannot disable or override it.
- Direct pushes to the default branch are blocked. All changes must go through a pull request.
- Force pushes and branch deletion are blocked on the default branch.
- At least one approving review is required before a pull request can be merged.
- Repository admins have bypass permissions for emergencies (e.g., hotfixes), but this is the exception, not the rule.

> [!IMPORTANT]
> The server-side ruleset complements the client-side git hooks in `.githooks/`. While hooks can be skipped with `--no-verify`, the ruleset **cannot** - it enforces the same constraints at the GitHub API level.

## Local Development Setup

```shell
npm install
git config core.hooksPath .githooks/
```

Tests are executed automatically by git hooks on every commit and push - no manual `npm test` needed.

## PR Workflow

1. Create a feature branch from the default branch.
2. Make your changes. If the change is significant, consider using `/sdd` and `/changes` to document it.
3. Git hooks will run tests automatically on commit. Ensure all checks pass before pushing.
4. Open a pull request against the default branch.
5. Address review feedback. New commits on the feature branch dismiss stale reviews.
6. Once approved and all checks pass, an admin merges the PR.

## Versioning & Releases

When code is merged to `master` (via PR), a GitHub Actions workflow (`.github/workflows/release.yml`) runs automatically. The workflow accepts a `workflow_dispatch` input named `version_bump` (options: `major`, `minor`, `patch`, default: `patch`) to control which semver component to increment. It reads the latest git tag, increments the selected component, creates a new tag, and publishes a GitHub Release with auto-generated notes. Pushes to any other branch never trigger a release.

This means contributors don't need to manage versions manually. Users install specific versions via `npx skills add <repository>@v<tag>`.

## What Needs Contributors

- **New skill ideas** - if you have a workflow thoughtweave doesn't cover.
- **Agent-specific adjustments** - adapt skills for different coding agents.
- **Better defaults** - configurable areas in `/init-agents-file` can always have smarter defaults.
- **Documentation** - examples, tutorials, agent-specific guides.
- **Testing** - the test suite can always be more thorough.

## Philosophy Alignment

> [!NOTE]
> Contributions that contradict the core philosophy (intent-first, developmental objective, anti-de-skilling) will not be merged regardless of technical merit. When in doubt, open an issue first.

See [`IDEA.md`](IDEA.md) for the full philosophy.

## Resources

- [IDEA.md](IDEA.md) - Concept, vision, philosophy
- [AGENTS.md](AGENTS.md) - Agent instructions for this repository
- [REPO_STRUCTURE.md](REPO_STRUCTURE.md) - Repository layout reference
- [Specification](specs/0-thoughtweave-def/spec.md) - Full technical specification
- [Skills](skills/) - The thoughtweave skills
- [Tests](tests/) - Test suite
- [License](LICENSE) - MIT License
