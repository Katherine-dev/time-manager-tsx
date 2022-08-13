// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore awda
import VueMask from 'v-mask';
import Vue from 'vue';
import App from './App';
import store from './store';
import vuetify from './plugins/vuetify';
import router from './router';
import 'normalize.css';

Vue.use(VueMask);

Vue.config.productionTip = false;

new Vue({
  store,
  vuetify,
  router,
  render: (h) => h(App),
}).$mount('#app');
