---
number: 428
title: `PiniaColadaDevtools` kills Cloudflare workers deployment completely
category: Questions
created: 2025-11-29
url: "https://github.com/posva/pinia-colada/discussions/428"
upvotes: 2
comments: 1
answered: true
---

# `PiniaColadaDevtools` kills Cloudflare workers deployment completely

During the migration of my Nuxt.js app from Cloudflare Pages to Cloudflare Workers, I've found a bug that every second deployment completely kills the worker w/o the possibility to restore it — any following deployments don't help, only recreating the worker from scratch helped (error 1101).

Trying different variants, I've found that commenting following code helps. Uncommented code breaks the worker again. Tried a few times — commenting always helps.

```vue
<template>
  

  
</template>

<script setup lang="ts">
  // import { PiniaColadaDevtools } from '@pinia/colada-devtools'

  // ...
</script>
```

...

---

## Accepted Answer

**@posva** [maintainer]:

Are you building in production mode?

edit: I think the introduction of the disabled prop broke it. As a workaround, use `<PiniaColadaDevtools v-if="isDev" />` and declare `const isDev = process.env.NODE_ENV !== 'production'`