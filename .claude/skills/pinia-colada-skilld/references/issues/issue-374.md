---
number: 374
title: Cannot stringify a function when using SSG | Nuxt 4 + Pinia + Pinia-Colada
type: bug
state: closed
created: 2025-08-27
url: "https://github.com/posva/pinia-colada/issues/374"
reactions: 2
comments: 1
labels: "[ bug,  contribution welcome,  nuxt]"
---

# Cannot stringify a function when using SSG | Nuxt 4 + Pinia + Pinia-Colada

Hi

I recently tried to set up Nuxt 4 with Pinia Colada and use `nuxt generate` for generating an SSG website and while this works, as soon as I added Pinia, the generation throws an error:
> ERROR  [request error] [unhandled] [GET] http://localhost/         6:20:05 PM
> Cannot stringify a function
>
>   at flatten (node_modules/.pnpm/devalue@5.1.1/node_modules/devalue/src/stringify.js:48:10)
>    at flatten (node_modules/.pnpm/devalue@5.1.1/node_modules/devalue/src/stringify.js:200:43)
>    at flatten (node_modules/.pnpm/devalue@5.1.1/node_modules/devalue/src/stringify.js:200:43)
>    at flatten (node_modules/.pnpm/devalue@5.1.1/node_modules/devalue/src/stringify.js:136:34)
>    at flatten (node_modules/.pnpm/devalue@5.1.1/node_modules/devalue/src/stringify.js:65:39)
>    at flatten (node...

---

## Top Comments

**@posva** [maintainer]:

It's weird it works during SSR but not during SSG  