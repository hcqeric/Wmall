<template>
  <div class="container">
    <mt-header fixed title="设置兑换密码">
      <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
    </mt-header>
    <div class="content">
      <div class="account-list">
        <div class="input-cell">
          <div class="cell-left">
            <i class="iconfont icon-suoding"></i>
            <p>设置兑换密码</p>
          </div>
          <div class="cell-right">
            <input type="password" placeholder="输入兑换密码" v-model="payPassword">
          </div>
        </div>
        <div class="input-cell">
          <div class="cell-left">
            <i class="iconfont icon-suoding"></i>
            <p>确认密码</p>
          </div>
          <div class="cell-right">
            <input type="password" placeholder="再次输入兑换密码" v-model="confirmPass">
          </div>
        </div>
      </div>
      <div class="goto">
        <button @click="setupPayPassword">设置</button>
      </div>
    </div>
  </div>
</template>

<script>
  import {Toast} from 'mint-ui';
  import {mapActions} from 'vuex'
  import {setupPayPassword} from "../../http/getData"
  import {getLocalStorage, setLocalStorage} from "../../custom/mixin"
  import * as Constants from '../../custom/constants'
  export default {
    name: "SetPayPass",
    data(){
      return {
        payPassword:'',
        confirmPass:''
      }
    },
    methods: {
      ...mapActions({
        setPayPass: 'setPayPass'
      }),
      goBack() {
        this.$router.back()
      },
      setupPayPassword(){
        this.setPayPass(true)
        setLocalStorage(Constants.SETUPPAYPASS, true)
        if (this.payPassword === '' || this.confirmPass ===''){
          Toast({
            message: '密码不能为空',
            position: 'middle',
            duration: 1000});
          return
        }
        if(this.payPassword !== this.confirmPass){
          Toast({
            message: "两次输入的密码不一致，请重新输入",
            position: 'middle'
          });
          return
        }
        let tk = getLocalStorage(Constants.TOKEN)
        setupPayPassword({
          token: tk
        },{
          payPassword: this.payPassword
        }).then(response=>{
          this.setPayPass(true)
          Toast({
            message: "设置成功",
            position: 'middle'
          });
        }).catch(error=>{})
      }
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
    overflow: scroll;
  }

  .mint-header {
    background-color: #000;
    height: 48px;
    z-index: 9999;
  }

  .content {
    margin-top: 48px;
  }

  .account-list {
    background-color: #fff;
    padding: 0 16px;
  }

  .input-cell {
    min-height: 48px;
    width: 100%;
    display: flex;
    align-items: center;
    position: relative;
  }

  .input-cell:after {
    position: absolute;
    bottom: 0;
    left: 0;
    content: '';
    width: 100%;
    height: 1px;
    background-color: rgba(239, 239, 239, 0.9);
  }

  .input-cell:last-of-type:after {
    height: 0;
  }

  .cell-left {
    display: flex;
    align-items: center;
  }

  .cell-left i {
    font-size: 26px;
    margin-right: 8px;
  }

  .cell-left p {
    width: 100px;
    font-size: 14px;
    color: #000;
  }

  .cell-right {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: space-between;
  }

  .cell-right input {
    border: none;
    outline: none;
    padding: 4px;
    flex: 1;
    margin-right: 8px;
    height: 26px;
    font-size: 14px;
  }

  .goto {
    margin-top: 100px;
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

  .icon-suoding{
    color: #b535fa;
  }
</style>

