# Store Trait Pattern Skills

This directory contains reusable CRO/UX pattern documentation organized by individual brand/store traits. Each subdirectory represents a specific trait and contains a `SKILL.md` file with proven patterns for stores that exhibit that trait.

## How This Works

Rather than forcing brands into fixed categories (which breaks down for brands with unique trait combinations), this system documents patterns at the trait level. A subscription-based fashion brand benefits from both the `subscription-model/SKILL.md` and the `fashion-sizing/SKILL.md` skills simultaneously.

## How Skills Are Created

When Workflow 1 runs, Step 1 (Analyze Brand Traits) identifies the brand's unique characteristics. Step 2 (Research Best Practices) researches each trait that needs specialized approaches. After research, any trait with distinct, reusable patterns gets documented as a micro-skill here.

**Not every trait gets a skill.** Only traits where the research reveals patterns that meaningfully differ from standard ecommerce defaults warrant their own skill document.

## How Skills Are Used

During Workflow 1 Step 1, the agent checks this directory for existing skills matching any of the brand's identified traits. Existing skills can be used directly (skipping research for that trait) or updated with new findings.

## Example Traits

These are examples of traits that might warrant their own skill — not a fixed list. New traits are added organically as they're encountered:

- `subscription-model/` — Stores with subscribe-and-save or recurring delivery
- `single-hero-product/` — Stores built around one flagship product
- `consumable-products/` — Products customers replenish regularly
- `fashion-sizing/` — Apparel with size/fit complexity
- `visual-merchandising/` — Stores where visual presentation drives purchases (fashion, home decor, art)
- `high-consideration-purchase/` — Expensive items requiring education and trust-building
- `ingredient-transparency/` — Food, supplements, skincare where ingredient lists matter
- `bundle-and-kit/` — Stores that sell product bundles or kits
- `quiz-personalization/` — Stores using quizzes to recommend products
- `content-led-conversion/` — Stores where blog/editorial content is a primary acquisition channel
- `gift-oriented/` — Stores where a significant portion of purchases are gifts

## Skill Document Structure

Each `SKILL.md` follows this structure:

1. What this trait is and when it applies
2. Structural impact (homepage, product page, collection pages, cart, additional pages, navigation)
3. CRO patterns specific to this trait
4. Trust signals that matter
5. Common mistakes to avoid
6. Sources consulted
7. Last updated date

## Directory Structure

```
store-traits/
├── README.md                          (this file)
├── subscription-model/
│   └── SKILL.md
├── single-hero-product/
│   └── SKILL.md
├── [trait-slug]/                      (added on demand)
│   └── SKILL.md
└── ...
```

Skills are created on demand as Workflow 1 encounters traits worth documenting. The directory grows organically over time.
