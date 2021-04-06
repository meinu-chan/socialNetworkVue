import Vue from 'vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import TextareaAutosize from 'vue-textarea-autosize'

library.add(faUserCircle)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(TextareaAutosize)

import router from './router'
import store from "./store"

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
