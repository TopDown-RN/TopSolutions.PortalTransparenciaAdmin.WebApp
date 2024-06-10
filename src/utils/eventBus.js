import { ref } from 'vue'

const EventBus = ref(new Map())

export default {
  on(event, callback) {
    if (!EventBus.value.has(event)) {
      EventBus.value.set(event, [])
    }
    EventBus.value.get(event).push(callback)
  },
  emit(event, data) {
    if (EventBus.value.has(event)) {
      EventBus.value.get(event).forEach((callback) => callback(data))
    }
  }
}
