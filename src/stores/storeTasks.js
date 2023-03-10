import { defineStore } from 'pinia'

export const useStoreTasks = defineStore('storeTasks', {
  state: () => ({ count: 0, name: 'Eduardo' }),
  actions: {
    increment() {
      this.count++
    },
    decrement() {
      this.count--
    }
  },
  getters: {
    doubleCount: (state) => state.count * 2,
  },
})