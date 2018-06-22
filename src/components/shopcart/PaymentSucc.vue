<template>
  <div class="container">
    <mt-header fixed title="支付成功">
    </mt-header>
    <div class="content">
      <img src="http://p90m90efq.bkt.clouddn.com/paysucc.png" alt="">
      <div class="payment-info">
        <Address></Address>
        <div class="amount">
          <p>¥{{amount}}</p>
          <p>{{state}}</p>
        </div>
        <div class="links">
          <el-button size="medium" type="danger" plain @click="gotoHomePage">返回首页</el-button>
          <el-button size="medium" plain @click="gotoOrderDetail">查看订单</el-button>
        </div>
      </div>
      <div class="promotion">
        <img src="http://p90m90efq.bkt.clouddn.com/tuiguang.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  import Address from '@/components/view/Address'
    export default {
        name: "PaymentSucc",
      data(){
          return {
          amount: 599.00,
            state:"支付成功"
          }
      },
      methods:{
          gotoHomePage(){
            this.$router.push('/mallindex')
          },
          gotoOrderDetail(){
            this.$router.push('/orderdetail')
          }
      },
      components:{
        Address
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
  }
  .content{
    margin-top: 48px;
  }
  .content img{
    width: 100%;
    border: none;
  }
  .payment-info{
    display: flex;
    background-color: #fff;
    flex-direction: column;
    align-items: center;
    padding: 16px;
  }
  .amount{
    padding: 8px 0;
    width: 100%;
    text-align: center;
    border-top: 1px solid rgba(239,239,239,0.9);
  }
  .amount p:first-child{
    font-size: 30px;
    color: #FF659B;
  }
  .amount p:last-child{
    font-size: 12px;
    color: #000;
  }
  .links{
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .el-button+.el-button {
    margin-left: 30px;
  }
  .promotion{
    margin: 8px 16px 0 16px;
  }

</style>
