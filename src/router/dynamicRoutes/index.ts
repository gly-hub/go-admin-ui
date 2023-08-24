import { RouteRecordRaw, useRouter } from 'vue-router'
import { doc } from './test'

/** 动态路由map，便于索引 */
export const dynamicRouteKeyMap: Map<string, RouteRecordRaw> = new Map()

/**
 * 动态路由
 */
export const dynamicRoutes: RouteRecordRaw[] = parsedRoutes([doc])

/** 获取路由菜单配置数据 */
export function getMenuConfig(routes: any = dynamicRoutes) {
  return routes.map((route: any) => {
    const meta = route.meta!
    return {
      name: meta.title,
      code: meta.code,
      icon: meta.icon,
      children: route.children ? getMenuConfig(route.children) : undefined,
    }
  })
}

console.log('getMenuConfig() :>> ', getMenuConfig())

/** 删除动态路由 */
export function resetDynamicRoutes() {
  const router = useRouter()
  // 注意：所有动态路由路由必须带有 Name 属性，否则可能会不能完全重置干净
  try {
    router.getRoutes().forEach((route) => {
      const { name, meta } = route
      const code = meta?.code
      // code是动态路由
      if (!code || !name) return
      router.hasRoute(name) && router.removeRoute(name)
    })
  } catch (e) {
    console.log('resetDynamicRoutes err :>> ', e)
    // 强制刷新浏览器也行，只是交互体验不是很好
    window.location.reload()
  }
}

/** 处理路由数据 */
function parsedRoutes(routes: RouteRecordRaw[], pCode = '') {
  return routes.map((route) => {
    const path = route.path.replace('/', '')
    const code = pCode ? [pCode, path].join('_') : path
    const meta = route.meta!
    meta.code = code
    dynamicRouteKeyMap.set(code, route)

    // 如果没配置name，则用code赋值name
    if (!route.name) route.name = code

    if (route.children) {
      route.children = parsedRoutes(route.children, code)
    }
    return route
  })
}
