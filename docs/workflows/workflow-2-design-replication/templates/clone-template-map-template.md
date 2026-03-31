# Clone Template Map Template

<!--
Use this file to map each clonable layout from reference-page-manifest.md
to one Shopify template file and one preview route.
One row per unique_layout_id where clonable=yes.
-->

# Clone Template Map

| unique_layout_id | template_file | preview_route | screenshot_base_name | covered_reference_ids | notes |
|------------------|---------------|---------------|----------------------|-----------------------|-------|
| layout-homepage | templates/page.clone-homepage.json | /pages/clone-homepage | clone-homepage | homepage | Homepage clone route |
| layout-product-default | templates/product.clone-lxn-product.json | /products/example-product?view=clone-lxn-product | clone-product-default | product-default | Product clone using real product route |

## Rules

- Every `unique_layout_id` in `reference-page-manifest.md` with `clonable=yes` must appear exactly once here.
- `preview_route` must be a real, previewable URL that renders the intended template.
- `screenshot_base_name` is the canonical prefix for clone screenshots in Phase 1 and Phase 5.
- `covered_reference_ids` must list every manifest row covered by the clone template.
