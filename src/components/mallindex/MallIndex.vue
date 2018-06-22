<template>
  <div class="page-tabbar">
    <div class="page-wrap">
      <mt-tab-container class="page-tabbar-container" v-model="selected">
        <mt-tab-container-item id="首页">
          <Home/>
        </mt-tab-container-item>
        <mt-tab-container-item id="分类">
          <Sort />
        </mt-tab-container-item>
        <mt-tab-container-item id="推广" class="promotion-container">
          <Promotion />
        </mt-tab-container-item>
        <mt-tab-container-item id="购物车">
          <ShopCart />
        </mt-tab-container-item>
        <mt-tab-container-item id="我的">
          <UserCenter />
        </mt-tab-container-item>
      </mt-tab-container>
    </div>

    <mt-tabbar v-model="selected" fixed  class="bottom-nav">
      <mt-tab-item id="首页">
        <i class="icon-home2"></i>
        首页
      </mt-tab-item>
      <mt-tab-item id="分类">
        <i class="icon-menu"></i>
        分类
      </mt-tab-item>
      <mt-tab-item id="推广">
        <i class="icon-heart"></i>
        推广
      </mt-tab-item>
      <mt-tab-item id="购物车">
        <i class="icon-cart"></i>
        购物车
      </mt-tab-item>
      <mt-tab-item id="我的">
        <i class="icon-user"></i>
        我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
  import Home from "@/components/mallindex/Home"
  import Sort from "@/components/mallindex/Sort"
  import UserCenter from "@/components/mallindex/UserCenter"
  import Promotion from "@/components/mallindex/Promotion"
  import ShopCart from "@/components/mallindex/ShopCart"

  export default {
    name: 'MallIndex',
    data() {
      return {
        selected: '首页'
      };
    },
    components: {
      Home,
      Sort,
      UserCenter,
      Promotion,
      ShopCart
    }
  };
</script>

<style>
  .page-tabbar {
    overflow: hidden;
    height: 100vh;
  }
  .page-wrap {
    overflow: auto;
    height: 100%;
    padding-bottom: 200px;
  }
  .bottom-nav i{
    display: block;
    font-size: 0.5rem;
    margin-bottom: 4px;
  }
  .mint-tabbar > .mint-tab-item.is-selected {
    background-color: #eaeaea;
    color: #1ABC9C;
    opacity: 1;
  }
  .mint-tabbar > .mint-tab-item{
    opacity: 0.6;
  }
  .mint-tab-container{
    height: 100%;
    overflow: scroll;
  }

</style>
