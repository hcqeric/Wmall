<template>
    <div class="container">
      <mt-header title="推广模板">
        <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
      </mt-header>
      <div class="content">
        <img :src="imgUrl" alt="">
        <div class="share">
          <p>人人都是消费者，人人都是消费商</p>
          <button @click="shareToFriends">推广给好友，一起来赚钱！</button>
        </div>
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
        userShareDirVisible: false,
        shareData:{
          title:'',
          desc:'',
          link:'',
          imgUrl:'',
          action:"share"
        }
      }
    },
    methods:{
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
                // title: this.shareData.title,
                // desc: this.shareData.desc,
                // link: this.shareData.link,
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
              // title: this.shareData.title,
              // desc: this.shareData.desc,
              // link: this.shareData.link,
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
                // title: this.shareData.title,
                // desc: this.shareData.desc,
                // link: this.shareData.link,
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
      shareToFriends(){
        this.shareData.title="美智甄品"
        this.shareData.link = location.href.split("#")[0]
        this.shareData.imgUrl = this.imgUrl

        if (this.isWeiXin()){
          this.shareToFriendsVisible = true
        }else if(this.isAndoird()){
          jsCallShare.share(this.shareData.title,this.shareData.link, this.shareData.imgUrl, this.shareData.desc)
        }else if(this.isIOS()){
          var shareJson = JSON.stringify(this.shareData)
          console.log(shareJson)
          window.webkit.messageHandlers.hlf_dmall.postMessage(shareJson)
        }
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
    width: 100vw;
    bottom:10vh;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .share p{
    color: #fff;
    font-size: 14px;
    /*text-indent: 2em;*/
    margin-bottom: 30px;
    text-align: center;

  }
  .share button{
    border: none;
    height: 44px;
    line-height: 44px;
    border-radius: 5px;
    background-color: transparent;
    background-image: url("../../assets/img/bg-purple.png");
    width: 80%;
    outline: none;
    text-align: center;
    color: #fff;

  }

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
</style>
