# Working doc: parallel LLM runs (Lexington Sandstone → Horizon)

Use this file to refine the reusable prompt and track improvements to the skill / workflow.

## Paths in *this* repo (fill placeholders from here)

| Role | Path |
|------|------|
| Reference theme (read-only) | `lexington-reference/sandstone_v6/` (Sandstone v6 — adjust if your folder name differs) |
| Claude’s implementation | `horizon-themes/claude/` |
| OpenAI’s implementation | `horizon-themes/openai/` |
| Gemini’s implementation | `horizon-themes/gemini/` |

Each `horizon-themes/<variant>/` folder is a full Shopify theme and maps to its own unpublished theme on the dev store (see `docs/horizon-themes.md`).

---

## Reusable prompt (copy everything below the line into each LLM)

Replace **`{{THEME_ROOT}}`** with the absolute or workspace-relative path to **that model’s** directory only (e.g. `horizon-themes/claude`).

Replace **`{{REFERENCE_ROOT}}`** with the Lexington Sandstone path (e.g. `lexington-reference/sandstone_v6`).

---

### BEGIN PROMPT

You are working in a **multi-LLM comparison**: other models are editing **other** Horizon copies in parallel. **Scope is strict.**

#### Hard scope rules (non-negotiable)

1. You may **read** the reference theme at: **`{{REFERENCE_ROOT}}`** (treat as **read-only**; do not modify files there unless the user explicitly tells you to).
2. You may **read** repo-level docs for context if needed: `docs/PROJECT_CONTEXT.md`, `docs/horizon-themes.md`.
3. You may **only create, edit, or delete files under** **`{{THEME_ROOT}}`**.  
   - Do **not** change `README.md`, `shopify.theme.toml`, `docs/` at repo root, `.cursor/`, `lexington-reference/`, or **any other** `horizon-themes/*` variant folder.
4. Put **all** planning, mapping, parity logs, and notes for *your* run under **`{{THEME_ROOT}}/.rebuild/`** (create it).  
   - **`{{THEME_ROOT}}/.shopifyignore`** should already list **`.rebuild/`** so internal docs are not uploaded; add patterns there for any other local-only paths you create.

#### What we are doing

We are recreating the **visual design language** of the **Lexington Sandstone** reference inside **Shopify Horizon**, without porting Sandstone’s framework or file architecture. Horizon must stay **Shopify-native**, editor-friendly, and maintainable.

Success means **tight visual parity** (spacing, type scale, density, components—not just “similar colors and fonts”), proven with **benchmark pages** and **screenshot comparison loops**, then a **token layer** and **reusable primitives** before broad section work.

#### Skill / methodology to follow

Follow the phased workflow in:

**`docs/skills/theme-cloning.md`**

That document describes the **shopify-theme-rebuild** skill (phases 1–7: audit → benchmark pages → screenshot parity loop → tokens → primitives → sections → QA).

**Important adaptations for this run:**

- **Phase 1 deliverables** are **not** `docs/theme-mapping.md` at repo root. Write instead:  
  - **`{{THEME_ROOT}}/.rebuild/theme-mapping.md`**  
  - **`{{THEME_ROOT}}/.rebuild/rebuild-plan.md`**
- **Phase 2:** `benchmark-spec.md` → **`{{THEME_ROOT}}/.rebuild/benchmark-spec.md`**. Implement the Horizon benchmark **only** under `{{THEME_ROOT}}`. For the **reference** benchmark, you may **describe** the exact template JSON path and section setup in the spec; if the user has not allowed edits under `{{REFERENCE_ROOT}}`, state that the reference benchmark must be applied manually or in a separate session—**do not** edit reference files without permission.
- **Phase 3:** `visual-parity-log.md` → **`{{THEME_ROOT}}/.rebuild/visual-parity-log.md`**.
- **Default execution:** The skill says to stop after Phase 1 unless the user asks to continue. **For this task, the user wants a full plan first, then execution without waiting for mid-run approval** unless you are blocked (e.g. cannot capture screenshots, missing access, or reference benchmark cannot be created read-only).

#### What to do first (in order)

1. **Read** `docs/skills/theme-cloning.md` and **`docs/PROJECT_CONTEXT.md`** (short alignment with project goals).
2. **Inspect** `{{REFERENCE_ROOT}}` and `{{THEME_ROOT}}` (Horizon structure, `config/settings_schema.json`, `config/settings_data.json`, key `assets/`, `sections/`, `snippets/`).
3. **Write** a concise **execution plan** in **`{{THEME_ROOT}}/.rebuild/rebuild-plan.md`** that lists phases, key files you expect to touch, risks, and how you will validate (viewports, screenshot cadence). The plan must respect **edit scope** above.
4. **Execute** the phases in order from the skill, updating the plan if assumptions change.
5. **Summarize** in **`{{THEME_ROOT}}/.rebuild/STATUS.md`**: current phase, done / next / blockers.

#### Shopify CLI (for you or the user)

From **repository root** (parent of `horizon-themes/`), preview **this** variant only:

- Claude: `shopify theme dev -e claude` (+ `--store-password` if needed)  
- OpenAI: `shopify theme dev -e openai`  
- Gemini: `shopify theme dev -e gemini`  

Do **not** run CLI from inside `{{THEME_ROOT}}` without the correct `-e` / `--path`, or paths may double up.

#### Reference benchmark page (Sandstone)

The first reference theme to match is **Sandstone** under `{{REFERENCE_ROOT}}`. Phase 2 requires a **paired** benchmark: same content structure on reference and Horizon. If you cannot edit the reference tree, document the **exact** steps for the user to add the reference benchmark once; still build the Horizon benchmark under `{{THEME_ROOT}}` so parity work can proceed as soon as the reference page exists.

### END PROMPT

---

## Example filled prompts

**Claude**

- `{{THEME_ROOT}}` → `horizon-themes/claude` (or full path on disk)  
- `{{REFERENCE_ROOT}}` → `lexington-reference/sandstone_v6`

**OpenAI**

- `{{THEME_ROOT}}` → `horizon-themes/openai`  
- `{{REFERENCE_ROOT}}` → `lexington-reference/sandstone_v6`

**Gemini**

- `{{THEME_ROOT}}` → `horizon-themes/gemini`  
- `{{REFERENCE_ROOT}}` → `lexington-reference/sandstone_v6`

---

## Improving the skill / instructions for “one-shot until perfect”

**Reality check:** No prompt guarantees **perfect** visual parity in a single unattended run. Screenshot loops are inherently iterative; models often stop early unless you define **stop conditions** and **tooling**. You can still remove friction so each LLM needs **minimal** follow-up.

### Problems with the current skill for *this* repo

| Issue | Why it hurts | Mitigation |
|--------|----------------|------------|
| Writes to repo-root `docs/*.md` | **Parallel collisions** between claude / openai / gemini | Use **`{{THEME_ROOT}}/.rebuild/`** (and `.shopifyignore`) as in the prompt above; update the canonical skill to say “or variant-local path when parallel”. |
| Reference benchmark “read-only” | Horizon benchmark can be built, but **pairing** stalls if reference page doesn’t exist | Either allow **one-time** reference edits in a **single** non-parallel prep session, or add a **portable benchmark spec** (copy/paste JSON + section handles) the user applies once to Sandstone. |
| “Stop after Phase 1 by default” | Conflicts with “run to completion” | Skill should have an explicit flag: **execution mode: `plan-only` \| `full`**. Your prompt overrides with “full”. |
| Screenshots not specified | Many agents won’t run browser/tools consistently | Name the tool (e.g. Cursor browser, Playwright, manual) and **required viewports** (e.g. 1440×900, 768×1024, 390×844). |
| “Perfect” undefined | Model declares victory too soon | Add **acceptance checklist** (e.g. “≤N px tolerance on key measurements” or “stakeholder sign-off”) and **minimum loop count** before exiting Phase 3. |

### Concrete skill upgrades (recommended)

1. **Parallel / monorepo section** — Variant-local `.rebuild/`, `.shopifyignore` patterns, never root `docs/` when `THEME_ROOT` is set.  
2. **`execution_mode`** — `plan_only` vs `full_pipeline`; default documented.  
3. **Reference benchmark bootstrap** — Appendix: minimal Sandstone template + section list as data (or permission to create **one** file under reference in a dedicated prep task).  
4. **Screenshot SOP** — Fixed viewports, same zoom, same store password behavior, where to save images (`{{THEME_ROOT}}/.rebuild/screenshots/loop-N/`).  
5. **Exit criteria for Phase 3** — e.g. “At least **5** loops per viewport” or “Top-3 mismatches below threshold described in benchmark-spec.”  
6. **Asset policy** — When copying fonts/images is allowed vs derive from Shopify CDN only (legal + licensing).  
7. **Horizon-specific anchors** — Pointers to `theme-styles-variables`, color schemes, `settings_schema`, common Horizon section filenames so audits start faster.

### What you can do outside the skill

- **Prep session (sequential):** Add reference benchmark to Sandstone once; then all three LLMs only touch their `horizon-themes/*` folder.  
- **Pin Shopify CLI env** in user message: `-e claude` etc.  
- **Theme Access / passwords** in env vars, not in prompts committed to git.

---

## Changelog (edit as you iterate)

- _Add dated notes here as you tune the prompt or skill._
