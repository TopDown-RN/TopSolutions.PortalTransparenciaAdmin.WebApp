<script setup>
const props = defineProps(['title', 'subtitle', 'description', 'aviso'])
</script>

<template>
  <div class="mx-auto max-w-3xl text-center">
    <h1 class="text-2xl font-semibold text-surface-800 lg:text-3xl dark:text-white">
      {{ props.title }}
    </h1>
    <span class="inline-block h-1 w-40 rounded-full bg-primary-500"></span>
    <span class="ml-1 inline-block h-1 w-3 rounded-full bg-primary-500"></span>
    <span class="ml-1 inline-block h-1 w-1 rounded-full bg-primary-500"></span>
    <p class="mt-2 text-lg leading-8 text-gray-700 dark:text-white/80">
      {{ props.subtitle }}
    </p>
    <span v-if="props.aviso" class="mt-2 bg-yellow-200 p-1 text-lg leading-8 text-yellow-600">
      {{ props.aviso }}
    </span>
    <div class="mt-2 text-base leading-8 text-gray-500 dark:text-white/80">
      {{ props.description }}
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
