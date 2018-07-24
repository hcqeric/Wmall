<template>
  <div class="refunds-item">
    <p>订单号：{{refundInfo.order.orderNum}}</p>
    <div class="item-info" v-for="item in refundInfo.order.orderDetailList">
      <img :src="item.goodsImg" alt="">
      <div class="goods">
        <p>{{item.goodsName}}</p>
        <p v-if="item.buyType == 0">单价：{{item.sellPrice| moneyFormat}}/{{item.unit}}</p>
        <p>数量：x {{item.number}}</p>
      </div>
    </div>
    <p >{{renderType}}
      <span v-if="refundInfo.refundStatus == 0" class="refund-fail">待申请</span>
      <span v-if="refundInfo.refundStatus == 1" class="refund-fail">申请中</span>
      <span v-if="refundInfo.refundStatus == 2" class="refund-succ">申请成功</span>
      <span v-if="refundInfo.refundStatus == 3" class="refund-fail">申请失败</span>
    </p>
  </div>
</template>

<script>
    export default {
      name: "RefundsItem",
      computed:{
        renderType(){
          if (this.refundInfo.order.tradeStatus == 5){
            return "仅退款"
          }else if(this.refundInfo.order.tradeStatus == 6){
            return "退货退款"
          }
        }

      },
      props: {
          refundInfo:Object
      }
    }
</script>

<style scoped>
.refunds-item{
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 0 16px;
}
.refunds-item>p{
  box-sizing: border-box;
  padding: 16px 0;
  font-size: 14px;
  color: #000;
  position: relative;
  width: 100%;
}
.refunds-item>p:after{
  position: absolute;
  bottom: -1px;
  left: 0;
  content: '';
  height: 1px;
  width: 100%;
  background-color: rgba(239,239,239,0.9);
}
.refunds-item>p:last-child{
  text-align: end;
}
.refunds-item>p:last-child span{
  color: #FF659F;
}
  .item-info{
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 16px 0;
    position: relative;
  }
.item-info:after{
  position: absolute;
  bottom: -1px;
  left: 0;
  content: '';
  height: 1px;
  width: 100%;
  background-color: rgba(239,239,239,0.9);
}
.item-info img{
  width: 100px;
  height: 100px;
  margin-right: 8px;
}
  .goods p{
    color: #999;
    padding: 4px 0;
    font-size: 12px;
  }
.goods p:first-child{
  color: #000;
  font-size: 14px;
}
  .refund-fail{
    color: #f00;
  }
  .refund-succ{
    color: #00cc99;
  }
</style>
