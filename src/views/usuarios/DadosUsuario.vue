<script setup>
import { postSaveUsuario, getUsuario } from '@/services/usuario'
import { onMounted, ref, watch } from 'vue'
import router from '@/router'
import { useRoute, useRouter } from 'vue-router'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Checkbox from 'primevue/checkbox'
import Button from 'primevue/button'
import { useStore } from 'vuex'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'

const idUsuario = ref(0)

const route = useRoute()
const router1 = useRouter()

const store = useStore()
const toast = useToast()

function extractParamFromPath() {
  const matchedRoute = router1.resolve(route.path)
  const params = matchedRoute.params

  if (params && params.id) {
    idUsuario.value = params.id
  }
}

const result = ref()

const txtNome = ref('')
const txtCpfCnpj = ref('')
const txtEmail = ref('')
const txtPass = ref('')
const blnAcessoExterno = ref(false)
const blnAlterarSenha = ref(false)

async function SaveUsuario() {
  try {
    removeMask()

    await postSaveUsuario(
      idUsuario.value,
      txtNome.value,
      txtCpfCnpj.value,
      txtEmail.value,
      txtPass.value,
      blnAcessoExterno.value,
      blnAlterarSenha.value
    )
    const toastMessage = 'Usuário cadastrado com sucesso!'
    store.commit('setToastMessage', toastMessage)
    router.push({ name: 'usuarios' })
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Ocorreu um erro ao salvar usuário',
      life: 5000
    })
    console.error('erro ao obter os arquivos:', error)
  }
}

async function fetchUsuario(_idUsuario) {
  try {
    const response = await getUsuario(_idUsuario)
    idUsuario.value = _idUsuario
    txtNome.value = response.data.txtNome
    txtCpfCnpj.value = response.data.txtCpfCnpj
    txtEmail.value = response.data.txtEmail
    blnAcessoExterno.value = response.data.blnAcessoExterno
    blnAlterarSenha.value = response.data.blnAlterarSenha
  } catch (error) {
    console.error('erro ao obter os arquivos:', error)
  }
}

function removeMask() {
  txtCpfCnpj.value = txtCpfCnpj.value.replace(/\D/g, '')
}

watch(result, () => {
  //loading.value = false
})

onMounted(() => {
  extractParamFromPath()
  if (idUsuario.value !== 0) {
    fetchUsuario(idUsuario.value)
  }
})
</script>

<template>
  <Toast />
  <div class="mx-auto max-w-3xl text-center">
    <h2 class="text2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
      <span v-if="route.name === 'usuario-editar'"> Editar usuário </span>
      <span v-else> Cadastrar usuário </span>
    </h2>
    <p class="mt-2 text-lg leading-8 text-gray-600">
      Novos usuários podem acessar e fazer edições através do Painel Administrativo.
    </p>
  </div>
  <form class="mx-auto max-w-6xl sm:mt-10">
    <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
      <div class="sm:col-span-2">
        <label for="fullName">Nome completo</label>
        <div class="mt-1.5">
          <InputText v-model="txtNome" name="txtNome" id="txtNome" class="w-full" />
        </div>
      </div>
      <div>
        <label for="cpf">CPF</label>
        <div class="mt-1.5">
          <InputText
            v-model="txtCpfCnpj"
            v-mask="['###.###.###-##', '##.###.###/####-##']"
            name="txtCpfCnpj"
            id="txtCpfCnpj"
            class="w-full"
          />
        </div>
      </div>
      <div>
        <label for="email">E-mail</label>
        <div class="mt-1.5">
          <InputText v-model="txtEmail" name="txtEmail" id="txtEmail" class="w-full" />
        </div>
      </div>
      <div>
        <label for="password">Senha</label>
        <div class="mt-1.5">
          <Password
            toggleMask
            :feedback="false"
            v-model="txtPass"
            name="txtPass"
            id="txtPass"
            class="w-full"
          />
        </div>
      </div>
      <div>
        <label for="confirmPassword">Digite a senha novamente</label>
        <div class="mt-1.5">
          <Password :feedback="false" name="confirmPassword" id="confirmPassword" class="w-full" />
        </div>
      </div>
      <div class="card flex flex-wrap justify-content-center gap-3">
        <div class="flex align-items-center">
          <Checkbox
            v-model="blnAcessoExterno"
            inputId="acesso"
            name="blnAcessoExterno"
            :binary="true"
            value="blnAcessoExterno"
          />
          <label for="acesso" class="ml-2">Acesso Externo</label>
        </div>
      </div>
      <div class="card flex flex-wrap justify-content-center gap-3">
        <div class="flex align-items-center">
          <Checkbox
            v-model="blnAlterarSenha"
            inputId="altersenha"
            name="blnAlterarSenha"
            :binary="true"
            value="blnAlterarSenha"
          />
          <label for="acesso" class="ml-2">Alterar senha padrão?</label>
        </div>
      </div>
    </div>
    <div class="mt-10">
      <Button label="Cadastrar" @click="SaveUsuario" />
    </div>
  </form>
</template>

<style scoped></style>
