## 0.21.4 (2026-02-09)

### Features

- plugin support for mutations (#490) (06822c8), closes #495

## 0.21.3 (2026-02-06)

### Bug Fixes

- **infinite-query:** compute hasNextPage correctly on cache hit (#480) (895914a)
- skip refetchOnWindowFocus and refetchOnReconnect for inactive defined queries (1d7f9d2), closes #485

## 0.21.2 (2026-01-20)

### Bug Fixes

- correct GC time display for prefetched queries (#464) (80e2c5a)
- **query:** gc prefetched queries (ba1e90c)

## 0.21.1 (2026-01-09)

### Bug Fixes

- **infinite:** regen pageParam on key change (9c0706c), closes #458

### Features

- make ext readonly (8dd595a)

# 0.21.0 (2026-01-06)

- refactor!: remove @vue/devtools-api dependencies (9bfd035)

### Features

- expose internal utility types (bb3a7d0)

### BREAKING CHANGES

- use the native @pinia/colada-devtools. See
  <https://pinia-colada.esm.dev/guide/installation.html#Pinia-Colada-Devtools>
  for instructions

# 0.20.0 (2025-12-23)

This release completely changed how `useInfiniteQuery()` works, the parameters and returned values:

- The `merge` option has been removed and `data` contains an object with `pages` and `pageParams` arrays that can be flattened.
- `initialPage` has now been replaced with `initialPageParam`
- `loadMore` has been renamed `loadNextPage`
- `getNextPageParam` is now a required option
- Invalidating now works just as with regular queries, which means that you probably want to set `stale` value higher (or disable it) to avoid refetching multiple pages when an infinite query is invalidated. Also, you might want to set `refetchOn*` options to `false`.
- It's now possible to have bi-directional navigation
- There is now `hasNextPage` and `hasPreviousPage`

Any feedback on the feature and improvements is welcome!

Here is a complete example of what it looks in action:

```ts
<script setup lang="ts">
import { useInfiniteQuery } from '@pinia/colada'
import { onWatcherCleanup, useTemplateRef, watch } from 'vue'

const {
  state: factsPages,
  loadNextPage,
  asyncStatus,
  isDelaying,
  hasNextPage,
} = useInfiniteQuery({
  key: ['feed'],
  query: async ({ pageParam }) => factsApi.get<CatFacts>({ query: { page: pageParam, limit: 10 } }),
  initialPageParam: 1,
  getNextPageParam(lastPage) {
    return lastPage.next_page_url
  }
  // plugins
  retry: 0,
  delay: 0,
})

// we only need an array
const facts = computed(() => factPages.value.data?.pages.flat())
const loadMoreEl = useTemplateRef('load-more')

watch(loadMoreEl, (el) => {
  if (el) {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          loadNextPage()
        }
      },
      {
        rootMargin: '300px',
        threshold: [0],
      },
    )
    observer.observe(el)
    onWatcherCleanup(() => {
      observer.disconnect()
    })
  }
})
</script>

<template>
  <div>
    <button :disabled="asyncStatus === 'loading' || isDelaying" @click="loadMore()">
      Load more (or scroll down)
    </button>
    <template v-if="facts?.length">
      <p>We have loaded {{ facts.length }} facts</p>
      <details>
        <summary>Show raw</summary>
        <pre>{{ facts }}</pre>
      </details>

      <blockquote v-for="fact in facts">
        {{ fact }}
      </blockquote>

      <p v-if="hasNextPage" ref="load-more">Loading more...</p>
    </template>
  </div>
</template>
```

### Bug Fixes

- **infinite:** invalidation should refetch (bc9c261), closes #372

### Features

- **infinite:** add cancelRefetch (16de801)
- **infinite:** maxPages (7639145)
- nextPage works (d011030)
- throwOnError in infiniteQuery (5010b11)

## 0.19.1 (2025-12-17)

### Features

- initialDataUpdatedAt (e16ff61), closes #298
- warns if the user extends in create instead of ext (d71a890), closes #442

# 0.19.0 (2025-12-16)

- refactor(mutations)!: keep mutations key as passed (#440) (4879189), closes #440

### Bug Fixes

- use global options for mutations (0f3a56c)

### Features

- **types:** usemutationoptionswithdefaults (67ea7a6)

### BREAKING CHANGES

- Mutations id are now just an incremented number that starts at 1. There is no longer a `$n` appended to keys for mutations and mutations without a key do not have an artificial key anymore. This is because initially the cache map was a more complex type but with it being a simple Map, there is no point in complexifying the keys. As a result the `mutationCache.get()` now takes the id of the mutation while `getEntries()` work the same. The `exact` filter has also been removed as mutations are, by nature, meant to be called multiple times.

## 0.18.1 (2025-12-11)

### Bug Fixes

- **query:** do not track components effect (f85f556), closes #436

### Features

- **query:** add meta (6f1f28e), closes #313

## 0.18.0 (2025-12-02)

###  BREAKING CHANGES

- While technically a fix, this is a breaking change if
  you were relying on an external signal that aborts within the `query`.
  It used to not set the state by just being an AbortError DomException
  and now it will become an error. This behavior is more correct as we
  don't want to ignore aborted signals that are external. Each fetch
  creates an AbortController and passes the signal to `query` which is
  aborted (without a reason) if any other method of the store fetches
  again. This is done to avoid using an _outdated_ request.

### Bug Fixes

- **query:** preserve any external AbortError (0cdf7b9)

## 0.17.9 (2025-11-24)

### Features

- export mutation cache (892049f)
- expose mutation cache (7f6316f)
- warn wrong useMutationcache usage (211911d)

## 0.17.8 (2025-11-07)

### Bug Fixes

- allow passing extra options to defineQueryOptions (597597f)
- **types:** allow interfaces in keys (19ab616), closes #420

## 0.17.7 (2025-10-30)

### Bug Fixes

- Export `toCacheKey` (#400) (d1d8f3e)
- **query:** abort signal if query becomes inactive (1728749)

### Performance Improvements

- avoid watched on enabled (30439c0)

## 0.17.6 (2025-09-25)

### Bug Fixes

- Improve type of `DefineQueryOptions` (#388) (22297f0)
- make type inference of DefineQueryOptions.placeholderData correct (#343) (7da95dd)

## 0.17.5 (2025-09-11)

### Features

- **query:** add overloaded for optional define options params (#386) (1c51923)

## 0.17.4 (2025-09-09)

### Bug Fixes

- refresh after an aborterror (7c07ec8), closes #383

## 0.17.3 (2025-09-01)

### Features

- add ssrCatchError (#376) (6ba6a36)

## 0.17.2 (2025-08-25)

### Features

- expose internal method to plugins (740e1ce)

### Bug Fixes

- allow initial fetch with refetchOnMount false and placeholderData (#350) (e9b9972)
- always propagate errors (9268b37), closes #371

## 0.17.1 (2025-06-13)

### Bug Fixes

- avoid uncaught error in defineQuery (3037012), closes #312

## 0.17.0 (2025-06-03)

###  BREAKING CHANGES

- replace `EntryNodeKey` with `EntryKey`
- **types:** The `EntryKeyTagged` type now has multiple type params and an array is no longer assignable to it. This is necessary to correctly infer the types for `TData` and `TDataInitial` and if you were **manually** using `EntryKeyTagged`, you will either need to cast arrays to it or use `EntryKey` instead. **In most cases this should not affect you**. This makes types stricter and also disallows setting a query data to `undefined`. If you were doing `queryCache.setQueryData(key, undefined)`, use `queryCache.setEntryState` instead.

### Features

- add a queryCache.get method to a typed entry (2f7db57)
- add error to tagged keys (7ad07c4)
- useQueryState (e1e84eb), closes #23

### Bug Fixes

- **types:** avoid incorrect undefined from tagged keys (9358619)
- **types:** make options parameter optional in types (#224) (20bca79)

### Code Refactoring

- remove deprecated `EntryNodeKey` (6c7d15b)

## 0.16.1 (2025-05-22)

### Bug Fixes

- **ssr:** make `when` relative to work across timezones (43b4f7d), closes #293

## 0.16.0 (2025-05-21)

This is the biggest release to date! Many bug fixes, typed keys, a lighter and faster build!

###  BREAKING CHANGES

- **query:** `queryCache.invalidateQueries()` now accepts a second parameter to control whether to refetch or not active queries. It can be set to `'all'` to force fetch all queries. This replaces the existing behavior of passing `active: null` (**can be removed now**) which wasn't actually working. **You shouldn't be negatively affected by this change as it wasn't working previously**.
- The internal cache structure has been refactored to be simpler, faster and smaller. Keys now support deeply nested objects and partially matches them when filtering (e.g. `queryCache.getEntries()`). To achieve this, the hydrated version of the cache has changed. `serializeTreeMap` has been removed but `serializeQueryCache` (which should be preferred) has been kept. `EntryNodeKey` and `TreeMapNode` (internals) have been removed. `EntryNodeKey` was just `string | number`. `toCacheKey` has been adapted and now returns a plain string rather than an array. This also fixed `queryCache.getEntries(['1'])` actually returning entries defined with a numeric key (`[1]`). The type for `key` is now stricter to ensure everything works well at the type level, you might notice it doesn't allow `undefined` as a value (except in objects), **this is intended** as the serialized version (JSON) transforms it no `null`, and will not match in the cache if used, if you want an nullish value, use `null`. The documentation has been updated to reflect this
- **types:** If you built a plugin, you will have to rename the type params of generics like `UseQueryEntryExtensions` from `TResult` to `TData`. Otherwise, this change won't affect you.

### Features

- allow deeply nested structured keys (59227a8), closes #149
- **query:** allow dynamic typed keys (0053deb)
- **query:** allow for typed query keys (5068a52)
- queryCache.setQueriesData (4818d3e)
- **types:** explicit types for useInfiniteQuery (5eb9e3b)
- **types:** stricter keys (02f0269)

### Bug Fixes

- avoid fetch with initialData (d1eb4c2)
- **query:** gc entries created through dynamic useQuery in defineQuery (90d5d83)
- **query:** invalidate inactive queries too (cf5a790), closes #287
- **query:** restore reactivity after unmounting defineQuery (dc2315a), closes #290
- **types:** make key types stricter (9669605)

### Reverts

- Revert "refactor: use external interface for QueryCache" (d6befc4)

### Code Refactoring

- **types:** rename `TResult` into TData (09338a2)

## 0.15.3 (2025-05-06)

### Bug Fixes

- correctly handle refetchOn\* when false (262c090)

## 0.15.2 (2025-05-03)

### Bug Fixes

- check false refetchOnWindowFocus (c6400d7), closes #272

## 0.15.1 (2025-04-26)

### Bug Fixes

- support node 18 (3466bdf)

## 0.15.0 (2025-04-18)

###  BREAKING CHANGES

- **mutations:** mutations are now created each time they are invoked. This
  change will only affect users directly creating entries with the mutation store
  (which should be avoided except in very advanced cases). Given the new
  structure of mutation entries and the fact that they are recreated for each
  mutation in order to keep a history of mutations, the new process simplifies
  things and reduces bundle size. The actions `create` and `ensure` in the
  mutation store are now simpler and take less arguments (many were redundant).
  Alongside these changes, the mutation store has fixed many subtle bugs.

### Features

- add gcTime option for global mutations (2850167)
- add mutation id (8c8edd5)
- **hmr:** refetch on component change (56aad7a)
- **mutations:** simplify the entry creation in the mutation store (a96a8ff)
- untrack mutation entries (6b65f19)

### Bug Fixes

- an entry with no options is stale (3f59d6c)
- **defineQuery:** avoid pausing still active (fe00447), closes #246
- **mutations:** create entries for each individual mutation (3def820)
- **query:** avoid deleting children of gced queries (5ec6dcc)
- setQueryData sets the status and trigger gc if possible (8137fbd)
- **types:** allow tuples in keys (f8e8087)
- **types:** infer initial data in setEntryState (0a94887)

### Reverts

- Revert "refactor: deprecate onMutate in favor of onBeforeMutate" (02add4a). **This change never actually made it, it's here for the trace.**

## 0.14.2 (2025-03-26)

### Features

- allow global mutation hooks (045b057)
- avoid incompatible line with Vue 2 (0c614db)

### Bug Fixes

- **defineQuery:** pause the query when inactive (2b5057e), closes #227

## 0.14.1 (2025-03-18)

### Bug Fixes

- **types:** allow extending global query options (28acdd0)

## 0.14.0 (2025-03-18)

This version introduces codemods to automate migrations . Try them out with:

```sh
pnpm --package=@ast-grep/cli dlx ast-grep scan -r node_modules/@pinia/colada/codemods/rules/migration-0-13-to-0-14.yaml -i src
```

You can also globally install ast-grep and run:

```sh
ast-grep scan -r node_modules/@pinia/colada/codemods/rules/migration-0-13-to-0-14.yaml -i src
```

Remember to commit changes before running the codemods.

###  BREAKING CHANGES

- Every global query (`useQuery()` and `defineQuery()`)
  option passed to `PiniaColada` has been moved to its own option
  `queryOptions`:

  ```diff
  app.use(PiniaColada, {
    plugins: [],
  -  gcTime: 20_000,
  +  queryOptions: {
  +    gcTime: 20_000,
  +  },
  })
  ```

  You can also use the new codemods to automatically migrate this.

- **types:** This changes allows for Pinia Colada global options to
  auto complete but it also requires you to use pass an options object to
  `app.use(PiniaColada, {})`. This is just for typing reasons (it could be
  a limitation of Vue) but the same old code actually works.

  ```diff
  -app.use(PiniaColada)
  +app.use(PiniaColada, {})
  ```

- Replace `serialize` with `serializeTreeMap`

- Removed `reviveTreeMap` (not needed)
- Removed internal `createdQueryEntry`

### Features

- add codemods for migrations (1a2d552)
- allow global placeholderData (a98528a), closes #216
- allow invalidating all queries no matter their active status (a64f674)
- allow nullish filters (aadd11d)

### Bug Fixes

- avoid cancels to change the status (138857c), closes #210
- avoid unnecessary triggerCache (a3494a0)
- initialize the infinite query pages (9efb7d4)
- **types:** correctly type PiniaColada Vue plugin (f01326f)
- **types:** placeholderData does not guarantee data (aed71c1), closes #217

### Performance Improvements

- inline filter fn (2aa1254)

### Code Refactoring

- move global query options to its own option (f5e20f0)
- remove deprecated functions (8ba4362)

## 0.13.8 (2025-03-09)

### Features

- add more actions to the mutation cache (a38595c)
- pass previous placeholderData if present (a576093), closes #197

## 0.13.7 (2025-03-04)

### Bug Fixes

- queryCache should not invalidate query when it disabled (#204) (e12f98c)
- **warn:** avoid repeated queries warn (0fbe29a), closes #192

## 0.13.6 (2025-02-12)

### Features

- add devtools (43912aa)

### Bug Fixes

- apply multiple filters to getEntries (da5b00c)

## 0.13.5 (2025-02-06)

### Features

- add experimental useInfiniteQuery (0a958e6)

### Bug Fixes

- avoid clearing timeouts early (bf7ef2f)
- correctly track new define queries when switching pages (f9eeec1)
- make the cache watchable (cf30e68)
- trigger updates on untrack (91e497a)

## 0.13.4 (2025-01-31)

### Features

- **plugins:** toCacheKey (542e15e)
- **types:** expose QueryCache (fb4c647)

## 0.13.3 (2025-01-14)

### Bug Fixes

- **query:** always use `placeholderData` (4c6a3f7), closes #154
- **query:** avoid creating entries after unmounting (e2ff278), closes #155

## 0.13.2 (2025-01-03)

### Bug Fixes

- **defineQuery:** inject globals (2307daf), closes #145

## 0.13.1 (2024-12-20)

### Bug Fixes

- do not run disabled defined queries on mount (a85ac9f), closes #138

## 0.13.0 (2024-11-26)

###  BREAKING CHANGES

- **types:** placeholderData no longer allows returning `null`, only `undefined`. This won't affect most use cases and enables better type inference.

### Features

- **types:** remove undefined with initialData and placeholderData (#114) (6e1863e)

## 0.12.1 (2024-11-09)

### Bug Fixes

- staleTime of Infinity should still be stale (#99) (6873a6f)

## 0.12.0 (2024-11-06)

###  BREAKING CHANGES

- `transformError` was never fully implemented so they are being removed and might come back if they is a real-word use case for them
- If you were using the `delayLoadingRef` util, use the `@pinia/colada-plugin-delay` instead.
- Renaming `Error` to `defaultError` allows to differentiate the property from the existing global Error class. Upgrading should be straightforward.

### Features

- add initial delay plugin (42c8760)
- add track and untrack actions for plugins (8902ba3)
- allow dynamic values for auto refetches (63d2fd0)
- allow extending useQuery return (ef06628)
- expose more types (4447d6d)
- **plugins:** pass scope for added variables (a3b666f)
- work without the plugin (696f88e)

### Bug Fixes

- avoid broken reactivity in defineQuery (4c48abc)
- dedupe pinia colada (6ace8e8)
- keep data if signal is aborted (de5cde5)
- pass onMutate context (618312b), closes #95
- remove queryCache from mutation hooks (3f1119a)
- run create in ssr too (1a6fa4a)
- **ssr:** throw on error in query (58b7f69)
- upgrade to new cache format (03e1683)

### Code Refactoring

- **query:** remove unused transformError and setup options (de0cb48)
- remove delayLoadingRef helper in favor of the plugins (4c9b4cb)
- rename the global `Error` property in `TypesConfig` to (0021426)

## 0.11.1 (2024-10-28)

### Features

- allow refetches to throw on erorr (f168b6c)
- allow setting data for unexisting queries (5c3870c)

### Bug Fixes

- allow gcTime to never be set (4714b9a)
- eagerly change asyncStatus on cancel (b2f1349)
- staleTime of 0 always refreshes (66ef9ec)

## 0.11.0 (2024-10-25)

###  BREAKING CHANGES

- **mutations:** This wasn't needed as instead, one can use
  `useQueryCache()` outside. It could be added back if needed but it's
  more pragmatic to start without it.
- **query:** The `queryCache.cancelQuery()` is renamed to
  `queryCache.cancel()` to better match the other functions naming. A new
  function `queryCache.cancelQueries()` is added to actually cancel one or
  multiple queries instead of just one.
- **plugins:** In plugins, `cache` is renamed to `queryCache` for
  consistency.
- This makes it clearer that `queryCache` is the result
  of `useQueryCache()`.

### Features

- add mutation store (#47) (7954f83)
- **hmr:** warn against bugs (7bb44a0)
- **nuxt:** add auto imports (964bce2)
- **nuxt:** support colada.options (57a0430)
- predicate in filter (2fc62b7)
- **query:** add cancelQueries (a374ee2)
- run defined mutations in effect scope (86ff5ed)

### Bug Fixes

- **nuxt:** plugins (fd95add)

### Performance Improvements

- tree shake unused stores (e0ede7e)

### Code Refactoring

- **mutations:** Remove `queryCache` from the context (d9c2509)
- **plugins:** rename `cache` to `queryCache` (c97639b)
- rename `caches` to `queryCache` (e514d33)

## 0.10.0 (2024-10-04)

###  BREAKING CHANGES

- This change is mainly to simplify migration from
  TanStack Query.
- caches.invalidateQueries only fetches active queries
- The `keys` option that automatically invalidate keys
  has been renamed to `invalidateKeys` and moved to a plugin. This is in
  practice not needed. It's just an opinionated convenience that can be
  replaced by directly invalidating queries in the cache with the
  `onSettled()` hook in `useMutation()`:

```ts
const { mutate } = useMutation({
  onSettled({ caches, vars: { id } }) {
    caches.invalidateQueries({ key: ['contacts-search'] })
    caches.invalidateQueries({ key: ['contacts', id] })
  },
  mutation: (contact) => patchContact(contact),
})
```

### Features

- caches.invalidateQueries only fetches active queries (e8d9088)

### Code Refactoring

- rename `keys` to `invalidateKeys` and move to plugin (f709928)
- useMutation hooks now use positional arguments (dce00b4)

## 0.9.1 (2024-09-27)

### Features

- allow nullish return in placeholderData (1fae179)
- wip nuxt module (66eca6e)
- wip placeholderData (307e366)

### Bug Fixes

- **query:** handle sync errors (cfcdcb1), closes #70 #69

## 0.9.0 (2024-08-26)

###  BREAKING CHANGES

- **query-cache:** To better match the arguments, the `setQueryState`
  action has been renamed to `setEntryState`.

### Features

- **mutations:** add variables (2e03a93)
- **query-cache:** Rename `setQueryState` to `setEntryState` (f481eb0)
- **warn:** warn about reused keys (7375a19)

## 0.8.2 (2024-08-21)

### Performance Improvements

- skip reactivity traversal in store (3984a3a)

## 0.8.1 (2024-08-17)

### Features

- **ssr:** expose reviveTreeMap (32b4f17)

### Bug Fixes

- **ssr:** mark raw tree node in reviver (4ff13ad)

## 0.8.0 (2024-08-12)

###  BREAKING CHANGES

- `isFetching` from `useQuery()` is renamed to
  `isLoading` to better reflect that it's connected to `asyncStatus`.
- The setup option in useQuery now receives the options
  as the second argument instead of a context object with the query return
  value and the options. This allows the setup function to have a more
  predictable signature and makes it easier to type. Only `PiniaColada`
  has this option, **it has been removed from useQuery**. Overall, the
  option still needs more thinking and will probably change in the future
  again.
- **plugins:** The `onSuccess`, `onError`, and `onSettled` global
  hooks have been moved from `PiniaPlugin` to a Pinia Colada plugin:
  `PiniaColadaQueryHooksPlugin`

  ```diff
   app.use(PiniaColada, {
  +  plugins: [
  +    PiniaColadaQueryHooksPlugin({
         onSuccess() {},
         onError() {},
         onSettled() {},
  +    }),
  +  ],
   })
  ```

- This feature splits up the `status` state into two
  different _status_ properties:

- `status` is now just for the data `'pending' | 'success' | 'error'`
- `queryStatus` tells if the query is still running or not with `'idle' |
'running'`

- `refetch`, `refresh` and similar methods now resolve
  the `state` property without rejecting. This is usually more convenient.
- The `QueryStatus` type has been split into
  `DataStateStatus` and `OperationStateStatus`.
- the cache store is going through a refactor to empower
  plugins. **This change shouldn't affect end users unless you are
  directly using the cache store**.
  As a result a lot of the actions have been renamed

- refetch -> fetch
- invalidateEntry -> invalidate
- ensureEntry -> ensure

Their arguments have changed as well.

- This release removes the deprecated `QueryPlugin`. Use
  `PiniaColada` instead.

### Features

- add a `state` property to `useQuery` for type narrowing (22f3e21)
- **mutation:** refetch active queries (#65) (3ebc734)
- **plugins:** Refactor query global hooks into a plugin (bbe5199)
- **query:** add `active` property to query entry (994db63), closes #65
- split useMutation status like useQuery (6c6078f)

### Code Refactoring

- rename `isFetching` to `isLoading` (003f7a1)
- rename cache store actions (792ec6e)
- Replace QueryPlugin with PiniaColada (2a3f3d9)
- useQuery setup option now receives the options as the second argument (a86b41d)

## 0.7.1 (2024-07-30)

### Bug Fixes

- **hmr:** always update options (a6a6b7a)

## 0.7.0 (2024-07-26)

###  BREAKING CHANGES

- rename type `UseEntryKey` to `EntryKey`
- the exported type 'UseQueryKey' is replaced by the more generic type 'UseEntryKey', which will be also used to type mutations

### Features

- debug plugin (8fde25b)
- expose plugin types (83ef198)
- **mutation:** allow passing mutation variables to mutation key getter (bc8a47f)
- retry plugin (0d837a2)
- support plugins and deprecate `QueryPlugin` in favor of `PiniaColada` (bde53d9)
- **use-query:** Add enabled option (#43) (1b755c5)
- **wip:** add gcTime (#29) (56659d1)

### Bug Fixes

- gcTime on defined queries (#50) (82df409)
- **query:** query refresh on defineQuery output composable call (28a3ec1)
- trigger nested actions (7e3a9f6)

### Reverts

- Revert "refactor: add a stale getter" (6e059f4)

### Code Refactoring

- rename type 'UseQueryKey' to 'UseEntryKey' (6a32d89)
- rename type `UseEntryKey` to `EntryKey` (8110feb)

## 0.6.0 (2024-04-02)

###  BREAKING CHANGES

- **mutation:** Rename type `UseQueryStatus` to `QueryStatus`
- **mutation:** `mutate` no longer returns a promise and catches errors
  to be safely used in templates. The old behavior remains the same with
  `mutateAsync`
- **mutation:** the `mutation` option in `useMutation()` now only
  accepts one argument for the variables. This allows to add extra
  parameters in the future like a signal, an extra context, etc

### Features

- abort pending query signal on new query (6b6195f)
- allow typing the error with transformError (fd35f6f)
- **mutation:** add mutateAsync (5c97b69)
- **mutation:** allow passing the context to mutation (b9acca0)
- **mutation:** defineMutation wip (5866907)
- **mutation:** require one argument only for useMutation (86b5996)
- **query:** add data and errors to global hooks (b4caeca)
- **query:** defineQuery (e0f7768)
- return promise when invalidating query (c431284)
- **useMutation:** add hook context (0894a81)
- **useMutation:** add hooks (c44af13)

### Code Refactoring

- **mutation:** rename UseQueryStatus to QueryStatus (ff0067a)

## 0.5.3 (2024-02-21)

### Bug Fixes

- onScopeDispose guard (0ed15fe)

## 0.5.2 (2024-02-20)

### Bug Fixes

- allow writing to entries (8e9ac7e)

## 0.5.1 (2024-02-19)

### Features

- **types:** allow default error type (68c2f8d)

### Bug Fixes

- avoid computed warns (c11ee2f)

## 0.5.0 (2024-02-19)

###  BREAKING CHANGES

- remove internal global defaults
- force array of keys to avoid easy mistakes

### Features

- pass signal to query (bf1666c)

### Code Refactoring

- force array of keys to avoid easy mistakes (7d95da0)
- remove internal global defaults (53ce0bc)

## 0.4.3 (2024-02-11)

### Features

- add delayLoadingRef (ebbc503)

## 0.4.2 (2024-02-08)

### Bug Fixes

- avoid warn onScopeDispose (47ac1a6)

## 0.4.1 (2024-02-07)

## 0.4.0 (2024-02-06)

###  BREAKING CHANGES

- rename data fetching store
- replace class usage
- add `QueryPlugin` to configure useQuery()
- `status` property, `isPending`, `isFetching` are now a
  bit different.

### Features

- **ssr:** wip initial version (8e6cbf6)

### Code Refactoring

- adapt status (2d5625c)
- add `QueryPlugin` to configure useQuery() (67cb2d3)
- rename data fetching store (b9ef0fb)
- replace class usage (9bf1fd9)

## 0.3.1 (2024-02-03)

### Bug Fixes

- **useMutation:** options (23eccb1)

## 0.3.0 (2024-02-03)

###  BREAKING CHANGES

- The option `fetcher` for `useQuery()` has been renamed
  to `query`. The option `mutator` for `useMutation()` has been renamed
  `mutation`.

### Code Refactoring

- rename options for `useQuery` and `useMutation` (28ecc75)

## 0.2.0 (2024-01-16)

###  BREAKING CHANGES

- remove iife version

### Features

- accept function in setEntryData (2abb7c0)
- allow array of keys (7be2e80)
- do not refresh by default outside of components (b6e45fb)
- traverse tree map (b12547f)
- wip tree map (b87bff4)

### Bug Fixes

- only use onServerPrefetch in components (445921a)
- recompute based on key (c9d739f)

### Performance Improvements

- avoid creating children on tree (0bdbe1d)
- use shallowRef for internal primitives (6b9e5e3)

### Build System

- remove iife version (0ee5c8a)

## 0.1.0 (2023-12-25)

###  BREAKING CHANGES

- rename options

### Bug Fixes

- swallow error in automatic refreshes (d955754)

### Code Refactoring

- rename options (f6d01c5)

## 0.0.1 (2023-12-20)

### Features

- initial version (7abe80d)
