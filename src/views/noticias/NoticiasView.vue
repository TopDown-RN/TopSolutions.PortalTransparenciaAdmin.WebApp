<script setup>
import { onMounted, ref } from 'vue'
import { getNoticias, postNoticias } from '@/services/noticias'
import HeadingComponent from '@/components/HeadingComponent.vue'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import FileUpload from 'primevue/fileupload'
import OrderList from 'primevue/orderlist'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'

const toast = useToast()

const titulo = ref('')
const data = ref('')
const image = ref()
const loading = ref(false)
const noticias = ref([])

async function fetchNoticias() {
  const response = await getNoticias()
  noticias.value = response.data
}

async function adicionarNoticias() {
  try {
    const formData = new FormData()

    formData.append('txtTitulo', titulo.value)
    formData.append('txtData', data.value)
    formData.append('image', image.value)

    await postNoticias(formData)
    showSuccess()
    fetchNoticias()
    limparCampos()
  } catch (error) {
    showError()
  }
}

function limparCampos() {
  titulo.value = ''
  data.value = ''
}

const onSelectedFile = (event) => {
  image.value = event.files[0]
}

const showSuccess = () => {
  toast.add({
    severity: 'success',
    summary: 'Enviado!',
    detail: 'Notícia cadastrada com sucesso',
    life: 5000
  })
}

const showError = () => {
  toast.add({
    severity: 'error',
    summary: 'Erro',
    detail: 'Ocorreu um erro ao cadastrar a notícia',
    life: 5000
  })
}

onMounted(() => {
  fetchNoticias()
})
</script>

<template>
  <Toast position="top-center" />
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
            name="image[]"
            v-model="image"
            @select="onSelectedFile"
            :multiple="false"
            accept="image/*"
            :maxFileSize="1048576"
            invalidFileSizeMessage="Tamanho de arquivo inválido. O tamanho do arquivo deve ser menor que 1 MB."
            :showUploadButton="false"
            :showCancelButton="false"
          >
            <template #empty>
              <p>Arraste e solte a imagem aqui para fazer upload.</p>
            </template>
          </FileUpload>
        </div>

        <div class="my-4 flex justify-end">
          <Button
            type="button"
            label="Salvar"
            @click="adicionarNoticias()"
            :loading="loading"
            class="text-sm font-medium tracking-wide"
          />
        </div>
      </form>
    </div>

    <div class="pt-8">
      <OrderList v-model="noticias" listStyle="height:auto" dataKey="id">
        <template #header> Lista de Notícias </template>
        <template #item="slotProps">
          <div class="flex flex-wrap items-center gap-4 p-2">
            <img
              class="w-[12rem] shrink-0 rounded-md shadow-md"
              :src="'data:image/' + slotProps.item.txtExtensao + ';base64,' + slotProps.item.image"
              :alt="slotProps.item.txtTitulo"
            />
            <div class="flex flex-1 flex-col gap-2">
              <span class="font-bold">{{ slotProps.item.txtTitulo }}</span>
              <div class="flex items-center gap-2">
                <span>{{ slotProps.item.txtData }}</span>
              </div>
            </div>
          </div>
        </template>
      </OrderList>
    </div>
  </section>
</template>

<style scoped></style>
