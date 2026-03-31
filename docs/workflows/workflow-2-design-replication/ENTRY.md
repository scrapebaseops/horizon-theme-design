# Workflow 2: Design Replication & System Build — ENTRY POINT

## Purpose

This is the main autonomous workflow for replicating a reference website's design into a Shopify Horizon theme and building a complete, documented design system.

**You are reading this because:** You have a reference design (running website, codebase, or screenshots) and content plans from Workflow 1, and you want to autonomously transform both into a pixel-perfect Horizon implementation with a reusable design system.

**This workflow is:**
- Autonomous: Designed to run with minimal human intervention once configured
- Iterative: Uses screenshot comparison loops for gradual refinement
- Comprehensive: Produces not just code, but a documented design system
- Structured: Broken into 5 phases with clear completion criteria for each

---

## Required Inputs

Before starting, you need ALL of the following. Do not proceed if any are missing.

### 1. `THEME_ROOT` — Path to the Horizon Theme Copy

This is the Shopify theme you'll be working on.

**Format:** Absolute path to a Horizon theme variant, e.g., `/path/to/horizon-themes/my-project/`

**Requirements:**
- Must be a copy of the Horizon theme (copied from `horizon-themes/default/`)
- Must be a valid Shopify theme (contains `config/settings_schema.json`, `templates/`, `sections/`, etc.)
- Must NOT be the original default theme (`horizon-themes/default/`)
- Must be writable (you have permission to create files and directories)

**Verification:**
```bash
# Run this to verify THEME_ROOT is valid:
ls -la $THEME_ROOT/config/settings_schema.json
ls -la $THEME_ROOT/templates/index.json
ls -la $THEME_ROOT/sections/
```

If any of these don't exist, `THEME_ROOT` is not a valid Horizon theme.

### 2. `REFERENCE_PATH` — Path to the Reference Design

This is what you're replicating from.

**Can be one of:**
- **Directory path:** `/path/to/lexington-reference/` or `/path/to/design-files/` (a codebase or screenshot directory)
- **File path:** `/path/to/homepage.png` or `/path/to/reference.pdf` (a single exported screenshot/PDF reference)
- **URL:** `http://localhost:3000` or `https://example.com/` (a running website)

**For codebase (directory):**
- Verify the directory exists and contains the reference code/assets
- If it's a Node.js project (like Lexington), verify `package.json` exists
- Later, you may need to start a dev server for it (see Pre-Flight section)

**For screenshots (directory):**
- Must contain `.png`, `.jpg`, or `.jpeg` files
- Should have a clear naming convention (e.g., `homepage.png`, `product-page.png`, `collection.png`)
- Organize by page/section for clarity during comparison

**For single-file references:**
- Exported screenshots or PDFs are acceptable
- If the source is Figma or another design tool, export the relevant frames before starting
- Make sure the file covers the page/section states you need to inspect

**For URL (running site):**
- Must be accessible from your machine (respond to `curl` or browser)
- Should allow taking screenshots without authentication
- If authentication is required, document credentials separately (not in this workflow)

**Verification:**
```bash
# For directory or file:
ls -la $REFERENCE_PATH

# For URL (running site):
curl -s http://your-reference-url | head -20
```

### 3. `CONTENT_PLANS_PATH` — Path to Content Plans from Workflow 1

This is the output directory from Workflow 1.

**Format:** Absolute path to the directory containing content plan markdown files

**Workflow 1 → Workflow 2 artifact contract:**

| Artifact | Status for Workflow 2 | Purpose |
|----------|------------------------|---------|
| `site-content-map.md` | Required | Shared components, reuse matrix, and implementation priority |
| `site-structure.md` | Required | Page inventory, templates, navigation plan, and policy/explainer decisions |
| `gap-analysis.md` | Required | Horizon keep/modify/create decisions and page-inventory reconciliation |
| `pages/` | Required | Per-page structure, content, and section mapping |
| `brand-analysis.md` | Optional | Brand/trait context when the reference leaves gaps |
| `research-findings.md` | Optional | CRO rationale for layout, hierarchy, and content ordering |
| `_handoff-brief.md` | Optional | Compact brand context for sub-agents working in Workflow 2 |
| `consistency-review.md` | Optional | Naming and voice decisions established during Workflow 1 |
| `_status.md` | Internal | Execution metadata and staleness tracking; not needed to run Workflow 2 |

**Requirements:**
- All required artifacts must be readable
- Must contain `site-content-map.md`, `site-structure.md`, `gap-analysis.md`, and at least one page spec in `pages/`

**If you don't have this:**
→ Run Workflow 1 first. See `workflow-1-content-planning/ENTRY.md`.

**Verification:**
```bash
ls -la $CONTENT_PLANS_PATH/*.md
ls -la $CONTENT_PLANS_PATH/pages/*.md
cat $CONTENT_PLANS_PATH/site-content-map.md | head -30
cat $CONTENT_PLANS_PATH/site-structure.md | head -30
cat $CONTENT_PLANS_PATH/gap-analysis.md | head -30
```

### 4. `REFERENCE_SERVER_URL` (Optional)

If your reference is already running on a dev server, provide the URL here. This skips the step of starting a server for the reference.

**Example:** `http://localhost:3000` or `http://localhost:8080`

**When to provide:**
- Your reference is a running codebase (like Lexington) and you've already started its dev server
- You have a live website you want to reference

**When to skip:**
- Your reference is static screenshots (provide empty string or omit)
- You want this workflow to start the server for you

### 5. `THEME_SERVER_URL` (Optional)

If your Horizon theme dev server is already running, provide the URL here. This skips the setup step.

**Example:** `http://localhost:9000`

**When to provide:**
- You've already run `shopify theme dev` for this theme
- You want to reuse an existing dev session

**When to skip:**
- You want this workflow to start the server for you (recommended)

---

## Optional Configuration

### `OUTPUT_SCREENSHOTS_DIR`

Where to save comparison screenshots during the workflow.

**Default:** `$THEME_ROOT/.workflow/screenshots/`

**When to override:** If you want screenshots saved elsewhere (e.g., for sharing with a team)

### `MAX_CONTEXT_PER_PHASE`

How many tokens to allow per phase before spawning a sub-agent.

**Default:** 100,000 (tokens)

**When to override:** If running on machines with limited memory, reduce this. Otherwise, leave default.

### `VERBOSE_LOGGING`

Enable detailed logging during the workflow.

**Default:** `true`

**When to override:** If logs are too verbose, set to `false`. Useful for cleaner output.

---

## Quick Pre-Flight Checklist

Before you begin, verify all inputs and environment:

- [ ] `THEME_ROOT` points to a valid Horizon theme copy (not the default)
- [ ] `REFERENCE_PATH` points to a valid reference (codebase directory, screenshot/PDF file, screenshot directory, or URL)
- [ ] `CONTENT_PLANS_PATH` contains all required Workflow 1 artifacts (`site-content-map.md`, `site-structure.md`, `gap-analysis.md`, and page specs in `pages/`)
- [ ] You have write access to `$THEME_ROOT`
- [ ] You have the Shopify CLI installed (`shopify --version`)
- [ ] You have Node.js installed (`node --version`)
- [ ] You have `git` installed (`git --version`)
- [ ] You can authenticate Shopify CLI and open a theme preview/customizer for `THEME_ROOT`
- [ ] Screenshot tooling available: Check for built-in browser tools first (preferred — zero setup). If none available, install Playwright as fallback: `npm install -D playwright && npx playwright install chromium`. The visual comparison loop in Phases 1–5 requires some form of browser screenshot capability. See `docs/workflows/skills/visual-comparison/SKILL.md` for the full tool detection sequence.
- [ ] If you plan to execute Phases 4–5 now, your connected dev store has representative products, collections, pages, blogs/articles, menus, policies, and any required metafields/metaobjects — or you have documented blockers in `THEME_ROOT/.workflow/store-readiness.md`
- [ ] Disk space: At least 500 MB free (for screenshots, build artifacts, node_modules)
- [ ] Network: Can access `REFERENCE_PATH` (if a URL)

If any check fails, resolve it before proceeding.

---

## Pre-Flight Phase (Setup & Validation)

Before the 5 phases begin, perform these setup steps.

### Step 1: Validate All Inputs

**Action:** Run this validation script

```bash
#!/bin/bash
set -e

THEME_ROOT="$1"
REFERENCE_PATH="$2"
CONTENT_PLANS_PATH="$3"

echo "Validating THEME_ROOT: $THEME_ROOT"
test -f "$THEME_ROOT/config/settings_schema.json" || { echo "FAIL: Missing settings_schema.json"; exit 1; }
test -f "$THEME_ROOT/templates/index.json" || { echo "FAIL: Missing index.json"; exit 1; }
test -d "$THEME_ROOT/sections" || { echo "FAIL: Missing sections/"; exit 1; }
echo "✓ THEME_ROOT is valid"

echo "Validating REFERENCE_PATH: $REFERENCE_PATH"
if [[ "$REFERENCE_PATH" =~ ^http ]]; then
  curl -s "$REFERENCE_PATH" | head -1 > /dev/null || { echo "FAIL: URL not accessible"; exit 1; }
  echo "✓ REFERENCE_PATH is accessible"
else
  test -d "$REFERENCE_PATH" || test -f "$REFERENCE_PATH" || { echo "FAIL: Path doesn't exist"; exit 1; }
  echo "✓ REFERENCE_PATH path exists"
fi

echo "Validating CONTENT_PLANS_PATH: $CONTENT_PLANS_PATH"
test -d "$CONTENT_PLANS_PATH" || { echo "FAIL: Directory doesn't exist"; exit 1; }
test -f "$CONTENT_PLANS_PATH/site-content-map.md" || { echo "FAIL: site-content-map.md not found"; exit 1; }
test -f "$CONTENT_PLANS_PATH/site-structure.md" || { echo "FAIL: site-structure.md not found"; exit 1; }
test -f "$CONTENT_PLANS_PATH/gap-analysis.md" || { echo "FAIL: gap-analysis.md not found"; exit 1; }
test -d "$CONTENT_PLANS_PATH/pages" || { echo "FAIL: pages/ subdirectory not found"; exit 1; }
ls "$CONTENT_PLANS_PATH/pages/"*.md > /dev/null 2>&1 || { echo "FAIL: No .md files found in pages/"; exit 1; }
for optional_file in brand-analysis.md research-findings.md _handoff-brief.md consistency-review.md _status.md; do
  if test -f "$CONTENT_PLANS_PATH/$optional_file"; then
    echo "✓ Optional artifact present: $optional_file"
  else
    echo "• Optional artifact missing: $optional_file"
  fi
done
echo "✓ CONTENT_PLANS_PATH is valid"

echo ""
echo "All inputs validated successfully."
```

**Decision:** If any validation fails, stop and fix the input before proceeding. Do not skip validation.

### Step 1b: Choose CSS Prefix

**Action:** Choose a unique 3-letter prefix string for all custom CSS files, classes, sections, and snippets. This prevents collisions with Horizon's native styles and third-party apps.

**Format:** 3 lowercase letters, followed by a hyphen. Example: `abc-`, `lxn-`, `brv-`.

**How to choose:** Derive from the brand name (e.g., "Lexington" → `lxn-`, "Bravado" → `brv-`), or generate a random string.

**Record it:** Create a file `THEME_ROOT/.workflow/prefix.txt` containing just the prefix string:
```bash
echo "lxn-" > "$THEME_ROOT/.workflow/prefix.txt"
```

**This prefix is used everywhere:**
- Token snippet: `snippets/{prefix}tokens.liquid`
- CSS files: `assets/{prefix}base.css`, `assets/{prefix}primitives.css`
- CSS classes: `.{prefix}btn`, `.{prefix}card`, `.{prefix}heading`
- Section files: `sections/{prefix}hero.liquid`, `sections/{prefix}features.liquid`
- Snippet files: `snippets/{prefix}product-card.liquid`
- Clone sections during Phase 1: `sections/clone-{prefix}hero.liquid`

**Why:** The code-architecture skill mandates a consistent prefix. It scopes your design system cleanly away from Horizon's native styles and any future apps or integrations.

**Section Naming Convention (all phases):**

| Lifecycle | File pattern | Example | When to use |
|-----------|-------------|---------|-------------|
| Clone (Phase 1 only) | `sections/clone-{prefix}{name}.liquid` | `clone-lxn-hero.liquid` | Temporary 1:1 copies of reference design |
| Production custom | `sections/{prefix}{name}.liquid` | `lxn-hero.liquid` | All custom sections built in Phases 2–4 |
| Design system | `sections/{prefix}ds-{name}.liquid` | `lxn-ds-typography.liquid` | Design system reference page sections |
| Horizon override | _(no new file)_ | CSS in `{prefix}primitives.css` | Restyling native Horizon sections |

Do **not** use a `custom-` prefix. All custom sections use `{prefix}` as the sole namespace.

### Step 2: Read Required Skills

Before the phases begin, read these skill documents in full. These are the rules that govern all work in this workflow.

1. **`docs/workflows/skills/code-architecture/SKILL.md`**
   - Governs how CSS, Liquid, and JSON are organized
   - Defines naming conventions and file structure
   - ALL code changes must follow these rules

2. **`docs/workflows/skills/visual-comparison/SKILL.md`**
   - Defines the methodology for screenshot comparison
   - Specifies viewport sizes and zoom levels
   - Defines "pixel-perfect" criteria

3. **`docs/workflows/skills/design-system-build/SKILL.md`**
   - Governs how to extract and document design tokens
   - Defines the component layer architecture
   - Specifies design system reference page structure

4. **`docs/workflows/skills/code-quality/SKILL.md`**
   - Defines linting rules and code quality standards
   - Specifies theme-check configuration
   - Governs CSS and Liquid formatting

5. **`docs/workflows/skills/dev-server-management/SKILL.md`**
   - Explains how to start and manage dev servers
   - Covers both Horizon theme server and reference server setup
   - Provides troubleshooting guidance

**Decision:** Do not proceed to the phases until you have read and understood all five skill documents. If any skill is missing or unclear, reference the skill filename and report the issue.

### Step 3: Create Workflow Directory Structure

**Action:** Create the `.workflow/` directory and subdirectories in `THEME_ROOT`.

```bash
mkdir -p "$THEME_ROOT/.workflow"
mkdir -p "$THEME_ROOT/.workflow/screenshots"
mkdir -p "$THEME_ROOT/.workflow/logs"
mkdir -p "$THEME_ROOT/.workflow/artifacts"
mkdir -p "$THEME_ROOT/.workflow/comparisons"
```

**Also:** Add `.workflow/` to `.shopifyignore` so it doesn't get pushed to Shopify:

```bash
echo ".workflow/" >> "$THEME_ROOT/.shopifyignore"
echo ".workflow/" >> "$THEME_ROOT/.gitignore"
```

**Verify:**
```bash
ls -la "$THEME_ROOT/.workflow/"
grep ".workflow/" "$THEME_ROOT/.shopifyignore"
```

### Step 4: Initialize Workflow Progress Log

**Action:** Create `$THEME_ROOT/.workflow/progress.md` to track what's been done.

```markdown
# Workflow 2 Progress Log

**Started:** [timestamp]
**Theme:** $THEME_ROOT
**Reference:** $REFERENCE_PATH

## Phases

- [ ] Pre-Flight: Validation & Setup
- [ ] Phase 1: Reference Audit & Page Cloning
- [ ] Phase 2: Design System Extraction & Foundation
- [ ] Phase 3: Gap Analysis & Fill
- [ ] Phase 4: Apply Design System to Real Pages
- [ ] Phase 5: Final QA & Refinement

## Current Status

Ready to begin Phase 1.
```

### Step 5: Determine Dev Server Strategy

**Decision tree:**

1. **Do you have `THEME_SERVER_URL` provided?**
   - YES: Skip to Step 6
   - NO: Continue to decision 2

2. **Do you want this workflow to manage the dev server?**
   - YES: Execute `shopify theme dev -e <variant>` from the **repo root** (see `docs/workflows/skills/dev-server-management/SKILL.md`)
   - NO: Start it manually before proceeding, then provide the URL

3. **Do you have `REFERENCE_SERVER_URL` provided?**
   - YES: Reference server is ready, proceed
   - NO: Continue to decision 4

4. **Is your reference a URL or running site?**
   - YES: You already have a server, record the URL
   - NO: Is it a codebase that can be run locally (contains `package.json`, Dockerfile, etc.)?
     - YES: Start its dev server now (see `docs/workflows/skills/dev-server-management/SKILL.md`)
     - NO: Reference is static screenshots, proceed without a reference server

**Action:** Based on above, either:
- Note down `THEME_SERVER_URL` and `REFERENCE_SERVER_URL`
- OR start servers and record the URLs when ready

### Step 5b: Verify Store Preview & Data Readiness

**Why:** Theme files alone are not enough to execute Phases 4–5. Real-page QA depends on a Shopify preview backed by actual store resources.

**Action:** Create `THEME_ROOT/.workflow/store-readiness.md` and document:

- The connected dev store / preview URL used for testing
- The actual handles/routes you will use for QA:
  - product
  - collection
  - blog
  - article
  - page(s) such as About, FAQ, Contact
  - policies
- Which menus must exist in Shopify admin
- Any required metafields or metaobjects
- Any missing resources/blockers that would prevent Phase 4 or Phase 5 from being fully verified

**Decision:** If critical resources are missing, either seed/create them before Phase 4 or clearly mark Phase 4/5 QA as blocked for those routes.

### Step 6: Verify Design Token Extraction Prerequisites

**Decision:** Are you ready to extract design tokens from the reference?

- If reference is a running site or server: YES, proceed
- If reference is a codebase directory: Can you examine the CSS/Tailwind/styling files? If yes, proceed
- If reference is screenshots: YES, proceed (you'll extract tokens visually)

---

## The 5 Phases

After pre-flight, the workflow proceeds through 5 phases. Each phase has:
- Detailed instructions (in `phases/phase-N-*.md`)
- Completion criteria (you'll know when to move to the next phase)
- Artifact deliverables (files that prove the phase is done)

### Phase 1: Reference Audit & Page Cloning

**Read:** `phases/phase-1-reference-audit-and-cloning.md`

**Purpose:** Analyze the reference design, extract design tokens, and create 1:1 clone pages that match the reference pixel-for-pixel.

**Duration:** 3–4 hours (includes both audit and cloning)

**Key deliverables:**
- Complete design token extraction (colors, typography, spacing, borders, shadows)
- Clone pages for every page in the reference design
- Component inventory documenting all components found in reference
- Header and footer audit (layout, navigation, announcement bar)

**Completion criteria:**
- Design tokens comprehensively documented
- Clone pages created for all reference pages
- Visual parity achieved at all viewports (desktop 1440px, tablet 768px, mobile 390px)
- All components identified and cataloged
- Header and footer documented and included in clone pages

**If you run out of context:**
→ Spawn a sub-agent to continue. Provide the reference path and list of pages already completed.

---

### Phase 2: Design System Extraction & Foundation

**Read:** `phases/phase-2-design-system-extraction.md`

**Purpose:** Transform the design tokens from Phase 1 into a formal, layered design system with theme settings, base styles, and component primitives.

**Duration:** 2–3 hours

**Key deliverables:**
- Formalized design tokens in Shopify theme settings
- Base styles (typography, spacing, layout)
- Component primitives (buttons, cards, forms, etc.)
- Design system reference page showcasing all components
- Header and footer CSS overrides

**Completion criteria:**
- All design tokens from Phase 1 are in theme settings or CSS variables
- CSS is organized into layers (tokens → base → primitives)
- Every primitive component is documented with examples
- theme-check passes with zero errors

---

### Phase 3: Gap Analysis & Fill

**Read:** `phases/phase-3-gap-analysis.md`

**Purpose:** Identify components and states needed for the real Shopify pages that don't yet exist in the design system, then design and build any missing components.

**Duration:** 1–2 hours

**Key activities:**
- Audit design system against content plans from Workflow 1
- Compare against common Shopify needs (search, filters, empty states, error states)
- Design and build any missing components to match the existing design language
- Update design system reference page with new components

**Completion criteria:**
- All gaps identified and documented
- All missing components designed and built
- Design system reference page updated
- Updated component inventory

---

### Phase 4: Apply Design System to Real Pages

**Read:** `phases/phase-4-page-implementation.md`

**Purpose:** Build actual Shopify pages using the design system and content specifications from Workflow 1. These are real, functional pages (not just design clones).

**Duration:** 2–3 hours

**Key principles:**
- Use content plans from Workflow 1 as the blueprint
- Build using design system sections and components
- All styling comes from the design system layers
- Every section and block should have appropriate theme settings
- Header and footer styled via CSS overrides and configured with correct navigation menus
- Real store resources (products, collections, pages, blogs/articles, policies, menus, metafields/metaobjects) must be mapped or created and recorded in `THEME_ROOT/.workflow/store-readiness.md`

**Completion criteria:**
- All required Shopify pages built and functional
- All pages visually match the design system
- All content from Workflow 1 integrated
- All pages responsive at all viewports

---

### Phase 5: Final QA & Refinement

**Read:** `phases/phase-5-qa-refinement.md`

**Purpose:** Full quality assurance pass. Verify everything works, compare against reference one last time, run linting, and document any deviations.

**Duration:** 1–2 hours

**What to test:**

1. **Visual consistency**
   - Take screenshots of every page at all 3 viewports (1440px, 768px, 390px)
   - Compare clone pages against reference—do they still match?
   - Compare real pages against clone pages and the design system—are shared patterns visually consistent?
   - Are there any visual regressions?

2. **Responsive behavior**
   - Resize the browser and verify layout shifts happen at correct breakpoints
   - Check that text is readable at all sizes
   - Verify images scale correctly

3. **Interactive states**
   - Hover over buttons, links, form inputs—do hover states work?
   - Click through form validation—do error states appear?
   - Test keyboard navigation (Tab key)—is focus visible everywhere?
   - Test accessibility (keyboard-only navigation)

4. **Component functionality**
   - Accordions open/close correctly
   - Tabs switch content correctly
   - Modals open and close correctly
   - Forms submit without errors

5. **Settings and customization**
   - Open theme customizer (in dev theme)
   - Change colors—do all sections update?
   - Change fonts—do all sections update?
   - Add/remove sections—does layout adjust?

6. **Code quality**
   - Run `shopify theme check` — zero errors (warnings are OK)
   - Check CSS for unused selectors (use browser DevTools)
   - Verify all Liquid variables are defined
   - Check for any console errors in browser DevTools

7. **Performance**
   - Check page load time in DevTools (should be < 3 seconds)
   - Check CSS file size (should be < 150KB uncompressed)
   - Verify no unused CSS is being loaded

**Deliverables:**
- `$THEME_ROOT/.workflow/final-screenshots/` — Final screenshots at all viewports plus index
- `$THEME_ROOT/.workflow/qa-*.md` — Detailed QA documents
- `$THEME_ROOT/.workflow/final-report.md` — Final summary report
- `$THEME_ROOT/.workflow/deviations.md` — Any intentional deviations from the reference and why

**Completion criteria:**
- Clone pages still match the reference design at desktop, tablet, and mobile
- Real pages match the design system and Workflow 1 content specs, with any intentional deviations documented
- theme-check passes with zero errors
- No console errors in browser
- All interactive states work correctly
- All theme settings customize the design correctly
- Code follows `docs/workflows/skills/code-architecture/SKILL.md` standards

---

## Completion Criteria for Entire Workflow

The workflow is COMPLETE and ready for deployment when ALL of the following are true:

1. **Design Tokens & System**
   - All design tokens extracted and documented in `$THEME_ROOT/.workflow/design-tokens-map.md`
   - Complete design system in CSS (tokens, base, primitives)
   - All design tokens in theme settings or CSS variables

2. **Clone Pages (From Phase 1)**
   - Clone pages created for all reference pages
   - All clone pages match reference pixel-for-pixel at all viewports (desktop, tablet, mobile)

3. **Design System Foundation (From Phase 2)**
   - Theme settings updated with design system configuration
   - Base styles and component primitives created
   - Component inventory documented

4. **Gap Analysis (From Phase 3)**
   - All gaps identified and documented in gap-analysis-report.md
   - Missing components designed and built
   - Design system covers all Shopify needs

5. **Real Pages (From Phase 4)**
   - All main Shopify templates (index, product, collection, etc.) built
   - All pages visually match design system
   - All content from Workflow 1 integrated
   - Store resources and preview routes documented in `store-readiness.md`

6. **Code Quality**
   - `shopify theme check` passes with zero errors
   - CSS organized according to `docs/workflows/skills/code-architecture/SKILL.md`
   - No unused CSS or JavaScript

7. **Functionality**
   - All interactive states (hover, focus, active, disabled) work correctly
   - All form inputs validate correctly
   - Theme customizer allows merchants to customize colors and fonts

8. **Documentation & Artifacts**
   - `$THEME_ROOT/.workflow/progress.md` shows all phases complete
   - `$THEME_ROOT/.workflow/store-readiness.md` documents preview routes and dependencies
   - `$THEME_ROOT/.workflow/deviations.md` documents any intentional departures from the reference/design system
   - All phase deliverables documented
   - `.shopifyignore` includes `.workflow/`
   - Theme files are complete and verified locally (deployment is a human-only decision)

---

## Working Rules

Follow these rules throughout the entire workflow. They are non-negotiable.

### Rule 0: Working Checklists & Progress Gates (HIGHEST PRIORITY)

**Every phase MUST use working checklists.** This is the most important rule in the entire workflow.

**Before starting each phase:**
1. Read the full phase document and all referenced skill documents
2. Generate a detailed working checklist listing EVERY individual deliverable, component, page, section, and item required by the phase. The agent executing the phase MUST generate the checklist as its FIRST action — before any other work. This is not optional and not delegated to a sub-agent (unless that sub-agent executes the entire phase). The checklist must be a file at `THEME_ROOT/.workflow/checklists/phase-N-checklist.md` and must exist before ANY code is written.
3. Include specific acceptance criteria for each item (e.g., "pixel-perfect at 3 viewports", "all 8 blocks populated", "screenshot comparison logged")
4. Save to `THEME_ROOT/.workflow/checklists/phase-N-checklist.md`
5. Present the checklist to the user before starting work

**During each phase:**
- Work through the checklist item by item
- Verify each item meets its acceptance criteria before marking complete
- "I wrote the code" is NOT the same as "I verified it works" — take screenshots, count sections, compare against spec
- Update the checklist file after each item so progress is persisted
- Never declare an item complete without verification evidence

**Before moving to the next phase (SELF-ENFORCING GATE):**
- Read the checklist file and count `[x]` items against total required items
- If ANY items are `[ ]` or `[~]`, go back and finish them — do not proceed, do not ask permission to skip
- If items are `[!]`, document why they're blocked and continue only if genuinely not completable
- Log the gate result: "GATE: X/Y items complete. [PASS/FAIL]"
- If the gate FAILS, loop back and complete remaining items. No exceptions.

**Why:** Without this protocol, agents consistently half-complete phases — cloning 1 of 12 pages, building 3 of 8 sections on a product page, skipping visual comparison loops, declaring "pixel-perfect" without screenshots. The checklist makes completeness visible and the self-enforcing gate prevents silent scope reduction without requiring user intervention.

### Rule 1: Local Only — Never Push to Shopify

**You must NEVER run `shopify theme push`, `shopify theme publish`, or any command that writes to the remote Shopify store.** You must also never run `git push`. These are human-only actions performed outside this workflow.

The only Shopify CLI commands you are allowed to run:
- `shopify theme dev -e <variant>` — local preview (connects to the store read-only for assets/data)
- `shopify theme check -e <variant>` — static analysis / linting

Everything else (`push`, `publish`, `pull --force`, Admin API writes, etc.) is **strictly forbidden**.

**Why:** The human operator reviews all changes locally and decides if/when to deploy. No agent may make that decision.

### Rule 2: Follow Code Architecture Skill

Every file edit must follow the rules in `docs/workflows/skills/code-architecture/SKILL.md`. This includes:
- CSS organization (tokens, base, components, utilities, page-specific)
- Naming conventions for CSS classes
- Liquid component structure
- JSON template organization
- File placement and naming

**Why:** Consistency prevents bugs and makes maintenance easier.

**How to verify:** Before completing each phase, re-read the code architecture skill and audit your changes.

### Rule 3: Use Visual Comparison Methodology

All screenshot comparisons must follow the approach in `docs/workflows/skills/visual-comparison/SKILL.md`. This includes:
- Specific viewport sizes (1440px, 768px, 390px)
- Granular zoom levels for detailed inspection
- Decision criteria for "close enough" vs. needs more work
- Prioritization (desktop first, then tablet, then mobile)

**Why:** Consistent methodology ensures fair, reproducible comparisons.

**How to verify:** Document all screenshot comparisons in `$THEME_ROOT/.workflow/comparisons/`

### Rule 4: Run Code Quality Checks Regularly

After each major phase (and certainly before completion), run:
```bash
# Run from the repository root, targeting your variant:
shopify theme check -e <variant>
```

Zero errors required for completion. (Warnings are OK.)

**Why:** theme-check catches Liquid errors, missing required files, and best practice violations.

**How to verify:** Check Phase 5 QA report includes theme-check output.

### Rule 5: Use Sub-Agents for Complexity Management

If a single phase is too large (multiple pages, hundreds of components) or you're running low on context:
1. Break the phase into smaller sub-tasks
2. Create clear handoff instructions
3. Spawn a sub-agent with those instructions
4. The sub-agent reports completion back

**Why:** Prevents context overflow and allows parallel work.

**How to verify:** Sub-agent sessions should be documented in progress.md with completion timestamps.

### Rule 6: Document Progress After Each Phase

After completing each phase, update `$THEME_ROOT/.workflow/progress.md`:
- Mark the phase complete
- Note the timestamp
- List key deliverables
- Note any blockers or deviations from the plan

**Why:** Creates an audit trail and helps new agents pick up where the last one left off.

**How to verify:** progress.md should have entries for all phases.

### Rule 7: Keep Clone Pages as Reference

Do NOT delete or repurpose clone pages (e.g., `page.clone-homepage.json`). Phase 2 is allowed to refactor their internals to adopt the design system, but that refactor must preserve visual parity. After Phase 2, treat clone pages as locked regression fixtures.

**Why:** Clone pages prove the design can be replicated and serve as a visual regression test.

**How to verify:** Clone pages should still exist and still match the reference at the end of the workflow.

---

## How This Workflow Thinks

Before diving into phases, understand the logic that connects them.

**Clone first, then extract.** You start by making temporary 1:1 copies of the reference design as Shopify pages (Phase 1). This forces you to truly understand the reference — every spacing value, every color, every component — because you can't clone it without understanding it. The clone pages prove the design *can* be replicated in Horizon.

**Extract the system from the clones.** Once clone pages match the reference pixel-for-pixel, you formalize what you learned into a layered design system (Phase 2) — tokens, base styles, primitives. Then you refactor the clone pages to use these layers. If the clones still match after refactoring, your design system is correct.

**Fill the gaps.** The reference won't cover every Shopify need (empty cart, search results, error states). Phase 3 identifies what's missing and builds new components that feel native to the extracted design language.

**Build real pages on top of the system.** Phase 4 uses content plans from Workflow 1 (what to build) and the design system from Phase 2 (how to style it) to build actual Shopify pages. The clone templates stay present as regression tests. If a clone pattern is promoted for production use, copy/extract it into a non-clone section or snippet and keep the clone version reserved for regression.

**QA everything against everything.** Phase 5 compares clone pages against reference (still match?), real pages against clone pages/design system (consistent where patterns overlap?), and the design system reference page against itself (coherent?).

**Header and footer are global.** Unlike page content, the header and footer appear on every page. They're Horizon section groups (`header-group.json`, `footer-group.json`). The workflow audits them in Phase 1, overrides their CSS in Phase 2, and configures navigation menus in Phase 4. They are NOT rebuilt from scratch — Horizon's header/footer functionality (mobile nav, search, cart icon) is preserved and only restyled.

**Color schemes, not flat colors.** Horizon uses a color scheme system — named schemes (e.g., "Scheme 1", "Scheme 2") each containing background, foreground, primary, and button colors. Sections choose which scheme to use, enabling alternating light/dark sections. The workflow maps extracted tokens into Horizon's scheme architecture rather than fighting against it.

**The CSS cascade philosophy.** All styling flows through a strict hierarchy:
1. **Theme Settings** → merchant-configurable values (colors, fonts, spacing)
2. **Design Tokens CSS** → settings converted to CSS custom properties
3. **Base Styles CSS** → typography, reset, layout containers
4. **Component Primitives CSS** → buttons, cards, forms, badges
5. **Section-Specific CSS** → minimal overrides for unique sections (should be <20 lines per section)

If two sections need the same custom CSS, refactor it up to primitives. Section-specific CSS is a last resort, not the default.

**The design system reference page is your canary.** After Phase 2 creates it, you check it after every significant change — new components in Phase 3, every page build in Phase 4, every QA fix in Phase 5. If the reference page looks broken, something upstream is wrong.

---

## Agent Execution Architecture

This workflow is designed for autonomous AI agent execution. This section defines how agents manage context, hand off work, and maintain quality.

### Execution Phases

The workflow runs in four execution phases (not to be confused with the 5 workflow phases):

```
Execution Phase A: Reference Mastery (Main Agent)
├── Workflow Phase 1: Reference Audit & Page Cloning
├── Workflow Phase 2: Design System Extraction
└── Creates: design-system-handoff.md

Execution Phase B: Gap Fill (Main Agent)
├── Workflow Phase 3: Gap Analysis & Fill
├── Quality Gate: verify design system reference page
└── Updates: design-system-handoff.md with new primitives/components

Execution Phase C: Page Build (Sequential then Parallel Sub-Agents)
├── Step 1: Homepage build (main agent or single sub-agent) — establishes patterns
├── Quality Gate: verify reference page, update handoff brief with homepage learnings
├── Step 2: Remaining batches (parallel sub-agents)
├── Workflow Phase 4: Page Implementation
└── Sub-agents receive: updated design-system-handoff.md + page assignments

Execution Phase D: QA (Main Agent or Fresh Sub-Agent)
├── Workflow Phase 5: Final QA & Refinement
└── Reads: all deliverables from Phases 1-4
```

**Why Phase 3 stays with the main agent:** Gap analysis is holistic — it requires understanding the full design system to decide what's missing and where new components fit. Sub-agents building individual pages shouldn't be making system-level architecture decisions. The main agent keeps full context from Phases 1-2 and is best positioned to fill gaps coherently.

**Why Homepage builds first, alone:** The homepage touches the most section types and establishes patterns (how to use primitives, how to structure section JSON, how section-specific CSS interacts with the design system). Building it first — and then updating the handoff brief with what was learned — gives every subsequent sub-agent better instructions.

### The Design System Handoff Brief

After Phase 2, the main agent creates `THEME_ROOT/.workflow/design-system-handoff.md` — a compact (~2000-3000 token) document that gives any sub-agent everything it needs to build pages correctly. This replaces the need to re-read all design system files.

**Template:**
```markdown
# Design System Handoff Brief

## Prefix
All custom files and classes use the prefix: `{prefix}` (e.g., `lxn-`)

## CSS Architecture
- Load order: {prefix}tokens.css → {prefix}base.css → {prefix}primitives.css (registered in snippets/stylesheets.liquid)
- All values via CSS custom properties (never hardcode colors/spacing)
- Section-specific CSS < 20 lines; if 2+ sections need it, move to primitives

## Key Tokens
- Primary: [value] | Secondary: [value]
- Heading font: [value] | Body font: [value]
- Spacing scale: xs=[value], sm=[value], base=[value], md=[value], lg=[value], xl=[value]
- Border radius: sm=[value], base=[value], lg=[value]

## Available Primitives
- Buttons: .{prefix}btn, .{prefix}btn--primary, .{prefix}btn--secondary, .{prefix}btn--outline
- Cards: .{prefix}card, .{prefix}card__image, .{prefix}card__title, .{prefix}card__footer
- Forms: .{prefix}form-group, .{prefix}form-error, .{prefix}form-success
- Layout: .{prefix}container, .{prefix}container--narrow, .{prefix}container--wide
- [List all available primitive classes]

## Coding Rules
- Use {% render %} not {% include %}
- Horizon native sections: override CSS only, never fork the Liquid
- All images need alt text
- All interactive elements need focus states
- Settings: use Shopify setting types (color, font_picker, range, etc.)

## Reference Page
- Location: templates/page.design-system.json
- Check this page after every significant change
- If anything looks broken, fix before continuing

## Quality Standards
- theme-check: zero errors
- No console errors in browser
- Responsive at 1440px, 768px, 390px
```

### Sub-Agent Strategy

**Phase 1 Sub-Agents (if needed):** One per clone page. Each receives reference screenshots, design tokens map, component inventory, and code architecture skill reference.

**Phase 4 Sub-Agents — Two-Stage Launch:**

Stage 1 (Sequential): Homepage builds first. This is the most important page and touches the most section types. It establishes patterns for how primitives are used, how section JSON is structured, and how section-specific CSS interacts with the design system. The main agent (or a single sub-agent) builds the homepage, then:

1. Screenshots at all three breakpoints and verifies against reference
2. Loads the design system reference page and verifies nothing broke
3. **Updates `design-system-handoff.md`** with any learnings: new patterns discovered, primitives that needed adjustment, gotchas to avoid, section JSON conventions that worked well
4. Only then proceeds to Stage 2

Stage 2 (Parallel): Remaining pages launch in batches:
- Batch A: Product + Cart
- Batch B: Collection + Search + List-Collections
- Batch C: Blog + Article
- Batch D: Custom pages (About, Contact, FAQ, etc.)
- Batch E: 404 + Password

Each batch sub-agent receives: the **updated** design-system-handoff.md (with homepage learnings), content specs for assigned pages, site-content-map.md (for shared component awareness), and the code architecture skill reference.

**Inter-Batch Issue Propagation:** If a sub-agent discovers that a shared primitive or token needs fixing, it should:
1. Fix it in its own build
2. Flag it clearly in its completion report (under a "SHARED FIXES" heading)
3. The main agent reviews all completion reports and applies shared fixes before signing off

For stores with fewer than 6 total pages, skip sub-agents entirely — the main agent builds all pages sequentially, maintaining full context. Sub-agents are a scaling strategy, not the default.

### Quality Gates

There are three explicit quality gates where work must stop and verify before continuing:

1. **After Phase 2 (Design System Extraction):** Load the design system reference page. Every token, primitive, and component must render correctly. If anything is wrong, fix it before creating the handoff brief.

2. **After Phase 3 (Gap Fill):** Load the design system reference page again. All new primitives and components added during gap-fill must render correctly alongside the originals. Update the handoff brief with new additions.

3. **After Homepage Build (Phase 4 Stage 1):** Full visual comparison of homepage at all breakpoints. Design system reference page must still be intact. Handoff brief must be updated with homepage learnings before any parallel batches launch.

Skipping a quality gate to save time will always cost more time later.

### Context Pressure Decision Points

There are two moments where the agent evaluates whether to continue or spawn sub-agents:

1. **After Phase 1 cloning:** If more than 4 pages needed cloning and context is above 60%, spawn sub-agents for remaining clones.
2. **Before Phase 4 parallel batches (Stage 2):** The decision depends on both context pressure and project size:
   - **Small stores (≤6 pages):** Main agent builds all pages sequentially regardless of context. Full context produces better results than fragmented sub-agents.
   - **Medium stores (7-12 pages):** If context is above 50%, spawn sub-agents for Stage 2 batches. Otherwise, main agent continues.
   - **Large stores (13+ pages):** Always spawn sub-agents for Stage 2 batches. The main agent manages coordination.

### Sub-Agent Prompt Template

When spawning a sub-agent, provide:
```
You are building Shopify theme pages for [project name].

Read these files first (in this order):
0. THEME_ROOT/.workflow/prefix.txt (your CSS prefix — use it on ALL custom classes and files)
1. THEME_ROOT/.workflow/design-system-handoff.md (your styling guide and pattern reference)
2. docs/workflows/skills/code-architecture/SKILL.md (your coding rules)
3. docs/workflows/skills/visual-comparison/SKILL.md (your QA methodology)

Then read these source files to understand what's available:
4. THEME_ROOT/snippets/{prefix}tokens.liquid (all design tokens)
5. THEME_ROOT/assets/{prefix}primitives.css (all shared component classes)
6. THEME_ROOT/assets/{prefix}base.css (base/reset styles)
7. THEME_ROOT/snippets/stylesheets.liquid (CSS load order — register any new CSS here)

Your assignment: [specific pages]
Content specs: [paths to W1 page specs]
Theme root: [THEME_ROOT path]

Build each page following Phase 4 instructions in phases/phase-4-page-implementation.md.
After each page, screenshot at 1440px, 768px, 390px and verify.
After each page, load page.design-system.json and visually verify nothing is broken.

If you need to fix a shared primitive or token to make your pages work:
- Make the fix
- Flag it under "SHARED FIXES" in your completion report so other agents get the update

Report back: files created, files modified, SHARED FIXES (if any), any issues found.
```

### Token Budget

Phases 1–2 should fit in a single session (80–100K tokens).
Phase 3 should fit in a single session (~20-30K tokens).
Phase 4 Homepage (Stage 1) should fit in a single session (~30-40K tokens).
Phase 4 remaining batches run in parallel sub-agents (~30-40K tokens each).
Phase 5 should fit in a single session (~30-40K tokens).

Total budget: ~200-300K tokens for entire workflow, depending on store size.

---

## Troubleshooting

### Problem: Input Validation Fails

**Symptom:** `THEME_ROOT`, `REFERENCE_PATH`, or `CONTENT_PLANS_PATH` validation fails.

**Solution:**
1. Verify the path exists: `ls -la $PATH`
2. Check read permissions: `test -r $FILE && echo "readable"` or `test -w $DIR && echo "writable"`
3. Verify the path is correct (no typos, proper escaping)
4. If using a URL, verify it's accessible: `curl -s $URL | head -1`

### Problem: Dev Server Won't Start

**Symptom:** `shopify theme dev` hangs or exits with error.

**Solution:**
1. Check Shopify CLI is installed: `shopify --version`
2. Check you're in the **repository root** (not inside a variant folder): `pwd` should show the repo root containing `shopify.theme.toml`
3. Check port is available: `lsof -i :9000` (if port 9000 is in use, specify a different one)
4. Refer to `docs/workflows/skills/dev-server-management/SKILL.md` for detailed troubleshooting

### Problem: Screenshots Look Blurry or Incorrect Size

**Symptom:** Visual comparisons are hard to read or viewports don't match expected sizes.

**Solution:**
1. Verify viewport sizes in visual-comparison skill match yours: should be 1440px, 768px, 390px
2. Ensure you're using a consistent screenshot tool (built-in browser tools, Playwright, or Puppeteer)
3. Zoom to 100% in the browser before taking screenshots
4. Use the granular zoom methodology in visual-comparison skill (screenshot, then zoom in)

### Problem: theme-check Fails with Errors

**Symptom:** `shopify theme check` reports errors preventing completion.

**Solution:**
1. Read the error message carefully
2. Check `docs/workflows/skills/code-quality/SKILL.md` for the relevant rule
3. Fix the offending code
4. Re-run `shopify theme check`
5. Common errors: missing required template fields, invalid JSON, undefined Liquid variables

### Problem: Phase Takes Much Longer Than Expected

**Symptom:** You're 5 hours into Phase 1 and only halfway done cloning pages.

**Solution:**
1. Consider spawning a sub-agent to handle remaining pages in parallel
2. Break the remaining work into smaller chunks (one page per sub-agent)
3. Provide sub-agent with clear instructions and handoff notes
4. Continue with next phases in parallel if sub-agents can work independently

### Problem: Color/Typography Doesn't Match Reference

**Symptom:** Your design system colors or fonts look different from the reference.

**Solution:**
1. Go back to Phase 1 design tokens
2. Use browser DevTools to inspect the reference and your implementation side-by-side
3. Compare the computed CSS (DevTools → Computed tab)
4. Check that CSS custom properties are actually being used (not hardcoded values)
5. Verify theme settings are correct in `config/settings_data.json`

### Problem: I've Lost Track of What's Been Done

**Symptom:** You're not sure which phases are complete, which pages are cloned, etc.

**Solution:**
1. Check `$THEME_ROOT/.workflow/progress.md` — it should have a complete record
2. Check for phase deliverables:
   - Phase 1: `design-tokens-map.md`, `component-inventory.md`, `reference-pages-catalog.md`, `page.clone-*.json` templates
   - Phase 2: `snippets/{prefix}tokens.liquid`, `assets/{prefix}base.css`, `assets/{prefix}primitives.css`, updated `settings_schema.json`, `page.design-system.json` template, `design-system-handoff.md`
   - Phase 3: gap analysis documents, updated component inventory
   - Phase 4: real page templates, `store-readiness.md`, `navigation-config.md`, implementation screenshots
   - Phase 5: `qa-*.md` reports, `final-screenshots/`, `deviations.md`, `final-report.md`
3. If a phase is missing deliverables, go back and complete it

---

## Next Steps After Completion

When the workflow is complete, the **human operator** (not the agent) decides what to do next:

1. **Review locally:** Run `shopify theme dev -e <variant>` from the **repo root** and manually test the store
2. **Document any customizations:** If you made changes not covered by the workflow, document them
3. **Archive the workflow files:** Consider moving `$THEME_ROOT/.workflow/` to a safe location for reference
4. **Share the design system:** The design system files (`assets/design-system-*.css` and reference page) can be reused in future projects

> **Deploying to Shopify is a human-only action.** The agent's job ends when local files are complete and verified. The human may then choose to run `shopify theme push` or `git push` at their discretion — those commands are never part of this workflow.

---

## Document Organization

All workflow documentation follows this structure:

- **ENTRY.md** (this file) — High-level overview and quick reference
- **phases/phase-N-*.md** — Detailed instructions for each phase
- **skills/*.md** — Reusable skill documents (code architecture, visual comparison, etc.)
- **templates/*.md** — Templates for deliverables (token maps, comparison logs, etc.)

**When working through the phases, refer to:**
- The phase document (detailed step-by-step instructions)
- The relevant skill documents (methodology and standards)
- The templates (structure for deliverables)
- This ENTRY.md (quick lookup, troubleshooting, context management)

---

## Summary

**You are here:** About to start Workflow 2: Design Replication & System Build

**What you'll do:**
1. Pre-flight validation and setup
2. Analyze reference and extract design tokens; create clone pages (Phase 1)
3. Build design system foundation (tokens, base styles, primitives) (Phase 2)
4. Identify gaps and fill missing components (Phase 3)
5. Build real Shopify pages using the design system (Phase 4)
6. Run final QA and refinement (Phase 5)

**What you'll have when done:**
- A Shopify Horizon theme that matches your reference design perfectly
- A documented, reusable design system with tokens and components
- Clean, maintainable CSS and Liquid code
- Design system documentation
- An audit trail in `.workflow/` showing how it was built

**Before you start:**
1. Ensure all required inputs are available
2. Read all five skill documents
3. Run the validation checklist
4. Begin Phase 1

**The workflow is fully autonomous:** Once you've started, each phase builds on the previous one. Follow the detailed phase instructions, use sub-agents for large tasks, and refer back to this document for troubleshooting.

Good luck. Now go read Phase 1.
