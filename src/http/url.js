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
  recGoodsList:'/app/goods/recommendGoods',
  allGoodsList:'/app/goods/getAllGoods',
  bonusGoodsList:'/app/goods/getBonusGoods',
  sort: '/app/goods/getGoodsType',
  serials:'/app/goods/getGoodsSecondType',
  serialGoods:'/app/goods/getGoodsByTypeId',
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
  getOrderByOrderNum:'/app/order/getOrderByOrderNum',
  cancelOrder:'app/order/cancelOrder',
  transBonus:'app/account/largessBounds',
  mobileUser:'app/user/selectByMobile',
  scoreRecord:'app/account/convertDetail',
  convertBounds:'app/account/convertBounds',
  scoreDetail:'app/account/getScoreDetailById',
  typescorelist:'app/account/getOrderScoreListByType',
  share:'/app/share/info',
  shareList:'/app/share/list',
  addCart:'/app/cart/saveOrUpdate',
  shopCart:'/app/cart/list',
  deleteCart:'/app/cart/delete',
  friends: 'app/user/selectByParentId',
  refundApply: 'app/order/refundApply',
  refundList: 'app/order/refundApplyList',
  notification:'app/notification/list',
  searchList:'app/goods/selectGoodsByLike',
  orderReceipt:'app/order/receipt'
}
