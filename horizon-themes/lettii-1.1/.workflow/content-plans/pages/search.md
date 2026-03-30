# Page Spec: Search Results Page

## Template: `search`
## URL Pattern: `/search?q={{search.terms}}`
## Priority: Medium (low direct traffic volume, but important recovery path for visitors who can't find what they need via navigation)

---

## Page Metadata

- **Title tag**: `Search results for "{{search.terms}}" | Lettii`
- **Meta description**: None (search results pages should not be indexed)
- **Robots**: `noindex, follow` — search results pages should not appear in Google, but links on them should be followed
- **Canonical**: None (noindex pages do not need a canonical)

## Target Audience

- **Primary**: Visitors who used the site search bar — either from the header search icon or redirected from a zero-results state. These are high-intent visitors who know what they want but couldn't find it via navigation.
- **Secondary**: Visitors arriving from external search engines with a `?q=` parameter (rare, but possible if indexed accidentally).

## Dynamic Data Sources

| Variable | Source | Notes |
|----------|--------|-------|
| `search.terms` | URL query parameter | The visitor's search query |
| `search.results` | Shopify search engine | Matching products, pages, articles |
| `search.results_count` | Shopify search engine | Total number of results |
| `search.types` | Template filter | Can be filtered to products only, or include pages/articles |
| Product data | Same as collection page | `product.title`, `product.price`, `product.images`, `product.available`, `product.tags`, `product.variants` |

---

## Page Sections

---

### Section 1: Search Header

**Shopify Section Type**: `search-header` (custom section)
**Purpose**: Prominently display the search bar and results context so visitors can immediately refine their search or see what was found. The search bar is the hero element of this page — it should be unmissable.

**Draft Content**:

*With results:*
- Results summary: `{{search.results_count}} results for "{{search.terms}}"`
- Search bar pre-filled with `{{search.terms}}`, ready for editing

*Zero results:*
- Heading: "We couldn't find '{{search.terms}}'"
- Subtext: "Try a different search, or browse our collections below."
- Search bar pre-filled with `{{search.terms}}`, ready for editing

*Empty search (no query):*
- Heading: "What are you looking for?"
- Subtext: "Search by lamp name, style, colour, or setting."
- Search bar empty, focused and ready for input

**Content Sources**:
- Results count and search terms: Dynamic from `{{search.results_count}}` and `{{search.terms}}`
- Heading and subtext for zero/empty states: Static (merchant-editable)

**Configurable Settings**:
- Zero-results heading text (default: "We couldn't find '{{search.terms}}'")
- Zero-results subtext (default: "Try a different search, or browse our collections below.")
- Empty search heading text (default: "What are you looking for?")
- Search bar placeholder text (default: "Search lamps, styles, colours...")
- Background colour (default: warm neutral matching site palette)

**Responsive Notes**:
- **Desktop**: Centred layout. Search bar is prominent and wide (max 600px). Results count as subtle text below the bar. Generous vertical padding to separate from product grid.
- **Mobile**: Full-width search bar with comfortable touch target height (48px minimum). Results count below. Search bar auto-focused on empty search state.

**Media Requirements**: None

---

### Section 2: Trust Bar

**Shopify Section Type**: `trust-bar` (shared section, same as collection page)
**Purpose**: Reinforce credibility for visitors who may be early in their browsing journey. Consistent with every other browsing page.

**Draft Content**:
Same as collection page trust bar:

1. **30-Day Guarantee** — "Love it or return it. Free."
2. **Free UK Shipping** — "On orders over £50"
3. **12-Hour Battery, USB-C** — "One charge. All evening."
4. **Free Returns** — "No questions asked."

**Content Sources**: Static (shared section, configured once in theme settings)

**Configurable Settings**: Same as collection page trust bar. Show/hide toggle per page (default: on).

**Responsive Notes**: Same as collection page trust bar.

**Media Requirements**: Same SVG icons as collection page trust bar.

---

### Section 3: Search Results — Product Grid

**Shopify Section Type**: `search-product-grid` (custom section, inherits product card component from collection page)
**Purpose**: Display matching products in the same lifestyle card format used on collection pages. Consistent visual language so visitors don't feel they've left the main shopping experience.

**Draft Content**:

Product cards are identical to the collection page format:

1. **Product image**: Lifestyle shot (first product image)
2. **Quick-add overlay**: Hover (desktop) / persistent cart icon (mobile)
3. **Product name**: `{{product.title}}`
4. **Price**: `{{product.price}}` or strikethrough for bundles/sales
5. **Star rating**: When available (hidden at launch)
6. **Colour swatches**: Available variant colours
7. **Badges**: SET / Save X% / NEW / BEST SELLER / SOLD OUT (same tag-driven logic as collection page)

Results are sorted by relevance (Shopify search default). No additional sort or filter controls — the search bar itself is the primary refinement tool.

*Example: Search for "mushroom"*
- Returns: The Marlo, The Marlo Duo, Mushroom & Dome collection products
- Cards display in same lifestyle format as collection page

*Example: Search for "dinner party"*
- Returns: Dinner Party Set of 4, Dining & Entertaining collection products
- Bundle cards show "SET — Save 24%" badge

**Content Sources**: Dynamic — product data from `{{search.results}}` filtered to type "product"

**Configurable Settings**:
- Columns: desktop (3 or 4, default 4), mobile (1 or 2, default 2)
- Image aspect ratio (portrait / square, default portrait 3:4)
- Show/hide star ratings (toggle, default on)
- Show/hide colour swatches (toggle, default on)
- Show/hide quick-add (toggle, default on)
- Results per page before "Load more" (default: all)
- Search result types to include: products only / products + pages / products + pages + articles (default: products only for the grid — pages and articles shown separately below if enabled)

**Responsive Notes**:
- **Desktop**: 3-4 column grid, same as collection page. Identical product card styling.
- **Mobile**: 2 columns. Same card format and interaction patterns as collection page.

**Media Requirements**: Same product image requirements as collection page — lifestyle-first product images.

---

### Section 4: Non-Product Results (Conditional)

**Shopify Section Type**: Built into `search-product-grid` section or separate `search-content-results` section
**Purpose**: If search results include matching pages (Our Story, FAQ, Hospitality) or blog articles, display them below the product grid in a clearly separated section. Products are the priority; content results are supplementary.

**Draft Content**:

- Section heading: "More from Lettii"
- Each result card shows:
  - Page/article title as a link
  - Excerpt (first 120 characters of content)
  - Type label: "Page" or "Article"

*Example: Search for "outdoor" returns:*
- Products: Garden & Outdoor collection products (shown in grid above)
- Pages: "FAQ" (matching answer about IP54 waterproofing), "Styling Ideas" (matching outdoor section)
- Articles: "5 Ways to Light Your Garden Table" blog post

**Content Sources**: Dynamic from `{{search.results}}` filtered to types "page" and "article"

**Configurable Settings**:
- Show/hide non-product results (toggle, default on)
- Section heading text (default: "More from Lettii")
- Max non-product results to show (default: 4)

**Responsive Notes**:
- **Desktop**: Simple list below the product grid with a clear divider. Each result is a text link with excerpt — not a card. Minimal visual weight.
- **Mobile**: Same list format, full-width. Clear separation from product grid above.

**Media Requirements**: None

---

### Section 5: Zero-Results Recovery

**Shopify Section Type**: `search-zero-results` (custom section, renders when `search.results_count == 0`)
**Purpose**: When a search returns nothing, provide helpful pathways back into the store instead of a dead end. This is a recovery and discovery surface — it should feel inviting, not apologetic.

**Draft Content**:

**Search suggestions** (static helpful prompts):
- Heading: "Try searching for:"
- Suggestion chips: "Table lamp" | "Mushroom" | "Dinner party" | "Outdoor" | "Bedside" | "Bundle" | "Gift"
- Each chip is a clickable link that triggers a new search for that term

**Popular collections** (curated links with lifestyle thumbnails):
- Heading: "Or explore our collections"
- Collection cards (small, 3 across on desktop):
  1. Image: Dining table scene → "Dining & Entertaining" → `/collections/dining-entertaining`
  2. Image: Garden terrace scene → "Garden & Outdoor" → `/collections/garden-outdoor`
  3. Image: Bundle of lamps → "Sets & Bundles" → `/collections/sets-bundles`
  4. Image: Bedside scene → "Bedroom & Bedside" → `/collections/bedroom-bedside`

**Reassurance line**:
- "Can't find what you need? [Get in touch](mailto:hello@lettii.co.uk) — we're happy to help."

**Content Sources**:
- Search suggestion chips: Static (merchant-editable list)
- Collection cards: Dynamic collection objects (image, title, URL) selected by merchant in theme customizer
- Reassurance line: Static (merchant-editable)

**Configurable Settings**:
- Suggestion chip terms (list of up to 10 terms, merchant-editable)
- Collections to feature (collection picker, up to 6, default 4)
- Reassurance text and link
- Show/hide search suggestions (toggle, default on)
- Show/hide collection cards (toggle, default on)

**Responsive Notes**:
- **Desktop**: Search suggestions as horizontal chip row. Collection cards in a 3-4 column grid below. Reassurance line centred at bottom.
- **Mobile**: Suggestion chips wrap to multiple rows (scrollable or wrapping). Collection cards in 2-column grid. Reassurance line full-width, centred.

**Media Requirements**:
- Collection card images are pulled from `{{collection.image}}` — same lifestyle images used as collection heroes. No additional media production needed.

---

## Shared Components Used on This Page

| Component | Description | Also Used On |
|-----------|-------------|-------------|
| Trust Bar | 4-icon trust signal strip | Homepage, Product, Cart, Collection |
| Product Card | Lifestyle image, name, price, swatches, rating, badges, quick-add | Collection, Homepage featured products |
| Quick-Add Drawer | Colour selector + ATC from product card | Collection, Homepage |
| Search Bar | Input field with search icon, suggestions | Site header (global), 404 page |
| Announcement Bar | Rotating trust messages in site header | All pages (global) |
| Site Header | Logo, navigation, search, cart icon | All pages (global) |
| Site Footer | Navigation columns, email signup, social links, payment icons | All pages (global) |

---

## SEO Considerations

- **Robots directive**: `noindex, follow` — search results pages must not be indexed by search engines (they create thin/duplicate content). Links on the page should still be followed.
- **No H1 from search terms**: The H1 is "Search results" or the zero-results heading, not the raw query string (prevents injection of arbitrary text into page headings).
- **Internal linking**: Zero-results recovery section links to key collections, improving crawlability as a side benefit.
- **No canonical tag**: Noindexed pages do not need canonicals.

---

## Accessibility Requirements

- **Search bar**: Proper `<label>` element (visually hidden if needed), `role="search"` on the form, `aria-label="Search Lettii"` on the input, clear button with `aria-label="Clear search"`
- **Results count**: Announced to screen readers via `aria-live="polite"` region when results load or update
- **Product cards**: Same accessibility requirements as collection page product cards — single link wrapper, aria labels for badges and swatches, separate focusable quick-add button
- **Search suggestion chips**: Keyboard navigable, clear focus states, `role="link"` semantics
- **Zero-results state**: Focus management — when zero results render, focus moves to the search bar so the visitor can immediately try a new query
- **Loading state**: If results load asynchronously, provide `aria-busy="true"` on the results container and announce completion

---

## Open Decisions

| Decision | Options | Recommendation | Status |
|----------|---------|----------------|--------|
| Search result types | Products only vs. products + pages + articles | Products only in the main grid. Pages/articles in a secondary "More from Lettii" section below. Most visitors searching on a 20-SKU store want products. | Recommended |
| Sort/filter on search | No controls vs. basic sort | No sort or filter controls. With <20 SKUs, search results will be short. The search bar is the refinement tool. Add sort if catalog grows past 50 SKUs. | Recommended |
| Predictive search | Dropdown suggestions as you type vs. results page only | Predictive search dropdown in the header search bar (shows top 3-4 product matches with thumbnails as you type). Reduces need to visit the search results page at all. This is a header component, not a search page component. | Recommended |
| Search suggestion chips | Static list vs. dynamic popular searches | Static merchant-curated list at launch. Dynamic popular searches require analytics integration — add later. | Recommended |
| Empty search landing | Show popular products vs. show collections vs. empty with prompt | Show popular collections (same as zero-results recovery). Gives the page utility even when accessed directly. | Recommended |

---

## Complexity Estimate

| Aspect | Rating | Notes |
|--------|--------|-------|
| Template logic | Low-Medium | Three states (results, zero results, empty search) with conditional rendering. Product cards reuse collection page component. |
| Content entry | Low | Minimal merchant content — search suggestion chips and featured collections in zero-results state. Everything else is dynamic or shared. |
| Custom sections | Low | Search header, product grid (shared component), zero-results recovery. The trust bar is a shared section. |
| Interactivity | Low-Medium | Search input with form submission. Quick-add on product cards (shared). Optional predictive search is a header-level feature, not a search page feature. |
| Media production | None | No unique media needed. Product cards use existing lifestyle images. Collection cards in zero-results use existing collection hero images. |
| Overall | Low-Medium | Straightforward search template. The main work is ensuring product cards match collection page styling exactly, and crafting a genuinely helpful zero-results experience. Predictive search (if implemented) is the main technical lift, but it lives in the header, not this template. |
