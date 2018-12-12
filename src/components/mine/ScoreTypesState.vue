<template>
  <div class="container">
    <mt-header v-if="stateInfo" fixed  :title="stateInfo.title">
      <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
    </mt-header>
    <div class="content">
      <div class="banner">
        <img src="../../assets/img/header-bg.jpg" alt="">
        <div class="amount">
          <p v-if="stateInfo">{{stateInfo.title}}</p>
          <p>{{score}}</p>
        </div>
      </div>
    </div>
    <div class="record-list">
      <div class="record-panel">
        <div class="record-tab">
          <p>订单明细</p>
          <p v-if="stateInfo">{{stateInfo.subTitle}}</p>
        </div>

          <div class="page-infinite">
            <div class="page-infinite-wrapper" ref="wrapper" >
              <div class="record-content" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50">
                <div class="list" v-for="item in orderScoreList">
                  <ScoreTypesStateItem class="item" :exchangeItem="item" :type="stateInfo.tradeStatus"></ScoreTypesStateItem>
                </div>
              </div>
              <p v-show="loading" class="page-infinite-loading">
                <mt-spinner type="fading-circle"></mt-spinner>
                加载中...
              </p>
              <p v-show="allLoaded" class="nodata">{{info}}</p>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ScoreTypesStateItem from '@/components/view/ScoreTypesStateItem'
  import {getOrderScoreListByType} from "../../http/getData";
  import {getLocalStorage} from "../../custom/mixin";
  import * as Constants from '../../custom/constants'

  const state_msg = [
    {
      type:"able",
      tradeStatus: "1",
      title:"可兑积分",
      subTitle:"获得积分",
      postUrl:"www.baiodu.com"
    },
    {
      type:"unpack",
      tradeStatus: "2",
      title: "未结积分",
      subTitle:"预计可获积分",
      postUrl:"www.baiodu.com"
    },
    {
      type:"recharge",
      title: "复购积分",
      subTitle:"获得积分",
      postUrl:"www.baiodu.com"
    },
    {
      type:"freeze",
      tradeStatus: "3",
      title: "冻结积分",
      subTitle:"预计可获积分",
      postUrl:"www.baiodu.com"
    }
  ]
  export default {
    name: "ScoreTypesState",
    data(){
      return {
        stateInfo:null,
        page: 1,
        limit: '10',
        allLoaded: false,
        loading: false,
        orderScoreList:[],
        score: 0,
        token:'',
        info:''
      }
    },
    methods: {
      goBack() {
        this.$router.back()
      },
      loadMore() {
        if(!this.allLoaded){
          this.loading = true;
          this.loadData()
        }
      },
      loadData(){
        getOrderScoreListByType({
          token: this.token
        },{
          limit: this.limit,
          page: this.page.toString(),
          tradeStatus: this.stateInfo.tradeStatus
        }).then(response=>{
          this.score = response.result.score
          this.loading = false;
          if (response.result.list.totalPage < response.result.list.currPage) {
            this.info = "~~所有明细都在这里了~~"
            this.allLoaded = true
            return
          }
          response.result.list.list.map(item=>{
            this.orderScoreList.push(item)
          })
          console.log(this.orderScoreList)
          this.page++
        }).catch(error=>{
          console.log(error);
          this.loading = false
          this.allLoaded = true
          // this.info = "~~数据加载异常，请稍后再试~~"
        })
      }
    },
    components:{
      ScoreTypesStateItem
    },
    mounted(){
      let tk = getLocalStorage(Constants.TOKEN)
      this.token = tk
      let {type} = this.$route.params
      if (type == state_msg[0].type) {
        this.stateInfo = state_msg[0]
      }else if(type == state_msg[1].type){
        this.stateInfo = state_msg[1]
      }else if(type == state_msg[2].type){
        this.stateInfo = state_msg[2]
      }else if(type == state_msg[3].type){
        this.stateInfo = state_msg[3]
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
  .list:last-child>.item::after{
    height: 0;
  }
  .nodata{
    padding:16px 0;
    text-align: center;
  }
</style>

