---
number: 484
title: How to set the mutation error to custom value?
category: Questions
created: 2026-02-03
url: "https://github.com/posva/pinia-colada/discussions/484"
upvotes: 1
comments: 2
answered: true
---

# How to set the mutation error to custom value?

Hello there,
I wrote function handling the errors from my api and i would like to use  it's return value to set the error returned by mutation composable. How can i achieve that? I've tried returning the value in onError hook but it had no effect.


---

## Accepted Answer

**@posva** [maintainer]:

> I've solved my problem by using ofetch's interceptors and throwing the error there, then the exposed error has correct value.

This sounds like a better solution

You forgot to await in your mutation:

```ts
  const { mutate, ...mutation } = useMutation({
    async mutation (body: GameAccountCreate) {
      try {
        const response = await API.createGameAccount(body)
        return response
      } catch (error) {
        console.log(error) // no error in console
        throw new Error("dummy error")
      }
    }
  })
```
