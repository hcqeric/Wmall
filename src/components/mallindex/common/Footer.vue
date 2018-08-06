<template>
  <div class="bottom-nav">
    <div :class="$route.name==='mallindex'?'active':''" @click="$router.replace('/mallindex')">
      <i class="iconfont icon-shouye"></i>
      首页
    </div>
    <div :class="$route.name==='sort'?'active':''" @click="$router.replace('/sort')">
      <i class="iconfont icon-leimupinleifenleileibie2"></i>
      分类
    </div>
    <div :class="$route.name == 'promotion'  ? 'active':''"  @click="$router.replace('/promotion')">
      <i class="iconfont icon-fenxiang"></i>
      推广
    </div>
    <div :class="$route.name==='cart'?'active':''" @click="$router.replace('/cart')">
      <i class="iconfont icon-gouwuche"></i>
      购物车
    </div>
    <div :class="$route.name==='user'?'active':''" @click="$router.replace('/user')">
      <i class="iconfont icon-yonghu"></i>
      我的
    </div>
  </div>
</template>

<script>
    export default {
        name: "Footer",
      data() {
        return {
          selected: '首页'
        };
      }
    }
</script>

<style scoped>
  .bottom-nav{
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    background: #fff;
  }
  .bottom-nav div{
    flex: 1;
    height: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    opacity: 0.6;
  }
  .bottom-nav i{
    display: block;
    font-size: 0.5rem;
  }
  div.active {
    background-color: #eaeaea;
    color: #bf54f9;
    opacity: 1;
  }
</style>
