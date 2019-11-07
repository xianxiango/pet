// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import ElementUi from 'element-ui'
import Calendar from 'vue2-datepick'; //日期控件
import 'element-ui/lib/theme-chalk/index.css'
import './access'

Vue.use(ElementUi, {
  size: 'medium'
})
Vue.use(Calendar);//日期控件

Vue.config.productionTip = false
Vue.prototype.$Notification = Vue.$Notification = ElementUi.Notification




/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
