<template>
    <div class="order-item" v-if="orderItem"  @click="gotoDetail(orderItem.id.toString())">
      <div class="order-number">
        <p>订单号：{{orderItem.orderNum}}</p>
        <p v-if="orderItem.tradeStatus == 0">待付款</p>
        <p v-else-if="orderItem.tradeStatus == 1">待发货</p>
        <p v-else-if="orderItem.tradeStatus == 2">待收货</p>
        <p v-else-if="orderItem.tradeStatus == 3">已完成</p>
      </div>
      <div class="order-info" v-if="orderItem.orderDetailList != undefined">
        <div class="order-imgs">
          <img v-for="item in orderItem.orderDetailList" :src="item.goodsImg" alt="">
        </div>
        <div v-if="orderItem.orderDetailList.length == 1">
          <p>{{orderItem.orderDetailList[0].goodsName}}</p>
          <p v-if="orderItem.buyType == 0">单价：{{orderItem.orderDetailList[0].sellPrice|moneyFormat}}/{{orderItem.orderDetailList[0].unit}}</p>
          <p v-if="orderItem.buyType == 2">单价：{{orderItem.orderDetailList[0].bonusPrice}}积分/{{orderItem.orderDetailList[0].unit}}</p>
        </div>
      </div>
      <div class="item-bottom">
        <div class="order-price">
          <p>下单时间：{{orderItem.createTime|DateFormat('yyyy-MM-dd hh:mm:ss')}}</p>
          <div class="count" v-if="orderItem.orderDetailList != undefined">
            <!--<p>数量：x {{orderItem.orderDetailList.length}}</p>-->
            <p>数量：x {{totalNumber}}</p>
            <p v-if="orderItem.buyType == 0">{{orderItem.payAmt|moneyFormat}}</p>
            <p v-if="orderItem.buyType == 2">{{orderItem.payBonus}}积分</p>
          </div>
        </div>
        <div class="order-state">
          <p v-if="orderItem.tradeStatus == 0"></p>
          <p v-if="orderItem.tradeStatus == 1">亲,你的商品正在配货中，请耐心等待~</p>
          <p v-if="orderItem.tradeStatus == 2">亲,你的商品正在配送中，请耐心等待~</p>
          <p v-if="orderItem.tradeStatus == 3"></p>
          <div class="buttons">
            <button v-if="orderItem.tradeStatus == 0" @click.stop="cancelOrder(orderItem.id)">取消订单</button>
            <button v-if="orderItem.tradeStatus == 0" >去支付</button>
            <button v-if="orderItem.tradeStatus == 2" @click.stop="orderReceipt(orderItem.id)">确认收货</button>
            <button v-if="orderItem.tradeStatus == 3" @click.stop="postEvaluation(orderItem)">评价</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import { mapActions} from 'vuex'
  import {getLocalStorage} from "../../custom/mixin";
  import * as Constants from '../../custom/constants'
  import {cancelOrder,orderReceipt} from "../../http/getData";
  import {MessageBox,Toast} from 'mint-ui'

  export default {
      name: "OrderItem",
      data(){
          return {
            token:'',
            totalNumber: 0
          }
      },
      props:{
        orderItem:null
      },
      methods:{
        ...mapActions({
          setOrderNum: 'setOrderNum',
          setBackRefunds: 'setBackRefunds'
        }),
        gotoDetail(orderNum){
          this.setOrderNum(orderNum)
          this.$router.push('/orderdetail/'+ orderNum)
        },
        cancelOrder(id){
          MessageBox({
            title:'取消订单',
            message: '亲，确定要执行此操作吗？',
            showCancelButton: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(action => {
            if (action === 'confirm') {
              cancelOrder({
                token:this.token
              },{
                id:id
              }).then(response=>{
                this.$emit('orderItem', this.orderItem)

              })
            } else {
              // console.log("quxiaole")
            }
          }).catch(error=>{});

        },
        orderReceipt(id){
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
                id: id
              }).then(response=>{
                this.$emit('orderItem', this.orderItem)
                Toast({
                  message:'确认收货成功',
                  position: 'middle'
                })
              })
            } else {
              // console.log("quxiaole")
            }
          }).catch(error=>{});
        },
        postEvaluation(orderItem){
          this.setBackRefunds(orderItem)
          this.$router.push('postevaluation')
        }
      },
    mounted() {
      let tk = getLocalStorage(Constants.TOKEN)
      this.token = tk

      let totalNumber = 0
      if (this.orderItem.orderDetailList != undefined) {
        this.orderItem.orderDetailList.forEach(item => {
          totalNumber += item.number
        })
      }
      this.totalNumber = totalNumber
    }
  }
</script>

<style scoped>
.order-item{
  display: flex;
  flex-direction: column;
}
  .order-number{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 16px;
    background-color: #fff;
  }
  .order-number p{
    font-size: 14px;
    color: #000;
  }
  .order-number p:last-child{
    color: #FF659F;
  }
  .order-info{
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    background-color: #efefef;
    padding: 4px 16px;
    width: 100%;
    align-items: center;
  }
  .order-imgs{
    display: flex;
    flex-direction: row;
    overflow-x: scroll;
    overflow-y: hidden;
  }

  /*去除滚动条样式*/
  .order-imgs::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }

  .order-imgs::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 0px rgba(0, 0, 0, 0.2);
    background: rgba(0, 0, 0, 0.2);
  }

  .order-imgs::-webkit-scrollbar-track {
    box-shadow: inset 0 0 0px rgba(0, 0, 0, 0.2);
    border-radius: 0;
    background: rgba(0, 0, 0, 0.1);
  }
  /*去除滚动条样式*/

  .order-imgs img{
    width: 100px;
    height: 100px;
    float: left;
    margin-right: 8px;
  }
  .order-imgs img:last-child{
    margin-right: 0;
  }
  .order-info p{
    padding: 8px;
    color: #000;
    font-size: 14px;
  }
  .order-info p:last-child{
    color: #999;
    font-size: 13px;
  }

  .item-bottom{
    padding:0 16px;
    background-color: #fff;
  }
  .order-price{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding:8px 0;
    align-items: flex-end;
    position: relative;
  }
  .order-price:after{
    position: absolute;
    content: '';
    height: 1px;
    width: 100%;
    bottom: -1px;
    background-color: rgba(239,239,239,0.9);
  }
.order-price .count{
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.order-price .count p:first-child{
  font-size: 13px;
  color: #000;
}
.order-price .count p:last-child{
  font-size: 18px;
  color: #000;
  margin-left: 8px;
}
  .order-state{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding:16px 0;
    align-items: center;
  }
.order-state p{
  font-size: 12px;
  padding-right: 8px;
  color: #000;
  flex: 1;
}
  .order-state .buttons button{
    outline: none;
    background-color: transparent;
    background-image: url("../../assets/img/bg-white.png");
    border: none;
    font-size: 14px;
    height: 26px;
    padding: 0 18px;
    border-radius: 26px;
    color: #000;
  }
.order-state .buttons button:first-child{
  border: 1px solid #999;
}
.order-state .buttons button:last-child{
  color: #FF659F;
  margin-left: 8px;
  border: 1px solid #FF659F;
}
</style>
