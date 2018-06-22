<template>
  <div class="container">
    <mt-header fixed title="订单详情">
      <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
    </mt-header>
    <div class="content">
      <div class="info" v-for="n in 10">
        <AddressWithEditor :isDefault="n == 1 ? true : false"></AddressWithEditor>
      </div>
    </div>
    <div class="goto">
      <button @click="gotoEditAddress">新增地址</button>
    </div>
  </div>
</template>

<script>
  import AddressWithEditor from '@/components/view/AddressWithEditor'

  export default {
    name: "SelectAddress",
    components: {
      AddressWithEditor
    },
    methods:{
      goBack(){
        this.$router.back()
      },
      gotoEditAddress(){
        this.$router.push('/editAddress')
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
    background-color: #FF659B;
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
    padding: 8px 0;
    width: 100%;
    background-color: #fff;
    text-align: center;
  }
  .goto button{
    border: none;
    height: 44px;
    line-height: 44px;
    border-radius: 22px;
    background-color: transparent;
    background-image: url("../../assets/img/color-pink.png");
    width: 280px;
    text-align: center;
    color: #fff;
    margin: 0 auto;
  }
</style>
