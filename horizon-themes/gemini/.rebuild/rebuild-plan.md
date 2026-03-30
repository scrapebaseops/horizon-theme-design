# Rebuild Plan: Lexington Sandstone -> Horizon Gemini

This plan outlines the phased approach to rebuilding the Sandstone visual language within the Gemini theme.

## Phase 1: Audit & Foundation (Current)

1.  **Analyze Source Files:** Review `sandstone_v6` and `gemini` to finalize the `theme-mapping.md`.
2.  **Establish Token Layer:** Create foundational CSS custom properties for colors, typography, spacing, and radii in `assets/base.css`.
3.  **Benchmark Pages:** Define benchmark pages in `benchmark-spec.md`. No file creation yet.

## Phase 2: Benchmark & Parity Loops

1.  **Create Benchmark Template:** Create a `template.benchmark.json` and `sections/benchmark-group.liquid` to host sections for comparison.
2.  **Homepage Parity (Loop 1-5+):**
    *   **Loop 1: Header & Announcement Bar.** Match layout, color, and typography.
    *   **Loop 2: Hero Section.** Adapt `image-with-text` to match reference.
    *   **Loop 3: Product Grid.** Style `product-card.liquid` and the collection section.
    *   **Loop 4: Footer.** Match layout, columns, and styles.
    *   **Loop 5: Responsive Polish.** Refine spacing and layout across all viewports.
3.  **Product Page Parity (Post-Homepage):**
    *   Focus on the product gallery, variant picker, and description styles.

## Phase 3: Token & Primitive Refinement

1.  **Solidify Tokens:** Refactor hardcoded values from parity loops into the CSS variable system.
2.  **Create Primitives:** Abstract common patterns (e.g., generic card, section headings) into reusable snippets.

## Phase 4: Full Site Rollout & QA

1.  **Apply System:** Apply the design system to remaining templates (Collection, Blog, Cart).
2.  **Final QA:** Perform a final visual review to catch inconsistencies.

