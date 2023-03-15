import { defineStore } from 'pinia'
import tasksList from '@/mockdata/tasksList.json'

export const useStoreTasks = defineStore('storeTasks', {
  state: () => ({ 
    tasksList: [],
    idToHide: [],
    currentPage: 1,
    range: [0, 8],
    elementsOnPage: 8
  }),
  getters: {
    getFilteredTasks: (state) => {
      return (category, name) => state.tasksList
        .filter(task => state.idToHide === [] ? state.tasksList : state.idToHide.every(el => el !== task.id))
        .filter(task => category === 'All' ? state.tasksList : task.category === category)
        .filter(task => name === '' ? state.tasksList : task.name.toLowerCase().includes(name.toLowerCase().trim()))
    },
    getPaginatedTasks() {
      return (category, name) => this.getFilteredTasks(category, name).slice(this.range[0], this.range[1])
    },
    getPaginationLength() {
      return (category, name) => Math.ceil((this.getFilteredTasks(category, name).length/this.elementsOnPage))
    }
  },
  actions: {
    init() {
      this.tasksList = tasksList
    },
    addIdToHide(idToHide) {
      this.idToHide.push(idToHide)
    },
    setCurrentPage(newPage) {
      this.currentPage = newPage
      this.range[0] = (this.currentPage * this.elementsOnPage) - this.elementsOnPage
      this.range[1] = (this.currentPage * this.elementsOnPage)
    }
  }
})