import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/static/style/base.less';
import 'element-ui/lib/theme-chalk/index.css';
// import '@/assets/static/style/element-ui.less';

Vue.config.productionTip = false

// 配置标题
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

