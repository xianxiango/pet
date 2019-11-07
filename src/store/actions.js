import { fetchData } from '@/api'
import { asyncRouter } from '@/router'



export default {
  setOrdersPetid({ commit }, device) {
    commit('SET_ORDERS_PETID', device)
  },
  setPayType({ commit }, device) {
    commit('SET_PAY_TYPE', device)
  },
  setHospitalId({ commit }, device) {
    commit('SET_HOSPITA_ID', device)
  },
  setBackLink({ commit }, device) {
    commit('SET_BACK_LINK', device)
  },


}