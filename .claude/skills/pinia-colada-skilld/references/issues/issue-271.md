---
number: 271
title: Unable testing using createTestingPinia
type: other
state: closed
created: 2025-04-30
url: "https://github.com/posva/pinia-colada/issues/271"
reactions: 2
comments: 2
---

# Unable testing using createTestingPinia

There is an error when trying to test a component using `createTestingPinia`.

`TypeError: Cannot read properties of undefined (reading 'ext')` 

However, tests pass correctly with `setActivePinia`.

Here is an example to illustrate the issue.