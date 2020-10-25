import Vue from "vue";
import Vuex from 'vuex'

import mutations from './mutations'
import getters from './getters'
import actions from './actions'
import moduleA from './module/moduleA'

Vue.use(Vuex)

const state = {
  cartGoods: [],
  goods: {}

}
const store = new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  modules: {
    moduleA,
  }
})

export default store