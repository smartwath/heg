---
trigger: always_on
---

# Angular Testing Rules

- Every generated Angular artifact that supports tests must include its spec file.
- Never use --skip-tests.
- Do not delete existing tests to make a build pass.
- Update tests when behavior changes.
- Add tests for new business logic.
- Run the relevant test suite after implementation.
- Do not consider a task complete when tests are failing.