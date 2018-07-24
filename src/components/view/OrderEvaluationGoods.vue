<template>
  <div class="evaorder-info" v-if="orderItem.orderDetailList != undefined">
    <div class="order-imgs">
      <img :src="orderItem.orderDetailList[goodsIndex].goodsImg" alt="">
    </div>
    <div>
      <p>{{orderItem.orderDetailList[goodsIndex].goodsName}}</p>
      <p>数量：x {{orderItem.orderDetailList[goodsIndex].number}}</p>
      <p v-if="orderItem.buyType == 0">单价：{{orderItem.orderDetailList[goodsIndex].sellPrice| moneyFormat}}/{{orderItem.orderDetailList[goodsIndex].unit}}</p>
      <p v-if="orderItem.buyType == 2">单价：{{orderItem.orderDetailList[0].bonusPrice}}积分/{{orderItem.orderDetailList[0].unit}}</p>
    </div>
    <div class="order-price">
      <button v-if="orderItem.orderDetailList[goodsIndex].evaluateStatus == 0" @click.stop="postEvaluation(orderItem)">去评价</button>
      <button v-else-if="orderItem.orderDetailList[goodsIndex].evaluateStatus == 1" :class="orderItem.orderDetailList[goodsIndex].evaluateStatus == 1 ? 'posted' : ''">已评价</button>
    </div>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
    export default {
      name: "OrderEvaluationGoods",
      props:{
        orderItem: Object,
        goodsIndex: Number
      },
      methods:{
        ...mapActions({
          setBackRefunds:'setBackRefunds'
        }),
        postEvaluation(orderItem){
            this.setBackRefunds(orderItem)
            this.$router.push('/postevaluation/'+this.goodsIndex)
        }
      }
    }
</script>

<style scoped>
  .evaorder-info{
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    background-color: #fff;
    padding: 4px 0 8px 0;
    width: 100%;
    align-items: center;
    position: relative;
  }
  .evaorder-info:after{
     box-sizing: border-box;
     position: absolute;
     bottom: 1px;
     left: 0;
     content: '';
     height: 1px;
     width: 100%;
     background: #eee;
   }
  .evaorder-info .order-imgs{
    display: flex;
    flex-direction: row;
    overflow-x: scroll;
    overflow-y: hidden;
  }

  .evaorder-info .order-imgs img{
    width: 100px;
    height: 100px;
    float: left;
    margin-right: 8px;
  }
  .evaorder-info .order-imgs img:last-child{
    margin-right: 0;
  }
  .evaorder-info p{
    padding: 4px;
    color: #999;
    font-size: 13px;
  }
  .evaorder-info p:first-child{
    color: #000;
    font-size: 14px;
  }
  .evaorder-info .order-price{
    position: absolute;
    bottom: 16px;
    right: 0;
  }
  .evaorder-info .order-price button{
    outline: none;
    background-color: transparent;
    background-image: url("../../assets/img/bg-white.png");
    font-size: 14px;
    height: 26px;
    padding: 0 18px;
    border-radius: 26px;
    color: #FF659F;
    margin-left: 8px;
    border: 1px solid #FF659F;
  }
  .evaorder-info .order-price button.posted{
    border: 1px solid #999;
    color: #999;
  }
</style>
