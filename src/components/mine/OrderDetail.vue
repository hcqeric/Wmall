<template>
  <div class="container" v-if="orderInfo">
    <mt-header fixed title="订单详情">
        <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
        <mt-button slot="right" v-if="orderState == 0"></mt-button>
        <mt-button slot="right" v-else-if="orderState == 1 && orderInfo.buyType != 2" @click="turnToRefunds(orderInfo, 5)">退款</mt-button>
        <mt-button slot="right" v-else-if="orderState == 2" @click="viewLogisticsTracing(orderInfo.id)">查看物流</mt-button>
        <mt-button slot="right" v-else-if="orderState == 3 && orderInfo.buyType != 2" @click="turnToRefunds(orderInfo, 6)">退货退款</mt-button>
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
        <div class="order-goods" v-for="(goodsItem,index) in orderInfo.orderDetailList">
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
          <div class="payment-item" v-if="orderInfo.payType != undefined">
            <p>支付方式</p>
            <p v-if="orderInfo.payType == 0">未支付</p>
            <p v-else-if="orderInfo.payType == 1">微信</p>
            <p v-else-if="orderInfo.payType == 2">支付宝</p>
            <p v-else-if="orderInfo.payType == 3">积分支付</p>
          </div>
          <div class="payment-item" v-if="orderInfo.upOrderNum != undefined && orderInfo.upOrderNum">
            <p>交易流水号</p>
            <p>{{orderInfo.upOrderNum}}</p>
          </div>
          <div class="payment-item" v-if="orderInfo.buyType == 0 && orderInfo.payAmt != undefined && orderInfo.payAmt">
            <p>实际金额合计</p>
            <p class="total-amount">{{orderInfo.payAmt|moneyFormat}}</p>
          </div>
          <div class="payment-item" v-if="orderInfo.buyType == 2 && orderInfo.payBonus != undefined && orderInfo.payBonus">
            <p>实际积分合计</p>
            <p class="total-amount">{{orderInfo.payBonus}}</p>
          </div>
        </div>
      </div>

      <div class="goto">
        <button v-if="orderState == 0" @click="toPay">去支付</button>
        <!--<button v-else-if="orderState == 1">提醒发货</button>-->
        <button v-else-if="orderState == 2" @click="orderConfirm">确认收货</button>
        <!--<button v-else-if="orderState == 3" @click="turnToPostEva">发表评价</button>-->
      </div>

    </div>

    <div class="msgbox-wrapper" style="position: absolute; z-index: 2011;display: block;" v-show="dialogShow == true"  ref="msgbox">
      <div class="mint-msgbox" style="">
        <div class="mint-msgbox-header">
          <div class="mint-msgbox-title">选择支付方式</div>
        </div>
        <div class="mint-msgbox-content">
          <div class="pay-list">
            <div class="pay-item" v-if="buyType == 0">
              <el-radio v-model="radio" :label="0">微信支付</el-radio>
              <i class="iconfont icon-weixinzhifu"></i>
            </div>
            <div class="pay-item" v-if="buyType == 0">
              <el-radio v-model="radio" :label="1">支付宝支付</el-radio>
              <img class="alipay-icon" src="../../assets/img/alipay.png"/>
            </div>
            <div class="pay-item" v-if="buyType == 2">
              <el-radio v-model="radio" :label="2">积分支付</el-radio>
              <img src="../../assets/img/jif1.png" alt="">
            </div>
          </div>
        </div>
        <div class="mint-msgbox-btns">
          <button class="pay mint-msgbox-btn mint-msgbox-cancel" @click="gotoPay">去支付</button>
        </div>
      </div>
    </div>

    <div class="modal" style="z-index: 2006;"  v-show="dialogShow == true" @click="dialogShow = false" ></div>

    <PayKeyBoard :isPay="isPay" @pas-end='pasEnd' @close='isPay=false'></PayKeyBoard>
  </div>
</template>

<script>
  import Address from '@/components/view/Address'
  import OrderGoods from '@/components/view/OrderDetailGoods'
  import OrderEvaluationGoods from '@/components/view/OrderEvaluationGoods'
  import PayKeyBoard from '@/components/view/PayKeyBoard'
  import {getPaySuccInfo,wxPay,pointPay, wxJsPay,orderReceipt, aliPay} from "../../http/getData"
  import {getLocalStorage} from "../../custom/mixin";
  import * as Constants from '../../custom/constants'
  import {mapActions} from 'vuex'
  import { MessageBox, Toast } from 'mint-ui'
  export default {
      name: "OrderDetail",
      data(){
        return {
          orderState:0,
          orderInfo: null,
          buyType: 0,
          radio:0,
          dialogShow: false,
          isPay:false,
          orderId:'',
          token:''
        }
      },
      components:{
        Address,
        OrderGoods,
        OrderEvaluationGoods,
        PayKeyBoard
      },
      methods: {
      ...mapActions({
        setBackRefunds:'setBackRefunds'
      }),
      orderConfirm(){
        MessageBox({
          title:'确认收货',
          message: '亲，确认已经收到改商品了吗?',
          showCancelButton: true,
          confirmButtonText: '已收货',
          cancelButtonText: '取消'
        }).then(action => {
          if (action === 'confirm') {
            orderReceipt({
              token: this.token
            },{
              id: this.orderId
            }).then(response=>{
              this.$emit('orderItem', this.orderItem)
              Toast({
                message:'确认收货成功',
                position: 'middle'
              })
              this.$router.push('/ordercenter/all')
            })
          } else {
            console.log("quxiaole")
          }
        }).catch(error=>{});
      },
      goBack() {
        this.$router.back()
      },
      pasEnd(val) {
        pointPay({
          orderId: this.orderInfo.id.toString(),
          payPassword: val
        }).then(response=>{
          this.$router.push('/paymentsucc/' + this.orderInfo.id.toString())
        })
        this.isPay = false
      },
      viewLogisticsTracing(orderNum){
        this.$router.push('/logistics/'+ orderNum)
      },
      turnToRefunds(orderInfo, type){
        this.setBackRefunds(orderInfo)
        this.$router.push('/refundapply/' + type)
      },
      toPay(){
        this.radio = this.buyType
        this.dialogShow = true
      },
      // turnToPostEva(){
      //   this.setBackRefunds(this.orderInfo)
      //   this.$router.push('/postevaluation')
      // },
      gotoPay(){
        if(this.radio == 0){
          if (this.isWeiXin()) {
            wxJsPay({
              token: this.token
            },{
              orderId: this.orderId
            }).then(response => {
              this.payWeixin(response.result)
            })
          }else{
            wxPay({
              orderId: this.orderInfo.id.toString()
            }).then(response=>{
              window.location.href = response.result.mweb_url
              setTimeout(()=>{
                MessageBox({
                  title: '支付结果确认',
                  message: '请确认支付是否已完成',
                  showCancelButton: true,
                  confirmButtonText:'已完成支付',
                  cancelButtonText:'支付遇到问题',
                  closeOnClickModal: false
                }).then(action=>{
                  getPaySuccInfo({
                    token: this.token
                  },{
                    id: this.orderId
                  }).then(response=>{
                    this.orderState = response.result.tradeStatus
                  })
                  if(this.orderState == 1){
                    this.$router.push('/paymentsucc/'+ this.orderInfo.id.toString())
                  }else{
                    this.$router.push('/payfail/'+ this.orderInfo.id.toString())
                  }
                });
              },5000)
            })
          }
        }else if(this.radio == 1){
          aliPay({
            orderId: this.orderInfo.id.toString()
          }).then(response => {
            window.location.href = response.result
          })
        } else if(this.radio == 2){
          this.dialogShow = false
          this.isPay = true
        }
        this.dialogShow = false
      },
      onBridgeReady(response) {
        WeixinJSBridge.invoke(
          'getBrandWCPayRequest', response.jsInfo,
          res=>{
            if (res.err_msg == "get_brand_wcpay_request:ok") {// 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
              this.$router.push('/paymentsucc/'+ this.orderInfo.id.toString())
            } else{
              this.$router.push('/payfail/'+ this.orderInfo.id.toString() )
            }
          }
        );
      },
      payWeixin(response) {
        if (typeof WeixinJSBridge == "undefined") {
          if (document.addEventListener) {
            document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady, false);
          } else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady);
            document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady);
          }
        } else {
          this.onBridgeReady(response);
        }
      },
      isWeiXin() {
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
          return true;
        } else {
          return false;
        }
      }
    },
    mounted(){
        let {orderid} = this.$route.params
        this.orderId = orderid
        let tk = getLocalStorage(Constants.TOKEN)
        this.token = tk
        getPaySuccInfo({token: tk},{id: orderid}).then(response=>{
          this.orderInfo = response.result
          this.buyType = response.result.buyType
          this.orderState = response.result.tradeStatus
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
  .mint-header.is-fixed{
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
  .order-goods{
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

  .modal {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    background: #000;
  }

  .pay-list{
    position: relative;
    display: flex;
    flex-direction: column;
  }
  /*.pay-list:after{*/
  /*content: '';*/
  /*height: 1px;*/
  /*width: 100%;*/
  /*position: absolute;*/
  /*background-color: #eee;*/
  /*top:0*/
  /*}*/
  .pay-item{
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
  }
  .pay-item p{
    margin-left: 8px;
  }
  .pay-item i{
    margin-right:8px;
    color: #1afa29;
    font-size: 20px;
  }
  .pay-item img{
    margin-right:8px;
    width: 20px;
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
