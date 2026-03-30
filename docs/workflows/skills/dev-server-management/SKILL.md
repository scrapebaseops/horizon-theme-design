# Dev Server Management Skill

## Overview

This skill handles starting, managing, and interacting with local development servers. It covers the Shopify theme dev server (for the implementation), the reference site server (if the reference is a codebase), and health checks to ensure both are running correctly.

The core principle is: **keep servers running, never push to live, enable local comparison.**

## Initial Tool Setup

At the start of any workflow session, ensure all required tools are installed. Run this setup once:

```bash
# Check Node.js is available (required for all tools)
node --version  # Should be 18+

# Check Shopify CLI is available
shopify version

# Screenshot tooling: check for built-in browser tools first (preferred).
# Only install Playwright if no built-in browser tooling is available:
npm install -g playwright
npx playwright install chromium

# Create the workflow tools directory and install dependencies
mkdir -p THEME_ROOT/.workflow/tools
cd THEME_ROOT/.workflow/tools
cat > package.json << 'PACKAGE_EOF'
{
  "type": "module",
  "dependencies": {
    "playwright": "^1.40.0",
    "pixelmatch": "^6.0.0",
    "pngjs": "^7.0.0"
  }
}
PACKAGE_EOF
npm install
cd THEME_ROOT

# Install code quality tools (in theme root)
cd THEME_ROOT
npm init -y 2>/dev/null || true
npm install --save-dev prettier @shopify/prettier-plugin-liquid stylelint stylelint-config-standard

# Verify ImageMagick is available (optional fallback for image comparison)
convert --version 2>/dev/null && echo "ImageMagick: available" || echo "ImageMagick: not found (optional)"

# Add tool artifacts to .shopifyignore
echo ".workflow/" >> THEME_ROOT/.shopifyignore
echo "node_modules/" >> THEME_ROOT/.shopifyignore
echo "package.json" >> THEME_ROOT/.shopifyignore
echo "package-lock.json" >> THEME_ROOT/.shopifyignore
echo ".prettierrc" >> THEME_ROOT/.shopifyignore
echo ".stylelintrc.json" >> THEME_ROOT/.shopifyignore
```

Replace `THEME_ROOT` with the actual path when running.

This ensures all the tools referenced by other skills (visual-comparison, code-quality) are available before any work begins.

## Shopify Theme Dev Server

This is the main development server for the Horizon theme you're building.

### Starting the Server

**Prerequisites:**
- Shopify CLI is installed: `shopify --version`
- You're in the theme root directory
- Theme is already created in Shopify admin or linked to an existing theme

**Command:**
```bash
cd /path/to/theme/root
shopify theme dev --port 9292 --theme-editor-sync=false
```

### Understanding the Flags

**`--port 9292`**
- Specifies the port the server runs on
- Use 9292 as the standard port
- If 9292 is already in use, increment to 9293, 9294, etc.
- The server will tell you if the port is in use

**`--theme-editor-sync=false`**
- CRITICAL: Disables automatic syncing with the online theme editor
- If enabled, changes in the code editor would automatically push to the live theme
- Always disable this to prevent accidental live pushes
- You control all changes locally

### Expected Output

After running the command, you should see output like:

```
✓ Built theme successfully
✓ Watching files for changes...

Local development preview
http://127.0.0.1:9292
```

**The URL is your local dev URL.** Use this for screenshots and testing.

### Server Running in Background

Start the server and keep it running in the background:

**Option 1: In a separate terminal**
1. Open a new terminal window
2. Navigate to the theme root
3. Run the shopify command
4. Keep that terminal open
5. Do your work in another terminal/editor

**Option 2: Background process**
```bash
cd /path/to/theme/root
shopify theme dev --port 9292 --theme-editor-sync=false &
# The & runs it in the background
# Note the PID (process ID) that appears
```

**Option 3: Using nohup (continue even if terminal closes)**
```bash
cd /path/to/theme/root
nohup shopify theme dev --port 9292 --theme-editor-sync=false > theme-server.log 2>&1 &
# Check log with: tail -f theme-server.log
```

### Checking if Server is Running

```bash
# Check if port 9292 is listening
lsof -i :9292

# Or try to curl the page
curl -I http://127.0.0.1:9292
# Should return HTTP 200
```

### Hot Reload

The server automatically reloads when you change files:
- Edit a Liquid file → Page updates in browser
- Edit a CSS file → Page updates in browser
- Edit a JSON template → Page updates in browser
- Edit a section schema → Page updates in browser

**No manual refresh needed** — the browser will reload automatically or inject the CSS without full refresh.

### Stopping the Server

```bash
# If running in foreground, press Ctrl+C

# If running in background, find and kill the process
lsof -i :9292
# Look for the PID
kill <PID>

# Or kill by name
killall node
```

### Common Issues

**Issue: "Port 9292 is already in use"**
- Solution: Use a different port: `--port 9293`
- Or kill the process using the port: `lsof -i :9292 && kill <PID>`

**Issue: "Theme not found" or auth error**
- Solution: The Shopify CLI needs authentication
- Run `shopify theme info` — it will prompt for authentication
- Complete the Shopify admin login flow
- Then try starting the server again

**Issue: Server starts but pages don't load**
- Solution: Wait 30 seconds (first build can be slow)
- Check the terminal for build errors
- Verify the URL is correct: `http://127.0.0.1:9292`
- Try accessing a specific template like: `http://127.0.0.1:9292/?_path=/ `

## Reference Theme Server

If the reference design is a codebase (not just static screenshots), you'll need to run a dev server for it too.

### Detecting Reference Type

**Static screenshots:** The reference is PNG/JPG files
- No server needed
- Use the screenshots directly

**Astro site:** The reference has `src/`, `astro.config.js`, etc.
```bash
cd /path/to/reference
npm install
npm run dev
# Usually runs on http://localhost:3000
```

**Next.js site:** The reference has `pages/`, `next.config.js`, etc.
```bash
cd /path/to/reference
npm install
npm run dev
# Usually runs on http://localhost:3000
```

**Eleventy/Static site:** The reference has `_eleventy.js` or similar
```bash
cd /path/to/reference
npm install
npm run dev
# Check package.json for the dev script
```

**Plain HTML:** The reference is just `.html` files
```bash
cd /path/to/reference
npx serve -p 3000
# Serves the directory at http://localhost:3000
```

### Starting Reference Server

Choose the right command based on the reference type:

**For Node.js-based references:**
```bash
cd /path/to/reference
npm install  # Only needed first time
npm run dev
# Note the URL it displays (usually http://localhost:3000)
```

**For static HTML:**
```bash
cd /path/to/reference
npx serve -p 3000
# Serves at http://localhost:3000
```

**For Python-based sites:**
```bash
cd /path/to/reference
python -m http.server 3001
# Serves at http://localhost:3001
```

### Running Both Servers

**Terminal 1: Theme server**
```bash
cd /path/to/theme
shopify theme dev --port 9292 --theme-editor-sync=false
```

**Terminal 2: Reference server**
```bash
cd /path/to/reference
npm run dev  # or appropriate command
```

Now you can compare:
- Reference: `http://localhost:3000` (or whatever port it uses)
- Implementation: `http://127.0.0.1:9292`

### Recording Server URLs

Store the URLs and process IDs in a config file so you can reference them later:

**File:** `.workflow/servers.json`
```json
{
  "theme_url": "http://127.0.0.1:9292",
  "reference_url": "http://localhost:3000",
  "theme_pid": null,
  "reference_pid": null,
  "started_at": "2026-03-29T10:30:00Z",
  "notes": "Both servers running, reference is Next.js site"
}
```

Update this file when you start servers so you have a record of what's running.

## Health Checks

After starting servers, verify they're working before proceeding.

### Shopify Theme Dev Server Health Check

```bash
# Test the URL
curl -I http://127.0.0.1:9292

# Expected output:
# HTTP/1.1 200 OK
# Content-Type: text/html
```

If you get anything other than 200, the server has an issue.

**Troubleshooting:**
- Check the terminal running the server for error messages
- Wait a few seconds (first load is slow)
- Verify the theme files are valid Liquid/JSON

### Reference Server Health Check

```bash
# If running on port 3000
curl -I http://localhost:3000

# Expected output:
# HTTP/1.1 200 OK
```

### Full Health Check Process

Before starting visual comparison work:

1. Start theme server, wait 10 seconds
   ```bash
   cd theme
   shopify theme dev --port 9292 --theme-editor-sync=false
   # Wait for "Built theme successfully" message
   ```

2. Test theme server:
   ```bash
   curl -I http://127.0.0.1:9292
   # Expect 200 OK
   ```

3. Start reference server (if needed):
   ```bash
   cd reference
   npm run dev
   # Wait for "listening on port 3000" message
   ```

4. Test reference server (if needed):
   ```bash
   curl -I http://localhost:3000
   # Expect 200 OK
   ```

5. Record URLs and PIDs:
   ```bash
   echo '{
     "theme_url": "http://127.0.0.1:9292",
     "reference_url": "http://localhost:3000",
     "started_at": "'$(date -Iseconds)'"
   }' > .workflow/servers.json
   ```

6. Proceed with visual comparison work

All servers are ready when both health checks pass.

## Important Rules

### Never Push to Live

**Critical:** All development happens locally. Never run these commands:

```bash
# WRONG - never do this
shopify theme push
shopify theme push --production

# WRONG - never sync with live theme
shopify theme dev --allow-live
```

Always develop locally only. Use `--port 9292` and `--theme-editor-sync=false` to ensure your changes stay local.

### Never Use Live-Reload Flags

The Shopify CLI has flags that automatically sync changes to the live theme:

```bash
# WRONG - this pushes changes live
shopify theme dev --live-reload

# WRONG - this syncs editor changes
shopify theme dev --allow-live

# WRONG - this uploads everything
shopify theme dev --upload
```

None of these. Always use:
```bash
# RIGHT - local development only
shopify theme dev --port 9292 --theme-editor-sync=false
```

### Shopify Admin Authentication

The Shopify CLI will ask for authentication:

**On first run:**
```bash
shopify theme dev
# ↓ Asks for Shopify shop
# Please enter your shop URL: theme-dev-store-2038.myshopify.com
# ↓ Asks for authentication
# Opens browser → You log in to Shopify → Returns auth token
```

**You (the user) must handle this manually.** The agent cannot complete login flows.

Once authenticated, subsequent commands work without re-authenticating.

### Restarting Servers

If a server crashes or behaves strangely:

1. Kill the process:
   ```bash
   lsof -i :9292
   kill <PID>
   ```

2. Wait a few seconds

3. Start again:
   ```bash
   shopify theme dev --port 9292 --theme-editor-sync=false
   ```

## Workflow: Full Development Session

Here's a complete workflow for a development session:

### Session Start (Phase 1)

1. **Start theme server:**
   ```bash
   cd /path/to/theme
   shopify theme dev --port 9292 --theme-editor-sync=false &
   ```

2. **Wait for startup (10 seconds)**

3. **Health check:**
   ```bash
   curl -I http://127.0.0.1:9292
   # Expect: HTTP/1.1 200 OK
   ```

4. **Record running state:**
   ```bash
   ps aux | grep "shopify theme dev"
   # Note the PID
   ```

5. **Proceed with visual comparison work**
   - Take screenshots
   - Compare against reference
   - Edit CSS/HTML
   - Server auto-reloads
   - Verify changes

### Session Middle (Active Development)

- Make code changes (CSS, Liquid, JSON)
- Server automatically reloads
- Take new screenshot to verify changes
- Compare against reference
- Iterate until match

**The server stays running the entire time.**

### Session End (Phase 5)

- All visual comparison complete
- Design system built and verified
- Code quality checks passed

**Keep server running until final verification is complete.**

### Cleanup

Only after everything is done:

1. **Final verification:**
   ```bash
   shopify theme check  # No errors
   curl -I http://127.0.0.1:9292  # Still working
   ```

2. **Stop server (optional):**
   ```bash
   kill <PID>
   ```

3. **Clean up .workflow/servers.json:**
   ```bash
   rm .workflow/servers.json
   ```

## Quick Troubleshooting Table

| Problem | Diagnosis | Solution |
|---------|-----------|----------|
| "Port 9292 in use" | Another process using port | Use different port: `--port 9293` |
| "Theme not found" | Auth issue | Run `shopify theme info` to re-authenticate |
| Server crashes | Syntax error in theme files | Check terminal for error messages, fix Liquid/JSON |
| Changes not showing | Server crashed silently | Check `curl -I http://127.0.0.1:9292` |
| Slow page loads | First-time compilation or large theme | Wait 30 seconds, check terminal for status |
| Files keep syncing to live | Wrong flags used | Stop server, restart with `--theme-editor-sync=false` |
| Reference server won't start | Wrong start command | Verify `npm run dev` script in package.json |

## Useful Commands Reference

```bash
# Check if server is running
lsof -i :9292

# View server process
ps aux | grep "shopify theme dev"

# Kill server (find PID from above first)
kill <PID>

# Kill by port number
fuser -k 9292/tcp

# View server logs (if using nohup)
tail -f theme-server.log

# Test server is responding
curl http://127.0.0.1:9292

# Test specific route
curl http://127.0.0.1:9292/?_path=/products/sample

# Check Shopify auth status
shopify auth whoami

# List available themes
shopify theme list

# Reset theme (careful!)
shopify theme delete --theme <ID>

# Verify theme syntax
shopify theme check
```

## Key Points to Remember

1. **Local development only** — never push to live
2. **Keep servers running** — don't stop/start repeatedly
3. **Record URLs** — save the server URLs for reference
4. **Health checks first** — verify servers work before visual comparison
5. **Check flags** — always use `--theme-editor-sync=false`
6. **Authentication** — user must handle Shopify login
7. **Hot reload works** — changes apply automatically, no manual refresh
8. **Port conflicts** — increment port if 9292 is busy
9. **Reference is optional** — only needed if comparing to a live site
10. **Cleanup at end** — kill processes when done working

