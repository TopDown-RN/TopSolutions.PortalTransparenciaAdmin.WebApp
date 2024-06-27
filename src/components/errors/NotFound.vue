<script setup></script>

<template>
  <section class="bg-white dark:bg-gray-900">
    <div class="container mx-auto min-h-screen px-6 py-12 lg:flex lg:items-center lg:gap-12">
      <div class="wf-ull lg:w-1/2">
        <p class="text-sm font-medium text-blue-500 dark:text-blue-400">Erro 404</p>
        <h1 class="mt-3 text-2xl font-semibold text-gray-800 md:text-3xl dark:text-white">
          Página não encontrada
        </h1>
        <p class="mt-4 text-gray-500 dark:text-gray-400">
          Desculpe, a página que você está procurando não existe. Aqui estão alguns links úteis:
        </p>

        <div class="mt-6 flex items-center gap-x-3">
          <RouterLink
            to="/"
            class="flex w-1/2 items-center justify-center gap-x-2 rounded-lg border bg-white px-5 py-2 text-sm text-gray-700 transition-colors duration-200 hover:bg-gray-100 sm:w-auto dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-5 w-5 rtl:rotate-180"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
              />
            </svg>

            <span>Voltar ao Dashboard</span>
          </RouterLink>
        </div>
      </div>

      <div class="relative mt-12 w-full lg:mt-0 lg:w-1/2">
        <img
          class="w-full max-w-lg lg:mx-auto dark:brightness-0 dark:invert"
          src="/logoTopVertical.png"
          alt=""
        />
      </div>
    </div>
  </section>
</template>

<style scoped></style>
