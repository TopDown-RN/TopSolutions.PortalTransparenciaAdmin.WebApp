<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import ProgressSpinner from 'primevue/progressspinner'
import Dialog from 'primevue/dialog'

const router = useRouter()
const tourDialog = ref(false)
const loading = ref(true)

const items = ref([
  {
    title: 'Menus',
    description: 'Acesse, crie e edite todos os menus',
    image: '/tour/menus.png',
    redirect: '/menus'
  },
  {
    title: 'Arquivos',
    description: 'Publique os arquivos',
    //image: 'path/to/image2.png',
    redirect: '/arquivos'
  },
  {
    title: 'Ouvidoria',
    description: 'Utilize para preencher informações da ouvidoria',
    //image: 'path/to/image2.png',
    redirect: '/ouvidoria'
  },
  {
    title: 'Importar Dados',
    description: 'Você pode facilmente importar dados externos para o Portal',
    //image: 'path/to/image2.png',
    redirect: '/importacaodadosplanilha'
  },
  {
    title: 'Notícias',
    description: 'Publique as principais notícias',
    //image: 'path/to/image2.png',
    redirect: '/noticias'
  }
])

const openTourDialog = () => {
  tourDialog.value = true
}

const handleRedirect = (redirectPath) => {
  router.push(`${redirectPath}/tour`)
}

onMounted(async () => {
  loading.value = false
})
</script>

<template>
  <div class="my-4 text-center" v-if="loading">
    <ProgressSpinner />
  </div>

  <div class="max-w-2xl rounded-lg bg-white px-8 py-4 shadow-md dark:bg-gray-800">
    <div class="flex items-center justify-between">
      <span class="text-sm font-light text-gray-600 dark:text-gray-400">Top Solutions</span>
      <span
        class="transform rounded bg-gray-600 px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-300"
      >
        Ajuda
      </span>
    </div>

    <div class="mt-2">
      <span class="text-xl font-bold text-gray-700 dark:text-white">
        Conheça mais do ambiente adminitrativo da Top Solutions!
      </span>
      <p class="mt-2 text-gray-600 dark:text-gray-300">
        Faça a tour e explore para entender como funcionam os principais ambientes e páginas do
        Ambiente Adminitrativo. Você pode acessar a opção "Ajuda" no menu lateral e clicar no botão
        abaixo.
      </p>
    </div>

    <div class="mt-4 flex items-center">
      <Button
        label="Conhecer ambiente"
        @click="openTourDialog"
        size="small"
        icon="pi pi-plus"
      ></Button>
    </div>
  </div>

  <Dialog
    v-model:visible="tourDialog"
    modal
    header="Conheça o Ambiente Adminitrativo"
    :closable="true"
    style="width: 600px"
  >
    <h2 class="mb-5">
      Selecione uma opção abaixo e veja como funciona as principais páginas do ambiente
      admnistrativo.
    </h2>

    <div class="grid gap-4 text-sm">
      <div class="lg:col-span-2">
        <div class="grid gap-y-4">
          <button
            v-for="item in items"
            :key="item.title"
            class="group flex w-full items-center rounded-md border bg-gray-50 p-3 transition hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600"
            @click="handleRedirect(item.redirect)"
          >
            <img
              :src="item.image"
              alt="Image for {{ item.title }}"
              class="mr-4"
              style="width: 80px; height: auto"
            />
            <div class="flex flex-col">
              <h3 class="text-left font-semibold">{{ item.title }}</h3>
              <p class="text-left">{{ item.description }}</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  </Dialog>
</template>

<style scoped></style>
