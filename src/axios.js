import axios from 'axios'
import qs from 'qs'
var instance = axios.create({
  baseURL:'http://localhost:8080',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

//添加请求拦截器
instance.interceptors.request.use(function (config) {
  config.data = qs.stringify(config.data)
  // 在发送请求之前做些什么
  return config
}, function (error) {
// 对请求错误做些什么
  return Promise.reject(error)
})

export default instance
