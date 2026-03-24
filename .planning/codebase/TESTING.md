# Testing Setup and Strategy

## Summary

**No testing framework is configured.** There are no unit, integration, or e2e tests.

From `CLAUDE.md`: _"No linter or test runner is configured."_

## Current State

| Area | Status |
|---|---|
| Test framework | None |
| Test files | None |
| Test scripts | None in `package.json` |
| Config files | None (`vitest.config.ts`, etc.) |
| Linter | None (no ESLint/Prettier) |
| Coverage | Not measured |

## Available Scripts

```json
{
  "build": "nuxt build",
  "dev": "nuxt dev",
  "generate": "nuxt generate",
  "preview": "nuxt preview"
}
```
Manual testing via `npm run dev` and `npm run preview`.

## Code Quality Without Tests

- **TypeScript**: Full type coverage in components and utilities
- **Content Schema Validation**: Zod schemas validate frontmatter via `@nuxt/content`
- **Error Handling**: Explicit 404 handling in catch-all routes
- **Nuxt DevTools**: Enabled (`devtools: { enabled: true }`)

## If Tests Are Added

Recommended stack for Nuxt 4:
- **Unit/Component**: `vitest` + `@vue/test-utils` — Nuxt's recommended, fast, Vue-aware
- **E2E**: `Playwright` (or Cypress) — browser automation, headless for CI

Conventions to follow if implemented:
- Test files: `tests/` or `__tests__/`, named `*.test.ts` or `*.spec.ts`
- Add `test` script to `package.json`
- Add `vitest.config.ts` at project root
