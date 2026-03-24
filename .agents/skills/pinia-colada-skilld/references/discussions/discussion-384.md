---
number: 384
title: Blocking navigation with Nuxt 4
category: Questions
created: 2025-09-09
url: "https://github.com/posva/pinia-colada/discussions/384"
upvotes: 1
comments: 1
answered: true
---

# Blocking navigation with Nuxt 4

Hello,

I recently started learning Vue.js and Nuxt. I initially used useFetch to block the navigation and show the <NuxtLoadingIndicator />, which works well for this particular app (small amount of data that doesn't change).

```javascript
export async function fetchMovies() {
    return useFetch<IMovieSummary[]>(BASE_URL, {
        query: {
            fields: "id,title,image,release_date,running_time,rt_score"
        },
    });
}
```

But I quickly realized that the cached data gets purged when navigating to a different page and unmounting the component. I then switched to Pinia Colada with Pinia and both Nuxt plugins, which should support SSR. But I can't get the same blocking navigation functionality to work the same like with useFetch. Even with await, it behaves like...

---

## Accepted Answer

**@posva** [maintainer]:

You can `await refresh()` in your component (`const { refresh } = useQuery()`) for the same behavior than `await useFetch()`