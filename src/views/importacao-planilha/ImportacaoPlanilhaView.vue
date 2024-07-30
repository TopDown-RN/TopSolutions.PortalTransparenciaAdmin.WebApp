<script setup>
import { ref, onMounted } from 'vue'
import {
  postPlanilha,
  visualizaDados,
  visualizarDadosImportados
} from '@/services/importacaoplanilha'
import { getRegistroImportacaoManuais, deletarRegistroImportcaoManuais } from '@/services/home'
import { getMenusTemplates, getTemplateMenu } from '@/services/menu'
import { RiDeleteBinLine } from '@remixicon/vue'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import DataTable from 'primevue/datatable'
import ProgressSpinner from 'primevue/progressspinner'
import { useToast } from 'primevue/usetoast'
import { FilterMatchMode } from 'primevue/api'
import { useConfirm } from 'primevue/useconfirm'
import ConfirmDialog from 'primevue/confirmdialog'
import Dialog from 'primevue/dialog'
import Toast from 'primevue/toast'
import HeadingComponent from '@/components/HeadingComponent.vue'

const confirm = useConfirm()
const idMenu = ref(0)
const file = ref(null)
const registrosImportacao = ref([])
const loading = ref(true)
const loadingDialog = ref(false)
const loadingDialog2 = ref(false)
const btnImpotar = ref(true)
const toast = useToast()
const fileInput = ref(null)
const desativar = ref(false)

const visible = ref(false)
const visible2 = ref(false)

const menus = ref([])
const templateData = ref([])
const fields = ref([])
const fields2 = ref([])

const registrosImportados = ref([])

const pathname = window.location.pathname

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
})

function alertCustom(msg, severity, summary) {
  toast.add({ severity: severity, summary: summary, detail: msg, life: 3000 })
}

async function visualizarDados() {
  try {
    const formData = new FormData()
    formData.append('planilha', file.value)
    templateData.value = await visualizaDados(formData)
    fields.value = Object.keys(templateData.value[0])
    visible.value = true
  } catch (e) {
    alertCustom(e.response.data, 'error', 'Erro!')
    clearFile()
  }
}

async function importarPlanilha() {
  try {
    btnImpotar.value = false
    const formData = new FormData()
    formData.append('_template', file.value)
    await postPlanilha(formData)
    alertCustom('Dados Importados!', 'success', 'Sucesso!')
    limparCampos()
    btnImpotar.value = true
    file.value = null
    await registrosImportacaoManuais()
  } catch (e) {
    console.log('erro', e)
    limparCampos()
    alertCustom(e.response.data, 'error', 'Erro!')
    btnImpotar.value = true
  }
}

const clearFile = () => {
  file.value = null
  if (fileInput.value) {
    fileInput.value.value = null
    templateData.value = []
    fields.value = []
  }
}

async function deletarDadosRegistro(idRegistroImportacao) {
  confirm.require({
    group: 'templating',
    header: 'Confirmação',
    message: 'Você tem certeza que deseja excluir?',
    icon: 'pi pi-exclamation-circle text-amber-500',
    acceptIcon: 'pi pi-check mr-2',
    rejectIcon: 'pi pi-times mr-2',
    rejectClass: 'bg-red-500 hover:bg-red-700 border-none',
    acceptClass: 'border-none',
    rejectLabel: 'Cancelar',
    acceptLabel: 'Confirmar',
    accept: async () => {
      try {
        loading.value = true
        await deletarRegistroImportcaoManuais(idRegistroImportacao)
        await registrosImportacaoManuais()
        loading.value = false
        alertCustom('Registro excluído com sucesso!', 'success', 'Sucesso!')
      } catch (e) {
        console.log(e)
        alertCustom(e.response.data, 'error', 'Erro!')
        loading.value = false
      }
    },
    reject: () => {}
  })
}

async function confirmeImportacao() {
  confirm.require({
    group: 'templating',
    header: 'Confirmação',
    message: 'Você confirmar a verificação dos dados de importação?',
    icon: 'pi pi-exclamation-circle text-amber-500',
    acceptIcon: 'pi pi-check mr-2',
    rejectIcon: 'pi pi-times mr-2',
    rejectClass: 'bg-red-500 hover:bg-red-700 border-none',
    acceptClass: 'border-none',
    rejectLabel: 'Cancelar',
    acceptLabel: 'Confirmar',
    accept: async () => {
      importarPlanilha()
    },
    reject: () => {}
  })
}

const handleFileChange = async (event) => {
  file.value = event.target.files[0]
  await visualizarDados()
}

function formatarData(data) {
  const dataObj = new Date(data)
  const dia = String(dataObj.getDate()).padStart(2, '0')
  const mes = String(dataObj.getMonth() + 1).padStart(2, '0')
  const ano = dataObj.getFullYear()
  const hora = String(dataObj.getHours()).padStart(2, '0')
  const minutos = String(dataObj.getMinutes()).padStart(2, '0')
  const segundos = String(dataObj.getSeconds()).padStart(2, '0')

  return `${dia}/${mes}/${ano} ${hora}:${minutos}:${segundos}`
}

function limparCampos() {
  idMenu.value = 0
  clearFile()
}

async function registrosImportacaoManuais() {
  try {
    loading.value = true
    const response = await getRegistroImportacaoManuais()
    registrosImportacao.value = response.data
    loading.value = false
  } catch (e) {
    console.error(e)
  }
}

async function downloadPlanilha() {
  try {
    if (idMenu.value == 0) {
      alertCustom('Selecione um modelo para baixar', 'warn', 'Atenção')
      return
    }

    const modelo = menus.value.find((menu) => menu.idMenu === idMenu.value)
    const dados = await getTemplateMenu(idMenu.value)
    const blob = new Blob([dados.data], { type: dados.data.type })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = modelo.txtNomeTemplate
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  } catch (erro) {
    alertCustom(erro.response.data, 'error', 'Erro!')
  }
}

async function listarMenusTemplates() {
  try {
    const response = await getMenusTemplates()
    menus.value = response.data
  } catch (e) {
    alertCustom(e.response.data, 'error', 'Erro!')
  }
}

async function lerDadosImportados(_idRegistroImport) {
  try {
    loadingDialog2.value = true
    visible2.value = true
    const response = await visualizarDadosImportados(_idRegistroImport)
    registrosImportados.value = response
    fields2.value = Object.keys(registrosImportados.value[0])
    console.log('response', response)
    console.log(registrosImportados.value)
    loadingDialog2.value = false
  } catch (e) {
    alertCustom(e.response.data, 'error', 'Erro!')
    visible2.value = false
    loadingDialog.value = false
  }
}

onMounted(async () => {
  await registrosImportacaoManuais()
  await listarMenusTemplates()
})
</script>

<template>
  <Toast position="top-center" />
  <ConfirmDialog group="templating">
    <template #message="slotProps">
      <div class="flex w-full flex-col items-center gap-3">
        <i :class="slotProps.message.icon" class="text-6xl text-primary-500"></i>
        <p>{{ slotProps.message.message }}</p>
      </div>
    </template>
  </ConfirmDialog>
  <Dialog
    v-model:visible="visible"
    maximizable
    modal
    header="Dados a serem importados"
    :style="{ width: '100rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <div v-if="loadingDialog" class="my-4 text-center">
      <ProgressSpinner />
    </div>
    <div v-else>
      <DataTable
        :value="templateData"
        v-model:filters="filters"
        size="small"
        :paginator="true"
        :rows="10"
        :rowsPerPageOptions="[5, 10, 20, 50]"
      >
        <template #header>
          <div class="flex justify-end">
            <span class="relative">
              <i
                class="pi pi-search absolute left-3 top-2/4 -mt-2 text-surface-400 dark:text-surface-600"
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
        <Column v-for="field in fields" :key="field" :field="field" :header="field"></Column>
      </DataTable>
    </div>
  </Dialog>

  <Dialog
    v-model:visible="visible2"
    maximizable
    modal
    header="Dados Importados"
    :style="{ width: '80rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <div v-if="loadingDialog2" class="my-4 text-center">
      <ProgressSpinner />
    </div>
    <div v-else>
      <DataTable
        :value="registrosImportados"
        v-model:filters="filters"
        size="small"
        :paginator="true"
        :rows="10"
        :rowsPerPageOptions="[5, 10, 20, 50]"
        stripedRows
      >
        <template #header>
          <div class="flex justify-end">
            <span class="relative">
              <i
                class="pi pi-search absolute left-3 top-2/4 -mt-2 text-surface-400 dark:text-surface-600"
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
        <Column v-for="field in fields2" :key="field" :field="field" :header="field"></Column>
        <!-- <Column v-for="(value, key) in registrosImportados[0]" :key="key" :field="key" :header="key" /> -->
      </DataTable>
    </div>
  </Dialog>

  <div>
    <HeadingComponent
      :title="'Importação manual de dados'"
      :description="'Importe seus dados manualmente utilizando planilhas pré-desenvolvidas.'"
      ajuda="/importacaodadosplanilha/tour"
    />

    <div class="max-w-screen-base container mx-auto">
      <div>
        <div class="mb-6 mt-6 rounded bg-white p-4 px-4 shadow-lg md:p-8 dark:bg-surface-800">
          <div class="gap grid grid-cols-1 text-sm">
            <div
              class="lg:col-span-3"
              :class="{
                'selector-2 pointer-events-none': pathname === '/importacaodadosplanilha/tour'
              }"
            >
              <div class="md:col-span-2">
                <label class="dark:text-white/80">Selecione um modelo de importação</label>
                <select
                  v-model="idMenu"
                  :disabled="desativar"
                  class="mt-1 h-10 w-full rounded border border-gray-200 bg-gray-50 bg-transparent px-4 text-gray-800 outline-none dark:border-white/20 dark:bg-surface-800 dark:text-white/80"
                >
                  <option value="0" disabled selected>Selecione</option>
                  <option v-for="menu in menus" :key="menu.idMenu" :value="menu.idMenu">
                    {{ menu.txtDescricao }}
                  </option>
                </select>
              </div>
            </div>
            <div class="mt-3 flex items-center md:col-span-4">
              <button
                @click="downloadPlanilha"
                class="mr-4 cursor-pointer rounded border border-primary-500 px-4 py-2 font-bold text-primary-500 hover:bg-primary-700 hover:text-white"
                :class="{
                  'selector-3 pointer-events-none': pathname === '/importacaodadosplanilha/tour'
                }"
              >
                <i class="pi pi-download"></i>
                Baixar modelo
              </button>

              <div class="flex">
                <div>
                  <label
                    for="inputarquivos"
                    class="cursor-pointer rounded border border-primary-500 px-4 py-2 font-bold text-primary-500 hover:bg-primary-700 hover:text-white"
                    :class="{
                      'selector-4 pointer-events-none': pathname === '/importacaodadosplanilha/tour'
                    }"
                  >
                    <i class="pi pi-file-import"></i>
                    Selecionar Planilha
                  </label>
                  <input
                    id="inputarquivos"
                    hidden
                    type="file"
                    ref="fileInput"
                    @change="handleFileChange"
                  />

                  <i
                    v-if="templateData && templateData.length > 0"
                    class="pi pi-eye ml-2 cursor-pointer text-xl hover:text-primary-500"
                    @click="visible = !visible"
                  ></i>
                </div>

                <div v-if="file" class="ml-10">
                  <ul class="flex flex-col items-start justify-center">
                    <li class="list-disc">{{ file.name }} <button @click="clearFile">X</button></li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="text-right md:col-span-5">
              <div
                class="inline-flex items-end"
                :class="{
                  'selector-5 pointer-events-none': pathname === '/importacaodadosplanilha/tour'
                }"
              >
                <button
                  @click="btnImpotar ? confirmeImportacao() : null"
                  :class="{
                    'bg-primary-500 hover:bg-primary-700': btnImpotar,
                    'cursor-not-allowed bg-primary-700': !btnImpotar
                  }"
                  :disabled="!btnImpotar"
                  class="flex h-9 w-24 items-center justify-center rounded px-4 py-2 font-bold text-white"
                >
                  <span v-if="btnImpotar">Importar</span>
                  <span v-else>
                    <ProgressSpinner
                      style="width: 20px; height: 20px"
                      strokeWidth="8"
                      aria-label="Custom ProgressSpinner"
                    />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div v-if="loading" class="my-4 text-center">
          <ProgressSpinner />
        </div>
        <div v-if="!loading">
          <DataTable
            :value="registrosImportacao"
            v-model:filters="filters"
            size="small"
            :paginator="true"
            :rows="10"
            :rowsPerPageOptions="[5, 10, 20, 50]"
          >
            <template #header>
              <div class="flex justify-end">
                <span class="relative">
                  <i
                    class="pi pi-search absolute left-3 top-2/4 -mt-2 text-surface-400 dark:text-surface-600"
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
            <Column field="txtDestinoImportacao" header="Consulta"></Column>
            <Column field="dtImportacao" header="Data do Registro">
              <template #body="slotProps">
                {{ formatarData(slotProps.data.dtImportacao) }}
              </template>
            </Column>
            <Column field="txtNomeUsuario" header="Importado por"></Column>
            <Column header="Ações">
              <template #body="rowData">
                <button
                  @click="deletarDadosRegistro(rowData.data.idRegistroImportacao)"
                  class="text-red-500"
                  v-tooltip.top="'Excluir'"
                  :class="{
                    'selector-7 pointer-events-none': pathname === '/importacaodadosplanilha/tour'
                  }"
                >
                  <RiDeleteBinLine />
                </button>
                <i
                  class="pi pi-eye ml-2 cursor-pointer text-xl hover:text-primary-500"
                  @click="lerDadosImportados(rowData.data.idRegistroImportacao)"
                  :class="{
                    'selector-6 pointer-events-none': pathname === '/importacaodadosplanilha/tour'
                  }"
                ></i>
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
    </div>
  </div>
</template>
