<template>
  <div class="goods-item">
    <img :src="goods.goodsImg" alt=""/>
    <div class="intro">
      <p>{{goods.goodsName}}</p>
      <div class="price">
        <p>¥{{goods.sellPrice}}</p>
        <p>×{{goods.number}}</p>
      </div>
    </div>
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
  .goods-item{
    box-sizing: border-box;
    height: 116px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: start;
    background-color: #fff;
    margin-top: 8px;
    padding: 8px;
  }

  .goods-item img{
    height: 100px;
    width: 100px;
  }
  .goods-item .intro{
    margin-left: 16px;
    height: 100%;
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
  }
  .intro p{
    font-size: 16px;
  }
  .price{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .price p:first-child{
    font-size: 16px;
    color: #FF659B;
  }
  .price p:last-child{
    font-size: 14px;
    color: #999;
  }

  .price p span{
    color: #FF659B;
  }
</style>
