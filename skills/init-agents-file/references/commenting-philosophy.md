# A Practical Philosophy of Code Comments

Code comments are a tool for communication between the original author and every future reader of that code -- including the author six months later. The question is not whether to comment, but what to comment and how.

## Why Comments Matter

Reading code tells you _what_ the computer does. Comments tell you _why_ a human chose to make it do that. The distinction is critical: code expresses logic, but intent, context, and trade-offs are invisible in the syntax.

A well-placed comment reduces the time a reader needs to understand not just the mechanics, but the reasoning behind them. This is not a crutch for unclear code -- it is a complement to clear code.

## Categories of Comments

Different situations call for different kinds of comments. Recognizing the type helps you decide what information belongs in each one.

### Intent Comments

Every piece of code exists because someone made a choice. Intent comments capture that decision: what alternatives were considered, which constraints influenced the outcome, and why the chosen approach won. The code shows the result; the comment preserves the reasoning.

```python
# A recursive approach is used here instead of iteration
# because the nesting depth is guaranteed to be < 20.
# An explicit stack would be equivalent but harder to read
# for this specific traversal pattern.
```

Without this comment, a future reader might replace the recursion with an stack-based loop, making the code harder to follow for no benefit.

Sometimes the intent is about ordering rather than selection:

```python
# The shutdown hook must be registered before any resources
# are allocated. If registration fails, the entire startup
# sequence aborts to avoid orphaned connections.
```

### Boundary Comments

Code often makes assumptions about its inputs, its environment, or the state of the system at the time of execution. Boundary comments make those assumptions visible. They document what callers must guarantee and what the code does not check on its own.

```python
# The config object passed here must have either a 'host'
# or a 'unix_socket' field, but never both. Validation
# happens upstream in the parser layer.
```

When the boundary involves versioning or protocol details, the comment prevents mistakes that would be hard to debug:

```python
# This channel expects messages where the first byte is
# the protocol version. Older versions (0x01, 0x02)
# reorder the header fields. See migration guide in
# docs/legacy-protocol.md for details.
```

### Summary Comments

A block of code can take many lines to express a single logical step. Summary comments break that sequence into labeled phases. They let a reader scan the overall structure first and zoom into the relevant part later, without reading every line.

```python
# 1. Acquire the shared lock before touching the buffer
# 2. Drain pending writes into the output channel
# 3. Release the lock and notify listeners
```

Summary comments also set expectations: a reader knows what each section will accomplish before studying its details.

### Domain Comments

Some code implements concepts that belong to a specific field: networking, graphics, finance, cryptography, or any specialized area. Domain comments explain the underlying model so that a reader without that background can follow the logic. They teach principles, not decisions.

```
# This implements a bloom filter with three hash functions.
# Empty slots are represented by 0, occupied slots by 1.
# False positives are possible but false negatives are not.
# The filter size is rounded up to the nearest power of two
# so that modulo operations compile to bitmask instructions.
```

A domain comment is different from an intent comment: it describes what the concept is, not why this particular implementation was chosen.

### Interface Comments

Functions and classes define contracts between their author and their callers. Interface comments specify those contracts in plain language: what arguments are expected, what the function returns, and what error conditions can arise. They allow callers to use the abstraction without reading its internals.

```python
# load_pipeline(config_path, env_override=None)
# Reads a YAML pipeline definition and resolves all
# ${VAR} placeholders using the current environment.
# Returns a Pipeline object with resolved stages.
# Raises ConfigError if the file is missing, malformed,
# or references an undefined variable.
```

A well-written interface comment acts as localized API documentation -- always in sync with the code because it lives right above it.

### Reference Comments

Software projects accumulate context across many documents: specifications, bug reports, design proposals, regulatory requirements. Reference comments create a link between the code and that external context. They answer the question "where does this requirement come from?"

```python
# The pagination limit of 1000 items matches the upstream
# API contract defined in docs/api-v2.md#pagination.
```

Without a reference, a reader has no way to trace a requirement back to its source.

## Comments to Avoid

Not all comments are valuable. Some add noise or even become harmful:

- **Redundant comments** -- restating what the code already expresses clearly. A line like `send_notification()  # Send the notification` adds nothing and erodes trust in surrounding comments.
- **Outdated comments** -- left behind after code changes, now actively misleading. A comment that contradicts the code is worse than no comment at all.
- **Commentaries instead of refactoring** -- when a block is so complex it needs a paragraph to explain, the code itself should be simplified. If you feel the need to write a long explanation, refactor first, then comment the remaining non-obvious parts.
- **Blame comments** -- comments that express frustration about a design decision or another developer's work. They erode team culture and provide no technical value.

## Comments as a Thinking Tool

Writing a comment forces you to articulate your reasoning. If you cannot describe why code does something in a sentence, you may not understand it well enough. The act of commenting is itself a quality check: it surfaces unclear designs, hidden assumptions, and incomplete logic before the code reaches a reviewer.

A good heuristic: if you are about to write a comment and realize you are uncertain about the behaviour, investigate first. The comment is telling you something is wrong with the code.

## When Not to Comment

Comments are not needed when:

- The code is self-explanatory through naming and structure. A well-named function (`is_valid_email()`) does not need `# Check if email is valid`.
- The comment would repeat what the type system already enforces (e.g., `# This parameter must not be null` when the language has non-nullable types).
- The behaviour is an obvious consequence of the language or framework. Standard library calls and idiomatic patterns do not need explanation.

## Maintenance Rule

Every comment is a maintenance obligation. When code changes, associated comments must change too. Stale comments are worse than missing ones because they actively mislead. For this reason:

- Prefer comments that describe stable properties (why, intent) rather than volatile implementation details (exact algorithm steps).
- During code review, flag comments that are no longer accurate as hard issues, not suggestions.
- If a comment adds no information beyond what the code already says, delete it.

Commenting is not documentation after the fact. It is part of the engineering process.
