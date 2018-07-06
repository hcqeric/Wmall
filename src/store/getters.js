const getters = {
    //登陸狀態
    isLogin: state => state.app.isLogin,
    token: state => state.app.token,
    userinfo: state=> state.user.userInfo

}
export default getters

