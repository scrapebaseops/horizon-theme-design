# Horizon Theme (Dev Template)

This repository holds **multiple copies** of a **Horizon** Shopify theme (one per LLM experiment) plus non-theme project files. Each copy under **`horizon-themes/`** is a full, valid theme tree and syncs to its **own unpublished theme** on the dev store.

## LLM comparison workflow

- **`horizon-themes/claude/`** → remote **Horizon (Claude)** — theme ID `159526027522`
- **`horizon-themes/openai/`** → remote **Horizon (OpenAI)** — theme ID `159526519042`
- **`horizon-themes/gemini/`** → remote **Horizon (Gemini)** — theme ID `159526584578`

Preview URLs, push/pull commands, and IDs are summarized in **`docs/horizon-themes.md`**.

Work in **one variant folder at a time**; use **`-e claude`**, **`-e openai`**, or **`-e gemini`** so Shopify CLI targets the right directory and remote theme. **`default`** in `shopify.theme.toml` is the same as **`claude`**.

## Project goals (Lexington → Horizon)

We are recreating the **visual design language** of a purchased **Lexington** theme inside **Horizon**—without porting Lexington’s framework. The target is **tight visual parity** and a **reusable design system** (tokens, primitives, then sections). Full strategy: **`docs/PROJECT_CONTEXT.md`**.

- **Implementation:** `horizon-themes/<variant>/` (pick claude, openai, or gemini per experiment)
- **Visual reference (read-only):** `lexington-reference/`

## Layout

```text
.
├── horizon-themes/
│   ├── claude/            # Horizon copy for Claude restyle → Horizon (Claude) on Shopify
│   ├── openai/            # Horizon copy for OpenAI restyle → Horizon (OpenAI)
│   └── gemini/            # Horizon copy for Gemini restyle → Horizon (Gemini)
├── lexington-reference/   # Lexington reference (not synced to Shopify)
├── docs/                  # PROJECT_CONTEXT.md, horizon-themes.md, skills/
├── shopify.theme.toml     # Environments: default, claude, openai, gemini
├── README.md
└── …
```

Each folder under **`horizon-themes/`** must keep the [standard Shopify theme structure](https://shopify.dev/docs/storefronts/themes/tools/cli#directory-structure).

## Prerequisites

- [Shopify CLI](https://shopify.dev/docs/api/shopify-cli) 3.x
- Node.js 18+ (for CLI / MCP tooling)
- Access to the dev store (staff/collaborator or owner)

## Shopify CLI from the repo root

Always run from the **repository root** (parent of `horizon-themes/`). Do **not** run CLI from inside a variant folder alone, or `path` from `shopify.theme.toml` may double up.

After `shopify auth login`:

```bash
cd "/path/to/Horizon Theme (Dev Template)"

# Local preview + sync (pick one variant)
shopify theme dev -e claude
shopify theme dev -e openai
shopify theme dev -e gemini
```

Push / pull / list for that variant:

```bash
shopify theme push -e openai
shopify theme pull -e gemini
shopify theme list -e claude
```

### Password-protected storefront

```bash
shopify theme dev -e claude --store-password "YOUR_STOREFRONT_PASSWORD"
```

Avoid committing passwords.

## Ignoring files inside a variant

Add **`horizon-themes/<variant>/.shopifyignore`** for paths to exclude from sync. See [Excluding files from Shopify CLI](https://shopify.dev/docs/storefronts/themes/tools/cli#excluding-files-from-shopify-cli).

## Updating `shopify.theme.toml`

Edit store hostname or theme IDs if you recreate themes on Shopify. Use Admin → Online Store → Themes or `shopify theme list -e claude`.

## Related docs

- **`docs/horizon-themes.md`** — IDs, preview links, variant commands
- [Shopify CLI for themes](https://shopify.dev/docs/storefronts/themes/tools/cli)
- [Theme environments](https://shopify.dev/docs/storefronts/themes/tools/cli/environments)
- [`theme push`](https://shopify.dev/docs/api/shopify-cli/theme/theme-push) / [`theme dev`](https://shopify.dev/docs/api/shopify-cli/theme/theme-dev)
