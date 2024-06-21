<script setup>
import { onMounted, ref, watch, computed } from 'vue'
import { LerArquivoPorIdApi, deleteArquivo, getArquivos, getCategorias } from '@/services/arquivos'
import { getMenusArquivo } from '@/services/menu'
import { truncateNoMeio } from '@/utils/truncateString'
import EventBus from '@/utils/eventBus'
import HeadingComponent from '@/components/HeadingComponent.vue'
import CadastrarArquivo from '@/views/arquivos/CadastrarArquivo.vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'
import ProgressSpinner from 'primevue/progressspinner'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import Toast from 'primevue/toast'
import ConfirmDialog from 'primevue/confirmdialog'
import { FilterMatchMode } from 'primevue/api'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'

const confirm = useConfirm()
const toast = useToast()

const arquivos = ref([])
const filterArquivos = ref([])
const selectedArquivo = ref()
const editingRows = ref([])

const showCadastroArq = ref(false)

const loading = ref(true)

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
})

const menus = ref([])
const categorias = ref([])
const anos = computed(() => {
  const currentYear = new Date().getFullYear()
  const anos = []
  for (let i = 0; i < 20; i++) {
    anos.push(currentYear - i)
  }
  return anos
})

async function fetchArquivos() {
  try {
    const response = await getArquivos()
    arquivos.value = response.data
    filterArquivos.value = arquivos.value
  } catch (e) {
    loading.value = false
    arquivos.value = []
    console.error('erro ao obter os arquivos: ', e)
  }
}

function excluirArq(arquivo) {
  console.log(arquivo.data)
  confirm.require({
    group: 'headless',
    header: 'Tem certeza de que deseja excluir?',
    target: `${arquivo.data.nomeArquivo}`,
    message: 'Por favor, confirme para prosseguir.',
    accept: async () => {
      const response = await deleteArquivo(arquivo.data.idArquivo)
      const status = response.metadata.statusCode

      if (status === 200) {
        showSuccess(response.data)
        await fetchArquivos()
      } else {
        showError(response.data)
      }
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

async function fetchCategorias() {
  const response = await getCategorias()
  categorias.value = response.data
}

async function fetchMenus() {
  const response = await getMenusArquivo()
  menus.value = response.data.slice().sort((a, b) => {
    return a.txtDescricao.localeCompare(b.txtDescricao)
  })
}

function onRowEditSave(event) {
  console.log(event)
  let { newData, index } = event
  arquivos.value[index] = newData
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('pt-BR')
}

function showSuccess(message) {
  toast.add({ severity: 'success', summary: 'Confirmado', detail: message, life: 5000 })
}

function showError(message) {
  toast.add({ severity: 'error', summary: 'Erro!', detail: message, life: 5000 })
}

function filtrarArquivos({ menu, ano, categoria }) {
  arquivos.value = filterArquivos.value.filter((arquivo) => {
    return (
      (!menu || arquivo.descMenu === menu.txtDescricao) &&
      (!ano || arquivo.anoPub === ano) &&
      (!categoria || arquivo.descCategoria === categoria.txtTitulo)
    )
  })
}

EventBus.on('filterChange', filtrarArquivos)
EventBus.on('arquivosChanged', fetchArquivos)

watch(arquivos, () => {
  loading.value = false
})

onMounted(() => {
  fetchArquivos()
  fetchCategorias()
  fetchMenus()
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

    <ConfirmDialog ref="arq" group="headless">
      <template #container="{ message, acceptCallback, rejectCallback }">
        <div class="flex flex-col items-center rounded-md bg-surface-0 p-5 dark:bg-surface-900">
          <div
            class="bg-primarytext-white -mt-8 inline-flex h-[6rem] w-[6rem] items-center justify-center rounded-full dark:text-surface-950"
          >
            <i class="pi pi-question text-4xl"></i>
          </div>
          <span class="mb-2 block text-xl font-bold">{{ message.header }}</span>
          <p class="text-sm font-semibold">{{ message.target }}</p>
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

    <div class="my-4 text-center" v-if="loading">
      <ProgressSpinner />
    </div>

    <div v-if="showCadastroArq">
      <CadastrarArquivo :categorias="categorias" :menus="menus" :anos="anos" />
    </div>

    <div v-if="!loading" class="relative mt-8 overflow-x-auto rounded-lg border">
      <!-- <Toolbar>
        <template #start>
          <Button
            label="Excluir"
            icon="pi pi-trash"
            severity="danger"
            @click="excluirArqSelected"
            :disabled="!selectedArquivo || !selectedArquivo.length"
          />
        </template>
      </Toolbar> -->
      <DataTable
        v-model:selection="selectedArquivo"
        v-model:filters="filters"
        v-model:editingRows="editingRows"
        editMode="row"
        @row-edit-save="onRowEditSave"
        :value="arquivos"
        class="text-sm"
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
          <div class="flex justify-between">
            <Button
              @click="showCadastroArq = true"
              size="small"
              label="Adicionar arquivo"
              icon="pi pi-plus"
            />

            <IconField iconPosition="left">
              <InputIcon class="pi pi-search" />
              <InputText
                size="small"
                v-model="filters['global'].value"
                placeholder="Pesquisar..."
                class="font-normal"
              />
            </IconField>
          </div>
        </template>

        <!-- <Column selectionMode="multiple" headerStyle="width: 3rem"></Column> -->

        <Column header="Ano" field="anoPub">
          <template #editor="{ data, field }">
            <Dropdown v-model="data[field]" :options="anos" panelClass="text-sm" />
          </template>
        </Column>

        <Column header="Categoria" field="descCategoria">
          <template #editor="{ data, field }">
            <Dropdown
              v-model="data[field]"
              :options="categorias"
              optionValue="txtTitulo"
              optionLabel="txtTitulo"
              panelClass="text-sm"
            />
          </template>
        </Column>

        <Column header="Menu" field="descMenu">
          <template #editor="{ data, field }">
            <Dropdown
              v-model="data[field]"
              :options="menus"
              optionValue="txtDescricao"
              optionLabel="txtDescricao"
              panelClass="text-sm"
            />
          </template>
        </Column>

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
          <template #editor="{ data, field }">
            <InputText v-model="data[field]" class="w-full" />
          </template>
        </Column>

        <Column header="Publicado em" field="dtInclusao">
          <template #body="slotProps">
            {{ formatDate(slotProps.data.dtInclusao) }}
          </template>
        </Column>

        <Column
          :rowEditor="true"
          style="width: 10%; min-width: 8rem"
          bodyStyle="text-align:right"
        />

        <Column header="Ações" bodyStyle="text-align: left">
          <template #body="event">
            <Button
              icon="pi pi-trash"
              class="max-h-8 max-w-8"
              size="small"
              outlined
              rounded
              severity="danger"
              v-tooltip.top="'Excluir'"
              @click="excluirArq(event)"
            />
          </template>
        </Column>
      </DataTable>
    </div>
  </section>
</template>
