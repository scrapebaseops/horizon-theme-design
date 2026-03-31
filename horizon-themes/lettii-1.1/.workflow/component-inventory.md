# Brightlight v6 -- Component Inventory

Source: `lexington-reference/brightlight_v6_A/src/components/`
Framework: Astro + Tailwind CSS v4

---

## Foundation Components

### Wrapper

- **File:** `fundations/containers/Wrapper.astro`
- **Props:** `variant` ("standard" | "prose"), `class`, `id`
- **Standard variant:** `mx-auto max-w-5xl 2xl:max-w-6xl px-4 2xl:px-12 w-full border-x border-base-200 border-dashed`
- **Prose variant:** Tailwind Typography prose with custom overrides for links (`border-b no-underline hover:border-solid hover:text-accent-500`), headings (`font-medium text-base-800`), blockquotes (`border-l-accent text-base-500`), lists (`[list-style-type:'---'] marker:text-accent-600`), code (`rounded-xl border-base-300 scrollbar-hide`)
- **Renders as:** `<div>` with `<slot />`

### Button

- **File:** `fundations/elements/Button.astro`
- **Props:** `variant` (default | accent | muted | none), `size` (xs | sm | base | md | lg | xl), `gap` (xs | sm | base | md | lg), `isLink` (boolean), `iconOnly` (boolean), `onlyIconSize`, `type`, `class`, spread `...rest`
- **Renders as:** `<a>` when `isLink=true`, otherwise `<button>`
- **Base classes:** `flex items-center justify-center rounded-full transition duration-300 text-center focus:ring-2 focus:outline-none focus:ring-offset-2`
- **Variant styles:**
  - `default`: `bg-black text-white hover:bg-base-700 focus:ring-black`
  - `accent`: `bg-accent-500 text-white hover:bg-accent-600 focus:ring-accent-600`
  - `muted`: `bg-sand-100 text-sand-950 hover:text-accent-500 focus:ring-sand-100`
- **Sizes:** xs (h-8 px-4 text-xs), sm (h-9 px-4 text-sm), base (h-10 px-6 text-base), md (h-11 px-6 text-md), lg (h-12 px-6 text-lg), xl (h-14 px-6 text-base)
- **Icon-only:** Square buttons using `size-*` classes instead of `h-*`
- **Slots:** `left-icon`, default, `right-icon` (standard); `icon` (icon-only mode)
- **Responsive:** Not responsive itself; sizing is static. Wrapping is handled by parent flex containers.

### Link

- **File:** `fundations/elements/Link.astro`
- **Props:** `variant` (default | accent | muted | link), `size` (xxs | xs | sm | base | md | lg | xl), `gap`, `href`, `class`, spread `...rest`
- **Renders as:** `<a>` always
- **Differences from Button:** Always an anchor, adds `xxs` size (h-6 px-6 py-1.5 text-xs), `link` variant strips all base classes and only applies custom classes
- **Same base classes and variant styles as Button**
- **Slots:** `left-icon`, default, `right-icon`

### Text

- **File:** `fundations/elements/Text.astro`
- **Props interface:**
  - `tag`: a | p | em | span | small | strong | blockquote | h1-h6 (default: "p")
  - `variant`: display6XL through displayXS, textXL through textXS (default: "textBase")
  - `id`, `rel`, `style`, `target`, `href`, `title`, `class`, `ariaLabel`
- **Behavior:** Renders as the specified tag with responsive Tailwind text classes. Combines variant classes with custom `class` prop.
- **15 size variants** -- see design-tokens-map.md for the full responsive scale.
- **Slots:** `left-icon`, default, `right-icon`

### ShareButtons

- **File:** `fundations/elements/ShareButtons.astro`
- **Props:** `url`, `title`, `description`, `contentType` ("blog" | "generic")
- **Renders:** 4 text-only buttons (X, Facebook, Linkedin, Link) in `flex flex-wrap gap-4`
- **Button style:** `text-sm text-left text-base-600 hover:text-base-800 duration-300`
- **JS:** Opens share URLs in new windows; copy-link writes to clipboard with checkmark feedback

### Logo

- **File:** `assets/Logo.astro`
- **Props:** `class`, spread `...rest`
- **Renders:** SVG (4-quadrant geometric mark, viewBox 0 0 124 118), uses `currentColor` for fill
- **Common usages:** `h-6 text-base-800` (nav), `h-4 text-base-900` (footer), `h-8 text-base-900` (about page), `h-4 text-white` (auth overlays), `h-12 text-base-800` (mobile menu)

---

## Global Components

### Navigation

- **File:** `global/Navigation.astro`
- **Position:** `fixed inset-x-0 top-0 z-50 w-full bg-white border-b border-dashed border-base-200`
- **Inner Wrapper:** Standard Wrapper with `py-4`
- **Desktop layout (md+):** `flex md:items-center md:justify-between md:flex-row`
  - Left: Logo (`h-6 text-base-800`) linked to `/`
  - Center: Nav links (`text-sm hover:text-base-600 text-base-500`, `flex-row gap-4`)
  - Right: "Buy Brightlight" (muted, xs) + "Sign in" (accent, xs), `flex gap-2`
- **Mobile layout (below md):**
  - Hamburger button: `inline-flex items-center justify-center p-2 text-base-600 hover:text-base-800 md:hidden`
  - Menu overlay: `fixed inset-0 flex flex-col bg-white` with inner panel (`bg-sand-50 border-x border-base-200`)
  - Initial state: `opacity-0 pointer-events-none -translate-y-4`
  - Open state: `opacity-100 translate-y-0 pointer-events-auto`
  - Transition: `transition-all duration-300 ease-in-out`
  - Close button: `absolute top-4 right-4 md:hidden`, SVG X icon (`size-4`)
  - Links: `text-2xl`, logo at `h-12`, buttons at bottom via `mt-auto`
- **JS:** `toggleMenu(open)` function adds/removes opacity, translate, pointer-events classes

### Footer

- **File:** `global/Footer.astro`
- **Outer:** `<footer>` with `border-t border-base-200 border-dashed`
- **Inner:** Standard Wrapper with `py-12`
- **Layout:** `xl:grid xl:grid-cols-3 xl:gap-8`
  - Left column: Logo (`h-4 text-base-900`) + "Brightlight" (`font-serif text-lg text-accent-900`) + tagline (`text-sm text-base-500 text-balance`)
  - Right 2/3: `md:grid-cols-2 xl:grid-cols-4 xl:col-span-2`
  - 4 link groups: heading (`text-black font-display`), links list (`mt-4 text-sm space-y-2 text-base-500`)
  - Link hover: `hover:text-black`

---

## Hero Components

### Hero1 (Centered Text + Image)

- **File:** `heros/Hero1.astro`
- **Dependencies:** Image (astro:assets), Text, Button, Wrapper
- **Wrapper classes:** `pt-32 pb-4`
- **Content container:** `text-center text-balance`
- **Heading:** `Text tag="h1" variant="displayMD"` with `font-serif font-medium tracking-tight text-black`
- **Subtitle:** `Text variant="textBase"` with `max-w-xl mx-auto mt-4 text-base-500`
- **Buttons:** `flex flex-wrap items-center justify-center w-full mt-10 gap-2`
  - "Get started" (accent, sm, isLink)
  - "Start free trial" (muted, sm, isLink)
- **Image:** Astro `<Image>` component, `w-full h-auto mt-8 rounded-xl`

### Hero2 (2-Column Text + Image)

- **File:** `heros/Hero2.astro`
- **Dependencies:** Image (astro:assets), Text, Button, Wrapper
- **Wrapper classes:** `pt-32 pb-4 overflow-hidden`
- **Grid:** `grid grid-cols-1 lg:grid-cols-3 gap-12`
- **Left (1/3):** `flex flex-col justify-between h-full`
  - Same heading/subtitle pattern (left-aligned but `text-center text-balance`)
  - Same button pair
- **Right (2/3):** Image with `lg:col-span-2 lg:-mb-12` (bleeds below container edge)

---

## Feature Components

### Feature1 (Code SDK Tabs)

- **File:** `features/Feature1.astro`
- **Dependencies:** Code (astro:components), Text, Wrapper, 12 icon components
- **Section:** `overflow-hidden`
- **Wrapper:** `pt-12 pb-4 border-t`
- **Header:** Centered `text-center text-balance`, displaySM heading, textBase subtitle
- **Tab bar:** `flex items-center justify-between w-full py-2 mt-12 overflow-x-scroll gap-3 scrollbar-hide`
  - Each tab: `flex flex-col items-center w-full cursor-pointer gap-2`
  - Icon container: `p-2 bg-sand-100 rounded-xl`
  - Active: `opacity-100`, Inactive: `opacity-50 hover:opacity-100`
  - Label: `mt-2 text-xs text-base-500`
- **Code panel:** `mt-8 -m-4 border-t border-base-200 border-dashed`
  - Browser chrome: `p-4 bg-sand-100`, three dots (`size-2 rounded-full` in `#ff421e`, `#60beff`, `#e3962d`)
  - Code block: `<Code>` with `theme="css-variables"`, `text-xs scrollbar-hide`
- **JS:** Tab click toggles `hidden` on content divs, `opacity-50`/`opacity-100` on tab buttons
- **12 languages:** Node.js, Serverless, Ruby, Python, PHP, Go, Rust, Java, Elixir, .NET, REST, SMTP

### Feature2 (8-Card Grid)

- **File:** `features/Feature2.astro`
- **Dependencies:** Text, Wrapper, 8 icon components
- **Wrapper:** `pt-12 pb-4 border-t`
- **Header:** Left-aligned `max-w-xl text-balance`, displaySM heading, textBase subtitle
- **Grid:** `grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2`
- **Card:** `flex flex-col h-full p-4 bg-sand-100 rounded-xl group`
  - **Hover:** `hover:bg-white hover:shadow-2xl duration-300 outline-transparent hover:outline hover:outline-sand-100`
  - Icon container: `inline-flex p-4 bg-white rounded-lg w-fit`
  - **Icon hover:** `group-hover:bg-sand-100 duration-300 group-hover:-rotate-12 group-hover:-translate-y-2`
  - Icon: dynamic component, `text-accent-500`
  - Title: `textSM font-medium text-base-900 mt-12`
  - Description: `textSM text-base-500 mt-2`
- **8 features with icons:** Brain, WaveSquare, Report, Persist, Filters, Code, Stacked, Settings

### Feature3 (UI Mockup + Customer Card)

- **File:** `features/Feature3.astro`
- **Dependencies:** Text, Wrapper, CustomerCard1, getCollection
- **Wrapper:** `pt-12 pb-4 border-t`
- **Header:** Left-aligned, displaySM heading, textBase subtitle
- **Grid:** `grid-cols-1 lg:grid-cols-3 gap-4`
- **Left (2/3):** `p-8 pb-0 overflow-hidden bg-sand-100 lg:col-span-2 lg:p-20 lg:pb-0 rounded-xl`
  - Stacked window chrome: two transparent header bars (`h-2 mx-8`, `h-3 mx-4`) with `bg-white border rounded-t-xl border-sand-500/20`
  - Email compose mockup: `bg-white outline outline-sand-500/10 rounded-xl shadow-sm divide-y divide-sand-500/10`
  - Header row: `bg-sand-50`, "Test" and "Send" buttons (pill-shaped)
  - From/To/Subject fields: `text-xs space-y-4`
  - Body: `contenteditable="true"`, placeholder "Press '/' for commands"
  - Overflow effect: `-mb-[12%]`
- **Right (1/3):** `CustomerCard1` with first customer

### Feature4 (Alternating Split)

- **File:** `features/Feature4.astro`
- **Dependencies:** Text, Button, Wrapper, List/Analytics/UsersGroup icons
- **Wrapper:** `flex flex-col py-12 border-t gap-24`
- **Two sections,** each `grid-cols-1 md:grid-cols-2 gap-12`:
  - **Section 1 (Contact Management):**
    - Left: Icon (`p-4 rounded-lg bg-sand-100`), displaySM heading, textBase subtitle, "Learn more" accent button
    - Right: `p-8 pb-0 pr-0 overflow-hidden bg-sand-100 rounded-xl group`
      - Stats card: `bg-white rounded-tl-xl shadow-sm outline-sand-500/10`
      - 3x3 grid of metric values
      - Icon hover: `group-hover:-rotate-12 group-hover:-translate-y-2 duration-300`
  - **Section 2 (Analytics):**
    - Right side (via `lg:order-last`): Same text pattern with Analytics icon
    - Left side: Two stat cards (Deliverability 98%, Engagement 41%)
    - Colored indicator dots: `size-3 rounded-full group-hover:-translate-x-2 duration-300`
      - Green: `bg-[#5aab69]`, Red: `bg-[#ff421e]`, Blue: `bg-[#60beff]`, Orange: `bg-[#e3962d]`

### Feature5 (Text Only)

- **File:** `features/Feature5.astro`
- **Dependencies:** Text, Wrapper
- **Wrapper:** `pt-12 pb-4 border-t`
- **Content:** Left-aligned `text-balance`, displaySM heading, textBase subtitle. No grid, no image, no CTA.

### Feature6 (Email Template Tabs)

- **File:** `features/Feature6.astro`
- **Dependencies:** Code (astro:components), Text, Wrapper
- **Section:** `overflow-hidden`
- **Wrapper:** `pt-12 pb-4 border-t`
- **Header:** Centered `text-center text-balance`, displaySM heading, textSM subtitle
- **Tab container:** `flex flex-col bg-sand-100 rounded-xl divide-y divide-sand-50`
  - Browser chrome with colored dots
  - Inner grid: `grid-cols-1 lg:grid-cols-3 lg:divide-x lg:divide-sand-50`
  - Left panel: File list buttons (`text-xs text-left cursor-pointer text-base-500 p-4 gap-2`)
  - Right panel (`lg:col-span-2`): Code blocks with `css-variables` theme
- **4 templates:** user-welcome.tsx, reset-password.tsx, user-invite.tsx, weekly-digest.tsx
- **JS:** Same tab toggle pattern as Feature1

### Feature7 (9-Card Grid)

- **File:** `features/Feature7.astro`
- **Dependencies:** Text, Wrapper, 8 icon components (same as Feature2)
- **Wrapper:** `pt-12 pb-4 border-t`
- **Header:** Centered `max-w-xl mx-auto text-center text-balance`, displaySM heading, textBase subtitle
- **Grid:** `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12`, centered text (`text-center`)
- **Card:** `group` wrapper (no background, text-only)
  - Icon: `inline-flex p-4 mx-auto rounded-lg bg-sand-100 group-hover:-rotate-12 group-hover:-translate-y-2 duration-300 w-fit`
  - Icon color: `text-accent-500`
  - Title: `textSM font-medium text-base-900 mt-4`
  - Description: `textSM text-base-500 mt-2`
- **9 features with icons:** Brain, WaveSquare, Report, Persist, Filters, Code, Stacked, Settings (x2)

---

## CTA Components

### Cta1 (Accent Banner)

- **File:** `ctas/Cta1.astro`
- **Dependencies:** Text, Wrapper, Button
- **Outer section:** `border-t border-base-200 border-dashed`
- **Wrapper:** `py-4 lg:border-x lg:border-base-200`
- **Banner:** `p-8 py-24 text-center rounded-xl bg-accent-500`
- **Heading:** displayLG `font-serif font-medium text-white`
- **Subtitle:** textLG `text-white/80`
- **Button:** `flex justify-center mt-8`, muted variant, base size, "Get full access"

### Cta2 (Light Horizontal)

- **File:** `ctas/Cta2.astro`
- **Dependencies:** Text, Wrapper, Button
- **Outer section:** `border-t border-base-200 border-dashed`
- **Wrapper:** `py-4 bg-sand-100`
- **Grid:** `grid-cols-1 lg:grid-cols-3 lg:items-end lg:pt-48 gap-4`
- **Left (2/3):** displaySM heading (`text-base-900 lg:text-balance`), textBase subtitle
- **Right (1/3):** default variant button, sm size, `lg:ml-auto`, links to `#pricing-section`

---

## Pricing Components

### Pricing1 (3-Tier + Comparison Table)

- **File:** `pricing/Pricing1.astro`
- **Dependencies:** Text, Button, Wrapper, Check, X, Minus icons
- **Section:** `id="pricing-section"`, `border-t border-dashed scroll-mt-24`
- **Header:** Centered displayMD heading, textBase subtitle
- **Toggle:**
  - Container: `inline-flex p-1 bg-white shadow ring-1 ring-base-200 ring-offset-2 gap-4 rounded-md w-fit`
  - Slider: `absolute inset-0 w-1/2 bg-base-50 rounded-md transition-transform duration-200 ease-in-out`
  - Buttons: `relative z-10 h-6 px-2 text-xs font-medium transition-colors duration-300`
  - JS: Updates `translateX(0)` or `translateX(100%)`, price data attributes, monthly/annual text visibility
- **Cards:** `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4`
  - Background: `bg-sand-50` or `bg-sand-100`
  - Title: textBase `font-medium text-base-900`
  - Price: displaySM `font-serif font-medium tracking-tighter`
  - Period: `text-sm font-normal`
  - Description: textSM
  - Features: Check icon list with `text-sm gap-y-3`
  - CTA: Full-width Button at bottom
- **Comparison table:** `min-w-[768px] border border-base-200 rounded-xl overflow-hidden`
  - Header: Features | Pro | Scale | Enterprise
  - Category rows: `bg-sand-100 font-medium text-base border-b`
  - Values: X icon (yes), Minus icon (no), or text string
  - Footer: Full-width buttons per column
- **3 tiers:** Pro ($29/$19), Scale ($49/$39), Enterprise ($99/$79)

### Pricing2 (4-Tier 2x2)

- **File:** `pricing/Pricing2.astro`
- **Dependencies:** Text, Button, Wrapper, Check icon
- **Same section/header/toggle as Pricing1**
- **Cards:** `grid-cols-1 md:grid-cols-2 gap-4` (2x2 layout)
  - Larger price: displayLG variant
  - Description: textLG variant
  - Button placed between description and features (not at bottom)
  - No comparison table
- **4 tiers:** Pro ($29/$19), Scale ($49/$39), Enterprise ($99/$79), Elite ($199/$149)

---

## Testimonial and Logo Cloud Components

### Testimonial1 (Large Quote via CustomerCard3)

- **File:** `testimonials/Testimonial1.astro`
- **Dependencies:** Wrapper, CustomerCard3, getCollection
- **Outer:** `border-t border-base-200 border-dashed`
- **Wrapper:** `py-12 lg:py-24`
- **Content:** Renders single `CustomerCard3` from first customer entry

### Testimonial2 (Image Side via CustomerCard2)

- **File:** `testimonials/Testimonial2.astro`
- **Dependencies:** Wrapper, CustomerCard2, getCollection
- **Outer:** `border-t border-base-200 border-dashed`
- **Wrapper:** `py-4`
- **Content:** Renders single `CustomerCard2` from customer at index 2

### LogoCloud1 (Marquee with Gradient Fade)

- **File:** `testimonials/LogoCloud1.astro`
- **Dependencies:** Wrapper, Image, 12 logo SVG imports
- **Wrapper:** `relative overflow-hidden border-t`
- **Marquee:** `flex items-center py-8 animate-marquee gap-12 lg:gap-24 whitespace-nowrap`
- **Logos:** 12 brand SVGs at `h-4`, 200x100 source
- **Fade overlay:** `absolute inset-0 bg-linear-45 from-white via-transparent to-white`

### LogoCloud2 (Static Grid with Heading)

- **File:** `testimonials/LogoCloud2.astro`
- **Dependencies:** Text, Wrapper, Image, 12 logo SVG imports
- **Wrapper:** `relative py-12 overflow-hidden border-t`
- **Heading:** `textSM font-medium text-center text-base-500` -- "Trusted by the world's wierdest brands"
- **Grid:** `grid sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-8 mt-12`, logos at `h-4`

### LogoCloud3 (Bare Marquee)

- **File:** `testimonials/LogoCloud3.astro`
- **No Wrapper** -- directly in `<section class="overflow-hidden">`
- **Marquee:** Same `animate-marquee` pattern, logos at `h-4`
- **Usage:** Inside sign-in/sign-up overlays, wrapped in `invert` class for white-on-dark effect

---

## Customer Card Components

### CustomerCard1 (Full Image Overlay)

- **File:** `customers/CustomerCard1.astro`
- **Props:** `post` (customer collection entry)
- **Layout:** `relative h-full overflow-hidden rounded-xl group`
- **Image:** `absolute inset-0 object-cover w-full h-full`
- **Overlay:** `absolute inset-0 bg-black/40`
- **Content (z-20):** `flex flex-col justify-end h-full p-4`
  - Quote: `textLG font-serif text-white`, wrapped in quotes
  - Name: `textSM text-white mt-2`
- **Link (z-30):** `absolute inset-0`
- **Used in:** Feature3

### CustomerCard2 (Horizontal Quote + Image, 3-col)

- **File:** `customers/CustomerCard2.astro`
- **Props:** `post` (customer collection entry)
- **Layout:** `relative p-8 overflow-hidden bg-sand-100 rounded-xl group`
- **Grid:** `grid-cols-1 lg:grid-cols-3 lg:items-center gap-8`
- **Left (2/3):** `max-w-md mx-auto text-center`
  - Customer name: `textXS font-medium text-base-600`
  - Quote: `displaySM font-serif font-medium tracking-tight text-base-900 text-balance mt-8`
  - CTA title: `textBase text-base-500 mt-4`
  - "Read case study": `textSM font-medium text-base-800 mt-12`, ChevronRight with `group-hover:translate-x-2 duration-300`
- **Right (1/3):** `object-cover size-full rounded-xl aspect-square`
- **Link (z-10):** `absolute inset-0`

### CustomerCard3 (Large Centered Quote)

- **File:** `customers/CustomerCard3.astro`
- **Props:** `post` (customer collection entry)
- **Layout:** `relative text-center group`
- **Content:** `<figure>` with `<blockquote>`, `max-w-xl mx-auto text-balance`
  - Quote: `displayMD font-serif font-medium tracking-tight text-black`
  - CTA: `textBase text-base-500 mt-8`, inline ChevronRight (`size-4`)
- **Link (z-10):** `absolute inset-0`
- **Used in:** Testimonial1

### CustomerCard4 (Horizontal Quote + Image, 2-col)

- **File:** `customers/CustomerCard4.astro`
- **Props:** `post` (customer collection entry)
- **Layout:** `relative p-8 overflow-hidden bg-sand-100 rounded-xl group`
- **Grid:** `grid-cols-1 lg:grid-cols-2 lg:items-center gap-8`
- **Left (1/2):** Same content pattern as CustomerCard2 but with `textXL` quote size
- **Right (1/2):** `object-cover size-full rounded-xl aspect-square`
- **Link (z-10):** `absolute inset-0`
- **Used on:** `/customers` index page

---

## FAQ Component

### Faq1 (Native Accordion)

- **File:** `faqs/Faq1.astro`
- **Dependencies:** Text, Wrapper
- **Outer:** `border-t border-base-200 border-dashed`
- **Wrapper:** `pt-12 pb-4`
- **Header:** `max-w-xl mx-auto text-center text-balance`, displaySM heading, textBase subtitle
- **Accordion container:** `relative w-full mx-auto mt-12 space-y-4`
- **Each item:** `<details class="text-left cursor-pointer group">`
  - Summary: `flex items-center justify-between w-full pb-1 text-left select-none text-base-600 hover:text-accent-500`
  - Toggle icon: Plus SVG (`w-5 h-5 text-accent-500`), `group-open:-rotate-45 duration-300 ease-out`
  - Answer: `py-4 pt-2 text-base-500`
- **No JavaScript required** -- uses native HTML5 details/summary

---

## Blog Components

### BlogCard

- **File:** `blog/BlogCard.astro`
- **Props:** `post` (posts collection entry)
- **Layout:** `<article class="relative">`
- **Image:** `object-cover w-full aspect-12/8 rounded-xl`, 600x600 source
- **Content:** `flex flex-col mt-4`
  - Date: `textXS uppercase text-base-500`
  - Title: `textSM font-medium text-base-900 text-balance mt-4`
  - Description: `textSM text-base-500 line-clamp-2 lg:text-balance mt-2`
- **Link:** `absolute inset-0 z-10` (full-card clickable)
- **Data extraction:** URL from `post.id`, formatted date via `toLocaleDateString`

### BlogSearch (Modal + Fuse.js)

- **File:** `blog/BlogSearch.astro`
- **Dependencies:** getCollection, X icon, Search icon
- **Trigger button:** `flex items-center justify-center p-2 rounded-full bg-sand-100 hover:bg-accent-500 hover:text-white duration-300`
- **Modal container:** `fixed inset-0 z-50 hidden overflow-y-auto`
  - Overlay: `fixed inset-0 bg-base-950/50 backdrop-blur transition-opacity`
  - Panel: `relative inline-block w-full max-w-md mt-12 lg:mt-48 bg-sand-100 rounded-xl`
  - Input: `block w-full px-4 py-2 text-xs h-9 rounded-md ring-1 ring-base-200 shadow-sm focus:border-accent-500 focus:ring-accent-100 focus:ring-2`
  - Results container: `flex flex-col w-full mt-2 bg-white max-h-200 rounded-xl scrollbar-hide`
  - Each result: `block p-4 m-1 rounded-lg hover:bg-sand-100 duration-300`
- **JS (inline):**
  - Fuse.js search: `threshold: 0.3`, keys: title, description, content
  - Top 5 results displayed
  - Open: removes `hidden`, sets `body overflow: hidden`
  - Close: on overlay click, Escape key, close button
  - Live search: `input` event triggers Fuse search and re-render

### Subscribe (Newsletter CTA)

- **File:** `blog/Subscribe.astro`
- **Dependencies:** Text, Wrapper, Button
- **Outer:** `border-t border-base-200 border-dashed`
- **Inner:** `p-8 py-24 text-center rounded-xl bg-sand-100`
- **Heading:** displaySM `font-serif font-medium text-base-900 lg:text-balance`
- **Subtitle:** textBase `text-base-500 lg:text-balance`
- **Form:** `max-w-md mx-auto mt-10 space-y-4`
  - Email input (standard input pattern)
  - Submit: Button base size, accent variant, "Send Message"

---

## Content Card Components

### ChangelogCard

- **File:** `changelog/ChangelogCard.astro`
- **Props:** `post` (changelog collection entry)
- **Layout:** `p-8 bg-sand-100 rounded-xl`
- **Grid:** `grid-cols-1 lg:grid-cols-2 items-center gap-12`
- **Left:** `max-w-md text-balance text-center mx-auto`
  - Date: `textXS uppercase text-base-500`
  - Title: `displaySM font-serif font-medium tracking-tight text-base-900 mt-8`
  - Description: `textSM text-base-500 line-clamp-2 lg:text-balance mt-2`
  - Button: accent sm isLink, `w-fit mt-8 mx-auto`, "Read update"
- **Right:** Image `object-cover object-center size-full rounded-xl`

### IntegrationsCard

- **File:** `integrations/IntegrationsCard.astro`
- **Props:** `post` (integrations collection entry)
- **Layout:** Same hover card pattern as Feature2
- **Style:** `relative flex flex-col h-full p-4 bg-sand-100 rounded-xl group hover:bg-white hover:shadow-2xl duration-300 outline-transparent hover:outline hover:outline-sand-100`
- **Logo container:** `inline-flex p-4 bg-white rounded-lg group-hover:bg-sand-100 duration-300 group-hover:-rotate-12 group-hover:-translate-y-2 w-fit`
- **Logo image:** `size-8`, from `post.data.logo.url`
- **Title:** `textSM font-medium text-base-900 mt-12`
- **Description:** `textSM text-base-500 mt-2`
- **Link (z-10):** `absolute inset-0`

### HelpCenterCard

- **File:** `helpcenter/HelpCenterCard.astro`
- **Props:** `post` (helpcenter collection entry)
- **Layout:** Same hover card pattern
- **Icon:** Dynamic from `iconMap` based on `iconId` prop: User, Settings, Shield, CreditCard (default: InfoCircle)
  - Container: `inline-flex p-4 bg-white rounded-lg group-hover:bg-sand-100 duration-300 group-hover:-rotate-12 group-hover:-translate-y-2 w-fit`
- **Content:** `relative flex flex-col justify-between h-full gap-8`
  - Title: `textSM font-medium text-base-900 mt-12`
  - Description: `textSM text-base-500 mt-2`
- **Link (z-10):** `absolute inset-0`

### TeamCard

- **File:** `team/TeamCard.astro`
- **Props:** `post` (team collection entry)
- **Layout:** `relative flex flex-col items-center text-center gap-2`
- **Avatar:** `object-cover size-20 rounded-xl` (80px square with rounded corners), 800x800 source
- **Name:** `textBase font-medium text-base-900`
- **Role:** `textXS text-base-500`
- **Link (z-10):** `absolute inset-0`

---

## Icon Components

**Directory:** `fundations/icons/`

All icons share the same pattern:
- **Props:** `size`, `class`, spread `...rest`
- **Renders as:** `<svg>` using `currentColor` for stroke/fill
- **Sizing:** Controlled by parent or `size` prop mapped to Tailwind size classes

### Complete Icon List

| Icon | File | Primary Usage |
|------|------|---------------|
| Analytics | `Analytics.astro` | Feature4 analytics section |
| Brain | `Brain.astro` | Feature2 "Test Mode", Feature7 "Blocklist Radar" |
| Check | `Check.astro` | Pricing feature lists, customer results checklists |
| ChevronRight | `ChevronRight.astro` | Breadcrumbs, "Read case study" CTAs |
| Code | `Code.astro` | Feature2 "Markup Freedom", Feature7 "DNS Monitoring" |
| CreditCard | `CreditCard.astro` | HelpCenterCard icon variant |
| Elixir | `Elixir.astro` | Feature1 Elixir language tab |
| Filters | `Filters.astro` | Feature2 "Open & Click Tracking", Feature7 "Suppression" |
| Go | `Go.astro` | Feature1 Go language tab |
| GoogleColor | `GoogleColor.astro` | Sign-in/sign-up Google auth button |
| InfoCircle | `InfoCircle.astro` | HelpCenterCard default icon |
| Java | `Java.astro` | Feature1 Java language tab |
| List | `List.astro` | Feature4 "Contact Management" section |
| Minus | `Minus.astro` | Pricing1 comparison table "no" value |
| Net | `Net.astro` | Feature1 .NET language tab |
| Node | `Node.astro` | Feature1 Node.js language tab |
| Persist | `Persist.astro` | Feature2 "Retry Logic", Feature7 "Dedicated IPs" |
| Php | `Php.astro` | Feature1 PHP language tab |
| Plus | `Plus.astro` | Available (not directly used in reviewed components) |
| Python | `Python.astro` | Feature1 Python language tab |
| Report | `Report.astro` | Feature2 "Live Logs", Feature7 "BIMI Badging" |
| Rest | `Rest.astro` | Feature1 REST language tab |
| Ruby | `Ruby.astro` | Feature1 Ruby language tab |
| Rust | `Rust.astro` | Feature1 Rust language tab |
| Search | `Search.astro` | BlogSearch trigger button |
| Serverless | `Serverless.astro` | Feature1 Serverless language tab |
| Settings | `Settings.astro` | Feature2 "Custom Domains", Feature7 "Infrastructure", HelpCenterCard |
| Shield | `Shield.astro` | HelpCenterCard icon variant |
| Smtp | `Smtp.astro` | Feature1 SMTP language tab |
| Stacked | `Stacked.astro` | Feature2 "Inbox Previews", Feature7 "Verify Everything" |
| User | `User.astro` | HelpCenterCard icon variant |
| UsersGroup | `UsersGroup.astro` | Feature4 audience stats card |
| WaveSquare | `WaveSquare.astro` | Feature2 "Webhooks", Feature7 "Global Delivery" |
| X | `X.astro` | Pricing1 comparison table "yes" value, BlogSearch close |

---

## Shared Visual Patterns

### Standard Card Hover Effect

Used on Feature2, IntegrationsCard, HelpCenterCard, CustomersLayout challenges:

```
Default:  bg-sand-100 rounded-xl
Hover:    hover:bg-white hover:shadow-2xl duration-300
          outline-transparent hover:outline hover:outline-sand-100
```

Icon within card:
```
Default:  inline-flex p-4 bg-white rounded-lg w-fit
Hover:    group-hover:bg-sand-100 duration-300
          group-hover:-rotate-12 group-hover:-translate-y-2
```

### Standard Section Header

```
Section:  border-t border-base-200 border-dashed
Wrapper:  pt-12 pb-4
Heading:  Text variant="displaySM" class="font-serif font-medium tracking-tight text-black"
Subtitle: Text variant="textBase" class="mt-4 text-base-500"
Options:  max-w-xl, text-center, text-balance
```

### Full-Card Link Overlay

Used on BlogCard, TeamCard, CustomerCard1-4, IntegrationsCard, HelpCenterCard:

```html
<a class="absolute inset-0 z-10" href={url} title={name} aria-label={name}></a>
```

### Browser Chrome Mockup

Used in Feature1 and Feature6 code viewers:

```
Container: p-4 bg-sand-100
Dots:      flex items-center gap-1
           size-2 rounded-full bg-[#ff421e]
           size-2 rounded-full bg-[#60beff]
           size-2 rounded-full bg-[#e3962d]
```

### Breadcrumb Navigation

Used in CustomersLayout and IntegrationsLayout:

```
Container: nav bg-sand-100 p-1.5 rounded-full px-6 w-fit
List:      ol flex items-center text-xs gap-2 text-base-500
Link:      text-xs font-medium hover:text-accent-500 text-base-800
Current:   text-xs font-medium text-accent-500
Separator: ChevronRight size="sm" in text-base-400
```

### Standard Input Style

Used across contact, sign-in, sign-up, subscribe, BlogSearch:

```
block w-full px-4 py-2 text-xs leading-tight align-middle
bg-white border border-transparent h-9 rounded-md
text-base-500 ring-1 ring-base-200 placeholder-base-400
shadow-sm transition duration-300 ease-in-out
focus:z-10 focus:border-accent-500 focus:ring-accent-100
focus:ring-2 focus:outline-none
```
