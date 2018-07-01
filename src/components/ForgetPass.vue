<template>
    <div class="container">
      <mt-header title="忘记密码">
        <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
      </mt-header>
      <div class="content">
        <el-form :model="ruleForm2"  :rules="rules2" ref="ruleForm2" label-position="left" label-width="100px" :show-message="false" class="demo-ruleForm">
          <el-form-item prop="pass" class="item">
            <div slot="label" class="labels">
              <img src="../assets/img/shouj.png" alt="">
              <span>手机号码</span>
            </div>
            <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item prop="checkPass" class="item">
            <div slot="label" class="labels">
              <img src="../assets/img/duanx.png" alt="">
              <span>短信验证</span>
            </div>
            <div class="form-content">
            <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
            <el-button type="text">发送验证码</el-button>
            </div>
          </el-form-item>
          <el-form-item prop="age" class="item">
            <div slot="label" class="labels">
              <img src="../assets/img/yaos.png" alt="">
              <span>设置新密码</span>
            </div>
            <div class="form-content">
            <el-input v-model.number="ruleForm2.age"></el-input>
            <el-switch v-model="ruleForm2.delivery"></el-switch>
            </div>
          </el-form-item>
          <div class="goto">
            <button type="primary" @click="submitForm('ruleForm2')">确定</button>
          </div>
        </el-form>
      </div>
    </div>
</template>

<script>
  import { Toast } from 'mint-ui';
    export default {
        name: "ForgetPass",
      data() {
        var checkAge = (rule, value, callback) => {
          if (!value) {
            return callback(new Error('年龄不能为空'));
          }
          setTimeout(() => {
            if (!Number.isInteger(value)) {
              callback(new Error('请输入数字值'));
            } else {
              if (value < 18) {
                callback(new Error('必须年满18岁'));
              } else {
                callback();
              }
            }
          }, 1000);
        };
        var validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(Toast('提示信息'));
          } else {
            if (this.ruleForm2.checkPass !== '') {
              this.$refs.ruleForm2.validateField('checkPass');
            }
            callback();
          }
        };
        var validatePass2 = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请再次输入密码'));
          } else if (value !== this.ruleForm2.pass) {
            callback(new Error('两次输入密码不一致!'));
          } else {
            callback();
          }
        };
        return {
          ruleForm2: {
            pass: '',
            checkPass: '',
            age: '',
            delivery:false
          },
          rules2: {
            pass: [
              { validator: validatePass, trigger: 'blur' }
            ],
            checkPass: [
              { validator: validatePass2, trigger: 'blur' }
            ],
            age: [
              { validator: checkAge, trigger: 'blur' }
            ]
          }
        };
      },
      methods: {
        goBack() {
          this.$router.back()
        },
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              alert('submit!');
            } else {
              console.log('error submit!!');
              return false;
            }
          });
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
  }
  .item .el-button--text{
    color: #999;
  }
  .content .el-form-item {
    margin-bottom: 8px;
  }
</style>
