<script setup>
const props = defineProps(['title', 'subtitle', 'description', 'aviso', 'ajuda'])
</script>

<template>
  <section>
    <div class="container mx-auto flex flex-col items-center pb-4 text-center">
      <h2
        class="mx-auto max-w-2xl text-2xl font-semibold tracking-tight text-gray-800 xl:text-3xl dark:text-white"
      >
        {{ props.title }}
      </h2>

      <p class="mt-2 max-w-5xl text-center text-gray-500 dark:text-gray-300">
        {{ props.subtitle }}
      </p>

      <p
        v-if="props.aviso"
        class="mt-2 max-w-5xl bg-yellow-200 p-1 text-center leading-8 text-yellow-600"
      >
        {{ props.aviso }}
      </p>

      <p class="max-w-5xl text-center text-gray-500 dark:text-gray-300">
        {{ props.description }}
      </p>

      <div v-if="props.ajuda" class="mt-6 max-w-5xl text-center text-gray-500 dark:text-gray-300">
        Precisa de ajuda?
        <RouterLink
          :to="props.ajuda"
          class="font-medium text-primary-500 underline hover:text-primary-700"
        >
          Faça um tour
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped></style>
