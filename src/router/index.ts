import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import layout from '@/layouts/layout.vue';
import homePage from '@/views/HomePage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: { name: 'home' },
  },
  {
    path: '/',
    component: layout,
    children: [
      {
        path: '/home',
        name: 'home',
        component: homePage,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
