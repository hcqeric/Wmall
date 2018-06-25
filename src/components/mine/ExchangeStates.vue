<template>
  <div class="container">
    <mt-header fixed title="兑换状态">
      <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
    </mt-header>
    <div class="content">
      <img src="../../assets/img/success.png" alt="">
      <div class="ex-states">
      <p>兑换申请已提交</p>
      <p>正在审核中...</p>
      </div>
      <button @click="turnToExStates">查看兑换进度</button>
    </div>
  </div>
</template>

<script>
    export default {
        name: "ExchangeStates",
      methods:{
        goBack() {
          this.$router.back()
        },
        turnToExStates(){
          this.$router.push('/exchangedetail')
        }
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
    background-size: contain;
    background-color: #ffeced;
  }
  .mint-header{
    background-color: #000;
    height: 48px;
    z-index: 9999;
  }
  .content{
    margin-top: 48px;

    position: relative;
  }
  .content img{
    width: 100%;
  }
  .ex-states{
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    text-align: center;
  }
  .ex-states p{
    padding: 4px 0;
  }
  .ex-states p:first-child{
    font-size: 16px;
    color: #000;
  }
  .ex-states p:last-child{
    font-size: 14px;
    color: #FF659F;
  }
  .content button{
    position:absolute;
    bottom: 100px;
    left: 50%;
    border: 1px solid #FF659F;
    height: 44px;
    line-height: 44px;
    border-radius: 22px;
    background-color: #fff;
    /*background-image: url("../../assets/img/color-pink.png");*/
    width: 200px;
    text-align: center;
    font-size: 14px;
    color: #FF659F;
    margin-left:-100px;
    outline: none;
  }
</style>
