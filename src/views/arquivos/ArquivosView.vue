<script setup>
import HeadingComponent from '@/components/HeadingComponent.vue'
import { onMounted, ref, watch } from 'vue';
import { getArquivos } from '@/services/arquivos';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import { FilterMatchMode } from 'primevue/api'
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import ProgressSpinner from 'primevue/progressspinner'
import { useConfirm } from "primevue/useconfirm"
import { useToast } from 'primevue/usetoast'
import Toast from 'primevue/toast';
import ConfirmDialog from 'primevue/confirmdialog';
import Toolbar from 'primevue/toolbar';

const confirm = useConfirm()
const toast = useToast()

const arquivos = ref([])
const selectedArquivo = ref()

const loading = ref(true)

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
})

async function fetchArquivos() {
  try {
    const response = await getArquivos()
    arquivos.value = response.data
  } catch (e) {
    loading.value = false
    arquivos.value = []
    console.error('erro ao obter os arquivos: ', e)
  }
}

function excluirArq(arquivo) {
  console.log(arquivo)
    confirm.require({
        message: 'Você tem certeza que deseja fazer isso?',
        header: 'Excluir Arquivo',
        icon: 'pi pi-exclamation-triangle mr-3',
        rejectLabel: 'Cancelar',
        acceptLabel: 'Excluir',
        rejectClass: 'bg-slate-50 hover:bg-slate-200 text-slate-600 focus:ring-0 border-slate-300 hover:border-slate-300',
        acceptClass: 'bg-red-500 hover:bg-red-700 focus:ring-0 border-none',
        accept: () => {
            toast.add({ severity: 'success', summary: 'Confirmado', detail: 'Arquivo excluído com sucesso', life: 3000 });
        }
    })
}

watch(arquivos, () => {
  loading.value = false
})

onMounted(() => {
  fetchArquivos()
})
</script>

<template>
  <HeadingComponent title="Arquivos" subtitle="Gerencie aqui os arquivos exibidos ao usuário no Portal da Transparência." description="Mantenha-os sempre atualizados." />

  <Toast />
  <ConfirmDialog></ConfirmDialog>

  <div v-if="!loading" class="relative overflow-x-auto border rounded-lg">
    <Toolbar>
      <template #start>
        <Button label="Excluir" icon="pi pi-trash" severity="danger" @click="excluirArqSelected" :disabled="!selectedArquivo || !selectedArquivo.length" />
      </template>
    </Toolbar>
    <DataTable v-model:selection="selectedArquivo" v-model:filters="filters" :value="arquivos" size="small" dataKey="idArquivo" stripedRows paginator :rows="10" :rowsPerPageOptions="[5, 10, 20, 50]">
      <template #header>
        <div class="flex justify-end">
          <span class="relative">
            <i
              class="pi pi-search absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600"
            />
            <InputText
              size="small"
              v-model="filters['global'].value"
              placeholder="Pesquisar..."
              class="pl-10 font-normal"
            />
          </span>
        </div>
      </template>
      <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
      <Column header="Ano" field="anoPub"></Column>
      <Column header="Categoria" field="descCategoria"></Column>
      <Column header="Menu" field="descMenu"></Column>
      <Column header="Arquivo" field="nomeArquivo"></Column>
      <Column header="Publicado em" field="dtInclusao"></Column>
      <Column header="Ações">
        <template #body="event">
          <Button
            icon="pi pi-pencil"
            size="small"
            outlined
            rounded
            class="mr-2"
            @click="editArquivo(event)"
            v-tooltip.top="'Editar'"
          />
          
          <Button icon="pi pi-trash" size="small" outlined rounded severity="danger" @click="excluirArq(event)" />
        </template></Column>
    </DataTable>
  </div>
</template>
