# Benchmark Spec

## Horizon benchmark target
- Templates: `templates/page.sandstone-benchmark.json` and `templates/index.json`
- Live route used during rebuild: homepage for fastest parity iteration
- Intended reusable route after handoff: a Shopify page assigned the `page.sandstone-benchmark` template
- Benchmark sections in order:
  1. hero video shell
  2. intro editorial statement
  3. latest works rail
  4. stats image + copy split
  5. services preview split
  6. philosophy editorial paragraph
  7. process methodology list
  8. testimonial slider
  9. journal/blog preview
  10. custom home footer/video stage

## Reference benchmark sources
- Primary: `lexington-reference/sandstone_v6/src/pages/index.astro`
- Supporting reference surfaces:
  - `src/components/landing/`
  - `src/content/`
  - system styling for buttons, links, typography, and search

## Content and asset parity
- Shared benchmark copy mirrors the Sandstone homepage’s editorial structure rather than using stock Shopify placeholder content.
- The OpenAI variant uses the same Sandstone-derived hero video, project covers, service images, testimonial portraits, journal imagery, and footer/team media copied into `horizon-themes/openai/assets/`.
- The homepage and benchmark template now share the same section order, so the screenshot loops compare the same content stack.

## Viewports
- `1440x900`
- `768x1024`
- `390x844`

## Capture workflow
- Horizon capture source for logged loops: hosted Shopify preview with `preview_theme_id=159526519042`
- Reference capture source: local Lexington page at `http://localhost:4321/`
- Preview-bar suppression: `pb=0` query param during hosted Horizon captures
- Capture helper used during earlier loops: `.rebuild/capture-preview.mjs`
- Durable archive note: `screenshots/loop-07/` contains fresh reference + Horizon captures for all required viewports. Loops `02` through `06` reuse the same reference baseline files because the reference page stayed read-only and unchanged while the earlier archived runs originally persisted the Horizon side only.
- Storefront password was supplied interactively and is not written into repo artifacts

## Validation focus
- Floating masthead and search trigger positioning
- Hero wash, crop, oversized logotype scale, and ticker rhythm
- Intro display scale and italic emphasis
- Project rail card geometry and media crop
- Stats and services split-section rhythm
- Philosophy and process editorial density
- Testimonial, journal, and footer spacing balance
- Suppression of default Horizon chrome on the benchmark/homepage

## Known exclusions
- Exact hero-video still frames are not frozen between the local reference and hosted Shopify preview, so some screenshots show the same video at slightly different moments.
- Search modal results and non-home templates were not held to the same 1:1 benchmark standard yet.
- Motion behavior remains lighter than the Astro reference where a simpler Horizon-native implementation was preferred.
