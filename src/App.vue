<template>
  <v-app>
    <main>
      <ViewTasks/>
    </main>
  </v-app>
</template>

<script setup>

import {useStoreTasks} from '@/stores/storeTasks'
import ViewTasks from '@/views/ViewTasks.vue'

const storeTasks = useStoreTasks()

storeTasks.init()

</script>
