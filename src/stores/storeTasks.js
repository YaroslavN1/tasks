import { defineStore } from 'pinia'
import tasksList from '@/mockdata/tasksList.json'

export const useStoreTasks = defineStore('storeTasks', {
  state: () => ({ 
    tasksList: [],
    idToHide: []
  }),
  getters: {
    getFilteredTasks: (state) => {
      return (category, name) => state.tasksList
        .filter(task => state.idToHide === [] ? state.tasksList : state.idToHide.every(el => el !== task.id))
        .filter(task => category === 'All' ? state.tasksList : task.category === category)
        .filter(task => name === '' ? state.tasksList : task.name.toLowerCase().includes(name.toLowerCase().trim()))
    },
  },
  actions: {
    init() {
      this.tasksList = tasksList
    },
    addIdToHide(idToHide) {
      this.idToHide.push(idToHide)
      // console.log(idToHide)
    }
  }
})