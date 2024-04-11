<script setup>
import { ref, onMounted} from 'vue'
import { getRegistroImportacao } from '@/services/home'
import { RiArrowLeftFill, RiArrowRightFill } from '@remixicon/vue'
import usePagination from '@/utils/pagination'


const registros = ref([])

async function getRegistros(){
  try{
    const response = await getRegistroImportacao()
    registros.value = response.data
  }catch(e){
    console.error(e)
  }
}

// ------------------- Paginação
const paginationRegistros = usePagination(registros, 5);

const {
  currentPage: currentPage,
  paginatedItems: paginatedItems,
  nextPage: nextPage,
  previousPage: previousPage,
  totalPages: totalPages,
} = paginationRegistros;

function formatarData(data) {
      const dataObj = new Date(data);
      const dia = String(dataObj.getDate()).padStart(2, '0');
      const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
      const ano = dataObj.getFullYear();
      return `${dia}/${mes}/${ano}`;
    }

onMounted(() => {
  getRegistros()
})

</script>

<template>
  <table class="min-w-full bg-white shadow-md rounded-xl">
    <thead>
      <tr class="bg-blue-gray-100 text-gray-700">
        <th class="py-3 px-4 text-left">Consulta</th>
        <th class="py-3 px-4 text-left">Última atualização em</th>
        <th class="py-3 px-4 text-left">Atualizado por</th>
      </tr>
    </thead>
    <tbody class="text-blue-gray-900">
      <tr v-for="registro in paginatedItems" :key="registro.idRegistroImportacao" class="border-b border-blue-gray-200">
        <td class="py-3 px-4">{{ registro.txtDestinoImportacao }}</td>
        <td class="py-3 px-4">{{ formatarData(registro.dtImportacao) }}</td>
        <td class="py-3 px-4">{{ registro.txtNomeUsuario }}</td>
      </tr>
    </tbody>
  </table>
  <div class="flex items-center justify-center p-2">
      <button @click="previousPage" class="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded" :disabled="currentPage === 1">
        <RiArrowLeftFill></RiArrowLeftFill>
      </button>
            <span class="px-5 py-2">Página {{ currentPage }} de {{ totalPages }}</span>
      <button @click="nextPage" class="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded" :disabled="currentPage === totalPages">
        <RiArrowRightFill></RiArrowRightFill>
      </button>
  </div>
</template>

<style scoped></style>
