<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getIdUsuario, removeToken } from '@/services/auth/authStorage'
import { getUsuario } from '@/services/usuario'
import Avatar from 'primevue/avatar'
import Menu from 'primevue/menu'

const props = defineProps(['toggleSidebar'])
const router = useRouter()

const usuarioLogado = ref('')
const idUsuarioLogado = ref()

const items = ref([
  {
    label: 'Usuário',
    items: [
      {
        label: 'Meus Dados',
        icon: 'pi pi-cog',
        command: () => {
          router.push(`/usuarios/editar/${idUsuarioLogado.value}`)
        }
      },
      {
        label: 'Alterar Senha',
        icon: 'pi pi-key',
        command: () => {
          router.push('/usuario/alterarsenha')
        }
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
  <header class="bg-white py-1 shadow">
    <div class="flex items-center justify-between p-4">
      <div class="cursor-pointer md:hidden" @click="props.toggleSidebar">
        <i class="pi pi-bars"></i>
      </div>
      <div class="">
        <h1 class="text-2xl font-bold tracking-tight text-gray-900">Top Solutions</h1>
      </div>
      <div class="flex items-center justify-center space-x-3 px-3">
        <div class="text-md">{{ usuarioLogado.txtNome }}</div>
        <Avatar
          icon="pi pi-user"
          class="mr-2 cursor-pointer bg-primary-800 text-white"
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
