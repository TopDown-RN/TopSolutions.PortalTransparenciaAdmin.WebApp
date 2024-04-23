<script setup>
import { ref } from 'vue'
import HeaderComponent from '../components/layouts/HeaderComponent.vue'
import BreadcrumbsComponent from '../components/layouts/BreadcrumbsComponent.vue'
import SidebarComponent from '@/components/layouts/SidebarComponent.vue'

const showSidebar = ref(false)

function toggleSidebar() {
  showSidebar.value = !showSidebar.value
}
</script>

<template>
  <div class="relative flex min-h-screen">
    <SidebarComponent :dataShowSidebar="showSidebar" />
    <div class="flex-1">
      <HeaderComponent :toggleSidebar="toggleSidebar" />
      <div class="p-8 text-gray-800">
        <BreadcrumbsComponent />
        <div class="my-8">
          <RouterView />
        </div>
      </div>
    </div>
  </div>
</template>
