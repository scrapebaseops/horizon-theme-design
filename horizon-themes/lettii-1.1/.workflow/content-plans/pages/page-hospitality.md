# Page Spec: For Restaurants & Hospitality

## Page Metadata

| Field | Value |
|-------|-------|
| **Page Title** | For Restaurants & Hospitality — Lettii |
| **URL Handle** | `/pages/for-restaurants-hospitality` |
| **Template** | `page.hospitality` |
| **Meta Title** | Cordless Table Lamps for Restaurants, Bars & Hotels — Lettii |
| **Meta Description** | Premium cordless rechargeable lamps for restaurants, bars, and boutique hotels. Volume pricing from £29/lamp. IP54 waterproof. USB-C charging. Get a quote in 24 hours. |
| **Nav Placement** | Footer "Business" column, "Restaurants & Bars" collection banner, Google Ads landing page |

---

## Target Audience & Intent

| Dimension | Detail |
|-----------|--------|
| **Primary visitor** | Restaurant owner, bar manager, hotel F&B director, hospitality interior designer |
| **Secondary visitor** | Cafe owner, co-working space manager, anyone needing 10+ lamps |
| **Intent** | "I need table lamps for my venue. What's the volume pricing? How do I order?" |
| **Entry points** | Google Ads (primary), footer link, "Restaurants & Bars" collection banner, product page trade link |
| **Success metric** | Enquiry form submission (lead capture) |

---

## Sections (Top to Bottom)

### Section 1: Hero
**Shopify Section Type**: `image-with-text-overlay`
**Purpose**: Immediately confirm this is the trade/venue page. Professional but warm — not corporate.

**Draft Content**:
- **Headline**: "The lamp your guests notice."
- **Subheadline**: "Premium cordless table lamps for restaurants, bars, and boutique hotels. Rechargeable. Waterproof. Designed to disappear into the room and transform the atmosphere."
- **CTA**: "Get a Quote" → anchors to `#enquiry-form`

**Content Sources**: Static
**Configurable Settings**:
- Hero image
- Headline, subheadline
- CTA button text + anchor URL
- Text alignment, overlay opacity, section height

**Responsive Notes**:
- Desktop: full-width, 60vh, text left-aligned
- Mobile: 50vh, text centred, CTA full-width

**Media Requirements**:
- 1920 x 800px lifestyle image — restaurant interior during service, multiple Lettii lamps on tables, warm glow, diners slightly blurred
- [MERCHANT: Provide restaurant service lifestyle image]

---

### Section 2: Commercial Benefits
**Shopify Section Type**: `multicolumn` (4 columns with icons)
**Purpose**: Lead with operational benefits. Venue operators care about cost, safety, and durability — not aesthetics alone.

**Draft Content**:
- **Section Heading**: "Why venues choose Lettii"

- **Column 1 — "No battery costs"**
  - Icon: rechargeable
  - "USB-C rechargeable. No disposable batteries, no ongoing replacement costs. Charge the entire fleet from a standard USB station."

- **Column 2 — "No fire risk"**
  - Icon: flame-off
  - "Replace candles with zero fire risk. No wax, no smoke, no open flame. Straightforward for insurance and health & safety."

- **Column 3 — "Indoor and outdoor"**
  - Icon: water droplet
  - "IP54 rated. Terraces, patios, courtyard dining — rain, condensation, and spilled drinks are all handled."

- **Column 4 — "12 hours per charge"**
  - Icon: clock
  - "Charge during the day, lamp through service. Up to 12 hours means lunch and dinner on a single charge."

**Content Sources**: Static
**Configurable Settings**: Per column: icon, heading, body text
**Blocks**: Repeatable column block

**Responsive Notes**:
- Desktop: 4 equal columns
- Mobile: 2x2 grid

**Media Requirements**: 4 icons (SVG or PNG, 64px)

---

### Section 3: Volume Pricing Table
**Shopify Section Type**: `custom-table` or `rich-text` (with HTML table)
**Purpose**: Show pricing openly. Hiding prices is the single biggest B2B conversion killer.

**Draft Content**:
- **Section Heading**: "Volume pricing"
- **Subheading**: "The more you order, the more you save. No hidden fees."

| Quantity | Approx. Price per Lamp | Saving |
|----------|------------------------|--------|
| 1–9 lamps | £39–69 (retail) | — |
| 10–24 lamps | From ~£29–55 | ~25% off |
| 25–49 lamps | From ~£25–49 | ~30% off |
| 50+ lamps | Custom quote | Best pricing |

- **Footnote**: "Exact pricing depends on design selection and quantities. We'll confirm everything in a detailed proposal within 24 hours."
- **CTA**: "Request a Quote" → anchors to `#enquiry-form`

**Content Sources**: Static (merchant must confirm pricing tiers)
**Configurable Settings**:
- Section heading, subheading
- Table content (editable rows)
- Footnote text
- CTA button text + URL

**Blocks**: Repeatable row block (quantity, price, saving)

**Responsive Notes**:
- Desktop: centred table, 700px max-width, clean layout
- Mobile: horizontal scroll or stacked card layout per tier

**Media Requirements**: None

---

### Section 4: Venue Gallery
**Shopify Section Type**: `image-gallery` or `multicolumn` (image-only)
**Purpose**: Show the product in professional venue contexts. Implied authority — "venues like yours already use lamps like these."

**Draft Content**:
- **Section Heading**: "Designed for every venue"
- 4–6 lifestyle images showing different venue types

**Content Sources**: Static
**Configurable Settings**:
- Section heading
- Gallery layout (grid / slider)
- Per image: image upload, alt text, optional caption

**Blocks**: Repeatable image block (image + alt text + optional caption)

**Responsive Notes**:
- Desktop: 3-column grid
- Mobile: 2-column grid or horizontal swipe

**Media Requirements**:
- 4–6 images at 900 x 600px minimum each
- Venue types: fine dining, casual bar/bistro, boutique hotel, outdoor terrace, hotel lounge, cafe
- [MERCHANT: Provide or approve venue lifestyle images]

---

### Section 5: How to Order
**Shopify Section Type**: `multicolumn` (3 columns with step numbers)
**Purpose**: Reduce friction. Show that ordering is simple and responsive.

**Draft Content**:
- **Section Heading**: "How it works"

- **Step 1 — "Tell us what you need"**
  "Fill in the enquiry form with your venue details and estimated quantity. Takes two minutes."

- **Step 2 — "Get a proposal within 24 hours"**
  "We'll send you a detailed quote with pricing, design options, and delivery timeline."

- **Step 3 — "Sample or go all in"**
  "Order a sample at retail price to test on your tables. Or commit to your full order — either way, every lamp is covered by our 30-day guarantee."

**Content Sources**: Static
**Configurable Settings**: Per step: number/icon, heading, body text
**Blocks**: Repeatable step block

**Responsive Notes**:
- Desktop: 3 columns with prominent step numbers
- Mobile: single column, numbered list

**Media Requirements**: Optional step number graphics

---

### Section 6: Charging at Scale
**Shopify Section Type**: `image-with-text`
**Purpose**: Address the operational question every venue manager asks: "How do we charge 20 lamps every day?"

**Draft Content**:
- **Image**: Multiple lamps on a shelf or charging station, USB-C cables connected
- **Heading**: "Charging 20 lamps is simpler than you think."
- **Body**: "Every lamp charges via USB-C — standard cables and multi-port USB adapters. No proprietary docks. Most venues use a shelf in the back of house with a multi-port USB station. Full charge in 4–5 hours. We'll recommend a setup for your specific quantity."

**Content Sources**: Static
**Configurable Settings**:
- Image (left / right)
- Heading, body text
- Image/text split ratio

**Responsive Notes**:
- Desktop: two-column, image left
- Mobile: image stacked above text

**Media Requirements**:
- 900 x 600px image of charging setup
- [MERCHANT: Provide or stage a charging photo — multiple lamps with USB-C cables on a shelf]

---

### Section 7: Enquiry Form
**Shopify Section Type**: `custom-form` (B2B lead capture)
**Purpose**: Primary conversion goal. Lead capture for consultative sales.
**HTML Anchor**: `#enquiry-form`

**Draft Content**:
- **Heading**: "Request a quote"
- **Subheading**: "Tell us about your venue. We'll have a proposal in your inbox within 24 hours."

- **Form Fields**:
  1. **Your name** — text, required
  2. **Email address** — email, required
  3. **Phone number** — tel, optional
  4. **Venue name** — text, required
  5. **Venue type** — dropdown, required
     - Options: "Restaurant" | "Bar or pub" | "Boutique hotel" | "Hotel group" | "Cafe" | "Event venue" | "Other"
  6. **Estimated quantity** — dropdown, required
     - Options: "1–9 (sample order)" | "10–24" | "25–49" | "50–99" | "100+"
  7. **Message** — textarea, optional
     - Placeholder: "Tell us about your venue, design preferences, timeline, or any questions."
- **Submit**: "Send Enquiry"
- **Confirmation**: "Thanks — we'll send you a proposal within 24 hours."

- **Below form note**: "Want to try one first? [Browse our full range](/collections/all-lamps) and order a sample at retail price. 30-day guarantee on every lamp."

**Content Sources**: Dynamic (form submissions to Shopify inbox or merchant CRM)
**Configurable Settings**:
- All text (heading, subheading, confirmation, note)
- Venue type options
- Quantity options
- Form width

**Responsive Notes**:
- Desktop: centred, 600px max-width, distinct background
- Mobile: full-width fields, full-width submit

**Media Requirements**: None

---

### Section 8: B2B FAQ
**Shopify Section Type**: `collapsible-content` (accordion)
**Purpose**: Address venue-specific concerns not covered in the consumer FAQ.

**Draft Content**:
- **Section Heading**: "Questions from venue operators"

**Q: Can I order a sample before committing?**
A: Yes. Order any lamp from our shop at retail price. If you proceed with a volume order, we'll credit the sample cost against your total.

**Q: What are lead times for bulk orders?**
A: Stock orders (10–49 units) typically dispatch within 3–5 business days. Larger orders (50+) within 7–10 business days. We'll confirm the exact timeline in your proposal.

**Q: Can I mix different designs in one order?**
A: Absolutely. Volume pricing is based on total quantity, not per design. Mix and match freely.

**Q: Do you offer custom colours or branding?**
A: Not at launch. It's on our roadmap. If you have specific requirements, mention them in your enquiry.

**Q: Do you offer ongoing supply or replacement agreements?**
A: Yes. We can set up standing orders with locked-in volume pricing for regular replacements or expansion. Just mention it in your enquiry.

**Q: What warranty do you offer for venues?**
A: 12-month manufacturer warranty on every lamp. For venue customers, we offer priority replacement — a replacement ships the next business day while we arrange collection of the faulty unit.

**Q: Do you invoice or require payment upfront?**
A: Standard volume orders are paid upfront. For established venue relationships, we can discuss invoice terms. Let us know what works for you.

**Content Sources**: Static
**Configurable Settings**: Standard accordion
**Blocks**: Repeatable Q&A block

**Responsive Notes**: Same as consumer FAQ — full-width, generous tap targets

**Media Requirements**: None

---

## Shared Components

| Component | Present? | Notes |
|-----------|----------|-------|
| **Header** | Yes | Standard consumer header — no B2B nav changes |
| **Announcement bar** | Yes | Standard trust rotation |
| **Footer** | Yes | Standard 4-column footer |
| **Newsletter popup** | Disabled | B2B visitors should not receive consumer marketing popups |

---

## SEO

| Element | Value |
|---------|-------|
| **Title tag** | Cordless Table Lamps for Restaurants, Bars & Hotels — Lettii |
| **Meta description** | Premium cordless rechargeable lamps for restaurants, bars, and boutique hotels. Volume pricing from £29/lamp. IP54 waterproof. USB-C charging. Get a quote in 24 hours. |
| **H1** | "The lamp your guests notice." |
| **Schema** | `Product` schema with `AggregateOffer` (price range). Optionally `LocalBusiness` for the brand contact. |
| **Internal links** | Collections (/collections/all-lamps), contact page |
| **Target queries** | "cordless table lamps restaurants," "rechargeable restaurant lamps UK," "cordless lamps wholesale," "table lamps bars hotels," "cordless lamps bulk order" |
| **Google Ads note** | This page is a primary landing page for Google Ads B2B campaigns. Ensure fast load speed, CTA visible above fold on mobile, and form anchor (`#enquiry-form`) works correctly for ad CTAs linking directly to the form. |

---

## Accessibility

- Pricing table must use semantic `<table>` with `<th>` headers for screen readers
- Form fields must have visible labels, not placeholder-only
- Enquiry form validation must be inline, not modal
- Success confirmation must announce via aria-live region
- Gallery images must have descriptive alt text ("Lettii cordless lamp on a restaurant table during evening service")
- Accordion follows same pattern as FAQ page (button + aria-expanded)
- Anchor link (`#enquiry-form`) must scroll smoothly and focus the first form field

---

## Decisions & Assumptions

1. **Lead capture, not direct checkout**: Orders of 10–50+ units require consultative sales. No add-to-cart on this page.
2. **Sample order at retail**: Low-commitment entry point for B2B. Sample cost credited against volume orders. [MERCHANT: Confirm this policy.]
3. **Volume pricing shown openly**: Approximate ranges only — exact quotes depend on design mix. Transparency is critical for B2B trust.
4. **Professional but warm tone**: This page still sounds like Lettii. It's not a corporate brochure — it's a confident small brand talking to another business.
5. **No consumer navigation changes**: B2B is a "quiet door" — the main nav remains consumer-focused.
6. **Newsletter popup disabled**: B2B visitors get a trade-focused enquiry form, not a consumer email popup.
7. **Google Ads compatibility**: Page structure supports direct linking to `#enquiry-form` from ad copy.
8. **Pricing tiers are estimates**: [MERCHANT: Confirm actual volume discount percentages and breakpoints.]
9. **Lead times are estimates**: [MERCHANT: Confirm stock/fulfilment capacity for 10–100+ unit orders.]

---

## Complexity

| Dimension | Rating | Notes |
|-----------|--------|-------|
| **Section count** | 8 | Higher than most content pages |
| **Custom sections needed** | 2 | B2B enquiry form (custom fields), pricing table (HTML or custom section) |
| **Dynamic content** | Enquiry form submissions | Need routing to merchant email or CRM |
| **Media assets needed** | 5–7 venue lifestyle images + 4 icons + 1 charging photo | [MERCHANT: Must provide all images] |
| **Implementation estimate** | Medium | Custom form and pricing table require development beyond standard Horizon sections |
