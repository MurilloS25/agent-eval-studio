# Invariant Trail

Visual failure simulator for stateful workflows. Invariant Trail explores retries, duplicates, crashes, delays, and concurrency to find the shortest execution path that breaks a safety rule.

## Status

Product direction and development harness are ready. Implementation has not started.

## Start here

- [Architecture](docs/ARCHITECTURE.md)
- [Development harness](docs/HARNESS.md)
- [Agent guide](AGENTS.md)

## Product experience

1. Choose a built-in workflow such as booking, payment/refund, inventory/order, or webhook processing.
2. Inspect its states and transitions in a visual graph.
3. Select a plain-language safety invariant, such as “never confirm the same booking twice.”
4. Enable realistic failure conditions: duplicate delivery, a lost response after a side effect, delayed or out-of-order events, concurrent operations, a crash between writes, or a late retry.
5. Explore the finite state space deterministically.
6. Replay the shortest counterexample step by step and see exactly where state became unsafe.

## Initial product boundary

- Local-first and deterministic; no LLM or paid provider is required.
- Curated workflow templates and typed controls, not an arbitrary-code runner.
- No arbitrary remote URLs, credentials, or untrusted program execution.
- A bounded explorer with explicit limits, stable state hashing, deduplication, and reproducible results.
- JSON/YAML may later become optional import/export formats, but they are not the primary experience.

## What this project demonstrates

State-machine design, model-based testing, bounded state-space exploration, failure injection, idempotency and concurrency reasoning, shortest-counterexample generation, secure input boundaries, and accessible data visualization.

## Proposed first release

- A polished visual workspace with several built-in workflows.
- Typed invariant and failure controls.
- Deterministic breadth-first exploration with visible bounds and progress.
- Safe/unsafe results with a shortest counterexample.
- Step-by-step replay showing events, state diffs, and the violated invariant.
- Offline tests, documented limitations, and a deployable public demo that needs no account or external service.
