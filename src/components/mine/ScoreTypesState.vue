<template>
  <div class="container">
    <mt-header v-if="stateInfo" fixed  :title="stateInfo.title">
      <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
    </mt-header>
    <div class="content">
      <div class="banner">
        <img src="http://p90m90efq.bkt.clouddn.com/header-bg.jpg" alt="">
        <div class="amount">
          <p v-if="stateInfo">{{stateInfo.title}}</p>
          <p>6000</p>
        </div>
      </div>
    </div>
    <div class="record-list">
      <div class="record-panel">
        <div class="record-tab">
          <p>订单明细</p>
          <p v-if="stateInfo">{{stateInfo.subTitle}}</p>
        </div>
        <div class="record-content">
          <router-link v-for="n in 5" :key="n" to="/scoredetail">
            <ScoreItem class="item"></ScoreItem>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ScoreItem from '@/components/view/ScoreItem'

  const state_msg = [
    {
      type:"able",
      title:"可兑积分",
      subTitle:"获得积分",
      postUrl:"www.baiodu.com"
    },
    {
      type:"unpack",
      title: "未结积分",
      subTitle:"预计可获积分",
      postUrl:"www.baiodu.com"
    },
    {
      type:"recharge",
      title: "复购积分",
      subTitle:"获得积分",
      postUrl:"www.baiodu.com"
    }
  ]
  export default {
    name: "ScoreTypesState",
    data(){
      return {
        stateInfo:null
      }
    },
    methods: {
      goBack() {
        this.$router.back()
      }
    },
    components:{
      ScoreItem
    },
    mounted(){
      let {type} = this.$route.params
      if (type == state_msg[0].type) {
        this.stateInfo = state_msg[0]
      }else if(type == state_msg[1].type){
        this.stateInfo = state_msg[1]
      }else if(type == state_msg[2].type){
        this.stateInfo = state_msg[2]
      }
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

  .record-list{
    position: relative;
  }
  .record-list{
    position: relative;
    flex: 1;
    background-color: #fff;
  }
  .record-panel{
    background-color: #fff;
    position: absolute;
    width: 100%;
    top: -30px;
    left: 0;
    border-radius: 15px 15px 0 0;
  }
  .record-tab{
    height: 46px;
    background-color: #FFEDF9;
    border-radius: 15px 15px 0 0;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .record-tab p{
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #75515A;
    font-weight: 700;
  }
  .record-content{
    padding: 0 16px;
  }

  .item{
    position: relative;
  }
  .item:after{
    position: absolute;
    bottom: 0;
    height: 1px;
    width: 100%;
    background-color: rgba(239,239,239,0.9);
    content: '';
  }
  .item:last-of-type:after{
    height: 0;
  }
</style>

