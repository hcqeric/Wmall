<template>
  <div class="personal-info">
    <div class="left">
      <img src="../../assets/img/ditu.png"></img>
    </div>
    <div class="middle">
      <div class="recipient">
        <p>{{address.consignee}}<span>{{address.mobile}}</span></p>
        <button v-show="address.default_flag == 0">默认</button>
      </div>
      <div class="address">
        <p>收货地址：<span>{{address.fullAddress}}</span></p>
      </div>
    </div>
    <div class="right">
      <img src="../../assets/img/bianj.png"></img>
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
        address: Object
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
  .right img{
    width: 24px;
    margin-left: 16px;
  }
  .middle{
    flex: 1;
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
