<script setup lang="ts">
function segmentToLabel(segment: string) {
  return segment
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

type InfoDoc = {
  path: string
  title?: string
  description?: string
  status?: 'draft' | 'review' | 'live'
}

const { data: liveInfoDocs } = await useAsyncData('info-live-index', () => {
  return queryCollection('siteInfo')
    .where('status', '=', 'live')
    .all()
})

const mainDoc = computed(() => {
  return (liveInfoDocs.value as InfoDoc[] | null)?.find(doc => doc.path === '/info')
})

const groupedLiveItems = computed(() => {
  const docs = (liveInfoDocs.value as InfoDoc[] | null) ?? []
  const groups = new Map<string, Array<{ title: string, to: string, description?: string }>>()

  for (const doc of docs) {
    if (doc.path === '/info') {
      continue
    }

    const segments = doc.path.split('/').filter(Boolean)

    if (segments[0] !== 'info' || segments.length < 2) {
      continue
    }

    const groupKey = segments[1]
    const groupLabel = segmentToLabel(groupKey)

    if (!groups.has(groupLabel)) {
      groups.set(groupLabel, [])
    }

    groups.get(groupLabel)?.push({
      title: doc.title || segmentToLabel(segments[segments.length - 1]),
      to: doc.path,
      description: doc.description,
    })
  }

  return Array.from(groups.entries())
    .map(([label, items]) => {
      const sortedItems = items.sort((a, b) => a.title.localeCompare(b.title))
      return {
        label,
        items: sortedItems,
      }
    })
    .sort((a, b) => a.label.localeCompare(b.label))
})

const totalLiveItems = computed(() => {
  return groupedLiveItems.value.reduce((count, group) => count + group.items.length, 0)
})

useSeoMeta({
  title: mainDoc.value?.title ?? 'Info',
  description: mainDoc.value?.description ?? 'Live info pages.',
  ogTitle: mainDoc.value?.title ?? 'Info',
  ogDescription: mainDoc.value?.description ?? 'Live info pages.',
  ogType: 'website',
  ogUrl: '/info',
  twitterCard: 'summary_large_image',
  twitterTitle: mainDoc.value?.title ?? 'Info',
})
</script>

<template>
  <UContainer class="py-4 sm:py-6">
    <div class="mx-auto max-w-6xl space-y-6">
      <UCard class="border-default/80 bg-default/80 shadow-xl shadow-primary/5" :ui="{ body: 'p-6 sm:p-8' }">
        <div class="space-y-3">
          <h1 class="text-2xl font-semibold tracking-tight text-highlighted sm:text-3xl">
            {{ mainDoc?.title || 'Info' }}
          </h1>
          <p class="text-sm text-toned sm:text-base">
            {{ mainDoc?.description || 'Browse live information pages.' }}
          </p>
          <p class="text-xs uppercase tracking-[0.2em] text-muted">
            Showing live status only
          </p>
        </div>
      </UCard>

      <UAlert
        v-if="!totalLiveItems"
        color="neutral"
        icon="i-lucide-eye-off"
        title="No live info items"
        description="There are currently no live entries to display."
        variant="soft"
      />

      <div v-else class="grid gap-4 sm:gap-5 lg:grid-cols-2">
        <UCard
          v-for="group in groupedLiveItems"
          :key="group.label"
          class="border-default/80 bg-default/80"
          :ui="{ body: 'p-5 sm:p-6' }"
        >
          <div class="space-y-4">
            <h2 class="text-lg font-semibold text-highlighted">
              {{ group.label }}
            </h2>

            <ul class="space-y-2.5">
              <li v-for="item in group.items" :key="item.to">
                <NuxtLink
                  :to="item.to"
                  class="group block rounded-md px-2 py-2 transition hover:bg-elevated"
                >
                  <p class="text-sm font-medium text-highlighted group-hover:text-primary">
                    {{ item.title }}
                  </p>
                  <p v-if="item.description" class="mt-1 line-clamp-2 text-sm text-muted">
                    {{ item.description }}
                  </p>
                </NuxtLink>
              </li>
            </ul>
          </div>
        </UCard>
      </div>
    </div>
  </UContainer>
</template>
