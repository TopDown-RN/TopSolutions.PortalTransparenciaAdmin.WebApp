<script setup>
import { onMounted, ref } from 'vue'
import { getPorToken, alterarSenha } from '@/services/usuario'
import { removeToken } from '@/services/auth/authStorage'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import Password from 'primevue/password'
import Button from 'primevue/button'
import Toast from 'primevue/toast'
import HeadingComponent from '@/components/HeadingComponent.vue'

const router = useRouter()
const toast = useToast()

const senhaRepetida = ref('')
const senhaNova = ref('')
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
    detail: 'Senha alterada com sucesso!',
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

    if (senhaNova.value.length <= 0 || senhaRepetida.value.length <= 0) {
      showError('Informe a senha!')
      return
    }

    await alterarSenha(senhaNova.value, usuario.value.txtCpfCnpj)
    usuario.value.blnAlterarSenha = false
    showSuccess()
    removeToken()
    setTimeout(() => {
      window.location.reload()
    }, 2000)
  } catch (e) {
    showError('Erro ao alterar senha!')
  }
}

router.beforeEach((to, from, next) => {
  if (usuario.value.blnAlterarSenha) {
    next(false)
    router.push(from.path)
  } else {
    next()
  }
})

onMounted(async () => {
  await usuarioPorToken()
  //console.log(usuario.value)
})
</script>

<template>
  <Toast position="top-center" />
  <HeadingComponent
    title="Alterar senha"
    subtitle="Escolha uma senha apropriada"
    :aviso="
      usuario && usuario.blnAlterarSenha
        ? 'Usuário com primeiro acesso devem criar uma nova senha'
        : ''
    "
  />
  <form action="" class="mx-auto max-w-2xl sm:mt-5 dark:text-white/80">
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
