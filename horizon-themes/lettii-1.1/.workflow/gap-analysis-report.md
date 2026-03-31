# Phase 3: Gap Analysis Report

**DS Coverage**: ~40% complete — strong on foundations (typography, colors, spacing, buttons, forms), zero on ecommerce-specific components.

## Priority 1: Build Now (blocks everything)

| Component | Pages | Approach |
|---|---|---|
| Trust Bar (4-icon strip) | Homepage, Collection, Search, Cart, Product | New section `let-trust-bar.liquid` |
| Collection Hero (image + title overlay) | All collection pages | New section `let-collection-hero.liquid` |
| Product Trust Icon Strip (5 icons near ATC) | Product page | Block within product-information or custom-liquid |

## Priority 2: Commerce Components

| Component | Pages | Approach |
|---|---|---|
| Free Shipping Progress Bar | Cart drawer + page | Snippet + JS |
| Bundle "What's Included" | Product (bundles) | Product page block |
| Sticky Mobile ATC Bar | Product (mobile) | JS component + CSS |

## Priority 3: Content Page Sections

| Component | Pages | Approach |
|---|---|---|
| Blog Hero | Blog listing | New section |
| Article Hero | Article detail | New section |
| Article Shop the Look | Article detail | New section |
| Article Related Posts | Article detail | New section |
| B2B Enquiry Form | Hospitality, Weddings | Custom form or app |
| Lookbook Feature | Styling Ideas | New section with blocks |
| Pricing Table | Hospitality, Weddings | Custom section with blocks |

## Horizon Sections to Restyle (CSS only)

- `hero.liquid` — add mobile image settings, height per breakpoint
- `header-announcements.liquid` — configure 4 rotating messages
- `header.liquid` + `footer.liquid` — typography + color overrides
- `product-information.liquid` — product page block styling
- `main-collection.liquid` — grid + filter styling
- `main-cart.liquid` — cart page styling
- `search-results.liquid` — zero-results recovery
- `featured-blog-posts.liquid` — read time, tag pills

## Already Covered by DS

Typography, colors, spacing, buttons (3×6), cards (hover pattern), CTA banner, FAQ accordion, form inputs, subscribe box, testimonial, blog card, section dividers, container, responsive grid, Horizon heading/body/link overrides.
