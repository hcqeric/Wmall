import * as types from '../mutation-types'
const app = {
  state: {
    isLogin: false,
    token: ''
  },
  mutations: {
    [types.SET_LOGIN_STATE](state, isLogin){
      state.isLogin = isLogin
    },
    [types.SET_TOKEN](state, token){
      state.token = token
    }
  },
  actions: {
    loginState({state, commit}, currentLoginState){
      commit(types.SET_LOGIN_STATE, currentLoginState)
    },
    setToken({state, commit}, token){
      commit(types.SET_TOKEN, token)
    }
  }
}

export default app
