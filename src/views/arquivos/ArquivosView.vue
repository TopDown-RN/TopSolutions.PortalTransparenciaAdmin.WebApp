<script setup>
import { ref, onMounted } from 'vue'
import { FilterMatchMode } from 'primevue/api'
import { useToast } from 'primevue/usetoast'
import { getArquivos } from '@/services/arquivos.js'
import DataTable from 'primevue/datatable'
import Toolbar from 'primevue/toolbar'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import InputText from 'primevue/inputtext'
import Column from 'primevue/column'
import Tag from 'primevue/tag'
import Dialog from 'primevue/dialog'
import Textarea from 'primevue/textarea'
import Dropdown from 'primevue/dropdown'
import RadioButton from 'primevue/radiobutton'
import InputNumber from 'primevue/inputnumber'
import Button from 'primevue/button'

onMounted(() => {
  fetchArquivos()
})

async function fetchArquivos() {
  try {
    const response = await getArquivos()
    arquivos.value = response.data
  } catch (e) {
    console.error(e)
  }
}

const toast = useToast()
const dt = ref()
const arquivos = ref()
const arquivoDialog = ref(false)
const deleteArquivoDialog = ref(false)
const deleteArquivosDialog = ref(false)
const arquivo = ref({})
const selectedArquivos = ref()
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
})
const submitted = ref(false)

const openNew = () => {
  arquivo.value = {}
  submitted.value = false
  arquivoDialog.value = true
}
const hideDialog = () => {
  arquivoDialog.value = false
  submitted.value = false
}
const confirmDeleteArquivo = (prod) => {
  arquivo.value = prod
  deleteArquivoDialog.value = true
}
const deleteArquivo = () => {
  arquivos.value = arquivos.value.filter((val) => val.id !== arquivo.value.id)
  deleteArquivoDialog.value = false
  arquivo.value = {}
  toast.add({ severity: 'success', summary: 'Successful', detail: 'Arquivo Deleted', life: 3000 })
}

const confirmDeleteSelected = () => {
  deleteArquivosDialog.value = true
}
const deleteSelectedArquivos = () => {
  arquivos.value = arquivos.value.filter((val) => !selectedArquivos.value.includes(val))
  deleteArquivosDialog.value = false
  selectedArquivos.value = null
  toast.add({ severity: 'success', summary: 'Successful', detail: 'Arquivos Deleted', life: 3000 })
}
</script>

<template>
  <div>
    <div class="card">
      <Toolbar class="mb-4">
        <template #start>
          <Button label="New" icon="pi pi-plus" severity="success" class="mr-2" @click="openNew" />
          <Button
            label="Delete"
            icon="pi pi-trash"
            severity="danger"
            @click="confirmDeleteSelected"
            :disabled="!selectedArquivos || !selectedArquivos.length"
          />
        </template>
      </Toolbar>

      <DataTable
        ref="dt"
        size="small"
        :value="arquivos"
        v-model:selection="selectedArquivos"
        dataKey="id"
        :paginator="true"
        :rows="10"
        :filters="filters"
        :rowsPerPageOptions="[5, 10, 25]"
        striped-rows
      >
        <template #header>
          <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 class="m-0">Manage Arquivos</h4>
            <IconField iconPosition="left">
              <InputIcon>
                <i class="pi pi-search" />
              </InputIcon>
              <InputText v-model="filters['global'].value" placeholder="Search..." />
            </IconField>
          </div>
        </template>

        <Column selectionMode="multiple"></Column>
        <Column field="anoPub" header="Ano"></Column>
        <Column field="descCategoria" header="Categoria"></Column>
        <Column field="descMenu" header="Menu"></Column>
        <Column :exportable="false" style="min-width: 8rem">
          <template #body="slotProps">
            <Button
              icon="pi pi-pencil"
              outlined
              rounded
              class="mr-2"
              @click="editArquivo(slotProps.data)"
            />
            <Button
              icon="pi pi-trash"
              outlined
              rounded
              severity="danger"
              @click="confirmDeleteArquivo(slotProps.data)"
            />
          </template>
        </Column>
      </DataTable>
    </div>

    <Dialog
      v-model:visible="arquivoDialog"
      :style="{ width: '450px' }"
      header="Arquivo Details"
      :modal="true"
      class="p-fluid"
    >
      <img
        v-if="arquivo.image"
        :src="`https://primefaces.org/cdn/primevue/images/arquivo/${arquivo.image}`"
        :alt="arquivo.image"
        class="block m-auto pb-3"
      />
      <div class="field">
        <label for="name">Name</label>
        <InputText
          id="name"
          v-model.trim="arquivo.name"
          required="true"
          autofocus
          :invalid="submitted && !arquivo.name"
        />
        <small class="p-error" v-if="submitted && !arquivo.name">Name is required.</small>
      </div>
      <div class="field">
        <label for="description">Description</label>
        <Textarea
          id="description"
          v-model="arquivo.description"
          required="true"
          rows="3"
          cols="20"
        />
      </div>

      <div class="field">
        <label for="inventoryStatus" class="mb-3">Inventory Status</label>
        <Dropdown
          id="inventoryStatus"
          v-model="arquivo.inventoryStatus"
          :options="statuses"
          optionLabel="label"
          placeholder="Select a Status"
        >
          <template #value="slotProps">
            <div v-if="slotProps.value && slotProps.value.value">
              <Tag
                :value="slotProps.value.value"
                :severity="getStatusLabel(slotProps.value.label)"
              />
            </div>
            <div v-else-if="slotProps.value && !slotProps.value.value">
              <Tag :value="slotProps.value" :severity="getStatusLabel(slotProps.value)" />
            </div>
            <span v-else>
              {{ slotProps.placeholder }}
            </span>
          </template>
        </Dropdown>
      </div>

      <div class="field">
        <label class="mb-3">Category</label>
        <div class="formgrid grid">
          <div class="field-radiobutton col-6">
            <RadioButton
              id="category1"
              name="category"
              value="Accessories"
              v-model="arquivo.category"
            />
            <label for="category1">Accessories</label>
          </div>
          <div class="field-radiobutton col-6">
            <RadioButton
              id="category2"
              name="category"
              value="Clothing"
              v-model="arquivo.category"
            />
            <label for="category2">Clothing</label>
          </div>
          <div class="field-radiobutton col-6">
            <RadioButton
              id="category3"
              name="category"
              value="Electronics"
              v-model="arquivo.category"
            />
            <label for="category3">Electronics</label>
          </div>
          <div class="field-radiobutton col-6">
            <RadioButton
              id="category4"
              name="category"
              value="Fitness"
              v-model="arquivo.category"
            />
            <label for="category4">Fitness</label>
          </div>
        </div>
      </div>

      <div class="formgrid grid">
        <div class="field col">
          <label for="price">Price</label>
          <InputNumber
            id="price"
            v-model="arquivo.price"
            mode="currency"
            currency="USD"
            locale="en-US"
          />
        </div>
        <div class="field col">
          <label for="quantity">Quantity</label>
          <InputNumber id="quantity" v-model="arquivo.quantity" integeronly />
        </div>
      </div>
      <template #footer>
        <Button label="Cancel" icon="pi pi-times" text @click="hideDialog" />
        <Button label="Save" icon="pi pi-check" text @click="saveArquivo" />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="deleteArquivoDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span v-if="arquivo"
          >Are you sure you want to delete <b>{{ arquivo.name }}</b
          >?</span
        >
      </div>
      <template #footer>
        <Button label="No" icon="pi pi-times" text @click="deleteArquivoDialog = false" />
        <Button label="Yes" icon="pi pi-check" text @click="deleteArquivo" />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="deleteArquivosDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span v-if="arquivo">Are you sure you want to delete the selected arquivos?</span>
      </div>
      <template #footer>
        <Button label="No" icon="pi pi-times" text @click="deleteArquivosDialog = false" />
        <Button label="Yes" icon="pi pi-check" text @click="deleteSelectedArquivos" />
      </template>
    </Dialog>
  </div>
</template>
