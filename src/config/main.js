import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import store from './store.js'

Vue.config.productionTip = false

//api
import { api } from './axios.js'
Vue.prototype.$api = api
//css
import '@common/assets/css/index.scss'

//第三方库
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
