import request from '@/utils/http/request'

export const login = (data: any) => {
  return request({
    url: '/login',
    data,
    isToken: false,
    method: 'post',
  })
}
