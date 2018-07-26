<template>
  <div class="container" v-if="pageInfo">
    <mt-header  fixed :title='"修改" + pageInfo.title'>
      <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
    </mt-header>
    <div class="content">
      <div class="account-list">
        <div class="input-cell">
          <div class="cell-left">
            <i class="iconfont icon-suoding"></i>
            <p>原{{pageInfo.title}}</p>
          </div>
          <div class="cell-right">
            <input  type="password" :placeholder='"输入原" + pageInfo.title' v-model="pageInfo.oldPass">
          </div>
        </div>
        <div class="input-cell">
          <div class="cell-left">
            <i class="iconfont icon-suoding"></i>
            <p>新密码</p>
          </div>
          <div class="cell-right">
            <input type="password" :placeholder='"输入新" + pageInfo.title' v-model="pageInfo.newPass">
          </div>
        </div>
        <div class="input-cell">
          <div class="cell-left">
            <i class="iconfont icon-suoding"></i>
            <p>确认密码</p>
          </div>
          <div class="cell-right">
            <input type="password" :placeholder='"再次输入新" + pageInfo.title' v-model="pageInfo.confirmPass">
          </div>
        </div>
      </div>
      <div class="goto">
        <button @click="updatePassword">修改</button>
      </div>
    </div>
  </div>
</template>

<script>
  import {Toast} from 'mint-ui';
  import {updatePayPass, updateUserPass} from "../../http/getData"
  import {getLocalStorage} from "../../custom/mixin"
  import * as Constants from '../../custom/constants'
  const page_msg = [
    {
      type:"login",
      title:"登录密码",
      postUrl:"www.baiodu.com",
      oldPass:'',
      newPass:'',
      confirmPass:''
    },
    {
      type:"trans",
      title: "兑换密码",
      postUrl:"www.baiodu.com",
      oldPass:'',
      newPass:'',
      confirmPass:''
    }
  ]
  export default {

    name: "UpdatePass",
    data(){
      return {
        type:'',
        pageInfo: null
      }
    },
    methods: {
      goBack() {
        this.$router.back()
      },
      updatePassword(){
        if (this.pageInfo.oldPass === '' || this.pageInfo.newPass ==='' || this.pageInfo.confirmPass === ''){
          Toast({
            message: '密码不能为空',
            position: 'middle',
            duration: 1000});
          return
        }else{
          let reg = /^[\w.]{6,20}$/
          if (!(reg.test(this.pageInfo.oldPass)) || !(reg.test(this.pageInfo.oldPass)) || !(reg.test(this.pageInfo.oldPass))){
            Toast({
              message: '密码长度需为6-20位',
              position: 'middle',
              duration: 1000});
            return
          }}
        if(this.pageInfo.oldPass === this.pageInfo.newPass){
          Toast({
            message: "輸入的原密碼與新密碼一致，請重新輸入",
            position: 'middle'
          });
          return
        }
        if(this.pageInfo.confirmPass !== this.pageInfo.newPass){
          Toast({
            message: "輸入的新密碼與確認密碼一致，請重新輸入",
            position: 'middle'
          });
          return
        }
        let tk = getLocalStorage(Constants.TOKEN)
        if(this.type === page_msg[0].type){

          updateUserPass({
            token: tk
          },{
            password: this.pageInfo.oldPass,
            newPassword: this.pageInfo.newPass
          }).then(response=>{
            Toast({
              message: "修改成功",
              position: 'middle'
            });
          }).catch(error=>{})
        }else if(this.type == page_msg[1].type){
          updateUserPass({
            token: tk
          },{
            payPassword: this.pageInfo.oldPass,
            newPayPassword: this.pageInfo.newPass
          }).then(response=>{
            Toast({
              message: "修改成功",
              position: 'middle'
            });
          }).catch(error=>{})
        }
      }
    },
    mounted(){
      let {type} = this.$route.params
      this.type = type
      if (type == page_msg[0].type) {
        this.pageInfo = page_msg[0]
      }else if(type == page_msg[1].type){
        this.pageInfo = page_msg[1]
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


