---
number: 239
title: Update state after a mutation?
category: Questions
created: 2025-03-28
url: "https://github.com/posva/pinia-colada/discussions/239"
upvotes: 2
comments: 1
answered: true
---

# Update state after a mutation?

I know that I can invalidate the cache after a mutation and retrieve the item again, but I would like to avoid an extra round-trip to the server and update the state with the result of e.g. a PATCH request.  Currently when trying to write to the data ref returned from useQuery, it doesn't get updated (or isn't reactive?).  Is this currently not possible, or am I just doing it wrong?

```js
const { asyncStatus, data: items } = useQuery({
    key: () => ['uploadSpreadsheets', archived.value],
    query: () => api.bidTool.uploadSpreadsheets.index({ filter: filterParams.value }),
    placeholderData: [],
});

function onArchive(item) {
    const index = items.value.findIndex(i => i.hash === item.hash);
    if (index !== -1) {
        items.value[index] = item;
    }
}
```

---

## Accepted Answer

**@posva** [maintainer]:

You can replace it in the `onSuccess` hook:

```ts
useMutation({
  // ...
  onSuccess(contact, _contactInfo, { newContact }) {
    // update the contact with the information from the server
    queryCache.setQueryData(['contact', newContact.id], contact)
  },
})
```

https://pinia-colada.esm.dev/guide/optimistic-updates.html