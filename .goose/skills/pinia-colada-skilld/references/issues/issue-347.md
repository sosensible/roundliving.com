---
number: 347
title: "[docs] Suggestion: mention `refresh()` method in Query section of quick-start.md"
type: other
state: closed
created: 2025-08-04
url: "https://github.com/posva/pinia-colada/issues/347"
reactions: 1
comments: 0
---

# [docs] Suggestion: mention `refresh()` method in Query section of quick-start.md

Thank you for creating and maintaining this excellent library!
The documentation has been incredibly helpful for learning.

## Description

### Problem

In `docs/quick-start.md`, the Mutations section mentions `refresh()` without it being properly introduced earlier:

> "As you can see, `useMutation()` returns a very similar object to `useQuery()`, it's mostly about the mutation async state. Instead of `refresh()` we have `mutate()`."

However, the `refresh()` method is never mentioned or explained in the earlier Query section, which can confuse beginners who don't know what `refresh()` refers to.

### Suggested Improvement

Add a brief mention of the `refresh()` method in the Query section to help readers understand what it does before referencing it in the Mutations section.

...