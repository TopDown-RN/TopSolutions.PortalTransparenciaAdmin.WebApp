import { defineStore } from 'pinia'

export const useToastStore = defineStore('message', {
  state: () => {
    return { message: '' }
  },
  actions: {
    setMessage(message) {
      this.message = message
    }
  },
  getters: {
    showToast() {
      return this.message
    }
  }
})
