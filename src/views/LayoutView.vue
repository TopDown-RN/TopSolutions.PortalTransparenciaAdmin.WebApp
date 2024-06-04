<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import HeaderComponent from '../components/layouts/HeaderComponent.vue'
import AbasComponent from '../components/layouts/AbasComponent.vue'
import SidebarComponent from '@/components/layouts/SidebarComponent.vue'

const router = useRouter()
const route = useRoute()
const showSidebar = ref(false)

const activeIndex = ref(0)

const abas = ref([{ label: 'Dashboard', icon: 'pi pi-home', to: '/' }])

function toggleSidebar() {
  showSidebar.value = !showSidebar.value
}

function addAba(route) {
  const existingAba = abas.value.find((aba) => aba.to === route.path)
  if (!existingAba) {
    abas.value.push({
      label: route.meta.label || route.name || route.path,
      to: route.path
    })
  }
  activeIndex.value = abas.value.findIndex((aba) => aba.to === route.path)
}

function handleUpdateActiveIndex(index) {
  activeIndex.value = index
  router.push(abas.value[index].to)
}

function removeTab(aba) {
  const index = abas.value.indexOf(aba)
  if (index > -1) {
    abas.value.splice(index, 1)
    if (index === activeIndex.value) {
      activeIndex.value = 0
      router.push(abas.value[0].to)
    }
  }
}

watch(route, (newRoute) => {
  addAba(newRoute)
})

onMounted(() => {
  addAba(route)
})
</script>

<template>
  <div class="relative flex min-h-screen">
    <SidebarComponent :dataShowSidebar="showSidebar" />
    <div class="flex-1">
      <HeaderComponent :toggleSidebar="toggleSidebar" />
      <AbasComponent
        :abas="abas"
        :activeIndex="activeIndex"
        @updateActiveIndex="handleUpdateActiveIndex"
        @removeTab="removeTab"
      />
      <div class="my-12 p-4 sm:px-12">
        <RouterView />
      </div>
    </div>
  </div>
</template>
