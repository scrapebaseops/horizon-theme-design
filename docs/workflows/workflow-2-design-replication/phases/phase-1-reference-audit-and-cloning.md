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

---

## Part A: Reference Audit

### Step 1: Catalog Reference Pages

**Objective:** Create a complete inventory of every page in the reference design.

**Instructions:**

1. Examine the reference design source (could be Figma, images, live website, etc.)
2. List every unique page type:
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

**Note:** If the reference is a live website, use a screenshot tool (Playwright, Puppeteer) or manual browser screenshots. If it's a Figma file or images, ensure you have exports at each breakpoint.

### Step 3: Extract Design Tokens

**Objective:** Systematically identify and document all design tokens from the reference.

**Instructions:**

1. Create file: `THEME_ROOT/.workflow/design-tokens-map.md`

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
   - **Organisms** (hero sections, product grids, navigation, footer)
   - **Templates/Layouts** (page structures)

2. Create file: `THEME_ROOT/.workflow/component-inventory.md`

3. For each component/pattern, document:
   - **Name:** Clear, descriptive name (e.g., "Primary Button", "Product Card")
   - **Type:** atom/molecule/organism
   - **Variants:** All visual states (default, hover, active, disabled, loading, etc.)
   - **Where it appears:** List of pages/sections using it
   - **Key properties:** Colors, sizing, spacing, typography
   - **Status:** "Reference Only" (for now)

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

### Step 5: Create Clone Page Templates

**Objective:** Build Shopify page templates that replicate the reference pages.

**Instructions:**

1. For each page type in your reference catalog, create a Shopify template JSON:
   - `templates/page.clone-homepage.json`
   - `templates/page.clone-product.json`
   - `templates/page.clone-collection.json`
   - etc.

2. **Template structure** follows code-architecture skill:
   - Use `settings`, `blocks`, and `order` fields
   - Define section settings for all configurable content
   - Keep template JSON clean and readable

3. **Initial template example (homepage):**
   ```json
   {
     "sections": {
       "hero": {
         "type": "clone-hero",
         "settings": {}
       },
       "features": {
         "type": "clone-features",
         "settings": {}
       },
       "products": {
         "type": "clone-products",
         "settings": {}
       },
       "newsletter": {
         "type": "clone-newsletter",
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
   - `sections/clone-{section-name}.liquid` (structure)
   - `sections/clone-{section-name}.css` (styling, if needed)
   - Schema with settings in `sections/clone-{section-name}.liquid`

2. **Follow the code-architecture skill:**
   - Keep CSS organized
   - Use semantic HTML
   - Store styles in `assets/` when shared across sections
   - Keep section-specific styles in the section file

3. **Build one section at a time:**
   - Start with simple sections (hero, heading, text)
   - Progress to complex sections (product grid, collection listing)
   - Each section should have all settings needed for the template to configure it

4. **For each section:**
   - Code the HTML structure from the reference screenshot
   - Apply inline styles or section CSS to match the reference
   - Add settings schema for any configurable content
   - Create demo/placeholder content that matches the visual layout

### Step 7: Visual Comparison Loop (Granular Approach)

**Objective:** Use the visual-comparison skill's granular methodology to ensure pixel-perfect matching.

**Instructions:**

1. **Start with atomic elements:**
   - For each section, begin with smallest elements (typography, buttons, spacing)
   - Take a screenshot of your clone at 1440px
   - Compare against reference screenshot side-by-side
   - Check: Do heading sizes match? Do button sizes match? Do colors match?
   - Adjust CSS until they match exactly
   - Take another screenshot and compare

2. **Build up to molecules:**
   - Once individual elements are correct, build small component groups
   - Example: a button with text and icon
   - Screenshot and compare
   - Fix any misalignments, spacing issues

3. **Build up to sections:**
   - Once molecules are working, assemble into full sections
   - Screenshot the full section at 1440px
   - Compare against reference screenshot
   - Check layout, spacing, alignment
   - Fix any issues

4. **Test all three viewports:**
   - After section looks good at 1440px, screenshot at 768px
   - Compare against reference at 768px
   - Fix responsive issues
   - Then test at 390px
   - Compare and fix

5. **Screenshot process:**
   - Use your theme in Shopify admin or local preview
   - For each section, take full-width screenshots at each breakpoint
   - Save as: `THEME_ROOT/.workflow/clone-screenshots/{page-name}/{section-name}-{viewport}.png`

6. **Comparison checklist for each section:**
   - [ ] Typography: sizes, weights, colors, line-height
   - [ ] Colors: backgrounds, text, accents, borders
   - [ ] Spacing: padding, margins, gaps
   - [ ] Sizing: widths, heights, aspect ratios
   - [ ] Borders: radius, width, color
   - [ ] Shadows: blur, spread, offset, color
   - [ ] Layout: alignment, centering, flex/grid behavior
   - [ ] Responsive: mobile stacking, tablet layout, desktop layout
   - [ ] All three viewports match reference at all three viewports

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

3. **Sub-Agent Responsibilities:**
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
   - Note: Actual filtering/pagination logic happens in Phase 6

3. **Blog/Article Pages:**
   - Use placeholder article content
   - Show correct meta (author, date, reading time)
   - Style article body text to match reference

4. **Search Results:**
   - Create a search results UI with placeholder results
   - Note: Actual search functionality in Phase 6

5. **Documentation:**
   - Add notes to your component inventory:
     ```
     ## [Component Name]
     - Status: Reference Only (Dynamic Content)
     - Note: This component requires [Product Data / Collection Data / etc.]
     - Placeholder used in clone for layout matching
     ```

### Step 11: Deliverables Checklist

**Objective:** Ensure all Phase 1 deliverables are complete.

By the end of Phase 1, you should have:

- [ ] `THEME_ROOT/.workflow/reference-pages-catalog.md` — All reference pages documented
- [ ] `THEME_ROOT/.workflow/reference-screenshots/` — All reference pages at 1440, 768, 390px
- [ ] `THEME_ROOT/.workflow/design-tokens-map.md` — Complete design tokens extracted
- [ ] `THEME_ROOT/.workflow/component-inventory.md` — All components documented
- [ ] `templates/page.clone-*.json` — Clone page templates created
- [ ] `sections/clone-*.liquid` — All clone sections built and styled
- [ ] `THEME_ROOT/.workflow/clone-screenshots/` — Clone pages at all 3 viewports
- [ ] All clone pages pass visual parity at all viewports
- [ ] All code follows code-architecture skill conventions

---

## Next Steps

Once all deliverables are complete and all clone pages have visual parity with the reference, move to **Phase 2: Design System Extraction & Foundation**.
