<template>
  <div class="find-page">
    <keep-alive>
      <mt-swipe :auto="4000" class="promotion-banner">
        <mt-swipe-item><img src="../../assets/img/promotion-banner1.jpg" alt=""></mt-swipe-item>
        <mt-swipe-item><img src="../../assets/img/promotion-banner2.jpg" alt=""></mt-swipe-item>
        <mt-swipe-item><img src="../../assets/img/promotion-banner3.png" alt=""></mt-swipe-item>
      </mt-swipe>
    </keep-alive>
    <div class="tags">
      <!--<div class="official-search">-->
        <!--<div class="search">授权查询</div>-->
        <!--<div class="search">防伪查询</div>-->
      <!--</div>-->
      <div class="introduction">
        <!--<div v-for="(item, index) in arr" :key="index" @click="gotoDetail(index)">-->
          <!--<img :src="item.url" alt="">-->
          <!--<span>{{item.name}}</span>-->
        <!--</div>-->
        <div class="introduction-row">
          <div class="introduction-item">
            <img :src="arr[0].url" alt="" />
            <span>{{arr[0].name}}</span>
          </div>
          <div class="introduction-item">
            <img :src="arr[1].url" alt="" />
            <span>{{arr[1].name}}</span>
          </div>
          <div class="introduction-item">
            <img :src="arr[2].url" alt="" />
            <span>{{arr[2].name}}</span>
          </div>
        </div>
        <div class="introduction-row">
          <div class="introduction-item">
            <img :src="arr[3].url" alt="" />
            <span>{{arr[3].name}}</span>
          </div>
          <div class="introduction-item" @click="gotoDetail(4)">
            <img :src="arr[4].url" alt="" />
            <span>{{arr[4].name}}</span>
          </div>
          <div class="introduction-item">
            <img :src="arr[5].url" alt="" />
            <span>{{arr[5].name}}</span>
          </div>
        </div>
        <div class="introduction-row">
          <div class="introduction-item">
            <img :src="arr[6].url" alt="" />
            <span>{{arr[6].name}}</span>
          </div>
          <div class="introduction-item">
            <img :src="arr[7].url" alt="" />
            <span>{{arr[7].name}}</span>
          </div>
          <div class="introduction-item">
            <img :src="arr[8].url" alt="" />
            <span>{{arr[8].name}}</span>
          </div>
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
            banners:[],
            arr: [
              {
                name: "品牌介绍",
                url: '/static/img/find1.png'
              },
              {
                name: "品牌荣誉",
                url:'/static/img/find2.png'
              },
              {
                name: "科研实力",
                url:'/static/img/find3.png'
              },
              {
                name: "公司资质",
                url:'/static/img/find4.png'
              },{
                name: "精彩视频",
                url:'/static/img/find5.png'
              },
              {
                name: "代理加盟",
                url:'/static/img/find6.png'
              },{
                name: "产品介绍",
                url:'/static/img/find7.png'
              },
              {
                name: "美智学院",
                url:'/static/img/find8.png'
              },{
                name: "代理风采",
                url:'/static//img/find9.png'
              }
            ]
          }
      },
      methods:{
        gotoDetail(index){

          if(index == 4){
            this.$router.push('/company/'+ index)
          }
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
  .promotion-banner img{
    width: 100%;
    height: 200px;
  }
  .find-page{
    position: absolute;
    width: 100%;
    top: 48px;
    bottom: 50px;
    display: flex;
    flex-direction: column;
    background: #fff;
    overflow-y: scroll;
  }
  .tags{
    flex: 1;
    background-color: #fff;
  }

  .introduction{
    display: flex;
    flex-direction: column;
    position: relative;
  }
  .introduction:after{
    position: absolute;
    height: 100%;
    width: 1px;
    content: '';
    background: #eee;
    top: 0px;
    left: 0px;
  }
  .introduction-row{
    display: flex;
    justify-content: space-around;
    position: relative;
  }
  .introduction-row:after{
    position: absolute;
    height: 1px;
    width: 100%;
    content: '';
    background: #eee;
    bottom: 1px;
  }
.introduction-item{
  position: relative;
  display: flex;
  align-items: center;
  flex: 1;
  flex-direction: column;
  padding: 17px 0;
}
  .introduction-item:after{
    position: absolute;
    height: 100%;
    width: 1px;
    content: '';
    background: #eee;
    top: 0px;
    right: 0px;
  }
  .introduction-item span{
    margin-top: 4px;
  }
  .introduction-item img{
    width: 50px;
  }

  /*.introduction{*/
    /*display:grid;*/
    /*grid-template-columns:repeat(3, auto);*/
    /*grid-template-rows:repeat(3,auto);*/
    /*position: relative;*/
  /*}*/
  /*.introduction:after{*/
    /*position: absolute;*/
    /*bottom: 0;*/
    /*left: 0;*/
    /*content:'';*/
    /*height: 1px;*/
    /*width: 100%;*/
    /*background: rgba(153,153,153,0.5);*/
  /*}*/
  /*.introduction>div {*/
    /*padding: 17px 0;*/
    /*text-align: center;*/
    /*border-top: 1px solid rgba(153,153,153,0.5);*/
    /*border-left: 1px solid rgba(153,153,153,0.5);*/
  /*}*/
  /*.introduction>div {*/
    /*display: flex;*/
    /*flex-direction: column;*/
    /*align-items: center;*/
    /*padding: 17px 0;*/
    /*text-align: center;*/
    /*border-top: 1px solid rgba(153,153,153,0.5);*/
    /*border-left: 1px solid rgba(153,153,153,0.5);*/
  /*}*/
  /*.introduction>div:nth-child(3n+3) {*/
    /*border-right: 1px solid rgba(153,153,153,0.5);*/
  /*}*/
  /*.introduction>div>span {*/
    /*margin-top: 4px;*/
    /*!*display: block;*!*/
    /*!*border-radius: 50%;*!*/
    /*!*height: 60px;*!*/
    /*!*width: 60px;*!*/
    /*!*color: #bf54f9;*!*/
    /*!*border: 1px solid #bf54f9;*!*/
    /*!*margin: 0 auto;*!*/
    /*!*line-height: 60px;*!*/
    /*!*text-align: center;*!*/
  /*}*/
  /*.introduction>div>img{*/
    /*width: 50px;*/
  /*}*/

</style>
