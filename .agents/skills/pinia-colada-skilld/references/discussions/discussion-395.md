---
number: 395
title: Refresh in queries happens outside of application context?
category: Questions
created: 2025-10-04
url: "https://github.com/posva/pinia-colada/discussions/395"
upvotes: 1
comments: 1
answered: true
---

# Refresh in queries happens outside of application context?

The code to fetch data relies on `inject`ed values. This works in first fetch. But when I refetch, or auto refetched after stale time, it blows up. On debugging, I understood that refetch occurs outside of Nuxt app context and thus can't access injected values.

How can I tackle this? Is there a way to bind values?

Code:
```ts
export const useRawAPI = () => {
  const apiToken = inject<string | undefined>(API_OVERRIDE_API_TOKEN, undefined);
  const $api = makeOFetch(apiToken);
  const useRawFetch: typeof useFetch = (arg1, arg2, ...args) => {
    return useFetch(
      arg1,
      {
        ...arg2,
        $fetch: $api,
      },
      ...args
    );
  };
  return { $api, useRawFetch };
};
```

```ts
export const projectsQuery = defineQueryOptions(() => ({
  key: ['projects'],
  query: () => {
    const { $api } = useRawAPI();
    return $api('/api/projects');
  },
  staleTime: DEFAULT_STALE_TIME,
}));
```...

---

## Accepted Answer

**@posva** [maintainer]:

You can also put those two lines of code into its own composable if it’s used everywhere. If your $api is implemented using inject provide, you will have to inject it unfortunately
Query options can be called anywhere so they can’t use injections:

```ts
export const projectsQuery = defineQueryOptions(($api: ReturnType<typeof useRawAPI>['$api']) => ({
  key: ['projects'],
  query: () => {
    return $api('/api/projects');
  },
  staleTime: DEFAULT_STALE_TIME,
}));

export function useProjectsQuery() {
	const { $api } = useRawAPI()
	return useQuery(projectsQuery($api))
}
```

another option not always possible is using a global (not safe for SSR)