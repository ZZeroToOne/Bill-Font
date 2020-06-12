// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from '../node_modules/axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import print from 'vue-print-nb'
import echarts from 'echarts'

Vue.use(ElementUI)

Vue.use(print)

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts

Vue.prototype.$axios = axios;

Vue.prototype.$ip = 'http://121.36.140.128';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  axios,
  components: { App },
  template: '<App/>'
})
