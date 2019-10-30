import axios from 'axios'

const Myaxios = {}

Myaxios.install = (Vue) =>{

  axios.defaults.baseURL = 'http://39.108.193.251:8811/api/private/v1/'

  Vue.prototype.$axios = axios
}

export default Myaxios