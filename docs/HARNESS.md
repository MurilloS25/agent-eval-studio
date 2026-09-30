# Development harness

## Active components

- `AGENTS.md`: canonical cross-agent contract.
- `CLAUDE.md`: minimal Claude Code entry point.
- `.claude/skills/frontend-design`: audited Anthropic skill pinned to the reviewed commit.
- `product-researcher`: bounded, read-only investigation.
- `change-reviewer`: focused, read-only review of completed work.
- `docs/plans/` and `docs/decisions/`: durable reasoning outside standing context.

## Working loop

Inspect schemas first, research real uncertainty, plan multi-boundary work, implement one reproducible slice, verify deterministic behavior before live providers, review measurement integrity, and record only durable decisions.

After updating Claude Code, prefer bundled `/run`, `/verify`, `/code-review`, `/debug`, and `/security-review`. Once the project launches reliably, use `/run-skill-generator` to capture the real startup recipe.

## Deliberately absent

- No database until experiment history or collaboration requires it.
- No live-provider calls in the default test path.
- No hooks until stable checks exist.
- No blanket tool approvals.
- No agent team at the current project size.

Update this file when install, run, test, lint, or evaluation commands become real. Remove harness components that do not earn their cost.
