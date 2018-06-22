<template>
  <div class="personal-info">
    <div class="left">
      <i class="icon-home2"></i>
    </div>
    <div class="right">
      <div class="recipient">
        <p>收货人名：<span>张三</span></p>
        <p>15899889888</p>
      </div>
      <div class="address">
        <p>收货地址：<span>广东省深圳市宝安区新安街道幸福花园A栋栋201新安街道幸福花园A栋栋201</span></p>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Address"
    }
</script>

<style scoped>
  .personal-info{
    display: flex;
    flex-direction: row;
    align-items: center;

  }
  .left i{
    font-size: 26px;
  }
  .right{
    margin-left: 8px;
  }
  .recipient{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .recipient p{
    color: #999;
    display: flex;
    align-items: center;
    font-size: 14px;
  }
  .recipient p:last-child{
    font-size: 18px;
    color: #000;

  }
  .recipient p span{
    font-size: 16px;
    color: #000;
  }
  .address{
    color: #999;
    font-size: 14px;
    line-height: 30px;
  }
</style>
