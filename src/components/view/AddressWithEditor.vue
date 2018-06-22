<template>
  <div class="personal-info">
    <div class="left">
      <i class="icon-home2"></i>
    </div>
    <div class="middle">
      <div class="recipient">
        <p>张三<span>15899889888</span></p>
        <button v-show="isDefault == true">默认</button>
      </div>
      <div class="address">
        <p>收货地址：<span>广东省深圳市宝安区新安街道幸福花园A栋栋201新安街道幸福花园A栋栋201</span></p>
      </div>
    </div>
    <div class="right">
      <i class="icon-menu"></i>
    </div>
  </div>

</template>

<script>
    export default {
        name: "AddressWithEditor",
      data(){
          return{

          }
      },
      props: {
          isDefault: Boolean
      }
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
  .right i{
    font-size: 26px;
    padding-left: 16px;
  }
  .middle{
    padding:0  8px;
    border-right: 1px solid rgba(239,239,239,0.9);
  }

  .recipient{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
  .recipient p{
    color: #000;
    display: flex;
    align-items: center;
    font-size: 14px;
  }
  .recipient p span{
    display: block;
    margin:0 16px;
    font-size: 16px;
    color: #999;
  }
  .recipient button{
    outline-color: transparent;
    background-color: white;
    border: 1px solid #FF659B;
    border-radius: 5px;
    padding: 1px 8px;
    color: #FF659B;
    font-size: 10px;
  }
  .address{
    color: #999;
    font-size: 12px;
    line-height: 26px;
  }
</style>
