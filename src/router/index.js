import Vue from 'vue';
import VueRouter from 'vue-router';
import Denglu from '../views/UserLogin.vue'; 
import HomePage from '../views/HomePage.vue';
import PersonalCenter from '../views/PersonalCenter.vue';
import NewsAlgorithm from '../views/NewsAlgorithm.vue';
import HomeView from '../views/HomeView.vue';
import TextDetection from '../views/TextDetection';

Vue.use(VueRouter);

const routes = [
  {
    
    path: '/',
    redirect:"/denglu"
  },
  {
    
    path: '/denglu',
    name: 'Denglu',
    component: Denglu
  },
  {
    
    path: '/homepage',
    name: 'HomePage',
    component: HomePage
  },
  {
    
    path: '/personalcenter',
    name: 'PersonalCenter',
    component: PersonalCenter
  },
  {
    
    path: '/NewsAlgorithm',
    name: 'NewsAlgorithm',
    component: NewsAlgorithm
  },
  {
      path: '/HomeView',
      name: 'HomeView',
      component: HomeView
  },
  {
    path: '/TextDetection',
    name: 'TextDetection',
    component: TextDetection
},
  
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;