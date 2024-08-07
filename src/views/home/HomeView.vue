<script setup>
import { ref, onMounted, watch } from 'vue'
import { getRegistroImportacao } from '@/services/home'
import { getMenusArquivo } from '@/services/menu'
import ProgressSpinner from 'primevue/progressspinner'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import { FilterMatchMode } from 'primevue/api'
import HeadingComponent from '@/components/HeadingComponent.vue'

const registros = ref([])
const arquivos = ref([])
const loading = ref(true)

const filtersRegistros = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
})
const filtersArquivos = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
})

async function getRegistros() {
  try {
    const response = await getRegistroImportacao()
    registros.value = response.data
  } catch (e) {
    console.error(e)
  }
}

async function getArquivos() {
  try {
    const response = await getMenusArquivo()
    arquivos.value = response.data
  } catch (e) {
    console.error(e)
  }
}

function formatData(data) {
  const dataObj = new Date(data)

  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  }

  return dataObj.toLocaleDateString('pt-BR', options)
}

watch(registros, () => {
  loading.value = false
})

watch(arquivos, () => {
  loading.value = false
})

onMounted(() => {
  getRegistros()
  getArquivos()
})
</script>

<template>
  <div v-if="loading" class="my-4 text-center">
    <ProgressSpinner />
  </div>

  <img
    src="/logoTopVertical.png"
    class="mx-auto mb-4 focus:outline-none dark:brightness-0 dark:invert"
    width="220"
    aria-label="logo"
    alt="logo"
  />

  <HeadingComponent
    subtitle="Bem vindo! nosso sistema foi desenvolvido com o objetivo de atender às suas necessidades da forma mais eficiente possível. Estamos constantemente aprimorando e adicionando novos recursos para tornar sua experiência ainda melhor."
    description="Caso surja qualquer dúvida, nossa equipe de suporte está sempre à disposição para ajudá-lo(a)."
  />

  <p class="mx-auto max-w-5xl text-center text-gray-500 dark:text-gray-300">
    Você também pode acessar a opção "Ajuda" no menu lateral para conhecer nossa plataforma ou
    clicando em
    <RouterLink to="tour" class="font-medium text-primary-500 underline hover:text-primary-700">
      Ajuda.
    </RouterLink>
  </p>

  <div class="justify-center md:flex md:space-x-6">
    <div
      class="relative mt-6 overflow-x-auto rounded-lg border dark:border-white/20"
      v-if="!loading"
    >
      <DataTable
        :value="registros"
        :filters="filtersRegistros"
        size="small"
        paginator
        :rows="10"
        :rowsPerPageOptions="[5, 10, 20, 50]"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} resultados"
      >
        <template #header>
          <div>
            <p class="mt-1 font-medium text-gray-500 dark:text-gray-300">
              Atualizações das consultas no Portal da Transparência
            </p>
            <IconField iconPosition="left">
              <InputIcon>
                <i class="pi pi-search" />
              </InputIcon>
              <InputText
                size="small"
                v-model="filtersRegistros.global.value"
                :filterMatchMode="filtersRegistros.global.matchMode"
                placeholder="Pesquisar..."
                class="font-normal"
              />
            </IconField>
          </div>
        </template>
        <Column field="txtDestinoImportacao" header="Consulta" />
        <Column field="dtImportacao" header="Última atualização em">
          <template #body="slotProps">
            {{ formatData(slotProps.data.dtImportacao) }}
          </template>
        </Column>
        <Column field="txtNomeUsuario" header="Atualizado por"></Column>
      </DataTable>
    </div>
    <div
      class="relative mt-6 overflow-x-auto rounded-lg border dark:border-white/20"
      v-if="!loading"
    >
      <DataTable
        :value="arquivos"
        :filters="filtersArquivos"
        size="small"
        paginator
        :rows="10"
        :rowsPerPageOptions="[5, 10, 20, 50]"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} resultados"
      >
        <template #header>
          <div>
            <p class="mt-1 font-medium text-gray-500 dark:text-gray-300">
              Atualizações dos arquivos no Portal da Transparência
            </p>
            <IconField iconPosition="left">
              <InputIcon>
                <i class="pi pi-search" />
              </InputIcon>
              <InputText
                size="small"
                v-model="filtersArquivos.global.value"
                :filterMatchMode="filtersArquivos.global.matchMode"
                placeholder="Pesquisar..."
                class="font-normal"
              />
            </IconField>
          </div>
        </template>
        <Column field="txtDescricao" header="Arquivos" />
        <Column field="ultimaDataInclusao" header="Última atualização em">
          <template #body="slotProps">
            {{
              slotProps.data.ultimaDataInclusao
                ? formatData(slotProps.data.ultimaDataInclusao)
                : 'Sem publicação'
            }}
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<style scoped></style>
