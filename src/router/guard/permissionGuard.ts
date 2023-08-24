import { useUserStoreHook } from '@/store/modules/user'
import { usePermissionStoreHook } from '@/store/modules/permission'
import isWhiteList from '@/config/white-list'
import { LOGIN_URL } from '@/config'
import { Router } from 'vue-router'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { ElMessage } from 'element-plus'

NProgress.configure({ showSpinner: false })

/**
 * 创建鉴权守卫
 * @param router
 */
export function createPermissionGuard(router: Router) {
  router.beforeEach(async (to) => {
    NProgress.start()

    const userStore = useUserStoreHook()
    const permissionStore = usePermissionStoreHook()

    // 动态设置标题
    const title = import.meta.env.VITE_APP_TITLE
    document.title = to.meta.title ? `${to.meta.title} - ${title}` : title

    // 已经初始化，放行
    if (permissionStore.init) {
      // 根路径
      if (to.fullPath === '/' && to.matched[0].name === '404') {
        return permissionStore.dynamicRoutes[0]?.path || '/404'
      }

      return true
    }

    // 判断访问页面是否在路由白名单地址(静态路由)中，如果存在直接放行
    if (isWhiteList(to)) return true

    // 判断是否有 Token，没有重定向到 login 页面
    if (!userStore.token) return { path: LOGIN_URL, replace: true }

    try {
      // 用户权限判断
      // if (!userStore.userInfo) {
      //   await userStore.getInfo()
      // }

      if (!permissionStore.init) {
        await permissionStore.initPermission()

        // 设置 replace: true, 因此导航将不会留下历史记录
        return { path: to.path, replace: true }
      }
    } catch (error: any) {
      console.error(error)
      // 移除多余报错提示
      ElMessage.closeAll()
      // 合并错误信息
      const message = `登录失败${error?.message ? ': ' + error?.message : ''}`
      ElMessage.warning({ message, duration: 5000 })
      // 清除权限
      userStore.Logout()
      return LOGIN_URL
    }
  })

  /**
   * @description 路由跳转结束
   * */
  router.afterEach(() => {
    NProgress.done()
  })

  /**
   * @description 路由跳转错误
   * */
  router.onError((error) => {
    NProgress.done()
    console.warn('路由错误', error.message)
  })
}
