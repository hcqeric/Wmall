<template>
  <div class="container" v-if="orderInfo">
    <mt-header fixed title="订单详情">
        <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
        <mt-button slot="right" v-if="orderState == 0"></mt-button>
        <mt-button slot="right" v-else-if="orderState == 1" @click="turnToRefunds(orderInfo, 5)">退款</mt-button>
        <mt-button slot="right" v-else-if="orderState == 2" @click="viewLogisticsTracing(orderInfo.id)">查看物流</mt-button>
        <mt-button slot="right" v-else-if="orderState == 3" @click="turnToRefunds(orderInfo, 6)">退货退款</mt-button>
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
      <div class="info" >
        <Address :address="orderInfo.userAds"></Address>
      </div>
      <div class="order-msg">
        <div class="goods" v-for="(goodsItem,index) in orderInfo.orderDetailList">
          <div v-if="orderInfo.tradeStatus <= 3 && orderInfo.tradeStatus != 3">
            <OrderGoods :goods="goodsItem"></OrderGoods>
          </div>
          <div v-else-if="orderInfo.tradeStatus == 3">
            <OrderEvaluationGoods :goodsIndex="index" class="oitem" :orderItem="orderInfo"></OrderEvaluationGoods>
          </div>
        </div>
        <div class="payment-msg">
          <div class="payment-item" v-if="orderInfo.createTime != undefined && orderInfo.createTime">
            <p>下单时间</p>
            <p>{{orderInfo.createTime | DateFormat("yyyy-MM-dd hh:mm:ss")}}</p>
          </div>
          <div class="payment-item" v-if="orderInfo.orderNum != undefined && orderInfo.orderNum">
            <p>订单编号</p>
            <p>{{orderInfo.orderNum}}</p>
          </div>
          <div class="payment-item" v-if="orderInfo.payType != undefined && orderInfo.payType">
            <p>支付方式</p>
            <p v-if="orderInfo.payType == 1">微信</p>
            <p v-else-if="orderInfo.payType == 2">支付宝</p>
            <p>支付宝</p>
          </div>
          <div class="payment-item" v-if="orderInfo.upOrderNum != undefined && orderInfo.upOrderNum">
            <p>交易流水号</p>
            <p>{{orderInfo.upOrderNum}}</p>
          </div>
          <div class="payment-item" v-if="orderInfo.payAmt != undefined && orderInfo.payAmt">
            <p>实际金额合计</p>
            <p class="total-amount">¥ {{orderInfo.payAmt}}</p>
          </div>
        </div>
      </div>

      <div class="goto">
        <button v-if="orderState == 0">去支付</button>
        <!--<button v-else-if="orderState == 1">提醒发货</button>-->
        <button v-else-if="orderState == 2">确认收货</button>
        <!--<button v-else-if="orderState == 3" @click="turnToPostEva">发表评价</button>-->
      </div>
    </div>
  </div>
</template>

<script>
  import Address from '@/components/view/Address'
  import OrderGoods from '@/components/view/OrderConfirmGoods'
  import OrderEvaluationGoods from '@/components/view/OrderEvaluationGoods'
  import {getOrderByOrderNum} from "../../http/getData"
  import {getLocalStorage} from "../../custom/mixin";
  import * as Constants from '../../custom/constants'
  import {mapActions} from 'vuex'
  export default {
      name: "OrderDetail",
      data(){
        return {
          orderState:0,
          orderInfo: null
        }
      },
      components:{
        Address,
        OrderGoods,
        OrderEvaluationGoods
      },
    methods: {
      ...mapActions({
        setBackRefunds:'setBackRefunds'
      }),
      goBack() {
        this.$router.back()
      },
      viewLogisticsTracing(orderNum){
        this.$router.push('/logistics/'+ orderNum)
      },
      turnToRefunds(orderInfo, type){
        this.setBackRefunds(orderInfo)
        this.$router.push('/refundapply/' + type)
      },
      turnToPostEva(){
        this.setBackRefunds(this.orderInfo)
        this.$router.push('postevaluation')
      }
    },
    mounted(){
        let {orderid} = this.$route.params
        let tk = getLocalStorage(Constants.TOKEN)
        getOrderByOrderNum({token: tk},{orderNum: orderid}).then(response=>{
          this.orderInfo = response.result
          this.orderState = response.result.tradeStatus
          console.log(this.orderState)
          console.log(response)
        })
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
    background-color: #000;
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
    height: 35px;
    line-height: 35px;
    border-radius: 17px;
    background-color: transparent;
    background-image: url("../../assets/img/button-bg.png");
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
  .order-state .el-step__title.is-process {
    color: #bf54f9;
  }
  .order-state .el-step__title.is-finish {
    color: #bf54f9;
  }
  .order-state .el-step__title {
    font-size: 12px;
    line-height: 30px;
  }
  .order-state .el-step__head.is-process {
    color: #bf54f9;
    border-color: #bf54f9;
  }
  .order-state .el-step__head.is-finish {
    color: #bf54f9;
    border-color: #bf54f9;
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
