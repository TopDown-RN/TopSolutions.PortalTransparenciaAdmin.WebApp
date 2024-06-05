<script setup>
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'
</script>

<template>
  <section class="mx-auto max-w-5xl rounded-md border bg-white p-6 dark:bg-gray-800">
    <h2 class="pb-4 text-lg font-semibold capitalize text-gray-700 dark:text-white">
      Adicionar Arquivo
    </h2>
    <div class="grid gap-4 text-sm">
      <div class="grid grid-cols-1 gap-y-2">
        <label for="descricao">Descrição</label>
        <InputText v-model="descricao" id="descricao" placeholder="Descrição" />
      </div>
      <div class="grid grid-cols-2 gap-x-2">
        <div>
          <label class="block" for="ddMenu">Menu</label>
          <Dropdown v-model="id_Menu" :options="menus" id="ddMenu" class="w-full" />
        </div>
        <div>
          <label class="block" for="ano">Ano</label>
          <Dropdown v-model="id_Menu" :options="menus" id="ddMenu" class="w-full" />
        </div>
      </div>
      <div class="grid grid-cols-2 gap-x-2">
        <div>
          <label class="block" for="categoria">Categoria</label>
          <Dropdown
            v-model="idCategoriaArquivos"
            :options="categorias"
            id="categoria"
            class="w-full"
          />
        </div>
        <div class="flex flex-col items-start justify-end">
          <Button label="Mais categorias" outlined class="h-10 w-1/2" />
        </div>
      </div>
      <div class="grid grid-cols-2 gap-x-2">
        <div>
          <label
            for="inputarquivos"
            class="flex h-10 w-1/2 cursor-pointer items-center justify-center rounded border border-primary-500 px-4 py-2 font-semibold text-primary-500 hover:bg-primary-700 hover:text-white"
          >
            <i class="pi pi-upload mr-2"></i>
            Selecionar arquivos
          </label>
          <input
            id="inputarquivos"
            hidden
            type="file"
            ref="fileInput"
            multiple
            @change="setarArquivos"
          />
        </div>
        <div class="flex items-end justify-end gap-2">
          <Button label="Publicar" />
          <Button label="Limpar" severity="secondary" outlined />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
