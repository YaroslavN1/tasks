import { defineStore } from 'pinia'
import tasksList from '@/mockdata/tasksList.json'

export const useStoreTasks = defineStore('storeTasks', {
  state: () => ({ 
    tasksList: [],
    elementsOnPage: 8
  }),
  getters: {
    getFilteredTasks: (state) => {
      return (selectedTab, searchedName) => state.tasksList
        .filter(task => selectedTab === 'All' ? state.tasksList : task.category === selectedTab)
        .filter(task => searchedName === '' ? state.tasksList : task.name.toLowerCase().includes(searchedName.toLowerCase().trim()))
    },
    getPaginatedTasks() {
      return (page, selectedTab, searchedName) => this.getFilteredTasks(selectedTab, searchedName).slice((page * this.elementsOnPage) - this.elementsOnPage, (page * this.elementsOnPage))
    },
    getPaginationLength() {
      return (selectedTab, searchedName) => Math.ceil((this.getFilteredTasks(selectedTab, searchedName).length/this.elementsOnPage))
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