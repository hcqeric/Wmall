<template>
  <div class="find-page">
    <mt-swipe :auto="4000">
      <mt-swipe-item class="slide1">1</mt-swipe-item>
      <mt-swipe-item class="slide2">2</mt-swipe-item>
      <mt-swipe-item class="slide3">3</mt-swipe-item>
    </mt-swipe>
    <div class="tags">
      <!--<div class="official-search">-->
        <!--<div class="search">授权查询</div>-->
        <!--<div class="search">防伪查询</div>-->
      <!--</div>-->
      <div class="introduction">
        <div v-for="item in arr">
          <span>{{item.name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Find",
      data(){
          return {
            arr: [
              {
                name: "品牌介绍",
                url: "www.baidu.com"
              },
              {
                name: "品牌荣誉",
                url: "www.baidu.com"
              },
              {
                name: "科研实力",
                url: "www.baidu.com"
              },
              {
                name: "公司资质",
                url: "www.baidu.com"
              },{
                name: "精彩视频",
                url: "www.baidu.com"
              },
              {
                name: "代理加盟",
                url: "www.baidu.com"
              },{
                name: "产品介绍A",
                url: "www.baidu.com"
              },
              {
                name: "产品介绍B",
                url: "www.baidu.com"
              },{
                name: "代理风采",
                url: "www.baidu.com"
              },
            ]
          }
      }
    }
</script>

<style scoped>
  .mint-swipe {
    height: 200px;
    color: #fff;
    font-size: 30px;
    text-align: center;
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
  .find-page{
    position: absolute;
    width: 100%;
    top: 48px;
    bottom: 0;
    display: flex;
    flex-direction: column;
    background: #fff;
  }
  .tags{
    flex: 1;
    background-color: #fff;
  }

  .introduction{
    display:grid;
    grid-template-columns:repeat(3, auto);
    grid-template-rows:repeat(3,auto);
    position: relative;
  }
  .introduction:after{
    position: absolute;
    bottom: 0;
    left: 0;
    content:'';
    height: 1px;
    width: 100%;
    background: rgba(153,153,153,0.5);
  }
  .introduction>div {
    padding: 17px 0;
    text-align: center;
    border-top: 1px solid rgba(153,153,153,0.5);
    border-left: 1px solid rgba(153,153,153,0.5);
  }
  .introduction>div {
    padding: 17px 0;
    text-align: center;
    border-top: 1px solid rgba(153,153,153,0.5);
    border-left: 1px solid rgba(153,153,153,0.5);
  }
  .introduction>div:nth-child(3n+3) {
    border-right: 1px solid rgba(153,153,153,0.5);
  }
  .introduction>div>span {
    display: block;
    border-radius: 50%;
    height: 60px;
    width: 60px;
    color: #bf54f9;
    border: 1px solid #bf54f9;
    margin: 0 auto;
    line-height: 60px;
    text-align: center;
  }


</style>
