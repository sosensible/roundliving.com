---
number: 333
title: I'm reusing the query in the right way?
category: Questions
created: 2025-07-17
url: "https://github.com/posva/pinia-colada/discussions/333"
upvotes: 1
comments: 1
answered: true
---

# I'm reusing the query in the right way?

Hello! I'm using pinia-colada in Nuxt 3.

I have the following query in src/colada/queries/profile.ts

```ts
import { defineQuery, useQuery } from "@pinia/colada";

export const useProfile = defineQuery(() => {
  const { $csrfFetch } = useNuxtApp();

  return useQuery({
    key: ["profile"],
    query: async () => {
      const res = await $csrfFetch("/api/profiles", {
        method: "GET",
      });
      return res;
    },
  });
});
```

I'm calling that query in a component called user-menu.vue:

```ts
const {
  error,
  data,
  isLoading,
  refetch,
} = useProfile();
```

and in a profiles.vue page:

```ts
const {
  error,
  data,
  isLoading,
  refetch,
} = useProfile();
```

It's working great since it's synchronized and everything. But I'...

---

## Accepted Answer

**@posva** [maintainer]:

Those are in `useQuery()`, autocompletion is your friend  
https://pinia-colada.esm.dev/api/@pinia/colada/interfaces/DefineQueryOptionsTagged.html#refetchOnMount-