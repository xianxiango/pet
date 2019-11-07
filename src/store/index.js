import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import { constantRouter } from '@/router'

const state = {
  token: '',
  orders: {
    petId: 0,
    insureId: 0,
    payType: 0,
    user_id: 0,
    has_phone: 0,
    guardian: false,
    avatarUrl: ""
  },
  hospitalID: "",
  backLink: ""
}

Vue.use(Vuex)

const store = new Vuex.Store({
  state,
  actions,
  mutations
})

export default store
