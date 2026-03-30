# OpenAI Rebuild Plan

## Execution summary
1. Phase 1 audit and mapping
- Documented the Sandstone design system and Horizon implementation targets in `.rebuild/theme-mapping.md` before broad section work.

2. Phase 2 benchmark setup
- Mirrored the Sandstone homepage structure in both `templates/page.sandstone-benchmark.json` and `templates/index.json` using ten custom `sandstone-*` sections.

3. Phase 3 screenshot parity loop
- Logged seven loops across `1440x900`, `768x1024`, and `390x844`, with the current durable archive stored under `.rebuild/screenshots/loop-07/`.

4. Phase 4 token layer
- Consolidated Sandstone type, color, radius, spacing, surface, and shell behavior into:
  - `snippets/theme-styles-variables.liquid`
  - `snippets/color-schemes.liquid`
  - `snippets/stylesheets.liquid`
  - `assets/openai-sandstone.css`
  - `config/settings_data.json`

5. Phase 5 shared primitives
- Reused the following OpenAI-specific primitives across the rebuilt sections:
  - `snippets/sandstone-panel.liquid`
  - `snippets/sandstone-kicker.liquid`
  - `snippets/sandstone-rolling-link.liquid`
  - `snippets/sandstone-logo.liquid`
  - `snippets/sandstone-big-logo.liquid`
  - `snippets/sandstone-search-fab.liquid`

6. Phase 6 section rebuild
- Rebuilt the Sandstone homepage shell inside Horizon with:
  - hero
  - intro
  - projects
  - stats
  - services
  - philosophy
  - process
  - testimonials
  - blog
  - custom home footer

7. Phase 7 template QA and handoff artifacts
- Archived fresh reference/Horizon screenshots, updated the parity log, and finalized the `.rebuild` manifest/status/spec files so the run is reviewable without relying on chat history.

## Optional follow-up only
- Tighten hero autoplay frame/crop timing if a stricter still-frame comparison is required.
- Match the floating search trigger icon geometry more exactly.
- Extend the proven Sandstone token/primitives layer into non-home templates after homepage sign-off.
