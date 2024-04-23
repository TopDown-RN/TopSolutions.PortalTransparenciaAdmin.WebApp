<script setup>
import { onMounted, ref, computed } from 'vue'
import {
  postArquivos,
  getCategorias,
  getCategoriasAgrupadaAno,
  postCategoria,
  getArquivos,
  postAnoCategoria,
  getAnoCategorias,
  LerArquivoPorIdApi
} from '@/services/arquivos'
import { getMenus } from '@/services/menu'
import { RiEdit2Line, RiArrowLeftFill, RiArrowRightFill } from '@remixicon/vue'
import Dialog from 'primevue/dialog'
import usePagination from '@/utils/pagination'
import Message from 'primevue/message'
import ProgressSpinner from 'primevue/progressspinner'

// Variáveis de uso geral
const categorias = ref([])
const menus = ref([])
const dialogoVisivel = ref(false)
const btnCadastraCat = ref(true)
const erros = ref([])
const btnCadastraArquivo = ref(true)

// Campos para cadastro de Arquivo
const txtDescricao = ref('')
const id_Menu = ref('')
const arquivos = ref([])
const idCategoriaArquivos = ref(0)
const files = ref([])
const ano = ref('')
const idArquivo = ref('') // para update

// Lista de categorias
const categorias_agrupada_por_ano = ref([])
const categorias_filtradas_por_ano = ref([])

//ativar ou desativar botão de dialogo
const btnDialog = ref(false)

// campos para cadastro de categoria
const txtTituloCat = ref('')
const txtDescricaoCat = ref('')

// variáveis de controle de Messages
const success = ref(false)
const error = ref(false)

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

// Paginação
const { currentPage, paginatedItems, nextPage, previousPage, totalPages } = usePagination(
  arquivos,
  10
)

const paginationCat = usePagination(categorias, 10)
const {
  currentPage: currentPageCat,
  paginatedItems: paginatedItemsCat,
  nextPage: nextPageCat,
  previousPage: previousPageCat,
  totalPages: totalPagesCat
} = paginationCat

// --------------------Funções
const anos = computed(() => {
  const anoAtual = new Date().getFullYear()
  const anos = []
  for (let i = 0; i < 10; i++) {
    anos.push(anoAtual - i)
  }
  return anos
})

function mostrarDialogo() {
  dialogoVisivel.value = true
}

function filtrarCategoriasPorAno(ano) {
  const categorias = categorias_agrupada_por_ano.value.filter((item) => item.ano == ano)
  categorias_filtradas_por_ano.value = categorias

  ativarDialog()
}

function ativarDialog() {
  if (ano.value != '' && id_Menu.value != '') {
    btnDialog.value = true
  }
}

function editar(arquivo) {
  idArquivo.value = arquivo.idArquivo
  txtDescricao.value = arquivo.descCategoria
  id_Menu.value = arquivo.idMenu
  idCategoriaArquivos.value = arquivo.idCategoriaPubArquivo
  ano.value = arquivo.anoPub
}

const setarArquivos = (event) => {
  const novosArquivos = Array.from(event.target.files)

  // Verificar se cada arquivo já existe na lista antes de adicioná-lo
  novosArquivos.forEach((arquivo) => {
    const arquivoExiste = files.value.some((item) => item.name === arquivo.name)
    if (!arquivoExiste) {
      files.value.push(arquivo)
    }
  })
}

function deletarArquivoDaLista(arquivo) {
  files.value = files.value.filter((item) => item.name !== arquivo)
}

// async function getBaixarArquivo(idArq){
//   const response = await LerArquivoPorIdApi(idArq)
// }

async function downloadItem(_idarquivo, _nomearquivo) {
  try {
    console.log(_idarquivo)
    const dados = await LerArquivoPorIdApi(_idarquivo)
    const blob = new Blob([dados.data], { type: dados.data.type })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = _nomearquivo
    link.setAttribute('download', '') // Adiciona a propriedade download
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  } catch (erro) {
    console.error('Erro ao obter os arquivos:', erro)
  }
}

// -----------------Requisições POST

async function postSaveArquivos() {
  erros.value = []

  if (txtDescricao.value == '') {
    erros.value.push('Informe a descrição do arquivo')
  }

  if (id_Menu.value == '') {
    erros.value.push('Selecione um menu')
  }

  if (ano.value == '') {
    erros.value.push('Selecione um ano')
  }

  if (idCategoriaArquivos.value == '') {
    erros.value.push('Selecione uma categoria')
  }

  if (files.value.length == 0) {
    erros.value.push('Selecione um arquivo')
  }

  if (erros.value.length > 0) {
    return
  }

  const idAnoCAtPubArq = await getAnoCategorias(idCategoriaArquivos.value, ano.value)

  try {
    btnCadastraArquivo.value = false
    const formData = new FormData()

    formData.append('txtDescricao', txtDescricao.value)
    files.value.forEach((file) => {
      formData.append('Arquivo', file)
    })
    formData.append('idUsuario', 3)
    formData.append('idAnoCatPubArquivo', idAnoCAtPubArq.data.idAnoCatPubArquivo)
    formData.append('anoPub', ano.value)
    formData.append('idMenu', id_Menu.value)
    await postArquivos(formData)
    btnCadastraArquivo.value = true
    mensagemSucesso()
    getArquivosList()
  } catch (error) {
    mensagemErro()
    console.error('erro ao obter os arquivos:', error)
  }
}

async function postCategoriaSave() {
  try {
    erros.value = []

    if (txtTituloCat.value == '') {
      erros.value.push('Informe o título da categoria')
    }

    if (txtDescricaoCat.value == '') {
      erros.value.push('Informe a descrição da categoria')
    }

    if (erros.value.length > 0) {
      return
    }

    btnCadastraCat.value = false
    const dados = {
      txtTitulo: txtTituloCat.value,
      txtDescricao: txtDescricaoCat.value,
      ano: ano.value,
      idMenu: id_Menu.value
    }

    const reponse = await postCategoria(dados)

    categorias.value.unshift(reponse.data)

    btnCadastraCat.value = true
  } catch (error) {
    console.error('erro ao obter os arquivos:', error)
  }
}

async function postAnoCategoriaSave(idCategoria) {
  const dados = {
    idCategoria: idCategoria,
    ano: ano.value
  }

  await postAnoCategoria(dados)
}

// ------------------- Requisições GET
async function getMenusList() {
  const response = await getMenus()
  menus.value = response.data.slice().sort((a, b) => {
    return a.txtDescricao.localeCompare(b.txtDescricao)
  })
}

async function getCategoriasAgrupadas() {
  const response = await getCategoriasAgrupadaAno()
  categorias_agrupada_por_ano.value = response.data
}

async function getCategoriasList() {
  const response = await getCategorias()
  categorias.value = response.data
}

async function getArquivosList() {
  const response = await getArquivos()
  arquivos.value = response.data
}

// ------------------- Ciclo de vida

onMounted(() => {
  getMenusList()
  getCategoriasAgrupadas()
  getArquivosList()
  getCategoriasList()
})
</script>
<template>
  <div class="mx-auto max-w-3xl text-center">
    <h2 class="text2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Arquivos</h2>
    <p class="mt-2 text-lg leading-8 text-gray-600">
      Gerencie aqui os arquivos exibidos ao usuário no Portal da Transparência.
    </p>
    <div class="-mt-2 text-base leading-8 text-gray-600">Mantenha-os sempre atualizados.</div>
  </div>
  <div class="container max-w-screen-base mx-auto">
    <div>
      <div class="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6 mt-6">
        <div>
          <Message severity="success" :sticky="true" :life="2000" v-if="success"
            >Arquivo salvo sucesso</Message
          >
          <Message severity="error" :sticky="true" :life="2000" v-if="error"
            >Erro ao salvar arquivo</Message
          >
        </div>
        <div class="grid gap text-sm grid-cols-1">
          <div class="lg:col-span-2">
            <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5 content-end">
              <div class="md:col-span-5">
                <label for="descricao">Descrição</label>
                <input
                  type="text"
                  id="descricao"
                  class="h-10 bg-gray-50 border border-gray-200 rounded mt-1 px-4 outline-none text-gray-800 w-full bg-transparent"
                  placeholder="Informe uma descrição para o arquivo"
                  v-model.trim="txtDescricao"
                />
              </div>
              <div class="md:col-span-5">
                <label>Menu</label>
                <select
                  class="h-10 bg-gray-50 border border-gray-200 rounded mt-1 px-4 outline-none text-gray-800 w-full bg-transparent"
                  v-model="id_Menu"
                  @change="ativarDialog"
                >
                  <option value="" disabled selected>Selecione</option>
                  <option v-for="menu in menus" :key="menu.idMenu" :value="menu.idMenu">
                    {{ menu.txtDescricao }}
                  </option>
                </select>
              </div>
              <div class="md:col-span-1">
                <label>Ano</label>
                <select
                  v-model="ano"
                  @change="filtrarCategoriasPorAno($event.target.value)"
                  class="h-10 bg-gray-50 border border-gray-200 rounded mt-1 px-4 outline-none text-gray-800 w-full bg-transparent"
                >
                  <option value="" disabled selected>Selecione</option>
                  <option v-for="ano in anos" :key="ano" :value="ano">
                    {{ ano }}
                  </option>
                </select>
              </div>

              <div class="md:col-span-3">
                <label>Categoria</label>
                <select
                  v-model="idCategoriaArquivos"
                  class="h-10 bg-gray-50 border border-gray-200 rounded mt-1 px-4 outline-none text-gray-800 w-full bg-transparent"
                >
                  <option value="0" disabled selected>Selecione</option>

                  <optgroup
                    v-for="dado in categorias_filtradas_por_ano"
                    :label="dado.ano"
                    :key="dado.ano"
                  >
                    <option
                      v-for="cat in dado.categorias"
                      class="p-2"
                      :key="cat.idCategoriaPubArquivo"
                      :value="cat.idCategoriaPubArquivo"
                    >
                      {{ cat.txtTitulo }}
                    </option>
                  </optgroup>
                </select>
              </div>

              <div class="flex flex-col items-start justify-end">
                <button
                  v-bind:disabled="!btnDialog"
                  v-bind:class="{
                    'bg-blue-500 hover:bg-blue-700': btnDialog,
                    'bg-blue-300': !btnDialog
                  }"
                  class="text-white font-bold py-2 px-4 rounded"
                  @click="mostrarDialogo"
                >
                  Mais categorias
                </button>
                <!-- <button v-else class="bg-blue-300 text-white font-bold py-2 px-4 rounded">
                  Mais categorias
                </button> -->
                <Dialog
                  :header="`Cadastrar Categoria para ${ano}`"
                  v-model:visible="dialogoVisivel"
                  modal
                  :style="{ width: '50vw' }"
                  :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
                >
                  <div class="flex items-center justify-center">
                    <h1>Cadastrar categoria para {{ ano }}</h1>
                  </div>

                  <div>
                    <input
                      v-model.trim="txtTituloCat"
                      type="text"
                      placeholder="título"
                      class="h-10 my-2 bg-gray-50 border border-gray-200 rounded mt-1 px-4 outline-none text-black w-full bg-transparent"
                    />
                    <input
                      v-model.trim="txtDescricaoCat"
                      type="text"
                      placeholder="descricao"
                      class="h-10 my-2 bg-gray-50 border border-gray-200 rounded mt-1 px-4 outline-none text-black w-full bg-transparent"
                    />
                    <div class="flex items-center justify-end">
                      <button
                        v-if="btnCadastraCat"
                        class="bg-blue-500 hover:bg-blue-700 mb-4 text-white font-bold py-2 px-4 rounded w-32"
                        @click="postCategoriaSave"
                      >
                        Cadastrar
                      </button>
                      <button
                        v-else
                        class="bg-gray-600 text-white mb-4 font-bold py-2 px-4 rounded h-10 w-32 flex items-center justify-center"
                      >
                        <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
                      </button>
                    </div>
                  </div>
                  <div v-if="erros.length" class="pl-4 pb-4">
                    <ul>
                      <li class="text-red-600 list-disc" v-for="erro in erros" :key="erro">
                        {{ erro }}
                      </li>
                    </ul>
                  </div>

                  <table class="min-w-full bg-white shadow-lg rounded-xl">
                    <thead>
                      <tr class="bg-blue-gray-100 text-gray-700">
                        <th class="py-3 px-4 text-left">Categoria</th>
                        <th class="py-3 px-4 text-left">Ações</th>
                      </tr>
                    </thead>
                    <tbody class="text-black">
                      <tr
                        class="border-b border-blue-gray-200"
                        v-for="cat in paginatedItemsCat"
                        :key="cat.idCategoriaPubArquivo"
                      >
                        <td class="py-3 px-4">{{ cat.txtTitulo }}</td>
                        <td class="py-3 px-4 flex">
                          <button @click="postAnoCategoriaSave(cat.idCategoriaPubArquivo)">
                            <i class="pi pi-plus"></i>
                          </button>
                          <!-- <a href="#" class="text-red-600" title="Excluir">
                          <RiDeleteBin5Line />
                        </a> -->
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="flex items-center justify-center p-2">
                    <button
                      @click="previousPageCat"
                      class="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"
                      :disabled="currentPageCat === 1"
                    >
                      <RiArrowLeftFill></RiArrowLeftFill>
                    </button>
                    <span class="px-5 py-2"
                      >Página {{ currentPageCat }} de {{ totalPagesCat }}</span
                    >
                    <button
                      @click="nextPageCat"
                      class="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"
                      :disabled="currentPageCat === totalPagesCat"
                    >
                      <RiArrowRightFill></RiArrowRightFill>
                    </button>
                  </div>
                </Dialog>
              </div>
              <div class="md:col-span-5 text-right">
                <div class="inline-flex items-end">
                  <button
                    @click="btnCadastraArquivo ? postSaveArquivos() : null"
                    :class="{
                      'bg-blue-500 hover:bg-blue-700': btnCadastraArquivo,
                      'bg-blue-700 cursor-not-allowed': !btnCadastraArquivo
                    }"
                    :disabled="!btnCadastraArquivo"
                    class="text-white font-bold py-2 px-4 rounded h-9 w-24 flex items-center justify-center"
                  >
                    <span v-if="btnCadastraArquivo">Publicar</span>
                    <span v-else>
                      <ProgressSpinner
                        style="width: 20px; height: 20px"
                        strokeWidth="8"
                        aria-label="Custom ProgressSpinner"
                      />
                    </span>
                  </button>
                  <button
                    @click="limpar"
                    class="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-9 w-24 flex items-center justify-center"
                  >
                    Limpar
                  </button>
                </div>
              </div>

              <div class="md:col-span-5 mt-3 flex">
                <div>
                  <label
                    for="inputarquivos"
                    class="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-9 flex items-center justify-center"
                  >
                    <i class="pi pi-upload mr-2"></i>
                    Selecionar arquivos
                  </label>
                  <input
                    id="inputarquivos"
                    hidden
                    type="file"
                    ref="fileInput"
                    multiple
                    @change="setarArquivos"
                  />
                </div>
                <div class="ml-10">
                  <ul class="flex flex-col items-start justify-center">
                    <li v-for="file in files" :key="file.name" class="list-disc">
                      {{ file.name }} <button @click="deletarArquivoDaLista(file.name)">X</button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <ul>
                <li class="text-red-600 list-disc" v-for="erro in erros" :key="erro">{{ erro }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <table class="min-w-full bg-white shadow-md rounded-xl">
        <thead>
          <tr class="bg-blue-gray-100 text-gray-700">
            <th class="py-3 px-4 text-left">Ano</th>
            <th class="py-3 px-4 text-left">Categoria</th>
            <th class="py-3 px-4 text-left">Arquivo</th>
            <th class="py-3 px-4 text-left">Publicado em</th>
            <th class="py-3 px-4 text-left">Ações</th>
          </tr>
        </thead>
        <tbody class="text-blue-gray-900">
          <tr
            v-for="arq in paginatedItems"
            :key="arq.idArquivo"
            class="border-b border-blue-gray-200"
          >
            <td class="py-3 px-4">{{ arq.anoPub }}</td>
            <td class="py-3 px-4">{{ arq.descCategoria }}</td>
            <td class="py-3 px-4">
              <button
                @click="downloadItem(arq.idArquivo, arq.nomeArquivo)"
                class="text-primary-700"
              >
                {{ arq.nomeArquivo }}
              </button>
            </td>
            <td class="py-3 px-4">Sem este campo</td>
            <td class="py-3 px-4 flex">
              <button @click="editar(arq)" class="text-primary-700 pr-2" title="Editar">
                <RiEdit2Line />
              </button>
              <!-- <a href="#" class="text-red-600" title="Excluir">
                <RiDeleteBin5Line />
              </a> -->
            </td>
          </tr>
        </tbody>
      </table>

      <div class="flex items-center justify-center p-2">
        <button
          @click="previousPage"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"
          :disabled="currentPage === 1"
        >
          <RiArrowLeftFill></RiArrowLeftFill>
        </button>
        <span class="px-5 py-2">Página {{ currentPage }} de {{ totalPages }}</span>
        <button
          @click="nextPage"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"
          :disabled="currentPage === totalPages"
        >
          <RiArrowRightFill></RiArrowRightFill>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
