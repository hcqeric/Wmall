<template>
  <div class="container">
    <div class="content">
      <el-form :model="ruleForm"  :rules="rules" ref="ruleForm" label-position="left" label-width="100px" :show-message="false" class="demo-ruleForm">
        <el-form-item prop="username" class="item">
          <div slot="label" class="labels">
            <img src="../assets/img/shouj.png" alt="" class="phone">
            <span>手机号码</span>
          </div>
          <el-input v-model="ruleForm.username" auto-complete="off" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item prop="password" class="item">
          <div slot="label" class="labels">
            <img src="../assets/img/yaos.png" alt="">
            <span>登录密码</span>
          </div>
          <div class="form-content">
            <el-input type="password" v-model="ruleForm.password" auto-complete="off" placeholder="请输入登录密码"></el-input>
          </div>
        </el-form-item>
        <div class="goto">
          <button type="primary" @click="submitForm('ruleForm')" ref="btnLogin">登录</button>
        </div>
        <div class="behavior">
          <router-link to="/forgetpass">
            <span>忘记密码</span>
          </router-link>
        </div>
      </el-form>
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
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(Toast('密码不能为空'));
        } else {
          callback();
        }
      };
      var validateUsername = (rule, value, callback) => {
        if (value === '') {
          callback(Toast({
            message: '手机号不能为空',
            position: 'middle',
            duration: 1000}));
        } else if(!(/^1(3|4|5|7|8)\d{9}$/.test(value))) {
          callback(Toast('手机号码格式不正确'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          username: '',
          password: ''
        },
        rules: {
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          username: [
            { validator: validateUsername, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      ...mapActions([
        'loginState',
        'setToken'
      ]),
      goBack() {
        this.$router.back()
      },
      submitForm(formName) {
        console.log("denglu")
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.axios.post(url.login,{
              mobile: this.ruleForm.username,
              password: this.ruleForm.password
            }).then( response=> {
              console.log(response)
              if (response.data.code === 0){
                let token = response.data.result.token
                console.log("sdfasdf")
                this.storeState(token).then(()=>{
                  this.$router.push('/mallindex')
                })
              }else if(response.data.code === 500){
                Toast(response.data.msg);
              }
            }).catch(function (error) {
              console.log(error);
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      async storeState(token){
        console.log('start store');
        await localStorage.setItem(Constants.TOKEN, token)
        await  this.setToken(token)
        await  this.loginState(true)
        console.log('end store');
      }
    }
  }
</script>

<style scoped>
  .mint-header{
    background-color: #000;
    height: 48px;
  }
  .content{
    padding: 0 30px;
    margin-top: 40%;
  }
  .item{
    position: relative;
  }
  .item:after{
    position: absolute;
    content: '';
    height: 1px;
    bottom: -1px;
    width: 100%;
    background-color: #eee;
  }
  .labels{
    display: flex;
    align-items: center;
  }
  .labels img{
    width: 20px;
    margin-right: 4px;
  }
  img.phone{
    width: 16px;
  }
  .form-content{
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
  }
</style>
<style>
  .item .el-form-item__label{
    padding: 0;
  }
  .item .el-input__inner{
    border: none;
  }
  .item .el-button--text{
    color: #999;
  }
  .content .el-form-item {
    margin-bottom: 8px;
  }
</style>

