<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { createTour } from '@/utils/tour'
import '@/assets/tour.css'
import ArquivoComponent from '@/views/arquivos/ArquivosView.vue'

const router = useRouter()

const steps = [
  {
    id: 'step-1',
    title: 'Bem-vindo à Tour de Arquivos!',
    text: 'Esta é a seção de arquivos. Aqui você pode fazer várias coisas...',
    attachTo: { on: 'top' },
    buttons: [{ text: 'Avançar', action: () => tour.next(), classes: 'btn-next' }]
  },
  {
    id: 'step-2',
    title: 'Adicionar Arquivo',
    text: 'Cadastre os arquivos que serão exibidos ao público no Portal da Transparência.',
    classes: 'step-2',
    attachTo: { element: '.selector-2', on: 'left' },
    buttons: [
      { text: 'Voltar', action: () => tour.back(), classes: 'btn-back' },
      { text: 'Avançar', action: () => tour.next(), classes: 'btn-next' }
    ]
  },
  {
    id: 'step-3',
    title: 'Editar Arquivo',
    text: 'Aqui você pode realizar uma alteração no arquivo, editar sua descrição, e também mover para um ano, categoria e/ou menu desejado.',
    classes: 'step-3',
    attachTo: { element: '.selector-3', on: 'left' },
    buttons: [
      { text: 'Voltar', action: () => tour.back(), classes: 'btn-back' },
      { text: 'Avançar', action: () => tour.next(), classes: 'btn-next' }
    ]
  },
  {
    id: 'step-4',
    title: 'Excluir Arquivo',
    text: 'Basta clicar nessa lixeira para excluir o arquivo desejado.',
    classes: 'step-4',
    attachTo: { element: '.selector-4', on: 'left' },
    buttons: [
      { text: 'Voltar', action: () => tour.back(), classes: 'btn-back' },
      { text: 'Avançar', action: () => tour.next(), classes: 'btn-next' }
    ]
  },
  {
    id: 'step-5',
    title: 'Selecionar Arquivos',
    text: 'Você também pode selecionar mais arquivos para realizar uma ação.',
    classes: 'step-5',
    attachTo: { element: '.selector-5', on: 'left' },
    buttons: [
      { text: 'Voltar', action: () => tour.back(), classes: 'btn-back' },
      { text: 'Avançar', action: () => tour.next(), classes: 'btn-next' }
    ]
  },
  {
    id: 'step-6',
    title: 'Ações',
    text: 'Quando você tiver algum arquivo selecionado, os botões acima serão habilitados e você poderá realizar a ação normalmente para esses arquivos.',
    classes: 'step-6',
    attachTo: { element: '.selector-6', on: 'left' },
    buttons: [
      { text: 'Voltar', action: () => tour.back(), classes: 'btn-back' },
      {
        text: 'Finalizar',
        action: () => {
          tour.complete()
          router.push({ name: 'Arquivos' })
        },
        classes: 'btn-next'
      }
    ]
  }
]

const tour = createTour(steps)

tour.on('cancel', () => {
  router.push({ name: 'Arquivos' })
})

tour.on('complete', () => {
  router.push({ name: 'Arquivos' })
})

onMounted(() => {
  tour.start()
})
</script>

<template>
  <ArquivoComponent />
</template>

<style>
.step-2 {
  margin-left: 20px;
}

.step-3 {
  margin-left: -20px;
}

.step-4 {
  margin-left: -20px;
}
.step-5 {
  margin-left: 20px;
}
.step-6 {
  margin-left: 20px;
}
</style>
