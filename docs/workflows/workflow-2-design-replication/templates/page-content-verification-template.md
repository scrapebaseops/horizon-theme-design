# Page Content Verification Template

<!--
Use this file during Phase 4 to verify every page section against the Workflow 1 content spec.
Create one row per page section.
-->

# Page Content Verification

| page | preview_route | template_file | spec_section_name | template_section_id | order_index | content_source | screenshot_1440 | screenshot_768 | screenshot_390 | console_status | verified | notes |
|------|---------------|---------------|-------------------|---------------------|-------------|----------------|-----------------|----------------|----------------|----------------|----------|-------|
| Homepage | / | templates/index.json | Hero | hero | 1 | static | .workflow/implementation-screenshots/homepage-1440.png | .workflow/implementation-screenshots/homepage-768.png | .workflow/implementation-screenshots/homepage-390.png | clean | yes | Matches spec order and content |
| Homepage | / | templates/index.json | Featured Products | featured_products | 2 | dynamic `{{ collection.products }}` | .workflow/implementation-screenshots/homepage-1440.png | .workflow/implementation-screenshots/homepage-768.png | .workflow/implementation-screenshots/homepage-390.png | clean | yes | Dynamic content verified |

## Rules

- `content_source` must clearly identify `static`, dynamic `{{ ... }}`, or `[MERCHANT: ...]`.
- Generic filler such as `Heading`, `Lorem ipsum`, empty CTA labels, or placeholder images fail unless explicitly marked `[MERCHANT: ...]`.
- `order_index` must match the order in the Workflow 1 content spec.
- `verified=yes` requires all three screenshots and a clean console result.
