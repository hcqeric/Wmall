<template>
  <div class="container">
    <el-row class="avatar">
      <img src="../assets/img/register-logo.png" alt="avatar">
    </el-row>
    <div class="main">
      <el-row>
        <el-col :span="6" class="recommend"><img src="../assets/img/register-logo.png" alt="" align="right"></el-col>
        <el-col :span="18" class="recommend"><span>推荐人：张三</span></el-col>
      </el-row>

      <el-row class="info">
        <el-col :span="6" class="msg"><span><i class="icon-mobile"></i></span></el-col>
        <el-col :span="18" class="msg"><input v-model="input" placeholder="请输入内容" class="imsg" /></el-col>
      </el-row>

      <el-row class="info">
        <el-col :span="6" class="msg"><span><i class="icon-bubble"></i></span></el-col>
        <el-col :span="12" class="msg"><input v-model="input" placeholder="短信验证码" class="imsg" /></el-col>
        <el-col :span="6" class="msg">
          <el-button type="text">发送验证码</el-button>
        </el-col>
      </el-row>
      <el-row class="info">
        <el-col :span="6" class="msg"><span><i class="icon-lock"></i></span></el-col>
        <el-col :span="18" class="msg"><input v-model="input" placeholder="设置登录密码" class="imsg" /></el-col>
      </el-row>

      <el-row class="info">
        <el-col :span="6" class="msg agreement-check"><input type="checkbox" ></el-col>
        <el-col :span="18" class="msg"><p class="agreement">已阅读并同意《<a href="#">用户服务协议</a>》</p></el-col>
      </el-row>

      <el-row class="confirm">
        <el-col :span="16" :offset="4"><el-button type="primary" round >确认</el-button></el-col>
        <el-col :span="4"></el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecommendReg',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container{
    width: 100%;
    height: 100%;
    padding-top: 40px;
    padding-left: 16px;
    padding-right: 16px;
    box-sizing: border-box;
  }
  .avatar{
    text-align: center;
  }
  .avatar img{
    width: 80px;
    height: 80px;
  }

  .main{
    margin-top: 40px;
  }

  .recommend img{
    width: 40px;
    height: 40px;
  }
  .recommend span{
    display: block;
    height: 40px;
    line-height: 40px;
    text-align: left;
  }

  .info{
    height: 40px;
    border-bottom: 1px solid #eee;
  }
  .msg input{
    height: 36px;
    line-height: 36px;
    margin-left: 8px;
  }
  .msg span{
    display: block;
    height: 40px;
    line-height: 40px;
    text-align: right;
  }

  .msg span i{
    font-size:20px;
    opacity: 0.7;
  }

  .imsg{
    border: none;
  }

  .agreement-check{
   text-align: right;
    height: 40px;
    line-height: 40px;
  }

  .agreement{
    height:40px;
    line-height: 40px;
  }

  .agreement a{
    text-decoration: none;
    color: #1ABC9C;
  }

  .confirm{
    margin-top: 40px;
  }

  .confirm .el-button{
    width: 100%;
    background-color: #1ABC9C;
  }

</style>
