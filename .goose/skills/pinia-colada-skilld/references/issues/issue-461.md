---
number: 461
title: "Nuxt: Abort error on first update when using route params as key in defineQuery during dev"
type: bug
state: open
created: 2026-01-13
url: "https://github.com/posva/pinia-colada/issues/461"
reactions: 0
comments: 13
labels: "[ bug,  contribution welcome,  nuxt,  dev-only]"
---

# Nuxt: Abort error on first update when using route params as key in defineQuery during dev

First, this issue occurs when Nuxt, defineQuery, defineQueryOptions, and useRoute are used together.
I tried to find a more minimal reproduction, but so far I haven’t been able to identify one.

The implementation is as follows.
`app/composables/query.ts`
```ts
import { useRoute } from "vue-router";

export const useSomeQueryOptions = defineQueryOptions((options: { id: number }) => ({
  key: ["query-with-query-options", options.id],
  query: ({ signal }) => new Promise<void>((resolve, reject) => {
    const resolveTimeout = setTimeout(() => {
      signal.removeEventListener("abort", onAbort);
      resolve();
    }, 200);
    const onAbort = (...args: unknown[]) => {
      console.log('abort', ...args);
      clearTimeout(resolveTimeout);
      reject(...args);
    };
    signal.addEventListener("abort", onAbort);
  }),
}));
export const useSomeQuery = defineQuery(() => {
  const route = useRoute();
  return useQuery(() => useSomeQueryOptions({ id: parseInt(route.params.id as string, 10) }));
});
```...

---

## Top Comments

**@posva** [maintainer] (+1):

Good new is this is dev only: to avoid using old code, pinia colada is a bit more agressive on invalidating during dev. To debug this I changed a couple of things on your repro, it might have an impact:

...

**@posva** [maintainer] (+1):

Sounds like a bug: the signal from the previous settled query shouldn't be aborted, only if it was still pending

**@posva** [maintainer] (+1):

I investigated further and this is due to HMR. Pinia Colada invalidates query when it thinks a page have been _hmred_ and in this case, it thinks it is when navigating. It could be due to the way Nuxt handles navigations with a double render for Suspense

<img width="862" height="850" alt="Image" src="https://github.com/user-attachments/assets/aa7173e5-8e97-48c5-920a-e108488f448a" />