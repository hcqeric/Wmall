import * as types from '../mutation-types'
const user = {
  state: {
    userInfo: {}, //用户信息数据
    addressList: null, //用户地址数据
    address: null
  },
  mutations: {
    [types.SET_USERINFO](state, userInfo) {
      state.userInfo = userInfo
    },
    [types.SET_ADDRESS](state, address){
      state.address = address
    }
  },
  actions: {
    setUserInfo({state, commit}, userInfo){
      commit(types.SET_USERINFO, userInfo)
    },
    setAddress({state, commit}, address){
      commit(types.SET_ADDRESS, address)
    }
  }
}
export default user
