import * as types from '../mutation-types'
const app = {
  state: {
    isLogin: false,
    token: '',
    setPayPass: false,
    newsContent: null
  },
  mutations: {
    [types.SET_LOGIN_STATE](state, isLogin){
      state.isLogin = isLogin
    },
    [types.SET_TOKEN](state, token){
      state.token = token
    },
    [types.SET_PAY_PASS](state, setPayPass){
      state.setPayPass = setPayPass
    },
    [types.SET_NEWS_CONTENT](state, newsContent){
      state.newsContent = newsContent
    }
  },
  actions: {
    loginState({state, commit}, currentLoginState){
      commit(types.SET_LOGIN_STATE, currentLoginState)
    },
    setToken({state, commit}, token){
      commit(types.SET_TOKEN, token)
    },
    setPayPass({state, commit}, setPayPass){
      commit(types.SET_PAY_PASS, setPayPass)
    },
    setNewsContent({state, commit}, newsContent){
      commit(types.SET_NEWS_CONTENT, newsContent)
    }
  }
}

export default app
