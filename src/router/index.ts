import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'

import Login from '../views/login/index.vue'
import Home from '../views/home/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      hidden: false,
    },
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
