# Rebuild Plan: Sandstone v6 → Horizon (Claude Variant)

## Summary

The Sandstone theme is a minimal, monochromatic interior-design portfolio built with Astro + Tailwind CSS 4. Its visual identity comes from:
1. Purely neutral color palette (no accent colors)
2. Large display typography with italic/lighter accent phrases
3. Generous whitespace and clean section spacing
4. Full-bleed rounded containers with video/image backgrounds
5. Pill-shaped buttons
6. Sticky scrolling sidebar layouts
7. Clean divider-based lists

The Horizon theme already uses Inter and has a mature settings/color-scheme system. The main work is: (a) adjusting the color scheme to monochromatic neutrals, (b) adding a Sandstone-specific token layer for typography scale, spacing, and radii, (c) building custom sections for Sandstone's distinctive layout patterns, and (d) creating reusable primitives (rolling link, kicker, divider list, sticky sidebar grid).

---

## Phased Execution Order

### Phase 1 — Audit & Mapping (this document + theme-mapping.md)
**Status:** Complete

### Phase 2 — Benchmark Setup
**Goal:** Create a controlled benchmark page in the Horizon theme that mirrors the Sandstone homepage structure.

**Plan:**
1. Create `templates/page.benchmark.json` with representative sections
2. Sections to include (in order):
   - Hero (video/image + large rounded container)
   - Intro text (large display text with italic accents)
   - Stats/feature grid (sticky sidebar + divider list)
   - Content cards (3-column grid)
   - Testimonial (quote card with avatar)
   - Footer area
3. Use static content matching Sandstone's placeholder copy
4. Reference screenshots taken from Sandstone built locally

**Key files to create/modify:**
- `templates/page.benchmark.json`
- `sections/benchmark-hero.liquid` (temporary section for parity testing)
- `sections/benchmark-intro.liquid`
- `sections/benchmark-stats.liquid`
- `sections/benchmark-testimonials.liquid`
- `assets/sandstone-tokens.css` (initial token file)

### Phase 3 — Visual Parity Loop
**Goal:** Iterate on the benchmark page until it closely matches Sandstone at 1440x900, 768x1024, 390x844.

**Strategy:**
- Compare sections top-to-bottom
- Priority order: container width → section spacing → typography hierarchy → button styling → card styling → image treatment → micro-polish
- Target: 5+ documented loops

**Key files likely edited per loop:**
- `assets/sandstone-tokens.css`
- `assets/base.css` (minimal overrides only)
- Individual benchmark section files
- `config/settings_data.json` (color scheme + typography settings)

### Phase 4 — Token System
**Goal:** Finalize the design token layer based on proven benchmark parity values.

**Tokens to create (in `assets/sandstone-tokens.css`):**

```
Typography:
  --sandstone-display-6xl through --sandstone-text-xs (responsive clamp values)
  --sandstone-font-feature-settings (Inter OpenType features)
  --sandstone-font-weight-regular: 400
  --sandstone-font-weight-medium: 500
  --sandstone-font-weight-semibold: 600

Colors (mapped to Horizon color scheme variables):
  --color-background: #f5f5f5 (base-100)
  --color-foreground: #525252 (base-600)
  --color-foreground-heading: #171717 (base-900)
  --color-surface: #ffffff (white cards)
  --color-muted: #737373 (base-500)
  --color-border: #e5e5e5 (base-200)
  --color-subtle: #a3a3a3 (base-400)

Spacing:
  --sandstone-section-py: clamp(3rem, 5vw, 6rem)
  --sandstone-card-padding: 2rem
  --sandstone-card-padding-sm: 1rem
  --sandstone-container-px: 2rem
  --sandstone-gap-lg: 2rem
  --sandstone-gap-md: 1rem

Radii:
  --sandstone-radius-container: 1.5rem (24px)
  --sandstone-radius-card-lg: 1rem (16px)
  --sandstone-radius-card: 0.75rem (12px)
  --sandstone-radius-button: 9999px (pill)

Layout:
  --sandstone-hero-height: calc(100vh - 2rem)
  --sandstone-sidebar-max-width: 24rem
```

### Phase 5 — Shared Primitives
**Goal:** Create reusable Shopify-native building blocks.

**Primitives to build:**

| Primitive | Implementation | Purpose |
|-----------|---------------|---------|
| `kicker.liquid` snippet | Renders section label (small, medium-weight, muted text) | Section headers |
| `rolling-link.liquid` snippet | Text-swap hover animation link | Section CTAs |
| `display-text.liquid` snippet | Large responsive text with italic accent support | Hero/intro text |
| `divider-list.liquid` snippet | Container with `border-y divide-y` and consistent item padding | Stats, process, services |
| `sticky-sidebar-grid.liquid` snippet | 3-col grid with sticky left column | Stats, process, testimonials |
| `fullbleed-container.liquid` snippet | Rounded full-viewport container with media bg + overlay panel | Hero, services, footer |

### Phase 6 — Section Rebuild
**Goal:** Build production sections that compose the primitives.

**Section roadmap (priority order):**

1. **Hero section** — Adapt existing `hero.liquid` or create `sandstone-hero.liquid`
   - Full-bleed rounded container with video/image bg
   - Centered overlay content with mix-blend-difference
   - Bottom ticker/marquee

2. **Text display section** — New `text-display.liquid`
   - Large display text with configurable size variant
   - Support for italic accent phrases via rich text
   - Philosophy variant with indent

3. **Stats grid section** — New `stats-grid.liquid`
   - Sticky sidebar with image + intro text
   - Divider list with large number + description

4. **Process section** — New `process-grid.liquid`
   - Sticky sidebar card with kicker + heading
   - Numbered step list with image thumbnails

5. **Services showcase section** — New `services-showcase.liquid`
   - Full-bleed container with swappable bg images
   - Overlay panel with tabbed list

6. **Testimonials slider** — New `testimonials-slider.liquid`
   - Sidebar + keen-slider/scroll snap cards
   - Large italic quote + avatar + author info

7. **Project/Collection slider** — Adapt `carousel.liquid`
   - Sidebar info panel + image slider

8. **Blog preview grid** — Adapt existing sections
   - 3-column card grid with Sandstone card styling

9. **Navigation overrides** — CSS-only modifications to `header.liquid`
   - Floating pill style, compact, fixed top-8

10. **Footer overrides** — CSS modifications or new section
    - Full-bleed video container with overlay panel

### Phase 7 — Template Assembly & QA
**Goal:** Wire sections into templates and polish.

**Templates to configure:**
- `index.json` — Homepage with all major sections
- `page.json` — Standard content page
- `collection.json` — Product collection with Sandstone card styling
- `product.json` — Product detail page

**QA checklist:**
- [ ] Typography hierarchy consistent across all sections
- [ ] Spacing rhythm matches reference at all viewports
- [ ] Buttons consistently pill-shaped
- [ ] Card styling consistent (white bg, correct radii, no shadows)
- [ ] Images have correct aspect ratios and radii
- [ ] Hover states match (rolling links, button transitions)
- [ ] Responsive behavior at 1440, 768, 390 widths
- [ ] Color scheme is purely monochromatic
- [ ] Divider patterns consistent
- [ ] Sticky behaviors work correctly

---

## Existing Horizon Files: Adapt vs Replace

| File | Strategy | Rationale |
|------|----------|-----------|
| `config/settings_data.json` | **Modify** | Update color schemes, typography settings, button radii |
| `assets/base.css` | **Minimal overrides** | Add sandstone-specific overrides at end; avoid rewriting core |
| `layout/theme.liquid` | **Keep** | Add sandstone-tokens.css link only |
| `sections/header.liquid` | **CSS override** | Restyle via CSS, don't rewrite Liquid structure |
| `sections/footer.liquid` | **CSS override or new** | May need new section for video bg pattern |
| `sections/hero.liquid` | **Evaluate** | May adapt or create new sandstone-hero.liquid |
| `snippets/button.liquid` | **CSS override** | Pill radius + color adjustments via tokens |
| All other sections | **Keep + supplement** | Add new sandstone sections alongside existing ones |

---

## Likely Conflicts & Tradeoffs

1. **Full-bleed rounded containers** — Sandstone's hero/footer use `calc(100vh - 2rem)` with large border-radius. Horizon's hero section has different structure. May need custom section rather than pure CSS override.

2. **Sticky stacking rows** — Sandstone uses `lg:sticky lg:top-0 bg-base-100` on divider list items for a "stacking cards" effect. This relies on same-colored backgrounds. Horizon's color scheme system may conflict if the background doesn't match exactly.

3. **Floating navigation** — Sandstone's nav is a small fixed pill. Horizon's header is a full-width bar with complex menu/drawer system. CSS override may be limited; may need to accept slight structural differences while matching visual feel.

4. **Inter font features** — Horizon loads Inter via Shopify's font system which may not include variable font with all OpenType features. May need to supplement with a direct CDN link to InterVariable.

5. **Keen Slider** — Sandstone uses keen-slider for carousels. Horizon has its own carousel system. Will use Horizon's native approach and style it to match.

6. **Video backgrounds** — Sandstone's hero/footer/services sections all use background video. Horizon's hero supports video but footer does not. May need custom sections for video-background patterns.

---

## Blockers

- **No live preview URL for sandstone_v6** — Need to build locally (`npm run dev`) to capture reference screenshots. Will document in benchmark-spec.md.
- **Screenshot tooling** — Need to determine available screenshot capture method (browser DevTools, CLI tool, or manual).
