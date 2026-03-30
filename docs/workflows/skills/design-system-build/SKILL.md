# Design System Build Skill

## Overview

This skill defines how to construct, document, and maintain a complete design system within a Shopify Horizon theme. A complete design system includes tokens (colors, typography, spacing, layout), component primitives (buttons, cards, forms, etc.), and section patterns. All components must be documented on a single living reference page.

The core principle is **progressive construction**: build tokens first, then base styles, then primitives one component at a time, then section patterns. Each layer builds on the previous. Use visual comparison methodology at every step.

## What a Complete Design System Includes

A production-ready design system has 7 major parts:

### 1. Color System

**Location:** Theme settings (Layer 1) + Design tokens CSS (Layer 2)

**What to define:**

#### Color Schemes
Define at least 2-3 schemes (Light, Dark, High Contrast optional):

```json
{
  "name": "Light Scheme",
  "settings": [
    {"id": "color_primary", "type": "color", "default": "#0066CC"},
    {"id": "color_secondary", "type": "color", "default": "#006633"},
    {"id": "color_accent", "type": "color", "default": "#FF6600"}
  ]
}
```

#### Semantic Color Roles
Each scheme needs these roles defined:

| Role | Purpose | Example |
|------|---------|---------|
| **background** | Main page background | White or dark grey |
| **surface** | Cards, modals, containers | Off-white or charcoal |
| **foreground** | Text and borders | Dark grey or off-white |
| **muted** | Disabled state, placeholder text | Light grey or dark grey |
| **border** | Dividers, input borders | Light grey |
| **primary-action** | Main buttons, CTAs | Bright blue |
| **secondary-action** | Secondary buttons | Medium blue |
| **destructive** | Delete, cancel, danger | Red |
| **success** | Confirmation, positive feedback | Green |
| **warning** | Alerts, caution | Orange/yellow |
| **info** | Information messages | Light blue |

Each role should have:
- **Button states**: default background, hover (darker), active (even darker), focus ring color
- **Text states**: normal and hover states for links

**Example color scheme definition:**

```json
{
  "name": "Light Mode Colors",
  "settings": [
    {"id": "color_bg", "type": "color", "label": "Background", "default": "#FFFFFF"},
    {"id": "color_surface", "type": "color", "label": "Surface", "default": "#F5F5F5"},
    {"id": "color_text", "type": "color", "label": "Text", "default": "#1A1A1A"},
    {"id": "color_border", "type": "color", "label": "Border", "default": "#CCCCCC"},
    {"id": "color_primary", "type": "color", "label": "Primary", "default": "#0066CC"},
    {"id": "color_success", "type": "color", "label": "Success", "default": "#00AA00"},
    {"id": "color_warning", "type": "color", "label": "Warning", "default": "#FFCC00"},
    {"id": "color_error", "type": "color", "label": "Error", "default": "#CC0000"}
  ]
}
```

### 2. Typography System

**Location:** Theme settings (Layer 1) + Design tokens CSS (Layer 2)

**What to define:**

#### Font Families
```json
{
  "type": "font_picker",
  "id": "font_heading",
  "label": "Heading Font",
  "default": "Georgia, serif"
},
{
  "type": "font_picker",
  "id": "font_body",
  "label": "Body Font",
  "default": "Helvetica, sans-serif"
}
```

#### Type Scale
A consistent set of font sizes with corresponding line-height and letter-spacing:

```css
:root {
  /* Font Sizes */
  --font-size-xs: 12px;
  --font-size-sm: 14px;
  --font-size-base: 16px;
  --font-size-lg: 18px;
  --font-size-xl: 20px;
  --font-size-2xl: 28px;
  --font-size-3xl: 36px;
  --font-size-4xl: 48px;
  --font-size-display: 64px;

  /* Line Heights */
  --line-height-tight: 1.2;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.75;

  /* Letter Spacing */
  --letter-spacing-tight: -0.5px;
  --letter-spacing-normal: 0;
  --letter-spacing-loose: 0.5px;
}
```

#### Heading Styles (h1 through h6)
Each heading level should have distinct sizing:

```css
h1 {
  font-family: var(--font-heading);
  font-size: var(--font-size-4xl);
  font-weight: 700;
  line-height: var(--line-height-tight);
  margin-bottom: var(--space-md);
}

h2 {
  font-family: var(--font-heading);
  font-size: var(--font-size-3xl);
  font-weight: 700;
  line-height: var(--line-height-tight);
  margin-bottom: var(--space-md);
}

/* Continue for h3-h6... */
```

#### Body Text Styles
```css
body {
  font-family: var(--font-body);
  font-size: var(--font-size-base);
  font-weight: 400;
  line-height: var(--line-height-normal);
}

.body-small {
  font-size: var(--font-size-sm);
  line-height: var(--line-height-normal);
}

.body-caption {
  font-size: var(--font-size-xs);
  line-height: var(--line-height-normal);
  color: var(--color-muted);
}
```

#### Font Weights
Define all used weights:
- 400 (normal)
- 600 (semibold)
- 700 (bold)

Use only what the reference design uses. Don't define weights you don't need.

#### Text Transforms
```css
.text-uppercase {
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-loose);
}

.text-capitalized {
  text-transform: capitalize;
}
```

### 3. Spacing System

**Location:** Design tokens CSS (Layer 2)

**What to define:**

A spacing scale that covers all common uses. Standard scale:

```css
:root {
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
  --space-3xl: 64px;
  --space-4xl: 96px;
  --space-5xl: 128px;
}
```

Use this scale for:
- Component internal padding (e.g., button padding, card padding)
- Gaps between elements (flex/grid gap)
- Margins between sections
- Line spacing adjustments

**Don't create arbitrary spacing values.** Force all spacing to use tokens from this scale. If something doesn't fit the scale, add a new token rather than using a hardcoded value.

### 4. Layout System

**Location:** Design tokens CSS (Layer 2) + Base styles CSS (Layer 3)

**What to define:**

#### Max Content Width
```css
:root {
  --max-content-width: 1200px;
}

.container {
  width: 100%;
  max-width: var(--max-content-width);
  margin: 0 auto;
}
```

#### Page Margins/Gutters
```css
:root {
  --page-gutter: var(--space-md); /* 16px on all sides */
}

@media (min-width: 768px) {
  :root {
    --page-gutter: var(--space-lg); /* 24px on tablet */
  }
}

@media (min-width: 1024px) {
  :root {
    --page-gutter: var(--space-xl); /* 32px on desktop */
  }
}
```

#### Grid System
Define a responsive grid (typically 12 columns):

```css
.grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--space-lg);
}

/* Responsive grid */
@media (max-width: 767px) {
  .grid {
    grid-template-columns: repeat(1, 1fr);
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1440px) {
  .grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

#### Breakpoints
Define your responsive breakpoints:

```css
/* Mobile-first approach */
/* Base styles for mobile */

@media (min-width: 768px) {
  /* Tablet styles */
}

@media (min-width: 1024px) {
  /* Desktop styles */
}

@media (min-width: 1440px) {
  /* Large desktop styles */
}
```

Breakpoints align with the standard viewports:
- Mobile: < 768px
- Tablet: 768px - 1023px
- Desktop: >= 1024px

### 5. Border and Surface System

**Location:** Design tokens CSS (Layer 2)

**What to define:**

#### Border Radius
```css
:root {
  --border-radius-none: 0;
  --border-radius-sm: 4px;
  --border-radius-md: 8px;
  --border-radius-lg: 12px;
  --border-radius-xl: 16px;
  --border-radius-full: 9999px;
}
```

#### Border Widths
```css
:root {
  --border-width-thin: 1px;
  --border-width-normal: 2px;
  --border-width-thick: 4px;
}
```

#### Shadows
```css
:root {
  --shadow-none: none;
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1);
}
```

### 6. Component Primitives

**Location:** Component primitives CSS (Layer 4)

**What to define:**

Each primitive must support all states (default, hover, focus, active, disabled).

#### Buttons
- Primary button (solid color, dark hover, focus ring)
- Secondary button (lower contrast, outline option)
- Outline button (border, no fill)
- Ghost button (no visible background until hover)
- Link button (looks like a link, acts like a button)
- Icon-only button (circular or minimal)
- Multiple sizes: sm, md (default), lg

```css
.sandstone-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-sm) var(--space-md);
  font-family: var(--font-body);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  border: 2px solid transparent;
  border-radius: var(--border-radius-md);
  cursor: pointer;
  transition: all 0.2s ease;
}

.sandstone-button--primary {
  background-color: var(--color-primary);
  color: white;
}

.sandstone-button--primary:hover {
  background-color: var(--color-primary);
  opacity: 0.9;
}

.sandstone-button--primary:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.2);
}

.sandstone-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.sandstone-button--sm {
  padding: var(--space-xs) var(--space-sm);
  font-size: var(--font-size-sm);
}

.sandstone-button--lg {
  padding: var(--space-md) var(--space-lg);
  font-size: var(--font-size-lg);
}
```

#### Form Inputs
- Text input with states (default, focus, error, disabled)
- Textarea
- Select dropdown
- Checkbox
- Radio button
- All with labels and validation states

```css
.sandstone-input {
  width: 100%;
  padding: var(--space-sm) var(--space-md);
  font-family: var(--font-body);
  font-size: var(--font-size-base);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-sm);
  transition: all 0.2s ease;
}

.sandstone-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
}

.sandstone-input:invalid {
  border-color: var(--color-error);
}

.sandstone-input:disabled {
  background-color: var(--color-muted);
  cursor: not-allowed;
}
```

#### Cards
- Product card (image, price, title, button)
- Content card (title, description, optional metadata)
- Feature card (icon/image, title, description)
- Testimonial card (quote, author, rating)
- All with hover states (shadow increase, scale, etc.)

```css
.sandstone-card {
  background-color: var(--color-surface);
  border-radius: var(--border-radius-md);
  padding: var(--space-md);
  box-shadow: var(--shadow-sm);
  transition: all 0.2s ease;
}

.sandstone-card:hover {
  box-shadow: var(--shadow-md);
}

.sandstone-card__title {
  font-family: var(--font-heading);
  font-size: var(--font-size-lg);
  margin-bottom: var(--space-sm);
}

.sandstone-card__description {
  font-size: var(--font-size-sm);
  color: var(--color-muted);
}
```

#### Other Primitives
- Badges/Pills/Tags (with color variants)
- Accordions (expand/collapse with icons)
- Tabs (tab navigation and content switching)
- Modal/Dialog (overlay with close button)
- Toast/Alert/Banner (inline messaging)
- Navigation items and breadcrumbs
- Pagination (page numbers, prev/next)
- Avatars (small profile images)
- Image containers (with aspect ratio options)
- Dividers and separators
- Loading states and skeleton screens

### 7. Section Patterns

**Location:** Custom sections with reusable block components

**What to define:**

High-level page sections that compose primitives into meaningful page structures:

- **Hero**: Large banner with background image/video, text overlay, CTA
- **Feature Grid**: Multiple feature cards in a grid layout
- **Media + Content**: Image on one side, text on the other (alternating)
- **Content Block**: Text-only prose section with headings and formatting
- **Testimonials**: Multiple testimonial cards in a carousel or grid
- **FAQ**: Accordion section with collapsible questions
- **Newsletter Signup**: Email input with submit button
- **Product Grid**: Multiple product cards in a responsive grid
- **Collection Grid**: Multiple collection cards
- **Logo Cloud**: Partner/client logos in rows
- **Stats Section**: Large numbers with labels
- **Timeline/Process Steps**: Vertical or horizontal process visualization
- **CTA Banner**: Full-width call-to-action with button

Each pattern should:
- Use existing primitives (buttons, cards, forms)
- Follow the spacing scale
- Be responsive (change at breakpoints)
- Have all content configurable via settings/blocks
- Support multiple content variations via settings

## The Design System Reference Page

Create a comprehensive reference page that displays ALL design system components on a single page.

### Location

`page.design-system.json` (a hidden page accessible via direct URL)

### Structure

Break the page into these sections, each using custom sections that render the components:

```json
{
  "sections": {
    "header": {
      "type": "sandstone-page-header",
      "settings": {
        "title": "Design System"
      }
    },
    "typography": {
      "type": "sandstone-design-typography"
    },
    "colors": {
      "type": "sandstone-design-colors"
    },
    "spacing": {
      "type": "sandstone-design-spacing"
    },
    "buttons": {
      "type": "sandstone-design-buttons"
    },
    "forms": {
      "type": "sandstone-design-forms"
    },
    "cards": {
      "type": "sandstone-design-cards"
    },
    "components": {
      "type": "sandstone-design-components"
    },
    "sections": {
      "type": "sandstone-design-sections"
    }
  }
}
```

### Section Details

Each section should display:

1. **Typography Section:**
   - Heading levels h1-h6 with font sizes and styling
   - Body text with different weights
   - Captions and small text
   - Code blocks showing the classes to use

2. **Colors Section:**
   - Color swatches for each color in each scheme
   - Color name and hex value displayed
   - Demonstration of semantic colors (primary action, success, error, etc.)

3. **Spacing Section:**
   - Visual representation of the spacing scale
   - Each size shown as a colored box with the px value labeled
   - Common use cases for each size (button padding, section gap, etc.)

4. **Buttons Section:**
   - Every button variant (primary, secondary, outline, ghost, link)
   - Every size (sm, md, lg)
   - All states (default, hover, focus, active, disabled)
   - Code showing how to use each variant

5. **Forms Section:**
   - Text input in all states
   - Textarea
   - Select dropdown
   - Checkbox and radio
   - Error states
   - Validation states

6. **Cards Section:**
   - Product card with variations
   - Content card
   - Feature card
   - Testimonial card
   - All with hover states visible

7. **Components Section:**
   - Badges with color variants
   - Accordions in expanded and collapsed states
   - Tabs showing active tab styling
   - Modals/Dialogs
   - Toast/Alert/Banner messaging
   - Breadcrumbs and pagination

8. **Sections Section:**
   - Mini versions of each section pattern
   - Hero section with content overlay
   - Feature grid
   - Media + content layout
   - Testimonials carousel/grid
   - CTA banner
   - FAQ section

### Purpose and Use

This page is:
- **A living style guide:** Updated whenever the design system changes
- **A reference for developers:** See exactly how each component should look
- **A test page for the design system:** All components in one place makes inconsistencies obvious
- **A merchant reference:** Can be locked/hidden but useful for theme editor understanding

Access it via: `https://your-dev-store.myshopify.com/pages/design-system`

## Process for Building

Build the design system incrementally in this order:

### Phase 1: Tokens and Settings (Day 1)

1. **Extract colors from reference design:**
   - Identify the primary color, secondary color, accent colors
   - Identify the light/dark background colors
   - Identify semantic colors (success, error, warning, info)
   - Create a color palette spreadsheet

2. **Add color settings to settings_schema.json:**
   ```json
   {
     "name": "Colors",
     "settings": [
       {"type": "color", "id": "color_primary", "label": "Primary Color", "default": "#0066CC"},
       {"type": "color", "id": "color_bg", "label": "Background", "default": "#FFFFFF"},
       ...
     ]
   }
   ```

3. **Extract typography from reference:**
   - Identify heading font and body font
   - Note each heading level's size, weight, line-height
   - Note body text sizes and styles
   - Create a typography reference spreadsheet

4. **Add font settings to settings_schema.json:**
   ```json
   {"type": "font_picker", "id": "font_heading", "label": "Heading Font", "default": "Georgia, serif"},
   {"type": "font_picker", "id": "font_body", "label": "Body Font", "default": "Helvetica, sans-serif"}
   ```

5. **Create design tokens CSS file:**
   - `assets/{prefix}tokens.css`
   - Reference all colors and fonts from settings
   - Define spacing scale, border radius, shadows, etc.

6. **Register tokens CSS in theme.liquid** (ensure it loads first)

**Deliverable:** `assets/{prefix}tokens.css` with all tokens defined, `config/settings_schema.json` with color and font settings

### Phase 2: Base Styles (Day 1-2)

1. **Create base CSS file:**
   - `assets/{prefix}base.css`
   - HTML element resets (html, body, margins, padding)
   - Global typography (h1-h6, p, a, ul, ol)
   - Prose/RTE styles
   - Layout utilities (.container, .grid, .flex)
   - Responsive breakpoint utilities

2. **Test base styles:**
   - Add a simple test section to a template to verify heading and text styles work
   - Compare visually against reference using the Visual Comparison Skill

3. **Iterate until correct:**
   - Adjust font sizes, line heights, margins
   - Verify responsive behavior at all three viewports

**Deliverable:** `assets/{prefix}base.css` with all base styles and utilities

### Phase 3: Component Primitives (Days 2-4)

Build ONE component at a time, comparing against reference after each one.

1. **Start with buttons:**
   - Create `.sandstone-button` base class
   - Add primary, secondary, outline, ghost variants
   - Add sm, md, lg sizes
   - Add all states: default, hover, focus, active, disabled
   - Take cropped screenshot at each viewport
   - Compare against reference button using Level 2-3 from Visual Comparison Skill
   - Fix until pixel-perfect

2. **Move to form inputs:**
   - Text input with label
   - Textarea
   - Select dropdown
   - Checkbox and radio
   - All states: default, focus, error, disabled
   - Compare and fix

3. **Build cards:**
   - Product card (image, title, price, button)
   - Content card (title, description)
   - Feature card (icon, title, description)
   - Testimonial card (quote, author)
   - Compare and fix

4. **Build remaining primitives in order of importance:**
   - Badges/pills
   - Accordions
   - Tabs
   - Modals
   - Alerts/toasts
   - Navigation components
   - Pagination
   - Others

**Process for each primitive:**

```
1. Study the reference design
   - Take a cropped screenshot of the component
   - Note all properties: colors, sizes, spacing, borders, shadows, states

2. Write the CSS
   - Start with the base class and default state
   - Add all variants and modifiers
   - Add all interaction states

3. Create a test section (temporary)
   - Add the component to a section for visual testing
   - Include all variants and states

4. Compare against reference
   - Level 1: Check individual CSS properties
   - Level 2: Check the component at all states
   - Level 3: Check spacing and alignment

5. Fix issues
   - Identify top differences
   - Fix one at a time
   - Re-screenshot and verify

6. Verify no regressions
   - Check that the fix didn't break other states
   - Move to next difference

7. Repeat until pixel-perfect

8. Remove test section and move to next primitive
```

**Deliverable:** `assets/{prefix}primitives.css` with all component primitives completed

### Phase 4: Design System Reference Page (Day 4)

1. **Create design system sections:**
   - `sections/sandstone-design-typography.liquid`
   - `sections/sandstone-design-colors.liquid`
   - `sections/sandstone-design-spacing.liquid`
   - `sections/sandstone-design-buttons.liquid`
   - `sections/sandstone-design-forms.liquid`
   - `sections/sandstone-design-cards.liquid`
   - `sections/sandstone-design-components.liquid`

2. **Create design system template:**
   - `templates/page.design-system.json`
   - Add all design system sections to the template
   - Structure logically

3. **Populate each section:**
   - Typography section: render h1-h6, body text, captions
   - Colors section: render color swatches for each color
   - Spacing section: render visual spacing scale
   - Buttons section: render all button variants and sizes
   - Forms section: render all form elements
   - Cards section: render all card types
   - Components section: render other primitives

4. **Test the design system page:**
   - Create the page in Shopify admin
   - Use the `page.design-system` template
   - View at all three viewports
   - Spot-check that all components are visually correct

**Deliverable:** `templates/page.design-system.json` and all supporting design system sections

### Phase 5: Section Patterns (Days 4-5)

Now that all primitives exist, build high-level section patterns.

1. **Create sections for each pattern:**
   - `sections/sandstone-hero.liquid`
   - `sections/sandstone-feature-grid.liquid`
   - `sections/sandstone-media-content.liquid`
   - `sections/sandstone-testimonials.liquid`
   - `sections/sandstone-faq.liquid`
   - `sections/sandstone-newsletter.liquid`
   - `sections/sandstone-cta-banner.liquid`
   - etc.

2. **For each section:**
   - Define schema with all settings and blocks
   - Use existing primitives to compose the layout
   - Add minimal custom CSS (keep in Layer 4, not section-specific)
   - Test at all three viewports

3. **Add patterns to design system page:**
   - Create `sections/sandstone-design-sections.liquid`
   - Render a mini version of each section pattern
   - This demonstrates how patterns look with different content

4. **Compare section patterns against reference:**
   - If reference shows a hero section, match it exactly
   - If reference shows a feature grid, match spacing and layout
   - Use Visual Comparison Skill at Level 4 (section level)

**Deliverable:** All section pattern files and completed design system reference page

### Phase 6: Design System Audit (Day 5)

Before declaring complete:

1. **Check for consistency:**
   - Do all buttons follow the same hover behavior?
   - Do all cards have the same border radius?
   - Do all sections use the same padding?
   - Are all colors pulled from the color system?

2. **Review the design system reference page:**
   - Does every component look correct?
   - Are all variants visible?
   - Are all states demonstrated?

3. **Run code quality checks:**
   - `shopify theme check` (no errors)
   - Verify CSS doesn't have hardcoded values
   - Verify all custom classes use the prefix

4. **Document any gaps:**
   - If something is missing, note it
   - If something doesn't fit the pattern, decide if it's an exception or if the pattern needs adjustment

**Deliverable:** Completed, audited design system ready for use

## Gap Filling: When the Reference Doesn't Cover Everything

Not all components are shown in the reference design. When you need to build a component that isn't explicitly designed, use these principles:

### Step 1: Look for Patterns

Study the existing design language:
- What border radius is used? (4px, 8px, 12px?)
- What padding scale appears? (4px, 8px, 16px?)
- What colors are used for interactive elements?
- What hover/focus patterns are used?

### Step 2: Extrapolate Consistently

If the reference shows:
- Buttons with 8px border radius
- Cards with 8px border radius
- Then form inputs should probably also have 8px border radius (or 4px if they're slightly less rounded)

If the reference shows:
- Primary button with 12px padding
- Then secondary buttons should have the same padding with different colors
- Then form inputs should have similar padding

### Step 3: Build Following the Pattern

Create the missing component using the established patterns:

```css
/* Reference shows buttons with 8px radius and cards with 8px radius */
/* So form inputs should have 8px radius too */

.sandstone-input {
  border-radius: var(--border-radius-md); /* 8px */
  padding: var(--space-sm) var(--space-md); /* 8px 16px, matching button padding */
}
```

### Step 4: Visual Review

Look at the component in context:
- Does it feel like it belongs with the other components?
- Is the sizing consistent?
- Is the spacing consistent?
- Is the color treatment consistent?

### Step 5: Add to Design System Page

Add the gap-filled component to the design system reference page so it's part of the official system and can be reviewed.

### Example: Form Error States

Suppose the reference doesn't show error states for form inputs:

1. **Look at pattern:** Reference shows destructive/error color is red (#CC0000)
2. **Extrapolate:** Error inputs should have red border, matching the error color
3. **Build:**
   ```css
   .sandstone-input:invalid {
     border-color: var(--color-error);
     box-shadow: 0 0 0 3px rgba(204, 0, 0, 0.1);
   }
   ```
4. **Visual review:** Red border + subtle red shadow feels consistent with the design language
5. **Add to design system:** Include invalid state in the forms section of the design system page

## Quality Assurance Checklist

Before declaring the design system complete:

### Colors
- [ ] Every color in reference design is defined as a setting
- [ ] Semantic color roles are assigned (primary, secondary, success, error, warning, info)
- [ ] Colors work in light AND dark schemes (if both exist)
- [ ] Color contrast meets WCAG AA standards for text
- [ ] All color tokens are used in CSS (no hardcoded colors)

### Typography
- [ ] All font families from reference are added as settings
- [ ] All heading levels (h1-h6) match reference sizing
- [ ] Body text matches reference sizing
- [ ] Line heights are appropriate for readability
- [ ] Font weights used are clearly defined
- [ ] All text uses design tokens, not hardcoded values

### Spacing
- [ ] All spacing uses the spacing scale (no arbitrary values)
- [ ] Button padding matches across variants
- [ ] Card padding is consistent
- [ ] Gap between components is consistent
- [ ] Section padding is adequate and responsive

### Components
- [ ] Every primitive component has ALL states defined (default, hover, focus, active, disabled)
- [ ] Hover states are visible and clear
- [ ] Focus states support keyboard navigation
- [ ] Disabled states are clearly different
- [ ] All button variants work with different text lengths
- [ ] Form inputs are properly labeled
- [ ] Cards scale appropriately at different viewports

### Responsive
- [ ] All components are tested at three viewports (1440, 768, 390)
- [ ] Layout changes appropriately at breakpoints
- [ ] Text sizes scale appropriately
- [ ] Images scale appropriately
- [ ] Touch targets are large enough on mobile (48px minimum)

### Code Quality
- [ ] `shopify theme check` passes with no errors
- [ ] No hardcoded colors, fonts, or sizes in CSS
- [ ] All custom classes use consistent prefix
- [ ] BEM naming is applied consistently
- [ ] No CSS is duplicated across files
- [ ] CSS load order is correct (tokens → base → primitives)

### Documentation
- [ ] Design system reference page is complete
- [ ] All components are documented on the reference page
- [ ] All states are visible on the reference page
- [ ] Section patterns are documented
- [ ] Gap-filled components are marked as "inferred from design language"

## Quick Checklist for Each Component

Use this when building a new component:

- [ ] Studied reference design and noted all properties
- [ ] Created CSS with all variants (sizes, types) and states (default, hover, focus, active, disabled)
- [ ] Took screenshot of reference and implementation
- [ ] Compared at Level 2-3 (element and component level)
- [ ] Fixed all Critical and Major differences
- [ ] Verified no regressions in other states
- [ ] Added component to design system reference page
- [ ] Verified component is responsive at all three viewports
- [ ] Code quality checks passed
- [ ] Ready for use in section patterns

