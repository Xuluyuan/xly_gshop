import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import qs from 'qs'
import Swiper from "swiper"
import Myfooter from './components/Footer.vue'
import ShopHeader from './components/ShopHeader'
Vue.component("my-footer",Myfooter)
Vue.component("shop-header",ShopHeader)
axios.defaults.baseURL = 'http://127.0.0.1'
Vue.prototype.axios = axios;
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
