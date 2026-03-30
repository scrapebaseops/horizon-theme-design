# Component Inventory Template

<!-- INSTRUCTIONS: Use this template to catalog every reusable component in your design system.
For each component, document its variants, states, implementation details, and status.
Organize components into logical categories. Duplicate the component template for each new component.
This inventory drives development prioritization and ensures consistency. -->

---

## Inventory Overview

**Theme Name**: [PLACEHOLDER: e.g., "Horizon Theme v1.0"]

**Design System**: [PLACEHOLDER: Link to Figma or design documentation]

**Inventory Date**: [DATE]

**Last Updated**: [DATE]

**Maintained By**: [NAME]

**Total Components**: [COUNT]

**Completed Components**: [COUNT]

**Completion Rate**: [0% / 25% / 50% / 75% / 100%]

---

## Component Categories

- [Colors & Tokens](#colors--tokens)
- [Typography](#typography)
- [Buttons](#buttons)
- [Form Elements](#form-elements)
- [Cards](#cards)
- [Navigation](#navigation)
- [Content Sections](#content-sections)
- [Layout Patterns](#layout-patterns)
- [Interactive Components](#interactive-components)
- [Utility Components](#utility-components)

---

# Colors & Tokens

## Component: Color Palette

**Category**: Colors & Tokens | **Primitive**

**Description**:
[PLACEHOLDER: e.g., "Complete color palette used throughout the design system. Includes brand colors, semantic colors (success, warning, error), and neutral grays."]

**Visual Reference**:
- Figma: [PLACEHOLDER: Link to color page in Figma]
- Screenshot: [PLACEHOLDER: Path to screenshot of color palette]

**Variants**:
- [PLACEHOLDER: e.g., "Primary colors (brand blue, gold, gray)"]
- [PLACEHOLDER: e.g., "Semantic colors (success green, error red, warning orange)"]
- [PLACEHOLDER: e.g., "Neutral grays (100-500)"]

**States**: N/A (colors have no states)

**Props/Settings**:
- [PLACEHOLDER: e.g., "Primary color (Shopify color picker)"]
- [PLACEHOLDER: e.g., "Secondary color (Shopify color picker)"]
- [PLACEHOLDER: e.g., "Text color (Shopify color picker)"]

**Responsive Behavior**: N/A

**Horizon Implementation**:
- **Tokens File**: [PLACEHOLDER: e.g., "config/settings_schema.json"]
- **CSS File**: [PLACEHOLDER: e.g., "assets/tokens.css"]
- **Liquid File**: N/A

**CSS Location**: `tokens` layer (design tokens)

**Dependencies**: None (foundational)

**Status**: [ ] not-started  [ ] in-progress  [ ] visual-match  [x] complete

**Notes**: [PLACEHOLDER: Colors finalized and approved by design team. All hex values extracted.]

---

# Typography

## Component: Body Text

**Category**: Typography | **Primitive**

**Description**:
[PLACEHOLDER: e.g., "Default paragraph text used throughout the site. Includes primary, secondary, and tertiary text colors for hierarchy."]

**Visual Reference**:
- Figma: [PLACEHOLDER: Link to typography page]
- Screenshot: [PLACEHOLDER: Path]
- Example Page: [PLACEHOLDER: Link to page using this component]

**Variants**:
- Primary Text (dark gray, high contrast)
- Secondary Text (medium gray, 10:1 contrast)
- Tertiary Text (light gray, de-emphasized)
- Inverted (white text on dark backgrounds)

**States**:
- Default: [PLACEHOLDER: e.g., "Standard paragraph styling"]
- Disabled: [PLACEHOLDER: e.g., "Reduced opacity (50%)"]
- Selected/Highlighted: [PLACEHOLDER: e.g., "Background highlight color"]

**Props/Settings**:
- [ ] Font family (inherits from body font setting)
- [ ] Font size (inherits from base font size setting)
- [ ] Line height (1.5)
- [ ] Color (primary text color)
- [ ] Letter spacing (normal)

**Responsive Behavior**:
- **Desktop**: [PLACEHOLDER: e.g., "16px, line-height 1.5"]
- **Tablet**: [PLACEHOLDER: e.g., "16px, line-height 1.5 (same as desktop)"]
- **Mobile**: [PLACEHOLDER: e.g., "14px, line-height 1.6 (slightly larger to maintain readability)"]

**Horizon Implementation**:
- **HTML**: [PLACEHOLDER: e.g., "<p class=\"body-text body-text--primary\">"]
- **CSS File**: [PLACEHOLDER: e.g., "assets/typography.css"]]
- **CSS Classes**: `.body-text`, `.body-text--primary`, `.body-text--secondary`, `.body-text--tertiary`

**CSS Location**: `base` layer (foundational typography)

**Dependencies**:
- Color tokens (primary, secondary, tertiary text colors)
- Font tokens (body font family, base font size)

**Status**: [ ] not-started  [x] in-progress  [ ] visual-match  [ ] complete

**Notes**: [PLACEHOLDER: Pending color tone adjustment; contrast ratios verified.]

---

## Component: Headings

**Category**: Typography | **Primitive**

**Description**:
[PLACEHOLDER: e.g., "Heading hierarchy (h1-h6) with consistent typography scale. Used for page titles, section headings, and card headers."]

**Visual Reference**:
- Figma: [PLACEHOLDER]
- Screenshot: [PLACEHOLDER]

**Variants**:
- H1 (48px, primary heading)
- H2 (36px, section heading)
- H3 (28px, subsection heading)
- H4 (24px, component heading)
- Small Heading (16px, card header)

**States**:
- Default: [PLACEHOLDER]
- Hover: [PLACEHOLDER: e.g., "Color change on linked headings"]
- Disabled: [PLACEHOLDER: e.g., "Reduced opacity"]]

**Props/Settings**:
- [ ] Font family (heading font)
- [ ] Font weight (600-700)
- [ ] Color (primary text)
- [ ] Line height (1.2)

**Responsive Behavior**:
- **Desktop**: [PLACEHOLDER: e.g., "H1: 48px, H2: 36px, etc."]
- **Tablet**: [PLACEHOLDER: e.g., "H1: 40px, H2: 32px (proportionally smaller)"]
- **Mobile**: [PLACEHOLDER: e.g., "H1: 32px, H2: 24px (significant scale-down for small screens)"]]

**Horizon Implementation**:
- **CSS File**: [PLACEHOLDER: e.g., "assets/typography.css"]]
- **CSS Classes**: `h1`, `h2`, `h3`, `h4`, `.heading`, `.heading--large`, `.heading--small`

**CSS Location**: `base` layer

**Dependencies**:
- Font tokens (heading font family, size scale)
- Color tokens (text color)

**Status**: [ ] not-started  [ ] in-progress  [x] visual-match  [ ] complete

**Notes**: [PLACEHOLDER: Font sizes verified at all breakpoints. Weights finalized.]

---

# Buttons

## Component: Primary Button

**Category**: Buttons | **Block**

**Description**:
[PLACEHOLDER: e.g., "Primary call-to-action button used for the main action on a page (e.g., 'Add to Cart', 'Shop Now'). High contrast, filled style."]

**Visual Reference**:
- Figma: [PLACEHOLDER: Link to button component in Figma]
- Screenshot: [PLACEHOLDER: e.g., "reference-screenshots/button-primary-states.png"]
- Example Pages: [PLACEHOLDER: e.g., "Hero section on home page, Product page (Add to Cart)"]

**Variants**:
- Small (height: 36px)
- Medium (height: 44px) — default
- Large (height: 52px)

**States**:
- **Default**: [PLACEHOLDER: e.g., "Background: primary color (#2E5090), text: white, no shadow"]
- **Hover**: [PLACEHOLDER: e.g., "Background darkens by 10%, cursor pointer, box-shadow added"]
- **Active**: [PLACEHOLDER: e.g., "Background darkens by 15%, slight inset shadow"]]
- **Disabled**: [PLACEHOLDER: e.g., "Background: gray-200, text: gray-400, opacity: 0.6, cursor: not-allowed"]]
- **Focus**: [PLACEHOLDER: e.g., "2px outline in primary color, 3px offset"]]
- **Loading**: [PLACEHOLDER: e.g., "Spinner icon visible, text hidden, click disabled"]]

**Props/Settings**:
- [ ] Button text (required)
- [ ] Size (small / medium / large)
- [ ] Width (full / auto)
- [ ] Icon position (left / right)
- [ ] Disabled state (toggle)
- [ ] Loading state (toggle)
- [ ] Link URL (optional, for anchor tag variant)

**Responsive Behavior**:
- **Desktop**: [PLACEHOLDER: e.g., "44px height, padding 0 24px, full width in modals only"]]
- **Tablet**: [PLACEHOLDER: e.g., "44px height, same as desktop"]]
- **Mobile**: [PLACEHOLDER: e.g., "44px minimum height for thumb-friendly tap target (WCAG)"]]

**Horizon Implementation**:
- **Liquid File**: [PLACEHOLDER: e.g., "snippets/button.liquid"]]
- **CSS File**: [PLACEHOLDER: e.g., "assets/buttons.css"]]
- **CSS Classes**: `.button`, `.button--primary`, `.button--small`, `.button--medium`, `.button--large`, `.button--full-width`
- **Liquid Snippet Usage**: `{% render 'button', label: 'Add to Cart', size: 'medium', url: '#' %}`

**CSS Location**: `primitives` layer (foundational UI element)

**Dependencies**:
- Color tokens (primary color, text color, hover states)
- Typography tokens (font size, weight)
- Spacing tokens (padding, margins)
- Transition tokens (hover animation duration)

**Status**: [ ] not-started  [ ] in-progress  [x] visual-match  [ ] complete

**Notes**: [PLACEHOLDER: All states verified at desktop. Mobile tap target size verified. Accessibility review: focus outline meets WCAG AAA."]

---

## Component: Secondary Button

**Category**: Buttons | **Block**

**Description**:
[PLACEHOLDER: e.g., "Secondary button for less prominent actions (e.g., 'Learn More', 'Cancel'). Outlined style with subtle appearance."]

**Visual Reference**:
- Figma: [PLACEHOLDER]
- Screenshot: [PLACEHOLDER]
- Example Pages: [PLACEHOLDER]

**Variants**:
- Small
- Medium (default)
- Large

**States**:
- **Default**: [PLACEHOLDER: e.g., "Border: 2px primary color, background: transparent, text: primary color"]]
- **Hover**: [PLACEHOLDER: e.g., "Background: light primary (10% opacity), border: primary"]]
- **Active**: [PLACEHOLDER: e.g., "Background: light primary (15% opacity)"]]
- **Disabled**: [PLACEHOLDER: e.g., "Border: gray-200, text: gray-400, opacity: 0.6"]]
- **Focus**: [PLACEHOLDER: e.g., "Outline as primary button"]]

**Props/Settings**:
- [ ] Button text
- [ ] Size
- [ ] Width (full / auto)
- [ ] Disabled state

**Responsive Behavior**:
- **Desktop**: [PLACEHOLDER]
- **Tablet**: [PLACEHOLDER]
- **Mobile**: [PLACEHOLDER]

**Horizon Implementation**:
- **Liquid File**: [PLACEHOLDER: e.g., "snippets/button.liquid (variant param)"]]
- **CSS File**: [PLACEHOLDER: e.g., "assets/buttons.css"]]
- **CSS Classes**: `.button--secondary`

**CSS Location**: `primitives` layer

**Dependencies**:
- Color tokens
- Typography tokens
- Spacing tokens
- Transition tokens

**Status**: [ ] not-started  [ ] in-progress  [ ] visual-match  [x] complete

**Notes**: [PLACEHOLDER: Ready for use across the theme.]

---

# Form Elements

## Component: Text Input

**Category**: Form Elements | **Primitive**

**Description**:
[PLACEHOLDER: e.g., "Single-line text input field. Used for email, name, search queries, and other short text entry."]

**Visual Reference**:
- Figma: [PLACEHOLDER]
- Screenshot: [PLACEHOLDER]

**Variants**:
- Default
- Small
- Large
- Full-width
- Icon left (search icon, etc.)
- Icon right (clear button, etc.)

**States**:
- **Default**: [PLACEHOLDER: e.g., "Border: 1px gray-300, background: white"]]
- **Hover**: [PLACEHOLDER: e.g., "Border: gray-400"]]
- **Focus**: [PLACEHOLDER: e.g., "Border: primary color (2px), outline: none, box-shadow with primary color"]]
- **Filled**: [PLACEHOLDER: e.g., "Shows user is typing"]]
- **Disabled**: [PLACEHOLDER: e.g., "Background: gray-100, border: gray-200, text: gray-400, cursor: not-allowed"]]
- **Error**: [PLACEHOLDER: e.g., "Border: error color (red), error message shown below"]]
- **Success**: [PLACEHOLDER: e.g., "Border: success color (green), optional checkmark icon"]]

**Props/Settings**:
- [ ] Placeholder text
- [ ] Name attribute
- [ ] Type (text, email, password, search, number, tel, url)
- [ ] Size (small / medium / large)
- [ ] Disabled state
- [ ] Error message
- [ ] Success state
- [ ] Icon (optional)
- [ ] Icon position (left / right)

**Responsive Behavior**:
- **Desktop**: [PLACEHOLDER: e.g., "Height: 44px, padding: 12px 16px"]]
- **Tablet**: [PLACEHOLDER: e.g., "Same as desktop"]]
- **Mobile**: [PLACEHOLDER: e.g., "Height: 44px minimum for tap target"]]

**Horizon Implementation**:
- **Liquid File**: [PLACEHOLDER: e.g., "snippets/input-text.liquid"]]
- **CSS File**: [PLACEHOLDER: e.g., "assets/forms.css"]]
- **CSS Classes**: `.input`, `.input--text`, `.input--small`, `.input--large`, `.input--error`, `.input--success`

**CSS Location**: `primitives` layer

**Dependencies**:
- Color tokens (border, focus, error, success colors)
- Typography tokens
- Spacing tokens
- Transition tokens

**Status**: [ ] not-started  [ ] in-progress  [ ] visual-match  [ ] complete

**Notes**: [PLACEHOLDER]

---

# Cards

## Component: Product Card

**Category**: Cards | **Block**

**Description**:
[PLACEHOLDER: e.g., "Displays a single product in grid layouts (collection pages, home page featured products). Includes image, title, price, rating, and 'Add to Cart' button."]

**Visual Reference**:
- Figma: [PLACEHOLDER: Link to product card component]
- Screenshot: [PLACEHOLDER: e.g., "reference-screenshots/product-card-all-states.png"]
- Example Pages: [PLACEHOLDER: e.g., "Home page (Featured Products section), Collection page (Product Grid section)"]

**Variants**:
- Standard (with image, title, price, button)
- Compact (minimal version)
- With Rating (includes star rating and review count)
- With Sale Badge (shows discount percentage)
- Stacked (vertical layout for mobile)
- Grid Layout (2, 3, or 4 columns)

**States**:
- **Default**: [PLACEHOLDER: e.g., "Card with subtle shadow, image at top, content below"]]
- **Hover**: [PLACEHOLDER: e.g., "Shadow increases, image zooms 5%, button becomes visible/prominent"]]
- **Active**: [PLACEHOLDER: e.g., "Selected state if filterable"]]
- **Disabled**: [PLACEHOLDER: e.g., "Out of stock - opacity 60%, 'Sold Out' badge shows"]]

**Props/Settings**:
- [ ] Product image
- [ ] Product title
- [ ] Product price
- [ ] Compare at price (for sale items)
- [ ] Star rating and review count
- [ ] Sale badge (e.g., "-20%")
- [ ] Add to cart functionality
- [ ] Quick view toggle
- [ ] Wishlist icon

**Responsive Behavior**:
- **Desktop**: [PLACEHOLDER: e.g., "4 columns in grid, equal width"]]
- **Tablet**: [PLACEHOLDER: e.g., "3 columns in grid"]]
- **Mobile**: [PLACEHOLDER: e.g., "2 columns in grid, full-width stacked on very small screens"]]

**Horizon Implementation**:
- **Section File**: [PLACEHOLDER: e.g., "sections/product-grid.liquid"]]
- **Block File**: [PLACEHOLDER: e.g., "blocks/product-card.liquid"]]
- **CSS File**: [PLACEHOLDER: e.g., "assets/product-card.css"]]
- **CSS Classes**: `.product-card`, `.product-card--featured`, `.product-card--compact`, `.product-card--with-rating`

**CSS Location**: `section-specific` layer (product-grid specific styles)

**Dependencies**:
- Button component (Add to Cart button)
- Rating component (star display)
- Badge component (sale badge)
- Color tokens
- Typography tokens
- Spacing tokens
- Shadow tokens
- Transition tokens (hover animation)

**Status**: [ ] not-started  [ ] in-progress  [x] visual-match  [ ] complete

**Notes**: [PLACEHOLDER: Hover animation tested and smooth. Mobile grid verified at all phone widths. Image aspect ratio (3:2) consistent.]

---

# Navigation

## Component: Main Navigation Menu

**Category**: Navigation | **Section**

**Description**:
[PLACEHOLDER: e.g., "Primary navigation menu displayed in the header. Links to main store sections. Supports dropdown menus for categories."]

**Visual Reference**:
- Figma: [PLACEHOLDER]
- Screenshot: [PLACEHOLDER]
- Example Pages: [PLACEHOLDER: "All pages (header component)"]

**Variants**:
- Desktop horizontal menu
- Mobile hamburger menu with drawer
- With dropdown menus
- With mega menu (for large category lists)

**States**:
- **Default**: [PLACEHOLDER: e.g., "Menu items visible, no highlights"]]
- **Hover**: [PLACEHOLDER: e.g., "Link color changes, dropdown opens"]]
- **Active**: [PLACEHOLDER: e.g., "Current page link highlighted/underlined"]]
- **Submenu Open**: [PLACEHOLDER: e.g., "Dropdown visible with smooth animation"]]
- **Mobile Active**: [PLACEHOLDER: e.g., "Hamburger menu open, showing full-screen drawer"]]

**Props/Settings**:
- [ ] Menu items (from Shopify menu)
- [ ] Menu title/label
- [ ] Dropdown enabled/disabled
- [ ] Mobile menu behavior (drawer / overlay)
- [ ] Sticky menu on/off

**Responsive Behavior**:
- **Desktop**: [PLACEHOLDER: e.g., "Horizontal menu visible, dropdowns on hover"]]
- **Tablet**: [PLACEHOLDER: e.g., "Hamburger menu replaces horizontal at 768px"]]
- **Mobile**: [PLACEHOLDER: e.g., "Full-screen drawer menu, swipe to close"]]

**Horizon Implementation**:
- **Section File**: [PLACEHOLDER: e.g., "sections/header.liquid"]]
- **CSS File**: [PLACEHOLDER: e.g., "assets/navigation.css"]]
- **JavaScript File**: [PLACEHOLDER: e.g., "assets/navigation.js (for drawer interaction)"]]

**CSS Location**: `section-specific` layer (header-specific)

**Dependencies**:
- Color tokens
- Typography tokens
- Spacing tokens
- Transition tokens
- Z-index tokens

**Status**: [ ] not-started  [ ] in-progress  [ ] visual-match  [ ] complete

**Notes**: [PLACEHOLDER]

---

# Content Sections

## Component: Hero Section

**Category**: Content Sections | **Section**

**Description**:
[PLACEHOLDER: e.g., "Large banner section with background image, overlay, headline, subheading, and call-to-action button. Creates strong visual impact at page top."]

**Visual Reference**:
- Figma: [PLACEHOLDER]
- Screenshot: [PLACEHOLDER]
- Example Pages: [PLACEHOLDER: "Home page, Landing pages"]

**Variants**:
- Image left, text right
- Image right, text left
- Full-width image with overlay
- Video background (optional)
- Dark overlay variant
- Light overlay variant

**States**:
- **Default**: [PLACEHOLDER: e.g., "Static display with image and text"]]
- **Hover**: [PLACEHOLDER: e.g., "Button hover state, image slight zoom"]]
- **Mobile**: [PLACEHOLDER: e.g., "Full-width stacked layout, image above text"]]

**Props/Settings**:
- [ ] Background image
- [ ] Headline text
- [ ] Subheading text
- [ ] Button text and link
- [ ] Text alignment (left / center / right)
- [ ] Text color (light / dark)
- [ ] Overlay opacity (0-100%)
- [ ] Height (preset: small / medium / large / full-height)
- [ ] Min-height (mobile vs. desktop)

**Responsive Behavior**:
- **Desktop**: [PLACEHOLDER: e.g., "Side-by-side layout, 60% image / 40% text"]]
- **Tablet**: [PLACEHOLDER: e.g., "50/50 split, text font size reduced"]]
- **Mobile**: [PLACEHOLDER: e.g., "Full-width stacked, text below image, single column"]]

**Horizon Implementation**:
- **Section File**: [PLACEHOLDER: e.g., "sections/hero.liquid"]]
- **CSS File**: [PLACEHOLDER: e.g., "assets/hero.css"]]

**CSS Location**: `section-specific` layer

**Dependencies**:
- Button component
- Color tokens
- Typography tokens
- Spacing tokens
- Transition tokens

**Status**: [ ] not-started  [ ] in-progress  [ ] visual-match  [ ] complete

**Notes**: [PLACEHOLDER]

---

# Layout Patterns

## Component: Two-Column Layout

**Category**: Layout Patterns | **Section**

**Description**:
[PLACEHOLDER: e.g., "Flexible two-column section layout. Left column for primary content, right column for sidebar or secondary content. Used for About pages, blog layouts, etc."]

**Variants**:
- 60/40 split (wider left)
- 50/50 split (equal width)
- 40/60 split (wider right)

**States**: N/A (layout structure)

**Props/Settings**:
- [ ] Column width ratio
- [ ] Gap between columns
- [ ] Stack at tablet/mobile (yes/no)

**Responsive Behavior**:
- **Desktop**: [PLACEHOLDER: e.g., "Side-by-side columns as specified"]]
- **Tablet**: [PLACEHOLDER: e.g., "Narrower columns, reduced gap"]]
- **Mobile**: [PLACEHOLDER: e.g., "Stacked vertically, single column"]]

**Horizon Implementation**:
- **Section File**: [PLACEHOLDER: e.g., "sections/two-column.liquid"]]
- **CSS File**: [PLACEHOLDER: e.g., "assets/layout.css"]]

**CSS Location**: `section-specific` layer

**Dependencies**:
- Spacing tokens
- Breakpoint tokens

**Status**: [ ] not-started  [ ] in-progress  [ ] visual-match  [ ] complete

**Notes**: [PLACEHOLDER]

---

# Interactive Components

## Component: Modal/Dialog Box

**Category**: Interactive Components | **Block**

**Description**:
[PLACEHOLDER: e.g., "Overlay modal for alerts, confirmations, forms. Centered on screen with backdrop overlay. Closes on outside click or close button."]

**Variants**:
- Alert (simple message with confirm button)
- Confirmation (message with yes/no buttons)
- Form modal (input fields inside modal)
- Newsletter signup (modal variant)

**States**:
- **Open**: [PLACEHOLDER: e.g., "Modal visible, backdrop semi-transparent, scroll locked on body"]]
- **Closed**: [PLACEHOLDER: e.g., "Modal hidden, backdrop gone, scroll restored"]]
- **Backdrop Click**: [PLACEHOLDER: e.g., "Closes modal"]]

**Props/Settings**:
- [ ] Modal title
- [ ] Modal content/message
- [ ] Button text (confirm / cancel)
- [ ] Close button enabled/disabled
- [ ] Backdrop click closes modal (yes/no)

**Responsive Behavior**:
- **Desktop**: [PLACEHOLDER: e.g., "Centered, 400-500px width"]]
- **Tablet**: [PLACEHOLDER: e.g., "90% width, max-width 400px"]]
- **Mobile**: [PLACEHOLDER: e.g., "90% width, 80vh max-height with scroll if needed"]]

**Horizon Implementation**:
- **Liquid File**: [PLACEHOLDER: e.g., "snippets/modal.liquid"]]
- **CSS File**: [PLACEHOLDER: e.g., "assets/modal.css"]]
- **JavaScript File**: [PLACEHOLDER: e.g., "assets/modal.js"]]

**CSS Location**: `section-specific` layer

**Dependencies**:
- Button component
- Color tokens
- Shadow tokens (backdrop, modal shadow)
- Z-index tokens

**Status**: [ ] not-started  [ ] in-progress  [ ] visual-match  [ ] complete

**Notes**: [PLACEHOLDER]

---

# Utility Components

## Component: Badge

**Category**: Utility Components | **Primitive**

**Description**:
[PLACEHOLDER: e.g., "Small inline label or tag. Used for discounts ('Save 20%'), status ('New', 'Sale', 'Out of Stock'), or tags."]

**Variants**:
- Filled (solid background)
- Outlined (border only)
- Dotted (colored dot indicator)

**States**:
- **Default**: [PLACEHOLDER]

**Props/Settings**:
- [ ] Badge text
- [ ] Badge color (primary / secondary / success / error / warning)
- [ ] Size (small / medium / large)

**Responsive Behavior**:
- **All viewports**: [PLACEHOLDER: e.g., "Inline, no responsive changes"]]

**Horizon Implementation**:
- **Liquid Snippet**: [PLACEHOLDER: e.g., "snippets/badge.liquid"]]
- **CSS File**: [PLACEHOLDER: e.g., "assets/utilities.css"]]

**CSS Location**: `primitives` layer

**Dependencies**:
- Color tokens
- Typography tokens

**Status**: [ ] not-started  [ ] in-progress  [x] visual-match  [ ] complete

**Notes**: [PLACEHOLDER]

---

## Summary Table

| Component Name | Category | Primitive/Section/Block | Status | File | Notes |
|----------------|----------|------------------------|--------|------|-------|
| Color Palette | Colors & Tokens | Primitive | complete | tokens.css | [PLACEHOLDER] |
| Body Text | Typography | Primitive | in-progress | typography.css | [PLACEHOLDER] |
| Headings | Typography | Primitive | visual-match | typography.css | [PLACEHOLDER] |
| Primary Button | Buttons | Block | visual-match | buttons.css | [PLACEHOLDER] |
| Secondary Button | Buttons | Block | complete | buttons.css | [PLACEHOLDER] |
| Text Input | Form Elements | Primitive | not-started | forms.css | [PLACEHOLDER] |
| Product Card | Cards | Block | visual-match | product-card.css | [PLACEHOLDER] |
| Main Navigation | Navigation | Section | not-started | navigation.css | [PLACEHOLDER] |
| Hero Section | Content Sections | Section | visual-match | hero.css | [PLACEHOLDER] |
| Two-Column Layout | Layout Patterns | Section | visual-match | layout.css | [PLACEHOLDER] |
| Modal/Dialog | Interactive Components | Block | visual-match | modal.css | [PLACEHOLDER] |
| Badge | Utility Components | Primitive | visual-match | utilities.css | [PLACEHOLDER] |

---

## Implementation Priority

Order components by dependency and page coverage. Foundations first, then composites.

**Tier 1 — Foundations** (build before any page sections)
- [ ] Design tokens (color, type, spacing)
- [ ] Buttons
- [ ] Typography system
- [ ] Container / grid utilities

**Tier 2 — Core Components** (needed by most pages)
- [ ] Product card
- [ ] Hero / banner
- [ ] Navigation (header, footer)
- [ ] Form inputs & validation

**Tier 3 — Supporting Components** (needed by specific pages)
- [ ] Modal / dialog
- [ ] Dropdown / accordion
- [ ] Pagination / breadcrumbs
- [ ] Alert / notification

**Tier 4 — Polish**
- [ ] Accessibility audit
- [ ] Performance review
- [ ] Cross-browser verification

---

## Notes & Decisions

[PLACEHOLDER: Document any design decisions, deviations from reference, browser compatibility notes, accessibility considerations, or implementation challenges discovered.]

---

**Inventory Created By**: [NAME]

**Last Updated**: [DATE]

**Status**: [DRAFT / IN PROGRESS / REVIEW / APPROVED]
