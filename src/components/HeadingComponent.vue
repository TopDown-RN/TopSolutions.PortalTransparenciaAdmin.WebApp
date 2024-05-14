<script setup>
const props = defineProps(['title', 'subtitle', 'description'])
</script>

<template>
  <div class="mx-auto max-w-3xl text-center">
    <h2 class="text2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{{ props.title }}</h2>
    <p class="mt-2 text-lg leading-8 text-gray-600">
      {{ props.subtitle }}
    </p>
    <div class="-mt-2 text-base leading-8 text-gray-600">{{ props.description }}</div>
  </div>
</template>

<style scoped></style>
