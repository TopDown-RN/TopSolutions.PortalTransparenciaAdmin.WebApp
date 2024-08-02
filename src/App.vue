<script setup>
import { RouterView } from 'vue-router'
import { getToken } from '@/services/auth/authStorage'
import LayoutView from '@/views/LayoutView.vue'
</script>

<template>
  <LayoutView v-if="getToken()" />
  <RouterView></RouterView>
</template>

<style scoped></style>
