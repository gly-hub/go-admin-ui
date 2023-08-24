import { Router } from 'vue-router'
import { createPermissionGuard } from './permissionGuard'

// 根据顺序执行守卫
export function setupRouterGuard(router: Router) {
  createPermissionGuard(router)
}
