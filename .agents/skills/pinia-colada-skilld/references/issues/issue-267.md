---
number: 267
title: Query makes multiple network requests for the same key in v0.15.1
type: bug
state: closed
created: 2025-04-29
url: "https://github.com/posva/pinia-colada/issues/267"
reactions: 2
comments: 5
labels: "[ bug,  enhancement,  contribution welcome]"
---

# Query makes multiple network requests for the same key in v0.15.1

In @pinia/colada version 0.15.1, when multiple components rendered using v-for call a composable created with defineQuery (which uses a static query key), a network request is triggered for each component instance upon mounting. This occurs even if the data for that key should be available in the cache and the staleTime has not expired.
This contrasts with the behavior in v0.14.2, where only the first component instance calling the composable would trigger the network request, and subsequent components would correctly receive the data from the cache (deduplication worked as expected).
This behavior leads to unnecessary network requests and potentially impacts performance, especially with large lists. We have observed this pattern not only in the specific scenario described below but also i...

---

## Top Comments

**@posva** [maintainer] (+1):

It's indeed an HMR bug. It comes from https://github.com/posva/pinia-colada/blob/main/src/query-store.ts#L564. The check is not enough. I think there should be a more complex collection, probably including the `uid` of the current instance or something else. Fortunately this does not affect production. Feel free to give it a try!

**@posva** [maintainer]:

Thanks for the report. If you could you boil it down to a unit test and open  PR, that would be perfect!

**@vladyslav-mikhieiev** (+2):

> Thanks for the report. If you could you boil it down to a unit test and open PR, that would be perfect!

Ok, I'll try.