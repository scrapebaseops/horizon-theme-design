# CLAUDE.md — Project Rules

## Workflow Execution Rules

1. **Never skip, reduce, or shortcut steps in workflow documents.** If a workflow says "for every page", "for each item", or "for all components" — do ALL of them. No exceptions.

2. **Never make unauthorized judgment calls to omit required work.** If a workflow step feels redundant, unnecessary, or time-consuming, say so and ask the user — never silently skip, abbreviate, or partially complete a required step.

3. **Completion gates are mandatory and self-enforcing.** Before moving to the next phase/step in any workflow, verify that every deliverable listed for the current phase actually exists. Count items against the spec and confirm the count matches. If it doesn't, go back and finish the work. Do not ask the user — just do it.

4. **"Good enough" is not a valid reason to skip.** Even if one example proves a pattern works, if the workflow requires multiple examples, build all of them. The workflow author included those steps for a reason.

5. **Transparency over speed.** If completing a step fully will take significant time, inform the user and continue working — don't silently cut scope to appear faster. The user would rather it takes longer than discover missing work later.

6. **When in doubt, do more, not less.** If the scope of a step is ambiguous, do the broader interpretation. If genuinely unclear, ask — but default to more, not less.

## Working Checklist Protocol

Every workflow phase MUST follow this protocol. This is self-enforcing — do not wait for user approval at gates. Run the gate, and if it fails, go back and fix it yourself.

### Before Starting a Phase:
1. **Read the full phase document** and all referenced skill documents.
2. **Generate a detailed working checklist** from the phase requirements. This checklist must:
   - List EVERY individual deliverable, component, page, section, or item mentioned in the phase spec
   - Derive items from input documents (e.g., if a reference has 12 pages, list all 12 by name)
   - Include specific acceptance criteria for each item (e.g., "pixel-perfect at 1440px, 768px, 390px", "all 8 blocks populated per content plan spec")
   - Be saved to `THEME_ROOT/.workflow/checklists/phase-N-checklist.md`

### During a Phase:
3. **Work through the checklist item by item.** Mark each item with its status:
   - `[ ]` — Not started
   - `[~]` — In progress
   - `[x]` — Completed AND verified (with evidence: screenshot taken, section count confirmed, etc.)
   - `[!]` — Blocked (with documented reason)
4. **Verify each item meets its acceptance criteria before marking it `[x]`.** Verification means:
   - For visual work: take a screenshot, compare against reference, log the comparison
   - For page templates: count sections against the content plan spec, verify blocks are populated
   - For components: confirm all states render (default, hover, focus, active, disabled)
   - "I wrote the code" is NOT verification. "I screenshotted it and it matches" IS verification.
5. **Update the checklist file after completing each item** so progress is persisted and recoverable.

### Completion Gate (Self-Enforcing):
6. **Before moving to the next phase, run the gate:**
   - Read the checklist file
   - Count `[x]` items against total required items
   - If ANY items are `[ ]` or `[~]`, go back and finish them — do not proceed
   - If items are `[!]`, document why they're blocked and continue only if they are genuinely not completable (e.g., requires store data that doesn't exist)
   - Log the gate result in the checklist file: "GATE: X/Y items complete. [PASS/FAIL]"
7. **If the gate fails, loop back** and complete the remaining items. Do not ask the user for permission to skip — just do the work.

## Visual Comparison Protocol

When the workflow requires "pixel-perfect" or "visual parity":

1. **Use actual reference images/screenshots** — not memory of what they look like.
2. **Follow the inside-out zoom methodology literally:**
   - Level 1: Individual CSS properties (font-size, color, padding on single elements)
   - Level 2: Complete elements (full button, full input, full heading)
   - Level 3: Components (card with all children, form group)
   - Level 4: Full sections at all 3 viewports
   - Level 5: Full page
3. **Fix ONE thing at a time**, re-screenshot, verify the fix, check for regressions.
4. **Log every comparison round** with before/after screenshots.
5. **Use reference theme images** where the reference includes images — don't leave empty placeholders and call it "pixel-perfect."
6. **Never declare visual parity without side-by-side screenshot comparison** at the current zoom level.

## Page Template Protocol

When building page templates from content plan specs:

1. **Read the full page spec** before writing any JSON.
2. **Count the sections in the spec** and write that number down. The template must have that many sections.
3. **Create every section listed in the spec** — not a subset.
4. **Populate every block** within each section with the content from the spec.
5. **Configure all settings** mentioned in the spec (color schemes, padding, alignment, etc.).
6. **After writing the template, verify:** count sections in the JSON, compare against the spec count. If they don't match, fix it.
7. **If a section type doesn't exist**, build it — don't skip the section.

## General Rules

- Never push to Shopify (`shopify theme push`) or run `git push` without explicit user instruction.
- Never amend or rewrite git history without explicit user instruction.
- Use `?view=<suffix>` to preview alternate page templates instead of requiring admin page creation.
- Follow all skill documents in `docs/workflows/skills/` literally — they are not suggestions.
- When running `shopify theme dev`, always use `SHOPIFY_CLI_NO_ANALYTICS=1 shopify theme dev -e <env> --store-password "<password>"` from the repo root.
