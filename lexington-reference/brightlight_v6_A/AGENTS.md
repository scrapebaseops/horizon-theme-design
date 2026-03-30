# AGENTS.md — Brightlight (@lexington/brightlight)

**Brightlight** is a multi-page marketing / SaaS-style Astro theme from [Lexington Themes](https://lexingtonthemes.com/). It ships landing patterns (heroes, feature grids, pricing, testimonials, CTAs), auth-style **Sign in** / **Sign up** shells, and content-driven sections for **blog**, **changelog**, **customers** (case studies), **integrations**, **help center**, **legal**, and **team** — suitable for product marketing sites and developer-facing products.

## Tech stack

| Area | Details |
|------|---------|
| **Runtime** | Node.js 18 or 20 (per README); npm |
| **Framework** | [Astro](https://astro.build/) `^6.0.0` |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) `^4.1.18` via `@tailwindcss/vite` |
| **Content** | `astro:content` with `glob` loaders + [Zod](https://zod.dev/) (`astro/zod`) in `src/content.config.ts` |
| **MD** | `@astrojs/mdx` `^5.0.0` (integrated in `astro.config.mjs`; no `.mdx` files in repo at time of writing) |
| **Markdown** | Shiki with `css-variables` theme; `drafts: true` in config |
| **Feeds / SEO** | `@astrojs/rss` `^4.0.17`, `@astrojs/sitemap` `^3.7.0`, `@lexingtonthemes/seo` `^0.1.0` (`AstroSeo` in `src/components/fundations/head/Seo.astro`) |
| **Plugins** | `@tailwindcss/forms`, `@tailwindcss/typography` (dev), `tailwind-scrollbar-hide` |

**Build config:** `astro.config.mjs` — `site: 'https://yourwebsite.com'` (replace for production); integrations: `sitemap()`, `mdx()`.

## Folder map

| Path | Role |
|------|------|
| `src/pages/` | File-based routes; dynamic `[...slug].astro` and `blog/tags/[tag].astro` |
| `src/layouts/` | `BaseLayout.astro`, plus `BlogLayout`, `ChangelogLayout`, `CustomersLayout`, `HelpCenterLayout`, `IntegrationsLayout`, `LegalLayout`, `TeamLayout` |
| `src/components/` | Section UI (`heros/`, `features/`, `pricing/`, …), `global/` (nav, footer), `fundations/` (design system: `elements/`, `containers/`, `icons/`, `head/`) |
| `src/content/` | Markdown per collection (`posts/`, `changelog/`, …) |
| `src/content.config.ts` | Collection loaders + Zod schemas |
| `src/styles/global.css` | Tailwind v4 entry: `@theme` tokens (fonts, accent/sand/base palettes, marquee keyframes), Shiki / code block CSS variables |
| `src/images/` | Themed assets (blog, brands, changelog, customers, integrations, team) |
| `public/` | **Not present in this repo.** Static URLs often point at `/src/images/...` in content frontmatter (rely on Astro’s handling for dev/build). |

**Alias:** `@/*` → `src/*` (`tsconfig.json`).

## Content collections

All collections use `glob({ pattern: "**/*.md", base: "./src/content/<name>" })`. Image fields are **`{ url: string, alt: string }`** (plain strings in frontmatter), not Astro `image()` helpers.

| Collection | Folder | Required / notable fields | Template file |
|------------|--------|---------------------------|---------------|
| **customers** | `src/content/customers/` | `customer`, `avatar`, `logo`, `challengesAndSolutions` (array of `{ title, content }`), `results` (string array), `about`, `details` (record string→string). Optional: `bgColor`, `ctaTitle`, `testimonial`, `partnership`. | `src/content/customers/1.md` |
| **integrations** | `src/content/integrations/` | `email`, `integration`, `description`, `permissions` (string array), `details` (array of `{ title, value, url? }`), `logo`, `tags` (string array). | `src/content/integrations/1.md` |
| **helpcenter** | `src/content/helpcenter/` | `page`, `description`. Optional: `iconId`, `category`, `keywords`, `lastUpdated`, `faq` (`{ question, answer }[]`). | `src/content/helpcenter/1.md` |
| **changelog** | `src/content/changelog/` | `page`, `description`, `pubDate` (date), `image` (`url` + `alt`). | `src/content/changelog/1.md` |
| **legal** | `src/content/legal/` | `page`, `pubDate` (date). | `src/content/legal/terms.md` |
| **team** | `src/content/team/` | `name`, `image`. Optional: `role`, `bio`, `socials` (`twitter`, `website`, `linkedin`, `email`). | `src/content/team/david-lee.md` |
| **posts** | `src/content/posts/` | `title`, `pubDate`, `description`, `team` (string id matching a team entry, e.g. `david-lee`), `image`, `tags` (string array). | `src/content/posts/1.md` |

**Copy pattern:** Duplicate an existing `.md` in the same folder, keep frontmatter keys aligned with the Zod schema, and match `team` in posts to a real `src/content/team/<slug>.md` basename.

## Routing conventions

| URL area | Source | Notes |
|----------|--------|--------|
| `/` | `src/pages/index.astro` (alternate home: `index-two.astro`) | |
| `/about`, `/contact`, `/sign-in`, `/sign-up` | Same-named `.astro` files | |
| `/blog` | `src/pages/blog/index.astro` | Lists `posts` collection |
| `/blog/posts/[slug]` | `src/pages/blog/posts/[...slug].astro` | `getStaticPaths` uses `getCollection("posts")`; param `slug` = entry `id` (Markdown stem, e.g. `1`, `10`) |
| `/blog/tags`, `/blog/tags/[tag]` | `blog/tags/index.astro`, `[tag].astro` | Tags derived from `posts` `tags` arrays |
| `/changelog/...` | `changelog/index.astro`, `[...slug].astro` | Slug = changelog entry `id` |
| `/customers/...` | `customers/index.astro`, `[...slug].astro` | |
| `/helpcenter/...` | `helpcenter/index.astro`, `[...slug].astro` | |
| `/integrations/...` | `integrations/index.astro`, `[...slug].astro` | |
| `/legal/...` | `legal/[...slug].astro` | e.g. `terms`, `privacy` from filenames |
| `/team/...` | `team/index.astro`, `[...slug].astro` | |
| `/system/*` | `system/overview.astro`, `colors.astro`, `typography.astro`, `buttons.astro`, `links.astro` | Internal design reference |
| `/404` | `404.astro` | |
| `/rss.xml` | `src/pages/rss.xml.js` | RSS feed (see implementation for glob paths) |

Several dynamic routes set `trailingSlash: false` in `getStaticPaths`.

## Customization guide

| Goal | Where to edit |
|------|----------------|
| **Production site URL** | `astro.config.mjs` → `site`; align canonical/OG URLs in `src/components/fundations/head/Seo.astro` (currently placeholder `yourwebsite.com` values). |
| **Colors / typography / Tailwind theme** | `src/styles/global.css` — `@theme` block (`--font-sans`, `--color-accent-*`, `--color-sand-*`, `--color-base-*`, animations). |
| **Global chrome** | `src/layouts/BaseLayout.astro` (imports `global.css`, `BaseHead`, toggles `Navigation` / `Footer` via `hideNav` / `hideFooter`). |
| **Head / SEO shell** | `src/components/fundations/head/BaseHead.astro` → `Seo`, `Meta`, `Fonts`, `Favicons`, `Fuse` script |
| **Nav & footer** | `src/components/global/Navigation.astro`, `src/components/global/Footer.astro` |
| **Logo** | `src/components/assets/Logo.astro` |

## Commands

From README (project root):

| Command | Action |
|---------|--------|
| `npm install` | Install dependencies |
| `npm run dev` | Dev server |
| `npm run build` | Output to `./dist/` |
| `npm run preview` | Preview production build |
| `npm run astro ...` | Astro CLI |
| `npm run astro --help` | CLI help |

## Guardrails

- **Do not rename** `src/components/fundations/` — the spelling `fundations` is intentional and used across imports (`@/components/fundations/...`).
- **Content schemas:** Changing `src/content.config.ts` without updating every page/layout that reads `entry.data` will break builds; keep fields minimal and consistent with existing consumers.
- **Images:** This theme uses explicit `url` / `alt` objects in frontmatter; migrating to `image()` would require coordinated schema and component updates.
- Prefer small, pattern-matching edits over wide refactors.

## Lexington Theme — docs & support

Use the same link pattern as the project README:

- **Theme specs:** https://lexingtonthemes.com/templates/brightlight  
- **Documentation:** https://lexingtonthemes.com/documentation  
- **Changelog:** https://lexingtonthemes.com/changelog/brightlight  
- **Support:** https://lexingtonthemes.com/legal/support/  
- **Get the bundle:** https://lexingtonthemes.com  

---

*Publisher: Lexington Themes — https://lexingtonthemes.com/*
