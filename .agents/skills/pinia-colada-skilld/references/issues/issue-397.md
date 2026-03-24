---
number: 397
title: Document how to inject properties in defineQueryOptions
type: docs
state: open
created: 2025-10-06
url: "https://github.com/posva/pinia-colada/issues/397"
reactions: 2
comments: 0
labels: "[ docs]"
---

# Document how to inject properties in defineQueryOptions


### Discussed in https://github.com/posva/pinia-colada/discussions/395

- We cannot allow arbitrary injections because the options function can be called anywhere (e.g. retrieve a cached value)
- It would be nice to introduce `defineQueryOptions` earlier in docs and explain that it returns what is passed
- In the case of a function we can invoke it and pass to the cache