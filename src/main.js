import Vue from 'vue'
import App from './App.vue'
// import router from './router'
import router from './permission' // 更改成导航护卫地址
import ElementUI from 'element-ui'
import Component from './components' // 引入需全局注册的组件
import './styles/index.less'
import 'element-ui/lib/theme-chalk/index.css'// 引入样式
// import axios from 'axios'
import axios from './utils/axios.config'// axios拦截机引入
// Vue.prototype.$axios = axios // 共享全局实例对象
// axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
Vue.config.productionTip = false
Vue.use(ElementUI)// 对elementui  进行全局注册
Vue.use(Component)// 进行全局注册
Vue.use(axios)// 进行全局注册

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
