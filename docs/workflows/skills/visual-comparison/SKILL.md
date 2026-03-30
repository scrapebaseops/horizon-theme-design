# Visual Comparison Skill

## Overview

This skill defines the exact methodology for comparing reference designs against implementations using screenshots and visual inspection. The core principle is **granular zoom-in/zoom-out**: start at the smallest detail level, verify, then zoom out one level and repeat. This ensures pixel-perfect replication without getting overwhelmed by the whole page.

The feedback loop is iterative and methodical. Do not attempt to match an entire page at once. Work from individual properties → elements → components → sections → full page.

## Available Tools

Detect and use what's available in your environment:

### Option 1: Playwright/Puppeteer (Recommended)

Install locally for CLI-based screenshot capture:

```bash
npm install -g playwright
# or
npx playwright install
```

**Advantages:**
- Fast, automated, scriptable
- Capture full-page screenshots
- Element-specific screenshots via CSS selectors
- Control viewport size precisely
- Easy to compare programmatically

**Usage:**
```bash
# Create a simple script to capture a page
cat > screenshot.js << 'EOF'
const { webkit } = require('playwright');
(async () => {
  const browser = await webkit.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://127.0.0.1:9292', { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'impl.png', fullPage: true });
  await browser.close();
})();
EOF
node screenshot.js
```

### Option 2: Claude in Chrome Browser Tools

If browser access is available and Playwright is not:

**Advantages:**
- Visual verification in real-time
- Can interact with the page before capturing
- Can take cropped screenshots of specific regions

**Usage:**
```
1. Use mcp__Claude_in_Chrome__navigate to go to the URL
2. Use mcp__Claude_in_Chrome__screenshot to capture
3. Use mcp__Claude_in_Chrome__resize_window to set viewport
4. Use mcp__Claude_in_Chrome__zoom to inspect details
```

### Determine What's Available

At the start of any visual comparison task:

1. Check if Playwright/Node is available: `which node && npm list -g playwright`
2. If not available, check if browser tools are available: attempt `mcp__Claude_in_Chrome__tabs_context_mcp`
3. Use whichever is available; prefer Playwright for speed

## Automated Screenshot & Comparison Tooling

### Setup (run once at workflow start)

```bash
# Install Playwright and browsers
npm install -g playwright
npx playwright install chromium

# Install pixelmatch for automated pixel diff
npm install -g pixelmatch

# Verify ImageMagick is available (pre-installed on most systems)
convert --version
```

### Screenshot Utility Script

Create this as `THEME_ROOT/.workflow/tools/screenshot.mjs` at the start of the workflow:

```javascript
// Usage: node screenshot.mjs <url> <output-path> [viewport-width] [viewport-height] [selector]
// Examples:
//   node screenshot.mjs http://127.0.0.1:9292 ./full-page.png 1440 900
//   node screenshot.mjs http://127.0.0.1:9292 ./hero-section.png 1440 900 ".hero-section"
//   node screenshot.mjs http://127.0.0.1:9292 ./button.png 1440 900 ".btn-primary"

import { chromium } from 'playwright';

const [,, url, outputPath, width = '1440', height = '900', selector] = process.argv;

if (!url || !outputPath) {
  console.error('Usage: node screenshot.mjs <url> <output-path> [width] [height] [selector]');
  process.exit(1);
}

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: parseInt(width), height: parseInt(height) });
await page.goto(url, { waitUntil: 'networkidle' });

// Wait for fonts and images to load
await page.waitForTimeout(2000);

if (selector) {
  // Screenshot a specific element
  const element = await page.locator(selector);
  await element.screenshot({ path: outputPath });
  console.log(`Element screenshot saved: ${outputPath} (selector: ${selector})`);
} else {
  // Full page screenshot
  await page.screenshot({ path: outputPath, fullPage: true });
  console.log(`Full page screenshot saved: ${outputPath}`);
}

await browser.close();
```

### Comparison Utility Script

Create this as `THEME_ROOT/.workflow/tools/compare.mjs` at the start of the workflow:

```javascript
// Usage: node compare.mjs <reference.png> <implementation.png> [diff-output.png] [threshold]
// Returns: exit code 0 if match (< 0.1% diff), exit code 1 if mismatch
// Outputs: number of different pixels and percentage to stdout

import fs from 'fs';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

const [,, refPath, implPath, diffPath = 'diff.png', threshold = '0.1'] = process.argv;

if (!refPath || !implPath) {
  console.error('Usage: node compare.mjs <reference.png> <implementation.png> [diff.png] [threshold]');
  process.exit(2);
}

const img1 = PNG.sync.read(fs.readFileSync(refPath));
const img2 = PNG.sync.read(fs.readFileSync(implPath));

if (img1.width !== img2.width || img1.height !== img2.height) {
  console.error(`Size mismatch: ${img1.width}x${img1.height} vs ${img2.width}x${img2.height}`);
  console.error('Images must be the same dimensions. Ensure both screenshots use the same viewport.');
  process.exit(2);
}

const { width, height } = img1;
const diff = new PNG({ width, height });

const numDiffPixels = pixelmatch(
  img1.data, img2.data, diff.data, width, height,
  { threshold: parseFloat(threshold), includeAA: false }
);

const totalPixels = width * height;
const diffPercent = ((numDiffPixels / totalPixels) * 100).toFixed(4);

fs.writeFileSync(diffPath, PNG.sync.write(diff));

console.log(`Pixels different: ${numDiffPixels} / ${totalPixels} (${diffPercent}%)`);
console.log(`Diff image saved: ${diffPath}`);
console.log(`Threshold used: ${threshold}`);

if (parseFloat(diffPercent) < 0.1) {
  console.log('RESULT: PASS (< 0.1% difference)');
  process.exit(0);
} else if (parseFloat(diffPercent) < 1.0) {
  console.log('RESULT: CLOSE (< 1% difference — minor tweaks needed)');
  process.exit(1);
} else {
  console.log('RESULT: FAIL (significant differences remain)');
  process.exit(1);
}
```

Note: This script requires pngjs as a dependency. Install it alongside pixelmatch:
```bash
npm install -g pngjs pixelmatch
```

Or create a local package.json in the `.workflow/tools/` directory:
```json
{
  "type": "module",
  "dependencies": {
    "playwright": "^1.40.0",
    "pixelmatch": "^6.0.0",
    "pngjs": "^7.0.0"
  }
}
```

### ImageMagick Alternative (if Node tools unavailable)

```bash
# Generate a visual diff image
compare reference.png implementation.png -compose src diff.png

# Get pixel difference count
compare -metric AE reference.png implementation.png null: 2>&1
# Returns: number of different pixels

# Get percentage difference (RMSE metric, second value is 0-1 scale)
compare -metric RMSE reference.png implementation.png null: 2>&1
# Returns: value (normalized_value) — multiply normalized by 100 for percentage
```

### Automated Comparison Workflow

When running the visual comparison loop, use these tools in this order:

1. **Take reference screenshot**: `node screenshot.mjs http://127.0.0.1:3000 ref-hero.png 1440 900 ".hero"`
2. **Take implementation screenshot**: `node screenshot.mjs http://127.0.0.1:9292 impl-hero.png 1440 900 ".hero-section"`
3. **Run pixel diff**: `node compare.mjs ref-hero.png impl-hero.png diff-hero.png 0.1`
4. **Review diff image**: The red pixels in diff-hero.png show exactly where differences are
5. **Check the percentage**: If < 0.1%, this component passes. If not, fix the biggest red area and repeat.

For element-level comparison (the granular zoom-in approach):
- Use the `selector` parameter to screenshot individual elements
- Compare typography: `node screenshot.mjs ... ".btn-primary span"`
- Compare a button: `node screenshot.mjs ... ".btn-primary"`
- Compare a card: `node screenshot.mjs ... ".product-card:first-child"`
- Compare a section: `node screenshot.mjs ... "#hero-section"`
- Compare full page: `node screenshot.mjs ...` (no selector)

### Pass/Fail Thresholds

| Level | Threshold | Meaning |
|-------|-----------|---------|
| Element level | < 0.05% diff | Individual elements must be near-perfect |
| Component level | < 0.1% diff | Components should match very closely |
| Section level | < 0.5% diff | Sections may have minor rendering differences |
| Full page level | < 1.0% diff | Full pages may have cumulative minor differences |
| PASS overall | < 0.5% on full page | Ready to move on |

## The Granular Zoom-In/Zoom-Out Methodology

This is the core process. Follow it exactly.

### Level 1: Individual CSS Properties

Start here. Don't look at the whole component. Look at ONE property at a time.

**What to verify:**
- Font size (exact pixel value)
- Font weight (400, 600, 700, etc.)
- Font family (Georgia, Helvetica, custom font)
- Line height (1.2, 1.5, 1.75, etc.)
- Letter spacing (0, 0.5px, 1px, etc.)
- Color (hex value, should match design tokens)
- Background color
- Padding (individual sides: top, right, bottom, left)
- Margin (individual sides)
- Border radius
- Border width and color
- Box shadow (offset, blur, spread, color)
- Text alignment
- Text decoration (none, underline, etc.)
- Display type (block, flex, grid, inline)
- Opacity/visibility

**Process:**
1. Open the element inspector in the reference design (or screenshot)
2. Note the exact value of one property (e.g., font-size: 28px)
3. Switch to the implementation
4. Inspect the same element and verify the property matches
5. If it doesn't match, note the difference and the severity
6. Move to the next property
7. Don't move to Level 2 until all properties of this element are correct

**Example comparison:**
```
Reference: h1 { font-size: 28px; font-weight: 700; color: #000; line-height: 1.2; }
Implementation: h1 { font-size: 24px; font-weight: 600; color: #1a1a1a; line-height: 1.4; }
Differences:
  - font-size: 24px (expected 28px) — CRITICAL
  - font-weight: 600 (expected 700) — CRITICAL
  - color: #1a1a1a (expected #000) — MAJOR (close but not exact)
  - line-height: 1.4 (expected 1.2) — MAJOR (affects spacing)
```

### Level 2: Element Level

Now zoom out slightly. Look at a single element in isolation (button, input, link, heading).

**What to verify:**
- All CSS properties from Level 1 are correct
- The element's padding is correct
- The element's border/outline is correct
- The element's background is correct
- If interactive (button, link), all interaction states exist:
  - Default state
  - Hover state
  - Focus state (for keyboard access)
  - Active state (when clicked)
  - Disabled state (if applicable)

**Process:**
1. Take a cropped screenshot of JUST this element from both reference and implementation
2. Place them side by side (or use an image comparison tool)
3. For each state, compare all properties
4. Fix the most impactful difference
5. Take a new screenshot of the implementation
6. Compare again
7. Repeat until no Critical or Major differences remain for this element

**Example: Button comparison**

```
Reference Button States:
  - Default: blue background, white text, 8px border-radius, 12px padding
  - Hover: darker blue background, same text, same radius/padding
  - Focus: blue background with blue ring outline (3px blue shadow)
  - Active: even darker blue
  - Disabled: grey background, light grey text, 50% opacity

Implementation Button States:
  - Default: blue background ✓, white text ✓, 4px border-radius ✗, 12px padding ✓
  - Hover: NO hover style defined ✗
  - Focus: NO focus ring defined ✗
  - Active: Not tested ✗
  - Disabled: Not defined ✗

Fix in order:
  1. border-radius: 4px → 8px (CRITICAL for matching)
  2. Add hover state (CRITICAL for UX)
  3. Add focus state (CRITICAL for accessibility)
  4. Add active state (MAJOR)
  5. Add disabled state (MAJOR)
```

### Level 3: Component Level

Zoom out more. A component is a group of related elements (card with title + description + image, button with icon + text, form input with label + field).

**What to verify:**
- All internal elements match Level 2
- Spacing between internal elements is correct (padding, gap, margin)
- The overall dimensions are correct
- The internal alignment is correct (centering, left-align, etc.)
- Rounded corners on the whole component
- Shadows on the whole component
- Background color of the component as a whole

**Process:**
1. Take a cropped screenshot of the entire component from reference and implementation
2. Check internal spacing by examining padding/gap values
3. Verify element arrangement and alignment
4. Fix the most impactful spatial difference
5. Re-screenshot and compare
6. Repeat until no Critical or Major differences

**Example: Card component**

```
Reference Card:
  - Outer dimensions: 300px wide, auto height
  - Background: white with shadow (4px blur, 0.1 opacity black)
  - Border radius: 8px
  - Padding: 16px on all sides
  - Image: 100% width, 200px height, 4px radius
  - Title: h3 style, 16px from image bottom
  - Description: body style, 8px from title bottom
  - Footer: flex row, 8px gap between button and link

Implementation Card:
  - Outer dimensions: 300px wide ✓, auto height ✓
  - Background: white ✓, shadow missing ✗
  - Border radius: 4px ✗ (expected 8px)
  - Padding: 12px ✗ (expected 16px)
  - Image: 100% width ✓, 150px height ✗ (expected 200px), 0 radius ✗ (expected 4px)
  - Title: correct style ✓, 24px from image ✗ (expected 16px)
  - Description: correct style ✓, 16px from title ✗ (expected 8px)
  - Footer: flex row ✓, 16px gap ✗ (expected 8px)

Fix in order:
  1. Add shadow to card (CRITICAL)
  2. border-radius: 4px → 8px (CRITICAL)
  3. Padding: 12px → 16px (MAJOR)
  4. Image height: 150px → 200px (MAJOR)
  5. Image border-radius: 0 → 4px (MAJOR)
  6. Title bottom margin: 24px → 16px (MAJOR)
  7. Description bottom margin: 16px → 8px (MAJOR)
  8. Footer gap: 16px → 8px (MINOR)
```

### Level 4: Section Level

Zoom out again. A section is a major area of the page (hero, feature grid, testimonials, CTA banner).

**What to verify:**
- All components within the section match Level 3
- Spacing between components is correct
- Section padding (top/bottom/left/right) is correct
- Section background is correct (color, image, pattern)
- Grid/flex layout is correct (number of columns, gaps)
- Responsive layout: does the grid change at breakpoints correctly?
- Section alignment and overflow behavior

**Process:**
1. Take a cropped screenshot of the entire section from reference and implementation
2. Compare component arrangement and spacing
3. Verify background and padding
4. Check responsive behavior at all three viewport sizes
5. Fix the most impactful difference
6. Re-screenshot and compare
7. Repeat until no Critical or Major differences

**Example: Feature grid section**

```
Reference Feature Grid Section:
  - Section background: light grey
  - Section padding: 48px top/bottom, 24px left/right
  - Grid: 3 columns on desktop, 2 on tablet, 1 on mobile
  - Gap between cards: 24px
  - Cards: feature card components (Level 3 verified)

Implementation Feature Grid Section:
  - Section background: light grey ✓
  - Section padding: 24px ✗ (expected 48px top/bottom)
  - Grid: 2 columns on desktop ✗ (expected 3), 2 on tablet ✓, 1 on mobile ✓
  - Gap between cards: 16px ✗ (expected 24px)
  - Cards: components match ✓

Fix in order:
  1. Adjust section padding: 24px → 48px top/bottom (CRITICAL for visual balance)
  2. Grid columns: 2 → 3 on desktop (CRITICAL for layout)
  3. Gap between cards: 16px → 24px (MAJOR)
```

### Level 5: Full Page Level

Finally, zoom all the way out. The entire page flow.

**What to verify:**
- All sections from Level 4 are present and in correct order
- Spacing between sections is consistent and correct
- Overall page proportions (full-bleed background, centered content, etc.)
- Section background colors create proper visual rhythm
- No layout breaks or overflow issues
- Page header and footer are present and styled correctly
- All three viewport sizes render correctly (responsive breakpoints work)

**Process:**
1. Take full-page screenshots of reference and implementation at each viewport size
2. Scan visually from top to bottom
3. Check that sections are in order and spaced correctly
4. Verify responsive layout changes at breakpoints
5. If something looks off, drill down to Level 4 (that section) and fix it
6. Re-screenshot and compare
7. Repeat until the page feels cohesive and matches the reference

## Standard Viewports

Always compare at these three viewport sizes. Design varies dramatically across viewports.

### Desktop
- Width: 1440px
- Height: 900px
- Purpose: Standard desktop browser
- Breakpoint: >= 1024px typically

### Tablet
- Width: 768px
- Height: 1024px
- Purpose: iPad-size screens
- Breakpoint: 768px - 1023px typically

### Mobile
- Width: 390px
- Height: 844px
- Purpose: iPhone-size screens
- Breakpoint: < 768px typically

**When comparing:**
- Always compare at the same viewport size between reference and implementation
- Check responsive behavior: does the layout change correctly at breakpoints?
- Test on all three sizes; don't assume desktop matches means mobile matches
- Document viewport size in every comparison

## Screenshot Capture Process

### Using Playwright/Node

```javascript
const { webkit } = require('playwright');
const fs = require('fs');

async function captureScreenshot(url, outputFile, viewport = { width: 1440, height: 900 }) {
  const browser = await webkit.launch();
  const page = await browser.newPage();
  await page.setViewportSize(viewport);

  // Navigate and wait for network to be idle (all resources loaded)
  await page.goto(url, { waitUntil: 'networkidle' });

  // Wait an additional second to ensure CSS animations complete
  await page.waitForTimeout(1000);

  // Take full-page screenshot
  await page.screenshot({ path: outputFile, fullPage: true });

  console.log(`Screenshot saved: ${outputFile}`);
  await browser.close();
}

// Capture at all three viewports
(async () => {
  const refUrl = process.argv[2];
  const implUrl = process.argv[3];

  // Desktop
  await captureScreenshot(refUrl, 'ref-desktop.png', { width: 1440, height: 900 });
  await captureScreenshot(implUrl, 'impl-desktop.png', { width: 1440, height: 900 });

  // Tablet
  await captureScreenshot(refUrl, 'ref-tablet.png', { width: 768, height: 1024 });
  await captureScreenshot(implUrl, 'impl-tablet.png', { width: 768, height: 1024 });

  // Mobile
  await captureScreenshot(refUrl, 'ref-mobile.png', { width: 390, height: 844 });
  await captureScreenshot(implUrl, 'impl-mobile.png', { width: 390, height: 844 });
})();
```

**Usage:**
```bash
node capture.js http://reference-url.com http://127.0.0.1:9292
```

### Using Claude in Chrome

1. Navigate to the URL:
   ```
   use mcp__Claude_in_Chrome__navigate with the URL
   ```

2. Resize the browser window to the target viewport:
   ```
   use mcp__Claude_in_Chrome__resize_window with width: 1440, height: 900 (or other viewport)
   ```

3. Wait for the page to fully load:
   ```
   use mcp__Claude_in_Chrome__screenshot (this captures once page loads)
   ```

4. For element-specific screenshots, use the zoom tool:
   ```
   use mcp__Claude_in_Chrome__zoom with the region coordinates to capture a specific area
   ```

### Cropping Screenshots

For Level 2-4 comparisons, crop the screenshot to just the relevant section:

**Using ImageMagick:**
```bash
convert input.png -crop 300x300+100+50 output.png
# -crop WIDTHxHEIGHT+XOFFSET+YOFFSET
```

**Using Python:**
```python
from PIL import Image
img = Image.open('input.png')
cropped = img.crop((left, top, right, bottom))
cropped.save('output.png')
```

## The Feedback Loop: Iterative Comparison and Fixing

This is how you work systematically through the 5 levels:

```
LEVEL 1: Individual Properties
├── REPEAT {
│   ├── Compare one CSS property (font-size, color, padding, etc.)
│   ├── Note if it matches (✓) or differs (✗)
│   ├── Categorize severity: Critical, Major, Minor, Trivial
│   ├── If differs, identify the fix needed
│   └── Move to next property
│   } UNTIL all properties of this element verified
│
LEVEL 2: Element Level
├── Take cropped screenshot of reference element
├── Take cropped screenshot of implementation element
├── Place side-by-side or overlay
├── REPEAT {
│   ├── Scan the element
│   ├── Identify top difference (most impactful first)
│   ├── Apply the fix (edit CSS file)
│   ├── Re-screenshot the implementation element
│   ├── Verify the fix didn't break other properties
│   └── Move to next difference (Critical → Major → Minor)
│   } UNTIL no Critical or Major differences remain
│
LEVEL 3: Component Level
├── Take cropped screenshot of reference component
├── Take cropped screenshot of implementation component
├── Check internal element spacing and arrangement
├── REPEAT {
│   ├── Identify most impactful spatial difference
│   ├── Apply the fix
│   ├── Re-screenshot and compare
│   ├── Verify alignment and overflow
│   └── Move to next difference
│   } UNTIL no Critical or Major differences remain
│
LEVEL 4: Section Level
├── Take cropped screenshot of reference section
├── Take cropped screenshot of implementation section
├── Verify all component arrangements and spacing
├── REPEAT {
│   ├── Identify most impactful section-level difference
│   ├── Apply the fix
│   ├── Re-screenshot at all three viewports
│   ├── Verify responsive behavior
│   └── Move to next difference
│   } UNTIL no Critical or Major differences remain
│
LEVEL 5: Full Page Level
├── Take full-page screenshot of reference at all three viewports
├── Take full-page screenshot of implementation at all three viewports
├── Scan from top to bottom at each viewport
├── If anything looks off, drill down to the responsible section (Level 4)
├── Fix the issue at Level 4
├── Re-screenshot and compare
├── REPEAT until the full page matches
│
✓ COMPLETE
```

## Comparison Tools

### Side-by-Side Viewing

For side-by-side comparison:
- Use an image viewer that supports multiple images
- Or use a web-based diff tool like: https://www.diffnow.com/compare-images
- Or use ImageMagick to create a comparison montage:
  ```bash
  montage ref.png impl.png -geometry 400x600 -label reference -label implementation result.png
  ```

### Overlay Comparison

For overlay comparison (highlighting differences):
- Use GIMP and layer the images with 50% opacity on one layer
- Or use a web tool like: https://pixlr.com/

### Automated Pixel Diff

For automated pixel-level differences (not recommended for design work, but useful for QA):
```bash
# Using ImageMagick
compare ref.png impl.png -highlight-color red diff.png
```

This highlights every pixel that differs from the reference. Usually too noisy for design comparison, but useful if you want to verify nothing changed after a fix.

## Logging Comparisons

Log every comparison loop for transparency and debugging.

**Use this template for each comparison session:**

```markdown
## Visual Comparison Log

### Session Info
- Date: [date]
- Component/Section: [name]
- Viewport: [1440x900 / 768x1024 / 390x844]
- Reference URL: [url or screenshot path]
- Implementation URL: [url]

### Level Being Verified
- [ ] Level 1: Individual Properties
- [ ] Level 2: Element Level
- [ ] Level 3: Component Level
- [ ] Level 4: Section Level
- [ ] Level 5: Full Page Level

### Differences Found

| Property | Reference | Implementation | Severity | Status |
|----------|-----------|-----------------|----------|--------|
| font-size | 28px | 24px | CRITICAL | Fixed |
| font-weight | 700 | 600 | CRITICAL | Fixed |
| color | #000 | #1a1a1a | MAJOR | Fixed |
| hover state | blue overlay | missing | CRITICAL | Fixed |
| padding | 16px | 12px | MAJOR | Pending |

### Changes Made

**File:** `assets/sandstone-primitives.css`
- Changed `.sandstone-button h1` font-size from 24px to 28px
- Changed `.sandstone-button h1` font-weight from 600 to 700
- Added `.sandstone-button:hover { background-color: #005ddd; }` for hover state
- Changed `.sandstone-button` padding from 12px to 16px

**Verification:** Re-screenshot taken at [time]. No regressions detected.

### Remaining Differences

- [ ] None — Complete match
- [ ] Trivial padding (1-2px) in footer
- [ ] Minor: gap in feature grid slightly different (20px vs 24px)

### Sign-off

- Component visual parity: ✓ ACHIEVED / ✗ PENDING
- Ready to move to next level: ✓ YES / ✗ NO (reason: _______)
```

Store this log at: `docs/workflows/workflow-2-design-replication/logs/[component-name]-visual-parity-log.md`

## When to Use Sub-Agents

For complex pages with many components, use sub-agents to avoid context overflow.

**When to spawn a sub-agent:**
- You've been working on the same component for a long time and the context is getting full
- There's a distinct, self-contained component (hero section, feature grid, testimonials) that needs work
- Multiple components can be worked on in parallel

**What to hand off to a sub-agent:**

Give the sub-agent:
1. Component name and description
2. Link to the reference design (screenshot or URL)
3. Link to the implementation (dev server URL)
4. File paths where the component CSS lives
5. Expected outcome (e.g., "Hero section should be pixel-perfect at desktop, tablet, and mobile")

**Example handoff:**

```
Sub-agent task: Visual Parity for Feature Grid Section

Description:
The feature grid displays 3 cards in a row on desktop, 2 on tablet, 1 on mobile.
Each card has an image, title, and description.

Reference: http://example-reference.com/#features
Implementation: http://127.0.0.1:9292

File paths:
- CSS: /theme/assets/sandstone-primitives.css (search for .sandstone-feature-grid)
- Section: /theme/sections/sandstone-feature-grid.liquid
- Snippet: /theme/snippets/sandstone-feature-card.liquid

Success criteria:
- All components at Level 3 match (element-level perfect)
- Section spacing correct at all three viewports
- Responsive grid layout changes correctly at breakpoints
- No Critical or Major differences remaining
- Document all changes in visual-parity-log.md

Start at Level 2 (element) for individual feature cards, move to Level 4 (section) when cards are correct.
```

The sub-agent will work independently and report back when complete.

## Common Pitfalls to Avoid

### Pitfall 1: Comparing Different Viewport Sizes

**Mistake:** Comparing desktop reference (1440px) against mobile implementation (390px)

**Why it breaks:** Everything looks different because the layout is different.

**Fix:** Always compare at the SAME viewport size. If comparing responsive behavior, take screenshots at each breakpoint separately and compare like-for-like.

### Pitfall 2: Comparing with Different Content

**Mistake:** Reference shows "Hello World" but implementation shows "Lorem ipsum dolor sit amet..."

**Why it breaks:** Text length affects layout, and you can't tell if spacing is different or if content is just longer.

**Fix:** Use identical content in both reference and implementation for comparison. Dummy text should be the same length.

### Pitfall 3: Accepting "Close Enough" at Component Level

**Mistake:** "The padding is off by 1-2px but it looks close enough"

**Why it breaks:** Accumulating 1-2px errors on every component means a 20-component page is off by 20-40px, destroying the design system.

**Fix:** At Level 2 and Level 3, aim for pixel-perfect. Accept Trivial differences (sub-pixel rendering, anti-aliasing) but fix all Critical and Major differences.

### Pitfall 4: Trying to Fix 10 Things at Once

**Mistake:** Identifying 10 differences and changing all of them in one file edit, then re-screenshotting once

**Why it breaks:** If something regresses, you don't know which change caused it.

**Fix:** Fix ONE thing. Re-screenshot. Verify it fixed the issue without breaking something else. Move to the next thing.

### Pitfall 5: Forgetting Interaction States

**Mistake:** Comparing only the default state of a button, ignoring hover/focus/active

**Why it breaks:** The component looks right at rest but breaks when users interact with it.

**Fix:** Always check all states: default, hover, focus, active, disabled. Document which states you've verified.

### Pitfall 6: Ignoring Responsive Behavior

**Mistake:** Comparing only desktop, assuming mobile will match

**Why it breaks:** Responsive breakpoints often change layout dramatically, and you don't notice issues until they go live.

**Fix:** Compare at all three viewport sizes (1440, 768, 390). Verify layout changes occur at the right breakpoints.

### Pitfall 7: Not Checking for Regressions

**Mistake:** Fix one thing and move on without verifying other properties stayed the same

**Why it breaks:** Your fix changes font-size correctly but accidentally changed padding because you used a wildcard selector.

**Fix:** After every fix, re-screenshot and compare the entire element/component, not just the property you changed.

## Quick Reference Checklist

Use this checklist for every visual comparison session:

### Before Starting
- [ ] Dev server is running (implementation)
- [ ] Reference is accessible (screenshot or live URL)
- [ ] Screenshot tool is working (Playwright or browser)
- [ ] All three viewports will be tested
- [ ] Logging template is ready

### During Comparison
- [ ] Starting at Level 1 (or appropriate level based on task)
- [ ] Comparing at matching viewport sizes only
- [ ] Using identical content in reference and implementation
- [ ] Checking all interaction states (hover, focus, active, disabled)
- [ ] Fixing one difference at a time
- [ ] Re-verifying after each fix
- [ ] Documenting differences and fixes in log
- [ ] Checking all three viewports before moving to next level

### After Each Fix
- [ ] Re-screenshot the implementation
- [ ] Compare against reference
- [ ] Verify the fix worked
- [ ] Verify no regressions in other properties
- [ ] Update the log with result

### Level Completion
- [ ] No Critical differences remaining
- [ ] No Major differences remaining
- [ ] Minor and Trivial differences documented (acceptable)
- [ ] Log signed off (✓ ACHIEVED or ✗ PENDING with reason)
- [ ] Ready to move to next level

