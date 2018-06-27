<template>
    <div class="score-item">
      <div class="left">
        <div>
        <p>提交兑换申请<span> (审核中)</span></p>
        <p>2018-04-10  12:00:00</p>
        </div>
      </div>
      <div class="right">
        <p>￥100.00</p>
      </div>
      <i class="el-icon-arrow-right"></i>
    </div>
</template>

<script>
    export default {
        name: "ScoreItem"
    }
</script>

<style scoped>
  .score-item{
    width: 100%;
    display: flex;
    padding: 8px;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
  }
  .score-item .left{
    flex: 1;
    display: flex;
    justify-content: center;
  }
  .score-item .left p{
    padding: 4px 0;
  }
  .left p span{
    color: #FF659F;
  }
  .left p:first-child{
    font-size: 14px;
    color: #000;
  }
  .left p:last-child{
    font-size: 12px;
    color: #999;
  }
  .score-item .right{
    flex: 1;
    text-align: center;
    font-size: 14px;
  }
  .right p{
    padding-left: 28px;
    color: #000;
  }
  .score-item i{
    font-size: 14px;
    color: #999;
  }
</style>
