---
number: 426
title: `autoRefetch` & `enabled` is current behaviour right?
category: Questions
created: 2025-11-29
url: "https://github.com/posva/pinia-colada/discussions/426"
upvotes: 1
comments: 3
answered: true
---

# `autoRefetch` & `enabled` is current behaviour right?

I have been struggling to get controlled `autoRefetch` behavior working(to be able to pause autorefetching), as I was expecting that if `enabled` is false  then autorefetch woudln't have an effect. But apparently this is not the case. So to pause the query it is not enough to set `enabled` false, but also need to set `autoRefetch` to false as well. Also, I finally managed to get it working by passing as extra params

Or maybe I am missing something?
Here are some of my failed attempts and finally working configuration.

```ts
const latestPriceQuery = defineQueryOptions(
  ({
    enabled,
    symbol = "",
    autoRefetch = false,
  }: {
    enabled: boolean
    symbol?: string
    autoRefetch?: number | boolean
  }) => ({
      key: QUERY_KEYS.price(symbol),
      query: () => $fetch(`/api/assets/${symbol}/last`),
      enabled: !!symbol && enabled,
      autoRefetch,
    }),
)
```...

---

## Accepted Answer

**@posva** [maintainer]:

I verified and there are tests for both things, so something else is off. Maybe try creating a PR with a unit test or a boiled down reproduction ( no nuxt)