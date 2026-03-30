# Workflow 2: Phase 3 — Gap Analysis & Fill

## Overview
Phase 3 identifies components and states that are needed for the real Shopify pages but don't yet exist in the design system. You'll audit against content plans and common Shopify needs, then design and build any missing components.

By the end of this phase, you will have:
- A complete list of gaps between the current design system and what's needed
- All missing components designed and built
- Updated design system reference page with all components
- Updated component inventory

### Naming Convention

All CSS classes and files created in this phase use the project prefix from `THEME_ROOT/.workflow/prefix.txt`. New component classes follow BEM: `.{prefix}component`, `.{prefix}component--modifier`, `.{prefix}component__element`.

---

## Step 1: Audit Against Content Plans

### 1.1 Gather Content Plans

**Objective:** Review all page content specifications from Workflow 1.

**Instructions:**

1. Locate content specifications from Workflow 1:
   - Look in `CONTENT_PLANS_PATH/pages/` for per-page spec documents (e.g., `index.md`, `product.md`, `collection.md`)
   - Also review `CONTENT_PLANS_PATH/site-content-map.md` for the section reuse matrix
   - And `CONTENT_PLANS_PATH/gap-analysis.md` for Workflow 1's own gap analysis against Horizon

2. For each content plan document:
   - Read through completely
   - List every component mentioned (section, element, state, variant)
   - Note any interactive behaviors

3. **Create a working document**: `THEME_ROOT/.workflow/gap-analysis-content-audit.md`

4. **Document findings for each page:**
   ```markdown
   ## Homepage Content Spec

   **Components needed:**
   - Hero section with background image
   - Feature cards (3 in a row)
   - Product carousel
   - Newsletter signup form
   - FAQ accordion
   - Testimonials slider
   - Footer with links

   **States/Variants needed:**
   - Button: primary, secondary
   - Cards: default, hover
   - Form inputs: default, focus, error
   - Accordions: open, closed
   ```

### 1.2 Check Component Inventory

**Objective:** Compare content plan requirements against existing component inventory.

**Instructions:**

1. Open your current `THEME_ROOT/.workflow/component-inventory.md` from Phase 1

2. For each component listed in the content plans:
   - Check: Does it exist in the inventory?
   - If yes: Is it complete (all variants/states)?
   - If no: Add to **Gap List**

3. **Create Gap List document**: `THEME_ROOT/.workflow/gap-analysis-gaps.md`

4. **Format:**
   ```markdown
   ## Missing Components

   ### High Priority (used on multiple pages)
   - Component Name
     - Reason: Used on [pages]
     - Variants needed: [list]
     - States needed: [list]

   ### Medium Priority (used on specific pages)
   - Component Name
     - Reason: Used on [page]
     - Variants needed: [list]

   ### Low Priority (might be nice to have)
   - Component Name
     - Reason: [reason]
   ```

5. **Example gaps:**
   ```markdown
   ## Missing Components

   ### High Priority
   - Loading skeleton states
     - Reason: Used on product pages while loading
     - Variants: skeleton-card, skeleton-button, skeleton-text

   - Empty states
     - Reason: Used on cart (empty), search results (no results), collection (no items)
     - Variants: empty-cart, empty-search, empty-collection

   ### Medium Priority
   - Form validation states
     - Reason: Checkout page
     - Variants: error, success, warning

   - Price display with sale pricing
     - Reason: Product pages
     - Variants: regular price, sale price, original price crossed out
   ```

---

## Step 2: Audit Against Standard Shopify Needs

### 2.1 Check for Common Components

**Objective:** Ensure your design system covers all typical Shopify needs.

**Instructions:**

Review this checklist of commonly needed components. For each, verify it exists in your design system:

**Buttons & Links:**
- [ ] Button: primary variant
- [ ] Button: secondary variant
- [ ] Button: outline variant
- [ ] Button: ghost variant
- [ ] Button: link variant
- [ ] Button: sizes (sm, md, lg)
- [ ] Button: disabled state
- [ ] Button: loading/spinner state
- [ ] Button: icon + text variant
- [ ] Text link with hover underline

**Form Elements:**
- [ ] Text input: default
- [ ] Text input: focus
- [ ] Text input: filled
- [ ] Text input: error state
- [ ] Text input: success state
- [ ] Text input: disabled
- [ ] Textarea
- [ ] Select dropdown
- [ ] Checkbox
- [ ] Radio button
- [ ] Toggle switch
- [ ] Form label
- [ ] Form helper text
- [ ] Form error message
- [ ] Required field indicator (*)

**Alerts & Messages:**
- [ ] Success alert/toast
- [ ] Error alert/toast
- [ ] Warning alert/toast
- [ ] Info alert/toast
- [ ] Dismissible alerts
- [ ] Toast notifications (temporary)

**States & Feedback:**
- [ ] Loading state/spinner
- [ ] Skeleton/placeholder state
- [ ] Empty state
- [ ] Error page (404)
- [ ] Coming soon / maintenance page
- [ ] No results / empty search

**Badges & Tags:**
- [ ] Badge: default
- [ ] Badge: success
- [ ] Badge: error
- [ ] Badge: warning
- [ ] Pill/chip with icon
- [ ] Sale badge (on products)
- [ ] New badge (on products)

**Product Related:**
- [ ] Product image gallery
- [ ] Product image zoom
- [ ] Product title
- [ ] Product rating/review stars
- [ ] Product price (regular)
- [ ] Product price (with sale)
- [ ] Price with sale badge
- [ ] Stock status (in stock / low / out of stock)
- [ ] Product variant selector (color, size, etc.)
- [ ] Quantity selector
- [ ] Add to cart button + feedback
- [ ] Add to wishlist button
- [ ] Share product buttons

**Navigation & Structure:**
- [ ] Breadcrumbs
- [ ] Pagination
- [ ] Page numbering
- [ ] "Next/Previous" navigation
- [ ] Tabs
- [ ] Tab panel
- [ ] Accordion / collapsible
- [ ] Disclosure / details
- [ ] Dropdown menu
- [ ] Mobile navigation / hamburger
- [ ] Mega menu (if applicable)

**Layout & Cards:**
- [ ] Card: basic
- [ ] Card: with image
- [ ] Card: with overlay
- [ ] Card: with hover effects
- [ ] Text block
- [ ] Divider / separator
- [ ] Spacer blocks
- [ ] Grid layouts (2, 3, 4 columns)

**Search & Filters:**
- [ ] Search bar
- [ ] Search input with clear button
- [ ] Filter button/panel
- [ ] Filter chip (active/inactive)
- [ ] Sort dropdown
- [ ] Results count

**Cart & Checkout:**
- [ ] Cart item row (product + qty + price)
- [ ] Cart summary
- [ ] Cart subtotal / tax / total
- [ ] Apply coupon code section
- [ ] Quantity increment/decrement
- [ ] Remove item button/icon
- [ ] Continue shopping button
- [ ] Checkout button
- [ ] Cart empty state

**Modals & Overlays:**
- [ ] Modal dialog
- [ ] Modal header (with close)
- [ ] Modal body
- [ ] Modal footer (actions)
- [ ] Drawer / side sheet
- [ ] Overlay / backdrop

**Utilities:**
- [ ] Icon + text combo
- [ ] Icon buttons
- [ ] Social share icons
- [ ] Loading spinner
- [ ] Progress bar
- [ ] Tooltip
- [ ] Popover

**Typography:**
- [ ] H1, H2, H3, H4 headings
- [ ] Display text (large, prominent)
- [ ] Body text (multiple sizes)
- [ ] Small text / captions
- [ ] Link text
- [ ] Emphasis / bold
- [ ] Italic text

### 2.2 Document Missing Items

**Objective:** List all gaps found during the audit.

**Instructions:**

1. Update `THEME_ROOT/.workflow/gap-analysis-gaps.md` with any items from the Shopify needs checklist that don't exist

2. **Prioritize gaps:**
   - **Critical:** Needed for core pages (product, collection, homepage, cart)
   - **High:** Needed for secondary pages (blog, FAQ, about)
   - **Medium:** Nice to have for polish (loading states, animations)
   - **Low:** Can build later if needed

3. **Example:**
   ```markdown
   ## Gap Analysis: Shopify Needs Audit

   ### Critical Gaps
   - Product variant selector UI (sizes, colors)
   - Quantity increment/decrement controls
   - Stock status indicator
   - Price display with sale pricing
   - Loading spinner
   - Form error/success states

   ### High Priority Gaps
   - Breadcrumbs
   - Sort dropdown styling
   - Filter chips
   - Pagination

   ### Medium Priority Gaps
   - Skeleton loading states
   - Empty cart state
   - Empty search results state
   - 404 error page styling

   ### Low Priority Gaps
   - Tooltip
   - Popover
   - Advanced modal variations
   ```

---

## Step 3: Design Missing Components

### 3.1 Establish Design Patterns

**Objective:** Identify consistent patterns in the existing design to apply to new components.

**Instructions:**

1. **Analyze the design system you've built:**
   - What colors repeat in similar use cases?
   - What spacing values are consistent?
   - What border radius is used for different element types?
   - What typography hierarchy is used?
   - What shadow patterns exist?
   - What hover/active effects are used?

2. **Document patterns in**: `THEME_ROOT/.workflow/design-patterns.md`

3. **Example patterns:**
   ```markdown
   ## Color Patterns
   - Primary color: Used for primary actions, focus states, active links
   - Secondary color: Used for secondary actions, accents
   - Success color: Used for success states, positive feedback
   - Error color: Used for errors, destructive actions
   - Muted/secondary text: For captions, helper text, secondary labels

   ## Spacing Patterns
   - Buttons: 12px top/bottom, 24px left/right (based on spacing tokens)
   - Cards: 16px padding inside
   - Form inputs: 12px top/bottom, 16px left/right
   - Section gaps: Multiples of base spacing unit

   ## Border Radius Patterns
   - Buttons: 8px (default, base radius)
   - Cards: 12px (medium, 1.5x base)
   - Inputs: 6px (small, subtle)
   - Pills/badges: 9999px (full rounded)

   ## Typography Patterns
   - All headings: Use heading font family, bold weight
   - All buttons: font-weight 600, use design scale
   - Form labels: Smaller than body, font-weight 600
   - Helper text: Muted color, smaller size
   - Errors: Error color, smaller size
   ```

### 3.2 Design Components One at a Time

**Objective:** Build each missing component following established patterns.

**Instructions:**

For each missing component (starting with critical/high priority):

1. **Review the pattern:**
   - Look at similar components in your design system
   - Understand the pattern (colors, spacing, typography)
   - Plan how the new component should align with the pattern

2. **Code the component in `assets/{prefix}primitives.css`:**

   **Example: Loading Spinner**
   ```css
   /* Loading Spinner */
   .spinner {
     width: 24px;
     height: 24px;
     border: 3px solid var(--color-border);
     border-top-color: var(--color-primary);
     border-radius: 50%;
     animation: spin 0.8s linear infinite;
   }

   @keyframes spin {
     to {
       transform: rotate(360deg);
     }
   }

   .spinner-lg {
     width: 32px;
     height: 32px;
     border-width: 4px;
   }

   /* Loading state on buttons */
   .btn.is-loading {
     pointer-events: none;
     opacity: 0.7;
   }

   .btn.is-loading::after {
     content: '';
     display: inline-block;
     width: 14px;
     height: 14px;
     border: 2px solid transparent;
     border-top-color: currentColor;
     border-radius: 50%;
     margin-left: var(--spacing-sm);
     animation: spin 0.8s linear infinite;
   }
   ```

3. **Test by adding to the design system reference page:**
   - Add a section that displays the component
   - Screenshot it
   - Verify it looks good and fits the design language

4. **Update component inventory:**
   ```markdown
   ## Loading Spinner
   - Type: Atom
   - Variants: default, large
   - Usage: Product pages, forms, async operations
   - CSS Classes: .spinner, .spinner-lg
   - Status: Built
   ```

### 3.3 Build Common Gaps Systematically

**Objective:** Implement the most critical missing components.

**Note:** All CSS classes below should use your project prefix. For example, if your prefix is `lxn-`, then `.spinner` becomes `.lxn-spinner`, `.option-selector` becomes `.lxn-option-selector`, etc. The examples below omit the prefix for readability, but you must include it in your actual code.

**Instructions:**

Follow this order (critical first):

1. **Product-Related Components:**

   **Variant Selector:**
   ```css
   /* Variant selector options */
   .option-selector {
     display: flex;
     flex-wrap: wrap;
     gap: var(--spacing-base);
   }

   .option-item {
     padding: var(--spacing-sm) var(--spacing-base);
     border: 2px solid var(--color-border);
     border-radius: var(--border-radius-base);
     cursor: pointer;
     transition: all var(--transition-base);
   }

   .option-item:hover {
     border-color: var(--color-primary);
   }

   .option-item.active {
     background-color: var(--color-primary);
     color: white;
     border-color: var(--color-primary);
   }

   .option-item:disabled {
     opacity: 0.5;
     cursor: not-allowed;
   }
   ```

   **Quantity Selector:**
   ```css
   /* Quantity selector */
   .quantity-selector {
     display: inline-flex;
     align-items: center;
     border: 1px solid var(--color-border);
     border-radius: var(--border-radius-base);
     width: fit-content;
   }

   .quantity-btn {
     background: none;
     border: none;
     width: 40px;
     height: 40px;
     cursor: pointer;
     font-size: 16px;
     display: flex;
     align-items: center;
     justify-content: center;
     transition: background-color var(--transition-base);
   }

   .quantity-btn:hover {
     background-color: var(--color-border);
   }

   .quantity-input {
     border: none;
     width: 50px;
     text-align: center;
     font-size: var(--type-body);
   }
   ```

   **Price Display with Sale:**
   ```css
   /* Price display */
   .price-group {
     display: flex;
     align-items: center;
     gap: var(--spacing-sm);
   }

   .price-regular {
     font-size: var(--type-h4);
     font-weight: 700;
     color: var(--color-text-primary);
   }

   .price-sale {
     font-size: var(--type-h4);
     font-weight: 700;
     color: var(--color-primary);
   }

   .price-original {
     font-size: var(--type-small);
     color: var(--color-text-secondary);
     text-decoration: line-through;
   }

   .price-badge {
     background-color: var(--color-error);
     color: white;
     padding: var(--spacing-xs) var(--spacing-sm);
     border-radius: var(--border-radius-full);
     font-size: var(--type-small);
     font-weight: 700;
   }
   ```

   **Stock Status:**
   ```css
   /* Stock status */
   .stock-status {
     display: flex;
     align-items: center;
     gap: var(--spacing-sm);
     font-size: var(--type-small);
   }

   .stock-badge {
     width: 8px;
     height: 8px;
     border-radius: 50%;
   }

   .stock-badge.in-stock {
     background-color: var(--color-success);
   }

   .stock-badge.low-stock {
     background-color: var(--color-warning);
   }

   .stock-badge.out-of-stock {
     background-color: var(--color-error);
   }
   ```

2. **Form & State Components:**

   **Form Error/Success States:**
   ```css
   /* Form group with states */
   .form-group {
     margin-bottom: var(--spacing-base);
   }

   .form-group label {
     display: block;
     font-weight: 600;
     margin-bottom: var(--spacing-sm);
     font-size: var(--type-small);
   }

   .form-group input,
   .form-group textarea,
   .form-group select {
     width: 100%;
     padding: var(--spacing-sm) var(--spacing-base);
     border: 1px solid var(--color-border);
     border-radius: var(--border-radius-base);
     font-size: var(--type-body);
     font-family: inherit;
     transition: border-color var(--transition-base), box-shadow var(--transition-base);
   }

   .form-group input:focus,
   .form-group textarea:focus,
   .form-group select:focus {
     outline: none;
     border-color: var(--color-primary);
     box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary) 10%, transparent);
   }

   /* Error state */
   .form-group.has-error input,
   .form-group.has-error textarea {
     border-color: var(--color-error);
   }

   .form-group.has-error input:focus,
   .form-group.has-error textarea:focus {
     box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-error) 10%, transparent);
   }

   .form-error {
     display: block;
     color: var(--color-error);
     font-size: var(--type-small);
     margin-top: var(--spacing-xs);
   }

   /* Success state */
   .form-group.has-success input,
   .form-group.has-success textarea {
     border-color: var(--color-success);
   }

   .form-group.has-success input:focus,
   .form-group.has-success textarea:focus {
     box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-success) 10%, transparent);
   }

   .form-success {
     display: block;
     color: var(--color-success);
     font-size: var(--type-small);
     margin-top: var(--spacing-xs);
   }
   ```

   **Empty States:**
   ```css
   /* Empty state */
   .empty-state {
     text-align: center;
     padding: var(--spacing-2xl) var(--spacing-lg);
   }

   .empty-state-icon {
     font-size: 48px;
     margin-bottom: var(--spacing-lg);
     opacity: 0.5;
   }

   .empty-state h3 {
     margin-bottom: var(--spacing-sm);
   }

   .empty-state p {
     color: var(--color-text-secondary);
     margin-bottom: var(--spacing-lg);
   }

   .empty-state .btn {
     margin-top: var(--spacing-base);
   }
   ```

   **Skeleton Loader:**
   ```css
   /* Skeleton loader */
   .skeleton {
     background: linear-gradient(
       90deg,
       var(--color-border) 0%,
       rgba(255, 255, 255, 0.2) 50%,
       var(--color-border) 100%
     );
     background-size: 200% 100%;
     animation: loading 1.5s infinite;
   }

   @keyframes loading {
     0% {
       background-position: 200% 0;
     }
     100% {
       background-position: -200% 0;
     }
   }

   .skeleton-text {
     height: 16px;
     margin-bottom: var(--spacing-sm);
     border-radius: var(--border-radius-sm);
   }

   .skeleton-heading {
     height: 24px;
     margin-bottom: var(--spacing-base);
     border-radius: var(--border-radius-sm);
   }

   .skeleton-image {
     width: 100%;
     aspect-ratio: 1;
     border-radius: var(--border-radius-base);
   }
   ```

3. **Navigation Components:**

   **Breadcrumbs:**
   ```css
   /* Breadcrumbs */
   .breadcrumbs {
     display: flex;
     align-items: center;
     gap: var(--spacing-sm);
     margin-bottom: var(--spacing-lg);
   }

   .breadcrumb-item {
     display: flex;
     align-items: center;
   }

   .breadcrumb-link {
     color: var(--color-primary);
     text-decoration: none;
   }

   .breadcrumb-link:hover {
     text-decoration: underline;
   }

   .breadcrumb-separator {
     color: var(--color-text-secondary);
     margin: 0 var(--spacing-sm);
   }

   .breadcrumb-current {
     color: var(--color-text-secondary);
   }
   ```

   **Pagination:**
   ```css
   /* Pagination */
   .pagination {
     display: flex;
     align-items: center;
     justify-content: center;
     gap: var(--spacing-sm);
     margin-top: var(--spacing-lg);
   }

   .pagination-item {
     width: 40px;
     height: 40px;
     display: flex;
     align-items: center;
     justify-content: center;
     border: 1px solid var(--color-border);
     border-radius: var(--border-radius-base);
     cursor: pointer;
     transition: all var(--transition-base);
     text-decoration: none;
   }

   .pagination-item:hover {
     border-color: var(--color-primary);
     background-color: var(--color-primary);
     color: white;
   }

   .pagination-item.active {
     background-color: var(--color-primary);
     color: white;
     border-color: var(--color-primary);
   }

   .pagination-item:disabled,
   .pagination-item.disabled {
     opacity: 0.5;
     cursor: not-allowed;
   }
   ```

4. **Alerts & Messages:**

   **Alert/Toast:**
   ```css
   /* Alert / Toast */
   .alert {
     padding: var(--spacing-base);
     border-radius: var(--border-radius-base);
     margin-bottom: var(--spacing-base);
     display: flex;
     align-items: flex-start;
     gap: var(--spacing-base);
   }

   .alert-success {
     background-color: color-mix(in srgb, var(--color-success) 10%, transparent);
     border-left: 4px solid var(--color-success);
     color: var(--color-success);
   }

   .alert-error {
     background-color: color-mix(in srgb, var(--color-error) 10%, transparent);
     border-left: 4px solid var(--color-error);
     color: var(--color-error);
   }

   .alert-warning {
     background-color: color-mix(in srgb, var(--color-warning) 10%, transparent);
     border-left: 4px solid var(--color-warning);
     color: var(--color-warning);
   }

   .alert-info {
     background-color: color-mix(in srgb, var(--color-primary) 10%, transparent);
     border-left: 4px solid var(--color-primary);
     color: var(--color-primary);
   }

   .alert-close {
     margin-left: auto;
     background: none;
     border: none;
     cursor: pointer;
     font-size: 20px;
     opacity: 0.7;
     transition: opacity var(--transition-base);
   }

   .alert-close:hover {
     opacity: 1;
   }
   ```

### 3.4 Add Components to Design System Reference

**Objective:** Update the design system reference page with new components.

**The design system reference page is your continuous QA tool.** It's not just documentation — it's a living verification page. Every time you add a new component here, you're testing whether it integrates with the existing design system. After adding each new component:
1. Load the full `page.design-system.json` page in the browser
2. Visually scan the ENTIRE page (not just the new section)
3. Check at all 3 viewports (1440px, 768px, 390px)
4. Verify: Does the new component feel cohesive with existing ones? Are colors consistent? Is spacing proportional? Did adding the new CSS break anything above it?
5. If anything looks off — fix it before continuing to the next component

**Instructions:**

1. For each component built, add a new section to the design system template and create a corresponding showcase section.

2. **Example: Add Product Details Section**

   Create `sections/design-system-product-details.liquid`:
   ```liquid
   <section class="design-system-section">
     <div class="container-default">
       <h2>Product Components</h2>

       <div style="display: grid; gap: var(--spacing-lg); margin-top: var(--spacing-lg);">
         <!-- Variant Selector Example -->
         <div class="demo-component">
           <h4>Variant Selector</h4>
           <div class="option-selector">
             <div class="option-item active">Small</div>
             <div class="option-item">Medium</div>
             <div class="option-item">Large</div>
             <div class="option-item">X-Large</div>
           </div>
         </div>

         <!-- Quantity Selector Example -->
         <div class="demo-component">
           <h4>Quantity Selector</h4>
           <div class="quantity-selector">
             <button class="quantity-btn">−</button>
             <input type="number" class="quantity-input" value="1">
             <button class="quantity-btn">+</button>
           </div>
         </div>

         <!-- Price Display Example -->
         <div class="demo-component">
           <h4>Price Display</h4>
           <div class="price-group">
             <span class="price-sale">$79.99</span>
             <span class="price-original">$99.99</span>
             <span class="price-badge">20% off</span>
           </div>
         </div>

         <!-- Stock Status Example -->
         <div class="demo-component">
           <h4>Stock Status</h4>
           <div>
             <div class="stock-status">
               <div class="stock-badge in-stock"></div>
               <span>In Stock</span>
             </div>
           </div>
           <div>
             <div class="stock-status">
               <div class="stock-badge low-stock"></div>
               <span>Only 2 left</span>
             </div>
           </div>
           <div>
             <div class="stock-status">
               <div class="stock-badge out-of-stock"></div>
               <span>Out of Stock</span>
             </div>
           </div>
         </div>
       </div>
     </div>
   </section>

   <style>
     .demo-component {
       padding: var(--spacing-base);
       background-color: white;
       border: 1px solid var(--color-border);
       border-radius: var(--border-radius-base);
     }

     .demo-component h4 {
       margin: 0 0 var(--spacing-base) 0;
     }
   </style>
   ```

3. Update `templates/page.design-system.json` to include the new section.

---

## Step 4: Update Component Inventory

### 4.1 Finalize Component Inventory

**Objective:** Document all components and their status.

**Instructions:**

1. Update `THEME_ROOT/.workflow/component-inventory.md`:

2. For every component (new and existing):
   ```markdown
   ## Component Name
   - Type: Atom/Molecule/Organism
   - Variants: [list all variants]
   - States: [default, hover, active, disabled, error, loading, etc.]
   - CSS Classes: [classes used]
   - Snippets: [if applicable]
   - Pages Used: [which pages use this]
   - Status: Built/Reference Only/Partial
   - Notes: [any special notes]
   ```

3. **Example:**
   ```markdown
   ## Loading Spinner
   - Type: Atom
   - Variants: default, large
   - States: loading, done
   - CSS Classes: .spinner, .spinner-lg
   - Pages Used: Product pages, cart, checkout
   - Status: Built
   - Notes: Animation requires CSS support; fallback needed for no-js

   ## Product Variant Selector
   - Type: Molecule
   - Variants: color, size, dropdown
   - States: available, selected, unavailable
   - CSS Classes: .option-selector, .option-item, .option-item.active
   - Snippets: snippets/variant-selector.liquid
   - Pages Used: Product page
   - Status: Built
   - Notes: Uses JavaScript for real variant filtering in Phase 4

   ## Breadcrumbs
   - Type: Molecule
   - Variants: standard (default separator), arrow, slash
   - States: default, hover on links
   - CSS Classes: .breadcrumbs, .breadcrumb-item, .breadcrumb-link
   - Pages Used: Product page, collection page, article page
   - Status: Built
   - Notes: Separators can be customized per theme settings if needed
   ```

4. **Group by status:**
   ```markdown
   ## Status: Built (In Design System)
   - Button (all variants)
   - Card
   - Form inputs
   - Loading spinner
   - Empty state
   - Price display
   - Product variant selector
   - Quantity selector
   - Stock status
   - Breadcrumbs
   - Pagination
   - Alerts
   - [etc.]

   ## Status: Partial (Needs Work)
   - Modal (basic built, animations needed)
   - Drawer (CSS built, JavaScript interaction needed)
   - [etc.]

   ## Status: Reference Only (Not Yet Built)
   - Advanced image zoom
   - Video player
   - [etc.]
   ```

---

## Verification Checklist

**Before moving to Phase 4, verify:**

- [ ] Gap analysis documents created
- [ ] All content plan components identified
- [ ] All Shopify needs components checked
- [ ] Priority gaps documented
- [ ] All critical components designed and built
- [ ] All components follow design patterns
- [ ] All components added to design system reference page
- [ ] Design system reference page displays all new components correctly
- [ ] Component inventory fully updated with all components and status
- [ ] Code follows code-architecture skill
- [ ] All primitives are tested (added to reference page)
- [ ] Design system handoff brief updated with new component classes (if it exists from Phase 2)

---

## Next Steps

Once all verification items pass, move to **Phase 4: Apply Design System to Real Pages**.
