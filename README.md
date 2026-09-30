# AgentEval Studio

Developer-focused workspace for testing LLM and agent behavior against repeatable scenarios before prompts or workflows are released.

## Status

Planning and technical validation.

## Proposed MVP

- Define version-controlled test cases and expected behaviors.
- Run the same cases against prompt or agent variants.
- Evaluate structured output, tool selection, latency, token use, and task-specific criteria.
- Compare runs and highlight regressions.
- Export a concise evaluation report.

## Proposed stack

- Next.js, React, TypeScript, and Tailwind CSS
- Python and FastAPI
- Pytest-based evaluation utilities
- Provider-agnostic LLM adapters
- JSON fixtures for the initial test suites
- Vercel for the web experience

## Data approach

The initial version will keep test suites in version-controlled files and produce downloadable results. Persistence will be added only if experiment history and collaboration justify a database.

## What this project is meant to demonstrate

LLM evaluation, regression testing, observability, structured outputs, cost and latency analysis, and production-minded AI engineering.

## Initial roadmap

1. Define the evaluation model and result schema.
2. Implement deterministic and model-assisted evaluators.
3. Build prompt and agent comparison views.
4. Add regression thresholds and exportable reports.
5. Validate the tool using Voice Agent scenarios.


