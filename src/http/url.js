//线上地址
// const url = 'http://edu.halopay.cn';

// 开发地址
// const url = 'http://120.79.16.221:8777';

//强哥本地IP
const url = 'http://192.168.0.147:8080';

export default {
  baseUrl: url,
  login: '/app/login',
  verify: '/app/sendCode',
  reg:'/app/register',
  forgetpass:'/app/updatePassword',
  banners: '/app/file/getFileByType',
  sort: '/app/goods/getGoodsType',
  userinfo:'/app/user/userInfo',
  comments: '/app/appraises/getUserAppraises',
  addAppraises:'app/appraises/add',
  getGoodsAppraises:'/app/appraises/getAppraises',
  updateUserInfo:'/app/user/update',
  accountList:'/app/account/list',
  deleteAccount:'/app/account/delete',
  addAliPay:'/app/account/addAliPay',
  addCard:'/app/account/addCard',
  updateUserPass:'/app/updateUserPassword',
  updatePayPass:'/app/updatePayPassword',
  setupPayPassword:'app/setUpPayPassword',
  getBonus:'app/account/getBonus',
  expInfo:'/app/order/expInfo',
  addressList:'/app/userAds/getAdsList',
  addAddress:'/app/userAds/save',
  updateAddress:'/app/userAds/update',
  deleteAddress: '/app/userAds/delete',
  orderList:'/app/order/list',
  getGoodsByGoodsNum:'/app/goods/getGoodsByGoodsNum',
  getOrderByOrderNum:'/app/order/getOrderByOrderNum'
}
