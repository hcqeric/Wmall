<template>
  <div class="goods-info">
    <img :src="comment.goodsImg" alt="">
    <div class="goods">
      <p>{{comment.goodsName}}</p>
      <p v-show="hasEvaluationTime">发表于 {{comment.createTime | DateFormat('yyyy-MM-dd')}}</p>
    </div>
  </div>
</template>

<script>
    export default {
        name: "EvaluationGoods",
        props:{
          hasEvaluationTime: Boolean,
          comment:null
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
