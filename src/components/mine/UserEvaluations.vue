<template>
  <div class="container">
    <mt-header fixed title="我的评价">
      <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
    </mt-header>
    <div class="content">
      <mt-loadmore  :bottom-all-loaded="allLoaded" ref="loadmore">
        <div class="recommend-list" v-for="item in commentList">
          <Recommend :comment="item"></Recommend>
        </div>
      </mt-loadmore>
    </div>
  </div>
</template>

<script>
  import Recommend from '@/components/view/Recommend'
  import {getUserAppraises} from "../../http/getData";
  import { getLocalStorage } from '@/custom/mixin';
  import * as Constants from '../../custom/constants'
  export default {
    name: "UserEvaluations",
    data(){
      return {
        allLoaded: false,
        commentList:[],
        limit:10,
        page:0
      }
    },
    components:{
      Recommend
    },
    methods: {
      goBack() {
        this.$router.back()
      }
    },
    mounted(){
      let tk = getLocalStorage(Constants.TOKEN)

      getUserAppraises({token:tk},{page:this.page.toString(), limit:this.limit.toString()}).then(response=>{
        console.log(response)
        response.result.list.map((item)=>{
          this.commentList.push(item)
        })
        this.page++
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
  .recommend-list{
    margin-bottom: 10px;
  }
</style>
