import Vue from 'vue'
import store from './store'
import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { _local } from './libs/util'
import { format } from 'path'
// import configure from '../static/config'
NProgress.configure({ showSpinner: false })



const currentHost = window.location.host.split('.')

if (_local.get('token')) {
  store.commit('SET_TOKEN', _local.get('token'))
}
router.beforeEach((to, from, next) => {
  const isLogin = _local.get('token')
  const hasPhone = _local.get("hasPhone")
  NProgress.start()
  if (to.meta.title) {
    document.title = to.meta.title
  }


  if (from.path == "hospital") {
    if (to.path == "guardian") {
      from.meta.keepAlive = true
    }
    from.meta.keepAlive = false
  }
  if (to.path == "guardian") {
    to.meta.keepAlive = false;
  }

  console.log(to.path)
  if (to.path == '/payIndex' || to.path == '/wxLogin') {
    next()
    return false
  }

  if (isLogin && !hasPhone) {
    if (to.path == '/warranty' || to.path == '/petList' || to.path == '/choosePet') {
      Vue.$Notification.error('请先绑定手机号')
      next('/bindPhone')
      return false
    }
  }

  if (!isLogin && to.path !== '/login' && to.path !== '/home') {
    next('/login')
    return false
  }
  if (!isLogin && (to.path === '/login' || to.path === '/home')) {
    next()
    return false
  }
  if (isLogin && (to.path === '/login' || to.path === '/home')) {
    next()
    return false
  }
  // if (store.state.token) {
  //   next();
  // }
  // else {
  //   next({
  //     path: '/login',
  //     query: { redirect: to.fullPath }
  //   })
  // }

  else {
    next()
  }

})

router.afterEach(() => {
  NProgress.done()
})
