# [Page Name] — Content Specification

## Page Metadata

| Field | Value |
|-------|-------|
| **Page Name** | [PLACEHOLDER: e.g., "Product Details"] |
| **Shopify Template Type** | [PLACEHOLDER: e.g., "product", "collection", "page.about", "index"] |
| **URL Path** | [PLACEHOLDER: e.g., "/products/[product-handle]"] |
| **Purpose** | [PLACEHOLDER: Brief statement of what this page does] |
| **Primary User Action** | [PLACEHOLDER: What action should the user take here?] |
| **Brand Trait Context** | [PLACEHOLDER: Which brand traits influence this page's structure] |
| **Page Status** | [not-started / in-progress / complete] |

---

## Target Audience & Intent

**Primary Users**: [PLACEHOLDER: Who visits this page? E.g., "First-time shoppers exploring the brand", "Returning customers reordering"]

**User Intent**: [PLACEHOLDER: What are they trying to accomplish? E.g., "Evaluate product quality and make a purchase decision"]

**Conversion Goal**: [PLACEHOLDER: What specific action do we want them to take? E.g., "Add to cart", "Subscribe", "Contact us"]

**CRO Rationale**: [PLACEHOLDER: Why is this page structured this way? Reference specific findings from Step 2 research]

---

## Dynamic Data (for product, collection, blog, and article pages only)

<!-- Skip this section for static content pages (about, contact, FAQ, etc.) -->

**Shopify Data Objects Used**: [PLACEHOLDER: E.g., "product", "collection", "article" — list the primary Shopify objects this page depends on]

**Key Dynamic Fields**:
- [PLACEHOLDER: E.g., "product.title, product.description, product.images, product.price, product.variants"]
- [PLACEHOLDER: E.g., "product.metafields.custom.ingredients (if applicable)"]

**Variant/Filter Behavior** (if applicable):
- [PLACEHOLDER: E.g., "Color swatches update product image; size dropdown shows availability per size"]

**Conditional Sections** (if applicable):
- [PLACEHOLDER: E.g., "Size guide section only appears for products tagged 'apparel'"]
- [PLACEHOLDER: E.g., "Ingredient breakdown only appears if product.metafields.custom.ingredients exists"]

---

## Sections (Top to Bottom)

<!-- Duplicate this section block for each distinct content area on the page. Order matters — list sections exactly as they should appear from top to bottom. -->

### Section 1: [Section Name]

**Shopify Section Type**: [PLACEHOLDER: e.g., "hero", "rich-text", "featured-collection", "image-with-text", or custom section name like "sandstone-page-hero"]

**Purpose**: [PLACEHOLDER: What this section accomplishes in the page flow. E.g., "Establishes brand identity and drives visitors to the primary product"]

**Draft Content**:

<!-- Write realistic content in the brand's voice. Use {{liquid.variables}} for dynamic Shopify data and [MERCHANT: instructions] for content the merchant must provide. -->

- **Headline**: "[PLACEHOLDER: Draft headline, e.g., 'Skincare that works with your skin, not against it']"
- **Subheadline**: "[PLACEHOLDER: Draft subheadline, e.g., 'Clinically tested. Dermatologist approved. Made for real routines.']"
- **Body Copy**: "[PLACEHOLDER: Draft body text, 2–4 sentences. E.g., 'We stripped out everything your skin doesn't need and kept everything it does. No fillers, no fragrance, no guesswork.']"
- **Primary CTA**: "[PLACEHOLDER: Button text]" → [Link destination, e.g., /collections/all, /products/hero-product]
- **Secondary CTA** (if applicable): "[PLACEHOLDER: Button text]" → [Link destination]
- **Supporting Elements**: [PLACEHOLDER: Badges, icons, trust signals, micro-copy. E.g., "Free shipping badge, '30-day guarantee' text, star rating"]

**Content Sources**:
- [PLACEHOLDER: Which content is static (theme settings) vs. dynamic (Shopify data)]
- [PLACEHOLDER: E.g., "Headline and body from section settings; product price from {{product.price}}"]

**Configurable Settings** (editable in Shopify theme editor):
- [PLACEHOLDER: E.g., "Heading text (text input)"]
- [PLACEHOLDER: E.g., "Background image (image_picker)"]
- [PLACEHOLDER: E.g., "Button text and URL (text + url)"]
- [PLACEHOLDER: E.g., "Show/hide subheadline (checkbox)"]
- [PLACEHOLDER: E.g., "Text alignment (select: left/center/right)"]

**Blocks** (if this section supports repeatable content):
- [PLACEHOLDER: E.g., "Feature block: icon (image_picker) + title (text) + description (text) — max 6 blocks"]

**Responsive Notes**:
- **Desktop**: [PLACEHOLDER: Layout description, e.g., "Two-column: image left, text right, 50/50 split"]
- **Tablet**: [PLACEHOLDER: E.g., "Same as desktop but tighter padding"]
- **Mobile**: [PLACEHOLDER: E.g., "Stacked: image full-width above text, CTA becomes full-width button"]

**Interactive Elements**:
- [PLACEHOLDER: E.g., "CTA button hover state", "Image lightbox on click", "Video play button"]

**Media Requirements**:
- [PLACEHOLDER: E.g., "Hero image: 1920x800px lifestyle photo, must work with text overlay"]
- [PLACEHOLDER: E.g., "3 product lifestyle photos, minimum 800x800px"]
- [PLACEHOLDER: E.g., "Background video: 15–30s loop, no audio needed"]
- [MERCHANT: Describe any media the merchant must provide]

---

### Section 2: [Section Name]

**Shopify Section Type**: [PLACEHOLDER]

**Purpose**: [PLACEHOLDER]

**Draft Content**:
- **Headline**: "[PLACEHOLDER]"
- **Body Copy**: "[PLACEHOLDER]"
- **CTA**: "[PLACEHOLDER]" → [destination]

**Content Sources**:
- [PLACEHOLDER]

**Configurable Settings**:
- [PLACEHOLDER]

**Responsive Notes**:
- **Desktop**: [PLACEHOLDER]
- **Mobile**: [PLACEHOLDER]

**Media Requirements**:
- [PLACEHOLDER]

---

<!-- Add more sections as needed. Copy the section block above for each content area. -->

---

## Shared Components on This Page

**Header**: [PLACEHOLDER: Standard header, or note any page-specific header behavior. E.g., "Transparent header overlaying hero image on desktop, solid on scroll"]

**Footer**: [PLACEHOLDER: Standard footer, or note any page-specific footer behavior]

**Announcement Bar**: [PLACEHOLDER: Present/not present, any page-specific messaging]

---

## SEO Considerations

**Meta Title Pattern**: [PLACEHOLDER: E.g., "{{product.title}} | [Brand Name]" or "[Brand Name] — [tagline]"]

**Meta Description Pattern**: [PLACEHOLDER: E.g., "Shop {{product.title}} — [value prop]. Free shipping on orders over $50."]

**Structured Data**: [PLACEHOLDER: E.g., "Product schema for rich snippets", "Organization schema on homepage", "BreadcrumbList"]

---

## Accessibility Notes

- [PLACEHOLDER: E.g., "All images have descriptive alt text derived from product/section data"]
- [PLACEHOLDER: E.g., "Form inputs have visible labels, not just placeholders"]
- [PLACEHOLDER: E.g., "Interactive elements are keyboard accessible with visible focus states"]
- [PLACEHOLDER: E.g., "Color is not the sole indicator of state (e.g., errors use icon + text + color)"]

---

## Decisions & Assumptions

<!-- Document any ambiguities from the brand brief and the decisions made. These help the user review and adjust. -->

- [DECISION: Brief description of what was decided and why]
- [DECISION: Another decision]

---

## Estimated Complexity

**Complexity Level**: [ ] Simple  [ ] Medium  [ ] Complex

**Justification**: [PLACEHOLDER: E.g., "Medium: standard sections with one custom component (ingredient breakdown), moderate interactivity"]

---

**Last Updated**: [DATE]
**Status**: [DRAFT / REVIEW / APPROVED]
