# Shopify Admin Setup Guide — Lettii 1.1

This document lists everything that needs to be created in the Shopify admin for the theme to be fully functional. The theme files are ready — these are the store resources they depend on.

---

## 1. Navigation Menus

### Main Menu (handle: `main-menu`)
```
Shop (mega-menu)
├── By Setting
│   ├── Dining & Entertaining → /collections/dining-entertaining
│   ├── Bedroom & Bedside → /collections/bedroom-bedside
│   ├── Garden & Outdoor → /collections/garden-outdoor
│   └── Restaurants & Bars → /collections/restaurants-bars
├── By Style
│   ├── Mushroom & Dome → /collections/mushroom-dome
│   ├── Slim & Modern → /collections/slim-modern
│   ├── Lantern & Shade → /collections/lantern-shade
│   ├── Sculptural → /collections/sculptural
│   ├── Geometric → /collections/geometric
│   └── Crystal & Glass → /collections/crystal-glass
└── Featured
    ├── All Lamps → /collections/all-lamps
    ├── Sets & Bundles → /collections/sets-bundles
    ├── New Arrivals → /collections/new-arrivals
    └── Gifts → /collections/gifts
Styling Ideas → /pages/styling-ideas
Our Story → /pages/our-story
```

### Footer Menu — Shop (handle: `footer-shop`)
- All Lamps → /collections/all-lamps
- Sets & Bundles → /collections/sets-bundles
- New Arrivals → /collections/new-arrivals
- Gift Cards → /gift_cards

### Footer Menu — Help (handle: `footer-help`)
- FAQ → /pages/faq
- Shipping & Delivery → /pages/shipping
- Returns & Guarantee → /policies/refund-policy
- Contact Us → /pages/contact

### Footer Menu — About (handle: `footer-about`)
- Our Story → /pages/our-story
- Styling Ideas → /pages/styling-ideas
- Blog → /blogs/blog

### Footer Menu — Business (handle: `footer-business`)
- For Restaurants & Hospitality → /pages/hospitality
- For Weddings & Events → /pages/weddings

---

## 2. Pages to Create

| Page Title | Handle | Template | Notes |
|-----------|--------|----------|-------|
| Our Story | our-story | page.about | Brand narrative page |
| FAQ | faq | page.faq | Objection handling |
| Contact | contact | page.contact | Uses Horizon's native contact form |
| Shipping & Delivery | shipping | page.shipping | Shipping table + policies |
| For Restaurants & Hospitality | hospitality | page.hospitality | B2B landing page |
| For Weddings & Events | weddings | page.weddings | B2B event landing page |
| Styling Ideas | styling-ideas | page.lookbook | Editorial lookbook |

---

## 3. Blog to Create

| Blog Title | Handle | Notes |
|-----------|--------|-------|
| Blog | blog | Main blog, URL: /blogs/blog |

Create at least 1 article with:
- Title, body text, featured image
- Tags for categorization

---

## 4. Collections to Create

### By Setting
| Collection | Handle |
|-----------|--------|
| Dining & Entertaining | dining-entertaining |
| Bedroom & Bedside | bedroom-bedside |
| Garden & Outdoor | garden-outdoor |
| Restaurants & Bars | restaurants-bars |

### By Style
| Collection | Handle |
|-----------|--------|
| Mushroom & Dome | mushroom-dome |
| Slim & Modern | slim-modern |
| Lantern & Shade | lantern-shade |
| Sculptural | sculptural |
| Geometric | geometric |
| Crystal & Glass | crystal-glass |

### Featured
| Collection | Handle |
|-----------|--------|
| All Lamps | all-lamps |
| Sets & Bundles | sets-bundles |
| New Arrivals | new-arrivals |
| Best Sellers | best-sellers |
| Gifts | gifts |

Each collection needs:
- Title
- Description (1-2 sentences)
- Featured image (lifestyle photo of lamps in that setting/style)

---

## 5. Products

Minimum for testing:
- 3-4 individual lamp products (different styles)
- 1-2 bundle products (with compare_at_price for savings display)
- Each product needs: title, price, description, 5+ images, tags

### Recommended Tags
- Setting tags: `dining`, `garden`, `bedroom`, `restaurants`
- Style tags: `mushroom`, `slim`, `lantern`, `sculptural`, `geometric`, `crystal`
- Type: `lamp` or `bundle`

### Product Metafields (optional, for enhanced PDP)
| Namespace.key | Type | Purpose |
|---|---|---|
| custom.value_prop | single_line_text_field | One-line value prop below title |
| custom.specs | json | Spec accordion content |
| custom.whats_included | json | Bundle "What's Included" block |
| custom.faq | json | Product-level FAQ |
| custom.bundle_savings | single_line_text_field | Savings amount |

---

## 6. Policies

Set in Settings → Policies:
- **Shipping Policy**: Brief text about UK shipping (free over £50, 2-4 days standard, next-day express)
- **Privacy Policy**: Standard GDPR-compliant privacy policy
- **Terms of Service**: Standard terms
- **Refund Policy**: 30-day money-back guarantee, free returns, no questions asked

---

## 7. Theme Settings to Verify

After creating all resources, verify in the theme editor:
- [ ] Logo uploaded (Settings → Logo and Favicon)
- [ ] Main menu assigned to header
- [ ] Footer menus assigned to footer columns
- [ ] Social media links set (Settings → Social media in admin)
- [ ] Cart type set to "drawer" (already configured in settings_data.json)

---

## 8. Order of Operations

1. Create products (need these for collections to populate)
2. Create collections (assign products)
3. Create pages (assign templates)
4. Create blog + article
5. Create navigation menus
6. Set policies
7. Upload logo
8. Preview and verify
