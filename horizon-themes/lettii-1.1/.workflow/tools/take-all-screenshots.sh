#!/bin/bash
set -e

TOOLS_DIR="/home/ubuntu/horizon-theme-design/horizon-themes/lettii-1.1/.workflow/tools"
REF_DIR="/home/ubuntu/horizon-theme-design/horizon-themes/lettii-1.1/.workflow/reference-screenshots"
REF_URL="http://localhost:4321"

# Key pages to screenshot
PAGES=(
  "/:homepage"
  "/index-two:homepage-alt"
  "/about:about"
  "/contact:contact"
  "/sign-in:sign-in"
  "/sign-up:sign-up"
  "/404:404"
  "/blog:blog"
  "/changelog:changelog"
  "/customers:customers"
  "/integrations:integrations"
  "/helpcenter:helpcenter"
  "/team:team"
  "/system/typography:system-typography"
  "/system/colors:system-colors"
  "/system/buttons:system-buttons"
)

VIEWPORTS=(
  "1440:900:desktop"
  "768:1024:tablet"
  "390:844:mobile"
)

for page_entry in "${PAGES[@]}"; do
  IFS=':' read -r path name <<< "$page_entry"
  for vp_entry in "${VIEWPORTS[@]}"; do
    IFS=':' read -r w h label <<< "$vp_entry"
    output="${REF_DIR}/${name}-${label}.png"
    echo "Capturing ${name} at ${w}x${h}..."
    node "$TOOLS_DIR/screenshot.mjs" "${REF_URL}${path}" "$output" "$w" "$h" 2>&1 || echo "FAILED: ${name}-${label}"
  done
done

echo "All screenshots complete"
