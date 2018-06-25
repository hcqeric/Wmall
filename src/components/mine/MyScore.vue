<template>
  <div class="container">
    <mt-header fixed title="我的积分">
      <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
    </mt-header>
    <div class="content">
      <Notification title="亲，这是兑换积分须知~"></Notification>
      <div class="scores">
        <img src="http://p90m90efq.bkt.clouddn.com/score.jpg" alt="">
        <div class="score">
          <p>可兑换积分</p>
          <p>6000</p>
        </div>
        <button>兑换记录</button>
      </div>
      <div class="score-items">
        <div class="score-item">
          <img src="http://p90m90efq.bkt.clouddn.com/loudspeaker.png" alt="">
          <div class="content-total">
            <p>我的积分</p>
            <p>10000</p>
            <i class="el-icon-arrow-right"></i>
          </div>
        </div>
        <div class="score-item">
          <img src="http://p90m90efq.bkt.clouddn.com/loudspeaker.png" alt="">
          <div class="content-score">
            <p>可兑积分</p>
            <p>6000</p>
            <i class="el-icon-arrow-right"></i>
          </div>
        </div>
        <div class="score-item">
          <img src="http://p90m90efq.bkt.clouddn.com/loudspeaker.png" alt="">
          <div class="content-score">
            <p>未结积分</p>
            <p>3000</p>
            <i class="el-icon-arrow-right"></i>
          </div>
        </div>
        <div class="score-item">
          <img src="http://p90m90efq.bkt.clouddn.com/loudspeaker.png" alt="">
          <div class="content-score">
            <p>复购积分</p>
            <p>1000</p>
            <i class="el-icon-arrow-right"></i>
          </div>
        </div>
      </div>
      <div class="buttons">
        <button @click="turnToScoreTrans">积分转赠</button>
        <button @click="turnToExchangeScore">我要兑换</button>
      </div>
    </div>
  </div>
</template>

<script>
  import Notification from '@/components/view/Notification'
  export default {
    name: "MyScore",
    methods: {
      goBack() {
        this.$router.back()
      },
      turnToScoreTrans(){
        this.$router.push('/scoretrans')
      },
      turnToExchangeScore(){
        this.$router.push('/exchangescore')
      }
    },
    components:{
      Notification
    }
  }
</script>

<style scoped>
  .container{
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: #efefef;

  }
  .mint-header{
    background-color: #000;
    height: 48px;
    z-index: 9999;
  }
  .content{
    margin-top: 48px;
  }
  .scores{
    position: relative;
    /*height: 179px;*/
    /*background-repeat: no-repeat;*/
    /*background-image:url("http://p90m90efq.bkt.clouddn.com/score.jpg");*/
    /*background-size: contain;*/
  }
  .scores button{
    position: absolute;
    right: 0px;
    bottom: 20px;
    border: none;
    outline: none;
    background-color:transparent;
    background-image: url("../../assets/img/bg-white.png");
    border-radius: 11px 0 0 11px;
    padding: 0 8px;
    font-size: 12px;
    height: 22px;
    line-height: 22px;
    color: #FF659F;
  }
  .scores img{
    width: 100%;
  }
  .score{
    position: absolute;
    top: 55px;
    left: 55px;
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .score p:first-child{
    font-size: 26px;
  }
  .score p:last-child{
    margin-top: 8px;
    font-size: 22px;
  }
  .score-items{
    display: flex;
    flex-direction: column;
    padding: 8px 16px;
  }
  .score-item{
    display: flex;
    flex-direction: row;
    padding: 8px 0;
    border-bottom: 1px solid rgba(153,153,153,0.2);
    align-items: center;

  }
  .score-item:last-of-type{
    border-bottom: none;
  }
  .content-total{
    display: flex;
    flex: 1;
    justify-content: space-between;
    margin-left: 8px;
  }
  .content-total p{
    font-size: 14px;
    color: #000;
  }
  .content-total i{
    color: #efefef;
  }
  .content-score{
    display: flex;
    flex: 1;
    justify-content: space-between;
    align-items: center;
    color: #000;
    font-size: 14px;
    margin-left: 8px;
  }
  .content-score p:last-of-type{
    color: #999;
  }
  .content-score i{
    color: #999;
    font-weight: 500;
  }
  .buttons{
    margin-top: 80px;
    text-align: center;

  }

  .buttons button{
    border: none;
    outline: none;
    background-color: transparent;
    background-image: url("../../assets/img/color-pink.png");
    text-align: center;
    color: #fff;
    border-radius: 22px;
    width: 140px;
    font-size: 14px;
    height: 44px;
    line-height: 44px;
  }
  .buttons button:first-child{
    margin-right: 20px;
    background-image: none;
    border: 1px solid #FF659F;
    color: #FF659F;
  }
</style>
