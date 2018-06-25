<template>
  <div class="container">
    <mt-header fixed title="积分转赠">
      <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
    </mt-header>
    <div class="content">
      <div class="trans">
        <img src="http://p90m90efq.bkt.clouddn.com/header-bg.jpg" alt="">
        <div class="score-detail">
          <div class="title"></div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "ScoreDetail",
      methods: {
        goBack() {
          this.$router.back()
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
  .trans{
    position: relative;
  }
  .trans img{
    width: 100%;
  }
</style>
