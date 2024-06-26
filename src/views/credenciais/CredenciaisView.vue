<script setup>
import { onMounted, ref } from 'vue'
import { getDadosAdmin, postCredenciais } from '@/services/dadosAdmin'
import { getDadosOuvidoria, postCredenciaisOuvidoria } from '@/services/ouvidoria'
import HeadingComponent from '@/components/HeadingComponent.vue'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import ProgressSpinner from 'primevue/progressspinner'
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'

const toast = useToast()
const loading = ref(false)
const loadingSpinner = ref(true)

const host = ref('')
const port = ref('')
const username = ref('')
const pass = ref('')

const hostOuvidoria = ref('')
const portOuvidoria = ref('')
const usernameOuvidoria = ref('')
const passOuvidoria = ref('')

async function fetchCredenciais() {
  try {
    const response = await getDadosAdmin()
    host.value = response.data.smtpHost
    port.value = response.data.smtpPort
    username.value = response.data.smtpCredentialUser
    pass.value = response.data.smtpCredentialPass
  } catch (error) {
    console.error(`Erro ao obter dados das credenciais: ${error}`)
  }

  loadingSpinner.value = false
}

async function fetchCredenciaisOuvidoria() {
  try {
    const response = await getDadosOuvidoria()
    hostOuvidoria.value = response.data.smtpHost
    portOuvidoria.value = response.data.smtpPort
    usernameOuvidoria.value = response.data.smtpCredentialUser
    passOuvidoria.value = response.data.smtpCredentialPass
  } catch (error) {
    console.error(`Erro ao obter dados das credenciais da Ouvidoria: ${error}`)
  }

  loadingSpinner.value = false
}

async function salvarCredenciais() {
  try {
    loading.value = true

    const formData = new FormData()

    formData.append('smtpHost', host.value)
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

async function salvarCredenciaisOuvidoria() {
  try {
    loading.value = true
    const formData = new FormData()

    formData.append('smtpHost', hostOuvidoria.value)
    formData.append('smtpPort', portOuvidoria.value)
    formData.append('smtpCredentialUser', usernameOuvidoria.value)
    formData.append('smtpCredentialPass', passOuvidoria.value)

    await postCredenciaisOuvidoria(formData)
    showSuccess()
  } catch (error) {
    showError()
    console.error(`Erro ao salvar credenciais da Ouvidoria: ${error}`)
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
  fetchCredenciaisOuvidoria()
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
      subtitle="Dados das credenciais para receber Emails através dos canais Fale-Conosco e Ouvidoria"
      description="Mantenha-os sempre atualizados."
    />

    <div v-if="!loadingSpinner" class="w-full p-8 pt-8">
      <TabView>
        <TabPanel header="Fale-Conosco">
          <form @submit.prevent="salvarCredenciais">
            <div class="-mx-2 md:flex md:items-center">
              <div class="flex-1 px-2">
                <label for="host" class="mb-2 block text-sm text-gray-600 dark:text-gray-200"
                  >Endereço do servidor SMTP</label
                >
                <InputText
                  v-model="host"
                  id="host"
                  type="text"
                  placeholder="smtp.exemplo.com"
                  class="mt-2 block w-full rounded-md border border-gray-200 bg-white px-5 py-3 text-gray-700 placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-600 dark:focus:border-blue-400"
                />
              </div>

              <div class="mt-4 flex-1 px-2 md:mt-0">
                <label for="port" class="mb-2 block text-sm text-gray-600 dark:text-gray-200"
                  >Porta SMTP</label
                >
                <InputText
                  v-model="port"
                  id="port"
                  type="text"
                  class="mt-2 block w-full rounded-md border border-gray-200 bg-white px-5 py-3 text-gray-700 placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-600 dark:focus:border-blue-400"
                />
              </div>
            </div>

            <div class="-mx-2 my-2 md:flex md:items-center">
              <div class="flex-1 px-2">
                <label for="username" class="mb-2 block text-sm text-gray-600 dark:text-gray-200"
                  >Username</label
                >
                <InputText
                  v-model="username"
                  id="username"
                  type="text"
                  class="mt-2 block w-full rounded-md border border-gray-200 bg-white px-5 py-3 text-gray-700 placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-600 dark:focus:border-blue-400"
                />
              </div>

              <div class="mt-4 flex-1 px-2 md:mt-0">
                <label for="pass" class="mb-2 block text-sm text-gray-600 dark:text-gray-200"
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
        </TabPanel>

        <TabPanel header="Ouvidoria">
          <form @submit.prevent="salvarCredenciaisOuvidoria">
            <div class="-mx-2 md:flex md:items-center">
              <div class="flex-1 px-2">
                <label
                  for="hostOuvidoria"
                  class="mb-2 block text-sm text-gray-600 dark:text-gray-200"
                  >Endereço do servidor SMTP</label
                >
                <InputText
                  v-model="hostOuvidoria"
                  id="hostOuvidoria"
                  type="text"
                  placeholder="smtp.exemplo.com"
                  class="mt-2 block w-full rounded-md border border-gray-200 bg-white px-5 py-3 text-gray-700 placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-600 dark:focus:border-blue-400"
                />
              </div>

              <div class="mt-4 flex-1 px-2 md:mt-0">
                <label
                  for="portOuvidoria"
                  class="mb-2 block text-sm text-gray-600 dark:text-gray-200"
                  >Porta SMTP</label
                >
                <InputText
                  v-model="portOuvidoria"
                  id="portOuvidoria"
                  type="text"
                  class="mt-2 block w-full rounded-md border border-gray-200 bg-white px-5 py-3 text-gray-700 placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-600 dark:focus:border-blue-400"
                />
              </div>
            </div>

            <div class="-mx-2 my-2 md:flex md:items-center">
              <div class="flex-1 px-2">
                <label
                  for="usernameOuvidoria"
                  class="mb-2 block text-sm text-gray-600 dark:text-gray-200"
                  >Username</label
                >
                <InputText
                  v-model="usernameOuvidoria"
                  id="usernameOuvidoria"
                  type="text"
                  class="mt-2 block w-full rounded-md border border-gray-200 bg-white px-5 py-3 text-gray-700 placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-600 dark:focus:border-blue-400"
                />
              </div>

              <div class="mt-4 flex-1 px-2 md:mt-0">
                <label
                  for="passOuvidoria"
                  class="mb-2 block text-sm text-gray-600 dark:text-gray-200"
                  >Senha</label
                >
                <Password
                  v-model="passOuvidoria"
                  id="passOuvidoria"
                  class="w-full"
                  toggleMask
                  :feedback="false"
                />
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
        </TabPanel>
      </TabView>
    </div>
  </section>
</template>

<style scoped></style>
