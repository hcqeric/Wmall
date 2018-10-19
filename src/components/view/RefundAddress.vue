<template>
  <div class="personal-info">
    <div class="left">
      <img src="../../assets/img/ditu.png" />
    </div>
    <div class="right">
      <div class="recipient">
        <p>退货收件人：<span>{{address.consignee}}</span></p>
        <p>{{address.mobile}}</p>
      </div>
      <div class="address">
        <p>退&nbsp;货&nbsp;地&nbsp;址：<span>{{address.fullAddress}}</span></p>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Address",
      props:{
          address: null
      }
    }
</script>

<style scoped>
  .personal-info{
    display: flex;
    flex-direction: row;
    align-items: center;

  }
  .left img{
    width: 18px;
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
