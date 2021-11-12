import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/charasort/sort',
    name: 'Charasort',
    component: () => import('../views/CharaSort.vue'),
  },
  {
    path: '/charasort/result',
    name: 'CharasortResult',
    component: () => import('../views/Result.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
