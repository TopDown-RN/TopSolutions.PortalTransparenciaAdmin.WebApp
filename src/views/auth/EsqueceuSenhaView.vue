<script setup>
import { ref } from 'vue'
import InputText from 'primevue/inputtext'
import Toast from 'primevue/toast'
import Button from 'primevue/button'
import { useToast } from 'primevue/usetoast'
import { redefinirSenha } from '@/services/auth/autenticacao'

const toast = useToast()
const txtCpfCnpjEmail = ref('')
const loading = ref(false)
const isValid = ref(true)

async function enviarEmail() {
  try {
    if (!validarCampo()) {
      return
    }

    loading.value = true
    const response = await redefinirSenha(this.txtCpfCnpjEmail)
    console.log(response)

    toast.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: `${response}`,
      life: 4000
    })
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'Usuário não encontrado no sistema.',
      life: 4000
    })
  }

  loading.value = false
  this.txtCpfCnpjEmail = ''
}

function validarCampo() {
  isValid.value = true
  if (!txtCpfCnpjEmail.value) {
    isValid.value = false
  }

  return isValid.value
}
</script>

<template>
  <Toast position="top-center" />
  <div class="min-h-screen w-full bg-gray-200 px-4 py-9">
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
          class="mt-4 text-sm font-medium leading-none text-gray-500 focus:outline-none"
        >
          Desenvolvendo e otimizando soluções em TI desde 1993
        </p>
      </div>
      <div class="mt-9 w-full rounded bg-white p-10 shadow md:max-w-lg lg:w-1/3">
        <p
          tabindex="0"
          class="text-center text-2xl font-extrabold leading-6 text-gray-800 focus:outline-none"
        >
          Portal da Transparência
        </p>
        <p
          tabindex="0"
          class="mt-2 pb-8 text-center text-sm font-medium leading-none text-gray-800 focus:outline-none"
        >
          Painel Administrativo
        </p>

        <p
          tabindex="0"
          class="pb-4 text-center text-lg font-medium text-gray-600 focus:outline-none"
        >
          Informe o login para receber em seu e-mail as instruções para alterar a senha.
        </p>

        <form action="">
          <div class="py-1">
            <label id="email" class="text-sm font-medium leading-none text-gray-600"
              >E-mail, CPF ou CNPJ</label
            >
            <InputText
              v-model="txtCpfCnpjEmail"
              id="txtCpfCnpjEmail"
              class="my-1 w-full"
              placeholder="Digite seu e-mail, CPF ou CNPJ"
              :invalid="!isValid"
            />
            <small v-if="!isValid" class="block text-red-500"
              >Campo obrigatório. Informe um <b>usuário</b>.</small
            >
            <small id="username-help" class="text-gray-500"
              >Informe apenas <b>Números</b> para CPF e CNPJ.</small
            >
          </div>

          <div class="mt-8 flex justify-center">
            <Button
              class="w-full"
              type="button"
              label="Recuperar senha"
              icon="pi pi-envelope"
              :loading="loading"
              @click="enviarEmail()"
            />
          </div>

          <div class="mx-auto mt-4 max-w-5xl text-center">
            <RouterLink
              to="login"
              class="font-medium text-primary-500 underline hover:text-primary-700"
            >
              Voltar para o login
            </RouterLink>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style>
span[data-pc-section='label'] {
  flex: initial;
  display: inline-block;
}
</style>
