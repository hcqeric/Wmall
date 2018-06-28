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
        <div class="account-list">
          <div class="input-cell">
            <div class="cell-left">
              <i class="iconfont icon-iconset0291"></i>
              <p>银行卡号</p>
            </div>
            <div class="cell-right">
              <input type="text" value="6217 9211 5647 8987" disabled>
              <i class="iconfont icon-lajixiang"></i>
            </div>
          </div>
          <div class="input-cell">
            <div class="cell-left">
              <i class="iconfont icon-iconfontrectangle390"></i>
              <p>支付宝号</p>
            </div>
            <div class="cell-right">
              <input type="text" value="15899889888" disabled>
              <i class="iconfont icon-lajixiang"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "MyAccount",
      methods: {
        goBack() {
          this.$router.back()
        },
        turnToAddCreditCard(){
          this.$router.push('/addcredit')
        },
        turnToAddAliPay(){
          this.$router.push('/addalipay')
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
