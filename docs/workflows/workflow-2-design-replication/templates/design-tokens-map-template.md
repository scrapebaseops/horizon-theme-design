# Design Tokens Map Template

<!-- INSTRUCTIONS: Use this template to document all design tokens extracted from your reference design.
This is your single source of truth for all design values (colors, typography, spacing, shadows, etc.)
that should be implemented as CSS custom properties (variables) and Shopify theme settings.
Fill in all [PLACEHOLDER] sections. Each token should map to a CSS variable name and potentially a Shopify setting. -->

---

## Document Overview

**Reference Design Source**: [PLACEHOLDER: e.g., "Figma - Horizon Theme Main File"]

**Theme Name**: [PLACEHOLDER: e.g., "Horizon Theme v1.0"]

**Extraction Date**: [DATE]

**Last Updated**: [DATE]

**Extracted By**: [NAME]

**Purpose**: This document serves as the source of truth for all design tokens. Use it to:
1. Create CSS custom properties (variables) in your stylesheet
2. Define Shopify theme settings (color pickers, font pickers, number inputs)
3. Ensure consistency across all components
4. Enable easy brand updates

---

## Color Tokens

### Brand Colors

| Token Name | Hex Value | RGB | Usage | CSS Variable | Shopify Setting | Notes |
|-----------|-----------|-----|-------|--------------|-----------------|-------|
| [PLACEHOLDER: e.g., "Primary"] | [PLACEHOLDER: e.g., "#2E5090"] | [PLACEHOLDER: e.g., "46, 80, 144"] | [PLACEHOLDER: e.g., "Buttons, links, CTAs, active states"] | `--color-primary` | `color_primary` | [PLACEHOLDER: e.g., "Brand blue, appears on 40% of interface"] |
| [PLACEHOLDER: e.g., "Secondary"] | [PLACEHOLDER: e.g., "#F4A300"] | [PLACEHOLDER: e.g., "244, 163, 0"] | [PLACEHOLDER: e.g., "Accent highlights, hover states"] | `--color-secondary` | `color_secondary` | [PLACEHOLDER: e.g., "Brand gold, used for accents and emphasis"] |
| [PLACEHOLDER: e.g., "Tertiary"] | [PLACEHOLDER: e.g., "#6B7A8E"] | [PLACEHOLDER: e.g., "107, 122, 142"] | [PLACEHOLDER: e.g., "Secondary text, subtle elements"] | `--color-tertiary` | `color_tertiary` | [PLACEHOLDER: e.g., "Muted blue-gray for secondary content"]] |

### Neutral Colors

| Token Name | Hex Value | RGB | Usage | CSS Variable | Shopify Setting | Notes |
|-----------|-----------|-----|-------|--------------|-----------------|-------|
| [PLACEHOLDER: e.g., "White"] | [PLACEHOLDER: e.g., "#FFFFFF"] | [PLACEHOLDER: e.g., "255, 255, 255"] | [PLACEHOLDER: e.g., "Background for cards, content areas"] | `--color-white` | N/A | [PLACEHOLDER] |
| [PLACEHOLDER: e.g., "Gray 100"] | [PLACEHOLDER: e.g., "#F7F7F7"] | [PLACEHOLDER: e.g., "247, 247, 247"] | [PLACEHOLDER: e.g., "Subtle background, disabled states"] | `--color-gray-100` | N/A | [PLACEHOLDER: e.g., "Lightest gray, almost white"]] |
| [PLACEHOLDER: e.g., "Gray 200"] | [PLACEHOLDER: e.g., "#EEEEEE"] | [PLACEHOLDER: e.g., "238, 238, 238"] | [PLACEHOLDER: e.g., "Dividers, borders, section separation"] | `--color-gray-200` | N/A | [PLACEHOLDER] |
| [PLACEHOLDER: e.g., "Gray 300"] | [PLACEHOLDER: e.g., "#DDDDDD"] | [PLACEHOLDER: e.g., "221, 221, 221"] | [PLACEHOLDER: e.g., "Input borders, secondary borders"]] | `--color-gray-300` | N/A | [PLACEHOLDER] |
| [PLACEHOLDER: e.g., "Gray 400"] | [PLACEHOLDER: e.g., "#999999"] | [PLACEHOLDER: e.g., "153, 153, 153"] | [PLACEHOLDER: e.g., "Secondary text, placeholders"]] | `--color-gray-400` | N/A | [PLACEHOLDER: e.g., "Medium gray for secondary content"]] |
| [PLACEHOLDER: e.g., "Gray 500"] | [PLACEHOLDER: e.g., "#666666"] | [PLACEHOLDER: e.g., "102, 102, 102"] | [PLACEHOLDER: e.g., "Primary text, body copy"]] | `--color-gray-500` | N/A | [PLACEHOLDER] |
| [PLACEHOLDER: e.g., "Black"] | [PLACEHOLDER: e.g., "#000000"] | [PLACEHOLDER: e.g., "0, 0, 0"] | [PLACEHOLDER: e.g., "Headings, bold text, high contrast"]] | `--color-black` | N/A | [PLACEHOLDER] |

### Semantic Colors

| Token Name | Hex Value | Usage | CSS Variable | Shopify Setting | Notes |
|-----------|-----------|-------|--------------|-----------------|-------|
| [PLACEHOLDER: e.g., "Success"] | [PLACEHOLDER: e.g., "#4CAF50"] | [PLACEHOLDER: e.g., "Success messages, confirmation badges"] | `--color-success` | `color_success` | [PLACEHOLDER: e.g., "Green, used for positive feedback"]] |
| [PLACEHOLDER: e.g., "Warning"] | [PLACEHOLDER: e.g., "#FF9800"] | [PLACEHOLDER: e.g., "Warning messages, alerts, caution states"]] | `--color-warning` | `color_warning` | [PLACEHOLDER: e.g., "Orange, used for cautionary messaging"]] |
| [PLACEHOLDER: e.g., "Error"] | [PLACEHOLDER: e.g., "#F44336"] | [PLACEHOLDER: e.g., "Error messages, validation errors, danger states"]] | `--color-error` | `color_error` | [PLACEHOLDER: e.g., "Red, used for errors and destructive actions"]] |
| [PLACEHOLDER: e.g., "Info"] | [PLACEHOLDER: e.g., "#2196F3"] | [PLACEHOLDER: e.g., "Info messages, tooltips, informational content"]] | `--color-info` | `color_info` | [PLACEHOLDER: e.g., "Blue, used for informational messaging"]] |

### Text Colors

| Token Name | Hex Value | Usage | CSS Variable | Shopify Setting | Contrast Ratio (WCAG) | Notes |
|-----------|-----------|-------|--------------|-----------------|----------------------|-------|
| [PLACEHOLDER: e.g., "Text Primary"] | [PLACEHOLDER: e.g., "#333333"] | [PLACEHOLDER: e.g., "Main body text, paragraphs"]] | `--color-text-primary` | N/A | [PLACEHOLDER: e.g., "21:1"] | [PLACEHOLDER: e.g., "Dark gray for readability, 21:1 contrast on white"]] |
| [PLACEHOLDER: e.g., "Text Secondary"] | [PLACEHOLDER: e.g., "#666666"] | [PLACEHOLDER: e.g., "Secondary text, metadata, captions"]] | `--color-text-secondary` | N/A | [PLACEHOLDER: e.g., "10:1"] | [PLACEHOLDER: e.g., "Medium gray, still meets WCAG AA"]] |
| [PLACEHOLDER: e.g., "Text Tertiary"] | [PLACEHOLDER: e.g., "#999999"] | [PLACEHOLDER: e.g., "Placeholder text, disabled text"]] | `--color-text-tertiary` | N/A | [PLACEHOLDER: e.g., "5:1"] | [PLACEHOLDER: e.g., "Light gray for de-emphasized content"]] |

---

## Typography Tokens

### Font Families

| Token Name | Font Family | Font Source | Weight Range | CSS Variable | Shopify Setting | Usage | Notes |
|-----------|------------|------------|--------------|--------------|-----------------|-------|-------|
| [PLACEHOLDER: e.g., "Heading Font"] | [PLACEHOLDER: e.g., "Inter"] | [PLACEHOLDER: e.g., "Google Fonts"] | [PLACEHOLDER: e.g., "400, 600, 700"] | `--font-heading` | `font_heading` | [PLACEHOLDER: e.g., "All headings (h1-h6)"]] | [PLACEHOLDER: e.g., "Sans-serif, clean, professional"]] |
| [PLACEHOLDER: e.g., "Body Font"] | [PLACEHOLDER: e.g., "Open Sans"] | [PLACEHOLDER: e.g., "Google Fonts"] | [PLACEHOLDER: e.g., "400, 500"]] | `--font-body` | `font_body` | [PLACEHOLDER: e.g., "Paragraphs, buttons, form fields"]] | [PLACEHOLDER: e.g., "Highly readable, default font"]] |
| [PLACEHOLDER: e.g., "Accent Font"]] | [PLACEHOLDER: e.g., "Playfair Display"]] | [PLACEHOLDER: e.g., "Google Fonts"]] | [PLACEHOLDER: e.g., "400, 700"]] | `--font-accent` | N/A | [PLACEHOLDER: e.g., "Hero headlines, decorative text"]] | [PLACEHOLDER: e.g., "Serif, elegant, used sparingly"]] |

### Font Sizes

| Token Name | Value (px) | Value (rem) | Usage | CSS Variable | Shopify Setting | Notes |
|-----------|-----------|-----------|-------|--------------|-----------------|-------|
| [PLACEHOLDER: e.g., "H1"] | [PLACEHOLDER: e.g., "48"] | [PLACEHOLDER: e.g., "3"] | [PLACEHOLDER: e.g., "Page main heading"]] | `--font-size-h1` | `font_size_h1` | [PLACEHOLDER: e.g., "Large, prominent, used once per page"]] |
| [PLACEHOLDER: e.g., "H2"] | [PLACEHOLDER: e.g., "36"] | [PLACEHOLDER: e.g., "2.25"]] | [PLACEHOLDER: e.g., "Section headings"]] | `--font-size-h2` | `font_size_h2` | [PLACEHOLDER] |
| [PLACEHOLDER: e.g., "H3"] | [PLACEHOLDER: e.g., "28"]] | [PLACEHOLDER: e.g., "1.75"]] | [PLACEHOLDER: e.g., "Subsection headings"]] | `--font-size-h3` | N/A | [PLACEHOLDER] |
| [PLACEHOLDER: e.g., "H4"] | [PLACEHOLDER: e.g., "24"]] | [PLACEHOLDER: e.g., "1.5"]] | [PLACEHOLDER: e.g., "Component headings"]] | `--font-size-h4` | N/A | [PLACEHOLDER] |
| [PLACEHOLDER: e.g., "Body Large"] | [PLACEHOLDER: e.g., "18"]] | [PLACEHOLDER: e.g., "1.125"]] | [PLACEHOLDER: e.g., "Intro text, lead paragraph"]] | `--font-size-body-lg` | N/A | [PLACEHOLDER] |
| [PLACEHOLDER: e.g., "Body Base"] | [PLACEHOLDER: e.g., "16"]] | [PLACEHOLDER: e.g., "1"]] | [PLACEHOLDER: e.g., "Default paragraph text"]] | `--font-size-body-base` | `font_size_base` | [PLACEHOLDER: e.g., "Base size, rem calculations use this as 1rem"]] |
| [PLACEHOLDER: e.g., "Body Small"] | [PLACEHOLDER: e.g., "14"]] | [PLACEHOLDER: e.g., "0.875"]] | [PLACEHOLDER: e.g., "Helper text, captions, metadata"]] | `--font-size-body-sm` | N/A | [PLACEHOLDER] |
| [PLACEHOLDER: e.g., "Caption"]] | [PLACEHOLDER: e.g., "12"]] | [PLACEHOLDER: e.g., "0.75"]] | [PLACEHOLDER: e.g., "Image captions, small labels"]] | `--font-size-caption` | N/A | [PLACEHOLDER] |

### Font Weights

| Token Name | Numeric Weight | CSS Variable | Usage | Notes |
|-----------|----------------|--------------|-------|-------|
| [PLACEHOLDER: e.g., "Light"] | [PLACEHOLDER: e.g., "300"] | `--font-weight-light` | [PLACEHOLDER: e.g., "Decorative text, light emphasis"]] | [PLACEHOLDER] |
| [PLACEHOLDER: e.g., "Regular"] | [PLACEHOLDER: e.g., "400"] | `--font-weight-regular` | [PLACEHOLDER: e.g., "Body text, default"]] | [PLACEHOLDER] |
| [PLACEHOLDER: e.g., "Medium"]] | [PLACEHOLDER: e.g., "500"]] | `--font-weight-medium` | [PLACEHOLDER: e.g., "Emphasis, labels"]] | [PLACEHOLDER] |
| [PLACEHOLDER: e.g., "Semibold"]] | [PLACEHOLDER: e.g., "600"]] | `--font-weight-semibold` | [PLACEHOLDER: e.g., "Subheadings, strong text"]] | [PLACEHOLDER] |
| [PLACEHOLDER: e.g., "Bold"]] | [PLACEHOLDER: e.g., "700"]] | `--font-weight-bold` | [PLACEHOLDER: e.g., "Headings, strong emphasis"]] | [PLACEHOLDER] |

### Line Heights

| Token Name | Value | CSS Variable | Usage | Notes |
|-----------|-------|--------------|-------|-------|
| [PLACEHOLDER: e.g., "Tight"] | [PLACEHOLDER: e.g., "1.2"] | `--line-height-tight` | [PLACEHOLDER: e.g., "Headings"]] | [PLACEHOLDER: e.g., "Compact spacing for visual impact"]] |
| [PLACEHOLDER: e.g., "Normal"]] | [PLACEHOLDER: e.g., "1.5"]] | `--line-height-normal` | [PLACEHOLDER: e.g., "Body text, paragraphs"]] | [PLACEHOLDER: e.g., "Good readability for longer text"]] |
| [PLACEHOLDER: e.g., "Relaxed"]] | [PLACEHOLDER: e.g., "1.8"]] | `--line-height-relaxed` | [PLACEHOLDER: e.g., "Form labels, description text"]] | [PLACEHOLDER] |

### Letter Spacing

| Token Name | Value (em) | Value (px at base) | CSS Variable | Usage | Notes |
|-----------|-----------|-------------------|--------------|-------|-------|
| [PLACEHOLDER: e.g., "Tight"] | [PLACEHOLDER: e.g., "-0.02"]] | [PLACEHOLDER: e.g., "-0.32px"]] | `--letter-spacing-tight` | [PLACEHOLDER: e.g., "Headings"]] | [PLACEHOLDER: e.g., "Subtle negative spacing for visual tightness"]] |
| [PLACEHOLDER: e.g., "Normal"]] | [PLACEHOLDER: e.g., "0"]] | [PLACEHOLDER: e.g., "0px"]] | `--letter-spacing-normal` | [PLACEHOLDER: e.g., "Body text, default"]] | [PLACEHOLDER] |
| [PLACEHOLDER: e.g., "Wide"]] | [PLACEHOLDER: e.g., "0.05"]] | [PLACEHOLDER: e.g., "0.8px"]] | `--letter-spacing-wide` | [PLACEHOLDER: e.g., "Uppercase text, labels, section titles"]] | [PLACEHOLDER: e.g., "Slight expansion for emphasis"]] |

---

## Spacing Tokens

| Token Name | Value (px) | Value (rem) | CSS Variable | Usage | Notes |
|-----------|-----------|-----------|--------------|-------|-------|
| [PLACEHOLDER: e.g., "xs"]] | [PLACEHOLDER: e.g., "4"]] | [PLACEHOLDER: e.g., "0.25"]] | `--spacing-xs` | [PLACEHOLDER: e.g., "Minimal padding, micro spacing"]] | [PLACEHOLDER] |
| [PLACEHOLDER: e.g., "sm"]] | [PLACEHOLDER: e.g., "8"]] | [PLACEHOLDER: e.g., "0.5"]] | `--spacing-sm` | [PLACEHOLDER: e.g., "Small padding, button padding"]] | [PLACEHOLDER] |
| [PLACEHOLDER: e.g., "md"]] | [PLACEHOLDER: e.g., "16"]] | [PLACEHOLDER: e.g., "1"]] | `--spacing-md` | [PLACEHOLDER: e.g., "Default padding, margin, section spacing"]] | [PLACEHOLDER: e.g., "Base spacing unit"]] |
| [PLACEHOLDER: e.g., "lg"]] | [PLACEHOLDER: e.g., "24"]] | [PLACEHOLDER: e.g., "1.5"]] | `--spacing-lg` | [PLACEHOLDER: e.g., "Large padding, section gaps"]] | [PLACEHOLDER] |
| [PLACEHOLDER: e.g., "xl"]] | [PLACEHOLDER: e.g., "32"]] | [PLACEHOLDER: e.g., "2"]] | `--spacing-xl` | [PLACEHOLDER: e.g., "Extra large spacing between major sections"]] | [PLACEHOLDER] |
| [PLACEHOLDER: e.g., "2xl"]] | [PLACEHOLDER: e.g., "48"]] | [PLACEHOLDER: e.g., "3"]] | `--spacing-2xl` | [PLACEHOLDER: e.g., "Hero sections, major layout gaps"]] | [PLACEHOLDER] |
| [PLACEHOLDER: e.g., "3xl"]] | [PLACEHOLDER: e.g., "64"]] | [PLACEHOLDER: e.g., "4"]] | `--spacing-3xl` | [PLACEHOLDER: e.g., "Page-level spacing, hero to content gap"]] | [PLACEHOLDER] |

---

## Border Radius Tokens

| Token Name | Value (px) | CSS Variable | Usage | Notes |
|-----------|-----------|--------------|-------|-------|
| [PLACEHOLDER: e.g., "none"]] | [PLACEHOLDER: e.g., "0"]] | `--radius-none` | [PLACEHOLDER: e.g., "Rectangular elements"]] | [PLACEHOLDER] |
| [PLACEHOLDER: e.g., "sm"]] | [PLACEHOLDER: e.g., "2"]] | `--radius-sm` | [PLACEHOLDER: e.g., "Subtle rounding, input fields"]] | [PLACEHOLDER] |
| [PLACEHOLDER: e.g., "md"]] | [PLACEHOLDER: e.g., "4"]] | `--radius-md` | [PLACEHOLDER: e.g., "Buttons, cards, component corners"]] | [PLACEHOLDER: e.g., "Default rounding"]] |
| [PLACEHOLDER: e.g., "lg"]] | [PLACEHOLDER: e.g., "8"]] | `--radius-lg` | [PLACEHOLDER: e.g., "Larger components, dialog boxes"]] | [PLACEHOLDER] |
| [PLACEHOLDER: e.g., "xl"]] | [PLACEHOLDER: e.g., "12"]] | `--radius-xl` | [PLACEHOLDER: e.g., "Extra large cards, hero sections"]] | [PLACEHOLDER] |
| [PLACEHOLDER: e.g., "full"]] | [PLACEHOLDER: e.g., "9999px / 50%"]] | `--radius-full` | [PLACEHOLDER: e.g., "Circles, pill-shaped buttons"]] | [PLACEHOLDER] |

---

## Shadow Tokens

| Token Name | Box Shadow Value | CSS Variable | Elevation | Usage | Notes |
|-----------|-----------------|--------------|-----------|-------|-------|
| [PLACEHOLDER: e.g., "sm"]] | [PLACEHOLDER: e.g., "0 1px 2px rgba(0,0,0,0.05)"]] | `--shadow-sm` | 1 | [PLACEHOLDER: e.g., "Subtle elevation, hover state for cards"]] | [PLACEHOLDER] |
| [PLACEHOLDER: e.g., "md"]] | [PLACEHOLDER: e.g., "0 4px 6px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.08)"]] | `--shadow-md` | 2 | [PLACEHOLDER: e.g., "Standard elevation, default card shadow"]] | [PLACEHOLDER: e.g., "Most common shadow"]] |
| [PLACEHOLDER: e.g., "lg"]] | [PLACEHOLDER: e.g., "0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)"]] | `--shadow-lg` | 3 | [PLACEHOLDER: e.g., "Elevated modals, dropdowns"]] | [PLACEHOLDER] |
| [PLACEHOLDER: e.g., "xl"]] | [PLACEHOLDER: e.g., "0 20px 25px rgba(0,0,0,0.1), 0 10px 10px rgba(0,0,0,0.04)"]] | `--shadow-xl` | 4 | [PLACEHOLDER: e.g., "High-priority modals, floating panels"]] | [PLACEHOLDER] |

---

## Breakpoints

| Token Name | Width (px) | CSS Variable | Usage | Notes |
|-----------|-----------|--------------|-------|-------|
| [PLACEHOLDER: e.g., "Mobile"]] | [PLACEHOLDER: e.g., "320px"]] | `--breakpoint-mobile` | [PLACEHOLDER: e.g., "Base size, mobile-first"]] | [PLACEHOLDER: e.g., "Min width for mobile devices"]] |
| [PLACEHOLDER: e.g., "Tablet"]] | [PLACEHOLDER: e.g., "768px"]] | `--breakpoint-tablet` | [PLACEHOLDER: e.g., "@media (min-width: 768px)"]] | [PLACEHOLDER: e.g., "iPad and above"]] |
| [PLACEHOLDER: e.g., "Desktop"]] | [PLACEHOLDER: e.g., "1024px"]] | `--breakpoint-desktop` | [PLACEHOLDER: e.g., "@media (min-width: 1024px)"]] | [PLACEHOLDER: e.g., "Standard desktop viewports"]] |
| [PLACEHOLDER: e.g., "Wide"]] | [PLACEHOLDER: e.g., "1440px"]] | `--breakpoint-wide` | [PLACEHOLDER: e.g., "@media (min-width: 1440px)"]] | [PLACEHOLDER: e.g., "Large desktop, ultra-wide screens"]] |

---

## Container Widths

| Token Name | Width (px) | CSS Variable | Usage | Notes |
|-----------|-----------|--------------|-------|-------|
| [PLACEHOLDER: e.g., "Full"]] | [PLACEHOLDER: e.g., "100%"]] | `--container-full` | [PLACEHOLDER: e.g., "Full viewport width, hero sections"]] | [PLACEHOLDER] |
| [PLACEHOLDER: e.g., "Content"]] | [PLACEHOLDER: e.g., "1200px"]] | `--container-content` | [PLACEHOLDER: e.g., "Standard content wrapper, max width"]] | [PLACEHOLDER: e.g., "Most common container width"]] |
| [PLACEHOLDER: e.g., "Narrow"]] | [PLACEHOLDER: e.g., "960px"]] | `--container-narrow` | [PLACEHOLDER: e.g., "Narrower layouts, text-focused pages"]] | [PLACEHOLDER] |

---

## Z-Index Scale

| Token Name | Value | CSS Variable | Usage | Notes |
|-----------|-------|--------------|-------|-------|
| [PLACEHOLDER: e.g., "Hide"]] | [PLACEHOLDER: e.g., "-1"]] | `--z-hide` | [PLACEHOLDER: e.g., "Behind other elements"]] | [PLACEHOLDER] |
| [PLACEHOLDER: e.g., "Base"]] | [PLACEHOLDER: e.g., "0"]] | `--z-base` | [PLACEHOLDER: e.g., "Default stacking"]] | [PLACEHOLDER] |
| [PLACEHOLDER: e.g., "Overlay"]] | [PLACEHOLDER: e.g., "100"]] | `--z-overlay` | [PLACEHOLDER: e.g., "Modals, overlays"]] | [PLACEHOLDER] |
| [PLACEHOLDER: e.g., "Dropdown"]] | [PLACEHOLDER: e.g., "200"]] | `--z-dropdown` | [PLACEHOLDER: e.g., "Dropdowns, tooltips"]] | [PLACEHOLDER] |
| [PLACEHOLDER: e.g., "Fixed"]] | [PLACEHOLDER: e.g., "300"]] | `--z-fixed` | [PLACEHOLDER: e.g., "Fixed headers, sticky nav"]] | [PLACEHOLDER] |
| [PLACEHOLDER: e.g., "Modal"]] | [PLACEHOLDER: e.g., "400"]] | `--z-modal` | [PLACEHOLDER: e.g., "Modal dialogs, top priority"]] | [PLACEHOLDER] |

---

## Transitions & Animations

| Token Name | Duration | Easing | CSS Variable | Usage | Notes |
|-----------|----------|--------|--------------|-------|-------|
| [PLACEHOLDER: e.g., "Fast"]] | [PLACEHOLDER: e.g., "150ms"]] | [PLACEHOLDER: e.g., "ease-in-out"]] | `--transition-fast` | [PLACEHOLDER: e.g., "Quick feedback, hover states"]] | [PLACEHOLDER] |
| [PLACEHOLDER: e.g., "Normal"]] | [PLACEHOLDER: e.g., "300ms"]] | [PLACEHOLDER: e.g., "ease-in-out"]] | `--transition-normal` | [PLACEHOLDER: e.g., "Standard transitions"]] | [PLACEHOLDER: e.g., "Most common duration"]] |
| [PLACEHOLDER: e.g., "Slow"]] | [PLACEHOLDER: e.g., "500ms"]] | [PLACEHOLDER: e.g., "ease-in-out"]] | `--transition-slow` | [PLACEHOLDER: e.g., "Gradual fade-in, page transitions"]] | [PLACEHOLDER] |

---

## Implementation Status

| Token Category | Extracted | CSS Variables Created | Shopify Settings Added | Testing Complete | Notes |
|----------------|-----------|----------------------|------------------------|------------------|-------|
| Colors | [ ] | [ ] | [ ] | [ ] | [PLACEHOLDER] |
| Typography | [ ] | [ ] | [ ] | [ ] | [PLACEHOLDER] |
| Spacing | [ ] | [ ] | [ ] | [ ] | [PLACEHOLDER] |
| Border Radius | [ ] | [ ] | [ ] | [ ] | [PLACEHOLDER] |
| Shadows | [ ] | [ ] | [ ] | [ ] | [PLACEHOLDER] |
| Breakpoints | [ ] | [ ] | [ ] | [ ] | [PLACEHOLDER] |
| Z-Index | [ ] | [ ] | [ ] | [ ] | [PLACEHOLDER] |
| Transitions | [ ] | [ ] | [ ] | [ ] | [PLACEHOLDER] |

---

## Next Steps

1. [ ] Review and approve all token values
2. [ ] Create CSS custom properties in main stylesheet
3. [ ] Add corresponding Shopify theme settings
4. [ ] Test token usage across components
5. [ ] Document any platform-specific implementations
6. [ ] Update team documentation with token naming conventions

---

**Created By**: [NAME]

**Last Updated**: [DATE]

**Status**: [DRAFT / REVIEW / APPROVED / IMPLEMENTED]
