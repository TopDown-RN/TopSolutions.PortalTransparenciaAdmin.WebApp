<script setup>
import { ref, onMounted, watch } from 'vue'
import { postPlanilha } from '@/services/importacaoplanilha'
import { getRegistroImportacaoManuais, deletarRegistroImportcaoManuais } from '@/services/home'
import { getMenusTemplates, getTemplateMenu } from '@/services/menu'
import { RiDeleteBinLine } from '@remixicon/vue'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import DataTable from 'primevue/datatable'
import Toast from 'primevue/toast'
import ProgressSpinner from 'primevue/progressspinner'
import { useToast } from 'primevue/usetoast'
import { FilterMatchMode } from 'primevue/api'
import { useConfirm } from 'primevue/useconfirm'
import ConfirmDialog from 'primevue/confirmdialog'
import AcordoModelo from '@/assets/planilhasModelo/AcordoModelo.xlsx'

const confirm = useConfirm()
const idMenu = ref(0)
const file = ref(null)
const registrosImportacao = ref([])
const loading = ref(true)
const btnImpotar = ref(true)
const toast = useToast()
const fileInput = ref(null)
const desativar = ref(false)

//const invalido = ref(false)

const menus = ref([])

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
})

function mensagemSucesso(msg) {
  toast.add({ severity: 'success', summary: 'Successo', detail: msg, life: 3000 })
}

function mensagemErro(msg) {
  toast.add({ severity: 'error', summary: 'Erro!', detail: msg, life: 3000 })
}

function mensagemAlerta(msg) {
  toast.add({ severity: 'warn', summary: 'Erro!', detail: msg, life: 3000 })
}

async function importarPlanilha() {
  try {
    btnImpotar.value = false
    const formData = new FormData()
    formData.append('idUsuario', 11)
    formData.append('Planilha', file.value)
    //formData.append('codDestino', cod.value)
    await postPlanilha(formData)
    mensagemSucesso('Dados Importados!')
    limparCampos()
    btnImpotar.value = true
    file.value = null
    await registrosImportacaoManuais()
  } catch (e) {
    console.log('erro', e)
    limparCampos()
    mensagemErro(e.response.data)
    btnImpotar.value = true
  }
}

const clearFile = () => {
  file.value = null
  if (fileInput.value) {
    fileInput.value.value = null
  }
}

async function deletarDadosRegistro(idRegistroImportacao) {
  console.log('ID do registro de importação:', idRegistroImportacao)
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
      // toast.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
      try {
        loading.value = true
        await deletarRegistroImportcaoManuais(idRegistroImportacao)
        await registrosImportacaoManuais()
        loading.value = false
        mensagemSucesso('Registro excluído com sucesso!')
      } catch (e) {
        console.log(e)
        mensagemErro(e.response.data)
        loading.value = false
      }
    },
    reject: () => {
      // toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    }
  })
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

    if (idMenu.value === 0) {
      mensagemAlerta('Selecione um modelo')
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
    mensagemErro(erro.response.data)
  }
}

async function listarMenusTemplates(){
    try {
        const response = await getMenusTemplates()
        menus.value = response.data

    } catch (e) {
        mensagemErro(e.response.data)
    }
}

onMounted(async () => {
  await registrosImportacaoManuais()
  await listarMenusTemplates()
})
</script>

<template>
  <ConfirmDialog group="templating">
    <template #message="slotProps">
      <div class="flex flex-column align-items-center w-full gap-3 border-bottom-1 surface-border">
        <i :class="slotProps.message.icon" class="text-6xl text-primary-500"></i>
        <p>{{ slotProps.message.message }}</p>
      </div>
    </template>
  </ConfirmDialog>
  
  <div>
    <div class="mx-auto max-w-3xl text-center">
      <h2 class="text2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
        Importação manual de dados
      </h2>
      <p class="mt-2 text-lg leading-8 text-gray-600">
        Importe seus dados manualmente via planilha
      </p>
    </div>

    <div class="container max-w-screen-base mx-auto">
      <div>
        <div class="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6 mt-6">
          <div class="grid gap text-sm grid-cols-1">
            <div class="lg:col-span-3">
              <div class="md:col-span-2">
                <label>Selecione o modelo</label>
                <select
                  v-model="idMenu"
                  :disabled="desativar"
                  class="h-10 bg-gray-50 border border-gray-200 rounded mt-1 px-4 outline-none text-gray-800 w-full bg-transparent"
                >
                  <option value="0" disabled selected>Selecione</option>
                  <option v-for="menu in menus" :key="menu.idMenu" :value="menu.idMenu">
                    {{ menu.txtDescricao }}
                  </option>
                </select>
              </div>
            </div>
            <div class="md:col-span-4 mt-3 flex items-center">
              <button
                @click="downloadPlanilha"
                class="mr-4 border border-primary-500 hover:bg-primary-700 text-primary-500 hover:text-white font-bold py-2 px-4 rounded cursor-pointer"
              >
                <i class="pi pi-download"></i>
                Baixar modelo
              </button>
              <div class="flex">
                <div>
                  <label
                    for="inputarquivos"
                    class="border border-primary-500 hover:bg-primary-700 text-primary-500 hover:text-white font-bold py-2 px-4 rounded cursor-pointer"
                  >
                    <i class="pi pi-file-import"></i>
                    Selecionar Planilha
                  </label>
                  <input
                    id="inputarquivos"
                    hidden
                    type="file"
                    ref="fileInput"
                    @change="file = $event.target.files[0]"
                  />
                </div>
                <div v-if="file" class="ml-10">
                  <ul class="flex flex-col items-start justify-center">
                    <li class="list-disc">{{ file.name }} <button @click="clearFile">X</button></li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="md:col-span-5 text-right">
              <div class="inline-flex items-end">
                <button
                  @click="btnImpotar ? importarPlanilha() : null"
                  :class="{
                    'bg-primary-500 hover:bg-primary-700': btnImpotar,
                    'bg-primary-700 cursor-not-allowed': !btnImpotar
                  }"
                  :disabled="!btnImpotar"
                  class="text-white font-bold py-2 px-4 rounded h-9 w-24 flex items-center justify-center"
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
            stripedRows
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
                >
                  <RiDeleteBinLine />
                </button>
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
    </div>
  </div>
</template>
