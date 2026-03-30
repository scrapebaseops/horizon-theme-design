# Page Spec: Contact

## Page Metadata

| Field | Value |
|-------|-------|
| **Page Title** | Contact Us — Lettii |
| **URL Handle** | `/pages/contact` |
| **Template** | `page.contact` |
| **Meta Title** | Contact Us — Lettii |
| **Meta Description** | Get in touch with Lettii. Email, live chat, or Instagram — we reply within 12 hours. UK-based support for all orders, returns, and product questions. |
| **Nav Placement** | Footer "Help" column, mobile hamburger menu |

---

## Target Audience & Intent

| Dimension | Detail |
|-----------|--------|
| **Primary visitor** | Existing or prospective customer with a pre-purchase question or post-purchase issue |
| **Secondary visitor** | B2B prospect seeking initial contact (before finding the dedicated hospitality/weddings pages) |
| **Intent** | Get help or reassurance. "Can I reach a real person?" |
| **Entry points** | Footer link, FAQ page links, product page links, email signatures |
| **Success metric** | Form submission or redirect to FAQ (self-service resolution). Secondary: trust reinforcement — visitor sees they can reach the brand. |

---

## Sections (Top to Bottom)

### Section 1: Page Header
**Shopify Section Type**: `rich-text`
**Purpose**: Set expectations. Warm, direct, no corporate stiffness.

**Draft Content**:
- **Heading (H1)**: "We're here. And we're quick."
- **Body**: "Whether it's a question about your order, help choosing the right lamp, or something else entirely — we'd love to hear from you."

**Content Sources**: Static
**Configurable Settings**:
- Heading text
- Body text
- Text alignment
- Max width

**Responsive Notes**:
- Desktop: centred, narrow column (680px)
- Mobile: left-aligned, full width with padding

**Media Requirements**: None

---

### Section 2: Contact Channels
**Shopify Section Type**: `multicolumn` (3 columns with icons)
**Purpose**: Show all contact options at a glance with response time commitments.

**Draft Content**:

- **Column 1 — Icon: Email**
  - **Heading**: "Email"
  - **Text**: "hello@lettii.co.uk"
  - **Detail**: "We reply within 12 hours, usually faster."

- **Column 2 — Icon: Chat bubble**
  - **Heading**: "Live Chat"
  - **Text**: "Monday – Friday, 9am – 6pm"
  - **Detail**: "Look for the chat icon in the bottom corner."

- **Column 3 — Icon: Instagram**
  - **Heading**: "Instagram DMs"
  - **Text**: "@lettii.uk"
  - **Detail**: "Monitored daily. Quick questions welcome."

**Content Sources**: Static
**Configurable Settings**:
- Per column: icon/image, heading, text line 1, text line 2
- Number of columns
- Background colour

**Blocks**: Repeatable column block (icon + heading + 2 text lines)

**Responsive Notes**:
- Desktop: 3 columns in a row, equal width
- Mobile: single column stack, each channel as a card

**Media Requirements**:
- 3 icons (email, chat, Instagram) — line style, brand-consistent
- [MERCHANT: Confirm email address — hello@lettii.co.uk assumed]
- [MERCHANT: Confirm Instagram handle — @lettii.uk assumed]

---

### Section 3: Contact Form
**Shopify Section Type**: `contact-form` (custom)
**Purpose**: Primary contact mechanism. Structured form to route enquiries efficiently.

**Draft Content**:
- **Section Heading**: "Send us a message"
- **Form Fields**:
  1. **Name** — text input, required
  2. **Email** — email input, required
  3. **Subject** — dropdown, required
     - Options: "Product question" | "Order & shipping" | "Returns & refunds" | "Wholesale & B2B enquiry" | "Something else"
  4. **Order number** — text input, optional (helper text: "If this is about an existing order")
  5. **Message** — textarea, required
- **Submit button**: "Send Message"
- **Confirmation text**: "Thanks — we'll get back to you within 12 hours."
- **Below form**: "For quick answers, check our [FAQ](/pages/faq) — it covers most questions about shipping, returns, battery life, and more."

**Content Sources**: Dynamic (Shopify contact form or third-party form app)
**Configurable Settings**:
- Section heading
- Subject dropdown options (editable list)
- Confirmation message text
- FAQ link text and URL
- Background colour

**Responsive Notes**:
- Desktop: form centred, 600px max-width, generous field spacing
- Mobile: full-width fields, stacked layout

**Media Requirements**: None

---

### Section 4: FAQ Redirect
**Shopify Section Type**: `rich-text-with-button`
**Purpose**: Deflect common questions to FAQ, reducing support volume.

**Draft Content**:
- **Heading**: "Looking for a quick answer?"
- **Body**: "Our FAQ covers shipping times, return policy, battery life, waterproofing, and everything else people ask most."
- **CTA Button**: "View FAQ" → `/pages/faq`

**Content Sources**: Static
**Configurable Settings**:
- Heading, body text
- Button text, button URL
- Background colour (subtle contrast from form section)

**Responsive Notes**:
- Desktop: centred text block
- Mobile: full-width button

**Media Requirements**: None

---

### Section 5: UK Address & Trust
**Shopify Section Type**: `rich-text`
**Purpose**: Physical address as a trust signal for UK shoppers.

**Draft Content**:
- **Heading**: "Based in the UK"
- **Body**:
  > Lettii Ltd
  > [MERCHANT: Provide registered business address]
  > United Kingdom
  >
  > Company registration: [MERCHANT: Provide company number]

**Content Sources**: Static
**Configurable Settings**:
- Heading, body text (rich text)
- Text alignment

**Responsive Notes**:
- Desktop: centred or left-aligned, small text
- Mobile: left-aligned

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
| **Title tag** | Contact Us — Lettii |
| **Meta description** | Get in touch with Lettii. Email, live chat, or Instagram — we reply within 12 hours. UK-based support for all orders, returns, and product questions. |
| **H1** | "We're here. And we're quick." |
| **Schema** | `ContactPage` schema. Also `Organization` with `contactPoint` for email and chat hours. |
| **Internal links** | FAQ page, Instagram profile |
| **Target queries** | "Lettii contact," "Lettii customer service," "Lettii email" |

---

## Accessibility

- All form fields must have visible labels (not placeholder-only)
- Subject dropdown must be keyboard-navigable
- Error states: inline validation messages, not modal alerts
- Focus order: name → email → subject → order number → message → submit
- Success confirmation must be announced to screen readers (aria-live region)
- Icons must have alt text or aria-labels
- Contact info (email, hours) must be real text, not images

---

## Decisions & Assumptions

1. **No phone number**: Brand brief does not mention phone support. Email, chat, and Instagram DMs cover all channels. Phone can be added later.
2. **Subject dropdown**: Routes enquiries and sets expectations. "Wholesale & B2B enquiry" option catches B2B visitors who find contact before the hospitality page.
3. **Order number field**: Optional, but reduces back-and-forth for order-related queries.
4. **Response time commitment is specific**: "Within 12 hours" is stated in three places (channel cards, form confirmation, meta description). Specificity builds trust.
5. **FAQ redirect is deliberate**: Positioned after the form (not before) so visitors see they CAN contact a human, then are offered self-service. Placing it before the form feels deflective.
6. **UK address included**: Even if a home office or registered agent address, having a UK address is a meaningful trust signal for UK shoppers buying from an unknown brand.

---

## Complexity

| Dimension | Rating | Notes |
|-----------|--------|-------|
| **Section count** | 5 | Simple page |
| **Custom sections needed** | 1 | Contact form with subject dropdown (may need app or custom Liquid) |
| **Dynamic content** | Contact form submission | Standard Shopify contact form or third-party |
| **Media assets needed** | 3 icons | Channel icons (email, chat, Instagram) |
| **Implementation estimate** | Low | Standard sections + contact form |
