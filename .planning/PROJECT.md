# Round Living — Project

## Vision

Become the go-to reference resource for round and circular living structures, then monetize that audience.

## Site

- **URL**: roundliving.com
- **Framework**: Nuxt 4 + @nuxt/content v3 + Nuxt UI v4 + Tailwind CSS v4
- **Hosting target**: Cloudflare Pages (with D1 for content SQLite)

## Current State (2026-03-24)

- Codebase is complete and functional locally
- 50+ content pages exist across 13 sections — all `status: "draft"`, nothing live
- OG/Twitter meta already present on most pages
- Site has not been deployed; Cloudflare deployment is the primary blocker
- `better-sqlite3` (used by @nuxt/content) is incompatible with Cloudflare Workers runtime — must migrate to D1 via NuxtHub

## Done Criteria

1. Site deployed and running on Cloudflare with Nuxt Content queries working
2. At least 3 content sections (3+ pages each) published as `status: "live"`
3. Full SEO and social metadata in place site-wide
4. OG URLs are absolute, canonical tags set, sitemap generated

## Monetization (future)

To be planned after initial launch milestone is achieved.
