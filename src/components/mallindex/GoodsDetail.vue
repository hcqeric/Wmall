<template>
  <div class="container">
    <mt-header fixed title="商品详情">
      <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
      <mt-button slot="right" @click="gotoEvaluation">查看评价</mt-button>
    </mt-header>
    <div class="content" v-if="goodsInfo">
      <mt-swipe :auto="0" class="swipe">
        <mt-swipe-item v-for="item in items"><img :src="item.picUrl" alt=""></mt-swipe-item>
      </mt-swipe>
      <div class="goods-info">
        <p>{{goodsInfo.name}}</p>
        <p>{{goodsInfo.introduce}}</p>
        <div class="price-info">
          <p><span>会员价{{goodsInfo.sellPrice|moneyFormat}}/瓶</span> <span>原价：<s>{{goodsInfo.bdanPrice|moneyFormat}}/瓶</s></span></p><button>包邮</button>
        </div>
      </div>
      <div class="goods-ad">
        <img src="http://p90m90efq.bkt.clouddn.com/goods-ad.png" alt=""/>
      </div>
      <div class="goods-intro">
        <img src="http://p90m90efq.bkt.clouddn.com/goods-intro.png" alt=""/>
      </div>
    </div>
    <div class="goto">
      <button @click="addToShopCart">加入购物车</button>
    </div>
  </div>
</template>

<script>
  import {getGoodsByGoodsNum} from "../../http/getData";
  import {addCart} from "../../http/getData";
  import {getLocalStorage} from "../../custom/mixin";
  import * as Constants from '../../custom/constants'
  import {Toast} from 'mint-ui'

  const items = [
      {
        linkUrl: 'http://y.qq.com/w/album.html?albummid=0044K2vN1sT5mE',
        picUrl: 'http://p90m90efq.bkt.clouddn.com/goods-banner.png',
        id: 11351
      },
      {
        linkUrl: 'https://y.qq.com/m/digitalbum/gold/index.html?_video=true&id=2197820&g_f=shoujijiaodian',
        picUrl: 'http://y.gtimg.cn/music/photo_new/T003R720x288M000004ckGfg3zaho0.jpg',
        id: 11372
      },
      {
        linkUrl: 'http://y.qq.com/w/album.html?albummid=001tftZs2RX1Qz',
        picUrl: 'http://y.gtimg.cn/music/photo_new/T003R720x288M00000236sfA406cmk.jpg',
        id: 11378
      }
    ]
  export default {
    name: "GoodsDetail",
    data(){
      return {
        id: "",
        items: items,
        goodsInfo: null
      }
    },
    methods: {
      goBack() {
        this.$router.back()
      },
      gotoEvaluation() {
        this.$router.push(`/evaluation/${this.id}`)
      },
      addToShopCart(){
        let tk = getLocalStorage(Constants.TOKEN)
        addCart({
          token: tk
        },{
          goodsId:this.goodsInfo.id,
          goodsNum: '1'
        }).then(response=>{
          console.log(response)
          Toast({
            message: "添加购物车成功"
          })
        })
      }
    },
    mounted(){
      let {id} = this.$route.params
      this.id = id
      getGoodsByGoodsNum({
        goodsNum: this.id
      }).then(response=>{
        console.log(response)
        this.goodsInfo = response.result
      }).catch(error=>{})
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
    overflow: scroll;
  }
  .mint-header{
    background-color: #000;
    height: 48px;
    z-index: 9999;
  }
  .content{
    margin-top: 48px;
  }

  .mint-swipe {
    height: 140px;
    color: #fff;
    font-size: 30px;
    text-align: center;
  }
  img{
    width: 100%;
  }
  .goods-info{
    background-color: #fff;
    padding: 16px;
  }
  .goods-info p{
    padding: 4px 0;
    color: #999;
    font-size: 12px;
  }
  .goods-info p:first-child{
    font-size: 16px;
    color: #000;
  }
  .price-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .price-info p span:first-child{
    color: #FF659B;
    font-size: 14px;
    margin-right: 16px;
  }
  .price-info p span:last-child{
    color: #999;
    font-size: 12px;
  }
  .price-info button{
    background-color: #ED9318;
    border: none;
    height: 20px;
    line-height: 20px;
    padding: 0 8px;
    border-radius: 10px;
    outline-color: transparent;
    color: #fff;
    font-size: 10px;
  }
  .goods-ad{
    margin: 8px 0;
  }
  .goto{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    text-align: center;
  }
  .goto button{
    border: none;
    height: 44px;
    line-height: 44px;
    background-color: transparent;
    background-image: url("../../assets/img/bg-purple.png");
    width: 100%;
    outline: none;
    text-align: center;
    color: #fff;
  }
</style>
