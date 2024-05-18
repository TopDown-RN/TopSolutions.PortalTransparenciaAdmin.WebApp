<script setup>
import { getPorToken, alterarSenha } from '@/services/usuario'
//import { login } from '@/services/auth/autenticacao.js'
import { onMounted, ref } from 'vue'
import Password from 'primevue/password'
import Button from 'primevue/button'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'

const senhaRepetida = ref('')
const senhaNova = ref('')
const toast = useToast()
const usuario = ref()

async function usuarioPorToken() {
  try {
    const response = await getPorToken()
    usuario.value = response.data
  } catch (e) {
    //console.error('erro:', e)
  }
}

function showSuccess() {
  toast.add({
    severity: 'success',
    summary: 'Successo',
    detail: 'Dados atualizados sucesso!',
    life: 2000
  })
}

function showError(error) {
  toast.add({ severity: 'error', summary: 'Erro!', detail: error, life: 3000 })
}

async function salvar() {
  try {
    if (senhaRepetida.value != senhaNova.value) {
      showError('Senhas não conferem!')
      return
    }

    if (senhaNova.value.length < 0 || senhaRepetida.value.length < 0) {
      showError('Informe a senha!')
      return
    }

    const response = await alterarSenha(senhaNova.value, usuario.value.txtCpfCnpj)
    console.log(response.data)
    showSuccess()
  } catch (e) {
    showError('Erro ao alterar senha!')
  }
}

onMounted(async () => {
  await usuarioPorToken()
  //console.log(usuario.value)
})
</script>

<template>
  <Toast />
  <div class="mx-auto max-w-3xl text-center">
    <h2 class="text2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
      <span> Alterar Senha </span>
    </h2>
    <p class="mt-2 text-lg leading-8 text-gray-600">
      <span v-if="usuario && usuario.blnAlterarSenha" class="text-yellow-600 bg-yellow-200 p-1"
        >Usuário com primeiro acesso podem criar uma nova senha</span
      >
      <span v-else>Escolha uma senha apropriada</span>
    </p>
  </div>
  <form class="mx-auto max-w-2xl sm:mt-5">
    <div class="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-1">
      <!-- <div>
        <label for="password">Senha atual</label>
        <div class="mt-1.5">
          <Password
            toggleMask
            :feedback="false"
            v-model="senhaAntiga"
            name="senhaAntiga"
            id="senhaAntiga"
            class="w-full"
          />
        </div>
      </div> -->
      <div>
        <label for="password">Senha nova</label>
        <div class="mt-1.5">
          <Password
            toggleMask
            :feedback="false"
            v-model.trim="senhaNova"
            name="senhaNova"
            id="senhaNova"
            class="w-full"
          />
        </div>
      </div>
      <div>
        <label for="password">Digite a nova senha novamente</label>
        <div class="mt-1.5">
          <Password
            toggleMask
            :feedback="false"
            v-model.trim="senhaRepetida"
            name="senhaNova"
            id="senhaNova"
            class="w-full"
          />
        </div>
      </div>
      <!-- <div>
        <label for="confirmPassword">Digite a nova senha novamente</label>
        <div class="mt-1.5">
          <Password :feedback="false" name="confirmPassword" id="confirmPassword" class="w-full" />
        </div>
      </div> -->
    </div>
    <div class="mt-10">
      <Button label="Salvar" @click="salvar()" />
    </div>
  </form>
</template>
