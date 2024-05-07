<script setup>
import { getToken } from '@/services/auth/authToken'
import LayoutView from '@/views/LayoutView.vue'
import LoginView from './views/auth/LoginView.vue'
</script>

<template>
  <LayoutView v-if="getToken()" />
  <LoginView v-if="!getToken()" />
</template>

<style scoped></style>
