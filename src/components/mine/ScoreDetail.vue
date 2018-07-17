<template>
  <div class="container">
    <mt-header fixed title="积分详情">
      <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
    </mt-header>
    <div class="content">
      <div class="banner">
        <img src="http://p90m90efq.bkt.clouddn.com/header-bg.jpg" alt="">
        <div class="amount">
          <p>订单积分</p>
          <p>+60</p>
        </div>
      </div>
    </div>
    <div class="record-list">
      <div class="record-panel">
        <div class="record-tab">
          <p>订单信息</p>
        </div>
        <div class="record-content">
          <div class="order-info">
            <div class="input-cell">
              <div class="cell-left">
                <p>订单金额：</p>
              </div>
              <div class="cell-right">
                <input type="text" :value="orderScoreDetail.payAmt" disabled>
              </div>
            </div>
            <div class="input-cell">
              <div class="cell-left">
                <p>购买人：</p>
              </div>
              <div class="cell-right">
                <input type="text" :value="orderScoreDetail.userName" disabled>
              </div>
            </div>
            <div class="input-cell">
              <div class="cell-left">
                <p>订单类型：</p>
              </div>
              <div class="cell-right">
                <input type="text" value="购买商品" disabled>
              </div>
            </div>
            <div class="input-cell">
              <div class="cell-left">
                <p>订单状态：</p>
              </div>
              <div class="cell-right">
                <input v-if="type == 1" type="text" value="确认中" disabled>
                <input v-if="type == 2" type="text" value="已确认" disabled>
              </div>
            </div>
            <div class="input-cell">
              <div class="cell-left">
                <p>下单时间：</p>
              </div>
              <div class="cell-right">
                <input type="text" :value="orderScoreDetail.createTime" disabled>
              </div>
            </div><div class="input-cell">
            <div class="cell-left">
              <p>确认时间：</p>
            </div>
            <div class="cell-right">
              <input type="text" :value="orderScoreDetail.updateTime" disabled>
            </div>
          </div><div class="input-cell">
            <div class="cell-left">
              <p>订单编号：</p>
            </div>
            <div class="cell-right">
              <input type="text" :value="orderScoreDetail.orderNum" disabled>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ScoreItem from '@/components/view/ScoreItem'
  import {mapGetters} from 'vuex'
  export default {
    name: "ScoreRecord",
    data(){
      return {
        type:''
      }
    },
    computed:{
      ...mapGetters({
        orderScoreDetail:'orderScoreDetail'
      })
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
      let{type} = this.$route.params
      this.type = type
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
    padding: 0 16px;
  }
  .record-tab p{
    flex: 1;
    font-size: 14px;
    color: #75515A;
    font-weight: 700;
  }
  .record-content{
    padding: 0 16px;
  }

  .input-cell{
    min-height: 48px;
    width: 100%;
    display: flex;
    align-items: center;
    position: relative;
  }
  .input-cell:after{
    position: absolute;
    bottom: 0;
    left: 0;
    content: '';
    width: 100%;
    height: 1px;
    background-color:  rgba(239,239,239,0.9);
  }
  .input-cell:last-of-type:after{
    height: 0;
  }
  .cell-left{
    display: flex;
    align-items: center;
  }
  .cell-left i{
    font-size: 26px;
    margin-right: 8px;
  }
  .cell-left p{
    width: 100px;
    font-size: 14px;
    color: #000;
  }
  .cell-right{
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: space-between;
  }
  .cell-right input{
    border: none;
    outline: none;
    padding: 4px;
    flex: 1;
    margin-right: 8px;
    height: 26px;
    font-size: 14px;
    color: #999;
  }
  input[disabled]{
    background-color: transparent;
  }
</style>
