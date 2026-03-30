# Code Architecture Skill

## Overview

This skill defines the exact methodology for organizing code in a Horizon Shopify theme when implementing a design system. It covers CSS organization, file structure, naming conventions, and the integration of theme settings with the design system.

The core principle is **layered CSS architecture**: settings flow down through design tokens into base styles, which compose into primitives, which are used by sections. This separation ensures maintainability, merchant editability, and clear separation of concerns.

## CSS Organization: The Layered Approach

All custom CSS must follow a strict 5-layer model. Do not skip layers or mix concerns.

### Layer 1: Theme Settings

**Location:** `config/settings_schema.json` and `config/settings_data.json`

**Purpose:** Define all design tokens as merchant-editable settings in the Shopify theme customizer. These are NOT CSS — they are Shopify settings that merchants can adjust in the admin.

**What goes here:**
- Color schemes (e.g., "Light", "Dark", "High Contrast")
- Font selections (heading, body, accent)
- Spacing scale (if fully configurable)
- Border radius, shadow scales
- Layout settings (max width, gutter size)
- Feature flags (show/hide elements)

**Structure in settings_schema.json:**
```json
[
  {
    "name": "Color Scheme",
    "settings": [
      {
        "type": "color",
        "id": "color_primary",
        "label": "Primary Color",
        "default": "#000000"
      },
      {
        "type": "select",
        "id": "heading_font",
        "label": "Heading Font",
        "options": [
          {"value": "georgia", "label": "Georgia"},
          {"value": "helvetica", "label": "Helvetica"}
        ],
        "default": "georgia"
      }
    ]
  }
]
```

**Key rules:**
- Every setting must have a unique `id`
- Every setting must have a human-readable `label`
- Use `t:settings.*` localization keys for labels (enables multi-language support)
- Provide sensible `default` values that match the reference design
- Group related settings under the same section name
- Use appropriate setting types (`color`, `text`, `select`, `checkbox`, `range`, `image_picker`, `richtext`, `url`)

**These settings are the single source of truth for the design.** All CSS values should trace back to these settings.

### Layer 2: Design Tokens CSS

**Location:** `assets/{prefix}tokens.css` (e.g., `assets/sandstone-tokens.css`)

**Purpose:** Translate theme settings from Layer 1 into CSS custom properties. This is the bridge between Shopify's theme customizer and CSS.

**What goes here:**
- Only `:root` variables
- One variable per design token
- Variables reference theme settings via Liquid interpolation
- No component classes
- No utility classes
- Comments explaining token purpose

**Structure:**
```css
:root {
  /* Colors - Primary Scheme */
  --color-primary: {{ settings.color_primary }};
  --color-secondary: {{ settings.color_secondary }};
  --color-accent: {{ settings.color_accent }};

  /* Colors - Neutral/Semantic */
  --color-background: {{ settings.color_bg }};
  --color-surface: {{ settings.color_surface }};
  --color-foreground: {{ settings.color_text }};
  --color-muted: {{ settings.color_muted }};
  --color-border: {{ settings.color_border }};

  /* Typography */
  --font-heading: "{{ settings.heading_font }}";
  --font-body: "{{ settings.body_font }}";
  --font-weight-normal: 400;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  /* Type Scale */
  --font-size-xs: 12px;
  --font-size-sm: 14px;
  --font-size-base: 16px;
  --font-size-lg: 18px;
  --font-size-xl: 20px;
  --font-size-2xl: 28px;
  --font-size-3xl: 36px;
  --font-size-4xl: 48px;

  --line-height-tight: 1.2;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.75;

  /* Spacing Scale */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
  --space-3xl: 64px;

  /* Layout */
  --max-content-width: {{ settings.max_width }}px;
  --page-gutter: var(--space-md);

  /* Borders & Surfaces */
  --border-radius-sm: 4px;
  --border-radius-md: 8px;
  --border-radius-lg: 12px;
  --border-radius-xl: 16px;
  --border-radius-full: 9999px;

  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
}
```

**Key rules:**
- Use Liquid `{{ settings.* }}` to reference Layer 1 settings
- Token names should describe the design purpose, not the value (use `--color-primary`, not `--color-blue`)
- Token names should be in kebab-case
- Group related tokens with comments
- Avoid nested CSS vars (prefer flat structure for clarity)
- This file should be registered first in the stylesheet loading order (see CSS Loading section)

### Layer 3: Base Styles CSS

**Location:** `assets/{prefix}base.css` (e.g., `assets/sandstone-base.css`)

**Purpose:** Define global, reusable styles that apply to all elements. This includes layout helpers, typography utilities, and prose/RTE styles.

**What goes here:**
- HTML element resets (html, body, *, etc.)
- Global typography (headings, paragraphs, links)
- Prose/rich text styles (when content editors paste RTE content)
- Layout utilities (`.container`, `.grid`, `.flex`, spacing helpers)
- Responsive utilities (breakpoint-specific classes)
- Text utilities (font size classes, weight classes, alignment)
- Color utilities for text and backgrounds (`.text-primary`, `.bg-surface`)

**Structure:**
```css
/* Reset */
html, body {
  margin: 0;
  padding: 0;
  font-family: var(--font-body);
  font-size: var(--font-size-base);
  line-height: var(--line-height-normal);
  color: var(--color-foreground);
  background-color: var(--color-background);
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
  margin: 0;
}

h1 { font-size: var(--font-size-4xl); margin-bottom: var(--space-lg); }
h2 { font-size: var(--font-size-3xl); margin-bottom: var(--space-md); }
h3 { font-size: var(--font-size-2xl); margin-bottom: var(--space-md); }

p {
  margin: 0;
  margin-bottom: var(--space-md);
}

a {
  color: var(--color-primary);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

/* Layout Utilities */
.container {
  width: 100%;
  max-width: var(--max-content-width);
  margin: 0 auto;
  padding-left: var(--page-gutter);
  padding-right: var(--page-gutter);
}

.grid {
  display: grid;
  gap: var(--space-md);
}

.flex {
  display: flex;
  gap: var(--space-md);
}

/* Prose (RTE Styles) */
.prose h1,
.prose h2,
.prose h3 {
  margin-top: var(--space-lg);
}

.prose p {
  margin-bottom: var(--space-md);
}

.prose ul,
.prose ol {
  margin-left: var(--space-lg);
  margin-bottom: var(--space-md);
}

/* Responsive Helpers */
@media (min-width: 768px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 1024px) {
  .grid { grid-template-columns: repeat(3, 1fr); }
}
```

**Key rules:**
- Use design tokens from Layer 2 everywhere
- All classes use the custom prefix (e.g., `.{prefix}container`, `.{prefix}grid`)
- Keep utilities small and composable (users combine multiple classes)
- Do NOT define component-specific styling (that's Layer 4)
- Define responsive behavior at the breakpoints where it changes
- Use semantic names that reflect function, not appearance

### Layer 4: Component Primitives CSS

**Location:** `assets/{prefix}primitives.css` (e.g., `assets/sandstone-primitives.css`)

**Purpose:** Define reusable UI components and their variants. Buttons, cards, forms, badges, modals, etc. Each primitive must support all interaction states (default, hover, focus, active, disabled).

**What goes here:**
- Button styles (primary, secondary, outline, ghost, sizes)
- Form input styles (text, textarea, select, checkbox, radio) with validation states
- Card components (product card, content card, feature card)
- Badges, pills, tags
- Accordions, tabs, modals, drawers
- Toast, alert, banner styles
- Navigation components
- Avatar, image containers
- Dividers, separators
- Loading states, skeletons
- **Native Horizon section overrides** scoped under `#MainContent`

**Structure:**
```css
/* Buttons */
.{prefix}button {
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
  text-decoration: none;
}

.{prefix}button--primary {
  background-color: var(--color-primary);
  color: white;
}

.{prefix}button--primary:hover {
  opacity: 0.9;
}

.{prefix}button--secondary {
  background-color: var(--color-secondary);
  color: var(--color-foreground);
}

.{prefix}button--outline {
  background-color: transparent;
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.{prefix}button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Cards */
.{prefix}card {
  background-color: var(--color-surface);
  border-radius: var(--border-radius-md);
  padding: var(--space-md);
  box-shadow: var(--shadow-sm);
}

.{prefix}card:hover {
  box-shadow: var(--shadow-md);
  transition: box-shadow 0.2s ease;
}

/* Form Inputs */
.{prefix}input {
  width: 100%;
  padding: var(--space-sm) var(--space-md);
  font-family: var(--font-body);
  font-size: var(--font-size-base);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-sm);
  transition: border-color 0.2s ease;
}

.{prefix}input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(var(--color-primary), 0.1);
}

.{prefix}input:invalid {
  border-color: #d32f2f;
}

/* Horizon Native Overrides */
#MainContent .product-information__price {
  font-family: var(--font-heading);
  font-size: var(--font-size-xl);
  color: var(--color-primary);
}

#MainContent .product-form__input {
  border-radius: var(--border-radius-md);
}
```

**Key rules:**
- Every component must have all states defined: default, hover, focus, active, disabled
- Use BEM naming: `.{prefix}component`, `.{prefix}component--modifier`, `.{prefix}component__element`
- Use design tokens everywhere — no hardcoded values
- Override Horizon's native sections ONLY here, scoped under `#MainContent`, never in section files
- Do NOT create fork of Horizon sections — style them here instead
- Component classes should be independent and composable
- Group related components with comments

### Layer 5: Section/Block Specific CSS

**Location:** Only when absolutely necessary — in the section's `{% stylesheet %}` tag or as a comment-bannered section in `{prefix}primitives.css`

**Purpose:** Handle edge cases where a section needs styling that cannot be achieved with Layers 1-4.

**When to use:**
- A custom section needs specialized layout that conflicts with global primitives
- A section has unique spacing needs that don't fit the global scale
- A feature requires custom interactions or animations unique to this section

**When NOT to use (use Layer 4 instead):**
- Styling a button variant (add to primitives)
- Styling a card type (add to primitives)
- Restyling a global element (add to base or primitives)
- Any styling that appears in multiple sections (that's a primitive)

**Example of proper Layer 5 usage in a section file:**
```liquid
<section class="{prefix}hero">
  <h1>{{ section.settings.title }}</h1>
</section>

{% stylesheet %}
  .{prefix}hero {
    /* This is ONLY appropriate if the hero section needs unique layout
       that cannot be achieved by composing base and primitive classes */
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-2xl);
    padding: var(--space-3xl) 0;
  }
{% endstylesheet %}
```

**Key rule:** Section-specific CSS should be minimal and scoped to the section's root class. If you find yourself writing more than 20 lines in a section's stylesheet, move that styling to Layer 4.

## CSS Loading Order

**Location:** `snippets/stylesheets.liquid` (or equivalent)

**Purpose:** Ensure CSS loads in the correct order so later layers can override earlier ones.

**Order:**
1. `assets/base.css` (Horizon core styles)
2. `assets/{prefix}tokens.css` (design tokens)
3. `assets/{prefix}base.css` (global base styles)
4. `assets/{prefix}primitives.css` (component primitives)

**Implementation:**
```liquid
<!-- Design System Stylesheets -->
<link rel="stylesheet" href="{{ 'sandstone-tokens.css' | asset_url }}" media="print" onload="this.media='all'">
<link rel="stylesheet" href="{{ 'sandstone-base.css' | asset_url }}" media="print" onload="this.media='all'">
<link rel="stylesheet" href="{{ 'sandstone-primitives.css' | asset_url }}" media="print" onload="this.media='all'">
```

Alternatively, use `@import` in a single stylesheet:
```css
@import url('sandstone-tokens.css');
@import url('sandstone-base.css');
@import url('sandstone-primitives.css');
```

**Key rule:** This loading order is immutable. Do not change it. Later files depend on earlier files being loaded first.

## Naming Conventions

All custom work must follow a consistent naming scheme. Choose a prefix that reflects the brand or theme (e.g., "sandstone", "brand", "horizon-custom") and use it everywhere.

### Prefix Selection

Pick ONE prefix and use it consistently across the entire theme. Examples:
- `sandstone-` for a design system named "Sandstone"
- `brand-` for a generic brand-specific theme
- `custom-` if the theme is a one-off implementation

Store the chosen prefix in a configuration file or document so all team members use the same one.

### CSS Class Naming (BEM-like)

**Root component:** `.{prefix}component`
```css
.sandstone-button
.sandstone-card
.sandstone-modal
```

**Modifier (variant):** `.{prefix}component--modifier`
```css
.sandstone-button--primary
.sandstone-button--secondary
.sandstone-button--large
.sandstone-card--featured
```

**Child element:** `.{prefix}component__element`
```css
.sandstone-card__title
.sandstone-card__description
.sandstone-button__icon
```

**Multiple levels (if necessary):** `.{prefix}component__section__element`
```css
.sandstone-card__header__title
```

**Utilities:** `.[qualifier]-{value}`
```css
.text-center
.text-primary
.bg-surface
.flex-col
.gap-md
```

### File Naming

**Sections:** `sections/{prefix}<feature>.liquid`
```
sections/sandstone-hero.liquid
sections/sandstone-feature-grid.liquid
sections/sandstone-testimonials.liquid
```

**Snippets:** `snippets/{prefix}<feature>.liquid`
```
snippets/sandstone-button.liquid
snippets/sandstone-card.liquid
snippets/sandstone-form-input.liquid
```

**CSS:** `assets/{prefix}<layer>.css`
```
assets/sandstone-tokens.css
assets/sandstone-base.css
assets/sandstone-primitives.css
```

**JSON Templates:** `templates/<name>.json` (Shopify standard, no prefix needed)
```
templates/home.json
templates/page.json
templates/product.json
```

### Template Body Class

Add a template-scoped class to enable template-specific overrides if needed:
```liquid
<body class="template-{{ template.name }}">
  ...
</body>
```

This allows CSS like:
```css
.template-home .sandstone-hero {
  /* Home page hero specific styling */
}
```

## HTML/Liquid Structure

Follow Shopify's template → section → block hierarchy strictly.

### Templates

Templates are JSON files that declare sections. They are the top-level page structure.

**Location:** `templates/*.json`

**Structure:**
```json
{
  "sections": {
    "main": {
      "type": "sandstone-hero",
      "settings": {
        "title": "Welcome"
      }
    },
    "features": {
      "type": "sandstone-feature-grid",
      "blocks": [
        {
          "type": "feature",
          "settings": {
            "title": "Feature 1"
          }
        }
      ]
    }
  }
}
```

**Key rules:**
- Templates declare which sections appear and in what order
- Sections are rendered via the `{% section 'section-name' %}` tag in a parent template
- Merchants can add/remove sections in the theme editor, but the main section cannot be removed
- Template names should match Shopify conventions: `home.json`, `product.json`, `page.json`, etc.

### Sections

Sections are Liquid files with a `{% schema %}` block. They define structure and settings.

**Location:** `sections/{prefix}<feature>.liquid`

**Structure:**
```liquid
<section class="sandstone-hero" data-section-id="{{ section.id }}">
  <div class="sandstone-hero__content">
    <h1 class="sandstone-hero__title">{{ section.settings.title }}</h1>
    <p class="sandstone-hero__subtitle">{{ section.settings.subtitle }}</p>
    <a href="{{ section.settings.cta_link }}" class="sandstone-button sandstone-button--primary">
      {{ section.settings.cta_text }}
    </a>
  </div>

  {% if section.blocks.size > 0 %}
    <div class="sandstone-hero__blocks">
      {% for block in section.blocks %}
        {% case block.type %}
          {% when 'feature' %}
            {% render 'sandstone-feature-block', block: block %}
        {% endcase %}
      {% endfor %}
    </div>
  {% endif %}
</section>

{% schema %}
{
  "name": "Hero Section",
  "settings": [
    {
      "type": "text",
      "id": "title",
      "label": "Title",
      "default": "Welcome to our store"
    },
    {
      "type": "text",
      "id": "subtitle",
      "label": "Subtitle",
      "default": ""
    },
    {
      "type": "url",
      "id": "cta_link",
      "label": "CTA Link",
      "default": "/"
    },
    {
      "type": "text",
      "id": "cta_text",
      "label": "CTA Text",
      "default": "Shop Now"
    }
  ],
  "blocks": [
    {
      "type": "feature",
      "name": "Feature",
      "settings": [
        {
          "type": "text",
          "id": "title",
          "label": "Feature Title",
          "default": ""
        }
      ]
    }
  ],
  "presets": [
    {
      "name": "Hero",
      "settings": {},
      "blocks": []
    }
  ]
}
{% endschema %}
```

**Key rules:**
- Sections MUST have a `{% schema %}` block
- Schema MUST include `name`, `settings`, `blocks`, and `presets`
- Sections can be theme-level (in `/sections/`) or section-specific (defined in schema)
- Reusable blocks should be in `/blocks/` and referenced by `type`
- Section-specific blocks are defined inline in the section's schema
- Use sensible defaults that match the reference design
- Use `{% render %}` (not `{% include %}`) to call snippets — it provides better isolation
- Add `data-section-id="{{ section.id }}"` to the root element for JavaScript targeting

### Blocks

Blocks are repeating content elements within a section. They can be theme-level (reusable) or section-specific.

**Theme-level blocks** — Located in `blocks/` directory:
```
blocks/sandstone-feature.liquid
blocks/sandstone-testimonial.liquid
```

These are referenced by `type` in multiple sections.

**Section-specific blocks** — Defined inline in the section's `{% schema %}`:
```json
"blocks": [
  {
    "type": "feature",
    "name": "Feature",
    "settings": [...]
  }
]
```

Use theme-level blocks when the same content type appears in multiple sections. Use section-specific blocks when the block is only used in one section.

### Snippets

Snippets are reusable markup patterns. Use them to avoid repetition.

**Location:** `snippets/{prefix}<name>.liquid`

**Example:**
```liquid
{% comment %}
  Renders a button with consistent styling
  Usage: {% render 'sandstone-button', text: 'Click me', href: '/', variant: 'primary' %}
{% endcomment %}

<a href="{{ href }}" class="sandstone-button sandstone-button--{{ variant }}">
  {{ text }}
</a>
```

**Key rules:**
- Use `{% render %}` to call snippets (provides scope isolation)
- Document the expected parameters in a comment at the top
- Keep snippets focused on a single pattern
- Snippets are the DRY solution for repeated markup

## Section and Block Settings

Every piece of content must be configurable via settings. Do not hardcode text, images, colors, or links.

### Setting Types

Use the appropriate setting type for each piece of content:

| Type | Use for |
|------|---------|
| `text` | Short text (title, label, button text) |
| `richtext` | Longer text with formatting (description, paragraph) |
| `textarea` | Multi-line plain text |
| `image_picker` | Image selection |
| `url` | Links (CTA, product link) |
| `select` | Choose from predefined options (layout, size, variant) |
| `checkbox` | True/false flags (show section, enable feature) |
| `range` | Numeric values (quantity, size) |
| `color` | Color selection |
| `color_scheme` | Pre-defined color scheme selection |
| `font_picker` | Font selection |

### Repeating Content (Use Blocks)

If a section displays a list of items (testimonials, features, team members), use blocks instead of hardcoded arrays.

**Correct approach:**
```liquid
<div class="sandstone-testimonials">
  {% for block in section.blocks %}
    <div class="sandstone-testimonials__item">
      <p>{{ block.settings.quote }}</p>
      <p class="sandstone-testimonials__author">{{ block.settings.author }}</p>
    </div>
  {% endfor %}
</div>

{% schema %}
{
  "name": "Testimonials",
  "blocks": [
    {
      "type": "testimonial",
      "name": "Testimonial",
      "settings": [
        {
          "type": "richtext",
          "id": "quote",
          "label": "Quote"
        },
        {
          "type": "text",
          "id": "author",
          "label": "Author"
        }
      ]
    }
  ]
}
{% endschema %}
```

**Incorrect approach (don't do this):**
```liquid
<!-- WRONG: hardcoded testimonials -->
<div class="testimonials">
  <div>
    <p>"Great product!"</p>
    <p>John Doe</p>
  </div>
  <div>
    <p>"Highly recommend"</p>
    <p>Jane Smith</p>
  </div>
</div>
```

### Grouping Settings

Organize related settings into logical groups:

```json
"settings": [
  {
    "type": "header",
    "content": "Content"
  },
  {
    "type": "text",
    "id": "title",
    "label": "Title"
  },
  {
    "type": "richtext",
    "id": "description",
    "label": "Description"
  },
  {
    "type": "header",
    "content": "Design"
  },
  {
    "type": "select",
    "id": "text_alignment",
    "label": "Text Alignment",
    "options": [
      {"value": "left", "label": "Left"},
      {"value": "center", "label": "Center"},
      {"value": "right", "label": "Right"}
    ]
  }
]
```

Use `header` type to visually separate setting groups.

### Default Values

Provide defaults that match the reference design:

```json
{
  "type": "text",
  "id": "title",
  "label": "Title",
  "default": "Section Title"
}
```

Merchants should see something sensible if they add a section without editing it.

## Where NOT to Put Things

Understand the anti-patterns to avoid:

**Don't scatter custom CSS across random section files:**
- All component styling goes in Layer 4 (`{prefix}primitives.css`)
- Section files should have minimal CSS (Layer 5 only in rare cases)
- If multiple sections need the same styling, it's a primitive

**Don't put global styles in individual section {% stylesheet %} tags:**
- Global styles go in Layers 1-3
- Section stylesheets are for section-specific needs only
- Horizon should be compiled, not scattered across sections

**Don't duplicate markup across sections:**
- Repeated HTML should be a snippet
- If a button pattern is used 5 times, create a snippet for it
- Use `{% render 'snippet-name' %}` to include snippets

**Don't hardcode colors/fonts:**
- Colors must be settings (Layer 1) or tokens (Layer 2)
- Fonts must be settings (Layer 1) or tokens (Layer 2)
- No hardcoded hex colors or font names in CSS

**Don't create section-specific CSS for things that should be primitives:**
- Example: You style a button one way in the hero section and differently in a feature section
- Instead: Create button variants in primitives (primary, secondary, outline) and use the right variant in each section
- Primitives should be sufficiently flexible to handle all use cases

**Don't fork native Horizon sections:**
- Native sections: main-collection, main-cart, product-information, search-results
- Instead of forking, use CSS overrides in `{prefix}primitives.css` scoped under `#MainContent`
- This preserves native Shopify functionality (filters, cart, variants, search)

## Styling Horizon Default Sections

Horizon comes with native sections (main-collection, main-cart, main-product-information, main-search-results, etc.). Do NOT create custom versions of these.

Instead, style them using CSS overrides in the primitives file:

```css
/* In assets/sandstone-primitives.css */

#MainContent .main-product {
  /* Customize the default product section */
}

#MainContent .main-product h1 {
  font-family: var(--font-heading);
  font-size: var(--font-size-2xl);
}

#MainContent .main-product__price {
  color: var(--color-primary);
  font-weight: var(--font-weight-bold);
}
```

**Key rules:**
- Scope all overrides under `#MainContent`
- Use ID selectors to ensure specificity
- Do NOT modify the native section files
- This approach keeps native Shopify functionality intact (filters, cart logic, search, variants, etc.)
- If a feature cannot be achieved without forking (e.g., adding a new field to product form), then fork becomes necessary — but this is rare

## Theme Settings Integration

Connect design tokens to theme settings so merchants can customize the design.

### Step 1: Add Settings to settings_schema.json

```json
{
  "name": "Design System",
  "settings": [
    {
      "type": "color",
      "id": "color_primary",
      "label": "Primary Color",
      "default": "#000000"
    },
    {
      "type": "select",
      "id": "heading_font",
      "label": "Heading Font",
      "options": [
        {"value": "georgia", "label": "Georgia"},
        {"value": "helvetica", "label": "Helvetica"}
      ],
      "default": "georgia"
    }
  ]
}
```

### Step 2: Reference Settings in Liquid

In `theme.liquid` or a stylesheet snippet:

```liquid
<style>
  :root {
    --color-primary: {{ settings.color_primary }};
    --font-heading: "{{ settings.heading_font }}";
  }
</style>
```

Or in a dedicated tokens CSS file:

```css
:root {
  --color-primary: {{ settings.color_primary }};
  --font-heading: "{{ settings.heading_font }}";
}
```

### Step 3: Use Tokens in CSS

All CSS uses the tokens:

```css
.sandstone-button {
  background-color: var(--color-primary);
  font-family: var(--font-heading);
}
```

**Merchant Experience:** When the merchant changes a setting in the theme customizer, the CSS token updates automatically, and all components using that token reflect the change immediately.

## File Location Reference Table

Use this table to determine where any file should live:

| What | Where | Example |
|------|-------|---------|
| Design tokens (CSS vars) | `assets/{prefix}tokens.css` | `assets/sandstone-tokens.css` |
| Base styles + utilities | `assets/{prefix}base.css` | `assets/sandstone-base.css` |
| Component primitives | `assets/{prefix}primitives.css` | `assets/sandstone-primitives.css` |
| Custom sections | `sections/{prefix}<name>.liquid` | `sections/sandstone-hero.liquid` |
| Theme-level blocks | `blocks/{prefix}<name>.liquid` | `blocks/sandstone-feature.liquid` |
| Shared snippets | `snippets/{prefix}<name>.liquid` | `snippets/sandstone-button.liquid` |
| Page templates | `templates/*.json` | `templates/home.json` |
| Theme settings schema | `config/settings_schema.json` | (standard location) |
| Theme settings values | `config/settings_data.json` | (standard location) |
| CSS loading order | `snippets/stylesheets.liquid` | (custom snippet) |
| Horizon core CSS | `assets/base.css` | (provided by Horizon) |
| Stylesheet linking | In `theme.liquid` or dedicated snippet | Registered in head |

When in doubt: If it's reusable, it's a snippet. If it's a visual component, it's in primitives. If it's a whole section, it's in sections. If it's configuration, it's a setting.

## Quick Checklist

When building a new component or section:

- [ ] Is there a setting for every piece of user content? (text, images, links, colors)
- [ ] Does the component use design tokens from Layer 2?
- [ ] Are all CSS classes prefixed with `{prefix}-`?
- [ ] Does the component follow BEM naming?
- [ ] Are all interaction states handled? (hover, focus, active, disabled)
- [ ] Is there a snippet for repeated markup patterns?
- [ ] Does the section schema have `name`, `settings`, `blocks`, and `presets`?
- [ ] Are default values sensible?
- [ ] Has this component been added to the design system reference page?
- [ ] Did I avoid Layer 5 (section-specific CSS) unless absolutely necessary?

