# Reference Page Manifest Template

<!--
Use this file as the source of truth for Phase 1 and Phase 5 counts.
Create one row for every reference layout or global chrome state that must be audited or verified.
Do not infer totals from memory or from raw file counts once this file exists.
-->

# Reference Page Manifest

| reference_id | name | kind | unique_layout_id | implementation_target | clonable | required_reference_artifacts | required_clone_artifacts | notes |
|--------------|------|------|------------------|-----------------------|----------|------------------------------|--------------------------|-------|
| homepage | Homepage | page | layout-homepage | clone-template | yes | homepage-1440, homepage-768, homepage-390 | clone-homepage-1440, clone-homepage-768, clone-homepage-390 | Primary homepage layout |
| product-default | Product Page - Default Layout | page | layout-product-default | clone-template | yes | product-default-1440, product-default-768, product-default-390 | clone-product-default-1440, clone-product-default-768, clone-product-default-390 | Shared by products A/B/C |
| header-default | Header Default | header | chrome-header | header-footer-override | no | header-default-1440, header-default-768, header-default-390 | header-default-1440, header-default-768, header-default-390 | Global header at rest |
| header-sticky | Header Sticky | header | chrome-header | header-footer-override | no | header-sticky-1440, header-sticky-768, header-sticky-390 | header-sticky-1440, header-sticky-768, header-sticky-390 | Sticky state |
| footer-default | Footer Default | footer | chrome-footer | header-footer-override | no | footer-1440, footer-768, footer-390 | footer-1440, footer-768, footer-390 | Global footer |

## Rules

- `unique_layout_id` groups visually identical reference pages under one clonable layout.
- `implementation_target=clone-template` means the row must appear in `clone-template-map.md`.
- `implementation_target=header-footer-override` means the row is verified via Horizon overrides, not a clone template.
- `required_reference_artifacts` and `required_clone_artifacts` are exact ids; every id must resolve to a real screenshot file.
- If two reference pages share one clone layout, keep separate `reference_id` rows but give them the same `unique_layout_id`.
