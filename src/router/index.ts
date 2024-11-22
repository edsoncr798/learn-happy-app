import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import homePage from '@/views/HomePage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Splash',
    component: () => import('@/views/SplashScreenPage.vue'),
    meta: {
      noAuth: true,
    },
  },
  {
    path:'/inial-data',
    name:'initial-data',
    component: () => import('@/views/InitialDataPage.vue')
  },
  {
    path:'/home',
    name: 'home',
    component: homePage,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
