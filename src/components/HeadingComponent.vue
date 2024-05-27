<script setup>
const props = defineProps(['title', 'subtitle', 'description', 'aviso'])
</script>

<template>
  <div class="mx-auto max-w-3xl text-center">
    <h1 class="text-2xl font-semibold text-gray-800 lg:text-3xl dark:text-white">
      {{ props.title }}
    </h1>
    <span class="inline-block w-40 h-1 bg-primary-500 rounded-full"></span>
    <span class="inline-block w-3 h-1 ml-1 bg-primary-500 rounded-full"></span>
    <span class="inline-block w-1 h-1 ml-1 bg-primary-500 rounded-full"></span>
    <p class="mt-2 text-lg leading-8 text-gray-700">
      {{ props.subtitle }}
    </p>
    <span v-if="props.aviso" class="mt-2 text-lg leading-8 text-yellow-600 bg-yellow-200 p-1">
      {{ props.aviso }}
    </span>
    <div class="mt-2 text-base leading-8 text-gray-500">{{ props.description }}</div>
  </div>
</template>

<style lang="scss" scoped></style>
