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
  if (index >= 0 && index < abas.value.length) {
    activeIndex.value = index
    router.push(abas.value[index].to)
  }
}

function removeTab(aba) {
  const index = abas.value.indexOf(aba)
  if (index > -1) {
    abas.value.splice(index, 1)
    if (abas.value.length > 0) {
      if (index === activeIndex.value) {
        activeIndex.value = index === abas.value.length ? index - 1 : index
      } else if (index < activeIndex.value) {
        activeIndex.value -= 1
      }
      router.push(abas.value[activeIndex.value].to)
    } else {
      activeIndex.value = 0
      router.push('/')
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
  <div class="flex min-h-screen flex-col md:flex-row dark:bg-surface-800">
    <SidebarComponent :dataShowSidebar="showSidebar" />
    <div class="flex flex-1 flex-col">
      <HeaderComponent :toggleSidebar="toggleSidebar" />
      <AbasComponent
        :abas="abas"
        :activeIndex="activeIndex"
        @updateActiveIndex="handleUpdateActiveIndex"
        @removeTab="removeTab"
      />
      <div class="my-12 flex-1 p-4 sm:px-12">
        <RouterView />
      </div>
    </div>
  </div>
</template>
