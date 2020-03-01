import axios from 'axios'

var instance = axios.create({
  baseURL:'http://localhost:8080',
})

//添加请求拦截器
instance.interceptors.request.use(function (config) {
  console.log(config);
  // 在发送请求之前做些什么
  return config
}, function (error) {
// 对请求错误做些什么
  return Promise.reject(error)
})

export default instance
