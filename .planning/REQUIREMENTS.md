# Requirements

## Launch Requirements (MVP)

### R1 — Cloudflare Deployment
- Site builds and deploys via Cloudflare Pages
- Nuxt Content v3 queries work in production (D1 via NuxtHub)
- All routes render correctly (/, /info/[...slug], /articles/[...slug])
- Search works in production

### R2 — Content Foundation
- Minimum 3 sections published (`status: "live"`)
- Each section has minimum 3 pages published
- Recommended first sections: Domes, Yurts, Earth-Integrated
- All live pages have: title, description, og.title, og.description, twitter.card, twitter.title

### R3 — SEO Foundation
- Absolute `baseURL` configured in nuxt.config.ts
- OG URLs are absolute (not relative paths)
- Default site-level meta in app.vue (title, description, og)
- Canonical tags on all content pages
- XML sitemap generated at /sitemap.xml (live pages only)
- robots.txt at /robots.txt

## Post-Launch (future phases)
- Monetization strategy (ads, affiliate, sponsorship, etc.)
- Additional content sections published
- Structured data / JSON-LD
- Performance optimisation (search caching, pagination)
