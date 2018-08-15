<template>
  <div class="container">
    <mt-header title="新闻详情">
      <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
    </mt-header>
    <div class="content">
      <div class="news-content" v-if="newsItem != null">
      <h3>{{newsItem.title}}</h3>
      <p>发表于：{{newsItem.createTime|DateFormat("yyyy-MM-dd hh:mm:ss")}}</p>
      </div>
      <div class="news-imgs" v-for="item in imgList" :key="item.id">
          <img :src="item.url" alt="">
      </div>

    </div>
  </div>
</template>

<script>
  import {getNewsDetail} from "../../http/getData";

  export default {
        name: "NewsDetail",
        data(){
          return {
            type:'newsDetails',
            imgList:[],
            newsItem:null
          }
        },
    methods:{
      goBack() {
        this.$router.back()
      }
    },
      mounted(){
          let {id} = this.$route.params
          this.newsItem = this.$store.state.app.newsContent
          console.log(this.newsItem)
          getNewsDetail({
            type:'newsDetails',
            foreignId: id
          }).then(response=>{
            console.log(response)
            this.imgList = response.result
          })

      }
    }
</script>

<style scoped>
  .container{
    min-height: 100vh;
  }
  .mint-header{
    background-color: #000;
    height: 48px;
  }
  .content{
    margin: 16px;
  }
  .news-content h3{
    text-align: center;
    margin: 4px 0;
  }
  .news-content p{
    margin-top: 4px;
    margin-bottom: 16px;
  }
  .news-imgs img{
    width: 100%;
    margin-top: 4px;
  }

</style>
