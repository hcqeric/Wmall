<template>
    <div class="container">
      <mt-header title="忘记密码">
        <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
      </mt-header>
      <div class="content">
        <div :model="ruleForm"  :rules="rules2" ref="ruleForm" label-position="left" label-width="100px" :show-message="false" class="demo-ruleForm">
          <div prop="mobile" class="item">
            <div slot="label" class="labels">
              <img src="../assets/img/shouj.png" alt="" class="phone">
              <span>手机号码</span>
            </div>
            <div class="form-content">
            <el-input v-model="ruleForm.mobile" auto-complete="off" placeholder="请输入手机号码"></el-input>
            </div>
          </div>
          <div prop="verify" class="item">
            <div slot="label" class="labels">
              <img src="../assets/img/duanx.png" alt="">
              <span>短信验证</span>
            </div>
            <div class="form-content">
            <el-input v-model="ruleForm.verify" auto-complete="off" placeholder="请输入验证码"></el-input>
            <button type="text" @click="sendCode('ruleForm')" ref="btnCode">发送验证码</button>
            </div>
          </div>
          <div prop="password" class="item">
            <div slot="label" class="labels">
              <img src="../assets/img/yaos.png" alt="">
              <span>设置新密码</span>
            </div>
            <div class="form-content">
            <el-input :type="delivery ?  'text' : 'password'" v-model.number="ruleForm.password" placeholder="请输入新密码"></el-input>
            <el-switch v-model="delivery"></el-switch>
            </div>
          </div>
          <div class="goto">
            <button type="primary" @click="submitForm('ruleForm')">确定</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import * as Constants from '../custom/constants'
  import url from '../http/url.js'
  import { Toast } from 'mint-ui';
    export default {
        name: "ForgetPass",
      data() {
        var validateMobile = (rule, value, callback) => {
          if (value === '') {
            callback(Toast({
              message: '手机号不能为空',
              position: 'middle',
              duration: 1000}));
          } else if(!(/^1(2|3|4|5|6|7|8|9)\d{9}$/.test(value))) {
            callback(Toast('手机号码格式不正确'));
          } else {
            callback();
          }
        };
        return {
          delivery:false,
          ruleForm: {
            mobile: '',
            verify: '',
            password: ''
          },
          rules2: {
            mobile: [
              { validator: validateMobile, trigger: 'blur' }
            ]
          }
        };
      },
      methods: {

        goBack() {
          this.$router.back()
        },
        sendCode(formName) {
          if (this.ruleForm.mobile === '') {
            Toast({
              message: '手机号不能为空',
              position: 'middle',
              duration: 1000
            })
            return
          } else if (!(/^1(2|3|4|5|6|7|8|9)\d{9}$/.test(this.ruleForm.mobile))) {
            Toast('手机号码格式不正确')
            return
          }
          this.$refs.btnCode.disabled = true;
          this.axios.post(url.verify, {
            mobile: this.ruleForm.mobile,
            codeType: "1"
          }).then(response => {
            if (response.data.code === 0) {
              let btnCode = this.$refs.btnCode;
              let second = 60
              btnCode.innerHTML = second + 'S后重发'
              let timer = setInterval(() => {
                second--
                btnCode.innerHTML = second + 'S后重发'
                if (second <= 0) {
                  clearInterval(timer)
                  btnCode.innerHTML = '重发验证码'
                  this.$refs.btnCode.disabled = false
                }
              }, 1000)
            } else if (response.data.code === 500) {
              Toast(response.data.msg);
            }
          }).catch(function (error) {
            console.log(error);
          });
        },
        submitForm(formName) {
          if (this.ruleForm.password === '') {
            Toast({
              message: '密码不能为空',
              position: 'middle',
              duration: 1000
            });
            return false
          } else {
            if (!(/^[\w.]{6,20}$/.test(this.ruleForm.password))) {
              Toast({
                message: '密码长度需为6-20位',
                position: 'middle',
                duration: 1000
              });
              return false
            }
          }
          this.axios.post(url.forgetpass, {
            mobile: this.ruleForm.mobile,
            password: this.ruleForm.password,
            code: this.ruleForm.verify,
            recommendUserId: "1",
            selected: this.ruleForm.checked ? "0" : "1"
          }).then(response => {
            if (response.data.code === 0) {
              Toast({
                message: '密码重置成功',
                position: 'middle',
                duration: 1000
              })
              this.$router.replace('/login')
            } else if (response.data.code === 500) {
              Toast({
                message: response.data.msg,
                position: 'middle'
              });
            }
          }).catch(function (error) {
            console.log('error submit!!');
            return false;
          });
        }
      }
    }
</script>

<style scoped>
  .container{
    height: 100vh;
    width: 100vw;
    background: #fff;
  }
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
  .form-content button{
    border: none;
    outline: none;
    background: #fff;
    color: #000;
    width: 100px;
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
</style>
<style>
  .item .el-form-item__label{
    padding: 0;
  }
  .item .el-input__inner{
    border: none;
    flex: 1;
  }
  .item .el-button--text{
    color: #999;
  }
  .content .el-form-item {
    margin-bottom: 8px;
  }
</style>
