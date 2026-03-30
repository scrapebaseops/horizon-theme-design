# Site Structure Plan

## Brand: Lettii
## Key Brand Traits: Mid-premium cordless lamp range, bundle AOV strategy, lifestyle/aspirational selling, ad-driven cold traffic, dual D2C + B2B audience, new brand trust-building, gift-occasion product

---

## Pages & Templates

### Core Commerce
| Page | Template | Alternate Templates | Notes |
|------|----------|-------------------|-------|
| Homepage | `index` | — | Brand magazine cover: lifestyle hero, shop by setting, featured bundles, trust signals. Primary entry for retargeting and brand search. |
| Product | `product` | — | Primary conversion surface for ad traffic. Lifestyle-first gallery, trust strip, bundle upsell, FAQ accordion. Same template for singles and bundles (bundles have "What's Included" block). |
| Collection | `collection` | — | Setting-based and style-based collections share one template. Hero lifestyle image, narrative intro, lifestyle product cards. |
| Cart | `cart` | — | Cart drawer is the primary cart surface (configured via theme settings). Cart page as fallback with bundle upsell, free shipping progress bar, trust signals. |
| Search | `search` | — | Lifestyle product cards, zero-results handling with popular collections and settings. |
| 404 | `404` | — | Recovery page: search bar, popular collections, brand voice ("We can't find that page, but we can light the way back"). |
| Password | `password` | — | Pre-launch email capture with hero lifestyle image and launch incentive (10% off first order). |

### Content Pages
| Page | Template | Purpose | Priority |
|------|----------|---------|----------|
| Our Story | `page.about` | Problem-led brand narrative (300 words), lifestyle imagery, guarantee close. Builds credibility for new brand. | High |
| Contact | `page.contact` | Email, live chat hours, response time commitment, UK address, contact form. Trust-building for new brand. | High |
| FAQ | `page.faq` | Objection handling: battery, brightness, waterproofing, price justification, returns. Reduces support load. | High |
| For Restaurants & Hospitality | `page.hospitality` | B2B landing page: volume pricing, commercial benefits, venue gallery, enquiry form. Reached via footer + Google Ads. | High |
| For Weddings & Events | `page.weddings` | B2B/occasion landing page: event packages, wedding imagery, event-date enquiry form. Separate from hospitality (different emotional driver). | Medium |
| Styling Ideas | `page.lookbook` | Editorial lookbook: setting-based features with lifestyle images, shoppable product links, seasonal rotation. SEO + retargeting asset. | Medium |
| Shipping & Delivery | `page.shipping` | Clear shipping table (standard/express), delivery times, UK-only note. Linked from trust badges and footer. Not a Shopify-native policy — this is a customer-facing explainer. | Medium |

### Blog / Editorial
| Page | Template | Purpose |
|------|----------|---------|
| Blog listing | `blog` | SEO content hub: "dinner party table styling," "best cordless lamps for restaurants," "outdoor dining lighting ideas." Long-tail acquisition. |
| Blog article | `article` | Individual SEO articles with lifestyle imagery, shoppable product links, email capture CTA. |

### Policy Surfaces
| Surface | Managed In | Custom Explainer Needed? | Notes |
|---------|------------|--------------------------|-------|
| Terms of Service | Shopify policy settings | No | Standard native policy URL. Footer link. |
| Privacy Policy | Shopify policy settings | No | Standard native policy URL. Footer link. |
| Shipping Policy | Shopify policy settings | Yes — `page.shipping` | Brief native policy text + dedicated explainer page for customer clarity. |
| Return / Refund Policy | Shopify policy settings | No | 30-day guarantee messaging integrated into product pages, cart, FAQ, and footer. Native policy URL for legal text. Guarantee prominence is handled via trust signals across the site, not a standalone page. |

### Collections Architecture
| Collection | Handle | Purpose |
|-----------|--------|---------|
| All Lamps | `all-lamps` | Complete catalog. Default landing for "Shop" nav item. Filterable by setting, style, colour, price. |
| Best Sellers | `best-sellers` | Populated post-launch based on sales data. Initially hidden or shows featured/curated picks. |
| New Arrivals | `new-arrivals` | Latest additions. Relevant for return visitors and email campaigns. |
| **Shop by Setting** | | |
| Dining & Entertaining | `dining-entertaining` | Primary setting collection. Hero lifestyle dinner table scene. Links from Meta ads targeting dinner/entertaining. |
| Bedroom & Bedside | `bedroom-bedside` | Cosy, warm bedside scenes. |
| Garden & Outdoor | `garden-outdoor` | Seasonal hero — spring/summer launch angle. Terrace, garden party, al fresco dining. |
| Restaurants & Bars | `restaurants-bars` | Dual purpose: consumer browsing + subtle B2B entry point (banner links to hospitality page). |
| **Shop by Style** | | |
| Mushroom & Dome | `mushroom-dome` | Style family collection. |
| Slim & Modern | `slim-modern` | Style family collection. |
| Lantern & Shade | `lantern-shade` | Style family collection. |
| Sculptural | `sculptural` | Style family collection. |
| Geometric | `geometric` | Style family collection. |
| Crystal & Glass | `crystal-glass` | Style family collection. |
| **Bundles** | | |
| Sets & Bundles | `sets-bundles` | Dedicated bundle collection. All bundles with lifestyle imagery, savings callouts. Linked from homepage and nav. |
| **Other** | | |
| Gifts | `gifts` | Gift-appropriate lamps and bundles. Gift card cross-link. Gift-occasion messaging. |

---

## Navigation Plan

### Primary Navigation (Desktop)
1. **Shop** (mega-menu dropdown)
   - **By Setting**: Dining & Entertaining | Bedroom & Bedside | Garden & Outdoor | Restaurants & Bars
   - **By Style**: Mushroom & Dome | Slim & Modern | Lantern & Shade | Sculptural | Geometric | Crystal & Glass
   - **Featured**: All Lamps | Sets & Bundles | New Arrivals | Best Sellers | Gifts
2. **Styling Ideas** → `/pages/styling-ideas`
3. **Our Story** → `/pages/our-story`

### Footer Navigation
**Column 1: Shop**
- All Lamps
- Sets & Bundles
- New Arrivals
- Gift Cards

**Column 2: Help**
- FAQ
- Shipping & Delivery
- Returns & Guarantee (links to FAQ returns section or native policy)
- Contact Us

**Column 3: About**
- Our Story
- Styling Ideas
- Blog

**Column 4: Business**
- For Restaurants & Hospitality
- For Weddings & Events

**Bottom bar:**
- Terms of Service (native policy link)
- Privacy Policy (native policy link)
- © Lettii 2026

### Mobile Navigation (Hamburger)
1. Shop (expandable: By Setting / By Style / Featured — mirrors desktop mega-menu)
2. Styling Ideas
3. Our Story
4. FAQ
5. Contact
6. *Bottom section:* For Restaurants & Hospitality | For Weddings & Events

---

## Shared Components

### Header
- Logo (left)
- Primary navigation (center or left-aligned)
- Search icon, account icon, cart icon with count (right)
- Announcement bar above header: rotating messages (30-day guarantee / Free UK shipping over £50 / Free returns / USB-C rechargeable)
- Sticky header on scroll (condensed)

### Footer
- 4-column link layout (Shop, Help, About, Business)
- Newsletter signup: "Get styling ideas, new designs, and subscriber-only offers. 10% off your first order." Email input + submit.
- Social icons (Instagram, Pinterest, Facebook)
- Payment method icons (Visa, Mastercard, Amex, PayPal, Apple Pay, Google Pay, Klarna)
- Policy links + copyright

### Cart Drawer
- Slide-out from right on "Add to Cart" (not a separate page redirect)
- Line items with thumbnail, name, quantity, price
- Bundle upsell: "Add a second lamp and save 15%" (when single lamp is in cart)
- Free shipping progress bar: "You're £X away from free shipping"
- Trust line: "30-day guarantee | Free returns"
- Express checkout buttons (Apple Pay, Google Pay, Shop Pay)
- "Continue to Checkout" primary CTA

### Newsletter Popup
- Triggered after 60 seconds or exit-intent (desktop only)
- Lifestyle image + "Still thinking? Get 10% off your first order and our best styling ideas."
- Email input + submit. Dismiss option clearly visible.
- Not triggered on first page load. Not on mobile (intrusive interstitial penalty).

---

## Page Inventory Verification (Step 3 Completion Gate)

### Mandatory Shopify Pages — All Present
| Page | Template | Status |
|------|----------|--------|
| Homepage | `index` | ✓ |
| Product | `product` | ✓ |
| Collection | `collection` | ✓ |
| Cart | `cart` | ✓ |
| Search | `search` | ✓ |
| 404 | `404` | ✓ |
| Password | `password` | ✓ |

### Recommended Pages — Evaluated
| Page | Template | Status | Rationale |
|------|----------|--------|-----------|
| Blog listing | `blog` | ✓ Included | SEO content strategy planned in brand brief |
| Blog article | `article` | ✓ Included | Required for blog |
| List collections | `list-collections` | Skipped | Not needed — primary nav has mega-menu with all collections. 16 collections is manageable without a list-collections page. |
| About | `page.about` | ✓ Included | Critical for new brand trust |
| Contact | `page.contact` | ✓ Included | Trust-building, support channel |
| FAQ | `page.faq` | ✓ Included | Objection handling, support reduction |
| Shipping & Delivery | `page.shipping` | ✓ Included | Customer clarity beyond native policy |
| Gift card | `gift_card` | ✓ Included (default) | Brand brief confirms gift cards at £25/£50/£75/£100. Horizon ships default template. |

### Intentionally Skipped
- **List Collections page** — 16 collections are navigable via the mega-menu. A list-collections page would be redundant. Can be added later if collection count grows significantly.
- **Standalone Guarantee/Returns page** — Guarantee messaging is integrated across the site (trust strips, FAQ, footer, cart). The FAQ covers return process in detail. A standalone page would duplicate content. The native returns policy URL handles legal text.
- **Compare Lamps page** — Deferred. With ~20 SKUs at launch, browsing collections is sufficient. Can be added if catalog grows or if customer research shows demand.
