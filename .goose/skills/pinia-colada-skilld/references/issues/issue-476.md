---
number: 476
title: Revert the removing of @vue/devtools-api plugin
type: other
state: closed
created: 2026-01-29
url: "https://github.com/posva/pinia-colada/issues/476"
reactions: 2
comments: 1
---

# Revert the removing of @vue/devtools-api plugin

What was the reason of removing the vue devtools plugin in https://github.com/posva/pinia-colada/commit/9bfd03577d622b4dc5636e65b6efef3f39aa82d9?

I preferred it way more then the native @pinia/colada-devtools. To be honest when it stopped working after the update in devtools I thought it was a bug.

Does the native plugin have more options? Can't we have both optional pretty please?  

If you want to make colada dependecy free you could await import the **@vue/devtools-api** in `./devtools/plugin` and make it optional by config here?

```js
  if (typeof document !== 'undefined' && process.env.NODE_ENV === 'development') {
    addDevtools(app, pinia)
  }
```
So we could install it manually?

...