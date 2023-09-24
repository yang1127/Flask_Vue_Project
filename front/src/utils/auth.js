/**
 * token信息设置
 */

const TOKEN_KEY = 'accessToken'
const REFRESH_TOKEN_KEY = 'refreshToken'

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token) {
  return localStorage.setItem(TOKEN_KEY, token)
}

export function removeToken() {
  return localStorage.removeItem(TOKEN_KEY)
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN_KEY)
}

export function setRefreshToken(token) {
  return localStorage.setItem(REFRESH_TOKEN_KEY, token)
}

export function removeRefreshToken() {
  return localStorage.removeItem(REFRESH_TOKEN_KEY)
}

