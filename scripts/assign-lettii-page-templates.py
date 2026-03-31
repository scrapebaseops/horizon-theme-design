#!/usr/bin/env python3
"""
Assign JSON theme templates to Shopify Online Store pages via Admin REST API.

Requires a Custom app (or private app) Admin API access token with write_pages (and read_pages).

Usage:
  export SHOPIFY_ADMIN_ACCESS_TOKEN="shpat_..."
  export SHOPIFY_SHOP="theme-dev-store-2038.myshopify.com"   # optional
  python3 scripts/assign-lettii-page-templates.py
"""

from __future__ import annotations

import json
import os
import ssl
import sys
import urllib.error
import urllib.request
from typing import Any

SHOP = os.environ.get("SHOPIFY_SHOP", "theme-dev-store-2038.myshopify.com")
API_VERSION = os.environ.get("SHOPIFY_API_VERSION", "2024-10")
TOKEN = os.environ.get("SHOPIFY_ADMIN_ACCESS_TOKEN", "")

# Page handle -> template_suffix (matches templates/page.<suffix>.json in the theme)
HANDLE_TO_SUFFIX: dict[str, str] = {
    "our-story": "about",
    "faq": "faq",
    "contact": "contact",
    "shipping": "shipping",
    "hospitality": "hospitality",
    "weddings": "weddings",
    "styling-ideas": "lookbook",
    "clone-homepage": "clone-homepage",
    "design-system": "design-system",
}


def api_request(method: str, path: str, body: dict[str, Any] | None = None) -> tuple[int, bytes]:
    url = f"https://{SHOP}/admin/api/{API_VERSION}{path}"
    data = None
    headers = {
        "X-Shopify-Access-Token": TOKEN,
        "Content-Type": "application/json",
    }
    if body is not None:
        data = json.dumps(body).encode("utf-8")
    req = urllib.request.Request(url, data=data, headers=headers, method=method)
    ctx = ssl.create_default_context()
    with urllib.request.urlopen(req, timeout=60, context=ctx) as resp:
        return resp.status, resp.read()


def fetch_all_pages() -> list[dict[str, Any]]:
    st, raw = api_request("GET", "/pages.json?limit=250")
    if st != 200:
        raise RuntimeError(f"GET pages failed: {st} {raw[:500]!r}")
    payload = json.loads(raw.decode("utf-8"))
    return list(payload.get("pages", []))


def update_page_template(page_id: int, suffix: str) -> None:
    body = {"page": {"id": page_id, "template_suffix": suffix}}
    st, raw = api_request("PUT", f"/pages/{page_id}.json", body)
    if st not in (200, 201):
        raise RuntimeError(f"PUT page {page_id} failed: {st} {raw[:800]!r}")


def main() -> int:
    if not TOKEN or not TOKEN.startswith("shpat_"):
        print(
            "Set SHOPIFY_ADMIN_ACCESS_TOKEN to a Custom app Admin API token (starts with shpat_).",
            file=sys.stderr,
        )
        print(
            "Admin → Settings → Apps and sales channels → Develop apps → "
            "Create an app → Admin API scopes: read and write Online Store pages.",
            file=sys.stderr,
        )
        return 1

    by_handle = {p["handle"]: p for p in fetch_all_pages()}
    missing = [h for h in HANDLE_TO_SUFFIX if h not in by_handle]
    if missing:
        print("Missing pages in Shopify (create them first):", ", ".join(missing), file=sys.stderr)
        return 1

    for handle, suffix in HANDLE_TO_SUFFIX.items():
        page = by_handle[handle]
        pid = int(page["id"])
        current = page.get("template_suffix") or ""
        if current == suffix:
            print(f"OK (already set)  {handle} -> {suffix}")
            continue
        update_page_template(pid, suffix)
        print(f"Updated           {handle} -> {suffix} (page id {pid})")

    print("Done.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
