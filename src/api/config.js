import Vue from 'vue'
import axios from 'axios'
import store from '@/store/index';
import { _local } from '@/libs/util'

const api = axios.create({
  timeout: 60000,
  withCredentials: true,
  baseURL: '/api',
  // baseURL: process.env.NODE_ENV === 'production' ? '/' : process.env.API,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  }
})






//添加自定义实例请求拦截器
api.interceptors.request.use(

  config => {
    // 在发送请求之前做些什么
    //判断是否存在token，如果存在将每个页面header都添加token
    if (store.state.token) {
      config.headers.common['token'] = store.state.token
    }

    return config;
  },
  error => console.log(error) // Vue.$Notification.error('请求发送失败')
)
//添加自定义实例响应拦截器
api.interceptors.response.use(
  response => {
    if (response.data.code !== 200) {

      if (response.data.code < 0 && response.data.msg != "没有数据" && response.data.msg != "暂无数据" && response.data.msg != "存在看护人") {
        Vue.$Notification.error(response.data.msg)
      }
      if (response.data.code == -505) {
        store.commit('DEL_TOKEN');
        _local.remove('token')
        window.location.href = `${window.location.origin}/login`
      }
      if (response.data.code == -502) {
        return {
          code: -502,
          orderNo: response.data.data.orderNo
        }
      }

      return false
    }
    return response.data.data ? response.data.data : response.data
  },
  error => {
    console.log(error)
    // Vue.$Notification.error('请求响应失败')
    return false
  }
)

export default api
