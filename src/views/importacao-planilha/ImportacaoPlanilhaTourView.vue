<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { createTour } from '@/utils/tour'
import '@/assets/tour.css'
import ImportacaoPlanilhaComponent from '@/views/importacao-planilha/ImportacaoPlanilhaView.vue'

const router = useRouter()

const steps = [
  {
    id: 'step-1',
    title: 'Bem-vindo ao Tour de Importação de Dados!',
    text: 'Neste tour, você aprenderá a importar dados para o Portal da Transparência. Vamos guiá-lo através das etapas essenciais para selecionar, baixar e enviar seus dados com sucesso.',
    attachTo: { on: 'top' },
    buttons: [{ text: 'Avançar', action: () => tour.next(), classes: 'btn-next' }]
  },
  {
    id: 'step-2',
    title: 'Selecionar Modelo',
    text: 'Escolha o modelo de importação que deseja utilizar.',
    classes: 'step-2',
    attachTo: { element: '.selector-2', on: 'top' },
    buttons: [
      { text: 'Voltar', action: () => tour.back(), classes: 'btn-back' },
      { text: 'Avançar', action: () => tour.next(), classes: 'btn-next' }
    ]
  },
  {
    id: 'step-3',
    title: 'Baixar Modelo',
    text: 'Faça o download do modelo selecionado para o seu computador. Este modelo contém o formato correto que você deve seguir para importar seus dados.',
    classes: 'step-3',
    attachTo: { element: '.selector-3', on: 'right' },
    buttons: [
      { text: 'Voltar', action: () => tour.back(), classes: 'btn-back' },
      { text: 'Avançar', action: () => tour.next(), classes: 'btn-next' }
    ]
  },
  {
    id: 'step-4',
    title: 'Selecionar Planilha',
    text: 'Após preencher o modelo baixado, selecione a planilha atualizada que você deseja enviar para o Portal da Transparência.',
    classes: 'step-4',
    attachTo: { element: '.selector-4', on: 'right' },
    buttons: [
      { text: 'Voltar', action: () => tour.back(), classes: 'btn-back' },
      { text: 'Avançar', action: () => tour.next(), classes: 'btn-next' }
    ]
  },
  {
    id: 'step-5',
    title: 'Importar Planilha',
    text: 'Complete o envio da planilha para o Portal da Transparência.',
    classes: 'step-5',
    attachTo: { element: '.selector-5', on: 'left' },
    buttons: [
      { text: 'Voltar', action: () => tour.back(), classes: 'btn-back' },
      { text: 'Avançar', action: () => tour.next(), classes: 'btn-next' }
    ]
  },
  {
    id: 'step-6',
    title: 'Visualizar Planilha',
    text: 'Visualize as planilhas importadas para o Portal. Aqui você pode revisar e verificar as informações enviadas.',
    classes: 'step-6',
    attachTo: { element: '.selector-6', on: 'left' },
    buttons: [
      { text: 'Voltar', action: () => tour.back(), classes: 'btn-back' },
      { text: 'Avançar', action: () => tour.next(), classes: 'btn-next' }
    ]
  },
  {
    id: 'step-7',
    title: 'Excluir Planilha',
    text: 'Basta clicar nessa lixeira para excluir o arquivo desejado.',
    classes: 'step-7',
    attachTo: { element: '.selector-7', on: 'left' },
    buttons: [
      { text: 'Voltar', action: () => tour.back(), classes: 'btn-back' },
      {
        text: 'Finalizar',
        action: () => {
          tour.complete()
          router.push({ name: 'Importar Dados' })
        },
        classes: 'btn-next'
      }
    ]
  }
]

const tour = createTour(steps)

tour.on('cancel', () => {
  router.push({ name: 'Importar Dados' })
})

tour.on('complete', () => {
  router.push({ name: 'Importar Dados' })
})

onMounted(() => {
  tour.start()
})
</script>

<template>
  <ImportacaoPlanilhaComponent />
</template>

<style>
.shepherd-element,
.selector-1 {
  background: #202024;
  max-width: 500px;
}

.step-2 {
  margin-bottom: 20px;
}

.step-3,
.step-4 {
  margin-left: 20px;
}

.step-5,
.step-6,
.step-7 {
  margin-left: -20px;
}
</style>
