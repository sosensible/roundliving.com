---
number: 392
title: Nuxt v4 module compatibility issue
type: other
state: closed
created: 2025-09-24
url: "https://github.com/posva/pinia-colada/issues/392"
reactions: 1
comments: 1
---

# Nuxt v4 module compatibility issue

When creating a Nuxt v4 project and trying to add the Pinia Colada module via `nuxi`, a compatibility warning is displayed.

```
npx nuxi module add @pinia/colada-nuxt
# The module @pinia/colada-nuxt is not compatible with Nuxt 4.1.2 (requires ^3.13.0)
```

It seems that when adding a Nuxt module, the module’s compatibility field is being read from nuxt/modules - pinia-colada.yml. Although there is a configuration in the `defineNuxtModule` options, the warning still appears.

I am unsure about the suitable solution for this, but I hope this information proves helpful. Thank you!