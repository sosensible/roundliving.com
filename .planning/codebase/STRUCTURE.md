# Project Structure

## Root Layout

```
roundliving.com/
├── app/                    # Nuxt application source
├── content/                # Markdown content (built into SQLite)
├── public/                 # Static assets served at root
├── .planning/              # Documentation & planning
├── nuxt.config.ts          # Nuxt configuration
├── content.config.ts       # @nuxt/content collections
├── app.config.ts           # UI color tokens
├── tsconfig.json           # TypeScript references → .nuxt/tsconfig.*.json
└── package.json            # Dependencies & scripts
```

## `app/` — Application Source

```
app/
├── app.vue                             # Root: <UApp> + <NuxtLayout> + <NuxtPage>
├── assets/css/
│   └── main.css                        # Tailwind + Nuxt UI imports; .content-docs rules
├── components/
│   ├── Alert.vue                       # Extends Nuxt UI Alert
│   ├── ColorModeToggle.vue             # System/light/dark switcher
│   └── Counter.vue                     # Demo component (unused in live pages)
├── layouts/
│   └── default.vue                     # Global layout: header, nav, search, footer
└── pages/
    ├── index.vue                       # Home page (static)
    ├── articles/
    │   └── [...slug].vue               # Articles catch-all
    └── info/
        ├── index.vue                   # Info hub (grouped live pages)
        └── [...slug].vue               # Info catch-all (live-only)
```

### Key File Roles

**`app.vue`** — Thin root wrapper. `<UApp>` provides Nuxt UI context. `<NuxtRouteAnnouncer>` for accessibility.

**`assets/css/main.css`** — Imports Tailwind v4 + Nuxt UI. Defines `--ui-radius: 1rem`, `--ui-container: 76rem`. Contains `.content-docs` typography rules (headings, paragraphs, links, code, images). `.content-docs-info` suppresses heading anchor colors on info pages.

**`layouts/default.vue`** — Header (logo + nav + search button + color mode toggle), decorative radial gradients, main `<slot>`, footer. Owns global search state and queries all collection search sections on mount.

**`pages/articles/[...slug].vue`** — `useAsyncData` + `queryCollection('articles').path()`. Renders breadcrumbs (from slug segments), sticky TOC sidebar (desktop), `<ContentRenderer>`. Sets SEO meta with twitter→og→base cascade. Throws 404 if no matching content.

**`pages/info/index.vue`** — Queries all `status: live` info docs. Groups by first path segment (category). Displays as 2-column card grid per category group.

**`pages/info/[...slug].vue`** — Same as articles catch-all but additionally checks `page.status === 'live'`; throws 404 for draft/review. Uses both `.content-docs` and `.content-docs-info`.

---

## `content/` — Markdown Sources

```
content/
├── articles/
│   └── getting-started.md             # Only article currently
└── info/
    ├── about.md                        # status: draft (won't render)
    ├── test.md                         # status: draft (orphaned)
    ├── index.md                        # Info hub content
    ├── circular-roundhouse-structures/
    ├── curved-organic-architecture/
    ├── domes/
    ├── earth-integrated/
    ├── engineered-circular-systems/
    ├── experimental-futuristic-round-homes/
    ├── hospitality-glamping-round-structures/
    ├── indigenous-vernacular-round-homes/
    ├── in-nature/
    ├── people/
    ├── towers-lighthouses/
    ├── utility-buildings/
    └── yurts/
```

### Content File Format

```yaml
---
title: "Page Title"
description: "SEO description"
status: "live"            # info only; "draft"|"review"|"live"
image: "/path/to/image"  # fallback social image
og:
  title: "Custom OG title"
  description: "Custom OG description"
  image: "/path/to/og-image"
twitter:
  card: "summary_large_image"
  title: "Custom Twitter title"
  image: "/path/to/twitter-image"
---

Markdown body here. Headings generate TOC entries.
```

Articles: all fields optional, no status. Info: same plus `status` (default `live`).

---

## `public/` — Static Assets

```
public/
└── favicon.ico
```

---

## Configuration Files

**`nuxt.config.ts`** — Minimal: modules (`@nuxt/ui`, `@nuxt/content`), global CSS, color mode (system default), devtools enabled, compatibility date `2024-04-03`.

**`content.config.ts`** — Defines two collections (`articles`, `siteInfo`) with Zod schemas for SEO metadata fields.

**`app.config.ts`** — Sets Nuxt UI color tokens: `primary: emerald`, `secondary: sky`, `neutral: slate`.

---

## Naming Conventions

| Type | Convention | Example |
|---|---|---|
| Vue components | PascalCase | `ColorModeToggle.vue` |
| Pages/layouts | kebab-case or bracket notation | `[...slug].vue` |
| Markdown files | kebab-case | `getting-started.md` |
| Content categories | kebab-case directories | `earth-integrated/` |
| CSS classes | Tailwind utilities + two custom classes | `.content-docs` |
| Route slugs | kebab-case | `/articles/geodesic-domes` |

---

## Agent/Tool Directories (Dev Only)

`.claude/`, `.agents/`, `.goose/` — Skill files for AI coding assistants. Not part of the application.
