<script setup>
import { RiFacebookLine, RiInstagramLine, RiTwitterXLine } from '@remixicon/vue'
import { getDadosAdmin, postDadosAdmin } from '@/services/dadosAdmin'
import { ref, onMounted } from 'vue'
//import router from '@/router'
import ProgressSpinner from 'primevue/progressspinner'
import Message from 'primevue/message'
//import { mask } from 'vue-the-mask'
import { manterNumeros } from '@/utils/manterNumeros'

const btnAtualizar = ref(true)
const success = ref(false)
const error = ref(false)

const logo = ref('')
const extensaoLogo = ref('')

const capa = ref('')
const extensaoCapa = ref('')

const orgao = ref('')
const cnpj = ref('')
const rua_avenida = ref('')
const numero = ref('')
const cidade = ref('')
const estado = ref('')
const cep = ref('')
const telefone = ref('')
const email = ref('')

const facebook = ref('')
const instagram = ref('')
const x = ref('')

const srcImgLogo = ref('')
const srcImgCapa = ref('')

const erros = ref([])

// -------------------- Função para controle de messages
function mensagemSucesso() {
  success.value = true
  setTimeout(() => {
    success.value = false
  }, 2000)
}

function mensagemErro() {
  error.value = true
  setTimeout(() => {
    error.value = false
  }, 2000)
}

const estadosOptions = ref([
  { codigo: 'AC', nome: 'Acre' },
  { codigo: 'AL', nome: 'Alagoas' },
  { codigo: 'AP', nome: 'Amapá' },
  { codigo: 'AM', nome: 'Amazonas' },
  { codigo: 'BA', nome: 'Bahia' },
  { codigo: 'CE', nome: 'Ceará' },
  { codigo: 'DF', nome: 'Distrito Federal' },
  { codigo: 'ES', nome: 'Espírito Santo' },
  { codigo: 'GO', nome: 'Goiás' },
  { codigo: 'MA', nome: 'Maranhão' },
  { codigo: 'MT', nome: 'Mato Grosso' },
  { codigo: 'MS', nome: 'Mato Grosso do Sul' },
  { codigo: 'MG', nome: 'Minas Gerais' },
  { codigo: 'PA', nome: 'Pará' },
  { codigo: 'PB', nome: 'Paraíba' },
  { codigo: 'PR', nome: 'Paraná' },
  { codigo: 'PE', nome: 'Pernambuco' },
  { codigo: 'PI', nome: 'Piauí' },
  { codigo: 'RJ', nome: 'Rio de Janeiro' },
  { codigo: 'RN', nome: 'Rio Grande do Norte' },
  { codigo: 'RS', nome: 'Rio Grande do Sul' },
  { codigo: 'RO', nome: 'Rondônia' },
  { codigo: 'RR', nome: 'Roraima' },
  { codigo: 'SC', nome: 'Santa Catarina' },
  { codigo: 'SP', nome: 'São Paulo' },
  { codigo: 'SE', nome: 'Sergipe' },
  { codigo: 'TO', nome: 'Tocantins' }
])

async function pegarDadosAdmin() {
  try {
    const response = await getDadosAdmin()
    logo.value = response.data.imgLogo
    extensaoLogo.value = response.data.txtLogoExtensao

    capa.value = response.data.imgCapa
    extensaoCapa.value = response.data.txtCapaExtensao

    orgao.value = response.data.txtCliente
    cnpj.value = response.data.cpfCnpj
    rua_avenida.value = response.data.txtEndereco
    numero.value = response.data.txtNumEndereco
    cidade.value = response.data.txtCidade
    estado.value = response.data.txtEstado
    cep.value = response.data.txtCep
    telefone.value = response.data.txtNumTelefone
    email.value = response.data.txtEmail

    facebook.value = response.data.txtFacebook
    instagram.value = response.data.txtInstagram
    x.value = response.data.txtX

    srcImgLogo.value = 'data:image/' + extensaoLogo.value + ';base64,' + logo.value
    srcImgCapa.value = 'data:image/' + extensaoCapa.value + ';base64,' + capa.value
  } catch (error) {
    console.log(error)
  }
}

function logoPrevio(event) {
  const file = event.target.files[0]
  srcImgLogo.value = URL.createObjectURL(file)
}

function capaPrevio(event) {
  const file = event.target.files[0]
  srcImgCapa.value = URL.createObjectURL(file)
}

async function atualizarDadosAdmin() {
  try {
    btnAtualizar.value = false

    erros.value = []
    if (!orgao.value) {
      erros.value.push('O campo Órgão é obrigatório')
    }

    if (!cnpj.value) {
      erros.value.push('O campo CNPJ é obrigatório')
    }

    if (!rua_avenida.value) {
      erros.value.push('O campo Rua/Avenida é obrigatório')
    }

    if (!numero.value) {
      erros.value.push('O campo Número é obrigatório')
    }

    if (!cidade.value) {
      erros.value.push('O campo Cidade é obrigatório')
    }

    if (!estado.value) {
      erros.value.push('O campo Estado é obrigatório')
    }

    if (!cep.value) {
      erros.value.push('O campo CEP é obrigatório')
    }

    if (!telefone.value) {
      erros.value.push('O campo Telefone é obrigatório')
    }

    if (!email.value) {
      erros.value.push('O campo E-mail é obrigatório')
    }

    if (!numero.value) {
      erros.value.push('O campo Número é obrigatório')
    }

    if (erros.value.length > 0) {
      btnAtualizar.value = true
      return
    }

    const formData = new FormData()

    const inputImagemLogo = document.getElementById('inputImagemLogo')
    const inputImagemCapa = document.getElementById('inputImagemCapa')

    cep.value = manterNumeros(cep.value)
    telefone.value = manterNumeros(telefone.value)
    cnpj.value = manterNumeros(cnpj.value)

    formData.append('txtCliente', orgao.value)
    formData.append('CpfCnpj', cnpj.value)
    formData.append('txtEndereco', rua_avenida.value)
    formData.append('txtEmail', email.value)
    formData.append('txtNumTelefone', telefone.value)
    formData.append('imgLogo', inputImagemLogo.files[0])
    formData.append('txtNumEndereco', numero.value)
    formData.append('txtCidade', cidade.value)
    formData.append('txtEstado', estado.value)
    formData.append('txtCep', cep.value)
    formData.append('txtFacebook', facebook.value)
    formData.append('txtInstagram', instagram.value)
    formData.append('txtX', x.value)
    formData.append('imgCapa', inputImagemCapa.files[0])

    const response = await postDadosAdmin(formData)

    btnAtualizar.value = true

    mensagemSucesso()

    setTimeout(() => {
      window.location.reload()
    }, 2000)
  } catch (error) {
    btnAtualizar.value = true
    mensagemErro()
    console.log(error)
  }
}

onMounted(() => {
  pegarDadosAdmin()
})
</script>

<template>
  <div class="mx-auto max-w-3xl text-center">
    <h2 class="text2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
      Editar Dados Administrativos
    </h2>
    <p class="mt-2 text-lg leading-8 text-gray-600">
      Os dados alterados aqui impactam diretamente no Portal da Transparência.
    </p>
    <div class="-mt-2 text-base leading-8 text-gray-600">Mantenha-os sempre atualizados.</div>
  </div>
  <div class="container max-w-screen-base mx-auto">
    <div>
      <div class="bg-white rounded shadow-md p-4 px-4 md:p-8 mb-6 mt-6 border">
        <div>
          <Message severity="success" :sticky="true" :life="2000" v-if="success"
            >Dados atualizados sucesso</Message
          >
          <Message severity="error" :sticky="true" :life="2000" v-if="error"
            >Erro ao atualizar dados</Message
          >
        </div>
        <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
          <div class="text-gray-600 content-center">
            <!-- <div class="grid gap-y-2 text-sm grid-cols-1 md:grid-cols-2 content-center">
              <div>
                <label for="inputImagemPerfil">Logo do Município</label>
                <div
                  class="flex justify-center items-center w-24 h-24 overflow-hidden rounded-full relative"
                >
                  <input
                    type="file"
                    id="inputImagemLogo"
                    accept="image/*"
                    class="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <img
                    :src="'data:image/' + extensaoLogo + ';base64,' + logo"
                    alt="Base64 Image"
                    width="100px"
                  />
                </div>
              </div>

              <div>
                <label for="inputImagemCapa">Foto de Capa</label>
                <div class="flex justify-center items-center w-24 h-24 overflow-hidden relative">
                  <input
                    type="file"
                    id="inputImagemCapa"
                    accept="image/*"
                    class="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <img
                    :src="'data:image/' + extensaoCapa + ';base64,' + capa"
                    alt="Base64 Image"
                    width="100px"
                  />
                </div>
              </div>
            </div> -->

            <p class="font-medium text-lg pt-10">Redes Sociais</p>

            <div class="my-2 border w-10/12 justify-center flex items-center rounded-md shadow-md">
              <div>
                <button
                  class="flex items-center bg-gray-100 rounded-l-md border border-white justify-center w-12 h-12 text-white"
                >
                  <RiFacebookLine class="h-6 w-6 text-gray-900" />
                </button>
              </div>
              <div class="w-full">
                <input
                  type="search"
                  x-model="input3"
                  v-model="facebook"
                  class="w-full h-12 px-4 py-1 rounded-r-md border border-gray-100 text-gray-800 focus:outline-none"
                  placeholder="facebook.com/nome"
                />
              </div>
            </div>

            <div class="my-2 border w-10/12 justify-center flex items-center rounded-md shadow-md">
              <div>
                <button
                  class="flex items-center bg-gray-100 rounded-l-md border border-white justify-center w-12 h-12 text-white"
                >
                  <RiInstagramLine class="h-6 w-6 text-gray-900" />
                </button>
              </div>
              <div class="w-full">
                <input
                  type="search"
                  x-model="input1"
                  v-model="instagram"
                  class="w-full h-12 px-4 py-1 rounded-r-md border border-gray-100 text-gray-800 focus:outline-none"
                  placeholder="@instagram"
                />
              </div>
            </div>

            <div class="my-2 border w-10/12 justify-center flex items-center rounded-md shadow-md">
              <div>
                <button
                  class="flex items-center bg-gray-100 rounded-l-md border border-white justify-center w-12 h-12 text-white"
                >
                  <RiTwitterXLine class="h-6 w-6 text-gray-900" />
                </button>
              </div>
              <div class="w-full">
                <input
                  type="search"
                  x-model="input2"
                  v-model="x"
                  class="w-full h-12 px-4 py-1 rounded-r-md border border-gray-100 text-gray-800 focus:outline-none"
                  placeholder="@twitter"
                />
              </div>
            </div>
          </div>

          <div class="lg:col-span-2">
            <div class="grid gap-y-2 text-sm grid-cols-1 md:grid-cols-2 content-center">
              <div>
                <div class="flex items-center relative">
                  <input
                    type="file"
                    id="inputImagemLogo"
                    accept="image/*"
                    @change="logoPrevio"
                    class="absolute top-0 left-0 opacity-0 h-full cursor-pointer"
                  />
                  <img
                    class="object-cover w-24 h-24 rounded-full cursor-pointer"
                    :src="srcImgLogo"
                    alt="Base64 Image Logo"
                  />
                  <div>
                    <h1 class="text-lg font-semibold text-gray-700 capitalize dark:text-white">
                      Logo do Município
                    </h1>
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                      Clique para selecionar uma imagem
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <div class="flex items-center relative">
                  <input
                    type="file"
                    id="inputImagemCapa"
                    accept="image/*"
                    @change="capaPrevio"
                    class="absolute top-0 left-0 h-full opacity-0 cursor-pointer"
                  />
                  <img
                    class="object-cover w-24 h-24 rounded-full cursor-pointer"
                    :src="srcImgCapa"
                    alt="Base64 Image Capa"
                  />
                  <div>
                    <h1 class="text-lg font-semibold text-gray-700 capitalize dark:text-white">
                      Foto de Capa
                    </h1>
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                      Clique para selecionar uma imagem
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
              <div class="md:col-span-4">
                <label for="orgao">Órgão</label>
                <input
                  type="text"
                  name="orgao"
                  id="orgao"
                  class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  placeholder="Informe o órgão"
                  v-model="orgao"
                />
              </div>
              <div class="md:col-span-1">
                <label for="numero">CNPJ</label>
                <input
                  type="text"
                  name="numero"
                  id="numero"
                  class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  v-model="cnpj"
                  placeholder="##.###.###/####-##"
                  v-mask="['##.###.###/####-##']"
                />
              </div>
              <div class="md:col-span-4">
                <label for="rua">Rua/Avenida</label>
                <input
                  type="text"
                  name="rua"
                  id="rua"
                  class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  v-model="rua_avenida"
                  placeholder="Informe a rua ou avenida"
                />
              </div>
              <div class="md:col-span-1">
                <label for="numero">Número</label>
                <input
                  type="text"
                  name="numero"
                  id="numero"
                  class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  v-model="numero"
                  placeholder="Informe o número"
                />
              </div>
              <div class="md:col-span-2">
                <label for="cidade">Cidade</label>
                <input
                  type="text"
                  name="cidade"
                  id="cidade"
                  class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  v-model="cidade"
                  placeholder="Informe a cidade"
                />
              </div>
              <div class="md:col-span-2">
                <label for="estado">Estado</label>
                <select
                  name="estado"
                  id="estado"
                  class="h-10 bg-gray-50 border border-gray-200 rounded mt-1 px-4 outline-none text-gray-800 w-full bg-transparent"
                  v-model="estado"
                >
                  <option value="" disabled selected>Selecione o estado</option>
                  <option
                    v-for="estado in estadosOptions"
                    :key="estado.codigo"
                    :value="estado.codigo"
                  >
                    {{ estado.nome }}
                  </option>
                </select>
              </div>
              <div class="md:col-span-1">
                <label for="cep">CEP</label>
                <input
                  type="text"
                  name="cep"
                  id="cep"
                  class="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  placeholder="#####-###"
                  v-model="cep"
                  v-mask="['#####-###']"
                />
              </div>
              <div class="md:col-span-2">
                <label for="telefone">Telefone</label>
                <input
                  type="text"
                  name="telefone"
                  id="telefone"
                  class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  v-model="telefone"
                  placeholder="(##) #####-####"
                  v-mask="['(##) ####-####', '(##) #####-####']"
                />
              </div>
              <div class="md:col-span-3">
                <label for="email">E-mail</label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  v-model="email"
                  placeholder="Informe o e-mail"
                />
              </div>
              <div class="md:col-span-3">
                <ul>
                  <li v-for="erro in erros" :key="erro" class="text-red-600 list-disc">
                    {{ erro }}
                  </li>
                </ul>
              </div>
              <div class="md:col-span-5 text-right">
                <div class="inline-flex items-end">
                  <!-- <button
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    @click="atualizarDadosAdmin"
                  >
                    Atualizar
                  </button> -->
                  <button
                    @click="btnAtualizar ? atualizarDadosAdmin() : null"
                    :class="{
                      'bg-primary-500 hover:bg-primary-700': btnAtualizar,
                      'bg-primary-700 cursor-not-allowed': !btnAtualizar
                    }"
                    :disabled="!btnAtualizar"
                    class="text-white font-bold py-2 px-4 rounded h-9 w-24 flex items-center justify-center"
                  >
                    <span v-if="btnAtualizar">Atualizar</span>
                    <span v-else>
                      <ProgressSpinner
                        style="width: 20px; height: 20px"
                        strokeWidth="8"
                        aria-label="Custom ProgressSpinner"
                      />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
