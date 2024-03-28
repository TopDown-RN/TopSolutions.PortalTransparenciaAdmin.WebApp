<script setup>
import { RiFacebookLine, RiInstagramLine, RiTwitterXLine } from '@remixicon/vue'
import { getDadosAdmin, postDadosAdmin} from '@/services/dadosAdmin'
import { ref, onMounted } from 'vue'
//import router from '@/router'

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
  try{
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

  }catch(error){
    console.log(error)
  }
}

async function atualizarDadosAdmin() {
  try{

    const formData = new FormData();

    const inputImagemLogo = document.getElementById('inputImagemLogo');
    const inputImagemCapa = document.getElementById('inputImagemCapa');

    formData.append('txtCliente', orgao.value);
    formData.append('CpfCnpj', cnpj.value);
    formData.append('txtEndereco', rua_avenida.value);
    formData.append('txtEmail', email.value);
    formData.append('txtNumTelefone', telefone.value);
    formData.append('imgLogo', inputImagemLogo.files[0]);
    formData.append('txtNumEndereco', numero.value);
    formData.append('txtCidade', cidade.value);
    formData.append('txtEstado', estado.value);
    formData.append('txtCep', cep.value);
    formData.append('txtFacebook', facebook.value);
    formData.append('txtInstagram', instagram.value);
    formData.append('txtX', x.value);
    formData.append('imgCapa', inputImagemCapa.files[0]);

    const response = await postDadosAdmin(formData)

    console.log(response)

    location.reload();
    
  }catch(error){
    console.log(error)
  }
}


onMounted(() => {
  pegarDadosAdmin()
})

// watch(orgao, (newValue, oldValue) => {
//   console.log('Orgão foi modificado de', oldValue, 'para', newValue)
// })

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
      <div class="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6 mt-6">
        <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
          <div class="text-gray-600 content-center">

            <div class="flex">
              <input type="file" id="inputImagemLogo" accept="image/*">              
              <img :src="'data:image/'+extensaoLogo+';base64,' + logo" alt="Base64 Image" width="100px" height="100px"/>
            </div>

            <div class="flex">
              <input type="file" id="inputImagemCapa" accept="image/*">              
              <img :src="'data:image/'+extensaoCapa+';base64,' + capa" alt="Base64 Image" width="100px" height="100px"/>
            </div>
            
            
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
                  placeholder="Prefeitura de Currais Novos"
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
                  placeholder="@prefeituradecurraisnovos"
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
                  placeholder="@prefeituracn"
                />
              </div>
            </div>
          </div>

          <div class="lg:col-span-2">
            <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
              <div class="md:col-span-4">
                <label for="orgao">Órgão</label>
                <input
                  type="text"
                  name="orgao"
                  id="orgao"
                  class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  placeholder="Prefeitura de Currais Novos"
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
                  placeholder=""
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
                  placeholder="Praça Desembargador Tomaz Salustino"
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
                  placeholder="90"
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
                  placeholder="Currais Novos"
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
                <option v-for="estado in estadosOptions" :key="estado.codigo" :value="estado.codigo">{{ estado.nome }}</option>
              </select>


                <!-- <div class="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                  <input
                    name="estado"
                    id="estado"
                    placeholder="RN"
                    class="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                    v-model="estado"
                  />
                  <button
                    tabindex="-1"
                    class="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600"
                  >
                    <svg
                      class="w-4 h-4 mx-2 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                  <button
                    tabindex="-1"
                    for="show_more"
                    class="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-blue-600"
                  >
                    <svg
                      class="w-4 h-4 mx-2 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <polyline points="18 15 12 9 6 15"></polyline>
                    </svg>
                  </button>
                </div>-->
              </div> 
              <div class="md:col-span-1">
                <label for="cep">CEP</label>
                <input
                  type="text"
                  name="cep"
                  id="cep"
                  class="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  placeholder="59380-000"
                  v-model="cep"
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
                  placeholder="(84) 3405-2714"
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
                  placeholder="curraisnovos@email.com"
                />
              </div>
              <div class="md:col-span-5 text-right">
                <div class="inline-flex items-end">
                  <button
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    @click="atualizarDadosAdmin"
                  >
                    Atualizar
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
