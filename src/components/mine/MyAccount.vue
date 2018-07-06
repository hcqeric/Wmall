<template>
    <div class="container">
      <mt-header fixed title="我的账户">
        <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
        <div slot="right" >
          <el-popover
            placement="bottom"
            trigger="click"
            >
            <div class="add">
              <p @click="turnToAddCreditCard"><i class="iconfont icon-iconset0291"></i>添加银行卡</p>
              <p @click="turnToAddAliPay"><i class="iconfont icon-iconfontrectangle390"></i>添加支付宝</p>
            </div>
            <el-button slot="reference" type="text" class="btn-add">添加</el-button>
          </el-popover>
        </div>
      </mt-header>
      <div class="content">
        <div class="account-list" v-if="myAccount">
          <div class="input-cell" v-if="myAccount.cardNo">
            <div class="cell-left">
              <i class="iconfont icon-iconset0291"></i>
              <p>银行卡号</p>
            </div>
            <div class="cell-right">
              <input type="text" :value="myAccount.cardNo" disabled>
              <i class="iconfont icon-lajixiang" @click="deleteBank"></i>
            </div>
          </div>
          <div class="input-cell" v-if="myAccount.aliPay">
            <div class="cell-left">
              <i class="iconfont icon-iconfontrectangle390"></i>
              <p>支付宝号</p>
            </div>
            <div class="cell-right">
              <input type="text" :value="myAccount.aliPay" disabled>
              <i class="iconfont icon-lajixiang" @click="deleteAlipay"></i>
            </div>
          </div>
        </div>
      </div>
      <div v-if="showText" class="no-account">您尚未添加账户，请点击“<span>添加</span>”按钮添加您的账户</div>
    </div>
</template>

<script>
  import { MessageBox } from 'mint-ui';
  import {getAccountList,deleteAccount} from "../../http/getData"
  import {isEmptyObject,getLocalStorage} from "../../custom/mixin"
  import * as Constants from '../../custom/constants'
    export default {
        name: "MyAccount",
      data(){
          return {
            myAccount:{},
            showText: false
          }
      },
      methods: {
        goBack() {
          this.$router.back()
        },
        turnToAddCreditCard(){
          this.$router.push('/addcredit')
        },
        turnToAddAliPay(){
          this.$router.push('/addalipay')
        },
        deleteBank(){
          MessageBox.confirm('确定要删除银行卡账户吗?').then(action => {
            if(action==="confirm"){
              let tk = getLocalStorage(Constants.TOKEN)
              deleteAccount({
                token: tk
              },{
                deleteType:'1'
              }).then(response=>{
                console.log(response)
                this.myAccount.cardNo = ''
                this.myAccount.accountName = ''
                this.myAccount.bankName = ''
                if(isEmptyObject(this.myAccount)){
                  this.showText = true
                }
              })
            }
          }).catch(error=>{});
        },
        deleteAlipay(){
          MessageBox.confirm('确定要删除支付宝账户吗?').then(action => {
            if(action==="confirm"){
              let tk = getLocalStorage(Constants.TOKEN)
              deleteAccount({
                token: tk
              },{
                deleteType:'2'
              }).then(response=>{
                console.log(response)
                this.myAccount.aliPay = ''
                this.myAccount.aliPayName = ''
                if(isEmptyObject(this.myAccount)){
                  this.showText = true
                }
              })
            }
          }).catch(error=>{});
        }
      },
      mounted(){
        let tk = getLocalStorage(Constants.TOKEN)
        getAccountList({
          token: tk
        }).then(response=>{
          console.log(response)
          this.myAccount = response.result
          if(isEmptyObject(this.myAccount)){
            this.showText = true
          }
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
    overflow: scroll;
  }
  .mint-header{
    background-color: #000;
    height: 48px;
    z-index: 9999;
  }

  .content{
    margin-top: 48px;
  }
  .account-list{
    background-color: #fff;
    padding: 0 16px;
  }
  .add p{
    color: #999;
    height: 36px;
    text-align: center;
    font-size: 14px;
    position: relative;
    display: flex;
    align-items: center;
  }
  .add p:first-child:after{
    position: absolute;
    height: 1px;
    background-color: rgba(153,153,153,0.5);
    bottom: 0;
    left: 0;
    content: '';
    width: 100%;

  }
  .add p i{
    font-size: 26px;
    margin-right: 8px;
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
  .no-account{
    color: #000;
    font-size: 14px;
    padding: 16px;
    background: #fff;
    margin-top: 64px;
  }
  .no-account span{
    color: #FF659F;
  }
  .icon-iconset0291{
    color: #e0620d;
  }
  .icon-iconfontrectangle390{
    color: #1296db;
  }
  .icon-lajixiang{
    color: #999;
  }
  input[disabled]{
    background-color: transparent;
  }
</style>
<style>
  .btn-add span{
    padding-right: 16px;
    color: #fff;
  }
  .el-popover{
    min-width: 1px;
  }
</style>
