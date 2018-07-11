import * as types from '../mutation-types'
const app = {
  state: {
    orderNum:''
  },
  mutations: {
    [types.SET_ORDER_NUM](state, orderNum){
      state.orderNum = orderNum
    }

  },
  actions: {
    setOrderNum({state, commit}, orderNum){
      commit(types.SET_LOGIN_STATE, orderNum)
    }
  }
}

export default app
