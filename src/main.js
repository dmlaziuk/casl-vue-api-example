import Vue from 'vue'
import Vuetify from 'vuetify'
import { abilitiesPlugin } from '@casl/vue'
import { confirmPlugin } from './plugins/confirm'
import App from './App'
import router from './router'
import ability from './store/ability'
import store from './store'
import 'vuetify/dist/vuetify.min.css'

Vue.config.productionTip = false
Vue.use(Vuetify)
Vue.use(confirmPlugin)
Vue.use(abilitiesPlugin, ability.ability)

const app = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
