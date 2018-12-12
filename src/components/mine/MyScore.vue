<template>
  <div class="container">
    <mt-header fixed title="我的积分">
      <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
    </mt-header>
    <div class="content" v-if="scores">
      <Notification title="亲，这是兑换积分须知~" @click.native="toSelectTemplate"></Notification>
      <div class="scores">
        <img src="../../assets/img/score.jpg" alt="">
        <div class="score">
          <p>可兑换积分</p>
          <p>{{scores.scoreValid}}</p>
        </div>
        <button @click="turnToScoreRecord">兑换记录</button>
      </div>
      <div class="score-items">
        <div class="score-item">
          <img src="../../assets/img/jif1.png" alt="">
          <div class="content-total">
            <p>我的积分</p>
            <p>{{scores.scoreSum}}</p>
            <i class="el-icon-arrow-right"></i>
          </div>
        </div>
        <router-link class="score-item" to="/score/able">
          <img src="../../assets/img/duihuajif.png" alt="">
          <div class="content-score" >
            <p>可兑积分</p>
            <p>{{scores.scoreValid}}</p>
            <i class="el-icon-arrow-right"></i>
          </div>
        </router-link>
        <router-link class="score-item" to="/score/unpack">
          <img src="../../assets/img/weijjif.png" alt="">
          <div class="content-score" >
            <p>未结积分</p>
            <p>{{scores.scoreUnsettled}}</p>
            <i class="el-icon-arrow-right"></i>
          </div>
        </router-link>
        <router-link class="score-item" to="/score/freeze">
          <img src="../../assets/img/score-freeze.jpg" alt="">
          <div class="content-score" >
            <p>冻结积分</p>
            <p>{{scores.scoreFreeze}}</p>
            <i class="el-icon-arrow-right"></i>
          </div>
        </router-link>
        <router-link class="score-item" to="/account">
        <img src="../../assets/img/fugoujif.png" alt="">
        <div class="content-score">
          <p>我的账户</p>
          <p></p>
          <i class="el-icon-arrow-right"></i>
        </div>
      </router-link>
      </div>
      <div class="buttons">
        <button @click="turnToScoreTrans">积分转赠</button>
        <button @click="turnToExchangeScore">我要兑换</button>
      </div>
    </div>
  </div>
</template>

<script>
  import Notification from '@/components/view/Notification'
  import {getBonus} from "../../http/getData";
  import {mapGetters,mapActions} from 'vuex'
  import {getLocalStorage,setLocalStorage} from "../../custom/mixin"
  import * as Constants from '../../custom/constants'
  export default {
    name: "MyScore",
    data(){
      return {
        scores:null,
        isSetPass:false
      }
    },
    computed:{
      ...mapGetters({
        payPass: 'setPayPass'
      })
    },
    methods: {
      ...mapActions({
        setPayPass:'setPayPass',
        setAbleScore:'setAbleScore',
        setUnpackScore: 'setUnpackScore',
        setRechargeScore:'setRechargeScore'
      }),
      goBack() {
        this.$router.back()
      },
      turnToScoreTrans(){
        this.$router.push('/scoretrans')
      },
      turnToExchangeScore(){
        if(this.isSetPass){
          this.setPayPass(true)
          this.$router.push('/exchangescore')
        }else{
          this.setPayPass(false)
          setLocalStorage(Constants.SETUPPAYPASS, 1)
          this.$router.push('/setpaypass')
        }
      },
      turnToScoreRecord(){
        this.$router.push('/scorerecord')
      },
      toSelectTemplate(){
        this.$router.push('/template/0')
      }
    },
    mounted(){
      let tk = getLocalStorage(Constants.TOKEN)
      getBonus({
        token: tk
      }).then(response=>{
        this.scores = response.result
        if (response.result.boolean == 0) {
          this.isSetPass = true
        }else{
          this.isSetPass = false
        }
        this.setAbleScore(response.result.scoreValid)
        this.setUnpackScore(response.result.scoreUnsettled)
        this.setRechargeScore(response.result.scoreRepeat)
      })
    },
    components:{
      Notification
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
    background-color: #fff;
  }
  .mint-header{
    background-color: #000;
    height: 48px;
    z-index: 9999;
  }
  .content{
    margin-top: 48px;
  }
  .scores{
    position: relative
  }
  .scores button{
    position: absolute;
    right: 0px;
    bottom: 20px;
    border: none;
    outline: none;
    background-color:transparent;
    background-image: url("../../assets/img/bg-white.png");
    border-radius: 11px 0 0 11px;
    padding: 0 8px;
    font-size: 12px;
    height: 22px;
    line-height: 22px;
    color: #b535fa;
  }
  .scores img{
    width: 100%;
  }
  .score{
    position: absolute;
    top: 55px;
    left: 55px;
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .score p:first-child{
    font-size: 26px;
  }
  .score p:last-child{
    margin-top: 8px;
    font-size: 22px;
  }
  .score-items{
    display: flex;
    flex-direction: column;
    padding: 8px 16px;
  }
  .score-item{
    display: flex;
    flex-direction: row;
    padding: 8px 0;
    border-bottom: 1px solid #eee;
    align-items: center;

  }
  .score-item img{
    width: 22px;
  }
  .score-items .score-item:last-of-type{
    border-bottom: none;
  }
  .content-total{
    display: flex;
    flex: 1;
    justify-content: space-between;
    margin-left: 8px;
  }
  .content-total p{
    font-size: 14px;
    color: #000;
  }
  .content-total i{
    color: #fff;
  }
  .content-score{
    display: flex;
    flex: 1;
    justify-content: space-between;
    align-items: center;
    color: #000;
    font-size: 14px;
    margin-left: 8px;
  }
  .content-score p:last-of-type{
    color: #999;
  }
  .content-score i{
    color: #999;
    font-weight: 500;
  }
  .buttons{
    margin: 6vh 8vw 0 8vw;
    text-align: center;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .buttons button{
    border: none;
    outline: none;
    background-color: transparent;
    background-image: url("../../assets/img/bg-jianbian.png");
    background-repeat: no-repeat;
    background-size: contain;
    height: 35px;
    line-height: 35px;
    border-radius: 17px;
    text-align: center;
    color: #fff;
    width: 115px;
    font-size: 14px;
  }

  .buttons button:first-child{
    margin-right: 20px;
    background-image: none;
    border: 1px solid #b535fa;
    color: #b535fa;
  }
</style>
