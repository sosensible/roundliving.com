---
number: 338
title: Getting error when using $csrfFetch (nuxt-csurf) inside defineQuery
category: Questions
created: 2025-07-23
url: "https://github.com/posva/pinia-colada/discussions/338"
upvotes: 1
comments: 1
answered: true
---

# Getting error when using $csrfFetch (nuxt-csurf) inside defineQuery

I have this reusable query, when I need to use `$csrfFetch`:


```ts
import { defineQuery, useQuery } from "@pinia/colada";

export const useProfile = defineQuery(() => {
  const { $csrfFetch } = useNuxtApp();

  return useQuery({
    key: ["profile"],
    refetchOnMount: false,
    query: async () => {
      const res = await $csrfFetch("/api/profiles", {
        method: "GET",
      });
      return res;
    },
  });
});
```

I'm using this query in a component and a page, however I'm getting an error when I open the page or access the route through the browser (not when navigating using from Nuxt):

...

---

## Accepted Answer

**@posva** [maintainer]:

Then maybe `$crsfFetch` calls `useCsrf` or `useRuntimeConfig()` and that's where the issue is coming from