<script setup>
import { onMounted, ref } from 'vue'
import { getDadosOuvidoria, postDadosOuvidoria } from '@/services/ouvidoria'
import HeadingComponent from '@/components/HeadingComponent.vue'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

const telefone = ref('')
const email = ref('')
const conteudo = ref('')

const toast = useToast()
const loading = ref(false)

async function fetchDadosOuvidoria() {
  const response = await getDadosOuvidoria()
  telefone.value = response.data.txtNumTelefone
  email.value = response.data.txtEmail
  conteudo.value = response.data.conteudo
}

async function salvarDados() {
  try {
    console.log(conteudo.value)
    loading.value = true
    const formData = new FormData()
    formData.append('txtNumTelefone', telefone.value)
    formData.append('txtEmail', email.value)
    formData.append('conteudo', conteudo.value)

    await postDadosOuvidoria(formData)
    showSuccess()
    loading.value = false
  } catch (err) {
    loading.value = false
    showError()
    console.log(err)
  }
}

function showSuccess() {
  toast.add({
    severity: 'success',
    summary: 'Successo',
    detail: 'Dados atualizados sucesso!',
    life: 2000
  })
}

function showError() {
  toast.add({ severity: 'error', summary: 'Erro!', detail: 'Erro ao atualizar dados!', life: 3000 })
}

onMounted(() => {
  fetchDadosOuvidoria()
})
</script>

<template>
  <section class="mx-auto max-w-3xl text-center">
    <Toast position="top-center" />

    <HeadingComponent
      title="Ouvidoria"
      subtitle="Gerencie aqui os dados para a ouvidoria."
      description="Mantenha-os sempre atualizados."
    />

    <div class="w-full p-8 pt-8">
      <form @submit.prevent="salvarDados">
        <div class="-mx-2 md:items-center md:flex">
          <div class="flex-1 px-2">
            <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">Telefone</label>
            <InputText
              v-model="telefone"
              id="telefone"
              type="text"
              placeholder="(##) #####-####"
              v-mask="['(##) ####-####', '(##) #####-####']"
              class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          <div class="flex-1 px-2 mt-4 md:mt-0">
            <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200"
              >Endereço de Email</label
            >
            <InputText
              v-model="email"
              type="email"
              placeholder="ouvidor@examplo.com"
              class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
        </div>

        <div class="w-full mt-4">
          <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200"
            >Conteúdo na página</label
          >
          <QuillEditor v-model:content="conteudo" contentType="html" toolbar="full" theme="snow" />
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
