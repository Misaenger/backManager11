import axios from 'axios'

const Myaxios = {}

Myaxios.install = Vue => {
  
  axios.interceptors.request.use(function(config) { // 添加请求拦截器
    // 在所有请求发起之前会先触发下面的代码
    if (config.url !== 'login') {
      // 除了登录请求其他请求都设置拦截
      const AUTH_TOKEN = localStorage.getItem('token') // 将获取的token令牌赋值给默认全局请求头
      config.headers['Authorization'] = AUTH_TOKEN // common[ ] 内写api文档提供字段Authorization即权限验证
    }
    return config
  })

  axios.defaults.baseURL = 'http://39.108.193.251:8811/api/private/v1/'

  Vue.prototype.$axios = axios
}

export default Myaxios
