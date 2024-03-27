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

const txtNome = ref('');
const txtCpfCnpj = ref('');
const txtEmail = ref('');
const txtPass = ref('');
const blnAcessoExterno = ref(false);


const files = ref([]);

async function postSaveArquivos() {
  try {

    const formData = new FormData();
    let dados = {
      idArquivo : 0,
      txtDescricao : "AAAAAAA",
      Arquivo : "adsasda",
      txtArquivoOCR: "adsasda",
      idUsuario: "adsasda",
      idCategoriaPubArquivo: "adsasda"

    }

    for (let i = 0; i < files.length; i++) {
        formData.append('files[]', files[i]);
      }
      console.log(files.length);
      //const response = await postArquivos(dados)
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
  <dv>Arquivos</dv>
  <div><InputText type="text" v-model="value" /></div>
  <div><FileUpload mode="basic" v-model="files" name="demo[]" :auto="false" :multiple="true" accept="image/*" :maxFileSize="1000000" @upload="onUpload" /></div>
  <div>
    <Button
      type="button"
      @click="postSaveArquivos()"
      class="focus:ring-2 focus:ring-offset-2 focus:ring-primary-700 text-sm font-semibold leading-none text-white focus:outline-none bg-primary-700 border rounded hover:bg-primary-600 py-3"
    >
      Adicionar novo usuário
    </Button>
  </div>
</template>

<style>

</style>