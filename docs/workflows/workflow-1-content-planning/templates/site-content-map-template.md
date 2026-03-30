# Site Content Map

## Overview

**Brand**: [PLACEHOLDER: Brand name]

**Key Brand Traits**: [PLACEHOLDER: Primary brand traits from brand analysis]

**Planning Date**: [DATE]

**Purpose**: Master reference for all pages, shared components, section reuse patterns, and non-visual theme configuration needs across the entire store.

---

## Page Inventory

| Page Name | Template Type | URL Path | Purpose | Primary User Action | Spec Doc |
|-----------|---------------|----------|---------|-------------------|----------|
| [PLACEHOLDER: e.g., "Home"] | [PLACEHOLDER: e.g., "index"] | [PLACEHOLDER: e.g., "/"] | [PLACEHOLDER] | [PLACEHOLDER] | [Link] |
| [PLACEHOLDER: e.g., "Product"] | [PLACEHOLDER: e.g., "product"] | [PLACEHOLDER: e.g., "/products/[handle]"] | [PLACEHOLDER] | [PLACEHOLDER] | [Link] |
| [PLACEHOLDER] | [PLACEHOLDER] | [PLACEHOLDER] | [PLACEHOLDER] | [PLACEHOLDER] | [Link] |

**Total Pages**: [COUNT]

---

## Shared Components

### Header

**Appears On**: All pages

**Structure**:
- [PLACEHOLDER: E.g., "Logo — links to homepage"]
- [PLACEHOLDER: E.g., "Primary navigation with dropdowns"]
- [PLACEHOLDER: E.g., "Search icon / expandable search bar"]
- [PLACEHOLDER: E.g., "Account icon"]
- [PLACEHOLDER: E.g., "Cart icon with item count badge"]

**Configurable Settings**:
- [PLACEHOLDER: E.g., "Logo image (image_picker)"]
- [PLACEHOLDER: E.g., "Navigation menu (link_list)"]
- [PLACEHOLDER: E.g., "Sticky header on/off (checkbox)"]
- [PLACEHOLDER: E.g., "Transparent header on homepage (checkbox)"]

**Page-Specific Behavior**:
- [PLACEHOLDER: E.g., "Homepage: transparent overlay on hero; All other pages: solid background"]

---

### Footer

**Appears On**: All pages

**Structure**:
- [PLACEHOLDER: E.g., "4-column link layout"]
- [PLACEHOLDER: E.g., "Newsletter signup form"]
- [PLACEHOLDER: E.g., "Social media icon links"]
- [PLACEHOLDER: E.g., "Payment method icons"]
- [PLACEHOLDER: E.g., "Copyright and legal links"]

**Configurable Settings**:
- [PLACEHOLDER: E.g., "Column headings and link lists"]
- [PLACEHOLDER: E.g., "Newsletter heading and description text"]
- [PLACEHOLDER: E.g., "Social media URLs"]

---

### Announcement Bar

**Appears On**: [PLACEHOLDER: E.g., "All pages" or "Homepage only"]

**Content**: [PLACEHOLDER: E.g., "Rotating promotional messages"]

**Configurable Settings**:
- [PLACEHOLDER: E.g., "Message text (repeatable blocks)"]
- [PLACEHOLDER: E.g., "Link URL per message"]
- [PLACEHOLDER: E.g., "Background color / text color"]

---

### [Other Shared Components]

<!-- Add any other components that appear across multiple pages: newsletter popup, cookie banner, back-to-top button, etc. -->

**Appears On**: [PLACEHOLDER]

**Purpose**: [PLACEHOLDER]

---

## Section Reuse Matrix

<!-- Show which section types appear on which pages. This identifies reuse opportunities and build priorities. Sections used on many pages should be built first. -->

| Section Type | Home | Product | Collection | Cart | Search | 404 | Password | List-Coll | About | Contact | FAQ | Blog | Article |
|-------------|------|---------|-----------|------|--------|-----|----------|-----------|-------|---------|-----|------|---------|
| [PLACEHOLDER: e.g., "Hero/Banner"] | X | | | | | | | | X | | | | |
| [PLACEHOLDER: e.g., "Featured Collection"] | X | | | | | | | | | | | | |
| [PLACEHOLDER: e.g., "Rich Text"] | X | | | | | X | | | X | X | | | |
| [PLACEHOLDER: e.g., "Image + Text"] | X | | | | | | | | X | | | | |
| [PLACEHOLDER: e.g., "Testimonials"] | X | X | | | | | | | | | | | |
| [PLACEHOLDER: e.g., "FAQ Accordion"] | | X | | | | | | | | | X | | |
| [PLACEHOLDER: e.g., "Newsletter Signup"] | X | | | | | | X | | | | | X | X |
| [PLACEHOLDER] | | | | | | | | | | | | | |

**Legend**: X = Section appears on this page

**Build Priority** (sections used on most pages first):
1. [PLACEHOLDER: Most reused section]
2. [PLACEHOLDER: Second most reused]
3. [PLACEHOLDER: Third most reused]

---

## Master Section Registry

| Section Name | Section Type | Description | Used On (count) | Has Blocks? | Complexity |
|-------------|-------------|-------------|-----------------|-------------|------------|
| [PLACEHOLDER] | [PLACEHOLDER] | [PLACEHOLDER] | [PLACEHOLDER] | [Yes/No] | [Low/Med/High] |
| [PLACEHOLDER] | [PLACEHOLDER] | [PLACEHOLDER] | [PLACEHOLDER] | [Yes/No] | [Low/Med/High] |

**Total Unique Sections**: [COUNT]

---

## Master Block Registry

| Block Name | Parent Section(s) | Purpose | Settings |
|-----------|-------------------|---------|----------|
| [PLACEHOLDER: e.g., "Feature Card"] | [PLACEHOLDER: e.g., "Features Section"] | [PLACEHOLDER] | [PLACEHOLDER: e.g., "Icon, title, description"] |
| [PLACEHOLDER: e.g., "FAQ Item"] | [PLACEHOLDER: e.g., "FAQ Accordion"] | [PLACEHOLDER] | [PLACEHOLDER: e.g., "Question, answer"] |
| [PLACEHOLDER] | [PLACEHOLDER] | [PLACEHOLDER] | [PLACEHOLDER] |

**Total Unique Block Types**: [COUNT]

---

## Interactive Elements

| Element | Type | Location | Purpose | Trigger |
|---------|------|----------|---------|---------|
| [PLACEHOLDER: e.g., "Mobile Menu"] | Drawer | Header | Navigation on mobile | Hamburger icon tap |
| [PLACEHOLDER: e.g., "Cart Drawer"] | Drawer | Site-wide | Quick cart view | Cart icon click |
| [PLACEHOLDER: e.g., "Search Overlay"] | Modal/Overlay | Header | Product search | Search icon click |
| [PLACEHOLDER: e.g., "Newsletter Popup"] | Modal | Site-wide | Email capture | Timer/exit-intent |
| [PLACEHOLDER: e.g., "Product Variants"] | Selector | Product page | Choose options | Direct interaction |
| [PLACEHOLDER] | [PLACEHOLDER] | [PLACEHOLDER] | [PLACEHOLDER] | [PLACEHOLDER] |

---

## Navigation Architecture

### Primary Navigation

**Location**: [PLACEHOLDER: E.g., "Top header bar"]

**Items**:
1. [PLACEHOLDER: E.g., "Shop" → dropdown with collection links]
2. [PLACEHOLDER: E.g., "About" → /pages/about]
3. [PLACEHOLDER: E.g., "Blog" → /blogs/news]
4. [PLACEHOLDER: E.g., "Contact" → /pages/contact]

### Footer Navigation

**Column 1**: [PLACEHOLDER: E.g., "Shop — All Products, New Arrivals, Best Sellers, Sale"]
**Column 2**: [PLACEHOLDER: E.g., "About — Our Story, Ingredients, Sustainability"]
**Column 3**: [PLACEHOLDER: E.g., "Support — FAQ, Contact, Shipping & Returns, Track Order"]
**Column 4**: [PLACEHOLDER: E.g., "Connect — Newsletter signup, social links"]

### Mobile Navigation

**Style**: [PLACEHOLDER: E.g., "Full-screen drawer from left"]
**Differences from Desktop**: [PLACEHOLDER: E.g., "Accordion-style sub-menus, search bar at top, account/cart links at bottom"]

---

## Theme Configuration Needs

### Shared Components & Navigation
- [PLACEHOLDER: E.g., "Header menu selection and dropdown behavior"]
- [PLACEHOLDER: E.g., "Footer link groups and native policy-link treatment"]
- [PLACEHOLDER: E.g., "Announcement bar on/off and message rotation"]

### Commerce Behavior
- [PLACEHOLDER: E.g., "Cart type (page/drawer)"]
- [PLACEHOLDER: E.g., "Sticky header on/off"]
- [PLACEHOLDER: E.g., "Search behavior (predictive search, overlay, inline)"]

### Content & Data Requirements
- [PLACEHOLDER: E.g., "Product metafields needed for ingredients, size guide, or trust badges"]
- [PLACEHOLDER: E.g., "Collection metadata or badges needed for navigation/product cards"]
- [PLACEHOLDER: E.g., "FAQ, testimonials, or review data source expectations"]

### Feature Toggles & Integrations
- [PLACEHOLDER: E.g., "Newsletter popup enabled/disabled"]
- [PLACEHOLDER: E.g., "Reviews integration expected"]
- [PLACEHOLDER: E.g., "Localization / account features / app dependencies"]

---

## Content Statistics

| Metric | Count |
|--------|-------|
| Total pages | [COUNT] |
| Total unique section types | [COUNT] |
| Total unique block types | [COUNT] |
| Shared components (header, footer, etc.) | [COUNT] |
| Interactive elements | [COUNT] |
| Custom page templates | [COUNT] |

---

## Implementation Priority

### Phase 1: Foundation
[PLACEHOLDER: Shared components (header, footer), navigation, homepage foundation]

### Phase 2: Core Commerce
[PLACEHOLDER: Product page, collection page, cart page]

### Phase 3: Supporting Pages
[PLACEHOLDER: About, contact, FAQ, blog]

### Phase 4: Polish
[PLACEHOLDER: Search, 404, password, edge cases, responsive refinement]

---

**Last Updated**: [DATE]
**Status**: [DRAFT / REVIEW / APPROVED]
