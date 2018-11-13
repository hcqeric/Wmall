<template>
  <div class="container">
    <mt-header fixed title="商品详情">
      <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
      <mt-button slot="right" @click="gotoEvaluation">查看评价</mt-button>
    </mt-header>
    <div class="content" v-if="goodsInfo">
      <mt-swipe :auto="4000" class="swipe">
        <mt-swipe-item v-for="item in goodsInfo.sowingUrl" :key="item.id"><img :src="item" alt=""></mt-swipe-item>
      </mt-swipe>
      <div class="goods-info">
        <div class="goods-detail-info">
          <div class="goods-detail-intro">
            <p>{{goodsInfo.name}}</p>
            <p v-if="goodsInfo.introduce.length > 100">{{goodsInfo.introduce.substring(0, 100)}}...</p>
            <p v-else>{{goodsInfo.introduce}}</p>
          </div>
          <div class="goods-share" @click="handleShare">
            <i class="el-icon-share"></i>
          </div>
        </div>
        <div class="price-info">
          <p><span v-if="goodsInfo.type == 1">会员价{{goodsInfo.sellPrice|moneyFormat}}/{{goodsInfo.unit}}</span><span
            v-if="goodsInfo.type == 2">会员价{{goodsInfo.bonusPrice}}积分/{{goodsInfo.unit}}</span> <span>原价：<s>{{goodsInfo.bdanPrice|moneyFormat}}/{{goodsInfo.unit}}</s></span>
          </p>
          <button>包邮</button>
        </div>
      </div>
      <!--<div class="goods-ad">-->
        <!--<img src="http://p90m90efq.bkt.clouddn.com/goods-ad.png" alt=""/>-->
      <!--</div>-->
      <div class="goods-intro" v-for="item in goodsInfo.detailsUrl">
        <img :src="item" alt=""/>
      </div>
    </div>
    <div class="goto">
      <button @click="addToShopCart">加入购物车</button>
      <button @click="toShopCart">立即购买</button>
    </div>

    <mt-popup v-model="shareToFriendsVisible" @click.native="shareToFriendsVisible = false"  :modal="true" position="bottom" class="modal-popup">
      <div class="share-container">
        <div class="share-title">分享给好友</div>
        <div class="share-list">
          <div class="share-item" @click="shareToWeChatFriends">
            <div class="share-img">
              <img src="../../assets/img/weixin.png" alt="" />
            </div>
            <span>微信好友</span>
          </div>
          <div class="share-item" @click="shareToWeChatTimeLine">
            <div class="share-img">
              <img src="../../assets/img/pengyouquan.png" alt="" />
            </div>
            <span>微信朋友圈</span>
          </div>
          <div class="share-item" @click="shareToQQ">
            <div class="share-img">
              <img src="../../assets/img/QQ.png" alt="" />
            </div>
            <span>QQ好友</span>
          </div>
          <div class="share-item" @click="shareToSinaWB">
            <div class="share-img">
              <img src="../../assets/img/xinlangweibo.png" alt="" />
            </div>
            <span>新浪微博</span>
          </div>
        </div>
        <div class="share-title" @click="shareToFriendsVisible = false">取消</div>
      </div>
    </mt-popup>
    <mt-popup v-model="userShareDirVisible" @click.native="userShareDirVisible = false" position="right"
              class="modal-popup"  >
      <div class="user-share-dir">
        <img src="../../assets/img/user-share-dir.png" alt="">
      </div>
    </mt-popup>
  </div>
</template>

<script>
  import {getGoodsByGoodsNum} from "../../http/getData";
  import {addCart} from "../../http/getData";
  import {getLocalStorage} from "../../custom/mixin";
  import * as Constants from '../../custom/constants'
  import {Toast} from 'mint-ui'
  import wxSDK from 'weixin-js-sdk'

  export default {
    name: "GoodsDetail",
    data(){
      return {
        shareToFriendsVisible: false,
        userShareDirVisible: false,
        shareData:{
          title:'',
          desc:'',
          link:'',
          imgUrl:'',
          action:"share"
        },
        id: "",
        goodsInfo: null,
        aaa:["http://img.mezhizp.com/pub/201810091430461274431387.jpg", "http://img.mezhizp.com/pub/goodsShare2.png"]
      }
    },
    methods: {
      isWeiXin() {
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
          return true;
        } else {
          return false;
        }
      },
      isAndoird(){
        var u = window.navigator.userAgent;
        if(u.indexOf('Android') > -1 || u.indexOf('Adr') > -1){
          return true
        }else{
          return false
        }
      },
      isIOS(){
        var u = window.navigator.userAgent;
        if(!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
          return true;
        }else{
          return false;
        }
      },
      shareToWeChatFriends(){
        this.shareToFriendsVisible = false
        this.userShareDirVisible = true
        this.wxConfig(this.shareData.link).then(config=>{
          console.log(config)
          wxSDK.config(config)
          wxSDK.ready(() => {
            wxSDK.onMenuShareAppMessage({
              title: this.shareData.title,
              desc: this.shareData.desc,
              link: this.shareData.link,
              imgUrl: this.shareData.imgUrl,
              success: () => {
                Toast({
                  message: '分享成功',
                  position: 'middle'
                })

              },
              cancel: () => {
                Toast({
                  message: '分享失败',
                  position: 'middle'
                })
              }
            });
          })
        })
      },
      shareToWeChatTimeLine() {
        this.shareToFriendsVisible = false
        this.userShareDirVisible = true
        this.wxConfig(this.shareData.link).then(config => {
          wxSDK.config(config)
          wxSDK.ready(() => {
            wxSDK.onMenuShareTimeline({
              title: this.shareData.title,
              desc: this.shareData.desc,
              link: this.shareData.link,
              imgUrl: this.shareData.imgUrl,
              success: () => {
                Toast({
                  message: '分享成功',
                  position: 'middle'
                })
              },
              cancel: () => {
                Toast({
                  message: '分享失败',
                  position: 'middle'
                })
              }
            });
          })
        })
      },
      shareToQQ(){
        this.shareToFriendsVisible = false
        this.userShareDirVisible = true
        this.wxConfig(this.shareData.link).then(config=>{
          wxSDK.config(config)
          wxSDK.ready(() => {
            wxSDK.onMenuShareQQ({
              title: this.shareData.title,
              desc: this.shareData.desc,
              link: this.shareData.link,
              imgUrl: this.shareData.imgUrl,
              success: () => {
                Toast({
                  message: '分享成功',
                  position: 'middle'
                })
              },
              cancel: () => {
                Toast({
                  message: '分享失败',
                  position: 'middle'
                })
              }
            });
          })
        })
        // let shareUrl = 'http://connect.qq.com/widget/shareqq/index.html?url=' + '+ this.shareData.imgUrl' + '&sharesource=qzone&title=' + encodeURIComponent(this.shareData.title) + '&pics=' + this.shareData.imgUrl
        // window.location.href = shareUrl

      },
      shareToSinaWB(){
        let url = 'http://service.weibo.com/share/share.php?url=' + this.shareData.link + '&title=' + encodeURIComponent(this.shareData.title) + '&pic=' + this.shareData.imgUrl
        window.location.href = url
      },
      handleShare(){

        this.$router.push(`/sharegoods/${this.goodsInfo.id}`)

        // this.shareData.title=this.goodsInfo.name
        // this.shareData.link = location.href.split("#")[0]
        // this.shareData.imgUrl = this.goodsInfo.goodsImg
        // if (this.goodsInfo.type == 1){
        //   this.shareData.desc = this.goodsInfo.introduce + '\r\n' + "￥" + (this.goodsInfo.sellPrice/100)
        // } else if (this.goodsInfo.type == 2){
        //   this.shareData.desc = this.goodsInfo.introduce + '\r\n' + this.goodsInfo.bonusPrice + "积分"
        // }
        //
        // if (this.isWeiXin()){
        //   this.shareToFriendsVisible = true
        // }else if(this.isAndoird()){
        //   let a = JSON.stringify(this.aaa)
        //   jsCallShare.shareGoods(this.shareData.title,this.shareData.link, this.shareData.imgUrl, this.shareData.desc, a)
        // }else if (this.isIOS()) {
        //   var shareJson = JSON.stringify(this.shareData)
        //   window.webkit.messageHandlers.hlf_dmall.postMessage(shareJson)
        // }
      },
      goBack() {
        this.$router.back()
      },
      gotoEvaluation() {
        this.$router.push(`/evaluation/${this.goodsInfo.id}`)
      },
      toShopCart(){
        this.$router.push('/cart')
      },
      addToShopCart(){
        let tk = getLocalStorage(Constants.TOKEN)
        addCart({
          token: tk
        },{
          goodsId:this.goodsInfo.id,
          goodsNum: '1'
        }).then(response=>{
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
  }
  .content{
    margin-top: 48px;
    margin-bottom: 44px;
  }

  .mint-swipe {
    height: 240px;
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
    display: flex;
  }
  .goto button{
    position: relative;
    flex: 1;
    border: none;
    height: 44px;
    line-height: 44px;
    background-color: transparent;
    background-image: url("../../assets/img/bg-purple.png");
    outline: none;
    text-align: center;
    color: #fff;
  }
  .goto button:first-of-type:after{
    position: absolute;
    content: '';
    height: 42px;
    width: 1px;
    background: #ccc;
    right: 0;
    top: 1px;
  }
  .goods-detail-info{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .goods-detail-intro{
    flex: 1;
  }
  .goods-share .el-icon-share{
    font-size: 24px;
    color: #bf54f9;
    padding:8px;
  }

  .goods-intro{
    padding: 0;
    margin: 0;
    width: 100vw;
  }

  .goods-intro>img{
    padding: 0;
    margin: 0;
    width: 100vw;
    vertical-align: bottom;
  }

  /*share*/
  .mint-popup{
    width: 100%;
    height: 100vh;
    background: transparent;
  }
  .share-container{
    /*height: 100vh;*/
    width: 100%;
    position: relative;
    background: #fff;
    margin-top: 50%;
    transform: translate(0, 50%);
  }
  .share-title{
    height: 46px;
    line-height: 46px;
    text-align: center;
    font-size: 16px;
    position: relative;
    width: 100%;
  }
  .share-title:after{
    content: '';
    position: absolute;
    height: 1px;
    width: 100%;
    bottom: 1px;
    left: 0;
    background: #eee;
  }
  .share-title:before{
    content: '';
    position: absolute;
    height: 1px;
    width: 100%;
    top: 1px;
    left: 0;
    background: #eee;
  }
  .share-list{
    display: flex;
    padding: 16px 0;
  }
  .share-item{
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .share-img{
    border: 1px solid #eee;
    padding: 8px;
    border-radius: 5px;
  }
  .share-item img{
    width: 36px;
  }
  .share-item span{
    margin-top: 4px;
  }
  .user-share-dir{
    margin: 16px;
    text-align: right;
  }
  .user-share-dir img{
    width: 70vw;
  }
  /*share*/
</style>
