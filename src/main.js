import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import './css/normalize.css'
import './css/styles.css'
import App from './App.vue'

//Pinia

const pinia = createPinia()

// Vuetify

const vuetify = createVuetify(
  {
    components,
    directives,
  },
  {
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi,
      }
    },
  }
)


createApp(App)
    .use(pinia)
    .use(vuetify)
    .mount('#app')
