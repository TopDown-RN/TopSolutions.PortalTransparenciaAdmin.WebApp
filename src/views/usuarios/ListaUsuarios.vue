<script setup>
import { onMounted, ref, watch } from 'vue'
import { getListaUsuarios } from '@/services/usuario'
import Button from 'primevue/button'
//import InputText from 'primevue/inputtext'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import ProgressSpinner from 'primevue/progressspinner'
import { RiEdit2Line, RiDeleteBin5Line } from '@remixicon/vue'
import { FilterMatchMode } from 'primevue/api'
//import router from '@/router'

const loading = ref(true)
const result = ref()
// const idUsuario = ref(0)
// const txtNome = ref('');
// const txtCpfCnpj = ref('');
// const txtEmail = ref('');
// const txtPass = ref('');
// const blnAcessoExterno = ref(false);

const columns = [
  { field: 'idUsuario', header: 'N° Processo' },
  { field: 'txtCpfCnpj', header: 'Procedimento Licitatório' },
  { field: 'txtNome', header: 'CPF/CNPJ Credor' },
  { field: 'txtEmail', header: 'Credor' },
  { field: 'txtChaveAcessoAPI', header: 'Parcela' },
  { field: 'blnAcessoExterno', header: 'Data Vencimento' }
]

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
})

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

// function onRowDetails(event) {
//   const id = event.data.idContrato
//   router.push({ name: 'contratosShow', params: { id } })
// }

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

  <div v-if="!loading" class="relative my-8 overflow-x-auto">
  <!-- <DataTable
  v-if="result.length > 0"
  :value="result" v-model:filters="filters" class="min-w-full bg-white shadow-md rounded-xl " tableStyle="min-width: 50rem">
    <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header"></Column>
</DataTable> -->
</div>
  <table class="min-w-full bg-white shadow-md rounded-xl">
    <thead>
      <tr class="bg-blue-gray-100 text-gray-700">
        <th class="py-3 px-4 text-left">Nome</th>
        <th class="py-3 px-4 text-left">CPF</th>
        <th class="py-3 px-4 text-left">E-mail</th>
        <th class="py-3 px-4 text-left">Ações</th>
      </tr>
    </thead>
    <tbody class="text-blue-gray-900">
      <tr v-for="item in result" :key="item.idUsuario" class="border-b border-blue-gray-200">
        <td class="py-3 px-4">{{ item.txtNome }}</td>
        <td class="py-3 px-4">{{ item.txtCpfCnpj }}</td>
        <td class="py-3 px-4">{{ item.txtEmail }}</td>
        <td class="py-3 px-4 flex">
          <a :href="'usuarios/editar/'+ item.idUsuario" class="text-primary-700 pr-2" title="Editar">
            <RiEdit2Line />
          </a>
         
          <a href="#" class="text-red-600" title="Excluir">
            <RiDeleteBin5Line />
          </a>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped></style>
