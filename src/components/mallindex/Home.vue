<template>
  <div>
    <Header/>
    <mt-swipe :auto="4000">
      <mt-swipe-item class="slide1">1</mt-swipe-item>
      <mt-swipe-item class="slide2">2</mt-swipe-item>
      <mt-swipe-item class="slide3">3</mt-swipe-item>
    </mt-swipe>

    <div class="goods-tabs">
      <mt-navbar v-model="selected">
        <mt-tab-item id="1">推荐商品</mt-tab-item>
        <mt-tab-item id="2">积分商品</mt-tab-item>
        <mt-tab-item id="3">全部商品</mt-tab-item>
      </mt-navbar>

      <!-- tab-container -->
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
          <mt-cell v-for="n in 10" :title="'内容 ' + n"/>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <mt-cell v-for="n in 4" :title="'测试 ' + n"/>
        </mt-tab-container-item>
        <mt-tab-container-item id="3">
          <mt-cell v-for="n in 6" :title="'选项 ' + n"/>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>

<script>
  import Header from "@/components/mallindex/common/Header";
  export default {
    name: "Home",
    components:{
      Header
    },
    data() {
      return {
        selected: '1'
      };
    }
  }

</script>

<style scoped>
  .mint-swipe {
    height: 200px;
    color: #fff;
    font-size: 30px;
    text-align: center;
    margin-bottom: 8px;
  }
  .mint-swipe-item {
    line-height: 200px;
  }
  .slide1 {
    background-color: #0089dc;
    color: #fff;
  }
  .slide2 {
    background-color: #ffd705;
    color: #000;
  }
  .slide3 {
    background-color: #ff2d4b;
    color: #fff;
  }
  .goods-tabs{
    padding: 0px 24px;
  }
  .mint-cell-wrapper{
    background-image: none;
  }

  .mint-cell:last-child{
    background-image: none;
  }

  .mint-tab-item{
    border-bottom:1px solid #1ABC9C;
    border-top:1px solid #1ABC9C;
    border-left:1px solid #1ABC9C;
    color: #1ABC9C;
  }
  .mint-navbar .mint-tab-item.is-selected{
    border-bottom: 1px solid #1ABC9C;
    margin-bottom: 0;
    background-color: #1ABC9C;
    color: #fff;
  }

  .mint-navbar .mint-tab-item:last-child {
    border-right: 1px solid #1ABC9C;
  }

</style>
