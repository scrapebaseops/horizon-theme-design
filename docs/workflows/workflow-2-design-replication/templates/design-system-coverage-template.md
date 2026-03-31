# Design System Coverage Template

<!--
Use this file to prove the design system reference page is complete.
Create one row per component + variant + state combination documented in component-inventory.md.
-->

# Design System Coverage

| component | variant | state | ds_section | demo_selector_or_anchor | screenshot_path | verified | notes |
|-----------|---------|-------|-----------|--------------------------|----------------|----------|-------|
| Primary Button | md | default | buttons | #buttons .lxn-btn--primary-demo | .workflow/final-screenshots/design-system-1440.png | yes | Visible primary button demo |
| Primary Button | md | hover | buttons | #buttons .lxn-btn--primary.is-hover | .workflow/final-screenshots/design-system-1440.png | yes | Forced hover demo |
| Primary Button | md | focus | buttons | #buttons .lxn-btn--primary.is-focus | .workflow/final-screenshots/design-system-1440.png | yes | Forced focus demo |
| Form Input | default | error | forms | #forms .lxn-input.is-error | .workflow/final-screenshots/design-system-1440.png | yes | Error-state input |

## Rules

- Do not collapse multiple states into one row.
- If a state normally requires interaction, create a forced-state demo on the page (`is-hover`, `is-focus`, `is-active`, disabled, loading, etc.).
- A component is incomplete if any required row is missing, unverified, or points to a non-rendered demo.
