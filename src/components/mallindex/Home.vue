<template>
  <div>
    <Header/>
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in banner"><img :src="item.url" alt=""></mt-swipe-item>
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
  import * as Constants from '../../custom/constants'
  import url from '../../http/url.js'
  import Header from "@/components/mallindex/common/Header";
  export default {
    name: "Home",
    components:{
      Header
    },
    data() {
      return {
        selected: '1',
        banner: []
      };
    },
    mounted(){
      console.log(localStorage.getItem(Constants.TOKEN))
      this.axios.post(url.banners, {
        type: "0"
      }).then( response=> {
        console.log(response)
        let imgs = response.data.result
        imgs.forEach((item)=>{
          this.banner.push(item)
        })
      }).catch(function (error) {
        console.log(error);
      });
    }
  }

</script>

<style scoped>
  .mint-swipe {
    height: 140px;
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

  .mint-navbar{
    background-color: #FFEDF9;
  }

  .mint-navbar .mint-tab-item.is-selected{
    color: #bf54f9;
    font-weight: bold;
    border: none;
    position: relative;
  }

  .mint-navbar .mint-tab-item.is-selected:after{
    position: absolute;
    content: '';
    bottom: 8px;
    left: 50%;
    margin-left: -20px;
    height: 3px;
    width: 40px;
    background-color: #bf54f9;
  }
  .mint-cell-wrapper{
    background-image: none;
  }

  .mint-cell:last-child{
    background-image: none;
  }

  /*.mint-tab-item{*/
    /*border-bottom:1px solid #bf54f9;*/
    /*border-top:1px solid #bf54f9;*/
    /*border-left:1px solid #bf54f9;*/
    /*color: #bf54f9;*/
  /*}*/
  /*.mint-navbar .mint-tab-item.is-selected{*/
    /*border-bottom: 1px solid #bf54f9;*/
    /*margin-bottom: 0;*/
    /*background-color: #bf54f9;*/
    /*color: #fff;*/
  /*}*/

  /*.mint-navbar .mint-tab-item:last-child {*/
    /*border-right: 1px solid #bf54f9;*/
  /*}*/

</style>
