<template>
    <div class="container">
      <mt-header fixed title="我的订单">
        <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
      </mt-header>
      <div class="content">
        <div class="order-nav">
          <mt-navbar v-model="selected">
            <mt-tab-item id="1">全部</mt-tab-item>
            <mt-tab-item id="2">待付款</mt-tab-item>
            <mt-tab-item id="3">待发货</mt-tab-item>
            <mt-tab-item id="4">待收货</mt-tab-item>
            <mt-tab-item id="5">待评价</mt-tab-item>
          </mt-navbar>
        </div>
        <div class="order-list">
          <!-- tab-container -->
          <mt-tab-container v-model="selected">
            <mt-tab-container-item id="1">
              <OrderItem v-for="n in 2" class="item"></OrderItem>
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
              <OrderItem v-for="n in 5" class="item"></OrderItem>
            </mt-tab-container-item>
            <mt-tab-container-item id="3">
              <OrderItem v-for="n in 8" class="item"></OrderItem>
            </mt-tab-container-item>
            <mt-tab-container-item id="4">
              <OrderItem v-for="n in 1" class="item"></OrderItem>
            </mt-tab-container-item>
            <mt-tab-container-item id="5">
              <OrderItem v-for="n in 1" class="item"></OrderItem>
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
        }
      },
      data() {
        return {
          selected: '1'
        };
      },
      components:{
          OrderItem
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
