# Store Readiness — Lettii 1.1

**Store:** theme-dev-store-2038.myshopify.com
**Password:** reufia
**Theme Server:** http://127.0.0.1:9292

## Phase 1B: Clone Page Testing

To test clone pages, the following Shopify pages need to be created in the admin:

| Page Title | Handle | Template | Purpose |
|-----------|--------|----------|---------|
| Clone Homepage | clone-homepage | page.clone-homepage | Tests hero, features, CTA, testimonial, FAQ, subscribe |

**Action required:** Create a page named "Clone Homepage" in Shopify admin (Online Store > Pages > Add page), then assign it the `page.clone-homepage` template.

**Preview URL:** `http://127.0.0.1:9292/pages/clone-homepage`

## Phase 4: Real Page Testing

Products, collections, pages, menus, and policies need to be seeded before Phase 4.

### Required Resources (to be created)

**Products:**
- [ ] At least 3 individual lamp products (different styles)
- [ ] At least 1 bundle product
- [ ] Products need: title, price, compare_at_price (bundles), images (lifestyle), description, tags (setting, style)

**Collections:**
- [ ] all-lamps
- [ ] sets-bundles
- [ ] At least 1 setting collection (e.g., dining-entertaining)
- [ ] At least 1 style collection (e.g., mushroom-dome)

**Pages:**
- [ ] Our Story (handle: our-story, template: page.about)
- [ ] FAQ (handle: faq, template: page.faq)
- [ ] Contact (handle: contact, template: page.contact)
- [ ] Hospitality (handle: hospitality, template: page.hospitality)
- [ ] Weddings (handle: weddings, template: page.weddings)
- [ ] Styling Ideas (handle: styling-ideas, template: page.lookbook)
- [ ] Shipping (handle: shipping, template: page.shipping)

**Blog:**
- [ ] Blog with handle `blog`
- [ ] At least 1 article with featured image

**Navigation Menus:**
- [ ] Main navigation with Shop mega-menu
- [ ] Footer menu (4 columns: Shop, Help, About, Business)

**Policies:**
- [ ] Shipping Policy (Shopify settings)
- [ ] Privacy Policy (Shopify settings)
- [ ] Terms of Service (Shopify settings)

**Metafields (product):**
- [ ] custom.value_prop (single_line_text_field)
- [ ] custom.specs (json)
- [ ] custom.whats_included (json) — for bundles
- [ ] custom.faq (json)
- [ ] custom.bundle_savings (single_line_text_field) — for bundles

### Blockers

- Store currently has sample data (snowboards) — needs Lettii products
- No Lettii collections exist yet
- No custom pages created yet
- Blog handle needs to be set to `blog`
