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
          <mt-tab-container v-model="type">
            <mt-tab-container-item id="all">
              <OrderItem v-for="n in 2" class="item"></OrderItem>
            </mt-tab-container-item>
            <mt-tab-container-item id="0">
              <OrderItem v-for="n in 5" class="item"></OrderItem>
            </mt-tab-container-item>
            <mt-tab-container-item id="1">
              <OrderItem v-for="n in 8" class="item"></OrderItem>
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
              <OrderItem v-for="n in 1" class="item"></OrderItem>
            </mt-tab-container-item>
            <mt-tab-container-item id="3">
              <OrderItem v-for="n in 2" class="item"></OrderItem>
            </mt-tab-container-item>
          </mt-tab-container>
        </div>
      </div>
    </div>
</template>

<script>
  import OrderItem from '@/components/view/OrderItem'

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
        switch (tab){
          case 'all':
            this.$router.replace('/ordercenter/all')
                break
          case '0':
            this.$router.replace('/ordercenter/0')
                break
          case '1':
            this.$router.replace('/ordercenter/1')
                break
          case '2':
            this.$router.replace('/ordercenter/2')
                break
          case '3':
            this.$router.replace('/ordercenter/3')
                break
        }
      }
    },
    data() {
      return {

        type: 'all'
      };
    },
    components: {
      OrderItem
    },
    mounted() {
      let {type} = this.$route.params
      this.type = type
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
  .mint-navbar{
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
    bottom: 3px;
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
  .order-list{
    background-color: #efefef;
  }
  .item{
    margin-top: 8px;
  }
  .item:first-child{
    margin-top: 0;
  }
</style>
