<template>
    <div class="container">
      <mt-header fixed title="我的订单">
        <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
      </mt-header>
      <div class="content">
        <div class="order-nav">
          <div :class="type=='all' ? 'is-selected' : ''" @click="changeTab('all')">全部</div>
          <div :class="type==0 ? 'is-selected' : ''" @click="changeTab('0')">待付款</div>
          <div :class="type==1 ? 'is-selected' : ''" @click="changeTab('1')">待发货</div>
          <div :class="type==2 ? 'is-selected' : ''" @click="changeTab('2')">待收货</div>
          <div :class="type==3 ? 'is-selected' : ''" @click="changeTab('3')">待评价</div>
        </div>
        <div class="order-list">
          <div class="page-infinite">
            <div class="page-infinite-wrapper" ref="wrapper">
              <ul class="page-infinite-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50">
                <li v-for="item in orderList" class="page-infinite-listitem">
                  <div v-if="item.tradeStatus < 3 ">
                    <OrderItem :orderItem="item" class="oitem"  @orderItem="getOrderItem" />
                  </div>
                  <div v-else-if="item.tradeStatus == 3" v-for="(goodsItem,index) in item.orderDetailList">
                    <OrderEvaluationItem  :goodsIndex="index" class="oitem" :orderItem="item"></OrderEvaluationItem>
                  </div>
                </li>
              </ul>
              <p v-show="loading" class="page-infinite-loading">
                <mt-spinner type="fading-circle"></mt-spinner>
                加载中...
              </p>
              <p v-show="allLoaded" class="nodata">{{info}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="nolist" v-if="isNoList">
        <img src="../../assets/img/nolist.png" />
        <p>您还没有相关订单</p>
      </div>
    </div>
</template>

<script>
  import OrderItem from '@/components/view/OrderItem'
  import OrderEvaluationItem from '@/components/view/OrderEvaluationItem'
  import {getOrderList} from "../../http/getData";
  import {getLocalStorage} from "../../custom/mixin";
  import * as Constants from '../../custom/constants'

  export default {
    name: "OrderCenter",
    data() {
      return {
        wrapperHeight:0,
        showNoList: false,
        loading: false,
        allLoaded: true,
        type: '',
        tk:'',
        page: 1,
        limit: '10',
        tradeStatus:'',
        orderList:[],
        radio:1,
        dialogShow:false,
        isNoList: false,
        datas:{},
        info:''
      }
    },
    methods: {
      gotoPay(){

      },
      goBack() {
        this.$router.back()
      },
      changeTab(tab) {
        if(this.type == tab){
          return
        }
        this.isNoList = false
        this.type = tab
        this.page = 1
        this.orderList = []
        this.loading = true
        let datas = {
          page: this.page.toString(),
          limit: this.limit
        }
        switch (tab) {
          case 'all':
                this.$router.replace('/ordercenter/all')
                this.datas = datas
                this.loadData(datas)
                break
          case '0':
                this.$router.replace('/ordercenter/0')
                this.$set(datas,'tradeStatus', this.type)
                this.datas = datas
                this.loadData(datas)
                break
          case '1':
                this.$router.replace('/ordercenter/1')
                this.$set(datas,'tradeStatus', this.type)
                this.datas = datas
                this.loadData(datas)
                break
          case '2':
                this.$router.replace('/ordercenter/2')
                this.$set(datas,'tradeStatus', this.type)
                this.datas = datas
                this.loadData(datas)
                break
          case '3':
                this.$router.replace('/ordercenter/3')
                this.$set(datas,'tradeStatus', this.type)
                this.datas = datas
                this.loadData(datas)
                break
        }
      },
      loadData(datas){
        this.info = ''
        getOrderList({
          token: this.tk
        },datas).then(response=>{
          this.loading = false;
          if(response.result.currPage == 1 && response.result.totalPage < response.result.currPage) {
            this.isNoList = true
            this.allLoaded = true
            return
          }
          else if (response.result.totalPage < response.result.currPage) {
            this.info = "~~数据已全部加载完毕了~~"
            this.allLoaded = true
            return
          } else {
            this.allLoaded = false
          }
          response.result.list.map(item => {
            this.orderList.push(item)
          })
          this.page++
          this.datas.page = this.page.toString()
        }).catch(error=>{
          this.loading = false
          this.allLoaded = true
          this.info = "~~数据加载异常，请稍后再试~~"
        })
      },
      loadMore() {
        if (!this.allLoaded) {
          this.loading = true;
          this.loadData(this.datas)
        }
      },
      getOrderItem(item){
        this.orderList.forEach(((orderItem,index)=>{
          if (orderItem.id == item.id) {
            this.orderList.splice(index, 1)
          }
        }))
      }
    },
    components: {
      OrderItem,
      OrderEvaluationItem
    },
    mounted() {
      let tk = getLocalStorage(Constants.TOKEN)
      this.tk = tk
      let {type} = this.$route.params
      this.changeTab(type)
    }
  }
</script>

<style scoped>
  .container {
    position: absolute;
    left: 0;
    top: 0;
    min-height: 100vh;
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
    background: #efefef;
  }

  .order-nav{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 48px;
    background-color: #FFEDF9;
  }
  .order-nav div{
    flex: 1;
    background-color: #FFEDF9;
    text-align: center;
    text-shadow: 0px 0px 1px #FF659F;
  }
  .order-nav div.is-selected{
    color: #bf54f9;
    font-weight: bold;
    border: none;
    position: relative;
    text-shadow: none;
  }

  .order-nav div.is-selected:after{
    position: absolute;
    content: '';
    bottom: -8px;
    left: 50%;
    margin-left: -20px;
    height: 3px;
    width: 40px;
    background-color: #bf54f9;
  }

  .order-list{
    background-color: #efefef;
  }

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
  .page-infinite-listitem{
    margin-top: 8px;
  }
  .page-infinite-listitem:first-of-type{
    margin-top: 0;
  }

  .nolist{
    position: fixed;
    top:96px;
    width: 100%;
    bottom:0;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .nolist img{
    width: 80px;
  }
  .nolist p{
    margin-top: 20px;
    text-align: center;
    font-size: 20px;
    color: #999;
  }
  .nodata{
    padding:16px 0;
    text-align: center;
  }
  .page-infinite-list{
    background: #efefef;
  }
</style>
