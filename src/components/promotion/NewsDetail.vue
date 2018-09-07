<template>
  <div class="container" v-if="newsItem">
    <mt-header fixed :title="newsItem.title">
      <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
    </mt-header>
    <div class="content">
      <div class="news-content" v-if="newsItem != null">
        <h3>{{newsItem.title}}</h3>
        <p>发表于：{{newsItem.createTime|DateFormat("yyyy-MM-dd hh:mm:ss")}}</p>
      </div>
      <div class="news-imgs" v-for="item in newsItem.fileList" :key="item.id">
        <img :src="item.url" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  import {getNewsDetailById} from "../../http/getData";

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
          getNewsDetailById(id).then(response=>{
            this.newsItem = response.result
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
    padding: 58px 16px 0;
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
