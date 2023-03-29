<template>
    <v-container fluid class="mt-10 tasks-view">
      <h2 class="task-list__title">
        Tasks
      </h2>
      <div class="d-flex flex-row justify-space-between px-0 mb-6">
        <v-tabs
          @click="currentPage = 1"
          v-model="selectedTab"
          color="green-lighten-1"
          align-tabs="start"
          class="text-medium-emphasis"
          >
      
          <v-tab class="tab-border tab-category" value="All">All</v-tab>
          <v-tab class="tab-border tab-category" value="Active">Active</v-tab>
          <v-tab class="tab-border tab-category" value="Pending">Pending</v-tab>
          <v-tab class="tab-border tab-category" value="Archived">Archived</v-tab>
        </v-tabs>

        <v-spacer></v-spacer>

        <v-text-field
          @input="currentPage = 1"
          v-model="searchByName"
          label="Search by name..."
          variant="outlined"
          hide-details
          density="comfortable"
        />
      </div>

      <TaskItem
        v-for="task in storeTasks.getPaginatedTasks(currentPage, selectedTab, searchByName)"
        :key="task.id"
        :task="task"
      />

      <div class="d-flex justify-end">
        <v-pagination
          v-model="currentPage"
          :length="storeTasks.getPaginationLength(selectedTab, searchByName)"
          :total-visible="5"
          variant="outlined"
          density="compact"
          color="green-lighten-1"
        />
      </div>
    </v-container>
</template>

<script setup>

/* imports */

  import { ref } from 'vue'
  import { useStoreTasks } from '@/stores/storeTasks'
  import TaskItem from '@/components/TaskItem.vue'

/* stores */

  const storeTasks = useStoreTasks()

/* variables for filters and page */

  const currentPage = ref(1)
  const selectedTab = ref('All')
  const searchByName = ref('')

</script>

<style scoped>

.tasks-view {
  max-width: 1320px;
}

.tab-border:not(.v-tab--selected) {
  border-bottom: solid lightgrey 2px
}
.task-list__title {
  font-size: 22px;
}
.tab-category {
  font-weight: 600;
  letter-spacing: 1;
  text-transform: none;
  display: flex;
  align-items: end;
  padding-bottom: 10px;
}

</style>