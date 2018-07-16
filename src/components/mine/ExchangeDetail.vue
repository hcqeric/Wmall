<template>
  <div class="container">
    <mt-header fixed title="兑换详情">
      <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
    </mt-header>
    <div class="content">
      <div class="trans">
        <img src="http://p90m90efq.bkt.clouddn.com/header-bg.jpg" alt="">
        <div class="amount">
          <p>兑换金额 (元)</p>
          <p>{{scoreAmount | moneyFormat("")}}</p>
        </div>
      </div>
    </div>
    <div class="ex-msg">
      <div class="ex-states">
        <el-steps direction="vertical" :active="1">
          <el-step>
            <div slot="title" class="title">
              <div class="time-state">
                <p>{{createTime | DateFormat("hh:mm:ss")}}</p>
                <p>提交兑换申请</p>
              </div>
              <p>{{createTime | DateFormat("yyyy-MM-dd")}}</p>
            </div>
          </el-step>
          <el-step>
            <div slot="title" class="title">
              <div class="time-state">
                <p>{{auditTime | DateFormat("hh:mm:ss")}}</p>
                <p v-if="detailObj.auditStatus == 0">审核中</p>
                <p v-if="detailObj.auditStatus == 1">审核通过</p>
                <p v-if="detailObj.auditStatus == 2">审核不通过 <span v-if="detailObj.remarks">（原因：{{detailObj.remarks}}）</span></p>
              </div>
              <p>{{auditTime | DateFormat("yyyy-MM-dd")}}</p>
            </div>
          </el-step>
          <el-step v-if="detailObj.status == 0 || detailObj.status == 2">
            <div slot="title" class="title" >
              <div class="time-state">
                <p>{{finalTime | DateFormat("hh:mm:ss")}}</p>
                <p v-if="detailObj.status == 0">兑换成功</p>
                <p v-if="detailObj.status == 2">兑换失败</p>
              </div>
              <p>{{finalTime | DateFormat("yyyy-MM-dd")}}</p>
            </div>
          </el-step>
        </el-steps>
      </div>
    </div>
  </div>
</template>

<script>
  import{getScoreDetail} from "../../http/getData";
  import {getLocalStorage} from "../../custom/mixin";
  import * as Constants from '../../custom/constants'

  export default {
    name: "ExchangeDetail",
    data(){
        return {
          createTime:'',
          auditTime:'',
          finalTime:'',
          scoreAmount:'',
          detailObj:null
        }
    },
      methods: {
        goBack() {
          this.$router.back()
        }
      },
      mounted(){
        let {id} = this.$route.params
        let tk = getLocalStorage(Constants.TOKEN)
        getScoreDetail({
          token: tk
        },{
          id: id
        }).then(response=>{
          console.log(response)
          this.detailObj = response.result
          this.createTime = response.result.createTime
          this.auditTime = response.result.auditTime
          this.finalTime = response.result.finalTime
          this.scoreAmount = response.result.scoreAmount
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
    display: flex;
    flex-direction: column;
  }
  .trans{
    position: relative;
  }
  .trans img{
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
  .ex-msg{
    position: relative;
    flex: 1;
    background-color: #fff;
  }
  .ex-states{
    position: absolute;
    box-sizing: border-box;
    width: 100%;
    background-color: #fff;
    padding: 36px 16px 0 16px;
    border-radius: 15px 15px 0 0;
    top: -30px;
    left: 0;
  }
  .ex-states .title{
    display: flex;
    justify-content: space-between;
  }
  .ex-states .title>p{
    color: #999;
    font-size:12px;
  }
  .ex-states .time-state p{
    padding: 4px 0;
  }
  .ex-states .time-state p:first-child{
    color: #000;
    font-size: 14px;
  }
  .ex-states .time-state p:last-child{
    color: #999;
    font-size: 12px;
  }
</style>
<style>
  .ex-states .el-step__head.is-success{
    color: #fff;
    border-color: #FF659F;
  }

  .ex-states .el-step__icon {
    width: 14px;
    height: 14px;
  }
  .ex-states .el-step__head.is-wait {
    color: #c0c4cc;
    border: none;
  }
  .ex-states .el-step:first-of-type .el-step__icon.is-text{
    color: #FF8C8A;
    background-color: #FF8C8A;
  }
  .ex-states .el-step:nth-of-type(2) .el-step__icon.is-text{
    color: #87BBFF;
    background-color: #87BBFF;
  }
  .ex-states .el-step.is-vertical .el-step__main {
    margin-top: -16px;
    padding-bottom: 40px;
  }

  .ex-states .el-step__icon.is-text {
    border: none;
    background: #c0c4cc;
  }
  .ex-states .el-step__title.is-process{
    font-weight: normal;
  }
  .ex-states .el-step.is-vertical .el-step__line {
    width: 2px;
    top: 2px;
    bottom: -2px;
    left: 6px;
  }
</style>
