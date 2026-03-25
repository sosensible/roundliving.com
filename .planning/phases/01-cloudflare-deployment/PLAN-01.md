---
phase: 01-cloudflare-deployment
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - nuxt.config.ts
  - wrangler.toml
  - .gitignore
autonomous: true
user_setup: []

must_haves:
  truths:
    - nuxt.config.ts sets nitro.preset to cloudflare_pages
    - wrangler.toml defines a D1 binding named DB
    - npm run build succeeds without errors
    - better-sqlite3 remains in package.json (local dev still uses it)
  artifacts:
    - nuxt.config.ts (updated)
    - wrangler.toml (created)
  key_links:
    - https://content.nuxt.com/docs/deploy/cloudflare-pages
    - https://developers.cloudflare.com/d1/
---

<objective>
Configure the Nuxt project for Cloudflare Pages deployment with @nuxt/content v3 D1 database support, and verify the build succeeds.

Purpose: The site currently uses better-sqlite3 which is incompatible with the Cloudflare Workers runtime. @nuxt/content v3 has native Cloudflare Pages support via D1 using the binding name DB. This plan wires up the config so a production build targeting cloudflare_pages preset succeeds and is ready to connect to a real D1 database in Plan 02.

Output: Updated nuxt.config.ts with cloudflare_pages preset, wrangler.toml with D1 binding placeholder, and a confirmed successful build.
</objective>

<execution_context>
@./.claude/get-shit-done/workflows/execute-plan.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/ROADMAP.md
@.planning/STATE.md
</context>

<tasks>

<task type="auto">
  <name>Task 1: Add nitro cloudflare_pages preset and update nuxt.config.ts</name>
  <files>nuxt.config.ts</files>
  <action>
    Update nuxt.config.ts to add:
    1. nitro.preset set to 'cloudflare_pages'
    2. compatibilityDate updated to '2025-05-15' (required for Cloudflare modules compatibility)

    The final nuxt.config.ts should be:

    ```ts
    // https://nuxt.com/docs/api/configuration/nuxt-config
    export default defineNuxtConfig({
      modules: [
        '@nuxt/ui',
        '@nuxt/content',
      ],
      css: ['~/assets/css/main.css'],
      colorMode: {
        preference: 'system',
      },
      devtools: { enabled: true },
      compatibilityDate: '2025-05-15',
      nitro: {
        preset: 'cloudflare_pages',
      },
    })
    ```

    Note: better-sqlite3 stays in package.json — it is still used by nuxt dev locally. The cloudflare_pages preset causes Nitro to use D1 at runtime instead.
  </action>
  <verify>Run: cat nuxt.config.ts — confirm nitro.preset = 'cloudflare_pages' and compatibilityDate = '2025-05-15' are present</verify>
  <done>nuxt.config.ts contains nitro preset and updated compatibility date</done>
</task>

<task type="auto">
  <name>Task 2: Create wrangler.toml with D1 binding placeholder</name>
  <files>wrangler.toml</files>
  <action>
    Create wrangler.toml in the project root. This file is needed for:
    - Local preview testing via `npx wrangler pages dev .output/public`
    - Cloudflare Pages production to know the D1 binding name

    The D1 binding name MUST be "DB" — this is what @nuxt/content v3 expects by default.

    Use a placeholder database_id and database_name for now. Plan 02 will replace these with real values after the D1 database is created in the Cloudflare dashboard.

    Content:
    ```toml
    name = "roundliving-com"
    compatibility_date = "2025-05-15"

    [[d1_databases]]
    binding = "DB"
    database_name = "roundliving-content"
    database_id = "REPLACE_WITH_REAL_D1_DATABASE_ID"
    ```

    Note: The wrangler.toml should NOT be in .gitignore — it needs to be committed so Cloudflare Pages can read it during CI builds.
  </action>
  <verify>Run: cat wrangler.toml — confirm binding = "DB" and the placeholder database_id is present</verify>
  <done>wrangler.toml exists at project root with DB binding and placeholder ID</done>
</task>

<task type="auto">
  <name>Task 3: Verify build succeeds with cloudflare_pages preset</name>
  <files>(no files modified)</files>
  <action>
    Run the build to confirm the cloudflare_pages preset works:

    ```bash
    npm run build
    ```

    Expected: Build completes without errors. The .output/ directory should be created containing:
    - .output/public/ — static assets
    - .output/server/ — Cloudflare Pages Functions worker

    If the build fails with errors about better-sqlite3 or native bindings, that is expected in certain configs. The cloudflare_pages preset should automatically exclude native Node.js modules from the worker bundle. Check the error message carefully.

    Common issues and fixes:
    - If "Cannot bundle native module better-sqlite3": This means the preset is not excluding it. Add to nuxt.config.ts: `nitro: { preset: 'cloudflare_pages', externals: { external: ['better-sqlite3'] } }`
    - If build succeeds but warns about sqlite: Warnings are acceptable, errors are not.
    - If @nuxt/content complains about missing DB binding: This is expected at build time and not a blocker — it only fails at runtime without a real D1 database.
  </action>
  <verify>
    1. Run: npm run build
    2. Check exit code is 0
    3. Run: ls .output/ — confirm public/ and server/ directories exist
    4. Run: ls .output/server/ — should contain a _worker.js or similar Cloudflare worker entry
  </verify>
  <done>
    - npm run build exits with code 0
    - .output/ directory exists with public/ and server/ subdirectories
    - No unresolvable build errors (warnings are acceptable)
  </done>
</task>

</tasks>

<verification>
After all tasks complete:
1. `cat nuxt.config.ts` — nitro.preset = 'cloudflare_pages' present
2. `cat wrangler.toml` — binding = "DB", database_id = "REPLACE_WITH_REAL_D1_DATABASE_ID"
3. `npm run build` — exits 0, .output/ directory created
4. `ls .output/` — public/ and server/ both present
</verification>

<success_criteria>
- nuxt.config.ts has cloudflare_pages preset and updated compatibilityDate
- wrangler.toml exists with DB binding (placeholder ID)
- npm run build succeeds
- Project is ready for Cloudflare account setup and real D1 provisioning in Plan 02
</success_criteria>

<output>
After completion, create `.planning/phases/01-cloudflare-deployment/01-01-SUMMARY.md` with:
- What was changed in nuxt.config.ts
- Whether the build succeeded or had warnings
- Any deviations from the plan
</output>
