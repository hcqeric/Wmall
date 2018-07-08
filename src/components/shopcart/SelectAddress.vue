<template>
  <div class="container">
    <mt-header fixed title="选择收货地址">
      <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
    </mt-header>
    <div class="content">
      <div class="info" v-for="item in addressList">
        <AddressWithEditor :address="item"></AddressWithEditor>
      </div>
    </div>
    <div class="goto">
      <button @click="gotoEditAddress">新增地址</button>
    </div>
  </div>
</template>

<script>
  import AddressWithEditor from '@/components/view/AddressWithEditor'
  import * as Constants from '../../custom/constants'
  import {getLocalStorage} from "../../custom/mixin";
  import {getAdsList} from "../../http/getData";

  export default {
    name: "SelectAddress",
    data(){
      return {
        addressList:[]
      }
    },
    components: {
      AddressWithEditor
    },
    methods:{
      goBack(){
        this.$router.back()
      },
      gotoEditAddress(){
        this.$router.push('/editAddress/1')
        // this.$router.push('/play')
      }
    },
    mounted(){
      let tk = getLocalStorage(Constants.TOKEN)
      getAdsList({
        token: tk
      }).then(response=>{
        console.log(response)
        this.addressList = response.result
      }).catch(error=>{})
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
    margin-bottom: 60px;
  }
  .info{
    background-color: #fff;
    padding: 8px 16px;
    border-bottom:1px solid rgba(239,239,239,0.9);
  }
  .goto{
    position: fixed;
    bottom: 0;
    left: 0;
    padding: 16px 0;
    width: 100%;
    background-color: #fff;
    text-align: center;
  }
  .goto button{
    border: none;
    outline: none;
    height: 35px;
    line-height: 35px;
    border-radius: 17px;
    background-color: transparent;
    background-image: url("../../assets/img/button-bg.png");
    background-repeat: no-repeat;
    background-size: contain;
    width: 290px;
    text-align: center;
    color: #fff;
    margin: 0 auto;
  }
</style>
