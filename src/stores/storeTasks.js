import { defineStore } from 'pinia'
import tasksList from '@/mockdata/tasksList.json'

export const useStoreTasks = defineStore('storeTasks', {
  state: () => ({ tasksList: [] }),
  getters: {
    getFormattedTasks: (state) => {
      let tasksList = state.tasksList

      tasksList = tasksList.map(task => {
        let currentTask = Object.entries(task).map(entry => {
          let key = entry[0]
          key = key.replace(/_/g, " ")
          const firstLetter = key.charAt(0).toUpperCase()
          const subString = key.slice(1)
          entry[0] = firstLetter + subString
          return entry
        })
        return Object.fromEntries(currentTask)
      })

      return tasksList
    }
  },
  actions: {
    init() {
      this.tasksList = tasksList
    },
  }
})