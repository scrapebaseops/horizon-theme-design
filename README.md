# Horizon Theme (Dev Template)

This repository holds the **Horizon** Shopify theme plus room for non-theme project files. Only the **`horizon-theme/`** directory is a valid Shopify theme and should be what you sync with Shopify.

## Layout

```text
.
├── horizon-theme/         # Shopify theme (Liquid, assets, config, etc.) — this is what dev/push/pull targets
├── shopify.theme.toml     # Shopify CLI defaults: store, theme id, path
├── README.md
└── …                      # Add sibling folders for docs, design, tooling, etc. (not uploaded unless you misconfigure CLI)
```

- **`horizon-theme/`** — Must keep the [standard Shopify theme structure](https://shopify.dev/docs/storefronts/themes/tools/cli#directory-structure) (`assets`, `blocks`, `config`, `layout`, `locales`, `sections`, `snippets`, `templates`).
- **Everything else at the repo root** — Safe for READMEs, notes, mockups, scripts, or other repos; it is **not** part of the theme and is **not** pushed when you point CLI at `horizon-theme/` (or use this `shopify.theme.toml`).

If you previously ran `shopify theme dev` from the old flat layout, **stop that process** (Ctrl+C) and start it again from this repo root so it watches **`horizon-theme/`**.

## Prerequisites

- [Shopify CLI](https://shopify.dev/docs/api/shopify-cli) 3.x
- Node.js 18+ (for CLI / MCP tooling)
- Access to the dev store and theme (staff/collaborator or owner)

## Shopify CLI from the repo root

`shopify.theme.toml` defines a **`default`** environment with `store`, `theme`, and `path = "horizon-theme"`. After `shopify auth login`, run:

```bash
cd "/path/to/Horizon Theme (Dev Template)"
shopify theme dev
```

Other common commands (same directory):

```bash
shopify theme pull
shopify theme push
shopify theme check
shopify theme list
```

To be explicit without the config file:

```bash
shopify theme dev  --path horizon-theme -s theme-dev-store-2037.myshopify.com -t 159526027522
shopify theme push --path horizon-theme -s theme-dev-store-2037.myshopify.com -t 159526027522
```

### Password-protected storefront

If the dev storefront is password-protected, `theme dev` may ask for the **storefront** password (Online Store → Preferences), or pass it once:

```bash
shopify theme dev --store-password "YOUR_STOREFRONT_PASSWORD"
```

Avoid committing passwords; prefer typing at the prompt or a local env var your shell exports.

## Ignoring files inside the theme

To exclude paths **inside** `horizon-theme/` from push/pull (e.g. local experiments), add a **`horizon-theme/.shopifyignore`** file. See [Excluding files from Shopify CLI](https://shopify.dev/docs/storefronts/themes/tools/cli#excluding-files-from-shopify-cli).

## Updating store or theme id

Edit **`shopify.theme.toml`** if the dev store hostname or unpublished theme id changes. You can copy the theme id from Admin → Online Store → Themes, or `shopify theme list --path horizon-theme`.

## Related docs

- [Shopify CLI for themes](https://shopify.dev/docs/storefronts/themes/tools/cli)
- [Theme environments](https://shopify.dev/docs/storefronts/themes/tools/cli/environments)
- [`theme push`](https://shopify.dev/docs/api/shopify-cli/theme/theme-push) / [`theme dev`](https://shopify.dev/docs/api/shopify-cli/theme/theme-dev)
