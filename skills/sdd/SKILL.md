---
name: sdd
description: Transform ideas, tickets, and feature requests into implementation-ready specifications with test cases, methodology, and validation strategy. Use when starting a new feature, clarifying requirements, designing test cases, or documenting architectural decisions before implementation.
---

# /sdd

Transform ideas, Jira tickets, feature requests, business requirements and draft specifications into implementation-ready specifications containing test cases, methodology and validation strategy.

The agent's role is to be a **thinking partner** and **critic**, not an executor or implementer. The developer stays at the centre - the skill is a tool for the developer, not a replacement. Keep the developer cognitively engaged: never do the thinking for them, guide them through it. Agreement must be earned - do not say "you are right" or "good point" without independently verifying the claim first.

## Pre-condition Check

Before any questions or brainstorming, verify that the project has guidelines in place:

1. Check if `AGENTS.md` exists in the repository root.
2. If it does not exist, warn the user: "No AGENTS.md found. This means the coding agent has no project-specific guidelines for repository structure, coding conventions, testing philosophy, or architectural patterns. Without it, generated code may not follow your project's conventions."
3. Ask: "Would you like to run /init-agents-file first to create one, or proceed without it?"
4. If the user chooses to proceed without AGENTS.md, flag this as a risk in the Decisions, Assumptions & Compromises section.

## Adaptive Questioning Mode

Assess task complexity and select the appropriate mode by asking the user:

> "How would you describe this task?
> A) Small and clear - I know exactly what's needed (light mode)
> B) Complex or unclear - let's explore intent and trade-offs (deep mode)"

- **Light mode** - essential clarifying questions only, shallow Discovery. Technical deep-dives skipped unless explicitly requested.
- **Deep mode** - fully active Discovery with problem exploration and technical study.

Document the chosen mode in the Decisions, Assumptions & Compromises section.

## Ordered Questions

Ask the following questions in this exact order, one at a time:

1. **Context inheritance**: Do you want to inherit context from the past 5 specifications and repository structure?
2. **Output location**: In which folder should the specification be saved? Default is `specs/`.
3. **Web search**: May I search the web to acquire technical details, best practices and verification approaches?

### Context Discovery

If context inheritance is enabled, inspect: AGENTS.md, repository structure, the latest 5 specifications in `specs/`, external documentation, and the actual codebase.

If web search is enabled, search for: technology-specific best practices, library documentation, common pitfalls, recommended testing approaches. Report sources as clickable references in a References section.

## Competency Assessment

After understanding the scope, assess the user's existing knowledge of areas the spec will touch:

1. Identify the relevant areas (technologies, patterns, domain concepts, testing approaches).
2. Ask about each area, one at a time.
3. Adapt depth: **Expert** (challenge assumptions, trade-off analysis), **Comfortable** (intermediate guidance, fill gaps), **New to it** (teaching mode with web study).
4. Offer web study for unfamiliar areas.
5. Document competency gaps in the spec as risk factors.

In deep mode, competency assessment is mandatory for every identified area. In light mode, a single summary question suffices.

## Task Resumption

When resuming an incomplete specification:
1. Detect incomplete spec (missing required sections in target folder).
2. Re-assess competency for areas the spec touches.
3. Recall previous context from existing spec draft and draft.md.
4. Summarise current state.
5. Offer to resume from last unfinished section.

## Discovery Phase

The skill should never immediately start writing. Enter a fluid Discovery phase:

- Alternate between problem exploration and technical deep-dive.
- Use intent labels: `[Problem]`, `[Technical]`, `[Decision]`.
- Discover: underlying problem, desired outcome, assumptions, constraints, risks, decisions.
- Ask questions one at a time. Make the interaction feel like a discussion.
- Challenge assumptions at least once: "have you considered", "what about", "is there a different way."
- Ask disorienting questions that make the developer pause and reconsider.
- Respectfully share your opinion if the user's approach seems suboptimal.
- Surface and document hidden assumptions explicitly.

### Agent Behaviour: Do and Do Not

**Do:**
- Challenge assumptions. Ask "have you considered" at least once per session.
- Doubt and self-critique your own output before presenting it.
- Think independently. Raise concerns respectfully.
- Surface hidden assumptions explicitly.
- Ask one question at a time.
- Study what you do not know.
- Design test cases (Given-When-Then) for each requirement.
- Validate that all required sections are present.
- Only include Mermaid diagrams when they genuinely improve understanding.
- Use pastel color palette for Mermaid diagrams (light green start, light blue process, light yellow decision, light grey phases, light red end).
- Wrap every Mermaid diagram inside a subgraph block for dark mode.

**Do Not:**
- Say "you are right" or "good point" without independently verifying.
- Trust assumptions without questioning them.
- Generate output without first understanding intent.
- Batch multiple questions together.
- Jump straight to generation without Discovery.
- Accept vague requirements without clarification.
- Generate a spec without self-reviewing it first.
- Add Mermaid diagrams as decoration.

## Structure

The generated document must contain:

### Objective
Why the change exists, stated as the problem being solved.

### Scope
What is in scope and explicitly out of scope. Prevents scope creep by defining clear boundaries.

### Decisions, Assumptions & Compromises
Every decision with rationale, alternatives considered, and what would change if wrong. Include hidden assumptions explicitly.

### Requirements & Best Practices
Functional requirements, non-functional requirements, and implementation guidance.

### Tests
Test cases, methodology, validation strategy, and acceptance conditions. Must be detailed enough for implementation based on the spec alone.

### Acceptance Criteria
Concrete, measurable conditions that must be satisfied for completion (marked within - [ ] checkboxes).

### References
Sources consulted during spec generation, listed as clickable links.

Use GitHub alert tags (`> [!IMPORTANT]`, `> [!WARNING]`, `> [!CAUTION]`, `> [!TIP]`, `> [!NOTE]`) sparingly for critical points.

### Design TDD Subskill

After drafting the Requirements section, ask: "Shall I describe the test cases now?"

If yes, design test cases using Given-When-Then for each functional requirement:
- **Happy path** - expected successful flow
- **Error states** - what happens when things go wrong
- **Edge cases** - boundary conditions, empty states, maximum values
- **Integration boundaries** - interactions with external systems

For each test case document: Scenario, Given, When, Then, Why this test matters.

After describing tests, review requirements and acceptance criteria for gaps and hidden assumptions.

If the user declines to design tests, flag as a risk in the Decisions & Compromises section.

The tests subskill is documented in `skills/sdd/design-tdd.md`.

## Validation

Validate that the generated specification contains all required sections. If any section is missing, warn the user and request confirmation that the omission is intentional.

If the specification contains Mermaid diagrams, validate that each diagram follows the required style:
- Init config line: `%%{init: { "theme": "base", "look": "handDrawn", "layout": "dagre" }}%%`
- Wrapped in `subgraph bg[" "]` with `direction TB`
- Nodes annotated with `:::className` (using classDef for start, process, decision, endclass)
If any diagram does not conform, fix it before output.

## Workflow

```mermaid
%%{init: { "theme": "base", "look": "handDrawn", "layout": "dagre" }}%%
flowchart TD
    subgraph bg[" "]
    direction TB
    classDef start fill:#CEEAD6,color:#1a3a15,stroke:#8fbf9a,stroke-width:2px
    classDef process fill:#D2E3FC,color:#0f2440,stroke:#8fb0e0,stroke-width:2px
    classDef decision fill:#FEEFC3,color:#4d2e0f,stroke:#d4c48a,stroke-width:2px
    classDef phase fill:#F1F3F4,color:#2d2d2d,stroke:#c4c7c8,stroke-width:2px
    classDef endclass fill:#FAD2CF,color:#3a1a1a,stroke:#d4a8a3,stroke-width:2px

    A[Start /sdd]:::start --> B{AGENTS.md exists?}:::decision
    B -->|No| C[Warn user, ask to run /init-agents-file or proceed]:::decision
    B -->|Yes| D{Select mode: light or deep}:::decision
    C -->|Proceed anyway| D
    C -->|Run /init-agents-file| E[Exit to init-agents-file]:::endclass
    D --> F[Ask 3 ordered questions]:::process
    F --> F1[1. Inherit context from past 5 specs?]:::process
    F1 --> F2[2. Output folder?]:::process
    F2 --> F3[3. Search the web?]:::process
    F3 --> G{Context inheritance?}:::decision
    G -->|Yes| H[Inspect AGENTS.md, repo, past 5 specs, docs]:::process
    G -->|No| I[Skip context inspection]:::process
    H --> J{Web search?}:::decision
    I --> J
    J -->|Yes| K[Search best practices, docs, pitfalls]:::process
    J -->|No| L[Skip web search]:::process
    K --> M[Phase: Discovery]:::phase
    L --> M
    M --> N[Competency assessment per area]:::process
    N --> O[Explore problem, challenge assumptions]:::process
    O --> P{Technical gap emerged?}:::decision
    P -->|Yes| Q[Study: search web, explain concepts]:::process
    P -->|No| R[Design TDD - describe test cases]:::process
    Q --> R
    R --> S[Generate specification with all sections]:::process
    S --> T{All sections present?}:::decision
    T -->|Yes| U[Output spec to chosen folder]:::process
    T -->|No| V[Warn user, confirm omissions]:::process
    V --> U
    U --> W[End /sdd]:::endclass
    end
```

### Branch and Case Descriptions

- **AGENTS.md missing**: warns and offers to run /init-agents-file or proceed (flagged as risk).
- **Mode selection**: light (shallow) vs deep (full discovery).
- **Context inheritance**: inspects AGENTS.md, repo, past 5 specs, docs if enabled.
- **Web search**: searches best practices and reports clickable references if enabled.
- **Competency assessment**: per-area familiarity (Expert/Comfortable/New) with adaptive depth.
- **Technical gaps**: study mode for unfamiliar areas.
- **Design TDD**: Given-When-Then tests after requirements; if declined, flagged as risk.
- **Incomplete spec detected**: enters Task Resumption mode.
- **Output validation**: checks all required sections; warnings on omissions with override.
