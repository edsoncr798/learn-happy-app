import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import homePage from '@/views/HomePage.vue';
import NumberLevels from '@/views/NumberGamesLevelPage.vue';
import Game from '@/views/GamePage.vue';

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
    path: '/welcome',
    name: 'Welcome',
    component: () => import('@/views/WelcomePage.vue'),
    meta: {noAuth: false, },
  },
  {
    path: '/initial-data',
    name: 'initial-data',
    component: () => import('@/views/InitialDataPage.vue'),
    meta: { noAuth: true },
  },
  {
    path: '/home',
    name: 'Home',
    component: homePage,
  },
  {
    path: '/game-levels',
    name: 'game-levels',
    component: () => import('@/views/GameLevelsPage.vue'),
  },
  {
    path: '/progress',
    name: 'Progress',
    component: () => import('@/views/ProgressPage.vue'),
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/ProfilePage.vue'),
  },
  {
    path: '/level/:levelNumber',
    name: 'NumberLevels',
    component: NumberLevels,
    props: true,
    children: [
      {
        path: 'game/:gameId',
        name: 'Game',
        component: Game,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});


router.beforeEach((to, from, next) => {
  const requiredAuth = !to.matched.some((record) => record.meta.noAuth);
  const user = localStorage.getItem('user');

  if (requiredAuth && !user) {
    next({ name: 'initial-data' });
  } else {
    next();
  }
});


export default router;
