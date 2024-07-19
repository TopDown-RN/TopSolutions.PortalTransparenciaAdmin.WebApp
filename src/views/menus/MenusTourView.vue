<script setup>
import { ref, onMounted } from 'vue'
import MenuComponent from '@/views/menus/MenusView.vue'

const showTour = ref(false)
const highlightButton = ref(false)
const step = ref(0)
const totalSteps = 8

onMounted(() => {
  // Inicie a tour ao montar o componente
  showTour.value = true
  highlightButton.value = true 
})

const nextStep = () => {
  if (step.value < totalSteps - 1) {
    step.value += 1
  }
}

const prevStep = () => {
  if (step.value > 0) {
    step.value -= 1
  }
}

const closeTour = () => {
  showTour.value = false
  highlightButton.value = false
}
</script>

<template>
    <div>
      <MenuComponent :highlightButton="highlightButton" />
  
      <div v-if="showTour" class="tour-overlay">
        <div class="tour-header">
          <button @click="closeTour" class="close-button">X</button>
          <span class="tour-step-indicator">{{ step + 1 }}/{{ totalSteps }}</span>
        </div>
        <div class="tour-content">
          <h2 class="tour-title">Bem-vindo à Tour!</h2>
          <p v-if="step === 0">Esta é a seção de menus. Aqui você pode fazer várias coisas...</p>
          <p v-if="step === 1">Esta é a segunda etapa do tour...</p>
          <p v-if="step === 2">Esta é a terceira etapa do tour...</p>
          <p v-if="step === 3">Esta é a quarta etapa do tour...</p>
          <p v-if="step === 4">Esta é a quinta etapa do tour...</p>
          <p v-if="step === 5">Esta é a sexta etapa do tour...</p>
          <p v-if="step === 6">Esta é a sétima etapa do tour...</p>
          <p v-if="step === 7">Esta é a oitava etapa do tour...</p>
  
          <div class="tour-navigation">
            <button @click="prevStep" :disabled="step === 0" class="tour-button">Voltar</button>
            <button @click="nextStep" :disabled="step === totalSteps - 1" class="tour-button">Avançar</button>
          </div>
        </div>
      </div>
    </div>
  </template>

<style scoped>
.tour-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #f0f0f0;
}

.tour-header {
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
}

.close-button {
  background: none;
  border: none;
  color: #f0f0f0;
  font-size: 20px;
  cursor: pointer;
}

.tour-step-indicator {
  margin-left: 20px;
  background: #007bff;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 14px;
}

.tour-content {
  background: #282c34;
  padding: 30px;
  border-radius: 8px;
  text-align: center;
  max-width: 500px;
  width: 100%;
}

.tour-title {
  font-size: 24px;
  margin-bottom: 20px;
}

.tour-navigation {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}

.tour-button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.tour-button:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

.tour-button:hover:not(:disabled) {
  background-color: #0056b3;
}
</style>