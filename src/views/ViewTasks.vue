<template>
    <v-container class="px-0">
      <div>
        Tasks
      </div>

      <v-container class="d-flex flex-row justify-space-between px-0">
          <v-tabs
            @click="storeTasks.setCurrentPage(1)"
            v-model="selectedTab"
            color="green-lighten-1"
            align-tabs="start"
            >
          
            <v-tab class="tab-border" value="All">All</v-tab>
            <v-tab class="tab-border" value="Active">Active</v-tab>
            <v-tab class="tab-border" value="Pending">Pending</v-tab>
            <v-tab class="tab-border" value="Archived">Archived</v-tab>
          </v-tabs>

          <v-spacer></v-spacer>

          <v-text-field
            @input="storeTasks.setCurrentPage(1)"
            v-model="searchByName"
            label="Search by name..."
            variant="outlined"
          />
      </v-container>

      <TaskItem
        v-for="task in storeTasks.getPaginatedTasks"
        :key="task.id"
        :task="task"
      />

      <div class="d-flex justify-end">
        <v-pagination
          v-model="currentPage"
          @click="storeTasks.setCurrentPage(currentPage)"
          :length="storeTasks.getPaginationLength"
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
  import { storeToRefs } from 'pinia'
  import { useStoreTasks } from '@/stores/storeTasks'
  import TaskItem from '@/components/TaskItem.vue'

/* stores */

  const storeTasks = useStoreTasks()

/* import refs for v-model on components */

  const { currentPage, selectedTab, searchByName } = storeToRefs(storeTasks)

</script>

<style scoped>
.tab-border:not(.v-tab--selected) {
  border-bottom: solid lightgrey 2px
}

</style>