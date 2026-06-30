# Tests

This directory contains structural, content, compliance, artifact, githook, and terraform invariant tests.

## How to Run

```shell
npm test
```

Or from the root:

```shell
npm --prefix tests test
```

## Test Categories

- **structural/** - Directory and file existence checks
- **content/** - Required section verification in skills
- **compliance/** - Philosophical integrity checks
- **artifacts/** - Output file schema validation
- **githooks/** - Githook script content validation
- **terraform/** - Terraform invariant checks

All tests use Node.js with `vitest`.
