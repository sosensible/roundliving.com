<script setup lang="ts">
const { color } = defineProps({
  color: {
    type: String,
    default: 'warning',
  },
})
</script>

<template>
  <UAlert
    :color="color"
    icon="i-lucide-circle-alert"
    variant="soft"
    :ui="{ root: 'rounded-2xl', description: 'text-sm leading-6' }"
  >
    <template #description>
      <slot />
    </template>
  </UAlert>
</template>