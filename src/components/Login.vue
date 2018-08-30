<template>
  <div class="container">
    <div class="content">
      <div class="app-logo">
        <img src="../assets/img/app-logo.png" alt="">
      </div>
      <div :model="ruleForm" ref="ruleForm" label-position="left" label-width="100px" :show-message="false" class="demo-ruleForm">
        <div prop="username" class="item">
          <div slot="label" class="labels">
            <img src="../assets/img/shouj.png" alt="" class="phone">
            <span>手机号码</span>
          </div>
          <div class="form-content">
            <el-input v-model="ruleForm.username" auto-complete="off" placeholder="请输入手机号码"></el-input>
          </div>
        </div>
        <div prop="password" class="item">
          <div slot="label" class="labels">
            <img src="../assets/img/yaos.png" alt="">
            <span>登录密码</span>
          </div>
          <div class="form-content">
            <el-input type="password" v-model="ruleForm.password" auto-complete="off" placeholder="请输入登录密码"></el-input>
          </div>
        </div>

      </div>


    </div>
    <div class="goto">
      <button  @click="doLogin" ref="btnLogin">登录</button>
    </div>
    <div class="behavior">
      <router-link to="/forgetpass">
        <span>忘记密码</span>
      </router-link>
    </div>
  </div>
</template>

<script>
  import * as Constants from '../custom/constants'
  import url from '../http/url.js'
  import { Toast } from 'mint-ui'
  import {mapActions} from 'vuex'
  export default {
    name: "Login",
    data() {
      return {
        ruleForm: {
          username: '',
          password: ''
        }
      };
    },
    methods: {
      ...mapActions([
        'loginState',
        'setToken'
      ]),
      isWeiXin() {
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
          return true;
        } else {
          return false;
        }
      },
      goBack() {
        this.$router.back()
      },
      doLogin() {
        if(this.ruleForm.username === ''){
          Toast({
            message: '手机号不能为空',
            position: 'middle',
            duration: 1000})
          return
        }else if(!(/^1(3|4|5|7|8)\d{9}$/.test(this.ruleForm.username))) {
          Toast('手机号码格式不正确')
          return
        }
        if (this.ruleForm.username.password === '') {
          Toast('密码不能为空')
          return
        }

        this.axios.post(url.login, {
          mobile: this.ruleForm.username,
          password: this.ruleForm.password
        }).then(response => {
          if (response.data.code === 0) {
            let token = response.data.result.token
            let userId = response.data.result.userId
            this.storeState(token).then(() => {
              if(this.isWeiXin()){
                let authUrl = url.baseUrl + url.wxAuth + userId
                window.location.href = authUrl
              }else{
                this.$router.push('/mallindex')
              }
            })
          } else if (response.data.code === 500) {
            Toast({
              message:response.data.msg
            });
          }
        }).catch((error) => {
          Toast({
            message: "服务器异常，请稍后再试"
          })
        });
      },
      async storeState(token){
        await localStorage.setItem(Constants.TOKEN, token)
        await  this.setToken(token)
        await  this.loginState(true)
      }
    }
  }
</script>

<style scoped>
  .container{
    width: 100%;
    height: 100vh;
    background: #fff;
  }
  .content{
    padding: 24px;
  }
  .item{
    position: relative;
    display: flex;
    height: 46px;
    align-items: center;
  }
  .item:after{
    position: absolute;
    content: '';
    height: 1px;
    bottom: 0px;
    left: 0;
    width: 100%;
    background-color: #eee;
  }
  .labels{
    display: flex;
    align-items: center;
    width: 100px;
  }
  .labels img{
    width: 20px;
    margin-right: 4px;
  }
  img.phone{
    width: 16px;
  }
  .form-content{
    flex: 1;
    display: flex;
    align-items: center;
  }
  .goto{
    margin:50px auto 0;
    text-align: center;
  }
  .goto button{
    border: none;
    height: 35px;
    line-height: 35px;
    border-radius: 17px;
    background-color: transparent;
    background-image: url("../assets/img/button-bg.png");
    background-repeat: no-repeat;
    background-size: contain;
    outline: none;
    width: 290px;
    text-align: center;
    color: #fff;
    margin: 0 auto;
  }
  .behavior{
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
    margin-left: 44px;
  }
  .el-form{
    margin-top: 40%;
  }
  /*.demo-ruleForm{*/
    /*margin-top: 20vh;*/
  /*}*/
  .app-logo{
    height: 30vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .app-logo img{
    width: 16vh;
    height: 16vh;
  }
</style>
<style>
  .item .div__label{
    padding: 0;
  }
  .item .el-input__inner{
    border: none;
    flex: 1;
  }
  .item .el-button--text{
    color: #999;
  }
  .content .div {
    margin-bottom: 8px;
  }
</style>

