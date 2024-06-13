<script setup>
import { ref } from 'vue'
import HeadingComponent from '@/components/HeadingComponent.vue'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import FileUpload from 'primevue/fileupload'
import OrderList from 'primevue/orderlist'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'

const titulo = ref('')
const data = ref('')
const imagem = ref('')

const noticias = ref([
  {
    id: '1',
    title: 'A gestão do seu município está bem planejada para 2024?',
    data: 'Janeiro 01, 2024',
    image:
      'https://media.licdn.com/dms/image/D4D22AQGSJgloMqYnNA/feedshare-shrink_800/0/1704737189769?e=2147483647&v=beta&t=mL1P54v1DwfXDmTZGLJSah6upTP-rU-B3e1XvIZETiQ'
  }
])

const toast = useToast()
const loading = ref(false)
</script>

<template>
  <section class="mx-auto max-w-3xl text-center">
    <HeadingComponent
      title="Notícias"
      subtitle="Cadastre aqui as notícias a serem exibidas no Portal da Transparência."
      description="Mantenha-os sempre atualizados."
    />

    <div class="w-full pt-8">
      <form>
        <div class="-mx-2 md:flex md:items-center">
          <div class="flex-1 px-2">
            <label class="mb-2 block text-sm text-gray-600 dark:text-gray-200">Título</label>
            <InputText
              v-model="titulo"
              id="titulo"
              type="text"
              placeholder="Título da Notícia"
              class="mt-2 block w-full rounded-md border border-gray-200 bg-white px-5 py-3 text-gray-700 placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-600 dark:focus:border-blue-400"
            />
          </div>

          <div class="mt-4 flex-1 px-2 md:mt-0">
            <label class="mb-2 block text-sm text-gray-600 dark:text-gray-200"
              >Data da publicação</label
            >
            <InputText
              v-model="data"
              type="text"
              placeholder="Janeiro 01, 2024"
              class="mt-2 block w-full rounded-md border border-gray-200 bg-white px-5 py-3 text-gray-700 placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-600 dark:focus:border-blue-400"
            />
          </div>
        </div>

        <div class="mt-4 w-full">
          <label class="mb-2 block text-sm text-gray-600 dark:text-gray-200">Imagem</label>
          <FileUpload
            name="demo[]"
            url="/api/upload"
            @upload="onAdvancedUpload($event)"
            :multiple="false"
            accept="image/*"
            :maxFileSize="1048576"
            invalidFileSizeMessage="Tamanho de arquivo inválido. O tamanho do arquivo deve ser menor que 1 MB."
          >
            <template #empty>
              <p>Arraste e solte a imagem aqui para fazer upload.</p>
            </template>
          </FileUpload>
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

    <div class="flex justify-center pt-8">
      <OrderList v-model="noticias" listStyle="height:auto" dataKey="id">
        <template #header> Lista de Notícias </template>
        <template #item="slotProps">
          <div class="flex flex-wrap items-center gap-4 p-2">
            <img
              class="w-[4rem] shrink-0 rounded-md shadow-md"
              :src="slotProps.item.image"
              :alt="slotProps.item.title"
            />
            <div class="flex flex-1 flex-col gap-2">
              <span class="font-bold">{{ slotProps.item.title }}</span>
              <div class="flex items-center gap-2">
                <span>{{ slotProps.item.data }}</span>
              </div>
            </div>
          </div>
        </template>
      </OrderList>
    </div>
  </section>
</template>

<style scoped></style>
