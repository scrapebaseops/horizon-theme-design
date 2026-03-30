# Workflow 2: Design Replication & System Build — ENTRY POINT

## Purpose

This is the main autonomous workflow for replicating a reference website's design into a Shopify Horizon theme and building a complete, documented design system.

**You are reading this because:** You have a reference design (running website, codebase, or screenshots) and content plans from Workflow 1, and you want to autonomously transform both into a pixel-perfect Horizon implementation with a reusable design system.

**This workflow is:**
- Autonomous: Designed to run with minimal human intervention once configured
- Iterative: Uses screenshot comparison loops for gradual refinement
- Comprehensive: Produces not just code, but a documented design system
- Structured: Broken into 7 phases with clear completion criteria for each

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
- **URL:** `http://localhost:3000` or `https://example.com/` (a running website)

**For codebase (directory):**
- Verify the directory exists and contains the reference code/assets
- If it's a Node.js project (like Lexington), verify `package.json` exists
- Later, you may need to start a dev server for it (see Pre-Flight section)

**For screenshots (directory):**
- Must contain `.png`, `.jpg`, or `.jpeg` files
- Should have a clear naming convention (e.g., `homepage.png`, `product-page.png`, `collection.png`)
- Organize by page/section for clarity during comparison

**For URL (running site):**
- Must be accessible from your machine (respond to `curl` or browser)
- Should allow taking screenshots without authentication
- If authentication is required, document credentials separately (not in this workflow)

**Verification:**
```bash
# For directory:
ls -la $REFERENCE_PATH

# For URL (running site):
curl -s http://your-reference-url | head -20
```

### 3. `CONTENT_PLANS_PATH` — Path to Content Plans from Workflow 1

This is the output directory from Workflow 1.

**Format:** Absolute path to the directory containing content plan markdown files

**Expected contents:**
- `site-content-map.md` (overview of all pages and components)
- `site-structure.md` (pages, templates, navigation plan)
- `brand-analysis.md` (brand traits and CRO priorities)
- `_handoff-brief.md` (distilled brand context — compact reference for sub-agents)
- `gap-analysis.md` (what exists vs. needs building in Horizon)
- `pages/` subdirectory containing per-page specs (e.g., `pages/index.md`, `pages/product.md`, `pages/collection.md`)

**Requirements:**
- All files must be readable
- Must contain `site-content-map.md` and at least one page spec in `pages/`

**If you don't have this:**
→ Run Workflow 1 first. See `workflow-1-content-planning/ENTRY.md`.

**Verification:**
```bash
ls -la $CONTENT_PLANS_PATH/*.md
ls -la $CONTENT_PLANS_PATH/pages/*.md
cat $CONTENT_PLANS_PATH/site-content-map.md | head -30
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
- [ ] `REFERENCE_PATH` points to a valid reference (codebase, screenshots, or URL)
- [ ] `CONTENT_PLANS_PATH` contains `site-content-map.md` and page specs in `pages/` from Workflow 1
- [ ] You have write access to `$THEME_ROOT`
- [ ] You have the Shopify CLI installed (`shopify --version`)
- [ ] You have Node.js installed (`node --version`)
- [ ] You have `git` installed (`git --version`)
- [ ] Disk space: At least 500 MB free (for screenshots, build artifacts, node_modules)
- [ ] Network: Can access `REFERENCE_PATH` (if a URL)

If any check fails, resolve it before proceeding.

---

## Pre-Flight Phase (Setup & Validation)

Before the 7 phases begin, perform these setup steps.

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
  test -d "$REFERENCE_PATH" || { echo "FAIL: Directory doesn't exist"; exit 1; }
  echo "✓ REFERENCE_PATH directory exists"
fi

echo "Validating CONTENT_PLANS_PATH: $CONTENT_PLANS_PATH"
test -d "$CONTENT_PLANS_PATH" || { echo "FAIL: Directory doesn't exist"; exit 1; }
test -f "$CONTENT_PLANS_PATH/site-content-map.md" || { echo "FAIL: site-content-map.md not found"; exit 1; }
test -d "$CONTENT_PLANS_PATH/pages" || { echo "FAIL: pages/ subdirectory not found"; exit 1; }
ls "$CONTENT_PLANS_PATH/pages/"*.md > /dev/null 2>&1 || { echo "FAIL: No .md files found in pages/"; exit 1; }
echo "✓ CONTENT_PLANS_PATH is valid"

echo ""
echo "All inputs validated successfully."
```

**Decision:** If any validation fails, stop and fix the input before proceeding. Do not skip validation.

### Step 2: Read Required Skills

Before the phases begin, read these skill documents in full. These are the rules that govern all work in this workflow.

1. **`skills/code-architecture/SKILL.md`**
   - Governs how CSS, Liquid, and JSON are organized
   - Defines naming conventions and file structure
   - ALL code changes must follow these rules

2. **`skills/visual-comparison/SKILL.md`**
   - Defines the methodology for screenshot comparison
   - Specifies viewport sizes and zoom levels
   - Defines "pixel-perfect" criteria

3. **`skills/design-system-build/SKILL.md`**
   - Governs how to extract and document design tokens
   - Defines the component layer architecture
   - Specifies design system reference page structure

4. **`skills/code-quality/SKILL.md`**
   - Defines linting rules and code quality standards
   - Specifies theme-check configuration
   - Governs CSS and Liquid formatting

5. **`skills/dev-server-management/SKILL.md`**
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
   - YES: Execute `shopify theme dev` for `THEME_ROOT` now (see `skills/dev-server-management/SKILL.md`)
   - NO: Start it manually before proceeding, then provide the URL

3. **Do you have `REFERENCE_SERVER_URL` provided?**
   - YES: Reference server is ready, proceed
   - NO: Continue to decision 4

4. **Is your reference a URL or running site?**
   - YES: You already have a server, record the URL
   - NO: Is it a codebase that can be run locally (contains `package.json`, Dockerfile, etc.)?
     - YES: Start its dev server now (see `skills/dev-server-management/SKILL.md`)
     - NO: Reference is static screenshots, proceed without a reference server

**Action:** Based on above, either:
- Note down `THEME_SERVER_URL` and `REFERENCE_SERVER_URL`
- OR start servers and record the URLs when ready

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

**Completion criteria:**
- Design tokens comprehensively documented
- Clone pages created for all reference pages
- Visual parity achieved at all viewports (desktop 1440px, tablet 768px, mobile 390px)
- All components identified and cataloged

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
   - Compare real pages against clone pages—do they match?
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
- `$THEME_ROOT/.workflow/final-qa-report.md` — Detailed QA results
- `$THEME_ROOT/.workflow/screenshots/final-*.png` — Final screenshots at all viewports
- `$THEME_ROOT/.workflow/deviations.md` — Any intentional deviations from the reference and why

**Completion criteria:**
- All pages match the reference design at desktop, tablet, and mobile
- theme-check passes with zero errors
- No console errors in browser
- All interactive states work correctly
- All theme settings customize the design correctly
- Code follows `skills/code-architecture/SKILL.md` standards

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

6. **Code Quality**
   - `shopify theme check` passes with zero errors
   - CSS organized according to `skills/code-architecture/SKILL.md`
   - No unused CSS or JavaScript

7. **Functionality**
   - All interactive states (hover, focus, active, disabled) work correctly
   - All form inputs validate correctly
   - Theme customizer allows merchants to customize colors and fonts

8. **Documentation & Artifacts**
   - `$THEME_ROOT/.workflow/progress.md` shows all phases complete
   - All phase deliverables documented
   - `.shopifyignore` includes `.workflow/`
   - Theme is ready to push to Shopify (but not automatically pushed)

---

## Working Rules

Follow these rules throughout the entire workflow. They are non-negotiable.

### Rule 1: Never Push to Shopify

All work happens locally. The workflows never automatically `git push` or `shopify theme push`. You always make that decision manually.

**Why:** This gives you full control. You can review changes, test locally, and decide when to sync.

**How to verify:** After completing the workflow, manually review the theme changes before pushing.

### Rule 2: Follow Code Architecture Skill

Every file edit must follow the rules in `skills/code-architecture/SKILL.md`. This includes:
- CSS organization (tokens, base, components, utilities, page-specific)
- Naming conventions for CSS classes
- Liquid component structure
- JSON template organization
- File placement and naming

**Why:** Consistency prevents bugs and makes maintenance easier.

**How to verify:** Before completing each phase, re-read the code architecture skill and audit your changes.

### Rule 3: Use Visual Comparison Methodology

All screenshot comparisons must follow the approach in `skills/visual-comparison/SKILL.md`. This includes:
- Specific viewport sizes (1440px, 768px, 390px)
- Granular zoom levels for detailed inspection
- Decision criteria for "close enough" vs. needs more work
- Prioritization (desktop first, then tablet, then mobile)

**Why:** Consistent methodology ensures fair, reproducible comparisons.

**How to verify:** Document all screenshot comparisons in `$THEME_ROOT/.workflow/comparisons/`

### Rule 4: Run Code Quality Checks Regularly

After each major phase (and certainly before completion), run:
```bash
shopify theme check $THEME_ROOT
```

Zero errors required for completion. (Warnings are OK.)

**Why:** theme-check catches Liquid errors, missing required files, and best practice violations.

**How to verify:** Check Phase 7 QA report includes theme-check output.

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

Do NOT delete or modify clone pages (e.g., `page.clone-homepage.json`) after Phase 2. Use them as a reference during later phases to verify your design system implementation matches the original design.

**Why:** Clone pages prove the design can be replicated and serve as a visual regression test.

**How to verify:** Clone pages should still exist at the end of the workflow.

---

## Context Management

This workflow is designed to run across multiple AI agent sessions. Use these guidelines to manage context:

### When to Spawn a Sub-Agent

Spawn a sub-agent when:
- You're approaching 80% of your context window and still have significant work left
- A phase is large enough to be a standalone project (e.g., 5+ pages to clone)
- You're working on multiple unrelated tasks that can be parallelized

### How to Spawn a Sub-Agent

1. **Create clear handoff instructions:**
   ```markdown
   # Sub-Agent Handoff: Phase 2 Clone Pages (Continued)

   **What to do:**
   Build clone pages for: [list pages]
   Follow Phase 2 instructions in: phases/phase-2-design-system-extraction.md

   **What's already done:**
   - [list completed pages]
   - [reference previous work]

   **Inputs:**
   - THEME_ROOT: [path]
   - REFERENCE_PATH: [path]
   - REFERENCE_SERVER_URL: [url if applicable]

   **Output location:**
   Save work to: $THEME_ROOT/templates/page.clone-*.json
   Document progress in: $THEME_ROOT/.workflow/progress.md
   ```

2. **Provide the sub-agent with:**
   - Clear task scope (what to build, what not to touch)
   - Input paths and URLs
   - Reference to detailed instructions (phase docs, skills)
   - Expected deliverables
   - Location of previous work/progress logs

3. **When the sub-agent completes:**
   - Verify the deliverables exist and are correct
   - Merge their progress into your progress.md
   - Continue to the next phase

### Token Budget

Phases 1–3 should fit in a single session (80–100K tokens).
Phase 2 (clone pages) is the longest and may require multiple sessions or sub-agents.
Phases 4–7 should fit in a single session each.

Total budget: ~200K tokens for entire workflow.

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
2. Check you're in the correct directory: `pwd` should be theme root
3. Check port is available: `lsof -i :9000` (if port 9000 is in use, specify a different one)
4. Refer to `skills/dev-server-management/SKILL.md` for detailed troubleshooting

### Problem: Screenshots Look Blurry or Incorrect Size

**Symptom:** Visual comparisons are hard to read or viewports don't match expected sizes.

**Solution:**
1. Verify viewport sizes in visual-comparison skill match yours: should be 1440px, 768px, 390px
2. Ensure you're using a consistent screenshot tool (Chrome DevTools, Playwright, Puppeteer)
3. Zoom to 100% in the browser before taking screenshots
4. Use the granular zoom methodology in visual-comparison skill (screenshot, then zoom in)

### Problem: theme-check Fails with Errors

**Symptom:** `shopify theme check` reports errors preventing completion.

**Solution:**
1. Read the error message carefully
2. Check `skills/code-quality/SKILL.md` for the relevant rule
3. Fix the offending code
4. Re-run `shopify theme check`
5. Common errors: missing required template fields, invalid JSON, undefined Liquid variables

### Problem: Phase Takes Much Longer Than Expected

**Symptom:** You're 5 hours into Phase 2 and only halfway done cloning pages.

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
   - Phase 1: `design-tokens-map.md`, `component-inventory.md`, `reference-pages-catalog.md`
   - Phase 2: `page.clone-*.json` templates, `clone-pages-build-log.md`
   - Phase 3: `design-system-*.css` files, updated `settings_schema.json`
   - Phase 4: `page.design-system.json` template
   - Phases 5–7: corresponding log files in `.workflow/`
3. If a phase is missing deliverables, go back and complete it

---

## Next Steps After Completion

When the workflow is complete:

1. **Review locally:** Run `shopify theme dev $THEME_ROOT` and manually test the store
2. **Push to dev store (optional):** `shopify theme push -e my-variant` (after reviewing changes)
3. **Document any customizations:** If you made changes not covered by the workflow, document them
4. **Archive the workflow files:** Consider moving `$THEME_ROOT/.workflow/` to a safe location for reference
5. **Share the design system:** The design system files (`assets/design-system-*.css` and reference page) can be reused in future projects

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
