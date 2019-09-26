// 导航守卫   看是否有token值  有方行  无则返回首页
import router from './router'
// npm i nprogress -S   a安装三方包
import nprogress from 'nprogress' // 引入进度条
import 'nprogress/nprogress.css'
router.beforeEach(function (to, from, next) {
  nprogress.start() // 开启进度条
  if (to.path.startsWith('/home')) {
    let token = window.localStorage.getItem('user-token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

// 全局后置守卫
router.afterEach(function () {
  nprogress.done() // 关闭进度条
})
export default router
