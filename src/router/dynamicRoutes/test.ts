import { RouteRecordRaw } from 'vue-router'

const Layouts = () => import('@/layout/index.vue')

/**
 * 文章管理
 */
export const doc: RouteRecordRaw = {
  path: '/doc',
  component: Layouts,
  redirect: '/doc/doc_article',
  name: 'doc',
  meta: {
    title: '文章管理',
    icon: 'doc',
    alwaysShow: true,
  },
  children: [
    {
      path: 'article',
      component: () => import('@/views/home/index.vue'),
      name: 'article',
      meta: {
        title: 'article',
      },
    },
  ],
}
