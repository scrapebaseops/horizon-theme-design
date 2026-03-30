# Benchmark Spec

## Pages

| Role | Path | Template |
|------|------|----------|
| Reference | sandstone_v6 homepage (localhost:4321) | `src/pages/index.astro` |
| Target | Horizon benchmark page | `templates/page.benchmark.json` (assign to a page in Shopify admin) |

## Content Blocks (in order)

| # | Section | Reference Component | Horizon Section | Content Match |
|---|---------|--------------------|-----------------|----|
| 1 | Hero | `Hero.astro` — full-bleed video, logo overlay, ticker | `sandstone-hero.liquid` — video bg, floating pill nav, logo overlay, marquee ticker | Same video (hero.mp4), logo "SNDST", contact ticker |
| 2 | Intro | `Intro.astro` — display2XL text with italic accents | `sandstone-intro.liquid` — display-2xl text with `<em>` | Same copy, italic accents match |
| 3 | Stats | `Stats.astro` — sticky sidebar image + 7 stat rows | `sandstone-stats.liquid` — sticky sidebar + 7 stat rows | Full 7 stats; same team image |
| 4 | Philosophy | `Philosophy.astro` — displayXL indented text with italic accents | `sandstone-philosophy.liquid` — display-xl text with `<em>` + desktop indent | Same copy, `text-indent: 10.5rem` matches reference |
| 5 | Process | `Process.astro` — sticky sidebar card + 6 numbered steps | `sandstone-process.liquid` — sticky sidebar + 6 steps | Full 6 steps; same process images |
| 6 | Testimonials | `Testimonials.astro` — keen-slider + sidebar with nav arrows | `sandstone-testimonials.liquid` — scroll-snap + sidebar with nav | 6 testimonials; same avatar images |
| 7 | Blog Preview | `BlogPreview.astro` — 3-col card grid with rolling links | `sandstone-blog-preview.liquid` — 3-col grid with rolling links | 3 articles; same blog images |

## Viewports

| Name | Size | Primary Use |
|------|------|-------------|
| Desktop | 1440 x 900 | Main comparison viewport |
| Tablet | 768 x 1024 | Responsive layout check |
| Mobile | 390 x 844 | Mobile stack check |

## Design Features Being Validated

- [ ] Body background matches (base-100 / #f5f5f5)
- [ ] Typography scale and responsive sizing
- [ ] Inter font with OpenType features
- [ ] Monochromatic neutral color palette
- [ ] Italic accent styling in display text
- [ ] Section vertical spacing (py-12 lg:py-24 equivalent)
- [ ] Full-bleed rounded hero container
- [ ] Pill-shaped buttons
- [ ] Card surfaces (white bg, correct radii)
- [ ] Divider list pattern (border-y divide-y)
- [ ] Sticky sidebar grid layout
- [ ] Stat number styling (large italic semibold)
- [ ] Kicker label styling
- [ ] Testimonial card layout with large quote
- [ ] Rolling link hover animation
- [ ] Blog card layout with image aspect ratios
- [ ] Overall visual density and whitespace rhythm

## Known Exclusions

- **Keen Slider** — Using CSS scroll-snap instead; functionally equivalent
- **Footer** — Using Horizon's default footer; Sandstone's video+panel footer deferred
- **Project slider** — Omitted from benchmark; covered by testimonials slider pattern
- **Services preview** — Omitted from benchmark; covered by fullbleed pattern in hero

## Resolved (previously excluded, now implemented)

- **Video backgrounds** — Hero now uses `sandstone-hero.mp4` with autoplay
- **Navigation** — Custom floating pill nav implemented inside hero section; Horizon default header hidden via CSS
- **Image assets** — All reference images copied 1:1 (MD5 verified): team, process steps, avatars, blog cards

## Screenshot Comparison Process

1. Build sandstone_v6 locally: `cd lexington-reference/sandstone_v6 && npm run dev`
2. Open at localhost:4321
3. Capture reference screenshots at each viewport
4. Push Horizon benchmark to Shopify dev store or use `shopify theme dev`
5. Open at localhost:9292/pages/benchmark
6. Capture target screenshots at same viewports
7. Compare section-by-section, log mismatches in visual-parity-log.md
