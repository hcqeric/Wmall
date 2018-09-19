<template>
  <div class="container">
    <mt-header fixed title="积分转增">
      <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
    </mt-header>
    <div class="content">
      <div class="trans">
        <img src="http://p90m90efq.bkt.clouddn.com/header-bg.jpg" alt="">
        <div class="trans-content">
          <div class="item">
            <div>受让人手机：</div>
            <div class="info">
              <input type="text" v-model="mobile">
              <button @click="getUserInfo">查询</button>
            </div>
          </div>
          <div class="item" v-if="userId">
            <p>受让人名称：</p>
            <p>{{nickname}}</p>
          </div>
        </div>
      </div>
      <div class="trans-detail">
        <div class="card">
          <el-card shadow="always">
            <div class="count">
              <div class="trans-count">
                <p>赠送积分:</p>
                <input type="text"   v-model="_score" min="0" >
              </div>
              <img src="http://p90m90efq.bkt.clouddn.com/money.png" alt="">
            </div>
            <div class="score-total">
              <p>可赠积分：<span>{{ableScore}}</span></p>
            </div>
          </el-card>
        <!--<CardView countTitle="赠送积分" totalTitle="可赠积分" @changeBonus="getBonus" :scores="ableScore.toString()"></CardView>-->
        </div>
      </div>
      <div class="goto" v-if="showBtn">
        <button @click="turnToExchangeSuccess">立即赠送</button>
      </div>
    </div>
  </div>
</template>

<script>
  import CardView from '@/components/view/CardView'
  import {getLocalStorage} from "../../custom/mixin";
  import * as Constants from '../../custom/constants'
  import {Toast} from 'mint-ui'
  import {transBonus, getMobileUser} from "../../http/getData";

  export default {
    name: "ScoreTrans",
    data(){
      return {
        mobile:'',
        score:'',
        token:'',
        userId:'',
        nickname:'',
        ableScore: 0,
        showBtn:true,
        clientHeight: 0
      }
    },
    methods: {
      getBonus(bonus){
        console.log(bonus)
        this.score = bonus
      },
      getUserInfo(){
        if (this.mobile === '') {
          Toast({
            message: '手机号不能为空',
            position: 'middle',
            duration: 1000})
          return
        } else if(!(/^1(3|4|5|7|8)\d{9}$/.test(this.mobile))) {
          Toast('手机号码格式不正确')
          return
        }
        getMobileUser({
          token:this.token
        },{
          mobile: this.mobile
        }).then(response=>{
          if (response.result == ''){
            Toast({
              message: "该用户不存在"
            })
          }
          this.userId = response.result.userId
          this.nickname = response.result.nickname
        })
      },
      goBack() {
        this.$router.back()
      },
      turnToExchangeSuccess(){
        if(this.userId == ''){
          Toast({
            message:"请填写转赠人"
          })
          return
        }
        if (this.score > this.ableScore){
          Toast({
              message:"您的可转积分不足"
          })
          return
        }else if(this.score == ''){
          Toast({
            message:"请输入转增金额"
          })
          return
        }

        transBonus({
          token:this.token
        },{
          userId: this.userId,
          score: this.score
        }).then(response=>{
          console.log(response)
          Toast({
            message:"转赠成功"
          })
          this.$router.push('/exchangesucc')
        })

      }
    },
    computed:{
      _score: {
        set: function(value) {
          this.score = value;
        },
        get: function() {
          return this.score.replace(/[^0-9]+/g,'')
        }
      }
    },
    components:{
      CardView
    },
    mounted(){
      let tk = getLocalStorage(Constants.TOKEN)
      this.token = tk
      let ableScore = this.$store.state.user.ableScore
      this.ableScore =ableScore

      this.clientHeight = document.documentElement.clientHeight
      window.onresize = () => {
        if (document.documentElement.clientHeight < this.clientHeight) {
          this.showBtn = false
        } else {
          this.showBtn = true
        }
      }
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
  .item .info input{
    flex: 1;
    box-sizing: border-box;
    height: 28px;
    padding: 4px;
    border-radius: 3px;
    background-color: transparent;
    outline: none;
    border: 1px solid #fff;
    color: #fff;
    margin-right: 16px;
    width: 100%;
  }
  .item .info button{
    outline: none;
    background-color:transparent;
    background-image: url("../../assets/img/bg-white.png");
    border-radius: 11px;
    font-size: 12px;
    height: 22px;
    width: 50px;
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


  .count{
    display: flex;
    justify-content: space-between;
  }
  .count img{
    height: 80px;
  }
  .trans-count{
    color: #000;
  }
  .trans-count p{
    font-size: 14px;
  }
  .trans-count input{
    outline: none;
    border: none;
    border-bottom: 1px solid rgba(153,153,153,0.2);
    width: 100px;
    padding: 8px 0;
    font-size: 26px;
  }
  .score-total{
    margin-top: 40px;
  }
  .score-total p{
    font-size: 14px;
  }
  .score-total p span{
    color: #FF659B;
  }
</style>
