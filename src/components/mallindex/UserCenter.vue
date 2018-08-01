<template>
  <div class="container">
    <div class="user-header">
      <img src="http://p90m90efq.bkt.clouddn.com/header-bg.jpg" alt="">
      <div class="userinfo" v-if="userinfo">
        <img :src="userinfo.logoUrl" alt="avatar">
        <span @click="$router.replace('/userinfo')">{{userinfo.nickname}}</span>
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
          <router-link to="/ordercenter/0" class="order-state-item">
            <img src="../../assets/img/daifuk.png" alt="">
            <span>待付款</span>
          </router-link>
          <router-link to="/ordercenter/1" class="order-state-item">
            <img src="../../assets/img/daifahuo.png" alt="">
            <span>待发货</span>
          </router-link>
          <router-link to="/ordercenter/2" class="order-state-item">
            <img src="../../assets/img/daishouhuo.png" alt="">
            <span>待收货</span>
          </router-link>
          <router-link to="/ordercenter/3" class="order-state-item">
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
        <!--新手教程-->
        <router-link class="item" to="/tutorial">
          <div class="item-left">
            <img src="../../assets/img/user-dir.png" alt="">
            <span>新手教程</span>
          </div>
          <div class="item-right">
            <i class="el-icon-arrow-right"></i>
          </div>
        </router-link>
        <!--团队业绩-->
        <div class="item" v-if="userinfo">
          <div class="item-left">
            <img src="../../assets/img/yeji.png" alt="">
            <span>团队业绩</span>
          </div>
          <div class="item-right">
            <span>{{userinfo.orderAmount}}</span>
          </div>
        </div>
        <!--我的积分-->
        <router-link class="item" to="/scores">
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
          <router-link class="item" to="/feedback">
            <div class="item-left">
              <img src="../../assets/img/dianhu.png" alt="">
              <span>意见反馈</span>
            </div>
          </router-link>
          <!--系统设置-->
          <router-link class="item" to="/system">
            <div class="item-left">
              <img src="../../assets/img/setting.png" alt="">
              <span>系统设置</span>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {MessageBox} from 'mint-ui';
  import {getUserInfo} from "../../http/getData";
  import { getLocalStorage } from '@/custom/mixin';
  import * as Constants from '../../custom/constants'
  import {mapActions} from 'vuex'
  export default {
    name: "UserCenter",
    data() {
      return {
        dialogShow: false,
        userinfo: null
      }
    },
    methods: {
      ...mapActions([
        'setUserInfo'
      ])
    },
    mounted(){
      let tk = getLocalStorage(Constants.TOKEN)
      getUserInfo({
        token: tk
      }).then(response=>{
        this.userinfo = response.result
        this.setUserInfo(this.userinfo)
      })
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
    background: #fff;
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
</style>
