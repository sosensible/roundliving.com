---
number: 253
title: Testing Guide
type: docs
state: open
created: 2025-04-08
url: "https://github.com/posva/pinia-colada/issues/253"
reactions: 7
comments: 5
labels: "[ docs]"
---

# Testing Guide

Hi,

I've been switching to this library from TanStack Query, and I have to say, it's phenomenal. Especially when comined with the Data Loaders from unplugin-vue-router.

I am trying to figure out a way to implement unit testing for my implementations of this library. Specifically, my unit tests that call this library in standalone, as well as my feature tests that use this library on pages.

Given that this is based on pinia, I assume I can use `createTestingPinia` to mock most of the stores, and I think I could perhaps make a mock store to pretend it is `_pc_query`. That said, I wanted to see if there were any recommended practices, before I got too crazy with it.

If there are any, let me know, I don't mind doing a writeup to document it for future users.

---

## Top Comments

**@posva** [maintainer]:

You can use the testing pinia indeed to avoid the fetching and use the query cache to set the data or state you need. Personally I would mock the requests instead and set the state for loading if needed

**@posva** [maintainer]:

Thanks for sharing back!

**@posva** [maintainer]:

Note worth including:

- https://github.com/posva/pinia-colada/issues/271#issuecomment-2863346076
- https://github.com/vuejs/pinia/issues/2970 (should be implemented first)