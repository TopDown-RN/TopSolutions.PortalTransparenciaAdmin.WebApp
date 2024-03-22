<script setup>
import { RiFacebookLine, RiInstagramLine, RiTwitterXLine } from '@remixicon/vue'
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
                  class="w-full h-12 px-4 py-1 rounded-r-md border border-gray-100 text-gray-800 focus:outline-none"
                  placeholder="@prefeituracn"
                />
              </div>
            </div>
          </div>

          <div class="lg:col-span-2">
            <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
              <div class="md:col-span-5">
                <label for="orgao">Órgão</label>
                <input
                  type="text"
                  name="orgao"
                  id="orgao"
                  class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  value=""
                  placeholder="Prefeitura de Currais Novos"
                />
              </div>
              <div class="md:col-span-4">
                <label for="rua">Rua/Avenida</label>
                <input
                  type="text"
                  name="rua"
                  id="rua"
                  class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  value=""
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
                  value=""
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
                  value=""
                  placeholder="Currais Novos"
                />
              </div>
              <div class="md:col-span-2">
                <label for="estado">Estado</label>
                <div class="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                  <input
                    name="estado"
                    id="estado"
                    placeholder="RN"
                    class="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                    value=""
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
                </div>
              </div>
              <div class="md:col-span-1">
                <label for="cep">CEP</label>
                <input
                  type="text"
                  name="cep"
                  id="cep"
                  class="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  placeholder="59380-000"
                  value=""
                />
              </div>
              <div class="md:col-span-2">
                <label for="telefone">Telefone</label>
                <input
                  type="text"
                  name="telefone"
                  id="telefone"
                  class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  value=""
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
                  value=""
                  placeholder="curraisnovos@email.com"
                />
              </div>
              <div class="md:col-span-5 text-right">
                <div class="inline-flex items-end">
                  <button
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
