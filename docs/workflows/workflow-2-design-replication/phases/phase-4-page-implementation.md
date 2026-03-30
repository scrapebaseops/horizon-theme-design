# Workflow 2: Phase 4 — Apply Design System to Real Pages

## Overview
Phase 4 applies the design system to build actual Shopify pages using content from Workflow 1. These pages are real, functional pages (not just design clones) that serve the business needs while maintaining visual consistency.

By the end of this phase, you will have:
- All required Shopify pages built and functional
- All pages visually match the design system
- All content from Workflow 1 specifications integrated
- All pages responsive and working at all viewports
- All interactive elements functional

### Naming Convention

All custom files and CSS classes use the project prefix from `THEME_ROOT/.workflow/prefix.txt`. In this phase:
- New sections: `sections/{prefix}feature-grid.liquid`
- New snippets: `snippets/{prefix}product-card.liquid`
- CSS classes: `.{prefix}btn`, `.{prefix}card`, etc.
- Horizon overrides: scoped under `#MainContent` in `assets/{prefix}primitives.css`

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

### 1.1b Read Native Section Schemas

**Objective:** Understand what Horizon's native sections actually support before writing template JSON.

**Instructions:**

For every Horizon native section you plan to use or override (product, collection, cart, blog, article, search, etc.):

1. **Read the section's `.liquid` file** and locate its `{% schema %}` block
2. **Document:**
   - Section type name (the filename without `.liquid`)
   - Available settings and their types
   - Available block types and their settings
   - Any `presets` or `templates` constraints
3. **Compare against what the content plan requires** — which settings do you need, which blocks are available?
4. **The template JSON you write in Step 1.2 MUST use block types that exist in the section's schema.** If you write a block type that doesn't exist, Shopify will silently ignore it.

**Example:** Before writing `templates/product.json`, read `sections/main-product.liquid` (or `sections/product-information.liquid` — the name varies by Horizon version). Also check `horizon-themes/default/templates/product.json` for a working starting point.

Save your findings to: `THEME_ROOT/.workflow/horizon-section-schemas.md`

### 1.2 Map Sections to Design System

**Objective:** Determine which design system components or clone sections to use for each page section.

**Instructions:**

1. For each section required by a page:

   **Option 1: Reuse Clone Section**
   - If this section was built as a clone, you can reuse it
   - Assign a block type name: `clone-{prefix}{section-name}`
   - Note: "This is a reused clone section"

   **Option 2: Override Horizon Native Section**
   - If Horizon provides the section (product, collection, etc.)
   - You'll override its CSS via `assets/{prefix}primitives.css`
   - Only override styling, keep functionality
   - Assign block type: The Horizon section name (from Step 1.1b schema audit)
   - Note: "Using Horizon native section with style overrides"

   **Option 3: Build New Section**
   - If neither clone nor Horizon covers this
   - Build a new section using design system primitives
   - Assign a block type: `{prefix}{section-name}`
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
   - Assigned: {prefix}newsletter
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
7. **Error Pages** (404, etc.)
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
         "type": "{prefix}features",
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
         "type": "{prefix}newsletter",
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
   - Create `sections/{prefix}features.liquid` if needed
   - Create `sections/{prefix}newsletter.liquid` if needed
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

   **Warning:** The section type, setting names, and block types below are **illustrative**. Horizon's actual product section may use different names (e.g., `product-information` instead of `product`, `variant-picker` instead of `variant_selector`). You **must** read the section's `{% schema %}` block first (see Step 1.1b) and use the actual block types from the schema. Also check `horizon-themes/default/templates/product.json` for a known-working starting point.

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
         "type": "{prefix}related-products",
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
   - Don't recreate; override CSS in `assets/{prefix}primitives.css`
   - Ensure product images, variants, pricing display correctly

5. **Build custom sections** if needed:
   - `sections/{prefix}related-products.liquid` if different from clone

6. **Override Horizon product section styling**:
   - Edit `assets/{prefix}primitives.css`
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
         "type": "{prefix}collection-header",
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
   - Create `sections/{prefix}collection-header.liquid`
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
     transition: box-shadow var(--transition-base);
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
         "type": "{prefix}related-articles",
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

### 2.6b Build Search Results Page

**Objective:** Build the search results page template.

**Instructions:**

1. **Review the search page content spec** from Workflow 1 (if applicable).

2. **Edit the search template**: `templates/search.json`

3. **Use Horizon's native search section** (`search-results`):
   - Override CSS only — do NOT fork the section
   - Search input, results grid, and pagination are all handled by Horizon
   - Style product cards in results to match your design system

4. **Override search styling** in `assets/{prefix}primitives.css`:
   ```css
   /* Search page overrides */
   #MainContent .search__input {
     border-radius: var(--border-radius-md);
     font-family: var(--font-body);
     padding: var(--space-sm) var(--space-md);
   }

   #MainContent .search-results .product-card {
     /* Matches collection page product card styling */
   }
   ```

5. **Screenshot at all 3 viewports** and verify search input and results layout.

### 2.6c Build List-Collections Page

**Objective:** Build the "all collections" page template.

**Instructions:**

1. **Edit the list-collections template**: `templates/list-collections.json`

2. **Use Horizon's native list-collections section**:
   - Override CSS to match design system
   - Collection cards should match your card primitives

3. **Override list-collections styling** in `assets/{prefix}primitives.css`:
   ```css
   /* List-Collections overrides */
   #MainContent .collection-list .collection-card {
     border-radius: var(--border-radius-md);
   }

   #MainContent .collection-list .collection-card__title {
     font-family: var(--font-heading);
   }
   ```

4. **Screenshot at all 3 viewports**.

### 2.6d Build Contact Page

**Objective:** Build the contact page using Horizon's dedicated contact template.

**Instructions:**

1. **Horizon provides a separate contact template**: `templates/page.contact.json`

2. **This is distinct from the generic `page.json`** — it includes a contact form section.

3. **Configure the contact template** with appropriate sections:
   - Contact form (Horizon native)
   - Store information (hours, address, phone)
   - Map section (if applicable)

4. **Override contact form styling** in `assets/{prefix}primitives.css` — form inputs should match your design system.

5. **Screenshot at all 3 viewports**.

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

**Objective:** Create 404 and maintenance page templates.

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

2. **Note:** Shopify handles 500 server errors at the infrastructure level — there is no `templates/500.json`. Only 404 and password templates can be customized.

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

## Step 2b: Configure Header, Footer, and Navigation

### 2b.1 Configure Navigation Menus

**Objective:** Set up Shopify navigation menus to match Workflow 1's site structure.

**Instructions:**

1. **Review the site structure** from `CONTENT_PLANS_PATH/site-structure.md` — it contains the navigation plan.

2. **The main navigation menu** is configured in Shopify admin (Navigation section), not in theme files. However, the workflow should document the expected menu structure:

3. **Create a menu configuration document**: `THEME_ROOT/.workflow/navigation-config.md`
   ```markdown
   # Navigation Configuration

   ## Main Menu
   - Home → /
   - Shop → /collections/all
     - [Collection 1] → /collections/collection-1
     - [Collection 2] → /collections/collection-2
   - About → /pages/about
   - Blog → /blogs/news
   - Contact → /pages/contact

   ## Footer Menu
   - About Us → /pages/about
   - FAQ → /pages/faq
   - Shipping & Returns → /pages/shipping-returns
   - Privacy Policy → /policies/privacy-policy
   - Terms of Service → /policies/terms-of-service
   ```

4. **If working with a dev store:** Create these menus via Shopify admin or Shopify CLI.

5. **If working locally only:** Document the expected menus so they can be created when the theme is deployed.

### 2b.2 Configure Header Section Group

**Objective:** Configure the header to match the reference design.

**Instructions:**

1. **Edit `sections/header-group.json`** to configure:
   - Announcement bar: text, link, color scheme
   - Header: logo, menu reference, sticky behavior, transparent options
   - Menu style and position

2. **Verify header matches reference** at all viewports:
   - Logo size and position correct
   - Navigation items visible and styled (desktop)
   - Mobile hamburger menu works
   - Search icon present and functional
   - Cart icon with count badge
   - Announcement bar displays correctly
   - Sticky behavior matches reference

### 2b.3 Configure Footer Section Group

**Objective:** Configure the footer to match the reference design.

**Instructions:**

1. **Edit `sections/footer-group.json`** to configure:
   - Footer content: link columns, newsletter, social links
   - Footer utilities: copyright, policy links, payment icons

2. **Verify footer matches reference** at all viewports:
   - Link columns display correctly
   - Newsletter signup form styled
   - Social media icons present
   - Copyright and policy links visible
   - Payment icons display

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

### 4.1 Two-Stage Page Implementation

**Objective:** Build the homepage first to establish patterns, then build remaining pages in parallel.

**Instructions:**

#### Stage 1: Homepage (Sequential — Main Agent or Single Sub-Agent)

The homepage builds first, alone. It touches the most section types and establishes patterns for everything that follows.

1. Build the homepage following Steps 1-3 above
2. Screenshot at 1440px, 768px, 390px and verify against reference
3. Load the design system reference page — verify nothing broke
4. **Update `THEME_ROOT/.workflow/design-system-handoff.md`** with homepage learnings:
   - Any primitives that needed adjustment (and how)
   - Section JSON conventions that worked well
   - Gotchas or unexpected Horizon behaviors encountered
   - Any new CSS added to primitives during the homepage build
5. Only proceed to Stage 2 after the homepage passes QA and the handoff brief is updated

#### Stage 2: Remaining Pages (Parallel Sub-Agents)

For stores with ≤6 pages, skip sub-agents — the main agent builds all pages sequentially for better quality. For larger stores, launch parallel batches:

- **Batch A:** Product Page + Cart Page
- **Batch B:** Collection + Search + List-Collections
- **Batch C:** Blog Listing + Article
- **Batch D:** Custom pages (About, Contact, FAQ, etc.)
- **Batch E:** 404 + Password

**Conflict Avoidance — Per-Batch CSS Files:**

Since multiple sub-agents run in parallel, they must NOT write to the same CSS file simultaneously. Each batch writes Horizon overrides to its own batch-specific file:

- **Batch A:** `assets/{prefix}overrides-product-cart.css`
- **Batch B:** `assets/{prefix}overrides-collection-search.css`
- **Batch C:** `assets/{prefix}overrides-blog-article.css`
- **Batch D:** `assets/{prefix}overrides-pages.css`
- **Batch E:** `assets/{prefix}overrides-error.css`

Each sub-agent registers its batch CSS file in `snippets/stylesheets.liquid` by appending one line (append only — never modify existing lines). The main agent consolidates these into `{prefix}primitives.css` during the Post-Stage 2 merge.

If a sub-agent discovers that a shared primitive or token in `{prefix}primitives.css` or `{prefix}tokens.liquid` needs fixing, it should **not** directly edit those files. Instead:
1. Write a workaround in its batch override file (with a comment explaining the issue)
2. Flag it clearly in "SHARED FIXES" in its completion report
3. The main agent applies the real fix during merge

**Provide each Sub-Agent with:**
   - `THEME_ROOT/.workflow/design-system-handoff.md` (**updated** with homepage learnings — this is the primary styling guide)
   - The actual CSS source files to read (not just the brief):
     - `THEME_ROOT/snippets/{prefix}tokens.liquid`
     - `THEME_ROOT/assets/{prefix}primitives.css`
     - `THEME_ROOT/assets/{prefix}base.css`
     - `THEME_ROOT/snippets/stylesheets.liquid`
   - Content spec for the assigned page(s) from Workflow 1
   - `CONTENT_PLANS_PATH/site-content-map.md` (for shared component awareness)
   - Code-architecture skill reference (`docs/workflows/skills/code-architecture/SKILL.md`)
   - Visual comparison skill reference (`docs/workflows/skills/visual-comparison/SKILL.md`)
   - Theme root path
   - The completed homepage implementation (as a pattern to follow: `templates/index.json` and its sections)
   - The batch-specific CSS file name to write overrides to (e.g., `{prefix}overrides-product-cart.css`)

**Sub-Agent Tasks:**
   - Build the page template JSON
   - Build any new sections needed
   - Write Horizon overrides to the assigned **batch-specific CSS file** (not `{prefix}primitives.css`)
   - Register the batch CSS file in `snippets/stylesheets.liquid` (append only)
   - Run visual QA
   - Fix issues
   - If a shared primitive or token needs fixing, write a workaround in the batch file and flag it under "SHARED FIXES"
   - Report: template created, sections created/modified, shared fixes (if any), issues found

**Sub-Agent Reporting Template:**
   ```
   Page: [Page Name]
   Template: templates/[name].json

   Sections Created:
   - [section-name].liquid
   - [section-name].liquid

   Sections Modified:
   - [existing-section].liquid

   CSS Overrides Added to:
   - assets/{prefix}overrides-[batch].css (batch-specific — Horizon overrides scoped under #MainContent)

   SHARED FIXES (issues found in shared primitives/tokens — workaround in batch file):
   - [describe fix needed, the workaround applied, and why, or "None"]

   Visual QA Result:
   - [ ] Passed all checks
   - [ ] Issues found: [list]
   - [ ] Issues fixed: [list]

   Screenshots:
   - [page-name]-1440.png
   - [page-name]-768.png
   - [page-name]-390.png
   ```

#### Post-Stage 2: Merge Review

After all sub-agents complete, the main agent:
1. Reviews all "SHARED FIXES" from sub-agent reports
2. Applies shared fixes to `{prefix}primitives.css` and `{prefix}tokens.liquid`
3. **Consolidates batch CSS files:** Merge all `assets/{prefix}overrides-*.css` rules into `assets/{prefix}primitives.css`, resolving any duplicate selectors or conflicting declarations. Then delete the batch-specific files and remove their entries from `snippets/stylesheets.liquid`.
4. Loads the design system reference page — verifies everything still works together
5. Screenshots every completed page at all breakpoints for Phase 5 QA baseline

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

6. **Refactor Up When Patterns Emerge:**
   - If 2 or more sections need the same custom CSS, don't duplicate it
   - Move the shared styles up to `assets/primitives.css` as a new primitive class
   - Section-specific CSS should be under 20 lines per section
   - If a section's custom CSS exceeds 20 lines, evaluate which parts can be promoted to primitives
   - This keeps the cascade clean: tokens → base → primitives handle 90%+ of styling

7. **Check the Design System Reference Page After Every Significant Change:**
   - After building each page (or batch of related pages), load `page.design-system.json` in the browser
   - Visually scan the full reference page at all 3 viewports (1440px, 768px, 390px)
   - Look for: broken layouts, color inconsistencies, spacing regressions, missing components
   - If anything looks wrong, fix it BEFORE continuing to the next page
   - This catches cascade bugs early — a CSS change for the product page might break the button primitives
   - The reference page is your canary in the coal mine

### 5.2 Keeping Clone Pages Intact

**Objective:** Maintain clone pages as reference.

**Instructions:**

1. Clone pages should NOT be modified in Phase 4.

2. If you need a variation of a clone section:
   - Create a new section (`{prefix}*`)
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

### 5.4 JavaScript and Interactivity

**Objective:** Ensure interactive elements work correctly.

**Instructions:**

1. **Horizon Native Sections Handle Their Own JS:**
   - Product sections (variant selectors, add to cart, image galleries) → Horizon's JS
   - Collection sections (filtering, sorting, pagination) → Horizon's JS
   - Cart sections (quantity changes, remove items) → Horizon's JS
   - Search sections (search input, results) → Horizon's JS
   - Do NOT rewrite JavaScript for these — only override CSS

2. **Custom Sections May Need Minimal JS:**
   - Accordions/collapsibles → use `<details>`/`<summary>` HTML elements (no JS needed)
   - Mobile navigation toggle → Horizon provides this
   - Modals/drawers → if not using Horizon's, use minimal vanilla JS in a section `{% javascript %}` block
   - Carousels/sliders → evaluate if truly needed; consider CSS-only alternatives first

3. **Rules for Custom JavaScript:**
   - Keep JS in the section file using `{% javascript %}` blocks
   - No external JS libraries unless absolutely necessary
   - Progressive enhancement: the page must work without JS (content visible, links functional)
   - All interactive elements must be keyboard accessible
   - Document any custom JS in code comments

4. **What This Workflow Does NOT Build:**
   - Complex client-side features (real-time search, AJAX cart drawer, etc.)
   - These are post-workflow enhancements
   - The workflow produces a visually complete, navigable theme — advanced JS interactions come later

---

## Verification Checklist

**Before moving to Phase 5, verify:**

- [ ] Homepage is complete and passes visual QA
- [ ] Product page is complete and passes visual QA
- [ ] Collection page is complete and passes visual QA
- [ ] Cart page is complete and passes visual QA
- [ ] Blog/Article pages are complete and pass visual QA
- [ ] Generic pages (About, Contact, FAQ) are complete and pass visual QA
- [ ] Error pages (404, password) are complete and pass visual QA
- [ ] Search page is complete and passes visual QA
- [ ] List-collections page is complete and passes visual QA
- [ ] Contact page is complete and passes visual QA
- [ ] Navigation menus documented in navigation-config.md
- [ ] Header configured and matching reference at all viewports
- [ ] Footer configured and matching reference at all viewports
- [ ] Mobile navigation works correctly
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
