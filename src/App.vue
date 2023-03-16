<template>
  <v-app>
    <main>
      <ViewTasks/>
    </main>
  </v-app>
</template>

<script setup>
/*
  imports
*/

  import {useStoreTasks} from '@/stores/storeTasks'
  import ViewTasks from '@/views/ViewTasks.vue'

/*
  stores
*/

  const storeTasks = useStoreTasks()

/*
  load tasks to store
*/

  storeTasks.init()

</script>
