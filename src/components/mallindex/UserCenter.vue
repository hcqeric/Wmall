<template>
  <div class="container">
    <div class="user-header">
      <img src="http://p90m90efq.bkt.clouddn.com/header-bg.jpg" alt="">
      <div class="userinfo" v-if="userinfo">
        <img :src="userinfo.logoUrl" alt="avatar">
        <span>{{userinfo.nickname}}</span>
      </div>
    </div>
    <!--我的信息-->
    <div class="content">
      <div class="item-list">
        <div class="list-top">
          <!--我的信息-->
        <router-link class="item" to="/userinfo">
          <div class="item-left">
            <img src="../../assets/img/xingx.png" alt="">
            <span>我的信息</span>
          </div>
          <div class="item-right">
            <i class="el-icon-arrow-right"></i>
          </div>
        </router-link>
        <!--我的订单-->
        <router-link class="item" to="/ordercenter/all">
          <div class="item-left">
            <img src="../../assets/img/dind.png" alt="">
            <span>我的订单</span>
          </div>
          <div class="item-right">
            <span>查看更多订单</span>
            <i class="el-icon-arrow-right"></i>
          </div>
        </router-link>
        <div class="order-state-row">
          <router-link to="/ordercenter/topay" class="order-state-item">
            <img src="../../assets/img/daifuk.png" alt="">
            <span>待付款</span>
          </router-link>
          <router-link to="/ordercenter/tosend" class="order-state-item">
            <img src="../../assets/img/daifahuo.png" alt="">
            <span>待发货</span>
          </router-link>
          <router-link to="/ordercenter/toreceive" class="order-state-item">
            <img src="../../assets/img/daishouhuo.png" alt="">
            <span>待收货</span>
          </router-link>
          <router-link to="/ordercenter/tocomment" class="order-state-item">
            <img src="../../assets/img/daipingj.png" alt="">
            <span>待评价</span>
          </router-link>
          <router-link to="refunds" class="order-state-item">
            <img src="../../assets/img/tuohuo.png" alt="">
            <span>退货退款</span>
          </router-link>

        </div>
        </div>
        <div class="list-mid">
        <!--我的评价-->
        <router-link class="item" to="/userevaluations">
          <div class="item-left">
            <img src="../../assets/img/pingjia.png" alt="">
            <span>我的评价</span>
          </div>
          <div class="item-right">
            <i class="el-icon-arrow-right"></i>
          </div>
        </router-link>
        <!--我的账户-->
        <router-link class="item" to="/account">
          <div class="item-left">
            <img src="../../assets/img/zhanghu.png" alt="">
            <span>我的账户</span>
          </div>
          <div class="item-right">
            <i class="el-icon-arrow-right"></i>
          </div>
        </router-link>
        <!--团队业绩-->
        <div class="item">
          <div class="item-left">
            <img src="../../assets/img/yeji.png" alt="">
            <span>团队业绩</span>
          </div>
          <div class="item-right">
            <span>500，000</span>
          </div>
        </div>
        <!--我的积分-->
        <router-link class="item" to="/scores/11">
          <div class="item-left">
            <img src="../../assets/img/jif.png" alt="">
            <span>我的积分</span>
          </div>
          <div class="item-right">
            <i class="el-icon-arrow-right"></i>
          </div>
        </router-link>
        <!--我的好友-->
        <router-link class="item" to="/friends">
          <div class="item-left">
            <img src="../../assets/img/haoyou.png" alt="">
            <span>我的好友</span>
          </div>
          <div class="item-right">
            <i class="el-icon-arrow-right"></i>
          </div>
        </router-link>
        </div>
        <div class="system-service">
          <!--联系客服-->
          <div class="item" @click="dialogShow = true">
            <div class="item-left">
              <img src="../../assets/img/dianhu.png" alt="">
              <span>联系客服</span>
            </div>
          </div>
          <!--系统设置-->
          <router-link class="item" to="/system">
            <div class="item-left">
              <img src="../../assets/img/setting.png" alt="">
              <span>系统设置</span>
            </div>
          </router-link>
        </div>

        <div class="msgbox-wrapper" style="position: absolute; z-index: 2011;display: block;"
             v-show="dialogShow == true" ref="msgbox">
          <div class="mint-msgbox" style="">
            <div class="mint-msgbox-header">
              <div class="mint-msgbox-title">联系客服</div>
            </div>
            <div class="mint-msgbox-content">
              <div class="mint-msgbox-message">亲，有任何疑问都可以联系客服哦！我们都会给您耐心详尽的解答~</div>
              <div class="mint-msgbox-input" style="display: none;"><input placeholder="" type="text">
                <div class="mint-msgbox-errormsg" style="visibility: hidden;"></div>
              </div>
            </div>
            <div class="mint-msgbox-btns">
              <button class="mint-msgbox-btn mint-msgbox-cancel" @click="dialogShow = false">取消</button>
              <button class="mint-msgbox-btn mint-msgbox-cancel" @click="dialogShow = false">确定</button>
            </div>
          </div>
        </div>

        <div class="modal" style="z-index: 2006;" v-show="dialogShow == true" @click="dialogShow = false"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import {MessageBox} from 'mint-ui';
  import url from '../../http/url.js'
  import * as Constants from '../../custom/constants'
  export default {
    name: "UserCenter",
    data() {
      return {
        dialogShow: false,
        userinfo: null
      }
    },
    methods: {
      contactUs() {
        console.log("sadfasdfsd")
        MessageBox({
          title: '联系客服',
          message: '亲，有任何疑问都可以联系客服哦！我们都会给您耐心详尽的解答~',
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(action => {
          if (action === 'confirm') {
            console.log("quedingle")
          } else {
            console.log("quxiaole")
          }
        });
      }
    },
    mounted(){
      let tk = localStorage.getItem(Constants.TOKEN)
      this.axios.get(url.userinfo, {
        params: {
          token: tk
        }
      }).then( response=> {
        console.log(response)
        if (response.data.code == 0){
          // let imgs = response.data.result
          // imgs.forEach((item)=>{
          //   this.list.push(item)
          // })
          this.userinfo = response.data.result
        }else if(response.data.code == 500){
          Toast(response.data.msg);
        }
      }).catch(function (error) {
        console.log(error);
      });
    }
  }
</script>

<style scoped>
  .container {
    margin-bottom: 48px;
  }

  .user-header {
    position: relative;
  }

  .user-header img {
    width: 100%;
  }

  .userinfo {
    box-sizing: border-box;
    position: absolute;
    top: 0;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 16px;
  }

  .userinfo img {
    height: 46px;
    width: 46px;
    border-radius: 25px;
  }

  .user-header span {
    color: #fff;
    margin-left: 10px;
    font-size: 18px;
  }
  .content{
    position: relative;
  }
  .item-list{
    position: absolute;
    top: -60px;
    width: 100%;
    border-radius: 15px 15px 0 0;
    background-color: #efefef;
  }
  .list-top{
    background-color: #fff;
    border-radius: 15px 15px 0 0;
    padding: 0 16px;
    box-sizing: border-box;
  }
  .list-mid{
    background-color: #fff;
    margin-top: 8px;
    padding: 0 16px;
    box-sizing: border-box;
  }
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 48px;
    width: 100%;
    position: relative;
  }
  .item:after{
    position: absolute;
    content: ' ';
    height: 1px;
    width: 100%;
    background-color: #eee;
    bottom: -1px;
  }

  .item-left {
    display: flex;
    align-items: center;
  }

  .item-left img {
    width: 20px;
    color: #FF5D3D;
  }

  .item-left span {
    font-size: 14px;
    color: #000;
    margin-left: 8px;
  }

  .item-right {
    display: flex;
    align-items: center;
  }

  .item-right i {
    font-size: 16px;
    color: #999;
  }

  .item-right span {
    margin-right: 4px;
    color: #999;
    font-size: 14px;
  }

  .order-state-row {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    box-sizing: border-box;
    padding: 8px 10px;
    min-height: 48px;
    width: 100%;
    /*background-image: linear-gradient(180deg, #d9d9d9, #d9d9d9 50%, transparent 50%);*/
    /*background-size: 120% 1px;*/
    /*background-repeat: no-repeat;*/
    /*background-position: bottom left;*/
    /*background-origin: border-box;*/
  }

  .order-state-item {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .order-state-item img {
    width: 26px;
  }

  .order-state-item span {
    padding-top: 8px;
    font-size: 12px;
    color: #000;
  }

  .system-service {
    margin-top: 8px;
    width: 100%;
    background-color: #fff;
    padding: 0 16px;
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
  }

  /*联系客服弹框*/
  .modal {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    background: #000;
  }

  .msgbox {
    position: fixed;
    top: 50%;
    left: 50%;
    -webkit-transform: translate3d(-50%, -50%, 0);
    transform: translate3d(-50%, -50%, 0);
    background-color: #fff;
    width: 85%;
    border-radius: 3px;
    font-size: 16px;
    -webkit-user-select: none;
    overflow: hidden;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transition: .2s;
    transition: .2s;
  }

  /*联系客服弹框*/

</style>
