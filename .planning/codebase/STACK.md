# Technology Stack

## Runtime & Framework

- **Node.js**: No specific version pinned; uses ES modules (`"type": "module"`)
- **Nuxt**: v4.4.2
- **Vue**: 3.x (implicit via Nuxt 4)

## Core Dependencies

### Web Framework
- **@nuxt/ui**: v4.5.1 — Component library for Vue 3 with Tailwind CSS integration
- **@nuxt/content**: v3.12.0 — File-based CMS with SQLite backend for content management

### Content & Markdown
- **better-sqlite3**: v12.6.2 — SQLite driver for local database operations (powers @nuxt/content)
- **Shiki** (transitive) — Syntax highlighting for code blocks in markdown

### Styling & UI
- **tailwindcss**: v4.2.1 — Utility-first CSS framework with full v4 features
- **@iconify-json/lucide**: v1.2.97 — Lucide icon set for Vue components

## Build & Dev Tools

### Scripts
```json
{
  "build": "nuxt build",
  "dev": "nuxt dev",
  "generate": "nuxt generate",
  "preview": "nuxt preview"
}
```

### Build Tooling (Implicit)
- **Vite** — Development server and build tool (handled by Nuxt 4)
- **Rollup** — Module bundler (via Vite)

### Development Features
- **Nuxt DevTools**: Enabled for development debugging and inspection

## CSS Framework & Styling

### Tailwind CSS v4
- Imported via `@import "tailwindcss"` in main stylesheet
- Custom properties defined in `:root`:
  - `--ui-radius: 1rem` — Unified border radius
  - `--ui-container: 76rem` — Container max-width

### Nuxt UI v4 Integration
- Integrated via `@import "@nuxt/ui"`
- Color token configuration (`app.config.ts`):
  - Primary: `emerald`
  - Secondary: `sky`
  - Neutral: `slate`
- Semantic color system with light/dark modes

### Custom Styling
- Main stylesheet: `app/assets/css/main.css`
- Content markdown styles via `.content-docs` and `.content-docs-info` classes
- Responsive typography with fluid scaling (clamp functions)
- Color mixing with CSS `color-mix()` for theme-aware colors

## Content Management

### @nuxt/content v3 (SQLite-backed)

**Collections defined in `content.config.ts`:**

| Collection | Source Glob | Route Prefix | Notes |
|---|---|---|---|
| `articles` | `articles/**` | `/articles/` | Editorial content |
| `siteInfo` | `info/**` | `/info/` | Only `status: live` renders |

### SEO Metadata Schema (both collections)
- `image`: Optional image URL
- `og`: Open Graph — `title`, `description`, `image`
- `twitter`: Twitter Card — `card` enum, `title`, `image`

## TypeScript Configuration

- TypeScript used throughout (Vue 3 Composition API with `<script setup>`)
- References auto-generated Nuxt tsconfig files under `.nuxt/`

## Nuxt Configuration

- **Compatibility Date**: 2024-04-03
- **Color Mode**: System preference default
- **CSS**: Global `main.css` imported
- **Modules**: `@nuxt/ui`, `@nuxt/content`

## No Additional Tooling

- No linter (ESLint/Prettier not installed)
- No test runner (Jest/Vitest not installed)
- No CI/CD pipeline files
- No environment variables required for base functionality
