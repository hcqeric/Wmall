<template>
  <div class="container">
    <mt-header fixed title="转增成功">
      <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
    </mt-header>
    <div class="content">
      <img src="../../assets/img/exsucc.png" alt="">
      <button @click="turnToScorePage">完成</button>
    </div>
  </div>
</template>

<script>
    export default {
        name: "ExchangeSuccess",
      methods:{
        goBack() {
          this.$router.back()
        },
        turnToScorePage(){
          this.$router.push('scores')
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
