import store from '@/store'
import { defineStore } from 'pinia'

class UserStore {
  token = ''
  userInfo: any = null
}

export const useUserStore = defineStore('user', {
  state: () => ({ ...new UserStore() }),
  getters: {
    username: (state) => state.userInfo?.name,
    avatar: (state) => state.userInfo?.avatar,
  },
})

export function useUserStoreHook() {
  return useUserStore(store)
}
