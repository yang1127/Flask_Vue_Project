import request from '@/utils/request'

export function getUserList(params) {
  const accessToken = localStorage.getItem('accessToken')
  return request({
    url: '/api/getUserList',
    method: 'get',
    headers: {
      'Authorization': `${accessToken}`
    },
    params
  })
}
