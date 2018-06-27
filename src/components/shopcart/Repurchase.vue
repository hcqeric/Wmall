<template>
  <div class="container">
    <mt-header fixed title="复购中心">
      <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
    </mt-header>
    <div class="content">
      <div class="banner">
        <img src="../../assets/img/pengzi.png" alt="">
      </div>
    </div>
    <div class="goods-list">
      <GoodsItem v-for="n in 5" class="item"></GoodsItem>
    </div>
  </div>
</template>

<script>
  import GoodsItem from '@/components/view/GoodsItem'
    export default {
        name: "Repurchase",
      methods: {
        goBack() {
          this.$router.back()
        }
      },
      components:{
          GoodsItem
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
    display: flex;
    flex-direction: column;
  }
  .mint-header{
    background-color: #000;
    height: 48px;
    z-index: 9999;
  }
  .content{
    margin-top: 48px;
  }
  .banner img{
    width: 100%;
  }
  .goods-list{
    background-color: #efefef;
    flex: 1;
    box-sizing: border-box;
    width: 100%;
    padding: 8px;
  }
  .item:nth-of-type(even){
    margin: 8px;
    float: right;
  }
  .item:nth-of-type(odd){
    margin: 8px;
    float: left;
  }
</style>
