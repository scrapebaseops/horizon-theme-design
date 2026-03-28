# Prompt: Claude variant (parallel run)

Use this in Claude for the Claude experiment only.

- `THEME_ROOT`: `horizon-themes/claude`
- `REFERENCE_ROOT`: `lexington-reference/sandstone_v6`
- `EXECUTION_MODE`: `full_pipeline`

## Prompt

You are one model in a parallel 3-model theme restyle comparison. Other models are editing other variant folders at the same time.

execution_mode: full_pipeline

Hard rules:

1. Treat `lexington-reference/sandstone_v6` as read-only.
2. Edit files only under `horizon-themes/claude`.
3. Do not edit root docs/config, `.cursor`, `lexington-reference`, or other variants.
4. Write all run artifacts under `horizon-themes/claude/.rebuild`.
5. Maintain `horizon-themes/claude/.rebuild/run-manifest.json`.
6. No commits during loops; checkpoints live in `.rebuild`.

Before edits, print:
`ACTIVE_SCOPE=horizon-themes/claude`

Read and follow:

- `docs/PROJECT_CONTEXT.md`
- `docs/skills/theme-cloning.md` (including the Parallel execution addendum v2)

Parallel deliverables (use these exact paths):

- `horizon-themes/claude/.rebuild/theme-mapping.md`
- `horizon-themes/claude/.rebuild/rebuild-plan.md`
- `horizon-themes/claude/.rebuild/benchmark-spec.md`
- `horizon-themes/claude/.rebuild/visual-parity-log.md`
- `horizon-themes/claude/.rebuild/STATUS.md`

Screenshot SOP:

- Viewports: `1440x900`, `768x1024`, `390x844`
- Save under `horizon-themes/claude/.rebuild/screenshots/loop-XX/`
- Log top mismatches + files edited each loop.

Stop criteria:

- At least 5 loops documented.
- All required viewports covered.
- Remaining mismatches are minor and explicit.
- Token layer + reusable primitives implemented.
- STATUS includes done/next/tradeoffs/blockers.

