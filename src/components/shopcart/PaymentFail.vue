<template>
  <div class="container">
    <mt-header fixed title="支付失败">
    </mt-header>
    <div class="content">
      <div class="pay-state">
        <img src="../../assets/img/pay-fail.png" alt="">
        <span>支付失败</span>
      </div>
      <div class="payment-info">
        <Address :address="address"></Address>
        <div class="amount">
          <p v-if="totalAmt != 0">待付金额：{{totalAmt | moneyFormat}}</p>
          <p v-if="totalAmt == 0">待付积分：{{payBonus}}积分</p>
        </div>
        <div class="links">
          <button @click="gotoHomePage">返回首页</button>
          <button @click="gotoOrderDetail">查看订单</button>
        </div>
      </div>
      <div class="promotion">
        <img :src="shareImg" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  import Address from '@/components/view/Address'
  import {getPaySuccInfo} from "../../http/getData";
  import {getLocalStorage} from "../../custom/mixin";
  import * as Constants from '../../custom/constants'

  export default {
        name: "PaymentSucc",
      data(){
          return {
            amount: 0,
            orderId:'',
            address: {},
            totalAmt: 0,
            shareImg:'',
            payBonus:0,
            orderNum: ''
          }
      },
      methods:{
          gotoHomePage(){
            this.$router.push('/mallindex')
          },
          gotoOrderDetail(){
            this.$router.push('/orderdetail/'+ this.orderId)
          }
      },
      components:{
        Address
      },
      mounted(){
        let {id} = this.$route.params
        this.orderId = id
        let tk = getLocalStorage(Constants.TOKEN)

        getPaySuccInfo({
          token: tk
        },{
          id: this.orderId.toString(),
        }).then(response=>{

          this.address = response.result.userAds
          this.totalAmt = response.result.payAmt
          this.orderNum = response.result.orderNum
          this.shareImg = response.result.shareImg
          this.payBonus = response.result.payBonus
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
    color: #bf54f9;
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
  .links button {
    border: 1px solid #efefef;
    outline: none;
    background-color: transparent;
    background-image: url("../../assets/img/bg-white.png");
    background-repeat: no-repeat;
    background-size: contain;
    height: 35px;
    line-height: 35px;
    border-radius: 5px;
    text-align: center;
    color: #a3a3a3;
    width: 115px;
    font-size: 14px;
  }
  .links button:first-child{
    margin-right: 40px;
    background-image: none;
    border: 1px solid #b535fa;
    color: #b535fa;
  }
  .promotion{
    margin: 8px 16px 0 16px;
  }
  .pay-state{
    position: relative;
  }
  .pay-state span{
    position: absolute;
    color: #fff;
    font-size: 24px;
    top: 50px;
    left: 40px;
  }
</style>
