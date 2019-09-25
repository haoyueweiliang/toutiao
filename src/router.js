import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home/'
import Login from './views/login'
import Main from './views/home/main'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'

    }, {
      path: '/home',
      component: Home,
      children: [
        {
          path: '', //
          component: Main
        },
        {
          path: 'comment',
          component: () => import('./views/comment')
        },
        {
          path: 'material', // 素材管理
          component: () => import('./views/material')
        },
        {
          path: 'articles', // 内容列表
          component: () => import('./views/articles')
        },
        {
          path: 'publish', // 发布文章
          component: () => import('./views/publish')
        },
        {
          path: 'publish/:articlesId', // 修改文章文章
          component: () => import('./views/publish')
        },
        {
          path: 'publish/:articlesId', // 修改文章文章
          component: () => import('./views/publish')
        },
        {
          path: 'account', // 账户信息
          component: () => import('./views/account')
        }
      ]
    }, {

      path: '/login',
      component: Login

    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
