<template>
    <div class="score-item" @click="gotoExchangedetail(exchangeItem)">
      <div class="left">
        <div>
        <p v-if="exchangeItem.status == 0">提交兑换申请<span> (审核通过)</span></p>
        <p v-if="exchangeItem.status == 1">提交兑换申请<span> (审核中)</span></p>
        <p v-if="exchangeItem.status == 2">提交兑换申请<span> (审核失败)</span></p>
        <p>{{exchangeItem.createTime}}</p>
        </div>
      </div>
      <div class="right">
        <p>￥{{exchangeItem.scoreAmount}}</p>
      </div>
      <i class="el-icon-arrow-right"></i>
    </div>
</template>

<script>
  import {mapActions} from 'vuex'
    export default {
        name: "ScoreItem",
      props:{
          exchangeItem:null
      },
      methods:{
        ...mapActions({
          setExchangeInfo: 'setExchangeInfo'
        }),
        gotoExchangedetail(){
          this.setExchangeInfo(this.exchangeItem)
          this.$router.push('/exchangedetail')
        }
      }
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
