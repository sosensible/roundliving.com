---
number: 346
title: Is refetchOnMount supposed to ignore cache?
category: Questions
created: 2025-08-03
url: "https://github.com/posva/pinia-colada/discussions/346"
upvotes: 1
comments: 1
answered: true
---

# Is refetchOnMount supposed to ignore cache?

Perhaps a daft problem, but I just spent the afternoon trying to work out why I was seeing multiple network requests for the same endpoint.

We have wrapped useQuery in a composable that also exposes some computed properties over the returned data.

We have a page that imports this composable, and through the component graph also ends up loading other components that also import this composable. Since this composable wraps useQuery, the key is also ways the same, however I see multiple requests in the network tab.

I eventually stumbled on refetchOnMount:false which 'fixes' my issue, but it's set to true by default, hence my question: is this expected behavior, or have I introduced some logic bug elsewhere in my code?

---

## Accepted Answer

**@posva** [maintainer]:

It depends on many factors but it could be expected to see multiple fetches depending on the `staleTime` and other interactions with the cache. If you want to completely reuse the query, use `defineQuery()`, it acts as a mini store.