<template>
  <div class="info">
    <img src="http://p90m90efq.bkt.clouddn.com/recommendgoods.png" alt="">
    <div class="goods">
      <div class="intro">
        <p>特润修护透肌精华露</p>
        <p>创新两段式亲水凝胶基质，马油等净化添加，滋润补水。sdfsadfsadf</p>
        <div>
          <el-tag size="mini">会员价</el-tag>
          <el-tag size="mini">今日</el-tag>
        </div>
      </div>
      <div class="price">
        <div>
        <p>已售388件</p>
        <p><span>￥590.00</span><span><s>￥600.00</s></span></p>
        </div>
        <div class="score"><span>积分:10000</span>/套</div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "RecommendGoods"
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
  .goods .intro p:first-child{
    font-size: 14px;
    color: #000;
  }
  .goods .intro p:last-of-type{
    font-size: 12px;
    color: #a7a7a7;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 6rem;
    padding: 4px 0;
  }
  .goods .price{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
  }
  .goods .price p:first-child{
    color: #999;
    font-size: 12px;
  }
  .goods .price p:last-of-type{
    color: #FF659F;
    font-size: 16px;
  }
  .goods .price p span:last-of-type{
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
