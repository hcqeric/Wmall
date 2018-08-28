<template>
  <div class="order-confirm-goods">
    <div class="goods-item">
      <img :src="goods.goods.goodsImg" alt=""/>
      <div class="intro">
        <div class="confirm-goods-info">
        <p>{{goods.goods.name}}</p>
        <p class="confirm-goods-info-intro" v-if="goods.goods.introduce.length > 26">{{goods.goods.introduce.substring(0, 26)}}...</p>
        <p class="confirm-goods-info-intro" v-else>{{goods.goods.introduce}}</p>
        </div>
        <div class="goods-price">
          <p v-if="goods.goods.type == 1">{{goods.goods.sellPrice | moneyFormat}}</p>
          <p v-if="goods.goods.type == 2">{{goods.goods.bonusPrice}}积分</p>
          <p>×{{goods.goodsNum}}</p>
        </div>
      </div>
    </div>
    <p v-if="goods.goods.type == 1">合计：<span>{{goods.goods.sellPrice * goods.goodsNum | moneyFormat}}</span></p>
    <p v-if="goods.goods.type == 2">合计：<span>{{goods.goods.bonusPrice * goods.goodsNum}}积分</span></p>
  </div>
</template>

<script>
  export default {
    name: "OrderConfirmGoods",
    data(){
      return {
      }
    },
    methods:{
    },
    props:{
      goods: null
    }
  }
</script>

<style scoped>
  .order-confirm-goods{
    box-sizing: border-box;
    width: 100%;
    padding: 0 8px;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    margin-top: 8px;
  }
  .order-confirm-goods>p{
    text-align: end;
    margin: 8px 0;
    font-size: 16px;
  }
  .order-confirm-goods>p span{
    color: #FF659B;
  }
  .order-confirm-goods .goods-item{
    box-sizing: border-box;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: start;
    padding: 8px 0;
    position: relative;
  }
  .order-confirm-goods .goods-item:after{
    position: absolute;
    content: '';
    height: 1px;
    width: 100%;
    background: #eee;
    bottom: 0;
  }

  .goods-item img{
    height: 100px;
    width: 100px;
  }
  .goods-item .intro{
    margin-left: 16px;
    margin-right: 4px;
    height: 100px;
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
  }
  .confirm-goods-info p{
    font-size: 16px;
  }
  .confirm-goods-info p:last-child{
    font-size: 14px;
    color: #999;
    overflow:hidden;
    text-overflow:ellipsis;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2;
  }
  .goods-price{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .goods-price p:first-child{
    font-size: 16px;
    color: #FF659B;
  }
  .goods-price p:last-child{
    font-size: 14px;
    color: #999;
  }

  .goods-price p span{
    color: #FF659B;
  }
</style>
