// 实现整体注册组件的统一注册
import layoutAside from './home/layout-aside'
import layoutHeader from './home/layout-header'
import breadCrumb from '../components/common/bread-crumb' // 面包屑全局注册
// 富文本编辑器   全局注册   cnpm i vue-quill-editor -S
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
import coverImg from './publish/cover-img' // 全局注册显示图片的组件
import selectImg from './publish/select-img' // 全局注册图片内部选择组件
export default {
  install: function (Vue) {
    Vue.component('layout-aside', layoutAside)
    Vue.component('layout-header', layoutHeader)
    Vue.component('bread-crumb', breadCrumb)
    Vue.component('quill-editor', quillEditor)
    Vue.component('cover-img', coverImg)
    Vue.component('select-img', selectImg)
  }
}
