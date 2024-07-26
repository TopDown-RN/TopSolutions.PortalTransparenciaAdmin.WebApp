<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Shepherd from 'shepherd.js'
import 'shepherd.js/dist/css/shepherd.css'
import MenuComponent from '@/views/menus/MenusView.vue'

const router = useRouter()

const tour = new Shepherd.Tour({
  useModalOverlay: true,
  defaultStepOptions: {
    scrollTo: true,
    when: {
      show: function () {
        const currentStepIndex = tour.steps.indexOf(tour.getCurrentStep()) + 1
        const totalSteps = tour.steps.length
        const stepCounter = document.createElement('span')
        stepCounter.className = 'step-counter'
        stepCounter.innerText = `${currentStepIndex}/${totalSteps}`
        const titleElement = this.el.querySelector('.shepherd-title')
        if (titleElement) {
          titleElement.appendChild(stepCounter)
        }
      }
    }
  }
})

tour.addStep({
  id: 'step-1',
  title: 'Bem-vindo à Tour!',
  text: 'Esta é a seção de menus. Aqui você pode fazer várias coisas...',
  attachTo: {
    on: 'top'
  },
  buttons: [
    {
      text: 'Avançar',
      action: tour.next,
      classes: 'btn-next'
    }
  ]
})

tour.addStep({
  id: 'step-2',
  title: 'Cadastrar Menu',
  text: 'Cadastre os menus que serão exibidos ao público no Portal da Transparência.',
  classes: 'step-2',
  attachTo: {
    element: '.selector-2',
    on: 'left'
  },
  buttons: [
    {
      text: 'Voltar',
      action: tour.back,
      classes: 'btn-back'
    },
    {
      text: 'Avançar',
      action: tour.next,
      classes: 'btn-next'
    }
  ]
})

tour.addStep({
  id: 'step-3',
  title: 'Editar Menu',
  text: 'Aqui você pode editar os menus criados',
  classes: 'step-3',
  attachTo: {
    element: '.selector-3',
    on: 'right'
  },
  buttons: [
    {
      text: 'Voltar',
      action: tour.back,
      classes: 'btn-back'
    },
    {
      text: 'Finalizar',
      action: () => {
        tour.complete()
        router.push({ name: 'Menus' })
      },
      classes: 'btn-next'
    }
  ]
})

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
.shepherd-element {
  background: #202024;
}

.shepherd-has-title .shepherd-content .shepherd-header {
  background: none;
}

.shepherd-title {
  color: #3288e6;
  font-weight: 700;
  font-size: 1.125rem;
  align-items: center;
  justify-content: space-between;
}

.shepherd-text {
  margin-bottom: 0.25rem;
  font-size: 0.875rem;
  line-height: 200%;
  margin-left: 5px;
  color: #c2c2ca;
}

.shepherd-element .shepherd-arrow:before {
  background: #202024;
}

.btn-next {
  padding: 0.5rem 1rem;
}

.btn-back {
  background: #29292e;
  padding: 0.5rem 1rem;
}

.btn-back:hover {
  background: #323238 !important;
}

.step-counter {
  color: #c2c2ca;
  font-size: 0.875rem;
  font-weight: 400;
}

.step-2 {
  margin-left: 20px;
}

.step-3 {
  margin-left: -20px;
}
</style>
