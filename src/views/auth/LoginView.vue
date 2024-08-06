<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/services/auth/autenticacao.js'
import { addToken, setIdUsuario } from '@/services/auth/authStorage'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'

const toast = useToast()
const txtCpfCnpjEmail = ref('')
const txtPass = ref('')
const loading = ref(false)

const router = useRouter()

async function postAutenticar() {
  try {
    loading.value = true
    const response = await login(txtCpfCnpjEmail.value, txtPass.value)
    addToken(response.data.token)
    setIdUsuario(response.data.idUsuario)
    loading.value = false

    if (
      response.data.txtCpfCnpj === '99999999999' ||
      response.data.txtCpfCnpj === '999.999.999-99'
    ) {
      await router.push('/usuario/novousuario')
    } else if (response.data.blnAlterarSenha) {
      await router.push('/usuario/alterarsenha')
    } else {
      await router.push('/')
    }

    window.location.reload()
  } catch (e) {
    loading.value = false
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'Usuário não cadastrado ou senha de usuário inválida.',
      life: 5000
    })
    console.error('erro ao obter os arquivos:', e)
  }
}

function verificarSessao() {
  if (localStorage.getItem('sessao-expirada')) {
    toast.add({
      severity: 'warn',
      summary: 'Sessão Expirada',
      detail: 'Sua sessão foi expirada!',
      life: 5000
    })
    localStorage.removeItem('sessao-expirada')
  }
}

function verificarCadastro() {
  if (localStorage.getItem('cadastro-sucesso')) {
    toast.add({
      severity: 'success',
      summary: 'Successo',
      detail: 'Usuário cadastrado com sucesso!',
      life: 5000
    })
    localStorage.removeItem('cadastro-sucesso')
  }
}

function verificarRedefinirSenha() {
  if (localStorage.getItem('redefinir-senha-sucesso')) {
    toast.add({
      severity: 'success',
      summary: 'Successo',
      detail: 'Sua senha foi redefinida com sucesso!',
      life: 5000
    })
    localStorage.removeItem('redefinir-senha-sucesso')
  }
}

onMounted(() => {
  verificarSessao()
  verificarCadastro()
  verificarRedefinirSenha()
})
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
        <form action="">
          <div class="py-1">
            <label id="email" class="text-sm font-medium leading-none text-gray-600"
              >E-mail, CPF ou CNPJ</label
            >
            <InputText
              v-model="txtCpfCnpjEmail"
              id="txtCpfCnpjEmail"
              aria-labelledby="email"
              type="email"
              class="my-1 w-full"
              placeholder="Digite seu e-mail, CPF ou CNPJ"
            />
            <small id="username-help" class="text-gray-500"
              >Informe apenas <b>Números</b> para CPF e CNPJ.</small
            >
          </div>
          <div class="py-1">
            <label for="pass" class="text-sm font-medium leading-none text-gray-600">Senha</label>
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
          <div class="mt-8 flex justify-center">
            <Button
              class="w-full"
              type="submit"
              label="Acessar"
              icon="pi pi-sign-in"
              :loading="loading"
              @click="postAutenticar($event)"
            />
          </div>
          <div class="mx-auto mt-4 max-w-5xl text-right">
            <RouterLink
              to="esqueceu-senha"
              class="font-medium text-primary-500 underline hover:text-primary-700"
            >
              Esqueci minha senha
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
