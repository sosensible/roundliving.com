---
number: 275
title: How to handle loading critical data via router?
category: Questions
created: 2025-05-01
url: "https://github.com/posva/pinia-colada/discussions/275"
upvotes: 1
comments: 1
answered: true
---

# How to handle loading critical data via router?

In order to load data in a navigation-aware way, we obviously have great tooling with Unplugin Vue-Router and the Colada Loader.

I have a use case though, where I am unsure as to what the best practice would be. I have data that is used across many pages and components and which needs to be loaded before any of them mount and regardless of route.

This appears cumbersome to solve via Unplugin Vue Router, as the loaders would have to be added to many pages, and a tight coupling arises between pages and components which need the fetched data.

So my idea was to simply fetch the data inside `router.beforeEach` and set the query caches manually simply for the added convenience of using Pinia-Colada (fx. allowing components to refresh the data or access any errors etc.)

Here is my exa...

---

## Accepted Answer

**@posva** [maintainer]:

Don't use `create`, it's too low level. Use `setQueryData()` instead:

```ts
queryCache.setQueryData(KEY, await graphQLClient.request(getMetadataDocument))
```

This is pretty much prefetching. It's not documented but it will