<script setup>
import { onMounted, ref } from 'vue'
import Avatar from 'primevue/avatar'
import Menu from 'primevue/menu'
import { getIdUsuario, removeToken } from '@/services/auth/authStorage'
import { getUsuario } from '@/services/usuario'
import { useRouter } from 'vue-router'

const props = defineProps(['toggleSidebar'])
const router = useRouter()

const usuarioLogado = ref('')
const idUsuarioLogado = ref()

const items = ref([
  {
    label: 'Usuário',
    items: [
      {
        label: 'Ajustes',
        icon: 'pi pi-cog',
        command: () => {
          router.push(`/usuarios/editar/${idUsuarioLogado.value}`)
        }
      },
      {
        label: 'Alterar Senha',
        icon: 'pi pi-cog'
      },
      {
        label: 'Sair',
        icon: 'pi pi-sign-out',
        command: () => {
          logout()
        }
      }
    ]
  }
])

const menu = ref()

async function fetchUsuarioLogado() {
  try {
    idUsuarioLogado.value = getIdUsuario()
    const response = await getUsuario(idUsuarioLogado.value)
    usuarioLogado.value = response.data
  } catch (e) {
    console.error('erro ao buscar dados do usuario logado: ', e)
  }
}

function toggle(event) {
  menu.value.toggle(event)
}

function logout() {
  removeToken()
  window.location.reload()
}

onMounted(() => {
  fetchUsuarioLogado()
})
</script>

<template>
  <header class="bg-white shadow px-4 py-4">
    <div class="flex justify-between items-center p-4">
      <div class="cursor-pointer md:hidden" @click="props.toggleSidebar">
        <i class="pi pi-bars"></i>
      </div>
      <div class="">
        <h1 class="text-2xl font-bold tracking-tight text-gray-900">Top Solutions</h1>
      </div>
      <div class="flex space-x-3 items-center justify-center px-3">
        <div class="text-md">{{ usuarioLogado.txtNome }}</div>
        <Avatar
          icon="pi pi-user"
          class="mr-2 bg-primary-800 text-white cursor-pointer"
          shape="circle"
          @click="toggle"
          aria-haspopup="true"
          aria-controls="overlay_menu"
        />
        <Menu id="overlay_menu" ref="menu" :model="items" :popup="true" />
      </div>
    </div>
  </header>
</template>

<style scoped></style>
