<template>
  <v-card class="task-card rounded-lg mb-4" flat>
    <v-list class="d-flex py-1">
      <v-list-item width="10%" class="py-0">
        <v-chip
          variant="elevated"
          :color="chipColor"
          label
          class="d-flex justify-center category-chip font-weight-bold"
        >
          {{ task.category }}
        </v-chip>
      </v-list-item>
      
      <v-list-item width="20%" class="pl-2 py-0">
        <p class="task-name">{{ task.name }}</p>
      </v-list-item>

      <v-spacer></v-spacer>

      <v-list
        v-for="(value, key) in taskDetails"
        :key="key"
        class="d-flex py-0"
      >
        <v-list-item :width="detailCellWidth(key)">
          <p class="text-disabled detail-label">{{ formatDetailLabel(key) }}</p>
          <p v-if="value !== 'unset'" >{{ value }}</p>
          <v-icon v-else icon="mdi-infinity" size="x-small"></v-icon>
        </v-list-item>
        
        <v-divider
          v-if="key !== 'author'"
          inset
          vertical
        ></v-divider>

      </v-list>
        
      <v-spacer></v-spacer>

      <v-list-item>
        <v-btn
          @click="storeTasks.deleteTask(task.id)"
          variant="plain"
          size="small"
        >
          <v-icon icon="mdi-close" size="x-large"></v-icon>
        </v-btn>
      </v-list-item>

    </v-list>
  </v-card>
</template>

<script setup>

import { ref, computed } from 'vue'
import { useStoreTasks } from '@/stores/storeTasks'

const storeTasks = useStoreTasks()

const props = defineProps({
  task: {
  type: Object,
  required: true
  }
})

const chipColor = computed(() => ({
  Active: 'success',
  Pending: 'info',
  Archived: '',
})[props.task.category])

  /* task details extracting and formatting */

const taskDetailKeys = ref(['type', 'task_tab', 'active_from', 'active_to', 'responses', 'author'])

const taskDetails = Object.fromEntries(Object.entries(props.task)
  .map(el => el[0] !== 'responses' ? el : [el[0], `${props.task.responses}/${props.task.responses_total}`])
  .filter(entry => taskDetailKeys.value.some(key => key === entry[0])))

const formatDetailLabel = ([first, ...rest]) => {
  let upperCase = first.toUpperCase() + rest.join('')
  upperCase = upperCase.replace(/_/g, " ")
  return upperCase
}

/* calculating detail cell width */

  const detailCellWidth = (key) => {
    if (key === 'type') {
      return '85'
    }
    else if (key === 'task_tab') {
      return '115'
    }
    else if (key === 'responses') {
      return '100'
    }
    else if (key === 'author') {
      return '145'
    }
    else {
      return '125'
    }
  }

</script>

<style scoped>
.task-card {
  box-shadow: 2px 2px 10px rgb(230, 230, 230)
}
.category-chip {
  opacity: .75;
  filter: saturate(1.2);
}
.detail-label {
  font-size: small;
}
.task-name {
  overflow-wrap: break-word;
}
</style>
