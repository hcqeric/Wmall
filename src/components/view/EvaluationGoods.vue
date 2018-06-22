<template>
  <div class="goods-info">
    <img src="http://p90m90efq.bkt.clouddn.com/goods.png" alt="">
    <div class="goods">
      <p>特润修护肌透精华露</p>
      <p v-show="hasEvaluationTime">发表于 2018/04/13</p>
    </div>
  </div>
</template>

<script>
    export default {
        name: "EvaluationGoods",
      props:{
        hasEvaluationTime: Boolean
      }
    }
</script>

<style scoped>
  .goods-info {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-bottom: 8px;
    border-bottom: 1px solid rgba(239,239,239,0.9);
    background-color: #fff;
  }

  .goods-info img {
    width: 80px;
    height: 80px;
    margin-right: 8px;
  }

  .goods {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    align-content: center;
    flex: 1;
  }

  .goods p:first-child {
    color: #000;
    font-size: 16px;
  }
  .goods p:last-child {
    color: #999;
    font-size: 12px;
    padding-top: 4px;
  }
</style>
