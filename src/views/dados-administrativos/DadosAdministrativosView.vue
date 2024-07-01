<script setup>
import { RiFacebookLine, RiInstagramLine, RiTwitterXLine } from '@remixicon/vue'
import { getDadosAdmin, postDadosAdmin } from '@/services/dadosAdmin'
import { ref, onMounted } from 'vue'
import ProgressSpinner from 'primevue/progressspinner'
import { manterNumeros } from '@/utils/manterNumeros'
import InputText from 'primevue/inputtext'
import InputMask from 'primevue/inputmask'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import HeadingComponent from '@/components/HeadingComponent.vue'

const loading = ref(true)
const toast = useToast()

const btnAtualizar = ref(true)
const isValid = ref(true)

const logo = ref('')
const extensaoLogo = ref('')
const srcImgLogo = ref('')
const capa = ref('')
const extensaoCapa = ref('')
const srcImgCapa = ref('')

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
    loading.value = false
  } catch (error) {
    console.log(error)
    loading.value = false
  }
}

async function atualizarDadosAdmin() {
  try {
    btnAtualizar.value = false

    if (!validarCampos()) {
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

    await postDadosAdmin(formData)

    btnAtualizar.value = true
    showSuccess()

    setTimeout(() => {
      window.location.reload()
    }, 2000)
  } catch (error) {
    btnAtualizar.value = true
    showError()
    console.log(error)
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

function showError() {
  toast.add({ severity: 'error', summary: 'Erro!', detail: 'Erro ao atualizar dados!', life: 3000 })
}

function logoPreview(event) {
  const file = event.target.files[0]
  srcImgLogo.value = URL.createObjectURL(file)
}

function capaPreview(event) {
  const file = event.target.files[0]
  srcImgCapa.value = URL.createObjectURL(file)
}

function validarCampos() {
  isValid.value = true

  if (
    !orgao.value ||
    !cnpj.value ||
    !rua_avenida.value ||
    !numero.value ||
    !cidade.value ||
    !estado.value ||
    !cep.value
    //!telefone.value ||
    //!email.value
  ) {
    btnAtualizar.value = true
    isValid.value = false
  }

  return isValid.value
}

onMounted(() => {
  pegarDadosAdmin()
})
</script>

<template>
  <Toast position="top-center" />
  <HeadingComponent
    title="Dados Administrativos"
    subtitle="Os dados alterados aqui impactam diretamente no Portal da Transparência."
    description="Mantenha-os sempre atualizados."
  />
  <div v-if="loading" class="my-4 text-center">
    <ProgressSpinner />
  </div>
  <div v-if="!loading" class="max-w-screen-base container mx-auto">
    <div>
      <div
        class="mb-6 mt-6 rounded border bg-white p-4 px-4 shadow-md md:p-8 dark:border-white/20 dark:bg-surface-800 dark:text-white/80"
      >
        <div class="grid grid-cols-1 gap-4 gap-y-2 text-sm lg:grid-cols-3">
          <div class="content-center text-gray-600 dark:text-white/80">
            <p class="pt-10 text-lg font-medium">Redes Sociais</p>

            <div
              class="my-2 flex w-10/12 items-center justify-center rounded-md border shadow-md dark:border-none"
            >
              <div>
                <button
                  class="flex h-12 w-12 items-center justify-center rounded-l-md border border-white bg-gray-100 text-white dark:bg-surface-900"
                >
                  <RiFacebookLine class="h-6 w-6 text-gray-900 dark:text-white/80" />
                </button>
              </div>
              <div class="w-full">
                <input
                  type="search"
                  x-model="input3"
                  v-model="facebook"
                  class="h-12 w-full rounded-r-md border border-gray-100 px-4 py-1 text-gray-800 focus:outline-none dark:bg-surface-800 dark:text-white/80"
                  placeholder="facebook.com/nome"
                />
              </div>
            </div>

            <div
              class="my-2 flex w-10/12 items-center justify-center rounded-md border shadow-md dark:border-none"
            >
              <div>
                <button
                  class="flex h-12 w-12 items-center justify-center rounded-l-md border border-white bg-gray-100 text-white dark:bg-surface-900"
                >
                  <RiInstagramLine class="h-6 w-6 text-gray-900 dark:text-white/80" />
                </button>
              </div>
              <div class="w-full">
                <input
                  type="search"
                  x-model="input1"
                  v-model="instagram"
                  class="h-12 w-full rounded-r-md border border-gray-100 px-4 py-1 text-gray-800 focus:outline-none dark:bg-surface-800 dark:text-white/80"
                  placeholder="@instagram"
                />
              </div>
            </div>

            <div
              class="my-2 flex w-10/12 items-center justify-center rounded-md border shadow-md dark:border-none"
            >
              <div>
                <button
                  class="flex h-12 w-12 items-center justify-center rounded-l-md border border-white bg-gray-100 text-white dark:bg-surface-900"
                >
                  <RiTwitterXLine class="h-6 w-6 text-gray-900 dark:text-white/80" />
                </button>
              </div>
              <div class="w-full">
                <input
                  type="search"
                  x-model="input2"
                  v-model="x"
                  class="h-12 w-full rounded-r-md border border-gray-100 px-4 py-1 text-gray-800 focus:outline-none dark:bg-surface-800 dark:text-white/80"
                  placeholder="@twitter"
                />
              </div>
            </div>
          </div>

          <div class="lg:col-span-2">
            <div class="grid grid-cols-1 content-center gap-y-2 text-sm md:grid-cols-2">
              <div>
                <div class="relative flex items-center">
                  <input
                    type="file"
                    id="inputImagemLogo"
                    accept="image/*"
                    @change="logoPreview"
                    class="absolute left-0 top-0 h-full cursor-pointer opacity-0"
                  />
                  <img
                    class="h-24 w-24 cursor-pointer rounded-full object-cover"
                    :src="srcImgLogo"
                    alt="Base64 Image Logo"
                  />
                  <div>
                    <h1 class="text-lg font-semibold capitalize text-gray-700 dark:text-white">
                      Logo do Município
                    </h1>
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                      Clique para selecionar uma imagem
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <div class="relative flex items-center">
                  <input
                    type="file"
                    id="inputImagemCapa"
                    accept="image/*"
                    @change="capaPreview"
                    class="absolute left-0 top-0 h-full cursor-pointer opacity-0"
                  />
                  <img
                    class="h-24 w-24 cursor-pointer rounded-full object-cover"
                    :src="srcImgCapa"
                    alt="Base64 Image Capa"
                  />
                  <div>
                    <h1 class="text-lg font-semibold capitalize text-gray-700 dark:text-white">
                      Foto de Capa
                    </h1>
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                      Clique para selecionar uma imagem
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 gap-4 gap-y-2 text-sm md:grid-cols-5">
              <div class="md:col-span-4">
                <label for="orgao">Órgão</label>
                <InputText
                  id="orgao"
                  v-model="orgao"
                  placeholder="Informe o órgão"
                  class="mt-1 h-10 w-full rounded border bg-gray-50 px-4"
                  :invalid="!orgao"
                />
                <small v-if="!orgao" class="text-red-600">O campo Órgão é obrigatório</small>
              </div>
              <div class="md:col-span-1">
                <label for="numero">CNPJ</label>
                <InputMask
                  id="numero"
                  v-model="cnpj"
                  placeholder="##.###.###/####-##"
                  mask="99.999.999/9999-99"
                  class="mt-1 h-10 w-full rounded border bg-gray-50 px-4"
                  :invalid="!cnpj"
                />
                <small v-if="!cnpj" class="text-red-600">O campo CNPJ é obrigatório</small>
              </div>
              <div class="md:col-span-4">
                <label for="rua">Rua/Avenida</label>
                <InputText
                  type="text"
                  name="rua"
                  id="rua"
                  class="mt-1 h-10 w-full rounded border bg-gray-50 px-4"
                  v-model="rua_avenida"
                  placeholder="Informe a rua ou avenida"
                  :invalid="!rua_avenida"
                />
                <small v-if="!rua_avenida" class="text-red-600"
                  >O campo Rua/Avenida é obrigatório</small
                >
              </div>
              <div class="md:col-span-1">
                <label for="numero">Número</label>
                <InputText
                  type="text"
                  name="numero"
                  id="numero"
                  class="mt-1 h-10 w-full rounded border bg-gray-50 px-4"
                  v-model="numero"
                  placeholder="Informe o número"
                  :invalid="!numero"
                />
                <small v-if="!numero" class="text-red-600">O campo Número é obrigatório</small>
              </div>
              <div class="md:col-span-2">
                <label for="cidade">Cidade</label>
                <InputText
                  type="text"
                  name="cidade"
                  id="cidade"
                  class="mt-1 h-10 w-full rounded border bg-gray-50 px-4"
                  v-model="cidade"
                  placeholder="Informe a cidade"
                  :invalid="!cidade"
                />
                <small v-if="!cidade" class="text-red-600">O campo Cidade é obrigatório</small>
              </div>
              <div class="md:col-span-2">
                <label for="estado">Estado</label>
                <select
                  name="estado"
                  id="estado"
                  class="mt-1 h-10 w-full rounded border border-gray-200 bg-gray-50 bg-transparent px-4 text-gray-800 outline-none dark:border-white/20 dark:bg-surface-900 dark:text-white/90"
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
                <small v-if="!estado" class="text-red-600">O campo Estado é obrigatório</small>
              </div>
              <div class="md:col-span-1">
                <label for="cep">CEP</label>
                <InputMask
                  name="cep"
                  id="cep"
                  class="mt-1 flex h-10 w-full items-center rounded border bg-gray-50 px-4 transition-all"
                  placeholder="99999-999"
                  v-model="cep"
                  mask="99999-999"
                  :invalid="!cep"
                />
                <small v-if="!cep" class="text-red-600">O campo CEP é obrigatório</small>
              </div>
              <div class="md:col-span-2">
                <label for="telefone">Telefone</label>
                <InputText
                  type="text"
                  name="telefone"
                  id="telefone"
                  class="mt-1 h-10 w-full rounded border bg-gray-50 px-4"
                  v-model="telefone"
                  placeholder="(##) #####-####"
                  v-mask="['(##) ####-####', '(##) #####-####']"
                />
                <!-- <small v-if="!telefone" class="text-red-600">O campo Telefone é obrigatório</small> -->
              </div>
              <div class="md:col-span-3">
                <label for="email">E-mail</label>
                <InputText
                  type="text"
                  name="email"
                  id="email"
                  class="mt-1 h-10 w-full rounded border bg-gray-50 px-4"
                  v-model="email"
                  placeholder="Informe o e-mail"
                />
                <!-- <small v-if="!email" class="text-red-600">O campo E-mail é obrigatório</small> -->
              </div>
              <div class="text-right md:col-span-5">
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
                      'cursor-not-allowed bg-primary-700': !btnAtualizar
                    }"
                    :disabled="!btnAtualizar"
                    class="flex h-9 w-24 items-center justify-center rounded px-4 py-2 font-bold text-white"
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
