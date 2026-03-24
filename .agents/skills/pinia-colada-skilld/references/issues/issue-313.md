---
number: 313
title: Add a `meta` property to entries
type: feature
state: closed
created: 2025-06-13
url: "https://github.com/posva/pinia-colada/issues/313"
reactions: 2
comments: 0
labels: "[ enhancement]"
---

# Add a `meta` property to entries

Allows adding extra information and declaring global helpers. #309 

- Should be `Record<string, unknown>` by default
- Can be typed globally, extended locally
- should be compatible with `defineQueryOptions` typing
- can be a ref, fn, or value
- `entry.meta` contain the raw value (computed at entry creation)
- `entry.options.meta` remains unchanged
- SSR: needs to be serialized and restored
  - user can do `import.env.server ? undefined : {...}` if they want to ignore on server