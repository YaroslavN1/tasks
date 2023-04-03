<template>
      <tr class="table-row">
        <td width="10%" class="py-0">
          <v-chip
            variant="elevated"
            :color="chipColor"
            label
            class="d-flex justify-center category-chip font-weight-bold"
          >
            {{ task.category }}
          </v-chip>
        </td>
        
        <td width="23%" class="pl-2 pr-0">
          <p class="task-name">{{ task.name }}</p>
        </td>
        
        <td
          v-for="(value, key, index) in taskDetails"
          :key="key"
          :class="{'divider': index !== Object.keys(taskDetails).length - 1}"
        >
          <p class="detail-label">{{ formatDetailLabel(key) }}</p>
          <v-icon v-if="value === 'unset'" icon="mdi-infinity" size="x-small"></v-icon>
          <p v-else>{{ value }}</p>
        </td>

        <td class="pl-16 pr-0 text-center">
          <v-btn
            @click="storeTasks.deleteTask(task.id)"
            variant="plain"
            size="small"
        >
            <v-icon icon="mdi-close" size="x-large"></v-icon>
          </v-btn>
        </td>
      </tr>
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

  /* task details filtering and formatting */

const taskDetailKeys = ref(['type', 'task_tab', 'active_from', 'active_to', 'responses', 'author'])
const taskDetails = computed(() => {
  return Object.fromEntries(Object.entries(props.task)
    .map(el => el[0] !== 'responses' ? el : [el[0], `${props.task.responses}/${props.task.responses_total}`])
    .filter(entry => taskDetailKeys.value.some(key => key === entry[0])))
})
const formatDetailLabel = ([first, ...rest]) => {
  let upperCase = first.toUpperCase() + rest.join('')
  upperCase = upperCase.replace(/_/g, " ")
  return upperCase
}

</script>

<style scoped>

.table-row {
  height: 60px;
  box-shadow: 2px 2px 10px rgb(230, 230, 230);
  border-radius: 6px;
}

.table-row > td {
  border-bottom: none!important;
  position: relative;
}

.category-chip {
  opacity: .75;
  filter: saturate(1.2);
}

.detail-label {
  opacity: 0.38;
  font-size: small;
}

.divider::after {
  content: "";
  width: 1px;
  position: absolute;
  right: 0;
  top: 8px;
  bottom: 8px;
  background-color: #eee;
}

</style>
