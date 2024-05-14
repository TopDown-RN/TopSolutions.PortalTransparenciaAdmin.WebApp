<script setup>
import { onMounted, ref, watch } from 'vue'
import { getListaUsuarios } from '@/services/usuario'
import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import ProgressSpinner from 'primevue/progressspinner'
import InputText from 'primevue/inputtext'
import { FilterMatchMode } from 'primevue/api'
import Toast from 'primevue/toast'
import OverlayPanel from 'primevue/overlaypanel'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import { useToast } from 'primevue/usetoast'
import { useStore } from 'vuex'
import router from '@/router/index.js'
import HeadingComponent from '@/components/HeadingComponent.vue'

const loading = ref(true)
const result = ref()

const store = useStore()
const toast = useToast()

const toastMessage = ref('')

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
})

const op = ref(null)
const txtChaveAcessoAPI = ref()

async function fetchUsuario() {
  try {
    const response = await getListaUsuarios(false)
    result.value = response.data.filter((item) => item.idUsuario > 4)
  } catch (error) {
    result.value = []
    console.error('erro ao obter os arquivos:', error)
  }
}

function toggleOverlay(chaveAcesso) {
  op.value.show(event)
  txtChaveAcessoAPI.value = chaveAcesso
}

function copyKey() {
  const inputElement = document.querySelector('.w-25rem input')
  inputElement.select()
  navigator.clipboard.writeText(inputElement.value)
}

function editUsuario(event) {
  router.push({
    name: 'usuario-editar',
    params: { id: event.data.idUsuario }
  })
}

watch(toastMessage, (newToast) => {
  toast.add({ severity: 'success', summary: 'Sucesso!', detail: newToast, life: 5000 })
})

watch(result, () => {
  loading.value = false
})

onMounted(() => {
  fetchUsuario()
  toastMessage.value = store.state.toastMessage
})
</script>

<template>
  <Toast />
  <HeadingComponent
    title="Lista de Usuários"
    subtitle="Lista dos usuários que tem acesso ao Painel Administrativo do Portal da Transparência."
  />
  <div class="flex md:justify-end m-2">
    <Button
      type="button"
      onclick="location.href='/usuarios/novo'"
      class="focus:ring-2 focus:ring-offset-2 focus:ring-primary-700 text-sm font-semibold leading-none text-white focus:outline-none bg-primary-700 border rounded hover:bg-primary-600 py-3"
    >
      Adicionar novo usuário
    </Button>
  </div>
  <div v-if="loading" class="my-4 text-center">
    <ProgressSpinner />
  </div>

  <div v-if="!loading" class="relative overflow-x-auto border rounded-lg">
    <DataTable
      :value="result"
      v-model:filters="filters"
      size="small"
      paginator
      :rows="5"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      stripedRows
    >
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
      <Column field="txtNome" header="Nome"></Column>
      <Column field="txtCpfCnpj" header="CPF"></Column>
      <Column field="txtEmail" header="E-mail"></Column>
      <Column field="txtChaveAcessoAPI" header="Chave de Acesso">
        <template #body="slotProps">
          <Button
            v-if="slotProps.data.txtChaveAcessoAPI"
            @click="toggleOverlay(slotProps.data.txtChaveAcessoAPI)"
            v-tooltip.top="'Chave de Acesso Externo'"
            icon="pi pi-key"
            size="small"
            severity="success"
            outlined
            rounded
          />
          <OverlayPanel ref="op">
            <div class="flex flex-column gap-3 w-25rem">
              <div>
                <span class="font-medium text-900 block mb-2">Chave Acesso Externo</span>
                <InputGroup>
                  <InputText :value="txtChaveAcessoAPI" readonly class="w-25rem"></InputText>
                  <InputGroupAddon
                    class="cursor-pointer hover:bg-gray-200"
                    @click="copyKey"
                    v-tooltip.top="'Copiar'"
                  >
                    <i class="pi pi-copy"></i>
                  </InputGroupAddon>
                </InputGroup>
              </div>
            </div>
          </OverlayPanel>
        </template>
      </Column>
      <Column header="Ações" :exportable="false">
        <template #body="event">
          <Button
            icon="pi pi-pencil"
            size="small"
            outlined
            rounded
            class="mr-2"
            @click="editUsuario(event)"
            v-tooltip.top="'Editar'"
          />
          <!--          <Button icon="pi pi-trash" size="small" outlined rounded severity="danger" />-->
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<style scoped></style>
