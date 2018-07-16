<template>
    <div class="container">
      <mt-header title="推广模板">
        <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
      </mt-header>
      <div class="content">
        <img :src="imgUrl" alt="">
        <div class="share">
          <p>分享二维码给好友，好友注册成功并且购物满20元，即可永远成为你的一级好友~</p>
          <button>推广给好友，一起来赚钱！</button>
        </div>
      </div>
    </div>
</template>

<script>
  import {getShareInfo} from "../../http/getData";
  import {getLocalStorage} from "../../custom/mixin";
  import * as Constants from '../../custom/constants'

  export default {
    name: "PromotionDetail",
    data(){
      return {
        id:'1',
        imgUrl:''
      }
    },
    methods:{
      goBack() {
        this.$router.back()
      }
    },
    mounted() {
      let {id} = this.$route.params
      this.id = id
      let token = getLocalStorage(Constants.TOKEN)
      getShareInfo({
        token: token,
      },{
        id: this.id
      }).then(response=>{
        console.log(response)
        this.imgUrl = response.result.url
      })
    }
  }
</script>

<style scoped>
.container{
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.mint-header {
  background-color: #000;
  height: 48px;
}
  .content{
    flex: 1;
    display: flex;
    position: relative;
  }
  .content img{
    width: 100%;
  }
  .share{
    position: absolute;
    bottom:15vh;
    display: flex;
    flex-direction: column;
    padding: 0 36px;
  }
  .share p{
    color: #fff;
    font-size: 14px;
    text-indent: 2em;
    margin-bottom: 30px;
  }
  .share button{
    border: none;
    height: 44px;
    line-height: 44px;
    border-radius: 5px;
    background-color: transparent;
    background-image: url("../../assets/img/bg-purple.png");
    width: 100%;
    outline: none;
    text-align: center;
    color: #fff;
  }
</style>
