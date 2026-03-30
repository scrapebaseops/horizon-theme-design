# Workflow 1: Content & Page Planning — Entry Point

## Overview

**Workflow 1** is the foundational planning phase that determines what your Shopify store should contain — its page structure, content hierarchy, section composition, and draft copy — driven entirely by the **brand, business type, and conversion best practices**.

**Critical Principle**: This workflow does NOT consult, analyze, or reference any design template. The reference design is irrelevant here. Content and structure decisions are driven by what makes the best possible store for this specific brand and business type. The reference design enters the picture only in Workflow 2 (Design Replication), where it guides styling — not content.

**Execution Model**: This workflow is designed for autonomous AI agent execution. The agent reads this document, gathers the brand brief, analyzes the brand's unique characteristics, researches best practices for those characteristics, and produces detailed page specifications with structure and draft copy.

---

## Purpose & Goals

By the end of this workflow, you will have:

1. A **brand trait analysis** identifying the unique characteristics that shape this store's UX, CRO, and structure
2. **CRO/UX research findings** for each trait that needs a specialized approach, with reusable micro-skills documented for future use
3. A **site structure plan** listing every page and template the store needs
4. **Individual page content specifications** for every page, including section-by-section structure and draft copy
5. A **site content map** consolidating all pages, shared components, and reuse patterns
6. A **gap analysis** comparing planned content against Horizon theme defaults and verifying all required Shopify pages are covered

These deliverables are the complete content specification for Workflow 2 (Design Replication).

---

## Required Inputs

### 1. `BRAND_BRIEF`

The brand brief is the **sole source of context** for this workflow. There is no live website to reference — all content, structure, and CRO decisions are made from this document alone. It must be thorough.

**Use the template at `templates/brand-brief-template.md`** to ensure completeness. The template focuses on what Workflow 1 actually needs to make decisions — the brand, product, customer, competition, buying experience, messaging, and policies. It deliberately excludes visual design direction and technical specs, which are not relevant until Workflow 2.

**Validation**: Before proceeding, verify the brief covers at minimum:

- [ ] Brand name and what the store sells
- [ ] Brand voice / personality (with example sentences if possible)
- [ ] Product catalog shape (how many products, how organized)
- [ ] Product collections / categories
- [ ] Target audience with specifics (not just "women 25–45")
- [ ] Customer objections (what stops them from buying)
- [ ] Direct competitors and what makes this brand different
- [ ] Primary conversion goal
- [ ] Path to purchase (how the customer journey works)
- [ ] Key trust signals (reviews, guarantees, certifications, etc.)
- [ ] Key messages (what the site must communicate, in priority order)
- [ ] Homepage intent (what the homepage should accomplish)
- [ ] Shipping and returns policies

If any of these are missing, stop and ask the user to provide them. The agent cannot reliably make content and structure decisions without this information.

### 2. `THEME_ROOT`

- **Description**: Path to the Horizon theme copy being worked on
- **Example**: `horizon-themes/my-project/`
- **Purpose**: Used in the gap analysis step to compare planned components against what Horizon already provides
- **Validation**: Must contain a valid Shopify theme structure (`sections/`, `snippets/`, `templates/`, etc.)

### 3. `OUTPUT_DIR`

- **Description**: Directory where all content plan documents will be written
- **Default**: `THEME_ROOT/.workflow/content-plans/`
- **Validation**: Will be created if it doesn't exist

---

## Agent Execution Architecture

This section defines how the workflow should be executed by AI agents to maximize output quality. The architecture is optimized for Claude Opus 4.6 and accounts for context window management, parallelism opportunities, and consistency requirements.

### Core Principle: The Handoff Brief Pattern

The biggest quality risk in this workflow is context dilution — by the time the agent reaches Step 4 (page specs), it has accumulated the full brand brief, brand analysis, all research findings, and the site structure. That's potentially tens of thousands of tokens before it writes a single page spec. Later pages get worse output as context fills up.

The solution: after the main agent completes the planning steps (1–3), it creates a **handoff brief** — a distilled document containing only the decisions and context that downstream sub-agents need, in a compact format (~1500–2500 tokens). Sub-agents receive this focused document instead of the raw brand brief and full research, giving them maximum context window for actual output.

### Execution Phases

The workflow runs in **four phases**, not six sequential steps. Steps map to phases, but phases define the agent boundaries:

```
Phase A: Analysis & Planning (Main Agent)
├── Step 1: Analyze Brand Traits
├── Step 2: Research Best Practices (spawns research sub-agents in parallel)
├── Step 3: Plan Site Structure
└── Creates: _handoff-brief.md

Phase B: Page Specs (Parallel Sub-Agents)
├── Step 4: Create Page Content Specs
├── Sub-agents work in parallel batches
└── Each receives: handoff brief + site structure + template + assignment

Phase C: Consistency Review (Main Agent or Fresh Sub-Agent)
├── Reads all page specs
├── Checks naming, voice, cross-references, section consistency
└── Applies corrections

Phase D: Consolidation & Gap Analysis (Main Agent or Fresh Sub-Agent)
├── Step 5: Create Site Content Map
├── Step 6: Gap Analysis
└── Reads all page specs + theme files
```

### Phase A: Analysis & Planning (Main Agent)

The main agent handles Steps 1, 2, and 3 sequentially. These are judgment-heavy steps that require building up understanding progressively from the brand brief.

**Step 2 research parallelism**: When Step 1 identifies multiple traits needing research, spawn one sub-agent per trait. Each research sub-agent receives:

- The brand brief (full — research agents need the complete picture)
- Their specific trait assignment and research questions
- The list of competitor/aspirational stores to study for this trait

Research sub-agents return structured findings. The main agent synthesizes all results into `research-findings.md` and writes the combined takeaways.

**Step 3 must stay in the main agent** — it integrates everything (brief + all traits + all research + Shopify conventions) into the site structure. This is the most critical decision point.

**After Step 3, create `OUTPUT_DIR/_handoff-brief.md`:**

This distilled document captures everything a page spec sub-agent needs, without the noise:

```markdown
# Handoff Brief for Page Spec Sub-Agents

## Brand Snapshot
- **Name**: [Brand name]
- **What we sell**: [1–2 sentence product summary]
- **Price range**: [Range]
- **Primary conversion goal**: [Goal]
- **Path to purchase**: [Expected customer journey]

## Brand Voice
- **Personality**: [3–5 adjective description]
- **Example sentences**:
  - "[Example 1 in brand voice]"
  - "[Example 2 in brand voice]"
  - "[Example 3 in brand voice]"
- **Copy conventions**: [Any specific dos/don'ts for copy]

## Target Customer
- **Primary**: [1–2 sentence description]
- **Main problem**: [What they're solving]
- **Key objections**: [Bulleted list]

## Key Messages (Priority Order)
1. [Most important message]
2. [Second]
3. [Third]
4. [Fourth]
5. [Fifth]

## Trust Signals to Use
[Bulleted list of available trust signals: reviews, certifications, guarantees, etc.]

## CRO Priorities
[Ranked list from brand analysis]

## Structural Decisions (from Research)
[The 5–10 key findings that affect page structure — distilled, not the full research.
E.g., "Subscription model: product pages need subscribe-and-save toggle above add-to-cart"
E.g., "Hero product: homepage should lead with the product, not a generic brand hero"]

## Collections / Categories
[List of collections the store has]

## Trait-Specific Requirements
[Any trait-driven requirements for specific pages.
E.g., "Subscription trait → 'How It Works' section needed on homepage"
E.g., "Ingredient transparency → ingredient breakdown section on product page"]
```

The handoff brief should be **tight** — aim for 1500–2500 tokens. It's a briefing document, not a copy of the brand brief.

### Phase B: Page Specs (Parallel Sub-Agents)

Spawn sub-agents for page spec writing. Each sub-agent receives:

1. `_handoff-brief.md` (the distilled context — ~1500–2500 tokens)
2. `site-structure.md` (so they know what pages exist and how nav works — ~1000 tokens)
3. The page spec template (from `templates/page-content-spec-template.md` — ~800 tokens)
4. Their specific page assignments
5. Any trait-specific research excerpts that are particularly relevant to their assigned pages (not all research — just the parts that matter)

**Total context budget per sub-agent**: ~4000–5500 tokens of input, leaving the vast majority of the context window for producing high-quality output.

**Batching strategy** — group pages by shared context and consistency needs:

- **Batch 1: Homepage** — solo. This is the highest-stakes page. Give it a dedicated sub-agent with full attention.
- **Batch 2: Product + Cart** — the core purchase flow. These pages hand off to each other and need consistency (e.g., if the product page has a "subscribe and save" toggle, the cart must handle subscription items).
- **Batch 3: Collection + Search + List-Collections** — all browsing/discovery pages. They share product card patterns and filtering conventions.
- **Batch 4: Blog + Article** — content pages, if applicable. They share content formatting conventions.
- **Batch 5: Custom content pages** — About, Contact, FAQ, and any other custom pages. These share a "content page" pattern.
- **Batch 6: 404 + Password + Gift Card** — utility pages. Low complexity, can share a sub-agent.

**Run all batches in parallel.** For a typical store with 10–15 pages, this means 4–6 sub-agents running simultaneously.

### Phase C: Consistency Review

After all page spec sub-agents return, the specs need a consistency pass. Sub-agents can't coordinate with each other — they may use different names for the same section, slightly different voice, or inconsistent setting names.

**The reviewing agent reads all page specs and checks:**

- Section naming consistency — if homepage calls it "Customer Reviews" and product page calls it "Testimonials" for the same component type, pick one and align
- Voice consistency — all draft copy should sound like the same brand
- Setting naming consistency — configurable settings should use the same naming conventions across pages
- Cross-page references — does the homepage CTA point to a collection that exists in the collection spec? Do breadcrumbs make sense?
- Shared component consistency — is the header described the same way everywhere? Footer?
- Section type consistency — the same kind of section should map to the same Shopify section type across pages

**Context management for the review**: If the main agent's context is getting heavy from Phase A, spawn a **fresh sub-agent** for the review. It receives:

- `_handoff-brief.md` (for voice/brand reference)
- All page spec files from `OUTPUT_DIR/pages/`
- Instructions to produce a consistency report and corrected files

If the main agent still has comfortable context headroom, it can do the review itself.

### Phase D: Consolidation & Gap Analysis

Steps 5 and 6 require reading all page specs plus the Horizon theme files. Same context management rule applies — if the main agent has headroom, do it directly. If not, spawn a fresh sub-agent.

The consolidation agent receives:

- `_handoff-brief.md`
- `site-structure.md`
- All page specs from `OUTPUT_DIR/pages/`
- Access to `THEME_ROOT/` for reading section schemas and templates

It produces `site-content-map.md` and `gap-analysis.md`.

### Context Pressure Decision Points

At two points, the main agent should assess whether to continue or hand off to a fresh agent:

**Decision Point 1: After Phase A (before Phase B)**

The main agent has consumed the full brand brief, trait analysis, research findings, and site structure. Estimate remaining context capacity:

- If **plenty of headroom** (brand brief was short, few traits researched): main agent can run Phase C and D after sub-agents return.
- If **context is moderate**: main agent creates the handoff brief and delegates Phase C to a fresh sub-agent, then does Phase D itself.
- If **context is heavy** (long brand brief, many traits, complex research): main agent creates the handoff brief and delegates both Phase C and Phase D to fresh sub-agents.

**Decision Point 2: After Phase C (before Phase D)**

If the main agent handled Phase C, assess again before Phase D. Phase D requires reading all page specs plus the theme's section files — this can be substantial.

### Sub-Agent Prompt Template

When spawning a page spec sub-agent, use this prompt structure:

```
You are writing page content specifications for a Shopify store.

## Your Assignment
Write detailed page specs for: [Page 1], [Page 2]

## Brand Context
[Paste contents of _handoff-brief.md]

## Site Structure
[Paste contents of site-structure.md]

## Page Spec Format
[Paste the page spec template or a condensed version of the format requirements]

## Trait-Specific Notes for Your Pages
[Any research findings specifically relevant to these pages]

## Instructions
- Write each page spec as a separate markdown document
- Follow the format exactly
- Write draft copy in the brand's voice (see example sentences in brand context)
- Include section-by-section breakdown with all required fields
- Use {{liquid.variables}} for dynamic Shopify data
- Use [MERCHANT: instructions] for content the merchant must provide
- Document configurable settings for each section
- Include responsive behavior notes
- Output each spec as a complete markdown document
```

---

## Workflow Steps

The workflow consists of **6 sequential steps** (executed across the four phases above):

1. **[Analyze Brand Traits](#step-1-analyze-brand-traits)** — Identify the unique characteristics that shape this store
2. **[Research Best Practices](#step-2-research-best-practices)** — Find CRO/UX patterns for each relevant trait
3. **[Plan Site Structure](#step-3-plan-site-structure)** — Decide what pages and templates the store needs
4. **[Create Page Content Specs](#step-4-create-page-content-specs)** — Document each page with sections and draft copy
5. **[Create Site Content Map](#step-5-create-site-content-map)** — Consolidate into a single overview
6. **[Gap Analysis](#step-6-gap-analysis)** — Compare against Horizon theme defaults and verify page completeness

---

## Step 1: Analyze Brand Traits

**Objective**: Break apart the brand into its unique characteristics — the specific traits that influence how the store should be structured, what CRO patterns apply, and what UX conventions matter. Do NOT force the brand into a predefined category.

### How This Works

Every brand is a unique combination of traits. A subscription-based fashion brand with a single hero product line is different from a multi-SKU outdoor gear store with a blog-driven content strategy. Rather than picking a box, identify the individual traits and research each one that might need a specialized approach.

### Trait Identification Process

Read the brand brief and extract traits across these dimensions:

**Catalog shape:**
- How many products? (single hero product, small curated line, medium catalog, large catalog)
- Are there product variants? (sizes, colors, flavors, etc.)
- Are there bundles or kits?
- Is there a clear "hero" product that drives most revenue?

**Purchase model:**
- One-time purchase only?
- Subscription / subscribe-and-save?
- Membership or recurring access?
- High-consideration purchase (expensive, researched) or impulse/low-friction?

**Product type:**
- Physical goods, digital goods, services, or a mix?
- Consumable (replenished regularly) or durable?
- Fashion/apparel (size/fit complexity)?
- Food/ingestible (ingredient transparency, dietary info)?
- Technical/complex (specs, comparisons, education needed)?

**Brand positioning:**
- Premium/luxury, mid-market, value/affordable, artisan/craft?
- Clinical/scientific, lifestyle/aspirational, playful/fun, minimalist?
- Sustainability-focused, heritage/tradition, innovation/tech-forward?

**Audience:**
- Gift buyers vs. self-purchasers?
- Age/demographic skew?
- Mobile-dominant audience?
- First-time customers vs. repeat/loyal customers — which matters more?

**Content strategy:**
- Blog/editorial content?
- Lookbook/visual merchandising?
- Educational/how-to content?
- User-generated content / community?
- Social media integration?

**Conversion model:**
- What's the primary conversion goal? (direct purchase, subscription signup, lead capture, quiz completion, etc.)
- What's the typical path to purchase? (browse → compare → buy, or land → convince → buy?)
- What objections need to be overcome?

### Check Existing Skills

Before researching, check `docs/workflows/skills/store-traits/` for any existing micro-skills that match the identified traits. Existing skills can be used directly and don't need re-researching (though they can be updated if new findings emerge).

For example, if the brand has a subscription model and a skill already exists at `docs/workflows/skills/store-traits/subscription-model/SKILL.md`, use those documented patterns as a starting point.

### Trait Analysis Output

Write to `OUTPUT_DIR/brand-analysis.md`:

```markdown
# Brand Trait Analysis

## Brand: [Brand Name]

## Identified Traits
[List each trait with a brief description of how it manifests in this brand]

1. **[Trait name]** — [How it applies. E.g., "Subscription model — subscribe-and-save for monthly coffee delivery alongside one-time bag purchases"]
2. **[Trait name]** — [How it applies]
3. **[Trait name]** — [How it applies]
...

## Traits Requiring Specialized UX/CRO Research
[Not every trait needs research. A brand that sells physical goods one-time doesn't need "one-time purchase" research — that's the default. Flag only traits that diverge from a standard ecommerce store and may need unique approaches.]

1. **[Trait]** — [Why this needs research. E.g., "Subscription model — subscription flows, plan selection UX, and retention copy are specialized and differ from standard ecommerce"]
2. **[Trait]** — [Why this needs research]
...

## Traits with Existing Skills (no research needed)
[List any traits that already have documented skills, with the skill path]

## Competitor / Aspirational Stores
[List 3–5 stores that share key traits with this brand — these will be studied during research]

## CRO Priority Stack
[Ordered list of what matters most for conversion, considering the full trait combination]
1. [Most important conversion factor]
2. [Second most important]
3. [Third]
4. [Fourth]
5. [Fifth]
```

---

## Step 2: Research Best Practices

**Objective**: For each trait flagged as needing research in Step 1, find current CRO, UX, and content best practices. Also study competitor/aspirational stores to identify patterns. This research informs all page structure and content decisions.

### Research Process

For each trait that needs research:

1. **Search for best practices** specific to that trait (e.g., "subscription ecommerce UX best practices", "single product shopify store homepage structure", "fashion ecommerce lookbook page design")
2. **Study competitor stores** identified in Step 1 — look at their page structure, section ordering, content hierarchy, and conversion tactics
3. **Identify patterns** that appear across multiple sources — these are the proven approaches
4. **Note anything unique** to the specific trait combination this brand has

### What to Research Per Trait

For each trait, focus on how it affects:

- **Homepage structure** — Does this trait change what sections belong on the homepage and in what order?
- **Product page structure** — Does it change what information or elements the product page needs?
- **Collection/browsing experience** — Does it affect filtering, sorting, product cards, or navigation?
- **Cart and checkout flow** — Does it affect cart contents, upsells, or pre-checkout steps?
- **Additional pages needed** — Does this trait demand pages that a standard store wouldn't have? (e.g., "How It Works" for subscriptions, "Size Guide" for apparel, "Ingredients" for consumables)
- **Navigation patterns** — Does it change how nav should be structured?
- **Trust signals and social proof** — What specific trust elements matter for this trait?
- **Mobile experience** — Any mobile-specific implications?

### Research Output

Write findings to `OUTPUT_DIR/research-findings.md`:

```markdown
# CRO & UX Research Findings

## Brand: [Brand Name]
## Research Date: [Date]

## Trait: [Trait Name]
### Key Findings
[What the research revealed about how this trait should influence store design]

### Homepage Implications
[How this trait affects homepage structure — specific sections, ordering, content]

### Product Page Implications
[How this trait affects product pages]

### Collection Page Implications
[How this trait affects collection/browsing]

### Additional Pages Needed
[Any pages this trait demands]

### CRO Patterns
[Specific conversion tactics that work for stores with this trait]

### Sources
[URLs consulted]

---

## Trait: [Next Trait Name]
[Repeat structure above]

---

## Competitor Store Analysis

### [Store Name] ([URL])
**Relevant traits shared**: [Which traits this store shares with the brand]
**Homepage structure**: [Section-by-section breakdown of what they do]
**Product page structure**: [Key elements and ordering]
**Notable patterns**: [Anything interesting or effective]

### [Next Store]
[Repeat]

---

## Combined Takeaways
[How all the trait-specific findings combine for THIS brand. What are the 5–10 most important structural decisions?]
```

### Micro-Skill Documentation

After completing research for each trait, create or update a reusable micro-skill capturing the key patterns. These are small, focused skill documents — one per trait — stored at `docs/workflows/skills/store-traits/[trait-slug]/SKILL.md`.

**Only create a skill if the research revealed patterns that are distinct enough to be reusable.** Not every trait warrants its own skill. If the research shows that a trait doesn't meaningfully change store structure from the default, note that and move on.

Each micro-skill should be structured so a future agent encountering the same trait can use the documented patterns directly:

```markdown
# Store Trait Skill: [Trait Name]

## What This Trait Is
[Brief description — e.g., "Subscription model where customers can subscribe for recurring delivery alongside one-time purchases"]

## When This Applies
[What brand characteristics indicate this trait is relevant]

## Structural Impact

### Homepage
[How this trait affects homepage sections and ordering]

### Product Page
[How this trait affects product page elements]

### Collection Pages
[Impact on browsing experience, if any]

### Cart / Pre-Checkout
[Impact on cart experience, if any]

### Additional Pages
[Pages this trait typically demands, with purpose]

### Navigation
[Impact on navigation structure, if any]

## CRO Patterns
[Specific conversion tactics that work]

## Trust Signals
[What builds confidence for this trait]

## Common Mistakes
[What to avoid — patterns that seem logical but don't convert well]

## Sources
[URLs and stores studied]

## Last Updated
[Date]
```

---

## Step 3: Plan Site Structure

**Objective**: Using the brand brief and research findings, determine exactly which pages and templates the store needs.

### Standard Shopify Template Types

Every Shopify store has these built-in template types available:

| Template | Purpose | Filename |
|----------|---------|----------|
| **index** | Homepage | `templates/index.json` |
| **product** | Individual product page | `templates/product.json` |
| **collection** | Collection/category listing | `templates/collection.json` |
| **cart** | Shopping cart | `templates/cart.json` |
| **blog** | Blog listing | `templates/blog.json` |
| **article** | Individual blog post | `templates/article.json` |
| **page** | Generic content pages | `templates/page.json` |
| **search** | Search results | `templates/search.json` |
| **404** | Page not found | `templates/404.json` |
| **password** | Pre-launch / password protection | `templates/password.json` |
| **list-collections** | All collections page | `templates/list-collections.json` |
| **gift_card** | Gift card redemption | `templates/gift_card.json` |

Custom page templates use the pattern `templates/page.[name].json` (e.g., `page.about.json`, `page.contact.json`, `page.faq.json`).

### Structure Planning Process

Work through these decisions based on the brand brief and research:

**1. Core commerce pages (always needed):**

- Homepage (`index`)
- Product page (`product`) — Will there be alternate product templates? (e.g., `product.bundle.json` for bundles)
- Collection page (`collection`) — Will there be alternate collection templates?
- Cart page (`cart`)
- Search results (`search`)
- 404 error page (`404`)
- Password page (`password`)

**2. Content pages (determined by brand needs):**

Review the brand brief and research findings. Common custom pages include:

- About / Our Story (`page.about`)
- Contact (`page.contact`)
- FAQ (`page.faq`)
- Shipping & Returns (`page.shipping-returns` or generic `page`)
- Terms of Service / Privacy Policy (generic `page`)
- Size Guide (`page.size-guide`) — fashion stores
- Ingredients / How It's Made (`page.ingredients`) — consumable/wellness stores
- How It Works (`page.how-it-works`) — subscription stores
- Sustainability / Our Process (`page.sustainability`) — if brand values emphasize this
- Reviews / Testimonials (`page.reviews`) — if social proof is a key strategy
- Press / As Seen In (`page.press`) — if the brand has press coverage
- Wholesale / B2B (`page.wholesale`) — if applicable
- Gift Guide (`page.gift-guide`) — seasonal/gift stores
- Lookbook (`page.lookbook`) — fashion stores

**3. Blog/editorial (if applicable):**

- Blog listing (`blog`)
- Blog article (`article`)
- Consider whether alternate article templates are needed (e.g., `article.recipe.json` for food brands)

**4. Collection architecture:**

- List what collections the store will have
- Determine if a "list all collections" page is needed (`list-collections`)
- Plan any collection-specific landing pages

### Structure Output

Write to `OUTPUT_DIR/site-structure.md`:

```markdown
# Site Structure Plan

## Brand: [Brand Name]
## Store Type: [Classification]

## Pages & Templates

### Core Commerce
| Page | Template | Alternate Templates | Notes |
|------|----------|-------------------|-------|
| Homepage | index | — | [Notes] |
| Product | product | [Any alternates] | [Notes] |
| Collection | collection | [Any alternates] | [Notes] |
| Cart | cart | — | [Notes] |
| Search | search | — | [Notes] |
| 404 | 404 | — | [Notes] |
| Password | password | — | [Notes] |

### Content Pages
| Page | Template | Purpose | Priority |
|------|----------|---------|----------|
| [Page name] | page.[name] | [Purpose] | [High/Medium/Low] |

### Blog / Editorial
| Page | Template | Purpose |
|------|----------|---------|
| [If applicable] | blog / article | [Purpose] |

### Collections Architecture
| Collection | Handle | Purpose |
|-----------|--------|---------|
| [Collection name] | [handle] | [What it contains] |

## Navigation Plan

### Primary Navigation
[Ordered list of top-level nav items with any dropdowns/sub-items]

### Footer Navigation
[Footer link groups]

### Mobile Navigation
[Any differences from desktop]

## Shared Components
[List of components that appear on multiple/all pages: header, footer, announcement bar, newsletter popup, etc.]
```

---

## Step 4: Create Page Content Specs

**Objective**: For every page identified in Step 3, create a detailed content specification with section-by-section structure and draft copy.

### What Goes in a Page Spec

Each page spec documents:

1. **Page purpose and user intent** — Why does this page exist? What should the visitor do here?
2. **Section-by-section breakdown** — Every section from top to bottom, in order
3. **Draft copy for each section** — Actual placeholder headlines, body text, button labels, and microcopy written in the brand's voice
4. **Shopify component mapping** — What Shopify section type each part maps to
5. **Content sources** — What's hardcoded vs. dynamic (product data, collection data, metafields, etc.)
6. **Configurable settings** — What the merchant should be able to change via the Shopify admin
7. **Responsive behavior** — How the layout changes across breakpoints

### Draft Copy Guidelines

The draft copy in page specs should be:

- Written in the brand's voice and tone (derived from the brand brief)
- Realistic enough to guide implementation (not "Lorem ipsum")
- Clearly marked as draft (the merchant will finalize)
- Focused on conversion — headlines should sell, CTAs should be specific, microcopy should reduce friction
- Informed by CRO research from Step 2

Use this convention in draft copy:

- `{{product.title}}` — Shopify dynamic data (will be filled by Shopify)
- `{{collection.title}}` — Shopify dynamic data
- `[MERCHANT: ...]` — Content the merchant needs to provide (e.g., `[MERCHANT: Insert brand story here]`)
- Plain text — Draft copy that can be used as-is or refined

### Page Spec Template

Use the template at `templates/page-content-spec-template.md` as a starting point, but the most important elements are:

```markdown
# [Page Name] — Content Specification

## Page Metadata
- **Template**: [Shopify template type]
- **URL**: [URL pattern]
- **Purpose**: [What this page does]
- **Primary user action**: [What we want the visitor to do]
- **Brand trait context**: [Which brand traits influence this page's structure]

## Sections (Top to Bottom)

### Section 1: [Section Name]
**Shopify section type**: [e.g., "announcement-bar", "hero", "rich-text", "featured-collection", custom section name]
**Purpose**: [What this section accomplishes]

**Draft Content**:
- Headline: "[Draft headline text]"
- Subheadline: "[Draft subheadline]"
- Body: "[Draft body copy, 2–3 sentences]"
- CTA: "[Button text]" → [Link destination]
- Supporting elements: [badges, icons, trust signals, etc.]

**Content Sources**:
- [Which content is static vs. dynamic]
- [What comes from Shopify data vs. theme settings]

**Configurable Settings**:
- [What the merchant can edit in the theme editor]

**Responsive Notes**:
- Desktop: [Layout description]
- Mobile: [Layout changes]

### Section 2: [Section Name]
[... repeat for every section ...]

## Page-Level Notes
- [Any cross-section considerations]
- [SEO notes for this page]
- [Accessibility considerations]
```

### Sub-Agent Strategy

Page specs are written by parallel sub-agents as defined in the **Agent Execution Architecture** section above (Phase B). See that section for the full details on batching, context management, and sub-agent prompt templates.

**Key points:**

- Each sub-agent receives the **handoff brief** (not the full brand brief) plus the site structure and page spec template
- The homepage gets its own dedicated sub-agent for maximum quality
- Pages are batched by shared context (purchase flow together, browsing pages together, content pages together)
- All batches run in parallel
- After all sub-agents return, Phase C runs a consistency review across all specs

### Pages to Specify

At minimum, create specs for every page listed in the site structure (Step 3). The following pages almost always need specs:

**Always required:**

1. **Homepage** (`pages/index.md`) — The most important page. Structure varies significantly by store type.
2. **Product Page** (`pages/product.md`) — Where purchases happen. Include every element that supports conversion.
3. **Collection Page** (`pages/collection.md`) — How customers browse and filter products.
4. **Cart Page** (`pages/cart.md`) — The final step before checkout. Focus on reducing abandonment.
5. **Search Results** (`pages/search.md`) — How search results display. Include zero-results handling.
6. **404 Error Page** (`pages/404.md`) — Recovery page. Should guide visitors back to useful pages.
7. **Password Page** (`pages/password.md`) — Pre-launch page with email capture.

**Usually required (based on brand brief):**

8. **About / Our Story** (`pages/page-about.md`)
9. **Contact** (`pages/page-contact.md`)
10. **FAQ** (`pages/page-faq.md`)

**Store-type specific (per research findings):**

11–N. Whatever additional pages the research and brand brief indicate.

### Output from this Step

A directory of page-specific documents:

```
OUTPUT_DIR/pages/
├── index.md
├── product.md
├── collection.md
├── cart.md
├── search.md
├── 404.md
├── password.md
├── page-about.md          (if applicable)
├── page-contact.md        (if applicable)
├── page-faq.md            (if applicable)
├── blog.md                (if applicable)
├── article.md             (if applicable)
└── [additional pages]
```

---

## Step 5: Create Site Content Map

**Objective**: Consolidate all page specifications into a single site-wide content map showing the complete picture.

### Site Content Map Structure

Create `OUTPUT_DIR/site-content-map.md` using the template at `templates/site-content-map-template.md`. The map should include:

**1. Page inventory** — Every page with its template type, URL, purpose, and link to its spec doc.

**2. Shared components registry** — Components that appear on multiple pages:

- Header (structure, nav items, configurable settings)
- Footer (structure, link columns, newsletter, social)
- Announcement bar (if used)
- Newsletter popup (if used)
- Any other cross-page components

**3. Section reuse matrix** — A table showing which sections appear on which pages. This identifies reusable vs. page-specific sections and directly informs Workflow 2's component build order.

**4. Navigation architecture** — Complete nav structure (primary, footer, mobile) with all links and hierarchy.

**5. Theme settings requirements** — Global settings the theme needs:

- Color settings (primary, secondary, accent, background, text)
- Typography settings (heading font, body font, sizes)
- Layout settings (container width, section padding)
- Behavior settings (sticky header, animations, etc.)

**6. Content statistics** — Totals: page count, section count, unique section types, shared components, interactive elements.

### Output from this Step

A single consolidated document: `OUTPUT_DIR/site-content-map.md`

---

## Step 6: Gap Analysis

**Objective**: Compare the planned content against what the Horizon theme already provides, verify that all required Shopify pages are covered, and identify what exists, what needs modification, and what needs to be built from scratch.

### Gap Analysis Process

**A. Verify page completeness**

Before comparing against the theme, first verify that the site structure covers all required Shopify pages. Every Shopify store needs certain pages to function properly. Cross-check the site structure (Step 3) against this mandatory list:

**Pages every Shopify store must have:**

| Page | Template | Why It's Required |
|------|----------|-------------------|
| Homepage | `index` | Store entry point |
| Product page | `product` | Required to display any product |
| Collection page | `collection` | Required to display any collection |
| Cart page | `cart` | Required for the shopping flow |
| Search results | `search` | Shopify routes `/search` here automatically |
| 404 error page | `404` | Shopify routes missing URLs here automatically |
| Password page | `password` | Required for store password protection / pre-launch |
| Gift card page | `gift_card` | Required if the store sells gift cards (Shopify auto-generates this) |

**Pages most stores should have (verify against brand brief):**

| Page | Template | When It's Needed |
|------|----------|-----------------|
| Blog listing | `blog` | If the store has any blog content |
| Blog article | `article` | If the store has any blog content |
| List collections | `list-collections` | If customers need to browse all collections |
| About page | `page.about` | Most brands need this — verify with brief |
| Contact page | `page.contact` | Most stores need a contact option |
| FAQ | `page.faq` | Reduces support load, builds trust |
| Shipping & Returns | `page` or `page.shipping-returns` | Required for customer confidence |
| Terms of Service | `page` | Legal requirement in most jurisdictions |
| Privacy Policy | `page` | Legal requirement (GDPR, CCPA, etc.) |

**If any mandatory page is missing from the site structure, add it now.** If any "most stores should have" page is missing, flag it as a question for the user with a recommendation.

**B. Inventory the Horizon theme**

1. List all section files in `THEME_ROOT/sections/`
2. For each section, read its `{% schema %}` to understand what it does, what settings it has, and what blocks it supports
3. List all snippet files in `THEME_ROOT/snippets/`
4. Review `THEME_ROOT/config/settings_schema.json` for existing theme settings
5. Review existing templates in `THEME_ROOT/templates/`

**C. Compare against the site content map**

For each section identified in the page specs:

- **Exists and usable as-is**: The Horizon theme has a section that does exactly what's needed
- **Exists but needs modification**: A section exists but needs additional settings, blocks, or layout options
- **Needs creation**: No equivalent exists — a new custom section must be built
- **Horizon-native is better**: The Horizon theme's built-in approach is superior to what was planned (e.g., Horizon's product page uses native Shopify features that shouldn't be replaced)

For each template:

- Does the template exist? Does it need to be created?
- Can the default template be used, or does a custom variant need to be created?

For each theme setting:

- Does it already exist in `settings_schema.json`?
- Does it need to be added?

**D. Create the gap analysis document**

Write to `OUTPUT_DIR/gap-analysis.md`:

```markdown
# Gap Analysis: Planned Content vs. Horizon Theme

## Page Completeness Check

### Mandatory Shopify Pages
| Page | Template | In Site Structure? | Has Spec? | Notes |
|------|----------|--------------------|-----------|-------|
| Homepage | index | [Yes/No] | [Yes/No] | |
| Product | product | [Yes/No] | [Yes/No] | |
| Collection | collection | [Yes/No] | [Yes/No] | |
| Cart | cart | [Yes/No] | [Yes/No] | |
| Search | search | [Yes/No] | [Yes/No] | |
| 404 | 404 | [Yes/No] | [Yes/No] | |
| Password | password | [Yes/No] | [Yes/No] | |
| Gift Card | gift_card | [Yes/No] | [Yes/No] | |

### Recommended Pages (Review with User)
| Page | Template | In Site Structure? | Recommendation |
|------|----------|--------------------|---------------|
| Blog | blog | [Yes/No] | [Recommend adding / Not needed because...] |
| Article | article | [Yes/No] | [Recommend adding / Not needed because...] |
| List Collections | list-collections | [Yes/No] | [Recommend adding / Not needed because...] |
| About | page.about | [Yes/No] | [Recommendation] |
| Contact | page.contact | [Yes/No] | [Recommendation] |
| FAQ | page.faq | [Yes/No] | [Recommendation] |
| Shipping & Returns | page | [Yes/No] | [Recommendation] |
| Terms of Service | page | [Yes/No] | [Recommendation] |
| Privacy Policy | page | [Yes/No] | [Recommendation] |

### Pages Added During Gap Analysis
[List any pages that were missing and have been added, with rationale]

## Sections Summary
- Total sections planned: [X]
- Already in Horizon (usable as-is): [X]
- In Horizon (needs modification): [X]
- Needs creation: [X]

## Sections Status

### Usable As-Is
| Planned Section | Horizon Section File | Notes |
|----------------|---------------------|-------|
| [Section name] | [sections/file.liquid] | [Notes] |

### Needs Modification
| Planned Section | Horizon Section File | What Needs Changing |
|----------------|---------------------|-------------------|
| [Section name] | [sections/file.liquid] | [Specific changes needed] |

### Needs Creation
| Planned Section | Complexity | Used On | Priority |
|----------------|-----------|---------|----------|
| [Section name] | [Low/Medium/High] | [Pages] | [High/Medium/Low] |

## Templates Status
| Planned Template | Exists? | Action Needed |
|-----------------|---------|---------------|
| [template name] | [Yes/No] | [None / Create / Modify] |

## Theme Settings Status

### Already Configured
| Setting | Current State |
|---------|--------------|
| [Setting] | [Current value/state] |

### Needs Addition
| Setting | Type | Suggested Default |
|---------|------|------------------|
| [Setting] | [Type] | [Default] |

## Implementation Recommendations

### Build Order
[Recommended order for building new sections, based on dependencies and page priority]

### Reuse Opportunities
[Sections or snippets that can serve multiple pages]

### Horizon-Native Preferences
[Cases where Horizon's built-in approach should be preserved rather than replaced]
```

### Output from this Step

`OUTPUT_DIR/gap-analysis.md`

---

## Complete Deliverables

Upon completion of Workflow 1, the following documents exist in `OUTPUT_DIR`:

```
OUTPUT_DIR/
├── brand-analysis.md                 (Brand traits and CRO priorities)
├── research-findings.md              (CRO/UX best practices per trait)
├── site-structure.md                 (All pages, templates, navigation)
├── _handoff-brief.md                 (Distilled context used by sub-agents — useful for Workflow 2)
├── site-content-map.md               (Consolidated overview with reuse matrix)
├── gap-analysis.md                   (What exists vs. what needs building + page completeness)
├── pages/
│   ├── index.md                     (Homepage spec with draft copy)
│   ├── product.md                   (Product page spec)
│   ├── collection.md               (Collection page spec)
│   ├── cart.md                      (Cart page spec)
│   ├── search.md                    (Search results spec)
│   ├── 404.md                       (Error page spec)
│   ├── password.md                  (Password page spec)
│   └── [custom pages].md           (Additional page specs)
└── _metadata.json                    (Machine-readable summary)
```

Additionally, reusable micro-skills are created or updated for each researched trait at:

```
docs/workflows/skills/store-traits/[trait-slug]/SKILL.md
```

### Quality Checklist

Before marking the workflow complete, verify:

- [ ] Brand traits are identified and documented with clear rationale
- [ ] Research findings cover each trait that needs specialized approaches
- [ ] Competitor/aspirational stores are analyzed
- [ ] Site structure includes all pages identified in the brand brief
- [ ] All mandatory Shopify pages are accounted for (index, product, collection, cart, search, 404, password, gift_card)
- [ ] Recommended pages (about, contact, FAQ, legal) are either included or explicitly noted as not needed
- [ ] Every page in the site structure has a corresponding spec document
- [ ] Every page spec includes section-by-section breakdown with draft copy
- [ ] Draft copy is written in the brand's voice (not generic placeholder text)
- [ ] All sections specify their Shopify section type mapping
- [ ] Configurable settings are documented for each section
- [ ] Responsive behavior notes exist for key sections
- [ ] Site content map accurately reflects all pages and sections
- [ ] Section reuse matrix is complete
- [ ] Gap analysis correctly inventories the Horizon theme
- [ ] Gap analysis includes page completeness check
- [ ] Gap analysis identifies sections needing creation with complexity estimates
- [ ] Navigation structure is fully documented
- [ ] Micro-skills created for any researched traits with distinct patterns
- [ ] No reference to any design template appears in any deliverable

---

## Execution Checklist

### Pre-Execution
- [ ] Obtained and validated brand brief (all required fields present — see validation list in Required Inputs)
- [ ] Obtained `THEME_ROOT` path and validated theme structure
- [ ] Created `OUTPUT_DIR`
- [ ] Read and understood this entire ENTRY.md (including Agent Execution Architecture)

### Phase A: Analysis & Planning (Main Agent)

**Step 1: Analyze Brand Traits**
- [ ] Extracted traits across all dimensions (catalog, purchase model, product type, positioning, audience, content, conversion)
- [ ] Checked existing skills in `docs/workflows/skills/store-traits/`
- [ ] Identified which traits need specialized research
- [ ] Identified 3–5 competitor/aspirational stores
- [ ] Documented CRO priority stack
- [ ] Written `brand-analysis.md`

**Step 2: Research Best Practices**
- [ ] Spawned research sub-agents for each trait (in parallel)
- [ ] Synthesized all sub-agent findings
- [ ] Studied competitor/aspirational stores
- [ ] Documented findings per trait
- [ ] Written `research-findings.md`
- [ ] Created micro-skills for traits with distinct patterns

**Step 3: Plan Site Structure**
- [ ] Listed all core commerce pages needed
- [ ] Identified custom content pages from brand brief
- [ ] Determined blog/editorial needs
- [ ] Planned collection architecture
- [ ] Planned navigation structure
- [ ] Written `site-structure.md`

**Handoff Brief**
- [ ] Created `_handoff-brief.md` (distilled context for sub-agents, ~1500–2500 tokens)
- [ ] Assessed context pressure — decided whether to continue or delegate Phase C/D

### Phase B: Page Specs (Parallel Sub-Agents)

**Step 4: Create Page Specs**
- [ ] Spawned page spec sub-agents with handoff brief + site structure + template
- [ ] Batch 1: Homepage spec complete
- [ ] Batch 2: Product + Cart specs complete
- [ ] Batch 3: Collection + Search + List-Collections specs complete
- [ ] Batch 4: Blog + Article specs complete (if applicable)
- [ ] Batch 5: Custom content page specs complete
- [ ] Batch 6: 404 + Password + Gift Card specs complete
- [ ] All specs written to `OUTPUT_DIR/pages/`

### Phase C: Consistency Review

- [ ] Read all page specs
- [ ] Checked section naming consistency across all pages
- [ ] Checked voice/tone consistency across all draft copy
- [ ] Checked configurable setting naming consistency
- [ ] Verified cross-page references (links, breadcrumbs, shared components)
- [ ] Applied corrections to any inconsistent specs

### Phase D: Consolidation & Gap Analysis

**Step 5: Create Site Content Map**
- [ ] Consolidated all page specs into site map
- [ ] Documented shared components
- [ ] Created section reuse matrix
- [ ] Documented navigation architecture
- [ ] Documented theme settings requirements
- [ ] Written `site-content-map.md`

**Step 6: Gap Analysis**
- [ ] Verified all mandatory Shopify pages are covered
- [ ] Verified recommended pages are covered or explicitly skipped
- [ ] Added any missing pages discovered during completeness check
- [ ] Inventoried all Horizon theme sections
- [ ] Compared planned sections against Horizon
- [ ] Classified each section (as-is / modify / create)
- [ ] Documented template status
- [ ] Documented theme settings status
- [ ] Written implementation recommendations
- [ ] Written `gap-analysis.md`

### Post-Execution
- [ ] All deliverables created in `OUTPUT_DIR`
- [ ] Quality checklist passed
- [ ] Micro-skills created for researched traits
- [ ] `_handoff-brief.md` retained in `OUTPUT_DIR` (useful reference for Workflow 2)
- [ ] Ready to hand off to Workflow 2

---

## Important Notes

### This Workflow Does NOT Use a Reference Design

The reference design (Lexington, Figma mockup, competitor site, etc.) is not consulted at any point during this workflow. Content and structure decisions are driven by:

1. The brand brief
2. The brand's unique trait combination
3. CRO/UX best practices research for those traits
4. Competitor/aspirational store analysis
5. Shopify platform conventions

The reference design enters the picture only in Workflow 2, where it guides visual styling, not content structure.

### Draft Copy Is Real Copy

The draft copy in page specs should not be Lorem Ipsum. It should be realistic, brand-appropriate content that:

- Demonstrates the intended tone of voice
- Shows the correct content length and density
- Uses actual or plausible product/brand details from the brief
- Includes specific CTA language optimized for conversion
- Can serve as a starting point the merchant refines (not replaces entirely)

### Shopify Architecture Awareness

When planning sections and components, keep in mind:

- Shopify sections are reusable content blocks that merchants can add, remove, and reorder in the theme editor
- Blocks are repeatable sub-components within sections (e.g., individual FAQ items, feature cards, testimonial cards)
- Theme settings apply globally across all pages
- Section settings apply to a single section instance
- Block settings apply to a single block within a section
- Product pages, collection pages, and blog pages have access to Shopify's dynamic data objects
- Custom page templates (`page.[name].json`) allow different section compositions for different content pages

### Ambiguity Handling

If the brand brief is ambiguous on a point:

1. Make a reasonable decision based on the trait research and competitor analysis
2. Document the decision and rationale in the relevant spec
3. Mark it with `[DECISION: ...]` so the user can review
4. Continue without stopping — don't block progress on minor ambiguities

### Reusable Skills Growth

Each time this workflow runs, it should create micro-skills for any brand traits where the research reveals distinct, reusable patterns. Over time, this builds a library of trait-specific skills (e.g., "subscription model", "single-hero-product", "consumable-products", "fashion-sizing") that accelerates future projects. When a future brand shares a trait, the agent can use the existing skill and skip or shorten that portion of the research.

---

## How These Deliverables Feed Workflow 2

Workflow 2 (Design Replication) consumes these outputs as follows:

- **`site-structure.md`** tells Workflow 2 what pages and templates to build
- **`pages/*.md`** specs tell Workflow 2 what sections and content go on each page
- **`site-content-map.md`** tells Workflow 2 which components are reused across pages (build those first)
- **`gap-analysis.md`** tells Workflow 2 which Horizon sections to keep, modify, or replace
- **`brand-analysis.md`** provides context for design decisions when the reference doesn't cover something
- **`research-findings.md`** provides CRO rationale for layout and content ordering decisions

Workflow 2 adds the visual layer: design tokens, typography, color, spacing, and component styling — all driven by the reference design. The content structure from Workflow 1 does not change in Workflow 2 unless a design constraint makes it necessary (documented as a tradeoff).

**Workflow 2 cannot begin until Workflow 1 is complete.**
