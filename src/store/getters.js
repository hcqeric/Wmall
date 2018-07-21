const getters = {
    //登陸狀態
    isLogin: state => state.app.isLogin,
    token: state => state.app.token,
    userinfo: state=> state.user.userInfo,
    setPayPass: state => state.app.setPayPass,
    address: state => state.user.address,
    postAppraises: state=> state.user.postAppraises,
    orderNum: state=> state.shop.orderNum,
    orderScoreDetail: state=>state.user.orderScoreDetail,
    scoreExchangeId: state=>state.user.scoreExchangeId,
    confirmGoods: state => state.shop.confirmGoods
}
export default getters

