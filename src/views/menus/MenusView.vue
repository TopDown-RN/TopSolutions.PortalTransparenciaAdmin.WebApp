<script setup>
import { ref, onMounted, computed } from 'vue'
import { getMenus, postMenu } from '@/services/menu'
import { RiEdit2Line, RiArrowLeftFill, RiArrowRightFill } from '@remixicon/vue'
import usePagination from '@/utils/pagination'
import { truncateUrl } from '@/utils/truncateString'
import Message from 'primevue/message'
import ProgressSpinner from 'primevue/progressspinner'

const btnCadastraMenu = ref(true)

// Campos de cadastrp de arquivo
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

// Locais com valores de acordo com o banco "Estático"
const locais_load = [
  { valor: 1, descricao: 'Header' },
  { valor: 2, descricao: 'Nav' },
  { valor: 3, descricao: 'Body' },
  { valor: 4, descricao: 'Footer' },
  { valor: 5, descricao: 'Custom' }
]

// ---------------------  Funções gerais
const menusSorted = computed(() => {
  return menus.value.slice().sort((a, b) => {
    return a.txtDescricao.localeCompare(b.txtDescricao)
  })
})

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
const paginationMenus = usePagination(menus, 10)

const {
  currentPage: currentPageMenu,
  paginatedItems: paginatedItemsMenu,
  nextPage: nextPageMenu,
  previousPage: previousPageMenu,
  totalPages: totalPagesMenu
} = paginationMenus

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
  const response = await getMenus()
  menus.value = response.data.reverse()
}

// ------------------------ Métodos POST
async function postGravarMenu() {
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

onMounted(() => {
  getMenusList()
})
</script>

<template>
  <div class="mx-auto max-w-3xl text-center">
    <h2 class="text2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Menus</h2>
    <p class="mt-2 text-lg leading-8 text-gray-600">
      Gerencie aqui os menus exibidos ao usuário no Portal da Transparência.
    </p>
    <div class="-mt-2 text-base leading-8 text-gray-600">Mantenha-os sempre atualizados.</div>
  </div>
  <div class="container max-w-screen-base mx-auto">
    <div>
      <div class="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6 mt-6">
        <div>
          <Message severity="success" :sticky="true" :life="2000" v-if="success"
            >Menu salvo sucesso</Message
          >
          <Message severity="error" :sticky="true" :life="2000" v-if="error"
            >Erro ao cadastrar Menu</Message
          >
        </div>
        <div class="grid gap text-sm grid-cols-1">
          <div class="lg:col-span-2">
            <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5 content-end">
              <div class="md:col-span-5">
                <label>Nome do menu</label>
                <input
                  v-model="txtDescricao"
                  type="text"
                  name="nomemenu"
                  id="nomemenu"
                  class="h-10 border mt-1 rounded px-4 w-full bg-transparent"
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
                  class="h-20 border mt-1 rounded px-4 w-full bg-transparent"
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
                  class="h-10 border mt-1 rounded px-4 w-full bg-transparent"
                  placeholder="Digite a url do menu. Ex: /receita"
                />
              </div>

              <div class="md:col-span-5">
                <label>Configurações</label>
                <div class="grid grid-cols-4 gap-x-4 mt-2">
                  <div class="flex items-center col-span-1">
                    <input
                      v-model="blnAtivo"
                      type="checkbox"
                      name="ativo"
                      id="ativo"
                      class="mr-2"
                    />
                    <label for="ativo">Ativo</label>
                  </div>
                  <div class="flex items-center col-span-1">
                    <input
                      v-model="blnArquivo"
                      type="checkbox"
                      name="arquivo"
                      id="arquivo"
                      class="mr-2"
                    />
                    <label for="arquivo">Arquivo</label>
                  </div>
                  <div class="flex items-center col-span-1">
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
                  class="h-10 border mt-1 rounded px-4 w-full bg-transparent"
                >
                  <option value="0">Selecione</option>
                  <option v-for="menu in menusSorted" :key="menu.idMenu" :value="menu.idMenu">
                    {{ menu.txtDescricao }}
                  </option>
                </select>
              </div>

              <div class="md:col-span-5">
                <label>Local do Menu</label>
                <div class="grid grid-cols-5 gap-x-4 mt-2">
                  <div
                    v-for="item in locais_load"
                    :key="item.valor"
                    class="flex items-center col-span-1"
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

              <div class="md:col-span-5 text-right">
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
                        'bg-blue-500 hover:bg-blue-700': btnCadastraMenu,
                        'bg-blue-700 cursor-not-allowed': !btnCadastraMenu
                      }"
                      :disabled="!btnCadastraMenu"
                      class="text-white font-bold py-2 px-4 rounded h-9 w-24 flex items-center justify-center"
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
                      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Limpar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <table class="min-w-full bg-white shadow-md rounded-xl">
        <thead>
          <tr class="bg-blue-gray-100 text-gray-700">
            <th class="py-3 px-4 text-left">Menu</th>
            <th class="py-3 px-4 text-left">URL</th>
            <th class="py-3 px-4 text-left">Local</th>
            <th class="py-3 px-4 text-left">Ações</th>
          </tr>
        </thead>
        <tbody class="text-blue-gray-900">
          <tr
            v-for="menu in paginatedItemsMenu"
            :key="menu.idMenu"
            class="border-b border-blue-gray-200"
          >
            <td class="py-3 px-4">{{ menu.txtDescricao }}</td>
            <td class="py-3 px-4">
              <a :href="menu.txtUrl" v-text="truncateUrl(menu.txtUrl, 30)"></a>
            </td>

            <td class="py-3 px-4">
              <span v-for="(local, index) in menu.locais" :key="index">
                {{ locais_load.find((item) => item.valor === local).descricao }}
                <template v-if="index !== menu.locais.length - 1"> </template>
              </span>
            </td>
            <td class="py-3 px-4 flex">
              <button @click="editar(menu)" class="text-primary-700 pr-2" title="Editar">
                <RiEdit2Line />
              </button>
              <!-- <button class="text-red-600">
                <RiDeleteBin5Line />
              </button> -->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="flex items-center justify-center p-2">
      <button
        @click="previousPageMenu"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"
        :disabled="currentPageMenu === 1"
      >
        <RiArrowLeftFill></RiArrowLeftFill>
      </button>
      <span class="px-5 py-2">Página {{ currentPageMenu }} de {{ totalPagesMenu }}</span>
      <button
        @click="nextPageMenu"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"
        :disabled="currentPageMenu === totalPagesMenu"
      >
        <RiArrowRightFill></RiArrowRightFill>
      </button>
    </div>
  </div>
</template>

<style></style>
