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
            <div class="page-infinite-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
              <ul class="page-infinite-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50">
                <li v-for="item in orderList" class="page-infinite-listitem">
                  <OrderItem :orderItem="item" class="oitem"  @orderItem="getOrderItem" />
                </li>
              </ul>
              <p v-show="loading" class="page-infinite-loading">
                <mt-spinner type="fading-circle"></mt-spinner>
                加载中...
              </p>
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
  import {getOrderList} from "../../http/getData";
  import {getLocalStorage} from "../../custom/mixin";
  import * as Constants from '../../custom/constants'

  export default {
    name: "OrderCenter",
    methods: {
      goBack() {
        this.$router.back()
      },
      changeTab(tab) {
        if(this.type == tab){
          return
        }
        this.type = tab
        this.page = 0
        this.orderList = []
        let datas = {
          page: this.page.toString(),
          limit: this.limit
        }
        switch (tab) {
          case 'all':
            this.$router.replace('/ordercenter/all')
            this.loadData(datas)
            break
          case '0':
            this.$router.replace('/ordercenter/0')
                this.$set(datas,'tradeStatus', this.type)
                this.loadData(datas)
                break
          case '1':
                this.$router.replace('/ordercenter/1')
                this.$set(datas,'tradeStatus', this.type)
                this.loadData(datas)
                break
          case '2':
                this.$router.replace('/ordercenter/2')
                this.$set(datas,'tradeStatus', this.type)
                this.loadData(datas)
                break
          case '3':
                this.$router.replace('/ordercenter/3')
                this.$set(datas,'tradeStatus', this.type)
                this.loadData(datas)
                break
        }
      },
      loadData(datas){
        getOrderList({
          token: this.tk
        },datas).then(response=>{
          console.log(response)
          this.allLoaded = true
          this.loading = false

          if(response.result.list != undefined){
            response.result.list.map(item=>{
              this.orderList.push(item)
            })
          }
          this.page++
        })
      },
      loadMore() {
        // this.allLoaded = true;
        // this.loading = true;

        // setTimeout(() => {
        //   let last = this.list[this.list.length - 1];
        //   for (let i = 1; i <= 5; i++) {
        //     this.list.push(last + i);
        //   }
        //   this.loading = false;
        // }, 2500);
      },
      getOrderItem(item){
        this.orderList.forEach(((orderItem,index)=>{
          if (orderItem.id == item.id) {
            this.orderList.splice(index)
          }
        }))
      }
    },
    computed:{
      isNoList(){
        if (this.orderList.length > 0){
          console.log("aaaaa")
          this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
          return false
        }else{
          console.log("sdssdsdsdds")
          return true
        }
      }
    },
    data() {
      return {
        wrapperHeight:0,
        showNoList: false,
        allLoaded: false,
        loading:false,
        type: '',
        tk:'',
        page: 0,
        limit: '10',
        tradeStatus:'',
        orderList:[]
      };
    },
    components: {
      OrderItem
    },
    mounted() {

      let tk = getLocalStorage(Constants.TOKEN)
      console.log(tk)
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

  .order-nav{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .order-nav div{
    flex: 1;
    background-color: #FFEDF9;
    text-align: center;
    padding: 16px;
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
    bottom: 8px;
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
</style>
