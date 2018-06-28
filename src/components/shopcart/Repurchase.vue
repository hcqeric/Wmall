<template>
  <div class="container">
    <mt-header fixed title="复购中心">
      <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
    </mt-header>
    <div class="content">
      <div class="banner">
        <img src="../../assets/img/pengzi.png" alt="">
      </div>
    </div>
    <div class="goods-list">
      <GoodsItem v-for="n in 5" class="item"></GoodsItem>
    </div>
    <div class="confirm">
      <p>合计: ¥{{totalAmount}} <span>(免运费)</span></p>
      <button @click="turnToConfirmOrder">去结算</button>
    </div>
  </div>
</template>

<script>
  import GoodsItem from '@/components/view/GoodsItem'
    export default {
        name: "Repurchase",
      data() {
        return {
          totalAmount: 1234
        }
      },
      methods: {
        goBack() {
          this.$router.back()
        },
        turnToConfirmOrder(){
          this.$router.push('/payment')
        }
      },
      components:{
          GoodsItem
      }
    }
</script>

<style scoped>
  .container{
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: #efefef;
    display: flex;
    flex-direction: column;
  }
  .mint-header{
    background-color: #000;
    height: 48px;
    z-index: 9999;
  }
  .content{
    margin-top: 48px;
  }
  .banner img{
    width: 100%;
  }
  .goods-list{
    background-color: #efefef;
    flex: 1;
    box-sizing: border-box;
    width: 100%;
    padding: 8px;
    margin-bottom: 60px;
  }
  .item:nth-of-type(even){
    margin: 8px;
    float: right;
  }
  .item:nth-of-type(odd){
    margin: 8px;
    float: left;
  }

  .confirm{
    height: 68px;
    width: 100%;
    line-height: 68px;
    position: fixed;
    bottom: 0;
    background-color: #fff;
    border-top: 1px solid #efefef;
    display: flex;
    justify-content: space-between;
    z-index: 99;
  }
  .confirm p{
    font-size: 18px;
    color: #c053fa;
    margin-left: 30px;
  }
  .confirm p span{
    color: #999;
    font-size: 14px;
  }
  .confirm button{
    border: none;
    background-color:  #1ABC9C;
    background-image: url(../../assets/img/color-purpose.png);
    outline-color: transparent;
    color: #fff;
    padding: 8px 40px;
    font-size: 18px;
  }
</style>
