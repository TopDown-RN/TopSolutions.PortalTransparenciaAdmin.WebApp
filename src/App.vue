<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import LayoutView from '@/views/LayoutView.vue'
import LoginView from './views/auth/LoginView.vue'

const route = useRoute()

function fnisAuthenticated() {
  const token = localStorage.getItem('token')
  // Check if token exists and not expired
  return token !== null
}
//console.log(fnisAuthenticated())
</script>

<template>
  <div v-if="fnisAuthenticated()">
    <LayoutView />
  </div>
  <div v-if="!fnisAuthenticated()">
    <LoginView />
  </div>
</template>

<style scoped></style>
