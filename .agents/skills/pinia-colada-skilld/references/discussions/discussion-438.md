---
number: 438
title: How do I pass `Pinia` instance to `useQuery`?
category: Questions
created: 2025-12-14
url: "https://github.com/posva/pinia-colada/discussions/438"
upvotes: 1
comments: 1
answered: true
---

# How do I pass `Pinia` instance to `useQuery`?

I am using Quasar framework, and I am using queryCache's `refresh` + `ensure` combo to do prefetching in the Quasar's PreFetch hook. This works fine for SSR, because I can pass `Pinia` instance to the `useQueryCache`. However, I am tired of having to duplicate my fetching code, once for prefetching via `useQueryCache`, and then again in the `script setup` when calling `useQuery`. Is it possible to use `useQuery` in the `preFetch` hook without polluting the state across different SSR requests? It seems `useQuery` does not accept `Pinia` instance, so I suppose I cannot use `useQuery` in `preFetch`? Any thoughts or ideas?

---

## Accepted Answer

**@posva** [maintainer]:

> then again in the script setup when calling useQuery

I missed that part. You don't need to call anything in script setup. It will automaticaly refetch when needed. **You already have the right approach**