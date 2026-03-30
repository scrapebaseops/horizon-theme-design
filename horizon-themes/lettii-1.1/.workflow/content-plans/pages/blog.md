# Page Spec: Blog Listing

## Page Metadata
| Field | Value |
|-------|-------|
| **Template** | `blog` |
| **URL** | `/blogs/journal` |
| **Page Title** | `{{blog.title}} — Lettii` |
| **Meta Description** | `Styling ideas, setting guides, and lighting inspiration from Lettii. Discover how one lamp transforms every room.` |
| **Purpose** | Long-tail SEO acquisition, retargeting asset, brand authority building. Drives organic traffic for queries like "how to style a dinner table," "best cordless lamps for restaurants," "outdoor dining lighting ideas." |
| **Priority** | Medium (post-launch content engine) |

---

## Target Audience
- **Primary**: Style-conscious women 28–45 arriving via Google long-tail queries
- **Secondary**: Existing customers returning via email/retargeting who want styling inspiration
- **Tertiary**: B2B hospitality prospects researching cordless lamp solutions

---

## Dynamic Data Sources
| Variable | Source | Notes |
|----------|--------|-------|
| `blog.title` | Shopify blog object | Blog name (e.g., "Journal" or "The Edit") |
| `blog.articles` | Shopify blog object | Paginated article collection |
| `article.title` | Each article in loop | Headline |
| `article.excerpt_or_content` | Each article in loop | Excerpt if set, otherwise truncated content |
| `article.image` | Each article in loop | Featured image |
| `article.published_at` | Each article in loop | Publication date |
| `article.author` | Each article in loop | Author name |
| `article.tags` | Each article in loop | Used for category filtering |

---

## Sections

### Section 1: Blog Hero
**Shopify Section Type**: `blog-hero` (custom section)
**Purpose**: Set the editorial tone immediately. This is a magazine cover, not a generic blog header. Establishes the blog as a curated content destination, not an afterthought.

**Draft Content**:
- **Heading**: `{{blog.title}}` (merchant sets blog title in Shopify — recommended: "The Edit" or "Journal")
- **Subheading**: "Styling ideas, setting guides, and the art of lighting well."
- **Background**: [MERCHANT: Lifestyle hero image — warm dinner table scene or styled interior with Lettii lamps. Landscape, high-res, editorial quality. Overlaid with subtle gradient for text legibility.]

**Content Sources**:
- Heading: Dynamic (`blog.title`)
- Subheading: Static (hardcoded in section or configurable)
- Background image: Configurable via section settings

**Configurable Settings**:
| Setting | Type | Default |
|---------|------|---------|
| `subheading` | Text | "Styling ideas, setting guides, and the art of lighting well." |
| `background_image` | Image picker | — |
| `overlay_opacity` | Range (0–100) | 40 |
| `text_colour` | Colour | `#FFFFFF` |
| `layout` | Select: full-width / contained | full-width |

**Responsive Notes**:
- **Desktop**: Full-width hero, 400px height, centred text overlay, image covers full bleed
- **Mobile**: 280px height, tighter text sizing, image cropped to focal point via `object-position`

---

### Section 2: Category Filter Bar
**Shopify Section Type**: `blog-category-filter` (custom section or inline block within blog template)
**Purpose**: Allow visitors to browse by content category. Uses article tags as categories. Creates the editorial magazine feel of navigating "departments."

**Draft Content**:
- **Filter labels** (derived from article tags): "All" | "Styling Guides" | "Setting Inspiration" | "Product Spotlights" | "Seasonal" | "Hospitality"
- These correspond to article tags: `styling-guides`, `setting-inspiration`, `product-spotlights`, `seasonal`, `hospitality`

**Content Sources**:
- Filter options: Dynamic — derived from `blog.all_tags` or configured manually
- Active state: URL parameter (`/blogs/journal/tagged/styling-guides`)

**Configurable Settings**:
| Setting | Type | Default |
|---------|------|---------|
| `show_filter_bar` | Checkbox | true |
| `filter_style` | Select: pill buttons / underline tabs / dropdown | pill buttons |
| `show_article_count` | Checkbox | false |

**Responsive Notes**:
- **Desktop**: Horizontal row of pill buttons, centred, below hero
- **Mobile**: Horizontally scrollable row with fade-out edge hint. No wrapping — single row scroll.

---

### Section 3: Featured Article (Optional)
**Shopify Section Type**: `blog-featured-article` (custom section)
**Purpose**: Highlight one pinned/editorial-pick article at the top of the listing, larger than the grid cards. Creates visual hierarchy and an editorial "cover story" feel.

**Draft Content**:
- **Large card**: Featured image (landscape, 2:1 ratio), article title, excerpt (2 lines max), date, read time, category tag pill
- **Label**: "Editor's Pick" or "Featured" (configurable)
- Pulls the first article or a merchant-selected article

**Content Sources**:
- Article data: Dynamic (first article in collection, or merchant-selected via metafield/section setting)
- "Editor's Pick" label: Static / configurable

**Configurable Settings**:
| Setting | Type | Default |
|---------|------|---------|
| `show_featured` | Checkbox | true |
| `featured_label` | Text | "Editor's Pick" |
| `featured_article` | Article picker (URL) | — (defaults to first article) |

**Responsive Notes**:
- **Desktop**: Full-width card, image left (60%) / text right (40%), or full-width image with text overlay
- **Mobile**: Stacked — full-width image on top, text below. Same proportions as grid cards but larger.

---

### Section 4: Article Grid
**Shopify Section Type**: `main-blog` (Shopify's main blog section, heavily customised)
**Purpose**: The core content listing. Each card should feel like a magazine spread thumbnail — image-forward, clean typography, minimal metadata. Not a text-heavy blog listing.

**Draft Content (per card)**:
- **Featured image**: `{{article.image}}` — landscape ratio (3:2 or 16:10), lifestyle photography
- **Category tag**: First tag from `{{article.tags}}`, displayed as small pill above title
- **Title**: `{{article.title}}` — e.g., "Five Ways to Style Your Dinner Table This Summer"
- **Excerpt**: `{{article.excerpt_or_content | truncate: 120}}` — e.g., "From the centrepiece down to the napkins — how to create a table setting that makes everyone reach for their phone."
- **Date**: `{{article.published_at | date: '%d %B %Y'}}` — e.g., "15 June 2026"
- **Read time**: Calculated from `article.content | number_of_words` — e.g., "4 min read"
- **Author**: `{{article.author}}` (optional display — consider omitting if single author)

**Content Sources**:
- All card content: Dynamic from `blog.articles` loop
- Read time: Calculated (word count / 200, rounded up)
- Category tag: First tag from `article.tags`

**Configurable Settings**:
| Setting | Type | Default |
|---------|------|---------|
| `articles_per_page` | Range (6–24) | 12 |
| `grid_columns_desktop` | Select: 2 / 3 | 3 |
| `grid_columns_mobile` | Select: 1 / 2 | 1 |
| `card_style` | Select: image-top / image-left / overlay | image-top |
| `show_author` | Checkbox | false |
| `show_date` | Checkbox | true |
| `show_read_time` | Checkbox | true |
| `show_excerpt` | Checkbox | true |
| `show_category_tag` | Checkbox | true |
| `image_ratio` | Select: 3:2 / 16:9 / square | 3:2 |
| `card_hover_effect` | Select: none / zoom / lift | zoom |

**Responsive Notes**:
- **Desktop**: 3-column grid, generous gutters (24–32px), cards have subtle hover lift or image zoom
- **Tablet**: 2-column grid
- **Mobile**: Single-column stack, full-width cards. Image ratio maintained. Comfortable thumb-scrolling spacing (16px gap).

---

### Section 5: Pagination / Load More
**Shopify Section Type**: Part of `main-blog` section (pagination component)
**Purpose**: Navigate the growing content library without overwhelming the initial load. Infinite scroll is intentionally avoided — it hurts SEO and doesn't suit editorial browsing.

**Draft Content**:
- **Previous / Next** links with page numbers
- Or: "Load more" button with "Showing 12 of 36 articles" counter
- Style: Minimal, centred, understated. Not the focus.

**Content Sources**:
- Pagination data: Dynamic from Shopify's `paginate` object

**Configurable Settings**:
| Setting | Type | Default |
|---------|------|---------|
| `pagination_style` | Select: numbered / load-more | numbered |
| `show_article_count` | Checkbox | true |

**Responsive Notes**:
- **Desktop**: Centred pagination row
- **Mobile**: Same, with larger touch targets (44px minimum)

---

### Section 6: Newsletter Signup
**Shopify Section Type**: `newsletter` (reusable section, shared with other pages)
**Purpose**: Capture email addresses from content-engaged visitors. Blog readers are warm leads — they've demonstrated interest in the category. Secondary conversion goal behind product discovery.

**Draft Content**:
- **Heading**: "Stay in the glow."
- **Body**: "Styling ideas, new lamp drops, and the occasional offer — straight to your inbox. No spam, just good light."
- **Input placeholder**: "Your email address"
- **Button**: "Subscribe"
- **Fine print**: "We send 2–4 emails per month. Unsubscribe anytime."
- **Background**: Warm neutral tone or subtle lifestyle image, distinct from article grid above

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
| `background_colour` | Colour | `#F5F0EB` (warm neutral) |
| `background_image` | Image picker | — |
| `section_padding` | Range | 60px top/bottom |

**Responsive Notes**:
- **Desktop**: Centred single-column layout, max-width 560px, comfortable whitespace
- **Mobile**: Full-width with 16px padding. Input and button stack vertically.

---

## Shared Components

### Article Card Component
Used in: Blog listing grid, Related Articles section (article page), Homepage blog preview
- Featured image with lazy loading and aspect ratio container
- Category tag pill (first tag)
- Title (h3, linked)
- Excerpt (truncated, 2 lines max with `line-clamp`)
- Meta row: date + read time
- Entire card is clickable (anchor wraps card)
- Focus state: Visible outline for keyboard navigation

### Newsletter Form Component
Used in: Blog listing, Article page, Homepage, Footer
- Email input + submit button
- Client-side validation (email format)
- Success/error state messaging
- Integrates with Shopify customer marketing or Klaviyo

---

## SEO Considerations
- **Page title**: `{{blog.title}} — Lettii` (under 60 chars)
- **Meta description**: Configurable per-blog, defaults to static editorial description
- **Canonical URL**: `/blogs/journal` (or `/blogs/journal/tagged/[tag]` for filtered views — include `rel=canonical` pointing to unfiltered page to avoid duplicate content)
- **Structured data**: `Blog` schema with `BlogPosting` entries for each visible article
- **Pagination SEO**: `rel=next` / `rel=prev` on paginated pages
- **H1**: Blog title (one per page)
- **Image alt text**: Required on all article featured images — pulled from `article.image.alt` or `article.title`
- **Internal linking**: Article cards serve as internal links. Category filter pages are indexable but canonicalised.

---

## Accessibility
- **Heading hierarchy**: H1 (blog title) > H2 (section headings like "Editor's Pick") > H3 (article card titles)
- **Filter bar**: `role="navigation"` with `aria-label="Article categories"`. Active filter has `aria-current="page"`.
- **Article cards**: Each card is a semantic `<article>` element. Entire card clickable but screen reader announces title link only (no redundant links).
- **Images**: All `article.image` rendered with `alt` text. Decorative hero background uses `role="presentation"`.
- **Pagination**: `<nav aria-label="Blog pagination">` with clear previous/next labelling.
- **Newsletter form**: `<label>` elements associated with inputs. `aria-describedby` for fine print. Success/error states use `role="alert"`.
- **Colour contrast**: All text meets WCAG 2.1 AA (4.5:1 for body, 3:1 for large text). Category tag pills tested against background.
- **Keyboard**: All interactive elements focusable. Tab order follows visual order. No keyboard traps.

---

## Open Decisions
| Decision | Options | Recommendation |
|----------|---------|----------------|
| Blog handle/name | "journal" / "the-edit" / "blog" | "journal" — editorial feel without pretension. URL: `/blogs/journal` |
| Featured article treatment | Pinned first article / merchant-selected / none | Merchant-selected via section setting. Falls back to most recent. |
| Category source | `blog.all_tags` auto-generated / manually configured list | Manually configured list of 5–6 categories. Auto-generated tags get messy. |
| Pagination vs load-more | Traditional pagination / "Load more" button | Numbered pagination. Better for SEO, cleaner UX, editorial feel. |
| Author display | Show / hide | Hide at launch (single author). Setting available to enable later. |
| Card excerpt source | `article.excerpt` only / fallback to truncated content | Fallback: use `article.excerpt` if set, otherwise `strip_html \| truncate: 120` on content. |

---

## Complexity Estimate
| Aspect | Estimate |
|--------|----------|
| **Sections** | 6 (hero, filter, featured, grid, pagination, newsletter) |
| **Custom sections** | 3 (blog-hero, blog-category-filter, blog-featured-article) |
| **Shared components** | 2 (article card, newsletter form) |
| **JavaScript** | Minimal — filter bar interaction (URL-based, no AJAX needed), load-more if chosen, newsletter form submission |
| **Overall complexity** | Medium. The article grid and card component are the core work. Filter bar is URL-based tag filtering (Shopify native). Hero and newsletter are straightforward. |
