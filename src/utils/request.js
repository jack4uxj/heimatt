/**
 * 请求模块
 */
import axios from 'axios'
import store from '@/store'
import JSONBig from 'json-bigint'

const request = axios.create({
  baseURL: 'http://toutiao.itheima.net', // 接口的基准路径
  transformResponse: [function (data) {
    try {
      return JSONBig.parse(data)
    } catch (err) {
      return data
    }

    // axios 默认会在内部这样来处理后端返回的数据
    // return JSON.parse(data)
  }]
})

// 请求拦截器
// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 发起请求经过这里
  // 获取user对象，判断是否有token
  const {user} = store.state
  if(user && user.token) {
       config.headers.Authorization = `Bearer ${user.token}`
  }
  // 必须要返回config对象
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
})

// 响应拦截器

export default request
