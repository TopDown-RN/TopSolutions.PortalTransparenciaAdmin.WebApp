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
    title: 'Bem-vindo ao Tour de Arquivos!',
    text: 'Nesta seção, você encontrará diversas funcionalidades para gerenciar seus arquivos. Vamos explorar cada uma delas!',
    attachTo: { on: 'top' },
    buttons: [{ text: 'Avançar', action: () => tour.next(), classes: 'btn-next' }]
  },
  {
    id: 'step-2',
    title: 'Adicionar Arquivo',
    text: 'Aqui você pode adicionar novos arquivos que serão visíveis no Portal da Transparência. Faça o cadastro dos documentos que deseja disponibilizar.',
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
    text: 'Nesta etapa, você pode modificar as informações do arquivo, ajustar sua descrição e alterar ano, categoria e/ou menu associados.',
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
    text: 'Para excluir um arquivo, clique no ícone da lixeira correspondente. Essa ação removerá o arquivo permanentemente.',
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
    text: 'Você pode selecionar vários arquivos simultaneamente para realizar uma ação.',
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
    text: 'Quando você seleciona um arquivo, os botões acima serão habilitados e você poderá realizar a ação normalmente.',
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
