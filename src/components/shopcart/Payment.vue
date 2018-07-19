<template>
  <div class="container">
    <mt-header fixed title="确认订单">
        <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
    </mt-header>
    <div class="content">
      <div v-for="n in 10">
        <OrderGoods :goods="goods"></OrderGoods>
      </div>
    </div>
    <div class="confirm">
      <p>应付款: ¥{{totalAmount}}</p>
      <button @click="dialogShow = true">去结算</button>
    </div>
    <div class="msgbox-wrapper" style="position: absolute; z-index: 2011;display: block;" v-show="dialogShow == true"  ref="msgbox">
      <div class="mint-msgbox" style="">
        <div class="mint-msgbox-header">
          <div class="mint-msgbox-title">选择支付方式</div>
        </div>
        <div class="mint-msgbox-content">
          <div class="mint-msgbox-message">亲，确定要付款吗？</div>
          <div class="mint-msgbox-input" style="display: none;">
            <input placeholder="" type="text">
            <div class="mint-msgbox-errormsg" style="visibility: hidden;"></div>
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
  const goods = {
    goodsImg: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1494680278,1097395667&fm=27&gp=0.jpg",
    name: "笔记本电脑",
    sellPrice: 23,
    number: 30
  }
  export default {
    name: "Payment",
    data() {
      return {
        dialogShow: false,
        totalAmount: 0
      }
    },
    mounted() {
      this.totalAmount = 5900
      this.dialogShow = false
    },
    components: {
      OrderGoods
    },
    methods:{
      gotoPay(){
        this.dialogShow = false
        setTimeout(() => {
          this.$router.push('paymentsucc')
        }, 2500);
      },
      goBack() {
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
.content{
  margin-top: 48px;
  margin-bottom: 68px;
}
.confirm{
  height: 68px;
  width: 100%;
  line-height: 68px;
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
  margin-left: 8px;
}
.confirm button{
  border: none;
  background-color:  #1ABC9C;
  background-image: url(../../assets/img/color-pink.png);
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
.mint-header{
  background-color: #FF659B;
  height: 48px;
}
</style>

