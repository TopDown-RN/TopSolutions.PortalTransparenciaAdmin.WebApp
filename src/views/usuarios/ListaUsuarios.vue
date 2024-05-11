<script setup>
import { onMounted, ref, watch } from 'vue'
import { getListaUsuarios } from '@/services/usuario'
import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import ProgressSpinner from 'primevue/progressspinner'
import router from '@/router/index.js'

const loading = ref(true)
const result = ref()

async function fetchUsuario() {
  try {
    const response = await getListaUsuarios(false)
    result.value = response.data
    //console.log(result.value);
    //localStorage.setItem('token', response.token)
    //router.push({name: 'home'})
  } catch (error) {
    result.value = []
    console.error('erro ao obter os arquivos:', error)
  }
}

function editUsuario(event) {
  router.push({
    name: 'usuario-editar',
    params: { id: event.data.idUsuario }
  })
}

watch(result, () => {
  loading.value = false
})

onMounted(() => {
  fetchUsuario()
})
</script>

<template>
  <div class="flex md:justify-end m-2">
    <Button
      type="button"
      onclick="location.href='/usuarios/novo'"
      class="focus:ring-2 focus:ring-offset-2 focus:ring-primary-700 text-sm font-semibold leading-none text-white focus:outline-none bg-primary-700 border rounded hover:bg-primary-600 py-3"
    >
      Adicionar novo usuário
    </Button>
  </div>
  <div v-if="loading" class="my-4 text-center">
    <ProgressSpinner />
  </div>

  <div v-if="!loading" class="relative overflow-x-auto border rounded-lg">
    <DataTable :value="result" paginator :rows="10">
      <template #header>
        <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
          <h4 class="m-0">Usuários</h4>
        </div>
      </template>
      <Column field="txtNome" header="Nome"></Column>
      <Column field="txtCpfCnpj" header="CPF"></Column>
      <Column field="txtEmail" header="E-mail"></Column>
      <Column header="Ações" :exportable="false" style="min-width: 8rem">
        <template #body="event">
          <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editUsuario(event)" />
          <Button icon="pi pi-trash" outlined rounded severity="danger" />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<style scoped></style>
