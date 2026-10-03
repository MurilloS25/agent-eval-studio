# Invariant Trail agent guide

## Mission

Build a portfolio-quality visual simulator that helps people discover how realistic delivery, retry, crash, and concurrency failures can violate safety invariants in stateful workflows.

## Canonical sources

Read `README.md`, `docs/ARCHITECTURE.md`, `docs/HARNESS.md`, the active plan, and the closest contracts and tests before non-trivial work. Resolve conflicts between prose and executable behavior explicitly.

## Product invariants

- The same workflow, controls, engine version, and bounds produce the same exploration result and counterexample.
- Exploration is finite and visibly bounded by validated limits; cancellation and exhaustion are distinct outcomes.
- A reported counterexample is replayable from the initial state, with every transition and state change preserved.
- State identity is canonical. Equivalent states deduplicate reliably, and hashing never depends on object insertion order or wall-clock time.
- The engine never executes arbitrary user code, fetches arbitrary URLs, or requires secrets.
- Curated templates are usable without writing JSON or YAML.
- Safety claims are precise: distinguish “no violation found within these bounds” from proof over an unbounded system.
- Failure semantics are explicit. Duplicates, delays, crashes, retries, and concurrent actions must not be silently collapsed.
- The UI explains the violated invariant and the causal path; it does not merely paint a node red.

## Intended repository shape

- `apps/web`: visual workspace, controls, exploration status, result summary, and counterexample replay.
- `packages/engine`: pure deterministic workflow semantics, failure expansion, bounded exploration, and trace reconstruction.
- `packages/contracts`: shared workflow, invariant, exploration, and trace schemas when a boundary needs them.
- `examples`: version-controlled built-in workflows and expected counterexamples.
- `docs`: architecture, decisions, and active implementation plans.

Add boundaries only when an implemented slice needs them. A single Next.js application plus pure TypeScript packages is preferred unless evidence justifies a separate API.

## Engineering rules

- Define the state, transition, invariant, failure, bound, and result contracts before building the main visualization.
- Keep the exploration engine pure and independent from React and browser APIs.
- Prefer breadth-first search for shortest counterexamples unless a documented decision changes the objective.
- Use canonical serialization or an equally explicit state-key strategy; test key-order independence and collision assumptions.
- Keep exploration limits conservative in the browser. Show progress, allow cancellation, and avoid blocking the main thread when meaningful workloads require isolation.
- Validate every imported or URL-derived value. Treat workflow labels and descriptions as untrusted text.
- Use seeded or enumerated behavior only; never hide nondeterminism behind `Math.random()`.
- Make failure injection composable but bounded. Test combined failures, not only isolated toggles.
- Built-in examples must include both a safe configuration and at least one known shortest counterexample.
- Accessibility includes keyboard operation, focus visibility, non-color-only status, reduced-motion support, and readable graph alternatives.
- Ordinary tests are offline and free. Do not add provider SDKs, telemetry services, databases, or authentication without an accepted decision.

## Workflow

1. Inspect the affected contracts, example semantics, and current active plan.
2. Plan cross-boundary work under `docs/plans/`, but keep implementation moving when the task authorizes autonomous delivery.
3. Implement vertical slices: contracts and engine first, then worker/API boundary if needed, then interface.
4. Prove engine behavior with unit, property-oriented, fixture, and replay tests before relying on visual checks.
5. Run narrow checks, then the documented full suite and production build.
6. Exercise the finished experience in a real browser across desktop and narrow viewports.
7. Review for correctness, state explosion, unsafe input handling, accessibility, misleading claims, and missing tests.
8. Record only durable architecture decisions under `docs/decisions/`.

Do not invent passing commands. Update `docs/HARNESS.md` as soon as real install, run, test, lint, typecheck, and build commands exist.

## Definition of done

A change is complete when its state semantics are explicit, deterministic behavior and counterexample minimality are tested, limits and residual uncertainty are visible, untrusted inputs cannot become executable behavior, the primary workflow is accessible, documentation matches reality, and only checks actually run are reported as passing.
