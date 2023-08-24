import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'
const Layouts = () => import('@/layout/index.vue')

import Login from '../views/login/index.vue'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Layouts,
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
        },
      },
    ],
  },
  {
    path: '/user_info',
    component: Layouts,
    meta: {
      hidden: true,
    },
    children: [
      {
        path: '',
        name: '用户中心',
        component: () => import('@/views/userinfo/index.vue'),
        meta: {
          title: '用户中心',
        },
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      hidden: true,
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export function setupRouter(app: App<Element>) {
  app.use(router)
}

export default router
