---
number: 417
title: Disable caching alltogether
category: Questions
created: 2025-10-29
url: "https://github.com/posva/pinia-colada/discussions/417"
upvotes: 1
comments: 1
answered: true
---

# Disable caching alltogether

Hello!

I'm wondering if it's possible to disable caching globaly?
I thought that the `queryOptions.gcTime` option set to 0 will help but it doesn't.
I'm looking for a way to temporary disable any caching done by the library.

---

## Accepted Answer

**@posva** [maintainer]:

You can do it with a plugin that resets the data and error on every fetch (or another action, depending on your use case). The code should look like this:

```ts
app.use(PiniaColada, {
  queryOptions: {
    staleTime: 0,
    gcTime: 0
  },
  plugins: [
    ({ queryCache }) => {
      queryCache.$onAction(({ name, args }) => {
        if (name === 'fetch') {
          const [entry] = args
          queryCache.setEntryState(entry, { status: 'pending', data: null, error: null })
        }
      })
    },
  ],
} satisfies PiniaColadaOptions)
```

But then, there is simply no point in having a cache