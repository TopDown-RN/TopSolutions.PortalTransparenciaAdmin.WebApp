<script setup>
// import Checkbox from 'primevue/checkbox';
import { postSaveUsuario, getUsuario } from '@/services/usuario'
import { onMounted, ref, watch } from 'vue'
import router from '@/router'
import { useRoute, useRouter } from 'vue-router'

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

async function SaveUsuario() {
  try {
      const response = await postSaveUsuario(idUsuario.value, txtNome.value ,txtCpfCnpj.value, txtEmail.value ,txtPass.value, blnAcessoExterno.value)
      //result.value = response.data
      //console.log(idUsuario.value, txtNome.value);
      //localStorage.setItem('token', response.token)
      router.push({name: 'usuarios'})
   } catch (error) {
     console.error('erro ao obter os arquivos:', error)
   }
}

async function fetchUsuario(_idUsuario) {
  try {
      const response = await getUsuario(_idUsuario)
      //result.value = response.data
      idUsuario.value = _idUsuario
      txtNome.value = response.data.txtNome
      txtCpfCnpj.value = response.data.txtCpfCnpj
      txtEmail.value = response.data.txtEmail
      blnAcessoExterno.value =  response.data.blnAcessoExterno
      //console.log(response.data);
      //localStorage.setItem('token', response.token)
      
   } catch (error) {
     console.error('erro ao obter os arquivos:', error)
   }
}

watch(result, () => {
  //loading.value = false
})

onMounted(() => {
  //fetchArp()
  extractParamFromPath()
  if(idUsuario.value != null){
    fetchUsuario(idUsuario.value)
  }
})


</script>

<template>
  <div class="mx-auto max-w-3xl text-center">
    <h2 class="text2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
      Cadastrar novo usuário
    </h2>
    <p class="mt-2 text-lg leading-8 text-gray-600">
      Novos usuários podem acessar e fazer edições através do Painel Administrativo.
    </p>
  </div>
  <form class="mx-auto max-w-6xl sm:mt-10">
    <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
      <div class="sm:col-span-2">
        <label for="fullName" class="block text-sm font-semibold leading-6 text-black"
          >Nome Completo</label
        >
        <div class="mt-2.5">
          <input
           v-model="txtNome"
            type="text"
            name="txtNome"
            id="txtNome"
            class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-primary-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:ring-2 focus:ring-inset focus:ring-primary-500 focus:outline-none"
          />
        </div>
      </div>
      <div>
        <label for="cpf" class="block text-sm font-semibold leading-6 text-black">CPF</label>
        <div class="mt-2.5">
          <input
            v-model="txtCpfCnpj"
            type="text"
            name="txtCpfCnpj"
            id="txtCpfCnpj"
            class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-primary-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:ring-2 focus:ring-inset focus:ring-primary-500 focus:outline-none"
          />
        </div>
      </div>
      <div>
        <label for="email" class="block text-sm font-semibold leading-6 text-black">E-mail</label>
        <div class="mt-2.5">
          <input
            v-model="txtEmail"
            type="text"
            name="txtEmail"
            id="txtEmail"
            class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-primary-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:ring-2 focus:ring-inset focus:ring-primary-500 focus:outline-none"
          />
        </div>
      </div>
      <div>
        <label for="password" class="block text-sm font-semibold leading-6 text-black">Senha</label>
        <div class="mt-2.5">
          <input
           v-model="txtPass"
            type="password"
            name="txtPass"
            id="txtPass"
            class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-primary-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:ring-2 focus:ring-inset focus:ring-primary-500 focus:outline-none"
          />
        </div>
      </div>
      <div>
        <label for="confirmPassword" class="block text-sm font-semibold leading-6 text-black"
          >Digite a senha novamente</label
        >
        <div class="mt-2.5">
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-primary-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:ring-2 focus:ring-inset focus:ring-primary-500 focus:outline-none"
          />
        </div>
      </div>
      <div class="card flex flex-wrap justify-content-center gap-3">
    <div class="flex align-items-center">
      <input type="checkbox" value="blnAcessoExterno" name="blnAcessoExterno" v-model="blnAcessoExterno" />

        <!-- <Checkbox inputId="ingredient1" name="pizza" value="Cheese" ></Checkbox> -->
        <label for="ingredient1" class="ml-2"> Acesso Externo </label>
    </div>
   
</div>

    </div>
    <div class="mt-10">
      <button
        type="button"
        @click="SaveUsuario"
        class="block w-full rounded-md bg-primary-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-pimary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-800"
      >
        Cadastrar
      </button>
    </div>
  </form>
</template>

<style scoped></style>
