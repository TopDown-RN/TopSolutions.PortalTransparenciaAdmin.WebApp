<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { alterarSenha } from '@/services/auth/autenticacao'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import Button from 'primevue/button'
import Password from 'primevue/password'

const route = useRoute()
const router = useRouter()

const token = route.query.t
const toast = useToast()
const txtPass = ref('')
const txtPassConfirm = ref('')
const loading = ref(false)

async function redefinirSenha() {
  try {
    if (txtPassConfirm.value != txtPass.value) {
      showError('Senhas não conferem!')
      return
    }

    if (txtPass.value.length <= 0 || txtPassConfirm.value.length <= 0) {
      showError('Informe a senha!')
      return
    }

    loading.value = true

    await alterarSenha(txtPass.value, token)
    localStorage.setItem('redefinir-senha-sucesso', 'true')
    router.push('/login')
  } catch (e) {
    showError('Erro ao alterar senha!')
  }

  loading.value = false
}

function showError(error) {
  toast.add({ severity: 'error', summary: 'Erro!', detail: error, life: 3000 })
}
</script>

<template>
  <Toast position="top-center" />
  <div class="min-h-screen w-full bg-gray-200 px-4 py-9">
    <div class="flex flex-col items-center justify-center">
      <img
        tabindex="0"
        class="focus:outline-none"
        aria-label="logo"
        role="img"
        src="/logoTopVertical.png"
        alt="logo"
        width="188"
        height="74"
      />
      <div>
        <p
          tabindex="0"
          class="mt-4 text-sm font-medium leading-none text-gray-500 focus:outline-none"
        >
          Desenvolvendo e otimizando soluções em TI desde 1993
        </p>
      </div>
      <div class="mt-9 w-full rounded bg-white p-10 shadow md:max-w-lg lg:w-1/3">
        <p
          tabindex="0"
          class="text-center text-2xl font-extrabold leading-6 text-gray-800 focus:outline-none"
        >
          Portal da Transparência
        </p>
        <p
          tabindex="0"
          class="mt-2 pb-8 text-center text-sm font-medium leading-none text-gray-800 focus:outline-none"
        >
          Painel Administrativo
        </p>

        <p
          tabindex="0"
          class="pb-4 text-center text-lg font-medium text-gray-600 focus:outline-none"
        >
          Alterar senha
        </p>

        <form action="">
          <div class="py-1">
            <label for="pass" class="text-sm font-medium leading-none text-gray-600"
              >Digite uma nova senha</label
            >
            <Password
              v-model="txtPass"
              id="pass"
              aria-labelledby="email"
              class="w-full py-2"
              :feedback="false"
              toggleMask
              placeholder="Digite sua senha"
            />
          </div>

          <div class="py-1">
            <label for="pass" class="text-sm font-medium leading-none text-gray-600"
              >Confirme sua senha</label
            >
            <Password
              v-model="txtPassConfirm"
              id="pass-confirm"
              aria-labelledby="email"
              class="w-full py-2"
              :feedback="false"
              toggleMask
              placeholder="Digite sua senha"
            />
          </div>

          <div class="mt-8 flex justify-center">
            <Button
              class="w-full"
              type="submit"
              label="Alterar senha"
              :loading="loading"
              @click="redefinirSenha($event)"
            />
          </div>

          <div class="mx-auto mt-4 max-w-5xl text-center">
            <RouterLink
              to="login"
              class="font-medium text-primary-500 underline hover:text-primary-700"
            >
              Voltar para o login
            </RouterLink>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style>
span[data-pc-section='label'] {
  flex: initial;
  display: inline-block;
}
</style>
