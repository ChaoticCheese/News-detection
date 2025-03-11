import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomePage.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/UserLogin.vue')
  },
  {
    path: '/homeview',
    name: 'HomeView',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/algorithm',
    name: 'Algorithm',
    component: () => import('@/views/NewsAlgorithm.vue')
  },
  {
    path: '/text-detection',
    name: 'TextDetection',
    component: () => import('@/views/TextDetection.vue')
  },
  {
    path: '/percenal',
    name: 'percenal',
    component: () => import('@/views/PersonalCenter.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;