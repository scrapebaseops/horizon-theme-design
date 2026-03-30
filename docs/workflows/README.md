# Workflow System: Autonomous Design Replication for Horizon Themes

This directory contains a complete workflow system for autonomously replicating a reference website's design into a Shopify Horizon theme. The system enables an AI agent to take any design reference—whether a running codebase or screenshots—and produce a pixel-perfect Horizon implementation with a full reusable design system.

## Overview

The workflow is divided into two distinct phases, each documented in its own ENTRY.md file. Together, they form a complete design-to-code pipeline:

1. **Content & Page Planning** (Workflow 1) — Maps out what content and components belong on each page
2. **Design Replication & System Build** (Workflow 2) — Builds the design system and replicates the visual design

Both workflows operate on a clean copy of the default Horizon theme. The original theme at `horizon-themes/default/` is never edited; instead, it serves as a template that gets copied to a new variant directory (e.g., `horizon-themes/my-project/`) before any modifications begin.

## Project Context

This system is designed for the **Horizon Shopify theme**, a lightweight, well-structured theme that serves as an ideal canvas for custom design implementations. The workflow transforms any reference design—whether a high-fidelity Figma mockup, a running website, or a codebase like Lexington—into a working Horizon implementation.

Key principles:

- **Generic approach** — Works with any reference design, not tied to a specific brand or theme
- **Local-first** — All work happens on your machine; nothing is automatically pushed to Shopify servers
- **Autonomous** — Designed to run with minimal human intervention once configured
- **Sub-agent aware** — Structured to delegate work across multiple AI agents for complex sections
- **Template-driven** — Uses predefined templates and checklists to ensure consistency
- **Design system focused** — Produces not just code, but a documented, reusable design system

## Workflow 1: Content & Page Planning

**Location:** `workflow-1-content-planning/ENTRY.md`

**Purpose:** Determine the optimal page structure, content hierarchy, and draft copy for a Shopify store — driven entirely by the brand, business type, and conversion best practices.

Workflow 1 answers the question: *What should each page contain and why?* The answer comes from the **brand brief and CRO research**, not from any reference design. The reference design is irrelevant in this workflow — it only enters the picture in Workflow 2 for visual styling.

**What you get:**

- A brand trait analysis identifying the characteristics that shape this store's UX and CRO
- CRO/UX research findings for each trait that needs a specialized approach
- A site structure plan (all pages, templates, navigation)
- Detailed page content specifications with section-by-section structure and draft copy
- A consistency review ensuring naming, voice, and cross-references are aligned
- A site-wide content map showing component reuse and build priorities
- A gap analysis against the Horizon theme (including page completeness verification)
- Reusable micro-skills documenting trait-specific patterns for future projects

**When to use it:**

- When starting a new Shopify store project and need to plan its content
- When you have a brand brief but haven't decided on page structure yet
- When you want content decisions driven by CRO best practices, not a reference design
- Always before Workflow 2, as Workflow 2 depends on these content plans

**Key outputs:**

- `brand-analysis.md` (trait analysis and CRO priorities)
- `research-findings.md` (best practices per trait)
- `site-structure.md` (all pages, templates, navigation)
- `pages/index.md`, `pages/product.md`, `pages/collection.md`, etc. (one per page, with draft copy)
- `consistency-review.md` (cross-spec alignment report)
- `site-content-map.md` (overview with section reuse matrix)
- `gap-analysis.md` (what Horizon has vs. what needs building)
- Templates in `workflow-1-content-planning/templates/` to ensure consistency

## Workflow 2: Design Replication & System Build

**Location:** `workflow-2-design-replication/ENTRY.md`

**Purpose:** Build a complete design system and replicate the visual design across all pages.

Workflow 2 is the main autonomous workflow. It takes the content plans from Workflow 1 plus your reference design, then:

1. Creates temporary 1:1 clone pages of the reference design within the Horizon theme (for direct comparison)
2. Builds a complete design system from the ground up:
   - Design tokens (colors, typography, spacing, etc.)
   - Base styles and CSS architecture
   - Reusable component styles
3. Generates a design system reference page documenting all tokens and components
4. Applies the design system to all actual Shopify pages
5. Runs iterative screenshot comparison loops to achieve pixel-perfect visual parity
6. Validates the result across desktop, tablet, and mobile viewports

**What you get:**

- A fully themed Horizon store matching your reference design
- A documented design system you can reuse and maintain
- CSS organized by architectural layer (tokens → base → components)
- A design system reference page showing every token and component
- Iterative comparison logs showing the refinement process

**When to use it:**

- After completing Workflow 1 (you need the content plans)
- When you have a reference design ready (running site, screenshots, codebase)
- When you want a complete, maintainable design system, not a one-off restyle

**Success criteria:**

- Pixel-perfect visual match to the reference at all breakpoints
- Design system fully documented and applied to all pages
- CSS well-organized following Shopify theme conventions
- All content from Workflow 1 properly implemented

## Directory Structure

```text
workflows/
├── README.md                          # This file — master entry point
│
├── workflow-1-content-planning/
│   ├── ENTRY.md                       # Start here for content planning
│   └── templates/
│       ├── brand-brief-template.md            # Template for the brand brief input
│       ├── page-content-spec-template.md      # Template for single page docs
│       └── site-content-map-template.md       # Template for overview
│
├── workflow-2-design-replication/
│   ├── ENTRY.md                       # Start here for design replication
│   ├── phases/                        # Detailed phase documentation
│   │   ├── phase-1-reference-audit-and-cloning.md
│   │   ├── phase-2-design-system-extraction.md
│   │   ├── phase-3-gap-analysis.md
│   │   ├── phase-4-page-implementation.md
│   │   └── phase-5-qa-refinement.md
│   └── templates/
│       ├── component-inventory-template.md  # Template for component catalog
│       ├── design-tokens-map-template.md    # Template for token documentation
│       └── visual-parity-log-template.md    # Template for comparison tracking
│
└── skills/                             # Reusable sub-skills
    ├── code-architecture/
    │   └── SKILL.md                   # CSS organization, naming, structure
    ├── visual-comparison/
    │   └── SKILL.md                   # Screenshot comparison methodology
    ├── design-system-build/
    │   └── SKILL.md                   # Design system documentation approach
    ├── dev-server-management/
    │   └── SKILL.md                   # Running and managing dev servers
    ├── code-quality/
    │   └── SKILL.md                   # Linting, theme-check, standards
    └── store-traits/                  # CRO/UX patterns by brand trait
        ├── README.md                  # How trait-based skills work
        └── [trait-slug]/              # Created on demand as Workflow 1 encounters traits
            └── SKILL.md              # E.g., subscription-model/, single-hero-product/, etc.
```

## How to Get Started

### Step 1: Set Up Your Theme Copy

Start with the clean default theme at `horizon-themes/default/`. This is your template—never modify it directly.

Create a new variant by copying it:

```bash
cd horizon-themes/
cp -r default my-project/
```

This gives you `horizon-themes/my-project/` with a full, valid Horizon theme structure ready to customize.

If you already have a variant set up (e.g., `horizon-themes/claude/`), you can use that instead.

### Step 2: Gather Your Reference

Identify what you're replicating:

- **Running website:** A local dev server or live site you can screenshot
- **Codebase:** A theme repository you can run locally (like Lexington)
- **Screenshots/Figma:** High-fidelity static images of the design
- **Hybrid:** A combination (screenshots for reference, running server for interaction)

Have the reference accessible during both workflows.

### Step 3: Fill Out the Brand Brief

Fill out `workflow-1-content-planning/templates/brand-brief-template.md` thoroughly. This is the **sole source of context** — there's no live website to fall back on. The template covers brand identity, products, audience, competitors, conversion strategy, messaging, and policies. The more detail you provide, the better the output.

### Step 4: Run Workflow 1 (Content Planning)

Open `workflow-1-content-planning/ENTRY.md` and follow it from start to finish. Provide the agent with:

- The completed **brand brief** from Step 3
- The variant theme folder you created in Step 1

The agent will analyze the brand's unique traits, research CRO best practices for each relevant trait, study competitor stores, and produce detailed page specs with structure and draft copy. No reference design is needed for this step.

### Step 5: Run Workflow 2 (Design Replication)

Open `workflow-2-design-replication/ENTRY.md` and follow it from start to finish. Point the agent at:

- Your reference design
- Your variant theme folder
- The content plan markdown files from Workflow 1

The agent will autonomously build your design system and replicate the visual design. This is the longest phase and will iteratively refine until visual parity is achieved.

### Step 6: Review Locally

Once complete, your variant theme in `horizon-themes/my-project/` is a working Shopify theme. You can:

- Test it locally with `shopify theme dev -e my-project --store-password "reufia"`
- Use it as a base for further customization

> Deploying to Shopify (`theme push`, `git push`) is a human-only decision — agents never push.

## The Sub-Skills

The workflows delegate specific technical tasks to sub-skills. These are documented in the `skills/` directory and are referenced throughout the workflows. You don't need to read them upfront, but they're available if you need detailed technical guidance:

### Code Architecture (`skills/code-architecture/SKILL.md`)

Governs how CSS and Liquid are organized in a Horizon theme:

- Where different types of CSS go (tokens, resets, components, utilities, page-specific)
- Naming conventions for CSS classes and Liquid components
- How sections and blocks are structured in JSON
- Guidelines for keeping code maintainable and theme-check compliant

### Visual Comparison (`skills/visual-comparison/SKILL.md`)

The methodology for comparing screenshots and iteratively refining design:

- How to take targeted screenshots (zoom levels, viewport sizes)
- How to use visual diffs to identify discrepancies
- Decision rules for what constitutes "close enough" vs. needing more work
- How to prioritize refinements (desktop first, then tablet/mobile)

### Design System Build (`skills/design-system-build/SKILL.md`)

How to construct and document a design system:

- How to extract and define design tokens from a reference
- How to organize and document design system components
- How to create a living design system reference page
- How to keep the system maintainable as the project evolves

### Dev Server Management (`skills/dev-server-management/SKILL.md`)

Running and managing local development servers:

- Starting a Shopify CLI dev server for your theme variant
- Running a reference design server (e.g., for a local Lexington setup)
- Managing multiple servers simultaneously
- Troubleshooting common server issues

### Code Quality (`skills/code-quality/SKILL.md`)

Standards for clean, maintainable code:

- Shopify theme-check configuration and compliance
- CSS linting and formatting rules
- Liquid linting standards
- Code organization best practices
- Pre-commit checks and automation

## Key Principles

### 1. The Default Theme is Sacred

The original theme at `horizon-themes/default/` is your template. It never gets edited. Instead:

1. Copy it to a new variant directory (e.g., `horizon-themes/my-project/`)
2. Run both workflows on that copy
3. The default remains pristine for future projects

### 2. Local-First, No Auto-Push

All work is done locally on your machine. The workflows never automatically push to Shopify servers. You decide when and if to sync your changes up. This gives you full control and lets you iterate quickly without affecting a live theme.

### 3. Autonomous Operation

Once a workflow is configured with the right inputs (reference path, theme path, etc.), it's designed to run with minimal human intervention. The agent handles the detailed work while you monitor progress.

For complex projects, sub-agents may be spawned to handle specific components in parallel, keeping context usage under control.

### 4. Design System First

The goal isn't just to clone a design—it's to understand *why* it looks the way it does. Workflow 2 extracts design intent into a system (tokens, components, patterns) that you can reuse, modify, and maintain independently of the original reference.

### 5. Iterative Visual Refinement

Instead of trying to get everything perfect in one pass, the workflows use iterative screenshot comparison loops. Each pass compares your implementation to the reference, identifies differences, and makes targeted improvements.

### 6. Brand-First Content Planning

Workflow 1 ensures that content and structure decisions are driven by the brand, business type, and CRO best practices — not by whatever happens to exist in a reference design. The reference design only influences visual styling (Workflow 2), never content strategy.

## Typical Timeline

- **Workflow 1 (Content Planning):** 2–4 hours (1–2 hours for simple stores with few traits; 3–5 hours for complex stores with many traits and 15+ pages)
- **Workflow 2 (Design Replication):** 4–8 hours (iterative refinement takes time)
- **Testing & adjustment:** 1–2 hours

Total: One working day for a moderately complex store design.

## Templates

Each workflow includes templates in its `templates/` subdirectory to ensure consistency and completeness:

### Workflow 1 Templates

- **brand-brief-template.md** — Template for the brand brief input document (fill this out before starting Workflow 1)
- **page-content-spec-template.md** — Template for a single page's content specification (sections, draft copy, settings, responsive notes)
- **site-content-map-template.md** — Template for the site-wide overview (page inventory, section reuse matrix, navigation, theme settings)

### Workflow 2 Templates

- **component-inventory-template.md** — Template for cataloging components across the site
- **design-tokens-map-template.md** — Template for documenting all design tokens (colors, typography, spacing, etc.)
- **visual-parity-log-template.md** — Template for tracking screenshot comparisons and refinement passes

These templates are referenced during the workflows and ensure all projects follow the same structure.

## Troubleshooting

### "The workflows feel overwhelming"

Start with Workflow 1. It's smaller and gives you concrete output (markdown docs) that clarify what Workflow 2 needs to do.

### "I don't have a reference design yet"

That's fine — Workflow 1 doesn't use a reference design at all. It only needs a brand brief. You can complete Workflow 1 and have a full content plan before choosing a reference design for Workflow 2.

### "The screenshot comparison loop isn't converging"

Check the visual comparison log in Workflow 2. It will identify which specific elements are still off. You might need to adjust a design token, fix a component, or revisit a layout decision.

### "My variant theme isn't syncing to Shopify"

Make sure you're running Shopify CLI from the repository root, not from inside the variant folder. Also verify that `shopify.theme.toml` has the correct theme ID and store hostname for your variant.

### "How do I use this with an existing variant?"

If you already have `horizon-themes/claude/`, `horizon-themes/openai/`, etc., use one of those as your working directory. The workflows don't care which variant you pick; just point them at the right path.

## Sub-Agent Support

Workflow 2 is designed to support sub-agents for managing large projects. When a single agent session approaches context limits, spawn sub-agents to handle specific phases or components in parallel. See the Workflow 2 ENTRY.md for detailed context management guidelines.

## For Advanced Users

### Customizing the Workflow

The ENTRY.md files are designed to be read and followed by AI agents, but they're also documented in plain English. You can edit them to add project-specific steps, change validation criteria, or integrate with your own tools.

### Integrating with External Tools

The workflows are CLI-agnostic. You can integrate with other tools (Figma API, screenshot services, diff tools) by modifying the skill documents or adding new ones.

## Related Documentation

- **`docs/PROJECT_CONTEXT.md`** — High-level project strategy and goals for the Horizon restyle (if this is a Lexington-to-Horizon project)
- **Shopify CLI docs** — [https://shopify.dev/docs/storefronts/themes/tools/cli](https://shopify.dev/docs/storefronts/themes/tools/cli)
- **Horizon theme docs** — Built-in help and documentation in the default theme

## Questions?

If something in the workflows isn't clear, check:

1. The detailed phase documentation in `workflow-2-design-replication/phases/`
2. The relevant skill document in `skills/`
3. The templates in each workflow's `templates/` directory
4. The main project README at the repository root

Each of these has expanded documentation for specific topics.
