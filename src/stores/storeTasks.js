import { defineStore } from 'pinia'
import tasksList from '@/mockdata/tasksList.json'

export const useStoreTasks = defineStore('storeTasks', {
  state: () => ({ 
    tasksList: [],
    idToHide: [],
    currentPage: 1,
    range: [0, 8],
    elementsOnPage: 8,
    selectedTab: 'All',
    searchByName: ''
  }),
  getters: {
    getFilteredTasks: (state) => {
      return state.tasksList
        .filter(task => state.idToHide === [] ? state.tasksList : state.idToHide.every(el => el !== task.id))
        .filter(task => state.selectedTab === 'All' ? state.tasksList : task.category === state.selectedTab)
        .filter(task => state.searchByName === '' ? state.tasksList : task.name.toLowerCase().includes(state.searchByName.toLowerCase().trim()))
    },
    getPaginatedTasks() {
      return this.getFilteredTasks.slice(this.range[0], this.range[1])
    },
    getPaginationLength() {
      return Math.ceil((this.getFilteredTasks.length/this.elementsOnPage))
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