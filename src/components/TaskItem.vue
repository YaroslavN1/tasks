<template>
  <v-card>
    <v-list class="d-flex flex-row">
      <v-list-item>
        <v-chip
          label
        >
          {{ props.task.category }}
        </v-chip>
      </v-list-item>

      <v-list-item>
        <p>
          {{ props.task.name }}
        </p>
      </v-list-item>

      <v-list-item>
        <v-list
          class="d-flex flex-row py-0"
          lines="one"
        >
          <v-list-item
            v-for="item in taskEntries"
            :key="item[0]"
          >
            <p>
              {{ item[0] }}
            </p>

            <p>
              {{ item[1] }}
            </p>
          </v-list-item>
        </v-list>
      </v-list-item>
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
  task object to entries
*/

  const taskEntries = Object.entries(props.task).slice(3)
  taskEntries.map((entry) => entry[0] = entry[0].replace(/_/g, " "))

</script>