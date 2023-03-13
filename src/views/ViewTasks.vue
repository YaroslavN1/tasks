<template>
    <v-container class="px-0">
      <div>
        Tasks
      </div>

      <v-container class="d-flex flex-row justify-space-between px-0">
          <v-tabs
            v-model="selectedTab"
            color="green-lighten-1"
            align-tabs="start"
            >
          
            <v-tab class="tab-border" :value="1">All</v-tab>
            <v-tab class="tab-border" :value="2">Active</v-tab>
            <v-tab class="tab-border" :value="3">Pending</v-tab>
            <v-tab class="tab-border" :value="4">Archived</v-tab>
          </v-tabs>

          <v-spacer></v-spacer>

          <v-text-field v-model="searchByName" label="Search by name..." variant="outlined"></v-text-field>
      </v-container>

      <TaskItem
        v-for="task in storeTasks.tasksList"
        :key="task.id"
        :task="task"
      />
      <div class="d-flex justify-end">
        <v-pagination
          v-model="page"
          :length="4"
          :total-visible="4"
          variant="outlined"
          class="borderless-tabs"
          density="compact"
          color="green-lighten-1"
        />
      </div>
    </v-container>
</template>

<script setup>

/*
  imports
*/

  import { ref } from 'vue'
  import TaskItem from '@/components/TaskItem.vue'
  import {useStoreTasks} from '@/stores/storeTasks'

/*
  stores
*/

  const storeTasks = useStoreTasks()

/*
  tabs
*/

  const selectedTab = ref(null)

/*
  page
*/

  const page = ref(null)

/*
  search
*/

  const searchByName = ref('')

</script>

<style scoped>
.tab-border:not(.v-tab--selected) {
  border-bottom: solid lightgrey 2px
}

.borderless-tabs:first-child{
  border: unset
}

</style>