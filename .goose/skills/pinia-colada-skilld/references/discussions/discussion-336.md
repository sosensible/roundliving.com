---
number: 336
title: isLoading example question
category: Questions
created: 2025-07-23
url: "https://github.com/posva/pinia-colada/discussions/336"
upvotes: 1
comments: 1
answered: true
---

# isLoading example question

notice that the example about `useQuery`
```vue
<div v-if="asyncStatus === 'loading'">
      Loading...
</div>
<div v-else-if="state.status === 'error'">
      Oops, an error happened...
</div>
<div v-else-if="state.data">
      <TodoItem v-for="todo in state.data" :key="todo.id" :todo="todo" />
</div>
```

1. enter `todoDetail`, query trigger request, show loading
2. enter `otherPage`, stay 5s ( the default `staleTime`)
3. go back to `todoDetail`

After go back to `todoDetail`, query should use cache data Immediately, and update the query in the background. I think the loading tips should not appear. Maybe using `isPending` to control  loading tips ( just like TanStack) will be better. Because `isLoadi...

---

## Accepted Answer

**@posva** [maintainer]:

It depends on the example, sometimes you want to show you are refreshing the data. In this one, since it's `v-else-if="state.status == 'error'"` instead of `v-if`, yes, using `isPending` is indeed a better default and the docs should be updated