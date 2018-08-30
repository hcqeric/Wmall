<template>
  <div class="promotion">
    <div class="goods-nav">
      <div  class="prom-nav" :class="isShare ? 'is-selected' : ''" @click="$router.replace('/promotion/share')">我要推广</div>
      <div  class="prom-nav" :class="isFind ? 'is-selected' : ''" @click="$router.replace('/promotion/find')">发现</div>
      <div  class="prom-nav" :class="isNews ? 'is-selected' : ''" @click="$router.replace('/promotion/news')">资料库</div>
    </div>
    <router-view/>
  </div>
</template>

<script>

  export default {
      name: "Promotion",
      computed:{
        isShare(){
          return this.$route.path.indexOf('/promotion/share') >= 0
        },
        isFind(){
          return this.$route.path.indexOf('/promotion/find') >= 0
        },
        isNews(){
          return this.$route.path.indexOf('/promotion/news') >= 0
        }
      }
    }
</script>

<style scoped>
  .goods-nav{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .prom-nav{
    color: #fff;
    flex: 1;
    background-color: #bf54f9;
    text-align: center;
    padding: 16px;
    text-shadow: 0px 0px 1px #FF659F;
  }
  .prom-nav.is-selected{
    color: #fff;
    font-weight: bold;
    border: none;
    position: relative;
    text-shadow: none;
  }

  .prom-nav.is-selected:after{
    position: absolute;
    content: '';
    bottom: 8px;
    left: 50%;
    margin-left: -20px;
    height: 3px;
    width: 40px;
    background-color: #fff;
  }
</style>
