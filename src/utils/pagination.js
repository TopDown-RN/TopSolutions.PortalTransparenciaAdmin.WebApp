import { ref, computed } from 'vue'

function usePagination(items, itemsPerPage) {
  const currentPage = ref(1)

  const paginatedItems = computed(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return items.value.slice(startIndex, endIndex)
  })

  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++
    }
  }

  const previousPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--
    }
  }

  const totalPages = computed(() => Math.ceil(items.value.length / itemsPerPage))

  return {
    currentPage,
    paginatedItems,
    nextPage,
    previousPage,
    totalPages
  }
}

export default usePagination
