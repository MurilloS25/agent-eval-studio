# Development harness

## Active components

- `AGENTS.md`: canonical cross-agent contract.
- `CLAUDE.md`: minimal Claude Code entry point.
- `.claude/skills/frontend-design`: audited Anthropic skill pinned to the reviewed commit.
- `product-researcher`: bounded, read-only investigation.
- `change-reviewer`: focused, read-only review of completed work.
- `docs/plans/` and `docs/decisions/`: durable reasoning outside standing context.

## Working loop

Inspect contracts and template semantics first. Resolve real uncertainty with bounded research. Build the deterministic engine before the main visualization. Verify known shortest counterexamples and bounded-safe cases, then exercise the complete experience in a browser. Review state identity, explosion limits, race/cancellation behavior, untrusted input boundaries, accessibility, and claims before publishing.

The current task authorizes autonomous implementation after a plan is written: do not pause at artificial review gates when safe, offline work remains. Still stop before merging, deploying, adding secrets, creating paid resources, or expanding into provider-backed services.

After updating Claude Code, prefer bundled `/run`, `/verify`, `/code-review`, `/debug`, and `/security-review`. Once the project launches reliably, use `/run-skill-generator` to capture the real startup recipe.

## Deliberately absent

- No LLM, AI provider, paid API, database, account system, or server-side persistence.
- No arbitrary program or expression execution.
- No hooks until stable checks exist.
- No blanket tool approvals.
- No multi-agent team unless the scope demonstrably benefits from independent review.

Update this file when install, run, test, lint, typecheck, build, or browser-validation commands become real. Remove harness components that do not earn their cost.
