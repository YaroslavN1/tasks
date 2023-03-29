import { defineStore } from 'pinia'
import tasksList from '@/mockdata/tasksList.json'

export const useStoreTasks = defineStore('storeTasks', {
  state: () => ({ 
    tasksList: [],
    elementsOnPage: 8,
    selectedTab: 'All',
    searchByName: ''
  }),
  getters: {
    getFilteredTasks: (state) => {
      return state.tasksList
        .filter(task => state.selectedTab === 'All' ? state.tasksList : task.category === state.selectedTab)
        .filter(task => state.searchByName === '' ? state.tasksList : task.name.toLowerCase().includes(state.searchByName.toLowerCase().trim()))
    },
    getPaginatedTasks() {
      return (page) => this.getFilteredTasks.slice((page * this.elementsOnPage) - this.elementsOnPage, (page * this.elementsOnPage))
    },
    getPaginationLength() {
      return Math.ceil((this.getFilteredTasks.length/this.elementsOnPage))
    }
  },
  actions: {
    init() {
      this.tasksList = tasksList
    },
    deleteTask(id) {
      this.tasksList.splice(tasksList.findIndex(el => el.id === id), 1)
    }
  }
})