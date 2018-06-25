<template>
  <div class="container">
    <mt-header fixed title="积分转赠">
      <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
    </mt-header>
    <div class="content">
      <div class="trans">
        <img src="http://p90m90efq.bkt.clouddn.com/header-bg.jpg" alt="">
        <div class="trans-content">
          <div class="item">
            <p>受让人手机：</p>
            <div class="info">
              <input type="text">
              <button>查询</button>
            </div>
          </div>
          <div class="item">
            <p>受让人名称：</p>
            <p>张三</p>
          </div>
        </div>
      </div>
      <div class="trans-detail">
        <div class="card">
        <CardView countTitle="赠送积分" totalTitle="可赠积分"></CardView>
        </div>
      </div>
      <div class="goto">
        <button @click="turnToExchangeSuccess">立即赠送</button>
      </div>
    </div>
  </div>
</template>

<script>
  import CardView from '@/components/view/CardView'
  export default {
    name: "ScoreTrans",
    methods: {
      goBack() {
        this.$router.back()
      },
      turnToExchangeSuccess(){
        this.$router.push('/exchangesucc')
      }
    },
    components:{
      CardView
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
  }
  .mint-header{
    background-color: #000;
    height: 48px;
    z-index: 9999;
  }
  .content{
    margin-top: 48px;
  }
  .trans{
    position: relative;
  }
  .trans img{
    width: 100%;
  }
  .trans-content{
    position: absolute;
    top: 0;
    left: 0;
    color: #fff;
    width: 100%;
  }
  .trans-content .item{
    display: flex;
    flex-direction: row;
    padding: 8px 16px;
    font-size: 14px;
    align-items: center;
  }
  .trans-content .item .info{
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .trans-content .item p:first-child{
    width: 100px;
  }
  .item .info input{
    box-sizing: border-box;
    height: 28px;
    padding: 4px;
    border-radius: 3px;
    background-color: transparent;
    outline: none;
    border: 1px solid #fff;
  }
  .item .info button{
    outline: none;
    background-color:transparent;
    background-image: url("../../assets/img/bg-white.png");
    padding: 0 14px;
    border-radius: 11px;
    font-size: 12px;
    height: 22px;
    line-height: 20px;
    color: #FF659F;
    border: 1px solid #fff;
  }
  .trans-detail{
    position: relative;
    margin: 0 16px;
  }
  .card{
    position: absolute;
    top: -38px;
    left: 0;
    width: 100%;
    z-index: 9999;
  }
  .goto{
    position: fixed;
    bottom: 0;
    left: 0;
    margin-bottom: 100px;
    width: 100%;
    text-align: center;
  }
  .goto button{
    border: none;
    height: 44px;
    line-height: 44px;
    border-radius: 22px;
    background-color: transparent;
    background-image: url("../../assets/img/color-pink.png");
    width: 280px;
    text-align: center;
    font-size: 14px;
    color: #fff;
    margin: 0 auto;
  }
</style>
