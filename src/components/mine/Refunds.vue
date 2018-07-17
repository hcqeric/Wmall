<template>
  <div class="container">
    <mt-header fixed title="退货退款">
      <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
    </mt-header>
    <div class="content">
      <RefundsItem v-for="n in 3" class="item"></RefundsItem>
    </div>
  </div>
</template>

<script>
  import RefundsItem from '@/components/view/RefundsItem'
  import {getRefundList} from "../../http/getData";
  import {getLocalStorage} from "../../custom/mixin";
  import * as Constants from '../../custom/constants'

  export default {
      name: "Refunds",
      methods:{
        goBack() {
          this.$router.back()
        }
      },
      components:{
          RefundsItem
      },
      mounted(){
        let tk = getLocalStorage(Constants.TOKEN)
        getRefundList({
          token: tk
        }).then(response=>{
          console.log(response)
        })
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
  }

  .mint-header {
    background-color: #000;
    height: 48px;
  }

  .content {
    margin-top: 48px;
  }
  .item{
    margin-top: 8px;
  }

</style>
