<script setup lang="ts">
const route = useRoute()
const isSearchOpen = ref(false)
const searchTerm = ref('')

const navigation = [
  { label: 'Home', to: '/', prefix: '/' },
  { label: 'Articles', to: '/articles/getting-started', prefix: '/articles' },
  { label: 'Info', to: '/info', prefix: '/info' },
]

type SearchSection = {
  id: string
  title: string
  titles: string[]
  level: number
  content: string
}

const { data: articleSections } = await useAsyncData('search-articles-sections', () => {
  return queryCollectionSearchSections('articles', { maxHeading: 'h4' })
})

const { data: infoSections } = await useAsyncData('search-info-sections', () => {
  return queryCollectionSearchSections('siteInfo', { maxHeading: 'h4' })
})

const { data: liveInfoPages } = await useAsyncData('search-live-info-pages', () => {
  return queryCollection('siteInfo').where('status', '=', 'live').all()
})

const liveInfoPaths = computed(() => {
  return new Set((liveInfoPages.value ?? []).map(page => page.path))
})

function summarizeContent(content: string) {
  const clean = content.replace(/\s+/g, ' ').trim()
  return clean.length > 110 ? `${clean.slice(0, 107)}...` : clean
}

function fallbackLabelFromPath(path: string) {
  const segment = path.split('/').filter(Boolean).pop() || path
  return segment
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function toSearchItems(sections: SearchSection[] = []) {
  const pages = new Map<string, { label: string, description: string, to: string }>()

  for (const section of sections) {
    const pagePath = section.id.split('#')[0]

    if (pages.has(pagePath)) {
      continue
    }

    pages.set(pagePath, {
      label: section.titles[0] || section.title || fallbackLabelFromPath(pagePath),
      description: summarizeContent(section.content),
      to: pagePath,
    })
  }

  return Array.from(pages.values()).map((page) => {
    return {
      label: page.label,
      description: page.description,
      icon: 'i-lucide-file-text',
      to: page.to,
      onSelect: () => {
        isSearchOpen.value = false
      },
    }
  })
}

const searchGroups = computed(() => {
  if (!searchTerm.value.trim()) {
    return [
      { id: 'articles', label: 'Articles', items: [], ignoreFilter: true },
      { id: 'info', label: 'Info', items: [], ignoreFilter: true },
    ]
  }

  return [
    {
      id: 'articles',
      label: 'Articles',
      items: toSearchItems(articleSections.value as SearchSection[]),
    },
    {
      id: 'info',
      label: 'Info',
      items: toSearchItems(
        (infoSections.value as SearchSection[])
          .filter(section => liveInfoPaths.value.has(section.id.split('#')[0])),
      ),
    },
  ]
})

watch(isSearchOpen, (open) => {
  if (!open) {
    searchTerm.value = ''
  }
})

function onGlobalKeydown(event: KeyboardEvent) {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault()
    isSearchOpen.value = true
  }
}

onMounted(() => {
  window.addEventListener('keydown', onGlobalKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onGlobalKeydown)
})

function isActive(prefix: string) {
  return prefix === '/' ? route.path === '/' : route.path.startsWith(prefix)
}
</script>

<template>
  <div class="min-h-screen bg-default text-default">
    <div class="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div class="absolute inset-x-0 top-[-10rem] h-[24rem] bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.18),transparent_58%)]" />
      <div class="absolute inset-x-0 bottom-[-14rem] h-[28rem] bg-[radial-gradient(circle_at_bottom,rgba(14,165,233,0.14),transparent_54%)]" />
      <div class="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(15,23,42,0.03))] dark:bg-[linear-gradient(to_bottom,transparent,rgba(255,255,255,0.02))]" />
    </div>

    <header class="sticky top-0 z-30 border-b border-default/80 bg-default/80 backdrop-blur-xl">
      <UContainer class="flex min-h-18 flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between">
        <NuxtLink class="flex items-center gap-4" to="/">
          <div class="flex size-11 items-center justify-center rounded-2xl bg-primary text-inverted shadow-lg shadow-primary/20">
            <span class="text-sm font-semibold tracking-[0.22em]">RL</span>
          </div>

          <div class="space-y-1">
            <p class="text-sm font-semibold uppercase tracking-[0.24em] text-muted">
              Round Living
            </p>
            <p class="text-sm text-toned">
              Articles and practical notes powered by Nuxt UI.
            </p>
          </div>
        </NuxtLink>

        <div class="flex flex-col gap-3 lg:flex-row lg:items-center">
          <nav class="flex flex-wrap items-center gap-2">
            <UButton
              v-for="item in navigation"
              :key="item.to"
              :color="isActive(item.prefix) ? 'primary' : 'neutral'"
              :to="item.to"
              :variant="isActive(item.prefix) ? 'soft' : 'ghost'"
              size="sm"
            >
              {{ item.label }}
            </UButton>
          </nav>

          <UButton
            color="neutral"
            icon="i-lucide-search"
            label="Search"
            trailing-icon="i-lucide-command"
            variant="outline"
            @click="isSearchOpen = true"
          >
            <template #trailing>
              <div class="hidden items-center gap-1 sm:flex">
                <UKbd value="Ctrl" />
                <UKbd value="K" />
              </div>
            </template>
          </UButton>

          <ColorModeToggle />
        </div>
      </UContainer>
    </header>

    <UModal v-model:open="isSearchOpen" :ui="{ content: 'max-w-2xl' }">
      <template #content>
        <UCommandPalette
          :groups="searchGroups"
          :search-term="searchTerm"
          close
          icon="i-lucide-search"
          placeholder="Search articles and info..."
          @update:open="(value) => isSearchOpen = value"
          @update:search-term="(value) => searchTerm = value"
        />
      </template>
    </UModal>

    <main class="pb-16 pt-8 sm:pt-10">
      <slot />
    </main>

    <footer class="border-t border-default/80 bg-default/50">
      <UContainer class="flex flex-col gap-2 py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>Built with Nuxt Content and Nuxt UI.</p>
        <p>System color mode is the default, with light and dark overrides available.</p>
      </UContainer>
    </footer>
  </div>
</template>