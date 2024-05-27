<script setup>
import { ref } from 'vue'
import HeadingComponent from '@/components/HeadingComponent.vue'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Editor from 'primevue/editor'

const telefone = ref('')
const email = ref('')
const message = ref('')

const loading = ref(false)

function salvar() {
  load()
}

function load() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 2000)
}
</script>

<template>
  <section class="mx-auto max-w-3xl text-center">
    <HeadingComponent
      title="Ouvidoria"
      subtitle="Gerencie aqui os dados para a ouvidoria."
      description="Mantenha-os sempre atualizados."
    />

    <div class="w-full p-8 pt-8">
      <form @submit.prevent="salvar">
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
          <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">Messagem</label>
          <Editor v-model="message" editorStyle="height: 320px" />
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
