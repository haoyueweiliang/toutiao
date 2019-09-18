import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import './styles/index.less'
import 'element-ui/lib/theme-chalk/index.css'// 引入样式

Vue.config.productionTip = false
Vue.use(ElementUI)// 对elementui  进行全局注册

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
