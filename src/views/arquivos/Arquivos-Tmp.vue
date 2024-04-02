<script setup>
import { onMounted, ref, watch } from 'vue'

import { postArquivos } from '@/services/arquivos'

import router from '@/router'
import { useRoute, useRouter } from 'vue-router'
import Message from 'primevue/message';

import FileUpload from 'primevue/fileupload';
import InputText from 'primevue/inputtext';


const idUsuario = ref(0)
const route = useRoute()
const router1 = useRouter()

function extractParamFromPath() {
  const matchedRoute = router1.resolve(route.path)
  const params = matchedRoute.params

  if (params && params.id) {
    idUsuario.value = params.id;
  }
}

const result = ref()

const idArquivo = ref(0);
const txtDescricao = ref('');
const idCategoriaPubArquivo = ref(0);


const files = ref([]);
const handleFileChange = (event) => {
      files.value = Array.from(event.target.files);
    };

async function postSaveArquivos() {
  try {

    const formData = new FormData();
    
    formData.append('txtDescricao', txtDescricao.value)
    files.value.forEach((file) => {
      formData.append('Arquivo', file);
    });
    formData.append('idUsuario', 0)
    formData.append('idCategoriaPubArquivo', idCategoriaPubArquivo.value)
    const response = await postArquivos(formData)
      //result.value = response.data
      //console.log(idUsuario.value, txtNome.value);
      //localStorage.setItem('token', response.token)
      //router.push({name: 'usuarios'})
   } catch (error) {
     console.error('erro ao obter os arquivos:', error)
   }
}

// async function fetchUsuario(_idUsuario) {
//   try {
//       const response = await getUsuario(_idUsuario)
//       //result.value = response.data
//       idUsuario.value = _idUsuario
//       txtNome.value = response.data.txtNome
//       txtCpfCnpj.value = response.data.txtCpfCnpj
//       txtEmail.value = response.data.txtEmail
//       blnAcessoExterno.value =  response.data.blnAcessoExterno
//       //console.log(response.data);
//       //localStorage.setItem('token', response.token)
      
//    } catch (error) {
//      console.error('erro ao obter os arquivos:', error)
//    }
// }

watch(result, () => {
  //loading.value = false
})

onMounted(() => {
  //fetchArp()

})


</script>
<template>
  <div>Arquivos</div>
  <input
                  type="text"
                  name="txtDescricao"
                  id="txtDescricao"
                  class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  placeholder="Descricao do Item do Arquivo"
                  v-model="txtDescricao"
                />
                <input
                  type="text"
                  name="idCategoriaPubArquivo"
                  id="idCategoriaPubArquivo"
                  class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  placeholder="IdCategoria"
                  v-model="idCategoriaPubArquivo"
                />
  <input type="file" ref="fileInput" multiple  @change="handleFileChange"/>
  <div>
    <input type="button" value="Adicionar Arquivos" @click="postSaveArquivos()">
   
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

<style>

</style>