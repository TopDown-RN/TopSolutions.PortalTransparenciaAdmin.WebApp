<script setup>
import HeadingComponent from '@/components/HeadingComponent.vue'
import { onMounted, ref, watch } from 'vue'
import { LerArquivoPorIdApi, deleteArquivo, getArquivos } from '@/services/arquivos'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import { FilterMatchMode } from 'primevue/api'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import ProgressSpinner from 'primevue/progressspinner'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import Toast from 'primevue/toast'
import ConfirmDialog from 'primevue/confirmdialog'
import Toolbar from 'primevue/toolbar'
import { truncateNoMeio } from '@/utils/truncateString'

const confirm = useConfirm()
const toast = useToast()

const arquivos = ref([])
const selectedArquivo = ref()

const loading = ref(true)

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
})

async function fetchArquivos() {
  try {
    const response = await getArquivos()
    arquivos.value = response.data
  } catch (e) {
    loading.value = false
    arquivos.value = []
    console.error('erro ao obter os arquivos: ', e)
  }
}

function excluirArq(arquivo) {
  console.log(arquivo.data.idArquivo)
  confirm.require({
    message: 'Você tem certeza que deseja fazer isso?',
    header: 'Excluir Arquivo',
    icon: 'pi pi-exclamation-triangle mr-3',
    rejectLabel: 'Cancelar',
    acceptLabel: 'Excluir',
    rejectClass:
      'bg-slate-50 hover:bg-slate-200 text-slate-900 focus:ring-0 border-slate-300 hover:border-slate-300',
    acceptClass: 'bg-red-500 hover:bg-red-700 focus:ring-0 border-none',
    accept: async () => {
      await deleteArquivo(arquivo.data.idArquivo)
      await fetchArquivos()
      showSuccess('Arquivo excluído com sucesso')
    }
  })
}

async function downloadArq(idArquivo, nomeArquivo) {
  try {
    const dados = await LerArquivoPorIdApi(idArquivo)
    const blob = new Blob([dados.data], { type: dados.data.type })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')

    link.href = url
    link.download = nomeArquivo
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    showSuccess('Download realizado com sucesso!')
  } catch (error) {
    showError('Ocorreu um erro ao fazer download do arquivo')
    console.error(`Ocorreu um erro ao fazer download do arquivo: ${error}`)
  }
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('pt-BR')
}

function showSuccess(message) {
  toast.add({ severity: 'success', summary: 'Confirmado', detail: message, life: 3000 })
}

function showError(message) {
  toast.add({ severity: 'error', summary: 'Erro!', detail: message, life: 3000 })
}

watch(arquivos, () => {
  loading.value = false
})

onMounted(() => {
  fetchArquivos()
})
</script>

<template>
  <section>
    <HeadingComponent
      title="Arquivos"
      subtitle="Gerencie aqui os arquivos exibidos ao usuário no Portal da Transparência."
      description="Mantenha-os sempre atualizados."
    />

    <Toast position="top-center" />
    <ConfirmDialog></ConfirmDialog>

    <div class="my-4 text-center" v-if="loading">
      <ProgressSpinner />
    </div>

    <div v-if="!loading" class="relative overflow-x-auto border rounded-lg">
      <div></div>

      <Toolbar>
        <template #start>
          <Button
            label="Excluir"
            icon="pi pi-trash"
            severity="danger"
            @click="excluirArqSelected"
            :disabled="!selectedArquivo || !selectedArquivo.length"
          />
        </template>
      </Toolbar>
      <DataTable
        v-model:selection="selectedArquivo"
        v-model:filters="filters"
        :value="arquivos"
        size="small"
        dataKey="idArquivo"
        stripedRows
        paginator
        :rows="10"
        :rowsPerPageOptions="[5, 10, 20, 50, 100]"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} resultados"
      >
        <template #header>
          <div class="flex justify-end">
            <span class="relative">
              <i
                class="pi pi-search absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600"
              />
              <InputText
                size="small"
                v-model="filters['global'].value"
                placeholder="Pesquisar..."
                class="pl-10 font-normal"
              />
            </span>
          </div>
        </template>
        <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
        <Column header="Ano" field="anoPub"></Column>
        <Column header="Categoria" field="descCategoria"></Column>
        <Column header="Menu" field="descMenu"></Column>
        <Column header="Arquivo" field="nomeArquivo">
          <template #body="slotProps">
            <button
              @click="downloadArq(slotProps.data.idArquivo, slotProps.data.nomeArquivo)"
              class="text-primary-700 hover:underline"
              v-tooltip.top="'Baixar Arquivo'"
            >
              {{ truncateNoMeio(slotProps.data.nomeArquivo, 50) }}
            </button>
          </template>
        </Column>
        <Column header="Publicado em" field="dtInclusao">
          <template #body="slotProps">
            {{ formatDate(slotProps.data.dtInclusao) }}
          </template>
        </Column>
        <Column header="Ações">
          <template #body="event">
            <Button
              icon="pi pi-pencil"
              size="small"
              outlined
              rounded
              class="mr-2"
              @click="editArquivo(event)"
              v-tooltip.top="'Editar'"
            />

            <Button
              icon="pi pi-trash"
              size="small"
              outlined
              rounded
              severity="danger"
              @click="excluirArq(event)"
            /> </template
        ></Column>
      </DataTable>
    </div>
  </section>
</template>
