<script setup>
import { onMounted, ref, computed, watch } from 'vue'
import {
  postArquivos,
  getCategorias,
  //getCategoriasAgrupadaAno,
  postCategoria,
  getArquivos,
  deleteArquivo,
  //postAnoCategoria,
  //getAnoCategorias,
  deleteCategoria,
  LerArquivoPorIdApi
} from '@/services/arquivos'
import { getMenusArquivo } from '@/services/menu'
import { RiArrowLeftFill, RiArrowRightFill, RiPencilLine, RiDeleteBinLine } from '@remixicon/vue'
import Dialog from 'primevue/dialog'
import usePagination from '@/utils/pagination'
import Message from 'primevue/message'
import ProgressSpinner from 'primevue/progressspinner'
import ConfirmDialog from 'primevue/confirmdialog'
import { useConfirm } from 'primevue/useconfirm'
import { truncateNoMeio } from '@/utils/truncateString'
import HeadingComponent from '@/components/HeadingComponent.vue'

const confirm = useConfirm()

//  const handleRemoveThing = () => {
//      // bye
//  };

// const onRemoveThing = () => {
//     confirm.require({
//         message: 'Are you sure you want to remove some thing?',
//         header: 'Remove Thing',
//         icon: 'icon-delete',
//         rejectLabel: 'Cancel',
//         acceptLabel: 'Remove',
//         acceptClass: 'p-button-danger',
//         accept: handleRemoveThing,
//     });
// };

const loading = ref(true)

// Variáveis de uso geral
const categorias = ref([])
const menus = ref([])
const dialogoVisivel = ref(false)
//const btnCadastraCat = ref(true)
const erros = ref([])
const btnCadastraArquivo = ref(true)
const arquivosListOriginal = ref([])

// Campos para cadastro de Arquivo
const txtDescricao = ref('')
const id_Menu = ref('')
const arquivos = ref([])
const idCategoriaArquivos = ref('')
const files = ref([])
const ano = ref('')
const idArquivo = ref('') // para update

// Lista de categorias
//const categorias_agrupada_por_ano = ref([])
//const categorias_filtradas_por_ano = ref([])

//ativar ou desativar botão de dialogo
const btnDialog = ref(false)
//const ddlCategorias = ref(false)

// campos para cadastro de categoria
const idCategoriaPubArquivoCat = ref(0)
const txtTituloCat = ref('')
const txtDescricaoCat = ref('')

// variáveis de controle de Messages
const success = ref(false)
const error = ref(false)

// -------------------- Função para controle de mensagens
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
  const listaMenuIds = [35, 59, 107]
  let qtdAnos = 20
  let anoAtual = new Date().getFullYear()

  if (listaMenuIds.includes(id_Menu.value)) {
    anoAtual = new Date().getFullYear() + 1
    qtdAnos = 21
  }

  const anos = []
  for (let i = 0; i < qtdAnos; i++) {
    anos.push(anoAtual - i)
  }
  return anos
})

function mostrarDialogo() {
  dialogoVisivel.value = true
}

const msgDeleteCat = ref({})

async function excluirCategoria(idCategoria) {
  console.log('idCategoria', idCategoria)
  const response = await deleteCategoria(idCategoria)

  const status = response.metadata.statusCode

  if (status == 200) {
    msgDeleteCat.value.msg = response.data
    msgDeleteCat.value.severity = 'success'
    msgDeleteCat.value.sticky = true
    setTimeout(() => {
      msgDeleteCat.value.sticky = false
    }, 5000)
  } else {
    msgDeleteCat.value.msg = response.data
    msgDeleteCat.value.severity = 'error'
    msgDeleteCat.value.sticky = true
    setTimeout(() => {
      msgDeleteCat.value.sticky = false
    }, 5000)
  }

  console.log('msgDeleteCat', msgDeleteCat.value)

  getCategoriasList()
}

{
  /* <Message severity="error" :sticky="true" :life="2000" v-if="error"
                    >Erro ao cadastrar categoria</Message
                  > */
}

// function filtrarCategoriasPorAno(ano) {
//   getCategoriasAgrupadas(ano, id_Menu.value)
//   //const categorias = getCategoriasAgrupadas(ano)//categorias_agrupada_por_ano.value;//.filter((item) => item.ano == ano)
//   //categorias_filtradas_por_ano.value = categorias_agrupada_por_ano.value

//   ativarDialog()
// }

function ativarDialog() {
  if (ano.value != '' && id_Menu.value != '') {
    btnDialog.value = true
    //ddlCategorias.value = true
  }
}

async function editar(arquivo) {
  idArquivo.value = arquivo.idArquivo
  txtDescricao.value = arquivo.descArquivo
  id_Menu.value = arquivo.idMenu
  idCategoriaArquivos.value = arquivo.idCategoriaPubArquivo
  ano.value = arquivo.anoPub

  const response = await LerArquivoPorIdApi(arquivo.idArquivo)
  console.log(response.data)
}

async function excluir(arquivo) {
  console.log(arquivo.idArquivo)

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
      await deleteArquivo(arquivo.idArquivo)
      await getArquivosList()
      filtrarArquivos()
    },
    reject: () => {
      // toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    }
  })
}

const setarArquivos = (event) => {
  const novosArquivos = Array.from(event.target.files)

  // Verificar se cada arquivo já existe na lista antes de adicioná-lo
  novosArquivos.forEach((novoArquivo) => {
    const arquivoExiste = files.value.some(
      (item) =>
        item.name === novoArquivo.name &&
        item.lastModified === novoArquivo.lastModified &&
        item.size === novoArquivo.size
    )
    if (!arquivoExiste) {
      files.value.push(novoArquivo)
    }
  })

  // Limpar valor do input de arquivo para permitir a seleção do mesmo arquivo novamente
  event.target.value = ''
}

function deletarArquivoDaLista(nomeDoArquivo) {
  files.value = files.value.filter((item) => item.name !== nomeDoArquivo)
}

function LimparForm() {
  txtDescricao.value = ''
}

function formatDate(dateTimeString) {
  const date = new Date(dateTimeString)

  // Format the date as "dd/MM/yyyy"
  const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`

  return formattedDate
}

async function downloadItem(_idarquivo, _nomearquivo) {
  try {
    //console.log(_idarquivo)
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

  // if (txtDescricao.value == '') {
  //   erros.value.push('Informe a descrição do arquivo')
  // }

  if (id_Menu.value == '') {
    erros.value.push('Selecione um menu')
  }

  if (ano.value == '') {
    erros.value.push('Selecione um ano')
  }

  if (idCategoriaArquivos.value == '') {
    erros.value.push('Selecione uma categoria')
  }

  if (files.value.length == 0 && idCategoriaArquivos.value == '') {
    erros.value.push('Selecione um arquivo')
  }

  if (erros.value.length > 0) {
    return
  }

  //const idAnoCAtPubArq = await getAnoCategorias(idCategoriaArquivos.value, ano.value)

  try {
    btnCadastraArquivo.value = false
    const formData = new FormData()

    formData.append('txtDescricao', txtDescricao.value)
    files.value.forEach((file) => {
      formData.append('Arquivo', file)
    })
    formData.append('idUsuario', 3)
    formData.append('Ano', ano.value)
    formData.append('idCategoria', idCategoriaArquivos.value)
    //formData.append('idAnoCatPubArquivo', idAnoCAtPubArq.data.idAnoCatPubArquivo)
    formData.append('anoPub', ano.value)
    formData.append('idMenu', id_Menu.value)
    await postArquivos(formData)
    LimparForm()
    btnCadastraArquivo.value = true
    mensagemSucesso()
    await getArquivosList()
    filtrarArquivos()
    files.value = []
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

    const dados = {
      idCategoriaPubArquivo: idCategoriaPubArquivoCat.value,
      txtTitulo: txtTituloCat.value,
      txtDescricao: txtDescricaoCat.value
    }

    console.log(dados)

    const reponse = await postCategoria(dados)

    idCategoriaArquivos.value = reponse.data.idCategoriaPubArquivo
    await getCategoriasList()
    mensagemSucesso()
  } catch (error) {
    mensagemErro()
    console.error('erro ao obter os arquivos:', error)
  }
}

// ------------------- Requisições GET
async function getMenusList() {
  const response = await getMenusArquivo()
  menus.value = response.data.slice().sort((a, b) => {
    return a.txtDescricao.localeCompare(b.txtDescricao)
  })
}

watch(ano, async () => {
  filtrarArquivos()
})

watch(idCategoriaArquivos, async () => {
  filtrarArquivos()
})

watch(id_Menu, async () => {
  filtrarArquivos()
})

function filtrarArquivos() {
  const filtros = {
    anoPub: ano.value,
    idCategoriaPubArquivo: idCategoriaArquivos.value,
    idMenu: id_Menu.value
  }

  arquivos.value = arquivosListOriginal.value.filter((item) => {
    for (const key in filtros) {
      if (filtros[key] !== '' && item[key] !== filtros[key]) {
        return false
      }
    }
    return true
  })
  currentPage.value = 1
}

async function getCategoriasList() {
  const response = await getCategorias()
  categorias.value = response.data
}

async function getArquivosList() {
  loading.value = true
  const response = await getArquivos()
  arquivos.value = response.data
  arquivosListOriginal.value = response.data
  loading.value = false
}

// ------------------- Ciclo de vida

onMounted(() => {
  getMenusList()
  getArquivosList()
  getCategoriasList()
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
  <HeadingComponent
    title="Arquivos"
    subtitle="Gerencie aqui os arquivos exibidos ao usuário no Portal da Transparência."
    description="Mantenha-os sempre atualizados."
  />
  <div class="max-w-screen-base container overflow-x-auto">
    <div>
      <div class="mb-6 mt-6 rounded border bg-white p-4 px-4 shadow-lg md:p-8">
        <div>
          <Message severity="success" :sticky="true" :life="2000" v-if="success"
            >Arquivo salvo com sucesso</Message
          >
          <Message severity="error" :sticky="true" :life="2000" v-if="error"
            >Erro ao salvar arquivo</Message
          >
        </div>
        <div class="gap grid grid-cols-1 text-sm">
          <div class="lg:col-span-2">
            <div class="grid grid-cols-1 content-end gap-4 gap-y-2 text-sm md:grid-cols-5">
              <div class="md:col-span-5">
                <label for="descricao">Descrição</label>
                <input
                  type="text"
                  id="descricao"
                  class="mt-1 h-10 w-full rounded border border-gray-200 bg-gray-50 bg-transparent px-4 text-gray-800 outline-none"
                  placeholder="Informe uma descrição para o arquivo"
                  v-model.trim="txtDescricao"
                />
              </div>

              <div class="md:col-span-5">
                <label for="ddMenu" class="block text-sm font-medium leading-6 text-gray-900"
                  >Menu</label
                >
                <div>
                  <select
                    name="ddMenu"
                    class="mt-1 h-10 rounded border border-gray-200 bg-gray-50 bg-transparent px-4 text-gray-800 outline-none"
                    v-model="id_Menu"
                    @change="ativarDialog"
                  >
                    <option value="" disabled selected>Selecione</option>
                    <option v-for="menu in menus" :key="menu.idMenu" :value="menu.idMenu">
                      {{ menu.txtDescricao }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="md:col-span-1">
                <label>Ano</label>
                <select
                  v-model="ano"
                  class="mt-1 h-10 w-full rounded border border-gray-200 bg-gray-50 bg-transparent px-4 text-gray-800 outline-none"
                >
                  <option value="" disabled selected>Selecione</option>
                  <!-- <option value="1900">Listagem Geral de Arquivos</option> -->
                  <option v-for="ano in anos" :key="ano" :value="ano">
                    {{ ano }}
                  </option>
                </select>
              </div>

              <div class="md:col-span-3">
                <label>Categoria</label>
                <select
                  v-model="idCategoriaArquivos"
                  class="mt-1 h-10 w-full rounded border border-gray-200 bg-gray-50 bg-transparent px-4 text-gray-800 outline-none"
                >
                  <option value="" disabled selected>Selecione</option>
                  <option
                    v-for="cat in categorias"
                    class="p-2"
                    :key="cat.idCategoriaPubArquivo"
                    :value="cat.idCategoriaPubArquivo"
                  >
                    {{ cat.txtTitulo }}
                  </option>
                </select>
              </div>

              <div class="flex flex-col items-start justify-end">
                <button
                  class="h-10 rounded border border-primary-500 px-4 py-2 text-primary-500 hover:bg-primary-700 hover:text-white"
                  @click="mostrarDialogo"
                >
                  Mais categorias
                </button>
                <!-- <button v-else class="bg-blue-300 text-white font-bold py-2 px-4 rounded">
                  Mais categorias
                </button> -->
                <Dialog
                  header="Cadastrar Categoria"
                  v-model:visible="dialogoVisivel"
                  modal
                  :style="{ width: '50vw' }"
                  :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
                >
                  <div class="flex items-center justify-center">
                    <h1>Cadastrar categoria para</h1>
                  </div>
                  <Message severity="success" :sticky="true" :life="2000" v-if="success"
                    >Categoria cadastrada sucesso</Message
                  >
                  <Message severity="error" :sticky="true" :life="2000" v-if="error"
                    >Erro ao cadastrar categoria</Message
                  >

                  <Message
                    :severity="msgDeleteCat.severity"
                    :sticky="msgDeleteCat.sticky"
                    :life="2000"
                    v-if="msgDeleteCat.sticky"
                    >{{ msgDeleteCat.msg }}</Message
                  >

                  <div>
                    <input
                      v-model.trim="txtTituloCat"
                      type="text"
                      placeholder="título"
                      class="my-2 mt-1 h-10 w-full rounded border border-gray-200 bg-gray-50 bg-transparent px-4 text-black outline-none"
                    />
                    <input
                      v-model.trim="txtDescricaoCat"
                      type="text"
                      placeholder="descricao"
                      class="my-2 mt-1 h-10 w-full rounded border border-gray-200 bg-gray-50 bg-transparent px-4 text-black outline-none"
                    />
                    <div class="flex items-center justify-end">
                      <button
                        class="mb-4 w-32 rounded bg-primary-500 px-4 py-2 font-bold text-white hover:bg-primary-700"
                        @click="postCategoriaSave"
                      >
                        Cadastrar
                      </button>
                      <button
                        class="mb-4 ml-1 w-32 rounded border border-primary-500 px-4 py-2 font-bold text-primary-500 hover:bg-primary-400 hover:text-white"
                        @click="
                          (idCategoriaPubArquivoCat = 0),
                            (txtTituloCat = ''),
                            (txtDescricaoCat = '')
                        "
                      >
                        Limpar
                      </button>
                    </div>
                  </div>
                  <div v-if="erros.length" class="pb-4 pl-4">
                    <ul>
                      <li class="list-disc text-red-600" v-for="erro in erros" :key="erro">
                        {{ erro }}
                      </li>
                    </ul>
                  </div>

                  <table class="min-w-full rounded-xl bg-white shadow-lg">
                    <thead>
                      <tr class="bg-blue-gray-100 text-gray-700">
                        <th class="px-4 py-3 text-left">Categoria</th>
                        <th class="px-4 py-3 text-left">Ações</th>
                      </tr>
                    </thead>
                    <tbody class="text-black">
                      <tr
                        class="border-blue-gray-200 border-b"
                        v-for="cat in paginatedItemsCat"
                        :key="cat.idCategoriaPubArquivo"
                      >
                        <td class="px-4 py-3">{{ cat.txtTitulo }}</td>
                        <td class="flex px-4 py-3">
                          <button
                            @click="
                              (idCategoriaPubArquivoCat = cat.idCategoriaPubArquivo),
                                (txtDescricaoCat = cat.txtDescricao),
                                (txtTituloCat = cat.txtTitulo)
                            "
                            class="pr-2 text-primary-700"
                            v-tooltip.top="'Editar'"
                          >
                            <RiPencilLine />
                          </button>
                          <button
                            @click="excluirCategoria(cat.idCategoriaPubArquivo)"
                            class="pr-2 text-red-500"
                            title="Excluir"
                            v-tooltip.top="'Excluir'"
                          >
                            <RiDeleteBinLine />
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="flex items-center justify-center p-2">
                    <button
                      @click="previousPageCat"
                      class="rounded bg-blue-500 font-bold text-white hover:bg-blue-700"
                      :disabled="currentPageCat === 1"
                    >
                      <RiArrowLeftFill></RiArrowLeftFill>
                    </button>
                    <span class="px-5 py-2"
                      >Página {{ currentPageCat }} de {{ totalPagesCat }}</span
                    >
                    <button
                      @click="nextPageCat"
                      class="rounded bg-blue-500 font-bold text-white hover:bg-blue-700"
                      :disabled="currentPageCat === totalPagesCat"
                    >
                      <RiArrowRightFill></RiArrowRightFill>
                    </button>
                  </div>
                </Dialog>
              </div>
              <div class="mt-3 flex md:col-span-5">
                <div>
                  <label
                    for="inputarquivos"
                    class="flex h-9 cursor-pointer items-center justify-center rounded border border-primary-500 px-4 py-2 text-primary-500 hover:bg-primary-700 hover:text-white"
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
                      {{ file.name }}
                      <button
                        class="text-red-500"
                        @click="deletarArquivoDaLista(file.name)"
                        v-tooltip="'Remover'"
                      >
                        <i class="pi pi-times-circle" style="font-size: 1.2rem"></i>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="text-right md:col-span-5">
                <div class="inline-flex items-end">
                  <button
                    @click="btnCadastraArquivo ? postSaveArquivos() : null"
                    :class="{
                      'bg-primary-500 hover:bg-primary-700': btnCadastraArquivo,
                      'cursor-not-allowed bg-primary-700': !btnCadastraArquivo
                    }"
                    :disabled="!btnCadastraArquivo"
                    class="flex h-9 w-24 items-center justify-center rounded px-4 py-2 font-bold text-white"
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
                    @click="
                      (txtDescricao = ''),
                        (id_Menu = ''),
                        (idCategoriaArquivos = ''),
                        (ano = ''),
                        (files = []),
                        getArquivosList()
                    "
                    class="ml-2 flex h-9 w-24 items-center justify-center rounded border border-primary-500 px-4 py-2 font-bold text-primary-500 hover:bg-primary-400 hover:text-white"
                  >
                    Limpar
                  </button>
                </div>
              </div>
            </div>
            <div>
              <ul>
                <li class="list-disc text-red-600" v-for="erro in erros" :key="erro">{{ erro }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div v-if="loading" class="my-4 text-center">
        <ProgressSpinner />
      </div>
      <div v-if="!loading">
        <table class="min-w-full rounded-xl bg-white shadow-md">
          <thead>
            <tr class="bg-blue-gray-100 text-gray-700">
              <th class="px-4 py-3 text-left">Ano</th>
              <th class="px-4 py-3 text-left">Categoria</th>
              <th class="px-4 py-3 text-left">Menu</th>
              <th class="px-4 py-3 text-left">Arquivo</th>
              <th class="px-4 py-3 text-left">Publicado em</th>
              <th class="px-4 py-3 text-left">Ações</th>
            </tr>
          </thead>
          <tbody class="text-blue-gray-900">
            <tr
              v-for="arq in paginatedItems"
              :key="arq.idArquivo"
              class="border-blue-gray-200 border-b"
            >
              <td class="px-4 py-3">{{ arq.anoPub }}</td>
              <td class="px-4 py-3">{{ arq.descCategoria }}</td>
              <td class="px-4 py-3">{{ arq.descMenu }}</td>
              <td class="px-4 py-3">
                <button
                  @click="downloadItem(arq.idArquivo, arq.nomeArquivo)"
                  class="text-primary-700"
                >
                  <!-- {{ arq.nomeArquivo.length > 20 ? arq.nomeArquivo.slice(0, 100) + '...' : arq.nomeArquivo }} -->
                  {{ truncateNoMeio(arq.nomeArquivo, 50) }}
                </button>
              </td>
              <td class="px-4 py-3">{{ formatDate(arq.dtInclusao) }}</td>
              <td class="flex px-4 py-3">
                <button
                  @click="editar(arq)"
                  class="pr-2 text-primary-500"
                  title="Editar"
                  v-tooltip.top="'Editar'"
                >
                  <RiPencilLine />
                </button>

                <button
                  @click="excluir(arq)"
                  class="pr-2 text-red-500"
                  title="Excluir"
                  v-tooltip.top="'Excluir'"
                >
                  <RiDeleteBinLine />
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="flex items-center justify-center p-2">
          <button
            @click="previousPage"
            class="rounded bg-blue-500 font-bold text-white hover:bg-blue-700"
            :disabled="currentPage === 1"
          >
            <RiArrowLeftFill></RiArrowLeftFill>
          </button>
          <span class="px-5 py-2">Página {{ currentPage }} de {{ totalPages }}</span>
          <button
            @click="nextPage"
            class="rounded bg-blue-500 font-bold text-white hover:bg-blue-700"
            :disabled="currentPage === totalPages"
          >
            <RiArrowRightFill></RiArrowRightFill>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.truncate-text {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 400px; /* Defina o tamanho máximo que deseja exibir */
}
</style>
