import * as types from '../mutation-types'
const user = {
  state: {
    userInfo: {}, //用户信息数据
    addressList: null, //用户地址数据
    address: null,    //编辑地址
    postAppraises:null //发表评论
  },
  mutations: {
    [types.SET_USERINFO](state, userInfo) {
      state.userInfo = userInfo
    },
    [types.SET_ADDRESS](state, address){
      state.address = address
    },
    [types.SET_POST_APPRAISES_INFO](state, info){
      state.postAppraises = info
    }
  },
  actions: {
    setUserInfo({state, commit}, userInfo){
      commit(types.SET_USERINFO, userInfo)
    },
    setAddress({state, commit}, address){
      commit(types.SET_ADDRESS, address)
    },
    setPostAppraisesInfo({state, commit}, info){
      commit(types.SET_POST_APPRAISES_INFO, info)
    }
  }
}
export default user
