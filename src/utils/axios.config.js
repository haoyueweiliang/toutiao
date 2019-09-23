// axios 拦截放入token   在请求到达后台前
import axios from 'axios'
import router from '../permission'
import jsonBig from 'json-bigint' // 运行时安装  此三方包
// 单独导入方法
import Message from 'element-ui'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 常态值
axios.defaults.transformResponse = [function (data) {
  return data ? jsonBig.parse(data) : {} // 三方包将json.parse 替换   可以保证大数字的准确性  但是记得得到大数字转化为字符串 toString
}]
//     拦截机           请求                  配置参数
axios.interceptors.request.use(function (config) {
  let token = window.localStorage.getItem('user-token')
  config.headers['Authorization'] = `Bearer ${token}`

  return config
}, function (error) {
  // 队请求错误进行处理
  return Promise.reject(error)
})

// 响应拦截
axios.interceptors.response.use(function (response) {
  // 给返回结果去了一层data   respose.data=>result  没有返回数据的返回{}
  return response.data ? response.data : {}
}, function (error) {
  // 失败返回的状态码  返回信息
  let status = error.response.status
  let message = '未知错误'
  switch (status) {
    case 400:
      message = '请求参数错误'
      break
    case 403:
      message = ' refresh_token未携带或已过期'
      break
    case 407:
      message = ' 数据库异常'
      break
    case 401:
      message = ' token过期或未传'
      // 清除无用token
      window.localStorage.clear()
      router.push('/login')
      break

    default:
      break
  }
  Message({ messagex: message })
  // 终止错误   不在进入catch
  return new Promise(function () {})
})
// export default axios
// 导出  方法二   全局注册 axios
export default {
  install: function (Vue) {
    Vue.prototype.$axios = axios // 共享全局实例对象
  }
}
