import * as types from '../mutation-types'
const app = {
  state: {
    orderNum:'',
    backRefunds:null
  },
  mutations: {
    [types.SET_ORDER_NUM](state, orderNum){
      state.orderNum = orderNum
    },
    [types.BACK_REFUNDS](state, refunds){
      state.backRefunds = refunds
    }
  },
  actions: {
    setOrderNum({state, commit}, orderNum){
      commit(types.SET_LOGIN_STATE, orderNum)
    },
    setBackRefunds({state, commit}, refunds){
      commit(types.BACK_REFUNDS, refunds)
    }
  }
}

export default app
