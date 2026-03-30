# Page Spec: Collection Page

## Template: `collection`
## URL Pattern: `/collections/{{collection.handle}}`
## Priority: High (25% of conversions touch a collection page before purchase)

---

## Page Metadata

- **Title tag**: `{{collection.title}} | Lettii Cordless LED Table Lamps`
- **Meta description**: `{{collection.description | truncate: 155}}` (falls back to collection description set in Shopify admin)
- **OG image**: `{{collection.image}}` (lifestyle hero for the collection)
- **Canonical**: `/collections/{{collection.handle}}`
- **JSON-LD**: `CollectionPage` schema with product list

## Target Audience

- **Primary**: Style-conscious women 28-45, arriving from Meta/Google ads or homepage navigation. They are browsing by setting ("I need dining table lighting") or by style ("I love that mushroom shape").
- **Secondary**: Return visitors comparing options, gift shoppers browsing for ideas, B2B buyers browsing the Restaurants & Bars collection.

## Dynamic Data Sources

| Variable | Source | Notes |
|----------|--------|-------|
| `collection.title` | Shopify admin | Set per collection |
| `collection.description` | Shopify admin | 1-2 sentence intro in brand voice |
| `collection.image` | Shopify admin | Lifestyle hero image per collection |
| `collection.products` | Shopify product assignments | Products assigned to this collection |
| `collection.products_count` | Shopify | Used for empty state logic |
| `product.title` | Shopify admin | Product name |
| `product.price` | Shopify admin | Current price |
| `product.compare_at_price` | Shopify admin | Original price (for bundles/sales) |
| `product.images` | Shopify admin | Lifestyle product images |
| `product.available` | Shopify inventory | In-stock status |
| `product.tags` | Shopify admin | Used for badges ("bundle", "new", "bestseller") |
| `product.variants` | Shopify admin | Colour swatches from variant options |
| `product.metafields.reviews.rating` | Review app metafield | Star rating (when available) |

---

## Page Sections

---

### Section 1: Collection Hero

**Shopify Section Type**: `collection-hero` (custom section)
**Purpose**: Establish the collection's mood, orient the visitor, and provide a lifestyle-first entry point that reinforces the setting or style theme. This is the "magazine cover" for each collection.

**Draft Content**:
The hero is entirely data-driven. Every collection uses this same template, pulling its image and copy from the collection object in Shopify admin.

*Setting collection examples (merchant enters these in Shopify admin as collection description):*

- **Dining & Entertaining**: "The dinner party lamp. Warm light that flatters everything — the food, the table, and you."
- **Bedroom & Bedside**: "The softest light in the room. No cord. No glare. Just warmth where you want it."
- **Garden & Outdoor**: "Take the glow outside. IP54 waterproof, 12-hour battery, and nothing to plug in."
- **Restaurants & Bars**: "The lamp behind every great table. Cordless, rechargeable, designed for service."

*Style collection examples:*

- **Mushroom & Dome**: "The shape that started it all. Soft curves, warm glow, fits everywhere."
- **Slim & Modern**: "Clean lines, small footprint. The lamp that disappears until you turn it on."
- **Crystal & Glass**: "Catch the light. Cut glass and crystal facets that scatter warmth across the table."

*Featured collection examples:*

- **All Lamps**: "Every lamp. Every style. One touch to find the one."
- **Sets & Bundles**: "More lamps, more savings. Sets designed for real tables and real rooms."
- **Gifts**: "Give the glow. Lamps and gift cards that arrive ready to unwrap."

**Content Sources**:
- Hero image: `{{collection.image}}` — dynamic, set per collection in Shopify admin
- Heading: `{{collection.title}}` — dynamic
- Intro text: `{{collection.description}}` — dynamic, 1-2 sentences set per collection in Shopify admin
- All content is merchant-editable via collection settings. Nothing is hardcoded in the template.

**Configurable Settings**:
- Hero overlay opacity (range 0-100, default 30)
- Text alignment (left / centre, default left)
- Text colour (light / dark, default light)
- Hero image height (small / medium / large, default medium)
- Show/hide description text (toggle, default on)

**Responsive Notes**:
- **Desktop**: Full-width hero image, 50vh height. Title as H1 in large serif or display font. Description underneath in body copy. Text positioned left with overlay gradient for readability.
- **Mobile**: Full-width hero, 40vh height. Title and description centred. Tighter text sizing. Image cropped to focal point via Shopify `img_url` focal point parameter.

**Media Requirements**:
- [MERCHANT: One lifestyle hero image per collection, 2400x1200px minimum, landscape orientation, showing lamps in the relevant setting. Must have enough negative space or dark area on one side for text overlay.]
- Alt text: `{{collection.title}} — Lettii cordless LED table lamps`

---

### Section 2: Trust Bar

**Shopify Section Type**: `trust-bar` (shared section, reusable across pages)
**Purpose**: Immediate credibility reinforcement below the hero. Particularly important for ad-driven visitors landing on a collection page who have no brand familiarity.

**Draft Content**:
Four trust icons in a horizontal strip:

1. **30-Day Guarantee** — "Love it or return it. Free."
2. **Free UK Shipping** — "On orders over £50"
3. **12-Hour Battery, USB-C** — "One charge. All evening."
4. **Free Returns** — "No questions asked."

**Content Sources**: Static (hardcoded in section schema with merchant-editable text)

**Configurable Settings**:
- Number of trust points (1-6, default 4)
- Each trust point: icon, heading text, subtext
- Background colour (default: warm neutral)
- Show/hide toggle

**Responsive Notes**:
- **Desktop**: Single horizontal row, 4 items evenly spaced
- **Mobile**: 2x2 grid or horizontally scrollable strip. Compact icon size.

**Media Requirements**:
- SVG icons for each trust point (guarantee shield, delivery truck, battery, return-arrow)

---

### Section 3: Filter & Sort Bar

**Shopify Section Type**: `collection-filter-sort` (custom section)
**Purpose**: Allow visitors to narrow products by style, colour, or price without leaving the collection. Filters use chip/pill UI (not dropdown menus) for quick, visible filtering.

**Draft Content**:

Filter chips:
- **Style**: Mushroom & Dome | Slim & Modern | Lantern & Shade | Sculptural | Geometric | Crystal & Glass
- **Colour**: White | Black | Gold | Brass | Green | Blue (pulled from product variant option values)
- **Price**: Under £50 | £50-£100 | Over £100
- **Type**: Singles | Sets & Bundles (via product tag)

Sort options:
- Featured (default)
- Price: Low to High
- Price: High to Low
- Newest

Active filters display as removable pills with an "x" and a "Clear all" link.

**Content Sources**:
- Filter values: Dynamic from `collection.products` tags, variant options, and price ranges
- Sort options: Static, defined in section schema
- "Featured" sort order: Manual sort order set in Shopify admin per collection

**Configurable Settings**:
- Which filter groups to show (toggles for style, colour, price, type)
- Default sort order
- Filter style: chips vs. dropdown (default chips)
- Sticky filter bar on scroll (toggle, default on for desktop)

**Responsive Notes**:
- **Desktop**: Horizontal filter chip bar below hero. Sort dropdown aligned right. Sticky on scroll so filters remain accessible while browsing. Compact single row, wrapping to second row if many filters active.
- **Mobile**: Collapsed behind a "Filter & Sort" button. Tapping opens a bottom sheet / slide-up drawer with filter groups as expandable accordions and sort options. Active filter count shown on button badge. "Apply" button at bottom of drawer.

**Media Requirements**: None (text and icons only)

---

### Section 4: Product Grid

**Shopify Section Type**: `collection-product-grid` (custom section)
**Purpose**: The core browsing surface. Lifestyle product cards that sell atmosphere, not specs. Each card should feel like a page from a lifestyle magazine, not a product catalog.

**Draft Content**:

Each product card contains:

1. **Product image**: Lifestyle shot (lamp in setting, not on white background)
2. **Quick-add overlay**: Appears on hover (desktop) or as persistent button (mobile). If product has multiple colour variants, shows colour selector before add.
3. **Product name**: `{{product.title}}` — e.g. "The Marlo" / "Dinner Party Set of 4"
4. **Price**: `{{product.price}}` formatted as "£49" or for bundles: "~~£156~~ £119 — Save £37"
5. **Star rating**: `{{product.metafields.reviews.rating}}` shown as filled stars only when rating exists. Hidden at launch until reviews are collected.
6. **Colour swatches**: Small circles showing available colours, pulled from `{{product.variants}}` colour option. Max 5 visible + "+2 more" overflow.
7. **Badges** (conditional, based on product tags):
   - `bundle` tag: "SET" badge (top-left, brand accent colour)
   - `bundle` tag + compare_at_price: "Save {{savings_percentage}}%" badge
   - `new` tag: "NEW" badge
   - `bestseller` tag: "BEST SELLER" badge
   - `!product.available`: "SOLD OUT" badge (greyed card)

*Bundle card example:*
- Image: Four Marlo lamps on a laid dinner table, candles and plates surrounding them
- Badge: "SET — Save 24%"
- Title: "Dinner Party Set of 4"
- Price: "~~£156~~ £119"
- Swatches: White, Brass, Black

*Single lamp card example:*
- Image: The Marlo lamp on a bedside table, soft evening light, book and glasses nearby
- Title: "The Marlo"
- Price: "£39"
- Swatches: White, Black, Gold, Brass, Green

**Content Sources**:
- All product data is dynamic from Shopify product objects
- Badge logic is driven by product tags and compare_at_price
- Image is `{{product.images.first}}` (merchant must ensure first image is lifestyle)

**Configurable Settings**:
- Columns: desktop (3 or 4, default 4), mobile (1 or 2, default 2)
- Image aspect ratio (portrait / square / landscape, default portrait 3:4)
- Show/hide star rating (toggle, default on)
- Show/hide colour swatches (toggle, default on)
- Show/hide quick-add (toggle, default on)
- Badge style (pill / rectangle, default pill)
- Bundle cards span 2 columns on desktop (toggle, default off — merchant enables per preference)
- Products per page before "Load more" (default: all / 24 / 48)

**Responsive Notes**:
- **Desktop**: 3-4 column grid. Generous image space (image is ~70% of card height). Hover state shows quick-add button overlaying bottom of image. Cursor change on hover. Bundle cards optionally span 2 columns for visual prominence.
- **Mobile**: 2 columns. Cards stack neatly with consistent gutters. Quick-add is a small persistent cart icon button on card (not hover-dependent). Swatches are smaller but still tappable (min 32px touch target). Vertical scroll, no horizontal carousel.

**Media Requirements**:
- [MERCHANT: Every product must have a lifestyle image as its first image. Recommended 1200x1600px (3:4 portrait). Lamps shown in real settings, warm lighting, styled scenes. Not product-on-white.]
- Badge icons are CSS/text only, no image assets needed.

---

### Section 5: Editorial Interrupt Banner

**Shopify Section Type**: `collection-editorial-banner` (custom section, inserted into product grid)
**Purpose**: Break up the product grid with full-width lifestyle content that deepens the brand story, promotes bundles or lookbook content, and prevents "catalog fatigue." Appears every 6-8 products.

**Draft Content**:

*Example interrupt for a setting collection (Dining & Entertaining):*
- Image: Wide shot of a beautifully set dinner table at dusk, four Lettii lamps glowing, wine glasses catching the light
- Headline: "Set the table. Set the mood."
- Body: "Four lamps. One dinner party. See how the Dinner Party Set transforms your table."
- CTA: "Shop the Set" → links to Dinner Party Set PDP

*Example interrupt for a style collection (Mushroom & Dome):*
- Image: Close-up lifestyle of mushroom lamp in a restaurant setting
- Headline: "The shape everyone's asking about."
- Body: "Mushroom lamps are having a moment. Here's why."
- CTA: "Read the Guide" → links to Styling Ideas page

*Example interrupt promoting bundles:*
- Image: Two lamps side by side on a console table, different colours
- Headline: "Better in pairs. Better value."
- Body: "Save up to 25% when you buy a set. Mix colours, match settings."
- CTA: "Shop Sets & Bundles" → links to Sets & Bundles collection

**Content Sources**: Static (merchant-configurable per collection via section blocks)

**Configurable Settings**:
- Number of editorial banners (0-3 per collection, default 1)
- Position in grid: after product N (default: after product 6)
- Per banner block:
  - Image upload
  - Headline text
  - Body text (optional)
  - CTA text
  - CTA link (URL picker)
  - Text alignment (left / centre / right)
  - Overlay opacity
  - Text colour (light / dark)

**Responsive Notes**:
- **Desktop**: Full-width banner spanning all grid columns. 16:9 or 21:9 aspect ratio. Text overlay on image, positioned left or centre. Min-height 300px.
- **Mobile**: Full-width, taller aspect ratio (4:3 or 1:1). Text below image or overlaid with heavier gradient for readability. CTA button full-width.

**Media Requirements**:
- [MERCHANT: Lifestyle banner image per interrupt, 2400x800px minimum (desktop), with focal point metadata for mobile crop. Should feel editorial, not promotional — magazine quality.]

---

### Section 6: B2B Hospitality Banner (Conditional)

**Shopify Section Type**: `collection-b2b-banner` (custom section)
**Purpose**: Appears ONLY on the "Restaurants & Bars" collection. Provides a clear entry point for B2B hospitality buyers without cluttering the consumer browsing experience. This is the "quiet door" to the hospitality enquiry flow.

**Draft Content**:

- Headline: "Lighting 10 tables or 100?"
- Body: "We work with restaurants, bars, hotels, and event venues across the UK. Volume pricing, dedicated support, and lamps designed for nightly service."
- CTA: "Get a Hospitality Quote" → links to `/pages/hospitality`
- Secondary link: "Or order a sample at retail price" → links to All Lamps collection

**Content Sources**: Static (merchant-editable text and link)

**Configurable Settings**:
- Show/hide (toggle, default off — merchant enables only on Restaurants & Bars collection)
- Headline, body text, CTA text, CTA link, secondary link text, secondary link URL
- Background colour or image
- Position: above product grid / below product grid / after product N (default: below product grid)

**Responsive Notes**:
- **Desktop**: Full-width banner with subtle background (warm neutral or muted lifestyle image). Text left-aligned with CTA button. Not overpowering — it should feel like a helpful aside, not a hard sell.
- **Mobile**: Stacked layout. Headline, body, CTA button (full-width), secondary text link below.

**Media Requirements**:
- Optional: subtle background lifestyle image of lamps in a restaurant setting, 2400x600px. Can also work as a solid colour background with no image.

---

### Section 7: Empty Collection State

**Shopify Section Type**: Built into `collection-product-grid` section (conditional render when `collection.products_count == 0`)
**Purpose**: Graceful handling when a collection has no products (new collection not yet populated, filtered results empty, or seasonal collection temporarily unavailable).

**Draft Content**:

*Empty collection:*
- Heading: "This collection is on its way."
- Body: "We're adding new lamps all the time. In the meantime, take a look around."
- CTA 1: "Browse All Lamps" → `/collections/all-lamps`
- CTA 2: "Shop Sets & Bundles" → `/collections/sets-bundles`

*No filter results:*
- Heading: "No matches for those filters."
- Body: "Try removing a filter, or explore the full collection."
- CTA: "Clear Filters" → clears all active filters

**Content Sources**: Static (merchant-editable text)

**Configurable Settings**:
- Empty state heading text
- Empty state body text
- CTA 1 text and link
- CTA 2 text and link (optional)

**Responsive Notes**:
- **Desktop**: Centred text block with CTAs as buttons, moderate whitespace. Not dramatic — just helpful.
- **Mobile**: Same layout, full-width buttons stacked vertically.

**Media Requirements**: None

---

### Section 8: "Load More" / Pagination

**Shopify Section Type**: Built into `collection-product-grid` section
**Purpose**: Not needed at launch with ~20 SKUs, but included as a future-proof pattern if the catalog grows. "Load more" button (not numbered pagination) to maintain scrolling momentum.

**Draft Content**:

- Button text: "Show More Lamps"
- Results count: "Showing {{visible_count}} of {{collection.products_count}} lamps"

**Content Sources**: Dynamic (product count from collection object)

**Configurable Settings**:
- Products per page (12 / 24 / 48 / all, default all)
- Pagination style: load more button / infinite scroll / numbered pages (default: load more)
- Show/hide product count (toggle, default on)

**Responsive Notes**:
- **Desktop**: Centred button below grid. Product count as small text above button.
- **Mobile**: Full-width button. Same count text.

**Media Requirements**: None

---

## Shared Components Used on This Page

| Component | Description | Also Used On |
|-----------|-------------|-------------|
| Trust Bar | 4-icon trust signal strip | Homepage, Product, Cart, Search |
| Product Card | Lifestyle image, name, price, swatches, rating, badges, quick-add | Search, Homepage featured products |
| Quick-Add Drawer | Colour selector + ATC that appears from product card interaction | Search, Homepage |
| Announcement Bar | Rotating trust messages in site header | All pages (global) |
| Site Header | Logo, navigation, search, cart icon | All pages (global) |
| Site Footer | Navigation columns, email signup, social links, payment icons | All pages (global) |

---

## SEO Considerations

- **H1**: `{{collection.title}}` — one per page, rendered in the hero section
- **Internal linking**: Editorial interrupt banners link to related collections, lookbook, and bundle PDPs. Product cards link to individual PDPs.
- **Collection descriptions**: Each collection's description (set in Shopify admin) serves as the on-page SEO content. Merchants should write 1-2 sentences of natural, keyword-aware copy.
- **Image alt text**: Product cards use `{{product.title}} — Lettii cordless LED table lamp` pattern. Hero image uses `{{collection.title}} collection — Lettii`
- **URL structure**: Clean `/collections/dining-entertaining` handles (set in Shopify admin)
- **Structured data**: `CollectionPage` JSON-LD with `ItemList` of products, including price, availability, and rating where available

---

## Accessibility Requirements

- **Filter chips**: Keyboard navigable, `role="checkbox"` or toggle button pattern, visible focus states, `aria-pressed` state for active filters
- **Product cards**: Each card is a single link wrapping the image and title. Price, badges, and swatches are inside the link with appropriate aria labels. Quick-add button is a separate focusable element.
- **Quick-add**: Focus trapped within quick-add overlay when open. Escape key closes. Screen reader announcement on successful add to cart.
- **Sort dropdown**: Native `<select>` element or custom dropdown with `role="listbox"` and keyboard support
- **Images**: All images have descriptive alt text. Hero image alt includes collection name. Decorative elements use `alt=""`
- **Colour swatches**: Each swatch has a text label (visible on hover, always available to screen readers). Not colour-only — include colour name as `aria-label`.
- **Empty state**: Focusable CTA buttons with clear link text (no "click here")
- **Motion**: Hover animations respect `prefers-reduced-motion` media query

---

## Open Decisions

| Decision | Options | Recommendation | Status |
|----------|---------|----------------|--------|
| Desktop grid columns | 3 vs 4 | 4 columns — more products visible, lifestyle images still generous at this size. Merchant-configurable. | Recommended |
| Bundle card 2-col span | Always / never / merchant toggle | Merchant toggle, default off. Let merchant test whether prominence helps bundle conversion. | Recommended |
| Filter bar sticky behaviour | Sticky on scroll vs. static | Sticky on desktop, collapsed on mobile with filter button. Keeps filters accessible during browsing. | Recommended |
| Editorial interrupt frequency | Every 4-6 / 6-8 / 8-12 products | After product 6 as default. With ~20 SKUs, one interrupt per collection feels right. Merchant can add more. | Recommended |
| Star ratings at launch | Show / hide | Hide until review app is connected and products have 5+ reviews. Merchant toggle. | Recommended |
| Load more vs. show all | Paginate at 24 / show all | Show all at launch (sub-20 SKUs). Switch to load-more at 24 if catalog grows past 30. | Recommended |

---

## Complexity Estimate

| Aspect | Rating | Notes |
|--------|--------|-------|
| Template logic | Medium | Single template serving 16+ collections. Conditional B2B banner, editorial interrupts inserted into grid, badge logic from tags. |
| Content entry | Low | Hero image and description per collection in Shopify admin. Editorial banners configured in theme customizer. |
| Custom sections | Medium | Collection hero, filter bar, product grid with interrupt insertion, B2B banner, editorial banner — 5 custom sections. |
| Interactivity | Medium | Quick-add with variant selection, filter chips with dynamic product filtering (JS), sort, load-more. |
| Media production | Medium-High | Lifestyle hero image per collection (16+), lifestyle product images for every SKU, editorial banner images. |
| Overall | Medium | Straightforward collection template with lifestyle-forward design choices. The filter/sort interaction and editorial interrupt insertion are the main technical considerations. |
