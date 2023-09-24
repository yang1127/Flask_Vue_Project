import request from '@/utils/request'

// 登录
export function login(data) {
  return request({
    url: '/api/login',
    method: 'post',
    data
  }).then(response => {
    const expirationTime = new Date().getTime() + (30 * 24 * 60 * 60 * 1000) // 30天 根据后端写死
    // const expirationTime = new Date().getTime() + (30 * 1000) // 30秒
    localStorage.setItem('refreshTokenExpiration', expirationTime)
    return response
  })
}

// 用refreshToken获取新的accessToken
export function getNewAccessToken(refreshToken) {
  return request({
    url: '/api/refreshToken',
    method: 'get',
    headers: {
      'Authorization': `${refreshToken}`
    }
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
