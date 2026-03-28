# Working doc: parallel LLM runs (Lexington Sandstone -> Horizon)

Use this as the canonical runbook for parallel model experiments.

## Repository paths

| Role | Path |
|------|------|
| Reference theme (read-only) | `lexington-reference/sandstone_v6/` |
| Claude variant | `horizon-themes/claude/` |
| OpenAI variant | `horizon-themes/openai/` |
| Gemini variant | `horizon-themes/gemini/` |

Each variant maps to its own unpublished Shopify theme (`docs/horizon-themes.md`).

---

## Reusable prompt template

Replace:
- `{{THEME_ROOT}}` (one variant only)
- `{{REFERENCE_ROOT}}` (Sandstone reference path)
- `{{EXECUTION_MODE}}` as `full_pipeline` or `plan_only`

### BEGIN PROMPT

You are one model in a parallel 3-model theme restyle comparison. Other models are editing other variant folders at the same time.

#### Mode

- `execution_mode`: **{{EXECUTION_MODE}}**
  - `plan_only`: finish Phase 1 docs, stop.
  - `full_pipeline`: plan then execute all phases until stop criteria are met or blocked.

#### Scope lock (hard rules)

1. Read-only reference: `{{REFERENCE_ROOT}}` (do not edit unless explicitly approved).
2. You may edit files **only** under `{{THEME_ROOT}}`.
3. Forbidden edits: repo `docs/`, root config files, `.cursor/`, `lexington-reference/`, and any other variant folder.
4. Put all run artifacts under `{{THEME_ROOT}}/.rebuild/`.
5. Update `{{THEME_ROOT}}/.rebuild/run-manifest.json` on every phase change.

Before making edits, print a one-line scope assertion:
`ACTIVE_SCOPE={{THEME_ROOT}}`

#### Project intent

Rebuild the visual language of Lexington Sandstone inside Horizon in a Shopify-native, maintainable way. This is a reference-guided rebuild, not a code transplant.

#### Skill and methodology

Follow `docs/skills/theme-cloning.md` (shopify-theme-rebuild), with parallel-safe outputs:
- `{{THEME_ROOT}}/.rebuild/theme-mapping.md`
- `{{THEME_ROOT}}/.rebuild/rebuild-plan.md`
- `{{THEME_ROOT}}/.rebuild/benchmark-spec.md`
- `{{THEME_ROOT}}/.rebuild/visual-parity-log.md`
- `{{THEME_ROOT}}/.rebuild/STATUS.md`

#### No-commit policy during parallel execution

Do not commit during phase loops. Use `.rebuild` files and screenshots for checkpoints. A single end-of-run commit is handled later by the user.

#### Screenshot SOP (required)

- Capture at fixed viewports: `1440x900`, `768x1024`, `390x844`.
- Use same page state/content and zoom each loop.
- Save as:
  - `{{THEME_ROOT}}/.rebuild/screenshots/loop-XX/reference-{viewport}.png`
  - `{{THEME_ROOT}}/.rebuild/screenshots/loop-XX/horizon-{viewport}.png`
- Log top 3 mismatches and changed files per loop.

#### Reference benchmark rule

If reference edits are not permitted, do not modify `{{REFERENCE_ROOT}}`. Instead, write exact manual reference benchmark steps in `benchmark-spec.md`, and proceed with Horizon benchmark work under `{{THEME_ROOT}}`.

#### Run manifest schema (required)

Maintain:

```json
{
  "theme_root": "{{THEME_ROOT}}",
  "reference_root": "{{REFERENCE_ROOT}}",
  "execution_mode": "{{EXECUTION_MODE}}",
  "current_phase": "phase-1",
  "status": "in_progress",
  "last_updated_utc": "",
  "viewports": ["1440x900", "768x1024", "390x844"],
  "best_loop": "",
  "top_mismatches": [],
  "blockers": []
}
```

#### Stop criteria for `full_pipeline`

Do not call completion unless all are true:

1. Benchmark parity loops run for all required viewports.
2. `visual-parity-log.md` has at least 5 loops total.
3. Top mismatches are minor and explicitly listed.
4. Token layer and shared primitives are implemented and reused.
5. `STATUS.md` includes done/next/tradeoffs.

If blocked, stop and report blocker + minimal unblock steps.

#### First actions

1. Read `docs/PROJECT_CONTEXT.md` and `docs/skills/theme-cloning.md`.
2. Create `.rebuild/` and initialize `run-manifest.json`.
3. Produce Phase 1 outputs.
4. Continue per `execution_mode`.

### END PROMPT

---

## Suggested acceptance checklist

- Visual parity demonstrated on benchmark page at all 3 viewports.
- No edits outside active variant folder.
- Reusable token/primitives system present.
- `.rebuild` logs are complete and internally consistent.
- No mid-run commits were made.

---

## Changelog

- 2026-03-28: Added execution_mode, scope assertion, no-commit policy, run-manifest, screenshot SOP, and explicit stop criteria.
