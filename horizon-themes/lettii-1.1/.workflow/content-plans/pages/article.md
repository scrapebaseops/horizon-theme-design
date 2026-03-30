# Page Spec: Blog Article

## Page Metadata
| Field | Value |
|-------|-------|
| **Template** | `article` |
| **URL** | `/blogs/journal/{{article.handle}}` |
| **Page Title** | `{{article.title}} — Lettii` |
| **Meta Description** | `{{article.excerpt_or_content | strip_html | truncate: 155}}` (overridable via article SEO settings) |
| **Purpose** | Individual SEO landing page for long-tail queries. Converts organic readers into email subscribers and product browsers via shoppable content. Retargeting pixel fires for ad audiences. |
| **Priority** | Medium (post-launch, grows over time) |

---

## Target Audience
- **Primary**: Google searchers landing on specific long-tail queries ("how to style a dinner table for a party," "best cordless lamps for restaurants UK," "wedding table lighting ideas")
- **Secondary**: Email/social subscribers clicking through from newsletters or Instagram stories
- **Tertiary**: Existing customers browsing for styling inspiration post-purchase

---

## Dynamic Data Sources
| Variable | Source | Notes |
|----------|--------|-------|
| `article.title` | Shopify article object | Article headline |
| `article.content` | Shopify article object | Full rich HTML content — rendered by Shopify |
| `article.image` | Shopify article object | Featured/hero image |
| `article.author` | Shopify article object | Author name |
| `article.published_at` | Shopify article object | Publication date |
| `article.tags` | Shopify article object | Used for category display and related article matching |
| `blog.title` | Shopify blog object | Parent blog name for breadcrumbs |
| `blog.articles` | Shopify blog object | Used for "Related Articles" section |
| Product data | Shopify product objects via section blocks | For "Shop the Look" product cards |

---

## Sections

### Section 1: Breadcrumb Navigation
**Shopify Section Type**: Part of article template (inline, not a standalone section)
**Purpose**: Orientation and navigation. Helps readers who landed via Google understand where they are in the site. Also provides an easy path back to the blog listing.

**Draft Content**:
- `Home` > `{{blog.title}}` > `{{article.title}}`
- Example: Home > Journal > Five Ways to Style Your Dinner Table This Summer

**Content Sources**:
- All breadcrumb segments: Dynamic
- Links: Home (`/`), Blog (`/blogs/journal`), Current article (unlinked, current page)

**Configurable Settings**:
| Setting | Type | Default |
|---------|------|---------|
| `show_breadcrumbs` | Checkbox | true |

**Responsive Notes**:
- **Desktop**: Left-aligned, small text (13–14px), muted colour, above hero image
- **Mobile**: Same, with `{{article.title}}` truncated if needed. Single line with horizontal scroll if necessary.

---

### Section 2: Article Hero
**Shopify Section Type**: `article-hero` (custom section or part of `main-article`)
**Purpose**: Full-width editorial hero that immediately establishes the visual quality and editorial authority of the piece. This is the "magazine spread" moment — the image does the heavy lifting.

**Draft Content**:
- **Hero image**: `{{article.image}}` — full-width, 16:9 or 2:1 aspect ratio, high-quality lifestyle photography
- **Category tag**: First tag from `{{article.tags}}` — displayed as pill overlay on image (e.g., "Styling Guide")
- **Title**: `{{article.title}}` — e.g., "Five Ways to Style Your Dinner Table This Summer"
- **Meta line**: `{{article.published_at | date: '%d %B %Y'}}` · `{{article.content | number_of_words | divided_by: 200 | ceil}} min read` · `By {{article.author}}`
- Example meta: "15 June 2026 · 4 min read · By Lettii"

**Content Sources**:
- Image: Dynamic (`article.image`)
- Title: Dynamic (`article.title`)
- Date, read time, author: Dynamic (calculated/formatted)
- Category tag: Dynamic (first `article.tags` entry)

**Configurable Settings**:
| Setting | Type | Default |
|---------|------|---------|
| `hero_layout` | Select: full-width image / image with text overlay / split (image left, text right) | full-width image |
| `image_max_height` | Range (300–600px) | 480 |
| `show_category_tag` | Checkbox | true |
| `show_author` | Checkbox | true |
| `show_read_time` | Checkbox | true |
| `show_date` | Checkbox | true |
| `overlay_opacity` | Range (0–100) | 0 (text below image by default) |
| `text_alignment` | Select: left / centre | centre |

**Responsive Notes**:
- **Desktop**: Full-width image (max-height 480px, `object-fit: cover`), title and meta centred below. Generous whitespace (48px) between image and title.
- **Mobile**: Full-width image (max-height 280px), title and meta left-aligned below. Tighter spacing (24px). Title font size scales down (28–32px).

---

### Section 3: Article Content
**Shopify Section Type**: `main-article` (Shopify's main article content section)
**Purpose**: The core reading experience. Shopify renders `article.content` as rich HTML. The theme provides typographic styling to make this content feel editorial — generous line height, readable measure, clear heading hierarchy, styled blockquotes, and image handling.

**Draft Content**:
- `{{article.content}}` — rendered by Shopify from the article's rich text editor
- Content is written by the merchant and may include:
  - Headings (H2, H3)
  - Body paragraphs
  - Inline images (lifestyle photography within content)
  - Blockquotes / pull quotes
  - Ordered and unordered lists
  - Embedded video (YouTube/Vimeo)
  - Links to products and other articles

**Content Sources**:
- Entirely dynamic: `article.content`
- Theme provides CSS typography and layout — no static content in this section

**Configurable Settings**:
| Setting | Type | Default |
|---------|------|---------|
| `content_max_width` | Range (600–800px) | 720 |
| `body_font_size` | Range (16–20px) | 18 |
| `line_height` | Range (1.4–2.0) | 1.7 |
| `drop_cap` | Checkbox | false |
| `image_style` | Select: contained / breakout (wider than text column) / full-width | breakout |

**Typographic Specifications**:
- **Body**: 18px, line-height 1.7, max-width 720px, centred on page
- **H2**: 28px, 48px top margin, 16px bottom margin (clear section breaks)
- **H3**: 22px, 32px top margin, 12px bottom margin
- **Blockquote**: Left border accent (brand colour), italic, slightly larger font (20px), indented
- **Images within content**: Break out of the 720px text column to ~960px for visual impact. Rounded corners optional. Caption support via `<figcaption>`.
- **Lists**: Styled bullets/numbers with comfortable spacing
- **Links**: Brand colour, underlined, hover state

**Responsive Notes**:
- **Desktop**: 720px content column, centred, with breakout images at ~960px
- **Mobile**: Full-width with 16–20px horizontal padding. Body font 17px. Images go full-bleed. Blockquote indent reduced.

---

### Section 4: Social Sharing
**Shopify Section Type**: Part of `main-article` or standalone `article-social-share` section
**Purpose**: Encourage readers to share the article. Secondary engagement action. Kept minimal — icons only, not a heavy CTA.

**Draft Content**:
- **Label**: "Share this" (small, muted)
- **Platforms**: Pinterest (primary — target audience is active here), Facebook, X/Twitter, Copy link
- **Share URLs**: Pre-populated with article title and URL
- Pinterest share includes `{{article.image}}` as pin image

**Content Sources**:
- Share URLs: Dynamic (constructed from `article.url`, `article.title`, `article.image`)
- Platform list: Configurable

**Configurable Settings**:
| Setting | Type | Default |
|---------|------|---------|
| `show_sharing` | Checkbox | true |
| `share_pinterest` | Checkbox | true |
| `share_facebook` | Checkbox | true |
| `share_twitter` | Checkbox | true |
| `share_copy_link` | Checkbox | true |
| `share_position` | Select: below hero meta / after content / both | after content |
| `share_style` | Select: icon only / icon + label | icon only |

**Responsive Notes**:
- **Desktop**: Horizontal row of icons, centred or left-aligned below content. Alternatively, sticky sidebar position (configurable).
- **Mobile**: Horizontal row, centred. Icons sized for touch (44px targets). "Copy link" triggers native share sheet where supported (`navigator.share`).

---

### Section 5: Shop the Look
**Shopify Section Type**: `article-shop-the-look` (custom section with product blocks)
**Purpose**: The primary commercial conversion point within editorial content. Bridges reading inspiration to product discovery. "You just saw how beautiful this looks — here's the lamp." This is what makes the blog a revenue channel, not just a content channel.

**Draft Content**:
- **Heading**: "Shop the look." or "Featured in this article." or "Get the glow."
- **Product cards**: 2–4 product cards showing the lamps featured or relevant to the article content
  - Product image (lifestyle, not packshot where possible)
  - Product title
  - Price (with compare-at if on sale)
  - "Shop now" link/button
  - Colour swatches (if applicable)
- **Layout**: Horizontal scroll or 2-column grid

**Content Sources**:
- Heading: Static / configurable
- Products: Merchant-selected per article via section blocks (product picker)
- Product data: Dynamic from Shopify product objects

**Configurable Settings**:
| Setting | Type | Default |
|---------|------|---------|
| `heading` | Text | "Shop the look." |
| `products` | Product blocks (1–6) | — (merchant adds per article) |
| `show_price` | Checkbox | true |
| `show_compare_price` | Checkbox | true |
| `show_colour_swatches` | Checkbox | true |
| `card_style` | Select: minimal / standard / lifestyle | minimal |
| `background_colour` | Colour | `#F5F0EB` (warm neutral — distinct from article bg) |
| `section_padding` | Range | 48px top/bottom |

**Responsive Notes**:
- **Desktop**: 2–4 column grid within a warm-toned background band. Cards have subtle hover lift.
- **Mobile**: Horizontal scroll (2 cards visible, peek of third). Or 2-column grid if only 2 products. Background band goes full-width.

---

### Section 6: Related Articles
**Shopify Section Type**: `article-related` (custom section)
**Purpose**: Keep readers on the site. Reduce bounce by offering the next piece of content. Uses tag matching to show topically related articles, falling back to recent articles.

**Draft Content**:
- **Heading**: "Keep reading." or "More from the journal."
- **Cards**: 3 article cards (same component as blog listing page)
  - Featured image
  - Category tag pill
  - Title
  - Excerpt (truncated)
  - Date + read time
- **Selection logic**: Articles sharing the most tags with the current article, excluding the current article. Fallback: most recent articles from the same blog.

**Content Sources**:
- Heading: Static / configurable
- Articles: Dynamic from `blog.articles`, filtered by tag overlap with current `article.tags`

**Configurable Settings**:
| Setting | Type | Default |
|---------|------|---------|
| `heading` | Text | "Keep reading." |
| `articles_count` | Range (2–4) | 3 |
| `selection_method` | Select: tag-matched / most-recent / merchant-selected | tag-matched |
| `show_excerpt` | Checkbox | true |
| `card_columns_desktop` | Select: 2 / 3 | 3 |

**Responsive Notes**:
- **Desktop**: 3-column grid, same card component as blog listing
- **Mobile**: Horizontal scroll (1.2 cards visible, peek of next) or single-column stack. Horizontal scroll preferred for engagement.

---

### Section 7: Newsletter Signup CTA
**Shopify Section Type**: `newsletter` (reusable section, shared with blog listing and homepage)
**Purpose**: Capture email from an engaged reader. Someone who read an entire article is a warm lead. This CTA sits at the natural end-of-content point where readers decide what to do next.

**Draft Content**:
- **Heading**: "Stay in the glow."
- **Body**: "Styling ideas, new lamp drops, and the occasional offer — straight to your inbox. No spam, just good light."
- **Input placeholder**: "Your email address"
- **Button**: "Subscribe"
- **Fine print**: "We send 2–4 emails per month. Unsubscribe anytime."

**Content Sources**:
- All copy: Static / configurable
- Form submission: Shopify customer marketing or Klaviyo integration

**Configurable Settings**:
| Setting | Type | Default |
|---------|------|---------|
| `heading` | Text | "Stay in the glow." |
| `body_text` | Richtext | (as above) |
| `button_label` | Text | "Subscribe" |
| `fine_print` | Text | "We send 2–4 emails per month. Unsubscribe anytime." |
| `background_colour` | Colour | `#F5F0EB` |
| `background_image` | Image picker | — |
| `section_padding` | Range | 60px top/bottom |

**Responsive Notes**:
- **Desktop**: Centred single-column, max-width 560px
- **Mobile**: Full-width, stacked input + button, 16px padding

---

## Shared Components

### Article Card Component
Identical to the component defined in `blog.md`. Reused across blog listing, related articles, and homepage blog preview.

### Product Card Component (Minimal Variant)
Used in "Shop the Look" section. Slimmed-down version of the main product card:
- Product image (lifestyle preferred)
- Title
- Price / compare-at price
- Colour swatches (optional)
- "Shop now" link
- No add-to-cart button — drives to product page for full conversion flow
- Hover: subtle image zoom

### Newsletter Form Component
Identical to the component defined in `blog.md`. Shared across blog, article, homepage, and footer.

### Social Share Component
- Icon buttons for each platform
- Opens share URL in popup window (or native share on mobile)
- "Copy link" writes URL to clipboard with tooltip confirmation ("Link copied")
- No share counts displayed (avoids zero-count problem for new content)

---

## SEO Considerations
- **Page title**: `{{article.title}} — Lettii` (under 60 chars. Articles should have concise titles.)
- **Meta description**: `{{article.excerpt | strip_html | truncate: 155}}` — overridable in Shopify article SEO settings
- **Canonical URL**: `/blogs/journal/{{article.handle}}`
- **Structured data**: `BlogPosting` schema including:
  - `headline`: `{{article.title}}`
  - `image`: `{{article.image}}`
  - `datePublished`: `{{article.published_at}}`
  - `dateModified`: `{{article.updated_at}}`
  - `author`: `{{article.author}}`
  - `publisher`: Lettii (with logo)
  - `description`: `{{article.excerpt}}`
- **H1**: `{{article.title}}` — one per page, in the hero section
- **Content headings**: H2 and H3 within `article.content` (merchant responsibility, but theme styles them clearly)
- **Image alt text**: All images within `article.content` should have alt text (merchant responsibility). Featured image alt from `article.image.alt` or `article.title`.
- **Internal linking**: "Shop the Look" products link to product pages. Related articles link to other articles. Breadcrumbs link to blog and home. All contribute to internal link equity.
- **Open Graph / Twitter Cards**: `og:title`, `og:description`, `og:image`, `twitter:card` (summary_large_image) — auto-populated from article data. Critical for Pinterest sharing.

---

## Accessibility
- **Heading hierarchy**: H1 (article title) > H2 (content headings, section headings like "Shop the look") > H3 (sub-headings within content, product card titles, related article titles)
- **Breadcrumbs**: `<nav aria-label="Breadcrumb">` with `<ol>` structure. Current page marked with `aria-current="page"`.
- **Article content**: Semantic `<article>` element wrapping the main content. `<time datetime="...">` for publication date.
- **Images**: Featured image has descriptive `alt` text. Content images (merchant-provided) should have `alt` — theme cannot enforce but should not strip it.
- **Social sharing**: Buttons have `aria-label` (e.g., "Share on Pinterest"). Open in new window: `aria-label` includes "opens in new window" or use `rel="noopener"`.
- **Shop the Look**: Product cards are within a `<section aria-labelledby="shop-the-look-heading">`. Each card is focusable with clear link text.
- **Newsletter form**: `<label>` elements, `aria-describedby` for fine print, `role="alert"` for success/error messages.
- **Keyboard**: All interactive elements reachable via Tab. Social share popups return focus on close. Horizontal scroll sections (mobile) are keyboard-navigable.
- **Colour contrast**: WCAG 2.1 AA compliance across all text and interactive elements.

---

## Open Decisions
| Decision | Options | Recommendation |
|----------|---------|----------------|
| Hero layout | Full-width image with text below / text overlay on image / split layout | Full-width image with text below. Cleaner, more readable, works better on mobile. Overlay optional via setting. |
| Social share position | Below hero meta / after content / sticky sidebar / both | After content (primary). Below hero meta as optional second placement. Sticky sidebar risks cluttering the reading experience. |
| Shop the Look placement | Within content (mid-article) / after content / both | After content as a section. Within-content product callouts are possible but require merchant to use metafields or custom HTML — too complex at launch. |
| Related article logic | Tag-matched / most recent / merchant-curated | Tag-matched with most-recent fallback. Keeps it automatic. Merchant curation via section blocks as a future enhancement. |
| Comments | Enable Shopify comments / disable / third-party (Disqus) | Disable at launch. Comments need moderation resources and add little value for a product brand blog. Revisit post-launch. |
| Reading progress bar | Show / hide | Optional but recommended. Subtle line at top of viewport showing scroll progress. Increases perceived article quality. Configurable setting, off by default. |
| Author bio block | Show below content / hide | Hide at launch (single brand author "Lettii"). Setting available. If team grows, enable with avatar + short bio. |
| Mobile share | Custom icons / native share API | Use `navigator.share()` where supported (iOS Safari, Android Chrome), fall back to custom icons. Best of both worlds. |

---

## Complexity Estimate
| Aspect | Estimate |
|--------|----------|
| **Sections** | 7 (breadcrumbs, hero, content, social share, shop the look, related articles, newsletter) |
| **Custom sections** | 3 (article-hero, article-shop-the-look, article-related) |
| **Shared components** | 4 (article card, product card minimal, newsletter form, social share) |
| **JavaScript** | Light — social share popup/clipboard, `navigator.share` detection, optional reading progress bar, horizontal scroll for mobile related articles |
| **Content typography** | Medium effort — the `article.content` rich text styles (headings, blockquotes, images, lists, embeds) need careful design. This is the editorial "feel" of the page. |
| **Overall complexity** | Medium-high. The article content typography and Shop the Look product integration are the most complex pieces. The rest reuses components from the blog listing. |
