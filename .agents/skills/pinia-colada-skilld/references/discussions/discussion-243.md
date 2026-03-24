---
number: 243
title: Vue 2 support
category: Questions
created: 2025-04-01
url: "https://github.com/posva/pinia-colada/discussions/243"
upvotes: 2
comments: 1
answered: true
---

# Vue 2 support

Hey :slightly_smiling_face: 
I couldn't find any mention of Vue 2 support in the docs, but based on this commit I assume that it does work with Vue 2.

Quickly tried it with a test app create via `npm create vue@legacy` but had no luck. Terminal throws errors.
```BASH
✘ [ERROR] No matching export in "node_modules/vue/dist/vue.runtime.esm.js" for import "toValue"

    node_modules/@pinia/colada/dist/index.js:359:124:
      359 │ import { getCurrentInstance as getCurrentInstance3, getCurrentScope as getCurrentScope5, onScopeDispose as onScopeDispose3, toValue as toValue3 } from "vue";
```

My setup:
```JS
import Vue from "vue";
import { createPinia, PiniaVuePlugin } from "pinia";
import { PiniaColada } from "@pinia/colada";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

Vue.use(PiniaVuePlugin);
Vue.use(PiniaColada, {});

new Vue({
  router,
  pinia: createPinia(),
  render: (h) => h(App),
}).$mount("#app");
```...

---

## Accepted Answer

**@posva** [maintainer]:

Vue 2 is supported with a patch (to Vue 2), I successfully added it to a company's project in Vue 2.7. I haven't added it to docs yet but this option will be oriented to companies only and have a commercial license