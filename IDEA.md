# **`thoughtweave`: The idea**

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
<em>Simple, lightweight, and easy to use. Few skills. No external dependencies. No coding agent lock-in.</em>
</div>

## Origins

It began with a LinkedIn post I wrote about [SDD and coding agents](https://www.linkedin.com/posts/amatofrancesco99_softwareengineering-specdrivendevelopment-share-7426897723586400256-PfsM). I had been working with coding agents and realized that the missing piece was **lack of original intent and questions** - more from the coding agent to me than vice versa. There was also a lack of standardization of best practices for dev teams using coding agents, no easy way to read changes, and I had several issues manually reviewing PRs produced by devs with a ["vibe coding"](https://en.wikipedia.org/wiki/Vibe_coding) approach (never truly a fan of it).

I tried different popular tools. None of them worked for me. Either too complex, or doing stuff I don't need, or producing generic output, or not working as my own way of developing software. The built-in `/init` default commands of coding agents? **Too generic** - templates that could apply to any project. No transparency on the underlying behavior to generate them, they don't guide agent behaviour, they also say that they decreased performance ([Evaluating AGENTS.md](https://arxiv.org/pdf/2602.11988)), if being automatically generated. Moreover, none of them asked me enough questions - they jumped to conclusions without understanding what I needed. There was something for specs but nothing that made me excited. For changes documentation there was basically nothing.

So I built this approach on my own, then expanded to my team and there was **just positive impact**. I was already using this approach in my daily work, just far less structured than what `thoughtweave` is intended to be. Nobody was talking about how to capture intent before generating code, improving quality of delivery while allowing to constantly gain knowledge. They were all talking about how to generate faster (faster is not always synonym of better).

More recently, in the last month, SDD got pushed forward by Google ([agentic-engineering](https://www.linkedin.com/posts/addyosmani_the-new-software-development-lifecycle-with-activity-7472535945221783552-jk84/)), by DeepLearningAI ([spec-driven-development-with-coding-agents](https://www.deeplearning.ai/courses/spec-driven-development-with-coding-agents)), by others.

Earlier, in February 2026, a paper from Google DeepMind - [Intelligent AI Delegation](https://arxiv.org/abs/2602.11865) - articulated something I had been feeling but couldn't put into words: existing delegation systems don't account for human learning. They delegate tasks away and assume the human stays out of the way. The paper warns about the **"risk of de-skilling"** - unchecked delegation threatens the apprenticeship pipeline, junior team members get deprived of the experience they need to develop deep strategic judgement. It proposes that intelligent delegation frameworks should include a **"developmental objective"**: track skill progression, allocate tasks at the boundary of expanding skill sets, keep humans cognitively engaged.

That paper validated exactly what I had been missing. None of the existing tools let me study and understand better during the generation process - they weren't designed to learn *with you*, to grow alongside you while doing anything (defining a spec included, of course). The paper's "developmental objective" gave me the language for what I was already trying to build: a process that keeps the developer cognitively engaged rather than delegating the thinking away. The same principle guided how I built the skills - the developer stays at the centre, always.

So I embedded that principle into everything `thoughtweave` does. The Discovery phase in `/sdd` exists to keep you in the loop - you don't offload the thinking to the agent, you use the agent to think *better*. The mandatory questioning loop, the hidden assumptions documentation, the one-at-a-time questions, the test cases designed before a single line of code is written - they all exist to prevent the exact de-skilling the paper warns about. The `/sdd` skill **keeps you learning, questioning, understanding**. The developmental objective isn't a feature; it's the foundational principle. The act of designing Given-When-Then tests for each requirement forces you to think about interfaces, edge cases, and error states before implementation - the agent doesn't do this thinking *for* you, it guides you *through* it.

Moreover, in April 2026, OpenAI released GPT 5.5. That model (with `xhigh` reasoning mode) changed everything - it's what really let me go from detailed specifications to working implementations frequently in one-shot. Not because it generated better code in isolation, and not because it asked me questions one at a time (in reality it doesn't, and no agent really does). What changed is that I fed it a specification - written using this methodology - and it produced **the best implementation I had ever seen from an AI**. The combination of a well-structured spec and the xhigh reasoning mode gave me the best of both worlds: the structured thinking from the spec, and the execution power of GPT 5.5. That was the moment it clicked. In my specific case, it has been the best so far - the marker of a breaking point where AI reached a new level of "intelligence." 
> [!TIP]
> Lately, I'm also getting a great feeling with DeepSeek V4 - it handles building and implementing structured specs with the same level of depth, making the workflow (of course) model-agnostic in practice.

In conclusion, `thoughtweave` was born to bring all these pieces together - the tools that didn't ask enough questions, the missing documentation of hidden assumptions, the lack of standardization, the inability to use your coding agent to study and understand during spec generation, the lack of visual diagrams integrated directly into specs. I also wanted a shared `AGENTS.md` file where my team could codify our own best practices once and reuse them across multiple developers - the ones auto-generated by `/init` commands never worked for us, they were too generic and didn't reflect how we actually build software. So `thoughtweave` lets you build an `AGENTS.md` that actually captures your (team's) conventions, making code review faster and more consistent because every coding agent follows exactly the same rules. And a `changes.md` file to explain what actually happened, so you don't have to dig through git history or PR threads to understand a change. I wanted to unite the pieces from across the ecosystem with my own experience, and make it available to everyone (or at least, to whoever is interested).

The name: **`thoughtweave`**. A single word that contains the core idea:

- **Thought** - thinking, reasoning, intent, decision-making. The cognitive work that happens before code.
- **Weave** - a structured, iterative process of building understanding. Intent and spec intertwined.

`thoughtweave` describes a system where thought is not linear - it is understood through questions, reasoning and analysis before arriving at a specification and implementation. The focus is not code generation. The focus is building understanding through a guided cognitive loop.

The flow is **Intent → Specification → Implementation → Explanation**. Not because intent replaces spec, but because intent *discovers* the spec through a weaving process. And the spec *guides* the implementation.

> [!NOTE]
> Obviously, the actual interaction - the questions asked, the output generated, the quality of the spec - depends entirely on the model (SLM/LLM) you're using. Experiment those skills with your preferred coding agent and LLM (quite curious of local models results too).

## The real problem

> [!WARNING]
> Most software problems are not implementation problems. They're understanding problems. Requirements are unclear. Constraints are implicit. Assumptions are rarely challenged. You don't know what you're building, so you write code randomly, iterate, regenerate, and end up with a mess.

Coding agents are great at generating code. That's not the hard part of software engineering. The hard parts are understanding the problem, designing the solution, evaluating trade-offs, ensuring maintainability, communicating decisions to other humans. Code generation is just one step, and arguably not the most important one.

The objective here is not generating code faster. Speed is a welcome side effect, not the goal. The objective is helping developers understand problems better before implementation begins. When you understand what you're building, the code writes itself more naturally. When you don't understand, you fight prompts, regenerate outputs, and accumulate technical debt disguised as iteration.

But the real problem goes deeper. There is no system that challenges you while you define a specification - that questions your choices, pushes you to consider alternatives, helps you study what you don't know. Current tools assume you already understand the problem and just need to document it. They don't challenge your assumptions. They don't teach. They don't help you grow. The result is specs that reflect what you already know, not what you need to discover. Without a structured challenge loop, you don't improve - you just formalize your existing understanding, gaps and all. This is especially damaging for junior developers, who need that structured challenge to grow and build engineering judgment. `thoughtweave` exists to fill that gap: a system that challenges you, teaches you, and makes you better with every spec you write. It is built with juniors in mind too - every question, every challenged assumption, every study phase is designed to accelerate growth as much as it improves the spec.

## The philosophy

**Before building anything, understand why it should exist.** This is the single most important rule.

Most teams start with *"which framework should we use"* rather than *"what problem are we solving."* The repository encourages asking: ***Why are we doing this?** Which problem are we trying to solve? Is this the right solution? Which constraints exist? Which trade-offs are acceptable?*

The repository promotes **deliberate engineering over rapid iteration**. Moving quickly without understanding creates more work rather than less. A feature that takes three hours to implement but requires two days of bug fixes was not implemented in three hours. It was implemented in two days and three hours.

> [!CAUTION]
> Many implementation mistakes are not implementation mistakes. **They're understanding mistakes.** When you look at a bug, ask yourself: was the code written incorrectly, or was the problem misunderstood? The second case is far more common.

**Think first. Build second. Refine third.**

But this is not just about getting the current spec right. The deeper goal is making you a better developer with every cycle. `thoughtweave` is not built to replace your judgment - it is built to sharpen it. Every question it asks, every assumption it challenges, every study phase it takes you through exists to improve how you think about software.

This is the opposite of delegation. Delegation takes work off your plate. `thoughtweave` puts cognitive work onto your plate - the right kind of work. The kind that makes you understand trade-offs, question your defaults, and learn technologies you didn't know before. The kind that turns AI from a crutch into a training partner.

Quality comes from developers who understand what they build. And developers who understand what they build become better developers. It is a virtuous cycle: the more you engage, the more you learn. The more you learn, the better your specs. The better your specs, the better your code. The developer stays at the center - not as a supervisor of an AI, but as an **engineer who grows with every session**.

## My stance

**Never liked vibe coding. From day zero.** Never trusted the idea that someone with no technical knowledge can build a production application from scratch. I'm a developer myself. The idea here is **not to replace developers**. The idea is to let devs focus on technical decisions, architecture, trade-offs - not on prompt engineering.

One of the worst parts of this job is **the lack of human intent**. [*This article*](https://noperator.dev/posts/you-can-just-say-it/) explains it better than I ever could.

As **[Writing code was never the bottleneck](https://ordep.dev/posts/writing-code-was-never-the-bottleneck)** puts it: writing code has never been the limiting factor in software engineering - understanding what to build, why, and for whom is the real work. AI generates code, but it doesn't remove the need for engineering judgment.

Will developers die? I don't think so. But devs that will survive shall: **think, doubt themselves, and even (why not) doubt others**, with best intentions and community growth.

## What this is and what it isn't

Let's be honest about where we are in 2026.

The SDD landscape is not empty. GitHub Spec Kit, AWS Kiro, cc-sdd, BMAD, OpenSpec - they all exist. The pattern "spec-first → plan → implement" is mainstream. Many of these tools are solid. But they all carry the same problems: they assume you already understand the problem, they don't adapt to your knowledge level, and they treat spec creation as documentation rather than learning.

The market is not empty. But it's still unsatisfying.

**`thoughtweave` is NOT:**
- A new revolutionary category of tooling
- A replacement for SDD as a practice
- Something that *"nobody has ever done before"*
- A framework you must adopt fully to get value
- A code generation accelerator

**`thoughtweave` IS:**
- A **developmental tool** first, a specification tool second. Built on the principle that coding agents should keep you cognitively engaged, not delegate the thinking away. Every question, every challenged assumption, every study phase exists to sharpen your engineering judgment - not to replace it.
- An **anti-de-skilling layer** for developers of all levels. Junior devs get structured guidance that accelerates growth. Senior devs get their assumptions challenged and trade-offs explored. The agent adapts to your competency - expert areas get challenged, unfamiliar areas get taught.
- A **thinking partner** that asks one question at a time, assesses your existing knowledge, and adapts its depth accordingly. Expert? Expect trade-off analysis and uncomfortable questions. New to an area? The skill teaches you on the spot - web search, explanations, guided study - before a single line of spec is written.
- **Skill-independent spec quality** - the quality of the output spec does not depend on how much you already know. If you're a junior or unfamiliar with a technology, the competency assessment and teaching mode compensate: you learn as you spec, and the resulting document is just as rigorous as one written by an expert. It is not a tool only for seniors - it is a tool that makes anyone produce senior-level specifications.
- An **intent-first workflow** with a mandatory questioning loop that surfaces hidden assumptions before any artifact is generated. The flow is: intent → questioning → understanding → spec. Not spec-first like everything else.
- A **permanent engineering memory** that treats `specs/` as a knowledge base - not temporary artifacts. A developer joining six months from now can read the specs and understand not just what was built, but why, which trade-offs were accepted, and which hidden assumptions were discovered.
- A **design validation mechanism** that integrates Given-When-Then test design into the spec itself. If a requirement cannot be tested, it is incomplete. The spec validates itself through testability before a single line of code is written.
- **Visual diagrams as native spec and changes citizens** - Mermaid diagrams with consistent styling (hand-drawn look, pastel palette) are generated as part of both `spec.md` and `changes.md`, not as separate artifacts. At least one diagram per document where it improves understanding. A picture is worth a thousand words - and it lives inside the document, not in a tool you need to open separately.

The part that actually distinguishes `thoughtweave` from everything else is not the file structure or the number of skills. It's this:

- *Intent-first + mandatory questioning loop + developmental objective.*

Almost every "competitor" flows like this:

- `spec → implement`

`thoughtweave` flows like this:

- `intent → questioning → understanding → spec`

And more importantly, the developer flows like this:

- **`unaware/aware → challenged → taught → understands`**

This is closer to *apprenticeship engineering* or *cognitive pair programming* than solely SDD & TDD. It's an anti-de-skilling layer. And that specific problem - agents that make you dumber by doing the thinking for you - is not well solved by any tool today.

## The risks

> [!CAUTION]
> `thoughtweave` carries few adoption risks:

1. **Too much philosophy, not enough tooling.** Many will say *"it's a manifesto with a workflow inside."* That's not wrong. The philosophy is the product. The skills are just the delivery mechanism. This limits adoption to people who already agree with the philosophy.

2. **Friction for vibe-coding habits.** Developers accustomed to *"describe → regenerate until it works"* will find `thoughtweave` slow, uncomfortable, and overly bureaucratic. The mandatory questioning loop feels like friction when you just want code. The cognitive load is real - you cannot passively consume the output, you must engage. This is by design, but it means the tool will feel bad to anyone who treats AI as a code generator rather than a thinking partner. The payoff (fewer regressions, less rework, deeper understanding) only materialises after a few cycles, and not everyone will push through the initial friction.

Neither is a critical blocker: if a developer decides to leverage this repo, it means they already agree with the core idea or are at least willing to try.

## The strategic truth

`thoughtweave` wins only if it's understood as a **decision-first development layer for agents**, not as a framework. The message that cuts through is:

> [!TIP]
> **"Coding agents are fast. We want quality - while learning and doubting."**

Speed is already here - agents generate code faster than any human can type. The bottleneck isn't speed, it's quality. Quality comes from understanding intent, surfacing hidden assumptions, documenting decisions, and keeping the developer in the loop. `thoughtweave` doesn't make agents faster. It makes their output reliable.

Everything else - the skills, the files, the hooks - is just the implementation of that principle. If that message doesn't land, the process will feel like bureaucracy. If it lands, the process feels like engineering.

## Why this doesn't exist elsewhere

Here's what you actually get with `thoughtweave` that you can't find in any other tool right now:

1. **Intent-first, not spec-first.** Every other SDD tool (Spec Kit, SpecDD, Kiro, cc-sdd, BMAD, OpenSpec) assumes the problem is already clear and immediately generates artifacts. `thoughtweave` starts with intent discovery - a fluid Discovery phase that alternates between problem exploration and technical deep-dive before any spec is written. Its depth adapts to the task: light mode for small, clear changes, deep mode for complex or ambiguous ones. The spec is a consequence of understanding, not the starting point.

2. **Hidden assumptions are mandatory, not optional.** No other tool requires you to document hidden assumptions. Some have a "constitution," others have templates, but none force you to surface implicit knowledge. `thoughtweave` makes this a required section with clear prompts. Hidden assumptions are the difference between a good developer and a great architect - and this is the only tool that treats them as a first-class concern.

3. **Conversational AGENTS.md generation.** Other tools generate `AGENTS.md` from templates or expect you to write it yourself. `thoughtweave` builds it through a sequential interview - one question at a time, distinguishing what can be inferred from code (structure, stack) from what must be asked explicitly (conventions, philosophy, patterns, practices). The result reflects your actual project, not a generic template.

4. **Permanent engineering memory.** In most SDD tools, specs are temporary artifacts you generate and discard. `thoughtweave` treats `specs/` as permanent engineering memory - a knowledge base like ADRs but extended to the full lifecycle of every change. A developer joining six months from now can read the specs and understand not just what was built, but why.

5. **Post-implementation explanation (the `/changes` skill).** No other SDD tool has a dedicated phase for documenting what changed after implementation. Most stop at "implement." `thoughtweave` completes the cycle with a document designed for developers, reviewers, managers and stakeholders - explaining what changed, why, which trade-offs were accepted, and which hidden assumptions were discovered.

6. **Built-in learning and study.** The `/sdd` skill weaves learning into the Discovery phase itself. If you don't understand a technology, a constraint, or a trade-off, the skill helps you study it on the spot - by searching the web, by explaining concepts, by asking clarifying questions. No other SDD tool treats the specification process as a learning opportunity.

7. **Lightweight, zero lock-in.** Spec Kit requires a CLI, Python, and `uvx`. cc-sdd is an npm package with 17 skills. BMAD requires 12+ agent personas. `thoughtweave` is three skills installed via `npx skills add <repo>` - no CLI, no dependencies, no runtime, no vendor lock-in. Just markdown files any agent can read.

8. **Security boundary for public skills.** Because these skills are public and importable by anyone, `thoughtweave` includes git hooks (in `.githooks/`) to prevent prompt injection, tool hijacking and unauthorized modifications.

9. **Visual diagrams built into specs and changes, not an afterthought.** A picture is worth a thousand words. No other tool generates Mermaid diagrams as a native part of both `spec.md` and `changes.md` - you have to ask for them explicitly every time, and most don't support them at all. `thoughtweave` defines consistent diagram styling (hand-drawn look, pastel palette, dagre layout) and requires at least one diagram per document where it improves understanding. The diagram is part of the document, not a separate artifact.

## Comparison with "competitors"

`thoughtweave` is not the only tool in the SDD space. [Spec Kit](https://github.com/github/spec-kit) (by GitHub, 30+ integrations, 150+ community extensions), [superpowers](https://github.com/obra/superpowers) (v6.0.3, 14 skills), and others share the same pattern: spec-first → plan → implement. `thoughtweave` differs in its center of gravity.

Spec Kit is the most established - 11 commands, CLI + slash commands, permanent specs per feature, assumptions surfaced via `/speckit.clarify`, and post-implementation assessment via `/speckit.converge`. It relies heavily on the AI agent to interpret specs and write code. superpowers goes further into automation: 14 auto-triggering skills, subagent-driven implementation, mandatory TDD, systematic debugging, code review. It covers the full dev cycle but does not address hidden assumptions (beyond basic markers), learning during spec creation, or dedicated post-implementation documentation.

`thoughtweave` sits at the opposite pole: it prioritises understanding over automation. The agent is a thinking partner and critic, not an executor. Hidden assumptions are mandatory in every spec, not optional markers. The `/sdd` skill weaves web search and study into the Discovery phase so spec creation becomes a learning process. The `/changes` skill produces multi-audience post-implementation documentation. All in 3 skills, no runtime, no lock-in. The trade-off is maturity - `thoughtweave` is pre-alpha and does not cover debugging, code review, or git workflows.

> [!TIP]
> The tools are complementary. You could use `/sdd` from `thoughtweave` for intent discovery and spec generation, then hand the spec to [Spec Kit](https://github.com/github/spec-kit) or [superpowers](https://github.com/obra/superpowers) for implementation.

## The skills

Three skills representing the lifecycle of a software change. Each corresponds to a phase and can be used independently, though they're designed to work together.

**1. `/init-agents-file`** - `AGENTS.md` files are for coding agents. They are read first when a session starts, so they shape every single interaction the agent has with your codebase. Generate one that reflects the actual architecture, constraints and conventions of your project. If the repo is empty, it proposes best practices. If the repo exists, it inspects what it can (structure, stack) and asks questions for everything that cannot be auto-inferred from code alone. One question at a time, like a conversation. The generated `AGENTS.md` includes a workflow checklist that mandates vulnerability scanning after implementation - the agent must scan the produced code for issues, study each finding, and fix iteratively. Configurable areas: security, safety, maintainability, readability, simplicity, testing, architecture, OOP principles, GoF patterns, coding style, technology stack, operational domain, repo-specific constraints and others.

**2. `/sdd`** - The central skill. Transforms ideas, Jira tickets, feature requests, drafts into implementation-ready specifications with **test cases**, methodology and validation strategy. It never starts writing immediately. First it selects the right depth - light mode for small, clear tasks, deep mode for complex or ambiguous ones. Then it asks three questions in order: whether to inherit context from past specs, where to save the output, and whether to search the web for technical details. After that, it asks about **your existing knowledge** of the areas the spec will touch - technologies, patterns, domain concepts - and adapts accordingly. Expert? Expect challenging questions and trade-off analysis. New to an area? The skill teaches and searches the web on the spot to fill gaps. **The output spec is consistently rigorous regardless of your starting knowledge** - the competency assessment and teaching mode compensate for gaps, so a junior or someone new to a technology produces the same quality spec as a senior. Then it enters a **Discovery** phase - a single fluid conversation where the agent alternates naturally between exploring the problem (challenging assumptions, asking "why") and diving deep into technical details when needed (studying documentation, searching the web, explaining concepts). No rigid separation between phases. Every question is marked with its intent (`[Problem]`, `[Technical]`, `[Decision]`). The skill asks questions that might make you feel disoriented - and that's the point. If it thinks your answer isn't the best choice, it will respectfully share its modest opinion.

- Nested within `/sdd` is a **Design TDD subskill**: after drafting the requirements, the agent asks to design test cases using Given-When-Then for each requirement - covering happy path, error states, edge cases, and integration boundaries. If a requirement cannot be tested, it is likely incomplete. The resulting tests validate the spec itself before any code is written, and become the test blueprint for implementation TDD. Fully documented in [the spec](specs/0-thoughtweave-def/spec.md).

- The generated specification includes **Mermaid diagrams** integrated directly into the document - architecture flows, decision trees, state transitions - using a consistent hand-drawn look and pastel palette. At least one diagram per spec where it improves understanding.

All specs are stored in the repository's `specs/` folder by default. The SDD skill asks for the location (default `specs/`), the changes skill inherits it.

**3. `/changes`** - Generates `changes.md`, a human-readable explanation of implemented changes. It inspects the codebase (diff, git history, file system) to understand what changed, then verifies that the implementation maps back to what was defined in the specification - checking that requirements, decisions, and acceptance criteria from the spec are actually reflected in the code. It also validates against the requirements and constraints documented in `AGENTS.md`, flagging any deviations. Before generating the document, it runs a vulnerability scan on the implemented code - finds insecure patterns, hardcoded secrets, vulnerable dependencies - studies each finding, and fixes them iteratively. All findings and fixes are documented in the output. Includes Mermaid diagrams with the same consistent styling to visually map what changed, why, and the impact on the system. A single centralized file per feature that tells developers exactly what changed and why, without needing to cross-reference multiple sources. Audience includes developers, reviewers, managers, stakeholders. Written to the same folder as the originating spec. The spec explains intent, the changes document explains outcome - they're two halves of the same story.

## The specs folder

The `specs/` folder is the engineering memory of the project. Records of intent, decisions, trade-offs, lessons learned. Not temporary artifacts. Not deleted after implementation.

```
specs/
└── feature-name/
    ├── spec.md
    └── changes.md
```

## The workflow

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

> [!TIP]
> Every major phase starts a fresh coding-agent session to maintain context quality.

0. **Configure**
    - Start a new session. Implement based on the spec.
    - Run `init-agents-file` skill to set up repository guidelines (once). Re-run it later (eventually) to update `AGENTS.md` as the project evolves.
1. **Write spec**
    - Start a new session. Implement based on the spec.
    - Describe the task (from Jira via MCP or just a conversation).
    - Run `sdd` skill to create the specification.
2. **Delegate implementation**
    - Start a new session. Implement based on the spec.
3. **Document changes**
    - Start a new session. Run `changes` skill to document what changed, and make vulnerability scanning.
    - Read everything, make final adjustments, review manually.
4. **Ship the changes**
    - You studied it, you understand it, you can explain it. Ship it.

Looks like many steps. In practice it's faster than regenerating code ten times because you didn't understand what you were building.

## Repository security

Since these skills are public and anyone can contribute, the repo itself is exposed to prompt injection, tool hijacking and other manipulation through pull requests. The repo includes git hooks in `.githooks/` that prevent commits and pushes if skill files are modified in ways that deviate from the standard intent - unauthorized tool additions, injected instructions, behaviour redirection. Hooks also run the test suite (`tests/`) to validate structure, content, compliance and artifacts on every commit. By the way, only repository owners can/will push to `master` and merge pull requests, so the `master` branch is always reviewed. On push to `master` only (not on any other branch), a GitHub Actions workflow (`.github/workflows/release.yml`) reads the latest git tag, increments the version, creates a new tag, and publishes a release with auto-generated notes. This ensures that development branches never trigger accidental version bumps. However, if you install from a non-master commit hash, those checks don't apply - review the hash source carefully before using it. If you're contributing to this repository, enable hooks via `git config core.hooksPath .githooks/`.

## Contributing

This repository is itself a `thoughtweave` project. You can (and should) use its own skills to help you contribute.

### How to contribute

1. **Open a pull request** from a feature branch. The usual GitHub flow - fork, branch, PR.
1. **Understand the repo** - read [`REPO_STRUCTURE.md`](REPO_STRUCTURE.md), then read [`IDEA.md`](IDEA.md) and [`AGENTS.md`](AGENTS.md).
1. **Run `/sdd`** if your change needs a specification - whether it's a new skill, a modification to an existing one, or an infrastructure change. Specs live in [`specs/`](/specs/).
1. **Make your changes** - modify skills, add files, update documentation. Use `/sdd` and `/changes` to document your work if the change is significant enough.
1. **Commit** - git hooks will run integrity checks (skill validation, workflow rules, unauthorized file detection) and **execute the test suite** automatically. All checks must pass before the commit is accepted.
1. **Push and open the PR** - describe what changed and why. Link to the spec if one was written.

> [!IMPORTANT]
> Changes that deviate from the core philosophy defined in [`IDEA.md`](IDEA.md) or that conflict with the owner's intent will not be merged into `master`. This repository is opinionated by design - not every good idea belongs here. If your change contradicts the fundamental principles (intent-first, developmental objective, anti-de-skilling), it will not be accepted, regardless of its technical merit. When in doubt, open an issue first to discuss alignment before investing time in implementation.

### Development setup

```shell
npm install                            # Install npm (for tests)
git config core.hooksPath .githooks/   # Enable security hooks
```

### What needs contributors

- **New skill ideas** - if you have a workflow that `thoughtweave` doesn't cover.
- **Agent-specific adjustments** - the skills should work across `opencode`, `codex`, `gemini`, `claude`, etc. If an agent handles a skill poorly, help adapt it.
- **Better defaults** - the configurable areas in `/init-agents-file` can always have smarter defaults.
- **Documentation** - examples, tutorials, agent-specific guides.
- **Testing** - the test suite can always be more thorough.

### Philosophy applies here too

> [!NOTE]
> This repo is not perfect. It never will be. It contains most of the lessons learned from daily experience. Before writing code, think deeply. Challenge assumptions. Document decisions. The same principles that `thoughtweave` teaches for software development apply to the development of `thoughtweave` itself.

## License

[MIT](/LICENSE). Do whatever you want.

## The final message

> [!IMPORTANT]
> **Stop vibe coding.** Start using your coding agent as it shall be used. Understand first. Think slowly. Build intentionally. Respect your code. Respect your intelligence.

**Most importantly, respect intent.** Without intent, code is just noise. With intent, code becomes engineering.
