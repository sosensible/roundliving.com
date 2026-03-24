---
number: 258
title: "useInfiniteQuery: changing the key should create a new cache entry"
type: bug
state: closed
created: 2025-04-12
url: "https://github.com/posva/pinia-colada/issues/258"
reactions: 4
comments: 4
labels: "[ bug]"
---

# useInfiniteQuery: changing the key should create a new cache entry

Changing the key should create a new cache entry that cumulates new pages.

Modifying the `queryParam` does reactively set `data` to the cached value or trigger `query()` and `merge()` in case of cache-miss. However, as the `pages` variable is shared between all `merge` calls, queried data from all queryParams are mixed.
 
Here is a small playground to illustrate the issue. Try triggering few `loadMore` with `queryParam = 'a'` and switch it to `'b'` and load some extra data.

Ideally, the `query` function would have access to the current cached data (e.g. in the `context` argument). Thus, the `merge` function would receive the accumulated pages of the current `key`.

...

---

## Top Comments

**@posva** [maintainer] (+2):

@r-moret It just needs to be fixed (https://github.com/posva/pinia-colada/issues/178#issuecomment-2746105992). I still haven't had the time for it so feel free to give it a try!

**@razbakov** (+1):

Can there also be an issue with `useQuery`? Some times `newData` in this example is undefined.

...

**@VianneyRousset** (+1):

@r-moret, I made a quick patch you can use. Froze the pinia-colada version to `0.15.1` in your `package.json` and use patch-package to apply the following patch after installation.

https://gist.github.com/VianneyRousset/f11fa3afeedf894a0d97a9f3d543651f