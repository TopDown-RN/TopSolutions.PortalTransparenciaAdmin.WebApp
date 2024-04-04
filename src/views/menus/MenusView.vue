<script setup>
import { ref, onMounted, computed } from 'vue'
import { getMenus, postMenu } from '@/services/menu'
import { RiDeleteBin5Line, RiEdit2Line } from '@remixicon/vue'

const id = ref(0)
const descricao = ref('')
const descricaoGeral = ref('')
const url = ref('')
const ativo = ref('')
const arquivo = ref('')
const popup = ref('')
const locais = ref([])
const submenu = ref('')
const filtro = ref('')

const menus = ref([])

const menusSorted = computed(() => {
  return menus.value.slice().sort((a, b) => {
    return a.txtDescricao.localeCompare(b.txtDescricao)
  })
})

async function pegarMenus() {
  const response = await getMenus()
  menus.value = response.data
}

function limpar() {
  id.value = 0
  descricao.value = ''
  descricaoGeral.value = ''
  url.value = ''
  ativo.value = ''
  arquivo.value = ''
  popup.value = ''
  locais.value = []
  submenu.value = ''
  filtro.value = ''
}

async function gravarMenu() {
  const locaisSelecionados = locais.value.map((local) => parseInt(local))

  const menu = {
    idMenu: id.value,
    txtDescricao: descricao.value,
    txtDescricaoGeral: descricaoGeral.value,
    txtUrl: url.value,
    blnAtivo: ativo.value,
    blnArquivo: arquivo.value,
    blnPopUp: popup.value,
    locais: locaisSelecionados,
    idMenuPai: submenu.value,
    txtFiltro: filtro.value
  }
  console.log('menu', menu)
  const response = await postMenu(menu)
  console.log('response:', response)
}

onMounted(() => {
  pegarMenus()
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
        <div class="grid gap text-sm grid-cols-1">
          <div class="lg:col-span-2">
            <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5 content-end">
              <div class="md:col-span-5">
                <label>Nome do menu</label>
                <input
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
                    <input type="checkbox" name="ativo" id="ativo" class="mr-2" />
                    <label for="ativo">Ativo</label>
                  </div>
                  <div class="flex items-center col-span-1">
                    <input type="checkbox" name="arquivo" id="arquivo" class="mr-2" />
                    <label for="arquivo">Arquivo</label>
                  </div>
                  <div class="flex items-center col-span-1">
                    <input type="checkbox" name="popup" id="popup" class="mr-2" />
                    <label for="popup">Pop-Up</label>
                  </div>
                  <div class="flex items-center col-span-1">
                    <input type="checkbox" name="novapagina" id="novapagina" class="mr-2" />
                    <label for="novapagina">Nova Página</label>
                  </div>
                </div>
              </div>

              <div class="md:col-span-5">
                <label>É submenu de outro ítem?</label>
                <select class="h-10 border mt-1 rounded px-4 w-full bg-transparent">
                  <option value="">Selecione</option>
                  <option v-for="menu in menusSorted" :key="menu.idMenu" :value="menu.idMenu">
                    {{ menu.txtDescricao }}
                  </option>
                </select>
              </div>

              <div class="md:col-span-5">
                <label>Local do Menu</label>
                <div class="grid grid-cols-5 gap-x-4 mt-2">
                  <div class="flex items-center col-span-1">
                    <input type="checkbox" name="menuLocal" id="menuHeader" class="mr-2" />
                    <label for="menuHeader">Header</label>
                  </div>
                  <div class="flex items-center col-span-1">
                    <input type="checkbox" name="menuLocal" id="menuNav" class="mr-2" />
                    <label for="menuNav">Nav</label>
                  </div>
                  <div class="flex items-center col-span-1">
                    <input type="checkbox" name="menuLocal" id="menuBody" class="mr-2" />
                    <label for="menuBody">Body</label>
                  </div>
                  <div class="flex items-center col-span-1">
                    <input type="checkbox" name="menuLocal" id="menuFooter" class="mr-2" />
                    <label for="menuFooter">Footer</label>
                  </div>
                  <div class="flex items-center col-span-1">
                    <input type="checkbox" name="menuLocal" id="menuCustom" class="mr-2" />
                    <label for="menuCustom">Custom</label>
                  </div>
                </div>
              </div>

              <div class="md:col-span-5 text-right">
                <div class="inline-flex items-end">
                  <div class="mr-2">
                    <button
                      @click="gravarMenu"
                      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Gravar
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
          <tr v-for="menu in menusSorted" :key="menu.idMenu" class="border-b border-blue-gray-200">
            <td class="py-3 px-4">{{ menu.txtDescricao }}</td>
            <td class="py-3 px-4">/url</td>

            <td class="py-3 px-4">Local X</td>
            <td class="py-3 px-4 flex">
              <a href="#" class="text-primary-700 pr-2" title="Editar">
                <RiEdit2Line />
              </a>
              <a href="#" class="text-red-600" title="Excluir">
                <RiDeleteBin5Line />
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style></style>
