# Site Content Map

## Overview

**Brand**: Lettii

**Key Brand Traits**: Mid-premium cordless lamp range, bundle AOV strategy, lifestyle/aspirational selling, ad-driven cold traffic, dual D2C + B2B audience, new brand trust-building, gift-occasion product

**Planning Date**: 2026-03-30

**Purpose**: Master reference for all pages, shared components, section reuse patterns, and non-visual theme configuration needs across the entire store.

---

## 1. Page Inventory

| Page Name | Template Type | URL Path | Purpose | Section Count | Spec Doc |
|-----------|---------------|----------|---------|:------------:|----------|
| Homepage | `index` | `/` | Brand magazine cover: lifestyle hero, shop by setting, featured bundles, trust signals. Primary entry for retargeting and brand search. | 12 | [pages/index.md](pages/index.md) |
| Product | `product` | `/products/{handle}` | Primary conversion surface for ad traffic. Lifestyle gallery, trust strip, bundle upsell, FAQ accordion. | 8 | [pages/product.md](pages/product.md) |
| Collection | `collection` | `/collections/{handle}` | Setting-based and style-based collections. Hero, trust bar, filter/sort, lifestyle product grid. | 8 | [pages/collection.md](pages/collection.md) |
| Cart | `cart` | `/cart` | Cart page fallback with bundle upsell, free shipping progress bar, trust signals. Cart drawer is primary. | 2 | [pages/cart.md](pages/cart.md) |
| Search | `search` | `/search?q={terms}` | Lifestyle product cards, zero-results handling with popular collections and search suggestions. | 5 | [pages/search.md](pages/search.md) |
| 404 | `404` | Any non-matching URL | Recovery page: brand-voice error message, product recommendations from featured collection. | 2 | [pages/404.md](pages/404.md) |
| Password | `password` | All pages (pre-launch) | Pre-launch email capture with hero lifestyle image, brand intro, and 10% off incentive. | 2 | [pages/password.md](pages/password.md) |
| Blog Listing | `blog` | `/blogs/journal` | SEO content hub for long-tail acquisition. Editorial article grid with category filters. | 6 | [pages/blog.md](pages/blog.md) |
| Blog Article | `article` | `/blogs/journal/{handle}` | Individual SEO articles with editorial typography, shoppable product links, email capture. | 7 | [pages/article.md](pages/article.md) |
| Our Story | `page.about` | `/pages/our-story` | Problem-led brand narrative, lifestyle imagery, guarantee close. Builds credibility for new brand. | 10 | [pages/page-about.md](pages/page-about.md) |
| Contact | `page.contact` | `/pages/contact` | Email, live chat hours, response time commitment, UK address, contact form. | 5 | [pages/page-contact.md](pages/page-contact.md) |
| FAQ | `page.faq` | `/pages/faq` | Objection handling: battery, brightness, waterproofing, price justification, returns. | 6 | [pages/page-faq.md](pages/page-faq.md) |
| For Restaurants & Hospitality | `page.hospitality` | `/pages/for-restaurants-hospitality` | B2B landing page: volume pricing, commercial benefits, venue gallery, enquiry form. | 8 | [pages/page-hospitality.md](pages/page-hospitality.md) |
| For Weddings & Events | `page.weddings` | `/pages/for-weddings-events` | B2B/occasion landing page: event packages, wedding imagery, event-date enquiry form. | 9 | [pages/page-weddings.md](pages/page-weddings.md) |
| Styling Ideas | `page.lookbook` | `/pages/styling-ideas` | Editorial lookbook: setting-based features with lifestyle images, shoppable product links. | 8 | [pages/page-lookbook.md](pages/page-lookbook.md) |
| Shipping & Delivery | `page.shipping` | `/pages/shipping` | Clear shipping table, delivery times, UK-only note. Linked from trust badges and footer. | 6 | [pages/page-shipping.md](pages/page-shipping.md) |

**Total Pages**: 16

---

## 2. Shared Components Registry

### Header

**Appears On**: All pages (except Password, which uses password layout)

**Structure**:
- Logo (left) -- links to homepage
- Primary navigation (centre or left-aligned) -- mega-menu on desktop
- Search icon -- triggers predictive search overlay
- Account icon -- links to customer account
- Cart icon with item count badge -- triggers cart drawer

**Sticky Behaviour**: Condenses on scroll (reduced height, smaller logo)

**Mobile Variant**: Hamburger menu (left), logo (centre), cart icon (right)

**Configurable Settings**:
- Logo image (image_picker) -- standard and inverse variants
- Navigation menu (link_list) -- Shop mega-menu, Styling Ideas, Our Story
- Sticky header on/off (checkbox)
- Transparent header on homepage (checkbox) -- overlays hero image

**Page-Specific Behaviour**:
- Homepage: may use transparent overlay on hero
- Password page: header not shown (password layout)

---

### Announcement Bar

**Appears On**: All pages (except Password)

**Content**: Rotating trust/value messages:
1. "30-Day Guarantee | Love It or Send It Back"
2. "Free UK Shipping Over £50"
3. "USB-C Rechargeable | Up to 12 Hours"
4. "Free Returns, No Questions Asked"

**Configurable Settings**:
- Messages array (repeatable blocks, up to 6)
- Rotation speed (seconds between messages, default: 4)
- Background colour / text colour
- Link URL per message (optional -- e.g., guarantee links to FAQ, shipping links to shipping page)
- Enable rotation toggle

---

### Footer

**Appears On**: All pages (except Password, which uses password-footer)

**Structure**:
- 4-column link layout:
  - **Shop**: All Lamps, Sets & Bundles, New Arrivals, Gift Cards
  - **Help**: FAQ, Shipping & Delivery, Returns & Guarantee, Contact Us
  - **About**: Our Story, Styling Ideas, Blog
  - **Business**: For Restaurants & Hospitality, For Weddings & Events
- Newsletter signup: "Get styling ideas, new designs, and subscriber-only offers. 10% off your first order." Email input + submit.
- Social icons: Instagram, Pinterest, Facebook
- Payment method icons: Visa, Mastercard, Amex, PayPal, Apple Pay, Google Pay, Klarna
- Bottom legal bar: Terms of Service, Privacy Policy, copyright

**Configurable Settings**:
- 4 menu pickers (one per column)
- Column heading text (4 inputs)
- Newsletter heading and description text
- Social media URLs (Instagram, Pinterest, Facebook)
- Show/hide social icons, payment icons
- Background colour, text colour

**Mobile Behaviour**: Accordion-style columns (tap to expand)

---

### Newsletter Popup

**Appears On**: All consumer pages (desktop only). Disabled on hospitality and weddings pages.

**Trigger**: After 60 seconds or exit-intent. Not on first page load. Not on mobile (intrusive interstitial penalty). Suppressed for 30 days after dismissal.

**Content**:
- Lifestyle image
- "Still thinking? Get 10% off your first order and our best styling ideas."
- Email input + submit button
- Clearly visible dismiss option

**Configurable Settings**:
- Enable/disable toggle
- Trigger delay (seconds)
- Exit-intent enable/disable
- Heading, body text, button text
- Lifestyle image
- Discount code or integration with email platform

---

### Trust Bar

**Appears On**: Homepage, Collection, Search (explicitly included in those specs)

**Content**: 4 trust icons in a horizontal strip:
1. Shield icon -- "30-Day Guarantee"
2. Truck icon -- "Free UK Shipping Over £50"
3. Battery icon -- "12-Hour Battery, USB-C"
4. Return-arrow icon -- "Free Returns"

**Configurable Settings**:
- Number of trust points (1-6, default 4)
- Per trust point: icon, heading text, subtext
- Background colour
- Show/hide toggle
- Show dividers toggle

**Responsive Notes**:
- Desktop: single horizontal row, evenly spaced
- Mobile: 2x2 grid or horizontally scrollable strip

---

### Trust Icon Strip (Product Page)

**Appears On**: Product page (below ATC button)

**Content**: 5 icons with labels:
1. Shield -- "30-Day Guarantee"
2. Returns -- "Free Returns"
3. Truck -- "Free Shipping Over £50"
4. Water -- "IP54 Waterproof"
5. Battery -- "12hr Battery"

**Configurable Settings**:
- Icon set (SVG or emoji fallback)
- Labels (merchant-editable per position)
- Show/hide individual icons
- Alignment

**Note**: This is a more compact, product-specific variant of the trust bar. Positioned immediately below ATC for maximum conversion impact.

---

### Product Card

**Appears On**: Homepage (featured collections), Collection, Search, Cart (cross-sell), 404 (recommendations), Article (Shop the Look)

**Fields Shown**:
- Product image (lifestyle-first, portrait 3:4 ratio)
- Product title
- Price (with compare-at strikethrough for bundles/sales)
- Colour swatches (small dots, max 5 visible + overflow)
- Star rating (hidden at launch, visible when 5+ reviews exist)
- Quick-add overlay (hover on desktop, persistent icon on mobile)
- Badges (conditional, from product tags):
  - `bundle` tag: "SET" badge
  - `bundle` + compare_at_price: "Save X%" badge
  - `new` tag: "NEW" badge
  - `bestseller` tag: "BEST SELLER" badge
  - `!product.available`: "SOLD OUT" badge

**Configurable Settings**:
- Image aspect ratio (portrait / square / landscape)
- Show/hide star ratings, colour swatches, quick-add
- Badge style (pill / rectangle)
- Columns (desktop/mobile)

---

### Cart Drawer

**Appears On**: All pages (triggered by Add to Cart or cart icon click)

**Structure**:
- Title with item count + close button
- Free shipping progress bar (£50 threshold)
- Line items: thumbnail, name, colour, quantity stepper, price, remove
- Bundle savings reinforcement on bundle line items
- Bundle upsell: "Add a second lamp and save 15%" (when single lamp in cart, no bundle)
- Subtotal
- "Continue to Checkout" primary CTA
- Express checkout: Shop Pay, Apple Pay, Google Pay
- Trust line: "30-day guarantee | Free returns"

**Configurable Settings** (theme-level):
- Cart type: drawer (default) -- cart page as fallback
- Free shipping threshold amount
- Upsell heading text
- Bundle products to feature in upsell
- Trust line text

---

### Article Card

**Appears On**: Blog listing, Article page (related articles), Homepage (if blog preview added)

**Fields Shown**:
- Featured image (lazy loaded, aspect ratio container)
- Category tag pill (first tag)
- Title (h3, linked)
- Excerpt (truncated, 2 lines max)
- Meta row: date + read time
- Entire card clickable

---

## 3. Section Reuse Matrix

| Section Type | index | product | collection | cart | search | 404 | password | blog | article | about | contact | faq | hospitality | weddings | lookbook | shipping |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| Hero / Banner (image-with-text-overlay) | X | | | | | | | | | X | | | X | X | X | |
| Hero Banner (custom hero-banner) | X | | | | | | | | | | | | | | | |
| Trust Bar (4-icon strip) | X | | X | | X | | | | | | | | | | | |
| Trust Icon Strip (below ATC) | | X | | | | | | | | | | | | | | |
| Trust Line (text) | | X | X | X | | | | | | | | | | | | |
| Product Information (main product section) | | X | | | | | | | | | | | | | | |
| FAQ / Collapsible Accordion | | X | | | | | | | | | | X | X | X | | |
| Featured Collection / Product List | X | | | | | X | | | | | | | | | | |
| Product Recommendations | | X | | X | | | | | | | | | | | | |
| Product Grid (collection) | | | X | | | | | | | | | | | | | |
| Product Grid (search results) | | | | | X | | | | | | | | | | | |
| Shop by Setting (collection cards) | X | | | | | | | | | | | | | | X | |
| Shop by Style (collection list) | X | | | | | | | | | | | | | | | |
| Collection Hero | | | X | | | | | | | | | | | | | |
| Filter & Sort Bar | | | X | | | | | | | | | | | | | |
| Editorial Interrupt Banner | | | X | | | | | | | | | | | | | |
| B2B Hospitality Banner (conditional) | | | X | | | | | | | | | | | | | |
| Pagination / Load More | | | X | | | | | | | | | | | | | |
| Bundle Upsell (product list) | | X | | X | | | | | | | | | | | | |
| "What's Included" (bundle only) | | X | | | | | | | | | | | | | | |
| Sticky Mobile ATC Bar | | X | | | | | | | | | | | | | | |
| Reviews (hidden at launch) | | X | | | | | | | | | | | | | | |
| Rich Text | | | | | | | | | | X | X | X | | X | | X |
| Rich Text with Button | | | | | | | | | | X | X | X | | | | X |
| Image Banner (no text) | | | | | | | | | | X | | | | | | |
| Multicolumn (icon columns) | | | | | | | | | | X | X | | X | X | | |
| Image with Text (split layout) | X | | | | | | | | | | | | X | X | | |
| Value Proposition Strip (icon + text) | X | | | | | | | | | | | | | | | |
| Social Proof / As Seen In | X | | | | | | | | | | | | | | | |
| Newsletter Signup | X | | | | | | | X | X | X | | | | | X | |
| Main Cart | | | | X | | | | | | | | | | | | |
| Free Shipping Progress Bar | | | | X | | | | | | | | | | | | |
| Cart Line Items | | | | X | | | | | | | | | | | | |
| Cart Summary / Totals | | | | X | | | | | | | | | | | | |
| Recovery Message (main-404) | | | | | | X | | | | | | | | | | |
| Search Header | | | | | X | | | | | | | | | | | |
| Zero-Results Recovery | | | | | X | | | | | | | | | | | |
| Non-Product Results | | | | | X | | | | | | | | | | | |
| Password Hero | | | | | | | X | | | | | | | | | |
| Password Footer | | | | | | | X | | | | | | | | | |
| Blog Hero | | | | | | | | X | | | | | | | | |
| Category Filter Bar | | | | | | | | X | | | | | | | | |
| Featured Article | | | | | | | | X | | | | | | | | |
| Article Grid (main-blog) | | | | | | | | X | | | | | | | | |
| Breadcrumb Navigation | | | | | | | | | X | | | | | | | |
| Article Hero | | | | | | | | | X | | | | | | | |
| Article Content (main-article) | | | | | | | | | X | | | | | | | |
| Social Sharing | | | | | | | | | X | | | | | | | |
| Shop the Look (product cards) | | | | | | | | | X | | | | | | | |
| Related Articles | | | | | | | | | X | | | | | | | |
| Contact Form (custom) | | | | | | | | | | | X | | | | | |
| Contact Channels (multicolumn) | | | | | | | | | | | X | | | | | |
| UK Address / Trust | | | | | | | | | | | X | | | | | |
| FAQ Redirect | | | | | | | | | | | X | | | | | |
| Volume Pricing Table | | | | | | | | | | | | | X | | | |
| Venue Gallery | | | | | | | | | | | | | X | X | | |
| How to Order (steps) | | | | | | | | | | | | | X | | | |
| Charging at Scale | | | | | | | | | | | | | X | | | |
| B2B Enquiry Form | | | | | | | | | | | | | X | | | |
| B2B FAQ | | | | | | | | | | | | | X | | | |
| Event Packages Table | | | | | | | | | | | | | | X | | |
| Event Benefits (multicolumn) | | | | | | | | | | | | | | X | | |
| Entertainer Pack Bundle Link | | | | | | | | | | | | | | X | | |
| Inspiration / Testimonials | | | | | | | | | | | | | | X | | |
| Event Enquiry Form | | | | | | | | | | | | | | X | | |
| Event FAQ | | | | | | | | | | | | | | X | | |
| Lookbook Feature (repeatable) | | | | | | | | | | | | | | | X | |
| Seasonal Feature Slot | | | | | | | | | | | | | | | X | |
| Shipping Options Table | | | | | | | | | | | | | | | | X |
| Free Shipping Callout | | | | | | | | | | | | | | | | X |
| Shipping Details | | | | | | | | | | | | | | | | X |
| Returns & Guarantee Link | | | | | | | | | | | | | | | | X |
| Contact CTA (rich-text-with-button) | | | | | | | | | | | | X | | | | X |

**Legend**: X = Section appears on this page

### Build Priority (by reuse frequency)

1. **Newsletter Signup** -- 5 pages (index, blog, article, about, lookbook)
2. **Rich Text** -- 4 pages (about, contact, faq, shipping) + used as building block on others
3. **Rich Text with Button** -- 4 pages (about, contact, faq, shipping)
4. **Hero / Banner (image-with-text-overlay)** -- 4 pages (about, hospitality, weddings, lookbook) + homepage has its own custom hero
5. **FAQ / Collapsible Accordion** -- 4 pages (product, faq, hospitality, weddings)
6. **Trust Bar** -- 3 pages (index, collection, search)
7. **Multicolumn (icon columns)** -- 4 pages (about, contact, hospitality, weddings)
8. **Featured Collection / Product List** -- 2 pages (index, 404) but core commerce component
9. **Product Card** -- 6+ pages (shared component used across index, collection, search, cart, 404, article)
10. **Image with Text** -- 3 pages (index, hospitality, weddings)

---

## 4. Navigation Architecture

### Primary Navigation (Desktop -- Mega-Menu)

**Location**: Top header bar, centre or left-aligned

1. **Shop** (mega-menu dropdown)
   - **By Setting**: Dining & Entertaining | Bedroom & Bedside | Garden & Outdoor | Restaurants & Bars
   - **By Style**: Mushroom & Dome | Slim & Modern | Lantern & Shade | Sculptural | Geometric | Crystal & Glass
   - **Featured**: All Lamps | Sets & Bundles | New Arrivals | Best Sellers | Gifts
2. **Styling Ideas** --> `/pages/styling-ideas`
3. **Our Story** --> `/pages/our-story`

### Footer Navigation (4 Columns)

**Column 1 -- Shop**:
- All Lamps --> `/collections/all-lamps`
- Sets & Bundles --> `/collections/sets-bundles`
- New Arrivals --> `/collections/new-arrivals`
- Gift Cards --> `/products/gift-card`

**Column 2 -- Help**:
- FAQ --> `/pages/faq`
- Shipping & Delivery --> `/pages/shipping`
- Returns & Guarantee --> `/pages/faq#returns`
- Contact Us --> `/pages/contact`

**Column 3 -- About**:
- Our Story --> `/pages/our-story`
- Styling Ideas --> `/pages/styling-ideas`
- Blog --> `/blogs/journal`

**Column 4 -- Business**:
- For Restaurants & Hospitality --> `/pages/for-restaurants-hospitality`
- For Weddings & Events --> `/pages/for-weddings-events`

**Bottom Bar**: Terms of Service | Privacy Policy | (C) Lettii 2026

### Mobile Navigation (Hamburger)

**Style**: Slide-out drawer

1. Shop (expandable accordion: By Setting / By Style / Featured -- mirrors desktop mega-menu)
2. Styling Ideas
3. Our Story
4. FAQ
5. Contact
6. *Bottom section:* For Restaurants & Hospitality | For Weddings & Events

---

## 5. Theme Configuration Needs

### Shared Components & Navigation
- **Header menu selection**: Primary nav mega-menu with 3 groups (By Setting, By Style, Featured) + 2 direct links
- **Footer link groups**: 4 Shopify menus, one per column, with merchant-editable column headings
- **Announcement bar**: On/off toggle, repeatable message blocks (up to 6), rotation speed, per-message link URL
- **Newsletter popup**: Enable/disable, trigger delay, exit-intent toggle, mobile suppression, 30-day cookie-based suppression
- **Footer newsletter**: Separate from popup; always visible in footer; 10% off incentive copy

### Commerce Behaviour
- **Cart type**: Drawer (primary, default) with page fallback at `/cart`
- **Sticky header**: Enabled, condenses on scroll
- **Predictive search**: Dropdown suggestions in header search bar (top 3-4 product matches with thumbnails as user types)
- **Free shipping threshold**: Merchant-configurable (default: GBP 50.00); used by cart drawer progress bar, cart page progress bar, and trust messaging
- **Express checkout**: Shop Pay, Apple Pay, Google Pay enabled on cart drawer, cart page, and product page
- **Quick-add on collection/search**: Variant selector (colour) appears before add-to-cart on product card interaction

### Content & Data Requirements

**Product Metafields**:
| Metafield | Namespace.Key | Type | Purpose |
|-----------|---------------|------|---------|
| Value proposition | `custom.value_prop` | Single-line text | One-liner below product title |
| Specs | `custom.specs` | JSON | Spec accordion content (material, height, weight, etc.) |
| What's Included | `custom.whats_included` | JSON | Bundle contents (product handles, names, individual prices) |
| Product FAQ | `custom.faq` | JSON | Product-specific FAQ accordion overrides |
| Bundle savings | `custom.bundle_savings` | Single-line text | Savings amount for bundle display |
| Bundle compare price | `custom.bundle_compare_price` | Single-line text | "If bought separately" price |
| Meta description | `custom.meta_description` | Single-line text | Per-product SEO meta description |
| Bundle upsells | `custom.bundle_upsells` | List of product references | Related bundles for "Better Together" section |

**Product Tags Used for Logic**:
- `bundle` -- triggers "What's Included" block, "SET" badge, savings display
- `new` -- triggers "NEW" badge on collection/search cards
- `bestseller` -- triggers "BEST SELLER" badge
- Setting tags (e.g., `dining`, `garden`, `bedroom`) -- used for cross-sell filtering

**Collection Data**:
- Each collection needs: title, description (1-2 sentences in brand voice), hero lifestyle image
- 16 collections planned (4 setting, 6 style, 3 featured, 1 bundles, 1 gifts, 1 all)

**FAQ Data**: Static content in collapsible-content section blocks (4 categories, ~23 Q&A pairs total across consumer FAQ). FAQPage JSON-LD schema required.

### Feature Toggles & Integrations
- **Newsletter popup**: Enable/disable (disabled on hospitality and weddings pages)
- **Reviews app**: Integration point on product page (Section 8) -- hidden when review count < 5. Configurable threshold. App: Judge.me, Stamped, or Loox.
- **Star ratings on product cards**: Show/hide toggle (hidden at launch)
- **Sticky mobile ATC bar**: Enable/disable (product page, mobile only)
- **Social proof section**: Toggle between "launch" mode (implied authority with image strip) and "reviews" mode (review carousel)
- **Email marketing integration**: Shopify customer marketing or Klaviyo for newsletter form, popup, and password page email capture
- **Live chat**: Third-party widget (e.g., Tidio, Gorgias) -- referenced on contact page. "Look for the chat icon in the bottom corner."
- **Klarna**: Payment method available at checkout (not promoted on PDP at launch due to price point)

---

## 6. Content Statistics

| Metric | Count |
|--------|-------|
| Total pages | 16 |
| Total sections across all pages | 97 |
| Unique section types | 63 |
| Shared global components | 6 (header, footer, announcement bar, newsletter popup, cart drawer, product card) |
| Shared reusable sections | 10 (trust bar, newsletter signup, rich text, rich text with button, hero/banner, FAQ accordion, multicolumn, image with text, featured collection, contact CTA) |
| Interactive elements | 12 (see below) |
| Custom page templates | 7 (page.about, page.contact, page.faq, page.hospitality, page.weddings, page.lookbook, page.shipping) |
| Product metafields required | 8 |
| Collections planned | 16 |

### Interactive Elements

| Element | Type | Location | Purpose | Trigger |
|---------|------|----------|---------|---------|
| Mobile Menu | Drawer | Header | Navigation on mobile | Hamburger icon tap |
| Cart Drawer | Drawer | Site-wide | Quick cart view with upsell | Cart icon click or ATC |
| Search Overlay | Predictive dropdown | Header | Product search with thumbnails | Search icon click / typing |
| Newsletter Popup | Modal | Site-wide (desktop) | Email capture with 10% off | 60s timer or exit-intent |
| Product Variant Picker | Swatch selector | Product page | Choose colour | Direct interaction |
| Quick-Add | Overlay / drawer | Collection, Search, Homepage | Add to cart from product card | Hover (desktop) / tap (mobile) |
| Sticky Mobile ATC | Fixed bar | Product page (mobile) | Persistent purchase CTA | Main ATC scrolls out of view |
| FAQ Accordion | Expandable | Product, FAQ, Hospitality, Weddings | Show/hide Q&A content | Click/tap on question |
| Filter & Sort | Chip bar / bottom sheet | Collection page | Narrow products by attribute | Click filter chip / "Filter" button |
| Free Shipping Progress Bar | Animated bar | Cart drawer, Cart page | Show progress to free shipping | Cart total changes |
| B2B Enquiry Form | Form | Hospitality, Weddings | Lead capture for volume orders | Form submission |
| Contact Form | Form | Contact page | Customer support enquiry | Form submission |

---

**Last Updated**: 2026-03-30
**Status**: DRAFT
