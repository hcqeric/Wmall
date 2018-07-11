import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import getters from './getters'
import user from './modules/user'
import shop from './modules/shop'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    shop
  },
  getters
})

export default store
