<template>
  <v-card>
    {{ props.task.id }} {{ props.task.name }}
  </v-card>
</template>

<script setup>

/*
  props
*/

  const props = defineProps({
    task: Object,
    required: true
  })

</script>