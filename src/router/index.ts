import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import Login from '../views/login/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Home',
    component: Login,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
