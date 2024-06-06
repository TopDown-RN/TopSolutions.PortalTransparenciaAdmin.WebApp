<script setup>
import { ref, watch } from 'vue'
import EventBus from '@/utils/eventBus'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'

defineProps(['categorias', 'menus', 'anos'])

const txtDescricao = ref('')
const id_Menu = ref('')
const ano = ref('')
const idCategoriaArquivos = ref('')

function limpar() {
  id_Menu.value = ''
  ano.value = ''
  idCategoriaArquivos.value = ''
  txtDescricao.value = ''
}

watch([id_Menu, ano, idCategoriaArquivos], ([newMenu, newAno, newCategoria]) => {
  EventBus.emit('filterChange', { menu: newMenu, ano: newAno, categoria: newCategoria })
})
</script>

<template>
  <section class="mx-auto max-w-5xl rounded-md border bg-white p-6 dark:bg-gray-800">
    <h2 class="pb-4 text-lg font-semibold capitalize text-gray-700 dark:text-white">
      Adicionar Arquivo
    </h2>
    <div class="grid gap-4 text-sm">
      <div class="grid grid-cols-1 gap-y-2">
        <label for="descricao">Descrição</label>
        <InputText
          v-model.trim="txtDescricao"
          id="descricao"
          placeholder="Informe uma descrição para o arquivo"
        />
      </div>
      <div class="grid grid-cols-2 gap-x-2">
        <div>
          <label class="block" for="ddMenu">Menu</label>
          <Dropdown
            v-model="id_Menu"
            :options="menus"
            optionLabel="txtDescricao"
            id="ddMenu"
            placeholder="Selecione um menu"
            class="w-full"
            panelClass="text-sm"
          />
        </div>
        <div>
          <label class="block" for="ano">Ano</label>
          <Dropdown
            v-model="ano"
            :options="anos"
            id="ano"
            placeholder="Selecione um ano"
            class="w-full"
            panelClass="text-sm"
          />
        </div>
      </div>
      <div class="grid grid-cols-2 gap-x-2">
        <div>
          <label class="block" for="categoria">Categoria</label>
          <Dropdown
            v-model="idCategoriaArquivos"
            :options="categorias"
            optionLabel="txtTitulo"
            id="categoria"
            placeholder="Selecione uma categoria"
            class="w-full"
            panelClass="text-sm"
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
          <Button @click="limpar()" label="Limpar" severity="secondary" outlined />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
