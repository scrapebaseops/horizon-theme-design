# Workflow 2: Phase 2 — Design System Extraction & Foundation

## Overview
Phase 2 builds a formalized, reusable design system from the proven clone pages. This design system will serve as the foundation for all real pages in Phase 4.

By the end of this phase, you will have:
- Formalized design tokens in Shopify settings and CSS
- Base styles (typography, spacing, layout)
- Component primitives (buttons, cards, forms, etc.)
- A design system reference page showcasing all components
- Clone pages refactored to use the design system (with maintained visual parity)

---

## Step 1: Formalize Design Tokens

### 1.1 Update Settings Schema

**Objective:** Add design system configuration to Shopify theme settings.

**Instructions:**

1. Open `config/settings_schema.json`

2. Add new setting groups for design system configuration. Follow this structure:

```json
{
  "name": "Design System",
  "settings": [
    {
      "type": "header",
      "content": "Typography"
    },
    {
      "type": "font_picker",
      "id": "type_heading_family",
      "label": "Heading Font"
    },
    {
      "type": "font_picker",
      "id": "type_body_family",
      "label": "Body Font"
    },
    {
      "type": "range",
      "id": "type_base_size",
      "label": "Base Font Size (px)",
      "min": 12,
      "max": 20,
      "step": 1,
      "default": 16
    },
    {
      "type": "header",
      "content": "Colors"
    },
    {
      "type": "color",
      "id": "color_primary",
      "label": "Primary Color"
    },
    {
      "type": "color",
      "id": "color_secondary",
      "label": "Secondary Color"
    },
    {
      "type": "color",
      "id": "color_text_primary",
      "label": "Text Primary"
    },
    {
      "type": "color",
      "id": "color_text_secondary",
      "label": "Text Secondary"
    },
    {
      "type": "color",
      "id": "color_background",
      "label": "Background"
    },
    {
      "type": "color",
      "id": "color_border",
      "label": "Border Color"
    },
    {
      "type": "color",
      "id": "color_success",
      "label": "Success Color"
    },
    {
      "type": "color",
      "id": "color_error",
      "label": "Error Color"
    },
    {
      "type": "color",
      "id": "color_warning",
      "label": "Warning Color"
    },
    {
      "type": "header",
      "content": "Spacing"
    },
    {
      "type": "range",
      "id": "spacing_base",
      "label": "Base Spacing Unit (px)",
      "min": 4,
      "max": 16,
      "step": 1,
      "default": 8
    },
    {
      "type": "header",
      "content": "Borders & Shadows"
    },
    {
      "type": "range",
      "id": "border_radius_base",
      "label": "Default Border Radius (px)",
      "min": 0,
      "max": 20,
      "step": 1,
      "default": 8
    },
    {
      "type": "checkbox",
      "id": "enable_shadows",
      "label": "Enable Shadows on Cards",
      "default": true
    }
  ]
}
```

3. **Use the token categories from Phase 1's design-tokens-map.md:**
   - Add settings for all typography values (heading fonts, body font, sizes)
   - Add settings for all color values (primary, secondary, text, backgrounds, status colors)
   - Add settings for spacing scale values
   - Add settings for border radius values
   - Add settings for shadow options

4. **Default values** should match the design tokens extracted in Phase 1.

### 1.2 Create CSS Custom Properties File

**Objective:** Convert settings into CSS custom properties for use throughout the theme.

**Instructions:**

1. Create file: `assets/design-tokens.css`

2. Structure the file with Liquid variables that read from settings:

```liquid
<!-- In assets/design-tokens.css -->

:root {
  {%- comment -%}
  Typography Tokens
  {%- endcomment -%}
  --type-heading-family: {{ settings.type_heading_family | font_url | split: "/" | first }};
  --type-body-family: {{ settings.type_body_family | font_url | split: "/" | first }};
  --type-base-size: {{ settings.type_base_size }}px;

  {%- comment -%}
  Color Tokens
  {%- endcomment -%}
  --color-primary: {{ settings.color_primary }};
  --color-secondary: {{ settings.color_secondary }};
  --color-text-primary: {{ settings.color_text_primary }};
  --color-text-secondary: {{ settings.color_text_secondary }};
  --color-background: {{ settings.color_background }};
  --color-border: {{ settings.color_border }};
  --color-success: {{ settings.color_success }};
  --color-error: {{ settings.color_error }};
  --color-warning: {{ settings.color_warning }};

  {%- comment -%}
  Spacing Tokens
  {%- endcomment -%}
  --spacing-xs: calc({{ settings.spacing_base }}px * 0.5);
  --spacing-sm: {{ settings.spacing_base }}px;
  --spacing-base: calc({{ settings.spacing_base }}px * 2);
  --spacing-md: calc({{ settings.spacing_base }}px * 3);
  --spacing-lg: calc({{ settings.spacing_base }}px * 4);
  --spacing-xl: calc({{ settings.spacing_base }}px * 6);
  --spacing-2xl: calc({{ settings.spacing_base }}px * 8);

  {%- comment -%}
  Border Radius Tokens
  {%- endcomment -%}
  --border-radius-sm: calc({{ settings.border_radius_base }}px * 0.5);
  --border-radius-base: {{ settings.border_radius_base }}px;
  --border-radius-lg: calc({{ settings.border_radius_base }}px * 1.5);
  --border-radius-full: 9999px;

  {%- comment -%}
  Shadow Tokens
  {%- endcomment -%}
  {%- if settings.enable_shadows -%}
    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
    --shadow-base: 0 1px 3px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
  {%- else -%}
    --shadow-sm: none;
    --shadow-base: none;
    --shadow-lg: none;
  {%- endif -%}

  {%- comment -%}
  Typography Scale
  {%- endcomment -%}
  --type-h1: calc(var(--type-base-size) * 3);
  --type-h2: calc(var(--type-base-size) * 2.25);
  --type-h3: calc(var(--type-base-size) * 1.875);
  --type-h4: calc(var(--type-base-size) * 1.5);
  --type-body: var(--type-base-size);
  --type-small: calc(var(--type-base-size) * 0.875);
}
```

3. **Load this file in your theme's main stylesheet** or add to `theme.liquid`:
   - Include in the `<head>` section:
   ```liquid
   {{ 'design-tokens.css' | asset_url | stylesheet_tag }}
   ```

4. **Ensure load order:** design-tokens.css must load before any CSS that uses the variables.

### 1.3 Wire Settings → Liquid Variables → CSS

**Objective:** Create a system for accessing tokens throughout the theme.

**Instructions:**

1. Update `theme.liquid` to expose token values to Liquid:

```liquid
{% assign token_color_primary = settings.color_primary %}
{% assign token_color_secondary = settings.color_secondary %}
{% assign token_spacing_base = settings.spacing_base %}
{%- comment -%} etc. {%- endcomment -%}
```

2. Alternatively, create a snippet `snippets/design-tokens.liquid` that centralizes all token assignments:

```liquid
{%- comment -%}
Design Tokens
This snippet makes all design tokens available as Liquid variables
Include this at the top of theme.liquid
{%- endcomment -%}

{%- assign token_color_primary = settings.color_primary -%}
{%- assign token_color_secondary = settings.color_secondary -%}
{%- assign token_color_text_primary = settings.color_text_primary -%}
{%- assign token_spacing_base = settings.spacing_base -%}
{%- assign token_border_radius = settings.border_radius_base -%}

{%- comment -%}
Typography tokens are accessed via settings directly
{%- endcomment -%}
```

3. In `theme.liquid`, include this snippet:
```liquid
{% include 'design-tokens' %}
```

4. Now sections can use tokens like:
```liquid
<div style="color: {{ token_color_primary }}; padding: var(--spacing-base);">
  <!-- content -->
</div>
```

### 1.4 Verify Token Application

**Objective:** Ensure tokens are working correctly.

**Instructions:**

1. After wiring settings → Liquid → CSS, test one clone page:
   - Open the clone page in Shopify admin
   - Change a color setting (e.g., Primary Color)
   - Refresh the storefront
   - Verify that color changed on the page

2. Change a spacing setting and verify it updates.

3. Change a font setting and verify it applies.

4. **Important:** Clone pages should still look identical to their reference versions after this wiring. If not, debug:
   - Check that default settings match the extracted tokens
   - Verify CSS variables are calculating correctly
   - Check that all sections are using the new tokens

---

## Step 2: Build Base Styles

### 2.1 Create Base Styles File

**Objective:** Establish foundation styles for all pages.

**Instructions:**

1. Create file: `assets/base.css`

2. **Include the following sections:**

#### **Reset/Normalize:**
```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: var(--type-base-size);
}

body {
  font-family: var(--type-body-family);
  color: var(--color-text-primary);
  background-color: var(--color-background);
  line-height: 1.6;
}
```

#### **Typography Helpers:**
```css
/* Heading Styles */
h1, .h1 {
  font-family: var(--type-heading-family);
  font-size: var(--type-h1);
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: var(--spacing-md);
}

h2, .h2 {
  font-family: var(--type-heading-family);
  font-size: var(--type-h2);
  font-weight: 700;
  line-height: 1.3;
  margin-bottom: var(--spacing-base);
}

h3, .h3 {
  font-family: var(--type-heading-family);
  font-size: var(--type-h3);
  font-weight: 600;
  line-height: 1.4;
  margin-bottom: var(--spacing-base);
}

h4, .h4 {
  font-family: var(--type-heading-family);
  font-size: var(--type-h4);
  font-weight: 600;
  line-height: 1.5;
  margin-bottom: var(--spacing-sm);
}

/* Body Text */
p {
  margin-bottom: var(--spacing-base);
}

small, .small {
  font-size: var(--type-small);
}

/* Text Colors */
.text-primary {
  color: var(--color-text-primary);
}

.text-secondary {
  color: var(--color-text-secondary);
}

a {
  color: var(--color-primary);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
```

#### **Spacing Utilities:**
```css
/* Margin utilities */
.m-xs { margin: var(--spacing-xs); }
.m-sm { margin: var(--spacing-sm); }
.m-base { margin: var(--spacing-base); }
.m-md { margin: var(--spacing-md); }
.m-lg { margin: var(--spacing-lg); }

.mb-xs { margin-bottom: var(--spacing-xs); }
.mb-sm { margin-bottom: var(--spacing-sm); }
.mb-base { margin-bottom: var(--spacing-base); }
.mb-md { margin-bottom: var(--spacing-md); }
.mb-lg { margin-bottom: var(--spacing-lg); }

.mt-xs { margin-top: var(--spacing-xs); }
.mt-sm { margin-top: var(--spacing-sm); }
.mt-base { margin-top: var(--spacing-base); }
.mt-md { margin-top: var(--spacing-md); }
.mt-lg { margin-top: var(--spacing-lg); }

/* Padding utilities */
.p-xs { padding: var(--spacing-xs); }
.p-sm { padding: var(--spacing-sm); }
.p-base { padding: var(--spacing-base); }
.p-md { padding: var(--spacing-md); }
.p-lg { padding: var(--spacing-lg); }

/* Gap utilities (for flex/grid) */
.gap-xs { gap: var(--spacing-xs); }
.gap-sm { gap: var(--spacing-sm); }
.gap-base { gap: var(--spacing-base); }
.gap-md { gap: var(--spacing-md); }
.gap-lg { gap: var(--spacing-lg); }
```

#### **Layout Containers:**
```css
/* Container widths */
.container-narrow {
  max-width: 600px;
  margin: 0 auto;
  padding: 0 var(--spacing-base);
}

.container-default {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-base);
}

.container-wide {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 var(--spacing-base);
}

.container-full {
  width: 100%;
  padding: 0 var(--spacing-base);
}

.container-full-bleed {
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
}

/* Section spacing */
section {
  padding-top: var(--spacing-xl);
  padding-bottom: var(--spacing-xl);
}

section.section-compact {
  padding-top: var(--spacing-lg);
  padding-bottom: var(--spacing-lg);
}

section.section-large {
  padding-top: var(--spacing-2xl);
  padding-bottom: var(--spacing-2xl);
}
```

#### **Prose/Rich Text:**
```css
.prose {
  font-size: var(--type-body);
  line-height: 1.8;
}

.prose h1,
.prose h2,
.prose h3 {
  margin-top: var(--spacing-lg);
  margin-bottom: var(--spacing-base);
}

.prose p {
  margin-bottom: var(--spacing-base);
}

.prose ul,
.prose ol {
  margin-left: var(--spacing-md);
  margin-bottom: var(--spacing-base);
}

.prose li {
  margin-bottom: var(--spacing-sm);
}

.prose blockquote {
  border-left: 4px solid var(--color-primary);
  padding-left: var(--spacing-base);
  margin-left: 0;
  margin-bottom: var(--spacing-base);
  font-style: italic;
}

.prose img {
  max-width: 100%;
  height: auto;
  margin-bottom: var(--spacing-base);
}
```

3. **Load base.css in theme.liquid** (after design-tokens.css):
```liquid
{{ 'base.css' | asset_url | stylesheet_tag }}
```

---

## Step 3: Build Component Primitives

### 3.1 Create Primitives CSS File

**Objective:** Build reusable component styles from the design system.

**Instructions:**

1. Create file: `assets/primitives.css`

2. **Build primitives in this order** (most used first):
   - Buttons
   - Cards
   - Forms
   - Lists
   - Badges/Chips
   - Alerts
   - Modals/Drawers
   - Tabs/Accordions
   - Breadcrumbs
   - Pagination

### 3.2 Build Each Primitive

**Pattern for each primitive:**

1. **Code the primitive in primitives.css**
2. **Test it by refactoring a clone section** to use it
3. **Take a screenshot** and compare against reference
4. **Move to next primitive only if match is perfect**

**Example: Buttons**

```css
/* Button Primitives */

/* Base button */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: var(--type-body);
  font-weight: 600;
  border: 2px solid transparent;
  border-radius: var(--border-radius-base);
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  white-space: nowrap;
}

/* Variants */
.btn-primary {
  background-color: var(--color-primary);
  color: white;
}

.btn-primary:hover {
  opacity: 0.9;
  transform: translateY(-2px);
  box-shadow: var(--shadow-base);
}

.btn-primary:active {
  transform: translateY(0);
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.btn-secondary {
  background-color: var(--color-secondary);
  color: white;
}

.btn-secondary:hover {
  opacity: 0.9;
}

.btn-outline {
  background-color: transparent;
  color: var(--color-primary);
  border-color: var(--color-primary);
}

.btn-outline:hover {
  background-color: var(--color-primary);
  color: white;
}

.btn-ghost {
  background-color: transparent;
  color: var(--color-text-primary);
  border-color: var(--color-border);
}

.btn-ghost:hover {
  background-color: var(--color-background);
}

.btn-link {
  background-color: transparent;
  color: var(--color-primary);
  padding: 0;
  border: none;
  border-radius: 0;
}

.btn-link:hover {
  text-decoration: underline;
  box-shadow: none;
  transform: none;
}

/* Sizes */
.btn-sm {
  padding: calc(var(--spacing-sm) * 0.5) var(--spacing-sm);
  font-size: var(--type-small);
}

.btn-lg {
  padding: var(--spacing-md) var(--spacing-lg);
  font-size: 18px;
}

.btn-full {
  width: 100%;
}
```

**Testing the buttons primitive:**

1. In a clone section, replace any button HTML with:
```html
<a href="#" class="btn btn-primary">Add to Cart</a>
<a href="#" class="btn btn-secondary">Shop More</a>
<a href="#" class="btn btn-outline">Learn More</a>
<a href="#" class="btn btn-ghost">Cancel</a>
```

2. Screenshot the clone section at all 3 viewports
3. Compare against the reference
4. If not matching, adjust `primitives.css`
5. If matching, move to the next primitive

**Example: Cards**

```css
/* Card Primitives */

.card {
  background-color: white;
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-base);
  padding: var(--spacing-base);
  transition: all 0.2s ease;
}

.card:hover {
  box-shadow: var(--shadow-base);
  border-color: var(--color-primary);
}

.card-image {
  width: 100%;
  height: auto;
  border-radius: var(--border-radius-sm);
  margin-bottom: var(--spacing-base);
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-title {
  font-size: var(--type-h4);
  font-weight: 700;
  margin-bottom: var(--spacing-sm);
}

.card-description {
  font-size: var(--type-small);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-base);
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: var(--spacing-base);
  border-top: 1px solid var(--color-border);
}

.card-price {
  font-size: var(--type-h4);
  font-weight: 700;
  color: var(--color-primary);
}
```

**Continue building primitives** for all the common components needed by your design. For each:
1. Code it in `primitives.css`
2. Update a clone section to use it
3. Screenshot and verify visual parity
4. Move on

### 3.3 Add Horizon Section Overrides

**Objective:** Override native Horizon section styles to match your design system.

**Instructions:**

1. Create file: `assets/horizon-overrides.css`

2. For any native Horizon sections used in clone pages, add overrides:

```css
/* Horizon Product Section Override */
#MainContent .section-product h1 {
  font-family: var(--type-heading-family);
  font-size: var(--type-h1);
  color: var(--color-text-primary);
}

#MainContent .product-form .btn {
  /* Reuse primitive button styles */
  background-color: var(--color-primary);
  padding: var(--spacing-sm) var(--spacing-md);
}
```

3. Load this file in theme.liquid after primitives.css

---

## Step 4: Build Design System Reference Page

### 4.1 Create Design System Template

**Objective:** Build a showcase page for all design system components.

**Instructions:**

1. Create file: `templates/page.design-system.json`

2. Structure it with multiple section types:

```json
{
  "sections": {
    "hero": {
      "type": "design-system-hero",
      "settings": {}
    },
    "typography": {
      "type": "design-system-typography",
      "settings": {}
    },
    "colors": {
      "type": "design-system-colors",
      "settings": {}
    },
    "buttons": {
      "type": "design-system-buttons",
      "settings": {}
    },
    "cards": {
      "type": "design-system-cards",
      "settings": {}
    },
    "forms": {
      "type": "design-system-forms",
      "settings": {}
    },
    "components": {
      "type": "design-system-components",
      "settings": {}
    }
  },
  "order": [
    "hero",
    "typography",
    "colors",
    "buttons",
    "cards",
    "forms",
    "components"
  ]
}
```

### 4.2 Build Design System Sections

**Objective:** Create sections that display design system components.

**Instructions:**

1. **Typography Showcase Section** (`sections/design-system-typography.liquid`):

```liquid
<section class="design-system-section">
  <div class="container-default">
    <h2>Typography</h2>

    <div class="type-samples">
      <div class="type-sample">
        <h1 class="h1">Heading 1</h1>
        <p class="type-info">h1 or .h1</p>
      </div>

      <div class="type-sample">
        <h2 class="h2">Heading 2</h2>
        <p class="type-info">h2 or .h2</p>
      </div>

      <div class="type-sample">
        <h3 class="h3">Heading 3</h3>
        <p class="type-info">h3 or .h3</p>
      </div>

      <div class="type-sample">
        <h4 class="h4">Heading 4</h4>
        <p class="type-info">h4 or .h4</p>
      </div>

      <div class="type-sample">
        <p class="body">This is body text. It should be readable and comfortable at the default size.</p>
        <p class="type-info">p or .body</p>
      </div>

      <div class="type-sample">
        <p class="small">This is small text for captions and supplementary information.</p>
        <p class="type-info">small or .small</p>
      </div>
    </div>
  </div>
</section>

<style>
  .design-system-section {
    padding: var(--spacing-xl) 0;
    border-bottom: 1px solid var(--color-border);
  }

  .type-samples {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--spacing-lg);
    margin-top: var(--spacing-lg);
  }

  .type-sample {
    padding: var(--spacing-base);
    background-color: white;
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-base);
  }

  .type-info {
    font-size: var(--type-small);
    color: var(--color-text-secondary);
    margin-top: var(--spacing-sm);
  }
</style>
```

2. **Color Showcase Section** (`sections/design-system-colors.liquid`):

```liquid
<section class="design-system-section">
  <div class="container-default">
    <h2>Colors</h2>

    <div class="color-grid">
      <div class="color-item">
        <div class="color-swatch" style="background-color: {{ settings.color_primary }}"></div>
        <p class="color-label">Primary</p>
        <p class="color-code">{{ settings.color_primary }}</p>
      </div>

      <div class="color-item">
        <div class="color-swatch" style="background-color: {{ settings.color_secondary }}"></div>
        <p class="color-label">Secondary</p>
        <p class="color-code">{{ settings.color_secondary }}</p>
      </div>

      <div class="color-item">
        <div class="color-swatch" style="background-color: {{ settings.color_success }}"></div>
        <p class="color-label">Success</p>
        <p class="color-code">{{ settings.color_success }}</p>
      </div>

      <div class="color-item">
        <div class="color-swatch" style="background-color: {{ settings.color_error }}"></div>
        <p class="color-label">Error</p>
        <p class="color-code">{{ settings.color_error }}</p>
      </div>
    </div>
  </div>
</section>

<style>
  .color-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: var(--spacing-lg);
    margin-top: var(--spacing-lg);
  }

  .color-swatch {
    width: 100%;
    height: 150px;
    border-radius: var(--border-radius-base);
    border: 1px solid var(--color-border);
  }

  .color-label {
    font-weight: 600;
    margin-top: var(--spacing-sm);
  }

  .color-code {
    font-size: var(--type-small);
    color: var(--color-text-secondary);
    font-family: monospace;
  }
</style>
```

3. **Buttons Showcase Section** (`sections/design-system-buttons.liquid`):

```liquid
<section class="design-system-section">
  <div class="container-default">
    <h2>Buttons</h2>

    <div class="button-grid">
      <div class="button-group">
        <h4>Primary</h4>
        <button class="btn btn-primary">Primary Button</button>
        <button class="btn btn-primary" disabled>Disabled</button>
      </div>

      <div class="button-group">
        <h4>Secondary</h4>
        <button class="btn btn-secondary">Secondary Button</button>
        <button class="btn btn-secondary" disabled>Disabled</button>
      </div>

      <div class="button-group">
        <h4>Outline</h4>
        <button class="btn btn-outline">Outline Button</button>
        <button class="btn btn-outline" disabled>Disabled</button>
      </div>

      <div class="button-group">
        <h4>Ghost</h4>
        <button class="btn btn-ghost">Ghost Button</button>
        <button class="btn btn-ghost" disabled>Disabled</button>
      </div>

      <div class="button-group">
        <h4>Sizes</h4>
        <button class="btn btn-primary btn-sm">Small</button>
        <button class="btn btn-primary">Default</button>
        <button class="btn btn-primary btn-lg">Large</button>
      </div>
    </div>
  </div>
</section>

<style>
  .button-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--spacing-lg);
    margin-top: var(--spacing-lg);
  }

  .button-group {
    padding: var(--spacing-base);
    background-color: white;
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-base);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
  }

  .button-group h4 {
    margin: 0;
  }
</style>
```

4. **Cards Showcase Section** (`sections/design-system-cards.liquid`):

```liquid
<section class="design-system-section">
  <div class="container-default">
    <h2>Cards</h2>

    <div class="card-grid">
      <div class="card">
        <img src="https://via.placeholder.com/300x200" alt="Sample" class="card-image">
        <h4 class="card-title">Card Title</h4>
        <p class="card-description">This is a card component with an image, title, description, and button.</p>
        <div class="card-footer">
          <span class="card-price">$99.00</span>
          <button class="btn btn-primary btn-sm">Buy</button>
        </div>
      </div>

      <div class="card">
        <img src="https://via.placeholder.com/300x200" alt="Sample" class="card-image">
        <h4 class="card-title">Another Card</h4>
        <p class="card-description">Cards can be used for product listings, testimonials, team members, and more.</p>
        <div class="card-footer">
          <span class="card-price">$149.00</span>
          <button class="btn btn-primary btn-sm">Buy</button>
        </div>
      </div>

      <div class="card">
        <img src="https://via.placeholder.com/300x200" alt="Sample" class="card-image">
        <h4 class="card-title">Card With Badge</h4>
        <p class="card-description">Cards can include badges and other decorative elements.</p>
        <div class="card-footer">
          <span class="card-price">$199.00</span>
          <button class="btn btn-primary btn-sm">Buy</button>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--spacing-lg);
    margin-top: var(--spacing-lg);
  }
</style>
```

5. **Add any other component showcase sections** (forms, alerts, badges, etc.) following the same pattern.

---

## Step 5: Refactor Clone Pages to Use Design System

### 5.1 Refactor One Clone Page at a Time

**Objective:** Update clone pages to use design system tokens and primitives while maintaining visual parity.

**Instructions:**

1. Pick the first clone page (usually homepage)

2. Go through each section in the clone page and:
   - Replace any hardcoded colors with CSS variables
   - Replace button styles with `.btn` and variant classes
   - Replace card styles with `.card` and related classes
   - Replace spacing with utility classes (`.m-base`, `.p-lg`, etc.)
   - Replace layout containers with `.container-default`, `.container-wide`, etc.

3. **Example refactoring:**

   **Before:**
   ```liquid
   <button style="background: #2563EB; padding: 12px 24px; border-radius: 8px; color: white;">
     Add to Cart
   </button>
   ```

   **After:**
   ```liquid
   <button class="btn btn-primary">Add to Cart</button>
   ```

4. **For each refactored section:**
   - Take a screenshot at all 3 viewports
   - Compare against the reference
   - Ensure visual parity is maintained
   - If anything looks different, adjust the primitive or the section

5. **Continue with all clone pages** until all use the design system.

### 5.2 Extract Repeated Patterns into Snippets

**Objective:** Reduce code duplication by creating reusable snippets.

**Instructions:**

1. Look for patterns that repeat across multiple sections:
   - Product card layout
   - Form group structure
   - Feature item (icon + title + description)
   - Button group

2. For each pattern, create a snippet:

   **Example: Product Card Snippet** (`snippets/product-card.liquid`):
   ```liquid
   {%- assign product = include.product -%}

   <div class="card">
     <div class="card-image">
       <img src="{{ product.image | img_url: '300x' }}" alt="{{ product.title }}">
     </div>
     <h4 class="card-title">{{ product.title }}</h4>
     <p class="card-description">{{ product.description | strip_html | truncatewords: 15 }}</p>
     <div class="card-footer">
       <span class="card-price">{{ product.price | money }}</span>
       <a href="{{ product.url }}" class="btn btn-primary btn-sm">Shop</a>
     </div>
   </div>
   ```

3. Use it in sections:
   ```liquid
   {%- for product in collection.products -%}
     {%- include 'product-card', product: product -%}
   {%- endfor -%}
   ```

### 5.3 Verify Settings are Proper

**Objective:** Ensure all content is configurable via settings.

**Instructions:**

1. For each clone section, check:
   - Are section headings configurable via settings?
   - Are colors configurable via settings (or using design system)?
   - Are images configurable via settings?
   - Are button labels configurable via settings?

2. Add settings schema to sections where needed:

```json
{
  "name": "Section Name",
  "settings": [
    {
      "type": "text",
      "id": "heading",
      "label": "Section Heading"
    },
    {
      "type": "image_picker",
      "id": "bg_image",
      "label": "Background Image"
    }
  ]
}
```

---

## Step 6: Verification Checklist

**Objective:** Ensure Phase 2 is complete and correct.

**Before moving to Phase 3, verify:**

- [ ] All design tokens are in `config/settings_schema.json`
- [ ] All tokens have default values matching the extracted design
- [ ] `assets/design-tokens.css` loads and applies tokens correctly
- [ ] Changing a theme setting (color, font, etc.) updates the page
- [ ] `assets/base.css` includes typography, spacing, and layout utilities
- [ ] `assets/primitives.css` includes all needed components (buttons, cards, forms, etc.)
- [ ] All primitives have been tested by refactoring clone sections
- [ ] `templates/page.design-system.json` and sections exist
- [ ] Design system reference page displays all components correctly
- [ ] All clone pages have been refactored to use design system
- [ ] All clone pages still match their reference screenshots at all 3 viewports
- [ ] Code follows code-architecture skill (no CSS in wrong places)
- [ ] Horizon section overrides are in place and working

---

## Next Steps

Once all verification items pass, move to **Phase 3: Gap Analysis & Fill**.
