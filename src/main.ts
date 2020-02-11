import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import '@/directives/throttled-click'
import '@/directives/debounced-click'
import { listenToColorScheme } from '@/plugins/adaptive-color-scheme'
// import '@/plugins/axios-mock-adapter'
import { MultiWindow } from '@/mixins/multi-window'

Vue.config.productionTip = false
Vue.mixin(MultiWindow)

const vueInstance = new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

listenToColorScheme(vueInstance)
