# Architecture

## Product boundary

AgentEval Studio defines evaluation suites, runs prompt or agent variants under recorded configurations, applies deterministic and optional model-assisted evaluators, compares results, and exports an auditable report. The first version is a local/developer portfolio tool rather than a multi-tenant evaluation service.

## Proposed components

1. **Web application** — suite editing, run configuration, comparison, trace inspection, regression flags, and report export.
2. **API application** — validation, run orchestration, provider adapters, evaluator execution, and report generation.
3. **Evaluation model** — versioned suite and case schemas, variant definitions, expected behaviors, and thresholds.
4. **Runner** — executes cases with concurrency and retry policies while preserving every attempt as observable data.
5. **Evaluators** — deterministic checks first; separately labeled model-assisted graders where judgment is required.
6. **Artifacts** — JSON results and downloadable reports derived from immutable run data.

## Core records

- **Suite/version**: ordered cases and default evaluation policy.
- **Case**: input, fixtures, expected behavior, tags, and case-level criteria.
- **Variant**: prompt/agent configuration and provider parameters.
- **Run/attempt**: environment, timestamps, status, raw observable output, usage, latency, and errors.
- **Evaluation**: evaluator identity/version, score or verdict, evidence, and explanation.
- **Comparison**: compatible measurements and regression decisions with thresholds.

## Trust boundaries

- Fixture and model text is untrusted data.
- Provider output is variable and may violate schemas.
- Model-assisted graders are fallible measurements, not authorities.
- API keys stay outside fixtures, artifacts, browser state, and logs.
- Exported reports are derived views and must reference their source run.

## Provisional choices

- JSON fixtures and JSON results before introducing a database.
- Pytest-compatible deterministic utilities for easy local and CI use.
- Provider-neutral adapters and normalized usage fields while retaining raw provider metadata.
- Statistical summaries only after repeated runs make them meaningful.
- Validate the product initially with Voice Agent conversation scenarios.

## First vertical slice

Load one versioned suite containing several text-based Voice Agent cases, execute two fake deterministic variants, apply exact/schema/tool-selection evaluators, compare results, flag one regression, and export a JSON report. No live provider or database is required.

## Decisions still requiring evidence

- Schema library and cross-language contract strategy.
- Async/concurrency model and cancellation behavior.
- Normalized token and cost representation across providers.
- Model-assisted grader calibration method.
- When persistence becomes more valuable than file-based reproducibility.
