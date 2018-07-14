<template>
  <div class="container">
    <mt-header fixed title="查看评价">
      <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
    </mt-header>
    <div class="content">
      <div class="recommend-list" v-for="item in appraisesList">
            <Recommend  :comment="item"></Recommend>
      </div>
    </div>
  </div>
</template>

<script>
  import Recommend from '@/components/view/Recommend'
  import {getGoodsAppraises} from "../../http/getData"

  export default {
    name: "Evaluations",
    data(){
      return {
        page:1,
        limit: '15',
        goodsNum:'',
        appraisesList:[]
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
      let {id} = this.$route.params
      this.goodsNum = id
      console.log(this.goodsNum)
      getGoodsAppraises({
        page: this.page.toString(),
        limit: this.limit,
        goodsNum:this.goodsNum
      }).then(response=>{
        console.log(response)
        if (response.result.totalCount < response.result.currPage) {
          // this.info = "~~数据已全部加载完毕了~~"
          // this.allLoaded = true
          // this.loading = false
          return
        }
        response.result.list.map((item)=>{
          this.appraisesList.push(item)
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

