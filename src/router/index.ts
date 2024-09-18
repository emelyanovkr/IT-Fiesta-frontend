import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';  // Импорт типа
import Home from '@/views/HomePage.vue';
import Manage from '@/views/ManagePage.vue';

const routes: RouteRecordRaw[] = [
  { path: '/', component: Home },
  { path: '/manage', component: Manage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;