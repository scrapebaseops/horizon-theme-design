# Horizon theme architecture (OpenAI / Sandstone variant)

This skill documents how **`horizon-themes/openai/`** layers the Sandstone design system on Shopify Horizon: where Liquid, JSON, and CSS live, and how to extend without duplicating styles.

## CSS load order (`snippets/stylesheets.liquid`)

1. **`base.css`** — Horizon core (preload).
2. **`openai-sandstone-tokens.css`** — Design tokens only: `body.openai-sandstone-theme { --sandstone-* }` (colors, radii, shells, shadows). No component classes.
3. **`openai-sandstone-horizon.css`** — Integration with Horizon: global `body.openai-sandstone-theme` rules (buttons, inputs, cards, `#header-group`, search modal, footer utilities, homepage hero header hide via `:has(.sandstone-benchmark-hero)`).
4. **`openai-sandstone-components.css`** — Sandstone UI: shells (`.sandstone-shell`), section layouts, typography utilities (`.sandstone-display-lg`, `.sandstone-kicker`, `.sandstone-rolling-link`), panels, sliders, process/testimonial/blog patterns, responsive media queries, and **page-hero / duplicate-heading** helpers.

**Rule:** Prefer tokens → Horizon overrides → component classes. Add section-specific tweaks under a short comment banner in `openai-sandstone-components.css` only when a setting or block needs a visual exception.

## File locations

| Kind | Location |
|------|----------|
| Tokens | `assets/openai-sandstone-tokens.css` |
| Horizon overrides | `assets/openai-sandstone-horizon.css` |
| Sandstone components + section CSS | `assets/openai-sandstone-components.css` |
| Homepage interactions | `assets/sandstone-home.js` (projects / testimonials / services; `defer` in `layout/theme.liquid`) |
| Sandstone sections | `sections/sandstone-*.liquid` |
| Inner page hero | `sections/sandstone-page-hero.liquid` |
| Shared partials | `snippets/sandstone-*.liquid` |
| Template JSON | `templates/*.json` |
| Header / footer groups | `sections/header-group.json`, `sections/footer-group.json` |

## Naming

- Section files and schema `name`: **`sandstone-`** prefix (e.g. `sandstone-projects`, `sandstone-page-hero`).
- Body class: `layout/theme.liquid` sets **`openai-sandstone-theme`** on `<body>` for scoping tokens and Horizon overrides.

## Sections, blocks, templates

- **`templates/*.json`** define ordered **sections**; each `type` maps to `sections/<type>.liquid`.
- **Blocks** repeat structured content (projects, stats, process steps, testimonials, services, blog cards, team members, hero ticker lines). Prefer **settings** + **blocks** over hardcoded copy in Liquid.
- **`sandstone-page-hero`** provides kicker, heading (auto-filled from template when blank), and optional subheading (collection description when blank on collection templates). Used on catalog and content templates for a consistent editorial strip.

## Inner pages vs homepage

- **Homepage** (`templates/index.json`): full Sandstone stack (hero, intro, projects, … footer); hero may hide the theme header via CSS `:has(.sandstone-benchmark-hero)`.
- **Other templates**: compose **`sandstone-page-hero`** + native Horizon sections (`main-collection`, `main-blog`, `main-cart`, etc.). Some duplicate titles are suppressed in `openai-sandstone-components.css` when the page hero precedes the Horizon section (blog index, article header, cart title).

## Adding a Sandstone section

1. Add `sections/sandstone-<feature>.liquid` with a full **`{% schema %}`**: merchant copy as settings/richtext; images via `image_picker`; repeating rows as **blocks** with `presets` where helpful.
2. Reuse classes from tokens + components before adding new CSS.
3. Register the section on the relevant **`templates/*.json`**.
4. If interactivity is needed, extend **`sandstone-home.js`** (or a dedicated asset) and load it from `theme.liquid`; avoid large inline scripts in sections.

## Related repo rules

- Theme roots and CLI: `.cursor/rules/shopify-horizon-monorepo.mdc`
- Lexington parity (when using reference): `.cursor/rules/lexington-horizon-design-parity.mdc`
