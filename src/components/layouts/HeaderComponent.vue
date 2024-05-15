<script setup>
import { ref } from 'vue'
import Avatar from 'primevue/avatar'
import { useRouter } from 'vue-router'
import Menu from 'primevue/menu'
import { removeToken } from '@/services/auth/authToken'

const router = useRouter()
const props = defineProps(['toggleSidebar'])

const items = ref([
  {
    label: 'Usuário',
    items: [
      {
        label: 'Ajustes',
        icon: 'pi pi-cog'
      },
      {
        label: 'Alterar Senha',
        icon: 'pi pi-cog',
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

function toggle(event) {
  menu.value.toggle(event)
}

function logout() {
  removeToken()
  window.location.reload()
}
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
        <div class="text-md">Administrador</div>
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
