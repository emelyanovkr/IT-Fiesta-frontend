import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router' // Импорт типа
import Home from '@/views/HomePage.vue'
import Manage from '@/views/ManagePage.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', component: Home, meta: { title: 'Home Page' } },
  { path: '/manage', component: Manage, meta: { title: 'Manage Events' } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.afterEach((to) => {
  if(to.meta.title) {
    document.title = to.meta.title as string
  }
})

export default router
