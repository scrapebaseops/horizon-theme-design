# Project context: Lexington visual language → Horizon implementation

This document is the **source of truth** for what this project is trying to achieve and **how** agents should work. Read it before large changes.

## How this maps to *this* repository

| Generic name (docs / mental model) | Location in this repo |
|-----------------------------------|------------------------|
| Horizon implementation target     | **`horizon-theme/`** (Shopify theme; only this is edited for the storefront) |
| Lexington reference (read-only)   | **`lexington-reference/`** — add when available; do not treat as code to port |
| Project docs, parity logs, plans  | **`docs/`** (this folder) |

The Horizon theme is synced with Shopify via **`shopify.theme.toml`** from the repo root (see `README.md`).

---

## What this project is trying to achieve

We are trying to take the **visual design language** of a purchased **Lexington theme** and recreate that look inside a **Shopify Horizon theme**.

The important distinction is that we are **not** trying to port the Lexington theme codebase directly into Shopify, and we are **not** trying to transplant its original framework structure. The goal is to make the Horizon theme **look and feel as close as possible to the Lexington reference**, while still being built in a way that is native to Shopify Horizon and practical to maintain.

In plain terms:

- The **Lexington theme** is the visual reference.
- The **Horizon theme** is the actual implementation target.
- The final result should look very close to the Lexington design, but still behave like a proper Horizon / Shopify theme internally.

## The actual problem we are solving

A normal “copy the style” instruction tends to produce a weak result. Models usually copy the obvious things such as colors, fonts, and broad section order, but they miss the details that make a design actually feel the same.

The main failure mode is that the result ends up only **loosely similar**. It may share the same typography family and some of the same colors, but the real visual identity is still off because of differences in:

- container widths
- spacing rhythm
- section padding
- line lengths
- font sizing relationships
- button proportions
- card padding
- border radii
- image crops
- layout density
- header/footer balance
- responsive behavior

This project exists to avoid that. We want **true visual parity**, not just approximate inspiration.

## What “success” looks like

Success is **not** “the Horizon theme uses similar fonts and colors.”

Success means:

- the Horizon implementation matches the Lexington reference very closely at the visual level
- the layout proportions feel the same
- spacing and rhythm feel the same
- components such as buttons, cards, forms, and content blocks feel like they belong to the same system
- the result is reusable, so future sections added to Horizon automatically fit the same design language
- the implementation remains Shopify-native and merchant-editable

The finished theme should feel like:

**“This is that Lexington design, recreated properly inside Horizon.”**

Not:

**“This is a Horizon theme vaguely styled in a similar direction.”**

## Key implementation philosophy

This project must be treated as a **rebuild guided by a reference**, not a direct port.

That means:

- do **not** copy the Lexington theme’s framework structure into Horizon
- do **not** treat the original component architecture as sacred
- do **not** build the final result by scattering one-off CSS hacks everywhere
- do **not** make Horizon visually similar only at a superficial level

Instead:

- study the reference theme carefully
- extract its design tokens and repeated UI patterns
- recreate those patterns inside Horizon using Horizon-native structures
- build a reusable design system inside Horizon
- prove visual fidelity using screenshot comparison loops

## Important architectural principle

Horizon and the Lexington theme are not the same kind of codebase.

The Lexington theme should be treated as a **reference source for design language**, including:

- typography hierarchy
- spacing rhythm
- container logic
- card styling
- button styling
- section composition
- overall visual density
- surface treatment
- image treatment
- layout rules
- interaction feel

The Horizon theme should be treated as the **real product** and should remain:

- Shopify-native
- editable through Shopify’s theme/editor model
- modular
- maintainable
- reusable for future development

So the job is not to make Horizon structurally resemble Lexington.

The job is to make Horizon **visually resemble Lexington** while preserving good Shopify theme architecture.

## What the user actually wants beyond the first page

The user does not just want one matching homepage. The real goal is a **single strict design system** inside the Horizon theme so that when new elements, sections, or components are added later, they already fit the design language automatically.

That means this is not merely a page recreation project. It is a **design-system extraction and reconstruction project**.

The final Horizon theme should contain:

- a stable token layer
- reusable component primitives
- reusable section patterns
- consistent container and spacing rules
- a design language that can be applied to future custom sections without starting from zero

The user specifically wants to avoid a workflow where every future element requires hand-made custom CSS from scratch.

## Development environment and workflow context

The user is working with:

- a Shopify **development store**
- a local copy of a **Horizon theme** (`horizon-theme/`)
- a local copy of a purchased **Lexington reference theme** (`lexington-reference/` when present)
- agent-assisted coding tools such as **Claude Code** and **Cursor**

The expected working setup is:

- the Horizon theme is pulled locally from the Shopify dev store
- the Lexington theme sits in a separate reference directory
- the agent reads both
- the agent edits only the Horizon codebase
- the reference codebase remains read-only unless the user explicitly says otherwise

## The most important strategic insight

A direct “make Horizon look like Lexington” prompt is too weak.

The better approach is to create:

1. a **benchmark page** in the reference theme
2. a **matching benchmark page** in the Horizon theme
3. a repeated **screenshot comparison loop** where the Horizon page is iteratively adjusted until it closely matches the reference page

This is critical because otherwise the implementation drifts into something that is merely “in the same style family.”

The benchmark page is used to prove the visual system before rolling it out broadly.

## Why benchmark pages are necessary

The benchmark page exists to isolate the core design language and force the agent to match it properly before working on the whole site.

The benchmark pages should contain matching representative components such as:

- header
- hero
- text content section
- buttons
- feature cards
- image + text section
- product/collection-style cards
- testimonial card
- form fields
- FAQ / accordion
- footer

The same content structure should be used in both benchmark pages so that the visual comparison is fair.

This turns the problem from:

**“interpret this aesthetic”**

into:

**“match this visual result.”**

That is a much better problem for an agent.

## Why screenshot loops are essential

Without screenshot loops, an agent tends to overestimate success.

It may think the job is done once it has approximated the fonts, colors, and general layout. But the real look of a theme lives in finer visual relationships.

The screenshot loop is meant to catch that.

The loop works like this:

1. Render the reference benchmark page.
2. Render the Horizon benchmark page.
3. Capture screenshots at the same viewport.
4. Compare them carefully.
5. Identify the highest-impact mismatch.
6. Edit only Horizon.
7. Repeat.

The comparison should focus on the biggest visible differences first, especially:

- container width
- section spacing
- typography scale
- line-height
- button proportions
- card spacing
- image framing
- border radii
- shadow weight
- layout density

Only once the benchmark page is strongly matched should the system be rolled out into reusable tokens, primitives, and sections.

## The required implementation order

The agent should not jump straight into broad theme edits.

The correct order is:

### 1. Audit and mapping

Study both codebases and write down what the design system in the reference theme actually is.

### 2. Benchmark setup

Create matching benchmark pages in the reference theme and Horizon theme.

### 3. Screenshot parity loop

Use repeated screenshot-driven refinement until the Horizon benchmark page closely matches the reference benchmark page.

### 4. Token system

Translate the proven visual language into reusable Horizon tokens such as:

- typography
- spacing
- color roles
- radii
- shadows
- containers

### 5. Shared primitives

Create reusable Horizon-native primitives such as:

- buttons
- cards
- badges
- form fields
- wrappers
- text treatments
- common surface patterns

### 6. Section rebuild

Rebuild real theme sections using those proven primitives.

### 7. Template assembly and QA

Assemble the actual templates and continue visual QA using screenshots where useful.

This order matters. If the agent skips ahead and starts rebuilding the homepage immediately, the result usually becomes messy, inconsistent, and hard to reuse.

## What the agent must avoid

### Mistake 1: Direct code porting

Do not try to directly transplant framework code or mimic the original file/component structure.

### Mistake 2: Superficial matching

Do not decide the job is done because fonts and colors are similar.

### Mistake 3: One-off CSS hacks

Do not solve every visual problem with random isolated values scattered across the theme.

### Mistake 4: Skipping the benchmark loop

Do not rebuild broad theme sections without first proving parity on a controlled benchmark page.

### Mistake 5: Breaking Shopify-native structure

Do not sacrifice merchant editability and Horizon-friendly architecture just to chase an exact visual trick.

### Mistake 6: Treating the reference as the actual implementation target

The reference is there to teach the design language, not to dictate the internal architecture of the Shopify theme.

## What the agent should optimize for

When making decisions, optimize for this order of priorities:

1. **Visual fidelity to the reference**
2. **Horizon-native / Shopify-native structure**
3. **Reusable design system**
4. **Future maintainability**
5. **Merchant editability**
6. **Low CSS chaos / low one-off styling**

If strict visual parity and ideal architecture ever conflict, the agent should choose the best Horizon-native implementation and document the tradeoff clearly.

## The real deliverable

The final deliverable is not simply “a homepage.”

The real deliverable is:

- a Horizon theme whose visual system closely matches the Lexington reference
- a reusable design framework inside Horizon
- benchmark-based proof that the aesthetic match is real
- a foundation that makes future custom sections easy to build in the same style

So this is a **design recreation + systemization project**, not just a theme tweak.

## Short version for quick orientation

We have a purchased Lexington theme that we want to use as a visual reference. We also have a Horizon Shopify theme that is the real implementation target. The goal is to rebuild the look and feel of the Lexington theme inside Horizon without directly porting the original architecture. We want true visual parity, not loose inspiration. To achieve that, we first audit both codebases, then build matching benchmark pages, then use iterative screenshot loops to refine the Horizon version until it closely matches the reference. Only after that do we extract tokens and primitives into a reusable design system and rebuild broader sections/templates. The final result should be visually close to the Lexington theme, but internally clean, Horizon-native, reusable, maintainable, and merchant-editable.
