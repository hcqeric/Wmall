<template>
  <div class="container">
    <mt-header fixed title="确认订单">
        <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
    </mt-header>
    <div class="content">
      <div class="address">
        <Address :address="address"></Address>
        <i class="el-icon-arrow-right"></i>
      </div>
      <div v-for="item in goodsList">
        <OrderGoods :goods="item"></OrderGoods>
      </div>
    </div>
    <div class="confirm">
      <p><span>应付款:</span> {{totalAmount|moneyFormat}}</p>
      <button @click="createOrder" ref="btnConfirm">去结算</button>
    </div>
    <div class="msgbox-wrapper" style="position: absolute; z-index: 2011;display: block;" v-show="dialogShow == true"  ref="msgbox">
      <div class="mint-msgbox" style="">
        <div class="mint-msgbox-header">
          <div class="mint-msgbox-title">选择支付方式</div>
        </div>
        <div class="mint-msgbox-content">
          <div class="pay-list">
            <div class="pay-item">
              <el-radio v-model="radio" :label="1">微信支付</el-radio>
              <i class="iconfont icon-weixinzhifu"></i>
            </div>
            <div class="pay-item">
              <el-radio v-model="radio" :label="2">积分支付</el-radio>
              <img src="../../assets/img/jif1.png" alt="">
            </div>
          </div>
        </div>
        <div class="mint-msgbox-btns">
          <button class="mint-msgbox-btn mint-msgbox-cancel" @click="gotoPay">去支付</button>
        </div>
      </div>
    </div>

    <div class="modal" style="z-index: 2006;"  v-show="dialogShow == true" @click="dialogShow = false" ></div>

  </div>
</template>

<script>
  import OrderGoods from '@/components/view/OrderConfirmGoods'
  import Address from '@/components/view/Address'
  import {getDefaultAddress, orderSave, wxPay, pointPay} from "../../http/getData";
  import {getLocalStorage} from "../../custom/mixin";
  import * as Constants from '../../custom/constants'
  import {Toast} from 'mint-ui'

  export default {
    name: "Payment",
    data() {
      return {
        dialogShow: false,
        totalAmount: 0,
        goodsList:[],
        address:{},
        token:'',
        ids:[],
        radio: 1,
        orderId:'',
        payPassword:''
      }
    },
    mounted() {
      this.totalAmount = 5900
      this.dialogShow = false
    },
    components: {
      OrderGoods,
      Address
    },
    methods:{
      createOrder(){
        this.dialogShow = true
        return
        orderSave({
          token:this.token
        },{
          id:this.address.id,
          ids:this.ids,
          buyType: 0
        }).then(response=>{
          console.log(response)
          this.$refs.btnConfirm.disabled = true
          Toast({
            message:"订单提交成功",
            position: 'bottom'
          })
          this.dialogShow = true
        })
      },
      gotoPay(){
        if(this.radio == 1){
          wxPay({
            orderId: this.orderId
          }).then(response=>{
            console.log(response)
          })
        }else if(this.radio == 2){
          pointPay({
            orderId: this.orderId,
            payPassword: this.payPassword
          }).then(response=>{
            console.log(response)
          })
        }
        this.dialogShow = false
        setTimeout(() => {
          this.$router.push('paymentsucc')
        }, 2500);
      },
      goBack() {
        this.$router.back()
      }
    },
    mounted(){
      let {selectedGoodsList} = this.$store.state.shop.confirmGoods
      console.log(selectedGoodsList)
      this.goodsList = selectedGoodsList
      this.totalAmount = 0
      selectedGoodsList.map(item=>{
        this.totalAmount +=  item.goodsNum * item.goods.sellPrice
        this.ids.push(item.goods.id)
      })
      let tk = getLocalStorage(Constants.TOKEN)
      this.token = tk
      getDefaultAddress({
        token: tk
      }).then(response=>{
        console.log(response)
        this.address = response.result
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
  background-color: #bf54f9;
  height: 48px;
}
.content{
  margin-top: 48px;
  margin-bottom: 68px;
}
.confirm{
  box-sizing: border-box;
  padding-left: 16px;
  height: 58px;
  width: 100%;
  line-height: 58px;
  position: fixed;
  bottom: 0;
  background-color: #fff;
  border-top: 1px solid #efefef;
  display: flex;
  justify-content: space-between;

}
.confirm p{
  font-size: 18px;
  color: #FF659B;
}
.confirm p span{
  color: #000;
}
.confirm button{
  border: none;
  background: #bf54f9;
  outline-color: transparent;
  color: #fff;
  padding: 8px 40px;
  font-size: 18px;
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
.msgbox {
  position: fixed;
  top: 50%;
  left: 50%;
  -webkit-transform: translate3d(-50%, -50%, 0);
  transform: translate3d(-50%, -50%, 0);
  background-color: #fff;
  width: 85%;
  border-radius: 3px;
  font-size: 16px;
  -webkit-user-select: none;
  overflow: hidden;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transition: .2s;
  transition: .2s;
}

.el-dialog{
  width: 85%;
}

  .address{
    /*background: #fff;*/
    background-image: url("../../assets/img/dizxhi.png");
    background-repeat: no-repeat;
    background-position: bottom;
    background-size: 100% 4px;
    padding: 8px 16px;
    display: flex;
    align-items: center;
  }
.address i{
  font-size: 20px;
  color: #999;
}
  .pay-list{
    position: relative;
    display: flex;
    flex-direction: column;
  }
  .pay-list:after{
    content: '';
    height: 1px;
    width: 100%;
    position: absolute;
    background-color: #eee;
    top:0
  }
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
.pay-item:after{
  content: '';
  height: 1px;
  width: 100%;
  position: absolute;
  background-color: #eee;
  bottom:0
}
</style>

