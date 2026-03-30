# Password Page Spec

## Page Metadata
- **Template**: `templates/password.json`
- **Layout**: `password` (dedicated password layout -- no standard header/footer)
- **URL**: Every page on the store when password protection is enabled (pre-launch)
- **Page Title**: "Coming Soon | Lettii -- Premium Cordless Table Lamps"
- **Purpose**: Pre-launch landing page that introduces the brand, builds anticipation, and captures email subscribers
- **Priority**: High (this is the brand's first impression for all pre-launch visitors)

## Target Audience
- Early visitors arriving from pre-launch social media (Instagram, Pinterest)
- Friends, family, and early community who've heard about Lettii
- Potential press or influencer contacts checking out the brand
- Anyone who discovers the domain before launch
- Style-conscious women 28-45 who respond to warm, design-led aesthetics

## Why This Page Matters
This is the only page anyone sees before launch. Every pre-launch Instagram post, every mention, every curious Google search lands here. It must communicate what Lettii is, why it matters, and give visitors a reason to leave their email. The email list built here becomes the launch-day revenue engine.

---

## Sections

### Section 1: Password Hero
**Shopify Section Type**: `password` (Horizon built-in)
**Purpose**: Full brand introduction with logo, messaging, lifestyle imagery, and email capture -- all in a single full-screen section

**Draft Content**:

**Logo block**:
Lettii logo, prominently displayed. Uses the theme logo configured in theme settings. If no logo image is uploaded, falls back to the store name rendered in the heading font.

**Heading (h1)**:
> Something warm is coming.

**Subheading / body text (paragraph)**:
> Lettii is a new collection of cordless rechargeable table lamps -- designed to bring restaurant-quality lighting to your dinner table, bedside, and garden. No wires. No wax. Just warm, beautiful light wherever you want it.

**Email signup incentive text (paragraph)**:
> Be first in. Get 10% off when we launch.

**Email signup form**:
- Input field placeholder: "Your email"
- Button label: "Sign up"
- Powered by Shopify's built-in password page email collection (subscribers go to Shopify customer list)

**Social proof / trust line (optional paragraph)**:
> Launching Spring 2026. Follow us on Instagram and Pinterest.

**Content Sources**:
- Logo: Dynamic, pulled from theme settings (Settings > Logo)
- Heading: Static text, configured in theme editor via text block
- Body copy: Static text, configured in theme editor via text block
- Email incentive text: Static text, configured in theme editor via text block
- Email signup: Shopify built-in `email-signup` block (subscribers stored in Shopify)
- Social links: Configured in theme social media settings (Settings > Social media)
- `shop.password_message`: Can also be set in Shopify admin (Online Store > Preferences) -- this renders below the blocks as additional content

**Configurable Settings**:
| Setting | Type | Default | Notes |
|---------|------|---------|-------|
| Content direction | Select | `column` | Vertical or horizontal layout |
| Vertical on mobile | Checkbox | `true` | Stacks content vertically on mobile when horizontal is selected |
| Horizontal alignment | Select | `center` | Left / Center / Right |
| Vertical alignment | Select | `center` | Top / Center / Bottom |
| Gap | Range (0-100px) | `12` | Spacing between blocks |
| Section width | Select | `page-width` | Page width or full width |
| Color scheme | Color scheme picker | `scheme-1` | Theme color scheme |
| Background media | Select | `image` | None / Image / Video |
| Background image | Image picker | *(see Media Requirements)* | Lifestyle dinner table scene |
| Background image position | Select | `cover` | Cover or Fit |
| Border | Select | `none` | None / Solid |
| Padding top | Range (0-100px) | `100` | |
| Padding bottom | Range (0-100px) | `100` | |

**Block-level settings**:

| Block | Key Settings | Notes |
|-------|-------------|-------|
| Logo | Inverse: false, Height: 24px (pixel mode) | Increase to 32-40px for more prominence on password page |
| Heading text | Preset: h3, Alignment: center | Uses primary heading font |
| Body text | Preset: rte, Alignment: center, Bottom padding: 32px | Standard body text styling |
| Incentive text | Preset: rte, Alignment: center | Slightly smaller or same as body |
| Email signup | Width: custom (50%), Border radius: 14px, Button style: button | Form width constrains nicely on desktop |

**Responsive Notes**:
- **Desktop**: Centered column layout over background lifestyle image. Content sits in the middle of the viewport with generous padding. Email form at 50% width keeps it from stretching too wide. Background image covers full section with content overlaid.
- **Mobile**: Content stacks vertically, fills available width. Email form expands to full width. Background image scales via `cover` -- ensure the key visual interest (lamps on table) is centered so it isn't cropped on narrow viewports. Logo and text remain legible over the image (may need a dark overlay or solid-background content area depending on image brightness).

**Media Requirements**:
- **Background image**: Lifestyle dinner table scene with Lettii lamps casting warm glow
  - Dimensions: 1920x1080px minimum (landscape, full-viewport background)
  - Format: JPG or WebP, optimized for web (aim for < 300KB)
  - Subject: Dinner table set for an evening gathering, 2-4 Lettii lamps glowing warmly, soft ambient lighting, elevated but approachable styling
  - Colour palette: Warm tones (amber glow, soft whites, natural wood or linen textures)
  - Composition: Subject centered or slightly left-of-center, so text overlay on center/right remains legible
  - Important: Content area must remain readable over the image. Options: (a) choose an image with a naturally dark/muted area where text sits, (b) use the color scheme with semi-transparent background, or (c) add a subtle dark overlay via CSS custom code
- **Logo**: SVG or PNG with transparency, configured in theme settings
  - Recommend: White/light version if using a dark or image background
  - The `inverse` logo setting in the logo block can toggle between standard and inverse logo variants

---

### Section 2: Password Footer
**Shopify Section Type**: `password-footer` (Horizon built-in)
**Purpose**: Shopify-required footer with password entry link and store admin link

**Draft Content**:
This section is largely functional and Shopify-controlled:
- "Powered by Shopify" attribution with Shopify logo
- "Enter using password" button (opens the password dialog for staff/preview access)
- "Are you the store owner? Log in here" admin link

These elements are Shopify translation strings and cannot be easily customised via the theme editor. They are functional necessities for the password page.

**Content Sources**:
- All text: Shopify translation strings (`content.powered_by`, `actions.enter_using_password`, `content.store_owner_link_html`)
- Password dialog: Shopify built-in (separate from this section)

**Configurable Settings**:
| Setting | Type | Default | Notes |
|---------|------|---------|-------|
| Color scheme | Color scheme picker | `scheme-1` | Should match or complement the main password section |

**Responsive Notes**:
- **Desktop**: Centered footer with links in a horizontal row, separated by generous spacing
- **Mobile**: Links stack vertically, centered, with smaller gaps

**Media Requirements**: None.

---

## Shared Components

### No Standard Header
The password page uses the `password` layout, which does **not** include the standard site header. This is intentional:
- The store is not live yet -- there is nothing to navigate to
- The logo is handled by the logo block within the password section itself
- No cart, no search, no navigation links

### No Standard Footer
The password page uses a dedicated `password-footer` section instead of the standard site footer. This is a Shopify requirement for password pages. The standard footer (with its newsletter signup, navigation columns, and payment icons) is not available on this layout.

### Social Links
Social media links are not a native block type in the Horizon password section. Options for including them:
1. **Add as text block**: Include Instagram and Pinterest URLs as styled text links within a text block (e.g., "Follow us: Instagram | Pinterest" with manual hyperlinks)
2. **Use shop.password_message**: Set the password message in Shopify admin (Online Store > Preferences > Password page message) to include social links as HTML
3. **Custom block or app**: Add a social links block via theme code customisation (requires developer)

**Recommended approach**: Option 1 -- add a text block after the email signup with linked text. This requires no custom code and stays within the Horizon theme's native capabilities.

**Draft social links text block**:
> Follow along: [Instagram](https://instagram.com/lettii) | [Pinterest](https://pinterest.com/lettii)

---

## Content Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Headline tone | Anticipatory, not apologetic | "Something warm is coming" is intriguing and on-brand (warmth = light = Lettii). Avoids generic "Coming soon" or "Under construction." |
| Brand description length | 2 sentences | Enough to explain what Lettii is and why someone should care. Not so long that it competes with the email signup for attention. |
| Email incentive | "Be first in. Get 10% off when we launch." | Matches the site-wide newsletter incentive (10% off first order). "Be first in" creates exclusivity. Short, direct, Lettii voice. |
| Background image vs. solid colour | Background lifestyle image | The password page is a brand's first impression. A warm dinner table scene immediately communicates what Lettii is about -- atmosphere, entertaining, beautiful light. A solid colour page would waste this opportunity. |
| Layout | Single centered column | Clean, focused, no distractions. One clear action: enter your email. The Horizon password section supports this natively. |
| Social links method | Text block with hyperlinks | Native Horizon approach, no custom code. Keeps implementation simple. Instagram and Pinterest are the primary discovery channels for the target customer. |
| No countdown timer | Intentional | Countdown timers create pressure that conflicts with Lettii's warm, confident voice. "Launching Spring 2026" is specific enough without being anxious. |
| Password footer | Keep default | The "Enter using password" link is needed for staff/preview access. "Powered by Shopify" is a Shopify requirement on password pages. |

---

## SEO

- **Page title**: "Coming Soon | Lettii -- Premium Cordless Table Lamps"
- **Meta description**: "Lettii is coming soon. Premium cordless rechargeable table lamps for your dinner table, bedside, and garden. Sign up for 10% off our launch."
- **Note**: Shopify's password page sends a `200` status code (not a `503`), which means search engines may index it. The meta description should be intentional and brand-appropriate.
- **Set via**: Shopify admin > Online Store > Preferences (password page doesn't have its own SEO fields -- title/description come from the store's main SEO settings while password-protected)
- **Structured data**: None needed for a password page
- **Social sharing**: Configure Open Graph image in Shopify admin (Online Store > Preferences > Social sharing image) using the same lifestyle dinner table image or a branded launch graphic

---

## Accessibility

- **Heading hierarchy**: Single `h1` ("Something warm is coming") -- the only heading on the page
- **Logo**: If using an image logo, ensure the `alt` text is set to "Lettii" in theme settings
- **Email form**: Shopify's built-in email signup block generates a proper `<form>` with `<label>` and `<input>` elements. Ensure the input has a visible label or `aria-label` (Horizon handles this)
- **Background image**: Decorative (not informational), so empty `alt` text is appropriate. Ensure text contrast over the image meets WCAG 2.1 AA (4.5:1). If the image is too bright, use a dark color scheme or overlay
- **Focus management**: Tab order should flow: logo (if linked) > heading > body text > email input > submit button > social links > password footer links
- **Colour contrast**: Test the chosen color scheme against the background image. White text on a warm, darker lifestyle image typically works well. Verify with a contrast checker.
- **Screen reader**: The page structure (logo, heading, description, form, footer) reads logically. The "Enter using password" button in the footer is clearly labelled via Shopify translations
- **Keyboard navigation**: All interactive elements (email input, submit button, links) are keyboard-accessible via Horizon defaults

---

## Implementation Complexity

**Complexity**: Low-Medium

The page uses native Horizon sections with no custom code required. The slight complexity comes from:
1. Selecting and configuring the right background image
2. Ensuring text readability over the background image (may require colour scheme adjustment)
3. Adding social links as a text block with manual HTML links

**Implementation steps**:

1. **Upload background image** to Shopify (Content > Files)
2. **Configure password section** in theme editor:
   - Set background media to "image" and select the uploaded lifestyle image
   - Set background image position to "cover"
   - Adjust colour scheme for text legibility over image (light text on dark/image background)
3. **Edit blocks** in order:
   - Logo block: Set height to 32-40px for prominence, toggle inverse if using light logo on dark image
   - Text block (heading): Enter "Something warm is coming." as h1
   - Text block (body): Enter brand description paragraph
   - Text block (incentive): Enter "Be first in. Get 10% off when we launch."
   - Email signup block: Set width to custom 50%, label to "Sign up"
   - Text block (social): Enter "Follow along: Instagram | Pinterest" with links
4. **Configure password footer**: Match colour scheme to main section
5. **Set password message** in Shopify admin (Online Store > Preferences) if using additional messaging
6. **Configure SEO**: Set store title, meta description, and social sharing image in Shopify admin
7. **Upload logo**: Ensure both standard and inverse logo versions are in theme settings

**Estimated setup time**: 30-45 minutes in theme editor + image preparation

**Template JSON structure** (for reference):
```
layout: password
sections:
  main (type: password)
    blocks:
      logo (type: logo)
      text (type: text) -- heading
      text-2 (type: text) -- body description
      text-3 (type: text) -- email incentive
      email-signup (type: email-signup)
      text-4 (type: text) -- social links
  password-footer (type: password-footer)
order: [main, password-footer]
```

---

## Copy Alternatives

If the merchant wants to test different pre-launch messaging:

| Option | Heading | Body |
|--------|---------|------|
| A (default) | Something warm is coming. | Lettii is a new collection of cordless rechargeable table lamps -- designed to bring restaurant-quality lighting to your dinner table, bedside, and garden. No wires. No wax. Just warm, beautiful light wherever you want it. |
| B | The light you've been looking for. | We're building a collection of cordless table lamps for people who care how their space feels. Rechargeable. Dimmable. Designed to go anywhere. Lettii launches soon. |
| C | No wires. No wax. Nearly here. | Lettii is a new kind of table lamp -- cordless, rechargeable, and designed for real life. From dinner parties to bedside tables to garden evenings. We open soon. |

| Option | Incentive line |
|--------|---------------|
| A (default) | Be first in. Get 10% off when we launch. |
| B | Join the list. 10% off your first order when we go live. |
| C | Leave your email. We'll let you know the moment we're open -- and save you 10%. |

---

## Pre-Launch Checklist

Before enabling password protection with this page:

- [ ] Background lifestyle image uploaded and tested on both desktop and mobile
- [ ] Text is legible over background image (contrast checked)
- [ ] Logo uploaded in theme settings (both standard and inverse versions if needed)
- [ ] Email signup tested -- confirm submissions appear in Shopify customer list
- [ ] Social media profile URLs are correct (Instagram, Pinterest)
- [ ] Store title and meta description set in Shopify admin for SEO
- [ ] Social sharing image configured in Shopify admin (Open Graph)
- [ ] Password page previewed on mobile device (not just responsive browser view)
- [ ] "Enter using password" link tested with the store password
