# Code Quality Skill

## Overview

This skill defines the code quality standards and automated checks that ensure the Shopify theme is maintainable, performant, and follows best practices. Run these checks regularly to catch issues early and maintain high code standards.

The core principle is: **catch problems before they become expensive to fix.**

## Shopify Theme Check

This is the primary automated quality tool. Run it frequently, especially after major changes.

### What It Does

`shopify theme check` runs a suite of automated checks on your theme:
- Liquid syntax validation (missing tags, deprecated filters)
- JSON schema validation (settings, templates, section schemas)
- Performance checks (parser-blocking resources, missing image dimensions)
- Accessibility checks (alt text on images, button labels)
- Translation key checks (missing or unused localization keys)
- Security checks (XSS risks, unsafe eval usage)
- Best practice checks (using deprecated features)

### Running the Check

```bash
cd /path/to/theme
shopify theme check
```

### Expected Output

**If all checks pass:**
```
Checking theme...
✓ Your theme is looking good!
```

**If there are errors:**
```
Checking theme...
✗ 5 errors found:

  Error #1 (liquid-tag-not-found)
    File: sections/sandstone-hero.liquid, Line 45
    Description: Unknown tag 'ifx'. Did you mean 'if'?

  Error #2 (translation-key-does-not-exist)
    File: config/locales/en.json
    Description: Key 'settings.foo' does not exist in the English translations.

  Error #3 (missing-required-args)
    File: snippets/sandstone-button.liquid, Line 3
    Description: Missing required argument 'text' for snippet 'sandstone-button'.

  ... (more errors)

Total: 5 errors, 0 warnings
```

### Fixing Errors

Address errors in order of severity:

**Critical errors (must fix):**
- Liquid syntax errors (typos in tags, filters)
- JSON validation errors (malformed JSON)
- Missing required fields in section schemas
- Translation key errors

**Important errors (should fix):**
- Performance issues (parser-blocking resources, missing image dimensions)
- Accessibility issues (missing alt text)
- Security risks (unsafe filters)

**Warnings (nice to fix):**
- Deprecated Liquid tags (still work but should migrate)
- Unused translation keys
- Code style issues

### Ignoring Warnings

If a warning is not applicable to your theme, you can configure the check to ignore it.

**File:** `.shopifyignore` (in theme root)

```
{
  "ignores": [
    {
      "rule": "missing-alt-text",
      "glob": "templates/page.json"
    },
    {
      "rule": "deprecated-tag",
      "glob": "sections/**/*.liquid"
    }
  ]
}
```

**Only ignore if you have a good reason.** Generally, fix the issue instead.

### When to Run

Run after:
- Completing any major CSS changes
- Adding or modifying a section or snippet
- After editing JSON templates or schemas
- Before declaring any phase complete
- If something visually breaks unexpectedly (might be a code issue)

**Schedule:** Run at least once daily during active development.

## CSS Organization Checks

Verify periodically that CSS is organized correctly.

### No Inline Styles Check

Inline styles should never appear in Liquid templates.

**Wrong:**
```liquid
<h1 style="font-size: 28px; color: #0066CC;">{{ section.settings.title }}</h1>
```

**Right:**
```liquid
<h1 class="sandstone-hero__title">{{ section.settings.title }}</h1>
```

With CSS:
```css
.sandstone-hero__title {
  font-size: var(--font-size-3xl);
  color: var(--color-primary);
}
```

**Reason:** Inline styles can't be overridden, break caching, and are hard to maintain.

**How to check:**
```bash
# Find all inline styles in templates
grep -r 'style="' /path/to/theme/sections
grep -r 'style="' /path/to/theme/snippets
grep -r 'style="' /path/to/theme/templates
```

Fix by moving the styles to CSS classes.

### No !important Check

The `!important` flag is a code smell. Avoid it unless absolutely necessary.

**Wrong:**
```css
.sandstone-button {
  background-color: #0066CC !important;
}
```

**Right:**
```css
.sandstone-button {
  background-color: var(--color-primary);
}
```

**When !important might be necessary:**
```css
/* If a 3rd-party library has overly specific selectors that can't be overridden */
.sandstone-override {
  background-color: red !important;
}
```

**Document why:**
```css
/* Using !important to override 3rd-party widget library styles */
.sandstone-calendar-override {
  background-color: var(--color-primary) !important;
}
```

**How to check:**
```bash
grep -r '!important' /path/to/theme/assets
# Should return very few (0-2) results
```

Fix by reorganizing CSS specificity or using more specific selectors.

### No Magic Numbers Check

All spacing, sizing, and color values must come from design tokens. No hardcoded values.

**Wrong:**
```css
.sandstone-button {
  padding: 12px 16px;
  background-color: #0066CC;
  border-radius: 8px;
}
```

**Right:**
```css
.sandstone-button {
  padding: var(--space-sm) var(--space-md);
  background-color: var(--color-primary);
  border-radius: var(--border-radius-md);
}
```

**Reason:** Magic numbers make the design system hard to maintain. If you change `--space-md` to 20px, all uses update automatically. Hardcoded values don't.

**How to check:**
```bash
# Find hardcoded colors (hex values)
grep -r '#[0-9A-Fa-f]\{3,6\}' /path/to/theme/assets

# Find hardcoded sizes (px values)
grep -r '[0-9]\+px' /path/to/theme/assets

# Find hardcoded shadows
grep -r 'box-shadow.*[0-9]\+' /path/to/theme/assets
```

Convert all to tokens. If a value doesn't fit the existing tokens, add a new token to the scale.

### Duplicate CSS Rules Check

CSS should not be duplicated across files or within a file.

**Wrong:**
```css
/* In assets/sandstone-primitives.css */
.sandstone-button {
  border-radius: var(--border-radius-md);
}

/* Later in the same file */
.sandstone-button {
  padding: var(--space-md);
}
```

**Right:**
```css
.sandstone-button {
  border-radius: var(--border-radius-md);
  padding: var(--space-md);
}
```

**How to check:**
```bash
# Visual scan of CSS files for duplicate selectors
cat /path/to/theme/assets/sandstone-primitives.css | grep '^\.'
# Look for any selector appearing twice
```

**Better tool:** Use CSS linter
```bash
npm install -D stylelint stylelint-config-standard

# Create .stylelintrc.json
echo '{
  "extends": "stylelint-config-standard"
}' > .stylelintrc.json

stylelint "assets/**/*.css"
```

### Prefix Consistency Check

All custom classes must use the same prefix (e.g., `sandstone-`).

**Wrong:**
```css
.sandstone-button { }
.brand-card { }
.custom-form { }
```

**Right:**
```css
.sandstone-button { }
.sandstone-card { }
.sandstone-form { }
```

**How to check:**
```bash
# Extract all custom classes
grep -r '\.\w\+' /path/to/theme/assets | grep -o '\.[a-zA-Z_-]*' | sort | uniq
# Scan for different prefixes
```

All should start with `sandstone-` (or whatever your chosen prefix is).

### CSS Load Order Check

CSS must load in correct order: tokens → base → primitives.

**Check the file:**
```bash
cat /path/to/theme/snippets/stylesheets.liquid
```

**Expected order:**
1. Horizon base.css
2. Custom tokens.css
3. Custom base.css
4. Custom primitives.css

**Wrong order example:**
```liquid
<!-- WRONG - primitives before tokens! -->
<link rel="stylesheet" href="{{ 'sandstone-primitives.css' | asset_url }}">
<link rel="stylesheet" href="{{ 'sandstone-tokens.css' | asset_url }}">
```

**Right order:**
```liquid
<!-- RIGHT -->
<link rel="stylesheet" href="{{ 'sandstone-tokens.css' | asset_url }}">
<link rel="stylesheet" href="{{ 'sandstone-base.css' | asset_url }}">
<link rel="stylesheet" href="{{ 'sandstone-primitives.css' | asset_url }}">
```

If order is wrong, CSS won't override correctly and components will have unexpected styling.

## Liquid Quality Checks

Verify Liquid code is well-structured and maintainable.

### Section Schema Completeness

Every section must have a proper `{% schema %}` block.

**Minimum required:**
```json
{
  "name": "My Section",
  "settings": [],
  "blocks": [],
  "presets": [
    {
      "name": "My Section"
    }
  ]
}
```

**Check each section:**
- [ ] Has `name` field
- [ ] Has `settings` array (can be empty)
- [ ] Has `blocks` array (can be empty)
- [ ] Has `presets` array (with at least one preset)
- [ ] Each setting has `id`, `type`, `label`, and `default`
- [ ] Each block has `type` and `name`
- [ ] All setting types are valid (no typos like `"tex"` instead of `"text"`)

**Tool:** `shopify theme check` catches most of these.

### No Hardcoded Content Check

All user-editable content must be a setting. Do not hardcode text, images, or links.

**Wrong:**
```liquid
<h2>Our Features</h2>
<p>We offer amazing features</p>
<img src="/cdn/shop/my-image.jpg" alt="Feature">
<a href="/collections/all">Shop All</a>
```

**Right:**
```liquid
<h2>{{ section.settings.title }}</h2>
<p>{{ section.settings.description }}</p>
<img src="{{ section.settings.image | img_url }}" alt="{{ section.settings.image.alt }}">
<a href="{{ section.settings.cta_link }}">{{ section.settings.cta_text }}</a>
```

With schema:
```json
{
  "settings": [
    {"type": "text", "id": "title", "label": "Title", "default": "Our Features"},
    {"type": "richtext", "id": "description", "label": "Description", "default": "We offer amazing features"},
    {"type": "image_picker", "id": "image", "label": "Image"},
    {"type": "url", "id": "cta_link", "label": "CTA Link"},
    {"type": "text", "id": "cta_text", "label": "CTA Text", "default": "Shop All"}
  ]
}
```

**Why:** Hardcoded content can't be edited by merchants. The entire point of a theme is to be customizable.

**How to check:**
```bash
# Find hardcoded text in sections
grep -r '"[A-Z].*[a-z]' /path/to/theme/sections/*.liquid | grep -v settings | grep -v "id\|type\|label"
```

Any hardcoded content should be a setting instead.

### Snippet Usage (DRY Principle)

Repeated markup should be in a snippet, not copied across multiple sections.

**Wrong (duplication):**
```liquid
<!-- In sections/hero.liquid -->
<a href="{{ link }}" class="sandstone-button sandstone-button--primary">
  {{ text }}
</a>

<!-- In sections/features.liquid -->
<a href="{{ link }}" class="sandstone-button sandstone-button--primary">
  {{ text }}
</a>

<!-- In sections/footer.liquid -->
<a href="{{ link }}" class="sandstone-button sandstone-button--primary">
  {{ text }}
</a>
```

**Right (snippet):**
```liquid
<!-- In snippets/sandstone-button.liquid -->
<a href="{{ href }}" class="sandstone-button sandstone-button--{{ variant }}">
  {{ text }}
</a>

<!-- In sections/hero.liquid -->
{% render 'sandstone-button', href: section.settings.cta_link, text: section.settings.cta_text, variant: 'primary' %}

<!-- In sections/features.liquid -->
{% render 'sandstone-button', href: section.settings.link, text: section.settings.text, variant: 'primary' %}

<!-- In sections/footer.liquid -->
{% render 'sandstone-button', href: footer_link, text: 'Footer Link', variant: 'secondary' %}
```

**Why:** If you need to fix a bug in button rendering, fix it once in the snippet instead of in 10 sections.

**How to check:**
```bash
# Find repeated markup patterns
# Look for sections with very similar HTML structure
ls /path/to/theme/sections
# Visually scan for patterns

# Or search for repeated class patterns
grep -h 'class="sandstone' /path/to/theme/sections/*.liquid | sort | uniq -c
# If a pattern appears many times, it should probably be a snippet
```

Extract repeated patterns into snippets.

## JSON Template Checks

Verify JSON templates are valid and reference real sections.

### Valid JSON Check

```bash
# Verify all templates are valid JSON
cd /path/to/theme/templates
for file in *.json; do
  echo "Checking $file..."
  jq empty "$file" 2>&1 || echo "INVALID: $file"
done
```

Any invalid JSON will break the template.

### Section References Check

Every section referenced in a template must exist as a file.

**In template:** `templates/home.json`
```json
{
  "sections": {
    "hero": {
      "type": "sandstone-hero"
    }
  }
}
```

**File must exist:** `sections/sandstone-hero.liquid`

**Check:**
```bash
# Extract all section types from templates
grep -h '"type"' /path/to/theme/templates/*.json | grep -o '"[^"]*"' | sort | uniq

# Verify each exists
for section_type in sandstone-hero sandstone-feature-grid ...; do
  if [ ! -f "/path/to/theme/sections/${section_type}.liquid" ]; then
    echo "MISSING: sections/${section_type}.liquid"
  fi
done
```

Every referenced section must exist.

### Block Type Matching Check

If a template has blocks, the block type must match a defined block type.

**In template:**
```json
{
  "type": "feature-grid",
  "blocks": [
    {
      "type": "feature"
    }
  ]
}
```

**Block type must exist in section schema:**
```liquid
<!-- In sections/sandstone-feature-grid.liquid -->
{% schema %}
{
  "blocks": [
    {
      "type": "feature",
      "name": "Feature"
    }
  ]
}
{% endschema %}
```

If the template has a block type that the section doesn't define, it will be ignored or error.

**How to check:** Manually review templates and schemas, or trust `shopify theme check` to catch this.

## Performance Checks

Verify theme performance is acceptable.

### CSS File Size Check

Large CSS files impact page load time.

```bash
# Check CSS file sizes
ls -lh /path/to/theme/assets/*.css

# Flag if any file > 50KB
```

**If a CSS file is > 50KB:**
1. Check for unused CSS (DCE - dead code elimination)
2. Split into multiple files if needed
3. Review for inefficient selectors

**Typical sizes:**
- tokens.css: 1-5 KB
- base.css: 5-15 KB
- primitives.css: 15-40 KB
- Total custom CSS: 20-60 KB

If you exceed 60 KB, audit the CSS for optimization opportunities.

### JavaScript Size Check

Large JS files impact page load time.

```bash
# Check JS file sizes
ls -lh /path/to/theme/assets/*.js
```

**Each file should be < 100 KB.** If any JS file is larger:
1. Check if it's a vendor library (third-party code)
2. If custom code, consider splitting or optimizing
3. Minify if not already minified

### Missing Image Dimensions Check

Images without explicit dimensions cause layout shift.

**Wrong:**
```liquid
<img src="{{ image | img_url }}" alt="...">
```

**Right:**
```liquid
<img src="{{ image | img_url: '300x300' }}" alt="..." width="300" height="300">
```

**Or with picture element:**
```liquid
<picture>
  <source srcset="{{ image | img_url: '300x300' }} 1x, {{ image | img_url: '600x600' }} 2x" media="(max-width: 767px)">
  <source srcset="{{ image | img_url: '600x600' }} 1x, {{ image | img_url: '1200x1200' }} 2x" media="(min-width: 768px)">
  <img src="{{ image | img_url: '600x600' }}" alt="{{ image.alt }}" width="600" height="600">
</picture>
```

`shopify theme check` flags missing dimensions. Fix by adding explicit `width` and `height` attributes.

### Parser-Blocking Resources Check

CSS and JS should not block page rendering.

**Wrong:**
```liquid
<link rel="stylesheet" href="{{ 'critical.css' | asset_url }}">
```

**Right (preload critical CSS, defer non-critical):**
```liquid
<link rel="preload" href="{{ 'critical.css' | asset_url }}" as="style">
<link rel="stylesheet" href="{{ 'critical.css' | asset_url }}">

<link rel="stylesheet" href="{{ 'non-critical.css' | asset_url }}" media="print" onload="this.media='all'">

<script src="{{ 'non-critical.js' | asset_url }}" defer></script>
```

`shopify theme check` flags parser-blocking JS. For critical CSS, you must manage it manually.

## Naming Convention Checks

Verify naming is consistent throughout the theme.

### File Naming Check

**Section files:**
- Should be: `sections/sandstone-<feature>.liquid`
- Wrong: `sections/hero.liquid`, `sections/myHero.liquid`

**Snippet files:**
- Should be: `snippets/sandstone-<name>.liquid`
- Wrong: `snippets/button.liquid`, `snippets/btn-primary.liquid`

**CSS files:**
- Should be: `assets/sandstone-<layer>.css`
- Wrong: `assets/styles.css`, `assets/theme-base.css`

**How to check:**
```bash
ls /path/to/theme/sections | grep -v 'sandstone'
# Should return nothing (no non-prefixed sections)

ls /path/to/theme/snippets | grep -v 'sandstone'
# Should return nothing (no non-prefixed snippets)

ls /path/to/theme/assets/*.css | grep -v 'sandstone'
# Should return only Horizon base.css
```

Rename any files that don't follow the convention.

### Class Naming Check

All CSS classes should use BEM-like naming with the prefix.

**Pattern:** `.sandstone-component--modifier__element`

**Check:**
```bash
# Extract all classes from CSS
grep -h '\.' /path/to/theme/assets/*.css | grep -o '\.\w[^ {]*' | sort | uniq

# All should start with .sandstone-
# None should have camelCase (should be kebab-case)
# None should have random underscores or inconsistent separators
```

Examples of good naming:
- `.sandstone-button`
- `.sandstone-button--primary`
- `.sandstone-button--lg`
- `.sandstone-button__icon`

Examples of bad naming:
- `.button` (missing prefix)
- `.sandstone_button` (wrong separator)
- `.sandstoneButton` (camelCase)
- `.btn-primary` (wrong prefix)

## Automated Formatting: Prettier + Liquid Plugin

### Setup

```bash
cd THEME_ROOT
npm init -y  # if no package.json exists
npm install --save-dev prettier @shopify/prettier-plugin-liquid
```

### Configuration

Create `.prettierrc` in THEME_ROOT:

```json
{
  "plugins": ["@shopify/prettier-plugin-liquid"],
  "printWidth": 120,
  "tabWidth": 2,
  "useTabs": false,
  "singleQuote": false,
  "liquidSingleQuote": true,
  "indentSchema": false
}
```

### Usage

```bash
# Format all Liquid files
npx prettier --write "sections/**/*.liquid" "snippets/**/*.liquid" "layout/**/*.liquid"

# Check formatting without changing files (useful for CI)
npx prettier --check "sections/**/*.liquid" "snippets/**/*.liquid"
```

### When to Run
- After creating or editing any Liquid file
- Before declaring any phase complete
- As a final step before any code review

## Automated CSS Linting: Stylelint

### Setup

```bash
cd THEME_ROOT
npm install --save-dev stylelint stylelint-config-standard
```

### Configuration

Create `.stylelintrc.json` in THEME_ROOT:

```json
{
  "extends": "stylelint-config-standard",
  "rules": {
    "declaration-no-important": true,
    "color-no-hex": true,
    "comment-empty-line-before": null,
    "no-descending-specificity": null,
    "selector-class-pattern": null,
    "custom-property-pattern": null
  }
}
```

Note: `color-no-hex` will flag any hardcoded hex colors — these should all be CSS custom properties from the token layer. You can disable this rule temporarily during initial development and enable it during QA phases.

### Usage

```bash
# Lint all CSS files
npx stylelint "assets/**/*.css"

# Auto-fix where possible
npx stylelint "assets/**/*.css" --fix
```

### Custom Design Token Enforcement

To check that no hardcoded values are being used when tokens exist, run these grep checks:

```bash
# Find hardcoded hex colors (should be 0 in custom CSS files, ok in tokens file)
grep -n '#[0-9A-Fa-f]\{3,6\}' assets/*base.css assets/*primitives.css

# Find hardcoded pixel values for spacing (should use var(--space-*))
grep -n '[0-9]\+px' assets/*base.css assets/*primitives.css | grep -v 'var(' | grep -v '\/\*' | grep -v '//'

# Find !important usage (should be 0-2 max with documented reasons)
grep -cn '!important' assets/*.css

# Verify all custom classes use the correct prefix
grep -oh '\.[a-zA-Z][a-zA-Z0-9_-]*' assets/*base.css assets/*primitives.css | sort -u | grep -v '^\.' | head -20
```

## Full Automated Quality Check Script

Create this as `THEME_ROOT/.workflow/tools/quality-check.sh`:

```bash
#!/bin/bash
# Run all quality checks. Exit code 0 = all pass, 1 = issues found.
set -e

THEME_ROOT="${1:-.}"
cd "$THEME_ROOT"
ISSUES=0

echo "=== Shopify Theme Check ==="
if shopify theme check 2>&1 | grep -q "error"; then
  echo "FAIL: Theme check found errors"
  ISSUES=$((ISSUES + 1))
else
  echo "PASS: Theme check clean"
fi

echo ""
echo "=== Prettier Check ==="
if npx prettier --check "sections/**/*.liquid" "snippets/**/*.liquid" "layout/**/*.liquid" 2>/dev/null; then
  echo "PASS: All files formatted"
else
  echo "WARN: Some files need formatting (run: npx prettier --write ...)"
  ISSUES=$((ISSUES + 1))
fi

echo ""
echo "=== CSS Lint ==="
if npx stylelint "assets/**/*.css" 2>/dev/null; then
  echo "PASS: CSS lint clean"
else
  echo "WARN: CSS lint issues found"
  ISSUES=$((ISSUES + 1))
fi

echo ""
echo "=== Hardcoded Values Check ==="
HEX_COUNT=$(grep -rn '#[0-9A-Fa-f]\{3,6\}' assets/*base.css assets/*primitives.css 2>/dev/null | wc -l)
IMPORTANT_COUNT=$(grep -rn '!important' assets/*.css 2>/dev/null | wc -l)
echo "Hardcoded hex colors in base/primitives: $HEX_COUNT (target: 0)"
echo "!important usage: $IMPORTANT_COUNT (target: 0-2)"
if [ "$HEX_COUNT" -gt 0 ] || [ "$IMPORTANT_COUNT" -gt 2 ]; then
  ISSUES=$((ISSUES + 1))
fi

echo ""
echo "=== JSON Validation ==="
JSON_ERRORS=0
for f in templates/*.json config/*.json; do
  if ! python3 -c "import json; json.load(open('$f'))" 2>/dev/null; then
    echo "FAIL: Invalid JSON: $f"
    JSON_ERRORS=$((JSON_ERRORS + 1))
  fi
done
if [ "$JSON_ERRORS" -eq 0 ]; then
  echo "PASS: All JSON files valid"
else
  ISSUES=$((ISSUES + 1))
fi

echo ""
echo "================================"
if [ "$ISSUES" -eq 0 ]; then
  echo "ALL CHECKS PASSED"
  exit 0
else
  echo "$ISSUES issue(s) found"
  exit 1
fi
```

```bash
chmod +x .workflow/tools/quality-check.sh
```

### When to Run the Full Quality Check
- After completing each phase of Workflow 2
- Before declaring any phase "complete"
- After any major refactoring
- As the final step before handoff

## When to Run Code Quality Checks

**Daily:**
- After major CSS changes
- After creating/modifying a section
- Before declaring a phase complete
- If something breaks unexpectedly

**Checklist before finishing for the day:**
```bash
cd /path/to/theme

# Run main check
shopify theme check
# Expect: "Your theme is looking good!"

# Check CSS organization
grep -r '!important' assets/
grep -r '#[0-9A-Fa-f]\{3,6\}' assets/
# Expect: 0-2 matches (only documented exceptions)

# Check naming conventions
ls sections | grep -v sandstone
ls snippets | grep -v sandstone
# Expect: no output

# Check templates are valid
jq empty templates/*.json
# Expect: no errors
```

## Quick Checklist

Use this before considering any work complete:

### Shopify Theme Check
- [ ] `shopify theme check` passes with no errors
- [ ] No "must-fix" errors remain
- [ ] Warnings are reviewed and addressed or documented

### CSS Organization
- [ ] No inline styles in Liquid
- [ ] No hardcoded colors/sizes (all use tokens)
- [ ] No `!important` unless documented
- [ ] No duplicate CSS rules
- [ ] CSS load order is correct (tokens → base → primitives)

### Liquid Quality
- [ ] All sections have proper `{% schema %}` blocks
- [ ] No hardcoded user content (all configurable)
- [ ] Repeated markup is in snippets, not duplicated
- [ ] All sections are properly named with prefix

### JSON Templates
- [ ] All templates are valid JSON
- [ ] All section types referenced exist as files
- [ ] All block types match defined block types

### Performance
- [ ] CSS files total < 60 KB
- [ ] JS files are < 100 KB each
- [ ] Images have dimensions specified
- [ ] No parser-blocking resources

### Naming Conventions
- [ ] All sections named `sandstone-<name>`
- [ ] All snippets named `sandstone-<name>`
- [ ] All CSS files named `sandstone-<layer>`
- [ ] All classes use BEM-like naming with prefix

### If All Checkboxes Are Checked
- [ ] Code is production-ready
- [ ] Quality is maintainable
- [ ] Future changes will be easy
- [ ] Merchants can safely customize the theme

