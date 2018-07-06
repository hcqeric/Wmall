import * as types from '../mutation-types'
const user = {
  state: {
    userInfo: {}, //用户信息数据
    addressList: null, //用户地址数据
  },
  mutations: {
    [types.SET_USERINFO](state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    setUserInfo({state, commit}, userInfo){
      commit(types.SET_USERINFO, userInfo)
    }
  }
}
export default user
