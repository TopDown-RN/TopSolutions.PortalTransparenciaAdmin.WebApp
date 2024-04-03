<script setup>
import { onMounted, ref, watch } from 'vue'

import { postArquivos } from '@/services/arquivos'

import router from '@/router'
import { useRoute, useRouter } from 'vue-router'
import Message from 'primevue/message'

import FileUpload from 'primevue/fileupload'
import InputText from 'primevue/inputtext'
import { RiDeleteBin5Line, RiEdit2Line } from '@remixicon/vue'

const idUsuario = ref(0)
const route = useRoute()
const router1 = useRouter()

function extractParamFromPath() {
  const matchedRoute = router1.resolve(route.path)
  const params = matchedRoute.params

  if (params && params.id) {
    idUsuario.value = params.id
  }
}

const result = ref()

const idArquivo = ref(0)
const txtDescricao = ref('')
const idCategoriaPubArquivo = ref(0)

const files = ref([])
const handleFileChange = (event) => {
  files.value = Array.from(event.target.files)
}

async function postSaveArquivos() {
  try {
    const formData = new FormData()

    formData.append('txtDescricao', txtDescricao.value)
    files.value.forEach((file) => {
      formData.append('Arquivo', file)
    })
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
  <div class="mx-auto max-w-3xl text-center">
    <h2 class="text2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Arquivos</h2>
    <p class="mt-2 text-lg leading-8 text-gray-600">
      Gerencie aqui os arquivos exibidos ao usuário no Portal da Transparência.
    </p>
    <div class="-mt-2 text-base leading-8 text-gray-600">Mantenha-os sempre atualizados.</div>
  </div>
  <div class="container max-w-screen-base mx-auto">
    <div>
      <div class="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6 mt-6">
        <div class="grid gap text-sm grid-cols-1">
          <div class="lg:col-span-2">
            <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5 content-end">
              <div class="md:col-span-5">
                <label>Menu</label>
                <select
                  class="h-10 bg-gray-50 border border-gray-200 rounded mt-1 px-4 outline-none text-gray-800 w-full bg-transparent"
                >
                  <option value="" disabled selected>Selecione</option>
                </select>
              </div>
              <div class="md:col-span-1">
                <label>Ano</label>
                <select
                  class="h-10 bg-gray-50 border border-gray-200 rounded mt-1 px-4 outline-none text-gray-800 w-full bg-transparent"
                >
                  <option value="" disabled selected>Selecione</option>
                </select>
              </div>
              <div class="md:col-span-4">
                <label>Categoria</label>
                <select
                  class="h-10 bg-gray-50 border border-gray-200 rounded mt-1 px-4 outline-none text-gray-800 w-full bg-transparent"
                >
                  <option value="" disabled selected>Selecione</option>
                </select>
              </div>
              <div class="md:col-span-5 pt-3">
                <label class="pr-2">Selecione o arquivo</label>
                <input type="file" ref="fileInput" />
              </div>
              <div class="md:col-span-5 text-right">
                <div class="inline-flex items-end">
                  <button
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Publicar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <table class="min-w-full bg-white shadow-md rounded-xl">
        <thead>
          <tr class="bg-blue-gray-100 text-gray-700">
            <th class="py-3 px-4 text-left">Ano</th>
            <th class="py-3 px-4 text-left">Categoria</th>
            <th class="py-3 px-4 text-left">Arquivo</th>
            <th class="py-3 px-4 text-left">Publicado em</th>
            <th class="py-3 px-4 text-left">Ações</th>
          </tr>
        </thead>
        <tbody class="text-blue-gray-900">
          <tr class="border-b border-blue-gray-200">
            <td class="py-3 px-4">2024</td>
            <td class="py-3 px-4">Categoria X</td>
            <td class="py-3 px-4">
              <a href="#" class="text-primary-700"> arquivo01.pdf </a>
            </td>
            <td class="py-3 px-4">02/04/24, 23:00</td>
            <td class="py-3 px-4 flex">
              <a href="#" class="text-primary-700 pr-2" title="Editar">
                <RiEdit2Line />
              </a>
              <a href="#" class="text-red-600" title="Excluir">
                <RiDeleteBin5Line />
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style></style>
