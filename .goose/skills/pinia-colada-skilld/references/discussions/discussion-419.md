---
number: 419
title: GraphQL Mutation Errors Not Triggering Plugin onSuccess
category: Questions
created: 2025-11-06
url: "https://github.com/posva/pinia-colada/discussions/419"
upvotes: 1
comments: 1
answered: true
---

# GraphQL Mutation Errors Not Triggering Plugin onSuccess

```ts
useMutation({
    mutation: async (data: DomainInput) => await $sdk.createDomain({
      input: data,
    }),
    onSettled: () => {
      // Invalidate domains cache after adding
      queryCache.invalidateQueries({
        predicate: query => query.key[0] === 'domains' || query.key[0] === 'user-domains' || query.key[0] === 'adminDomains',
      })
      // Invalidate organization statistics
      queryCache.invalidateQueries({
        key: ['organization-statistics'],
      })
    },
    onSuccess(error, vars, context) {
      console.error('Error adding domain:', error, vars, context)
    },
``` 


i am see browser.
```
onSuccess(error, vars, context) {
      console.error('Error adding domain:', error, vars, context) 

    },
``` 

api 200 and data return: 

...

---

## Accepted Answer

**@posva** [maintainer]:

The plugin is for queries. For mutations, you pass it in the options of the PiniaColada plugin directly. You have an example in docs too!