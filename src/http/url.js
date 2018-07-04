//线上地址
// const url = 'http://edu.halopay.cn';

// 开发地址
export const url = 'http://120.24.60.15:8777';

export default {
  baseUrl: url,
  login: '/app/login',
  verify: '/app/sendCode',
  reg:'/app/register',
  forgetpass:'/app/updatePassword',
  banners: '/app/file/getFileByType',
  sort: '/app/goods/getGoodsType',
  userinfo:'/app/user/userInfo'
}
