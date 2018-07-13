import * as types from '../mutation-types'
const user = {
  state: {
    userInfo: {}, //用户信息数据
    addressList: null, //用户地址数据
    address: null,    //编辑地址
    postAppraises:null, //发表评论
    ableScore: 0,  //可兑积分
    unpackScore:0,  //未结积分
    rechargeScore:0, //复购积分
    exchangeItemInfo:null //兑换记录信息
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
    },
    [types.SET_ABLE_SCORE](state, score){
      state.ableScore = score
    },
    [types.SET_UNPACK_SCORE](state, score){
      state.unpackScore = score
    },
    [types.SET_RECHARGE_SCORE](state, score){
      state.rechargeScore = score
    },
    [types.SET_EXCHANGE_INFO](state, info){
      state.exchangeItemInfo = info
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
    },
    setAbleScore({state, commit}, score){
      commit(types.SET_ABLE_SCORE, score)
    },
    setUnpackScore({state, commit}, score){
      commit(types.SET_UNPACK_SCORE, score)
    },
    setRechargeScore({state, commit}, score){
      commit(types.SET_RECHARGE_SCORE, score)
    },
    setExchangeInfo({state, commit}, info){
      commit(types.SET_EXCHANGE_INFO, info)
    }
  }
}
export default user
