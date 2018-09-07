<template>
  <div class="container">
    <div class="user-header">
      <img src="http://p90m90efq.bkt.clouddn.com/header-bg.jpg" alt="">
      <div class="userinfo" v-if="userinfo">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <!--<img :src="userinfo.logoUrl" alt="avatar">-->
        <span @click="$router.push('/userinfo')">{{userinfo.nickname}}</span>
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
        <div class="item" @click="toTutorial">
          <div class="item-left">
            <img src="../../assets/img/user-dir.png" alt="">
            <span>新手教程</span>
          </div>
          <div class="item-right">
            <i class="el-icon-arrow-right"></i>
          </div>
        </div>
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
  import {Toast} from 'mint-ui';
  import {getUserInfo,updateUserInfo} from "../../http/getData";
  import { getLocalStorage } from '@/custom/mixin';
  import * as Constants from '../../custom/constants'
  import {mapActions} from 'vuex'
  export default {
    name: "UserCenter",
    data() {
      return {
        dialogShow: false,
        userinfo: null,
        uploadUrl:'',
        imageUrl:'',
        token:''
      }
    },
    methods: {
      toTutorial(){
        Toast({
          message: '该功能暂未开放，请耐心等待',
          position: 'middle',
          duration: 1000
        })
      },
      handleAvatarSuccess(res,file){
        this.imageUrl = URL.createObjectURL(file.raw);

        updateUserInfo({
          token: this.token
        },{
          logoUrl: res.result.url
        }).then(response=>{
          this.userinfo.logoUrl = res.result.url
          this.setUserInfo(this.userinfo)
          Toast({
            message: '更换头像成功',
            position: 'middle',
            duration: '500'
          })
        })
      },
      beforeAvatarUpload(file){
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isLt2M;
      },
      ...mapActions([
        'setUserInfo'
      ])
    },
    mounted(){
      let tk = getLocalStorage(Constants.TOKEN)
      this.token = tk
      this.uploadUrl = `http://120.79.16.221:8777/app/file/ftpUpload/headImg/0?token=` + tk
      getUserInfo({
        token: tk
      }).then(response=>{
        this.userinfo = response.result
        this.setUserInfo(this.userinfo)
        this.imageUrl = this.userinfo.logoUrl
      })
    }
  }
</script>

<style scoped>
  .container {
    height: 610px;
    margin-bottom: 50px;
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
    left: 0;
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

  .avatar-uploader {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    height: 36px;
    width: 36px;
    line-height: 36px;
    text-align: center;
  }
  .userinfo i{
    font-size: 16px;
    color: #fff;
  }
</style>
