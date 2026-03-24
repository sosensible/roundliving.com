---
number: 149
title: "Feature Request: Support for deep Structured Keys"
type: feature
state: closed
created: 2024-12-31
url: "https://github.com/posva/pinia-colada/issues/149"
reactions: 3
comments: 17
labels: "[ feature request]"
---

# Feature Request: Support for deep Structured Keys

Hi, I'm the author of **oRPC**, a library for typesafe API. I'm exploring the possibility of integrating oRPC with `pinia-colada`. However, I've encountered a limitation with the way `pinia-colada` handles the `key` part of its functionality.

### Context

oRPC requires the `key` to support structured formats like the following:

```javascript
['__ORPC__', ['planet', 'list', 'infinite'], { type: 'query', input: { keyword: 'abc', limit: 9 } }]
```

Additionally, a query with the key above needs to be revalidated with these related keys:

- `['__ORPC__', ['planet'], {}]`
- `['__ORPC__', ['planet'], { type: 'query' }]`
- `['__ORPC__', ['planet', 'list'], {}]`
- `['__ORPC__', ['planet', 'list'], { input: { keyword: 'abc' } }]`

The `type: 'query'` part can be ignored if there ...

---

## Top Comments

**@posva** [maintainer] (+1):

Currently only structured keys are supported but this should be doable. I think it could even be implemented with a pinia colada plugin that intercepts invalidateEntry actions and applies custom invalidation 

**@posva** [maintainer] (+1):

It seems like a very niche case for generated keys, so a plugin is probably a better fit not to impact size but who knows. Note that the plugin can also be implemented directly on your library so you don’t have to wait

**@posva** [maintainer]:

Have you tried with the `predicate` option: `queryCache.invalidateQueries({ predicate })`?