---
phase: 01-cloudflare-deployment
plan: 03
type: execute
wave: 3
depends_on: [02]
files_modified: []
autonomous: false
user_setup:
  - pages.dev URL from Plan 02

must_haves:
  truths:
    - Homepage (/) loads and renders content in production
    - At least one /info/* route renders without 404 or error
    - At least one /articles/* route renders without 404 or error
    - Search returns results (not empty/broken) on the production site
    - Deployment is repeatable via git push
  artifacts:
    - 01-03-SUMMARY.md documenting production verification results
  key_links: []
---

<objective>
Verify all routes and search work correctly in production on the Cloudflare Pages deployment.

Purpose: A successful build and a reachable pages.dev URL does not guarantee that @nuxt/content v3 queries work against D1. This plan confirms the D1 integration is actually working by testing each route type and the search feature in production.

Output: Confirmed working production deployment with a written record of route test results.
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

<task type="checkpoint:human-verify">
  <name>Task 1: Verify all route types render in production</name>
  <files>(none)</files>
  <action>
    Human must visit each of these URLs on the pages.dev deployment and report results.

    Use the pages.dev URL from Plan 02 (e.g., roundliving-com.pages.dev).

    **Routes to test:**

    | Route | Expected | Pass/Fail |
    |-------|----------|-----------|
    | `https://[pages-url]/` | Homepage loads with navigation and content | ? |
    | `https://[pages-url]/info/` | Info index page loads | ? |
    | `https://[pages-url]/articles/` | Articles index page loads | ? |
    | One /info/* article | Article page renders with content | ? |
    | One /articles/* article | Article page renders with content | ? |

    **What to look for:**
    - Page content renders (not a blank page or 500 error)
    - Navigation links work
    - No "database" or "D1" error messages in the page
    - No "better-sqlite3" error messages in the page

    **If routes return 404:** This may be expected for draft content (siteInfo collection only shows status: live pages). Test a known route path from the content directory.

    **If routes return 500 or show DB errors:**
    - Check Cloudflare Pages → your project → Functions → Logs for error details
    - Common cause: D1 binding not connected, or schema not initialized
    - Fix: In Cloudflare dashboard, verify the DB binding is set to roundliving-content, then redeploy

    Report back: which routes passed, which failed, and any error messages seen.
  </action>
  <verify>
    All tested routes return HTTP 200 with visible page content (not error pages)
  </verify>
  <done>
    - Homepage loads
    - At least one /info/* and one /articles/* route renders content
    - No D1 or database errors visible on any page
  </done>
</task>

<task type="checkpoint:human-verify">
  <name>Task 2: Verify search works in production</name>
  <files>(none)</files>
  <action>
    Human must test the search feature on the production deployment.

    **Steps:**
    1. Visit `https://[pages-url]/` in a browser
    2. Find the search input (typically in the header or navigation)
    3. Type a search term that should return results — try "dome" or "yurt"
    4. Observe what happens

    **Expected behavior:**
    - Search returns a list of matching articles/pages
    - Results are clickable and navigate to the correct pages

    **If search returns no results:**
    - This may be a D1 content indexing issue
    - Check: did @nuxt/content populate the D1 database? It indexes content on first build/deploy.
    - Potential fix: trigger a new deployment to force content re-indexing

    **If search throws an error:**
    - Check Cloudflare Pages → Functions → Logs for the error
    - Report the error message

    Report back: whether search works, what results appeared, and any errors.
  </action>
  <verify>
    Search for "dome" returns at least one result with a title and link
  </verify>
  <done>
    - Search input accepts queries
    - Search returns results for common terms ("dome", "yurt")
    - Search results link to correct routes
  </done>
</task>

<task type="checkpoint:human-verify">
  <name>Task 3: Confirm deployment repeatability via git push</name>
  <files>(none)</files>
  <action>
    Human must confirm that a subsequent git push triggers a new deployment automatically.

    **Steps:**
    1. Make a trivial change to any file (e.g., add a comment to nuxt.config.ts)
    2. Commit and push:
       ```bash
       git add nuxt.config.ts
       git commit -m "chore: verify Cloudflare Pages CI deployment"
       git push origin main
       ```
    3. Go to Cloudflare Pages dashboard → your project → Deployments
    4. Observe a new deployment starting automatically within ~30 seconds
    5. Wait for it to complete successfully

    **If auto-deploy does not trigger:**
    - Verify in Pages project Settings → Git → that the GitHub repo is connected
    - Check that the branch is set to "main"
    - Manually trigger: Pages dashboard → Create deployment → Deploy site

    Report back: whether the auto-deploy triggered and completed successfully.
  </action>
  <verify>
    Cloudflare Pages dashboard shows a new successful deployment triggered by the git push
  </verify>
  <done>
    - git push to main triggers automatic Cloudflare Pages deployment
    - Deployment completes with status "Success"
    - Deployment is repeatable without manual intervention
  </done>
</task>

</tasks>

<verification>
Phase 01 is complete when ALL of the following are true:
1. Homepage loads at pages.dev URL
2. /info/* routes render article content (not blank/error)
3. /articles/* routes render article content (not blank/error)
4. Search returns results for "dome" or "yurt"
5. git push to main triggers automatic redeployment
6. npm run build succeeds locally with cloudflare_pages preset
</verification>

<success_criteria>
All Phase 01 acceptance criteria from ROADMAP.md are met:
- [x] npm run build succeeds with cloudflare_pages preset
- [x] NuxtHub/D1 database provisioned and connected
- [x] All routes render in production (/, /info/*, /articles/*)
- [x] Search functional in production
- [x] Deployment is repeatable via git push

Phase 02 (SEO Foundation) can now begin.
</success_criteria>

<output>
After completion, create `.planning/phases/01-cloudflare-deployment/01-03-SUMMARY.md` with:
- Route test results table (pass/fail for each route tested)
- Search verification result
- Deployment repeatability confirmation
- pages.dev URL (final)
- Any remaining issues or concerns for future phases

Also update `.planning/STATE.md`:
- Change Phase 01 status from "Not started" to "Complete"
- Add Phase 02 as the new Active Phase
</output>
