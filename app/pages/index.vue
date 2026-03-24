<template>
  <UContainer class="space-y-8">
    <section class="grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(20rem,0.9fr)]">
      <UCard class="overflow-hidden border-default/80 bg-elevated/80 shadow-2xl shadow-primary/10" :ui="{ body: 'p-8 sm:p-10' }">
        <div class="space-y-6">
          <UBadge color="primary" variant="soft" class="rounded-full px-3 py-1">
            Default layout active
          </UBadge>

          <div class="space-y-4">
            <h1 class="max-w-3xl text-4xl font-semibold tracking-tight text-highlighted sm:text-5xl">
              A calmer home for articles, practical notes, and evergreen reference pages.
            </h1>

            <p class="max-w-2xl text-lg leading-8 text-toned">
              The site now runs on Nuxt UI with a shared layout, scoped content routes, and explicit system, light, and dark color modes.
            </p>
          </div>

          <div class="flex flex-wrap gap-3">
            <UButton to="/articles/getting-started" trailing-icon="i-lucide-arrow-right">
              Browse articles
            </UButton>
            <UButton to="/info/about" color="neutral" variant="soft">
              Open info pages
            </UButton>
          </div>
        </div>
      </UCard>

      <div class="grid gap-6">
        <UCard class="border-default/80 bg-default/70" :ui="{ body: 'p-6' }">
          <template #header>
            <div class="flex items-center gap-3">
              <UIcon class="size-5 text-primary" name="i-lucide-layout-template" />
              <h2 class="text-lg font-semibold text-highlighted">Site structure</h2>
            </div>
          </template>

          <div class="space-y-4 text-sm leading-6 text-toned">
            <p>Articles are served from the dedicated /articles route tree.</p>
            <p>Reference and evergreen pages are served from /info.</p>
            <p>The root page is a standard Nuxt UI view instead of a content catch-all.</p>
          </div>
        </UCard>

        <UCard class="border-default/80 bg-default/70" :ui="{ body: 'p-6' }">
          <template #header>
            <div class="flex items-center gap-3">
              <UIcon class="size-5 text-primary" name="i-lucide-swatch-book" />
              <h2 class="text-lg font-semibold text-highlighted">Color modes</h2>
            </div>
          </template>

          <div class="space-y-4 text-sm leading-6 text-toned">
            <p>System mode is the default. The header control lets you switch to explicit light or dark mode at any time.</p>
            <ColorModeToggle />
          </div>
        </UCard>
      </div>
    </section>

    <section class="grid gap-6 md:grid-cols-2">
      <UCard class="border-default/80 bg-default/70" :ui="{ body: 'p-6' }">
        <template #header>
          <div class="flex items-center justify-between gap-3">
            <div>
              <p class="text-sm font-medium text-muted">Articles</p>
              <h2 class="text-xl font-semibold text-highlighted">Editorial content</h2>
            </div>
            <UIcon class="size-5 text-primary" name="i-lucide-newspaper" />
          </div>
        </template>

        <p class="text-sm leading-6 text-toned">
          Long-form content, guides, and essays live under the articles collection and share the same reading shell.
        </p>

        <template #footer>
          <UButton to="/articles/getting-started" color="primary" variant="soft">
            Read the sample article
          </UButton>
        </template>
      </UCard>

      <UCard class="border-default/80 bg-default/70" :ui="{ body: 'p-6' }">
        <template #header>
          <div class="flex items-center justify-between gap-3">
            <div>
              <p class="text-sm font-medium text-muted">Info</p>
              <h2 class="text-xl font-semibold text-highlighted">Reference pages</h2>
            </div>
            <UIcon class="size-5 text-primary" name="i-lucide-book-open-text" />
          </div>
        </template>

        <p class="text-sm leading-6 text-toned">
          Evergreen pages, operational notes, and short explainers sit in the info collection for quick access.
        </p>

        <template #footer>
          <UButton to="/info/about" color="neutral" variant="soft">
            Open the info section
          </UButton>
        </template>
      </UCard>
    </section>
  </UContainer>
</template>
