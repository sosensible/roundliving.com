# Code Conventions

## Vue Component Patterns

### Script Setup (Composition API)
All Vue components use `<script setup lang="ts">`. Options API is not used.

### Auto-Imported Utilities
Nuxt auto-imports without explicit imports:
- Vue: `ref()`, `computed()`, `watch()`, `onMounted()`, `onBeforeUnmount()`
- Nuxt: `useRoute()`, `useAsyncData()`, `useSeoMeta()`, `useColorMode()`, `createError()`
- Nuxt Content: `queryCollection()`, `queryCollectionSearchSections()`

### Component Structure Order
```vue
<script setup lang="ts">
// 1. Composables and hooks
// 2. Type definitions
// 3. Reactive state (ref, computed)
// 4. Functions/helpers
// 5. Lifecycle hooks / watchers
</script>
<template>...</template>
```

### TypeScript
- Function parameters have type annotations
- Complex objects use inline `type` declarations (e.g., `type TocLink`, `type SearchSection`)

## File and Component Naming

- **Pages**: kebab-case route segments — `articles/[...slug].vue`, `info/[...slug].vue`
- **Components**: PascalCase — `Alert.vue`, `Counter.vue`, `ColorModeToggle.vue`
- **Content files**: kebab-case — `getting-started.md`, `adobe-roundhouses.md`
- **Category directories**: kebab-case — `content/articles/domes/`, `content/info/people/`
- Components are auto-registered; no imports needed in templates

## CSS and Tailwind Conventions

### Utility-First
All styling uses Tailwind v4 utilities inline. No custom CSS classes except `.content-docs` and `.content-docs-info` for rendered markdown.

### Responsive (Mobile-First)
```html
class="grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(20rem,0.9fr)]"
```
Common breakpoints: `sm:`, `md:`, `lg:`

### CSS Custom Properties (`main.css`)
- `--ui-radius: 1rem`
- `--ui-container: 76rem`

### Color System (`app.config.ts`)
- `primary: emerald` — main accent, links, highlights
- `secondary: sky` — secondary elements
- `neutral: slate` — text, backgrounds, borders

Semantic tokens used in templates:
- `text-highlighted` — headings/emphasis
- `text-toned` — body text
- `text-muted` — helper/secondary text
- `bg-default` / `bg-elevated` — backgrounds
- `border-default/80` — subtle borders with transparency

### Nuxt UI Component Props
```vue
<UButton color="primary" variant="soft">Action</UButton>
<UAlert color="warning" icon="i-lucide-circle-alert">Message</UAlert>
<UCard :ui="{ body: 'p-6' }" class="border-default/80">Content</UCard>
```
The `:ui` prop customizes nested element classes.

## Content and Markdown Conventions

### Frontmatter Schema — Articles
```yaml
---
title: "Article Title"
description: "Brief description"
image: "url-to-image"
og:
  title: "Custom OG title"
  description: "Custom OG description"
  image: "url-to-og-image"
twitter:
  card: "summary" | "summary_large_image" | "app" | "player"
  title: "Custom Twitter title"
  image: "url-to-twitter-image"
---
```

### Frontmatter Schema — Site Info
Same as above, plus:
```yaml
status: "draft" | "review" | "live"  # Only "live" renders; others return 404
```

### Markdown Patterns
- Heading hierarchy: `# H1` (title), `## H2` (sections), `### H3` (subsections)
- Internal links use absolute paths: `/articles/slug`, `/info/category/slug`
- Code blocks use triple backticks with language identifier

### Content Rendering
- `<ContentRenderer v-if="page" :value="page" />` renders markdown
- TOC auto-generated from headings (h1–h4), rendered in sticky sidebar on large screens

## SEO Patterns

### useSeoMeta Cascade (all content pages)
```typescript
useSeoMeta({
  title: page.value.og?.title ?? page.value.title,
  description: page.value.og?.description ?? page.value.description,
  ogTitle: page.value.og?.title ?? page.value.title,
  ogDescription: page.value.og?.description ?? page.value.description,
  ogImage: page.value.og?.image ?? page.value.image,
  ogType: 'article',        // 'website' on index pages
  ogUrl: route.path,
  twitterCard: page.value.twitter?.card ?? 'summary_large_image',
  twitterTitle: page.value.twitter?.title ?? page.value.og?.title ?? page.value.title,
  twitterImage: page.value.twitter?.image ?? page.value.og?.image ?? page.value.image,
})
```

**Fallback priority**: twitter → og → base title/description/image
