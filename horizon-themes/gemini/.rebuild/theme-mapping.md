# Theme Mapping: Lexington Sandstone -> Horizon Gemini

This document maps the design system tokens and UI patterns from the `lexington-reference/sandstone_v6` theme to their intended implementation in the `horizon-themes/gemini` theme.

## 1. Design Tokens

| Token Type | Sandstone Reference (Anticipated) | Gemini Implementation Target |
|---|---|---|
| **Typography** | Font families, size scale, weights | `assets/base.css` CSS variables (`--font-family-*`, `--font-size-*`) |
| **Colors** | Primary, secondary, accent, neutral palette | `assets/base.css` CSS variables (`--color-primary`, etc.), mapped to Shopify color schemes. |
| **Spacing** | 0.25rem-based scale (e.g., 4px, 8px, 16px) | `assets/base.css` CSS variables (`--spacing-1`, `--spacing-2`, etc.) |
| **Border Radius** | System for cards, buttons, inputs | `assets/base.css` CSS variables (`--radius-small`, `--radius-medium`) |
| **Shadows** | Consistent elevation styles | `assets/base.css` CSS variables (`--shadow-medium`) |
| **Containers** | Max-widths, padding | `assets/base.css` general styles for `.container`, `.page-width` |

## 2. UI Patterns & Component Mapping

| Sandstone Pattern | Gemini Implementation Target | Notes |
|---|---|---|
| Header / Navigation | `sections/header.liquid` | Will require style updates for layout, colors, and typography. |
| Hero Section | `sections/image-with-text.liquid` (or similar) | Adapt existing section to match Sandstone's hero layout and style. |
| Footer | `sections/footer.liquid` | Style updates needed for layout and content. |
| Product Card | `snippets/product-card.liquid` | Critical component. Focus on grid layout, image aspect ratio, text styles. |
| Buttons | `assets/base.css` (`.button`, `.button--primary`) | Define base styles and variations. |
| Cards (Generic) | `snippets/card.liquid` | Refactor into a reusable primitive for consistency. |

