<template>
  <div class="container">
    <mt-header v-if="title" fixed :title="title">
      <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
      <mt-button slot="right" @click="saveAddress">保存</mt-button>
    </mt-header>
    <div class="content">
      <div class="address-info">
          <div class="info-item" @click="">
            <span>收货地址</span><input type="text" placeholder="请选择收货地址" v-model="addressInfo.province+addressInfo.city+addressInfo.district" :disabled="true"><span><i class="el-icon-arrow-right"></i></span>
          </div>
        <div class="info-item">
          <span>详细地址</span><input placeholder="例：6号楼108室" type="text" v-model="addressInfo.address">
        </div>
        <div class="info-item">
          <span>联系人</span><input placeholder="联系人姓名" type="text" v-model="addressInfo.consignee">
        </div>
        <div class="info-item">
          <span>手机号码</span><input placeholder="联系人电话" type="text" v-model="addressInfo.mobile">
        </div>
      </div>
      <div class="goto" v-if="id == 2">
        <button>删除收货地址</button>
      </div>
    </div>
  </div>
</template>

<script>
  import {addAddress, updateAddress} from "../../http/getData";
  import {getLocalStorage} from "../../custom/mixin";
  import * as Constants from '../../custom/constants'

  export default {
    name: "EditAddress",
    data() {
      return {
        title:null,
        id:null,
        addressInfo:{
          id:'',
          consignee: '',
          province: '',
          city: '',
          district: '',
          address: '',
          mobile: ''
        }
      }
    },
    methods: {
      goBack() {
        this.$router.back()
      },
      saveAddress() {
        let tk = getLocalStorage(Constants.TOKEN)
        console.log(tk)
        if(this.id == 1){
          addAddress({
            token: tk
          },{
            consignee: this.addressInfo.consignee,
            province: this.addressInfo.province,
            city: this.addressInfo.city,
            district: this.addressInfo.district,
            address: this.addressInfo.address,
            mobile: this.addressInfo.mobile
          }).then(response=>{
            console.log(response)
          }).catch(error=>{})
        }else if(this.id == 2){

        }
      }
    },
    mounted(){
      let {id} = this.$route.params
      this.id = id
      if(id == 1){
        this.title = "添加收货地址"
      }else if(id == 2){
        this.title = "编辑收货地址"
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
  .address-info{
    padding:0 16px;
    background-color: #fff;
  }
  .info-item{
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid rgba(239,239,239,0.9);
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .info-item span{
    display: inline-block;
  }
  .info-item span:first-child{
    width: 80px;

    color: #999;
  }
  .info-item input{
    border: none;
    outline-color: transparent;
    height: 40px;
    flex: 1;
  }
  .info-item span:last-child{
    width: 30px;
    text-align: center;
  } i{
    font-size: 16px;
    color: #000;
  }
  .goto{
    position: fixed;
    bottom: 0;
    left: 0;
    padding: 44px 0;
    width: 100%;
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
  input[disabled],input:disabled{
    border:none;
    background-color:transparent;
    color: #000;
  }
</style>
