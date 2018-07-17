<template>
  <div class="container">
    <mt-header fixed title="物流跟踪">
      <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
    </mt-header>
    <div class="content">
      <div class="logistics">
        <div class="logistics-info">
          <div class="express" v-if="exp">
            <p>快递公司： <span>{{exp.trafficName}}</span></p>
            <p>运单编号： <span>{{exp.trafficNum}}</span></p>
          </div>
          <p v-if="msg">{{msg}}</p>
        </div>
        <div class="tracing" v-if="exp">
          <div>
            <el-steps direction="vertical" finish-status="success" process-status="wait" :active="1">
              <el-step v-for="(item,index) in expList" :key="index">
                <div slot="description" >
                  <p>{{item.context}}</p>
                  <p>{{item.ftime}}</p>
                </div>
              </el-step>
            </el-steps>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import * as Constants from '../../custom/constants'
  import { getLocalStorage } from "../../custom/mixin";
  import {getExpInfo} from "../../http/getData";

  export default {
    name: "LogisticsTracing",
    data(){
      return {
        exp:null,
        expList:[],
        msg:''
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
      getExpInfo({
        token: tk
      },{
        id: id
      }).then(response=>{
        this.exp = response.result
        this.expList = response.result.exp
      }).catch(error=>{
        this.msg = error.msg
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
  .logistics{
    display: flex;
    flex-direction: column;
    height: 100%;

  }
  .logistics-info{
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 16px;
    background-color: #fff;
  }
  .logistics-info img{
    height: 30px;
    width: 30px;
    margin-right: 10px;
  }

  .express p{
    padding: 8px 0;
    font-size: 14px;
    color: #999;
  }
  .express span{
    color: #000;
  }
  .tracing{
    margin-top: 8px;
    background-color: #fff;
    padding: 16px;
  }
</style>
<style>
  .tracing .el-step__head.is-success{
    color: #fff;
    border-color: #FF659F;
  }

  .tracing .el-step__icon {
    width: 14px;
    height: 14px;
  }
  .tracing .el-step__head.is-wait {
    color: #c0c4cc;
    border: none;
  }
  .tracing .el-step__icon.is-text {
    border: none;
    background: #c0c4cc;
  }
  .tracing .el-step:first-of-type .el-step__icon.is-text {
    border: 2px solid #FF659F;
    background-color: #FF659F;
  }
  .tracing .el-step:last-of-type .el-step__icon.is-text {
    border: 2px solid #FF659F;
    background-color: #FF659F;
  }
  .tracing .el-step.is-vertical .el-step__line {
    width: 2px;
    top: 2px;
    bottom: -2px;
    left: 6px;
  }
  .tracing .el-step:last-of-type .el-step__icon.is-text>div{
    color:  #FF659F;
  }
  .tracing .el-step__description.is-success {
    color: #000;
  }
  .tracing .el-step__description{
    border-bottom: 1px solid rgba(239,239,239,0.9);
    padding-bottom: 6px;
  }
  .tracing .el-step:last-of-type .el-step__description {
    border-bottom: none;
  }
</style>
