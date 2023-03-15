<template>
  <v-card class="mb-4 task-card" flat>
    <v-list class="d-flex py-0">
      <v-list
        width="380px"
        class="d-flex flex-row"
      >
        <v-list-item min-width="110px">
          <v-chip
            label
            class="d-flex justify-center"
            style="width: 100px"
          >
            {{ task.category }}
          </v-chip>
        </v-list-item>
        
        <v-list-item class="pl-2">
          <p>{{ task.name }}</p>
        </v-list-item>
      </v-list>

      <v-list
        v-for="(value, key, index) in taskDetails"
        :key="key"
        class="d-flex"
      >
        <v-list-item
          :min-width="index === 0 ? '90' : '110'"
        >
          <p>{{ formatDetail(key) }}</p>
          <p>{{ value }}</p>
        </v-list-item>
        
        <v-divider v-if="index !== Object.keys(taskDetails).length-1" vertical></v-divider>

      </v-list>
        
        <v-spacer></v-spacer>

      <v-list-item>
        <v-btn
          @click="storeTasks.addIdToHide(task.id)"
          variant="plain"
          size="small"
        >
          <v-icon icon="mdi-close" size="large"></v-icon>
        </v-btn>
      </v-list-item>

    </v-list>
  </v-card>
</template>

<script setup>

/*
  imports
*/
  import { useStoreTasks } from '@/stores/storeTasks'

/*
  stores
*/
  const storeTasks = useStoreTasks()

/*
  props
*/
  const props = defineProps({
    task: {
    type: Object,
    required: true
    }
  })

/*
  task details separating and formatting
*/
  const taskDetails = Object.fromEntries(Object.entries(props.task).splice(3))
  
  taskDetails.responses = `${taskDetails.responses}/${taskDetails.responses_total}`
  delete taskDetails.responses_total

/*
  formatting details
*/
  const formatDetail = (string) => {
    let detail = string.replace(/_/g, " ")
    const firstLetter = detail.charAt(0).toUpperCase()
    const subString = detail.slice(1)
    detail = firstLetter + subString
    return detail
  }

</script>

<style scoped>
.task-card {
  box-shadow: 2px 2px 10px rgb(230, 230, 230)
}
</style>
