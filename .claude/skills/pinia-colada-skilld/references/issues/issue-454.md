---
number: 454
title: `defineInfiniteQueryOptions()` similar to defineQueryOptions
type: feature
state: open
created: 2026-01-06
url: "https://github.com/posva/pinia-colada/issues/454"
reactions: 3
comments: 2
labels: "[ enhancement]"
---

# `defineInfiniteQueryOptions()` similar to defineQueryOptions

this would allow type safe access to the cache for infinite queries

---

## Top Comments

**@posva** [maintainer]:

Not yet, no because `useInfiniteQuery()` needs to be adapted to support taking a function that returns options

**@gotson**:

I started experimenting with `useInfiniteQuery`. In my app i am thinking of offering both paginated and infinite scroll viewing options, but in the current state of things it seems i need to redefine my query in the `query` of `useInfiniteQuery`'s `options`, while i already have it defined through `defineQueryOptions` for reusability.

Do you think it would be possible to reuse `defineQueryOptions` inside either `useInfiniteQuery` or `defineInfiniteQueryOptions`?