---
phase: 01-cloudflare-deployment
plan: 02
type: execute
wave: 2
depends_on: [01]
files_modified:
  - wrangler.toml
autonomous: false
user_setup:
  - Cloudflare account (free tier is sufficient)
  - D1 database created in Cloudflare dashboard or via wrangler CLI
  - Cloudflare Pages project created and linked to GitHub repo
  - D1 database connected to the Pages project in Cloudflare dashboard

must_haves:
  truths:
    - A real D1 database exists in the user's Cloudflare account
    - wrangler.toml has the real database_id (not placeholder)
    - Cloudflare Pages project exists and is linked to the GitHub repo
    - D1 database is bound to the Pages project with binding name DB
    - First deployment has been triggered (via git push or wrangler pages deploy)
  artifacts:
    - wrangler.toml (updated with real database_id)
    - Cloudflare Pages project (created in dashboard)
    - D1 database (created in Cloudflare)
  key_links:
    - https://dash.cloudflare.com — Cloudflare Dashboard
    - https://developers.cloudflare.com/d1/get-started/
    - https://developers.cloudflare.com/pages/get-started/git-integration/
---

<objective>
Provision the Cloudflare infrastructure (D1 database + Pages project), connect them, and deploy the site for the first time.

Purpose: The build config is ready from Plan 01. Now we need the actual Cloudflare resources created, the wrangler.toml updated with the real database_id, and the first deployment triggered. This plan has human checkpoints because account creation, dashboard operations, and secret retrieval cannot be automated.

Output: A live site accessible at a pages.dev URL, with D1 connected and @nuxt/content queries working.
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

<task type="checkpoint:human-action">
  <name>Task 1: Create Cloudflare account and install wrangler CLI</name>
  <files>(none)</files>
  <action>
    Human must complete these steps:

    **Step 1: Cloudflare account**
    - If you don't have one: go to https://dash.cloudflare.com/sign-up
    - Free tier is sufficient for this project
    - Verify your email

    **Step 2: Install wrangler CLI globally**
    ```bash
    npm install -g wrangler
    ```

    **Step 3: Authenticate wrangler with your Cloudflare account**
    ```bash
    wrangler login
    ```
    This opens a browser window. Log in and authorize wrangler.

    **Step 4: Verify authentication**
    ```bash
    wrangler whoami
    ```
    Should show your account name and account ID.

    Report back: your Cloudflare Account ID (shown in `wrangler whoami` or in the Cloudflare dashboard URL)
  </action>
  <verify>Run: wrangler whoami — should show authenticated account name</verify>
  <done>wrangler whoami returns account name without error</done>
</task>

<task type="checkpoint:human-action">
  <name>Task 2: Create D1 database and update wrangler.toml</name>
  <files>wrangler.toml</files>
  <action>
    Human must create the D1 database, then Claude updates wrangler.toml.

    **Option A — Via wrangler CLI (recommended):**
    ```bash
    wrangler d1 create roundliving-content
    ```
    This outputs something like:
    ```
    ✅ Successfully created DB 'roundliving-content' in region WEUR
    Created your new D1 database.

    [[d1_databases]]
    binding = "DB"
    database_name = "roundliving-content"
    database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
    ```

    **Option B — Via Cloudflare Dashboard:**
    - Go to https://dash.cloudflare.com → Workers & Pages → D1
    - Click "Create database"
    - Name: `roundliving-content`
    - Copy the Database ID shown after creation

    **After creating the database:**
    Share the database_id with Claude so wrangler.toml can be updated with the real value.

    Claude will then:
    - Replace the placeholder `REPLACE_WITH_REAL_D1_DATABASE_ID` in wrangler.toml with the real database_id
  </action>
  <verify>
    1. Run: wrangler d1 list — should show roundliving-content database
    2. Run: cat wrangler.toml — database_id should be a real UUID, not the placeholder
  </verify>
  <done>
    - D1 database named roundliving-content exists in Cloudflare account
    - wrangler.toml has real database_id (UUID format, not placeholder)
  </done>
</task>

<task type="auto">
  <name>Task 3: Run D1 database migration to initialize content schema</name>
  <files>(none — wrangler.toml must already have real database_id)</files>
  <action>
    @nuxt/content v3 generates SQLite migrations during build. After npm run build succeeds, the migration files are in .data/content/ or .nuxt/content/. We need to apply them to the production D1 database.

    Step 1: Ensure a fresh build exists
    ```bash
    npm run build
    ```

    Step 2: Check where @nuxt/content puts its migration files
    ```bash
    ls .nuxt/
    ls .data/ 2>/dev/null || echo "no .data dir"
    ```

    Step 3: Apply migrations to the production D1 database.
    @nuxt/content v3 auto-migrates when the server starts — but for D1, you must run migrations via wrangler before the first deploy. Run:
    ```bash
    wrangler d1 execute roundliving-content --remote --file=.data/content/database.sql
    ```
    or, if that path does not exist, try:
    ```bash
    wrangler d1 execute roundliving-content --remote --command="SELECT 1"
    ```
    (The SELECT 1 just tests connectivity; @nuxt/content may handle schema creation automatically on first run.)

    Important note: @nuxt/content v3 typically creates its own schema on startup. If wrangler d1 execute fails because no migration file exists yet, this step can be skipped — the module will initialize the schema on first request. Document what happened in the summary.

    Step 4: Commit wrangler.toml with real database_id
    ```bash
    git add wrangler.toml nuxt.config.ts
    git commit -m "Add Cloudflare Pages preset and D1 wrangler config"
    ```
  </action>
  <verify>
    Run: wrangler d1 execute roundliving-content --remote --command="SELECT name FROM sqlite_master WHERE type='table'"
    Should return either an empty result (tables not yet created) or content module tables.
  </verify>
  <done>
    - wrangler.toml committed to git with real database_id
    - D1 database connectivity confirmed via wrangler d1 execute
  </done>
</task>

<task type="checkpoint:human-action">
  <name>Task 4: Create Cloudflare Pages project and connect GitHub repo</name>
  <files>(none)</files>
  <action>
    Human must create the Pages project in the Cloudflare dashboard.

    **Steps:**

    1. Go to https://dash.cloudflare.com → Workers & Pages
    2. Click "Create" → "Pages" → "Connect to Git"
    3. Authorize Cloudflare to access your GitHub account if not already done
    4. Select the roundliving.com repository
    5. Configure build settings:
       - **Framework preset**: None (we configure it manually)
       - **Build command**: `npm run build`
       - **Build output directory**: `.output/public`
       - **Root directory**: (leave blank)
    6. Click "Save and Deploy" — this triggers the first build

    **After the project is created:**

    7. Go to the project → Settings → Functions → D1 database bindings
    8. Click "Add binding"
       - **Variable name**: `DB`
       - **D1 database**: select `roundliving-content`
    9. Click Save
    10. Trigger a new deployment (Settings → Deployments → Retry deployment, or git push a commit)

    Report back: the pages.dev URL assigned to your project (e.g., roundliving-com.pages.dev)
  </action>
  <verify>
    After deploy completes:
    - Visit the pages.dev URL in a browser
    - The homepage should load
  </verify>
  <done>
    - Cloudflare Pages project exists
    - D1 binding "DB" connected to roundliving-content database
    - At least one successful deployment completed
    - pages.dev URL is accessible
  </done>
</task>

</tasks>

<verification>
After all tasks complete:
1. `wrangler d1 list` — roundliving-content database visible
2. `cat wrangler.toml` — real database_id present (UUID format)
3. Visit pages.dev URL in browser — homepage loads
4. Check Cloudflare Pages dashboard — deployment status is "Success"
</verification>

<success_criteria>
- D1 database roundliving-content exists in Cloudflare account
- wrangler.toml has real database_id committed to git
- Cloudflare Pages project created with DB binding connected to D1
- Site is accessible at a pages.dev URL (even if routes 404 — connectivity is the goal here)
- Plan 03 (route verification) can proceed
</success_criteria>

<output>
After completion, create `.planning/phases/01-cloudflare-deployment/01-02-SUMMARY.md` with:
- Cloudflare Account ID (for reference)
- D1 database_id
- pages.dev URL
- Whether D1 migrations ran automatically or manually
- Any deviations from the plan
</output>
