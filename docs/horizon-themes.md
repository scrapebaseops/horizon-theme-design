# LLM variant themes (`horizon-themes/`)

Three **copies** of the same Horizon baseline—one per model experiment. Each copy maps to its **own unpublished theme** on the dev store so you can push and preview independently.

| Variant   | Local path                 | Shopify theme name   | Theme ID    |
|-----------|----------------------------|----------------------|-------------|
| Claude    | `horizon-themes/claude/`   | Horizon (Claude)     | `159526027522` |
| OpenAI    | `horizon-themes/openai/`   | Horizon (OpenAI)     | `159526519042` |
| Gemini    | `horizon-themes/gemini/`   | Horizon (Gemini)     | `159526584578` |

**Store:** `theme-dev-store-2037.myshopify.com`

## Shopify CLI (from repo root)

Use **`-e`** so the correct folder and remote theme are paired (see `shopify.theme.toml`).

```bash
# Local hot reload + preview proxy
shopify theme dev -e claude
shopify theme dev -e openai
shopify theme dev -e gemini
```

Only one `theme dev` per machine needs the storefront password if the store is password-protected:

```bash
shopify theme dev -e openai --store-password "YOUR_PASSWORD"
```

**Push** edits for a single variant:

```bash
shopify theme push -e claude
shopify theme push -e openai
shopify theme push -e gemini
```

**Pull** remote changes back (rare; use the matching environment):

```bash
shopify theme pull -e claude
```

## Hosted preview (no local server)

Same viewport, swap `preview_theme_id`:

- Claude: `https://theme-dev-store-2037.myshopify.com?preview_theme_id=159526027522`
- OpenAI: `https://theme-dev-store-2037.myshopify.com?preview_theme_id=159526519042`
- Gemini: `https://theme-dev-store-2037.myshopify.com?preview_theme_id=159526584578`

## Notes

- **Do not** run `theme dev` for two variants at once on the **same default port**; use `--port 9293` (etc.) if you need two processes.
- **Gemini** remote theme was created with `shopify theme duplicate` because `theme push --unpublished` required an interactive theme name in this environment.
- If Shopify **theme limits** block new themes, remove an unused unpublished theme in Admin before duplicating.
