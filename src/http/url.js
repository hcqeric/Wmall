//线上地址
// const url = 'http://edu.halopay.cn';

// 开发地址
const url = 'http://120.79.16.221:8777';

export default {
  baseUrl: url,
  login: '/app/login',
  verify: '/app/sendCode',
  reg:'/app/register',
  forgetpass:'/app/updatePassword',
  banners: '/app/file/getFileByType',
  sort: '/app/goods/getGoodsType',
  userinfo:'/app/user/userInfo',
  comments: '/app/appraises/getUserAppraises'
}
