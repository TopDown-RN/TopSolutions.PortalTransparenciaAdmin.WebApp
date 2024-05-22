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
    nome: 'Dashboard',
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
  {
    id: 4,
    nome: 'Arquivos (Novo)',
    icon: 'pi pi-folder-open',
    rota: '/arquivosview'
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
  // {
  //   id: 3,
  //   nome: 'Suporte',
  //   icon: 'pi pi-headphones',
  //   url: `https://dataapi${window.location.hostname}/swagger/index.html`
  // },
  {
    id: 3,
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
    class="bg-gradient-to-br from-primary-900 text-white to-primary-900 w-[300px] space-y-6 px-2 py-4 absolute inset-y-0 left-0 md:relative md:translate-x-0 transform -translate-x-full transition duration-200 ease-in-out"
    :class="{ 'relative translate-x-0': props.dataShowSidebar }"
  >
    <a class="flex items-center justify-center space-x-2 px-4">
      <span class="text-lg font-medium">Portal da Transparência</span>
    </a>
    <div class="text-left px-2 whitespace-nowrap">
      <div class="flex justify-center p-5">
        <div class="flex flex-col justify-center items-center">
          <img
            :src="'data:image/' + extensaoLogo + ';base64,' + logo"
            class="p-1 w-24 h-24 rounded-full ring-2 ring-gray-300 mb-4"
            alt="Base64 Image"
            width="100px"
          />
          <h5 class="text-lg font-medium leading-tight mb-2">{{ txtCliente }}</h5>
          <span class="text-xs text-gray-300"> Painel Administrativo </span>
        </div>
      </div>
      <nav class="m-4">
        <ul class="mb-4 flex flex-col gap-1 pb-4">
          <li v-for="menu in menusPrincipal" :key="menu.id">
            <RouterLink
              :to="menu.rota"
              class="font-sans font-bold center transition-all hover:bg-white/10 text-sm py-2 rounded-lg text-white w-full flex items-center gap-2 px-2 capitalize"
              type="button"
              v-tooltip.top="menu.nome"
              @click="menuActive = menu.nome"
              :class="{
                'shadow-md shadow-white-500/20 text-white hover:shadow-lg hover:shadow-white-500/40 active:opacity-[0.85] bg-gradient-to-tr from-white/20 to-white/30':
                  menuActive === menu.nome
              }"
            >
              <i :class="menu.icon"></i>
              <span>{{ menu.nome }}</span>
            </RouterLink>
          </li>
        </ul>
        <ul class="mb-4 flex flex-col gap-1">
          <li class="mx-3.5 mt-4 mb-2">
            <p
              class="block antialiased text-sm leading-normal text-white font-black uppercase opacity-75"
            >
              Configurações
            </p>
          </li>
          <li v-for="menu in menusConfig" :key="menu.id">
            <RouterLink
              v-if="menu.rota"
              :to="menu.rota"
              class="font-sans font-bold center transition-all hover:bg-white/10 text-sm py-2 rounded-lg text-white w-full flex items-center gap-2 px-2 capitalize"
              type="button"
              v-tooltip.top="menu.nome"
              @click="menuActive = menu.nome"
              :class="{
                'shadow-md shadow-white-500/20 text-white hover:shadow-lg hover:shadow-white-500/40 active:opacity-[0.85] bg-gradient-to-tr from-white/20 to-white/30':
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
              class="font-sans font-bold center transition-all hover:bg-white/10 text-sm py-2 rounded-lg text-white w-full flex items-center gap-2 px-2 capitalize"
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
    <div class="flex items-center justify-center space-x-2 px-4 border-t border-white/20 py-4">
      <span class="text-sm text-gray-300">Para suporte: (84) 3207-1622</span>
    </div>
  </div>
</template>

<style scoped></style>
