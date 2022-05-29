import Vue from 'vue'
import App from './App'
import store from './store'
import vuetify from './plugins/vuetify' // path to vuetify export
import router from './router'

Vue.config.productionTip = false

new Vue({
  store,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
