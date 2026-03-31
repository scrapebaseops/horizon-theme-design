# Brightlight v6 -- Reference Pages Catalog

Source: `lexington-reference/brightlight_v6_A/`
Framework: Astro + Tailwind CSS v4

---

## Global Elements

### Navigation Header

- **File:** `src/components/global/Navigation.astro`
- **Position:** Fixed top (`fixed inset-x-0 top-0 z-50`), white background
- **Border:** `border-b border-dashed border-base-200`
- **Layout:** Logo left, nav links center, CTA buttons right (flex-row, items-center, justify-between)
- **Mobile:** Hamburger button at `md:hidden`, toggles full-screen overlay via JS (`opacity`, `translate-y`, `pointer-events` class toggling)
- **Nav links:** `text-2xl md:text-sm hover:text-base-600 text-base-500`
- **Buttons:** "Buy Brightlight" (muted, xs) + "Sign in" (accent, xs)
- **Can be hidden:** `hideNav={true}` prop on BaseLayout

### Footer

- **File:** `src/components/global/Footer.astro`
- **Border:** `border-t border-base-200 border-dashed`
- **Layout:** `xl:grid xl:grid-cols-3 xl:gap-8`, py-12
- **Left column:** Logo + brand name (font-serif) + tagline
- **Right columns:** 4 link groups in `md:grid-cols-2 xl:grid-cols-4 xl:col-span-2`
- **Link style:** `text-sm text-base-500 hover:text-black`, `space-y-2`
- **Can be hidden:** `hideFooter={true}` prop on BaseLayout

### BaseLayout

- **File:** `src/layouts/BaseLayout.astro`
- **HTML:** `scroll-smooth selection:bg-sand-100 selection:text-accent-500`
- **Body:** `relative flex flex-col bg-white min-h-svh`
- **Structure:** Navigation (conditional) > `<main class="grow">` > Footer (conditional)

---

## Page Catalog

### `/` -- Homepage (Primary)

| Order | Component | Description |
|-------|-----------|-------------|
| 1 | Hero1 | Centered heading (displayMD), subtitle, 2 buttons, full-width dashboard image (rounded-xl). `pt-32 pb-4`. |
| 2 | LogoCloud1 | Horizontal marquee (`animate-marquee`), 12 brand logos, gradient fade overlay (`from-white via-transparent to-white`). |
| 3 | Feature1 | Code SDK tabs -- 12 language tabs with icons, toggled code panels. Tab bar is horizontally scrollable. |
| 4 | Feature2 | 8 feature cards in `md:grid-cols-2 lg:grid-cols-4 gap-2`. Cards: `bg-sand-100 rounded-xl`, hover: white bg + `shadow-2xl` + icon rotation. |
| 5 | Feature3 | `lg:grid-cols-3`: 2/3 email UI mockup (nested divs simulating app chrome) + 1/3 CustomerCard1 (image overlay). |
| 6 | Feature4 | Two alternating split sections (`md:grid-cols-2 gap-12`). Each: icon + heading + body + CTA button paired with a UI stats card. Second row uses `lg:order-last` to reverse. `gap-24` between sections. |
| 7 | Cta1 | `bg-accent-500 rounded-xl p-8 py-24`. Centered white text (displayLG), muted button. |
| 8 | Pricing1 | 3-tier cards (`lg:grid-cols-3`) with monthly/annual toggle (JS). Full comparison table below (`min-w-[768px]` with horizontal scroll). Toggle uses `translate` animation on slider div. |
| 9 | Testimonial1 | Large centered quote from CustomerCard3. `py-12 lg:py-24`. |
| 10 | LogoCloud1 | Repeated marquee at bottom. |

### `/index-two` -- Alt Homepage

| Order | Component | Description |
|-------|-----------|-------------|
| 1 | Hero2 | 2-column (`lg:grid-cols-3`): 1/3 text left, 2/3 image right. Image bleeds below with `lg:-mb-12`. |
| 2 | LogoCloud2 | Static grid (`sm:grid-cols-3 md:grid-cols-4`), heading "Trusted by..." centered. |
| 3 | Feature6 | Email template tabs (welcome, reset, invite, digest). Left sidebar file list + right code panel (`lg:grid-cols-3`). Browser chrome dots. |
| 4 | Feature7 | 9 feature cards in `md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12`. Centered text, icon with hover rotation. |
| 5 | Cta2 | Light horizontal bar (`bg-sand-100`). `lg:grid-cols-3`: 2-col text left, button right (`lg:ml-auto`). |
| 6 | Pricing2 | 4-tier cards in `md:grid-cols-2` (2x2 grid). Larger display price (displayLG). No comparison table. |
| 7 | Testimonial2 | Single CustomerCard2 with image + text side-by-side. |
| 8 | LogoCloud2 | Repeated at bottom. |

### `/about` -- About Page

| Section | Layout | Content |
|---------|--------|---------|
| Intro | `max-w-xl mx-auto`, `pt-32 pb-12` | Logo in `bg-sand-100 rounded-xl` box, displayMD heading, multi-paragraph body text. |
| Team | `border-t`, centered heading | Full-width team photo (`max-h-150 rounded-xl`). |
| Values | `border-t border-dashed`, `py-12` | `grid-cols-2 gap-8`, 4 value cards (title + paragraph). |
| Investors | `border-t border-dashed`, `py-12` | List of 29 entries (`divide-y divide-base-200`), name left + title right. |
| Blog | `border-t border-dashed`, `py-12` | Header row (heading + "Read all articles" button), 3-column BlogCard grid. |

### `/contact` -- Contact Form

- **Layout:** Split-screen, `hideNav={true} hideFooter={true}`, `flex h-screen`
- **Left (2/3):** `bg-sand-100`, centered form (name, email, textarea), accent submit button, `max-w-md`
- **Right (1/3):** Full-bleed image with `bg-sand-800/50` overlay, logo + tagline in white, `lg:order-first`
- **Inputs:** `ring-1 ring-base-200 rounded-md h-9 shadow-sm`, focus: `ring-accent-100 ring-2 border-accent-500`

### `/sign-in` -- Sign In Form

- **Layout:** Same split-screen as contact, `hideNav={true} hideFooter={true}`
- **Left (2/3):** `bg-sand-50`, email + password fields, "Remember me" checkbox, email + Google sign-in buttons
- **Right (1/3):** Image with `bg-accent-700/50` overlay, logo, inverted `LogoCloud3` marquee at bottom

### `/sign-up` -- Sign Up Form

- Same split-screen pattern as sign-in. Name + email + password fields, Google sign-up option.

### `/404` -- Error Page

- **Layout:** Standard BaseLayout, centered content
- **Container:** `bg-sand-50`, `lg:h-svh` for full viewport height
- **Content:** displayMD heading, body text, 2 buttons: "Go to Homepage" (accent) + "Still lost? Contact us" (muted)

### `/blog` -- Blog Index

- **Header:** displayMD title + subtitle, left-aligned (`max-w-xl text-balance`)
- **Filter bar:** `BlogSearch` button + horizontally scrolling tag pills (`overflow-x-scroll scrollbar-hide snap-x`)
- **Grid:** `mt-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-24`
- **Footer:** `Subscribe` component (newsletter form in `bg-sand-100 rounded-xl`)

### `/blog/posts/[slug]` -- Blog Detail

- **Layout:** `BlogLayout`
- **Header:** Centered title (displaySM) + description, full-width hero image (`max-h-120 rounded-xl`)
- **Content:** Prose wrapper (`max-w-xl mx-auto`), Tailwind Typography plugin styling
- **Author block:** Avatar (size-10 rounded-lg), name, role, date, tag links. Separated by dashed border.
- **Share:** ShareButtons (X, Facebook, LinkedIn, Copy Link) -- text-only buttons
- **Related posts:** Up to 3 BlogCards in 3-column grid, filtered by matching tags

### `/blog/tags` -- Tag Index

- Grid of tags with associated images.

### `/blog/tags/[tag]` -- Filtered Blog

- Same card grid as blog index, filtered to posts matching the selected tag.

### `/changelog` -- Changelog Index

- Vertical stack of `ChangelogCard` components
- Each card: `bg-sand-100 rounded-xl p-8`, `lg:grid-cols-2 items-center gap-12`
- Left: date (uppercase textXS), displaySM title, description, "Read update" accent button
- Right: Full image (`rounded-xl`)

### `/changelog/[slug]` -- Changelog Detail

- `ChangelogLayout`: Title, date, prose content. Standard detail page.

### `/customers` -- Customers Index

- Header section with displayMD title
- Vertical stack of `CustomerCard4` components
- Each card: `bg-sand-100 rounded-xl p-8`, `lg:grid-cols-2`, quote + CTA with animated chevron + image

### `/customers/[slug]` -- Customer Detail

- **Layout:** `CustomersLayout`
- **Breadcrumb:** Pill nav (`bg-sand-100 p-1.5 rounded-full`), ChevronRight separators
- **Header:** displayMD title, about text, details definition list (`divide-y divide-base-200`)
- **Results:** Checklist in `bg-sand-100 rounded-xl` with Check icons
- **Testimonial:** Full-width quote banner (`bg-accent-500 rounded-xl py-24`)
- **Challenges:** 2-column card grid (`md:grid-cols-2`), hover effect matching Feature2 cards
- **Prose content** at bottom

### `/integrations` -- Integrations Index

- Centered header with displayMD title
- **Sticky tag nav:** `lg:sticky lg:top-16 lg:z-10`, anchor links per tag category
- **Sections:** Each tag: serif heading + 3-column IntegrationsCard grid (`lg:grid-cols-3`)
- Cards sorted alphabetically within each tag

### `/integrations/[slug]` -- Integration Detail

- **Layout:** `IntegrationsLayout`
- **Modal:** Permissions connect dialog. Fixed overlay (`bg-sand-950/50`), centered panel (`max-w-lg rounded-xl shadow`). Logo, permissions checklist, cancel/allow buttons. JS: open/close/escape/outside-click.
- **Content:** Breadcrumb, title, description, details list, "Connect" button, prose content

### `/helpcenter` -- Help Center

- Centered header (displayMD)
- `md:grid-cols-2 lg:grid-cols-4 gap-2` HelpCenterCard grid
- Each card: dynamic icon from iconMap (User, Settings, Shield, CreditCard, InfoCircle)
- `Faq1` accordion section at bottom

### `/helpcenter/[slug]` -- Help Article

- `HelpCenterLayout`: Article prose content. Optional FAQ section.

### `/team` -- Team Index

- Centered header (displayMD)
- Grid: `md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8`
- TeamCard: `size-20 rounded-xl` avatar, textBase name, textXS role
- Members sorted alphabetically

### `/team/[slug]` -- Team Profile

- **Layout:** `TeamLayout`
- Centered name (displaySM) + role, social links (Twitter, LinkedIn, Email, Website)
- Full-width portrait image (`max-h-120 rounded-xl`)
- Bio paragraphs
- Related posts grid (filtered by team member slug), up to full collection

### `/legal/[slug]` -- Legal Documents

- `LegalLayout`: Standard prose content page for terms, privacy, etc.

### Design System Pages

| Path | Content |
|------|---------|
| `/system/overview` | Component showcase, theme overview |
| `/system/typography` | Font families, size scale, weight samples |
| `/system/colors` | Accent, sand, base palette swatches |
| `/system/buttons` | All button variants and sizes |
| `/system/links` | Link style variants |

---

## Content Collections

| Collection | Directory | Key Fields |
|------------|-----------|------------|
| `posts` | Blog content | title, description, pubDate, image, tags, team |
| `team` | Team members | name, role, image, bio, socials |
| `customers` | Case studies | customer, testimonial, avatar, about, details, results, challengesAndSolutions, ctaTitle, bgColor |
| `integrations` | Tool integrations | integration, description, logo, tags, details, permissions |
| `helpcenter` | Help articles | page, description, iconId |
| `changelog` | Release notes | page, description, pubDate, image |
| `legal` | Legal docs | Standard markdown |

---

## Layouts Summary

| Layout | File | Used By | Features |
|--------|------|---------|----------|
| BaseLayout | `src/layouts/BaseLayout.astro` | All pages | Nav/Footer toggle, global CSS import |
| BlogLayout | `src/layouts/BlogLayout.astro` | Blog posts | Hero image, prose, author, share, related posts |
| ChangelogLayout | `src/layouts/ChangelogLayout.astro` | Changelog entries | Date, title, prose |
| CustomersLayout | `src/layouts/CustomersLayout.astro` | Customer stories | Breadcrumb, details DL, testimonial banner, challenges grid, prose |
| IntegrationsLayout | `src/layouts/IntegrationsLayout.astro` | Integration pages | Breadcrumb, details DL, connect modal, prose |
| HelpCenterLayout | `src/layouts/HelpCenterLayout.astro` | Help articles | Prose, optional FAQ |
| TeamLayout | `src/layouts/TeamLayout.astro` | Team profiles | Portrait, bio, socials, related posts |
| LegalLayout | `src/layouts/LegalLayout.astro` | Legal pages | Prose only |
