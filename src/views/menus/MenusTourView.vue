<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { createTour } from '@/utils/tour'
import '@/assets/tour.css'
import MenuComponent from '@/views/menus/MenusView.vue'

const router = useRouter()

const steps = [
  {
    id: 'step-1',
    title: 'Bem-vindo ao Tour de Menus!',
    text: 'Nesta seção, você irá explorar como gerenciar menus. Descubra como cadastrar e editar os menus que serão exibidos ao público no Portal da Transparência.',
    attachTo: { on: 'top' },
    buttons: [{ text: 'Avançar', action: () => tour.next(), classes: 'btn-next' }]
  },
  {
    id: 'step-2',
    title: 'Cadastrar Menu',
    text: 'Aqui você pode cadastrar novos menus que aparecerão no Portal da Transparência.',
    classes: 'step-2',
    attachTo: { element: '.selector-2', on: 'left' },
    buttons: [
      { text: 'Voltar', action: () => tour.back(), classes: 'btn-back' },
      { text: 'Avançar', action: () => tour.next(), classes: 'btn-next' }
    ]
  },
  {
    id: 'step-3',
    title: 'Editar Menu',
    text: 'Nesta etapa, você pode editar os menus que já foram criados.',
    classes: 'step-3',
    attachTo: { element: '.selector-3', on: 'right' },
    buttons: [
      { text: 'Voltar', action: () => tour.back(), classes: 'btn-back' },
      {
        text: 'Finalizar',
        action: () => {
          tour.complete()
          router.push({ name: 'Menus' })
        },
        classes: 'btn-next'
      }
    ]
  }
]

const tour = createTour(steps)

tour.on('cancel', () => {
  router.push({ name: 'Menus' })
})

tour.on('complete', () => {
  router.push({ name: 'Menus' })
})

onMounted(() => {
  tour.start()
})
</script>

<template>
  <MenuComponent />
</template>

<style>
.step-2 {
  margin-left: 20px;
}

.step-3 {
  margin-left: -20px;
}
</style>
