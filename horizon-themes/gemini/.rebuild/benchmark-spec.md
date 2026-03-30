# Benchmark Specification

This document specifies the pages and content used for visual parity comparison between the Sandstone reference and the Gemini implementation.

## Viewports

All benchmark comparisons will be performed at the following required viewports:
- **Desktop:** 1440x900
- **Tablet:** 768x1024
- **Mobile:** 390x844

## Benchmark Pages

### 1. Homepage

-   **Purpose:** To validate the core design system, global styles, and primary section layouts.
-   **Gemini Template:** `templates/index.json`
-   **Key Sections for Comparison:**
    -   Announcement Bar
    -   Header
    -   Hero / Image with Text
    -   Featured Collection / Product Grid
    -   Rich Text / Content Section
    -   Footer

### 2. Product Detail Page (PDP)

-   **Purpose:** To validate product-specific component styling and layout.
-   **Gemini Template:** `templates/product.json`
-   **Key Sections for Comparison:**
    -   Product Gallery / Media
    -   Product Information (Title, Price, Description)
    -   Variant Picker / Shoppable UI
    -   Add to Cart Button
    -   Product Recommendations

### 3. Collection Page (PLP)

-   **Purpose:** To validate the product grid under different conditions and filtering UI.
-   **Gemini Template:** `templates/collection.json`
-   **Key Sections for Comparison:**
    -   Collection Header
    -   Filter and Sort Sidebar/Drawer
    -   Product Grid (repeat of `product-card`)
    -   Pagination
