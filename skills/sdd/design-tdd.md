---
name: design-tdd
description: Describe test cases (Given-When-Then) during the specification phase to validate requirements before any code is written. Use after drafting Requirements in /sdd to ensure each requirement is testable and complete.
---

# Design TDD Subskill

This subskill is invoked by the main SDD skill (`skills/sdd/SKILL.md`) after the Requirements & Best Practices section is drafted but before the spec is finalized.

## Purpose

Design TDD is the practice of *describing* tests during the specification phase - before any implementation code exists. It uses test design as a thinking tool to validate the spec itself. The tests are **documented in the generated spec**, not executed.

## Behaviour

1. After drafting the Requirements section, ask: *"Shall I describe the test cases now? This will help validate that the requirements are complete and unambiguous."*
   - If yes, proceed with the Design TDD process below.
   - If no, flag this as a risk in the Decisions, Assumptions & Compromises section.

2. For each functional requirement, describe at least one test case. For each non-functional requirement, describe the validation approach. Coverage must include:
   - **Happy path** - the expected successful flow
   - **Error states** - what happens when things go wrong (invalid input, system failure, permission denied)
   - **Edge cases** - boundary conditions, empty states, maximum values
   - **Integration boundaries** - how the component interacts with external systems, databases, or other modules

3. For each test case, write into the spec:
   - **Scenario** - what is being tested
   - **Given** - the preconditions and state
   - **When** - the action or trigger
   - **Then** - the expected outcome and postconditions
   - **Why this test matters** - which risk it mitigates or which assumption it validates

4. After describing tests, review the requirements and acceptance criteria:
   - Do the tests reveal gaps in the requirements? If a requirement cannot be tested, it is likely incomplete - revise it.
   - Do the tests surface hidden assumptions? If so, add them to the Decisions, Assumptions & Compromises section.
   - Do the tests suggest missing acceptance criteria? Add them.

5. The resulting test descriptions are written into the Tests section of the spec. They serve as documentation and as a blueprint for implementation TDD.

## Relationship with Implementation TDD

Design TDD (this subskill) is about *describing* tests in the spec. Implementation TDD is about *writing and executing* the red-green-refactor cycle during coding. The spec describes what to test; the implementation writes the actual test code.
