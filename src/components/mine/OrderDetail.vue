<template>
  <div class="container">
    <mt-header fixed title="订单详情">
        <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
        <mt-button slot="right" v-show="orderState>1 && orderState< 4">退款</mt-button>
    </mt-header>
    <div class="content">
      <div class="order-state">
        <el-steps :active="orderState" align-center>
          <el-step title="提交订单" icon="icon-home2"></el-step>
          <el-step title="发货平台" icon="icon-heart"></el-step>
          <el-step title="确认收货" icon="icon-cart"></el-step>
          <el-step title="完成评价" icon="icon-menu"></el-step>
        </el-steps>
      </div>
      <div class="info">
        <Address></Address>
      </div>
      <div class="order-msg">
        <div class="goods" v-for="n in 2">
          <OrderGoods></OrderGoods>
        </div>
        <div class="payment-msg">
          <div class="payment-item">
            <p>下单时间</p>
            <p>2018-04-12  17:00:23</p>
          </div>
          <div class="payment-item">
            <p>订单编号</p>
            <p>132559275960683</p>
          </div>
          <div class="payment-item">
            <p>支付方式</p>
            <p>支付宝</p>
          </div>
          <div class="payment-item">
            <p>交易流水号</p>
            <p>2018349375237893789658962123</p>
          </div>
          <div class="payment-item">
            <p>实际金额合计</p>
            <p class="total-amount">¥ 1430.00</p>
          </div>
        </div>
      </div>

      <div class="goto">
        <button>{{goto}}</button>
      </div>
    </div>
  </div>
</template>

<script>
  import Address from '@/components/view/Address'
  import OrderGoods from '@/components/view/OrderConfirmGoods'
    export default {
        name: "OrderDetail",
      data(){
        return {
          orderState:1,
          goto:"去支付"
        }
      },
      components:{
        Address,
        OrderGoods
      },
      methods:{
        goBack(){
          this.$router.back()
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
  .order-state{
    padding: 16px;
  }
  .order-msg{
    margin-top: 8px;
    padding: 16px 16px 0 16px;
    background-color: #fff;
  }
  .goods{
    border-bottom: 1px solid rgba(239,239,239,0.9);
  }
  .payment-msg{
    padding: 8px 0;
  }
  .payment-item{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 8px 0;
  }
  .payment-item p:first-child{
    color: #999
  }
  .info{
    background-color: #fff;
    padding: 8px 16px;
  }
  .total-amount{
    color: #FF659B;
  }
  .goto{
    margin: 30px 0;
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
  }
</style>
<style>
  .order-state .el-step__title.is-finish {
    color: #FF659B;
  }
  .order-state .el-step__title {
    font-size: 12px;
    line-height: 30px;
  }
  .order-state .el-step__head.is-finish {
    color: #FF659B;
    border-color: #FF659B;
  }
  .order-state .el-step__icon.is-icon {
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }
  .order-state .el-step.is-horizontal .el-step__line{
    top: 17px;
  }

</style>
