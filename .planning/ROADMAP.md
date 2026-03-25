# Roadmap

## Milestone 1 — Launch

### Phase 01 — Cloudflare Deployment
**Goal:** Site running on Cloudflare Pages with Nuxt Content v3 queries working via D1.

**Acceptance Criteria:**
- `npm run build` succeeds with cloudflare-pages preset
- NuxtHub configured, D1 database provisioned
- All routes render in production (/, /info/*, /articles/*)
- Search functional in production
- Deployment is repeatable via `nuxthub deploy` or git push

**Why first:** Everything else depends on a working deployment target.

---

### Phase 02 — SEO Foundation
**Goal:** Site-wide SEO is correct and complete before any content goes live.

**Acceptance Criteria:**
- `baseURL` set to `https://roundliving.com` in nuxt.config.ts
- OG URLs are absolute on all content pages
- Default meta (title, description, og) set in app.vue
- Canonical tags on /info/* and /articles/* routes
- `/sitemap.xml` generated (live pages only)
- `/robots.txt` present and correct

**Why second:** SEO config needs production domain; fixes must be in before content is indexed.

---

### Phase 03 — Content Launch
**Goal:** 3 sections × 3+ pages published as `status: "live"` with complete metadata.

**Sections to publish:**
1. **Domes** — geodesic-domes, monolithic-domes (+ add one more page)
2. **Yurts** — traditional-mongolian-yurts-gers, modern-engineered-yurts, hard-shell-yurts
3. **Earth-Integrated** — earth-sheltered-domes, earthbag-roundhouses, hobbit-style-round-homes

**Acceptance Criteria:**
- All selected pages reviewed for content quality
- All selected pages have complete OG + Twitter metadata
- All selected pages set to `status: "live"`
- Section index pages (`/info/domes/`, etc.) also set to live
- Pages visible in search and on info index

**Why third:** Content launches after platform and SEO are solid.

---

## Milestone 2 — Growth (future)
- Additional content sections published
- Monetization strategy planned and implemented
- Performance optimizations
- Structured data / JSON-LD
