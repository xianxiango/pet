import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/views/main/Main.vue'

const _import = file => () => import('@/views/' + file + '.vue')

Vue.use(Router)

export const constantRouter = [
  {
    path: '',
    component: Main,
    redirect: 'home',
    meta: {
      title: '宠保',
      icon: 'dashboard',
    },
    children: [{
      path: 'home',
      component: _import('home/Home'),
      name: 'home',
      meta: {
        title: '宠保',
        keepAlive: true,
        headerTitle: "宠保-宠物保险平台",
      }
    }]
  },
  {
    path: '',
    component: Main,
    redirect: 'confirmOrder',
    meta: {
      title: '确认订单',
      icon: 'dashboard',
    },
    children: [{
      path: 'confirmOrder',
      component: _import('confirmOrder/ConfirmOrder'),
      name: 'confirmOrder',
      meta: {
        title: '确认订单',
        keepAlive: false,
      }
    }]
  },
  {
    path: '',
    component: Main,
    redirect: 'addPet',
    meta: {
      title: '添加宠物',
      icon: 'dashboard',
    },
    children: [{
      path: 'addPet',
      component: _import('addPet/AddPet'),
      name: 'addPet',
      meta: {
        title: '添加宠物',
        keepAlive: false,
      }
    }]
  },
  {
    path: '',
    component: Main,
    redirect: 'editPet',
    meta: {
      title: '修改宠物',
      icon: 'dashboard',
    },
    children: [{
      path: 'editPet',
      component: _import('editPet/EditPet'),
      name: 'editPet',
      meta: {
        title: '修改宠物',
        keepAlive: false,
      }
    }]
  },
  {
    path: '',
    component: Main,
    redirect: 'hospital',
    meta: {
      title: '医院列表',
      icon: 'dashboard',
    },
    children: [{
      path: 'hospital',
      component: _import('hospital/Hospital'),
      name: 'hospital',
      meta: {
        title: '医院列表',
        keepAlive: false,
        backgroupFFF: true,
      }
    }]
  },
  {
    path: '',
    component: Main,
    redirect: 'warranty',
    meta: {
      title: '保单管理',
      icon: 'dashboard',
    },
    children: [{
      path: 'warranty',
      component: _import('warranty/Warranty'),
      name: 'warranty',
      meta: {
        title: '保单管理',
        keepAlive: false,
        headerTitle: "宠保-宠物保险平台",
      }
    }]
  },
  {
    path: '',
    component: Main,
    redirect: 'choosePet',
    meta: {
      title: '选择宠物',
      icon: 'dashboard',
    },
    children: [{
      path: 'choosePet',
      component: _import('choosePet/ChoosePet'),
      name: 'choosePet',
      meta: {
        title: '选择宠物',
        keepAlive: false,
      }
    }]
  },
  {
    path: '',
    component: Main,
    redirect: 'petList',
    meta: {
      title: '我的宠物',
      icon: 'dashboard',
    },
    children: [{
      path: 'petList',
      component: _import('petList/PetList'),
      name: 'petList',
      meta: {
        title: '我的宠物',
        keepAlive: true,
      }
    }]
  },
  {
    path: '',
    component: Main,
    redirect: 'guardian',
    meta: {
      title: '看护人信息',
      icon: 'dashboard',
    },
    children: [{
      path: 'guardian',
      component: _import('guardian/Guardian'),
      name: 'guardian',
      meta: {
        title: '看护人信息',
        keepAlive: true,
      }
    }]
  },
  {
    path: '',
    component: Main,
    redirect: 'login',
    meta: {
      title: '登陆',
      icon: 'dashboard',
    },
    children: [{
      path: 'login',
      component: _import('login/Login'),
      name: 'login',
      meta: {
        title: '登录',
        keepAlive: false,
        headerTitle: "宠保-宠物保险平台",
        backgroupFFF: true,
      }
    }]
  },
  {
    path: '',
    component: Main,
    redirect: 'center',
    meta: {
      title: '个人中心',
      icon: 'dashboard',
    },
    children: [{
      path: 'center',
      component: _import('center/Center'),
      name: 'center',
      meta: {
        title: '个人中心',
        keepAlive: false,
        headerTitle: "宠保-宠物保险平台",
      }
    }]
  },
  {
    path: '',
    component: Main,
    redirect: 'policyDetails',
    meta: {
      title: '保单详情',
      icon: 'dashboard',
    },
    children: [{
      path: 'policyDetails',
      component: _import('policyDetails/PolicyDetails'),
      name: 'policyDetails',
      meta: {
        title: '保单详情',
        headerTitle: "宠保-宠物保险平台",
        keepAlive: false,
      }
    }]
  },
  {
    path: '',
    component: Main,
    redirect: 'bindPhone',
    meta: {
      title: '绑定手机',
      icon: 'dashboard',
    },
    children: [{
      path: 'bindPhone',
      component: _import('bindPhone/BindPhone'),
      name: 'bindPhone',
      meta: {
        title: '绑定手机',
        keepAlive: false,
      }
    }]
  },
  {
    path: '',
    component: Main,
    redirect: 'payIndex',
    meta: {
      title: '微信支付授权',
      icon: 'dashboard',
    },
    children: [{
      path: 'payIndex',
      component: _import('payIndex/PayIndex'),
      name: 'payIndex',
      meta: {
        title: '微信支付授权',
        keepAlive: false,
      }
    }]
  },
  {
    path: '',
    component: Main,
    redirect: 'wxLogin',
    meta: {
      title: '微信登陆',
      icon: 'dashboard',
    },
    children: [{
      path: 'wxLogin',
      component: _import('wxLogin/WxLogin'),
      name: 'wxLogin',
      meta: {
        title: '微信登陆',
        keepAlive: false,
      }
    }]
  },
  {
    path: '',
    component: Main,
    redirect: 'paySuccess',
    meta: {
      title: '支付成功',
      icon: 'dashboard',
    },
    children: [{
      path: 'paySuccess',
      component: _import('paySuccess/PaySuccess'),
      name: 'paySuccess',
      meta: {
        title: '支付成功',
        keepAlive: false,
      }
    }]
  },
]

export const asyncRouter = [




  // 404 页面一定要最后加载、否则后面的所有页面都会被拦截到404
  {
    path: '*',
    name: 'error',
    component: _import('error/Error'),
    hidden: true,
    meta: {
      roles: 'default'
    }
  },

]

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouter
})
