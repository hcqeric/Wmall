<template>
    <div class="container">
      <mt-header title="推广模板">
        <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
      </mt-header>
      <div class="content">
        <img :src="imgUrl" alt="">
        <div class="share">
          <p>分享二维码给好友，好友注册成功并且购物满20元，即可永远成为你的一级好友~</p>
          <button @click="shareToFriends">推广给好友，一起来赚钱！</button>
        </div>
      </div>

      <mt-popup v-model="shareToFriendsVisible" :closeOnClickModal="true" :modal="true" position="bottom" class="modal-popup">
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
    </div>
</template>

<script>
  import {getShareInfo} from "../../http/getData";
  import {getLocalStorage} from "../../custom/mixin";
  import * as Constants from '../../custom/constants'
  import {Toast} from 'mint-ui'
  import wxSDK from 'weixin-js-sdk'

  export default {
    name: "PromotionDetail",
    data(){
      return {
        id:'1',
        imgUrl:'',
        shareToFriendsVisible: false,
        shareData:{
          title:'',
          desc:'',
          link:'',
          imgUrl:''
        }
      }
    },
    methods:{
      shareToWeChatFriends(){
        this.wxConfig().then(config=>{
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
      shareToWeChatTimeLine(){
        this.wxConfig().then(config=>{
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
        this.wxConfig().then(config=>{
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
      },
      shareToSinaWB(){

      },
      shareToFriends(){
        this.shareToFriendsVisible = true
        this.shareData.title="美智甄品"
        this.shareData.link = window.location.href
        this.shareData.imgUrl = this.imgUrl
        console.log(this.shareData)
      },
      goBack() {
        this.$router.back()
      }
    },
    mounted() {
      let {id} = this.$route.params
      this.id = id
      let token = getLocalStorage(Constants.TOKEN)
      getShareInfo({
        token: token,
      },{
        id: this.id
      }).then(response=>{
        this.imgUrl = response.result.url
      })
    }
  }
</script>

<style scoped>
.container{
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.mint-header {
  background-color: #000;
  height: 48px;
}
  .content{
    flex: 1;
    display: flex;
    position: relative;
  }
  .content img{
    width: 100%;
  }
  .share{
    position: absolute;
    bottom:10vh;
    display: flex;
    flex-direction: column;
    padding: 0 36px;
  }
  .share p{
    color: #fff;
    font-size: 14px;
    text-indent: 2em;
    margin-bottom: 30px;
  }
  .share button{
    border: none;
    height: 44px;
    line-height: 44px;
    border-radius: 5px;
    background-color: transparent;
    background-image: url("../../assets/img/bg-purple.png");
    width: 100%;
    outline: none;
    text-align: center;
    color: #fff;
  }

  .modal-popup{
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
</style>
