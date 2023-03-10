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
            <v-tab :value="1">All</v-tab>
            <v-tab :value="2">Active</v-tab>
            <v-tab :value="3">Pending</v-tab>
            <v-tab :value="4">Archived</v-tab>
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
          border
          density="comfortable"
          v-model="page"
          :length="15"
          :total-visible="7"
          color="green-lighten-1"
        ></v-pagination>
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