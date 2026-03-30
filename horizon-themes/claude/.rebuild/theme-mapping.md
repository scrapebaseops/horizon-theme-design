# Theme Mapping: Sandstone v6 → Horizon (Claude Variant)

## 1. Design Tokens in the Reference Theme

### Typography
- **Font family:** Inter (variable), sans-serif
- **OpenType features:** liga, calt, dlig, ss07, ss08, zero, tnum, cv01-04, cv09
- **Font loading:** Google/rsms CDN (`https://rsms.me/inter/inter.css`)
- **Weight usage:** 400 (body), 500 (medium/kickers), 600 (semibold/stats), 700 (bold headings - rare)
- **Italic usage:** light italic (`font-light italic`) used for accent phrases within display text

#### Typography Scale (Tailwind utility → approximate px at desktop)
| Variant | Mobile | Tablet | Desktop | ~Desktop px |
|---------|--------|--------|---------|-------------|
| display6XL | text-4xl (36px) | text-9xl (128px) | text-[12rem] (192px) | 192 |
| display5XL | text-4xl | text-8xl | text-[10rem] (160px) | 160 |
| display4XL | text-4xl | text-8xl | text-9xl (128px) | 128 |
| display3XL | text-5xl (48px) | text-7xl (72px) | text-8xl (96px) | 96 |
| display2XL | text-5xl (48px) | text-6xl (60px) | text-7xl (72px) | 72 |
| displayXL | text-4xl (36px) | text-5xl (48px) | text-6xl (60px) | 60 |
| displayLG | text-3xl (30px) | text-4xl (36px) | text-5xl (48px) | 48 |
| displayMD | text-2xl (24px) | text-3xl (30px) | text-4xl (36px) | 36 |
| displaySM | text-lg (18px) | text-2xl (24px) | text-3xl (30px) | 30 |
| displayXS | text-base (16px) | text-xl (20px) | text-2xl (24px) | 24 |
| textXL | text-lg (18px) | — | text-2xl (24px) | 24 |
| textLG | text-base (16px) | — | text-xl (20px) | 20 |
| textBase | text-base (16px) | — | — | 16 |
| textSM | text-sm (14px) | — | — | 14 |
| textXS | text-xs (12px) | — | — | 12 |

### Color Palette (oklch → hex approximation)
| Token | OKLCH | ~Hex | Role |
|-------|-------|------|------|
| base-50 | oklch(0.985 0 0) | #fafafa | Lightest surface |
| base-100 | oklch(0.97 0 0) | #f5f5f5 | Body background |
| base-200 | oklch(0.922 0 0) | #e5e5e5 | Borders, dividers, muted btn bg |
| base-300 | oklch(0.87 0 0) | #d4d4d4 | Focus outlines |
| base-400 | oklch(0.708 0 0) | #a3a3a3 | Date text, subtle meta |
| base-500 | oklch(0.556 0 0) | #737373 | Secondary text, italic accents |
| base-600 | oklch(0.439 0 0) | #525252 | Body text, kicker text |
| base-700 | oklch(0.371 0 0) | #404040 | — |
| base-800 | oklch(0.269 0 0) | #262626 | Logo overlay (mix-blend) |
| base-900 | oklch(0.205 0 0) | #171717 | Headings, primary text |
| base-950 | oklch(0.145 0 0) | #0a0a0a | Button bg (default) |

**Color strategy:** Purely monochromatic neutral palette. No accent/brand colors. Identity comes from typography and layout, not color.

### Spacing System
| Context | Value | Tailwind | px |
|---------|-------|----------|----|
| Section padding (vertical) | py-12 lg:py-24 | — | 48px / 96px |
| Hero/footer outer wrap | py-4 | — | 16px |
| Card padding (large) | p-8 | — | 32px |
| Card padding (small) | p-4 | — | 16px |
| Container padding (standard) | px-8 | — | 32px |
| Container padding (wide) | px-4 | — | 16px |
| Grid gap (primary) | gap-8 | — | 32px |
| Grid gap (tight) | gap-4 | — | 16px |
| Text stack spacing | mt-4 / mt-8 / mt-12 | — | 16 / 32 / 48px |
| Divider spacing | py-8 | — | 32px |
| Kicker to content | mt-12 | — | 48px |
| Testimonial author gap | mt-12 lg:mt-24 | — | 48 / 96px |

### Border Radius
| Element | Tailwind | px |
|---------|----------|----|
| Hero/Footer containers | rounded-3xl | 24px |
| Cards/Panels (large) | rounded-2xl | 16px |
| Cards/Panels (medium) | rounded-xl | 12px |
| Images | rounded-xl | 12px |
| Buttons | rounded-full | 9999px (pill) |
| Nav bar | rounded-xl | 12px |

### Shadow System
No shadows used. Design relies on surface color differentiation (white vs base-100) and subtle borders.

### Container Widths
| Variant | Tailwind | Behavior |
|---------|----------|----------|
| wide | max-w-screen, px-4, 2xl:max-w-[180rem] | Near full-bleed with minimal padding |
| standard | max-w-screen, px-8, 2xl:max-w-[180rem] | Full-width with generous padding |
| narrow | max-w-xl, px-4 | Constrained content width |
| paddingless | max-w-screen, 2xl:max-w-[180rem] | No horizontal padding |

### Grid Rules
- Primary: `grid-cols-1 lg:grid-cols-3` (1/3 sidebar + 2/3 content)
- Projects: `grid-cols-1 lg:grid-cols-12` (3-col sidebar + 9-col slider)
- Blog: `grid-cols-1 lg:grid-cols-3` (equal columns)
- Process steps: `grid-cols-1 md:grid-cols-3 lg:grid-cols-4` inside divider list

### Image Treatment
- Project cards: `aspect-square lg:aspect-4/2`, object-cover, rounded-xl
- Blog cards: `aspect-12/8`, object-cover, rounded-2xl
- Process images: `h-48`, object-cover, rounded-xl
- Stats sidebar image: `aspect-square`, object-cover, rounded-xl
- Testimonial avatars: `size-12`, rounded-full
- Hero/Footer video: `object-cover size-full absolute inset-0`

### Interaction & Animation
- Button transition: `duration-500 ease-in-out transition-all`
- Link hover: `transition-colors`
- Nav menu: `duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]` (height + opacity)
- Rolling link: `duration-500` translate-y animation (text swap on hover)
- Marquee: continuous translateX animation
- Focus: `outline-2 outline-offset-4 outline-base-300`

---

## 2. Repeated UI Patterns

### Hero
- Full viewport height minus padding: `h-[calc(100vh-2rem)]`
- Wrapped in `py-4` container with `rounded-3xl`
- Background video (autoplay, muted, loop)
- Centered logo overlay with `mix-blend-difference`
- Bottom ticker/marquee strip

### Intro Section
- Large display text (display2XL) with inline `<span>` accents
- Accent spans: `text-base-500 font-light italic`
- Standard container with `py-12 lg:py-24`

### Philosophy Section
- Same pattern as Intro but using displayXL
- Uses `lg:indent-42` for visual offset

### Stats Section
- 3-column grid with sticky sidebar image
- Introductory text block (displaySM + textSM)
- Divider list of stats: large italic number (display2XL) + description (textBase)
- Sticky stacking: `lg:sticky lg:top-0 bg-base-100`

### Process Section
- 3-column grid with sticky sidebar card
- Sidebar: white card (`bg-white rounded-xl p-8`) with kicker + heading
- Content: numbered divider list with step number (display2XL italic), title (displaySM), description (textSM), thumbnail image

### Services Preview
- Full viewport container (same pattern as Hero/Footer)
- Background image swapping on tab click
- Overlay panel: `lg:max-w-xl lg:ml-auto` with `bg-base-100 m-4 rounded-2xl p-8`
- Tabbed service list with dividers
- Active tab: full opacity; inactive: `opacity-50`

### Project Preview (Slider)
- 12-column grid: 3-col sidebar + 9-col keen-slider
- Sidebar: white card with year, title, location + nav arrows
- Slider: full-bleed project images with `rounded-xl overflow-hidden`

### Testimonials (Slider)
- 3-column grid: 1-col sidebar + 2-col keen-slider
- Sidebar: white card with heading + nav arrows
- Slide cards: `bg-white p-8 rounded-2xl` with large quote (displayMD italic), avatar + author info

### Blog Preview
- 3-column equal grid
- Blog cards: image (aspect-12/8, rounded-2xl) + date + title + description + rolling link

### Navigation
- Fixed position, `top-8`, `z-100`
- Compact pill: `bg-white rounded-xl p-4`, max-width on lg
- Logo + hamburger toggle
- Dropdown: white panel with navigation groups, slides open via height animation

### Footer
- Same container pattern as Hero: `h-[calc(100vh-2rem)] rounded-3xl` with video bg
- Overlay panel: `lg:max-w-xl lg:ml-auto`, white card with team info + philosophy text + copyright

### Rolling Link
- Text swap animation on hover (translate-y)
- h-8, overflow-hidden, `font-medium`
- Variants: dark (white text) / light (base-950 text)

### Kicker
- `textLG` size, `font-medium`, `text-base-600`
- Used as section label/category

---

## 3. Shopify/Horizon Implementation Targets

| Sandstone Pattern | Horizon Implementation |
|---|---|
| Color palette (base-50 to base-950) | Color scheme settings → map to scheme-1 (primary), scheme-2 (surface) |
| Typography scale | CSS custom properties in `sandstone-tokens.css` asset + Shopify font settings (Inter) |
| Inter OpenType features | Custom CSS in asset file (font-feature-settings) |
| Container system | Override Horizon's `--normal-page-width`, `--wide-page-width` variables |
| Button (pill, default/muted) | Override Horizon button styles via CSS + set `button_border_radius_primary: 9999` |
| Hero (video + rounded container) | Custom `hero.liquid` section or adapt existing hero section with custom CSS |
| Intro/Philosophy (display text) | `custom-liquid.liquid` section or new `text-display.liquid` section |
| Stats section | New `stats-grid.liquid` section with sticky sidebar |
| Process section | New `process-grid.liquid` section with numbered steps |
| Services preview | New `services-showcase.liquid` section |
| Project slider | Adapt `carousel.liquid` or new section with sidebar |
| Testimonials slider | Adapt existing or new `testimonials-slider.liquid` section |
| Blog grid | Adapt existing blog sections |
| Navigation (floating pill) | Override `header.liquid` styles via CSS |
| Footer (video + panel) | Override or new `footer.liquid` styles |
| Rolling link | New `rolling-link.liquid` snippet |
| Kicker | New `kicker.liquid` snippet |
| Divider list pattern | Reusable CSS class in token file |
| Sticky stacking | CSS utility class |
| Italic accent spans | Styling pattern in token CSS |
