import { getUserInfo, logout } from '@/api/login'
import { UserInfo } from '@/api/login/types'
import store from '@/store'
import { defineStore } from 'pinia'
import { RESEETSTORE } from '../reset'

export interface UserStore {
  token: string
  userInfo: Nullable<UserInfo>
}

export const useUserStore = defineStore('user', {
  state: (): UserStore => ({
    token: '',
    userInfo: null,
  }),
  getters: {
    username: (state) => state.userInfo?.nickname,
    avatar: (state) => state.userInfo?.avatar,
  },
  actions: {
    setToken(token: string) {
      console.log('设置token', token)
      this.token = token
    },
    setUserInfo(userInfo: UserInfo) {
      this.userInfo = userInfo
    },
    async GetInfoAction() {
      const { data } = await getUserInfo()
      const {
        user_id: userId,
        user_name: userName,
        nickname,
        email,
        phone,
        post,
        avatar,
        role_name: roleName,
      } = data.user_info
      this.setUserInfo({
        userId,
        userName,
        nickname,
        email,
        phone,
        post,
        avatar,
        roleName,
      })
    },

    async Logout() {
      await logout()
      RESEETSTORE()
    },
  },
  persist: true,
})

export function useUserStoreHook() {
  return useUserStore(store)
}
