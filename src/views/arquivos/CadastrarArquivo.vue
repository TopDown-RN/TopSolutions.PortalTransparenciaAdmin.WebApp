<script setup>
import { ref, watch } from 'vue'
import { postArquivos } from '@/services/arquivos'
import EventBus from '@/utils/eventBus'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'

defineProps(['categorias', 'menus', 'anos'])

const toast = useToast()

const txtDescricao = ref('')
const id_Menu = ref('')
const ano = ref('')
const idCategoriaArquivos = ref('')
const files = ref([])

const isValid = ref(true)
const loading = ref(false)

async function postSaveArquivos() {
  try {
    if (!validarCampos()) {
      return
    }

    const formData = new FormData()
    formData.append('txtDescricao', txtDescricao.value)
    formData.append('idMenu', id_Menu.value)
    formData.append('anoPub', ano.value)
    formData.append('idCategoria', idCategoriaArquivos.value)
    formData.append('idUsuario', 3)

    files.value.forEach((file) => {
      formData.append('Arquivo', file)
    })

    await postArquivos(formData)
    showSuccess('Arquivo(s) salvo com sucesso!')
    limparCampos()
  } catch (e) {
    showError('Erro ao salvar arquivo(s)')
    console.log(`Erro ao salvar arquivo(s): ${e}`)
  }
}

function validarCampos() {
  if (!id_Menu.value || !ano.value || !idCategoriaArquivos.value || files.value.length === 0) {
    isValid.value = false
  }

  return isValid.value
}

function limparCampos() {
  id_Menu.value = ''
  ano.value = ''
  idCategoriaArquivos.value = ''
  txtDescricao.value = ''
  files.value = []
}

function showError(message) {
  toast.add({ severity: 'error', summary: 'Erro!', detail: message, life: 5000 })
}

function showSuccess(message) {
  toast.add({ severity: 'success', summary: 'Successo', detail: message, life: 3000 })
}

watch([id_Menu, ano, idCategoriaArquivos], ([newMenu, newAno, newCategoria]) => {
  EventBus.emit('filterChange', { menu: newMenu, ano: newAno, categoria: newCategoria })
})
</script>

<template>
  <Toast position="top-center" />

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
            :invalid="!id_Menu && !isValid"
          />
          <small v-if="!id_Menu && !isValid" class="text-red-600"
            >Obrigatório selecionar um menu</small
          >
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
            :invalid="!ano && !isValid"
          />
          <small v-if="!ano && !isValid" class="text-red-600">Obrigatório selecionar um ano</small>
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
            :invalid="!idCategoriaArquivos && !isValid"
          />
          <small v-if="!idCategoriaArquivos && !isValid" class="text-red-600"
            >Obrigatório selecionar uma categoria</small
          >
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
            @change="setArquivos"
            :invalid="files.length === 0 && !isValid"
          />
          <small v-if="files.length === 0 && !isValid" class="text-red-600"
            >Obrigatório inserir ao menos um arquivo</small
          >
        </div>
        <div class="flex items-end justify-end gap-2">
          <Button @click="postSaveArquivos" label="Publicar" :loading="loading" />
          <Button @click="limparCampos()" label="Limpar" severity="secondary" outlined />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
