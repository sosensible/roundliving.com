<script setup lang="ts">
const count = ref(0)

const increment = () => {
  count.value++
}

const decrement = () => {
  count.value--
}
</script>

<template>
  <UCard class="my-6 border-default/80 bg-muted/60" :ui="{ body: 'p-5' }">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div class="space-y-1">
        <p class="text-sm font-medium text-muted">Interactive example</p>
        <h3 class="text-lg font-semibold text-highlighted">Counter: {{ count }}</h3>
      </div>

      <div class="flex items-center gap-2">
        <UButton color="neutral" variant="soft" @click="decrement">
          Decrement
        </UButton>
        <UButton @click="increment">
          Increment
        </UButton>
      </div>
    </div>
  </UCard>
</template>
