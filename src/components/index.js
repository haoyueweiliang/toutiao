// 实现整体注册组件的统一注册
import layoutAside from './home/layout-aside'
import layoutHeader from './home/layout-header'
import breadCrumb from '../components/common/bread-crumb' // 面包屑全局注册
export default {
  install: function (Vue) {
    Vue.component('layout-aside', layoutAside)
    Vue.component('layout-header', layoutHeader)
    Vue.component('bread-crumb', breadCrumb)
  }
}
