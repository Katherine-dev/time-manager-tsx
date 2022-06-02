import Vue from 'vue'
import App from './App'
import store from './store'
import vuetify from './plugins/vuetify'
import router from './router'
import 'normalize.css'
//@ts-expect-error
import VueMask from 'v-mask'
Vue.use(VueMask);

Vue.config.productionTip = false

new Vue({
  store,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
