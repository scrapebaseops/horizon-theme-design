# Workflow 2: Phase 1 — Reference Audit & Page Cloning

## Overview
Phase 1 has two parts:
1. **Part A: Reference Audit** - Analyze the reference design and extract design tokens
2. **Part B: Page Cloning** - Recreate reference pages in the theme to establish pixel-perfect visual parity

By the end of this phase, you will have:
- Complete documentation of the reference design
- A set of clone pages that exactly match the reference at all viewports
- A comprehensive design tokens map
- A component inventory

### Naming Convention

All custom files and CSS classes created in this phase must use the project prefix defined during Pre-Flight (stored in `THEME_ROOT/.workflow/prefix.txt`). For example, if the prefix is `lxn-`:
- Clone sections: `sections/clone-lxn-hero.liquid`
- Clone CSS: `assets/clone-lxn-hero.css` (if needed)
- CSS classes within clone sections: `.clone-lxn-hero`, `.clone-lxn-hero__title`

This prefix carries forward into all subsequent phases.

---

## Part A: Reference Audit

### Step 1: Catalog Reference Pages

**Objective:** Create a complete inventory of every page in the reference design.

**Instructions:**

1. Examine the reference design source (could be Figma, images, live website, etc.)
2. Enumerate EVERY DISTINCT page in the reference design. If two product pages have different layouts, catalog both. Count the total and record it. No exceptions.
   - Homepage
   - About page
   - Contact page
   - Product page (single product view)
   - Collection page (product listing)
   - Blog/News page (listing)
   - Blog/News article (single article)
   - Cart page
   - Checkout page (if available)
   - Search results page
   - Password/maintenance page (if applicable)
   - 404 error page (if applicable)
   - FAQ page (if applicable)
   - Any custom landing pages
   - Any other unique template types
   - **Header** (logo placement, navigation style, search, cart icon, announcement bar)
   - **Footer** (link columns, newsletter, social icons, copyright, payment icons)

3. Create a file: `THEME_ROOT/.workflow/reference-pages-catalog.md`
4. Document each page with:
   - Page name
   - Page type (homepage, product, collection, etc.)
   - Key sections present on that page
   - Unique features or behavior
   - Data requirements (dynamic content, product lists, etc.)

**Example entry:**
```
## Homepage
- Type: Homepage
- Key Sections:
  - Hero/Banner
  - Feature Grid (3 columns)
  - Product Showcase (4 products)
  - Newsletter Signup
  - Footer
- Unique Features: Auto-scrolling hero carousel
- Data Requirements: Featured products (4)
```

**Example entry (Header):**
```
## Header
- Type: Global (appears on all pages)
- Key Components:
  - Logo (left-aligned)
  - Main navigation (horizontal, 5 items)
  - Search icon
  - Cart icon with count badge
  - Announcement bar above header
- Unique Features: Sticky on scroll, transparent on homepage
- Data Requirements: Main navigation menu, announcement text
```

### Step 2: Take Reference Screenshots

**Objective:** Capture the reference design at all 3 responsive breakpoints.

**Instructions:**

1. Create directory: `THEME_ROOT/.workflow/reference-screenshots/`
2. For each page in your catalog:
   - Capture at viewport **1440px** (desktop)
   - Capture at viewport **768px** (tablet)
   - Capture at viewport **390px** (mobile)
3. Name files consistently: `{page-name}-{viewport}.png`
   - Example: `homepage-1440.png`, `homepage-768.png`, `homepage-390.png`
4. Ensure screenshots show:
   - The full page (scroll to capture entire page if needed)
   - All interactive states if visible (hover, active, etc.)
   - Color schemes/light-dark modes if they exist
5. **Header and footer screenshots** — capture these separately:
   - Header in default state: `header-default-{viewport}.png`
   - Header sticky/scrolled state (if different): `header-sticky-{viewport}.png`
   - Header on homepage (if transparent/different): `header-homepage-{viewport}.png`
   - Mobile navigation open state: `header-mobile-nav-390.png`
   - Footer: `footer-{viewport}.png`

**Count validation:** Screenshots must equal: page_count × 3 viewports. Run `ls THEME_ROOT/.workflow/reference-screenshots/*.png | wc -l` and verify. Do NOT proceed to Step 3 until the count matches.

**Required reading:** Before taking any screenshots, read `docs/workflows/skills/visual-comparison/SKILL.md` completely. Your viewport sizes and methodology MUST match that skill exactly. If the reference is a live website, use your available screenshot tooling — prefer built-in browser tools if available, otherwise use Playwright/Puppeteer (see the visual comparison skill for setup). If the reference is a Figma file or images, ensure you have exports at each breakpoint.

### Step 3: Extract Design Tokens

**Objective:** Systematically identify and document all design tokens from the reference.

**Instructions:**

1. Create file: `THEME_ROOT/.workflow/design-tokens-map.md`
   - Use the template at **`docs/workflows/workflow-2-design-replication/templates/design-tokens-map-template.md`** as your starting structure.

2. **Extract Tokens by Category:**

#### **Typography Tokens**
   - Inspect or measure fonts used for:
     - Page titles (H1)
     - Section headings (H2, H3, H4)
     - Body text
     - Small text/captions
     - Button text
   - Document:
     - Font family
     - Font size (in px)
     - Font weight
     - Line height
     - Letter spacing
   - Example format:
     ```
     ### Heading 1 (H1)
     - Font Family: Inter
     - Font Size: 48px
     - Font Weight: 700
     - Line Height: 1.2
     - Letter Spacing: -0.5px
     ```

#### **Color Tokens**
   - Identify all unique colors used:
     - Background colors (body, sections)
     - Text colors (primary, secondary, muted)
     - Action colors (buttons, links, hovers)
     - Status colors (success, error, warning, info)
     - Border colors
   - For each color:
     - Capture hex value (use color picker from screenshot if needed)
     - Note where it's used
     - Determine if it has a light/dark mode variant
   - Example format:
     ```
     ### Primary Color
     - Hex: #2563EB
     - Usage: Primary buttons, links, accents
     - Dark Mode: #60A5FA
     ```

#### **Spacing Tokens**
   - Measure spacing in the design:
     - Padding within components
     - Margins between sections
     - Gap between grid items
   - Identify the spacing scale (e.g., 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px)
   - Example format:
     ```
     ### Spacing Scale
     - xs: 4px
     - sm: 8px
     - base: 16px
     - md: 24px
     - lg: 32px
     - xl: 48px
     - 2xl: 64px
     ```

#### **Border Radius Tokens**
   - Measure or identify border radius values used:
     - Small buttons/pills: typically 4px or 6px
     - Medium components: typically 8px or 12px
     - Large cards: typically 12px or 16px
   - Example format:
     ```
     ### Border Radius Scale
     - sm: 4px
     - base: 8px
     - lg: 12px
     - full: 9999px (for pills/circles)
     ```

#### **Shadow Tokens**
   - Identify box-shadow values:
     - Subtle shadows (cards at rest)
     - Medium shadows (cards on hover)
     - Strong shadows (modals, overlays)
   - Document: blur radius, spread, offset, color, opacity
   - Example format:
     ```
     ### Shadow Tokens
     - sm: 0 1px 2px rgba(0,0,0,0.05)
     - base: 0 1px 3px rgba(0,0,0,0.1)
     - lg: 0 10px 15px rgba(0,0,0,0.1)
     ```

#### **Other Tokens**
   - Transition durations (for animations)
   - Z-index values
   - Border widths

3. **Method for Extraction:**
   - **If you have access to the codebase:** Use browser dev tools to inspect computed styles
   - **If you only have screenshots/images:** Use a color picker tool and manual measurement tools (rulers in design software)

4. **Document all findings** in the design-tokens-map.md file.

### Step 4: Identify Components & Section Patterns

**Objective:** Catalog every reusable component and section pattern in the reference.

**Instructions:**

1. Review all reference screenshots and look for:
   - **Atoms** (buttons, badges, chips, form inputs)
   - **Molecules** (card layouts, form groups, button groups)
   - **Organisms** (hero sections, product grids, header with navigation, footer with link columns, announcement bar)
   - **Templates/Layouts** (page structures)

2. Create file: `THEME_ROOT/.workflow/component-inventory.md`
   - Use the template at **`docs/workflows/workflow-2-design-replication/templates/component-inventory-template.md`** as your starting structure.

3. For each component/pattern, document:
   - **Name:** Clear, descriptive name (e.g., "Primary Button", "Product Card")
   - **Type:** atom/molecule/organism
   - **Variants:** All visual states (default, hover, active, disabled, loading, etc.)
   - **Where it appears:** List of pages/sections using it
   - **Key properties:** Colors, sizing, spacing, typography
   - **Status:** "Reference Only" (for now)

   **Variant enumeration:** For each component, document EVERY distinct visual state visible in the reference: default, hover, active, disabled, loading, focused, empty, error, selected. Do not guess — only document states you actually observe. If a button appears in 3 color variants and 4 sizes, document all 12 combinations.

4. **Example structure:**
   ```
   ## Button — Primary
   - Type: Atom
   - Variants: default, hover, active, disabled
   - Pages: Homepage (CTA), Product page (Add to cart), Cart (Checkout)
   - Properties:
     - Background: #2563EB
     - Padding: 12px 24px
     - Border Radius: 8px
     - Font Size: 16px
     - Font Weight: 600
   - Status: Reference Only

   ## Product Card
   - Type: Molecule
   - Variants: default, hover, sold-out
   - Pages: Collection page, Homepage (featured products)
   - Properties:
     - Width: 100% / 4 columns on desktop
     - Border: 1px solid #E5E7EB
     - Padding: 16px
     - Border Radius: 12px
   - Status: Reference Only
   ```

---

## Part B: Page Cloning

### COMPLETION GATE — Part A

**Before proceeding to Part B, verify ALL of the following exist:**

- [ ] `THEME_ROOT/.workflow/reference-pages-catalog.md` — lists every page in the reference
- [ ] `THEME_ROOT/.workflow/reference-screenshots/` — contains screenshots of EVERY page at 3 viewports
- [ ] `THEME_ROOT/.workflow/design-tokens-map.md` — all color, typography, spacing, border, shadow tokens
- [ ] `THEME_ROOT/.workflow/component-inventory.md` — every component cataloged

**Count check:** The number of pages in the reference catalog must match the number of screenshot sets (each page × 3 viewports). If the count doesn't match, go back and complete the missing work. Count unique page TEMPLATES (not instances). If the reference has one product-page layout used by many products, that's 1 template. But if there are 2 distinct product-page layouts, count both. Document your counting logic.

**Do NOT proceed to Part B until every item above is confirmed.**

---

### Step 5: Create Clone Page Templates

**Objective:** Build Shopify page templates that replicate the reference pages — ONE clone for EVERY page in the reference catalog. No exceptions. One clone template per unique page TEMPLATE TYPE. If two reference pages share identical layouts, one template suffices — but document which pages it covers and why they're identical.

**Instructions:**

1. For each page type in your reference catalog, create a Shopify template JSON. **Choose the correct template type** based on the data the page needs:

   | Reference page | Template file | Why |
   |---|---|---|
   | Homepage | `templates/page.clone-homepage.json` | Static content — no Shopify object required |
   | Product page | `templates/product.clone-{prefix}product.json` | Needs the `product` Liquid object |
   | Collection page | `templates/collection.clone-{prefix}collection.json` | Needs the `collection` Liquid object |
   | Blog / article | `templates/article.clone-{prefix}article.json` | Needs `article` object |
   | Cart | `templates/cart.clone-{prefix}cart.json` | Needs `cart` object |
   | Generic / about / landing | `templates/page.clone-{name}.json` | No special Shopify object needed |

   > **Rule of thumb:** If the reference page displays data from a Shopify resource (product, collection, article, cart, etc.), use that resource's template type. Otherwise, use `page.*`.

2. **Template structure** follows code-architecture skill:
   - Use `settings`, `blocks`, and `order` fields
   - Define section settings for all configurable content
   - Keep template JSON clean and readable

3. **Initial template example (homepage):**
   ```json
   {
     "sections": {
       "hero": {
         "type": "clone-{prefix}hero",
         "settings": {}
       },
       "features": {
         "type": "clone-{prefix}features",
         "settings": {}
       },
       "products": {
         "type": "clone-{prefix}products",
         "settings": {}
       },
       "newsletter": {
         "type": "clone-{prefix}newsletter",
         "settings": {}
       }
     },
     "order": [
       "hero",
       "features",
       "products",
       "newsletter"
     ]
   }
   ```

4. At this stage, templates are just structure — we'll build sections next.

### Step 6: Build Clone Sections

**Objective:** Create sections that match the reference design exactly.

**Instructions:**

1. For each section type, create:
   - `sections/clone-{prefix}{section-name}.liquid` (structure)
   - CSS within the section's `<style>` tag or in `assets/clone-{prefix}{section-name}.css` if substantial
   - Schema with settings in `sections/clone-{prefix}{section-name}.liquid`

2. **Follow the code-architecture skill:**
   - Keep CSS organized
   - Use semantic HTML
   - Store styles in `assets/` when shared across sections
   - Keep section-specific styles in the section file

3. Each DISTINCT section design gets ONE section file. If 4 pages use the same hero layout, create 1 `clone-{prefix}hero.liquid` that serves all 4. Count your section files and compare against your component inventory — every major component type should have a corresponding section file.

4. **Build one section at a time:**
   - Start with simple sections (hero, heading, text)
   - Progress to complex sections (product grid, collection listing)
   - Each section should have all settings needed for the template to configure it

4. **For each section:**
   - Code the HTML structure from the reference screenshot
   - Apply inline styles or section CSS to match the reference
   - Add settings schema for any configurable content
   - Create demo/placeholder content that matches the visual layout

### Step 6b: Handle Header and Footer

**Objective:** Style the global header and footer to match the reference, without forking Horizon's native sections.

**Instructions:**

0. **Read Horizon's header and footer section schemas first:**
   - Open Horizon's header section file (e.g., `sections/header.liquid` or the file referenced in `sections/header-group.json`) and read its `{% schema %}` block
   - Document available settings (logo, menu, sticky, transparent, announcement bar, etc.)
   - Document available blocks and their types
   - This tells you what can be configured via JSON settings vs. what requires CSS overrides
   - Repeat for the footer section
   - Save your findings to `THEME_ROOT/.workflow/horizon-section-schemas.md`

1. **Do NOT create clone header/footer sections.** Horizon's header and footer are section groups (`header-group.json`, `footer-group.json`) with complex JavaScript for mobile navigation, search, cart functionality, etc. Forking these would break that functionality.

2. **Instead, override their CSS:**
   - All header/footer style overrides go in `assets/{prefix}primitives.css` (or a dedicated `assets/{prefix}header-footer.css` if the overrides are substantial)
   - Scope overrides under Horizon's existing selectors (e.g., `.header`, `.footer`, `#shopify-section-header-group`)
   - Target: logo size, navigation font/spacing, announcement bar colors, footer layout/typography

3. **Configure the header section group:**
   - Edit `sections/header-group.json` to configure:
     - Logo image (via settings)
     - Menu style and position
     - Sticky header behavior
     - Transparent header options (if the reference uses them)
     - Announcement bar text and styling

4. **Configure the footer section group:**
   - Edit `sections/footer-group.json` to configure:
     - Footer link columns
     - Newsletter section
     - Social media links
     - Copyright text
     - Payment icons

5. **Screenshot and compare** header/footer against reference at all 3 viewports, including:
   - Default header state
   - Scrolled/sticky header state
   - Mobile navigation open state
   - Footer layout

6. **Save header/footer screenshots** to `THEME_ROOT/.workflow/clone-screenshots/header/` and `footer/`

### Step 7: Visual Comparison Loop (Inside-Out Zoom Approach)

**Objective:** Use an inside-out zoom methodology to ensure pixel-perfect matching, starting from the smallest elements and working outward.

**Why inside-out?** Starting with a full-page screenshot comparison is tempting but counterproductive. Differences at the page level are overwhelming and hard to diagnose. Instead, start at the smallest measurable unit and work outward. By the time you reach the full page, every component within it is already verified.

**Instructions:**

1. **Level 1: CSS Properties (Innermost Zoom)**
   - Pick individual CSS properties on the smallest elements
   - Example: the `font-size`, `font-weight`, `color`, and `letter-spacing` of a button's text
   - Compare these exact values against the reference (use DevTools computed styles)
   - Fix any mismatches before moving outward
   - Do this for ALL text styles: H1, H2, H3, H4, H5, H6, body paragraph, small/caption text, button text, link text, label text, input placeholder text, badge/tag text, navigation text, footer text. Do not skip any text element type present in the reference.

2. **Level 2: Complete Elements**
   - Zoom out to see the complete element (a full button, a full input field, a full heading)
   - Screenshot individual elements and compare against reference
   - Check: padding, border-radius, background color, hover state, size
   - Fix any mismatches
   - Do this for: every button variant, every form input, every heading level, every badge/chip

3. **Level 3: Components (Molecules)**
   - Zoom out to see complete components (a product card, a form group, a feature block)
   - Screenshot the component and compare against reference
   - Check: internal spacing, alignment, proportions between child elements
   - Fix any mismatches
   - Do this for: every distinct component type in the section

4. **Level 4: Full Sections (All Viewports)**
   - Zoom out to see the complete section
   - Screenshot at **1440px**, **768px**, and **390px**
   - Compare against reference at each viewport
   - Check: overall layout, column counts, stacking behavior, spacing between components
   - Fix any mismatches

5. **Level 5: Full Page**
   - Screenshot the entire page at all 3 viewports
   - Compare against reference
   - Check: section ordering, vertical rhythm, overall proportions, header/footer integration
   - This should reveal very few issues if Levels 1-4 were done thoroughly

6. **Final Zoom-Back-In Pass**
   - After the full page looks correct, zoom back in section by section
   - This catches regressions — fixes at one level sometimes break another
   - Quick spot-check at each section, not a full re-audit
   - If anything regressed, fix and re-verify that section

7. **Iterative Fix Loop (for each issue found):**
   - Screenshot the problem area
   - Identify the specific mismatch
   - Fix ONE thing at a time
   - Re-screenshot the same area
   - Verify the fix
   - Check that nothing else broke
   - Repeat until clean

8. **Pass/Fail Thresholds:**
   - Element level: < 0.05% visual difference
   - Component level: < 0.1% visual difference
   - Section level: < 0.5% visual difference
   - Full page level: < 1.0% visual difference
   - Any difference above threshold requires investigation and fix

   **Logging requirement:** Log EVERY comparison round (not just failures) to `THEME_ROOT/.workflow/visual-parity-log.md`. Use the template at `docs/workflows/workflow-2-design-replication/templates/visual-parity-log-template.md`. If a section has 0.2% difference, log it. Full transparency — the log is the evidence that comparison was done.

9. **Comparison Checklist Per Section:**
   - [ ] Typography: sizes, weights, colors, line-height, letter-spacing
   - [ ] Colors: backgrounds, text, accents, borders
   - [ ] Spacing: padding, margins, gaps between elements
   - [ ] Sizing: widths, heights, aspect ratios
   - [ ] Borders: radius, width, color, style
   - [ ] Shadows: blur, spread, offset, color
   - [ ] Layout: alignment, centering, flex/grid behavior
   - [ ] Responsive: mobile stacking, tablet layout, desktop layout
   - [ ] All three viewports verified (1440px, 768px, 390px)
   - [ ] Hover/focus states match (where applicable)

10. **Log results** for each comparison round using the template at **`docs/workflows/workflow-2-design-replication/templates/visual-parity-log-template.md`**. Save each entry to `THEME_ROOT/.workflow/visual-parity-log.md`.

### Step 8: Sub-Agent Strategy for Scaling

**Objective:** Parallelize page cloning using sub-agents.

**Instructions:**

1. **Main Agent Responsibilities:**
   - Complete Part A (Reference Audit) fully
   - Create all clone page templates (Step 5)
   - Create the initial section types needed
   - Spin up one sub-agent per clone page

2. **What each Sub-Agent receives:**
   - The reference screenshots for their assigned page
   - The component inventory
   - The design tokens map
   - The theme root path
   - The template JSON for that page
   - Any section types that already exist

3. **Sub-Agent Pre-Flight (MANDATORY before starting work):**
   Before starting any clone work, the sub-agent MUST verify that Part A (Reference Audit) is complete:
   - `THEME_ROOT/.workflow/reference-pages-catalog.md` exists and is populated
   - `THEME_ROOT/.workflow/reference-screenshots/` contains the screenshots for the assigned page at all 3 viewports
   - `THEME_ROOT/.workflow/design-tokens-map.md` exists and is populated
   - `THEME_ROOT/.workflow/component-inventory.md` exists and is populated
   If ANY of these is missing or empty, STOP and report to the main agent. Do NOT start cloning without these inputs.

4. **Sub-Agent Responsibilities:**
   - Build any missing sections for their page
   - Run the visual comparison loop until pixel-perfect at all 3 viewports
   - Document any new design tokens discovered
   - Report back: files created, tokens found, any blockers

4. **Handoff Template for Sub-Agent:**
   ```
   Page Assignment: [Page Name]

   Template: templates/page.clone-[name].json
   Reference Screenshots:
   - [name]-1440.png
   - [name]-768.png
   - [name]-390.png

   Resources:
   - Design Tokens: design-tokens-map.md
   - Component Inventory: component-inventory.md
   - Code Architecture: [link to skill]
   - Visual Comparison: [link to skill]

   Tasks:
   1. Build/complete sections for this page
   2. Follow visual comparison loop for each section
   3. Test all 3 viewports
   4. Report: files created, issues found

   Rules for sub-agents:
   (1) Header and footer are NOT cloned — override CSS only, never fork section files.
   (2) Verify Part A is complete before starting — reference-pages-catalog.md,
       reference-screenshots/, design-tokens-map.md, component-inventory.md must
       all exist and be populated. If any is missing, STOP and report to main agent.
   ```

5. **Monitoring Progress:**
   - Check that each sub-agent completes one section at a time
   - Validate visual parity before they move to the next section
   - Collect new tokens and update the main design-tokens-map.md

### Step 9: Clone Page Completion Criteria

**Objective:** Define when a clone page is "done."

**Instructions:**

A clone page is complete when:

1. **Visual Parity at All Viewports:**
   - Reference and clone overlaid at 1440px show no visible differences
   - Reference and clone overlaid at 768px show no visible differences
   - Reference and clone overlaid at 390px show no visible differences

2. **All Content Present:**
   - Every section from the reference is present
   - Every component from the reference is present
   - All text content is in place (using demo/placeholder content)
   - All media/images are configured (using demo images if needed)

3. **Responsive Behavior Correct:**
   - Mobile: Components stack vertically, text is readable
   - Tablet: Layout adjusts for 768px, no horizontal scrolling
   - Desktop: Full layout visible without scrolling horizontally

4. **Settings Configured:**
   - Section settings are used for content
   - Block settings are used for repeatable items
   - Settings are properly named and documented

5. **Code Quality:**
   - Follows code-architecture skill
   - No inline CSS (unless absolutely necessary for dynamic values)
   - Semantic HTML
   - Clean, readable Liquid

**Placeholder content is acceptable** for clone pages (demo images, sample text). The clone proves LAYOUT and STYLING parity, not content. Real content comes in Phase 4. If the reference has images, use images from the reference theme's assets directory where possible.

### Step 10: Handle Dynamic Content

**Objective:** Deal with content that changes per page (products, collections, etc.).

**Instructions:**

1. **Product Pages:**
   - Use placeholder product data that matches the visual layout
   - Set up variant selector UI (don't need full functionality yet)
   - Show price/title/description in the correct format
   - Include an "Add to Cart" button that's styled correctly

2. **Collection Pages:**
   - Create a filter/listing UI that matches the reference visually
   - Use placeholder products (4-12 depending on reference)
   - Style the product grid to match reference
   - Note: Actual filtering/pagination logic is handled by Horizon's native section JavaScript

3. **Blog/Article Pages:**
   - Use placeholder article content
   - Show correct meta (author, date, reading time)
   - Style article body text to match reference

4. **Search Results:**
   - Create a search results UI with placeholder results
   - Note: Actual search functionality is handled by Horizon's native search section

5. **Documentation:**
   - Add notes to your component inventory:
     ```
     ## [Component Name]
     - Status: Reference Only (Dynamic Content)
     - Note: This component requires [Product Data / Collection Data / etc.]
     - Placeholder used in clone for layout matching
     ```

### COMPLETION GATE — Phase 1 (MANDATORY)

**Do NOT proceed to Phase 2 until EVERY item below is confirmed. No exceptions.**

**Count check:** Run these commands and verify the counts match:

```bash
# Count pages in reference catalog
grep -c "^##\|^| " THEME_ROOT/.workflow/reference-pages-catalog.md

# Count clone templates (must match number of clonable reference pages)
ls templates/page.clone-*.json templates/*.clone-*.json 2>/dev/null | wc -l

# Count reference screenshots (must be pages × 3 viewports)
ls THEME_ROOT/.workflow/reference-screenshots/*.png | wc -l

# Count clone screenshots (must match reference screenshot count)
ls THEME_ROOT/.workflow/clone-screenshots/*.png | wc -l
```

If ANY count is wrong, go back and complete the missing work before proceeding.

**Per-page verification:** For EVERY clone page, confirm visual parity at all 3 viewports. The count of visually verified pages must equal the count of clone templates. If any page was built but not visually verified, go back and verify it.

### Step 11: Deliverables Checklist

**Objective:** Ensure all Phase 1 deliverables are complete.

By the end of Phase 1, you MUST have ALL of the following (not some, ALL):

- [ ] `THEME_ROOT/.workflow/reference-pages-catalog.md` — EVERY reference page documented
- [ ] `THEME_ROOT/.workflow/reference-screenshots/` — EVERY reference page at 1440, 768, 390px
- [ ] `THEME_ROOT/.workflow/design-tokens-map.md` — ALL color, typography, spacing, border, shadow tokens
- [ ] `THEME_ROOT/.workflow/component-inventory.md` — EVERY component documented
- [ ] `templates/page.clone-*.json` — Clone templates for EVERY page in reference catalog
- [ ] `sections/clone-{prefix}*.liquid` — ALL clone sections built and styled
- [ ] `THEME_ROOT/.workflow/clone-screenshots/` — EVERY clone page at all 3 viewports
- [ ] ALL clone pages pass visual parity at all viewports. Visual parity means: differences below the thresholds defined in `docs/workflows/skills/visual-comparison/SKILL.md` (< 0.5% at section level, < 1.0% at full page). If unsure, apply the most conservative threshold.
- [ ] ALL code follows code-architecture skill conventions
- [ ] Header CSS overrides complete and matching reference
- [ ] Footer CSS overrides complete and matching reference
- [ ] Header/footer screenshots at all 3 viewports

**If you skipped any page because you judged it "redundant" or "covered by other clones" — go back and build it. The workflow requires ALL pages, not a representative sample.**

---

## Next Steps

Once ALL deliverables are complete and ALL clone pages have visual parity with the reference, move to **Phase 2: Design System Extraction & Foundation**.
