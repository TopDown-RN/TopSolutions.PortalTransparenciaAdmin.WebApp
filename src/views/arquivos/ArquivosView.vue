<script setup>
import { onMounted, ref, watch, computed } from 'vue'
import {
  LerArquivoPorIdApi,
  deleteArquivo,
  getArquivos,
  getCategorias,
  atualizarArquivo
} from '@/services/arquivos'
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
import Toolbar from 'primevue/toolbar'
import Toast from 'primevue/toast'
import Dialog from 'primevue/dialog'
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
const arquivoDialog = ref(false)
const id_Menu = ref('')
const ano = ref('')
const idCategoriaArquivos = ref('')
const idMenuSelected = ref('')
const isValid = ref(true)

const loading = ref(true)

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
})

const menus = ref([])
const categorias = ref([])
const anos = computed(() => {
  const listaMenuIds = [35, 59, 107]
  let qtdAnos = 20
  let currentYear = new Date().getFullYear()

  if (listaMenuIds.includes(idMenuSelected.value)) {
    currentYear = new Date().getFullYear() + 1
    qtdAnos = 21
  }

  const anos = []
  for (let i = 0; i < qtdAnos; i++) {
    anos.push(currentYear - i)
  }
  return anos
})

const pathname = window.location.pathname

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

function filtrarArquivos({ menu, ano, categoria }) {
  idMenuSelected.value = menu.idMenu
  arquivos.value = filterArquivos.value.filter((arquivo) => {
    return (
      (!menu || arquivo.descMenu === menu.txtDescricao) &&
      (!ano || arquivo.anoPub === ano) &&
      (!categoria || arquivo.descCategoria === categoria.txtTitulo)
    )
  })
}

function excluirArq(arquivo) {
  confirm.require({
    group: 'headless',
    header: 'Tem certeza de que deseja excluir?',
    target: `${arquivo.data.nomeArquivo}`,
    message: 'Por favor, confirme para prosseguir.',
    accept: async () => {
      const response = await deleteArquivo([arquivo.data.idArquivo])
      if (response) {
        showSuccess('Arquivo excluído com sucesso!')
        await fetchArquivos()
      } else {
        showError('Ocorreu um erro ao excluir arquivo!')
      }
    }
  })
}

function excluirArqSelected() {
  const dados = selectedArquivo.value.map((item) => item.idArquivo)

  confirm.require({
    group: 'headless',
    header: 'Tem certeza que deseja excluir os arquivos selecionados?',
    message: 'Por favor, confirme para prosseguir',
    accept: async () => {
      const response = await deleteArquivo(dados)
      if (response) {
        showSuccess('Arquivos excluídos com sucesso!')
        await fetchArquivos()
      } else {
        showError('Ocorreu um erro ao excluir arquivos!')
      }
    }
  })
}

async function moverArqSelected() {
  try {
    if (!validarCampos()) {
      return
    }

    const lstArquivos = selectedArquivo.value.map((item) => item.idArquivo)

    const dados = {
      anoPub: ano.value,
      idCategoriaPubArquivo: idCategoriaArquivos.value.idCategoriaPubArquivo,
      idMenu: id_Menu.value.idMenu,
      txtDescricaoArquivo: null,
      lstArquivos: lstArquivos
    }

    await atualizarArquivo(dados)
    fetchArquivos()
    showSuccess('campos atualizados com sucesso!')
    arquivoDialog.value = false
  } catch (e) {
    showError('Ocorreu um erro ao mover arquivo.')
    console.error(`error: ${e.message}`)
  }
}

async function onRowEditSave(event) {
  try {
    let { newData } = event

    const dados = {
      anoPub: newData.anoPub,
      idCategoriaPubArquivo: Number.isInteger(newData.descCategoria)
        ? newData.descCategoria
        : newData.idCategoriaPubArquivo,
      idMenu: Number.isInteger(newData.descMenu) ? newData.descMenu : newData.idMenu,
      txtDescricaoArquivo: newData.descArquivo,
      lstArquivos: [newData.idArquivo]
    }

    await atualizarArquivo(dados)

    fetchArquivos()
    showSuccess('campos atualizados com sucesso!')
  } catch (error) {
    showError('Ocorreu um erro ao Editar')
    console.error(error)
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

function validarCampos() {
  isValid.value = true

  if (!id_Menu.value || !ano.value || !idCategoriaArquivos.value) {
    isValid.value = false
  }

  return isValid.value
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

EventBus.on('filterChange', filtrarArquivos)
EventBus.on('arquivosChanged', fetchArquivos)

watch(arquivos, () => {
  loading.value = false
})

watch(editingRows, () => {
  if (editingRows.value.length > 0) {
    idMenuSelected.value = editingRows.value[0].idMenu
  }
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
      ajuda="/arquivos/tour"
    />

    <Toast position="top-center" />

    <ConfirmDialog ref="arq" group="headless">
      <template #container="{ message, acceptCallback, rejectCallback }">
        <div
          class="flex flex-col items-center rounded-md bg-surface-0 p-5 dark:bg-surface-900 dark:text-white/80"
        >
          <div
            class="bg-primarytext-white -mt-8 inline-flex h-[6rem] w-[6rem] items-center justify-center rounded-full dark:text-surface-950"
          >
            <i class="pi pi-question text-4xl dark:text-white/80"></i>
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

    <div
      v-if="!loading"
      class="relative mt-8 overflow-x-auto rounded-lg border dark:border-white/20"
    >
      <Toolbar>
        <template #start>
          <Button
            @click="showCadastroArq = true"
            size="small"
            label="Adicionar arquivo"
            icon="pi pi-plus"
            :class="{ 'selector-2 pointer-events-none': pathname === '/arquivos/tour' }"
          />
        </template>
      </Toolbar>
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
        paginator
        :rows="10"
        :rowsPerPageOptions="[5, 10, 20, 50, 100]"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} resultados"
      >
        <template #header>
          <div class="flex justify-between">
            <div
              class="flex gap-2"
              :class="{ 'selector-6 pointer-events-none': pathname === '/arquivos/tour' }"
            >
              <Button
                label="Excluir"
                icon="pi pi-trash"
                severity="danger"
                size="small"
                @click="excluirArqSelected()"
                :disabled="!selectedArquivo || !selectedArquivo.length"
              />

              <Button
                label="Mover arquivo"
                @click="arquivoDialog = true"
                size="small"
                icon="pi pi-file-export"
                severity="contrast"
                :disabled="!selectedArquivo || !selectedArquivo.length"
              />
            </div>

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

        <Column
          selectionMode="multiple"
          :bodyClass="{ 'selector-5 pointer-events-none': pathname === '/arquivos/tour' }"
        ></Column>

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
              optionValue="idCategoriaPubArquivo"
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
              optionValue="idMenu"
              optionLabel="txtDescricao"
              panelClass="text-sm"
            />
          </template>
        </Column>

        <Column header="Descrição" field="descArquivo" style="text-align: left">
          <template #body="slotProps">
            {{ truncateNoMeio(slotProps.data.descArquivo, 25) }}
          </template>
          <template #editor="{ data, field }">
            <InputText v-model="data[field]" class="w-full" />
          </template>
        </Column>

        <Column header="Arquivo" field="nomeArquivo" style="text-align: left">
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

        <Column
          :rowEditor="true"
          style="width: 10%; min-width: 8rem"
          bodyStyle="text-align:right"
          :bodyClass="{ 'selector-3 pointer-events-none': pathname === '/arquivos/tour' }"
        />

        <Column
          header="Ações"
          bodyStyle="text-align: left"
          :bodyClass="{ 'selector-4 pointer-events-none': pathname === '/arquivos/tour' }"
        >
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

      <Dialog
        v-model:visible="arquivoDialog"
        modal
        header="Mover Arquivo(s)"
        :style="{ width: '25rem' }"
      >
        <span class="mb-5 block text-surface-600 dark:text-surface-0/70">
          Selecione o local pra onde deseja mover.
        </span>

        <div class="grid grid-cols-1 gap-x-2">
          <label class="block py-1 text-sm" for="ddMenu">Menu</label>
          <Dropdown
            v-model="id_Menu"
            :options="menus"
            optionLabel="txtDescricao"
            id="ddMenu"
            placeholder="Selecione um menu"
            class="w-full"
            panelClass="text-sm"
            :invalid="!id_Menu && !isValid"
          />
          <small v-if="!id_Menu && !isValid" class="text-red-600">
            Obrigatório selecionar um menu
          </small>
        </div>

        <div class="grid grid-cols-1 gap-x-2 pt-2">
          <label class="block py-1 text-sm" for="categoria">Categoria</label>
          <Dropdown
            v-model="idCategoriaArquivos"
            :options="categorias"
            optionLabel="txtTitulo"
            id="categoria"
            placeholder="Selecione uma categoria"
            class="w-full"
            panelClass="text-sm"
            :invalid="!idCategoriaArquivos && !isValid"
          />
          <small v-if="!idCategoriaArquivos && !isValid" class="text-red-600">
            Obrigatório selecionar uma categoria
          </small>
        </div>

        <div class="grid grid-cols-1 gap-x-2 pt-2">
          <label class="block py-1 text-sm" for="ano">Ano</label>
          <Dropdown
            v-model="ano"
            :options="anos"
            id="ano"
            placeholder="Selecione um ano"
            class="w-full"
            panelClass="text-sm"
            :invalid="!ano && !isValid"
          />
          <small v-if="!ano && !isValid" class="text-red-600">Obrigatório selecionar um ano</small>
        </div>

        <div class="flex justify-end gap-2 pt-2">
          <Button
            type="button"
            label="Cancelar"
            severity="secondary"
            size="small"
            class="text-sm"
            text
            @click="arquivoDialog = false"
          />
          <Button
            type="button"
            label="Salvar"
            size="small"
            class="text-sm"
            text
            @click="moverArqSelected()"
          />
        </div>
      </Dialog>
    </div>
  </section>
</template>
