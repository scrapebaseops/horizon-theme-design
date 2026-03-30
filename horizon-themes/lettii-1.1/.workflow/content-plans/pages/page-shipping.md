# Page Spec: Shipping & Delivery

## Page Metadata

| Field | Value |
|-------|-------|
| **Page Title** | Shipping & Delivery — Lettii |
| **URL Handle** | `/pages/shipping` |
| **Template** | `page.shipping` |
| **Meta Title** | Shipping & Delivery — Lettii |
| **Meta Description** | Free UK shipping on orders over £50. Standard delivery 2–4 days. Next-day express available. Full shipping details, tracking, and returns info. |
| **Nav Placement** | Footer "Help" column |

---

## Target Audience & Intent

| Dimension | Detail |
|-----------|--------|
| **Primary visitor** | Pre-purchase shopper checking shipping cost and delivery time before buying |
| **Secondary visitor** | Post-purchase customer checking delivery timeline or tracking information |
| **Intent** | "How much is shipping? When will it arrive?" — functional, not emotional |
| **Entry points** | Footer link, trust badge links ("Free shipping £50+"), product page shipping info links, cart |
| **Success metric** | Visitor returns to product page or cart (shipping confirmed, objection removed). Quick answer, quick exit. |

---

## Sections (Top to Bottom)

### Section 1: Page Header
**Shopify Section Type**: `rich-text`
**Purpose**: Brief, functional header. No marketing fluff — this is a utility page.

**Draft Content**:
- **Heading (H1)**: "Shipping & Delivery"
- **Body**: "Everything you need to know about getting your Lettii lamp to your door."

**Content Sources**: Static
**Configurable Settings**:
- Heading, body text
- Text alignment

**Responsive Notes**:
- Desktop: centred or left-aligned
- Mobile: left-aligned

**Media Requirements**: None

---

### Section 2: Shipping Options Table
**Shopify Section Type**: `rich-text` (with HTML table) or `custom-table`
**Purpose**: Core content. Clear, scannable, no ambiguity.

**Draft Content**:

| Service | Cost | Delivery Time | Carrier |
|---------|------|---------------|---------|
| **Standard** | Free on orders over £50 | 2–4 business days | Royal Mail / Evri |
| **Standard** | £3.95 (orders under £50) | 2–4 business days | Royal Mail / Evri |
| **Express (Next Day)** | £5.95 | Next working day (order by 2pm) | Royal Mail Tracked 24 / DPD |

**Content Sources**: Static
**Configurable Settings**:
- Table content (editable rows)
- Free shipping threshold value
- Carrier names

**Blocks**: Repeatable row block (service, cost, time, carrier)

**Responsive Notes**:
- Desktop: clean horizontal table, centred, max-width 700px
- Mobile: card layout (one card per shipping option with label/value pairs) or horizontal scroll

**Media Requirements**: None

---

### Section 3: Free Shipping Callout
**Shopify Section Type**: `rich-text`
**Purpose**: Reinforce the free shipping threshold. Nudge towards £50+ order (bundle territory).

**Draft Content**:
> **Free UK shipping on all orders over £50.**
>
> Most of our bundles and sets qualify for free shipping automatically. Single lamps start at £39 — add a second and you'll be well over the threshold.

**Content Sources**: Static
**Configurable Settings**:
- Heading, body text
- Background colour (subtle highlight — e.g., brand accent background)

**Responsive Notes**:
- Desktop: centred callout block with background colour
- Mobile: full-width callout

**Media Requirements**: None

---

### Section 4: Shipping Details
**Shopify Section Type**: `rich-text`
**Purpose**: Additional details — dispatch times, UK-only note, what to expect.

**Draft Content**:

**Dispatch**
All orders placed before 2pm on a business day are dispatched the same day. Orders placed after 2pm or on weekends ship the next business day.

**Tracking**
Every order includes tracking. You'll receive a shipping confirmation email with a tracking link once your order is dispatched. You can also check your order status in your account.

**UK Delivery Only**
We currently deliver to all UK mainland addresses. Scottish Highlands, Northern Ireland, and offshore islands may take an additional 1–2 business days.

International shipping is coming soon. Sign up for our newsletter in the footer to be first to know.

**Content Sources**: Static
**Configurable Settings**:
- Body text (rich text — supports headings, paragraphs, links)
- Text width

**Responsive Notes**:
- Desktop: narrow column (680px), generous spacing between subsections
- Mobile: full-width with padding

**Media Requirements**: None

---

### Section 5: Returns & Guarantee Link
**Shopify Section Type**: `rich-text-with-button`
**Purpose**: Cross-link to returns info. Many visitors checking shipping also want returns info.

**Draft Content**:
- **Heading**: "Returns & Guarantee"
- **Body**: "Every Lettii lamp comes with a 30-day money-back guarantee. Free return shipping, no questions asked, full refund within 5 business days."
- **CTA**: "Read our full returns policy in the FAQ" → `/pages/faq`

**Content Sources**: Static
**Configurable Settings**:
- Heading, body, button text, URL
- Background colour

**Responsive Notes**:
- Desktop: centred block
- Mobile: full-width button

**Media Requirements**: None

---

### Section 6: Contact CTA
**Shopify Section Type**: `rich-text-with-button`
**Purpose**: Catch shipping questions that aren't covered above.

**Draft Content**:
- **Heading**: "Question about a delivery?"
- **Body**: "Email us at hello@lettii.co.uk with your order number. We reply within 12 hours."
- **CTA**: "Contact Us" → `/pages/contact`

**Content Sources**: Static
**Configurable Settings**:
- Heading, body, button text, URL

**Responsive Notes**:
- Desktop: centred, small text
- Mobile: full-width button

**Media Requirements**: None

---

## Shared Components

| Component | Present? | Notes |
|-----------|----------|-------|
| **Header** | Yes | Standard sticky header |
| **Announcement bar** | Yes | Trust signal rotation |
| **Footer** | Yes | Standard 4-column footer |

---

## SEO

| Element | Value |
|---------|-------|
| **Title tag** | Shipping & Delivery — Lettii |
| **Meta description** | Free UK shipping on orders over £50. Standard delivery 2–4 days. Next-day express available. Full shipping details, tracking, and returns info. |
| **H1** | "Shipping & Delivery" |
| **Schema** | None required (standard informational page) |
| **Internal links** | FAQ (returns section), contact page, newsletter/styling ideas |
| **Target queries** | "Lettii shipping," "Lettii delivery times" — primarily brand-search utility queries |

---

## Accessibility

- Shipping table must use semantic `<table>` with `<th>` row/column headers
- If card layout on mobile, each card must group related information with proper labelling
- Links must be descriptive (not "click here")
- Sufficient colour contrast on callout block (Section 3)
- Heading hierarchy: H1 → H2 for subsections → no deeper nesting needed

---

## Decisions & Assumptions

1. **No marketing fluff**: This is a utility page. Shoppers arrive with a specific question, get the answer, and leave. Short, scannable, functional.
2. **Free shipping threshold reinforced**: The £50 threshold is a deliberate AOV lever (single lamp £39–69, bundles £89–149). Mentioning that bundles qualify automatically is a soft upsell.
3. **UK-only at launch**: Stated clearly with a "coming soon" note for international. Newsletter link captures international interest.
4. **No separate returns page**: Returns info lives in the FAQ. This page links there rather than duplicating content.
5. **Carrier names included**: Royal Mail and Evri are recognisable UK carriers. Naming them adds credibility vs. vague "our courier partner."
6. **Express cutoff at 2pm**: [MERCHANT: Confirm the actual dispatch cutoff time.]
7. **Scottish Highlands/islands note**: Standard UK shipping disclaimers. [MERCHANT: Confirm if surcharges apply to these areas.]

---

## Complexity

| Dimension | Rating | Notes |
|-----------|--------|-------|
| **Section count** | 6 | Simple page |
| **Custom sections needed** | 0 | All standard rich-text and table sections |
| **Dynamic content** | None | Fully static |
| **Media assets needed** | 0 | Text-only utility page |
| **Implementation estimate** | Low | Straightforward content page using existing section types |
| **Content effort** | Low | Draft copy provided. Merchant confirms carrier names, cutoff time, area restrictions. |
