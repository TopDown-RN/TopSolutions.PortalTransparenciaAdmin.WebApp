<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { createTour } from '@/utils/tour'
import '@/assets/tour.css'
import OuvidoriaComponent from '@/views/ouvidoria/OuvidoriaView.vue'

const router = useRouter()

const steps = [
  {
    id: 'step-1',
    title: 'Bem-vindo ao Tour da ouvidoria!',
    text: 'Esta é a seção de Ouvidoria. Aqui você pode fazer várias coisas...',
    attachTo: { on: 'top' },
    buttons: [{ text: 'Avançar', action: () => tour.next(), classes: 'btn-next' }]
  },
  {
    id: 'step-2',
    title: 'Telefone',
    text: 'Cadastre o telefone para contato que será exibido no Portal da Transparência.',
    classes: 'step-2',
    attachTo: { element: '.selector-2', on: 'right' },
    buttons: [
      { text: 'Voltar', action: () => tour.back(), classes: 'btn-back' },
      { text: 'Avançar', action: () => tour.next(), classes: 'btn-next' }
    ]
  },
  {
    id: 'step-3',
    title: 'E-mail',
    text: 'Cadastre o e-mail para contato que será exibido no Portal da Transparência.',
    classes: 'step-3',
    attachTo: { element: '.selector-3', on: 'left' },
    buttons: [
      { text: 'Voltar', action: () => tour.back(), classes: 'btn-back' },
      { text: 'Avançar', action: () => tour.next(), classes: 'btn-next' }
    ]
  },
  {
    id: 'step-4',
    title: 'Conteúdo',
    text: 'Insira informações que deverão ser exibidas de forma pública no portal da Transparência.',
    classes: 'step-4',
    attachTo: { element: '.selector-4', on: 'top' },
    buttons: [
      { text: 'Voltar', action: () => tour.back(), classes: 'btn-back' },
      {
        text: 'Finalizar',
        action: () => {
          tour.complete()
          router.push({ name: 'Ouvidoria' })
        },
        classes: 'btn-next'
      }
    ]
  }
]

const tour = createTour(steps)

tour.on('cancel', () => {
  router.push({ name: 'Ouvidoria' })
})

tour.on('complete', () => {
  router.push({ name: 'Ouvidoria' })
})

onMounted(() => {
  tour.start()
})
</script>

<template>
  <OuvidoriaComponent />
</template>

<style>
.step-2 {
  margin-left: 20px;
}

.step-3 {
  margin-left: -20px;
}

.step-4 {
  margin-top: 20px;
}
</style>
