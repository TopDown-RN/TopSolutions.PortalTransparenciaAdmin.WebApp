<script setup>
import { ref, onMounted, watch } from 'vue'
import { postPlanilha } from '@/services/importacaoplanilha'
import { getRegistroImportacaoManuais, deletarRegistroImportcaoManuais } from '@/services/home'
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

const cod = ref(0)
const file = ref(null)
const registrosImportacao = ref([])
const loading = ref(true)
const btnImpotar = ref(true)
const toast = useToast()
const fileInput = ref(null)
const desativar = ref(false)

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
})

function mensagemSucesso(msg) {
  toast.add({ severity: 'success', summary: 'Successo', detail: msg, life: 3000 })
}

function mensagemErro(msg) {
  toast.add({ severity: 'error', summary: 'Erro!', detail: msg, life: 3000 })
}

const options = ref([{ cod: 1, nome: 'Acordo', nomearquivo: 'AcordoModelo.xlsx' }])

async function importarPlanilha() {
  try {
    btnImpotar.value = false
    const formData = new FormData()
    formData.append('idUsuario', 11)
    formData.append('Planilha', file.value)
    formData.append('codDestino', cod.value)
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
  cod.value = 0
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

// async function downloadPlanilha() {
//   try {

//     if(!cod.value) return console.error('ID do registro de importação não informado');

//     const response = await getDownloadPlanilha(cod.value);
//     console.log('Resposta da API:', response);

//     const blob = new Blob([response.data], { type: response.data.type });
//     const url = URL.createObjectURL(blob);

//     const link = document.createElement('a');
//     link.href = url;

//     const nomeArquivo = options.value.filter(item => item.cod === cod.value)[0].nomearquivo;
//     link.download = nomeArquivo;

//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);

//     URL.revokeObjectURL(url);

//   } catch (error) {
//     console.error('Erro ao baixar o arquivo:', error);
//   }
// }

async function downloadPlanilha() {
  let fileURL
  let fileName

  switch (cod.value) {
    case 1:
      fileURL = AcordoModelo
      fileName = 'AcordoModelo.xlsx'
      break
    default:
      return
  }

  const link = document.createElement('a')
  link.href = fileURL
  link.setAttribute('download', fileName)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

watch(file, (newfile, oldfile) => {
  if (newfile) {
    if (newfile.name.toLowerCase().includes('acordo')) {
      cod.value = 1
      desativar.value = true
    } else {
      cod.value = 0
      desativar.value = false
    }
  } else {
    cod.value = 0
    desativar.value = false
  }
})

onMounted(async () => {
  await registrosImportacaoManuais()
})
</script>

<template>
  <ConfirmDialog group="templating">
    <template #message="slotProps">
      <div class="flex-column align-items-center border-bottom-1 surface-border flex w-full gap-3">
        <i :class="slotProps.message.icon" class="text-6xl text-primary-500"></i>
        <p>{{ slotProps.message.message }}</p>
      </div>
    </template>
  </ConfirmDialog>
  <Toast position="top-center" />
  <div>
    <div class="mx-auto max-w-3xl text-center">
      <h2 class="text2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
        Importação manual de dados
      </h2>
      <p class="mt-2 text-lg leading-8 text-gray-600">
        Importe seus dados manualmente via planilha
      </p>
    </div>

    <div class="max-w-screen-base container mx-auto">
      <div>
        <div class="mb-6 mt-6 rounded bg-white p-4 px-4 shadow-lg md:p-8">
          <div class="gap grid grid-cols-1 text-sm">
            <div class="lg:col-span-3">
              <div class="md:col-span-2">
                <label>Selecione o modelo</label>
                <select
                  v-model="cod"
                  :disabled="desativar"
                  class="mt-1 h-10 w-full rounded border border-gray-200 bg-gray-50 bg-transparent px-4 text-gray-800 outline-none"
                >
                  <option value="0" disabled selected>Selecione</option>
                  <option v-for="option in options" :key="option.cod" :value="option.cod">
                    {{ option.nome }}
                  </option>
                </select>
              </div>
            </div>
            <!-- <div class="lg:col-span-2 flex items-end justify-center">
                            <button @click="downloadPlanilha" class="ml-2 border border-primary-500 hover:bg-primary-700 text-primary-500 hover:text-white font-bold py-2 px-4 rounded cursor-pointer">
                                Baixar modelo
                            </button>
                        </div> -->
            <div class="mt-3 flex items-center md:col-span-4">
              <button
                @click="downloadPlanilha"
                class="mr-4 cursor-pointer rounded border border-primary-500 px-4 py-2 font-bold text-primary-500 hover:bg-primary-700 hover:text-white"
              >
                <i class="pi pi-download"></i>
                Baixar modelo
              </button>
              <div class="flex">
                <div>
                  <label
                    for="inputarquivos"
                    class="cursor-pointer rounded border border-primary-500 px-4 py-2 font-bold text-primary-500 hover:bg-primary-700 hover:text-white"
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
            <div class="text-right md:col-span-5">
              <div class="inline-flex items-end">
                <button
                  @click="btnImpotar ? importarPlanilha() : null"
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

            <div>
              <ul>
                <li class="list-disc text-red-600" v-for="erro in erros" :key="erro">{{ erro }}</li>
              </ul>
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
