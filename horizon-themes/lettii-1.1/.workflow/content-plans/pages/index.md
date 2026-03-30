# Page Spec: Homepage

## Page Metadata
- **Template**: `index`
- **URL**: `/`
- **Title Tag**: `Lettii | Cordless Rechargeable LED Table Lamps | Restaurant Lighting, at Home`
- **Meta Description**: `Premium cordless LED table lamps with touch dimming, USB-C charging, and 12-hour battery. No wires. No wax. No compromise. Free UK shipping over £50.`
- **OG Image**: [MERCHANT: Hero lifestyle image — warm dinner table scene with 2-3 Lettii lamps glowing, 1200x630px]

---

## Target Audience & Intent

### Who visits the homepage?
1. **Retargeting traffic** (40%) — Saw a Meta ad, visited a product page, left. Now returning via retargeting ad or direct URL. Already familiar with the product; needs a reason to commit.
2. **Brand search** (30%) — Googled "Lettii lamps" or "Lettii lighting" after seeing an ad or hearing about the brand. Looking for legitimacy, range overview, and easy path to shop.
3. **Browse entry** (20%) — Arrived from a non-product link (email, social bio, PR mention). Wants to understand the brand and explore the range.
4. **Returning customers** (10%) — Coming back for a second purchase or to browse new arrivals.

### What they need from the homepage
- Immediate understanding of what Lettii is (cordless lamps, lifestyle product)
- Visual proof of quality and style (lifestyle imagery)
- Trust signals (guarantee, shipping, specs)
- Clear paths to shop (by setting, by style, bundles)
- AOV anchoring at bundle price point (£89-99), not single-lamp price (£39)

### What this page is NOT
- Not the primary conversion page (product pages handle that — most ad traffic bypasses homepage)
- Not a long-form brand story (Our Story page handles that)
- Not a product catalog (collection pages handle that)

---

## Sections

### Section 1: Announcement Bar
**Shopify Section Type**: `announcement-bar` (shared/global)
**Purpose**: Rotating trust signals and value propositions. Establishes credibility before the visitor scrolls. Persists across all pages.

**Draft Content**:
- **Message 1**: "30-Day Guarantee | Love It or Send It Back"
- **Message 2**: "Free UK Shipping Over £50"
- **Message 3**: "USB-C Rechargeable | Up to 12 Hours"
- **Message 4**: "Free Returns, No Questions Asked"

**Content Sources**: Static (merchant-configured)
**Configurable Settings**:
- `messages[]` — array of text strings (up to 6)
- `rotation_speed` — seconds between messages (default: 4)
- `background_color` — colour picker (default: brand dark)
- `text_color` — colour picker (default: brand light)
- `link_url` — optional link per message (e.g., message 1 links to FAQ, message 2 links to shipping page)
- `enable_rotation` — toggle auto-rotation on/off

**Blocks**: Repeatable `message` blocks, each with `text`, `link_url`, `link_text`
**Responsive Notes**:
- Desktop: Single line, centered, auto-rotating
- Mobile: Same, but text truncates gracefully; keep messages under 45 characters

**Media Requirements**: None (text only)

---

### Section 2: Hero
**Shopify Section Type**: `hero-banner` (custom)
**Purpose**: Brand magazine cover moment. Establishes mood, communicates the core value proposition, and provides a single clear path to shop. This is the first impression for brand-search and browse-entry visitors.

**Draft Content**:
- **Headline**: "Restaurant lighting, at home."
- **Subheadline**: "Cordless rechargeable table lamps. Touch to dim. Place anywhere."
- **Primary CTA**: "Shop the Collection" → `/collections/all-lamps`
- **Secondary CTA**: "Shop Sets & Save" → `/collections/sets-bundles`

**Content Sources**: Static (merchant-configured text over merchant-uploaded image)
**Configurable Settings**:
- `image_desktop` — hero image, full-bleed (min 2560x1200px, recommend 2560x1440px)
- `image_mobile` — cropped/alternate hero image optimised for portrait (min 750x1000px, recommend 1080x1440px)
- `headline` — text input (default: "Restaurant lighting, at home.")
- `subheadline` — text input
- `primary_cta_text` — text input
- `primary_cta_url` — URL picker
- `secondary_cta_text` — text input (optional)
- `secondary_cta_url` — URL picker (optional)
- `text_position` — select: left / center / right (default: left)
- `text_color` — colour picker (default: white)
- `overlay_opacity` — range 0-100% (default: 30%, for text readability over image)
- `minimum_height_desktop` — range 400-800px (default: 650px)
- `minimum_height_mobile` — range 350-700px (default: 550px)

**Blocks**: None (single hero, not a carousel — research shows single strong images outperform carousels for lifestyle brands)
**Responsive Notes**:
- Desktop: Full-bleed image, text overlay left-aligned with CTAs stacked vertically or side by side. Minimum height 650px. Image uses `object-fit: cover`.
- Mobile: Separate mobile image (portrait crop). Text overlaid at bottom third. CTAs full-width stacked. Minimum height 550px.
- Headline should be large and confident — think magazine cover, not web banner.

**Media Requirements**:
- Desktop: 2560x1440px lifestyle image. Warm dinner table scene with Lettii lamps glowing, soft ambient light. Must have a clear area (left or right third) for text overlay. [MERCHANT: Commission a hero lifestyle image — dinner table for 4-6 with 2-3 Lettii lamps as centrepiece, warm evening light, no visible branding on lamps, aspirational but attainable setting.]
- Mobile: 1080x1440px portrait crop of same scene or alternate angle focusing on one lamp and the atmosphere.
- Both images should be compressed to under 400KB (use WebP with JPEG fallback).

---

### Section 3: Trust Bar
**Shopify Section Type**: `trust-bar` (custom)
**Purpose**: Immediately below the hero, this strip of 4 trust icons answers the cold-traffic question: "Can I trust this brand?" Addresses guarantee, shipping, product specs, and returns in a single scannable row.

**Draft Content**:
- **Icon 1**: Shield icon | "30-Day Guarantee"
- **Icon 2**: Truck icon | "Free UK Shipping Over £50"
- **Icon 3**: Battery icon | "12-Hour Battery, USB-C"
- **Icon 4**: Return-arrow icon | "Free Returns"

**Content Sources**: Static (merchant-configured)
**Configurable Settings**:
- `background_color` — colour picker (default: light neutral/warm grey)
- `text_color` — colour picker
- `icon_color` — colour picker
- `show_dividers` — toggle vertical dividers between items (default: true)

**Blocks**: Repeatable `trust_item` blocks (recommended 4, max 6):
- `icon` — image upload or icon picker (SVG recommended, 48x48px)
- `text` — short text string (max 30 characters)
- `link_url` — optional link (e.g., guarantee links to FAQ, shipping links to shipping page)

**Responsive Notes**:
- Desktop: Single horizontal row, 4 items evenly spaced, centred. Light background strip full-width.
- Mobile: 2x2 grid, or horizontal scroll if 5+ items. Icons smaller (32x32px). Text slightly reduced.
- This section should feel like a quiet confidence strip, not a loud banner.

**Media Requirements**:
- 4 SVG icons (shield, truck, battery, return-arrow). Line-weight style matching brand aesthetic. [MERCHANT: Use Horizon theme's built-in icon set or upload custom SVGs.]

---

### Section 4: Shop by Setting
**Shopify Section Type**: `image-with-text-grid` or `collection-cards` (custom)
**Purpose**: Primary browse entry point. Drives visitors to setting-based collections, which is how Lettii's target customer thinks ("I need dining table lighting" not "I need a Mushroom lamp"). Lifestyle imagery here acts as implied social proof — professional settings signal quality.

**Draft Content**:
- **Section Headline**: "Find Your Setting"
- **Section Subheadline**: "One lamp. Every room. Every occasion."

- **Card 1**: Dining & Entertaining
  - Image: Warm dinner table scene, lamps glowing among plates and glasses
  - **Label**: "Dining & Entertaining"
  - **Link**: → `/collections/dining-entertaining`

- **Card 2**: Bedroom & Bedside
  - Image: Soft bedside scene, single lamp on nightstand, warm low light
  - **Label**: "Bedroom & Bedside"
  - **Link**: → `/collections/bedroom-bedside`

- **Card 3**: Garden & Outdoor
  - Image: Evening garden table or terrace, lamps among greenery and candles
  - **Label**: "Garden & Outdoor"
  - **Link**: → `/collections/garden-outdoor`

- **Card 4**: Restaurants & Bars
  - Image: Professional restaurant table with Lettii lamp, ambient mood
  - **Label**: "Restaurants & Bars"
  - **Link**: → `/collections/restaurants-bars`

**Content Sources**: Static (merchant-configured images and labels linking to Shopify collections)
**Configurable Settings**:
- `heading` — text input
- `subheading` — text input (optional)
- `layout` — select: 4-column grid / 2x2 grid / asymmetric (1 large + 3 small) (default: 4-column)
- `card_aspect_ratio` — select: portrait (3:4) / square (1:1) / landscape (4:3) (default: portrait 3:4)
- `overlay_text_position` — select: bottom-left / bottom-center / center (default: bottom-left)
- `text_color` — colour picker (default: white)
- `overlay_opacity` — range 0-60% (default: 20%)
- `section_padding_top` — range (default: 60px)
- `section_padding_bottom` — range (default: 60px)

**Blocks**: Repeatable `setting_card` blocks (recommended 4, max 6):
- `image` — image upload (min 800x1000px for portrait, recommend 1000x1250px)
- `label` — text input
- `link_url` — URL picker (link to collection)
- `overlay_opacity` — per-card override (optional)

**Responsive Notes**:
- Desktop: 4-column grid, equal-width cards, portrait aspect ratio. Hover effect: subtle zoom on image, text remains static.
- Tablet: 2x2 grid.
- Mobile: 2x2 grid with reduced padding, or horizontal scroll if merchant prefers. Cards should be large enough to convey the setting — no smaller than 50% viewport width.
- Section heading centred above the grid on all breakpoints.

**Media Requirements**:
- 4 lifestyle images, portrait orientation (1000x1250px each). Each must clearly communicate the setting without text. Warm, inviting lighting. Lettii lamps visible but not the sole focus — the atmosphere is the subject.
- [MERCHANT: Commission 4 setting-specific lifestyle images. Each should show the lamp in a realistic, aspirational version of the setting. Avoid studio-lit product shots.]

---

### Section 5: Featured Collection — Sets & Bundles
**Shopify Section Type**: `featured-collection` (Shopify native or custom)
**Purpose**: AOV anchoring. By featuring bundles before individual lamps, visitors anchor on £89-99 as the "normal" price point, not £39. This is the primary revenue lever on the homepage. Lifestyle imagery of sets in context communicates the "atmosphere upgrade" value.

**Draft Content**:
- **Section Headline**: "More Lamps, More Atmosphere"
- **Section Subheadline**: "Save up to 20% with our curated lamp sets."
- **CTA**: "Shop All Sets" → `/collections/sets-bundles`

Product cards pulled dynamically from the `sets-bundles` collection:
- Each card shows: lifestyle image, product title, bundle price, "if bought separately" strikethrough price, savings badge
- Example card: "Dinner Party Set" | ~~£117~~ £99 | "Save £18"
- Example card: "Mix & Match Duo" | ~~£98~~ £79 | "Save £19"
- Example card: "Entertainer Pack" | ~~£196~~ £149 | "Save £47"

**Content Sources**:
- Section heading/subheading: Static (merchant-configured)
- Product cards: Dynamic — pulls from `{{collection.sets-bundles}}` via Shopify Liquid
- Product titles, prices, images: Dynamic from product data
- Savings/strikethrough pricing: Dynamic — `{{product.compare_at_price}}` vs `{{product.price}}`

**Configurable Settings**:
- `collection` — collection picker (default: `sets-bundles`)
- `heading` — text input
- `subheading` — text input (optional)
- `products_to_show` — range 2-8 (default: 3)
- `columns_desktop` — select: 2 / 3 / 4 (default: 3)
- `show_compare_at_price` — toggle (default: true)
- `show_savings_badge` — toggle (default: true)
- `savings_badge_style` — select: percentage / amount / both (default: amount)
- `cta_text` — text input
- `cta_url` — URL picker
- `card_image_aspect_ratio` — select: portrait / square / landscape (default: portrait)
- `section_padding_top` — range
- `section_padding_bottom` — range

**Blocks**: None (products pulled dynamically from selected collection)
**Responsive Notes**:
- Desktop: 3-column grid (for 3 bundles). Cards are generous — large lifestyle image, clear price with strikethrough, savings badge overlaid on image or below title.
- Tablet: 3-column or 2-column depending on card count.
- Mobile: Horizontal scroll (carousel) with peek of next card, or 1-column stack. Savings badge must remain visible. Swipe indicator on first load.
- "Shop All Sets" CTA appears below the product grid, centred, as a secondary button style.

**Media Requirements**:
- Product images from Shopify product data. Each bundle product must have a lifestyle hero image as its first image (showing all lamps in the set in a real setting). Recommended 1000x1250px portrait.
- [MERCHANT: Ensure each bundle product has a lifestyle image as its featured image — not a flat-lay or product grid. Show the full set in use: dinner table with 3 lamps, garden with 4 lamps, etc.]

---

### Section 6: Value Proposition Strip
**Shopify Section Type**: `multi-column` or `icon-with-text` (custom)
**Purpose**: Mid-page persuasion. Addresses the top 3 reasons to buy for visitors who are still scrolling and considering. Bridges the gap between the lifestyle imagery above and the product browsing below. Keeps copy tight and confident — no paragraphs, just sharp one-liners.

**Draft Content**:
- **Column 1**:
  - Icon: Dimmer/touch icon
  - **Headline**: "One Touch. Infinite Settings."
  - **Body**: "Touch the base to turn on. Hold to dim. From bright task light to soft candlelit glow — you set the mood."

- **Column 2**:
  - Icon: USB-C / charging icon
  - **Headline**: "Charges Like Your Phone"
  - **Body**: "USB-C. 4–5 hours to full charge. Up to 12 hours of light. No wires on the table, ever."

- **Column 3**:
  - Icon: Raindrop / waterproof icon
  - **Headline**: "Garden Party Ready"
  - **Body**: "IP54 waterproof. Rain, splashes, a knocked-over glass — your lamp won't flinch. Take it anywhere."

**Content Sources**: Static (merchant-configured)
**Configurable Settings**:
- `heading` — optional section heading (default: empty/hidden)
- `columns_desktop` — select: 2 / 3 / 4 (default: 3)
- `text_alignment` — select: left / center (default: center)
- `background_color` — colour picker (default: warm off-white or light brand colour)
- `icon_size` — range 32-80px (default: 48px)
- `section_padding_top` — range
- `section_padding_bottom` — range

**Blocks**: Repeatable `column` blocks (recommended 3, max 4):
- `icon` — image upload or icon picker (SVG, 48x48px)
- `heading` — text input
- `body` — textarea (max 120 characters recommended)
- `link_url` — optional link

**Responsive Notes**:
- Desktop: 3-column row, centred text, icons above headlines.
- Tablet: 3-column or stacked.
- Mobile: Stacked vertically (1 column), or horizontal scroll. Each item should feel like a card, not a wall of text.
- Keep body copy to 2 short sentences maximum.

**Media Requirements**:
- 3 SVG icons, line-weight style consistent with trust bar icons. [MERCHANT: Use matching icon set from Section 3 or upload custom.]

---

### Section 7: Featured Collection — All Lamps
**Shopify Section Type**: `featured-collection` (same component as Section 5)
**Purpose**: For visitors who want to browse individual lamps rather than bundles. Shows the breadth of the range and variety of styles. Positioned after bundles to maintain AOV anchoring — by this point the visitor has already seen bundle pricing.

**Draft Content**:
- **Section Headline**: "The Collection"
- **Section Subheadline**: "~20 designs. Six style families. One thing in common: no wires."
- **CTA**: "Shop All Lamps" → `/collections/all-lamps`

Product cards pulled dynamically from `all-lamps` collection (or a curated "homepage picks" collection):
- Each card: lifestyle product image, product title, price, colour swatch dots (if multiple colours)
- Show 4-8 products (configurable), curated to represent range diversity

**Content Sources**:
- Section heading/subheading: Static (merchant-configured)
- Product cards: Dynamic — `{{collection.all-lamps}}` or merchant-selected collection
- Product data: Dynamic from Shopify

**Configurable Settings**:
- `collection` — collection picker (default: `all-lamps`)
- `heading` — text input
- `subheading` — text input
- `products_to_show` — range 4-12 (default: 8)
- `columns_desktop` — select: 3 / 4 / 5 (default: 4)
- `show_color_swatches` — toggle (default: true)
- `show_quick_add` — toggle (default: true)
- `cta_text` — text input
- `cta_url` — URL picker
- `card_image_aspect_ratio` — select: portrait / square (default: portrait)
- `section_padding_top` — range
- `section_padding_bottom` — range

**Blocks**: None (products pulled dynamically)
**Responsive Notes**:
- Desktop: 4-column grid. Product cards with lifestyle images, hover shows alternate image (if available) or quick-add overlay.
- Tablet: 3-column grid.
- Mobile: 2-column grid. Quick-add button visible without hover. Colour swatches compact (dots only).
- "Shop All Lamps" CTA centred below grid.

**Media Requirements**:
- Product images from Shopify product data. First image should be lifestyle (lamp in setting), second image can be product-on-neutral for hover swap.
- [MERCHANT: Ensure each product has at least 2 images — lifestyle hero and product detail/alternate angle.]

---

### Section 8: Lifestyle Image Banner
**Shopify Section Type**: `image-with-text` (Shopify native or custom)
**Purpose**: Editorial break in the page flow. A full-width or split-layout lifestyle image paired with a brand statement. Reinforces the aspirational positioning and provides a visual breathing space between product grids. Serves as a secondary hero for visitors who have scrolled this far.

**Draft Content**:
- **Image**: Wide shot of a garden terrace at dusk, multiple Lettii lamps on tables and surfaces, warm glow
- **Headline**: "No wires. No wax. No compromise."
- **Body**: "We made the lamp you've seen in every boutique hotel — and made it yours. Place it on a dinner table, a bedside shelf, or a garden wall. Move it when the mood changes. Charge it like your phone. Forget it's there until someone asks where you got it."
- **CTA**: "Our Story" → `/pages/our-story`

**Content Sources**: Static (merchant-configured)
**Configurable Settings**:
- `image` — image upload (min 1920x800px for full-width, or 960x960px for split layout)
- `image_mobile` — optional mobile-specific image
- `layout` — select: image-left-text-right / image-right-text-left / full-width-overlay (default: image-left-text-right)
- `headline` — text input
- `body` — richtext editor
- `cta_text` — text input (optional)
- `cta_url` — URL picker (optional)
- `text_color` — colour picker
- `background_color` — colour picker (for text side in split layout)
- `overlay_opacity` — range (for full-width overlay layout)
- `section_padding_top` — range
- `section_padding_bottom` — range

**Blocks**: None
**Responsive Notes**:
- Desktop (split layout): 50/50 image and text side by side. Image on left, text on right (or configurable). Text vertically centred.
- Desktop (full-width): Image spans full width with text overlay.
- Mobile: Image stacks above text. Image at least 60vh. Text section below with comfortable padding.
- This section should feel like a magazine spread — generous whitespace, considered typography.

**Media Requirements**:
- Lifestyle image, 1920x800px minimum (for split: 960x960px). Garden/outdoor scene preferred here to complement the indoor dining hero. Multiple lamps visible. Warm dusk lighting.
- [MERCHANT: Commission a wide-format outdoor/garden lifestyle image with multiple Lettii lamps. This is the secondary brand image — it should feel different from the hero but equally aspirational.]

---

### Section 9: Shop by Style
**Shopify Section Type**: `collection-list` or `image-grid` (custom)
**Purpose**: Secondary browse path for visitors who think in product aesthetics rather than room settings. "I want a Mushroom lamp" vs "I want dining table lighting." Also serves SEO (style-family collection pages will target long-tail searches). Compact presentation — this is a secondary navigation aid, not a hero section.

**Draft Content**:
- **Section Headline**: "Shop by Style"

- **Card 1**: Image of Mushroom/Dome lamp | "Mushroom & Dome" → `/collections/mushroom-dome`
- **Card 2**: Image of Slim/Modern lamp | "Slim & Modern" → `/collections/slim-modern`
- **Card 3**: Image of Lantern/Shade lamp | "Lantern & Shade" → `/collections/lantern-shade`
- **Card 4**: Image of Sculptural lamp | "Sculptural" → `/collections/sculptural`
- **Card 5**: Image of Geometric lamp | "Geometric" → `/collections/geometric`
- **Card 6**: Image of Crystal/Glass lamp | "Crystal & Glass" → `/collections/crystal-glass`

**Content Sources**: Static (merchant-configured images) or Dynamic (collection images from `{{collection.image}}` and `{{collection.title}}`)
**Configurable Settings**:
- `heading` — text input
- `layout` — select: 6-column row / 3x2 grid / horizontal scroll (default: 6-column row on desktop)
- `card_style` — select: circular / rounded-square / square (default: circular)
- `card_size` — range 80-200px (default: 120px)
- `show_labels` — toggle (default: true)
- `section_padding_top` — range
- `section_padding_bottom` — range

**Blocks**: Repeatable `style_card` blocks (recommended 6):
- `collection` — collection picker (populates image and title dynamically)
- `image_override` — optional image upload to override collection image
- `label_override` — optional text to override collection title

**Responsive Notes**:
- Desktop: Single row of 6 circular or rounded thumbnails with labels below. Compact — this is navigation, not a feature section.
- Tablet: 6 across (smaller) or 3x2 grid.
- Mobile: Horizontal scroll row, or 3x2 grid. Cards large enough to be tappable (minimum 80px diameter).
- This section is intentionally lighter-weight than "Shop by Setting" — settings are the primary browse path.

**Media Requirements**:
- 6 product/style images. Can be product shots on neutral background (appropriate here since these represent product aesthetics, not settings). Square crop, minimum 400x400px.
- [MERCHANT: Use a representative product image from each style family. These can be product-on-neutral shots — this section is about the lamp design, not the setting.]

---

### Section 10: Social Proof / As Seen In
**Shopify Section Type**: `rich-text` with optional image row (custom)
**Purpose**: Implied authority section. At launch, Lettii has no reviews and no press. This section uses professional-context messaging and a lifestyle image strip to imply credibility without making false claims. Once press coverage or review volume exists, this section evolves into a proper social proof section.

**Draft Content (Launch Version)**:
- **Headline**: "Designed for Restaurants. Perfect at Home."
- **Body**: "The same rechargeable LED technology trusted in boutique hotels, wine bars, and destination restaurants — now on your table."
- **Image strip**: 3-5 small landscape lifestyle images showing Lettii lamps in professional settings (restaurant table, hotel lobby, wine bar, wedding table, upscale cafe)

**Draft Content (Post-Launch Version — when reviews exist)**:
- **Headline**: "What Our Customers Say" or "{{product.metafields.reviews.rating_count}}+ Happy Homes"
- **Body**: Dynamic review carousel (integrate with Judge.me, Stamped, or Shopify native reviews)
- **Supporting**: Star rating average + review count

**Content Sources**:
- Launch: Static (merchant-configured)
- Post-launch: Dynamic (reviews app integration)

**Configurable Settings**:
- `version` — select: launch (implied authority) / reviews (review carousel) (default: launch)
- `heading` — text input
- `body` — richtext editor
- `show_image_strip` — toggle (default: true)
- `section_padding_top` — range
- `section_padding_bottom` — range

**Blocks (launch version)**: Repeatable `image` blocks (3-5):
- `image` — image upload (landscape, 600x400px)
- `caption` — optional text (e.g., "Restaurant setting" — for alt text, not displayed)

**Blocks (post-launch version)**: Managed by reviews app integration

**Responsive Notes**:
- Desktop: Centred headline and body text, with a horizontal strip of 3-5 images below. Images slightly overlapping or with minimal gap for editorial feel.
- Mobile: Headline and body stacked, images as horizontal scroll strip.
- Launch version should feel confident, not apologetic. No "coming soon" or placeholder energy.

**Media Requirements**:
- 3-5 landscape lifestyle images (600x400px each) showing lamps in professional/commercial settings. These are "borrowed authority" images.
- [MERCHANT: Commission images of Lettii lamps in restaurant, hotel, and bar settings. These should feel candid and real, not staged. They imply that professionals choose these lamps.]

---

### Section 11: Newsletter Signup
**Shopify Section Type**: `newsletter` (Shopify native or custom)
**Purpose**: Secondary conversion goal. Captures email addresses for retargeting and lifecycle marketing. 10% off incentive drives signups from visitors who are not ready to buy. Positioned near the footer — visitors who scroll this far are engaged but may not be ready to purchase.

**Draft Content**:
- **Headline**: "Stay in the glow."
- **Body**: "Styling ideas, new lamp drops, and the occasional offer — straight to your inbox. Plus 10% off your first order."
- **Input Placeholder**: "Your email address"
- **CTA Button**: "Sign Up"
- **Disclaimer**: "We send 2–4 emails per month. Unsubscribe anytime."

**Content Sources**: Static text, dynamic form submission (Shopify customer marketing or Klaviyo/Mailchimp integration)
**Configurable Settings**:
- `heading` — text input
- `body` — textarea
- `placeholder_text` — text input
- `button_text` — text input
- `disclaimer_text` — text input
- `background_color` — colour picker (default: warm brand accent or soft contrast colour)
- `text_color` — colour picker
- `background_image` — optional lifestyle image behind the form
- `overlay_opacity` — range (if background image is used)
- `section_padding_top` — range
- `section_padding_bottom` — range

**Blocks**: None
**Responsive Notes**:
- Desktop: Centred text with email input and button inline (side by side). Max-width container (600-700px) for readability.
- Mobile: Text stacked, email input full-width, button full-width below input.
- This section should feel warm and inviting, not transactional. Background colour or subtle lifestyle image helps it stand apart from adjacent sections.

**Media Requirements**:
- Optional: soft lifestyle background image (1920x600px, blurred or low-opacity). Not required — a solid warm background colour works well.
- [MERCHANT: Optional background image. If used, choose a soft, blurred lifestyle scene that does not compete with the text overlay.]

---

### Section 12: Footer
**Shopify Section Type**: `footer` (shared/global)
**Purpose**: Site-wide footer with navigation, trust signals, social links, payment icons, and legal links. The last chance to provide navigation and build trust.

**Draft Content**:
- **Column 1 — Shop**:
  - All Lamps → `/collections/all-lamps`
  - Sets & Bundles → `/collections/sets-bundles`
  - New Arrivals → `/collections/new-arrivals`
  - Gift Cards → `/products/gift-card`

- **Column 2 — Help**:
  - FAQ → `/pages/faq`
  - Shipping & Delivery → `/pages/shipping`
  - Returns & Guarantee → `/pages/faq#returns`
  - Contact Us → `/pages/contact`

- **Column 3 — About**:
  - Our Story → `/pages/our-story`
  - Styling Ideas → `/pages/styling-ideas`
  - Blog → `/blogs/journal`

- **Column 4 — Business**:
  - For Restaurants & Hospitality → `/pages/for-restaurants-hospitality`
  - For Weddings & Events → `/pages/for-weddings-events`

- **Social Icons**: Instagram | Pinterest | Facebook
- **Payment Icons**: Visa | Mastercard | Amex | PayPal | Apple Pay | Google Pay | Klarna
- **Legal Bar**: Terms of Service | Privacy Policy | © Lettii {{ 'now' | date: '%Y' }}

**Content Sources**: Static (merchant-configured via Shopify navigation menus and theme settings)
**Configurable Settings**:
- `footer_menu_1` through `footer_menu_4` — Shopify menu pickers
- `menu_1_heading` through `menu_4_heading` — text inputs for column headings
- `show_social_icons` — toggle (default: true)
- `social_instagram_url` — URL input
- `social_pinterest_url` — URL input
- `social_facebook_url` — URL input
- `show_payment_icons` — toggle (default: true)
- `copyright_text` — text input (default: "Lettii")
- `background_color` — colour picker
- `text_color` — colour picker

**Blocks**: None (structure is fixed, content is menu-driven)
**Responsive Notes**:
- Desktop: 4-column layout, logo above columns (optional), social and payment icons below columns, legal bar at bottom.
- Tablet: 2x2 column grid.
- Mobile: Accordion-style columns (tap to expand each section). Social icons and payment icons remain visible. Legal bar at bottom.

**Media Requirements**:
- Logo (SVG preferred, max 200px wide)
- Social media icons (from theme icon set)
- Payment method icons (Shopify provides these natively via `{{ shop.enabled_payment_types }}`)

---

## Shared Components (referenced on this page)

### Sticky Header
- Logo (left), primary navigation (centre), search/account/cart icons (right)
- Condensed on scroll (reduced height, logo smaller)
- Cart icon shows `{{ cart.item_count }}` badge
- Mobile: Hamburger menu (left), logo (centre), cart icon (right)

### Cart Drawer
- Triggered by "Add to Cart" or cart icon click
- Slides in from right
- Line items, bundle upsell, free shipping progress bar, trust line, express checkout buttons
- Not directly part of the homepage template but triggered from product quick-add interactions on Sections 5 and 7

### Newsletter Popup
- Triggered after 60 seconds or exit-intent (desktop only)
- Not on mobile (Google intrusive interstitial penalty)
- Not on first page load
- Suppressed for 30 days after dismissal
- Content: lifestyle image + "Still thinking? Get 10% off your first order and our best styling ideas." + email input

---

## SEO

### Structured Data
- **Organization schema**: Brand name, logo, social profiles, contact info
- **WebSite schema**: Site name, search action URL
- **BreadcrumbList**: Homepage (root) — not displayed visually but present in structured data
- **ItemList** (optional): Featured products from Sections 5 and 7, if rendered as a product list

### Internal Linking
- Hero CTA → All Lamps collection
- Hero secondary CTA → Sets & Bundles collection
- Shop by Setting cards → 4 setting collections
- Featured bundles → individual bundle product pages
- Featured lamps → individual product pages
- Shop by Style cards → 6 style collections
- Lifestyle banner CTA → Our Story page
- Newsletter → email capture (no link, form submission)
- Footer → all major pages and collections

### Page Speed Considerations
- Hero image: serve WebP with JPEG fallback, lazy-load below-fold sections
- Trust bar icons: inline SVG (no additional HTTP requests)
- Product card images: lazy-loaded, responsive `srcset` with multiple sizes
- Shop by Setting images: lazy-loaded
- Target: LCP under 2.5s on mobile (hero image is the LCP element)
- Defer non-critical JavaScript (newsletter popup, reviews widget)

---

## Accessibility

- All images have descriptive `alt` text (lifestyle images describe the scene and product, not "banner image")
- Trust bar icons have `aria-label` attributes
- Announcement bar rotation: `aria-live="polite"` for screen readers, pause on hover/focus
- CTA buttons have sufficient colour contrast (WCAG AA minimum, 4.5:1)
- Focus states visible on all interactive elements
- Skip-to-content link hidden visually but accessible to screen readers
- Product cards are keyboard-navigable
- Newsletter form has proper `label` elements and error states
- Footer accordion (mobile) is keyboard-accessible with `aria-expanded` states

---

## Decisions & Assumptions

1. **Single hero image, not a carousel.** Research shows single strong images outperform carousels for lifestyle brands. Carousels reduce engagement with each slide (Baymard Institute). The hero should be one powerful, magazine-cover image.

2. **Bundles before individual lamps.** Section 5 (Sets & Bundles) appears before Section 7 (All Lamps) to anchor the visitor's price expectation at £89-99 rather than £39. This is the most important AOV decision on the homepage.

3. **No review carousel at launch.** An empty "0 reviews" widget actively harms trust for a new brand. Section 10 uses "implied authority" (professional setting imagery) instead. This section has a configurable toggle to switch to a reviews carousel once 5+ reviews exist.

4. **Shop by Setting is primary, Shop by Style is secondary.** Setting-based collections (Section 4) get large lifestyle cards and a prominent position. Style-based collections (Section 9) get compact thumbnails lower on the page. This reflects how the target customer thinks about the purchase ("I need dining lighting" not "I want a Mushroom lamp").

5. **Homepage is not the primary conversion page.** Most ad traffic lands on product pages directly. The homepage serves retargeting, brand search, and browse entry. It should feel like a brand magazine cover — establishing mood and trust — with clear paths to shop, rather than a hard-sell landing page.

6. **B2B is invisible on the homepage.** No trade banners, no hospitality CTAs. The "Restaurants & Bars" card in Shop by Setting is the only subtle entry point. B2B visitors will find the hospitality page via footer navigation or the Restaurants & Bars collection banner. This keeps the homepage 100% consumer-focused.

7. **Newsletter signup is on-page (Section 11), not just a popup.** The popup triggers after 60 seconds on desktop; the on-page section catches visitors who scroll through the full homepage. Both offer the same 10% incentive.

8. **Trust bar immediately below hero.** This placement is informed by cold-traffic conversion research — the first non-hero element a visitor sees should answer "Can I trust this?" before they encounter product grids.

9. **Free shipping threshold assumed at £50.** Per the brand brief. This aligns with the strategy of nudging single-lamp buyers (£39-69) toward bundles or multi-unit purchases to qualify.

10. **Assumes Shopify Online Store 2.0 section architecture.** All sections are independently configurable, reorderable, and togglable from the theme editor. Merchants can rearrange the homepage section order without code changes.

---

## Complexity Assessment

### Section Count
12 sections total (including global announcement bar and footer)

### Custom Sections Required
- `hero-banner` — custom (beyond Shopify default; needs overlay controls, mobile image, text positioning)
- `trust-bar` — custom (icon + text strip with repeatable blocks)
- `image-with-text-grid` / `collection-cards` — custom (for Shop by Setting; needs card grid with lifestyle images linking to collections)
- `icon-with-text` — custom or adapted from multi-column (for value proposition strip)
- Social proof / as-seen-in — custom (launch version with image strip; post-launch version integrates reviews app)

### Sections Using Shopify Native or Standard Theme Components
- `announcement-bar` — standard theme section
- `featured-collection` — standard (used twice: Sections 5 and 7)
- `collection-list` — standard or lightly customised (Section 9: Shop by Style)
- `image-with-text` — standard (Section 8: Lifestyle Banner)
- `newsletter` — standard theme section
- `footer` — standard theme section

### Estimated Build Effort
- **Low complexity**: Sections 1, 3, 6, 8, 11, 12 — standard components or light customisation
- **Medium complexity**: Sections 2, 4, 5, 7, 9 — custom layouts or significant configuration options
- **Medium-high complexity**: Section 10 — dual-mode section (launch vs post-launch) with reviews app integration

### Dependencies
- Shopify product data must be populated for Sections 5 and 7
- Collection images must be uploaded for Section 9
- Reviews app integration needed for Section 10 post-launch version
- Email marketing platform (Klaviyo/Mailchimp) for Section 11 and newsletter popup
- All lifestyle photography must be commissioned/generated before launch
