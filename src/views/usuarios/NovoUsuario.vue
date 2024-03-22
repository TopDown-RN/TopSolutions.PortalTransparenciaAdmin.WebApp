<script setup></script>

<template>
  <div class="mx-auto max-w-3xl text-center">
    <h2 class="text2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
      Cadastrar novo usuário
    </h2>
    <p class="mt-2 text-lg leading-8 text-gray-600">
      Novos usuários podem acessar e fazer edições através do Painel Administrativo.
    </p>
  </div>
  <form class="mx-auto max-w-6xl sm:mt-10">
    <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
      <div class="sm:col-span-2">
        <label for="fullName" class="block text-sm font-semibold leading-6 text-black"
          >Nome Completo</label
        >
        <div class="mt-2.5">
          <input
            type="text"
            name="fullName"
            id="fullName"
            class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-primary-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:ring-2 focus:ring-inset focus:ring-primary-500 focus:outline-none"
          />
        </div>
      </div>
      <div>
        <label for="cpf" class="block text-sm font-semibold leading-6 text-black">CPF</label>
        <div class="mt-2.5">
          <input
            type="text"
            name="cpf"
            id="cpf"
            class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-primary-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:ring-2 focus:ring-inset focus:ring-primary-500 focus:outline-none"
          />
        </div>
      </div>
      <div>
        <label for="email" class="block text-sm font-semibold leading-6 text-black">E-mail</label>
        <div class="mt-2.5">
          <input
            type="text"
            name="email"
            id="email"
            class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-primary-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:ring-2 focus:ring-inset focus:ring-primary-500 focus:outline-none"
          />
        </div>
      </div>
      <div>
        <label for="password" class="block text-sm font-semibold leading-6 text-black">Senha</label>
        <div class="mt-2.5">
          <input
            type="text"
            name="password"
            id="password"
            class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-primary-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:ring-2 focus:ring-inset focus:ring-primary-500 focus:outline-none"
          />
        </div>
      </div>
      <div>
        <label for="confirmPassword" class="block text-sm font-semibold leading-6 text-black"
          >Digite a senha novamente</label
        >
        <div class="mt-2.5">
          <input
            type="text"
            name="confirmPassword"
            id="confirmPassword"
            class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-primary-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:ring-2 focus:ring-inset focus:ring-primary-500 focus:outline-none"
          />
        </div>
      </div>
    </div>
    <div class="mt-10">
      <button
        type="submit"
        onclick="location.href='/usuarios/novo-usuario'"
        class="block w-full rounded-md bg-primary-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-pimary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-800"
      >
        Cadastrar
      </button>
    </div>
  </form>
</template>

<style scoped></style>
