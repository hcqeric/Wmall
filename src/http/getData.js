import Request from '@/http/axios';
import url from '@/http/url.js'
//  示例  {api  访问路径   methods 访问方式 param 传递参数 data 提交数据}
// export const example = (params) => new Request().require({api: '/api/member/Login',param:params,data:datas});

export const getUserInfo = (params) => new Request().require({api: url.userinfo,methods:'GET',param:params}); //获取个人信息

export const getSorts = (params) => new Request().require({api: url.sort,methods:'GET', param: params}); //获取一级分类

export const getUserAppraises = (params,datas) => new Request().require({api: url.comments,methods: 'POST', param: params, data: datas}); //我的评价

export const updateUserInfo = (params,datas) => new Request().require({api: url.updateUserInfo,param: params, data: datas}); //编辑用户信息

export const getAccountList = (params) => new Request().require({api: url.accountList,methods:'GET',param: params}); //获取账户列表

export const deleteAccount = (params,datas) => new Request().require({api: url.deleteAccount,param: params, data: datas}); //删除账户

export const addAliPay = (params,datas) => new Request().require({api: url.deleteAccount,param: params, data: datas}); //删除账户

export const addCard = (params,datas) => new Request().require({api: url.deleteAccount,param: params, data: datas}); //删除账户



