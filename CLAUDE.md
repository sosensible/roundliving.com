# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Project

Nuxt 4 content site about round/circular living structures. Uses `@nuxt/content` v3 (SQLite-backed) with Nuxt UI v4 + Tailwind CSS v4. No linter or test runner is configured.

## Content Collections (`content.config.ts`)

| Collection | Source glob | Route prefix | Notes |
|---|---|---|---|
| `articles` | `content/articles/**` | `/articles/` | Editorial content |
| `siteInfo` | `content/info/**` | `/info/` | **Only `status: live` pages render** — draft/review return 404 |

Article categories are subdirectories under `content/articles/` (e.g. `domes/`, `yurts/`, `earth-integrated/`).

## Routing

- `/` — `app/pages/index.vue` (standard Vue page, not a catch-all)
- `/articles/[...slug]` — queries `articles` collection, shows TOC sidebar + breadcrumbs
- `/info/[...slug]` — same layout but filters `siteInfo` to `status = 'live'`; search also filters to live pages only

## Styling

Color tokens (`app.config.ts`): `primary: emerald`, `secondary: sky`, `neutral: slate`

CSS custom properties (in `app/assets/css/main.css`): `--ui-radius: 1rem`, `--ui-container: 76rem`

Markdown content uses `.content-docs` on `<article>` elements. Info pages additionally use `.content-docs-info` to suppress heading anchor decorations.

## SEO

`useSeoMeta` cascade in catch-all pages: twitter fields → og fields → base `title`/`description`/`image`.
