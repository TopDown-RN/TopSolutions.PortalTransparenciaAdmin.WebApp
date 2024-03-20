<script setup></script>

<template>
  <nav
    class="w-full max-w-full bg-transparent text-white shadow-none rounded-xl transition-all px-0 py-1"
  >
    <div class="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
      <div class="capitalize">
        <nav aria-label="breadcrumb" class="w-max">
          <ol
            class="flex flex-wrap items-center w-full bg-opacity-60 rounded-md bg-transparent p-0 transition-all"
          >
            <li
              class="flex items-center text-blue-gray-900 antialiased font-sans text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-light-blue-500"
            >
              <a href="#">
                <p
                  class="block antialiased font-sans text-sm leading-normal text-blue-900 font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100"
                >
                  dashboard
                </p>
              </a>
            </li>
          </ol>
        </nav>
      </div>
    </div>
  </nav>
</template>

<style scoped></style>
