# Horizon theme architecture (Sandstone / Claude variant)

This skill describes how the **Sandstone** design system is organized in `horizon-themes/claude/`, how it layers on top of Shopify Horizon, and how to extend it without breaking native behavior.

## CSS load order

Stylesheets are registered in `snippets/stylesheets.liquid`:

1. **`base.css`** — Horizon core (preload).
2. **`sandstone-tokens.css`** — Layer 1: CSS custom properties only (`:root`, breakpoints). No component classes.
3. **`sandstone-base.css`** — Layer 2: global layout, typography helpers (e.g. `.sandstone-heading`, `.sandstone-body`, `.sandstone-display-*`), spacing utilities, `.sandstone-prose` / `.rte` alignment for rich text.
4. **`sandstone-primitives.css`** — Layer 3: reusable UI (buttons, cards, fullbleed, rolling links, section-specific Sandstone patterns) plus **scoped overrides** for Horizon sections under `#MainContent` (buttons, inputs, product/blog/collection cards, facets, cart, password layout).

New work should use tokens first, then base utilities, then primitives. Avoid one-off rules in random files when a primitive or token already exists.

## File locations

| Kind | Location |
|------|----------|
| Design tokens | `assets/sandstone-tokens.css` |
| Base + prose + layout helpers | `assets/sandstone-base.css` |
| Components + Horizon overrides | `assets/sandstone-primitives.css` |
| Sandstone sections | `sections/sandstone-*.liquid` |
| Shared partials | `snippets/sandstone-*.liquid` |
| Template JSON | `templates/*.json` |
| Header / footer groups | `sections/header-group.json`, `sections/footer-group.json` |

## Naming

- Section files, schema `name`, and CSS hooks: **`sandstone-`** prefix (e.g. `sandstone-page-hero`, class `sandstone-page-hero-section`).
- BEM-like modifiers where used (e.g. `.sandstone-btn--default`).
- Body template class: `layout/theme.liquid` adds `template-{{ template.name | replace: '.', '-' }}` for template-scoped CSS when needed.

## Sections, blocks, snippets, templates

- **Templates** (`templates/*.json`) declare ordered **sections**. Each entry maps a section ID to a `type` (matches `sections/<type>.liquid` without `.liquid`).
- **Blocks** belong to a section; repeating content (articles, testimonials, process steps) should be blocks with `image_picker`, `url`, and text fields — not hardcoded asset filenames or routes in Liquid.
- **Snippets** hold reusable markup; sections should call `{% render 'sandstone-…' %}` when the same pattern appears in multiple sections.

## Sandstone page hero

`sandstone-page-hero` provides a consistent title area for non-home templates. If **heading** is blank, it derives a title from the template (collection, blog, article, search, cart, list-collections, page, etc.). On **collection** pages, if **subheading** is blank, **collection description** is shown (HTML allowed).

Some templates also render a Horizon section with its own title (blog list, article header, search header, list-collections header). `sandstone-primitives.css` hides the duplicate title when a Sandstone page hero is the **previous** section (sibling selector). Do not remove those rules without checking both headings.

## Styling Horizon default sections

Do not fork `main-collection`, `main-cart`, `product-information`, `search-results`, etc., unless there is a strong reason. Prefer:

1. **CSS in `sandstone-primitives.css`** under `#MainContent` to align radii, type, colors, and form controls with Sandstone tokens.
2. **Template composition**: add `sandstone-page-hero` (or `sandstone-404`, `sandstone-contact-card`, `sandstone-content-prose`) around Horizon sections.

This keeps filters, cart logic, variants, and search behavior intact.

## Collection grid vs “sandstone-collection-grid”

Product grids on collection and search pages use Horizon’s **`main-collection`** / **`search-results`** with the shared product card stack. Sandstone visual treatment is applied via **primitives + tokens**, not a separate duplicate grid section. If you need a custom marketing strip above the grid, add a small Sandstone section in the template JSON above `main-collection`.

## Adding a new Sandstone section

1. Add `sections/sandstone-<feature>.liquid` with a full **`{% schema %}`**: all merchant-visible copy and links as settings; images as `image_picker`; repeating rows as **blocks**.
2. Use classes from `sandstone-base` / `sandstone-primitives` before writing new CSS; add section-specific rules under a clear comment banner in `sandstone-primitives.css` if needed.
3. Register the section on the relevant **`templates/*.json`** (and presets if it should appear in the theme editor).
4. Run **`shopify theme check`** from the repo root with `-e claude` (see `shopify.theme.toml`).

## Password and minimal layouts

`layout/password.liquid` uses `password-main-content`. Sandstone styles for password UI live in `sandstone-primitives.css` (buttons, inputs, section colors).

## Related repo rules

- Theme roots and CLI: `.cursor/rules/shopify-horizon-monorepo.mdc`
- Lexington parity process (when using reference): `.cursor/rules/lexington-horizon-design-parity.mdc`
