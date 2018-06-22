<template>
  <div class="container">
    <mt-header fixed title="编辑收货地址">
      <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
      <mt-button slot="right" @click="saveAddress">保存</mt-button>
    </mt-header>
    <div class="content">
      <div class="address-info">
          <div class="info-item" @click="">
            <span>收货地址</span><input type="text"   value="广东省深圳市南山区" :disabled="true"><span><i class="el-icon-arrow-right"></i></span>
          </div>
        <div class="info-item">
          <span>详细地址</span><input type="text" value="新安街道幸福花园3栋201">
        </div>
        <div class="info-item">
          <span>联系人</span><input type="text" value="张三">
        </div>
        <div class="info-item">
          <span>手机号码</span><input type="text" value="13888888888">
        </div>
      </div>
      <div class="goto">
        <button>删除收货地址</button>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "EditAddress",
      methods:{
        goBack() {
          this.$router.back()
        },
        saveAddress() {

        }
      }
    }
</script>

<style scoped>
  .container{
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: #efefef;
    overflow: scroll;
  }
  .mint-header{
    background-color: #FF659B;
    height: 48px;
    z-index: 9999;
  }
  .content{
    margin-top: 48px;
  }
  .address-info{
    padding:0 16px;
    background-color: #fff;
  }
  .info-item{
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid rgba(239,239,239,0.9);
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .info-item span{
    display: inline-block;
  }
  .info-item span:first-child{
    width: 80px;

    color: #999;
  }
  .info-item input{
    border: none;
    outline-color: transparent;
    height: 40px;
    flex: 1;
  }
  .info-item span:last-child{
    width: 30px;
    text-align: center;
  } i{
    font-size: 16px;
    color: #000;
  }
  .goto{
    position: fixed;
    bottom: 0;
    left: 0;
    padding: 44px 0;
    width: 100%;
    text-align: center;
  }
  .goto button{
    border: none;
    height: 44px;
    line-height: 44px;
    border-radius: 22px;
    background-color: transparent;
    background-image: url("../../assets/img/color-pink.png");
    width: 280px;
    text-align: center;
    color: #fff;
    margin: 0 auto;
  }
  input[disabled],input:disabled{
    border:none;
    background-color:transparent;
    color: #000;
  }
</style>
