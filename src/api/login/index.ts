import request from '@/utils/http/request'

export const login = (data: any) => {
  return request({
    url: '/auth/login',
    data,
    isToken: false,
    method: 'post',
  })
}
