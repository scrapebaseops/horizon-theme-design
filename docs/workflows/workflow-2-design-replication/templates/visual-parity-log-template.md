# Visual Parity Log Template

<!-- INSTRUCTIONS: Use this template to track screenshot comparison loops during design replication.
Each loop documents a single round of comparing the reference design against the implementation,
identifying differences, making changes, and verifying the result. Fill in all [PLACEHOLDER] sections.
Keep one log per major component or page for clarity. -->

---

## Log Overview

**Component/Section/Page**: [PLACEHOLDER: e.g., "Product Card Component"]

**Reference Design**: [PLACEHOLDER: Link to Figma file, screenshot location, or reference page]

**Implementation File(s)**: [PLACEHOLDER: e.g., "blocks/product-card.liquid, assets/product-card.css"]

**Starting Date**: [DATE]

**Target Completion**: [DATE]

---

## Overall Progress Summary

| Aspect | Status | Notes |
|--------|--------|-------|
| **Desktop Visual Match** | [0% / 25% / 50% / 75% / 100%] | [PLACEHOLDER: e.g., "Missing pricing styling, button hover states"] |
| **Tablet Visual Match** | [0% / 25% / 50% / 75% / 100%] | [PLACEHOLDER: e.g., "Layout is correct, spacing needs adjustment"] |
| **Mobile Visual Match** | [0% / 25% / 50% / 75% / 100%] | [PLACEHOLDER: e.g., "Complete, ready for sign-off"] |
| **Interaction States** | [0% / 25% / 50% / 75% / 100%] | [PLACEHOLDER: e.g., "Hover states done, focus states pending"] |
| **Accessibility** | [0% / 25% / 50% / 75% / 100%] | [PLACEHOLDER: e.g., "Color contrast verified, need to add ARIA labels"] |

**Overall Completion**: [0% / 25% / 50% / 75% / 100%]

---

## Loop Entries

<!-- Create one entry per comparison round. Duplicate this entire section for each loop. Keep in chronological order. -->

### Loop 1: [PLACEHOLDER: e.g., "Initial Layout Comparison"]

**Date**: [DATE]

**Loop Number**: 1

**Target Component**: [PLACEHOLDER: e.g., "Product Card - desktop layout"]

**Viewport(s) Tested**:
- [ ] Desktop (1440px)
- [ ] Tablet (768px)
- [ ] Mobile (375px)

---

#### Screenshot Comparison

| Aspect | Reference | Implementation | Notes |
|--------|-----------|-----------------|-------|
| **Screenshot Path** | [PLACEHOLDER: e.g., "reference-screenshots/product-card-desktop.png"] | [PLACEHOLDER: e.g., "implementation-screenshots/product-card-loop1-desktop.png"] | Keep both at same zoom level (100%) |
| **Zoom Level** | 100% | 100% | Document zoom to ensure fair comparison |

---

#### Differences Found

<!-- For each visible difference, document it here. -->

**Difference 1**:
- **Severity**: [critical / major / minor / trivial]
- **Component/Area**: [PLACEHOLDER: e.g., "Product image container"]
- **Description**: [PLACEHOLDER: e.g., "Image aspect ratio is 3:2 in reference but 4:3 in implementation"]
- **Visual Impact**: [PLACEHOLDER: e.g., "Product looks more stretched and less balanced"]
- **Root Cause**: [PLACEHOLDER: e.g., "CSS missing aspect-ratio property; using fixed height instead"]

**Difference 2**:
- **Severity**: [critical / major / minor / trivial]
- **Component/Area**: [PLACEHOLDER: e.g., "Product title typography"]
- **Description**: [PLACEHOLDER: e.g., "Font weight is 600 in reference, but 400 in implementation"]
- **Visual Impact**: [PLACEHOLDER: e.g., "Title appears lighter and less prominent"]]
- **Root Cause**: [PLACEHOLDER: e.g., "Font weight CSS class not applied to title element"]

**Difference 3**:
- **Severity**: [critical / major / minor / trivial]
- **Component/Area**: [PLACEHOLDER]
- **Description**: [PLACEHOLDER]
- **Visual Impact**: [PLACEHOLDER]
- **Root Cause**: [PLACEHOLDER]

---

#### Changes Made

<!-- Document what you changed to fix the differences. -->

**Change 1**:
- **File**: [PLACEHOLDER: e.g., "blocks/product-card.liquid"]
- **Line(s)**: [PLACEHOLDER: e.g., "45-48"]
- **What Changed**: [PLACEHOLDER: e.g., "Changed product image wrapper height from 250px to use aspect-ratio: 3 / 2;"]
- **Before**: [PLACEHOLDER: e.g., `height: 250px;`]
- **After**: [PLACEHOLDER: e.g., `aspect-ratio: 3 / 2;`]
- **Reason**: [PLACEHOLDER: e.g., "aspect-ratio maintains proportions across responsive sizes better than fixed height"]

**Change 2**:
- **File**: [PLACEHOLDER: e.g., "blocks/product-card.liquid"]]
- **Line(s)**: [PLACEHOLDER: e.g., "32-34"]]
- **What Changed**: [PLACEHOLDER: e.g., "Added 'font-weight-600' class to product title element"]
- **Before**: [PLACEHOLDER: e.g., `<h3 class="product-title">{{ product.title }}</h3>`]]
- **After**: [PLACEHOLDER: e.g., `<h3 class="product-title font-weight-600">{{ product.title }}</h3>`]]
- **Reason**: [PLACEHOLDER: e.g., "Matches reference design weight of 600; was inheriting default 400"]]

---

#### Result After Changes

**Improvement Level**: [no-change / slight / significant / complete-match]

**Details**:
- **Desktop Match**: [30% / 60% / 90% / 100%] — [PLACEHOLDER: e.g., "Image aspect ratio now correct; font weight fixed"]
- **Tablet Match**: [30% / 60% / 90% / 100%] — [PLACEHOLDER: e.g., "Not yet tested"]
- **Mobile Match**: [30% / 60% / 90% / 100%] — [PLACEHOLDER: e.g., "Not yet tested"]

---

#### Remaining Differences

- [PLACEHOLDER: e.g., "Product price color is still slightly different (reference #666, impl #777)"]
- [PLACEHOLDER: e.g., "Add to cart button padding needs adjustment"]
- [PLACEHOLDER: e.g., "Spacing below image slightly different on tablet"]

---

#### Sign-Off

**Current Status**: [not-ready / needs-revision / ready-for-next-viewport / complete]

**Approved for Desktop 100%?**: [ ] Yes  [ ] No

**Reviewer**: [NAME]

**Notes**: [PLACEHOLDER: e.g., "Good progress. Need to test tablet next. Mobile will need responsive adjustments."]

---

### Loop 2: [PLACEHOLDER: e.g., "Tablet Responsive Testing"]

**Date**: [DATE]

**Loop Number**: 2

**Target Component**: [PLACEHOLDER: e.g., "Product Card - tablet layout (768px)"]

**Viewport(s) Tested**:
- [ ] Desktop (1440px) — carry forward from loop 1
- [ ] Tablet (768px) — NEW THIS LOOP
- [ ] Mobile (375px)

---

#### Screenshot Comparison

| Aspect | Reference | Implementation | Notes |
|--------|-----------|-----------------|-------|
| **Screenshot Path** | [PLACEHOLDER: e.g., "reference-screenshots/product-card-tablet.png"] | [PLACEHOLDER: e.g., "implementation-screenshots/product-card-loop2-tablet.png"] | Tablet viewport: 768px width |
| **Zoom Level** | 100% | 100% | Document zoom level |

---

#### Differences Found

**Difference 1**:
- **Severity**: [critical / major / minor / trivial]
- **Component/Area**: [PLACEHOLDER]
- **Description**: [PLACEHOLDER]
- **Visual Impact**: [PLACEHOLDER]
- **Root Cause**: [PLACEHOLDER]

**Difference 2**:
- **Severity**: [critical / major / minor / trivial]
- **Component/Area**: [PLACEHOLDER]
- **Description**: [PLACEHOLDER]
- **Visual Impact**: [PLACEHOLDER]
- **Root Cause**: [PLACEHOLDER]

---

#### Changes Made

**Change 1**:
- **File**: [PLACEHOLDER]
- **Line(s)**: [PLACEHOLDER]
- **What Changed**: [PLACEHOLDER]
- **Before**: [PLACEHOLDER]
- **After**: [PLACEHOLDER]
- **Reason**: [PLACEHOLDER]

---

#### Result After Changes

**Improvement Level**: [no-change / slight / significant / complete-match]

**Details**:
- **Desktop Match**: [%] — [PLACEHOLDER]
- **Tablet Match**: [%] — [PLACEHOLDER]
- **Mobile Match**: [%] — [Not yet tested]

---

#### Remaining Differences

- [PLACEHOLDER]
- [PLACEHOLDER]

---

#### Sign-Off

**Current Status**: [not-ready / needs-revision / ready-for-next-viewport / complete]

**Approved for Tablet 100%?**: [ ] Yes  [ ] No

**Reviewer**: [NAME]

**Notes**: [PLACEHOLDER]

---

### Loop 3: [PLACEHOLDER: e.g., "Mobile Responsive Testing"]

**Date**: [DATE]

**Loop Number**: 3

**Target Component**: [PLACEHOLDER: e.g., "Product Card - mobile layout (375px)"]

**Viewport(s) Tested**:
- [ ] Desktop (1440px) — carry forward from loop 1
- [ ] Tablet (768px) — carry forward from loop 2
- [ ] Mobile (375px) — NEW THIS LOOP

---

#### Screenshot Comparison

| Aspect | Reference | Implementation | Notes |
|--------|-----------|-----------------|-------|
| **Screenshot Path** | [PLACEHOLDER: e.g., "reference-screenshots/product-card-mobile.png"] | [PLACEHOLDER: e.g., "implementation-screenshots/product-card-loop3-mobile.png"] | Mobile viewport: 375px width |
| **Zoom Level** | 100% | 100% | Document zoom level |

---

#### Differences Found

**Difference 1**:
- **Severity**: [critical / major / minor / trivial]
- **Component/Area**: [PLACEHOLDER]
- **Description**: [PLACEHOLDER]
- **Visual Impact**: [PLACEHOLDER]
- **Root Cause**: [PLACEHOLDER]

---

#### Changes Made

**Change 1**:
- **File**: [PLACEHOLDER]
- **Line(s)**: [PLACEHOLDER]
- **What Changed**: [PLACEHOLDER]
- **Before**: [PLACEHOLDER]
- **After**: [PLACEHOLDER]
- **Reason**: [PLACEHOLDER]

---

#### Result After Changes

**Improvement Level**: [no-change / slight / significant / complete-match]

**Details**:
- **Desktop Match**: [%] — [PLACEHOLDER]
- **Tablet Match**: [%] — [PLACEHOLDER]
- **Mobile Match**: [%] — [PLACEHOLDER]

---

#### Remaining Differences

- [PLACEHOLDER]

---

#### Sign-Off

**Current Status**: [not-ready / needs-revision / ready-for-next-viewport / complete]

**Approved for Mobile 100%?**: [ ] Yes  [ ] No

**Reviewer**: [NAME]

**Notes**: [PLACEHOLDER]

---

### Loop 4: [PLACEHOLDER: e.g., "Interaction States (Hover, Focus, Active)"]

**Date**: [DATE]

**Loop Number**: 4

**Target Component**: [PLACEHOLDER: e.g., "Product Card - interaction states"]

**Viewport(s) Tested**:
- [x] Desktop (1440px) — testing all states
- [ ] Tablet (768px)
- [ ] Mobile (375px)

---

#### Screenshot Comparison

| State | Reference | Implementation | Notes |
|-------|-----------|-----------------|-------|
| **Default** | [PLACEHOLDER: path] | [PLACEHOLDER: path] | No interaction |
| **Hover** | [PLACEHOLDER: path] | [PLACEHOLDER: path] | Mouse over product card |
| **Focus** | [PLACEHOLDER: path] | [PLACEHOLDER: path] | Keyboard tab to card |
| **Active** | [PLACEHOLDER: path] | [PLACEHOLDER: path] | Clicking card |

---

#### Differences Found

**Difference 1**:
- **Severity**: [critical / major / minor / trivial]
- **State Affected**: [default / hover / focus / active]
- **Component/Area**: [PLACEHOLDER]
- **Description**: [PLACEHOLDER]
- **Visual Impact**: [PLACEHOLDER]
- **Root Cause**: [PLACEHOLDER]

---

#### Changes Made

**Change 1**:
- **File**: [PLACEHOLDER]
- **Line(s)**: [PLACEHOLDER]
- **What Changed**: [PLACEHOLDER]
- **Before**: [PLACEHOLDER]
- **After**: [PLACEHOLDER]
- **Reason**: [PLACEHOLDER]

---

#### Result After Changes

**Improvement Level**: [no-change / slight / significant / complete-match]

**Details**:
- **Hover State**: [not-started / partial / complete] — [PLACEHOLDER]
- **Focus State**: [not-started / partial / complete] — [PLACEHOLDER]
- **Active State**: [not-started / partial / complete] — [PLACEHOLDER]

---

#### Remaining Differences

- [PLACEHOLDER]

---

#### Sign-Off

**Current Status**: [not-ready / needs-revision / ready-for-next-stage / complete]

**Approved for Interactions?**: [ ] Yes  [ ] No

**Reviewer**: [NAME]

**Notes**: [PLACEHOLDER]

---

## Completion Checklist

- [ ] Desktop visual parity verified at 100% zoom
- [ ] Tablet visual parity verified at 100% zoom
- [ ] Mobile visual parity verified at 100% zoom
- [ ] Hover states match reference
- [ ] Focus states match reference (keyboard navigation)
- [ ] Active/clicked states match reference
- [ ] Color contrast verified (WCAG AA minimum)
- [ ] Responsive behavior tested at all viewports
- [ ] No layout shifts or unexpected reflows
- [ ] Performance acceptable (animations smooth, no jank)
- [ ] Accessibility review completed
- [ ] Code reviewed and approved
- [ ] Final sign-off from design lead

---

## Notes & Decisions

[PLACEHOLDER: Document any design decisions made during implementation, edge cases discovered, browser compatibility notes, or deviations from the reference.]

---

**Log Created By**: [NAME]

**Last Updated**: [DATE]

**Final Status**: [IN PROGRESS / READY FOR REVIEW / APPROVED / COMPLETE]
