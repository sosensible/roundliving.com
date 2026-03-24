<script setup lang="ts">
const route = useRoute()

function segmentToLabel(segment: string) {
  return segment
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

type TocLink = {
  id: string
  text: string
  children?: TocLink[]
}

function flattenTocLinks(links: TocLink[], level = 0): Array<{ id: string, text: string, level: number }> {
  return links.flatMap(link => [
    { id: link.id, text: link.text, level },
    ...flattenTocLinks(link.children ?? [], level + 1),
  ])
}

const { data: page } = await useAsyncData('info-' + route.path, () => {
  return queryCollection('siteInfo')
    .path(route.path)
    .where('status', '=', 'live')
    .first()
})

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

useSeoMeta({
  title: page.value.og?.title ?? page.value.title,
  description: page.value.og?.description ?? page.value.description,
  ogTitle: page.value.og?.title ?? page.value.title,
  ogDescription: page.value.og?.description ?? page.value.description,
  ogImage: page.value.og?.image ?? page.value.image,
  ogType: 'article',
  ogUrl: route.path,
  twitterCard: page.value.twitter?.card ?? 'summary_large_image',
  twitterTitle: page.value.twitter?.title ?? page.value.og?.title ?? page.value.title,
  twitterImage: page.value.twitter?.image ?? page.value.og?.image ?? page.value.image,
})

const breadcrumbItems = computed(() => {
  const segments = route.path.split('/').filter(Boolean)

  if (segments[0] !== 'info') {
    return []
  }

  const items = [{ label: 'Info', to: '/info' }]

  let currentPath = '/info'
  const nestedSegments = segments.slice(1)

  nestedSegments.forEach((segment, index) => {
    currentPath += `/${segment}`
    const isLast = index === nestedSegments.length - 1

    items.push({
      label: isLast ? (page.value?.title ?? segmentToLabel(segment)) : segmentToLabel(segment),
      to: currentPath,
    })
  })

  return items
})

const tocItems = computed(() => {
  const links = (page.value?.body?.toc?.links ?? []) as TocLink[]
  return flattenTocLinks(links)
})
</script>

<template>
  <UContainer class="py-4 sm:py-6">
    <div class="mx-auto max-w-6xl lg:grid lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-8">
      <div class="min-w-0 space-y-5 lg:max-w-3xl">
        <div class="space-y-3">
          <UBreadcrumb :items="breadcrumbItems" />
        </div>

        <UCard class="border-default/80 bg-default/80 shadow-xl shadow-primary/5" :ui="{ body: 'p-6 sm:p-8 lg:p-10' }">
          <article class="content-docs content-docs-info">
            <ContentRenderer v-if="page" :value="page" />
          </article>
        </UCard>
      </div>

      <aside class="hidden lg:block">
        <UCard class="sticky top-24 border-default/80 bg-default/80" :ui="{ body: 'p-4' }">
          <p class="text-sm font-semibold text-toned">On this page</p>

          <ul v-if="tocItems.length" class="mt-3 space-y-1.5">
            <li v-for="item in tocItems" :key="item.id">
              <NuxtLink
                :to="`#${item.id}`"
                class="block rounded-md px-2 py-1.5 text-sm text-muted transition hover:bg-elevated hover:text-highlighted"
                :style="{ paddingLeft: `${0.5 + item.level * 0.75}rem` }"
              >
                {{ item.text }}
              </NuxtLink>
            </li>
          </ul>

          <p v-else class="mt-3 text-sm text-muted">
            No headings available.
          </p>
        </UCard>
      </aside>
    </div>
  </UContainer>
</template>
