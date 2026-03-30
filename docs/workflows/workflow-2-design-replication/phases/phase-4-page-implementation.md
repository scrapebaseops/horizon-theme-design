# Workflow 2: Phase 4 — Apply Design System to Real Pages

## Overview
Phase 4 applies the design system to build actual Shopify pages using content from Workflow 1. These pages are real, functional pages (not just design clones) that serve the business needs while maintaining visual consistency.

By the end of this phase, you will have:
- All required Shopify pages built and functional
- All pages visually match the design system
- All content from Workflow 1 specifications integrated
- All pages responsive and working at all viewports
- All interactive elements functional

---

## Step 1: Plan Each Page

### 1.1 Review Content Specifications

**Objective:** Understand what each page should contain and how it should behave.

**Instructions:**

1. For each page that needs to be built, gather its content specification from Workflow 1:
   - Homepage spec
   - Product page spec
   - Collection page spec
   - Cart page spec
   - Blog listing spec
   - Article page spec
   - About/FAQ/Contact specs
   - Any custom landing pages

2. Create a planning document: `THEME_ROOT/.workflow/page-implementation-plan.md`

3. For each page, document:
   ```markdown
   ## [Page Name]

   **Template:** templates/[name].json
   **Content Spec:** [Reference to Workflow 1 spec]

   **Required Sections:**
   - Section Name 1: Clone/New/Horizon Override
     - Content: [what goes here]
     - Data source: [where content comes from]
   - Section Name 2: Clone/New/Horizon Override
     - Content: [what goes here]
     - Data source: [where content comes from]

   **Unique Features:**
   - [Feature 1]
   - [Feature 2]

   **Interactive Elements:**
   - [Element 1 and its behavior]
   - [Element 2 and its behavior]

   **Responsive Behavior:**
   - Desktop: [layout]
   - Tablet: [layout]
   - Mobile: [layout]
   ```

### 1.2 Map Sections to Design System

**Objective:** Determine which design system components or clone sections to use for each page section.

**Instructions:**

1. For each section required by a page:

   **Option 1: Reuse Clone Section**
   - If this section was built as a clone, you can reuse it
   - Assign a block type name: `clone-section-name`
   - Note: "This is a reused clone section"

   **Option 2: Override Horizon Native Section**
   - If Horizon provides the section (product, collection, etc.)
   - You'll override its CSS via `horizon-overrides.css`
   - Only override styling, keep functionality
   - Assign block type: The Horizon section name
   - Note: "Using Horizon native section with style overrides"

   **Option 3: Build New Section**
   - If neither clone nor Horizon covers this
   - Build a new section using design system primitives
   - Assign a block type: `custom-section-name`
   - Note: "Building new section from design system"

2. **Example mapping:**
   ```markdown
   ## Homepage Sections

   ### Hero
   - Assigned: clone-hero
   - Reason: Exact match to reference design
   - Build status: Reuse

   ### Product Grid
   - Assigned: clone-product-grid
   - Reason: Exact match to reference design
   - Build status: Reuse (but will customize content per real products)

   ### Newsletter
   - Assigned: custom-newsletter
   - Reason: No clone exists; will build from design system
   - Build status: New (build in Phase 4)

   ### Footer
   - Assigned: Horizon footer section
   - Reason: Native section adequate
   - Build status: Style override only
   ```

3. Document the complete mapping for all pages in the planning document.

---

## Step 2: Build Pages (One at a Time)

### 2.1 Implementation Order

**Objective:** Prioritize which pages to build first.

**Instructions:**

Build pages in this order:

1. **Homepage** (most visible, establishes baseline)
2. **Product Page** (most complex, highest priority)
3. **Collection/Search Page** (important for browsing)
4. **Cart Page** (critical for checkout)
5. **Blog/Article Pages** (content pages)
6. **Generic Pages** (About, Contact, FAQ)
7. **Error Pages** (404, 500, etc.)
8. **Password/Maintenance Page** (if applicable)
9. **Search Results Page** (if applicable)

### 2.2 Build Homepage

**Objective:** Build the homepage using design system and content spec.

**Instructions:**

1. **Review the homepage content spec** from Workflow 1.

2. **Create/edit the homepage template**: `templates/index.json`

3. **Example homepage structure:**
   ```json
   {
     "sections": {
       "hero": {
         "type": "clone-hero",
         "settings": {
           "heading": "Welcome to [Store]",
           "subheading": "Shop our collections",
           "image": "shopify://shop_images/...",
           "cta_text": "Shop Now",
           "cta_link": "/collections/all"
         }
       },
       "featured_products": {
         "type": "clone-product-grid",
         "settings": {
           "heading": "Featured Products",
           "products_count": 4
         }
       },
       "feature_highlights": {
         "type": "custom-features",
         "blocks": [
           {
             "type": "feature",
             "settings": {
               "icon": "truck",
               "title": "Free Shipping",
               "description": "On orders over $100"
             }
           },
           {
             "type": "feature",
             "settings": {
               "icon": "lock",
               "title": "Secure Checkout",
               "description": "Protected by industry standards"
             }
           },
           {
             "type": "feature",
             "settings": {
               "icon": "undo",
               "title": "Easy Returns",
               "description": "30-day return policy"
             }
           }
         ]
       },
       "newsletter": {
         "type": "custom-newsletter",
         "settings": {
           "heading": "Subscribe to our newsletter",
           "description": "Get updates on new products and offers"
         }
       }
     },
     "order": [
       "hero",
       "featured_products",
       "feature_highlights",
       "newsletter"
     ]
   }
   ```

4. **Build any new sections** used by homepage:
   - Create `sections/custom-features.liquid` if needed
   - Create `sections/custom-newsletter.liquid` if needed
   - Follow code-architecture skill for file organization
   - Use design system primitives (buttons, cards, typography)

5. **Configure all settings** for dynamic content:
   - Headings should be configurable
   - Images should be image pickers
   - Links should be text/URL fields
   - Collections should use collection pickers

6. **Screenshot the homepage** at all 3 viewports (1440, 768, 390)

7. **Compare visually** against the design spec and reference design:
   - Do colors match?
   - Do spacing and alignment match?
   - Do fonts match?
   - Is responsive behavior correct?
   - Are all content elements visible?

8. **Fix any visual issues** before moving to next page.

### 2.3 Build Product Page

**Objective:** Build the product page template using Horizon product section and custom sections.

**Instructions:**

1. **Review the product page content spec** from Workflow 1.

2. **Edit the product template**: `templates/product.json`

3. **Product page structure:**
   ```json
   {
     "sections": {
       "main": {
         "type": "product",
         "settings": {
           "enable_sticky_info": true,
           "gallery_layout": "thumbnail",
           "image_zoom_type": "lightbox",
           "max_quantity_allowed": 999
         },
         "blocks": [
           {
             "type": "title",
             "settings": {}
           },
           {
             "type": "rating",
             "settings": {}
           },
           {
             "type": "price",
             "settings": {}
           },
           {
             "type": "variant_selector",
             "settings": {
               "picker_type": "button"
             }
           },
           {
             "type": "quantity_selector",
             "settings": {}
           },
           {
             "type": "buy_buttons",
             "settings": {}
           },
           {
             "type": "description",
             "settings": {}
           },
           {
             "type": "share",
             "settings": {}
           }
         ]
       },
       "related_products": {
         "type": "custom-related-products",
         "settings": {
           "heading": "Related Products",
           "products_count": 4
         }
       }
     },
     "order": [
       "main",
       "related_products"
     ]
   }
   ```

4. **Use Horizon product section** for the main product content:
   - Don't recreate; override CSS in `horizon-overrides.css`
   - Ensure product images, variants, pricing display correctly

5. **Build custom sections** if needed:
   - `sections/custom-related-products.liquid` if different from clone

6. **Override Horizon product section styling**:
   - Edit `assets/horizon-overrides.css`
   - Ensure buttons match design system (`.btn-primary`, etc.)
   - Ensure pricing matches design tokens
   - Ensure variant selector matches design system

   Example:
   ```css
   /* Product page overrides */
   #MainContent .product h1 {
     font-family: var(--type-heading-family);
     font-size: var(--type-h1);
     margin-bottom: var(--spacing-lg);
   }

   #MainContent .product-variant-selector {
     display: flex;
     flex-wrap: wrap;
     gap: var(--spacing-base);
     margin-bottom: var(--spacing-lg);
   }

   #MainContent .product-form .btn {
     background-color: var(--color-primary);
     padding: var(--spacing-sm) var(--spacing-md);
   }
   ```

7. **Test product page features:**
   - Product images display and zoom correctly
   - Variants selector works and updates price
   - Quantity selector works
   - Add to cart button works
   - Responsive layout works at all viewports

8. **Screenshot at all 3 viewports** and compare against design spec.

### 2.4 Build Collection Page

**Objective:** Build the collection page template.

**Instructions:**

1. **Review the collection page content spec** from Workflow 1.

2. **Edit the collection template**: `templates/collection.json`

3. **Collection page structure:**
   ```json
   {
     "sections": {
       "collection_header": {
         "type": "custom-collection-header",
         "settings": {
           "show_description": true,
           "show_image": true
         }
       },
       "main": {
         "type": "collection",
         "settings": {
           "products_per_page": 12,
           "columns_desktop": 3,
           "image_ratio": "portrait",
           "show_secondary_image": true
         }
       }
     },
     "order": [
       "collection_header",
       "main"
     ]
   }
   ```

4. **Use Horizon collection section** for product grid:
   - Override CSS to match design system
   - Ensure product cards match design system style
   - Configure layout/columns per design spec

5. **Build custom collection header** if needed:
   - Create `sections/custom-collection-header.liquid`
   - Include collection title, description, image
   - Use design system components

6. **Override Horizon collection section styling**:
   ```css
   /* Collection page overrides */
   #MainContent .collection-products {
     display: grid;
     grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
     gap: var(--spacing-lg);
   }

   #MainContent .product-card {
     /* Reuse design system card styles */
     border: 1px solid var(--color-border);
     border-radius: var(--border-radius-base);
     overflow: hidden;
     transition: box-shadow 0.2s;
   }

   #MainContent .product-card:hover {
     box-shadow: var(--shadow-base);
   }
   ```

7. **Screenshot at all 3 viewports** and verify:
   - Header displays correctly
   - Product grid layout is correct
   - Cards are styled per design system
   - Responsive behavior works

### 2.5 Build Cart Page

**Objective:** Build the cart page template.

**Instructions:**

1. **Review the cart content spec** from Workflow 1.

2. **Edit the cart template**: `templates/cart.json`

3. **Cart page structure:**
   ```json
   {
     "sections": {
       "main": {
         "type": "main-cart",
         "settings": {}
       }
     },
     "order": [
       "main"
     ]
   }
   ```

4. **Use Horizon main-cart section**:
   - Override CSS to match design system
   - Ensure table styling matches design tokens
   - Ensure buttons match design system

5. **Override cart styling**:
   ```css
   /* Cart page overrides */
   #MainContent .cart {
     max-width: var(--container-default-width);
   }

   #MainContent .cart-item {
     display: grid;
     grid-template-columns: 80px 1fr auto auto;
     gap: var(--spacing-base);
     padding: var(--spacing-base);
     border-bottom: 1px solid var(--color-border);
     align-items: start;
   }

   #MainContent .cart-item-price {
     font-weight: 600;
     min-width: 80px;
   }

   #MainContent .qty-selector {
     display: flex;
     align-items: center;
     border: 1px solid var(--color-border);
     border-radius: var(--border-radius-base);
   }

   #MainContent .qty-selector button {
     background: none;
     border: none;
     width: 32px;
     height: 32px;
     cursor: pointer;
   }

   #MainContent .cart-summary {
     max-width: 400px;
     padding: var(--spacing-lg);
     border: 1px solid var(--color-border);
     border-radius: var(--border-radius-base);
   }

   #MainContent .cart-summary .btn {
     width: 100%;
   }
   ```

6. **Test cart functionality:**
   - Items display correctly
   - Quantity changes work
   - Remove item works
   - Totals calculate correctly
   - Checkout button is visible

7. **Screenshot at all 3 viewports**.

### 2.6 Build Blog/Article Pages

**Objective:** Build blog listing and article pages.

**Instructions:**

1. **Blog Listing Template**: `templates/blog.json`
   ```json
   {
     "sections": {
       "main": {
         "type": "main-blog",
         "settings": {
           "columns_desktop": 2,
           "image_ratio": "landscape",
           "show_image": true,
           "show_date": true,
           "show_excerpt": true
         }
       }
     },
     "order": [
       "main"
     ]
   }
   ```

2. **Article Template**: `templates/article.json`
   ```json
   {
     "sections": {
       "main": {
         "type": "main-article",
         "settings": {
           "blog_show_comments": true,
           "blog_show_share_buttons": true
         }
       },
       "related_articles": {
         "type": "custom-related-articles",
         "settings": {
           "heading": "Related Articles",
           "articles_count": 3
         }
       }
     },
     "order": [
       "main",
       "related_articles"
     ]
   }
   ```

3. **Override blog/article styling** to match design system.

4. **Screenshot at all 3 viewports**.

### 2.7 Build Generic Pages (About, Contact, FAQ)

**Objective:** Build static/generic page templates.

**Instructions:**

1. **Generic Page Template**: `templates/page.json`
   ```json
   {
     "sections": {
       "main": {
         "type": "main-page",
         "settings": {}
       }
     },
     "order": [
       "main"
     ]
   }
   ```

2. **Use Horizon main-page section** (renders page content) and override styling.

3. **Override page content styling** (prose):
   ```css
   /* Page content overrides */
   #MainContent .page-content {
     max-width: 800px;
     margin: 0 auto;
   }

   #MainContent .page-content h1,
   #MainContent .page-content h2,
   #MainContent .page-content h3 {
     margin-top: var(--spacing-lg);
     margin-bottom: var(--spacing-base);
   }

   #MainContent .page-content p {
     margin-bottom: var(--spacing-base);
     line-height: 1.8;
   }

   #MainContent .page-content ul,
   #MainContent .page-content ol {
     margin-left: var(--spacing-md);
     margin-bottom: var(--spacing-base);
   }
   ```

4. **Screenshot at all 3 viewports**.

### 2.8 Build Error & Special Pages

**Objective:** Create 404, 500, and maintenance page templates.

**Instructions:**

1. **404 Page**: `templates/404.json`
   ```json
   {
     "sections": {
       "main": {
         "type": "main-404",
         "settings": {}
       }
     },
     "order": [
       "main"
     ]
   }
   ```

2. **500 Page**: `templates/500.json` (same structure)

3. **Password Page**: `templates/password.json`

4. **Create sections** that display error messages using design system:
   ```liquid
   <section class="page-404">
     <div class="container-narrow">
       <div class="empty-state">
         <div class="empty-state-icon">😕</div>
         <h1>Page Not Found</h1>
         <p>The page you're looking for doesn't exist.</p>
         <a href="/" class="btn btn-primary">Return Home</a>
       </div>
     </div>
   </section>
   ```

5. **Screenshot at all 3 viewports**.

---

## Step 3: Page-by-Page Visual QA

### 3.1 QA Process for Each Page

**Objective:** Ensure every page meets quality standards before moving to next page.

**Instructions:**

For each page, before considering it "done":

1. **Screenshot at all 3 viewports:**
   - Desktop (1440px)
   - Tablet (768px)
   - Mobile (390px)
   - Save to: `THEME_ROOT/.workflow/implementation-screenshots/{page-name}-{viewport}.png`

2. **Compare against design spec** from Workflow 1:
   - Is the layout correct?
   - Are all sections present?
   - Are all content elements visible?
   - Do proportions match?

3. **Check visual consistency:**
   - Do colors match the design system?
   - Do fonts match?
   - Do spacing/padding match?
   - Do button styles match?
   - Do cards/components match design system?

4. **Test responsive behavior:**
   - Does layout stack correctly on mobile?
   - Does content reflow correctly on tablet?
   - Are images responsive?
   - Are buttons clickable on all devices?
   - No horizontal scrolling on mobile?

5. **Test interactivity:**
   - Do buttons work?
   - Do forms work?
   - Do variant selectors work (product page)?
   - Do navigation links work?
   - Do modals/accordions open/close?

6. **Browser/Device Test:**
   - Test on Chrome, Firefox, Safari (if possible)
   - Test on mobile device if available
   - Verify no console errors

7. **Fix any issues** before moving to next page.

### 3.2 Visual QA Checklist

**Use this checklist for every page:**

- [ ] All sections from content spec are present
- [ ] All content elements visible and readable
- [ ] Colors match design system tokens
- [ ] Typography matches design system (sizes, weights, families)
- [ ] Spacing matches design system (padding, margin, gaps)
- [ ] Components match design system styles (buttons, cards, forms)
- [ ] Layout matches design spec at desktop
- [ ] Layout matches design spec at tablet
- [ ] Layout matches design spec at mobile
- [ ] No horizontal scrolling on mobile
- [ ] Buttons are clickable (min 44px height/width)
- [ ] Forms work (inputs accept text, submission works)
- [ ] Images responsive and not distorted
- [ ] Loading states display correctly (if applicable)
- [ ] Error states display correctly (if applicable)
- [ ] Interactive elements have proper hover states
- [ ] Links have proper focus states (keyboard accessible)
- [ ] No console errors
- [ ] Page load time acceptable (< 3s on throttled connection)

---

## Step 4: Sub-Agent Strategy for Scaling

### 4.1 Parallel Page Implementation

**Objective:** Build multiple pages in parallel using sub-agents.

**Instructions:**

1. **Main Agent Responsibilities:**
   - Complete homepage
   - Complete product page
   - Complete the most critical pages
   - Coordinate sub-agents

2. **Spin Up Sub-Agents For:**
   - Collection page
   - Cart page
   - Blog listing page
   - Article page
   - About/Contact/FAQ pages

3. **Provide each Sub-Agent with:**
   - Content spec for the page
   - Design system reference
   - Code-architecture skill
   - Theme root path
   - Example page implementations (homepage, product)
   - Visual comparison skill

4. **Sub-Agent Tasks:**
   - Build the page template JSON
   - Build any new sections needed
   - Override Horizon section styling
   - Run visual QA
   - Fix issues
   - Report: template created, sections created/modified, issues found

5. **Sub-Agent Reporting Template:**
   ```
   Page: [Page Name]
   Template: templates/[name].json

   Sections Created:
   - [section-name].liquid
   - [section-name].liquid

   Sections Modified:
   - [existing-section].liquid

   CSS Overrides Added to:
   - assets/horizon-overrides.css

   Visual QA Result:
   - [ ] Passed all checks
   - [ ] Issues found: [list]
   - [ ] Issues fixed: [list]

   Screenshots:
   - [page-name]-1440.png
   - [page-name]-768.png
   - [page-name]-390.png
   ```

---

## Step 5: Key Implementation Principles

### 5.1 Design System Compliance

**Objective:** Ensure all pages use the design system, not one-off styles.

**Instructions:**

1. **No Hardcoded Colors:**
   - Use `var(--color-primary)`, `var(--color-secondary)`, etc.
   - Update via theme settings only

2. **No Hardcoded Spacing:**
   - Use `var(--spacing-base)`, `var(--spacing-lg)`, etc.
   - Use spacing utility classes (`.m-base`, `.p-lg`)

3. **No Custom Component Styles:**
   - Use `.btn`, `.btn-primary`, etc. for buttons
   - Use `.card` for cards
   - Use form utilities for forms
   - Only override for unique variations

4. **Use Primitives:**
   - Every button, card, form, badge should use design system classes
   - If a variation doesn't exist, add it to primitives.css in Phase 3 (or during implementation if urgent)

5. **Reuse Snippets:**
   - Don't duplicate component code
   - Use snippets for repeated patterns (product cards, feature items)
   - DRY principle applies

### 5.2 Keeping Clone Pages Intact

**Objective:** Maintain clone pages as reference.

**Instructions:**

1. Clone pages should NOT be modified in Phase 4.

2. If you need a variation of a clone section:
   - Create a new section (`custom-*`)
   - Don't modify the clone section

3. Clone pages remain in templates as:
   - `templates/page.clone-homepage.json`
   - `templates/page.clone-product.json`
   - etc.

4. Real pages use different templates:
   - `templates/index.json` (homepage)
   - `templates/product.json` (product)
   - etc.

### 5.3 Horizon Section Functionality

**Objective:** Keep Horizon sections functional.

**Instructions:**

1. For pages using Horizon sections:
   - Don't recreate the section
   - Override CSS only
   - Keep all Horizon functionality

2. Example: Product page
   - Use Horizon product section
   - Override its CSS to match design system
   - All product features (variants, add to cart) work as before

3. Example: Collection page
   - Use Horizon collection section
   - Override CSS to match design system
   - All filtering/sorting features work as before

4. If you need to change functionality:
   - Create a custom section instead
   - Document why in code comments

---

## Verification Checklist

**Before moving to Phase 5, verify:**

- [ ] Homepage is complete and passes visual QA
- [ ] Product page is complete and passes visual QA
- [ ] Collection page is complete and passes visual QA
- [ ] Cart page is complete and passes visual QA
- [ ] Blog/Article pages are complete and pass visual QA
- [ ] Generic pages (About, Contact, FAQ) are complete and pass visual QA
- [ ] Error pages (404, 500, password) are complete and pass visual QA
- [ ] All pages use design system (no hardcoded colors/spacing)
- [ ] All pages are responsive (no horizontal scrolling)
- [ ] All pages responsive layout correct at all 3 viewports
- [ ] All interactive elements work correctly
- [ ] All forms work and submit
- [ ] All buttons and links are clickable/functional
- [ ] All pages load without console errors
- [ ] No one-off CSS in sections (all design system)
- [ ] Code follows code-architecture skill
- [ ] All screenshots taken and saved

---

## Next Steps

Once all verification items pass, move to **Phase 5: Final QA & Refinement**.
