# AGENTS.md - thoughtweave

## Domain

Developer tooling - workflow automation and coding agent skills for structured, intent-driven software engineering. The repository provides reusable markdown skills that guide coding agents through specification, implementation, and documentation phases. Agents should be familiar with the thoughtweave philosophy: intent-first, slow thinking, surfacing hidden assumptions, engineering as understanding.

## Repository Structure

For repository structure refer to [`REPO_STRUCTURE.md`](REPO_STRUCTURE.md).

## Architectural Directives

- All skills are plain markdown files in `skills/<name>/SKILL.md` - no executables, no additional software to install.
- Repo structure shall be simple, maintainable, readable, with well separated concepts.
- Skills must be independently usable but designed to work together in sequence: `init-agents-file` -> `sdd` -> `changes`.
- Every skill must include pre-condition checks and output validation as defined in the specification.
- Skill output files (`AGENTS.md`, `spec.md`, `changes.md`) must use GitHub alert tags for scannability.
- Mermaid diagrams must follow the defined style (theme: base, look: handDrawn, layout: dagre, subgraph wrap for dark mode, pastel palette).
- No skill may generate implementation code - skills produce documentation and specifications only.
- The `specs/` folder is permanent engineering memory - never delete a specification after implementation.

## Engineering Best Practices

- All tests are Node.js with `vitest` - no shell scripts or Python.
- All tests run automatically via git hooks on every commit and push - no manual `npm test` needed.
- Pre-commit hooks run: em-dash replacement, skills-ref validation, terraform fmt, section validation, content tests.
- Terraform HCL files must be formatted with `terraform fmt -recursive`.
- No em dashes (U+2014) allowed in any `.md` file - use regular dashes (U+002D) instead.
- `.gitignore` must always include `node_modules/`, `.skills/`, `.terraform/`, `*.tfstate`, `*.tfstate.*`, `*.log`.
- Vulnerability scanning is mandatory after any implementation before generating changes documentation.
- `CLAUDE.md` must never be a regular file - it must be a symlink to `AGENTS.md` at all times.

## Workflow Checklist

When contributing to this repository, follow these steps in order:

1. Read `IDEA.md` to understand the vision and philosophy of the project.
2. [OPTIONAL] Read the first specification at `specs/0-thoughtweave-def/spec.md` to understand the full structure, constraints, and testing expectations.
3. Inspect existing implementations before introducing new ones - check `skills/`, `tests/`, and `specs/` for relevant patterns.
4. If the change is significant, run `/sdd` to create a specification first.
5. After the specification is ready, ask the user: *"Do you want to continue on an existing branch or create a new one from main? Merging to main requires a pull request, so working on a feature branch is required."* If the user chooses a new branch, create it from main with the chosen name.
6. Implement the specification on the selected branch, then run `/changes` to document the outcome.
7. Recall that:
   - repo structure shall be simple, maintainable, readable, well separated concepts and organized.
   - if new skills or files are added, also tests need to be considered (e.g., skill validity and section checks).
8. Update the `REPO_STRUCTURE.md` file if new files are added or structure is changed (and also update tests section).
9. Self-evaluate: *"Is this the best way to respect the constraints, requirements and best practices defined by this specification and AGENTS.md?"*
10. Git hooks will enforce all checks automatically on commit - ensure the commit succeeds without warnings.
11. Scan the produced code for vulnerabilities, study each finding, and fix iteratively until the code is clean.

> [!IMPORTANT]
> Inspect existing implementations before introducing new ones. This is not optional. Before writing new code, look at what already exists. If something similar already exists, reuse it. If not, consider whether a general solution is justified or a specific solution is more appropriate.
