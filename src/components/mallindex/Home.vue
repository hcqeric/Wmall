<template>
  <div class="container">
    <Header/>
    <keep-alive>
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="item in banner"><img :src="item.url" alt=""></mt-swipe-item>
      </mt-swipe>
    </keep-alive>

    <div class="goods-tabs">
      <div class="goods-nav">
        <div :class="selected==1 ? 'is-selected' : ''" @click="changeTab('1')">推荐商品</div>
        <div :class="selected==2 ? 'is-selected' : ''" @click="changeTab('2')">积分商品</div>
        <div :class="selected==3 ? 'is-selected' : ''" @click="changeTab('3')">全部商品</div>
      </div>

      <div class="goods-list" v-if="selected == 1">
        <RecommendGoodsList></RecommendGoodsList>
      </div>
      <div class="goods-list" v-if="selected == 2">
        <BonusGoodsList></BonusGoodsList>
        </div>

      <div class="goods-list" v-if="selected == 3">
        <AllGoodsList></AllGoodsList>
      </div>

    </div>
  </div>
</template>

<script>
  import * as Constants from '../../custom/constants'
  import url from '../../http/url.js'
  import Header from "@/components/mallindex/common/Header";
  import RecommendGoodsList from "@/components/home/RecommendGoodsList";
  import AllGoodsList from "../home/AllGoodsList";
  import BonusGoodsList from "../home/BonusGoodsList";


  export default {
    name: "Home",
    components:{
      BonusGoodsList,
      AllGoodsList,
      RecommendGoodsList,
      Header
    },
    data() {
      return {
        selected: '1',
        banner: []
      };
    },
    mounted(){
      localStorage.getItem(Constants.TOKEN)
      this.axios.post(url.banners, {
        type: "sowingMapIndex"
      }).then( response=> {
        let imgs = response.data.result
        imgs.forEach((item)=>{
          this.banner.push(item)
        })
      }).catch(function (error) {
      });
    },
    methods:{
      changeTab(tab){
        this.selected = tab
      }
    }
  }

</script>

<style scoped>
  .container{
    height: 100vh;
    overflow-y: scroll;
    margin-bottom: 50px;
    background: #fff;
  }
  .mint-swipe {
    height: 300px;
    color: #fff;
    font-size: 30px;
    text-align: center;
  }
  img{
    width: 100%;
  }

  .goods-tabs{
    margin-top: 4px;
  }
  .goods-nav{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .goods-nav div{
    flex: 1;
    background-color: #FFEDF9;
    text-align: center;
    padding: 16px;
    text-shadow: 0px 0px 1px #FF659F;
  }
  .goods-nav div.is-selected{
    color: #bf54f9;
    font-weight: bold;
    border: none;
    position: relative;
    text-shadow: none;
  }

  .goods-nav div.is-selected:after{
    position: absolute;
    content: '';
    bottom: 8px;
    left: 50%;
    margin-left: -20px;
    height: 3px;
    width: 40px;
    background-color: #bf54f9;
  }

  .goods-list{
    padding: 0 16px;
  }
</style>
<style>

</style>
