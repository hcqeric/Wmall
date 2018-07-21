<template>
  <div class="info" v-if="goodsInfo" @click="gotoGoodsDetail(goodsInfo.goodsNum)">
    <img :src="goodsInfo.goodsImg" alt="">
    <div class="rec-goods">
      <div class="intro">
        <p>{{goodsInfo.name}}</p>
        <p>{{goodsInfo.introduce}}</p>
        <div>
          <el-tag size="mini">会员价</el-tag>
          <el-tag size="mini">今日</el-tag>
        </div>
      </div>
      <div class="rec-price">
        <div>
        <p>已售{{goodsInfo.sellCount}}件</p>
        <p><span v-if="goodsInfo.sellPrice">{{goodsInfo.sellPrice| moneyFormat}}/{{goodsInfo.unit}}</span><span v-if="goodsInfo.bdanPrice"><s>{{goodsInfo.bdanPrice|moneyFormat}}/{{goodsInfo.unit}}</s></span></p>
        </div>
        <div class="score" v-if="goodsInfo.type == 2"><span>积分:{{goodsInfo.bonusPrice}}</span>/套</div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "RecommendGoods",
        props:{
          goodsInfo: null
        },
        methods:{
          gotoGoodsDetail(goodsNum){
            this.$router.push('/goods/' + goodsNum)
          }
        }
    }
</script>

<style scoped>
  .info{
    box-sizing: border-box;
    overflow: hidden;
    display: flex;

    width: 100%;
    padding: 16px 0;
  }
  .info img{
    width: 110px;
    height: 110px;
    margin-right: 8px;
  }

  .info .goods{
    display: flex;
    flex: 1;
    width: 100%;
    flex-direction: column;
    justify-content: space-between;
  }
  .rec-goods .intro p:first-child{
    font-size: 14px;
    color: #000;
  }
  .rec-goods .intro p:last-of-type{
    font-size: 12px;
    color: #a7a7a7;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 6rem;
    padding: 4px 0;
  }
  .rec-goods .rec-price{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
  }
  .rec-goods .rec-price p:first-child{
    color: #999;
    font-size: 12px;
  }
  .rec-goods .rec-price p:last-of-type{
    color: #FF659F;
    font-size: 16px;
  }
  .rec-goods .rec-price p span:last-of-type{
    color: #999;
    font-size: 12px;
    margin-left: 8px;
  }
  .score span{
    color: #FF659F;
  }
  .el-tag{
    background-color: transparent;
    border: 1px solid #FF659F;
    color: #FF659F;
  }
</style>
