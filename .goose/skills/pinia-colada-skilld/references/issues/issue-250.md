---
number: 250
title: SSR Issues  v0.14.2
type: other
state: closed
created: 2025-04-05
url: "https://github.com/posva/pinia-colada/issues/250"
reactions: 1
comments: 1
---

# SSR Issues  v0.14.2

When SSR I get the following warning:

`[Vue warn]: Property "_uid" was accessed during render but is not defined
 on instance.`


This issue was marked completed referencing the same issue https://github.com/posva/pinia-colada/issues/242

I tried updating my pinia-colada and still get the error was this not released or does this error still persist?


Here is the query code which the error is coming from:

```ts
const { data: sessions } = useQuery({
  key: ['sessions'],

  query: () => useRequestFetch()('/api/auth/sessions').then(sessions => sessions.map(session => ({
    ...session,
    lastActiveAt: new Date(session.lastActiveAt),
    createdAt: new Date(session.createdAt)
  })) as Session[])
})
```