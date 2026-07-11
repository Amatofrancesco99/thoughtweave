<div align="center">
<pre>
████████╗██╗  ██╗ ██████╗ ██╗   ██╗ ██████╗ ██╗  ██╗████████╗██╗    ██╗███████╗ █████╗ ██╗   ██╗███████╗
╚══██╔══╝██║  ██║██╔═══██╗██║   ██║██╔════╝ ██║  ██║╚══██╔══╝██║    ██║██╔════╝██╔══██╗██║   ██║██╔════╝
   ██║   ███████║██║   ██║██║   ██║██║  ███╗███████║   ██║   ██║ █╗ ██║█████╗  ███████║██║   ██║█████╗  
   ██║   ██╔══██║██║   ██║██║   ██║██║   ██║██╔══██║   ██║   ██║███╗██║██╔══╝  ██╔══██║╚██╗ ██╔╝██╔══╝  
   ██║   ██║  ██║╚██████╔╝╚██████╔╝╚██████╔╝██║  ██║   ██║   ╚███╔███╔╝███████╗██║  ██║ ╚████╔╝ ███████╗
   ╚═╝   ╚═╝  ╚═╝ ╚═════╝  ╚═════╝  ╚═════╝ ╚═╝  ╚═╝   ╚═╝    ╚══╝╚══╝ ╚══════╝╚═╝  ╚═╝  ╚═══╝  ╚══════╝
</pre>
<strong>Turn any coding agent into your favourite mental sparring companion. <br>Define (team) conventions, write intent-driven specs, gain knowledge while composing specs, know what changed.</strong>
<br>
<em>Simple, lightweight, and easy to use. Few skills. No additional software to install. No coding agent lock-in.</em>
</div>
<br>
<div align="center">------<br>
&#10679; <a href="IDEA.md">IDEA.md</a> &#10679; <a href="CONTRIBUTING.md">CONTRIBUTING.md</a> &#10679; <a href="REPO_STRUCTURE.md">REPO_STRUCTURE.md</a><br>&#10679; <a href="skills/init-agents-file/">init-agents-file</a> &#10679; <a href="skills/sdd/">sdd</a> &#10679; <a href="skills/changes/">changes</a> &#10679; <a href=".githooks/">githooks</a>
<br>&#10679; <a href="LICENSE">LICENSE</a><br>
------<br></div>

<br>

```[bash]
npx skills add Amatofrancesco99/thoughtweave
```

### Simplified Flow Diagram

<pre>
        Idea · Ticket · Feature request
               │ intent & context
               ▼
    ╔══════════════════════════════════════════════════════════╗
    ║                   thoughtweave                           ║
    ║         The cognitive loop for coding agents             ║
    ║  ──────────────────────────────────────────────────────  ║
    ║                                                          ║
    ║  ╔═══ /init-agents-file ══════════════════════════════╗  ║
    ║  ║  Project guidelines · conventions · contract       ║  ║
    ║  ╚════════════════════════════════════════════════════╝  ║
    ║              │                                           ║
    ║              ▼                                           ║
    ║  · · · · · · · · · · · · · · · · · · · · · · · · · · ·   ║
    ║              │                                           ║
    ║              ▼                                           ║
    ║  ╔═══ /sdd ═══════════════════════════════════════════╗  ║
    ║  ║  Intent  →  Questions  →  Study  →  Tests  →  Spec ║  ║
    ║  ║  (why?)  (one at a time)  (learn) (design) (output)║  ║
    ║  ╚════════════════════════════════════════════════════╝  ║
    ║              │                                           ║
    ║              ▼                                           ║
    ║  ╔═══ /changes ═══════════════════════════════════════╗  ║
    ║  ║  What changed · Why · Trade-offs discovered        ║  ║
    ║  ║  · Vulnerability scan · Document                   ║  ║
    ║  ╚════════════════════════════════════════════════════╝  ║
    ║                                                          ║
    ║  · Surface hidden assumptions  ·  Doubt your output      ║
    ╚══════════════════════════════════════════════════════════╝
               │   spec.md + changes.md
               ▼
    Implementation  →  Review  →  specs/ (permanent memory)
</pre>

## What thoughtweave is

`thoughtweave` is a development workflow that puts understanding before generation. A collection of reusable skills that guide coding agents through specification, implementation, and documentation.

The workflow: **Intent → Specification → Implementation → Explanation**.

For the full philosophy, read [`IDEA.md`](IDEA.md). For the complete repository layout, read [`REPO_STRUCTURE.md`](REPO_STRUCTURE.md).

## Skills

- **[`/init-agents-file`](skills/init-agents-file/)** - Generate and maintain a project-specific `AGENTS.md` file that reflects the actual architecture, constraints, and conventions of your project. Built through a sequential interview - one question at a time, with branching logic based on repository state. Includes pre-condition checks, update mode, Claude compatibility, and output validation.
- **[`/sdd`](skills/sdd/)** - The central skill. Transform ideas, Jira tickets, and feature requests into implementation-ready specifications. Never starts writing immediately - first assesses task complexity (light or deep mode), then asks three ordered questions, then assesses your competency per area, then enters a fluid Discovery phase. Includes Design TDD subskill for Given-When-Then test design. Mermaid diagrams integrated directly into specs.
- **[`/changes`](skills/changes/)** - Generate a human-readable explanation of implemented changes after coding. Documents why the change happened, what changed technically, runtime impact, tests performed, trade-offs accepted, and hidden assumptions discovered. Runs vulnerability scanning before generating output. Validates implementation maps back to spec requirements. For developers, reviewers, managers, and stakeholders.

## What Makes It Different

`thoughtweave` shifts from `spec → implement` to **`intent → questioning → understanding → spec → implement`**.

| Aspect | `spec-kit` | `superpowers` | `thoughtweave` (this repo) |
|---|---|---|---|
| **Center** | The specification | Process + TDD | The intent |
| **Primary goal** | Build high-quality software faster | Automate dev cycle autonomously | Understand the problem deeply |
| **Starting point** | `/speckit.specify` | Brainstorming | Intent discovery |
| **Agent's role** | SDD pipeline executor | Autonomous executor | Thinking partner and critic |
| **Hidden assumptions** | Assumptions section + markers | Not addressed | Mandatory - explicitly documented |
| **AGENTS.md** | Managed by extension | Static template | Built through conversational [`/init-agents-file`](skills/init-agents-file/) interview |
| **Specs lifecycle** | Permanent per feature | Design docs → implemented | Permanent engineering memory |
| **Post-implementation** | Not addressed | Not addressed | Dedicated [`/changes`](skills/changes/) skill |
| **Learning support** | Not addressed | Not addressed | Discovery phase built into [`/sdd`](skills/sdd/) |
| **Skill count** | 11 + ecosystem | 14 | 3 |
| **Maturity** | Production | Production v6.0.3 | v0.1.0 |

## How to Use It

0. **Define guidelines** - Run [`/init-agents-file`](skills/init-agents-file/) to set up repository standards (once per project).
1. **Create a specification** - Run [`/sdd`](skills/sdd/) to transform ideas into implementation-ready specs with test cases. If you use Jira, the agent can pull tickets directly - see the Jira integration setup below.

   <details>
   <summary>Jira Integration (click to expand)</summary>

   Requirements can be pulled directly from Jira via MCP. To enable this, configure the [mcp-atlassian](https://github.com/sooperset/mcp-atlassian) server in your editor or agent's MCP settings:

   ```json
   {
     "mcpServers": {
       "mcp-atlassian": {
         "command": "uvx",
         "args": ["mcp-atlassian"],
         "env": {
           "JIRA_URL": "https://your-company.atlassian.net",
           "JIRA_USERNAME": "your.email@company.com",
           "JIRA_API_TOKEN": "your_api_token"
         }
       }
     }
   }
   ```

   **Setup:**
   1. Create a Jira API token from [https://id.atlassian.com/manage-profile/security/api-tokens](https://id.atlassian.com/manage-profile/security/api-tokens).
   2. Ensure the token has **read** access to the projects you want to pull tickets from.
   3. Replace the placeholder values above with your Jira instance URL, email, and API token.
   4. The agent will then be able to fetch tickets, browse projects, and use them as input for `/sdd`.

   </details>

2. **Implement** - Start a new session. Implement based on the spec.
3. **Document changes** - Run [`/changes`](skills/changes/) to document what changed, with vulnerability scanning.
4. **Ship** - Review, adjust, ship.

> [!TIP]
> Each major phase should start a fresh coding-agent session to maintain context quality.

Start your preferred coding agent in web mode and use the slash commands ([`/init-agents-file`](skills/init-agents-file/), [`/sdd`](skills/sdd/), [`/changes`](skills/changes/)) as described in the [workflow](#recommended-workflow) above. The skills are plain markdown - any agent can read and handle them.

## Versioning & Release

Install via `npx skills add Amatofrancesco99/thoughtweave`.

> [!CAUTION]
> Releases are created via GitHub Actions on push to `main`. The workflow in [`.github/workflows/release.yml`](.github/workflows/release.yml) accepts a `workflow_dispatch` input called `version_bump` with three options - `major`, `minor`, `patch` (default) - to control which semver component to increment. On push to `main` the workflow reads the latest git tag, increments the selected component, creates a new tag, and publishes a GitHub Release with auto-generated notes. If the latest commit already has a tag, the workflow skips to prevent duplicate releases.

## Contributing

Contributions are welcome! See [`CONTRIBUTING.md`](CONTRIBUTING.md) for the full guide on branch strategy, PR workflow, local development setup, and how to use the skills to help you contribute.

> [!IMPORTANT]
> Only repository owners can merge and approve pull requests to `main`. The default branch is protected by a **server-side ruleset** configured via Terraform (see [`terraform/`](terraform/)). This ruleset blocks direct pushes, force pushes, and branch deletion - it cannot be bypassed locally with `--no-verify`.

## License

[MIT License](/LICENSE). You are free to use, modify and distribute this repository. 
Attribution is truly appreciated.