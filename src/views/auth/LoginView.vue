<script setup>
import { login } from '@/services/auth/autenticacao.js'
import { addToken } from '@/services/auth/authToken'
import { onMounted, ref } from 'vue'
import { RiLoginBoxLine } from '@remixicon/vue'
import ProgressSpinner from 'primevue/progressspinner'
import Message from 'primevue/message'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'

const toast = useToast()
const tokenData = ref()
const txtCpfCnpjEmail = ref('')
const txtPass = ref('')
const btnAcessar = ref(true)
const error = ref(false)

async function postAutenticar() {
  try {
    error.value = false
    btnAcessar.value = false
    const response = await login(txtCpfCnpjEmail.value, txtPass.value)
    tokenData.value = response.data
    addToken(tokenData.value.token)
    window.location.reload()
    btnAcessar.value = true
  } catch (e) {
    btnAcessar.value = true
    error.value = true
    console.error('erro ao obter os arquivos:', e)
  }
}

function verificarSessao() {
  if (localStorage.getItem('sessao-expirada')) {
    toast.add({
      severity: 'warn',
      summary: 'Sessão Expirada',
      detail: 'Sua sessão foi expirada!',
      life: 5000
    })
    localStorage.removeItem('sessao-expirada')
  }
}

onMounted(() => {
  verificarSessao()
})
</script>

<template>
  <Toast />
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
          <Message severity="error" :sticky="false" :life="5000" v-if="error"
            >Usuário não cadastrado ou senha de usuário inválida.
          </Message>
        </div>
        <div class="py-1">
          <label id="email" class="text-sm font-medium leading-none text-gray-600">CPF</label>
          <InputText
            v-model="txtCpfCnpjEmail"
            id="txtCpfCnpjEmail"
            aria-labelledby="email"
            type="email"
            class="w-full my-1"
          />
          <small id="username-help" class="text-gray-500">Entre com seu email, cpf ou cnpj.</small>
        </div>
        <div class="py-1">
          <label for="pass" class="text-sm font-medium leading-none text-gray-600">Senha</label>
          <Password
            v-model="txtPass"
            id="pass"
            aria-labelledby="email"
            class="w-full py-2"
            :feedback="false"
            toggleMask
          />
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
              <ProgressSpinner
                style="width: 20px; height: 20px"
                strokeWidth="8"
                aria-label="Custom ProgressSpinner"
              />
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
