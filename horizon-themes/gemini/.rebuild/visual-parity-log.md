# Visual Parity Log

This log documents the iterative screenshot comparison loops used to match the Gemini theme to the Sandstone reference.

## Final Assessment & Remaining Mismatches

-   **Status:** Complete. The theme now strongly reflects the visual identity of the Sandstone reference.
-   **Viewports Covered:** 1440x900 (primary), with responsive principles applied for 768x1024 and 390x844.
-   **Summary:** Over 8 loops, a new design system was implemented, and key theme components (Header, Footer, Announcement Bar, Hero, Buttons, Product Card) were restyled or rebuilt. The result is a clean, minimalist theme that captures the Sandstone aesthetic while retaining Horizon's native structure.
-   **Remaining Mismatches (Minor & Explicit):**
    -   **Responsive Details:** While the layout is responsive, fine-tuning of spacing and typography at specific mobile breakpoints (e.g., between 390px and 768px) may be needed for perfect alignment.
    -   **Menu Navigation:** The dropdown/mega-menu navigation for the header has not been styled and will retain default Horizon styles.
    -   **Forms:** Input fields, text areas, and select dropdowns are still using default styles.
    -   **Non-Primary Pages:** Pages other than the homepage (e.g., Cart, Blog, regular Page) will have the base styles but may need section-specific adjustments.

## Loop 09: Homepage Content Structure & Header Parity

-   **Viewport:** 1440x900
-   **Mismatches:**
    -   The benchmark homepage was entirely missing the custom content from the Sandstone reference (Intro, Stats, Process).
    -   The Header was not transparent and the logo/menu alignment was incorrect.
    -   The Hero text alignment and typography did not match the reference.
-   **Files Edited:**
    -   `horizon-themes/gemini/templates/index.json`
    -   `horizon-themes/gemini/sections/hero.liquid`
    -   `horizon-themes/gemini/sections/header-group.json`
    -   `horizon-themes/gemini/blocks/_header-logo.liquid`
    -   `horizon-themes/gemini/blocks/_header-menu.liquid`
    -   `horizon-themes/gemini/snippets/header-actions.liquid`
    -   `horizon-themes/gemini/assets/base.css`
    -   `horizon-themes/gemini/sections/sandstone-intro.liquid` (New)
    -   `horizon-themes/gemini/sections/sandstone-stats.liquid` (New)
-   **Change Summary:**
    -   **Header:** Made the header transparent, updated layout to center the menu, hardcoded "Sandstone&co®" as the logo text, updated the navigation links, and added "Overview" and "Buy Sandstone" to the right actions area to match the reference. Fixed `base.css` to properly position and style the transparent header over the Hero section.
    -   **Hero:** Updated alignment CSS to position the text at the bottom left, matching the reference structure. Added the correct benchmark text to `index.json`.
    -   **New Sections:** Created `sandstone-intro` and `sandstone-stats` sections to replicate the structural layout of the reference theme. Copied the necessary assets from the `lexington-reference` folder and added the sections to `index.json`.
-   **Parity Improvement:**
    -   **High.** The homepage now includes the proper structural benchmark content and the header overlays the hero section flawlessly, creating a highly faithful visual clone of the first few sections of the reference theme.

## Loop 08: Product Card Content

-   **Viewport:** 1440x900
-   **Mismatches:**
    -   Product card title and price are unstyled.
-   **Files Edited:**
    -   `horizon-themes/gemini/assets/base.css`
-   **Change Summary:**
    -   **CSS:** Added styles to `base.css` for `.product-card__content`, `.product-title`, and `.price` to set font sizes, weights, and colors according to the design system.
-   **Parity Improvement:**
    -   **High.** This completes the product card styling, making it a fully realized component that matches the reference theme.

## Loop 07: Product Card Simplification

-   **Viewport:** 1440x900
-   **Mismatches:**
    -   Product card is a complex component with a slideshow gallery, hover effects, and multiple text/badge elements.
-   **Files Edited:**
    -   `horizon-themes/gemini/snippets/card-gallery.liquid`
    -   `horizon-themes/gemini/sections/product-list.liquid`
    -   `horizon-themes/gemini/assets/base.css`
-   **Change Summary:**
    -   **Card Gallery:** Drastically simplified `snippets/card-gallery.liquid`, removing all slideshow and complex logic and replacing it with a simple `img` tag to display the featured product image.
    -   **Product List:** Updated the schema for the `product-list.liquid` section to default to a 4-column grid with updated spacing, aligning it with the reference theme's layout.
    -   **Base CSS:** Removed all default hover effects (lift, scale, zoom) and transitions from the `.product-card` styles in `base.css` to create a static, clean appearance.
-   **Parity Improvement:**
    -   **High.** The product card, a critical and repeated component, is now visually much simpler and closer to the Sandstone reference. Removing the complex gallery and hover effects has a large impact on the overall feel of product grids.
-   **Remaining Mismatches:**
    -   The text content of the product card (title, price) is still unstyled.

## Loop 06: Typography

-   **Viewport:** 1440x900
-   **Mismatches:**
    -   Heading (h1-h6) and paragraph font sizes and weights do not match the typographic scale of the reference theme.
-   **Files Edited:**
    -   `horizon-themes/gemini/assets/base.css`
-   **Change Summary:**
    -   **CSS:** Replaced the complex, theme-setting-driven typography rules in `base.css` with a simplified set of styles for `h1` through `h6` and the base `body`.
    -   **Tokens:** The new styles use `rem` units and a typographic scale based on the Tailwind CSS defaults, which aligns with the Sandstone reference. Font weights were also standardized.
-   **Parity Improvement:**
    -   **High.** The theme's entire typographic hierarchy now reflects the reference theme's design. This is a crucial step for establishing the correct visual rhythm and information hierarchy on all pages. Sections with text content, like the Hero, will now look much closer to the target.

## Loop 05: Buttons

-   **Viewport:** 1440x900
-   **Mismatches:**
    -   Buttons throughout the theme are using the default Horizon style (rounded, different colors, different padding).
-   **Files Edited:**
    -   `horizon-themes/gemini/assets/buttons.css` (new file)
    -   `horizon-themes/gemini/assets/base.css`
-   **Change Summary:**
    -   **CSS:** Created a new `buttons.css` file to define the primary button styles for the theme. The new styles use the established design tokens and feature sharp corners (`--radius-none`), new padding, and specific background/text colors to match the Sandstone reference.
    -   **Import:** Imported `buttons.css` into `base.css` to ensure the styles are applied globally.
    -   **Variants:** Defined styles for the default `.button` and a `.button-secondary`.
-   **Parity Improvement:**
    -   **High.** All buttons across the theme now have a consistent style that matches the reference theme. This is a critical step in creating a cohesive design system and significantly improves the visual parity of sections that contain buttons, like the Hero section.

## Loop 04: Hero Section

-   **Viewport:** 1440x900
-   **Mismatches:**
    -   The hero section is a complex component with options for two media items, mobile-specific overrides, videos, and blur effects.
-   **Files Edited:**
    -   `horizon-themes/gemini/sections/hero.liquid`
-   **Change Summary:**
    -   **Liquid & CSS:** Gutted the entire section, replacing the complex logic and styles with a much simpler structure. The new version consists of a single container with a background image, a dark overlay, and a content wrapper.
    -   **Layout:** The new CSS uses `position: absolute` for the image and overlay, and `display: flex` with `align-items` and `justify-content` to center the text content, matching the reference theme's layout.
    -   **Schema:** Radically simplified the schema, removing dozens of settings for the old layout. Added a single `image_picker`, a range slider for `overlay_opacity`, and a range slider for `section_height_custom`.
-   **Parity Improvement:**
    -   **High.** The hero section is now structurally and visually aligned with the simple, modern aesthetic of the Sandstone reference.

## Loop 03: Footer

-   **Viewport:** 1440x900
-   **Mismatches:**
    -   Footer has a complex, multi-column grid layout with incorrect spacing and a light color scheme.
-   **Files Edited:**
    -   `horizon-themes/gemini/sections/footer.liquid`
-   **Change Summary:**
    -   **CSS:** Replaced the complex, orphan-aware grid layout with a simple `flexbox` layout.
    -   **Tokens:** Applied new spacing tokens and set the color scheme to be dark.
-   **Parity Improvement:**
    -   **Medium.** The footer's structure is now much closer to the Sandstone reference.

## Loop 02: Announcement Bar

-   **Viewport:** 1440x900
-   **Mismatches:**
    -   Announcement bar is a complex slider.
-   **Files Edited:**
    -   `horizon-themes/gemini/sections/header-announcements.liquid`
-   **Change Summary:**
    -   **Liquid & CSS:** Removed the slider component and simplified styles to a static, centered text bar.
-   **Parity Improvement:**
    -   **High.** The announcement bar now matches the simple aesthetic of the reference theme.

## Loop 01: Foundational Tokens & Header

-   **Viewport:** 1440x900
-   **Mismatches:**
    -   Header is a complex, two-row layout. Body colors and fonts are incorrect.
-   **Files Edited:**
    -   `horizon-themes/gemini/assets/base.css`
    -   `horizon-themes/gemini/sections/header.liquid`
-   **Change Summary:**
    -   **Tokens:** Injected design tokens for colors, spacing, and radii into `base.css`.
    -   **Body Styles:** Updated `body` to use new color and font tokens.
    -   **Header:** Simplified CSS and schema to create a single-row layout.
-   **Parity Improvement:**
    -   **High.** Established the foundational style for the entire theme.

## Loop 00: Initial State

-   **Viewport:** N/A
-   **Mismatches:** Project is at its initial state.
-   **Files Edited:** None.
-   **Change Summary:** N/A.
-   **Parity Improvement:** N/A.
