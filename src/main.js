import Vue from 'vue';
import App from './App.vue';
import router from '@/router'; // 引入路由模块
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' // 引入 Element UI 的样式文件
import VueParticles from 'vue-particles'

Vue.use(ElementUI) // 全局注册 Element UI 组件
Vue.use(VueParticles)

Vue.config.productionTip = false;

new Vue({
  router, // 注册路由
  render: h => h(App),
}).$mount('#app');
