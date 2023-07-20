import request from '@/utils/request'

// 登录
export function login(data) {
  return request({
    url: '/api/login',
    method: 'post',
    data
  })
}

// 注册
export function register(data) {
  return request({
    url: '/api/register',
    method: 'post',
    data
  })
}

// 退出
export function logout(params) {
  const accessToken = localStorage.getItem('accessToken')
  return request({
    url: '/api/logout',
    method: 'post',
    headers: {
      'Authorization': `${accessToken}`
    },
    params
  })
}

// 详情
export function getUserDetail(data) {
  const accessToken = localStorage.getItem('accessToken')
  return request({
    url: '/api/userDetail',
    method: 'post',
    headers: {
      'Authorization': `${accessToken}`
    },
    data
  })
}
