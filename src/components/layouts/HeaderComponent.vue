<script setup>


function logout(){
  localStorage.removeItem('token')
  // Reflesh na tela
  window.location.href = '/'
}
</script>

<template>
  <header class="bg-white">
    <div class="mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold tracking-tight text-gray-900">Top Solutions</h1>
    </div>
  </header>
  <div class="min-h-full">
    <nav class="bg-primary-900">
      <div class="mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          <div class="flex items-center">
            <div class="">
              <div class="">
                <a href="#" class="text-white py-2 text-lg font-medium" aria-current="page"
                  >Portal da Transparência</a
                >
              </div>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="">
              <div class="relative ml-3">
                <div class="md:block lg:block sm:hidden max-w-md mx-auto">
                  <div class="flex space-x-4 hidden lg:block md:block">
                    <button class="text-white px-2 py-1 rounded-md">Usuário administrador</button>
                    <button @click="logout" class="text-white px-2 py-1 rounded-md">Sair</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div class="bg-gray-200 flex">
      <div class="max-w-7xl px-4 py-6 bg-gray-200 sm:px-6 lg:px-8">
        <img
          class="flex-1 w-24 h-24 rounded-full shadow-lg"
          src="https://pbs.twimg.com/profile_images/638352739236491264/xYuKDYAY_400x400.jpg"
          alt=""
        />
      </div>
      <div class="bg-gray-200 py-6">
        <h1 class="text-2xl font-sans tracking-tight text-gray-900">Prefeitura de Currais Novos</h1>
        <div>
          <span class="text-xs">
            <b>Endereço: </b>Praça Desembargador Tomaz Salustino, n.º 90 Centro, Currais Novos - RN,
            59380-000
          </span>
        </div>
        <div>
          <span class="text-xs"> <b>Telefone: </b>(84) 3405-2714 </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
