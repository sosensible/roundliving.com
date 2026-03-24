---
number: 315
title: How to simply delete query entry?
category: Questions
created: 2025-06-15
url: "https://github.com/posva/pinia-colada/discussions/315"
upvotes: 5
comments: 2
answered: false
---

# How to simply delete query entry?

Hey. I'm removing things on the page, and I want to simply remove a cache entry by a specific key.

At the moment, it's possible by getting all entries by key using `cache.getEntries()` and then removing each entry one by one using the `cache.remove()` method. Is there a simple built-in method that allows you to just remove entries by key without refetching? Something like `cache.removeEntries({ key: [...] })`

---

## Top Comments

**@posva** [maintainer]:

You have to use `cache.remove()` with the entry as an argument:

```ts
const cache = useQueryCache()
// if you know it exists
cache.remove(cache.get(['my', 'key'])!)
// delete multiple entries at once
cache.getEntries({ key: ['my-root-key'] }).map(entry => cache.remove(entry))
```

BTW it's better to adapt the `gcTime` so Pinia Colada removes the entries automatically than removing them manually.

**@87xie**:

I have a similar use case around signing out and cleaning up user-scoped entries, and I’m wondering if there’s a simpler way to handle this:

```ts
const router = useRouter()
const cache = useQueryCache()

async function signOut() {
  // redirect and wait for components unmount that trigger internal untrack action
  await router.replace('/sign-in')
  await new Promise((resolve) => setTimeout(resolve, 0))
  
  // cleanup user-scoped entries
  const entries = cache.getEntries(...)
  entries.forEach((entry) => {
    // stop GC timer
    clearTimeout(entry.gcTimeout)
    // abort active request
    entry.pending?.abortController.abort()
    // clear dependencies to be safe
    entry.deps.clear()
    // remove from cache
    cache.remove(entry)
  })
}
```...