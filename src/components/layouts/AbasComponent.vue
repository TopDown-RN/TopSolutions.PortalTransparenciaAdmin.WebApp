<script setup>
import TabMenu from 'primevue/tabmenu'

const props = defineProps(['abas', 'activeIndex'])
const emit = defineEmits(['updateActiveIndex', 'removeTab'])

function handleTabChange(event) {
  emit('updateActiveIndex', event.index)
}

function removeTab(aba) {
  emit('removeTab', aba)
}

function showCloseIcon(aba) {
  return aba.to !== '/'
}
</script>

<template>
  <div class="card">
    <TabMenu
      :key="props.activeIndex"
      :model="props.abas"
      :activeIndex="props.activeIndex"
      @tab-change="handleTabChange"
    >
      <template #item="{ item, props }">
        <div class="relative inline-block">
          <a v-bind="props.action">
            <i :class="item.icon + ' pr-2'"></i>
            <span class="font-bold">{{ item.label }}</span>
          </a>
          <i
            v-if="showCloseIcon(item)"
            class="pi pi-times-circle absolute right-0 top-0 cursor-pointer text-gray-500 hover:text-black"
            @click="removeTab(item)"
          ></i>
        </div>
      </template>
    </TabMenu>
  </div>
</template>

<style scoped></style>
