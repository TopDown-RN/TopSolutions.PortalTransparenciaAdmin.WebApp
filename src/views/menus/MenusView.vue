<script setup>
import { ref, onMounted, watch } from 'vue'
import { getMenus, postMenu } from '@/services/menu'
import { truncateNoFim } from '@/utils/truncateString'
import Message from 'primevue/message'
import ProgressSpinner from 'primevue/progressspinner'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { FilterMatchMode } from 'primevue/api'
import HeadingComponent from '@/components/HeadingComponent.vue'

const btnCadastraMenu = ref(true)
const erros = ref([])

// Campos de cadastro de arquivo
const idArquivo = ref(0)
const txtDescricao = ref('')
const txtDescricaoGeral = ref('')
const txtUrl = ref('')
const blnAtivo = ref(false)
const blnArquivo = ref(false)
const blnPopUp = ref(false)
const locais = ref([])
const idMenuPai = ref(0)
const txtFiltro = ref('') // sem campo na tela ainda

// Campos de listagem de menus
const menus = ref([])

// variáveis de controle de Messages
const success = ref(false)
const error = ref(false)

const loading = ref(true)

// Locais com valores de acordo com o banco "Estático"
const locais_load = [
  { valor: 1, descricao: 'Header' },
  { valor: 2, descricao: 'Nav' },
  { valor: 3, descricao: 'Body' },
  { valor: 4, descricao: 'Footer' },
  { valor: 5, descricao: 'Custom' }
]

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
})

// Watcher para atualizar a URL do menu quando a opção "Arquivo" é marcada
watch(blnArquivo, (newVal) => {
  if (newVal && !txtUrl.value.startsWith('/arquivos/')) {
    txtUrl.value = `/arquivos/${txtUrl.value}`
  } else if (!newVal && txtUrl.value.startsWith('/arquivos/')) {
    txtUrl.value = txtUrl.value.replace('/arquivos/', '')
  }
})

// Watcher para desativar uma opção quando a outra é ativada
watch(blnArquivo, (newVal) => {
  if (newVal) {
    blnPopUp.value = false // Desativa Pop-Up se Arquivo é ativado
  }
})

watch(blnPopUp, (newVal) => {
  if (newVal) {
    blnArquivo.value = false // Desativa Arquivo se Pop-Up é ativado
  }
})

// ---------------------  Funções gerais
// const menusSorted = computed(() => {
//   return menus.value.slice().sort((a, b) => {
//     return a.txtDescricao.localeCompare(b.txtDescricao)
//   })
// })

function limpar() {
  idArquivo.value = 0
  txtDescricao.value = ''
  txtDescricaoGeral.value = ''
  txtUrl.value = ''
  blnAtivo.value = ''
  blnArquivo.value = ''
  blnPopUp.value = ''
  locais.value = []
  idMenuPai.value = ''
  txtFiltro.value = ''
}

function editar(menu) {
  idArquivo.value = menu.idMenu
  txtDescricao.value = menu.txtDescricao
  txtDescricaoGeral.value = menu.txtDescricaoGeral
  txtUrl.value = menu.txtUrl
  blnAtivo.value = menu.blnAtivo
  blnArquivo.value = menu.blnArquivo
  blnPopUp.value = menu.blnPopUp
  idMenuPai.value = menu.idMenuPai
  txtFiltro.value = menu.txtFiltro
  locais.value = menu.locais
}

// ------------------- Paginação
// const paginationMenus = usePagination(menus, 10)

// const {
//   currentPage: currentPageMenu,
//   paginatedItems: paginatedItemsMenu,
//   nextPage: nextPageMenu,
//   previousPage: previousPageMenu,
//   totalPages: totalPagesMenu
// } = paginationMenus

// -------------------- Função para controle de messages
function mensagemSucesso() {
  success.value = true
  setTimeout(() => {
    success.value = false
  }, 2000)
}

function mensagemErro() {
  error.value = true
  setTimeout(() => {
    error.value = false
  }, 2000)
}

// ------------------------- Metódos GET
async function getMenusList() {
  loading.value = true
  const response = await getMenus()
  menus.value = response.data
  //console.log(menus.value)
  loading.value = false
}

// ------------------------ Métodos POST
async function postGravarMenu() {
  if (!validaCampos()) {
    return
  }

  try {
    btnCadastraMenu.value = false
    const locaisSelecionados = locais.value.map((local) => parseInt(local))
    const menu = {
      idMenu: idArquivo.value,
      txtDescricao: txtDescricao.value,
      txtDescricaoGeral: txtDescricaoGeral.value,
      txtUrl: txtUrl.value,
      blnAtivo: blnAtivo.value,
      blnArquivo: blnArquivo.value,
      blnPopUp: blnPopUp.value,
      locais: locaisSelecionados,
      idMenuPai: idMenuPai.value,
      txtFiltro: txtFiltro.value
    }

    await postMenu(menu)

    getMenusList()
    mensagemSucesso()
    limpar()
    btnCadastraMenu.value = true
  } catch (error) {
    mensagemErro()
  }
}

// Validação de campos

function validaCampos() {
  erros.value = []
  if (!txtDescricao.value) {
    erros.value.push('Nome do menu é obrigatório')
  }

  if (!txtDescricaoGeral.value) {
    erros.value.push('Descrição do menu é obrigatório')
  }

  // if (!txtUrl.value) {
  //   erros.value.push('Url do menu é obrigatório')
  // }

  if (!locais.value.length) {
    erros.value.push('Informe ao menos um local para o menu')
  }

  if (erros.value.length) {
    return false
  }

  return true
}

onMounted(() => {
  getMenusList()
})
</script>

<template>
  <div id="gridMenu">
    <HeadingComponent
      title="Menus"
      subtitle="Gerencie aqui os menus exibidos ao usuário no Portal da Transparência."
      description="Mantenha-os sempre atualizados."
    />
  </div>
  <div class="max-w-screen-base container overflow-x-auto">
    <div>
      <div
        class="mb-6 mt-6 rounded border bg-white p-4 px-4 shadow-lg md:p-8 dark:border-white/20 dark:bg-surface-800 dark:text-white/80"
      >
        <div>
          <Message severity="success" :sticky="true" :life="2000" v-if="success"
            >Menu salvo com sucesso</Message
          >
          <Message severity="error" :sticky="true" :life="2000" v-if="error"
            >Erro ao cadastrar Menu</Message
          >
        </div>
        <div class="gap grid grid-cols-1 text-sm">
          <div class="lg:col-span-2">
            <div class="grid grid-cols-1 content-end gap-4 gap-y-2 text-sm md:grid-cols-5">
              <div class="md:col-span-5">
                <label>Nome do menu</label>
                <input
                  v-model="txtDescricao"
                  type="text"
                  name="nomemenu"
                  id="nomemenu"
                  class="mt-1 h-10 w-full rounded border bg-transparent px-4"
                  placeholder="Digite o nome que deseja dar ao menu, ex: Receita, Despesa..."
                />
              </div>
              <div class="md:col-span-5">
                <label>Descrição do menu</label>
                <input
                  v-model="txtDescricaoGeral"
                  type="text"
                  name="descricaomenu"
                  id="descricaomenu"
                  class="mt-1 h-20 w-full rounded border bg-transparent px-4"
                  placeholder="Digite uma breve descrição para o menu que está criando, isso ajudará o usuário que está consultando o Portal"
                />
              </div>
              <div class="md:col-span-5">
                <label>Url do menu</label>
                <input
                  v-model="txtUrl"
                  type="text"
                  name="urlmenu"
                  id="urlmenu"
                  class="mt-1 h-10 w-full rounded border bg-transparent px-4"
                  placeholder="Digite a url do menu. Ex: /receita"
                />
              </div>

              <div class="md:col-span-5">
                <label>Configurações</label>
                <div class="mt-2 grid grid-cols-4 gap-x-4">
                  <div class="col-span-1 flex items-center">
                    <input
                      v-model="blnAtivo"
                      type="checkbox"
                      name="ativo"
                      id="ativo"
                      class="mr-2"
                    />
                    <label for="ativo">Ativo</label>
                  </div>
                  <div class="col-span-1 flex items-center">
                    <input
                      v-model="blnArquivo"
                      type="checkbox"
                      name="arquivo"
                      id="arquivo"
                      class="mr-2"
                    />
                    <label for="arquivo">Arquivo</label>
                  </div>
                  <div class="col-span-1 flex items-center">
                    <input
                      v-model="blnPopUp"
                      type="checkbox"
                      name="popup"
                      id="popup"
                      class="mr-2"
                    />
                    <label for="popup">Pop-Up</label>
                  </div>
                  <!-- <div class="flex items-center col-span-1">
                    <input type="checkbox" name="novapagina" id="novapagina" class="mr-2" />
                    <label for="novapagina">Nova Página</label>
                  </div> -->
                </div>
              </div>

              <div class="md:col-span-5">
                <label>É submenu de outro ítem?</label>
                <select
                  v-model="idMenuPai"
                  class="mt-1 h-10 w-full rounded border bg-transparent px-4"
                >
                  <option value="0">Selecione</option>
                  <option v-for="menu in menus" :key="menu.idMenu" :value="menu.idMenu">
                    {{ menu.txtDescricao }}
                  </option>
                </select>
              </div>

              <div class="md:col-span-5">
                <label>Local do Menu</label>
                <div class="mt-2 grid grid-cols-5 gap-x-4">
                  <div
                    v-for="item in locais_load"
                    :key="item.valor"
                    class="col-span-1 flex items-center"
                  >
                    <input
                      v-model="locais"
                      :value="item.valor"
                      type="checkbox"
                      name="menuLocal"
                      :id="item.valor"
                      class="mr-2"
                    />
                    <label :for="item.valor">{{ item.descricao }}</label>
                  </div>
                </div>
              </div>

              <div class="text-right md:col-span-5">
                <div class="inline-flex items-end">
                  <div class="mr-2">
                    <!-- <button
                      @click="postGravarMenu"
                      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Gravar
                    </button> -->
                    <button
                      @click="btnCadastraMenu ? postGravarMenu() : null"
                      :class="{
                        'bg-primary-500 hover:bg-primary-700': btnCadastraMenu,
                        'cursor-not-allowed bg-primary-700': !btnCadastraMenu
                      }"
                      :disabled="!btnCadastraMenu"
                      class="flex h-9 w-24 items-center justify-center rounded px-4 py-2 font-bold text-white"
                    >
                      <span v-if="btnCadastraMenu">Gravar</span>
                      <span v-else>
                        <ProgressSpinner
                          style="width: 20px; height: 20px"
                          strokeWidth="8"
                          aria-label="Custom ProgressSpinner"
                        />
                      </span>
                    </button>
                  </div>
                  <div>
                    <button
                      @click="limpar"
                      class="rounded border border-primary-500 px-4 py-2 font-bold text-primary-500 hover:bg-primary-700 hover:text-white"
                    >
                      Limpar
                    </button>
                  </div>
                </div>
              </div>

              <div class="text-right md:col-span-5">
                <ul>
                  <li class="list-disc text-red-600" v-for="erro in erros" :key="erro">
                    {{ erro }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- <div class="border bg-white rounded p-2 px-3 mt-6 mb-2">
        <input type="text" placeholder="Buscar Menu" class="outline-0 w-full h-full" >
      </div> -->

      <div v-if="loading" class="my-4 text-center">
        <ProgressSpinner />
      </div>
      <div v-if="!loading" class="relative overflow-x-auto rounded-lg border dark:border-white/20">
        <DataTable
          :value="menus"
          v-model:filters="filters"
          size="small"
          :paginator="true"
          :rows="5"
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
          <Column field="txtDescricao" header="Menu"></Column>
          <Column field="txtUrl" header="URL">
            <template #body="rowData">
              {{ truncateNoFim(rowData.data.txtUrl, 30) }}
            </template>
          </Column>
          <Column header="Local">
            <template #body="rowData">
              {{
                rowData.data.locais
                  .map((local) => locais_load.find((item) => item.valor === local)?.descricao)
                  .join(', ')
              }}
            </template>
          </Column>
          <Column field="blnAtivo" header="Ativo">
            <template #body="rowData">
              {{ rowData.data.blnAtivo ? 'Sim' : 'Não' }}
            </template>
          </Column>
          <Column header="Ações">
            <template #body="rowData">
              <a href="#gridMenu">
                <Button
                  icon="pi pi-pencil"
                  size="small"
                  outlined
                  rounded
                  @click="editar(rowData.data)"
                  class="text-primary-700"
                  title="Editar"
                />
              </a>
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<style></style>
