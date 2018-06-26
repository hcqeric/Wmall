<template>
  <div class="container">
    <mt-header fixed title="我的好友">
      <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
    </mt-header>
    <div class="content">
      <Notification title="亲，这是好友推荐须知~"></Notification>
      <div class="banner">
        <img src="http://p90m90efq.bkt.clouddn.com/header-bg.jpg" alt="">
        <div class="amount">
          <p>好友总人数 (人)</p>
          <p>54</p>
        </div>
      </div>
    </div>
    <div class="friends-list">
      <div class="friends-panel">
        <div class="friends-tab">
          <mt-navbar v-model="selected">
            <mt-tab-item id="1">一级好友 (4)</mt-tab-item>
            <mt-tab-item id="2">二级好友 (4)</mt-tab-item>
            <mt-tab-item id="3">三级好友 (30)</mt-tab-item>
          </mt-navbar>
        </div>
        <div class="friends-content">
          <!-- tab-container -->
          <mt-tab-container v-model="selected">
            <mt-tab-container-item id="1">
              <div v-for="n in 10" class="friends" >

              </div>
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
    </div>
  </div>
</template>

<script>
  import Notification from '@/components/view/Notification'
  export default {
    name: "Friends",
    methods: {
      goBack() {
        this.$router.back()
      }
    },
    components:{
      Notification
    },
    data() {
      return {
        selected: '1'
      };
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
  .friends-tab{

  }
.mint-navbar{
  border-radius: 15px 15px 0 0;
  background-color: #FFEDF9;
}

  .mint-navbar .mint-tab-item.is-selected{
    color: #FF659F;
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
