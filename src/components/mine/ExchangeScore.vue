<template>
  <div class="container">
    <mt-header fixed title="我要兑换">
      <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
    </mt-header>
    <div class="content">
      <div class="trans">
        <img src="http://p90m90efq.bkt.clouddn.com/header-bg.jpg" alt="">
        <div class="trans-content" v-if="cardNo">
          <p>兑换账户：</p>
          <p>{{cardNo}}</p>
        </div>
      </div>
      <div class="trans-detail">
        <div class="card">
          <CardView countTitle="兑换积分" totalTitle="可兑积分" @changeBonus="getBonus" :scores="ableScore.toString()"></CardView>
          <div class="exchange-rules">
            <p>10积分可以兑换人民币1元，单笔兑换最高限2万分，积分低于500分不可兑换。</p>
            <p>服务费：20分/笔。</p>
          </div>
        </div>
      </div>
    </div>
    <div class="goto">
      <button @click="turnToExchangeStates">立即兑换</button>
    </div>
  </div>
</template>

<script>
  import CardView from '@/components/view/CardView'
  import {convertBounds,getBonus} from "../../http/getData";
  import {getLocalStorage} from "../../custom/mixin";
  import * as Constants from '../../custom/constants'
  import { MessageBox } from 'mint-ui';

  export default {
    name: "ExchangeScore",
    data(){
      return {
        token: '',
        score:'',
        ableScore: 0,
        cardNo: ''
      }
    },
    methods: {
      getBonus(bonus){
        this.score = bonus
      },
      goBack() {
        this.$router.back()
      },
      turnToExchangeStates(){
        convertBounds({
          token: this.token
        },{
          score: this.score
        }).then(response=>{
          console.log(response)
          this.$router.push('/exchangestates')
        }).catch(error=>{
          if (error.code == 10000){
            console.log(error.msg)
            MessageBox({
              title: '添加银行卡',
              message: '您还没有添加银行卡，是否前往添加',
              showCancelButton: true,
              confirmButtonText:'立即前往',
              cancelButtonText:'稍后添加'
            }).then(action=>{
              if (action === 'confirm'){
                this.$router.push('/addcredit')
              }
            }).catch(error=>{});
          }
        })
      }
    },
    components: {
      CardView
    },
    mounted(){
      let tk = getLocalStorage(Constants.TOKEN)
      this.token = tk
      getBonus({token: tk}).then(response=>{
        console.log(response)
        this.ableScore = response.result.scoreValid
        this.cardNo = response.result.cardNo
        console.log(this.cardNo)
      })
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
    padding:8px  16px;
    box-sizing: border-box;
  }
  .trans-content p{
    font-size: 20px;
    padding: 8px 0;
  }
  .trans-content p:first-child{

  }
  .trans-content p:last-child{
    text-align: center;

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
  }
  .goto{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    margin-bottom: 100px;
    text-align: center;
  }
  .goto button{
    border: none;
    height: 35px;
    line-height: 35px;
    border-radius: 17px;
    background-color: transparent;
    background-image: url("../../assets/img/button-bg.png");
    background-repeat: no-repeat;
    background-size: contain;
    outline: none;
    width: 290px;
    text-align: center;
    color: #fff;
    margin: 0 auto;
  }
  .exchange-rules{
    margin-top: 8px;
  }
  .exchange-rules p{
    font-size: 12px;
    padding: 4px 0;
  }
</style>
