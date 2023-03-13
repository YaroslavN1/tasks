import { defineStore } from 'pinia'
import tasksList from '@/mockdata/tasksList.json'

export const useStoreTasks = defineStore('storeTasks', {
  state: () => ({ tasksList: []}),
  actions: {
    init() {
      this.tasksList = tasksList
    }
  }
})