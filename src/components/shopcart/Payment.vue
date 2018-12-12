<template>
  <div class="container">
    <mt-header fixed title="确认订单" class="confirm-title">
        <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
    </mt-header>
    <div class="content">
      <div class="no-address" v-if="addressList.length <= 0">
        <button @click="addNewAddress"><span>+</span>添加新的收货地址</button>
      </div>
      <div class="address" @click="selectedAdressVisible = true" v-else-if="addressList.length > 0">
        <Address :address="address" class="default-address"></Address>
        <i class="el-icon-arrow-right"></i>
      </div>
      <div v-for="item in goodsList">
        <OrderGoods :goods="item"></OrderGoods>
      </div>
    </div>
    <div class="confirm">
      <p v-if="buyType == 0"><span>应付款:</span> {{totalAmount|moneyFormat}}</p>
      <p v-if="buyType == 2"><span>应付积分:</span> {{totalScore}}</p>
      <button @click="createOrder">确认订单</button>
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
              <img class="alipay-icon" src="../../assets/img/alipay.png"></img>
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

    <mt-popup v-model="selectedAdressVisible" :closeOnClickModal="true" :modal="true" position="right" class="modal-popup">
      <div class="select-container">
        <mt-header fixed title="选择收货地址" class="select-title">
          <mt-button icon="back" slot="left" @click="selectedAdressVisible=false">返回</mt-button>
        </mt-header>
        <div class="select-content">
          <div class="info" v-for="item in addressList" @click="selectedAddress(item)">
            <AddressWithEditor class="select-address" :address="item"></AddressWithEditor>
          </div>
        </div>
        <div class="select-goto">
          <button @click="addNewAddress">新增地址</button>
        </div>
      </div>
    </mt-popup>
    <PayKeyBoard :isPay="isPay" @pas-end='pasEnd' @close='isPay=false'></PayKeyBoard>
  </div>
</template>

<script>
  import OrderGoods from '@/components/view/OrderConfirmGoods'
  import Address from '@/components/view/Address'
  import AddressWithEditor from '@/components/view/AddressWithEditor'
  import PayKeyBoard from '@/components/view/PayKeyBoard'
  import {getDefaultAddress, orderSave, wxPay, pointPay, wxJsPay,getPaySuccInfo,getAddressAndGoods, aliPay} from "../../http/getData";
  import {mapActions} from 'vuex'
  import {getLocalStorage, randomStr, setLocalStorage,removeLocalStorage} from "../../custom/mixin";
  import * as Constants from '../../custom/constants'
  import {Toast,MessageBox} from 'mint-ui'

  export default {
    name: "Payment",
    data() {
      return {
        dialogShow: false,
        totalAmount: 0,
        totalScore: 0,
        goodsList:[],
        address:{},
        token:'',
        ids:[],
        radio: 0,
        orderId:'',
        orderNum:'',
        payPassword:'',
        payType: 0,
        buyType: 0,
        isPay:false,
        selectedAdressVisible:false,
        addressList:[],
        orderState:0,
        hasCreatedOrder:false
      }
    },
    components: {
      OrderGoods,
      Address,
      PayKeyBoard,
      AddressWithEditor
    },
    methods: {
      ...mapActions({
        setPaySuccOrderId: 'setPaySuccOrderId',
        setHasCreatedOrder: 'setHasCreatedOrder'
      }),
      addNewAddress() {
        this.$router.push('/editAddress/1')
      },
      selectedAddress(item) {
        this.selectedAdressVisible = false
        this.address = item
      },
      pasEnd(val) {
        pointPay({
          orderId: this.orderId.toString(),
          payPassword: val
        }).then(response => {
          this.setPaySuccOrderId(response.orderId)
          this.$router.replace('/paymentsucc/' + this.orderId)
        })
        this.isPay = false
      },
      createOrder() {
        if (this.buyType == 3) {
          Toast({
            message: "订单创建失败,请确认列表中是否只有金额商品或积分商品",
            position: 'middle',
            duration: 500
          })
          return
        }
        if(this.hasCreatedOrder){
          MessageBox({
            title:'订单提示',
            message: '亲，该订单已经下单成功，是否前往订单中心查看',
            showCancelButton: true,
            confirmButtonText: '立即前往',
            cancelButtonText: '稍后前往'
          }).then(action => {
            if (action === 'confirm') {
              this.$router.push('/ordercenter/all')
            }
          })
          return
        }
        removeLocalStorage("ORDER_ID")
        orderSave({
          token: this.token
        }, {
          id: this.address.id,
          ids: this.ids,
          buyType: this.buyType,
        }).then(response => {
          this.radio = response.result.order.buyType
          this.orderId = response.result.order.id
          setLocalStorage("ORDER_ID", response.result.order.id)
          this.orderNum = response.result.order.orderNum
          this.hasCreatedOrder = true
          this.setHasCreatedOrder(true)
          this.dialogShow = true
        })
      },
      gotoPay() {

        if (this.radio == 0) {
          if (this.isWeiXin()) {
            wxJsPay({
              token: this.token
            },{
              orderId: this.orderId
            }).then(response => {
              this.payWeixin(response.result)
            })
          } else {
            console.log("H5微信支付")
            wxPay({
              orderId: this.orderId
            }).then(response => {
              window.location.href = response.result.mweb_url
            })
          }
        }else if(this.radio == 1){
          aliPay({
            orderId: this.orderId
          }).then(response => {
            window.location.href = response.result
          })
        } else if (this.radio == 2) {
          this.dialogShow = false
          this.isPay = true
        }
        this.dialogShow = false
      },
      goBack() {
        this.$router.back()
        if (dialogShow){
          this.dialogShow = false
        }
      },
      onBridgeReady(response) {
        WeixinJSBridge.invoke(
          'getBrandWCPayRequest', response.jsInfo,
          res=>{
            if (res.err_msg == "get_brand_wcpay_request:ok") {// 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
              this.$router.replace('/paymentsucc/'+ this.orderId )
            } else{
              this.$router.replace('/payfail/'+ this.orderId )
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
      this.dialogShow = false
      let tk = getLocalStorage(Constants.TOKEN)
      this.token = tk
      if(localStorage.ORDER_ID != undefined){
          MessageBox({
            title: '支付结果确认',
            message: '请确认支付是否已完成',
            showCancelButton: true,
            confirmButtonText: '已完成支付',
            cancelButtonText: '支付遇到问题',
            closeOnClickModal: false
          }).then(action => {
            let id = getLocalStorage("ORDER_ID")
            getPaySuccInfo({
              token: this.token
            }, {
              id: id
            }).then(response => {
              this.orderState = response.result.tradeStatus
              if (this.orderState == 1) {
                this.$router.replace('/paymentsucc/' + id)
              } else {
                this.$router.replace('/payfail/' + id)
              }
            })
          })
      }

      if (this.$store.state.shop.hasCreatedOrder != undefined && this.$store.state.shop.hasCreatedOrder){
        console.log(this.$store.state.shop.hasCreatedOrder)
        this.hasCreatedOrder = true
      }

      getDefaultAddress({
        token: tk
      }).then(response=>{
        this.address = response.result
      })
      let {id} = this.$route.params
      let ids = decodeURIComponent(id).replace('-', ',')
      getAddressAndGoods({
        token: tk
      },{
        ids:ids
      }).then(response=>{
        this.addressList = response.adsList
        this.goodsList = response.goodsList
        let  scoreGoodsArr = this.goodsList.filter(item=>{
          return item.goods.type == 2
        })

        if (scoreGoodsArr.length == 0){
          this.buyType = 0
        }else if(scoreGoodsArr.length ==  this.goodsList.length){
          this.buyType = 2
        }else{
          this.buyType = 3
        }
        this.totalAmount = 0
        this.totalScore = 0
        this.goodsList.map(item=>{
          this.totalAmount +=  item.goodsNum * item.goods.sellPrice
          this.totalScore +=  item.goodsNum * item.goods.bonusPrice
          this.ids.push(item.goods.id)
        })
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
.confirm-title.mint-header{
  background-color: #000;
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
    justify-content: space-between;
  }
  .default-address{
    flex:1;
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
/*.pay-item:after{*/
  /*content: '';*/
  /*height: 1px;*/
  /*width: 100%;*/
  /*position: absolute;*/
  /*background-color: #eee;*/
  /*bottom:0*/
/*}*/
  .pay.mint-msgbox-cancel{
    color: #000;
    font-size:16px;
  }

  .no-address{
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px 0;
    background: #fff;
  }
  .no-address button{
    background: transparent;
    outline: none;
    border: 1px dashed #eee;
    padding: 4px 8px;
    display: flex;
    align-items: center;
    border-radius: 5px;
  }
  .no-address button span{
    display: flex;
    align-items: center;
    font-size: 24px;
    color: #000;
    font-weight: 700;
    display: inline-block;
    height: 30px;
    line-height: 30px;

  }


  .modal-popup{
    width: 100%;
    height: 100vh;
    background-color: #efefef;
  }
  .select-container{
    height: 100vh;
    position: relative;
  }
  .select-content{
    position: absolute;
    top: 48px;
    width: 100%;
    overflow-y: scroll;
    bottom: 68px;
  }
  .select-title.mint-header{
    background: #000;
  }
  .select-address{
    background-color: #fff;
    padding: 8px 16px;
    margin-top: 8px;
  }
.select-goto{
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 16px 0;
  width: 100%;
  background-color: #fff;
  text-align: center;
}
.select-goto button{
  border: none;
  outline: none;
  height: 35px;
  line-height: 35px;
  border-radius: 17px;
  background-color: transparent;
  background-image: url("../../assets/img/button-bg.png");
  background-repeat: no-repeat;
  background-size: contain;
  width: 290px;
  text-align: center;
  color: #fff;
  margin: 0 auto;
}
</style>
<style>
  .pay-item .el-radio__inner{
    border-color: #606266;
  }
  .pay-item .el-radio__inner:hover {
    border-color: #606266;
  }
  .pay-item .el-radio__input.is-checked .el-radio__inner, .el-radio__input.is-indeterminate .el-radio__inner {
    background-color: #bf54f9;
    border-color: #bf54f9;
  }
  .pay-item .el-radio__input.is-checked+.el-radio__label {
    color: #bf54f9;
  }


</style>

