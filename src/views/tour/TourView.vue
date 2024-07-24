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
    image: '/tour/tour-menus.png',
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
  <div class="max-w-screen-base container overflow-x-auto">
    <header class="flex justify-between">
      <Button
        label="Conhecer o Ambiente Adminitrativo"
        @click="openTourDialog"
        size="small"
        icon="pi pi-plus"
      ></Button>
    </header>

    <div class="my-4 text-center" v-if="loading">
      <ProgressSpinner />
    </div>

    <Dialog
      v-model:visible="tourDialog"
      modal
      header="Conheça o Ambiente Adminitrativo"
      :closable="true"
      style="width: 600px"
    >
      <h2 class="mb-5 text-lg font-semibold">
        Veja como funcionam os principais ambientes e páginas do Ambiente Adminitrativo
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
  </div>
</template>

<style scoped></style>
