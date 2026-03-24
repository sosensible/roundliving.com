---
number: 307
title: "[devtools] Add a way to invalidate a custom key"
type: other
state: open
created: 2025-06-06
url: "https://github.com/posva/pinia-colada/issues/307"
reactions: 0
comments: 3
labels: "[ devtools]"
---

# [devtools] Add a way to invalidate a custom key

Hey ,

Thanks for making the new devtools, It's super useful to efficiently handle loading and error state without manually playing with the Network tab of the Chrome Inspector.

Currently, it's possible to invalidate a query but do you think it could be possible to invalidate a custom key?

For example, I have a key `['items', 1, 'sub-item']` and `['items', 1, 'another']` and I would like to invalidate `['items']` to automatically invalidate the two keys.