import { createStore } from 'vuex'

export default createStore({
  state: {
    toastMessage: ''
  },
  mutations: {
    setToastMessage(state, message) {
      state.toastMessage = message
    }
  }
})
