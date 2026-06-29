# **Repository Structure**

```
thoughtweave/
├── AGENTS.md                # Agent instructions for contributing via coding agent
├── CLAUDE.md                # Symlink to AGENTS.md (for Claude compatibility)
├── IDEA.md                  # Concept, vision, philosophy. Start here.
├── README.md                # Main documentation, installation, workflow guide
├── REPO_STRUCTURE.md        # This file - every folder and file explained
├── CONTRIBUTING.md          # Contributor guide: workflow, tests, branch strategy
├── LICENSE                  # MIT License
├── .gitignore               # Ignores system files, dependencies, skill cache, and logs
│
├── .githooks/               # Security hooks for skill file + workflow integrity
│   ├── pre-commit           # Blocks commits with unauthorized/invalid skill changes; validates spec/changes sections; runs tests
│   └── pre-push             # Same as pre-commit, plus enforces spec/changes pairing
│
├── tests/                   # Test suite: structural, content, compliance, artifact validation (Node.js with vitest)
│   └── package.json
│
├── skills/                  # The `thoughtweave` skills (current + future additions)
│   │
│   ├── init-agents-file/    # Generate and maintain AGENTS.md
│   │   ├── SKILL.md         # Metadata + instructions
│   │   └── ...              # Optional: scripts/, references/, assets/
│   │
│   ├── sdd/                 # Spec-driven development
│   │   ├── SKILL.md         # Metadata + instructions
│   │   ├── design-tdd.md    # Design TDD subskill
│   │   └── ...              # Optional: scripts/, references/, assets/
│   │
│   ├── changes/             # Post-implementation documentation
│   │   ├── SKILL.md         # Metadata + instructions
│   │   └── ...              # Optional: scripts/, references/, assets/
│   │
│   └── <new>/               # Future skills go here
│
├── specs/                   # Engineering memory - all specifications
│   │
│   ├── 0-thoughtweave-def/    # The specification for `thoughtweave` itself
│   │   ├── spec.md            # Authoritative specification
│   │   └── changes.md         # Bootstrap changes document
│   │
│   └── example/             # Example spec (placeholder for demo)
│       ├── spec.md
│       └── changes.md
│
├── examples/                # Usage examples for different agents
│   └── (future)
│
├── docs/                    # Additional documentation (future)
│   └── (future)
│
└── .github/                 # GitHub Actions workflows
    └── workflows/
        └── release.yml      # Auto-release on push to master
```

## File Descriptions

### Root Files

- **[`AGENTS.md`](./AGENTS.md)** - Agent instructions for contributing to this repository using a coding agent. Read by coding agents when a contributor starts a session. Describes the repo structure, the skills, the test workflow, and how to make changes correctly.

- **[`CLAUDE.md`](./CLAUDE.md)** - Symlink to `AGENTS.md` for Claude compatibility. Ensures Claude reads the same instructions without duplicating content.

- **[`IDEA.md`](./IDEA.md)** - The concept document. Raw, honest, gut-feeling vision. Explains the origins, philosophy, what `thoughtweave` is and isn't, and why this approach exists. Read this first if you want to understand the *why*.

- **[`README.md`](./README.md)** - The main documentation entry point. Contains the ASCII art header, TL;DR, manifesto, installation instructions, workflow guide, comparison table, Mermaid diagrams for each skill, usage examples, and versioning. Read this if you want to understand *how to use* the skills.

- **[`REPO_STRUCTURE.md`](./REPO_STRUCTURE.md)** - This file. A navigational reference for the repository layout. Read this if you want to find your way around.

- **[`CONTRIBUTING.md`](./CONTRIBUTING.md)** - Guide for contributors. Explains branch strategy, how to run tests, the PR workflow, and how to use the skills to help you contribute. Git hooks automatically invoke the test suite on commit. Should use GitHub alert tags to highlight mandatory rules, security precautions, best practices, and contextual notes. Read this before opening a PR.

- **[`LICENSE`](./LICENSE)** - MIT License. Do what you want with this code.

### [`.gitignore`](./.gitignore)

Ignores system files (`.DS_Store`), npm dependencies (`node_modules/`), skill cache (`.skills/`), and log files (`*.log`).

### [`.githooks/`](./.githooks/) (Security)

> [!WARNING]
> Git hooks that protect the integrity of the skill files and enforce workflow correctness. Since these skills are public and anyone can import them via `npx skills add`, they are exposed to prompt injection, tool hijacking, and unauthorized modifications. These hooks block commits and pushes that modify skill files in ways that deviate from their standard intent. They also validate spec and changes sections, and run the test suite.

Activate via: `git config core.hooksPath .githooks/`

- **[`pre-commit`](./.githooks/pre-commit)** - Verifies skill files haven't been modified with unauthorized tools, injected instructions, or behaviour redirection. Validates that `spec.md` and `changes.md` contain all required sections. Warns if `AGENTS.md` is deleted. If modifying skill files, runs content validation tests. If `design-tdd.md` is referenced in a skill, verifies the file exists at `skills/sdd/design-tdd.md`. Runs the test suite. Also runs `skills-ref validate ./my-skill` (from the [skills-ref](https://github.com/agentskills/agentskills/tree/main/skills-ref) reference library) on every skill directory to check SKILL.md frontmatter and naming conventions.
- **[`pre-push`](./.githooks/pre-push)** - Same checks as pre-commit, plus verifies no new files were added to `skills/` outside the known structure, and that `changes.md` files are never pushed without their sibling `spec.md`.

### [`tests/`](./tests/) (Validation)

Tests validate the repository structure, skill content integrity, philosophical boundaries, and artifact schema. Since skills are plain markdown for LLMs (not executable code), tests perform structural and content pattern checks rather than functional execution. All tests use Node.js with `vitest` - no shell scripts or Python. Runnable via `npm test`. See `spec.md` for the full list of test files and their validation rules.

### [`skills/`](./skills/) (The Core)

Currently three skills covering the lifecycle of a software change. More will be added over time as the workflow evolves. Each is a markdown file that a coding agent reads and executes when invoked via `/command`.

- **[`init-agents-file/`](./skills/init-agents-file/)** - `/init-agents-file` - Generates and maintains `AGENTS.md`. Branching logic: if repo is empty, proposes standard best practices; if repo exists, inspects codebase (structure, stack) then conducts a sequential interview (one question at a time). The generated `AGENTS.md` includes a workflow checklist that mandates vulnerability scanning after implementation. Configurable areas presented as multiple selection (security, safety, maintainability, readability, simplicity, testing, architecture, OOP principles, GoF patterns, coding style, technology stack, operational domain, repo-specific constraints). Supports Claude via `CLAUDE.md` symlink. Validates all required sections are present.
  - **[`SKILL.md`](./skills/init-agents-file/SKILL.md)**

- **[`sdd/`](./skills/sdd/)** - `/sdd` - The central skill. Transforms ideas, tickets, or feature requests into implementation-ready specifications. Never starts writing immediately - first assesses task complexity (light or deep mode), then asks three ordered questions (context inheritance, output location, web search), then assesses user competency per area (Expert/Comfortable/New), then enters a fluid Discovery phase (alternating problem exploration and technical deep-dive, intent labels: `[Problem]`, `[Technical]`, `[Decision]`). Produces specs with Objective, Scope, Decisions & Compromises (including hidden assumptions), Requirements & Best Practices, Tests, Acceptance Criteria, and References. Includes a Design TDD subskill for Given-When-Then test design. The generated spec includes **Mermaid diagrams** (hand-drawn look, pastel palette) as native citizens. The output spec quality is independent of the user's starting knowledge - the competency assessment and teaching mode compensate for gaps. Validates all sections are present.
  - **[`SKILL.md`](./skills/sdd/SKILL.md)** - The main SDD skill. Includes the Design TDD subskill as a nested step.
  - **[`design-tdd.md`](./skills/sdd/design-tdd.md)** - Design TDD subskill: after drafting requirements, the agent asks permission then designs test cases using Given-When-Then for each requirement (happy path, error states, edge cases, integration boundaries). If a requirement cannot be tested, it is flagged as incomplete. The resulting tests validate the spec before any code is written.

- **[`changes/`](./skills/changes/)** - `/changes` - Generates `changes.md` after implementation. Documents why the change happened, what changed technically, runtime impact, tests performed, and a narrative summary. Validates implementation maps back to spec requirements (flags unimplemented and untracked items). Runs a vulnerability scan on the implemented code before generating the document - finds insecure patterns, hardcoded secrets, vulnerable dependencies - studies each finding, fixes iteratively, and documents everything in the output. Includes **Mermaid diagrams** with consistent styling to visually map changes. Inherits output location from the originating spec. Validates all sections are present.
  - **[`SKILL.md`](./skills/changes/SKILL.md)**

### [`specs/`](./specs/) (Engineering Memory)

> [!NOTE]
> The permanent record of all specifications created by the SDD skill. Not temporary artifacts - they remain in the repository as documentation, context for future specs, and a record of decisions made.

- **[`0-thoughtweave-def/`](./specs/0-thoughtweave-def/)** - The specification for `thoughtweave` itself
  - **[`spec.md`](./specs/0-thoughtweave-def/spec.md)** - Authoritative specification
  - **[`changes.md`](./specs/0-thoughtweave-def/changes.md)** - Bootstrap changes document

- **[`example/`](./specs/example/)** - Example spec (placeholder for demo)
  - **[`spec.md`](./specs/example/spec.md)**
  - **[`changes.md`](./specs/example/changes.md)**
  - **[`draft.md`](./specs/example/draft.md)** (*optional*) - Raw scratch notes, brainstorming output, half-formed ideas that preceded the spec. Not validated, not required. Preserves the original intent so future readers can compare what was asked against what was generated after deep specification generation process.

Default structure per feature:
```
specs/
└── feature-name/
    ├── spec.md       # Intent, decisions, requirements, tests
    └── changes.md    # Outcome, trade-offs, hidden assumptions discovered
```

### [`examples/`](./examples/) and [`docs/`](./docs/)

- **[`examples/`](./examples/)** - Placeholder for future usage examples
- **[`docs/`](./docs/)** - Placeholder for additional documentation

### [`.github/`](./.github/) (CI/CD)

- **[`.github/workflows/release.yml`](./.github/workflows/release.yml)** - GitHub Actions workflow that creates a new release when code is pushed to `master` only (no other branch triggers a version bump). Reads the latest git tag, increments the version, creates a new tag, and publishes a GitHub Release with auto-generated notes from conventional commits.
