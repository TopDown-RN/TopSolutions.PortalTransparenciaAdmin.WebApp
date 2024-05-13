<script setup>
import { ref, onMounted, watch } from 'vue'
import { getRegistroImportacao } from '@/services/home'
import ProgressSpinner from 'primevue/progressspinner'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const registros = ref([])
const loading = ref(true)

async function getRegistros() {
  try {
    const response = await getRegistroImportacao()
    registros.value = response.data
  } catch (e) {
    console.error(e)
  }
}

function formatData(data) {
  const dataObj = new Date(data)

  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  }

  return dataObj.toLocaleDateString('pt-BR', options)
}

watch(registros, () => {
  loading.value = false
})

onMounted(() => {
  getRegistros()
})
</script>

<template>
  <div v-if="loading" class="my-4 text-center">
    <ProgressSpinner />
  </div>
  <div class="relative overflow-x-auto border rounded-lg" v-if="!loading">
    <DataTable
      :value="registros"
      size="small"
      paginator
      :rows="10"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      stripedRows
    >
      <Column field="txtDestinoImportacao" header="Consulta" />
      <Column field="dtImportacao" header="Última atualização em">
        <template #body="slotProps">
          {{ formatData(slotProps.data.dtImportacao) }}
        </template>
      </Column>
      <Column field="txtNomeUsuario" header="Atualizado por"></Column>
    </DataTable>
  </div>
</template>

<style scoped></style>
