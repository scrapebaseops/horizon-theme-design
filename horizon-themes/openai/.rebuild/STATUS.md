# STATUS

## done
- Scoped all edits to `horizon-themes/openai` and kept `.rebuild/` out of Shopify uploads via `.shopifyignore`.
- Read the project context and theme-cloning runbook, then maintained the required `.rebuild` deliverables inside the variant folder.
- Built the ten-section Sandstone benchmark/homepage in `templates/page.sandstone-benchmark.json` and `templates/index.json`.
- Added the OpenAI Sandstone token layer and shared primitives in `assets/openai-sandstone.css`, the theme-variable snippets, and the `sandstone-*` snippets.
- Matched benchmark-critical Lexington media by copying the same hero video and image assets into the OpenAI asset set.
- Logged seven screenshot loops across `1440x900`, `768x1024`, and `390x844`.
- Archived durable screenshots under `.rebuild/screenshots/loop-01` through `loop-07`, with complete reference/Horizon pairs present for the required viewport set.
- Updated `theme-mapping.md`, `rebuild-plan.md`, `benchmark-spec.md`, `visual-parity-log.md`, and `run-manifest.json` so the artifacts match the current implementation instead of the earlier benchmark-only state.

## next
- Optional only: tighten hero video frame/crop parity if you want a stricter still-frame match than the current same-video autoplay captures.
- Optional only: match the floating search trigger icon/control even closer.
- Extend the proven Sandstone system into non-home templates once homepage parity is signed off.

## tradeoffs
- The benchmark sections are Shopify-native Liquid/JSON implementations rather than Astro/Tailwind ports.
- Some interaction-heavy surfaces are matched visually first; deeper motion parity remains lighter where a simpler Horizon-native structure is better to maintain.
- The benchmark hero hides the stock header with a page-scoped style so the broader theme shell can be restyled independently later.
- Hosted preview was used for durable Horizon captures because direct browser-tool capture against the local preview was inconsistent.
- The reference baseline screenshots were reused across later loops because the Lexington page did not change during the run.

## blockers
- No active blockers.
- Minor explicit gaps remain: hero still frames can land on slightly different moments between the reference and hosted preview, the search trigger icon is close but not identical, and a few lower-page spacing/crop relationships could still be micro-polished if needed.
