<script setup>
import { ref } from 'vue'
import { watch } from 'vue'
import EventBus from '@/utils/eventBus'
import Dialog from 'primevue/dialog'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

const props = defineProps(['visible', 'categorias'])

const dialogVisible = ref(props.visible)

watch(dialogVisible, () => {
  EventBus.emit('toggleDialog')
})
</script>

<template>
  <div>
    <Dialog
      v-model:visible="dialogVisible"
      header="Cadastrar categoria"
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
          <InputText v-model.trim="txtTituloCat" id="titulo" size="small" class="flex-auto" />
        </div>
        <div class="mb-3 flex items-center gap-3">
          <label for="descricao" class="w-[6rem] font-semibold">Descrição</label>
          <InputText v-model.trim="txtDescricaoCat" id="descricao" size="small" class="flex-auto" />
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
        :value="props.categorias"
        size="small"
        class="border text-sm"
        scrollable
        scrollHeight="flex"
        tableStyle="min-width: 50rem"
      >
        <Column field="txtTitulo" header="Categoria"></Column>
        <Column header="Ações"></Column>
      </DataTable>
    </Dialog>
  </div>
</template>

<style scoped></style>
