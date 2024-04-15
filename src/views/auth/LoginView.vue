<script setup>
import { Autenticar } from '@/services/autenticacao'
import { onMounted, ref, watch } from 'vue'
import router from '@/router'
import { RiEyeLine, RiLoginBoxLine } from '@remixicon/vue'
import ProgressSpinner from 'primevue/progressspinner'
import Message from 'primevue/message';

const tokenData = ref()
const txtCpfCnpjEmail = ref('')
const txtPass = ref('')
const btnAcessar = ref(true)
const error = ref(false)

async function postAutenticar() {
  try {
    btnAcessar.value = false
    const response = await Autenticar(txtCpfCnpjEmail.value, txtPass.value)
    tokenData.value = response.data

    const token = localStorage.getItem('token')
    if (token != '') localStorage.removeItem('token')

    localStorage.setItem('token', tokenData.value.token)
    router.push('/home')
    window.location.reload()
    btnAcessar.value = true
  } catch (error) {
    btnAcessar.value = true
    mensagemErro()
    console.error('erro ao obter os arquivos:', error)
  }
}

function mensagemErro() {
    error.value = true;
    setTimeout(() => {
      error.value = false;
    }, 2000);
}

function fnisAuthenticated() {
  const token = localStorage.getItem('token')
  // Check if token exists and not expired
  return token !== null
}

watch(tokenData, () => {
  //loading.value = false
})

onMounted(() => {
  //localStorage.removeItem('token');
  //fetchArp()
  if (fnisAuthenticated()) router.push('/home')
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
        <div>
          <Message severity="error" :sticky="true" :life="2000" v-if="error">Erro</Message>
        </div>
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
          <!-- <button
            role="button"
            class="focus:ring-2 focus:ring-offset-2 focus:ring-primary-700 text-sm font-semibold leading-none text-white focus:outline-none bg-primary-700 border rounded hover:bg-primary-600 py-3 w-full"
            @click="postAutenticar($event)"
          >
            <div class="relative flex items-center justify-center">
              <RiLoginBoxLine class="text-white size-4" />&nbsp;Acessar
            </div>
          </button> -->
          <button
            @click="btnAcessar ? postAutenticar($event) : null"
            :class="{
              'bg-primary-700 hover:bg-primary-600': btnAcessar,
              'bg-primary-600 cursor-not-allowed': !btnAcessar
              }"
            :disabled="!btnAcessar"
            class="focus:ring-2 focus:ring-offset-2 focus:ring-primary-700 text-sm font-semibold leading-none text-white focus:outline-none border rounded py-3 w-full"
          >
            <span v-if="btnAcessar" class="relative flex items-center justify-center">
              <RiLoginBoxLine class="text-white size-4" />&nbsp;Acessar
            </span>
            <span v-else>
              <ProgressSpinner style="width: 20px; height: 20px;" strokeWidth="8" aria-label="Custom ProgressSpinner"/>
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
