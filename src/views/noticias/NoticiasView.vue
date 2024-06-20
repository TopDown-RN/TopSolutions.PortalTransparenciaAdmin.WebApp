<script setup>
import { onMounted, ref, computed } from 'vue'
import { delNoticias, getNoticias, postNoticias, updateOrdem } from '@/services/noticias'
import HeadingComponent from '@/components/HeadingComponent.vue'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import InputMask from 'primevue/inputmask'
import FileUpload from 'primevue/fileupload'
import OrderList from 'primevue/orderlist'
import Toast from 'primevue/toast'
import ConfirmDialog from 'primevue/confirmdialog'
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'

const toast = useToast()
const confirm = useConfirm()

const loading = ref(false)
const isValid = ref(true)
const isDataValid = ref(true)

const titulo = ref('')
const data = ref('')
const image = ref()
const link = ref('')

const fileRef = ref(null)

const selectedItems = ref([])
const noticias = ref([])

async function fetchNoticias() {
  const response = await getNoticias()
  noticias.value = response.data
}

async function adicionarNoticias() {
  try {
    if (!validarCampos()) {
      return
    }

    if (!validarData()) {
      return
    }

    const formData = new FormData()

    formData.append('txtTitulo', titulo.value)
    formData.append('dtPublicacao', data.value)
    formData.append('image', image.value)
    formData.append('txtUrl', link.value)

    await postNoticias(formData)
    showSuccess('Notícia cadastrada com sucesso')
    fetchNoticias()
    limparCampos()
  } catch (error) {
    showError('Ocorreu um erro ao cadastrar a notícia')
  }
}

function excluirNoticias() {
  const id = selectedItems.value.map((item) => item.id)

  confirm.require({
    group: 'headless',
    header: 'Tem certeza de que deseja excluir?',
    message: 'Por favor, confirme para prosseguir.',
    accept: async () => {
      const response = await delNoticias(id)
      if (response) {
        showSuccess('Notícia excluída com sucesso!')
        await fetchNoticias()
        selectedItems.value = []
        setTimeout(() => {
          window.location.reload()
        }, 500)
      } else {
        showError('Ocorreu um erro ao excluir a notícia!')
      }
    }
  })
}

async function onOrdenarNoticia(event) {
  const newOrdem = {
    id: event.map((item) => item.id),
    ordem: event.map((_, index) => index + 1)
  }

  await updateOrdem(newOrdem)
}

function limparCampos() {
  titulo.value = ''
  data.value = ''
  image.value = null
  link.value = ''
  fileRef.value.clear()
}

function validarCampos() {
  isValid.value = true

  if (!titulo.value || !data.value || !image.value || !link.value) {
    isValid.value = false
  }

  return isValid.value
}

function validarData() {
  isDataValid.value = true
  const splitData = data.value.split('/')
  if (splitData[0] <= 0 || splitData[0] >= 32) {
    isDataValid.value = false
  }
  if (splitData[1] <= 0 || splitData[1] >= 13) {
    isDataValid.value = false
  }

  return isDataValid.value
}

const onSelectedFile = (event) => {
  image.value = event.files[0]

  if (fileRef.value.files.length > 1) {
    fileRef.value.clear()
    image.value = event.files[1]
    fileRef.value.files = [event.files[1]]
  }
}

const onRemoveFile = () => {
  image.value = null
  fileRef.value.clear()
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('pt-BR')
}

const showSuccess = (message) => {
  toast.add({
    severity: 'success',
    summary: 'Enviado!',
    detail: message,
    life: 5000
  })
}

const showError = (message) => {
  toast.add({
    severity: 'error',
    summary: 'Erro',
    detail: message,
    life: 5000
  })
}

const hasSelection = computed(() => {
  return selectedItems.value && selectedItems.value.length > 0
})

onMounted(() => {
  fetchNoticias()
})
</script>

<template>
  <section class="mx-auto max-w-3xl text-center">
    <Toast position="top-center" />

    <ConfirmDialog ref="arq" group="headless">
      <template #container="{ message, acceptCallback, rejectCallback }">
        <div class="flex flex-col items-center rounded-md bg-surface-0 p-5 dark:bg-surface-900">
          <div
            class="bg-primarytext-white -mt-8 inline-flex h-[6rem] w-[6rem] items-center justify-center rounded-full dark:text-surface-950"
          >
            <i class="pi pi-question text-4xl"></i>
          </div>
          <span class="mb-2 block text-xl font-bold">{{ message.header }}</span>
          <p class="m-4">{{ message.message }}</p>
          <div class="mt-4 flex items-center gap-2">
            <Button label="Confirmar" @click="acceptCallback" size="small" class="text-sm"></Button>
            <Button
              label="Cancelar"
              outlined
              @click="rejectCallback"
              size="small"
              class="text-sm"
            ></Button>
          </div>
        </div>
      </template>
    </ConfirmDialog>

    <HeadingComponent
      title="Notícias"
      subtitle="Cadastre aqui as notícias a serem exibidas no Portal da Transparência."
      description="Mantenha-os sempre atualizados."
    />

    <div class="w-full pt-8">
      <form>
        <div class="-mx-2 md:flex md:items-center">
          <div class="flex-1 px-2 pb-4">
            <label class="mb-2 block text-sm text-gray-600 dark:text-gray-200">Título</label>
            <InputText
              v-model="titulo"
              id="titulo"
              type="text"
              placeholder="Título da Notícia"
              maxlength="250"
              class="mt-2 block w-full rounded-md border border-gray-200 bg-white px-5 py-3 text-gray-700 placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-600 dark:focus:border-blue-400"
              :invalid="!titulo && !isValid"
            />
            <small v-if="!titulo && !isValid" class="text-red-600"
              >O campo Título é obrigatório</small
            >
          </div>
        </div>

        <div class="-mx-2 md:flex md:items-center">
          <div class="flex-1 px-2">
            <label class="mb-2 block text-sm text-gray-600 dark:text-gray-200"
              >Link da Notícia</label
            >
            <InputText
              v-model="link"
              id="link"
              type="text"
              placeholder="Link da Notícia"
              class="mt-2 block w-full rounded-md border border-gray-200 bg-white px-5 py-3 text-gray-700 placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-600 dark:focus:border-blue-400"
              :invalid="!link && !isValid"
            />
            <small v-if="!link && !isValid" class="text-red-600">O campo Link é obrigatório</small>
          </div>

          <div class="flex-2 mt-4 px-2 md:mt-0">
            <label class="mb-2 block text-sm text-gray-600 dark:text-gray-200"
              >Data da publicação</label
            >
            <InputMask
              class="mt-2 block w-full rounded-md border border-gray-200 bg-white px-5 py-3 text-gray-700 placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-600 dark:focus:border-blue-400"
              id="basic"
              v-model="data"
              placeholder="dd/mm/aaaa"
              mask="99/99/9999"
              :invalid="(!data && !isValid) || !isDataValid"
            />

            <small v-if="!data && !isValid" class="text-red-600"
              >O campo Data da publicação é obrigatório</small
            >
            <small v-if="!isDataValid" class="text-red-600">Data informada não é válida</small>
          </div>
        </div>

        <div class="mt-4 w-full">
          <label class="mb-2 block text-sm text-gray-600 dark:text-gray-200">Imagem</label>
          <FileUpload
            ref="fileRef"
            name="image[]"
            v-model="image"
            @select="onSelectedFile"
            @remove="onRemoveFile"
            :multiple="false"
            accept="image/*"
            :maxFileSize="1048576"
            :fileLimit="1"
            invalidFileSizeMessage="Tamanho de arquivo inválido. O tamanho do arquivo deve ser menor que 1 MB."
            invalidFileLimitMessage="Número máximo de arquivos excedido. O limite é de 1 arquivo."
            invalidFileTypeMessage="{0}: Formato inválido. Por favor, envie um arquivo do tipo imagem."
            :showUploadButton="false"
            :showCancelButton="false"
            :invalid="!image && !isValid"
          >
            <template #empty>
              <small v-if="!image && !isValid" class="text-red-600"
                >O campo Imagem é obrigatório</small
              >
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
      <OrderList
        v-model="noticias"
        v-model:selection="selectedItems"
        @update:model-value="onOrdenarNoticia"
        listStyle="height:auto"
        dataKey="id"
      >
        <template #header>Lista de Notícias</template>
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
                <span>{{ formatDate(slotProps.item.dtPublicacao) }}</span>
              </div>
            </div>
          </div>
        </template>
        <template #controlsend>
          <Button
            :disabled="!hasSelection"
            @click="excluirNoticias"
            icon="pi pi-trash"
            severity="danger"
          />
        </template>
      </OrderList>
    </div>
  </section>
</template>

<style scoped></style>
