# AgentEval Studio agent guide

## Mission

Build a portfolio-quality workspace that compares LLM and agent variants against repeatable, version-controlled scenarios and makes regressions, cost, latency, and uncertainty visible.

## Canonical sources

Read `README.md`, `docs/ARCHITECTURE.md`, and the closest schemas, fixtures, adapters, and tests before non-trivial work. Identify and resolve conflicts between documentation and executable behavior.

## Product invariants

- An evaluation result is reproducible from its suite version, case definition, runner version, provider/model configuration, and captured parameters.
- Never silently change historical results, expected behavior, thresholds, or grader prompts.
- Keep deterministic assertions separate from heuristic or model-assisted judgments.
- Store raw observable inputs and outputs needed for auditing, but never persist provider secrets.
- Label model-assisted scores with evaluator identity, configuration, and limitations.
- Compare variants under equivalent conditions or disclose the differences prominently.
- Cost and latency are measurements with units and sampling context, not universal constants.
- Provider-specific behavior stays behind adapters; the core result schema remains provider-neutral.

## Intended repository shape

- `apps/web`: Next.js suite editor, run comparison, trace, regression, and export views.
- `apps/api`: FastAPI run orchestration, provider adapters, grading, and report endpoints.
- `packages/contracts`: shared suite, case, trace, measurement, score, and report schemas when useful.
- `evals`: version-controlled suites, fixtures, grader configurations, and expected behaviors.
- `docs`: architecture, decisions, and active implementation plans.

Add boundaries only when an implemented slice needs them.

## Engineering rules

- Define schemas before building comparison UI.
- Give every suite, case, variant, run, trace event, metric, grader, and artifact a stable identifier.
- Capture timestamps, duration units, token accounting source, provider response metadata, and errors explicitly.
- Make retries visible; do not merge retry measurements into a successful run silently.
- Deterministic evaluators must be pure and testable without a model call.
- Model-assisted graders require calibration examples and cannot be presented as objective truth.
- Use fake providers in ordinary tests; live-provider tests are opt-in and clearly cost-bearing.
- Prefer JSON fixtures initially. Add a database only when experiment history or collaboration requires it.
- Avoid comparing scores with incompatible scales or grader versions.

## Workflow

1. Inspect affected schemas, fixtures, and comparison semantics.
2. Plan work under `docs/plans/` when it spans runner, grader, API, and UI boundaries.
3. Implement the smallest reproducible evaluation slice.
4. Test schemas and deterministic evaluators before provider integrations.
5. Run narrow checks, then the documented suite.
6. Review the diff for reproducibility, accidental mutation, measurement validity, secret exposure, and misleading presentation.
7. Record durable architecture decisions under `docs/decisions/`.

Do not invent build commands before scaffolding exists. Update `docs/HARNESS.md` when real commands become stable.

## Definition of done

A change is complete when results can be traced to their inputs and configurations, retries and failures remain visible, deterministic behavior is tested, model-assisted uncertainty is disclosed, documentation is current, and only executed checks are reported as passing.
