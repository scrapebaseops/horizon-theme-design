# Consistency Review

## Review Date: 2026-03-30

## Scope
All 16 page spec files in `/pages/` plus `_handoff-brief.md`. Reviewed against 9-point checklist: section naming, voice/tone, setting naming, cross-page references, shared components, section type mapping, dynamic data conventions, trust signal consistency, and collection names/handles.

---

## Inconsistencies Found and Resolved

| # | Issue | Pages Affected | Resolution |
|---|-------|---------------|------------|
| 1 | **Trust bar naming**: Product page called it "Trust Icon Strip" with section type `text` or `custom-liquid`. All other pages call it "Trust Bar" with section type `trust-bar`. | `product.md` | Renamed to "Trust Bar" and updated section type to `trust-bar` (with `custom-liquid` fallback note for inline rendering). Also updated "trust strip" references in Decisions and Complexity tables. |
| 2 | **Announcement bar message order**: Product page listed messages 3 and 4 in swapped order compared to homepage canonical definition. | `product.md` | Reordered to match homepage: 1. Guarantee, 2. Shipping, 3. USB-C/Battery, 4. Returns. |
| 3 | **Trust bar items mismatch (collection/search)**: Collection and search pages used 4 trust bar items that differed from homepage -- they split "12-Hour Battery" and "USB-C Charging" into separate items and dropped "Free Returns". Homepage combines battery+USB-C and includes Free Returns. | `collection.md`, `search.md` | Aligned to homepage pattern: item 3 is now "12-Hour Battery, USB-C" and item 4 is now "Free Returns". Updated media requirements (return-arrow icon instead of USB-C plug icon). |
| 4 | **Newsletter heading capitalization**: Homepage used "Stay in the Glow" (title case), blog/article used "Stay in the glow." (sentence case with period), About used "Stay in the glow" (no period). | `index.md`, `page-about.md` | Standardized to "Stay in the glow." (sentence case, with period) across all pages. Matches brand voice: understated, direct. |
| 5 | **Newsletter body text divergence**: Lookbook page used completely different newsletter copy ("More ideas, new designs, 10% off" / "Join the list for styling inspiration..."). About page used "New designs, styling ideas, and 10% off your first order." Homepage used "New designs, styling ideas, and subscriber-only offers. Plus 10% off your first order." Blog/article used the most on-brand version. | `page-lookbook.md`, `page-about.md`, `index.md` | Aligned all newsletter sections to the blog/article pattern as the canonical copy, with minor variation for the homepage (retains "Plus 10% off your first order" since that page serves cold traffic). Lookbook and About now use the standard body text. |
| 6 | **Newsletter disclaimer inconsistency**: Homepage used "No spam. Unsubscribe anytime." while blog/article used "We send 2-4 emails per month. Unsubscribe anytime." | `index.md` | Standardized to "We send 2-4 emails per month. Unsubscribe anytime." (more specific, more trustworthy). |
| 7 | **404 page collection handle**: 404 page linked "Continue shopping" to `/collections/all` while every other page uses `/collections/all-lamps`. | `404.md` | Changed to `/collections/all-lamps` (2 occurrences: button link default and content decisions section). |
| 8 | **Shipping page newsletter link**: "Join our newsletter" linked to `/pages/styling-ideas` which is the lookbook page, not a newsletter signup. | `page-shipping.md` | Changed to "Sign up for our newsletter in the footer to be first to know." since the footer contains the newsletter form on every page. |
| 9 | **Shipping page heading capitalization**: "Returns & guarantee" used lowercase "g" while footer nav and FAQ page use "Returns & Guarantee". | `page-shipping.md` | Capitalized to "Returns & Guarantee" to match cross-site convention. |

---

## Naming Conventions Established

### Section Type Names (Canonical)
| Section | Shopify Section Type | Used On |
|---------|---------------------|---------|
| Announcement Bar | `announcement-bar` | All pages (global) |
| Trust Bar | `trust-bar` | Homepage, Collection, Search, Product (inline variant) |
| Newsletter Signup | `newsletter` | Homepage, Blog, Article, About, Lookbook |
| Product Recommendations | `product-recommendations` | Product page ("Complete the Setting") |
| Cross-sell (Cart) | `product-list` | Cart page ("You may also like") |
| FAQ / Objection Handling | `collapsible-content` | Product, FAQ, Hospitality, Weddings |
| Featured Collection | `featured-collection` | Homepage (Bundles, All Lamps) |

### Shared Component Names
- **Trust Bar** (not "Trust Strip" or "Trust Icon Strip")
- **Announcement Bar** (not "Announcement Strip")
- **Newsletter Signup** (not "Email Capture" or "Newsletter CTA")
- **Product Card** (consistent across Collection, Search, Homepage, 404)

### Setting Name Patterns
- `heading` for section headings (never `title_text` or `heading_text`)
- `subheading` or `body` for supporting text
- `cta_text` + `cta_url` for call-to-action buttons
- `background_color` / `text_color` for colour settings
- `show_*` prefix for toggle settings (e.g., `show_breadcrumbs`, `show_date`)

### Announcement Bar Messages (Canonical Order)
1. "30-Day Guarantee | Love It or Send It Back"
2. "Free UK Shipping Over £50"
3. "USB-C Rechargeable | Up to 12 Hours"
4. "Free Returns, No Questions Asked"

### Trust Bar Items (Canonical 4-Item Version)
1. 30-Day Guarantee
2. Free UK Shipping Over £50
3. 12-Hour Battery, USB-C
4. Free Returns

Note: Product page uses a 5-item inline variant (adds IP54 Waterproof) because it sits adjacent to the Add to Cart button and needs the waterproof spec for objection handling.

### Newsletter Section (Canonical Copy)
- **Heading**: "Stay in the glow."
- **Body**: "Styling ideas, new lamp drops, and the occasional offer -- straight to your inbox." (Homepage adds: "Plus 10% off your first order.")
- **Button**: "Subscribe" (or "Sign Up" on homepage)
- **Disclaimer**: "We send 2-4 emails per month. Unsubscribe anytime."

### Trust Line (Cart/Sticky Bar)
- "30-day guarantee | Free returns" (consistent across cart page, cart drawer, and sticky mobile ATC bar)

### Collection Handles
| Collection Name | Handle |
|----------------|--------|
| All Lamps | `/collections/all-lamps` |
| Sets & Bundles | `/collections/sets-bundles` |
| New Arrivals | `/collections/new-arrivals` |
| Dining & Entertaining | `/collections/dining-entertaining` |
| Bedroom & Bedside | `/collections/bedroom-bedside` |
| Garden & Outdoor | `/collections/garden-outdoor` |
| Restaurants & Bars | `/collections/restaurants-bars` |
| Mushroom & Dome | `/collections/mushroom-dome` |
| Slim & Modern | `/collections/slim-modern` |
| Lantern & Shade | `/collections/lantern-shade` |
| Sculptural | `/collections/sculptural` |
| Geometric | `/collections/geometric` |
| Crystal & Glass | `/collections/crystal-glass` |

### Footer Navigation (Canonical)
- **Shop**: All Lamps, Sets & Bundles, New Arrivals, Gift Cards
- **Help**: FAQ, Shipping & Delivery, Returns & Guarantee, Contact Us
- **About**: Our Story, Styling Ideas, Blog (Journal)
- **Business**: For Restaurants & Hospitality, For Weddings & Events

---

## Voice Notes

All 16 page specs maintain Lettii's brand voice consistently. Observations:

1. **No cliche violations found.** Zero instances of "cosy", "vibes", "gorgeous", "stunning", "passionate", "journey", "we believe in quality", or "founded in" in any draft copy.

2. **Tone gradient is appropriate.** Consumer pages (homepage, product, collection) are warm and confident. B2B pages (hospitality, weddings) are still warm but shift toward professional. Utility pages (shipping, FAQ, contact, cart) are direct and functional without losing the brand personality.

3. **Sentence length is consistent.** Draft copy across all pages uses short, punchy sentences. No spec drifts into long, corporate paragraphs.

4. **CTA language is on-brand.** "Shop the Collection", "Shop Sets & Save", "Get a Quote", "Plan Your Event" -- all direct without being pushy. No "Buy Now!" or aggressive language.

5. **FAQ answers across product page, FAQ page, hospitality, and weddings are well-differentiated.** Product page FAQs address consumer objections. FAQ page expands on the same topics. B2B FAQs are tailored to venue operators and event planners. No copy-paste between contexts.

6. **The "guarantee sandwich" pattern is consistent.** Trust/guarantee messaging appears near the ATC on product pages, in the cart summary, and as a closing section on content pages (About, FAQ, Shipping). The phrasing varies naturally while the core message ("30-day money-back guarantee, free returns, no questions asked") is consistent.

---

## Cross-Page Reference Verification

| Reference | Status |
|-----------|--------|
| Homepage hero CTA -> `/collections/all-lamps` | Confirmed |
| Homepage secondary CTA -> `/collections/sets-bundles` | Confirmed |
| Shop by Setting cards -> 4 setting collections | Confirmed: all 4 handles match collection spec |
| Shop by Style cards -> 6 style collections | Confirmed: all 6 handles match collection spec |
| Lifestyle banner CTA -> `/pages/our-story` | Confirmed: page spec exists |
| Footer Shop links (4 items) | Confirmed: all collection handles valid |
| Footer Help links (4 items) | Confirmed: FAQ, Shipping, Contact pages all have specs |
| Footer About links (3 items) | Confirmed: Our Story, Styling Ideas, Blog all have specs |
| Footer Business links (2 items) | Confirmed: Hospitality and Weddings pages both have specs |
| Cart empty state CTAs | Confirmed: both collection handles valid |
| 404 page -> `/collections/all-lamps` | Fixed (was `/collections/all`) |
| Product page B2B link -> `/pages/hospitality` | See Unresolved Questions |
| Shipping page Returns link -> `/pages/faq` | Confirmed |
| Contact page FAQ link -> `/pages/faq` | Confirmed |
| Collection B2B banner -> `/pages/hospitality` | See Unresolved Questions |
| Lookbook feature CTAs -> collection pages | Confirmed: all 4 collection handles valid |
| Blog/article breadcrumbs -> `/blogs/journal` | Confirmed |
| Search zero-results -> 4 collection cards | Confirmed: all handles valid |

---

## Dynamic Data Convention Verification

| Convention | Status |
|------------|--------|
| `{{liquid.variable}}` double-brace format | Consistent across all 7 files that use Liquid variables |
| `[MERCHANT: instruction]` bracket format | Consistent across all 10 files that use merchant notes (59 total occurrences) |
| Metafield namespace: `product.metafields.custom.*` | Consistent in product.md |
| Price formatting: currency symbol + variable | Consistent |
| Date formatting: `'%d %B %Y'` | Consistent in blog/article specs |
| Shipping threshold value: £50 | Consistent across all specs that reference it |
| Return period: 30 days | Consistent across all specs |
| Newsletter incentive: 10% off first order | Consistent across all specs |

---

## Unresolved Questions

1. **Product page B2B link URL mismatch**: The product page spec says the B2B link points to `/pages/hospitality`, but the hospitality page spec defines its URL handle as `/pages/for-restaurants-hospitality`. Similarly, the collection B2B banner links to `/pages/hospitality`. The merchant needs to decide: use the shorter `/pages/hospitality` as the handle (update the hospitality spec) or the longer `/pages/for-restaurants-hospitality` (update the product page and collection specs). Recommendation: use `/pages/hospitality` as the Shopify page handle since it is linked from multiple high-traffic surfaces.

2. **Product page trust bar: 4 vs 5 items**: The product page uses 5 trust bar items (adding IP54 Waterproof) while all other pages use 4. This is documented as intentional for the conversion context, but the merchant should confirm whether to keep the 5-item variant on the product page or standardize to 4.

3. **Cart page cross-sell heading**: The cart page uses "You may also like" while the product page uses "Complete the Setting". This is contextually appropriate (cart = generic discovery, product = setting-aware), but the merchant may want to align these. Alternative options: "Worth a look" (used on 404), or keep the current context-appropriate split.

4. **Newsletter button text**: Homepage uses "Sign Up" while blog, article, and lookbook use "Subscribe". The shared newsletter section component should use one or the other. Recommendation: "Subscribe" everywhere.

5. **Blog handle**: The blog spec recommends "journal" as the handle (`/blogs/journal`) but flags this as an open decision between "journal", "the-edit", and "blog". This needs a final decision before implementation since it affects breadcrumbs, URLs, and internal links across article.md and blog.md.

6. **Reviews app selection**: Product page and homepage both reference a reviews section that depends on a third-party app (Judge.me, Stamped, or Loox). This needs to be chosen before implementation.

7. **Klaviyo vs Shopify email marketing**: Newsletter sections reference both Shopify customer marketing and Klaviyo. The merchant needs to confirm which platform will be used so the form integration is correct.
