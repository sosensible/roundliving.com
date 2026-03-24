---
number: 399
title: how do I implement streaming using this ?
category: Questions
created: 2025-10-15
url: "https://github.com/posva/pinia-colada/discussions/399"
upvotes: 1
comments: 1
answered: true
---

# how do I implement streaming using this ?

I want to use this to simplify a lot of rest api calls, however, there are some state that I have bound to the UI. and those state variables are getting populated with streaming data from server. I use fetch with reader currently, but can also use SSE. how does pinia-colada fits for such case? is there any example you can direct me to ?

---

## Accepted Answer

**@posva** [maintainer]:

It depends a lot on how you handle the stream and how you want to set the data, you could for example set the cache data after each chunk and even abstract this as a composable on top of useQuery. Here is an example unit test from the codebase:

```ts
  it('works with a streamed response', async () => {
    async function* streamData() {
      yield 'hey'
      await delay(50)
      yield ' '
      await delay(50)
      yield 'you'
    }

    const { wrapper, queryCache } = mountSimple({
      key: ['key'],
      async query() {
        let result = ''
        for await (const chunk of streamData()) {
          result += chunk
          queryCache.setQueryData(['key'], result)
        }
        return result
      },
    })

    await flushPromises()
    expect(wrapper.vm.data).toBe('hey')
    expect(wrapper.vm.isLoading).toBe(true)

    vi.advanceTimersByTime(50)
    await flushPromises()
    expect(wrapper.vm.data).toBe('hey ')
    expect(wrapper.vm.isLoading).toBe(true)

    vi.advanceTimersByTime(50)
    await flushPromises()
    expect(wrapper.vm.data).toBe('hey you')
    expect(wrapper.vm.isLoading).toBe(false)
  })

```...