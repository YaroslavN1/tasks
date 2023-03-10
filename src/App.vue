<template>
  <div>
    <v-btn @click="storeTasks.decrement()">
      Decrease counter
    </v-btn>

    <v-chip
      variant="outlined"
      class="px-4 mx-4"
    >
      {{ storeTasks.count }}
    </v-chip>

    <v-btn @click="storeTasks.increment()">
      Increase counter
    </v-btn>
  </div>
</template>

<script setup>
/*
  imports
*/

  import {useStoreTasks} from '@/stores/storeTasks'

/*
  stores
*/

  const storeTasks = useStoreTasks()

</script>
