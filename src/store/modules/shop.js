import * as types from '../mutation-types'
const app = {
  state: {
    orderNum:'',
    backRefunds:null,
    confirmGoods:null,
    paySuccOrderId:''
  },
  mutations: {
    [types.SET_ORDER_NUM](state, orderNum){
      state.orderNum = orderNum
    },
    [types.BACK_REFUNDS](state, refunds){
      state.backRefunds = refunds
    },
    [types.SET_CONFIRM_ORDER_GOODS](state, confirmGoods){
      state.confirmGoods = confirmGoods
    },
    [types.SET_PAY_SUCE_ORDER_ID](state, orderId){
      state.paySuccOrderId = orderId
    }
  },
  actions: {
    setOrderNum({state, commit}, orderNum){
      commit(types.SET_LOGIN_STATE, orderNum)
    },
    setBackRefunds({state, commit}, refunds){
      commit(types.BACK_REFUNDS, refunds)
    },
    setConfirmGoods({state, commit}, confirmGoods){
      commit(types.SET_CONFIRM_ORDER_GOODS, confirmGoods)
    },
    setPaySuccOrderId({state, commit}, orderId){
      commit(types.SET_PAY_SUCE_ORDER_ID, orderId)
    }
  }
}

export default app
