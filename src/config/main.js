import Vue from 'vue';
import App from './App.vue';
import router from './router.js';
import store from './store.js';


Vue.config.productionTip = false;

//api
import { api } from './axios.js';
Vue.prototype.$api = api;
//css
import '@common/assets/css/index.scss';

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
