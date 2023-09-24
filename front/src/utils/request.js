import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import {
  getToken,
  getRefreshToken,
  setToken
} from '@/utils/auth'
import { getNewAccessToken } from '@/api/user'
import router from '@/router'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)
service.interceptors.response.use(
  response => {
    const res = response.data

    // 判断状态码
    if (response.status !== 200) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  async error => {
    const originalRequest = error.config
    if (error.response.status === 401) {
      const refreshToken = getRefreshToken()
      if (refreshToken !== null && !originalRequest._retry) {
        // 添加标志位，避免进入循环
        originalRequest._retry = true
        const expirationTime = localStorage.getItem('refreshTokenExpiration')
        const currentTime = new Date().getTime()
        if (expirationTime && currentTime > expirationTime) {
          // refreshToken已过期，执行退出操作
          logout()
        } else {
          try {
            // 请求getNewAccessToken接口，获取新的accessToken
            const res = await getNewAccessToken(refreshToken)
            if (res.data.tokenType === 'new_access') {
              const newToken = res.data.accessToken
              // 将新的accessToken置换老的accessToken
              setToken(newToken)
              // 更新原始请求的Authorization头部
              originalRequest.headers.Authorization = newToken
              // 重新发送原始请求
              return service(originalRequest)
            }
          } catch (error) {
            logout()
          }
        }
      } else {
        logout()
      }
    }
    return Promise.reject(error)
  }
)

function logout() {
  localStorage.clear()
  router.push({
    path: '/login'
  })
}

export default service
