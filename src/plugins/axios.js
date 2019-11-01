import axios from 'axios'

const Myaxios = {}

Myaxios.install = (Vue) =>{

  const AUTH_TOKEN = localStorage.getItem('token') // 将获取的token令牌赋值给默认全局请求头
  axios.defaults.headers.common['Authorization'] = AUTH_TOKEN // common[ ] 内写api文档提供字段Authorization即权限验证
  
  axios.defaults.baseURL = 'http://39.108.193.251:8811/api/private/v1/'

  Vue.prototype.$axios = axios
}

export default Myaxios