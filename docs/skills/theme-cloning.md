# Full Skill: shopify-theme-rebuild

Place this file at:

`.claude/skills/shopify-theme-rebuild/SKILL.md`

```md
---
name: shopify-theme-rebuild
description: Rebuild the visual design language of a reference theme inside a Horizon Shopify theme using Horizon-native architecture, a strict design system, matched benchmark pages, and iterative screenshot parity loops.
disable-model-invocation: true
---

You are rebuilding the visual design language of a purchased reference theme inside a separate Horizon Shopify theme.

$ARGUMENTS

Core objective:
Recreate the visual aesthetic, layout language, component styling, spacing rhythm, and overall design system of the reference theme inside the Horizon Shopify theme, while preserving Horizon-native Shopify architecture and merchant editability.

Primary success criterion:
The Horizon implementation should not merely feel “inspired by” the reference theme. It should visually match it as closely as reasonably possible through controlled benchmark pages and iterative screenshot comparison loops.

Non-negotiable constraints:
- The reference theme is for analysis and inspiration only.
- Do not transplant the reference theme’s file structure, framework structure, or component architecture into Horizon.
- Do not directly copy files into Horizon unless the user explicitly asks for a specific asset to be transferred and it is legally appropriate to do so.
- Re-author the design in a Horizon-native way using Shopify theme architecture: assets, config, layout, sections, blocks, snippets, templates, and settings.
- Preserve Horizon’s editor-friendly structure and merchant customizability.
- Prefer reusable snippets, reusable blocks, reusable section patterns, and theme settings over one-off hardcoded solutions.
- Avoid visual hacks that make the result brittle or hard to maintain.
- Treat the reference theme directory as read-only unless the user explicitly says otherwise.
- Do not mistake superficial similarity in colors and typography for true visual parity.
- Prioritize measurable visual fidelity over speed.

Assumed folder roles:
- If the user has named folders explicitly, use those names.
- Otherwise, try to identify:
  - the Horizon Shopify theme directory
  - the reference theme directory
- If likely matches exist, proceed using the most obvious candidates and state your assumptions.
- Prefer not to ask unnecessary questions if the directory roles are reasonably clear.

Your workflow must follow these phases in order.

## Phase 1 — Audit and mapping

First inspect both codebases and create a written mapping before making major changes.

Deliverables:
- `docs/theme-mapping.md`
- `docs/rebuild-plan.md`

In `docs/theme-mapping.md`, identify and document:

1. Design tokens in the reference theme
- typography scale
- font pairings
- spacing scale
- border radius system
- shadow system
- color roles
- container widths
- grid rules
- vertical rhythm
- icon style
- image treatment
- button patterns
- card patterns
- input/form patterns
- navigation patterns

2. Repeated UI patterns in the reference theme
- hero structures
- feature rows
- content/image split sections
- collection/product tiles
- announcement bars
- testimonial sections
- FAQ sections
- footer patterns
- badges, chips, pills, labels
- CTAs and interactive states

3. Shopify/Horizon implementation targets
For each major pattern, map it to the intended implementation target:
- theme settings
- color schemes
- CSS variables
- snippets
- theme blocks
- sections
- templates
- assets

In `docs/rebuild-plan.md`, write:
- the target section/component roadmap
- which shared primitives should be built first
- which existing Horizon files should be adapted vs replaced
- which elements must be proven through benchmark-page matching before broad rollout
- any likely conflicts or tradeoffs
- a phased execution order

Rules for Phase 1:
- Do not jump straight into homepage edits.
- Do not do uncontrolled rewrites.
- Understand both codebases first.
- Call out where the reference theme uses framework-specific patterns that should not be ported literally.

## Phase 2 — Create matched benchmark pages

Before rebuilding the full storefront, create one controlled benchmark page in each codebase.

Purpose:
Turn a vague “match the style” task into a measurable visual parity task.

The benchmark pages must:
- contain the same representative content in the same order
- use the same headings, body copy length, button labels, image aspect ratios, and card counts
- isolate the core design language of the reference theme
- avoid dynamic or irrelevant store-specific complexity at first

The benchmark page should include, where relevant:
- header / top navigation
- hero
- text content block
- primary and secondary buttons
- feature cards
- image + text split section
- product/collection-style cards
- testimonial card
- form field examples
- FAQ / accordion pattern
- footer

Benchmark-page rules:
- The reference benchmark page is read-only.
- The Horizon benchmark page is the target for rebuilding.
- Do not start broad site rebuild work until the benchmark pages exist.
- Keep the benchmark content intentionally stable and controlled.

Deliverables:
- a reference benchmark page in the reference theme
- a matching target benchmark page in Horizon
- `docs/benchmark-spec.md`

In `docs/benchmark-spec.md`, record:
- page path / template name for each benchmark page
- exact content blocks used
- viewport sizes to test
- which design features are being validated on the page
- known exclusions from the benchmark

## Phase 3 — Visual parity loop using screenshots

Once the benchmark pages exist, use iterative screenshot comparison loops to drive visual matching.

Goal:
Match the Horizon benchmark page to the reference benchmark page as closely as reasonably possible before broad rollout.

For each loop:
1. Render both benchmark pages at the same viewport size.
2. Capture screenshots of both.
3. Compare them carefully.
4. Identify the highest-impact visual mismatches.
5. Edit only the Horizon implementation.
6. Re-render and repeat.

Always compare at fixed viewport sizes. Start with:
- desktop
- tablet if relevant
- mobile

When comparing screenshots, prioritize mismatches in this order:
1. overall layout width and container behavior
2. section spacing and vertical rhythm
3. typography hierarchy
4. line-height and line length
5. button sizing and styling
6. card sizing, padding, and alignment
7. image ratio, crop, and framing
8. border radius and shadow weight
9. navigation/header density
10. footer density and spacing
11. micro-alignment and detail polish

Rules for screenshot loops:
- Never rely on memory alone.
- Always use fresh screenshots for each loop.
- Use the same content and viewport each time.
- Do not change the reference page to make matching easier.
- Do not widen the scope mid-loop.
- Focus on the biggest visible mismatch first.
- Document each loop briefly.

Create:
- `docs/visual-parity-log.md`

For each loop, record:
- viewport used
- most important mismatches found
- files edited
- what changed
- whether visual parity improved
- remaining top mismatches

Do not proceed to the broad theme rebuild until the benchmark page is judged sufficiently close.

## Phase 4 — Create the design-token layer in Horizon

After the benchmark page has reached strong visual parity, create or finalize a strict design-token system inside Horizon.

Your goal:
Create one coherent design language so future sections can be built from approved primitives rather than custom CSS from scratch each time.

Implement:
- typography tokens
- spacing tokens
- radius tokens
- shadow tokens
- container/layout tokens
- color role tokens
- state tokens for hover/focus/active where appropriate

Guidelines:
- Base these tokens on the benchmark parity work and the reference audit.
- Minimize one-off numeric values.
- Normalize repeated values into reusable tokens.
- Prefer consistency over pixel-perfect randomness.
- Where values should be merchant-editable, route them through Shopify settings.
- Where values should remain system-level, keep them in the theme code as stable tokens.
- Ensure the token system reflects the benchmark-matched result, not rough guesses from the initial audit.

When appropriate, expose settings cleanly via schema and connect them to the design system.

## Phase 5 — Build shared primitives

Create or refine reusable Horizon-native primitives that future sections can compose.

Target primitive categories:
- buttons
- links
- cards
- badges
- labels
- section wrappers
- content containers
- media wrappers
- input fields
- form groups
- stacks / vertical spacing primitives
- clusters / horizontal grouping primitives
- headings / body text patterns
- surface/background variants

Guidelines:
- Prefer reusable snippets and/or reusable block patterns.
- Avoid duplicating markup and styling logic across many sections.
- Keep primitives visually aligned with the benchmark-matched design.
- Make them flexible enough for future sections without overengineering.
- Refactor proven styles from the benchmark work into reusable primitives.

## Phase 6 — Rebuild sections one by one

Once the token layer and primitives exist, rebuild the reference theme’s sections inside Horizon.

Process:
- Work section by section.
- Reuse the shared token layer and primitives.
- Match the visual design as closely as possible.
- Preserve merchant editability in Shopify.
- Prefer maintainable section architecture over short-term hacks.
- Keep the markup semantic and the section schema practical.

When rebuilding a section:
1. Identify the closest existing Horizon section if one exists.
2. Decide whether to adapt it or create a new one.
3. Rebuild it using the shared design system.
4. Add appropriate section/block settings.
5. Check consistency against the benchmark-matched design language.
6. Where useful, use screenshot comparisons again.

## Phase 7 — Template assembly and visual QA

After the main sections are rebuilt:
- assemble the relevant templates
- compare the rendered Horizon result against the reference theme
- refine spacing, typography, color usage, alignment, visual density, states, and responsive behavior
- remove inconsistencies and one-off styling leftovers

Your QA focus:
- typography hierarchy
- spacing rhythm
- button consistency
- card consistency
- image ratio and cropping behavior
- section padding consistency
- responsive layout behavior
- hover/focus states
- visual weight and density
- overall fidelity to the reference aesthetic

Where useful, repeat the screenshot loop process at the template level.

## Working rules

Always follow these working rules:

- Before making a significant batch of edits, explain what files you plan to modify and why.
- After each phase, summarize:
  - what was completed
  - what files changed
  - what remains
  - any tradeoffs made
- If you encounter a conflict between strict visual matching and good Horizon-native structure, choose the Horizon-native implementation and document the tradeoff in the docs.
- Prefer a clean rebuild over a messy imitation.
- Do not scatter arbitrary CSS values across many files.
- Consolidate repeated styling logic.
- Preserve or improve maintainability wherever possible.
- Keep the result future-friendly so new sections can inherit the same design system.
- Do not claim success based only on matching fonts and colors.
- True completion requires strong screenshot-validated parity on the benchmark page and solid consistency across rebuilt sections.

## Default execution behavior

Unless the user explicitly asks for full implementation immediately, do this by default:

1. Complete Phase 1 only.
2. Produce:
   - `docs/theme-mapping.md`
   - `docs/rebuild-plan.md`
3. Present the plan and proposed file changes.
4. Stop and wait for the user to approve implementation.

If the user explicitly asks you to continue implementation immediately, proceed in this order:
- Phase 2
- Phase 3
- Phase 4
- Phase 5
- Phase 6
- Phase 7

## Output style

Be concrete, technical, and implementation-focused.
Prefer decisions over vague possibilities.
When writing plans, tie every recommendation to maintainability, Horizon compatibility, benchmark parity, or visual fidelity.
Do not waste time explaining obvious basics.

## Reminder

The goal is not to clone the reference theme’s codebase.
The goal is to recreate its visual system and UX feel inside Horizon in a way that is clean, reusable, visually verified, and native to Shopify’s theme architecture.