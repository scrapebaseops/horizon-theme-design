# QA Interactive States Template

<!--
Use this file in Phase 5 to log evidence for every interactive element/state combination.
-->

# Interactive State QA

| element | page | default | hover | focus | active | disabled | loading | error | success | evidence | notes |
|---------|------|---------|-------|-------|--------|----------|---------|-------|---------|----------|-------|
| Primary Button | Homepage | pass | pass | pass | pass | pass | n/a | n/a | n/a | .workflow/final-screenshots/homepage-1440.png | All visible states verified |
| Newsletter Input | Homepage | pass | n/a | pass | n/a | n/a | n/a | pass | pass | .workflow/final-screenshots/homepage-1440.png | Error/success validated with form state |
| Variant Selector | Product | pass | pass | pass | pass | unavailable | n/a | n/a | n/a | .workflow/final-screenshots/product-page-1440.png | Includes unavailable option state |

## Rules

- Use `pass`, `fail`, or `n/a` in every state column.
- Every row must include evidence.
- Empty cells are incomplete.
