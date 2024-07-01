<script setup>
import { onMounted, ref } from 'vue'
import { watch } from 'vue'
import { deleteCategoria, getCategorias, postCategoria } from '@/services/arquivos'
import EventBus from '@/utils/eventBus'
import Dialog from 'primevue/dialog'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'
import { FilterMatchMode } from 'primevue/api'

const props = defineProps(['visible'])

const toast = useToast()
const confirm = useConfirm()
const dialogVisible = ref(props.visible)
const categorias = ref([])

const txtTituloCat = ref('')
const txtDescricaoCat = ref('')

const isValid = ref(true)

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
})

const editingRows = ref([])

async function fetchCategorias() {
  const response = await getCategorias()
  categorias.value = response.data
}

async function postCategoriaSave() {
  try {
    if (!validarCampos()) {
      return
    }

    const dados = {
      txtTitulo: txtTituloCat.value,
      txtDescricao: txtDescricaoCat.value
    }

    await postCategoria(dados)
    fetchCategorias()
    limparCampos()
    showSuccess('Categoria cadastrada com sucesso!')
  } catch (e) {
    showError('Ocorreu um erro ao cadastrar essa categoria')
    console.error(e)
  }
}

async function excluirCategoria(categoria) {
  confirm.require({
    group: 'headless',
    header: 'Tem certeza de que deseja excluir essa categoria?',
    target: categoria.data.txtTitulo,
    message: 'Por favor, confirme para prosseguir.',
    accept: async () => {
      const response = await deleteCategoria(categoria.data.idCategoriaPubArquivo)
      const status = response.metadata.statusCode

      if (status === 200) {
        showSuccess(response.data)
        await fetchCategorias()
      } else {
        showError(response.data)
      }
    }
  })
}

async function onRowEditSave(event) {
  let { newData, index } = event
  categorias.value[index] = newData

  const dados = {
    idCategoriaPubArquivo: newData.idCategoriaPubArquivo,
    txtTitulo: newData.txtTitulo,
    txtDescricao: newData.txtDescricao
  }

  await postCategoria(dados)
  fetchCategorias()
}

function validarCampos() {
  isValid.value = true

  if (!txtTituloCat.value || !txtDescricaoCat.value) {
    isValid.value = false
  }

  return isValid.value
}

function limparCampos() {
  txtTituloCat.value = ''
  txtDescricaoCat.value = ''
}

function showSuccess(message) {
  toast.add({ severity: 'success', summary: 'Confirmado', detail: message, life: 5000 })
}

function showError(message) {
  toast.add({ severity: 'error', summary: 'Erro!', detail: message, life: 5000 })
}

watch(dialogVisible, () => {
  EventBus.emit('toggleDialog')
})

onMounted(() => {
  fetchCategorias()
})
</script>

<template>
  <div>
    <Dialog
      v-model:visible="dialogVisible"
      header="Mais Categorias"
      maximizable
      modal
      :style="{ width: '50vw' }"
      :contentStyle="{ height: '550px' }"
    >
      <div class="pb-4">
        <span class="mb-2 block text-surface-600 dark:text-surface-0/70"
          >Preencha os campos abaixo se desejar cadastrar uma nova Categoria</span
        >
        <div class="mb-2 flex items-center gap-3">
          <label for="titulo" class="w-[6rem] font-semibold">Título</label>
          <InputText
            v-model.trim="txtTituloCat"
            id="titulo"
            size="small"
            class="flex-auto"
            :invalid="!txtTituloCat && !isValid"
          />
          <small v-if="!txtTituloCat && !isValid" class="text-red-600">
            Obrigatório selecionar um Título
          </small>
        </div>
        <div class="mb-3 flex items-center gap-3">
          <label for="descricao" class="w-[6rem] font-semibold">Descrição</label>
          <InputText
            v-model.trim="txtDescricaoCat"
            id="descricao"
            size="small"
            class="flex-auto"
            :invalid="!txtDescricaoCat && !isValid"
          />
          <small v-if="!txtDescricaoCat && !isValid" class="text-red-600">
            Obrigatório selecionar uma Descrição
          </small>
        </div>
        <div class="flex justify-end gap-2">
          <Button
            type="button"
            label="Limpar"
            size="small"
            severity="secondary"
            @click="limparCampos"
          />
          <Button type="button" label="Cadastrar" size="small" @click="postCategoriaSave" />
        </div>
      </div>

      <DataTable
        :value="categorias"
        v-model:filters="filters"
        v-model:editingRows="editingRows"
        editMode="row"
        @row-edit-save="onRowEditSave"
        paginator
        :rows="5"
        :rowsPerPageOptions="[5, 10, 20, 50, 100]"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} resultados"
        size="small"
        class="border text-sm dark:border-white/20"
      >
        <template #header>
          <div class="flex justify-end">
            <IconField iconPosition="left">
              <InputIcon class="pi pi-search" />
              <InputText
                size="small"
                v-model="filters['global'].value"
                placeholder="Pesquisar..."
                class="font-normal"
              />
            </IconField>
          </div>
        </template>
        <Column field="txtTitulo" header="Categoria">
          <template #editor="{ data, field }">
            <InputText v-model="data[field]" class="w-full" />
          </template>
        </Column>

        <Column
          :rowEditor="true"
          style="width: 10%; min-width: 8rem"
          bodyStyle="text-align:right"
        />
        <Column header="Ações">
          <template #body="event">
            <Button
              icon="pi pi-trash"
              class="max-h-8 max-w-8"
              size="small"
              outlined
              rounded
              severity="danger"
              v-tooltip.top="'Excluir'"
              @click="excluirCategoria(event)"
            />
          </template>
        </Column>
      </DataTable>
    </Dialog>
  </div>
</template>

<style scoped></style>
