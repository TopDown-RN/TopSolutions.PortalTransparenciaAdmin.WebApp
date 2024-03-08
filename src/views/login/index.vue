<script setup>
import { RiEyeLine } from '@remixicon/vue'
</script>

<template>
  <div class="h-full bg-gray-200 w-full py-16 px-4">
    <div class="flex flex-col items-center justify-center">
      <img
        tabindex="0"
        class="focus:outline-none"
        aria-label="logo"
        role="img"
        src="/logoTopVertical.png"
        alt="logo"
        width="188"
        height="74"
      />
      <div>
        <p
          tabindex="0"
          class="focus:outline-none text-sm mt-4 font-medium leading-none text-gray-500"
        >
          Desenvolvendo e otimizando soluções em TI desde 1993
        </p>
      </div>

      <div class="bg-white shadow rounded lg:w-1/3 md:w-1/2 w-full p-10 mt-16">
        <p tabindex="0" class="focus:outline-none text-2xl font-extrabold leading-6 text-gray-800">
          Portal da Transparência
        </p>
        <p
          tabindex="0"
          class="focus:outline-none text-sm mt-2 font-medium leading-none text-gray-800"
        >
          Painel Administrativo
        </p>

        <div class="pt-5">
          <input
            aria-labelledby="email"
            type="email"
            class="bg-gray-200 border rounded text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
          />
        </div>
        <div class="py-1">
          <label id="email" class="text-sm font-medium leading-none text-gray-800"> CPF </label>
          <input
            aria-labelledby="email"
            type="email"
            class="bg-gray-200 border rounded text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
          />
        </div>
        <div class="py-1">
          <label for="pass" class="text-sm font-medium leading-none text-gray-800"> Senha </label>
          <div class="relative flex items-center justify-center">
            <input
              id="pass"
              type="password"
              class="bg-gray-200 border rounded text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
            />
            <div class="absolute right-0 mt-2 mr-3 cursor-pointer">
              <RiEyeLine class="text-gray-500" />
            </div>
          </div>
        </div>
        <div class="mt-8">
          <button
            role="button"
            class="focus:ring-2 focus:ring-offset-2 focus:ring-primary-700 text-sm font-semibold leading-none text-white focus:outline-none bg-primary-700 border rounded hover:bg-primary-600 py-4 w-full"
          >
            Acessar
          </button>
        </div>

        <div class="w-full flex items-center justify-between pt-5">
          <hr class="w-full bg-gray-400" />
          <p class="text-base font-medium leading-4 px-2.5 text-gray-400">ou</p>
          <hr class="w-full bg-gray-400" />
        </div>

        <button
          aria-label="Opção secundária 1"
          role="button"
          class="focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 flex items-center w-full mt-10"
        >
          <p class="text-base font-medium ml-4 text-gray-700">Opção secundária 1</p>
        </button>
        <button
          aria-label="Opção secundária 2"
          role="button"
          class="focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 flex items-center w-full mt-4"
        >
          <p class="text-base font-medium ml-4 text-gray-700">Opção secundária 2</p>
        </button>
        <button
          aria-label="Opção secundária 3"
          role="button"
          class="focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 flex items-center w-full mt-4"
        >
          <p class="text-base font-medium ml-4 text-gray-700">Opção secundária 3</p>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
