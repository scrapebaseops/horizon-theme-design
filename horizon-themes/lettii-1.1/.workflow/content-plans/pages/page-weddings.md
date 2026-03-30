# Page Spec: For Weddings & Events

## Page Metadata

| Field | Value |
|-------|-------|
| **Page Title** | For Weddings & Events — Lettii |
| **URL Handle** | `/pages/for-weddings-events` |
| **Template** | `page.weddings` |
| **Meta Title** | Cordless Table Lamps for Weddings & Events — Lettii |
| **Meta Description** | Cordless rechargeable table lamps for weddings, receptions, and events. Warm, wireless, waterproof. Event packages and bulk pricing available. Get in touch. |
| **Nav Placement** | Footer "Business" column |

---

## Target Audience & Intent

| Dimension | Detail |
|-----------|--------|
| **Primary visitor** | Bride/groom planning their own wedding, wedding planner, event stylist |
| **Secondary visitor** | Corporate event planner, party host planning a milestone event |
| **Intent** | "I want beautiful table lighting for my event. How many do I need? What will it cost?" |
| **Entry points** | Google search ("wedding table lamps"), Google Ads, footer link, Pinterest referral |
| **Success metric** | Enquiry form submission or click-through to Entertainer Pack bundle |

---

## Sections (Top to Bottom)

### Section 1: Hero
**Shopify Section Type**: `image-with-text-overlay`
**Purpose**: Set the emotional tone immediately. Romance, atmosphere, celebration — not product specs.

**Draft Content**:
- **Headline**: "The detail that changes everything."
- **Subheadline**: "Warm, wireless light on every table. No candle mess, no cables, no compromise on the day that matters most."
- **CTA**: "Plan Your Event" → anchors to `#event-enquiry`

**Content Sources**: Static
**Configurable Settings**:
- Hero image, headline, subheadline
- CTA text + anchor URL
- Text alignment, overlay opacity, section height

**Responsive Notes**:
- Desktop: full-width, 60vh, text centred
- Mobile: 50vh, CTA full-width

**Media Requirements**:
- 1920 x 800px — wedding reception table with Lettii lamps as centrepieces, warm candlelit atmosphere, florals, evening setting
- [MERCHANT: Provide wedding reception lifestyle image]

---

### Section 2: "Picture This" Narrative
**Shopify Section Type**: `rich-text`
**Purpose**: Emotional selling. Paint the scene before introducing the product.

**Draft Content**:
> Picture this. Every table at your reception glowing with warm, golden light. No wax dripping onto the linen. No cables snaking under chairs. No worrying about the wind if you're outside.
>
> Your guests sit down and the first thing they notice — before the flowers, before the place settings — is the light. That's the difference a Lettii lamp makes.
>
> Cordless. Rechargeable. Waterproof. And beautiful enough that people will ask where they're from.

**Content Sources**: Static
**Configurable Settings**:
- Body text (rich text)
- Text width, alignment
- Padding

**Responsive Notes**:
- Desktop: narrow column, 680px max-width, generous whitespace
- Mobile: full-width with padding

**Media Requirements**: None

---

### Section 3: Wedding Lifestyle Gallery
**Shopify Section Type**: `image-gallery` or `multicolumn`
**Purpose**: Aspiration. Show the product in wedding and event contexts.

**Draft Content**:
- **Section Heading**: "For every setting, every celebration"
- 4–6 images: reception tables, outdoor ceremony, marquee, garden party, barn wedding, intimate dinner

**Content Sources**: Static
**Configurable Settings**:
- Section heading
- Gallery layout (grid / masonry)
- Per image: upload, alt text, optional caption

**Blocks**: Repeatable image block

**Responsive Notes**:
- Desktop: 3-column grid or 2-column masonry
- Mobile: 2-column grid

**Media Requirements**:
- 4–6 images, 900 x 600px minimum each
- Styles: formal reception, outdoor ceremony, marquee/barn, intimate dinner, garden party
- [MERCHANT: Provide wedding/event lifestyle images]

---

### Section 4: Event Packages — How Many Do I Need?
**Shopify Section Type**: `multicolumn` or `custom-table`
**Purpose**: Solve the practical question: "How many lamps for my event?"

**Draft Content**:
- **Section Heading**: "How many lamps do you need?"
- **Subheading**: "A rough guide based on table size and layout."

| Setup | Lamps per Table | 10 Tables | 15 Tables | 20 Tables |
|-------|----------------|-----------|-----------|-----------|
| Round tables (8–10 guests) | 2–3 lamps | 20–30 | 30–45 | 40–60 |
| Long tables (banquet style) | 3–5 lamps per 6ft section | 30–50 | 45–75 | 60–100 |
| Cocktail / standing tables | 1 lamp each | 10 | 15 | 20 |
| Accent lighting (mantelpieces, windowsills, bars) | Varies | 5–10 extra | 5–10 extra | 5–10 extra |

- **Footnote**: "Not sure? Tell us your setup in the enquiry form and we'll recommend the right quantity."
- **CTA**: "Get a Quote" → `#event-enquiry`

**Content Sources**: Static
**Configurable Settings**:
- Section heading, subheading
- Table content (editable rows)
- Footnote, CTA text + URL

**Blocks**: Repeatable row block (setup, lamps, 10/15/20 table columns)

**Responsive Notes**:
- Desktop: centred table, clean horizontal layout
- Mobile: horizontal scroll or card-per-setup-type layout

**Media Requirements**: None

---

### Section 5: Benefits for Events
**Shopify Section Type**: `multicolumn` (3 columns with icons)
**Purpose**: Practical benefits specific to event contexts.

**Draft Content**:
- **Section Heading**: "Why event planners love Lettii"

- **Column 1 — "No fire risk"**
  - Icon: flame-off
  - "Venues with candle restrictions? Sorted. Marquees, barns, historic buildings — no open flame, no issues."

- **Column 2 — "Weather-ready"**
  - Icon: water droplet
  - "IP54 rated. If your ceremony moves outdoors, your lamps work anywhere the tables go."

- **Column 3 — "One charge, one event"**
  - Icon: battery
  - "12 hours per charge. Set them up in the morning, they'll still be glowing when the last guest leaves."

**Content Sources**: Static
**Configurable Settings**: Standard multicolumn with icons
**Blocks**: Repeatable column block (icon + heading + text)

**Responsive Notes**:
- Desktop: 3 columns
- Mobile: single column stack

**Media Requirements**: 3 icons (SVG, 64px)

---

### Section 6: Entertainer Pack Bundle Link
**Shopify Section Type**: `image-with-text`
**Purpose**: Bridge to consumer purchase for smaller events. Not everyone needs 50 lamps — some need 4.

**Draft Content**:
- **Image**: Entertainer Pack product/lifestyle photo
- **Heading**: "Hosting a smaller event?"
- **Body**: "Our Entertainer Pack includes 4 lamps at a bundled price — perfect for an intimate dinner party, a birthday celebration, or a small garden gathering."
- **CTA**: "Shop the Entertainer Pack" → `/products/entertainer-pack`

**Content Sources**: Static (link to dynamic product page)
**Configurable Settings**:
- Image, heading, body text
- CTA text + URL
- Image position (left/right)

**Responsive Notes**:
- Desktop: two-column, image left
- Mobile: image stacked above text

**Media Requirements**:
- 900 x 600px lifestyle image of the Entertainer Pack (4 lamps styled on a table)
- [MERCHANT: Provide Entertainer Pack lifestyle image or styled product shot]

---

### Section 7: Inspiration / Testimonials
**Shopify Section Type**: `image-with-text` (alternating) or `rich-text`
**Purpose**: Aspirational content. At launch this is editorial narrative; later it becomes real testimonials.

**Draft Content** (launch version — editorial):

**Block 1:**
- **Image**: Long table with lamps and floral centrepieces
- **Quote-style text**: "We used 24 Lettii lamps at our barn wedding in the Cotswolds. The moment they were turned on for the evening reception, the whole room changed."
- **Attribution**: *— Editorial styling note* (replace with real testimonial when available)

**Block 2:**
- **Image**: Garden ceremony with lamps lining an aisle
- **Quote-style text**: "Our wedding planner suggested them because the venue didn't allow candles. They were even more beautiful than we expected."
- **Attribution**: *— Editorial styling note* (replace with real testimonial when available)

**Content Sources**: Static initially; replace with real testimonials as they come in
**Configurable Settings**:
- Per block: image, quote text, attribution
- Layout (alternating image left/right)

**Blocks**: Repeatable testimonial/story block

**Responsive Notes**:
- Desktop: alternating two-column layout
- Mobile: stacked

**Media Requirements**:
- 2 lifestyle images, 900 x 600px, wedding/event settings
- [MERCHANT: Provide or replace with real customer photos and quotes when available]

---

### Section 8: Event Enquiry Form
**Shopify Section Type**: `custom-form`
**Purpose**: Lead capture for event orders.
**HTML Anchor**: `#event-enquiry`

**Draft Content**:
- **Heading**: "Let's plan your event lighting"
- **Subheading**: "Tell us about your event and we'll come back with a recommendation and quote within 24 hours."

- **Form Fields**:
  1. **Your name** — text, required
  2. **Email address** — email, required
  3. **Phone number** — tel, optional
  4. **Event type** — dropdown, required
     - Options: "Wedding" | "Corporate event" | "Birthday / private party" | "Festival / outdoor event" | "Other"
  5. **Event date** — date picker, optional (helper text: "Even an approximate date helps us plan")
  6. **Estimated number of lamps** — dropdown, required
     - Options: "Not sure yet" | "1–9" | "10–24" | "25–49" | "50–99" | "100+"
  7. **Message** — textarea, optional
     - Placeholder: "Tell us about your venue, table setup, theme, or any questions."
- **Submit**: "Send Enquiry"
- **Confirmation**: "Thanks — we'll be in touch within 24 hours with a recommendation."

**Content Sources**: Dynamic (form submissions)
**Configurable Settings**:
- All text fields
- Event type options, quantity options
- Form width

**Responsive Notes**:
- Desktop: centred, 600px max-width
- Mobile: full-width fields, full-width submit

**Media Requirements**: None

---

### Section 9: FAQ — Events
**Shopify Section Type**: `collapsible-content` (accordion)
**Purpose**: Address event-specific questions.

**Draft Content**:
- **Section Heading**: "Common event questions"

**Q: Can I rent lamps instead of buying?**
A: We don't currently offer rental. For one-off events, many customers buy and then resell or gift the lamps after — they're a genuinely useful item to keep.

**Q: How far in advance should I order?**
A: We recommend 3–4 weeks before your event for standard orders. If you need 50+ lamps, 6 weeks gives us plenty of time. Rush orders may be possible — mention your date in the enquiry.

**Q: Can I test one before ordering for my full event?**
A: Yes. Order a single lamp from our shop at retail price to test. If you then place a bulk order, we'll credit the cost.

**Q: Do you offer event styling advice?**
A: We can recommend quantities and suggest which designs suit your venue and theme. Tell us about your event in the enquiry form and we'll include suggestions.

**Q: What if I order too many?**
A: Our 30-day money-back guarantee applies. Return any unused lamps in their original packaging for a full refund.

**Q: Do the lamps come pre-charged?**
A: They arrive with a partial charge — enough to test. For your event, we recommend a full charge the day before (4–5 hours from flat to full).

**Content Sources**: Static
**Configurable Settings**: Standard accordion
**Blocks**: Repeatable Q&A block

**Responsive Notes**: Standard accordion layout

**Media Requirements**: None

---

## Shared Components

| Component | Present? | Notes |
|-----------|----------|-------|
| **Header** | Yes | Standard consumer header |
| **Announcement bar** | Yes | Standard trust rotation |
| **Footer** | Yes | Standard 4-column footer |
| **Newsletter popup** | Disabled | Event planners should not get consumer marketing popups |

---

## SEO

| Element | Value |
|---------|-------|
| **Title tag** | Cordless Table Lamps for Weddings & Events — Lettii |
| **Meta description** | Cordless rechargeable table lamps for weddings, receptions, and events. Warm, wireless, waterproof. Event packages and bulk pricing available. Get in touch. |
| **H1** | "The detail that changes everything." |
| **Schema** | `Product` schema with `AggregateOffer`. Optionally `Event`-related markup. |
| **Internal links** | Entertainer Pack product page, collections, FAQ, contact |
| **Target queries** | "cordless table lamps wedding," "wedding table lighting," "rechargeable lamps events," "wireless table lamps reception," "cordless lamps centrepiece" |

---

## Accessibility

- Table in Section 4 must use semantic `<table>` with `<th>` headers
- Date picker must be keyboard-accessible and support manual text entry as fallback
- All form fields need visible labels
- Gallery images need descriptive alt text
- Accordion meets WCAG standards (keyboard nav, aria-expanded)
- Enquiry form anchor scroll should focus first form field

---

## Decisions & Assumptions

1. **Separate from hospitality**: Different emotional driver (romance, a once-in-a-lifetime event) vs. hospitality (operational efficiency, repeat use). Tone is warmer and more aspirational.
2. **"Picture this" narrative approach**: Sells the feeling before the product. Event buyers are emotionally invested — lead with aspiration, not specs.
3. **Quantity guide is advisory**: Table sizes and layouts vary. The guide gives a starting point; the enquiry form handles specifics.
4. **Entertainer Pack bridge**: Not every visitor to this page needs 50 lamps. The Entertainer Pack (4 lamps) serves smaller occasions and captures consumer purchases.
5. **Editorial testimonials at launch**: Styled as quotes but clearly editorial. Replace with real customer stories as they come in. Do not fabricate reviews.
6. **Event date in form**: Helps merchant assess urgency and plan fulfilment. Optional because some visitors are in early planning.
7. **No rental model**: Brand brief doesn't support rental. Address it in FAQ to set expectations.
8. **Newsletter popup disabled**: Same reasoning as hospitality page.

---

## Complexity

| Dimension | Rating | Notes |
|-----------|--------|-------|
| **Section count** | 9 | Similar to hospitality page |
| **Custom sections needed** | 2 | Event enquiry form (with date picker), event quantity table |
| **Dynamic content** | Form submissions | Routing to merchant email/CRM |
| **Media assets needed** | 7–9 wedding/event lifestyle images + 3 icons + 1 product image | [MERCHANT: Must provide] |
| **Implementation estimate** | Medium | Custom form (date picker) and quantity guide table |
