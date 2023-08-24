import store from '@/store'
import { defineStore } from 'pinia'
import { RouteMeta, type RouteRecordRaw } from 'vue-router'
import { dynamicRoutes, dynamicRouteKeyMap } from '@/router/dynamicRoutes'
import router, { routes } from '@/router'
import { getUserMenu } from '@/api/public'
import { SysPermissionModel } from '@/api/public/types'
import { cloneDeep, keyBy } from 'lodash-es'
import { PermissionTypeEnum } from '@/api/public/types'
import asyncRouteSettings from '@/config/permission'
import { getNormalPath } from '@/utils/url'

/** 处理权限路由 */
function transPermissionMenus(menus: SysPermissionModel[]) {
  const routes: RouteRecordRaw[] = []

  menus.forEach((menu) => {
    const { code, title, menu_type, icon, children } = menu
    const route = dynamicRouteKeyMap.get(code)
    if (!route) return

    const newRoute = cloneDeep(route)
    const meta: RouteMeta = newRoute.meta || ({} as RouteMeta)

    // 合并数据
    Object.assign(meta, { title, type: menu_type, icon })
    routes.push(newRoute)

    // 如果没有children
    if (!children || !children.length) {
      // 保证新route也没有chilren
      delete newRoute.children
      return
    }

    // 如果是菜单类型，children就是页面/菜单
    if (menu_type === PermissionTypeEnum.MENU) {
      newRoute.children = transPermissionMenus(children)
      // 设置重定向
      newRoute.redirect = getNormalPath(
        newRoute.path,
        newRoute.children[0]?.path || '/',
      )
    } else {
      // 否则children代表按钮权限
      meta.permission = keyBy(children, (o: any) => o.code)
    }
  })

  return routes
}

class PermissionState {
  /** 是否完成权限初始化 */
  init = false
  routes: RouteRecordRaw[] = routes
  dynamicRoutes: RouteRecordRaw[] = []
  /** 用户权限 */
  permission: SysPermissionModel[] = []
}

export const usePermissionStore = defineStore('permission', {
  state: () => ({ ...new PermissionState() }),
  actions: {
    async initPermission() {
      let accessedRoutes = dynamicRoutes

      if (asyncRouteSettings.auth) {
        accessedRoutes = await this.getRoutes()
      }

      this.dynamicRoutes = accessedRoutes
      this.routes = routes.concat(accessedRoutes)

      // 将'有访问权限的动态路由' 添加到 Router 中
      accessedRoutes.forEach((route) => {
        router.addRoute(route)
      })

      this.init = true
    },

    /** 获取动态路由 */
    async getRoutes() {
      const { menus } = await getUserMenu()
      // 权限判断
      if (!menus.length) throw new Error('当前用户无权限，请联系管理员')

      this.permission = menus

      return transPermissionMenus(menus)
    },
    /** 重置权限 */
    reset() {
      this.init = false
      this.resetDynamicRoutes()
      this.permission = []
      this.routes = routes
    },

    /** 清除动态路由 */
    resetDynamicRoutes() {
      if (!this.dynamicRoutes.length) return
      try {
        this.dynamicRoutes.forEach((route) => {
          const { name, meta } = route
          const code = meta?.code
          // code是动态路由
          if (!code || !name) return
          router.hasRoute(name) && router.removeRoute(name)
        })
      } catch (e) {
        console.error('resetDynamicRoutes err :>> ', e)
        // 强制刷新浏览器也行，只是交互体验不是很好
        window.location.reload()
      } finally {
        this.dynamicRoutes = []
      }
    },
  },
})

/** 在 setup 外使用 */
export function usePermissionStoreHook() {
  return usePermissionStore(store)
}
