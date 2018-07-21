import Request from '@/http/axios';
import url from '@/http/url.js'

//  示例  {api  访问路径   methods 访问方式 param 传递参数 data 提交数据}
// export const example = (params) => new Request().require({api: '/api/member/Login',param:params,data:datas});

export const getUserInfo = (params) => new Request().require({api: url.userinfo,methods:'GET',param:params}); //获取个人信息

export const getSorts = (params) => new Request().require({api: url.sort,methods:'GET', param: params}); //获取一级分类

export const getSerials = (datas) => new Request().require({api: url.serials, data: datas}); //获取二级分类

export const getSerialGoods = (datas) => new Request().require({api: url.serialGoods, data: datas}); //获取系列商品

export const getUserAppraises = (params,datas) => new Request().require({api: url.comments,methods: 'POST', param: params, data: datas}); //我的评价

export const addAppraises = (params,datas) => new Request().require({api: url.addAppraises, param: params, data: datas}); //添加评论

export const getGoodsAppraises = (datas) => new Request().require({api: url.getGoodsAppraises, data: datas}); //商品评价

export const updateUserInfo = (params,datas) => new Request().require({api: url.updateUserInfo,param: params, data: datas}); //编辑用户信息

export const getAccountList = (params) => new Request().require({api: url.accountList,methods:'GET',loadingVisble: true,param: params}); //获取账户列表

export const deleteAccount = (params,datas) => new Request().require({api: url.deleteAccount,param: params, data: datas}); //删除账户

export const addAliPay = (params,datas) => new Request().require({api: url.addAliPay,param: params, data: datas}); //添加支付寶賬戶

export const addCard = (params,datas) => new Request().require({api: url.addCard,param: params, data: datas}); //添加銀行卡賬戶

export const updateUserPass = (params,datas) => new Request().require({api: url.updateUserPass,param: params, data: datas}); //修改登錄密碼

export const updatePayPass = (params,datas) => new Request().require({api: url.updatePayPass,param: params, data: datas}); //修改支付密碼

export const setupPayPassword = (params,datas) => new Request().require({api: url.setupPayPassword,param: params, data: datas}); //设置支付（兑换）密码

export const getBonus = (params) => new Request().require({api: url.getBonus,methods:'GET',param: params}); //我的积分信息

export const getExpInfo = (params,datas) => new Request().require({api: url.expInfo,param: params, data: datas}); //查看物流

export const getAdsList = (params) => new Request().require({api: url.addressList,methods:'GET',param: params}); //收货地址列表

export const addAddress = (params,datas) => new Request().require({api: url.addAddress, data:datas, param: params}); //添加收货地址

export const updateAddress = (params,datas) => new Request().require({api: url.updateAddress, data:datas, param: params}); //编辑收货地址

export const deleteAddress = (params,datas) => new Request().require({api: url.deleteAddress, data:datas, param: params}); //删除收货地址

export const getOrderList = (params,datas) => new Request().require({api: url.orderList, data:datas, param: params}); //订单列表

export const getGoodsByGoodsNum = (datas) => new Request().require({api: url.getGoodsByGoodsNum, data:datas}); //商品详情

export const getOrderByOrderNum = (params, datas) => new Request().require({api: url.getOrderByOrderNum,param: params, data:datas}); //商品详情

export const cancelOrder = (params, datas) => new Request().require({api: url.cancelOrder,param: params, data:datas}); //商品详情

export const getRecGoods = (datas) => new Request().require({api: url.recGoodsList, data:datas}); //推荐商品

export const getAllGoods = (datas) => new Request().require({api: url.allGoodsList, data:datas}); //所有商品

export const getBonusGoods = (datas) => new Request().require({api: url.bonusGoodsList, data:datas}); //积分商品

export const transBonus = (params, datas) => new Request().require({api: url.transBonus,param: params, data:datas}); //积分转赠

export const getMobileUser = (params, datas) => new Request().require({api: url.mobileUser,param: params, data:datas}); //查询用户

export const getScoreRecord = (params, datas) => new Request().require({api: url.scoreRecord,param: params, data:datas}); //兑换记录

export const convertBounds = (params, datas) => new Request().require({api: url.convertBounds,param: params, data:datas}); //积分转赠

export const getScoreDetail = (params, datas) => new Request().require({api: url.scoreDetail,param: params, data:datas}); //积分详情

export const getOrderScoreListByType = (params, datas) => new Request().require({api: url.typescorelist,param: params, data:datas}); //可兑积分、未兑积分

export const getShareInfo = (params,datas) => new Request().require({api: url.share, param: params, data:datas}); //推广详情

export const getShareList = (params) => new Request().require({api: url.shareList,methods:'GET', param: params}); //推广详情

export const addCart = (params, datas) => new Request().require({api: url.addCart,param: params, data:datas}); //加入购物车

export const getCartList = (params, datas) => new Request().require({api: url.shopCart,param: params, data:datas}); //获取购物车列表

export const deleteCart = (params, datas) => new Request().require({api: url.deleteCart,param: params, data:datas}); //删除购物车

export const getFriends = (params) => new Request().require({api: url.friends,methods: 'GET', param: params}); //好友列表

export const refundApply = (params, datas) => new Request().require({api: url.refundApply, param: params, data:datas}); //申请退货（退款）

export const getRefundList = (params, datas) => new Request().require({api: url.refundList,  param: params, data:datas}); // 退货退款列表

export const getNotificationList = (datas) => new Request().require({api: url.notification,  data:datas}); // 系统通知

export const getSearchList = (datas) => new Request().require({api: url.searchList,  data:datas}); // 搜索

export const orderReceipt = (params, datas) => new Request().require({api: url.orderReceipt, param: params, data:datas}); // 确认收货

export const getBankList = () => new Request().require({api: url.bankList, methods: 'GET'}); // 代付银行列表

export const getNewsList = (datas) => new Request().require({api: url.newsList, data:datas}); // 新闻列表

export const orderSave = (params, datas) => new Request().require({api: url.orderSave, param: params, data:datas}); // 提交订单

export const getDefaultAddress = (params) => new Request().require({api: url.getDefaultAddress, methods: 'GET', param: params}); // 默认地址

export const pointPay = (datas) => new Request().require({api: url.pointPay,  data:datas}); // 默认地址

export const wxPay = (datas) => new Request().require({api: url.wxPay,  data:datas}); // 默认地址

export const payResult = (params, datas) => new Request().require({api: url.getDefaultAddress, param: params, data:datas}); // 默认地址


