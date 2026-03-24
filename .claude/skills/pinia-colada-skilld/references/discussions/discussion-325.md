---
number: 325
title: How to make reusable queries with defineQueryOptions
category: Questions
created: 2025-07-01
url: "https://github.com/posva/pinia-colada/discussions/325"
upvotes: 2
comments: 2
answered: true
---

# How to make reusable queries with defineQueryOptions

Hello 

I was using `defineQuery` for my first reusable queries, but I now need a query with dynamic parameters (that are not from the route params).

So far I did not found how to make reusable queries with `defineQueryOptions` like I do with `definedQuery`, so I just use `defineQueryOptions` in a shared file and use `useQuery` inside my components like it's shown in the Query Keys docs.

But in the Reusable Queries docs there is a "_TODO: talk about defineQueryOptions instead_" that makes me think it should be doable.

Also, `enabled` is just a `boolean | undefined` in `defineQueryOptions` which does not seem to work with dynamic parameters, if...

---

## Accepted Answer

**@posva** [maintainer]:

When you use defineQueryOptions with a function, you must return a static options object. The enabled flag would have to be passed as an argument too.

You can used defined options within a defineQuery:

```ts
defineQuery(() => {
  const globalStuff = useGlobals()
  return useQuery(myQueryOptions, () => myParameters)
})
```

I need to fix that TODO  
`defineQuery()` allows instantiating one single `useQuery()` with shared globals, like a mini store. Think of it as using `useQuery()` within a Pinia store while still letting pinia colada track used queries for garbage collection.