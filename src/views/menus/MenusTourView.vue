<script setup>
import { ref, onMounted } from 'vue'
import Shepherd from 'shepherd.js'
import MenuComponent from '@/views/menus/MenusView.vue'
import 'shepherd.js/dist/css/shepherd.css'

const tour = ref(null)

const startTour = () => {
  if (!tour.value) {
    tour.value = new Shepherd.Tour({
      useModalOverlay: true,
      defaultStepOptions: {
        scrollTo: true,
        when: {
          show: function () {
            const currentStepIndex = tour.value.steps.indexOf(tour.value.getCurrentStep()) + 1
            const totalSteps = tour.value.steps.length
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

    tour.value.addStep({
      id: 'step-1',
      title: 'Bem-vindo à Tour!',
      text: 'Esta é a seção de menus. Aqui você pode fazer várias coisas...',
      attachTo: {
        element: '.example-css-selector-1',
        on: 'top',
      },
      buttons: [
        {
          text: 'Avançar',
          action: tour.value.next,
          classes: 'btn-next'
        }
      ]
    })

    tour.value.addStep({
      id: 'step-2',
      title: 'Passo 2',
      text: 'Este é o segundo passo do tour.',
      attachTo: {
        element: '.example-css-selector-2',
        on: 'bottom'
      },
      buttons: [
        {
          text: 'Voltar',
          action: tour.value.back,
          classes: 'btn-back'
        },
        {
          text: 'Avançar',
          action: tour.value.next,
          classes: 'btn-next'
        }
      ]
    })

    tour.value.addStep({
      id: 'step-3',
      title: 'Passo 3',
      text: 'Este é o terceiro passo do tour.',
      attachTo: {
        element: '.example-css-selector-3',
        on: 'top'
      },
      buttons: [
        {
          text: 'Voltar',
          action: tour.value.back,
          classes: 'btn-back'
        },
        {
          text: 'Finalizar',
          action: tour.value.complete,
          classes: 'btn-next'
        }
      ]
    })
  }

  tour.value.start()
}

onMounted(() => {
  startTour()
})
</script>

<template>
  <div class="example-css-selector-1">
    <MenuComponent />
  </div>
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
  font-weight: 600;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.shepherd-text {
  margin-bottom: 1.25rem;
  color: #c2c2ca;
}

.btn-back,
.btn-next {
  border: none;
  border-radius: 0.25rem;
  color: #fff;
  padding: 0.625rem 1.25rem;
  margin: 0.3125rem;
}

.shepherd-element .shepherd-arrow:before {
  background: #202024;
}

.step-counter {
  color: #c2c2ca;
  font-size: 14px;
}
</style>
