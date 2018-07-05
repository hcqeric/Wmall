import * as types from '../mutation-types'
const app = {
  state: {
    isLogin: false
  },
  mutations: {
    [types.SET_LOGIN_STATE](state, isLogin){
      state.isLogin = isLogin
    }
  },
  actions: {

  }
}

export default app
