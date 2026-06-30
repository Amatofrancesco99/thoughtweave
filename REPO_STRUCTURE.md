# **Repository Structure**

```
thoughtweave/
├── .github/                 # GitHub Actions workflows
│   └── workflows/
│       └── release.yml      # Auto-release on push to main
├── .githooks/               # Security hooks for skill file + workflow integrity
│   ├── pre-commit           # Blocks commits with unauthorized/invalid skill changes; validates spec/changes sections; runs tests
│   └── pre-push             # Same as pre-commit, plus enforces spec/changes pairing
├── docs/                    # Additional documentation (future)
│   └── (future)
├── examples/                # Usage examples for different agents
│   └── (future)
├── skills/                  # The `thoughtweave` skills (current + future additions)
│   │
│   ├── changes/             # Post-implementation documentation
│   │   ├── SKILL.md         # Metadata + instructions
│   │   └── ...              # Optional: scripts/, references/, assets/
│   │
│   ├── init-agents-file/    # Generate and maintain AGENTS.md
│   │   ├── SKILL.md         # Metadata + instructions
│   │   ├── references/      # Pre-loaded reference docs (e.g., commenting philosophy)
│   │   └── ...              # Optional: scripts/, assets/
│   │
│   ├── sdd/                 # Spec-driven development
│   │   ├── SKILL.md         # Metadata + instructions
│   │   ├── design-tdd.md    # Design TDD subskill
│   │   └── ...              # Optional: scripts/, references/, assets/
│   │
│   └── <new>/               # Future skills go here
│
├── specs/                   # Engineering memory - all specifications
│   │
│   ├── 0-thoughtweave-def/    # The specification for `thoughtweave` itself
│   │   ├── changes.md         # Bootstrap changes document
│   │   └── spec.md            # Authoritative specification
│
├── terraform/               # Infrastructure as Code
│   ├── github/              # Child module: GitHub resource definitions
│   │   ├── main.tf          # data.github_repository + github_repository_ruleset
│   │   ├── providers.tf     # Provider config (integrations/github)
│   │   └── variables.tf     # Module variables (repository_name, branch_protection)
│   ├── main.tf              # Root variables + module call to github
│   ├── README.md            # Usage, configuration, and apply instructions
│   └── terraform.tfvars     # Auto-loaded default values
│
├── tests/                   # Test suite: structural, content, compliance, artifact, terraform validation (Node.js with vitest)
├── .gitignore               # Ignores system files, dependencies, skill cache, and logs
├── AGENTS.md                # Agent instructions for contributing via coding agent
├── CLAUDE.md                # Symlink to AGENTS.md (for Claude compatibility)
├── CONTRIBUTING.md          # Contributor guide: workflow, tests, branch strategy
├── IDEA.md                  # Concept, vision, philosophy. Start here.
├── LICENSE                  # MIT License
├── README.md                # Main documentation, installation, workflow guide
└── REPO_STRUCTURE.md        # This file - every folder and file explained
```

## File Descriptions

### [`.github/`](./.github/) (CI/CD)

- **[`.github/workflows/release.yml`](./.github/workflows/release.yml)** - GitHub Actions workflow that creates a new release when code is pushed to `main` only (no other branch triggers a version bump). Reads the latest git tag, increments the version, creates a new tag, and publishes a GitHub Release with auto-generated notes from conventional commits.

### [`.githooks/`](./.githooks/) (Security)

> [!WARNING]
> Git hooks that protect the integrity of the skill files and enforce workflow correctness. Since these skills are public and anyone can import them via `npx skills add`, they are exposed to prompt injection, tool hijacking, and unauthorized modifications. These hooks block commits and pushes that modify skill files in ways that deviate from their standard intent. They also validate spec and changes sections, and run the test suite.

Activate via: `git config core.hooksPath .githooks/`

- **[`pre-commit`](./.githooks/pre-commit)** - Verifies skill files haven't been modified with unauthorized tools, injected instructions, or behaviour redirection. Validates that `spec.md` and `changes.md` contain all required sections. Warns if `AGENTS.md` is deleted. If modifying skill files, runs content validation tests. If `design-tdd.md` is referenced in a skill, verifies the file exists at `skills/sdd/design-tdd.md`. Runs the test suite. Also runs `skills-ref validate ./my-skill` (from the [skills-ref](https://github.com/agentskills/agentskills/tree/main/skills-ref) reference library) on every skill directory to check SKILL.md frontmatter and naming conventions.
- **[`pre-push`](./.githooks/pre-push)** - Same checks as pre-commit, plus verifies no new files were added to `skills/` outside the known structure, and that `changes.md` files are never pushed without their sibling `spec.md`.

### [`docs/`](./docs/) (Future)

Placeholder for additional documentation.

### [`examples/`](./examples/) (Future)

Placeholder for future usage examples.

### [`skills/`](./skills/) (The Core)

Currently three skills covering the lifecycle of a software change. More will be added over time as the workflow evolves. Each is a markdown file that a coding agent reads and executes when invoked via `/command`.

- **[`changes/`](./skills/changes/)** - `/changes` - Generates `changes.md` after implementation. Documents why the change happened, what changed technically, runtime impact, tests performed, and a narrative summary. Validates implementation maps back to spec requirements (flags unimplemented and untracked items). Runs a vulnerability scan on the implemented code before generating the document - finds insecure patterns, hardcoded secrets, vulnerable dependencies - studies each finding, fixes iteratively, and documents everything in the output. Includes **Mermaid diagrams** with consistent styling to visually map changes. Inherits output location from the originating spec. Validates all sections are present.
  - **[`SKILL.md`](./skills/changes/SKILL.md)**

- **[`init-agents-file/`](./skills/init-agents-file/)** - `/init-agents-file` - Generates and maintains `AGENTS.md`. Branching logic: if repo is empty, proposes standard best practices; if repo exists, inspects codebase (structure, stack) then conducts a sequential interview (one question at a time). The generated `AGENTS.md` includes a workflow checklist that mandates vulnerability scanning after implementation. Configurable areas presented as multiple selection (security, safety, maintainability, readability, simplicity, testing, architecture, OOP principles, GoF patterns, coding style, technology stack, operational domain, repo-specific constraints). Contains a `references/` directory with pre-loaded documentation (e.g., the commenting philosophy article for the **code documentation** area). Supports Claude via `CLAUDE.md` symlink. Validates all required sections are present.
  - **[`SKILL.md`](./skills/init-agents-file/SKILL.md)**
  - **[`references/`](./skills/init-agents-file/references/)** - Pre-loaded reference documentation that the skill loads as needed instead of fetching from the web. Files are text-only markdown. Currently contains `commenting-philosophy.md` (a practical philosophy of code comments covering intent, boundary, summary, reference, and teacher categories).

- **[`sdd/`](./skills/sdd/)** - `/sdd` - The central skill. Transforms ideas, tickets, or feature requests into implementation-ready specifications. Never starts writing immediately - first assesses task complexity (light or deep mode), then asks three ordered questions (context inheritance, output location, web search), then assesses user competency per area (Expert/Comfortable/New), then enters a fluid Discovery phase (alternating problem exploration and technical deep-dive, intent labels: `[Problem]`, `[Technical]`, `[Decision]`). Produces specs with Objective, Scope, Decisions & Compromises (including hidden assumptions), Requirements & Best Practices, Tests, Acceptance Criteria, and References. Includes a Design TDD subskill for Given-When-Then test design. The generated spec includes **Mermaid diagrams** (hand-drawn look, pastel palette) as native citizens. The output spec quality is independent of the user's starting knowledge - the competency assessment and teaching mode compensate for gaps. Validates all sections are present.
  - **[`SKILL.md`](./skills/sdd/SKILL.md)** - The main SDD skill. Includes the Design TDD subskill as a nested step.
  - **[`design-tdd.md`](./skills/sdd/design-tdd.md)** - Design TDD subskill: after drafting requirements, the agent asks permission then designs test cases using Given-When-Then for each requirement (happy path, error states, edge cases, integration boundaries). If a requirement cannot be tested, it is flagged as incomplete. The resulting tests validate the spec before any code is written.

### [`specs/`](./specs/) (Engineering Memory)

> [!NOTE]
> The permanent record of all specifications created by the SDD skill. Not temporary artifacts - they remain in the repository as documentation, context for future specs, and a record of decisions made.

- **[`0-thoughtweave-def/`](./specs/0-thoughtweave-def/)** - The specification for `thoughtweave` itself
  - **[`changes.md`](./specs/0-thoughtweave-def/changes.md)** - Bootstrap changes document
  - **[`spec.md`](./specs/0-thoughtweave-def/spec.md)** - Authoritative specification

Default structure per feature:
```
specs/
└── feature-name/
    ├── spec.md       # Intent, decisions, requirements, tests
    └── changes.md    # Outcome, trade-offs, hidden assumptions discovered
```

### [`terraform/`](./terraform/) (Branch protection ruleset)

This directory is checked into the repository and contains all the Infrastructure as Code configuration files as defined in the [Terraform section of the specification](specs/0-thoughtweave-def/spec.md#terraform).

What this configuration does, in plain English: it lets you manage branch protection rules for this repository through Terraform. The repository itself already exists and is **not** managed by Terraform - only the ruleset is. Instead of clicking through GitHub's UI to lock down the main branch, you run `terraform apply` with your GitHub token and it all happens automatically.

The most important piece is the **branch protection ruleset**. It enforces that:

- Nobody can push directly to the default branch - every change must go through a pull request with at least one approving review.
- Nobody can force-push or delete the default branch - history stays immutable.
- Repository admins can still bypass these rules when needed (e.g., emergency hotfixes) because they're configured as bypass actors with role ID 5.

This mirrors the security model described in [IDEA.md](IDEA.md): only repository owners merge to main, and every merge is reviewed. Before this ruleset existed, the only protection was the git hooks in `.githooks/` - which are client-side and can be skipped with `--no-verify`. The Terraform ruleset adds a **server-side enforcement** that cannot be bypassed locally.

The provider reads your `GITHUB_TOKEN` environment variable - no secrets are stored in the repository. State is kept local and excluded from git via `.gitignore`.

See the [Terraform section in the spec](specs/0-thoughtweave-def/spec.md#terraform) for the full file contents and variable reference.

### [`tests/`](./tests/) (Validation)

Tests validate the repository structure, skill content integrity, philosophical boundaries, artifact schema, githook content, and terraform invariants. Since skills are plain markdown for LLMs (not executable code), tests perform structural and content pattern checks rather than functional execution. All tests use Node.js with `vitest` - no shell scripts or Python. Runnable via `npm test` from the `tests/` directory.

**Test files:**

- **`structural/test_layout.js`** - Verifies directory and file existence, symlink correctness (CLAUDE.md -> AGENTS.md), required root files, skill paths, githooks presence, and .gitignore entries.
- **`content/test_skills_sections.js`** - Validates each skill (SDD, Changes, Init-agents-file) contains all required sections: adaptive questioning, Discovery phase intent labels, ordered questions, competency assessment, assumption challenging, hidden assumptions surfacing, Mermaid diagram configuration, GitHub alert tags, output validation, and workflow diagrams. Also validates the Design TDD subskill file content (Given-When-Then structure, coverage requirements, asking permission).
- **`content/test_preconditions.js`** - Verifies each skill has the required pre-condition check logic: init-agents-file detects existing AGENTS.md and CLAUDE.md symlink issues, SDD warns on missing AGENTS.md, Changes refuses to proceed without spec.md.
- **`content/test_design_tdd_exists.js`** - Checks design-tdd.md exists at `skills/sdd/design-tdd.md` and is referenced by the SDD skill.
- **`content/test_skills_ref_validate.js`** - Runs `skills-ref validate` on all three skill directories to verify frontmatter and naming conventions. Also manually validates frontmatter for `design-tdd.md` (standalone file, not a directory).
- **`compliance/test_philosophical_boundaries.js`** - Enforces philosophical integrity: SDD must position agent as thinking partner (not executor), keep developer cognitively engaged, not accept vague requirements, not generate implementation code. Changes must target multiple audiences, flag unimplemented/untracked behaviour, not assume correctness without verification. All skills must surface hidden assumptions and keep developer at centre.
- **`compliance/test_mermaid_style.js`** - Validates that every Mermaid diagram in every `.md` file uses the required style: init config with `theme: base, look: handDrawn, layout: dagre` and a wrapping `subgraph bg[" "]` for dark mode compatibility. Scans all markdown files recursively, ignoring `node_modules`, `.git`, `.skills`, and `.terraform`.
- **`artifacts/test_artifact_structure.js`** - Validates output file schema: spec.md contains all required sections (Objective, Repository Structure, Terraform, Testing, etc.), changes.md contains Why/Overview/Changes/Tests/Summary.
- **`githooks/test_githook_content.js`** - Checks pre-commit hook contains: spec/changes sibling validation, section validation, terraform fmt, AGENTS.md deletion warning, design-tdd.md existence check, em-dash replacement script, and skills-ref validation. Checks pre-push hook contains: skills immutability check, changes.md without spec.md blocking, section validation.
- **`terraform/test_terraform_invariants.js`** - Ensures terraform variables, ruleset configuration, and .gitignore state entries remain unchanged: branch_protection field completeness, main.tf uses variable references (not hardcoded values), root/child module schema alignment, tfvars ruleset values match defaults, gitignore terraform entries preserved.
- **`replace-em-dashes.js`** - Utility script run by pre-commit hook. Recursively scans all `.md` files, replaces em dashes (U+2014) with regular dashes (U+002D). No dependencies beyond Node.js built-ins.
- **`package.json`** - Node.js project configuration with vitest as test runner. Run via `npm test`.
- **`vitest.config.js`** - Vitest configuration for test file discovery.
- **`README.md`** - How to run tests and test category descriptions.

### [`.gitignore`](./.gitignore)

Ignores system files (`.DS_Store`), npm dependencies (`node_modules/`), skill cache (`.skills/`), terraform local cache (`.terraform/`), terraform state files (`*.tfstate`, `*.tfstate.*`), and log files (`*.log`). The terraform entries are present so local state files are never committed if a contributor runs `terraform apply` locally.

### Root Files

- **[`AGENTS.md`](./AGENTS.md)** - Agent instructions for contributing to this repository using a coding agent. Read by coding agents when a contributor starts a session. Describes the repo structure, the skills, the test workflow, and how to make changes correctly.

- **[`CLAUDE.md`](./CLAUDE.md)** - Symlink to `AGENTS.md` for Claude compatibility. Ensures Claude reads the same instructions without duplicating content.

- **[`CONTRIBUTING.md`](./CONTRIBUTING.md)** - Guide for contributors. Explains branch strategy, how to run tests, the PR workflow, and how to use the skills to help you contribute. Git hooks automatically invoke the test suite on commit. Should use GitHub alert tags to highlight mandatory rules, security precautions, best practices, and contextual notes. Read this before opening a PR.

- **[`IDEA.md`](./IDEA.md)** - The concept document. Raw, honest, gut-feeling vision. Explains the origins, philosophy, what `thoughtweave` is and isn't, and why this approach exists. Read this first if you want to understand the *why*.

- **[`LICENSE`](./LICENSE)** - MIT License. Do what you want with this code.

- **[`README.md`](./README.md)** - Main documentation, installation, workflow guide. Contains ASCII art header, TL;DR, manifesto, installation instructions, workflow guide, comparison table, Mermaid diagrams for each skill, usage examples, and versioning. Read this if you want to understand *how to use* the skills.

- **[`REPO_STRUCTURE.md`](./REPO_STRUCTURE.md)** - This file. A navigational reference for the repository layout. Read this if you want to find your way around.
