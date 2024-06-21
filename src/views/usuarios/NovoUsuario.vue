<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import { postSaveUsuario } from '@/services/usuario'
import { removeToken } from '@/services/auth/authStorage'
import HeadingComponent from '@/components/HeadingComponent.vue'

const router = useRouter()
const toast = useToast()

const idUsuario = ref(0)
const txtNome = ref('')
const txtCpfCnpj = ref('')
const txtEmail = ref('')
const txtPass = ref('')
const senhaRepetida = ref('')
const isValid = ref(true)

async function SaveUsuario() {
  try {
    removeMask()

    if (senhaRepetida.value !== txtPass.value) {
      showError('Senhas não conferem!')
      return
    }

    if (!validarCampos()) {
      return
    }

    await postSaveUsuario(
      idUsuario.value,
      txtNome.value,
      txtCpfCnpj.value,
      txtEmail.value,
      txtPass.value,
      false,
      false
    )
    localStorage.setItem('cadastro-sucesso', 'true')
    removeToken()
    window.location.reload()
  } catch (e) {
    showError('Ocorreu um erro ao salvar usuário')
    console.error('Ocorreu um erro ao salvar usuário: ', e)
  }
}

function removeMask() {
  txtCpfCnpj.value = txtCpfCnpj.value.replace(/\D/g, '')
}

function showError(error) {
  toast.add({ severity: 'error', summary: 'Erro!', detail: error, life: 5000 })
}

function validarCampos() {
  if (
    !txtNome.value ||
    !txtCpfCnpj.value ||
    !txtEmail.value ||
    !txtPass.value ||
    !senhaRepetida.value
  ) {
    isValid.value = false
  }

  return isValid.value
}

router.beforeEach((to, from, next) => {
  next(false)
  router.push(from.path)
})
</script>

<template>
  <Toast position="top-center" />
  <HeadingComponent
    title="Cadastre seu usuário"
    aviso="Você precisa criar seu usuario para os próximos logins"
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
        <label for="cpf">CPF/CNPJ</label>
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
            type="email"
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
            :invalid="!txtPass && !isValid"
            placeholder="Digite sua senha"
            class="w-full"
          />
          <small v-if="!txtPass && !isValid" class="text-red-600"
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
            :invalid="!senhaRepetida && !isValid"
            placeholder="Digite a senha novamente"
            class="w-full"
          />
          <small v-if="!senhaRepetida && !isValid" class="text-red-600"
            >O campo Senha é obrigatório</small
          >
        </div>
      </div>
    </div>
    <div class="mt-10">
      <Button label="Cadastrar" @click="SaveUsuario" />
    </div>
  </form>
</template>

<style scoped></style>
