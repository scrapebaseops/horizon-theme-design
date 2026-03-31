import { chromium } from 'playwright';

const url = process.argv[2];
const outputPath = process.argv[3];
const width = parseInt(process.argv[4] || '1440');
const height = parseInt(process.argv[5] || '900');

if (!url || !outputPath) {
  console.error('Usage: node screenshot.mjs <url> <output-path> [width] [height]');
  process.exit(1);
}

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.setViewportSize({ width, height });
await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
await page.waitForTimeout(3000); // let CSS/images load and animations settle
await page.screenshot({ path: outputPath, fullPage: true });
await browser.close();
console.log(`Screenshot saved: ${outputPath}`);
