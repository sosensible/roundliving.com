---
number: 421
title: It's a bit strange that `useInfiniteQuery` isn't initialized before `loadMore` is called.
category: Questions
created: 2025-11-07
url: "https://github.com/posva/pinia-colada/discussions/421"
upvotes: 1
comments: 1
answered: true
---

# It's a bit strange that `useInfiniteQuery` isn't initialized before `loadMore` is called.

In my case:
```vue
<script setup>
import { useInfiniteQuery } from '@pinia/colada';

const { state, status, asyncStatus, loadMore } = useInfiniteQuery({
  key: ['list'],
  query: async (list) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const newList = [];
    for (let i = list.length; i < list.length + 5; i++) {
      newList.push(i);
    }
    return newList;
  },
  initialPage: () => [],
  merge: (current, loaded) => {
    if (!loaded) return current;
    return current.concat(loaded);
  },
});
</script>

<template>
  <div>
    <p>status: {{ status }}</p>
    <p>asyncStatus: {{ asyncStatus }}</p>
    <hr />
    <template v-if="state.status === 'success'">
      <ul>
        <li v-for="i in state.data" :key="i">{{ i }}</li>
      </ul>
      <button @click="loadMore">loadMore</button>
    </template>
    <p v-else-if="state.status === 'error'">error!</p>
    <p v-else>loading...</p>
  </div>
</template>
```...

---

## Accepted Answer

**@posva** [maintainer]:

This seems like a limitation of the current design. I want to fully revisit it before v1. It will probably look more like tanstack query