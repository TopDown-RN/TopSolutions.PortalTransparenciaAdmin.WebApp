<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { getDadosAdmin } from '@/services/dadosAdmin'

const props = defineProps(['dataShowSidebar'])
const logo = ref('')
const extensaoLogo = ref('')
const txtCliente = ref('')

const menuActive = ref()
const menusPrincipal = ref([
  {
    id: 1,
    nome: 'Início',
    icon: 'pi pi-home',
    rota: '/'
  },
  {
    id: 2,
    nome: 'Menus',
    icon: 'pi pi-list',
    rota: '/menus'
  },
  {
    id: 3,
    nome: 'Arquivos',
    icon: 'pi pi-folder-open',
    rota: '/arquivos'
  },
  // {
  //   id: 4,
  //   nome: 'Arquivos (Novo)',
  //   icon: 'pi pi-folder-open',
  //   rota: '/arquivosview'
  // },
  {
    id: 5,
    nome: 'Ouvidoria',
    icon: 'pi pi-headphones',
    rota: '/ouvidoria'
  },
  {
    id: 6,
    nome: 'Importar Dados',
    icon: 'pi pi-upload',
    rota: '/importacaodadosplanilha'
  },
  {
    id: 7,
    nome: 'Notícias',
    icon: 'pi pi-address-book',
    rota: '/noticias'
  }
])

const menusConfig = ref([
  {
    id: 1,
    nome: 'Usuários',
    icon: 'pi pi-user',
    rota: '/usuarios'
  },
  {
    id: 2,
    nome: 'Dados Administrativos',
    icon: 'pi pi-wrench',
    rota: '/dados-administrativos'
  },
  {
    id: 3,
    nome: 'Credenciais',
    icon: 'pi pi-cog',
    rota: '/credenciais'
  },
  {
    id: 4,
    nome: 'Dados API',
    icon: 'pi pi-code',
    url: `https://dataapi${window.location.hostname}/swagger/index.html`
  }
])

async function getDados() {
  try {
    const response = await getDadosAdmin()
    logo.value = response.data.imgLogo
    extensaoLogo.value = response.data.txtLogoExtensao
    txtCliente.value = response.data.txtCliente
  } catch (e) {
    console.error('Não foi possível obter dados da api: ', e)
  }
}

onMounted(() => {
  getDados()
})
</script>

<template>
  <div
    :class="[
      'fixed inset-y-0 left-0 z-30 w-[300px] transform bg-gradient-to-br from-primary-900 to-primary-900 px-2 py-4 text-white transition-transform duration-200 ease-in-out md:relative md:translate-x-0',
      { '-translate-x-full': !props.dataShowSidebar, 'translate-x-0': props.dataShowSidebar }
    ]"
  >
    <a class="flex items-center justify-center space-x-2 px-4">
      <span class="text-lg font-medium">Portal da Transparência</span>
    </a>
    <div class="break-normal px-4 text-center">
      <div class="flex justify-center p-5">
        <div class="flex flex-col items-center justify-center">
          <img
            :src="'data:image/' + extensaoLogo + ';base64,' + logo"
            class="mb-4 h-24 w-24 rounded-full p-1 ring-2 ring-gray-300"
            alt="Base64 Image"
            width="100px"
          />
          <h5 class="text-md mb-2 font-medium leading-tight">{{ txtCliente }}</h5>
          <span class="text-xs text-gray-300"> Painel Administrativo </span>
        </div>
      </div>
      <nav class="m-4 text-left">
        <ul class="mb-4 flex flex-col gap-1 pb-4">
          <li v-for="menu in menusPrincipal" :key="menu.id">
            <RouterLink
              :to="menu.rota"
              class="center flex w-full items-center gap-2 rounded-lg px-2 py-2 font-sans text-sm font-bold capitalize text-white transition-all hover:bg-white/10"
              type="button"
              v-tooltip.top="menu.nome"
              @click="menuActive = menu.nome"
              :class="{
                'shadow-white-500/20 hover:shadow-white-500/40 bg-gradient-to-tr from-white/20 to-white/30 text-white shadow-md hover:shadow-lg active:opacity-[0.85]':
                  menuActive === menu.nome
              }"
            >
              <i :class="menu.icon"></i>
              <span>{{ menu.nome }}</span>
            </RouterLink>
          </li>
        </ul>
        <ul class="mb-4 flex flex-col gap-1">
          <li class="mx-3.5 mb-2 mt-4">
            <p
              class="block text-sm font-black uppercase leading-normal text-white antialiased opacity-75"
            >
              Configurações
            </p>
          </li>
          <li v-for="menu in menusConfig" :key="menu.id">
            <RouterLink
              v-if="menu.rota"
              :to="menu.rota"
              class="center flex w-full items-center gap-2 rounded-lg px-2 py-2 font-sans text-sm font-bold capitalize text-white transition-all hover:bg-white/10"
              type="button"
              v-tooltip.top="menu.nome"
              @click="menuActive = menu.nome"
              :class="{
                'shadow-white-500/20 hover:shadow-white-500/40 bg-gradient-to-tr from-white/20 to-white/30 text-white shadow-md hover:shadow-lg active:opacity-[0.85]':
                  menuActive === menu.nome
              }"
            >
              <i :class="menu.icon"></i>
              <span>{{ menu.nome }}</span>
            </RouterLink>
            <a
              v-else
              :href="menu.url"
              target="_blank"
              class="center flex w-full items-center gap-2 rounded-lg px-2 py-2 font-sans text-sm font-bold capitalize text-white transition-all hover:bg-white/10"
              v-tooltip.top="menu.nome"
              @click="menuActive = menu.nome"
            >
              <i :class="menu.icon"></i>
              <span>{{ menu.nome }}</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
    <div class="flex items-center justify-center space-x-2 border-t border-white/20 px-4 py-4">
      <span class="text-sm text-gray-300">Para suporte: (84) 3207-1622</span>
    </div>
  </div>
</template>

<style scoped></style>
