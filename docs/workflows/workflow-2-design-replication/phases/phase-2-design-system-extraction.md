# Workflow 2: Phase 2 — Design System Extraction & Foundation

## Overview
Phase 2 builds a formalized, reusable design system from the proven clone pages. This design system will serve as the foundation for all real pages in Phase 4.

> **Key reference:** The **design-system-build skill** (`docs/workflows/skills/design-system-build/SKILL.md`) defines the complete specification for tokens, base styles, primitives, and section patterns. Consult it for detailed guidance on color systems, typography scales, spacing logic, and component construction.

By the end of this phase, you will have:
- Formalized design tokens in Shopify settings and CSS
- Base styles (typography, spacing, layout)
- Component primitives (buttons, cards, forms, etc.)
- A design system reference page showcasing all components
- Clone pages refactored to use the design system (with maintained visual parity)

### First Action: Generate Working Checklist

**Before doing ANY other work in this phase**, create the file `THEME_ROOT/.workflow/checklists/phase-2-checklist.md`. Populate it with every deliverable and verification item from this document, each as an unchecked `- [ ]` item. As you complete each item during the phase, update it to `- [x]`. This checklist is consumed by the Completion Gate at the end of this phase — if it does not exist or has unchecked items, you cannot proceed to Phase 3.

The checklist must explicitly list: every token category (colors by palette, font families, font sizes, font weights, line heights, spacing values, border radii, shadows, transitions), every primitive component from the component inventory, every component/variant/state row that must appear in `design-system-coverage.md`, header/footer CSS overrides, and clone page refactoring verification. Generate this BEFORE writing any CSS.

### Naming Convention

All files and CSS classes created in this phase use the project prefix from `THEME_ROOT/.workflow/prefix.txt`. Examples below use `{prefix}` as a placeholder — replace with your actual prefix (e.g., `lxn-`).

- Token snippet: `snippets/{prefix}tokens.liquid`
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

   If Horizon has a setting that partially matches (e.g., 'Body Font' exists but you need additional body-text variants), use Horizon's setting as the base and add supplements. Document the mapping in `THEME_ROOT/.workflow/horizon-token-mapping.md` showing: | Reference Token | Horizon Setting | Action (reuse/supplement/new) |

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
      "id": "type_heading_font",
      "label": "Heading Font",
      "default": "assistant_n6"
    },
    {
      "type": "font_picker",
      "id": "type_body_font",
      "label": "Body Font",
      "default": "assistant_n4"
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
      "content": "Status Colors (not covered by Horizon color schemes)"
    },
    {
      "type": "color",
      "id": "color_success",
      "label": "Success Color",
      "default": "#16A34A"
    },
    {
      "type": "color",
      "id": "color_error",
      "label": "Error Color",
      "default": "#DC2626"
    },
    {
      "type": "color",
      "id": "color_warning",
      "label": "Warning Color",
      "default": "#D97706"
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
   - Add settings for typography values not already covered by Horizon (heading fonts, body font, sizes)
   - **Do NOT add flat color settings** — use Horizon's `color_scheme_group` system for primary, secondary, text, background, and border colors. Only add settings for status colors (success, error, warning) which Horizon schemes do not cover.
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

{%- comment -%}
  Font Loading — @font-face declarations must come before :root.
  The font_face filter generates the @font-face CSS rule that loads the font
  from Shopify's CDN. The .family property gives the font-family name string.
  See Horizon's snippets/theme-styles-variables.liquid for a production example.
{%- endcomment -%}

{%- assign heading_font = settings.type_heading_font -%}
{%- assign body_font = settings.type_body_font -%}

{{ heading_font | font_face: font_display: 'swap' }}
{{ heading_font | font_modify: 'weight', 'bold' | font_face: font_display: 'swap' }}
{{ body_font | font_face: font_display: 'swap' }}
{{ body_font | font_modify: 'weight', 'bold' | font_face: font_display: 'swap' }}

:root {
  {%- comment -%}
  Typography Tokens
  {%- endcomment -%}
  --type-heading-family: {{ heading_font.family }}, {{ heading_font.fallback_families }};
  --type-body-family: {{ body_font.family }}, {{ body_font.fallback_families }};
  --type-base-size: {{ settings.type_base_size }}px;

  {%- comment -%}
  Status Color Tokens (not covered by Horizon color schemes)
  Primary, secondary, text, background, and border colors are provided by
  Horizon's color scheme system — access them via Horizon's existing CSS
  custom properties. Only define custom properties for tokens Horizon does
  not cover.

  Horizon scheme variable reference (DO NOT redefine — use these directly):
    --color-foreground           (body text)
    --color-foreground-heading   (heading text)
    --color-background           (section/page background)
    --color-primary              (primary accent / link color)
    --color-primary-hover        (primary hover state)
    --color-border               (default border color)
    --color-primary-button-background / --color-primary-button-text  (CTA buttons)
    --color-secondary-button-background / --color-secondary-button-text
    --color-input-background / --color-input-text / --color-input-border
  {%- endcomment -%}
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

### 1.3 Wire Settings → CSS Custom Properties

**Objective:** Ensure all tokens are available as CSS custom properties throughout the theme.

**Instructions:**

The `{prefix}tokens.liquid` snippet (created in Step 1.2) already handles this — it reads from Shopify settings and outputs CSS custom properties inside a `:root` block. No separate Liquid variable assignments are needed.

1. In `layout/theme.liquid`, render the tokens snippet inline before `{% render 'stylesheets' %}`:
```liquid
<style>{% render '{prefix}tokens' %}</style>
{%- render 'stylesheets' -%}
```

2. Sections access tokens via CSS custom properties (not Liquid variables):
```css
/* In section CSS or primitives.css */
.{prefix}hero { padding: var(--spacing-xl); }
```

3. For the rare case where you need a token value in Liquid (e.g., inline styles for dynamic values), access settings directly:
```liquid
<div style="background-color: {{ settings.color_success }};">
  <!-- Only use inline styles for truly dynamic values that can't be CSS variables -->
</div>
```

4. **Color tokens from Horizon schemes** are available automatically via Horizon's existing CSS custom properties (e.g., `--color-foreground`, `--color-background`). Do not re-declare them in your tokens snippet.

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

2. For every design token setting you added or mapped in Step 1.1, set the default value to match the extracted design tokens from Phase 1. **Critically, this includes Horizon's color schemes** — map your reference design's palette into Horizon's scheme structure:

   ```json
   {
     "current": {
       "color_schemes": {
         "scheme-1": {
           "settings": {
             "background": "#FFFFFF",
             "text": "#374151",
             "heading": "#111827",
             "button": "#2563EB",
             "button_text": "#FFFFFF",
             "accent": "#2563EB",
             "border": "#E5E7EB"
           }
         },
         "scheme-2": {
           "settings": {
             "background": "#111827",
             "text": "#D1D5DB",
             "heading": "#F9FAFB",
             "button": "#60A5FA",
             "button_text": "#111827",
             "accent": "#60A5FA",
             "border": "#374151"
           }
         }
       },
       "type_heading_font": "assistant_n6",
       "type_body_font": "assistant_n4",
       "type_base_size": 16,
       "color_success": "#16A34A",
       "color_error": "#DC2626",
       "color_warning": "#D97706",
       "spacing_base": 8,
       "border_radius_base": 8,
       "enable_shadows": true
     }
   }
   ```

   **Key points:**
   - The `color_schemes` structure must mirror Horizon's `definition` array in `settings_schema.json`. Read Horizon's existing scheme definitions to discover the exact setting keys (they vary by Horizon version).
   - Map your reference's light-mode palette into `scheme-1` and dark-mode (if any) into `scheme-2`.
   - Only the non-scheme settings (`color_success`, `color_error`, `color_warning`, typography, spacing, etc.) appear as flat keys.

3. **Merge strategy — do not clobber Horizon defaults:**
   - `settings_data.json` already contains values for Horizon's built-in settings. **Read the file first** and only update keys that relate to your design tokens.
   - For `color_schemes`, overwrite only the scheme entries you are mapping (typically `scheme-1` for light, `scheme-2` for dark). Leave other schemes intact.
   - For flat keys (typography, spacing, radius, etc.), update them in-place. Do **not** delete unrelated keys you do not recognize — they may control Horizon features you haven't audited yet.
   - If `settings_data.json` has a `"presets"` key, you generally don't need to touch it — `"current"` is what the live theme reads.
   - After editing, validate the JSON (e.g. `python3 -m json.tool config/settings_data.json > /dev/null`) to catch syntax errors before previewing.

4. **Critical:** The values in `settings_data.json` must match the design tokens extracted in Phase 1's `design-tokens-map.md`. This is what makes the theme look correct out of the box.

5. **Verify:** After updating, refresh the theme preview. The design should match the reference without any manual setting changes.

---

## Step 2: Build Base Styles

> See the design-system-build skill (`docs/workflows/skills/design-system-build/SKILL.md`) sections on **Typography**, **Spacing**, and **Layout** for the complete specification.

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
  color: var(--color-foreground);
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
  color: var(--color-foreground);
}

.{prefix}text-secondary {
  color: rgb(var(--color-foreground-rgb) / var(--opacity-40-60));
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

> See the design-system-build skill (`docs/workflows/skills/design-system-build/SKILL.md`) sections on **Buttons**, **Cards**, **Forms**, and **Surfaces** for the complete component specifications.

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
  background-color: var(--color-secondary-button-background);
  color: var(--color-secondary-button-text);
  border-color: var(--color-secondary-button-border);
}

.{prefix}btn--secondary:hover {
  background-color: var(--color-secondary-button-hover-background);
  color: var(--color-secondary-button-hover-text);
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
  color: var(--color-foreground);
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
  background-color: var(--color-background);
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
  color: rgb(var(--color-foreground-rgb) / var(--opacity-40-60));
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
  color: var(--color-foreground-heading);
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
     font-family: var(--type-heading-family);
   }

   .header__logo img {
     height: var(--header-logo-height, 40px);
   }

   .header-nav__link {
     font-size: var(--type-small);
     font-weight: 600;
     letter-spacing: 0.05em;
     text-transform: uppercase;
   }

   .announcement-bar {
     background-color: var(--color-primary);
     color: var(--color-primary-button-text);
     font-size: var(--type-small);
     padding: var(--spacing-xs) 0;
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
     font-family: var(--type-heading-family);
     font-size: var(--type-body);
     font-weight: 700;
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

### 3.5 Translation Keys for Custom Sections

**Objective:** Ensure custom sections use locale files for user-facing strings, matching Horizon's own pattern.

**Instructions:**

1. Horizon uses `t:` translation keys throughout its section schemas (e.g., `"label": "t:settings.background"`). Custom sections should follow the same pattern for production readiness and `theme check` compliance.

2. **For section schema labels and settings**, use `t:` keys:
   ```json
   {
     "name": "t:sections.{prefix}hero.name",
     "settings": [
       {
         "type": "text",
         "id": "heading",
         "label": "t:sections.{prefix}hero.settings.heading.label",
         "default": "t:sections.{prefix}hero.settings.heading.default"
       }
     ]
   }
   ```

3. **Add corresponding entries** in `locales/en.default.schema.json`:
   ```json
   {
     "sections": {
       "{prefix}hero": {
         "name": "Hero",
         "settings": {
           "heading": {
             "label": "Heading",
             "default": "Welcome"
           }
         }
       }
     }
   }
   ```

4. **For rendered text** that isn't configurable via settings (e.g., "Page Not Found" on the 404 page), use `{{ 'general.404.title' | t }}` and add the key to `locales/en.default.json`.

5. **When to skip:** Clone sections (Phase 1) are temporary and do not need translation keys. Apply this to all production sections built in Phases 2–4.

### 3.6 Image and Asset Strategy

**Objective:** Establish how images and media are handled during development and in production.

**Instructions:**

1. **`shopify://` URLs** (e.g., `shopify://shop_images/hero.jpg`) only resolve on a connected Shopify store. During local `shopify theme dev`, they resolve against your connected dev store's Files.

2. **For placeholder images during development:**
   - Use Shopify's built-in SVG placeholders: `{{ 'product-1' | placeholder_svg_tag: 'placeholder-svg' }}`
   - Available placeholder types: `product-1` through `product-6`, `collection-1` through `collection-6`, `lifestyle-1`, `lifestyle-2`, `image`
   - Or place static placeholder images in `assets/` and reference via `{{ 'placeholder-hero.jpg' | asset_url }}`

3. **For production images:**
   - All merchant-facing images should use `image_picker` settings so merchants can swap them in the theme customizer
   - Hero backgrounds, logos, and feature images are configured via section settings, not hardcoded
   - Product and collection images come from Shopify's product data automatically

4. **In section schemas**, always use `image_picker` for images:
   ```json
   {
     "type": "image_picker",
     "id": "image",
     "label": "Image"
   }
   ```
   Then in Liquid, render with responsive `srcset`:
   ```liquid
   {%- if section.settings.image -%}
     {{ section.settings.image | image_url: width: 1440 | image_tag:
        loading: 'lazy',
        widths: '375, 750, 1100, 1440',
        sizes: '100vw' }}
   {%- else -%}
     {{ 'lifestyle-1' | placeholder_svg_tag: 'placeholder-svg' }}
   {%- endif -%}
   ```

5. **Clone sections (Phase 1)** can use whatever image approach matches the reference visually — static assets or placeholder SVGs. Production sections (Phase 4) must use `image_picker` settings.

---

## Step 4: Build Design System Reference Page

### 4.1 Create Design System Template

**Objective:** Build a showcase page for all design system components.

**Instructions:**

1. Create file: `templates/page.design-system.json`

1b. Create file: `THEME_ROOT/.workflow/design-system-coverage.md`
   - Use the template at `docs/workflows/workflow-2-design-replication/templates/design-system-coverage-template.md`
   - This file is the source of truth for design system completeness in Phases 2 and 5
   - Create one row for every `component + variant + state` documented in `THEME_ROOT/.workflow/component-inventory.md`

2. **Important:** Replace `{prefix}` with your actual project prefix (e.g., `lxn-`) in the template JSON — Shopify requires literal section type names, not placeholders.

3. Structure it with multiple section types. Example using `lxn-` prefix:

```json
{
  "sections": {
    "hero": {
      "type": "lxn-ds-hero",
      "settings": {}
    },
    "typography": {
      "type": "lxn-ds-typography",
      "settings": {}
    },
    "colors": {
      "type": "lxn-ds-colors",
      "settings": {}
    },
    "buttons": {
      "type": "lxn-ds-buttons",
      "settings": {}
    },
    "cards": {
      "type": "lxn-ds-cards",
      "settings": {}
    },
    "forms": {
      "type": "lxn-ds-forms",
      "settings": {}
    },
    "components": {
      "type": "lxn-ds-components",
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

4. **Create the intro/hero section first** (`sections/{prefix}ds-hero.liquid`). This serves as a table of contents and introduction:

```liquid
<section class="{prefix}ds-section" id="ds-top">
  <div class="{prefix}container">
    <h1>Design System Reference</h1>
    <p>This page showcases all design tokens and component primitives. Use it to verify visual consistency after changes and as a regression test.</p>
    <nav style="display: flex; flex-wrap: wrap; gap: var(--spacing-base); margin-top: var(--spacing-lg);">
      <a href="#typography" class="{prefix}btn {prefix}btn--outline">Typography</a>
      <a href="#colors" class="{prefix}btn {prefix}btn--outline">Colors</a>
      <a href="#buttons" class="{prefix}btn {prefix}btn--outline">Buttons</a>
      <a href="#cards" class="{prefix}btn {prefix}btn--outline">Cards</a>
      <a href="#forms" class="{prefix}btn {prefix}btn--outline">Forms</a>
    </nav>
  </div>
</section>

{% schema %}
{
  "name": "DS: Overview",
  "tag": "section"
}
{% endschema %}
```

### 4.2 Build Design System Sections

**Objective:** Create sections that display design system components.

**Instructions:**

0. **Coverage rule:** Every component/variant/state row in `THEME_ROOT/.workflow/design-system-coverage.md` must map to a visible demo on the reference page. If a state normally requires interaction (hover, focus, active), create a labeled forced-state demo (`is-hover`, `is-focus`, `is-active`, disabled attribute, loading modifier, etc.) so QA does not rely on memory or manual hovering.

1. **Typography Showcase Section** (`sections/{prefix}ds-typography.liquid`):

```liquid
<section class="{prefix}ds-section">
  <div class="{prefix}container">
    <h2>Typography</h2>

    <div class="{prefix}type-samples">
      <div class="{prefix}type-sample">
        <h1 class="h1">Heading 1</h1>
        <p class="{prefix}type-info">h1 or .h1</p>
      </div>

      <div class="{prefix}type-sample">
        <h2 class="h2">Heading 2</h2>
        <p class="{prefix}type-info">h2 or .h2</p>
      </div>

      <div class="{prefix}type-sample">
        <h3 class="h3">Heading 3</h3>
        <p class="{prefix}type-info">h3 or .h3</p>
      </div>

      <div class="{prefix}type-sample">
        <h4 class="h4">Heading 4</h4>
        <p class="{prefix}type-info">h4 or .h4</p>
      </div>

      <div class="{prefix}type-sample">
        <p class="body">This is body text. It should be readable and comfortable at the default size.</p>
        <p class="type-info">p or .body</p>
      </div>

      <div class="{prefix}type-sample">
        <p class="small">This is small text for captions and supplementary information.</p>
        <p class="{prefix}type-info">small or .small</p>
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
    color: rgb(var(--color-foreground-rgb) / var(--opacity-40-60));
    margin-top: var(--spacing-sm);
  }
</style>
```

2. **Color Showcase Section** (`sections/{prefix}ds-colors.liquid`):

   **Important:** Do NOT use duplicate flat color settings like `settings.color_primary` or `settings.color_secondary` if your system is based on Horizon color schemes. Read from the CSS custom properties emitted by `snippets/{prefix}tokens.liquid` and only use direct setting ids for semantic status colors that are intentionally separate (for example success/error).

```liquid
<section class="{prefix}ds-section">
  <div class="{prefix}container">
    <h2>Colors</h2>

    <div class="{prefix}color-grid">
      <div class="{prefix}color-item">
        <div class="{prefix}color-swatch" style="background-color: var(--color-primary)"></div>
        <p class="{prefix}color-label">Primary</p>
        <p class="{prefix}color-code">var(--color-primary)</p>
      </div>

      <div class="{prefix}color-item">
        <div class="{prefix}color-swatch" style="background-color: var(--color-secondary)"></div>
        <p class="{prefix}color-label">Secondary</p>
        <p class="{prefix}color-code">var(--color-secondary)</p>
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
    color: rgb(var(--color-foreground-rgb) / var(--opacity-40-60));
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

6. As you add or refine demo sections, update `THEME_ROOT/.workflow/design-system-coverage.md`:
   - `Component`
   - `Variant`
   - `State`
   - `DS Section`
   - `Demo Selector / Anchor`
   - `Screenshot Path`
   - `Verified`

If a component exists in CSS but does not have a row in `design-system-coverage.md` pointing to a rendered demo, it is NOT complete.

---

## Step 5: Refactor Clone Pages to Use Design System

### 5.1 Refactor One Clone Page at a Time

**Objective:** Update clone pages to use design system tokens and primitives while maintaining visual parity.

**Instructions:**

1. Pick the first clone page (usually homepage)

2. Go through each section in the clone page and:
   - Replace any hardcoded colors with CSS variables
   - Replace button styles with `.{prefix}btn` and variant classes
   - Replace card styles with `.{prefix}card` and related classes
   - Replace spacing with design token variables
   - Replace layout containers with `.{prefix}container`, `.{prefix}container--wide`, etc.

3. **Example refactoring:**

   **Before:**
   ```liquid
   <button style="background: #2563EB; padding: 12px 24px; border-radius: 8px; color: white;">
     Add to Cart
   </button>
   ```

   **After:**
   ```liquid
   <button class="{prefix}btn {prefix}btn--primary">Add to Cart</button>
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

   **Example: Product Card Snippet** (`snippets/{prefix}product-card.liquid`):
   ```liquid
   <div class="{prefix}card">
     <div class="{prefix}card__image">
       <img src="{{ product.image | img_url: '300x' }}" alt="{{ product.title }}">
     </div>
     <h4 class="{prefix}card__title">{{ product.title }}</h4>
     <p class="{prefix}card__desc">{{ product.description | strip_html | truncatewords: 15 }}</p>
     <div class="{prefix}card__footer">
       <span class="{prefix}card__price">{{ product.price | money }}</span>
       <a href="{{ product.url }}" class="{prefix}btn {prefix}btn--primary {prefix}btn--sm">Shop</a>
     </div>
   </div>
   ```

3. Use it in sections (note: pass `product` as a parameter to `{% render %}`):
   ```liquid
   {%- for product in collection.products -%}
     {%- render '{prefix}product-card', product: product -%}
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
- [ ] `snippets/{prefix}tokens.liquid` loads and applies tokens correctly
- [ ] Changing a theme setting (color, font, etc.) updates the page
- [ ] `assets/{prefix}base.css` includes typography, spacing, and layout utilities
- [ ] `assets/{prefix}primitives.css` includes all needed components (buttons, cards, forms, etc.)
- [ ] All primitives have been tested by refactoring clone sections
- [ ] `templates/page.design-system.json` and sections exist
- [ ] `THEME_ROOT/.workflow/design-system-coverage.md` exists and covers every component/variant/state from the component inventory
- [ ] Design system reference page displays every covered component/state correctly
- [ ] All clone pages have been refactored to use design system
- [ ] All clone pages still match their reference screenshots at all 3 viewports
- [ ] **Coverage count check:** Every component/variant/state row in `THEME_ROOT/.workflow/component-inventory.md` has a matching row in `THEME_ROOT/.workflow/design-system-coverage.md`, and every coverage row points to a visible demo on the DS reference page
- [ ] Code follows code-architecture skill (no CSS in wrong places)
- [ ] Horizon section overrides are in place and working
- [ ] Header CSS overrides match reference at all viewports
- [ ] Footer CSS overrides match reference at all viewports
- [ ] Header states work correctly (sticky, mobile nav, transparent)
- [ ] Design system handoff brief created (`design-system-handoff.md`)

---

### COMPLETION GATE — Phase 2 (SELF-ENFORCING)

**Before proceeding to Phase 3, verify ALL of the following. If any item is incomplete, go back and finish it. Do not ask for permission to skip — just do the work.**

**Checklist file:** `THEME_ROOT/.workflow/checklists/phase-2-checklist.md` must exist and show all items as `[x]`.

**Count checks:**
- `snippets/{prefix}tokens.liquid` exists and contains CSS custom properties for colors, typography, spacing, borders, and shadows
- `assets/{prefix}base.css` exists and contains typography, spacing, and layout utility styles
- `assets/{prefix}primitives.css` exists and contains component styles (buttons, cards, forms, etc.)
- `templates/page.design-system.json` exists and the DS reference page renders every component/variant/state row listed in `THEME_ROOT/.workflow/design-system-coverage.md`
- `THEME_ROOT/.workflow/design-system-coverage.md` exists and every row maps to:
  - a component in `THEME_ROOT/.workflow/component-inventory.md`
  - a visible demo on the DS reference page
  - a screenshot path
- Every component listed in `THEME_ROOT/.workflow/component-inventory.md` has both a corresponding implementation in `{prefix}primitives.css` and a rendered DS coverage row
- Every clone page still renders correctly after refactoring — compare current screenshots against Phase 1 reference screenshots at all 3 viewports (1440px, 768px, 390px) with zero regressions
- Clone page refactoring threshold: every clone page must still match the reference at all 3 viewports. Compare Phase 2 clone screenshots against Phase 1 reference screenshots. If ANY clone differs by more than 0.5% at section level, the refactoring broke something — fix before proceeding.
- Design system handoff brief (`THEME_ROOT/.workflow/design-system-handoff.md`) exists and is under 3000 tokens

**If ANY count is wrong or ANY checklist item is not `[x]`, loop back and complete the missing work. No exceptions.**

---

## Next Steps

Once all verification items pass and the design system handoff brief is created, move to **Phase 3: Gap Analysis & Fill**. The handoff brief must exist before proceeding — it's the primary input for sub-agents in Phases 3-5.
