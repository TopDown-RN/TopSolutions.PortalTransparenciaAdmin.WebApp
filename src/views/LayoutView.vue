<script setup>
import HeaderComponent from '../components/layouts/HeaderComponent.vue'
import DashboardComponent from '../components/layouts/DashboardComponent.vue'
import BreadcrumbsComponent from '../components/layouts/BreadcrumbsComponent.vue'
</script>

<template>
  <HeaderComponent />
  <div class="grid grid-cols-6 gap-2 bg-gray-50 pb-10">
    <DashboardComponent />
    <div class="p-4 col-span-5">
      <BreadcrumbsComponent />
      <div class="mt-6">
        <div class="flex flex-col">
          <div class="overflow-x-auto">
            <RouterView />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
