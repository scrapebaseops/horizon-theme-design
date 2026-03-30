# Page Spec: Product Page

## Page Metadata

| Field | Value |
|-------|-------|
| **Template** | `product` (Shopify JSON template) |
| **URL Pattern** | `/products/{handle}` |
| **Primary Section** | `product-information` (Horizon theme native) |
| **Supporting Sections** | `custom-liquid`, `media-with-content`, `product-recommendations`, `product-list` |
| **Priority** | Highest — primary conversion surface for the entire store |
| **Serves Double Duty** | Single lamps AND bundles use this template (bundles add "What's Included" block via metafield/tag logic) |

---

## Target Audience & Intent

| Segment | Entry Path | Intent | Conversion Goal |
|---------|-----------|--------|-----------------|
| Cold ad traffic (60%) | Meta/Google ad click | Saw one lifestyle image, curious, zero brand awareness | Add to Cart (single or bundle) |
| Collection browsers (25%) | Collection page card click | Browsing setting or style category, comparing options | Add to Cart or upgrade to bundle |
| Direct / returning (15%) | Bookmark, Google brand search, email | Returning to complete purchase or browse new products | Add to Cart, upgrade, or buy again |

**Critical context**: This page must simultaneously introduce the brand, overcome objections, and close the sale. For 60% of visitors, this is the first and only Lettii page they will see.

---

## Dynamic Data

| Variable | Source | Usage |
|----------|--------|-------|
| `product.title` | Shopify product | H1, sticky bar, meta title |
| `product.description` | Shopify product (HTML) | Narrative description block |
| `product.price` | Shopify product | Price display, sticky bar |
| `product.compare_at_price` | Shopify product | Strikethrough pricing on bundles/sales |
| `product.images` | Shopify product | Gallery (5–8 images per product) |
| `product.variants` | Shopify product | Colour swatches, availability |
| `product.available` | Shopify product | ATC enabled/disabled, sold-out state |
| `product.type` | Shopify product | Bundle vs single lamp logic |
| `product.tags` | Shopify product | Setting tags (dining, garden, etc.), bundle flag |
| `product.metafields.custom.value_prop` | Custom metafield | One-line value prop below title |
| `product.metafields.custom.specs` | Custom metafield (JSON) | Spec accordion content |
| `product.metafields.custom.whats_included` | Custom metafield (JSON) | Bundle "What's Included" block |
| `product.metafields.custom.faq` | Custom metafield (JSON) | Product-level FAQ accordion |
| `product.metafields.custom.bundle_savings` | Custom metafield | Savings amount for bundles |
| `product.metafields.custom.bundle_compare_price` | Custom metafield | "If bought separately" price |

---

## Sections (Top to Bottom)

### Section 1: Product Information (Above the Fold)

**Shopify Section Type**: `product-information` (Horizon native — main section)

**Purpose**: The entire above-fold purchase decision zone. Gallery on left/top, product details on right/bottom. This is where 60% of purchase decisions are made or abandoned.

**Layout**: Two-column on desktop (gallery left, details right with sticky scroll). Single-column on mobile (gallery stacks above details).

#### Block 1A: Media Gallery

**Shopify Block Type**: `_product-media-gallery` (static child of `product-information`)

**Purpose**: Lifestyle-first image sequence that matches ad creative and communicates product quality, setting, and atmosphere.

**Content Sources**: Dynamic — `product.images` (merchant uploads 5–8 images per product)

**Image Sequence (Merchant Guidance)**:
1. Hero lifestyle shot — lamp in primary setting (must match ad creative)
2. Alternative setting lifestyle shot — same lamp, different room/mood
3. Close-up detail — touch control area, material texture, light quality
4. Scale reference — lamp next to common objects (wine glass, book, plate)
5. Product on neutral background — clean product shot for spec-oriented buyers
6. Colour variant lifestyle — if multiple colours, show alternative in situ
7. (Optional) Night vs day comparison — showing warm glow in dim setting
8. (Optional) Outdoor/garden setting — for IP54-rated products

**Configurable Settings**:
- `media_presentation`: `grid` (desktop), vertical scroll (mobile)
- `media_columns`: `two` (desktop grid)
- `thumbnail_position`: `right` (desktop sidebar thumbnails)
- `aspect_ratio`: `adapt`
- `zoom`: `true`
- `hide_variants`: `true` (gallery filters by selected colour)

**Responsive Notes**:
- **Desktop**: 2-column grid or thumbnails-on-right layout. Thumbnails clickable. Zoom on hover.
- **Mobile**: Vertical scroll (not horizontal carousel). Full-width images. Dot indicators for position. Research shows 15–25% higher engagement with vertical scroll vs carousel on mobile.

**Media Requirements**:
- Minimum 5 images per product, target 8
- 70% lifestyle / 30% detail split
- Aspect ratio: 3:4 portrait preferred (matches mobile viewport)
- Resolution: 2048px on longest edge minimum
- File format: WebP with JPEG fallback
- First image must be lifestyle, never product-on-white

#### Block 1B: Product Details (Sticky on Desktop)

**Shopify Block Type**: `_product-details` (static child of `product-information`)

**Purpose**: All purchase-decision information and controls in a single scrollable column that stays visible alongside the gallery on desktop.

**Configurable Settings**:
- `sticky_details_desktop`: `true`
- `gap`: `28`
- `width`: `fill`

The product details column contains the following nested blocks in order:

---

#### Block 1B-i: Title + Price Group

**Shopify Block Type**: `group` > `text` (title) + `price`

**Purpose**: Immediate product identification and price anchoring. Must be visible within 3 seconds of page load.

**Draft Content (Single Lamp)**:
```
{{product.title}}
£{{product.price}}
```

**Draft Content (Bundle with Compare Price)**:
```
{{product.title}}
£{{product.price}}  ~~£{{product.compare_at_price}}~~
Save £{{product.metafields.custom.bundle_savings}}
```

**Content Sources**: Dynamic — `product.title`, `product.price`, `product.compare_at_price`

**Configurable Settings**:
- Title: `h3` preset, body font family, left-aligned
- Price: paragraph preset, body font, left-aligned
- `show_sale_price_first`: `true`
- `show_installments`: `false` (not using Klarna installments on PDP at launch)

**Responsive Notes**:
- Same treatment desktop and mobile
- Price must never be hidden or require scroll on mobile

---

#### Block 1B-ii: Value Proposition One-Liner

**Shopify Block Type**: `text` (custom text block)

**Purpose**: Single sentence that frames the product's core promise. Bridges the gap between "what is this?" and "why do I want it?" for cold traffic.

**Draft Content Examples** (merchant sets per product via metafield or static text):

For a mushroom dome lamp:
> "Restaurant lighting, wherever you want it."

For a slim modern lamp:
> "The cordless lamp that looks like it cost three times more."

For an outdoor lantern:
> "Garden parties just got an upgrade."

For the Dinner Party Set bundle:
> "Three lamps. One perfect table. Save £18."

**Content Sources**: `product.metafields.custom.value_prop` or [MERCHANT: Write a one-line value prop for each product — 8–12 words, focused on the feeling or transformation, not specs]

**Configurable Settings**:
- Font: body family, smaller size (0.875rem)
- Colour: subdued foreground (60% opacity or secondary colour)
- Alignment: left

---

#### Block 1B-iii: Colour Variant Picker

**Shopify Block Type**: `variant-picker`

**Purpose**: Visual colour selection using swatches (not a dropdown). Selecting a colour updates the gallery images and availability status.

**Draft Content**: No text — visual swatches only. Colour name appears on hover/selection.

**Content Sources**: Dynamic — `product.variants` filtered by "Colour" option

**Configurable Settings**:
- `variant_style`: `buttons` (renders as swatches with Horizon's swatch system)
- `show_swatches`: `true` (CHANGE FROM DEFAULT — must enable)
- `alignment`: `left`

**Variant Behaviour**:
- Selecting a colour swatch updates the product gallery to show images tagged with that variant
- Unavailable colours show as struck-through or faded with "Sold Out" on hover
- URL updates with `?variant=` parameter for shareability and ad tracking
- Default selection: first available variant

**Responsive Notes**:
- Swatches display inline, wrapping if needed
- Touch targets minimum 44x44px
- Selected state: border or outline indicator

---

#### Block 1B-iv: Add to Cart Button + Quantity

**Shopify Block Type**: `buy-buttons` (contains `quantity`, `add-to-cart`, `accelerated-checkout`)

**Purpose**: Primary conversion action. Must be unmissable and feel confident, not desperate.

**Draft Content**:
```
[Quantity: 1 +/-]

[ Add to Cart — £{{product.price}} ]

[ Buy it now ]  (accelerated checkout — Shop Pay / Apple Pay / Google Pay)
```

When sold out:
```
[ Sold Out — Join the Waitlist ]
```

**Content Sources**: Dynamic — `product.available`, `product.price`

**Configurable Settings**:
- `stacking`: `true` (ATC and accelerated checkout stack vertically)
- `show_pickup_availability`: `false` (online-only at launch)
- ATC button style: primary button (full-width, brand colour)
- Accelerated checkout: enabled (Shop Pay, Apple Pay, Google Pay)

**Responsive Notes**:
- Full-width buttons on mobile
- ATC button must be reachable without scrolling past the variant picker on mobile
- Quantity selector: compact +/- stepper

---

#### Block 1B-v: Trust Bar

**Shopify Block Type**: `trust-bar` (shared section, reusable across pages — rendered inline within product details on this page via `custom-liquid` fallback if needed)

**Purpose**: Immediate risk reversal adjacent to the purchase button. Addresses the top 4 trust concerns at the moment of decision.

**Draft Content** (4–5 icons with labels):

```
[shield icon]     [returns icon]     [truck icon]       [water icon]      [battery icon]
30-Day             Free               Free Shipping      IP54              12hr
Guarantee          Returns            Over £50           Waterproof        Battery
```

**Content Sources**: Static — merchant configurable text/icons

**Configurable Settings**:
- Icon set: SVG icons or emoji fallback
- Labels: merchant-editable text for each of 5 positions
- Show/hide individual icons
- Alignment: center

**Responsive Notes**:
- **Desktop**: Single row, evenly spaced, small icons with labels below
- **Mobile**: Single row, icons only (labels appear on tap) OR two rows of 2–3 icons each
- Must not push ATC button below the fold

**Media Requirements**: 5 SVG icons (24x24px base), monochrome, matching brand style

---

#### Block 1B-vi: B2B Link (Understated)

**Shopify Block Type**: `text` (small text block)

**Purpose**: Quiet entry point for hospitality/event buyers. Must not distract consumer flow.

**Draft Content**:
> Ordering for a restaurant, hotel, or event? [Get a quote](/pages/hospitality)

**Content Sources**: Static

**Configurable Settings**:
- Text: merchant-editable
- Link URL: merchant-editable
- Font size: small (0.75rem)
- Colour: subdued/secondary
- Visibility: can be hidden via theme editor

**Responsive Notes**: Same treatment desktop and mobile. Single line of text below trust bar.

---

### Section 2: Narrative Description + Spec Accordions

**Shopify Section Type**: `custom-liquid` or additional blocks within `product-information` details column (below the fold)

**Purpose**: Emotional product story followed by structured specs for detail-oriented buyers. The narrative sells; the accordions reassure.

#### Block 2A: Narrative Description

**Draft Content (Single Lamp — Example: Mushroom Dome)**:

> The kind of light you notice when you sit down at a great restaurant. Warm. Flattering. Just enough. We took that feeling and made it cordless, rechargeable, and yours.
>
> Touch the base to dim from candlelight glow to reading bright. Charge it with the same cable as your phone. Take it from the dinner table to the garden to the bedside — no wires, no wax, no compromise.

**Draft Content (Bundle — Example: Dinner Party Set)**:

> Three lamps. One dinner table. The kind of lighting that makes everyone look good and nobody wants to leave. We did the maths so you don't have to — buying the set saves you £18 versus picking them individually.
>
> Same warm dimming, same cordless freedom, same 12-hour battery. Just more of it.

**Content Sources**: Dynamic — `product.description` (merchant writes in Shopify admin). [MERCHANT: Write 2–3 sentences per product. Lead with the feeling, not the specs. Use the voice examples in the brand guide.]

#### Block 2B: Spec Accordion — Product Details

**Shopify Block Type**: Accordion/collapsible block (Horizon supports via `_blocks.liquid` or custom collapsible)

**Draft Content**:

**"Product Details" (default closed)**
```
- Material: [MERCHANT: e.g., "Polycarbonate shell, soft-touch finish"]
- Height: [MERCHANT: e.g., "28cm"]
- Base diameter: [MERCHANT: e.g., "12cm"]
- Weight: [MERCHANT: e.g., "320g"]
- Light output: [MERCHANT: e.g., "Up to 180 lumens"]
- Colour temperature: 2700K warm white
- Dimming: Stepless touch dimming
- LED lifespan: 50,000+ hours
```

**"Battery & Charging" (default closed)**
```
- Battery life: Up to 12 hours (low), 6 hours (full brightness)
- Charging time: 4–5 hours from empty
- Charging port: USB-C (cable included)
- Charging indicator: LED on base (red = charging, green = full)
- No replacement batteries needed — built-in rechargeable lithium
```

**"Shipping & Returns" (default closed)**
```
- Free UK shipping on orders over £50 (2–4 business days)
- Standard shipping: £3.95 (2–4 business days)
- Express shipping: £5.95 (next business day)
- 30-day money-back guarantee — love it or send it back
- Free return shipping, no questions asked
- Full refund within 5 business days
```

**Content Sources**: Mix — specs from `product.metafields.custom.specs` (JSON) or static per-product description. Shipping/returns is static (shared across all products).

**Configurable Settings**:
- Number of accordion items: merchant-configurable
- Default open/closed state per item
- Heading text: merchant-editable
- Body content: merchant-editable rich text

**Responsive Notes**: Full-width on both desktop and mobile. Accordion tap targets minimum 44px height.

---

### Section 3: "What's Included" Block (Bundle PDPs Only)

**Shopify Section Type**: `custom-liquid` or conditional block within `product-information`

**Purpose**: For bundle products only. Shows exactly what the customer gets, reinforces savings, and builds confidence in the bundle value.

**Visibility Logic**: Only renders when `product.type == 'Bundle'` or `product.tags contains 'bundle'`

**Draft Content (Example: Dinner Party Set)**:

> **What's Included**
>
> [image: Mushroom Dome] **Mushroom Dome Lamp** — Worth £45
> [image: Mushroom Dome] **Mushroom Dome Lamp** — Worth £45
> [image: Slim Touch] **Slim Touch Lamp** — Worth £39
>
> **If bought separately: ~~£129~~**
> **Dinner Party Set price: £111**
> **You save: £18 (14%)**

**Content Sources**: `product.metafields.custom.whats_included` (JSON array of product handles, names, individual prices) + `product.metafields.custom.bundle_savings` + `product.metafields.custom.bundle_compare_price`

**Configurable Settings**:
- Show/hide section (merchant toggle)
- Heading text: merchant-editable (default: "What's Included")
- Show individual prices: toggle
- Show savings math: toggle

**Blocks** (repeatable):
| Block | Fields |
|-------|--------|
| Included Item | Product image, product name, individual worth price, link to individual PDP |

**Responsive Notes**:
- **Desktop**: Horizontal row of included items with images, or 3-column grid
- **Mobile**: Vertical stack, each item as a compact card with thumbnail + name + price
- Savings math always visible and prominent

**Media Requirements**: Thumbnail images of each included product (can pull from linked product's first image)

---

### Section 4: FAQ Accordion — Objection Handling

**Shopify Section Type**: `custom-liquid` (collapsible content section)

**Purpose**: Directly addresses the top 6 purchase objections identified in customer research. Positioned below the description to catch scrolling buyers who haven't yet committed.

**Draft Content**:

**Heading**: "Common Questions"

**"Will it look premium or cheap?"** (default closed)
> We spent months getting the finish right. No visible seams, no shiny plastic, no wobbly base. Every lamp has a weighted base and soft-touch shell that looks and feels like it belongs in a design store — because that's exactly what we're aiming for. If you disagree, send it back within 30 days for a full refund.

**"How long does the battery actually last?"** (default closed)
> Up to 12 hours on a low setting — more than enough for a dinner party and the conversation that follows. On full brightness, you'll get around 6 hours. A full charge takes 4–5 hours via USB-C, the same cable you use for your phone.

**"Can I trust the quality from a brand I haven't heard of?"** (default closed)
> Fair question. We're new, and we know you're taking a chance on us. That's why every lamp comes with a 30-day money-back guarantee and free return shipping. Try it at home. If it's not what you expected, send it back — no questions, no cost.

**"Is it bright enough to make a difference?"** (default closed)
> It's designed to create atmosphere, not light a room. Think restaurant table, not operating theatre. On the brightest setting (up to 180 lumens), it's enough to read by. On the lowest, it's a warm glow that makes everything look better. Stepless dimming means you set it exactly where you want it.

**"Can I use it outdoors? What about rain?"** (default closed)
> Yes. Every Lettii lamp is rated IP54, which means it's protected against splashing water from any direction. Light rain, a spilled glass, garden sprinklers — all fine. We wouldn't recommend submerging it, but then we wouldn't recommend that for most things.

**"Why pay more than the £15 ones on Amazon?"** (default closed)
> Those lamps exist, and they work. But they also look like they cost £15. Lettii sits between Amazon generics and £100+ designer lamps — you get the design quality and warm light output of the expensive ones without the designer markup. Touch dimming, USB-C, IP54 waterproofing, 12-hour battery, and a 30-day guarantee. The Amazon ones offer none of that.

**Content Sources**: Static copy (shared across all products) or `product.metafields.custom.faq` (JSON) for product-specific FAQs. [MERCHANT: These are starter FAQs — update based on actual customer questions after launch]

**Configurable Settings**:
- Section heading: merchant-editable
- Number of FAQ items: merchant-configurable (recommend 5–7)
- Each item: question text + answer rich text
- Default open/closed state

**Blocks** (repeatable):
| Block | Fields |
|-------|--------|
| FAQ Item | Question (text), Answer (rich text) |

**Responsive Notes**: Full-width, accordion pattern. Same on desktop and mobile. Tap targets 44px minimum.

---

### Section 5: "Better Together" — Bundle Upsell Module

**Shopify Section Type**: `product-list` or `custom-liquid` (curated product cards)

**Purpose**: When viewing a single-lamp PDP, show 1–2 relevant bundles that include this lamp. This is the primary AOV uplift mechanism on the product page.

**Visibility Logic**: Only on single-lamp PDPs (hidden on bundle PDPs)

**Draft Content**:

> **Better Together**
>
> [Lifestyle image: Dinner Party Set on a table]
> **Dinner Party Set** — 3 lamps, one perfect table
> ~~£129 if bought separately~~ **£111** — Save £18
> [ Add Set to Cart ]
>
> [Lifestyle image: Mix & Match Duo]
> **Mix & Match Duo** — Pick any two, save 15%
> From **£66** — Save from £12
> [ View Duo Options ]

**Content Sources**: Curated by merchant — linked via metafield (`product.metafields.custom.bundle_upsells`, list of product handles) or Shopify product recommendations filtered to bundles

**Configurable Settings**:
- Section heading: merchant-editable (default: "Better Together")
- Number of products: 1–3 (recommend 2)
- Collection source or manual product selection
- Show savings: toggle
- Show compare-at price: toggle
- Card layout: lifestyle image + title + price + CTA

**Blocks** (repeatable):
| Block | Fields |
|-------|--------|
| Bundle Card | Product (linked), custom heading override, CTA text |

**Responsive Notes**:
- **Desktop**: 2 cards side-by-side, lifestyle images, horizontal layout
- **Mobile**: Vertical stack or horizontal scroll (single card visible + peek of next)
- CTA buttons must be full-width on mobile

**Media Requirements**: Bundle cards use the bundle product's first image (lifestyle shot of full set in use)

---

### Section 6: "Complete the Setting" — Cross-Sell

**Shopify Section Type**: `product-recommendations` (Horizon native)

**Purpose**: Show 2–4 complementary lamps from the same setting/style family. Encourages browse behaviour and increases pages per session. Replaces generic "You may also like" with setting-aware recommendations.

**Draft Content**:

> **Complete the Setting**
>
> [4 product cards: lifestyle thumbnails, product name, price]

**Content Sources**: Dynamic — Shopify product recommendations API (`related` type), filtered/supplemented by setting tags. Falls back to same-collection products.

**Configurable Settings** (from existing Horizon section):
- Section heading: merchant-editable (change from "You may also like" to "Complete the Setting")
- `recommendation_type`: `related`
- `max_products`: `4`
- `columns`: `4` desktop, `2` mobile
- `carousel_on_mobile`: `false` (grid preferred)
- Product card blocks: gallery, title, price

**Responsive Notes**:
- **Desktop**: 4-column grid
- **Mobile**: 2-column grid (2 rows of 2)
- Product cards use lifestyle thumbnails, not product-on-white

**Media Requirements**: Product card images sourced from each product's first image (lifestyle shot)

---

### Section 7: Sticky Mobile ATC Bar

**Shopify Section Type**: Theme-level component (configured via theme settings, not a standalone section)

**Purpose**: Persistent purchase CTA on mobile that appears when the main ATC button scrolls out of view. This is the single highest-impact CRO element for mobile ad traffic.

**Draft Content**:

```
[Sticky bar, bottom of viewport]
{{product.title}} — £{{product.price}}     [ Add to Cart ]
```

With trust line below:
```
30-day guarantee  |  Free returns
```

**Content Sources**: Dynamic — `product.title`, `product.price`

**Configurable Settings**:
- Enable/disable sticky bar (theme-level setting)
- Show trust line: toggle
- Trust line text: merchant-editable
- Trigger: appears when main ATC scrolls out of viewport
- Background: solid (matches page background or contrasts for visibility)

**Responsive Notes**:
- **Mobile only** — hidden on desktop (desktop has sticky details column)
- Fixed to bottom of viewport
- Does not overlap content — pushes content up or uses padding
- Z-index above all other content
- ATC button: prominent, thumb-reachable
- Must not obscure cookie banners or chat widgets

---

### Section 8: Reviews (Hidden at Launch)

**Shopify Section Type**: Third-party app section (e.g., Judge.me, Stamped, Loox) or `custom-liquid`

**Purpose**: Social proof via customer reviews and photos. Hidden until 5+ reviews exist to avoid the trust-damaging "0 reviews" state.

**Visibility Logic**: Hidden when review count < 5. Rendered when review count >= 5.

**Draft Content (Post-Launch)**:

> **What Our Customers Say**
>
> [Star rating aggregate]
> [Individual review cards with customer name, star rating, review text, optional photo]

**Content Sources**: Dynamic — third-party review app data

**Configurable Settings**:
- Minimum review threshold to display: merchant-configurable (default: 5)
- Show photo reviews: toggle
- Maximum reviews displayed: merchant-configurable
- Sort order: most recent or highest rated

**Responsive Notes**: Standard review grid/list. Photo reviews in horizontal scroll on mobile.

**Media Requirements**: None at launch. Customer-submitted photos post-launch.

---

## Shared Components Referenced

### Announcement Bar
Appears above header on all pages. Rotating messages:
1. "30-Day Guarantee | Love It or Send It Back"
2. "Free UK Shipping Over £50"
3. "USB-C Rechargeable | Up to 12 Hours"
4. "Free Returns, No Questions Asked"

### Header
Standard site header with logo, navigation, search, account, cart icon with count.

### Footer
4-column layout (Shop, Help, About, Business) + newsletter signup + social icons + payment badges.

---

## SEO

| Element | Value |
|---------|-------|
| **Meta Title** | `{{product.title}} — Cordless LED Table Lamp | Lettii` (bundles: `{{product.title}} — Lamp Set | Lettii`) |
| **Meta Description** | `{{product.metafields.custom.meta_description}}` or auto-generated from first 155 chars of product description. [MERCHANT: Write unique meta descriptions per product — 140–155 chars, include "cordless lamp" and the key benefit] |
| **H1** | `{{product.title}}` (single instance) |
| **Canonical URL** | `https://lettii.co.uk/products/{{product.handle}}` (no variant parameter in canonical) |
| **Schema Markup** | Shopify native `Product` schema + `AggregateRating` (once reviews exist) + `Offer` with price, availability, currency |
| **Image Alt Text** | [MERCHANT: Write descriptive alt text for every product image — e.g., "Mushroom dome cordless lamp glowing on a set dinner table with wine glasses"] |
| **Open Graph** | Title, description, first product image (lifestyle shot), price |

---

## Accessibility

| Requirement | Implementation |
|-------------|----------------|
| Colour swatches | Accessible names via `aria-label` ("Colour: Warm White") not just visual colour |
| Accordion sections | `aria-expanded`, `aria-controls`, keyboard navigable (Enter/Space to toggle) |
| Gallery | Alt text on all images. Keyboard-navigable thumbnail selection |
| Sticky ATC bar | Does not trap focus. Keyboard accessible. Announced by screen readers |
| Price | Machine-readable via schema. Visually clear (no ambiguous strikethrough without text alternative) |
| ATC button | Clear focus state. `aria-live` region for "Added to cart" confirmation |
| Trust icons | SVG icons have `aria-hidden="true"` with adjacent visible text labels |
| Zoom | Keyboard-activatable. Escape to close. Focus trapped within zoom modal |

---

## Decisions & Assumptions

| Decision | Rationale |
|----------|-----------|
| Single template for singles and bundles | Reduces maintenance. Bundle-specific blocks conditionally shown via product type/tags. Avoids template proliferation. |
| Colour swatches, not dropdown | Visual selection is critical for a design product. Swatches communicate the range at a glance and reduce clicks. |
| Vertical scroll gallery on mobile | Research shows 15–25% higher engagement vs horizontal carousel. Matches natural mobile scroll behavior. |
| Reviews hidden at launch | "0 reviews" actively damages trust for an unknown brand. Hide the widget entirely until 5+ reviews accumulate. |
| FAQ copy addresses objections directly | The six FAQs map 1:1 to the six identified customer objections. Direct, honest answers in brand voice build trust more than generic FAQ content. |
| No Klarna/BNPL messaging on PDP | At £39–69 price point, installment messaging can signal "this is expensive" rather than "this is affordable." Revisit if AOV exceeds £80. |
| Trust bar position: below ATC, not above | Research shows trust signals are most effective at the moment of commitment (after seeing the price/ATC), not before the buyer has formed purchase intent. |
| Sticky bar: mobile only | Desktop uses sticky details column (native Horizon behaviour). Adding a sticky bar on desktop would be redundant and visually cluttered. |
| B2B link is text-only, not a button | Must not compete with consumer ATC. B2B buyers are high-intent and will find a text link. A button would confuse consumer flow. |
| Free shipping threshold at £50 | Positioned between single-lamp price (£39–69) and entry bundle price (£89). Incentivises adding a second item or upgrading to a bundle. |

---

## Complexity Assessment

| Dimension | Rating | Notes |
|-----------|--------|-------|
| Template customisation | Medium | Horizon's `product-information` section covers ~70% of requirements. Custom blocks needed for trust bar, FAQ accordion, bundle upsell, and "What's Included." |
| Content creation | High | 5–8 lifestyle images per product, unique value props, product descriptions in brand voice, per-product FAQ overrides. Significant merchant effort. |
| Dynamic logic | Medium | Bundle vs single conditional display. Variant-to-gallery mapping. Review threshold visibility. Sticky bar scroll trigger. |
| Third-party dependencies | Low | Review app only (deferred). No other third-party sections at launch. |
| Cross-page dependencies | Medium | Cart must handle bundle line items. Collection cards must match PDP image style. Bundle upsells link to bundle PDPs. |

---

## Handoff to Cart

When a customer clicks "Add to Cart" on this page:
1. The selected variant (colour) is added to the cart at the displayed price
2. The **cart drawer** slides open from the right (primary cart surface — not a page redirect)
3. The cart drawer shows the added item, free shipping progress, bundle upsell (if applicable), and trust line
4. Bundle line items include savings reinforcement ("You're saving £18")
5. If the customer added a bundle from the "Better Together" upsell, the bundle product (not individual items) is added as a single line item
