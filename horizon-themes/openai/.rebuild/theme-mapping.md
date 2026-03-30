# Sandstone Theme Mapping

## Reference system
- Typography: oversized editorial display copy, italic emphasis inside long-form headlines, tight tracking in the masthead/hero wordmark, and calm sans-serif body copy with muted secondary metadata.
- Color roles: warm off-white page background, near-charcoal foreground, translucent white hero wash, very low-contrast borders, and quiet gray support text.
- Layout: wide outer frame, floating pill masthead, a near-full-bleed hero field inside a soft rectangle, alternating editorial rails, image/copy split sections, and quiet card boundaries.
- Components: pill buttons, icon-only floating search trigger, editorial side panels, slider rails, quote cards, journal cards, and a video-backed footer stage.
- Motion: restrained ticker/marquee behavior, simple slider stepping, light hover shifts, and video used as atmospheric motion rather than loud animation.

## Repeated reference patterns chosen for the OpenAI rebuild
- `hero`: washed video field, oversized wordmark, floating masthead, and contact ticker.
- `intro`: multi-line editorial statement with italic accent treatment.
- `projects`: latest works rail with media-first cards and side metadata.
- `stats`: image plus long-form copy plus stacked stat rows.
- `services`: large supporting media with service chooser buttons and descriptive copy.
- `philosophy`: paragraph-led editorial copy block with wide text measure.
- `process`: numbered methodology list with restrained dividers.
- `testimonials`: quote slider with portrait attribution cards.
- `journal`: three-card article grid.
- `footer`: video-backed studio footer panel with team roles and brand copy.

## Horizon implementation mapping
- Token layer:
  - `snippets/theme-styles-variables.liquid`
  - `snippets/color-schemes.liquid`
  - `snippets/stylesheets.liquid`
  - `assets/openai-sandstone.css`
  - `assets/base.css`
  - `config/settings_data.json`
- Reusable primitives:
  - `snippets/sandstone-panel.liquid`
  - `snippets/sandstone-kicker.liquid`
  - `snippets/sandstone-rolling-link.liquid`
  - `snippets/sandstone-logo.liquid`
  - `snippets/sandstone-big-logo.liquid`
  - `snippets/sandstone-search-fab.liquid`
- Section implementations:
  - `sections/sandstone-hero.liquid`
  - `sections/sandstone-intro.liquid`
  - `sections/sandstone-projects.liquid`
  - `sections/sandstone-stats.liquid`
  - `sections/sandstone-services-preview.liquid`
  - `sections/sandstone-philosophy.liquid`
  - `sections/sandstone-process.liquid`
  - `sections/sandstone-testimonials.liquid`
  - `sections/sandstone-blog-preview.liquid`
  - `sections/sandstone-home-footer.liquid`
- Template assembly:
  - `templates/page.sandstone-benchmark.json`
  - `templates/index.json`
- Capture and parity tracking:
  - `.rebuild/capture-preview.mjs`
  - `.rebuild/screenshots/`
  - `.rebuild/visual-parity-log.md`

## Intentional Horizon-native deviations
- The rebuild is assembled with Shopify JSON templates, Liquid sections, and snippets rather than porting Astro/Tailwind structure.
- Reference media was copied into the OpenAI asset pipeline so the Horizon side uses the same hero/video/image inputs while keeping Shopify-safe asset names.
- Interaction-heavy surfaces were matched visually first and simplified where necessary to keep the implementation reusable and merchant-friendly.
- Hosted Shopify preview was used for durable Horizon capture because direct browser-tool capture against the local preview was inconsistent.
