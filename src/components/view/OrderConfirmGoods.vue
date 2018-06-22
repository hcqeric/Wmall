<template>
  <div class="goods-item">
    <img src="http://p90m90efq.bkt.clouddn.com/goods.png" alt=""/>
    <div class="intro">
      <p>特润修护肌透精华露</p>
      <div class="price">
        <p>¥590</p>
        <p>×{{confirmCount}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "OrderConfirmGoods",
    data(){
      return {
        confirmCount: 1,
        isFirst:true
      }
    },
    methods:{

    },

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
