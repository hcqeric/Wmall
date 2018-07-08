import Request from '@/http/axios';
import url from '@/http/url.js'

//  示例  {api  访问路径   methods 访问方式 param 传递参数 data 提交数据}
// export const example = (params) => new Request().require({api: '/api/member/Login',param:params,data:datas});

export const getUserInfo = (params) => new Request().require({api: url.userinfo,methods:'GET',param:params}); //获取个人信息

export const getSorts = (params) => new Request().require({api: url.sort,methods:'GET', param: params}); //获取一级分类

export const getUserAppraises = (params,datas) => new Request().require({api: url.comments,methods: 'POST', param: params, data: datas}); //我的评价

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



