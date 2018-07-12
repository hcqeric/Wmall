<template>
  <div class="container">
    <mt-header fixed :title="title">
      <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
    </mt-header>
    <div class="content">
      <RefundsItem v-for="n in 3" class="item"></RefundsItem>
    </div>
  </div>
</template>

<script>
  import RefundsItem from '@/components/view/RefundsItem'
  export default {
    name: "ApplyForRefunds",
    data(){
      return {
        title:''
      }
    },
    methods:{
      goBack() {
        this.$router.back()
      }
    },
    components:{
      RefundsItem
    },
    mounted(){
      let {type} = this.$route.params
      console.log(type)
      if(type == 0){
        this.title = "退款"
      }else if(type == 1){
        this.title = "退货退款"
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
