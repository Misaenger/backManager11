// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/style/reset.css'
import Myaxios from '@/plugins/axios.js'
import moment from 'moment'
import mybread from '@/components/cuscom/mybread.vue'


Vue.use(Myaxios)
Vue.use(ElementUI)
Vue.config.productionTip = false

// 全局过滤器
Vue.filter('fmtdate',(value)=>{  // 处理日期格式
  return moment(value).format('YYYY-MM-DD')
})

// 全局组件
Vue.component(mybread.name,mybread)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // render:(h)=>h(App)
  components: { App },
  template: '<App/>'
})
