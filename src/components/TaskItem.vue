<template>
  <v-card class="task-card rounded-lg mb-4" flat>
    <v-list class="d-flex py-1">
      <v-list
        width="380px"
        class="d-flex flex-row py-0"
      >
        <v-list-item min-width="130px">
          <v-chip
            variant="elevated"
            :color="chipColor()"
            label
            class="d-flex justify-center category-chip font-weight-bold"
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
        class="d-flex py-0"
      >
        <v-list-item
          :min-width="index === 0 ? '90' : index === 1 ? '110' : '125'"
        >
          <p class="text-disabled detail-label">{{ formatDetailLabel(key) }}</p>
          <p v-if="value !== 'unset'" >{{ value }}</p>
          <v-icon v-else icon="mdi-infinity" size="x-small"></v-icon>
        </v-list-item>
        
        <v-divider
          v-if="index !== Object.keys(taskDetails).length-1"
          inset
          vertical
        ></v-divider>

      </v-list>
        
        <v-spacer></v-spacer>

      <v-list-item>
        <v-btn
          @click="storeTasks.addIdToHide(task.id)"
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

/* imports */

  import { useStoreTasks } from '@/stores/storeTasks'

/* stores */

  const storeTasks = useStoreTasks()

/* props */

  const props = defineProps({
    task: {
    type: Object,
    required: true
    }
  })

/* task details separating and formatting */

  const taskDetails = Object.fromEntries(Object.entries(props.task).splice(3))
  
  taskDetails.responses = `${taskDetails.responses}/${taskDetails.responses_total}`
  delete taskDetails.responses_total

/* formatting details */

  const formatDetailLabel = (string) => {
    let detail = string.replace(/_/g, " ")
    const firstLetter = detail.charAt(0).toUpperCase()
    const subString = detail.slice(1)
    detail = firstLetter + subString
    return detail
  }

/* chip color change */

  const chipColor = () => {
    if(props.task.category === 'Active') {
      return 'success'
    }
    else if (props.task.category === 'Pending'){
      return 'info'
    }
    else { 
      return ''
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
</style>
