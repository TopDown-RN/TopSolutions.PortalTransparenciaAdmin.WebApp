<script setup>
import { onMounted, ref } from 'vue'
import { getDadosAdmin, postCredenciais } from '@/services/dadosAdmin'
import HeadingComponent from '@/components/HeadingComponent.vue'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import ProgressSpinner from 'primevue/progressspinner'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'

const toast = useToast()
const loading = ref(false)
const loadingSpinner = ref(true)

const server = ref('')
const port = ref('')
const username = ref('')
const pass = ref('')

async function fetchCredenciais() {
  try {
    const response = await getDadosAdmin()
    console.log(response.data)
    server.value = response.data.smtpServer
    port.value = response.data.smtpPort
    username.value = response.data.smtpCredentialUser
    pass.value = response.data.smtpCredentialPass
  } catch (error) {
    console.error(`Erro ao obter dados das credenciais: ${error}`)
  }

  loadingSpinner.value = false
}

async function salvarCredenciais() {
  try {
    loading.value = true

    const formData = new FormData()

    formData.append('smtpServer', server.value)
    formData.append('smtpPort', port.value)
    formData.append('smtpCredentialUser', username.value)
    formData.append('smtpCredentialPass', pass.value)

    await postCredenciais(formData)
    showSuccess()
  } catch (error) {
    showError()
    console.error(`Erro ao salvar credenciais: ${error}`)
  }

  loading.value = false
}

function showSuccess() {
  toast.add({
    severity: 'success',
    summary: 'Successo',
    detail: 'Dados salvo sucesso!',
    life: 2000
  })
}

function showError() {
  toast.add({ severity: 'error', summary: 'Erro!', detail: 'Erro ao salvar dados!', life: 3000 })
}

onMounted(() => {
  fetchCredenciais()
})
</script>

<template>
  <section class="mx-auto max-w-3xl text-center">
    <Toast position="top-center" />

    <div v-if="loadingSpinner" class="my-4 text-center">
      <ProgressSpinner />
    </div>

    <HeadingComponent
      title="Credenciais"
      subtitle="Dados das credenciais para receber Emails através do Fale-Conosco"
      description="Mantenha-os sempre atualizados."
    />

    <div v-if="!loadingSpinner" class="w-full p-8 pt-8">
      <form @submit.prevent="salvarCredenciais">
        <div class="-mx-2 md:items-center md:flex">
          <div class="flex-1 px-2">
            <label for="server" class="block mb-2 text-sm text-gray-600 dark:text-gray-200"
              >Endereço do servidor SMTP</label
            >
            <InputText
              v-model="server"
              id="server"
              type="text"
              placeholder="smtp.exemplo.com"
              class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          <div class="flex-1 px-2 mt-4 md:mt-0">
            <label for="port" class="block mb-2 text-sm text-gray-600 dark:text-gray-200"
              >Porta SMTP</label
            >
            <InputText
              v-model="port"
              id="port"
              type="text"
              class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
        </div>

        <div class="my-2 -mx-2 md:items-center md:flex">
          <div class="flex-1 px-2">
            <label for="username" class="block mb-2 text-sm text-gray-600 dark:text-gray-200"
              >Username</label
            >
            <InputText
              v-model="username"
              id="username"
              type="text"
              class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          <div class="flex-1 px-2 mt-4 md:mt-0">
            <label for="pass" class="block mb-2 text-sm text-gray-600 dark:text-gray-200"
              >Senha</label
            >
            <Password v-model="pass" id="pass" class="w-full" toggleMask :feedback="false" />
          </div>
        </div>

        <div class="my-4 flex justify-end">
          <Button
            type="submit"
            label="Salvar"
            :loading="loading"
            class="text-sm font-medium tracking-wide"
          />
        </div>
      </form>
    </div>
  </section>
</template>

<style scoped></style>
