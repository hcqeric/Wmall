<template xmlns:v-clipboard="http://www.w3.org/1999/xhtml">
  <div class="share-goods-container">
    <mt-header fixed title="分享商品">
      <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
    </mt-header>
    <div class="share-goods-content">
      <div class="share-goods-list-wrap">
        <div class="share-goods-list">
          <div class="share-goods-item" v-for="item in shareImgs">
            <img :src="item.url" alt="">
            <el-checkbox v-model="item.checked" @change="handleCheckItem(item)"></el-checkbox>
          </div>
        </div>
        <div class="share-goods-selected">
          <p>已选择<span>{{count}}</span>张</p>
        </div>
      </div>
      <div class="share-goods-text">
        <textarea placeholder="请输入要分享的内容" rows="3"
                  v-model="advertorial"></textarea>
        <div class="text-copy">
          <el-checkbox v-model="shareText">分享文案</el-checkbox>
          <button type="button"
             v-clipboard:copy="advertorial"
             v-clipboard:success="onCopy"
             v-clipboard:error="onError">复制文案</button>
        </div>
      </div>
      <div class="goto">
        <button @click="handleShare">立即分享</button>
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
    import {shareGoods} from "../../http/getData";
    import {getLocalStorage} from "../../custom/mixin";
    import {isAndoird, isIOS, isWeiXin} from "../../custom/mixin";
    import * as Constants from '../../custom/constants'
    import {Toast} from 'mint-ui'
    export default {
        name: "ShareGoods",
      data(){
          return {
            shareToFriendsVisible: false,
            userShareDirVisible: false,
            count: 0,
            advertorial:  '',
            shareText: false,
            shareImgs:[],
            shareImgItem:{
              checked: false,
              url: ''
            },
            shareUrl:'',
            shareData:{
              advertorial: '',
              shareImgs:''
            }
          }
      },
      methods:{
        shareToWeChatFriends(){},
        shareToWeChatTimeLine() {},
        shareToQQ(){},
        shareToSinaWB(){},
        handleShare(){
          if (isWeiXin()){
            this.$copyText(this.shareUrl).then(function (e) {
              Toast({
                message: '已复制链接，请转发给好友！',
                position: 'middle',
                duration: 1500
              })
            }, function (e) {
              Toast({
                message: '复制链接失败',
                position: 'middle',
                duration: 1500
              })
            })

            // this.shareToFriendsVisible = true
          }else if(isAndoird()){
            if (this.shareText && this.count <= 0){
              if (this.advertorial != ''){
                jsCallShare.shareGoods(this.advertorial, "")
              } else{
                Toast({
                  message: '分享内容不能为空',
                  position: 'middle',
                  duration: 1500
                })
              }
            } else if (!this.shareText && this.count > 0){
              let imgs = []
              this.shareImgs.map(item=>{
                if (item.checked){
                  imgs.push(item.url)
                }
              })
              let jsonImgs = JSON.stringify(imgs)
              jsCallShare.shareGoods("", jsonImgs)
            } else if (this.shareText && this.count > 0){
              Toast({
                message: "图案和文字内容不能同时分享",
                position: 'middle',
                duration: 1500
              })
            }else if (!this.shareText && this.count <= 0){
              Toast({
                message: "请选择要分享的内容",
                position: 'middle',
                duration: 1500
              })
            }
          }else if (isIOS()) {
            if (this.shareText && this.count <= 0){
              if (this.advertorial != ''){
                this.shareData.advertorial = this.advertorial
                this.shareData.shareImgs = ''
                var shareJson = JSON.stringify(this.shareData)

                window.webkit.messageHandlers.hlf_dmall.postMessage(shareJson)
              } else{
                Toast({
                  message: '分享内容不能为空',
                  position: 'middle',
                  duration: 1500
                })
              }
            } else if (!this.shareText && this.count > 0 && this.count <= 1){
              let imgs = []
              this.shareImgs.map(item=>{
                if (item.checked){
                  imgs.push(item.url)
                }
              })
              this.shareData.advertorial = ''
              this.shareData.shareImgs = imgs[0]
              var shareJson = JSON.stringify(this.shareData)
              window.webkit.messageHandlers.hlf_dmall.postMessage(shareJson)
            } else if (!this.shareText && this.count > 1){
              Toast({
                message: "当前系统只支持单张图片分享",
                position: 'middle',
                duration: 1500
              })
            } else if (this.shareText && this.count > 0){
              Toast({
                message: "图案和文字内容不能同时分享",
                position: 'middle',
                duration: 1500
              })
            }else if (!this.shareText && this.count <= 0){
              Toast({
                message: "请选择要分享的内容",
                position: 'middle',
                duration: 1500
              })
            }
          }
        },
        onCopy: function (e) {
          Toast({
            message: "复制成功",
            position: 'middle',
            duration: 1500
          })
        },
        onError: function (e) {
          Toast({
            message: "复制失败",
            position: 'middle',
            duration: 1500
          })
        },
        goBack(){
          this.$router.back()
        },
        handleCheckItem(item) {
          item.checked = item.checked
          let count = 0;
          this.shareImgs.map(item => {
            if (item.checked) return count++;
          })
          this.count = count
        }
      },
      watch:{
        'shareImgs': {
          handler: (newValue,oldValue)=>{
            let count = 0
            if (newValue.length > 0){
              newValue.map(item => {
                if (item.checked){
                  count++
                }
              })
            }
            this.count = count
          },
          deep: true
        }
      },
        mounted(){
          let {id} = this.$route.params
          let token = getLocalStorage(Constants.TOKEN)
          shareGoods({
            token: token
          }, id).then(response=>{
            this.advertorial = response.result.advertorial
            this.shareUrl = response.result.shareUrl
            response.result.imgList.map(item=>{
                let shareImgItem = {checked: false, url: ''}
                shareImgItem.url = item
                this.shareImgs.push(shareImgItem)
            })
          })
        }
    }
</script>

<style scoped>
.share-goods-container{
  min-height: 100vh;
  width: 100vw;
  background: #efefef;
}
.mint-header{
  background-color: #000;
  height: 48px;
}
.share-goods-content{
  position: absolute;
  top: 48px;
  left: 0;
  width: 100vw;
}
.share-goods-list-wrap{
  background: #fff;
  padding: 16px 8px;
  margin-bottom: 8px;

}
.share-goods-list{
  display: flex;
  width: 100%;
  overflow-x: scroll;
}
.share-goods-item{
  position: relative;
}
.share-goods-item>img{
  width: 110px;
  height: 110px;
  margin-left: 2px;
}
.share-goods-item>.el-checkbox{
  position: absolute;
  top: 0px;
  right: 2px;
}
.share-goods-selected{
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
}
.share-goods-selected>p{
  font-size: 16px;
  color: #000;
}
.share-goods-selected>p>span{
  color: #b91135;
  padding: 0 4px;
}
.share-goods-text{
  background: #fff;
  padding: 16px;
}
.share-goods-text textarea{
  box-sizing: border-box;
  width: 100%;
  padding: 10px;
  height: 160px;
  resize: none;
  font-size: 14px;
  outline-color: transparent;
  border: 1px solid rgba(239,239,239,0.9);
  border-radius: 3px;
  background: #eee;
}
.text-copy{
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
}
.text-copy>p{
  font-size: 16px;
  color: #b91135;
}
.text-copy>button{
  border: 1px solid #b91135;
  width: 70px;
  height: 26px;
  border-radius: 13px;
  outline: none;
  background-color: transparent;
  background-image: url("../../assets/img/bg-white.png");
  color: #b91135;
}

.goto {
  border: none;
  outline: none;
  margin-top: 40px;
  /*position: absolute;*/
  /*bottom: 0;*/
  /*left: 0;*/
  /*padding: 44px 0;*/
  /*width: 100%;*/
  text-align: center;
}

.goto button {
  border: none;
  outline: none;
  height: 35px;
  line-height: 35px;
  border-radius: 17px;
  background-color: transparent;
  background-image: url("../../assets/img/button-bg.png");
  background-repeat: no-repeat;
  background-size: contain;
  width: 290px;
  text-align: center;
  color: #fff;
  margin: 0 auto;
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
<style>
  .text-copy .el-checkbox {
     margin-left: 0px;
  }
</style>
