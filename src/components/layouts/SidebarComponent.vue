<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { getDadosAdmin } from '@/services/dadosAdmin'

const props = defineProps(['dataShowSidebar'])
const logo = ref('')
const extensaoLogo = ref('')

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
    icon: 'pi pi-database',
    rota: '/menus'
  },
  {
    id: 3,
    nome: 'Arquivos',
    icon: 'pi pi-file',
    rota: '/arquivos'
  }
])

const menusConfig = ref([
  {
    id: 1,
    nome: 'Dados Administrativos',
    icon: 'pi pi-user',
    rota: '/dados-administrativos'
  },
  {
    id: 2,
    nome: 'Usuários',
    icon: 'pi pi-users',
    rota: '/usuarios'
  }
])

async function getLogo() {
  try {
    const response = await getDadosAdmin()
    console.log(response.data)
    logo.value = response.data.imgLogo
    extensaoLogo.value = response.data.txtLogoExtensao
  } catch (e) {
    console.error('Não foi possível obter dados da api: ', e)
  }
}

onMounted(() => {
  //getLogo()
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
          <h5 class="text-lg font-medium leading-tight mb-2">Prefeitura de Currais Novos</h5>
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
      </nav>
    </div>
    <div class="flex items-center justify-center space-x-2 px-4 border-t border-white/20 py-4">
      <span class="text-sm text-gray-300">Para suporte: (84) 3207-1622</span>
    </div>
  </div>
  <!--    <div class="flex-1">-->
  <!--      <div class="bg-white shadow px-4 py-4">-->
  <!--        <button class="md:hidden" @click="showSidebar = !showSidebar">-->
  <!--          <i class="pi pi-bars"></i>-->
  <!--        </button>-->
  <!--      </div>-->
  <!--      <div class="p-8 text-gray-800">Content</div>-->
  <!--    </div>-->
  <!--  </div>-->
</template>

<style scoped></style>
