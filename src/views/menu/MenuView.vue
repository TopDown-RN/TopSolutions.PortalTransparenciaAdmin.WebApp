<script setup>
import { ref, onMounted, computed } from 'vue'
import { getMenus, postMenu } from '@/services/menu'

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

function editar(menu) {
  id.value = menu.idMenu
  descricao.value = menu.txtDescricao
  descricaoGeral.value = menu.txtDescricaoGeral
  url.value = menu.txtUrl
  ativo.value = menu.blnAtivo
  arquivo.value = menu.blnArquivo
  popup.value = menu.blnPopUp
  submenu.value = menu.idMenuPai
  filtro.value = menu.txtFiltro
  locais.value = menu.locais

  console.log('filtro', menu.txtFiltro)
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
  <div class="p-8">
    <div class="mb-4">
      <input
        type="text"
        placeholder="Descrição do menu"
        class="border rounded-lg p-2"
        v-model="descricao"
      />
    </div>

    <div class="mb-4">
      <input
        type="text"
        placeholder="Descrição Geral"
        class="border rounded-lg p-2"
        v-model="descricaoGeral"
      />
    </div>

    <div class="mb-4">
      <input type="text" placeholder="URL" class="border rounded-lg p-2" v-model="url" />
    </div>

    <div class="mb-4">
      <input type="text" placeholder="filtro" class="border rounded-lg p-2" v-model="filtro" />
    </div>

    <div class="mb-4">
      <input type="checkbox" id="ativo" class="mr-2" v-model="ativo" />
      <label for="ativo">Ativo</label>

      <input type="checkbox" id="arquivo" class="mx-4" v-model="arquivo" />
      <label for="arquivo">Arquivo</label>

      <input type="checkbox" id="popup" class="mr-2" v-model="popup" />
      <label for="popup">PopUp</label>
    </div>

    <div class="mb-4">
      <p class="mb-2">Local do Menu</p>
      <input type="checkbox" id="header" value="1" v-model="locais" class="mr-2" />
      <label for="header">Header</label>

      <input type="checkbox" id="nav" value="2" v-model="locais" class="mx-4" />
      <label for="nav">Nav</label>

      <input type="checkbox" id="body" value="3" v-model="locais" class="mx-4" />
      <label for="body">Body</label>

      <input type="checkbox" id="footer" value="4" v-model="locais" class="mx-4" />
      <label for="footer">Footer</label>

      <input type="checkbox" id="custom" value="5" v-model="locais" class="mx-4" />
      <label for="custom">Custom</label>
    </div>

    <div class="mb-4">
      <p class="mb-2">É submenu de outro item?</p>
      <select class="border rounded-lg p-2" v-model="submenu">
        <option v-for="menu in menusSorted" :key="menu.idMenu" :value="menu.idMenu">
          {{ menu.txtDescricao }}
        </option>
      </select>
    </div>

    <button @click="gravarMenu" class="bg-blue-500 text-white px-4 py-2 rounded-lg">Gravar</button>
    <button @click="limpar" class="bg-blue-500 ml-3 text-white px-4 py-2 rounded-lg">Limpar</button>

    <div>
      <h4 class="mt-8 mb-4 text-lg font-bold">Tabela de Menus</h4>
      <table class="w-full border-collapse border border-gray-400">
        <thead>
          <tr>
            <th class="w-1/4 border border-gray-400 p-2">Menu</th>
            <th class="w-1/4 border border-gray-400 p-2">URL</th>
            <th class="w-1/4 border border-gray-400 p-2">Local</th>
            <th class="w-1/4 border border-gray-400 p-2"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="menu in menusSorted" :key="menu.idMenu" class="border border-gray-400">
            <td class="w-1/4 border border-gray-400 p-2">{{ menu.txtDescricao }}</td>
            <td class="w-1/4 border border-gray-400 p-2">urls</td>
            <td class="w-1/4 border border-gray-400 p-2">{{ menu.txtLocal }}</td>
            <td class="w-1/4 border border-gray-400 p-2">
              <button class="bg-gray-500 text-white px-2 py-1 rounded-lg" @click="editar(menu)">
                Editar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
