<template>
  <div class="container">
    <mt-header fixed title="我的评价">
      <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
    </mt-header>
    <div class="content">
      <div class="recommend-list" v-for="n in 10">
        <Recommend  hasReply="n%2 == 0 ? true : false"></Recommend>
      </div>
    </div>
  </div>
</template>

<script>
  import Recommend from '@/components/view/Recommend'
  export default {
    name: "UserEvaluations",
    components:{
      Recommend
    },
    methods: {
      goBack() {
        this.$router.back()
      }
    },
    mounted(){

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
