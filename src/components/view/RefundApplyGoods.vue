<template>
    <div class="refund-item">
      <div class="order-number">
        <p>订单号：{{orderItem.orderNum}}</p>
      </div>
      <div class="order-info" v-if="orderItem.orderDetailList != undefined">
        <div class="order-imgs">
          <img v-for="item in orderItem.orderDetailList" :src="item.goodsImg" alt="">
        </div>
        <div v-if="orderItem.orderDetailList.length == 1">
          <p>{{orderItem.orderDetailList[0].goodsName}}</p>
          <p>单价：{{orderItem.orderDetailList[0].sellPrice}}/{{orderItem.orderDetailList[0].unit}}</p>
        </div>
      </div>
      <div class="order-price">
        <div class="count" v-if="orderItem.orderDetailList != undefined">
          <p>数量：x {{orderItem.orderDetailList.length}}</p>
          <p><span>应退金额：</span>{{orderItem.totalAmt|moneyFormat}}</p>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "RefundApplyGoods",
      props:{
          orderItem:Object
      }
    }
</script>

<style scoped>

  .refund-item{
    background: #efefef;
  }
  .order-number{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 8px 16px;
  }
  .order-number p{
    font-size: 14px;
    color: #000;
  }

  .order-info{
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    background-color: #efefef;
    padding: 0 16px;
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

  .order-price{
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding:8px 16px;
    align-items: center;
    position: relative;
  }
  .order-price .count{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .order-price .count p:first-child{
    font-size: 13px;
    color: #000;
  }
  .order-price .count p:last-child{
    font-size: 18px;
    color: #bf54f9;
    margin-left: 8px;
  }
  .order-price .count p:last-child span{
    font-size: 16px;
  }
</style>
