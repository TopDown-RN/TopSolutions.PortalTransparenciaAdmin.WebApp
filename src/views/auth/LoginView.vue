<script setup>
import { login } from '@/services/auth/autenticacao.js'
import { addToken, setIdUsuario } from '@/services/auth/authStorage'
import { onMounted, ref } from 'vue'
import { RiLoginBoxLine } from '@remixicon/vue'
import ProgressSpinner from 'primevue/progressspinner'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'

const toast = useToast()
const txtCpfCnpjEmail = ref('')
const txtPass = ref('')
const btnAcessar = ref(true)

const router = useRouter()

async function postAutenticar() {
  try {
    btnAcessar.value = false
    const response = await login(txtCpfCnpjEmail.value, txtPass.value)
    addToken(response.data.token)
    setIdUsuario(response.data.idUsuario)
    btnAcessar.value = true

    if (
      response.data.txtCpfCnpj === '99999999999' ||
      response.data.txtCpfCnpj === '999.999.999-99'
    ) {
      await router.push('/usuario/novousuario')
    }

    if (response.data.blnAlterarSenha) {
      await router.push('/usuario/alterarsenha')
    }

    window.location.reload()
  } catch (e) {
    btnAcessar.value = true
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

onMounted(() => {
  verificarSessao()
  verificarCadastro()
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
        <p tabindex="0" class="text-2xl font-extrabold leading-6 text-gray-800 focus:outline-none">
          Portal da Transparência
        </p>
        <p
          tabindex="0"
          class="mt-2 pb-8 text-sm font-medium leading-none text-gray-800 focus:outline-none"
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
            />
          </div>
          <div class="mt-8">
            <!-- <button
            role="button"
            class="focus:ring-2 focus:ring-offset-2 focus:ring-primary-700 text-sm font-semibold leading-none text-white focus:outline-none bg-primary-700 border rounded hover:bg-primary-600 py-3 w-full"
            @click="postAutenticar($event)"
          >
            <div class="relative flex items-center justify-center">
              <RiLoginBoxLine class="text-white size-4" />&nbsp;Acessar
            </div>
          </button> -->
            <button
              @click="btnAcessar ? postAutenticar($event) : null"
              :class="{
                'bg-primary-700 hover:bg-primary-600': btnAcessar,
                'cursor-not-allowed bg-primary-600': !btnAcessar
              }"
              :disabled="!btnAcessar"
              class="w-full rounded border py-3 text-sm font-semibold leading-none text-white focus:outline-none focus:ring-2 focus:ring-primary-700 focus:ring-offset-2"
            >
              <span v-if="btnAcessar" class="relative flex items-center justify-center">
                <RiLoginBoxLine class="size-4 text-white" />&nbsp;Acessar
              </span>
              <span v-else>
                <ProgressSpinner
                  style="width: 20px; height: 20px"
                  strokeWidth="8"
                  aria-label="Custom ProgressSpinner"
                />
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
