import Vue from 'vue'
import App from './App'
import store from './store'
import vuetify from './plugins/vuetify' // path to vuetify export

Vue.config.productionTip = false

new Vue({
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
