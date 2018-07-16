<template>
  <div class="container">
    <mt-header fixed title="兑换记录">
      <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
    </mt-header>
    <div class="content">
      <div class="banner">
        <img src="http://p90m90efq.bkt.clouddn.com/header-bg.jpg" alt="">
        <div class="amount">
          <p>已兑换金额 (元)</p>
          <p>{{score}}</p>
        </div>
      </div>
    </div>
    <div class="record-list">
      <div class="record-panel">
        <div class="record-tab">
            <p>兑换明细</p>
            <p>兑换金额（元）</p>
        </div>
        <div class="page-infinite">
          <div class="page-infinite-wrapper" ref="wrapper" >
            <div class="record-content" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50">
              <div class="list" v-for="item in records">
                <ScoreItem class="item" :exchangeItem="item" type="0"></ScoreItem>
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
  import ScoreItem from '@/components/view/ScoreItem'
  import {getScoreRecord} from "../../http/getData";
  import * as Constants from '../../custom/constants'
  import {getLocalStorage} from "../../custom/mixin";

  export default {
      name: "ScoreRecord",
    data(){
        return {
          page: 1,
          limit: '10',
          allLoaded: false,
          loading: false,
          score:0,
          records:[],
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
          getScoreRecord({
            token: this.token
          },{
            limit: this.limit,
            page: this.page.toString()
          }).then(response=>{
            this.score = response.result.scoreSum
            this.loading = false;
            if (response.result.list.totalPage < response.result.list.currPage) {
              // this.info = "~~数据已全部加载完毕了~~"
              this.allLoaded = true
              return
            }
            response.result.list.list.map(item=>{
              this.records.push(item)
            })
            this.page++
            console.log(response)
          }).catch(error=>{
            console.log(error);
            this.loading = false
            this.allLoaded = true
            // this.info = "~~数据加载异常，请稍后再试~~"
          })
        }
      },
      components:{
        ScoreItem
      },
      mounted(){
        let tk = getLocalStorage(Constants.TOKEN)
        this.token = tk
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
  /*.item:last-of-type:after{*/
    /*height: 0;*/
  /*}*/

  .page-infinite-loading {
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #bf54f9;
    text-align: center;
    padding: 8px 0;
  }

  .page-infinite-loading span {
    display: block;
    text-align: center;
    margin: 0 auto;
  }
  li{
    list-style: none;
  }
  .goods-item{
    position: relative;
  }
  .goods-item:after{
    position: absolute;
    bottom: 1px;
    height: 1px;
    background-color: #eee;
    width: 100%;
    content: '';
  }
  .goods-item:last-of-type:after{
    height: 0;
  }
  .nodata{
    padding:16px 0;
    text-align: center;
  }
</style>
