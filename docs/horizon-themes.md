# LLM variant themes (`horizon-themes/`)

Three **copies** of the same Horizon baseline—one per model experiment. Each copy maps to its **own unpublished theme** on the dev store so you can preview independently.

| Variant   | Local path                 | Shopify theme name   | Theme ID    |
|-----------|----------------------------|----------------------|-------------|
| Claude    | `horizon-themes/claude/`   | Horizon (Claude)     | *TBD — push to new store* |
| OpenAI    | `horizon-themes/openai/`   | Horizon (OpenAI)     | *TBD — push to new store* |
| Gemini    | `horizon-themes/gemini/`   | Horizon (Gemini)     | *TBD — push to new store* |

**Store:** `theme-dev-store-2038.myshopify.com`
**Store password:** `reufia`

> Theme IDs are not yet set up on this store. When you're ready to create them, push each variant with `shopify theme push -e <variant> --unpublished` and update the IDs in `shopify.theme.toml` and this table.

## Shopify CLI (from repo root)

Use **`-e`** so the correct folder and remote theme are paired (see `shopify.theme.toml`).

```bash
# Local hot reload + preview proxy
shopify theme dev -e claude --store-password "reufia"
shopify theme dev -e openai --store-password "reufia"
shopify theme dev -e gemini --store-password "reufia"
```

## Notes

- **Do not** run `theme dev` for two variants at once on the **same default port**; use `--port 9293` (etc.) if you need two processes.
- If Shopify **theme limits** block new themes, remove an unused unpublished theme in Admin before creating a new one.
