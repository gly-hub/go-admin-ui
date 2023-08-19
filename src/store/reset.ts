import { useUserStore } from './modules/user'

export function RESEETSTORE() {
  const userStore = useUserStore()

  userStore.$reset()
  // 清除用户信息缓存
  localStorage.removeItem('user')
}
