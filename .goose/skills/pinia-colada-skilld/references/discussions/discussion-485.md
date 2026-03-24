---
number: 485
title: refetchOnWindowFocus refetches inactive queries
category: Questions
created: 2026-02-06
url: "https://github.com/posva/pinia-colada/discussions/485"
upvotes: 1
comments: 1
answered: true
---

# refetchOnWindowFocus refetches inactive queries

IUUC `refetchOnWindowFocus` refetches not only active queries but also inactive ones. This results in unnecessary network requests when the browser tab regains focus, such as queries belonging to components that were previously mounted but are no longer active.

Here is a repro of the behavior: https://stackblitz.com/edit/vitejs-vite-z97oezkq?file=src%2FApp.vue&terminal=dev

**Steps to reproduce:**

* Open Pinia Colada devtools
* Navigate to the Posts page
* Navigate to the Users page
* Wait 5 seconds for queries to become stale
* Switch focus to a different browser tab
* Refocus the repro tab and check the Pinia Colada devtools panel
* Notice that not only the Users query (current page) but also the Posts query is refetched (green check mark)

Is this behavior intentional? I...

---

## Accepted Answer

**@posva** [maintainer]:

Fixed in 1d7f9d2