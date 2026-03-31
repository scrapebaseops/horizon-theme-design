# Page Spec Coverage Template

<!--
Use this file as the source of truth for Workflow 1 page-spec completeness.
Create one row per page in site-structure.md before Step 4 begins.
-->

# Page Spec Coverage

| page_name | template | required | spec_file | expected_section_count | status | notes |
|-----------|----------|----------|-----------|------------------------|--------|-------|
| Homepage | index | yes | pages/index.md | 8 | complete | Core conversion page |
| Product Page | product | yes | pages/product.md | 9 | complete | Includes variant selector and trust sections |
| FAQ | page.faq | yes | pages/page-faq.md | 6 | in-progress | Draft pending brand-voice pass |

## Status Values

- `not-started`
- `in-progress`
- `complete`
- `needs-repair`

## Rules

- Every required page from `site-structure.md` must appear here.
- `expected_section_count` is the number of top-level sections the final spec must contain.
- `status=complete` requires the spec file to exist and include metadata, ordered sections, draft copy, content sources, configurable settings, and responsive notes.
