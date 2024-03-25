<script setup>

import { Autenticar } from '@/services/autenticacao'
import { onMounted, ref, watch } from 'vue'
import router from '@/router'
import { RiEyeLine, RiLoginBoxLine } from '@remixicon/vue'

const token = ref('')
const txtCpfCnpjEmail = ref('');
const txtPass = ref('');

async function postAutenticar() {
  try {
      const response = await Autenticar(txtCpfCnpjEmail.value, txtPass.value)
      //token.value = response.data
      //console.log(response.token)
      localStorage.setItem('token', response.token)
      router.push({name: 'home'})
   } catch (error) {
     console.error('erro ao obter os arquivos:', error)
   }
}

watch(token, () => {
  //loading.value = false
})

onMounted(() => {
  //fetchArp()
})


</script>

<template>
  <div class="bg-gray-200 w-full min-h-screen py-9 px-4">
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
      <div class="bg-white shadow rounded lg:w-1/3 md:max-w-lg w-full p-10 mt-9">
        <p tabindex="0" class="focus:outline-none text-2xl font-extrabold leading-6 text-gray-800">
          Portal da Transparência
        </p>
        <p
          tabindex="0"
          class="focus:outline-none text-sm mt-2 font-medium leading-none text-gray-800 pb-8"
        >
          Painel Administrativo
        </p>
        <div class="py-1">
          <label id="email" class="text-sm font-medium leading-none text-gray-800">CPF</label>
          <input
            v-model="txtCpfCnpjEmail"
            id="txtCpfCnpjEmail"
            aria-labelledby="email"
            type="email"
            class="bg-gray-200 border rounded text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
          />
        </div>
        <div class="py-1">
          <label for="pass" class="text-sm font-medium leading-none text-gray-800">Senha</label>
          <div class="relative flex items-center justify-center">
            <input
            v-model="txtPass"
              id="pass"
              type="password"
              class="bg-gray-200 border rounded text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
            />
            <div class="absolute right-0 mt-2 mr-3 cursor-pointer">
              <RiEyeLine class="text-gray-500 size-5" />
            </div>
          </div>
        </div>
        <div class="mt-8">
          <button
            role="button"
            class="focus:ring-2 focus:ring-offset-2 focus:ring-primary-700 text-sm font-semibold leading-none text-white focus:outline-none bg-primary-700 border rounded hover:bg-primary-600 py-3 w-full"
            @click="postAutenticar($event)"
          >
            <div class="relative flex items-center justify-center">
              <RiLoginBoxLine class="text-white size-4" />&nbsp;Acessar
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
