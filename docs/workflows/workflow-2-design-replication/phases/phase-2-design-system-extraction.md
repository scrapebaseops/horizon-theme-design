# Workflow 2: Phase 2 — Design System Extraction & Foundation

## Overview
Phase 2 builds a formalized, reusable design system from the proven clone pages. This design system will serve as the foundation for all real pages in Phase 4.

By the end of this phase, you will have:
- Formalized design tokens in Shopify settings and CSS
- Base styles (typography, spacing, layout)
- Component primitives (buttons, cards, forms, etc.)
- A design system reference page showcasing all components
- Clone pages refactored to use the design system (with maintained visual parity)

### Naming Convention

All files and CSS classes created in this phase use the project prefix from `THEME_ROOT/.workflow/prefix.txt`. Examples below use `{prefix}` as a placeholder — replace with your actual prefix (e.g., `lxn-`).

- Token file: `assets/{prefix}tokens.css`
- Base styles: `assets/{prefix}base.css`
- Primitives: `assets/{prefix}primitives.css`
- CSS classes: `.{prefix}btn`, `.{prefix}card`, `.{prefix}container`
- BEM modifiers: `.{prefix}btn--primary`, `.{prefix}card__title`
- Design system sections: `sections/{prefix}ds-typography.liquid`

---

## Step 1: Formalize Design Tokens

### 1.1 Update Settings Schema

**Objective:** Add design system configuration to Shopify theme settings.

**Instructions:**

1. Open `config/settings_schema.json`

2. **⚠️ Important: Audit Horizon's Existing Settings First**

   Before adding new settings, review what Horizon already provides in `settings_schema.json`. Horizon has its own typography, color, and layout settings. Do NOT duplicate these. Instead:
   - Map your extracted tokens to Horizon's existing settings where they match
   - Only add new settings for tokens that Horizon doesn't already cover
   - If Horizon has a setting that's close but not exact (e.g., it has "Body font" but you need more granular control), extend rather than duplicate
   - Document which Horizon settings you're reusing vs. which are new additions

   **Color Schemes vs. Flat Colors**

   Horizon uses a **color scheme system**, not flat color settings. Each scheme (e.g., "Scheme 1", "Scheme 2") contains a group of related colors: background, foreground/heading, foreground/body, primary, and button colors (background, text, border, hover states).

   Sections can then choose which scheme to use via a `color_scheme` setting, enabling merchants to create alternating light/dark sections.

   **Your approach:**
   1. Audit Horizon's existing color schemes in `settings_schema.json`
   2. Map your extracted design tokens to Horizon's scheme structure:
      - Reference "light mode" → update Scheme 1 defaults
      - Reference "dark mode" (if it exists) → update Scheme 2 defaults
      - Reference accent/alternate colors → create Scheme 3 if needed
   3. Set scheme defaults in `settings_data.json` to match the reference
   4. Do NOT create duplicate flat color settings (`color_primary`, `color_secondary`, etc.) alongside Horizon's schemes — use the scheme system
   5. Your design tokens CSS should read from scheme variables where available, and only define new custom properties for tokens Horizon doesn't cover (spacing scale, border radius, shadows, transition speeds, etc.)

3. Add new setting groups for design system configuration. Follow this structure:

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

4. **Use the token categories from Phase 1's design-tokens-map.md:**
   - Add settings for all typography values (heading fonts, body font, sizes)
   - Add settings for all color values (primary, secondary, text, backgrounds, status colors)
   - Add settings for spacing scale values
   - Add settings for border radius values
   - Add settings for shadow options

5. **Default values** should match the design tokens extracted in Phase 1.

### 1.2 Create Design Tokens Snippet

**Objective:** Convert settings into CSS custom properties for use throughout the theme.

**Instructions:**

1. Create file: `snippets/{prefix}tokens.liquid` (this must be a Liquid snippet, not a CSS file, because it contains Liquid template tags that need server-side processing)

2. Structure the file with Liquid variables that read from settings:

```liquid
<!-- In snippets/{prefix}tokens.liquid -->

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
  Transition Tokens
  {%- endcomment -%}
  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;
  --transition-slow: 400ms ease;

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

3. **Load this snippet in your theme's `<head>` section** in `theme.liquid`:
   ```liquid
   <style>
     {% render '{prefix}tokens' %}
   </style>
   ```

   **Important:** This must be a `<style>` tag rendering a snippet, NOT an asset stylesheet link, because it contains Liquid that must be processed server-side.

4. **Ensure load order:** This design-tokens snippet must load before any CSS that uses the variables.

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

2. Alternatively, create a snippet `snippets/{prefix}tokens.liquid` that centralizes all token assignments:

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

3. In `theme.liquid`, render this snippet:
```liquid
{% render '{prefix}tokens' %}
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

### 1.5 Set Default Values in settings_data.json

**Objective:** Ensure the theme launches with the reference design's values, not Horizon's defaults.

**Instructions:**

1. Open `config/settings_data.json`

2. For every design token setting you added or mapped in Step 1.1, set the default value to match the extracted design tokens from Phase 1:

   ```json
   {
     "current": {
       "color_primary": "#2563EB",
       "color_secondary": "#6366F1",
       "color_text_primary": "#111827",
       "type_base_size": 16,
       "spacing_base": 8,
       "border_radius_base": 8,
       "enable_shadows": true
     }
   }
   ```

3. **Critical:** The values in `settings_data.json` must match the design tokens extracted in Phase 1's `design-tokens-map.md`. This is what makes the theme look correct out of the box.

4. **Verify:** After updating, refresh the theme preview. The design should match the reference without any manual setting changes.

---

## Step 2: Build Base Styles

### 2.1 Create Base Styles File

**Objective:** Establish foundation styles for all pages.

**Instructions:**

1. Create file: `assets/{prefix}base.css`

2. **Include the following sections:**

#### **Reset/Normalize:**
```css
/*
 * Horizon-Aware Reset
 * Horizon has its own base styles. Only add what's missing or needs overriding.
 * Do NOT use a blanket * { margin: 0; padding: 0; } reset — it will break
 * native Horizon sections.
 */

/* Ensure border-box on custom elements only */
[class^="{prefix}custom-"],
[class^="{prefix}clone-"],
[class^="{prefix}ds-"] {
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
.{prefix}text-primary {
  color: var(--color-text-primary);
}

.{prefix}text-secondary {
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
.{prefix}m-xs { margin: var(--spacing-xs); }
.{prefix}m-sm { margin: var(--spacing-sm); }
.{prefix}m-base { margin: var(--spacing-base); }
.{prefix}m-md { margin: var(--spacing-md); }
.{prefix}m-lg { margin: var(--spacing-lg); }

.{prefix}mb-xs { margin-bottom: var(--spacing-xs); }
.{prefix}mb-sm { margin-bottom: var(--spacing-sm); }
.{prefix}mb-base { margin-bottom: var(--spacing-base); }
.{prefix}mb-md { margin-bottom: var(--spacing-md); }
.{prefix}mb-lg { margin-bottom: var(--spacing-lg); }

.{prefix}mt-xs { margin-top: var(--spacing-xs); }
.{prefix}mt-sm { margin-top: var(--spacing-sm); }
.{prefix}mt-base { margin-top: var(--spacing-base); }
.{prefix}mt-md { margin-top: var(--spacing-md); }
.{prefix}mt-lg { margin-top: var(--spacing-lg); }

/* Padding utilities */
.{prefix}p-xs { padding: var(--spacing-xs); }
.{prefix}p-sm { padding: var(--spacing-sm); }
.{prefix}p-base { padding: var(--spacing-base); }
.{prefix}p-md { padding: var(--spacing-md); }
.{prefix}p-lg { padding: var(--spacing-lg); }

/* Gap utilities (for flex/grid) */
.{prefix}gap-xs { gap: var(--spacing-xs); }
.{prefix}gap-sm { gap: var(--spacing-sm); }
.{prefix}gap-base { gap: var(--spacing-base); }
.{prefix}gap-md { gap: var(--spacing-md); }
.{prefix}gap-lg { gap: var(--spacing-lg); }
```

#### **Layout Containers:**
```css
/* Container widths */
.{prefix}container--narrow {
  max-width: 600px;
  margin: 0 auto;
  padding: 0 var(--spacing-base);
}

.{prefix}container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-base);
}

.{prefix}container--wide {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 var(--spacing-base);
}

.{prefix}container--full {
  width: 100%;
  padding: 0 var(--spacing-base);
}

.{prefix}container--full-bleed {
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

section.{prefix}section-compact {
  padding-top: var(--spacing-lg);
  padding-bottom: var(--spacing-lg);
}

section.{prefix}section-large {
  padding-top: var(--spacing-2xl);
  padding-bottom: var(--spacing-2xl);
}
```

#### **Prose/Rich Text:**
```css
.{prefix}prose {
  font-size: var(--type-body);
  line-height: 1.8;
}

.{prefix}prose h1,
.{prefix}prose h2,
.{prefix}prose h3 {
  margin-top: var(--spacing-lg);
  margin-bottom: var(--spacing-base);
}

.{prefix}prose p {
  margin-bottom: var(--spacing-base);
}

.{prefix}prose ul,
.{prefix}prose ol {
  margin-left: var(--spacing-md);
  margin-bottom: var(--spacing-base);
}

.{prefix}prose li {
  margin-bottom: var(--spacing-sm);
}

.{prefix}prose blockquote {
  border-left: 4px solid var(--color-primary);
  padding-left: var(--spacing-base);
  margin-left: 0;
  margin-bottom: var(--spacing-base);
  font-style: italic;
}

.{prefix}prose img {
  max-width: 100%;
  height: auto;
  margin-bottom: var(--spacing-base);
}
```

3. **Register in `snippets/stylesheets.liquid`** (Horizon's CSS registration point):

   Open `snippets/stylesheets.liquid` and add your design system stylesheets AFTER Horizon's `base.css`:

   ```liquid
   {%- comment -%} Design System Stylesheets {%- endcomment -%}
   {{ '{prefix}base.css' | asset_url | stylesheet_tag }}
   {{ '{prefix}primitives.css' | asset_url | stylesheet_tag }}
   ```

   For the design tokens (which contain Liquid), render them inline in `layout/theme.liquid` inside a `<style>` tag, BEFORE the `{% render 'stylesheets' %}` call:

   ```liquid
   <style>{% render '{prefix}tokens' %}</style>
   {%- render 'stylesheets' -%}
   ```

   **Why `snippets/stylesheets.liquid`?** This is Horizon's CSS registration point. Adding your stylesheets here keeps them organized alongside Horizon's own CSS and ensures correct load order.

---

## Step 3: Build Component Primitives

### 3.1 Create Primitives CSS File

**Objective:** Build reusable component styles from the design system.

**Instructions:**

1. Create file: `assets/{prefix}primitives.css`

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
.{prefix}btn {
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
  transition: all var(--transition-base);
  text-decoration: none;
  white-space: nowrap;
}

/* Variants */
.{prefix}btn--primary {
  background-color: var(--color-primary);
  color: white;
}

.{prefix}btn--primary:hover {
  opacity: 0.9;
  transform: translateY(-2px);
  box-shadow: var(--shadow-base);
}

.{prefix}btn--primary:active {
  transform: translateY(0);
}

.{prefix}btn--primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.{prefix}btn--secondary {
  background-color: var(--color-secondary);
  color: white;
}

.{prefix}btn--secondary:hover {
  opacity: 0.9;
}

.{prefix}btn--outline {
  background-color: transparent;
  color: var(--color-primary);
  border-color: var(--color-primary);
}

.{prefix}btn--outline:hover {
  background-color: var(--color-primary);
  color: white;
}

.{prefix}btn--ghost {
  background-color: transparent;
  color: var(--color-text-primary);
  border-color: var(--color-border);
}

.{prefix}btn--ghost:hover {
  background-color: var(--color-background);
}

.{prefix}btn--link {
  background-color: transparent;
  color: var(--color-primary);
  padding: 0;
  border: none;
  border-radius: 0;
}

.{prefix}btn--link:hover {
  text-decoration: underline;
  box-shadow: none;
  transform: none;
}

/* Sizes */
.{prefix}btn--sm {
  padding: calc(var(--spacing-sm) * 0.5) var(--spacing-sm);
  font-size: var(--type-small);
}

.{prefix}btn--lg {
  padding: var(--spacing-md) var(--spacing-lg);
  font-size: 18px;
}

.{prefix}btn--full {
  width: 100%;
}
```

**Testing the buttons primitive:**

1. In a clone section, replace any button HTML with:
```html
<a href="#" class="{prefix}btn {prefix}btn--primary">Add to Cart</a>
<a href="#" class="{prefix}btn {prefix}btn--secondary">Shop More</a>
<a href="#" class="{prefix}btn {prefix}btn--outline">Learn More</a>
<a href="#" class="{prefix}btn {prefix}btn--ghost">Cancel</a>
```

2. Screenshot the clone section at all 3 viewports
3. Compare against the reference
4. If not matching, adjust `primitives.css`
5. If matching, move to the next primitive

**Example: Cards**

```css
/* Card Primitives */

.{prefix}card {
  background-color: white;
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-base);
  padding: var(--spacing-base);
  transition: all var(--transition-base);
}

.{prefix}card:hover {
  box-shadow: var(--shadow-base);
  border-color: var(--color-primary);
}

.{prefix}card__image {
  width: 100%;
  height: auto;
  border-radius: var(--border-radius-sm);
  margin-bottom: var(--spacing-base);
  overflow: hidden;
}

.{prefix}card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.{prefix}card__title {
  font-size: var(--type-h4);
  font-weight: 700;
  margin-bottom: var(--spacing-sm);
}

.{prefix}card__desc {
  font-size: var(--type-small);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-base);
}

.{prefix}card__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: var(--spacing-base);
  border-top: 1px solid var(--color-border);
}

.{prefix}card__price {
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

1. Horizon section overrides go in `assets/{prefix}primitives.css`, scoped under `#MainContent`

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

3. Ensure all overrides are scoped under `#MainContent` to avoid affecting Horizon's header, footer, or other theme zones

### 3.4 Override Header and Footer Styles

**Objective:** Match the reference design's header and footer via CSS overrides.

**Instructions:**

1. **Header overrides** go in `assets/{prefix}primitives.css`, scoped to header selectors:

   ```css
   /* Header Overrides */
   .header {
     font-family: var(--font-heading);
   }

   .header__logo img {
     height: var(--header-logo-height, 40px);
   }

   .header-nav__link {
     font-size: var(--font-size-sm);
     font-weight: var(--font-weight-semibold);
     letter-spacing: 0.05em;
     text-transform: uppercase;
   }

   .announcement-bar {
     background-color: var(--color-primary);
     color: white;
     font-size: var(--font-size-xs);
     padding: var(--space-xs) 0;
   }
   ```

2. **Footer overrides** in the same file:

   ```css
   /* Footer Overrides */
   .footer {
     background-color: var(--color-foreground);
     color: var(--color-background);
   }

   .footer h3, .footer h4 {
     font-family: var(--font-heading);
     font-size: var(--font-size-base);
     font-weight: var(--font-weight-bold);
   }

   .footer a {
     color: var(--color-background);
     opacity: 0.8;
   }

   .footer a:hover {
     opacity: 1;
   }
   ```

3. **Screenshot and verify** header/footer match reference at all 3 viewports.

4. **Test header states:**
   - Default state
   - Sticky/scrolled state
   - Mobile navigation open
   - Transparent header on homepage (if applicable)

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
      "type": "{prefix}ds-hero",
      "settings": {}
    },
    "typography": {
      "type": "{prefix}ds-typography",
      "settings": {}
    },
    "colors": {
      "type": "{prefix}ds-colors",
      "settings": {}
    },
    "buttons": {
      "type": "{prefix}ds-buttons",
      "settings": {}
    },
    "cards": {
      "type": "{prefix}ds-cards",
      "settings": {}
    },
    "forms": {
      "type": "{prefix}ds-forms",
      "settings": {}
    },
    "components": {
      "type": "{prefix}ds-components",
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

1. **Typography Showcase Section** (`sections/{prefix}ds-typography.liquid`):

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
  .{prefix}ds-section {
    padding: var(--spacing-xl) 0;
    border-bottom: 1px solid var(--color-border);
  }

  .{prefix}type-samples {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--spacing-lg);
    margin-top: var(--spacing-lg);
  }

  .{prefix}type-sample {
    padding: var(--spacing-base);
    background-color: white;
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-base);
  }

  .{prefix}type-info {
    font-size: var(--type-small);
    color: var(--color-text-secondary);
    margin-top: var(--spacing-sm);
  }
</style>
```

2. **Color Showcase Section** (`sections/{prefix}ds-colors.liquid`):

```liquid
<section class="{prefix}ds-section">
  <div class="{prefix}container">
    <h2>Colors</h2>

    <div class="{prefix}color-grid">
      <div class="{prefix}color-item">
        <div class="{prefix}color-swatch" style="background-color: {{ settings.color_primary }}"></div>
        <p class="{prefix}color-label">Primary</p>
        <p class="{prefix}color-code">{{ settings.color_primary }}</p>
      </div>

      <div class="{prefix}color-item">
        <div class="{prefix}color-swatch" style="background-color: {{ settings.color_secondary }}"></div>
        <p class="{prefix}color-label">Secondary</p>
        <p class="{prefix}color-code">{{ settings.color_secondary }}</p>
      </div>

      <div class="{prefix}color-item">
        <div class="{prefix}color-swatch" style="background-color: {{ settings.color_success }}"></div>
        <p class="{prefix}color-label">Success</p>
        <p class="{prefix}color-code">{{ settings.color_success }}</p>
      </div>

      <div class="{prefix}color-item">
        <div class="{prefix}color-swatch" style="background-color: {{ settings.color_error }}"></div>
        <p class="{prefix}color-label">Error</p>
        <p class="{prefix}color-code">{{ settings.color_error }}</p>
      </div>
    </div>
  </div>
</section>

<style>
  .{prefix}color-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: var(--spacing-lg);
    margin-top: var(--spacing-lg);
  }

  .{prefix}color-swatch {
    width: 100%;
    height: 150px;
    border-radius: var(--border-radius-base);
    border: 1px solid var(--color-border);
  }

  .{prefix}color-label {
    font-weight: 600;
    margin-top: var(--spacing-sm);
  }

  .{prefix}color-code {
    font-size: var(--type-small);
    color: var(--color-text-secondary);
    font-family: monospace;
  }
</style>
```

3. **Buttons Showcase Section** (`sections/{prefix}ds-buttons.liquid`):

```liquid
<section class="{prefix}ds-section">
  <div class="{prefix}container">
    <h2>Buttons</h2>

    <div class="{prefix}button-grid">
      <div class="{prefix}button-group">
        <h4>Primary</h4>
        <button class="{prefix}btn {prefix}btn--primary">Primary Button</button>
        <button class="{prefix}btn {prefix}btn--primary" disabled>Disabled</button>
      </div>

      <div class="{prefix}button-group">
        <h4>Secondary</h4>
        <button class="{prefix}btn {prefix}btn--secondary">Secondary Button</button>
        <button class="{prefix}btn {prefix}btn--secondary" disabled>Disabled</button>
      </div>

      <div class="{prefix}button-group">
        <h4>Outline</h4>
        <button class="{prefix}btn {prefix}btn--outline">Outline Button</button>
        <button class="{prefix}btn {prefix}btn--outline" disabled>Disabled</button>
      </div>

      <div class="{prefix}button-group">
        <h4>Ghost</h4>
        <button class="{prefix}btn {prefix}btn--ghost">Ghost Button</button>
        <button class="{prefix}btn {prefix}btn--ghost" disabled>Disabled</button>
      </div>

      <div class="{prefix}button-group">
        <h4>Sizes</h4>
        <button class="{prefix}btn {prefix}btn--primary {prefix}btn--sm">Small</button>
        <button class="{prefix}btn {prefix}btn--primary">Default</button>
        <button class="{prefix}btn {prefix}btn--primary {prefix}btn--lg">Large</button>
      </div>
    </div>
  </div>
</section>

<style>
  .{prefix}button-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--spacing-lg);
    margin-top: var(--spacing-lg);
  }

  .{prefix}button-group {
    padding: var(--spacing-base);
    background-color: white;
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-base);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
  }

  .{prefix}button-group h4 {
    margin: 0;
  }
</style>
```

4. **Cards Showcase Section** (`sections/{prefix}ds-cards.liquid`):

```liquid
<section class="{prefix}ds-section">
  <div class="{prefix}container">
    <h2>Cards</h2>

    <div class="{prefix}card-grid">
      <div class="{prefix}card">
        <img src="https://via.placeholder.com/300x200" alt="Sample" class="{prefix}card__image">
        <h4 class="{prefix}card__title">Card Title</h4>
        <p class="{prefix}card__desc">This is a card component with an image, title, description, and button.</p>
        <div class="{prefix}card__footer">
          <span class="{prefix}card__price">$99.00</span>
          <button class="{prefix}btn {prefix}btn--primary {prefix}btn--sm">Buy</button>
        </div>
      </div>

      <div class="{prefix}card">
        <img src="https://via.placeholder.com/300x200" alt="Sample" class="{prefix}card__image">
        <h4 class="{prefix}card__title">Another Card</h4>
        <p class="{prefix}card__desc">Cards can be used for product listings, testimonials, team members, and more.</p>
        <div class="{prefix}card__footer">
          <span class="{prefix}card__price">$149.00</span>
          <button class="{prefix}btn {prefix}btn--primary {prefix}btn--sm">Buy</button>
        </div>
      </div>

      <div class="{prefix}card">
        <img src="https://via.placeholder.com/300x200" alt="Sample" class="{prefix}card__image">
        <h4 class="{prefix}card__title">Card With Badge</h4>
        <p class="{prefix}card__desc">Cards can include badges and other decorative elements.</p>
        <div class="{prefix}card__footer">
          <span class="{prefix}card__price">$199.00</span>
          <button class="{prefix}btn {prefix}btn--primary {prefix}btn--sm">Buy</button>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .{prefix}card-grid {
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
     {%- render 'product-card', product: product -%}
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

## Step 6: Create Design System Handoff Brief

**Objective:** Create a compact reference document that gives sub-agents everything they need to build pages correctly, without re-reading all design system files.

**Instructions:**

1. Create file: `THEME_ROOT/.workflow/design-system-handoff.md`

2. Include:
   - CSS load order and architecture summary
   - Key token values (colors, fonts, spacing scale, border radius)
   - List of all available primitive CSS classes
   - Coding rules (use `{% render %}`, never fork Horizon sections, alt text required, etc.)
   - Location of the design system reference page
   - Quality standards (theme-check zero errors, responsive at 3 viewports)

3. Keep it under 3000 tokens. This is a quick-reference, not a full specification.

4. **Verify:** A sub-agent reading only this document and the code-architecture skill should be able to build a new section correctly without reading any other design system files.

---

## Step 7: Verification Checklist

**Objective:** Ensure Phase 2 is complete and correct.

**Before moving to Phase 3, verify:**

- [ ] All design tokens are in `config/settings_schema.json`
- [ ] All tokens have default values matching the extracted design
- [ ] `snippets/design-tokens.liquid` loads and applies tokens correctly
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
- [ ] Header CSS overrides match reference at all viewports
- [ ] Footer CSS overrides match reference at all viewports
- [ ] Header states work correctly (sticky, mobile nav, transparent)
- [ ] Design system handoff brief created (`design-system-handoff.md`)

---

## Next Steps

Once all verification items pass and the design system handoff brief is created, move to **Phase 3: Gap Analysis & Fill**. The handoff brief must exist before proceeding — it's the primary input for sub-agents in Phases 3-5.
