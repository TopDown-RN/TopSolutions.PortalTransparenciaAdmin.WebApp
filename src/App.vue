<script setup>
import { useRoute } from 'vue-router'
import LayoutView from '@/views/LayoutView.vue'
import LoginView from './views/auth/LoginView.vue'
const route = useRoute()
</script>

<template>
  <div v-if="route.path != '/'">
    <LayoutView />
  </div>
  <div v-else>
    <LoginView />
  </div>
</template>

<style scoped></style>
