---
number: 314
title: Devtools break HMR
type: bug
state: closed
created: 2025-06-13
url: "https://github.com/posva/pinia-colada/issues/314"
reactions: 3
comments: 6
labels: "[ bug]"
---

# Devtools break HMR

Hi,

I installed developer tools following https://pinia-colada.esm.dev/guide/installation.html#Pinia-Colada-Devtools, but it seems to break hot module reloading (HMR).

When I comment out the `<PiniaColadaDevtools />` component like this, HMR works again:
```html

```
Is this a known issue, or is there a recommended workaround?

Thanks

---

## Top Comments

**@posva** [maintainer]:

Found the issue! It's because the custom element is shipped without replacing `process.env.NODE_ENV` to `"production"` which likely leads to the devtol custom element vue version overwriting HMR globals from the app vue version

**@posva** [maintainer] (+1):

Nice catch. The check was also replaced there. I released a patch with a fix

**@posva** [maintainer]:

Can you be more specific? What are you doing that isn’t working? A reproduction would help