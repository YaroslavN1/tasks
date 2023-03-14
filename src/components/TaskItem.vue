<template>
  <v-card>
    <v-list class="d-flex flex-row">
      <v-list-item>
        <v-chip
          label
        >
          {{ task.category }}
        </v-chip>
      </v-list-item>

      <v-list-item>
        <p>
          {{ task.name }}
        </p>
      </v-list-item>

      <v-list
        class="d-flex flex-row py-0"
        lines="one"
      >
        <v-list-item
          v-for="(value, key) in taskDetails"
          :key="key"
        >
            <p>
              {{ formatDetail(key) }}
            </p>

            <p>
              {{ value }}
            </p>

        </v-list-item>
      </v-list>

    </v-list>
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

/*
  task details separating and formatting
*/

  let taskDetails = Object.entries(props.task)
  taskDetails.splice(0, 3)
  taskDetails = Object.fromEntries(taskDetails)
  
  taskDetails.responses = `${taskDetails.responses}/${taskDetails.responses_total}`
  delete taskDetails.responses_total
  console.log(taskDetails)
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