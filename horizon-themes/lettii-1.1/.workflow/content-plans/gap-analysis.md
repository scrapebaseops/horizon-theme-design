# Gap Analysis: Lettii Content Plans vs Horizon Theme

## Theme Baseline
- **Theme**: Horizon 3.4.0 by Shopify
- **Total sections in theme**: 40 `.liquid` files in `sections/`
- **Total snippets**: 93 `.liquid` files in `snippets/`
- **Total templates**: 13 files in `templates/` (including 1 `.liquid` for gift_card)

---

## A. Page Completeness Check

### Mandatory Shopify Pages

| Page | Template | In Site Structure? | Has Spec? | Notes |
|------|----------|-------------------|-----------|-------|
| Homepage | `index.json` | Yes | Yes (`index.md`) | 12 sections planned |
| Product | `product.json` | Yes | Yes (`product.md`) | Primary conversion surface |
| Collection | `collection.json` | Yes | Yes (`collection.md`) | Shared template for 16+ collections |
| Cart | `cart.json` | Yes | Yes (`cart.md`) | Cart drawer is primary; page is fallback |
| Search | `search.json` | Yes | Yes (`search.md`) | Includes zero-results recovery |
| 404 | `404.json` | Yes | Yes (`404.md`) | Uses native Horizon sections |
| Password | `password.json` | Yes | Yes (`password.md`) | Pre-launch email capture |

**Status**: All 7 mandatory pages are planned and spec'd.

### Recommended Pages

| Page | Template | In Site Structure? | Recommendation |
|------|----------|-------------------|----------------|
| Blog listing | `blog.json` | Yes | Included. SEO content hub. |
| Blog article | `article.json` | Yes | Included. Individual SEO articles. |
| List collections | `list-collections.json` | Intentionally skipped | Mega-menu covers 16 collections. Template exists in Horizon if needed later. |
| About | `page.about` (alternate) | Yes | Included as "Our Story" page. Needs new alternate template. |
| Contact | `page.contact` (alternate) | Yes | Included. Template exists in Horizon. |
| FAQ | `page.faq` (alternate) | Yes | Included. Needs new alternate template. |
| Shipping | `page.shipping` (alternate) | Yes | Included. Needs new alternate template. |
| Gift Card | `gift_card.liquid` | Yes (default) | Horizon ships this template. No customisation needed at launch. |
| Hospitality (B2B) | `page.hospitality` (alternate) | Yes | Included. Needs new alternate template. |
| Weddings (B2B) | `page.weddings` (alternate) | Yes | Included. Needs new alternate template. |
| Lookbook | `page.lookbook` (alternate) | Yes | Included as "Styling Ideas." Needs new alternate template. |

**Status**: All recommended pages are planned. 6 alternate page templates need creation.

### Shopify-Native Policy Surfaces

| Policy Surface | Native Policy Planned? | Custom Explainer Planned? | Notes |
|----------------|----------------------|--------------------------|-------|
| Terms of Service | Yes (Shopify settings) | No | Footer link to native policy URL |
| Privacy Policy | Yes (Shopify settings) | No | Footer link to native policy URL |
| Shipping Policy | Yes (Shopify settings) | Yes (`page.shipping`) | Brief native text + dedicated explainer page |
| Return/Refund Policy | Yes (Shopify settings) | No | 30-day guarantee integrated into product pages, cart, FAQ, footer |

**Status**: Complete. All policies accounted for.

---

## B. Sections Summary

- **Total unique sections planned across all pages**: ~55 distinct section instances
- **Already in Horizon (usable as-is)**: 15
- **In Horizon (needs modification)**: 8
- **Needs creation**: 14

---

## C. Sections Status

### Usable As-Is

These Horizon sections can be used directly with configuration-only changes (no code edits).

| Planned Section | Horizon Section File | Notes |
|----------------|---------------------|-------|
| Announcement Bar | `header-announcements.liquid` | Supports rotating messages via `_announcement` blocks. Set up to 4 trust messages. |
| Header | `header.liquid` | Supports logo position, menu position, mega-menu via `link_list`, sticky behaviour. Configurable in `header-group.json`. |
| Footer | `footer.liquid` | Supports menu blocks, email-signup block, social-links block, payment-icons block, logo block. 4-column layout achievable via group blocks. |
| Footer Utilities | `footer-utilities.liquid` | Policies and copyright. Handles legal bar. |
| Password Hero | `password.liquid` | Supports text blocks, email-signup block, logo block, background image. Matches spec exactly. |
| Password Footer | `password-footer.liquid` | Shopify-required functional footer. |
| Main 404 | `main-404.liquid` | Block-based section with text, button, configurable height/alignment/colour. |
| Product Information | `product-information.liquid` | Core product section with media gallery, variant picker, buy buttons, sticky details. Covers ~70% of product page needs. |
| Product Recommendations | `product-recommendations.liquid` | Supports related/complementary types, grid/carousel layout, configurable columns. Heading customisable. |
| Product List (Featured Collection) | `product-list.liquid` | Collection picker, grid/carousel/editorial layouts, configurable columns and product count. Used on homepage, 404, cart. |
| Main Cart | `main-cart.liquid` | Full cart section with line items, summary. Supports text/button/group blocks. |
| Main Blog | `main-blog.liquid` | Blog article grid with configurable layout, columns, pagination. Supports text/image/button blocks. |
| Main Blog Post | `main-blog-post.liquid` | Article content rendering with configurable gap, colour scheme, padding. |
| Main Page | `main-page.liquid` | Generic page section with block support. Used as base for content pages. |
| Main Collection | `main-collection.liquid` | Product grid with grid/editorial layout, card size, filtering, sorting, infinite scroll, pagination. |

### Needs Modification

These Horizon sections exist but need code changes to match the specs.

| Planned Section | Horizon Section File | What Needs Changing |
|----------------|---------------------|-------------------|
| Hero Banner (Homepage) | `hero.liquid` | Horizon's hero supports dual media (image/video), text blocks, buttons, and overlay. **Missing**: Separate mobile image picker (spec requires different desktop/landscape and mobile/portrait images). Horizon uses a single image with responsive cropping. Need to add `image_mobile` setting. **Missing**: Minimum height controls per breakpoint (spec wants `minimum_height_desktop` and `minimum_height_mobile` ranges). Horizon uses a height select (small/medium/large/auto). Also need to verify overlay opacity is a range (0-100) not just a toggle. |
| Collection List / Shop by Setting (Homepage) | `collection-list.liquid` | Horizon's collection-list supports grid/carousel/bento/editorial layouts with collection_list picker. **Missing**: Per-card overlay opacity override. **Missing**: Card-level image override (spec wants merchant to upload custom images per card rather than relying on collection images only). The section uses `collection_list` setting which auto-pulls collection images; need to verify if block-level image overrides are possible. May need to add `image_override` field per collection card block. |
| Media with Content (Lifestyle Banner) | `media-with-content.liquid` | Horizon supports media position (left/right), media width/height, text blocks, buttons. **Missing**: Full-width overlay layout option (spec wants image-left-text-right / image-right-text-left / full-width-overlay). Horizon only offers left/right split. Need to add a `full-width` layout option with text overlay. **Missing**: Optional mobile-specific image. |
| Marquee (Trust Bar adaptation) | `marquee.liquid` | Horizon's marquee is a scrolling text ticker. The spec's trust bar is a static icon+text strip, not a scrolling marquee. The marquee could be repurposed for scrolling trust messages, but the primary trust bar need is a **static** 4-icon horizontal strip. Better addressed as a new section (see "Needs Creation"). |
| Search Header | `search-header.liquid` | Horizon provides basic search header with alignment and colour scheme. **Missing**: Zero-results heading text customisation, empty-search heading, custom placeholder text. These are configurable text settings that need to be added to the schema. |
| Search Results | `search-results.liquid` | Horizon provides grid/editorial layout with card sizes and pagination. **Missing**: Zero-results recovery content (search suggestion chips, popular collection cards, reassurance text). This is a significant addition requiring new blocks or a companion section. |
| Featured Blog Posts | `featured-blog-posts.liquid` | Horizon supports blog picker, grid/carousel/editorial layout, post count, columns. **Missing**: Read time calculation display, category tag pill on cards, excerpt truncation controls. These are display enhancements to the blog card rendering. |
| Slideshow (alternative hero) | `slideshow.liquid` | Spec explicitly recommends a single hero image over a carousel, but the slideshow exists if the merchant wants it. No changes strictly needed, but the spec's single-image hero with overlay controls is better served by `hero.liquid` (with modifications above). |

### Needs Creation

These sections do not exist in Horizon and must be built from scratch.

| Planned Section | Complexity | Used On | Priority |
|----------------|-----------|---------|----------|
| **Trust Bar** (static icon+text strip) | Low-Medium | Homepage, Collection, Search, Cart, Product (as trust icon strip block) | **Critical** — appears on 5+ pages. Repeatable `trust_item` blocks with icon, text, optional link. 4-6 items in a horizontal row. Responsive: 2x2 on mobile. |
| **Collection Hero** (full-width image + title + description overlay) | Medium | Collection | **High** — every collection page uses this. Dynamic content from `collection.title`, `collection.image`, `collection.description`. Configurable overlay opacity, text alignment, height. |
| **Collection Filter/Sort Bar** (chip/pill UI) | Medium-High | Collection | **High** — core collection browsing UX. Tag-based filter chips, colour/price/type filtering, sort dropdown. Mobile: bottom sheet drawer. Horizon's `main-collection.liquid` has built-in filtering via Shopify storefront filtering, but the spec wants a custom chip/pill UI rather than standard dropdown filters. Evaluate if Horizon's native filtering (which renders via `list-filter.liquid` snippet) can be styled as chips, or if a custom filter bar section is needed. |
| **Collection Editorial Interrupt Banner** | Medium | Collection | **Medium** — inserted into product grid. Full-width lifestyle banner with image, headline, body, CTA. Positioned after N products. Requires grid interruption logic. |
| **Collection B2B Banner** (conditional) | Low | Collection (Restaurants & Bars only) | **Low** — single collection use. Text + CTA banner. Show/hide toggle. Simple rich-text-like section. |
| **Blog Hero** | Low-Medium | Blog listing | **Medium** — editorial hero with background image, blog title, subheading. Similar to collection hero but for blogs. |
| **Blog Category Filter Bar** | Low-Medium | Blog listing | **Medium** — horizontal pill buttons derived from article tags. URL-based filtering (Shopify native tag filtering). |
| **Blog Featured Article** | Medium | Blog listing | **Low-Medium** — large card for pinned/editor's pick article. Optional section. |
| **Article Hero** (custom) | Low-Medium | Article | **Medium** — full-width featured image with title, date, read time, category tag below. |
| **Article Shop the Look** | Medium | Article | **Medium** — product card grid within article. Merchant selects 2-4 products per article via section blocks. Warm background band. |
| **Article Related Posts** | Medium | Article | **Medium** — 3 article cards, tag-matched selection logic, fallback to recent. Reuses article card component. |
| **Lookbook Feature Section** | Medium-High | Lookbook/Styling Ideas | **Medium** — the key custom build for the lookbook page. Image gallery + rich text narrative + product links + CTA in a single section. Repeatable across the page. |
| **B2B Enquiry Form** (custom fields) | Medium | Hospitality, Weddings | **High** — custom contact form with venue type dropdown, quantity dropdown, optional date picker (weddings). Cannot use Shopify's native contact form (limited to name/email/message). Requires custom Liquid form or third-party form app (e.g., Hulk Contact Form, Powerful Contact Form). |
| **Pricing/Quantity Table** | Low-Medium | Hospitality, Weddings | **Medium** — HTML table or card-per-tier layout. Volume pricing display. Can potentially be done with `custom-liquid` section containing an HTML table, but a configurable section with repeatable row blocks is better for merchant editability. |

---

## D. Templates Status

| Planned Template | Exists in Horizon? | Action Needed |
|-----------------|-------------------|---------------|
| `index.json` | Yes | Configure with sections (currently empty/default) |
| `product.json` | Yes | Configure with sections (currently empty/default) |
| `collection.json` | Yes | Configure with sections (currently empty/default) |
| `cart.json` | Yes | Configure with sections (currently empty/default) |
| `search.json` | Yes | Configure with sections (currently empty/default) |
| `404.json` | Yes | Configure with sections (currently empty/default) |
| `password.json` | Yes | Has `main: password` section. Add blocks. |
| `blog.json` | Yes | Configure with sections (currently empty/default) |
| `article.json` | Yes | Configure with sections (currently empty/default) |
| `page.json` | Yes | Base page template. Used as-is for simple pages. |
| `page.contact.json` | Yes | Has `main: main-page` + `form: section`. Needs block configuration. |
| `list-collections.json` | Yes | Not needed at launch (intentionally skipped). Available if needed. |
| `gift_card.liquid` | Yes | Default Shopify gift card template. No changes needed. |
| `page.about` | **No** | **Create**: new alternate page template `page.about.json` |
| `page.faq` | **No** | **Create**: new alternate page template `page.faq.json` |
| `page.shipping` | **No** | **Create**: new alternate page template `page.shipping.json` |
| `page.hospitality` | **No** | **Create**: new alternate page template `page.hospitality.json` |
| `page.weddings` | **No** | **Create**: new alternate page template `page.weddings.json` |
| `page.lookbook` | **No** | **Create**: new alternate page template `page.lookbook.json` |

**Summary**: 13 templates exist. 6 alternate page templates need creation. All are JSON templates that reference existing or new sections.

---

## E. Theme Configuration Status

### Already Configured (exists in settings_schema.json)

| Need | Where It Exists |
|------|----------------|
| Logo and favicon | `settings_schema.json` > Logo and Favicon (standard + inverse logo, height controls) |
| Colour schemes | `settings_schema.json` > Colors (full color_scheme_group with background, foreground, buttons, inputs, variants, selected variants) |
| Typography (4 font families) | `settings_schema.json` > Typography (body, subheading, heading, accent fonts + full H1-H6 size/line-height/spacing/case controls) |
| Page width | `settings_schema.json` > Page Layout (narrow/normal/wide) |
| Animations & hover effects | `settings_schema.json` > Animations (page transitions, card hover: none/lift/scale/subtle-zoom) |
| Badge position & styling | `settings_schema.json` > Badges (position, corner radius, sale/sold-out colour schemes, font, text case) |
| Button styling | `settings_schema.json` > Buttons (border width, border radius, font for primary/secondary) |
| Cart type (page vs drawer) | `settings_schema.json` > Cart (cart_type: page/drawer, auto-open drawer, notes, discount code, installments, accelerated checkout) |
| Drawer styling | `settings_schema.json` > Drawers (colour scheme, border) |
| Product card settings | `settings_schema.json` > Product Cards (exists — need to verify exact settings) |
| Search settings | `settings_schema.json` > Search (exists — need to verify exact settings) |
| Swatch settings | `settings_schema.json` > Swatches (exists for variant colour swatches) |
| Variant picker settings | `settings_schema.json` > Variant Pickers (exists) |
| Price display settings | `settings_schema.json` > Prices (exists) |
| Icon settings | `settings_schema.json` > Icons (exists) |
| Input field styling | `settings_schema.json` > Input Fields (exists) |
| Popover/modal styling | `settings_schema.json` > Popovers and Modals (exists) |

### Needs Addition

| Need | Type | Scope |
|------|------|-------|
| Free shipping threshold | Theme setting (number input, e.g., 5000 for £50.00) | Cart settings section. Used by free shipping progress bar in cart page and cart drawer. |
| Free shipping progress bar messages | Theme settings (text inputs for below/above threshold) | Cart settings section. |
| Sticky mobile ATC bar toggle | Theme setting (checkbox) | Product settings or new "Product Page" settings group. Horizon has `enable_sticky_add_to_cart` on `product-information` section which may cover this — verify if it creates a bottom bar on mobile or just sticky-scrolls the details column. |
| Newsletter popup settings | Theme settings (enable, delay, exit-intent, mobile disable, image, text, incentive text) | New settings group or handled by third-party app (e.g., Klaviyo popup). Shopify's native popup support is limited. |
| Social media profile URLs | Theme settings (Instagram, Pinterest, Facebook URLs) | Likely exists in Shopify's native social media settings (Settings > Social media in admin). Horizon's footer has `social-links` block type. Verify these are connected. |
| B2B form routing | Configuration | Form submissions need to route to merchant email. Shopify's contact form goes to the store email by default. Custom B2B forms may need a form app for routing by subject/type. |
| Reviews app integration | Third-party app | Not a theme setting, but required for product page reviews section and homepage social proof post-launch. App installation and snippet placement needed. |
| Klaviyo/email platform integration | Third-party app | For newsletter popup, footer signup, and blog signup forms. May need custom integration snippets. |
| FAQPage JSON-LD schema | Template-level code | Custom structured data for FAQ page. Must be added to `page.faq.json` template or via a snippet. Not native to Horizon. |

---

## F. Implementation Recommendations

### Build Order (based on dependencies and priority)

**Phase 1: Foundation (blocks everything else)**
1. **Configure theme settings** — colours, typography, logo, page width, cart type (drawer), badges, buttons. These affect every page.
2. **Set up header and footer** — announcement bar messages, navigation menus, footer columns, social links, payment icons. Global components.
3. **Create Trust Bar section** — used on 5+ pages. Build once, reuse everywhere.

**Phase 2: Core Commerce (highest revenue impact)**
4. **Product page** (`product.json`) — configure `product-information` section blocks, add trust strip (custom-liquid or new block), configure variant picker and buy buttons. Build FAQ accordion block. Test sticky ATC behaviour.
5. **Collection page** (`collection.json`) — create Collection Hero section. Configure `main-collection` with product grid settings. Evaluate whether Horizon's native storefront filtering can be styled as chips before building a custom filter bar. Create Editorial Interrupt Banner.
6. **Cart page + Cart drawer** — configure `main-cart` section, set cart type to drawer, configure free shipping threshold (custom addition), add bundle upsell block (custom-liquid).
7. **Homepage** (`index.json`) — configure hero (modify `hero.liquid` for mobile image), trust bar, Shop by Setting (collection-list), featured collections (product-list x2), lifestyle banner (media-with-content), Shop by Style, newsletter, social proof placeholder.

**Phase 3: Content Pages (trust-building)**
8. **About page** (`page.about.json`) — create template. Compose using `main-page`, `section` (generic), `media-with-content`, `custom-liquid` for rich text. Most sections are generic Horizon blocks.
9. **FAQ page** (`page.faq.json`) — create template. Horizon's `section.liquid` with collapsible content blocks handles accordions natively via `@theme` blocks. Add FAQPage JSON-LD.
10. **Contact page** — configure existing `page.contact.json`. Shopify's native contact form handles basic needs. Subject dropdown requires custom form or app.
11. **Shipping page** (`page.shipping.json`) — create template. Pure rich-text sections. Lowest complexity.

**Phase 4: B2B Pages**
12. **Hospitality page** (`page.hospitality.json`) — create template. Key dependency: B2B enquiry form (custom or app). Pricing table via `custom-liquid`.
13. **Weddings page** (`page.weddings.json`) — create template. Similar to hospitality. Event date picker in form is the main complexity.

**Phase 5: Editorial**
14. **Blog listing** (`blog.json`) — configure `main-blog`, create Blog Hero and Category Filter Bar sections.
15. **Article page** (`article.json`) — configure `main-blog-post`, create Article Hero, Shop the Look, and Related Articles sections.
16. **Lookbook page** (`page.lookbook.json`) — create template and Lookbook Feature section. Highest custom section complexity.

**Phase 6: Supplementary**
17. **Search page** (`search.json`) — configure search header and results. Add zero-results recovery (modification to search-results or new section).
18. **Password page** — configure existing `password.json` with blocks. Lowest effort.
19. **404 page** — configure `404.json` with `main-404` + `product-list`. ~15 minutes in editor.

### Reuse Opportunities

| Component | Build Once, Use On |
|-----------|-------------------|
| Trust Bar section | Homepage, Collection, Search, Cart. Product page uses a trust strip block within `product-information`. |
| Product Card component | Collection grid, Search results, Homepage featured collections, Cart cross-sell, 404 recovery, Article "Shop the Look". Already handled by Horizon's `product-card.liquid` snippet. |
| Article Card component | Blog listing grid, Article related posts, Homepage blog preview (if added). |
| Newsletter signup section | Blog listing, Article page, Lookbook, Homepage. Horizon's footer already has `email-signup` block. For standalone sections, use `section.liquid` with email-signup blocks. |
| Rich text + button pattern | About (Sections 2, 4, 7, 9), FAQ (Section 6), Contact (Sections 1, 4, 5), Shipping (Sections 1, 3, 4, 5, 6). Use Horizon's `section.liquid` with text and button blocks. |
| Collapsible/accordion content | FAQ page (4 accordion sections), Product page FAQ, Hospitality page FAQ, Weddings page FAQ. Horizon supports collapsible blocks natively within its `@theme` block system. |
| Image gallery/grid | Hospitality (venue gallery), Weddings (wedding gallery), Lookbook (per-feature galleries). Horizon's `collection-list.liquid` in bento/grid mode, or `custom-liquid` with image blocks. |
| B2B enquiry form | Hospitality and Weddings pages share the same form pattern (different fields). Build one configurable form section or use one form app configured twice. |

### Horizon-Native Preferences

Where the spec suggests custom development but Horizon already provides a good solution:

| Spec Suggestion | Horizon Alternative | Recommendation |
|----------------|-------------------|----------------|
| Custom `hero-banner` section | `hero.liquid` (Horizon native) | **Use Horizon's hero** with minor modification (add mobile image picker). It already supports dual media, text/button blocks, overlay, height options. Avoid building from scratch. |
| Custom `featured-collection` section | `product-list.liquid` (Horizon native) | **Use Horizon's product-list** section. Supports collection picker, grid/carousel/editorial layouts, configurable product count and columns. Covers both Homepage "Sets & Bundles" and "All Lamps" features. |
| Custom `image-with-text` section | `media-with-content.liquid` (Horizon native) | **Use Horizon's media-with-content** for About page lifestyle banners, Hospitality "Charging at Scale," Weddings "Entertainer Pack," Homepage lifestyle banner. Add full-width overlay option if needed. |
| Custom `multicolumn` / `icon-with-text` section | `section.liquid` + group/text/icon blocks (Horizon native) | **Use Horizon's generic section** with grouped icon+text blocks for value proposition strips, contact channels, hospitality benefits, wedding benefits. Horizon's block system (text, icon, group, spacer) is highly flexible. |
| Custom collapsible content section | `section.liquid` with `@theme` collapsible blocks | **Verify** if Horizon's theme block system includes a native collapsible/accordion block type. If yes, use it for all FAQ sections. If not, this becomes a custom build. |
| Custom `collection-cards` for Shop by Setting | `collection-list.liquid` or `collection-links.liquid` | **Use `collection-links.liquid`** for the Shop by Setting section. It supports a collection_list picker with spotlight layout, image positioning, and configurable alignment. Alternatively `collection-list.liquid` for more card-style layouts. |
| Custom newsletter section | `section.liquid` with `email-signup` block | Horizon footer already has email-signup. For standalone newsletter sections (blog, article, lookbook), use `section.liquid` with text blocks + email-signup block. |
| Custom search product grid | `search-results.liquid` (Horizon native) | **Use Horizon's search-results** section. It already provides grid/editorial layout, card sizes, infinite scroll. Only the zero-results recovery content needs addition. |
| Custom blog article grid | `main-blog.liquid` (Horizon native) | **Use Horizon's main-blog** with configuration. It supports grid/carousel/editorial layouts, configurable columns, and various block types. Style article cards via CSS/snippet modifications. |

### Key Risk Areas

1. **Collection filter chip UI** — The spec wants pill/chip-style filters instead of standard dropdown filters. Horizon uses Shopify's storefront filtering which renders via `list-filter.liquid` snippet. Restyling this as chips may be feasible with CSS-only changes, or may require significant snippet rewriting. Evaluate before committing to a custom filter section.

2. **Free shipping progress bar** — Not native to Horizon. Must be built as a custom Liquid snippet/block for both the cart page and cart drawer. Requires JavaScript for real-time calculation.

3. **Bundle upsell logic** — Cart-level conditional display (show only when single lamp in cart, hide when bundle present) requires custom Liquid logic. Not a standard Horizon feature.

4. **B2B enquiry forms** — Shopify's native contact form only supports name/email/message. Custom dropdown fields (venue type, quantity, event type, date picker) require either custom Liquid form development or a third-party form app.

5. **Editorial interrupt in product grid** — Inserting a full-width banner after every N products in the collection grid requires modifying the product grid loop in `main-collection.liquid`. This is a non-trivial template modification.

6. **FAQPage structured data** — Must be manually coded as JSON-LD in the FAQ template. Not provided by Horizon or Shopify out of the box.

---

## Appendix: Horizon Section Inventory

### All Sections (40 files)

| Section File | Purpose | Key Capabilities |
|-------------|---------|-----------------|
| `_blocks.liquid` | Generic block container | @theme blocks, layout direction, alignment, gap, width, height, background media, border, colour scheme |
| `carousel.liquid` | Scrollable carousel | Columns 1-8, navigation arrows/dots, width, gap, colour scheme |
| `collection-links.liquid` | Collection link cards | Spotlight/text layout, collection_list picker, alignment, image position, colour scheme |
| `collection-list.liquid` | Collection card grid | Grid/carousel/bento/editorial layouts, collection_list picker, configurable columns, card blocks (text, icon, image, button, video, group) |
| `custom-liquid.liquid` | Custom Liquid code | Free-form Liquid input, colour scheme, width, padding |
| `divider.liquid` | Visual divider line | Thickness, width %, alignment, corner radius, colour scheme |
| `featured-blog-posts.liquid` | Blog post grid | Blog picker, grid/carousel/editorial layouts, post count, columns, card blocks |
| `featured-product-information.liquid` | Featured product (detailed) | Product picker, media position, equal columns, gap, colour scheme |
| `featured-product.liquid` | Featured product (compact) | Product picker, media position, colour scheme, block-based product info |
| `footer-group.json` | Footer section group | Groups footer and footer-utilities sections |
| `footer-utilities.liquid` | Footer policies/links | Copyright, policy links, social links, localization |
| `footer.liquid` | Main footer | Menu blocks, email-signup, social-links, payment-icons, logo, jumbo-text, follow-on-shop |
| `header-announcements.liquid` | Announcement bar | Rotating `_announcement` blocks, speed control, width, colour scheme |
| `header-group.json` | Header section group | Groups announcements and header |
| `header.liquid` | Site header | Logo position, menu position/row, search, account, cart, mega-menu support, sticky, transparent option |
| `hero.liquid` | Hero banner | Dual media (image/video x2), @theme blocks (text, button, logo, jumbo-text, group, marquee), overlay, height, content position, colour scheme |
| `layered-slideshow.liquid` | Layered/parallax slideshow | `_layered-slide` blocks (max 6), height, border, shadow, colour scheme |
| `logo.liquid` | Footer logo | Inverse toggle, font selection, size (pixel/percent) |
| `main-404.liquid` | 404 page main | @theme blocks, height, alignment, colour scheme, padding |
| `main-blog-post.liquid` | Article content | @theme blocks, gap, colour scheme, padding |
| `main-blog.liquid` | Blog listing | Article blocks (text, icon, image, button, video, group, spacer), colour scheme, padding |
| `main-cart.liquid` | Cart page main | @theme blocks (text, icon, image, button, video, group, spacer), width, colour scheme |
| `main-collection-list.liquid` | List collections page | Grid/carousel/bento/editorial layouts, columns, colour scheme |
| `main-collection.liquid` | Collection product grid | Grid/editorial layout, card sizes, filtering, sorting, infinite scroll, products per page, colour scheme |
| `main-page.liquid` | Generic page content | @theme blocks, gap, colour scheme, padding |
| `marquee.liquid` | Scrolling text marquee | Text/icon/logo/divider blocks, direction, speed, gap, colour scheme |
| `media-with-content.liquid` | Media + text split | Left/right media position, media width (narrow/medium/wide), media height, content blocks, colour scheme |
| `password-footer.liquid` | Password page footer | Colour scheme only |
| `password.liquid` | Password page main | @theme blocks, layout direction, alignment, gap, background media, width, colour scheme |
| `predictive-search-empty.liquid` | Empty predictive search | No settings |
| `predictive-search.liquid` | Predictive search | @theme blocks |
| `product-hotspots.liquid` | Product hotspots on image | Image, overlay, hotspot product blocks, width, colour scheme |
| `product-information.liquid` | Product page main | Media position, equal columns, gap, sticky ATC, media gallery blocks, product detail blocks (variant picker, buy buttons, price, description, etc.) |
| `product-list.liquid` | Featured products from collection | Collection picker, grid/carousel/editorial layout, product count 1-16, columns, colour scheme |
| `product-recommendations.liquid` | Product recommendations | Related/complementary type, grid/carousel layout, columns, colour scheme |
| `quick-order-list.liquid` | Quick order list | Variants per page, show image/SKU, colour scheme. Product template only. |
| `search-header.liquid` | Search page header | Alignment, colour scheme, padding |
| `search-results.liquid` | Search results grid | Grid/editorial layout, card sizes, infinite scroll, products per page, colour scheme |
| `section-rendering-product-card.liquid` | Product card renderer | Internal rendering section for product cards |
| `section.liquid` | Generic section | @theme blocks, layout direction, alignment, gap, width, height, background media, border, colour scheme. The most flexible section — usable for almost any content layout. |
| `slideshow.liquid` | Image slideshow | `_slide` blocks, full-frame/with-hints display, width, height, corners, navigation, autoplay, colour scheme |
