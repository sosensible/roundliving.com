<script setup lang="ts">
const colorMode = useColorMode()

const modes = [
  { label: 'System', value: 'system', icon: 'i-lucide-monitor' },
  { label: 'Light', value: 'light', icon: 'i-lucide-sun' },
  { label: 'Dark', value: 'dark', icon: 'i-lucide-moon' },
] as const
</script>

<template>
  <div class="inline-flex items-center gap-1 rounded-2xl border border-default bg-elevated/80 p-1">
    <UButton
      v-for="mode in modes"
      :key="mode.value"
      :aria-label="mode.label"
      :color="colorMode.preference === mode.value ? 'primary' : 'neutral'"
      :icon="mode.icon"
      :variant="colorMode.preference === mode.value ? 'soft' : 'ghost'"
      size="xs"
      @click="colorMode.preference = mode.value"
    />
  </div>
</template>
