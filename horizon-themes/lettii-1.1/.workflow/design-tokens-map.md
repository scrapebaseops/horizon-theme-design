# Brightlight v6 -- Design Tokens Map

Source: `lexington-reference/brightlight_v6_A/src/styles/global.css`
Color space: OKLCH
Tailwind: v4 (`@theme` directive)

---

## Color Palettes

### Accent (Warm orange/coral -- primary brand)

| Shade | OKLCH Value | Role |
|-------|------------|------|
| 50 | `oklch(96.37% 0.014 34.3)` | Lightest tint, subtle backgrounds |
| 100 | `oklch(92.11% 0.031 32.56)` | Light backgrounds |
| 200 | `oklch(85.18% 0.06 35)` | Soft borders, tints |
| 300 | `oklch(77.67% 0.096 34.47)` | Medium tint |
| 400 | `oklch(70.47% 0.133 35.14)` | Code string expressions |
| **500** | **`oklch(64.47% 0.167 35.21)`** | **Primary CTA, buttons, links, selection text** |
| **600** | **`oklch(55.96% 0.174 34.81)`** | **Hover on accent-500, focus ring, list markers** |
| 700 | `oklch(45.78% 0.139 34.91)` | Dark accent (sign-in overlay `bg-accent-700/50`) |
| 800 | `oklch(35.02% 0.102 35.05)` | Very dark accent |
| 900 | `oklch(22.26% 0.055 35.39)` | Footer brand name (`text-accent-900`) |
| 950 | `oklch(16.51% 0.033 41.46)` | Darkest accent |

### Sand (Warm neutral -- surfaces, backgrounds)

| Shade | OKLCH Value | Role |
|-------|------------|------|
| **50** | **`oklch(98.73% 0.004 106.47)`** | **Sign-in background, card background alt** |
| **100** | **`oklch(97.03% 0.007 88.64)`** | **Card backgrounds, muted button bg, feature sections, code bg** |
| 200 | `oklch(90.07% 0.024 90.76)` | Medium surface |
| 300 | `oklch(82.59% 0.04 87.57)` | Muted elements |
| 400 | `oklch(75.75% 0.057 88.79)` | Mid-tone |
| 500 | `oklch(68.28% 0.074 88.38)` | Outline overlays (`sand-500/10`, `sand-500/20`) |
| 600 | `oklch(58.28% 0.068 87.84)` | Dark surface |
| 700 | `oklch(47.95% 0.054 88.5)` | Dark sand |
| 800 | `oklch(36.27% 0.04 89.72)` | Contact overlay (`bg-sand-800/50`) |
| 900 | `oklch(24.54% 0.023 87.95)` | Near-black sand |
| **950** | **`oklch(16.56% 0.011 80.55)`** | **Muted button text color, modal overlay** |

### Base (Pure grayscale -- text, borders)

| Shade | OKLCH Value | Role |
|-------|------------|------|
| 50 | `oklch(98.5% 0 0)` | Toggle slider background, subtle bg |
| 100 | `oklch(97% 0 0)` | Hover backgrounds, tag pills |
| **200** | **`oklch(92.2% 0 0)`** | **Primary border color (dashed borders, dividers, table borders)** |
| 300 | `oklch(87% 0 0)` | Input borders, checkbox border |
| 400 | `oklch(70.8% 0 0)` | Code comments, placeholder text, breadcrumb separator |
| **500** | **`oklch(55.6% 0 0)`** | **Body text, secondary text, labels** |
| 600 | `oklch(43.9% 0 0)` | Medium text, social links, UI labels |
| **700** | **`oklch(37.1% 0 0)`** | **Default button hover (`hover:bg-base-700`)** |
| 800 | `oklch(26.9% 0 0)` | Dark headings, navigation logo, breadcrumb links |
| **900** | **`oklch(20.5% 0 0)`** | **Card titles, pricing amounts, primary dark text** |
| 950 | `oklch(14.5% 0 0)` | Near-black, modal overlay (`bg-base-950/50`) |

### Usage Patterns

| Role | Token | Example |
|------|-------|---------|
| Page background | `white` | Body default |
| Surface background | `sand-50` or `sand-100` | Cards, sections, sign-in panels |
| Card hover | `white` + `shadow-2xl` | IntegrationsCard, Feature2 cards |
| Primary text | `black` or `base-900` | Headings, titles |
| Secondary text | `base-500` | Body copy, descriptions |
| Tertiary text | `base-600` | Social links, UI labels |
| Link/action | `accent-500` | Buttons, links, active states |
| Link hover | `accent-600` | Button hover, marker color |
| Borders | `base-200` | Usually with `border-dashed` |
| Selection | `bg-sand-100 text-accent-500` | HTML-level via class |
| Focus ring | `ring-accent-500` or `ring-accent-100` | Inputs, buttons |
| Astro code bg | `sand-100` | Code block background (custom properties) |

---

## Typography

### Font Families

| CSS Variable | Family | Fallback | Usage |
|-------------|--------|----------|-------|
| `--font-sans` | Geist | sans-serif | Default body text, UI, navigation |
| `--font-serif` | Noto Serif | serif | Headings (font-serif), testimonial quotes, prices, brand name |
| `--font-mono` | Geist Mono | monospace | Code blocks, technical content |

### Font Weights

| Weight | Class | Usage |
|--------|-------|-------|
| 400 | `font-normal` | Body text (default) |
| 500 | `font-medium` | Headings, card titles, labels, buttons |
| 600 | `font-semibold` | Table category headers |

### Responsive Type Scale

Display variants (used with `font-serif font-medium tracking-tight`):

| Variant | Base | sm (640) | md (768) | lg (1024) |
|---------|------|----------|----------|-----------|
| `display6XL` | text-4xl | text-7xl | text-9xl | text-[12rem] |
| `display5XL` | text-4xl | text-7xl | text-8xl | text-[10rem] |
| `display4XL` | text-4xl | text-7xl | text-8xl | text-9xl |
| `display3XL` | text-5xl | text-6xl | text-7xl | text-8xl |
| `display2XL` | text-5xl | text-5xl | text-6xl | text-7xl |
| `displayXL` | text-4xl | text-4xl | text-5xl | text-6xl |
| `displayLG` | text-3xl | text-3xl | text-4xl | text-5xl |
| `displayMD` | text-2xl | text-2xl | text-3xl | text-4xl |
| `displaySM` | text-lg | text-xl | text-2xl | text-3xl |
| `displayXS` | text-base | text-lg | text-xl | text-2xl |

Text variants (used with `font-sans`):

| Variant | Base | sm | md |
|---------|------|-----|-----|
| `textXL` | text-lg | text-xl | text-2xl |
| `textLG` | text-base | text-lg | text-xl |
| `textBase` | text-base | -- | -- |
| `textSM` | text-sm | -- | -- |
| `textXS` | text-xs | -- | -- |

### Common Heading Pattern

```
font-serif font-medium tracking-tight text-black
```

Used on virtually all section headings with `displayMD` or `displaySM` variant.

### Prose Styling (Tailwind Typography)

Applied via `Wrapper variant="prose"`:
- Links: `border-b no-underline hover:border-solid hover:text-accent-500 transition duration-200`
- Headings: `font-medium text-base-800`
- Blockquotes: `border-l-accent text-base-500`
- Lists: `[list-style-type:'---'] marker:text-accent-600`
- Code blocks: `border rounded-xl border-base-300 scrollbar-hide`

---

## Spacing

Standard Tailwind 4px unit scale. Most common values in use:

| Class | px | Common Usage |
|-------|-----|-------------|
| `gap-2` | 8px | Button groups, tag pills, tight grids |
| `gap-4` | 16px | Card grids, form fields |
| `gap-8` | 32px | Feature sections, card padding |
| `gap-12` | 48px | Section gap, feature alternating blocks |
| `gap-24` | 96px | Major inter-section spacing |
| `p-4` | 16px | Card padding (standard) |
| `p-8` | 32px | Feature card padding, CTA sections |
| `py-4` | 16px | Wrapper vertical padding |
| `py-12` | 48px | Section vertical padding |
| `py-24` | 96px | CTA banner vertical padding |
| `pt-32` | 128px | Hero/page top padding (accounts for fixed nav) |
| `mt-4` | 16px | Body text below heading |
| `mt-8` | 32px | Grid below header, image below text |
| `mt-12` | 48px | Major section content offset |

---

## Layout

### Container (Wrapper component)

| Variant | Classes |
|---------|---------|
| `standard` | `mx-auto max-w-5xl 2xl:max-w-6xl px-4 2xl:px-12 w-full border-x border-base-200 border-dashed` |
| `prose` | Tailwind Typography prose classes + custom link/heading/list/code styling |

Key measurements:
- **max-w-5xl:** 64rem (1024px) -- primary content width
- **2xl:max-w-6xl:** 72rem (1152px) -- wider on large screens
- **px-4:** 16px gutters (mobile)
- **2xl:px-12:** 48px gutters (desktop)
- **border-x border-dashed:** Signature vertical dashed border rails

### Grid Patterns

| Pattern | Usage |
|---------|-------|
| `grid-cols-1 md:grid-cols-2` | Pricing2, Feature4 splits, challenges |
| `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` | Blog cards, related posts, integrations |
| `grid-cols-1 md:grid-cols-2 lg:grid-cols-4` | Feature2 cards, help center |
| `grid-cols-1 lg:grid-cols-3 xl:grid-cols-5` | Team grid |
| `xl:grid-cols-3` | Footer layout |

### Breakpoints

| Prefix | Width | Usage |
|--------|-------|-------|
| `sm` | 640px | Type scale bump, grid shifts |
| `md` | 768px | 2-column grids, desktop nav shows |
| `lg` | 1024px | 3-4 column grids, full layouts |
| `xl` | 1280px | 5-column team grid |
| `2xl` | 1536px | Wider container (max-w-6xl), larger gutters |

---

## Borders and Surfaces

### Border Radius

| Class | Typical Usage |
|-------|---------------|
| `rounded-md` | Inputs, small toggles |
| `rounded-lg` | Icon containers, author avatars |
| `rounded-xl` | Cards, images, sections, code blocks, modals |
| `rounded-full` | Buttons, tag pills, breadcrumb pills, checkboxes, color dots |

### Border Patterns

| Pattern | Usage |
|---------|-------|
| `border-dashed border-base-200` | **Signature style** -- wrapper rails, section dividers, nav bottom |
| `border-t border-base-200` | Section top borders |
| `border-x border-base-200` | Wrapper side rails |
| `divide-y divide-base-200` | Lists (investors, details DLs) |
| `divide-y divide-sand-50` | Code block internal dividers |
| `outline outline-sand-500/10` | Card mockup outlines |

### Shadows

| Class | Usage |
|-------|-------|
| `shadow-sm` | Inputs, subtle card depth |
| `shadow-2xl` | **Card hover state** (combined with bg change) |
| `ring-1 ring-base-200` | Default input/toggle border |
| `ring-2 ring-accent-500` | **Focus state** on interactive elements |
| `ring-offset-2` | Focus ring spacing |

---

## Buttons

### Variants

| Variant | Background | Text | Hover | Focus Ring |
|---------|-----------|------|-------|------------|
| `default` | `bg-black` | `text-white` | `hover:bg-base-700` | `focus:ring-black` |
| `accent` | `bg-accent-500` | `text-white` | `hover:bg-accent-600` | `focus:ring-accent-600` |
| `muted` | `bg-sand-100` | `text-sand-950` | `hover:text-accent-500` | `focus:ring-sand-100` |
| `none` | (no styles) | (no styles) | (no styles) | (no styles) |

### Sizes

| Size | Height | Horizontal Padding | Text Size |
|------|--------|-------------------|-----------|
| `xs` | h-8 (32px) | px-4 | text-xs |
| `sm` | h-9 (36px) | px-4 | text-sm |
| `base` | h-10 (40px) | px-6 | text-base |
| `md` | h-11 (44px) | px-6 | text-md |
| `lg` | h-12 (48px) | px-6 | text-lg |
| `xl` | h-14 (56px) | px-6 | text-base |

### Icon-Only Sizes

Square buttons using `size-*` instead of `h-*`:

| Size | Dimension |
|------|-----------|
| `xs` | size-8 |
| `sm` | size-9 |
| `base` | size-10 |
| `md` | size-11 |
| `lg` | size-12 |
| `xl` | size-14 |

### Base Button Classes

```
flex items-center justify-center rounded-full
transition duration-300 text-center
focus:ring-2 focus:outline-none focus:ring-offset-2
```

### Gap Options (between icon slots)

| Gap | Class |
|-----|-------|
| `xs` | gap-2 |
| `sm` | gap-4 |
| `base` | gap-8 |
| `md` | gap-10 |
| `lg` | gap-12 |

---

## Animations

### Keyframe Animations

| Name | Duration | Direction | Usage |
|------|----------|-----------|-------|
| `marquee` | 12s linear infinite | `translateX(0%) -> translateX(-100%)` | LogoCloud1 |
| `slowMarquee` | 300s linear infinite | `translateX(0%) -> translateX(-100%)` | LogoCloud3 |
| `rightMarquee` | 300s linear infinite | `translateX(0%) -> translateX(100%)` | Unused / available |

### Transition Defaults

| Pattern | Usage |
|---------|-------|
| `transition duration-300` | Buttons, cards, links (standard) |
| `transition duration-200 ease-in-out` | Toggle sliders, fast interactions |
| `transition-colors duration-300` | Text color changes on hover |
| `transition-all duration-300 ease-in-out` | Mobile nav overlay |
| `transition-transform duration-200 ease-in-out` | Pricing toggle slider |

### Hover Transforms

| Pattern | Usage |
|---------|-------|
| `group-hover:-rotate-12 group-hover:-translate-y-2` | Card icon containers |
| `group-hover:translate-x-2` | Chevron arrows on CTAs |
| `group-open:-rotate-45` | FAQ accordion plus icon |
| `group-hover:-translate-x-2` | Stats indicator dots |

---

## Interactive States

| State | Common Pattern |
|-------|----------------|
| **Hover (text)** | `hover:text-accent-500`, `hover:text-base-600`, `hover:text-base-800`, `hover:text-black` |
| **Hover (bg)** | `hover:bg-white`, `hover:bg-sand-100`, `hover:bg-accent-600`, `hover:bg-base-100` |
| **Hover (card)** | `hover:bg-white hover:shadow-2xl outline-transparent hover:outline hover:outline-sand-100` |
| **Focus (input)** | `focus:border-accent-500 focus:ring-accent-100 focus:ring-2 focus:outline-none` |
| **Focus (button)** | `focus:ring-2 focus:ring-offset-2 focus:outline-none` + variant ring color |
| **Selection** | `selection:bg-sand-100 selection:text-accent-500` (global on `<html>`) |
| **Active tab** | `opacity-100` (vs `opacity-50` for inactive tabs) |
| **Open accordion** | `group-open:-rotate-45` on the plus icon SVG |

---

## Form Inputs

Standard input pattern used across contact, sign-in, sign-up, subscribe:

```
block w-full px-4 py-2 text-xs leading-tight align-middle
bg-white border border-transparent h-9 rounded-md
text-base-500 ring-1 ring-base-200 placeholder-base-400
shadow-sm transition duration-300 ease-in-out
focus:z-10 focus:border-accent-500 focus:ring-accent-100
focus:ring-2 focus:outline-none
```

Checkbox: `rounded shadow border-base-300 text-accent-600 focus:ring-accent-500 focus:ring-offset-2 focus:ring-2 size-4`

---

## Code Syntax Highlighting

Custom CSS properties for Astro `<Code>` component (theme: `css-variables`):

| Token | Color Variable |
|-------|---------------|
| Text / foreground | `base-500` |
| Links / constants / parameters / punctuation | `accent-500` |
| Comments | `base-400` |
| Strings / functions | `cyan-600` |
| Keywords | `yellow-600` |
| String expressions | `accent-400` |
| Background | `sand-100` |

Line numbers via CSS counters, `margin-right: 1.5rem`, color `#999999`.
