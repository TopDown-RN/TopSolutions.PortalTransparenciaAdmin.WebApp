<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { postSaveUsuario, getUsuario } from '@/services/usuario'
import { useToastStore } from '@/stores/toastStore'
import router from '@/router'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Checkbox from 'primevue/checkbox'
import Button from 'primevue/button'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import HeadingComponent from '@/components/HeadingComponent.vue'

const idUsuario = ref(0)

const route = useRoute()
const router1 = useRouter()

const toastStore = useToastStore()
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
const senhaRepetida = ref('')
const blnAcessoExterno = ref(false)
const blnAlterarSenha = ref(false)

const alterarSenha = route.name === 'usuario-editar' ? ref(false) : ref(true)

const isValid = ref(true)

async function SaveUsuario() {
  try {
    removeMask()

    if (txtPass.value !== senhaRepetida.value) {
      showError('Senhas não conferem!')
      return
    }

    if (!validarCampos()) {
      return
    }

    if (alterarSenha.value && !txtPass.value && !senhaRepetida.value) {
      showError('Campo senha é obrigatório')
      return
    }

    await postSaveUsuario(
      idUsuario.value,
      txtNome.value,
      txtCpfCnpj.value,
      txtEmail.value,
      txtPass.value,
      blnAcessoExterno.value,
      blnAlterarSenha.value
    )

    toastStore.setMessage('Usuário cadastrado com sucesso!')
    router.push({ path: '/usuarios' })
  } catch (error) {
    showError('Ocorreu um erro ao salvar usuário')
    console.error('Ocorreu um erro ao salvar usuário: ', error)
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

function validarCampos() {
  isValid.value = true

  if (route.name === 'usuario-editar' && !alterarSenha.value) {
    if (!txtNome.value || !txtCpfCnpj.value || !txtEmail.value) {
      isValid.value = false
    }
  } else {
    if (
      !txtNome.value ||
      !txtCpfCnpj.value ||
      !txtEmail.value ||
      !txtPass.value ||
      !senhaRepetida.value
    ) {
      isValid.value = false
    }
  }

  return isValid.value
}

function showError(error) {
  toast.add({ severity: 'error', summary: 'Erro!', detail: error, life: 5000 })
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
  <Toast position="top-center" />

  <HeadingComponent
    :title="route.name === 'usuario-editar' ? 'Editar usuário' : 'Cadastrar usuário'"
    subtitle="Novos usuários podem acessar e fazer edições através do Painel Administrativo."
  />

  <form class="mx-auto max-w-6xl sm:mt-10 dark:text-white/80">
    <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
      <div class="sm:col-span-2">
        <label for="fullName">Nome completo</label>
        <div class="mt-1.5">
          <InputText
            v-model="txtNome"
            name="txtNome"
            id="txtNome"
            :invalid="!txtNome && !isValid"
            class="w-full"
          />
          <small v-if="!txtNome && !isValid" class="text-red-600">O campo Nome é obrigatório</small>
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
            :invalid="!txtCpfCnpj && !isValid"
            class="w-full"
          />
          <small v-if="!txtCpfCnpj && !isValid" class="text-red-600"
            >O campo CPF/CNPJ é obrigatório</small
          >
        </div>
      </div>
      <div>
        <label for="email">E-mail</label>
        <div class="mt-1.5">
          <InputText
            v-model="txtEmail"
            name="txtEmail"
            id="txtEmail"
            :invalid="!txtEmail && !isValid"
            class="w-full"
          />
          <small v-if="!txtEmail && !isValid" class="text-red-600"
            >O campo Email é obrigatório</small
          >
        </div>
      </div>
      <div>
        <label for="password">Senha</label>
        <div class="mt-1.5">
          <Password
            toggleMask
            :feedback="false"
            v-model.trim="txtPass"
            name="txtPass"
            id="txtPass"
            :invalid="alterarSenha && !txtPass && !isValid"
            :disabled="!alterarSenha"
            :placeholder="!alterarSenha ? 'Desabilitado' : 'Digite a senha'"
            class="w-full"
          />
          <small v-if="alterarSenha && !txtPass && !isValid" class="text-red-600"
            >O campo Senha é obrigatório</small
          >
        </div>
      </div>
      <div>
        <label for="confirmPassword">Digite a senha novamente</label>
        <div class="mt-1.5">
          <Password
            toggleMask
            :feedback="false"
            name="confirmPassword"
            id="confirmPassword"
            v-model.trim="senhaRepetida"
            :invalid="alterarSenha && !senhaRepetida && !isValid"
            :disabled="!alterarSenha"
            :placeholder="!alterarSenha ? 'Desabilitado' : 'Digite a senha'"
            class="w-full"
          />
          <small v-if="alterarSenha && !senhaRepetida && !isValid" class="text-red-600"
            >O campo Senha é obrigatório</small
          >
        </div>
      </div>
    </div>

    <div class="mt-4 flex flex-wrap justify-center gap-3">
      <div class="flex items-center">
        <Checkbox
          v-model="blnAcessoExterno"
          inputId="acesso"
          name="blnAcessoExterno"
          :binary="true"
          value="blnAcessoExterno"
        />
        <label for="acesso" class="ml-2"> Acesso Externo </label>
      </div>
      <div class="flex items-center">
        <Checkbox
          v-model="blnAlterarSenha"
          inputId="senhaPadrao"
          name="blnAlterarSenha"
          :binary="true"
          value="blnAlterarSenha"
        />
        <label for="senhaPadrao" class="ml-2"> Alterar senha no próximo Login </label>
      </div>
      <div v-if="route.name === 'usuario-editar'" class="flex items-center">
        <Checkbox
          v-model="alterarSenha"
          inputId="alterarSenha"
          name="alterarSenha"
          :binary="true"
          value="alterarSenha"
        />
        <label for="alterarSenha" class="ml-2"> Alterar Senha do usuário? </label>
      </div>
    </div>

    <div class="mt-10">
      <Button label="Cadastrar" @click="SaveUsuario" />
    </div>
  </form>
</template>

<style scoped></style>
