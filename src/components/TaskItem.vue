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
          v-for="item in taskDetails"
          :key="item[0]"
        >
            <p>
              {{ formatDetail(item[0]) }}
            </p>

            <p>
              {{ item[1] }}
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

  const formatDetail = (string) => {
    let detail = string.replace(/_/g, " ")
    const firstLetter = detail.charAt(0).toUpperCase()
    const subString = detail.slice(1)
    detail = firstLetter + subString
    return detail
  }
/*
  task object to entries
*/

  const taskDetails = Object.entries(props.task).slice(3)


</script>