<script setup>
import Button from 'primevue/button'
import { RiEdit2Line, RiDeleteBin5Line } from '@remixicon/vue'
</script>

<template>
  <div class="flex md:justify-end m-2">
    <Button
      type="button"
      onclick="location.href='/users/new-user'"
      class="focus:ring-2 focus:ring-offset-2 focus:ring-primary-700 text-sm font-semibold leading-none text-white focus:outline-none bg-primary-700 border rounded hover:bg-primary-600 py-3"
    >
      Adicionar novo usuário
    </Button>
  </div>
  <table class="min-w-full bg-white shadow-md rounded-xl">
    <thead>
      <tr class="bg-blue-gray-100 text-gray-700">
        <th class="py-3 px-4 text-left">Nome</th>
        <th class="py-3 px-4 text-left">CPF</th>
        <th class="py-3 px-4 text-left">E-mail</th>
        <th class="py-3 px-4 text-left">Ações</th>
      </tr>
    </thead>
    <tbody class="text-blue-gray-900">
      <tr class="border-b border-blue-gray-200">
        <td class="py-3 px-4">Ana Paula Oliveira</td>
        <td class="py-3 px-4">111.111.111-11</td>
        <td class="py-3 px-4">anapaula@email.com</td>
        <td class="py-3 px-4 flex">
          <a href="#" class="text-primary-700 pr-2" title="Editar">
            <RiEdit2Line />
          </a>
          <a href="#" class="text-red-600" title="Excluir">
            <RiDeleteBin5Line />
          </a>
        </td>
      </tr>
      <tr class="border-b border-blue-gray-200">
        <td class="py-3 px-4">Matheus Vinícius da Silva</td>
        <td class="py-3 px-4">222.222.222-22</td>
        <td class="py-3 px-4">matheus@email.com</td>
        <td class="py-3 px-4 flex">
          <a href="#" class="text-primary-700 pr-2" title="Editar">
            <RiEdit2Line />
          </a>
          <a href="#" class="text-red-600" title="Excluir">
            <RiDeleteBin5Line />
          </a>
        </td>
      </tr>
      <tr class="border-b border-blue-gray-200">
        <td class="py-3 px-4">Juscilésio</td>
        <td class="py-3 px-4">333.333.333-33</td>
        <td class="py-3 px-4">juscilesio@email.com</td>
        <td class="py-3 px-4 flex">
          <a href="#" class="text-primary-700 pr-2" title="Editar">
            <RiEdit2Line />
          </a>
          <a href="#" class="text-red-600" title="Excluir">
            <RiDeleteBin5Line />
          </a>
        </td>
      </tr>
      <tr class="border-b border-blue-gray-200">
        <td class="py-3 px-4">Juan</td>
        <td class="py-3 px-4">444.444.444-44</td>
        <td class="py-3 px-4">juan@email.com</td>
        <td class="py-3 px-4 flex">
          <a href="#" class="text-primary-700 pr-2" title="Editar">
            <RiEdit2Line />
          </a>
          <a href="#" class="text-red-600" title="Excluir">
            <RiDeleteBin5Line />
          </a>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped></style>
