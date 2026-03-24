# Technical Concerns & Areas for Improvement

## Error Handling & Edge Cases

**Missing async error handling in search**
- `app/layouts/default.vue` search filters by `liveInfoPaths` set but has no fallback if `infoSections` or `liveInfoPages` fail to load — silent failure possible.

**Breadcrumb path assumptions**
- Both catch-all page components assume specific path structures; if a path doesn't match, breadcrumb items are silently skipped.

**ContentRenderer lacks error boundary**
- No fallback UI if page body is malformed or `page.value?.body?.toc?.links` has unexpected structure.

---

## Missing Validation

**No SEO metadata requirements**
- `title` and `description` are optional in both collections; pages can publish without any SEO metadata.

**No broken-link detection**
- Nothing prevents live content from linking to draft/review pages.

**Status typo risk**
- No build-time check that `status` values in info pages are spelled correctly.

---

## Performance

**Search index rebuilt on every page load**
- `queryCollectionSearchSections()` runs on each page with no caching. Will degrade with more content.

**Info index loads all pages at once**
- `app/pages/info/index.vue` uses `.all()` — no pagination. Currently ~60+ pages.

**Computed values not memoized**
- `groupedLiveItems`, `totalLiveItems`, and `flattenTocLinks()` all re-run on each render.

**No image optimization**
- Content images render as plain `<img>` tags — no lazy-loading, responsive hints, or format optimization.

---

## Accessibility

**TOC hierarchy not semantic**
- TOC uses computed `paddingLeft` for visual nesting instead of semantic structure; screen readers won't understand hierarchy. No ARIA landmark on the aside.

**Keyboard shortcut not surfaced**
- Cmd/Ctrl+K search shortcut not documented anywhere in the UI.

---

## Dead Code & Stale Content

**Counter component unused**
- `app/components/Counter.vue` is referenced in `getting-started.md` demo content but not used in any live page. Dead bundle weight.

**Orphaned draft pages**
- `content/info/about.md` (`status: draft`) and `content/info/test.md` (`status: draft`) are leftover development content. `test.md` references a non-existent image `/social/my-post.png`.

**Thin article content**
- `content/articles/` contains only `getting-started.md`. The index page implies a browsable library but there's nothing to browse.

---

## CSS / Styling

**Hardcoded color hex**
- `app/assets/css/main.css` hardcodes `#10b981` (emerald) for content links instead of using the Tailwind token — diverges if the primary color changes.

**Inline styles for TOC indentation**
- `:style="{ paddingLeft: ... }"` calculated at runtime; should be CSS classes.

**Dark mode gradient quality unknown**
- Header gradients use `rgba` hardcoded for light mode. Dark mode appearance not validated.

---

## SEO

**Relative OG URLs**
- `ogUrl: route.path` produces a relative URL; social crawlers expect absolute URLs. No `baseURL` configured in `nuxt.config.ts`.

**No canonical tags**
- No canonical meta set, risking duplicate-content issues if the site is mirrored.

**No structured data**
- No JSON-LD (Article, BreadcrumbList, Organization schemas).

**No root-level fallback meta**
- `app.vue` has no `useSeoMeta` with default title/description; 404 pages likely have no metadata.

---

## Scalability

**Hardcoded navigation**
- Top nav routes are hardcoded in `app/layouts/default.vue`. Adding new top-level sections requires a code change.

**Single nearly-identical catch-all structure**
- Articles and info pages duplicate layout logic; no shared content page component abstraction.

---

## Dependencies & Build

**No version pinning strategy**
- All deps use caret ranges (`^3.12.0`). No documented lock-file policy.

**`better-sqlite3` native bindings**
- Platform-specific native module; could cause issues on different deployment architectures (e.g., edge/serverless).

**No bundle analysis**
- No tooling to track bundle size over time.

---

## Documentation & Maintenance

**README is generic starter template**
- Doesn't reflect Round Living content structure, categories, or conventions.

**Magic numbers**
- Search truncation at 107 chars, TOC padding formula (`0.5 + level * 0.75`), grid column fractions — none documented or extracted as named constants.

---

## Quick Wins

1. Delete `content/info/test.md` (orphaned draft with broken image ref)
2. Decide on `content/info/about.md` — publish or remove
3. Remove or repurpose `app/components/Counter.vue`
4. Replace hardcoded `#10b981` with Tailwind `theme(colors.emerald.500)` or CSS variable
5. Set absolute `baseURL` in `nuxt.config.ts` for proper OG URLs
6. Update README with actual site structure and how to add content
