# Page Spec: Cart Page

## Page Metadata

| Field | Value |
|-------|-------|
| **Template** | `cart` (Shopify JSON template) |
| **URL Pattern** | `/cart` |
| **Primary Section** | `main-cart` (Horizon theme native) |
| **Supporting Sections** | `product-list` (cross-sell recommendations) |
| **Priority** | High — fallback surface for direct `/cart` access; cart drawer is primary |
| **Relationship to Cart Drawer** | Cart drawer (slide-out, theme settings) is the primary cart surface. This page mirrors the drawer's content and logic for visitors who navigate to `/cart` directly or have JavaScript disabled. Both surfaces must stay in sync. |

---

## Target Audience & Intent

| Segment | Entry Path | Intent | Conversion Goal |
|---------|-----------|--------|-----------------|
| Direct URL visitors | Typed `/cart`, bookmarked, or JS-disabled fallback | Review cart contents, proceed to checkout | Complete checkout |
| Returning visitors | Email link to abandoned cart, browser back-button | Re-evaluate items, possibly modify, then checkout | Recover abandoned cart |
| Multi-item shoppers | Browsing multiple products, returning to cart to review | Compare selections, adjust quantities, check total | Proceed to checkout, possibly upgrade to bundle |

**Critical context**: Most customers will interact with the cart drawer (slide-out) rather than this page. This page exists as a reliable fallback and for the subset of visitors who prefer a full-page cart view. It must provide feature parity with the cart drawer.

---

## Dynamic Data

| Variable | Source | Usage |
|----------|--------|-------|
| `cart.items` | Shopify cart | Line item rendering |
| `cart.item_count` | Shopify cart | Page title count, empty state logic |
| `cart.total_price` | Shopify cart | Subtotal display |
| `cart.items[].product.title` | Shopify cart | Line item name |
| `cart.items[].variant.title` | Shopify cart | Colour/variant display |
| `cart.items[].image` | Shopify cart | Line item thumbnail |
| `cart.items[].price` | Shopify cart | Line item price |
| `cart.items[].quantity` | Shopify cart | Quantity selector |
| `cart.items[].line_price` | Shopify cart | Line total (price x quantity) |
| `cart.items[].product.type` | Shopify cart | Bundle detection for savings display |
| `cart.items[].product.compare_at_price` | Shopify cart | Bundle savings reinforcement |
| `cart.items[].product.metafields.custom.bundle_savings` | Shopify cart | Savings callout per bundle line item |
| `cart.attributes.note` | Shopify cart | Order note field |

---

## Sections (Top to Bottom)

### Section 1: Main Cart

**Shopify Section Type**: `main-cart` (Horizon native)

**Purpose**: Full cart contents — line items, totals, upsells, trust signals, and checkout CTAs. This is a single section with multiple static child blocks.

**Configurable Settings**:
- `section_width`: `page-width`
- `color_scheme`: default
- `padding-block-start`: `24`

---

#### Block 1A: Cart Title

**Shopify Block Type**: `_cart-title` (static child)

**Purpose**: Page heading with item count. Confirms where the customer is and what they have.

**Draft Content**:

```
Your Cart ({{cart.item_count}})
```

Empty state:
```
Your Cart

Your cart is empty. That's easy to fix.

[ Shop All Lamps ]    [ Shop Sets & Bundles ]
```

**Content Sources**: Dynamic — `cart.item_count`

**Configurable Settings**:
- `title`: merchant-editable (default: "Cart")
- `show_count`: `true`
- `type_preset`: `h4`
- `alignment`: `left`

**Responsive Notes**: Same treatment desktop and mobile.

---

#### Block 1B: Free Shipping Progress Bar

**Shopify Block Type**: `custom-liquid` or theme-level cart component

**Purpose**: Shows progress toward the £50 free shipping threshold. Incentivises adding items (especially upgrading to bundles) to reach the threshold.

**Draft Content**:

When below threshold:
```
[Progress bar: {{amount_spent}} / £50 filled]
You're £{{amount_remaining}} away from free shipping
```

When threshold met:
```
[Progress bar: 100% filled, with checkmark]
You've unlocked free shipping
```

**Calculation Logic**:
- Threshold: £50.00 (5000 in Shopify cents)
- `amount_remaining` = max(0, 5000 - cart.total_price) / 100
- Bar fill percentage = min(100, (cart.total_price / 5000) * 100)

**Content Sources**: Dynamic — `cart.total_price`. Threshold is a theme setting.

**Configurable Settings**:
- Free shipping threshold: merchant-editable (default: £50.00)
- Progress bar colour: brand accent
- Below-threshold message: merchant-editable (default: "You're £{{amount}} away from free shipping")
- Above-threshold message: merchant-editable (default: "You've unlocked free shipping")
- Show/hide toggle

**Responsive Notes**: Full-width bar. Text below bar. Same on desktop and mobile.

---

#### Block 1C: Line Items

**Shopify Block Type**: `_cart-products` (static child)

**Purpose**: Displays each item in the cart with full details and controls. Must handle single lamps, bundles, and gift cards.

**Draft Content (Single Lamp Line Item)**:

```
[Thumbnail: lifestyle]  Mushroom Dome Lamp
                        Colour: Warm White
                        [- 1 +]            £45.00
                        [Remove]
```

**Draft Content (Bundle Line Item)**:

```
[Thumbnail: lifestyle]  Dinner Party Set
                        3 lamps — Mushroom Dome x2, Slim Touch x1
                        [- 1 +]            £111.00
                        You're saving £18   ~~£129.00~~
                        [Remove]
```

**Draft Content (Gift Card Line Item)**:

```
[Thumbnail: gift card]  Lettii Gift Card
                        Value: £50.00
                        [- 1 +]            £50.00
                        [Remove]
```

**Line Item Elements**:
| Element | Source | Notes |
|---------|--------|-------|
| Thumbnail | `cart.items[].image` | Lifestyle image, portrait ratio, links to PDP |
| Product name | `cart.items[].product.title` | Links to PDP |
| Variant/colour | `cart.items[].variant.title` | Displayed below product name |
| Quantity selector | `cart.items[].quantity` | +/- stepper, updates cart via AJAX |
| Line price | `cart.items[].line_price` | Price x quantity |
| Compare price | `cart.items[].product.compare_at_price` | Strikethrough, shown for bundles/sale items |
| Savings callout | `cart.items[].product.metafields.custom.bundle_savings` | "You're saving £X" — bundles only |
| Remove link | Cart item removal | Text link, not icon-only (accessibility) |

**Content Sources**: Dynamic — all from `cart.items`

**Configurable Settings** (from existing Horizon block):
- `gap`: `24`
- `image_ratio`: `portrait`
- `dividers`: `true` (line between items)
- `vendor`: `false`

**Responsive Notes**:
- **Desktop**: Thumbnail left, details center, price/quantity right. Table-like layout.
- **Mobile**: Thumbnail left (smaller), details + price stacked right. Quantity below. Full-width per item.
- Quantity stepper: minimum 44x44px touch targets
- Remove: text link "Remove", not just an icon (screen reader accessible)

**Media Requirements**: Thumbnails pulled from product images. Portrait ratio. Minimum 200px wide.

---

#### Block 1D: Bundle Upsell

**Shopify Block Type**: `custom-liquid` (conditional upsell block within cart)

**Purpose**: When a single lamp is in the cart (no bundle), prompt the customer to upgrade. This is the highest-leverage AOV tactic — converts at 8–15% on well-optimised stores.

**Visibility Logic**:
- Show when: cart contains at least one single lamp (product.type != "Bundle") AND cart does not already contain a bundle
- Hide when: cart already contains a bundle, OR cart is empty, OR cart contains only gift cards

**Draft Content**:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Better together — add a second lamp and save 15%

[Thumbnail: Mix & Match Duo]
Mix & Match Duo — Pick any two
From £66  (Save from £12)
[ Add Duo to Cart ]

[Thumbnail: Dinner Party Set]
Dinner Party Set — Three lamps, one table
£111  (Save £18)
[ Add Set to Cart ]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Content Sources**: Curated — merchant selects 1–2 bundle products to feature. Alternatively, pulled dynamically from "Sets & Bundles" collection.

**Configurable Settings**:
- Upsell heading: merchant-editable (default: "Better together — add a second lamp and save 15%")
- Bundle products to show: merchant-selectable (1–2 products)
- Show savings: toggle (default: true)
- Show compare-at price: toggle (default: true)
- CTA text: merchant-editable per product
- Show/hide toggle for entire block

**Blocks** (repeatable):
| Block | Fields |
|-------|--------|
| Upsell Product | Product (linked), CTA text, custom description override |

**Responsive Notes**:
- **Desktop**: Compact horizontal cards within the cart column
- **Mobile**: Vertical stack, full-width cards
- CTA buttons: secondary style (outline), not competing with main Checkout button
- Must not block or delay the checkout flow — positioned between line items and summary, not after checkout button

**Media Requirements**: Bundle product thumbnails (lifestyle shots)

---

#### Block 1E: Cart Summary / Totals

**Shopify Block Type**: `_cart-summary` (static child)

**Purpose**: Subtotal, shipping estimate, and path to checkout. Clear, no surprises.

**Draft Content**:

```
                        Subtotal:   £{{cart.total_price}}
                        Shipping:   Calculated at checkout
                                    (Free over £50)

[Have a discount code?]  (expandable — collapsed by default)
  [________________] [Apply]

[Order note]  (expandable — collapsed by default)
  [Add a note to your order________________]

[ Continue to Checkout ]

[ Shop Pay ]  [ Apple Pay ]  [ Google Pay ]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
30-day guarantee  |  Free returns
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Summary Elements**:

| Element | Details |
|---------|---------|
| Subtotal | `cart.total_price` formatted as £XX.XX |
| Shipping line | Static text: "Calculated at checkout" with note "(Free over £50)" |
| Discount code field | Hidden under expandable "Have a discount code?" link. Input + Apply button. |
| Order note | Hidden under expandable "Add a note to your order" link. Textarea. |
| Checkout button | Primary CTA — full-width, brand colour, prominent |
| Express checkout | Shop Pay, Apple Pay, Google Pay buttons (Shopify accelerated checkout) |
| Trust line | Static: "30-day guarantee | Free returns" |

**Content Sources**: Dynamic — `cart.total_price`. Static — shipping text, trust line, discount label.

**Configurable Settings** (from existing Horizon block):
- `extend_summary`: `true` (full-width summary area)
- `color_scheme`: `scheme-2` (subtle background differentiation)
- Border: none

**Responsive Notes**:
- **Desktop**: Summary in right column or bottom of cart, sticky on scroll
- **Mobile**: Summary at bottom, full-width. Checkout button must be reachable without excessive scrolling.
- Express checkout buttons: standard Shopify accelerated checkout rendering
- Discount code: collapsed by default to reduce visual clutter and perceived "I should find a code" hesitation

---

#### Block 1E-i: Discount Code Field

**Purpose**: Allow customers with discount codes to apply them. Hidden by default to avoid triggering "let me go find a coupon code" abandonment behaviour.

**Draft Content**:

```
[Chevron] Have a discount code?

(Expanded:)
[Enter code__________] [Apply]
```

**Content Sources**: Static label, dynamic application via Shopify cart API

**Configurable Settings**:
- Label text: merchant-editable (default: "Have a discount code?")
- Default state: collapsed
- Show/hide toggle

---

#### Block 1E-ii: Order Note Field

**Purpose**: Optional note for gift messages or special instructions. Collapsed to keep the default flow clean.

**Draft Content**:

```
[Chevron] Add a note to your order

(Expanded:)
[Leave a message — gift notes, special requests, or just say hello.________]
```

**Content Sources**: Dynamic — `cart.attributes.note`. Static placeholder text.

**Configurable Settings**:
- Label text: merchant-editable (default: "Add a note to your order")
- Placeholder text: merchant-editable
- Default state: collapsed
- Show/hide toggle

---

#### Block 1E-iii: Trust Line

**Purpose**: Final reassurance before the customer commits to checkout. Addresses risk at the last decision point.

**Draft Content**:

```
30-day guarantee  |  Free returns
```

**Content Sources**: Static — merchant-editable text

**Configurable Settings**:
- Text: merchant-editable
- Alignment: center
- Font size: small (0.875rem)
- Colour: subdued foreground

**Responsive Notes**: Centered below checkout button on both desktop and mobile.

---

### Section 2: "You May Also Like" — Cross-Sell Recommendations

**Shopify Section Type**: `product-list` (Horizon native — already configured in `cart.json`)

**Purpose**: When the customer is reviewing their cart, show complementary products. Uses the same product card pattern as the rest of the site.

**Draft Content**:

```
You may also like                              [View all]

[Product card]  [Product card]  [Product card]  [Product card]
```

**Content Sources**: Dynamic — collection source (default: "all"). Can be configured to pull from a specific collection like "Best Sellers" or contextually matched products.

**Configurable Settings** (from existing Horizon section):
- Section heading: merchant-editable (default: "You may also like")
- Collection source: merchant-selectable
- `max_products`: `4`
- `columns`: `4` desktop, `2` mobile
- Product card blocks: gallery, title, price
- "View all" button: links to collection, merchant-configurable

**Responsive Notes**:
- **Desktop**: 4-column grid
- **Mobile**: 2-column grid
- Lifestyle thumbnails, consistent with product page and collection page cards

---

## Cart Drawer (Primary Cart Surface)

The cart drawer is configured via theme settings, not the cart template. However, it must maintain content parity with the cart page. This section documents the cart drawer specification for completeness.

**Trigger**: Opens on "Add to Cart" click from any page (product page, collection quick-add, etc.)

**Slide Direction**: Right side of viewport

**Draft Content**:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Your Cart ({{cart.item_count}})            [X Close]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Progress bar: free shipping]
You're £{{amount}} away from free shipping

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Thumbnail]  {{item.product.title}}
             Colour: {{item.variant.title}}
             [- 1 +]         £{{item.line_price}}
             [Remove]

(If bundle:)
             You're saving £{{bundle_savings}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

(If single lamp in cart, no bundle:)
Add a second lamp and save 15%
[Compact bundle card] [ Add ]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Subtotal: £{{cart.total_price}}

[ Continue to Checkout ]
[ Shop Pay ]  [ Apple Pay ]  [ Google Pay ]

30-day guarantee  |  Free returns
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Cart Drawer vs Cart Page — Feature Parity**:

| Feature | Cart Drawer | Cart Page |
|---------|-------------|-----------|
| Line items with thumbnail, name, colour, quantity, price, remove | Yes | Yes |
| Free shipping progress bar (£50 threshold) | Yes | Yes |
| Bundle upsell ("Add a second lamp and save 15%") | Yes | Yes |
| Bundle savings reinforcement on line items | Yes | Yes |
| Trust line ("30-day guarantee \| Free returns") | Yes | Yes |
| Express checkout (Shop Pay, Apple Pay, Google Pay) | Yes | Yes |
| Discount code field (collapsed) | No (apply at checkout) | Yes |
| Order note field (collapsed) | No (apply at checkout) | Yes |
| Cross-sell product grid ("You may also like") | No (limited space) | Yes |
| "Continue Shopping" link | Yes (closes drawer) | Yes (links to collections) |

---

## Empty Cart State

**Purpose**: When a visitor lands on `/cart` with no items, provide a helpful recovery path rather than a dead end.

**Draft Content**:

```
Your Cart

Your cart is empty. That's easy to fix.

[ Shop All Lamps ]         [ Shop Sets & Bundles ]

Or try one of these:

[Product card]  [Product card]  [Product card]  [Product card]
(Best Sellers or Featured Products)
```

**Content Sources**: Static text + dynamic product recommendations from a featured collection

**Configurable Settings**:
- Empty cart message: merchant-editable
- CTA button labels and links: merchant-editable
- Featured collection for empty state: merchant-selectable

---

## Shared Components Referenced

### Announcement Bar
Continues to display above header on cart page. Rotating trust messages reinforce purchase confidence.

### Header
Standard site header. Cart icon shows current count (updates dynamically on AJAX add/remove).

### Footer
Standard 4-column footer with newsletter signup.

---

## SEO

| Element | Value |
|---------|-------|
| **Meta Title** | `Your Cart | Lettii` |
| **Meta Description** | Not indexed — cart pages are excluded via `robots` meta tag or Shopify default |
| **Robots** | `noindex, follow` (Shopify default for cart) |
| **Canonical URL** | `https://lettii.co.uk/cart` |

Cart pages should not be indexed. Shopify handles this by default.

---

## Accessibility

| Requirement | Implementation |
|-------------|----------------|
| Quantity stepper | `aria-label="Quantity for {{product.title}}"`, `+` and `-` buttons with `aria-label="Increase quantity"` / `"Decrease quantity"` |
| Remove button | Text "Remove" visible (not icon-only). `aria-label="Remove {{product.title}} from cart"` |
| Progress bar | `role="progressbar"`, `aria-valuenow`, `aria-valuemin="0"`, `aria-valuemax="50"`, `aria-label="Free shipping progress"` |
| Discount code toggle | `aria-expanded="false/true"`, `aria-controls` pointing to the discount field |
| Order note toggle | `aria-expanded="false/true"`, `aria-controls` pointing to the note field |
| Cart drawer | Focus trapped when open. `aria-modal="true"`. Close on Escape key. Focus returns to triggering element on close. |
| Empty state | CTAs are focusable links/buttons, not just styled divs |
| Price changes | `aria-live="polite"` region for subtotal that updates when quantities change |
| Express checkout | Standard Shopify accelerated checkout — accessibility handled by Shopify |

---

## Decisions & Assumptions

| Decision | Rationale |
|----------|-----------|
| Cart drawer is primary, cart page is fallback | Slide-out drawer maintains purchase momentum for impulse/quick-consideration purchases. Most customers never see the cart page. |
| Discount code hidden under expandable link | Visible discount fields trigger "let me find a code" abandonment. Hiding reduces cart abandonment by 5–10% per Baymard research. Customers with codes will look for the field. |
| Order note collapsed by default | Most orders need no note. Keeps the default flow clean and fast. Gift message use case is secondary. |
| Bundle upsell positioned between line items and summary | Must be visible but must not block checkout. Positioned to catch attention during cart review without creating friction. |
| No surprise shipping costs | Shipping line says "Calculated at checkout (Free over £50)" — sets expectation. Free shipping progress bar reinforces the threshold. |
| Trust line below checkout button | Last-moment reassurance. The guarantee reduces checkout anxiety at the final decision point. |
| Express checkout enabled | Apple Pay / Google Pay / Shop Pay reduce friction for mobile users. Critical for ad-driven traffic that expects fast checkout. |
| Cross-sell grid on cart page only, not drawer | Cart drawer has limited space. Product recommendations require browsing context that conflicts with checkout momentum in a drawer. Cart page has room for a proper grid. |
| Free shipping threshold at £50 | Between single-lamp price (£39–69) and entry bundle price (£89). Incentivises bundle upgrade or multi-item purchase. Aligns with product page messaging. |

---

## Complexity Assessment

| Dimension | Rating | Notes |
|-----------|--------|-------|
| Template customisation | Medium | Horizon's `main-cart` covers line items, title, and summary. Custom blocks needed for free shipping progress bar, bundle upsell, trust line, and empty state enhancement. |
| Content creation | Low | Most content is dynamic (cart data) or short static strings. No product descriptions or lifestyle copy needed. |
| Dynamic logic | Medium | Free shipping threshold calculation. Bundle detection for upsell visibility. Savings reinforcement on bundle line items. AJAX quantity updates. |
| Third-party dependencies | Low | Express checkout via Shopify native. No third-party cart apps at launch. |
| Cross-page dependencies | High | Must stay in sync with cart drawer (theme settings). Product page ATC triggers cart drawer. Bundle line items must display correctly from product page bundle upsell. Discount code behaviour must match checkout. |

---

## Handoff from Product Page

When arriving at the cart (page or drawer) from the product page:
1. **Single lamp added**: Line item shows product thumbnail (lifestyle), name, colour, quantity, price. If this is the only single lamp in cart, the bundle upsell appears.
2. **Bundle added from "Better Together" upsell**: The bundle is added as a single line item (not individual lamps). Line item shows bundle thumbnail, bundle name, quantity, bundle price, savings callout ("You're saving £18"), and strikethrough compare-at price.
3. **Bundle added from bundle PDP**: Same as above — single line item with savings reinforcement.
4. **Free shipping bar updates**: Reflects new cart total immediately.
5. **Bundle upsell hides**: If cart now contains a bundle, the upsell block disappears.
