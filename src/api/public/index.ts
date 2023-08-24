import request from '@/utils/http/request'
/** 获取用户菜单 */
export function getUserMenu() {
  return request({
    url: '/user_menu',
  })
}
