<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { createTour } from '@/utils/tour'
import '@/assets/tour.css'
import NoticiasComponent from '@/views/noticias/NoticiasView.vue'

const router = useRouter()

const steps = [
  {
    id: 'step-1',
    title: 'Bem-vindo ao Tour de notícias!',
    text: 'Esta é a seção de Notícias. Aqui você pode fazer várias coisas...',
    attachTo: { on: 'top' },
    buttons: [{ text: 'Avançar', action: () => tour.next(), classes: 'btn-next' }]
  },
  {
    id: 'step-2',
    title: 'Título',
    text: 'Insira o título da notícia que está sendo cadastrada.',
    classes: 'step-2',
    attachTo: { element: '.selector-2', on: 'top' },
    buttons: [
      { text: 'Voltar', action: () => tour.back(), classes: 'btn-back' },
      { text: 'Avançar', action: () => tour.next(), classes: 'btn-next' }
    ]
  },
  {
    id: 'step-3',
    title: 'Link',
    text: 'Adicione o link externo da notícia que está sendo cadastrada.',
    classes: 'step-3',
    attachTo: { element: '.selector-3', on: 'right' },
    buttons: [
      { text: 'Voltar', action: () => tour.back(), classes: 'btn-back' },
      { text: 'Avançar', action: () => tour.next(), classes: 'btn-next' }
    ]
  },
  {
    id: 'step-4',
    title: 'Data de Publicação',
    text: 'Adicione a data de publicação da notícia que está sendo cadastrada.',
    classes: 'step-4',
    attachTo: { element: '.selector-4', on: 'left' },
    buttons: [
      { text: 'Voltar', action: () => tour.back(), classes: 'btn-back' },
      { text: 'Avançar', action: () => tour.next(), classes: 'btn-next' }
    ]
  },
  {
    id: 'step-5',
    title: 'Imagem',
    text: 'Adicione uma imagem para essa notícia. Ela aparecerá em forma de banner na página inicial do Portal da Transparência.',
    classes: 'step-5',
    attachTo: { element: '.selector-5', on: 'top' },
    buttons: [
      { text: 'Voltar', action: () => tour.back(), classes: 'btn-back' },
      { text: 'Avançar', action: () => tour.next(), classes: 'btn-next' }
    ]
  },
  {
    id: 'step-6',
    title: 'Salvar',
    text: 'Ao salvar, a notícia será publicada no Portal da Transparência.',
    classes: 'step-6',
    attachTo: { element: '.selector-6', on: 'left' },
    buttons: [
      { text: 'Voltar', action: () => tour.back(), classes: 'btn-back' },
      { text: 'Avançar', action: () => tour.next(), classes: 'btn-next' }
    ]
  },

  // controle da lista de noticias

  {
    id: 'step-7',
    title: 'Lista de notícias',
    text: 'Aqui é possível visualizar as notícias cadastradas no Portal da Transparência. Você pode selecionar uma ou mais notícias e ordená-las como quiser utilizando os botões à esquerda.',
    classes: 'step-7',
    attachTo: { element: '.selector-7', on: 'top' },
    buttons: [
      { text: 'Voltar', action: () => tour.back(), classes: 'btn-back' },
      { text: 'Avançar', action: () => tour.next(), classes: 'btn-next' }
    ]
  },
  {
    id: 'step-8',
    title: 'Excluir notícia',
    text: 'Após selecionar uma ou mais notícias, basta clicar nessa lixeira para excluir.',
    classes: 'step-8',
    attachTo: { element: '.selector-8', on: 'left' },
    buttons: [
      { text: 'Voltar', action: () => tour.back(), classes: 'btn-back' },
      {
        text: 'Finalizar',
        action: () => {
          tour.complete()
          router.push({ name: 'Noticias' })
        },
        classes: 'btn-next'
      }
    ]
  }
]

const tour = createTour(steps)

tour.on('cancel', () => {
  router.push({ name: 'Noticias' })
})

tour.on('complete', () => {
  router.push({ name: 'Noticias' })
})

onMounted(() => {
  tour.start()
})
</script>

<template>
  <NoticiasComponent />
</template>

<style>
.step-2,
.step-5,
.step-7 {
  margin-bottom: 20px;
}

.step-4,
.step-6,
.step-8 {
  margin-left: -20px;
}

.step-3 {
  margin-left: 20px;
}
</style>
