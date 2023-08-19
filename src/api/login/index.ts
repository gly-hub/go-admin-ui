import request from '@/utils/http/request'

export const login = (data: any) => {
  return request({
    url: '/login',
    data,
    isToken: false,
    method: 'post',
  })
}

export const logout = () => {
  return request({
    url: '/logout',
    method: 'post',
  })
}

export const getUserInfo = () => {
  return request({
    url: '/user_info',
    method: 'get',
    isToken: true,
  })
}
