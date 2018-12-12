<template>
  <div class="container">
    <mt-header fixed title="我的好友">
      <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
    </mt-header>
    <div class="content">
      <Notification title="亲，这是好友推荐须知~" @click.native="toSelectTemplate"></Notification>
      <div class="banner">
        <img src="../../assets/img/header-bg.jpg" alt="">
        <div class="amount">
          <p>好友总人数 (人)</p>
          <p>{{userSum}}</p>
        </div>
      </div>
    </div>
    <div class="friends-list">
      <div class="friends-panel">
        <div class="friends-tab">
          <mt-navbar v-model="selected">
            <mt-tab-item id="1" v-if="userList1">一级好友 ({{userList1.userSum}})</mt-tab-item>
            <mt-tab-item id="2" v-if="userList2">二级好友 ({{userList2.userSum}})</mt-tab-item>
            <mt-tab-item id="3" v-if="userList3">三级好友 ({{userList3.userSum}})</mt-tab-item>
          </mt-navbar>
        </div>
        <div class="friends-content">
          <!-- tab-container -->
          <mt-tab-container v-model="selected">
            <mt-tab-container-item id="1" v-if="userList1">
              <div  v-for="item in userList1.list">
                <FriendItem :friendItem="item"></FriendItem>
              </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="2" v-if="userList2">
              <div  v-for="item in userList2.list">
                <FriendItem :friendItem="item"></FriendItem>
              </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="3" v-if="userList3">
              <div v-for="item in userList3.list">
                <FriendItem :friendItem="item"></FriendItem>
              </div>
            </mt-tab-container-item>
          </mt-tab-container>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Notification from '@/components/view/Notification'
  import FriendItem from '@/components/view/FriendItem.vue'
  import {getFriends} from "../../http/getData";
  import {getLocalStorage} from "../../custom/mixin";
  import * as Constants from '../../custom/constants'

  export default {
    name: "Friends",
    methods: {
      goBack() {
        this.$router.back()
      },
      toSelectTemplate(){
        this.$router.push('/template/1')
      }
    },
    components:{
      Notification,
      FriendItem
    },
    data() {
      return {
        selected: '1',
        userSum:0,
        userList1:null,
        userList2:null,
        userList3:null
      };
    },
    mounted(){
      let tk = getLocalStorage(Constants.TOKEN)
      getFriends({
        token: tk
      }).then(response=>{
        this.userSum = response.result.userSum
        this.userList1 = response.result.userList1
        this.userList2 = response.result.userList2
        this.userList3 = response.result.userList3

      })
    }
  }
</script>

<style scoped>
  .container {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: #efefef;
    display: flex;
    flex-direction: column;
  }

  .mint-header {
    background-color: #000;
    height: 48px;
    z-index: 9999;
  }

  .content {
    margin-top: 48px;
  }
  .banner{
    position: relative;
  }
  .banner img{
    width: 100%;
  }
  .amount{
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    text-align: center;
    padding: 16px;
    color: #fff;
  }
  .amount p{
    padding: 4px 0;
  }
  .amount p:first-child{
    font-size: 16px;
    position: relative;
  }

  .amount p:first-child:after {
    content: "";
    display: inline-block;
    position: absolute;
    bottom: -3px;
    left: 50%;
    margin-left: -13px;
    width: 26px;
    height: 2px;
    background-color: #ffccd3;

  }
  .amount p:last-child{
    padding-top:10px;
    font-size: 26px;
    font-weight: 700;
  }
  .friends-list{
    position: relative;
    flex: 1;
    background-color: #fff;
  }
  .friends-panel{
    background-color: #fff;
    position: absolute;
    width: 100%;
    top: -30px;
    left: 0;
    border-radius: 15px 15px 0 0;
  }
  .friends-content{
    padding:3px 16px 0 16px;
  }

  .mint-navbar{
  border-radius: 15px 15px 0 0;
  background-color: #FFEDF9;
}

  .mint-navbar .mint-tab-item.is-selected{
    color: #FF659F;
    border: none;
    position: relative;
  }

  .mint-navbar .mint-tab-item.is-selected:after{
    position: absolute;
    content: '';
    bottom: 0;
    left: 50%;
    margin-left: -20px;
    height: 3px;
    width: 40px;
    background-color: #FF659F;
  }
  .mint-tab-item-label{
    font-size: 14px;
  }
  .mint-navbar .mint-tab-item{
    color: #75515A;
    font-weight: 700;
  }

</style>
